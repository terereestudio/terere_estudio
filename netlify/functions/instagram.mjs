// GET /api/instagram
// Devuelve las últimas 6 publicaciones de @terere.estudio.ok para el pie del inicio.
// Usa la API de Instagram con inicio de sesión de Instagram (cuenta profesional).
//
// El token se guarda primero en la variable INSTAGRAM_TOKEN de Netlify. Como vence a los
// 60 días, la función programada "instagram-renovar" lo renueva cada semana y guarda el
// token nuevo en Netlify Blobs; esta función usa el de Blobs si existe.
//
// La respuesta queda en la caché de Netlify una hora: Instagram no recibe una consulta
// por cada visita.

const CAMPOS = 'id,media_type,media_url,thumbnail_url,permalink,caption,timestamp';

const responder = (status, cuerpo, cache) =>
  new Response(JSON.stringify(cuerpo), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': cache ? 'public, max-age=600' : 'no-store',
      ...(cache ? { 'Netlify-CDN-Cache-Control': 'public, durable, s-maxage=3600, stale-while-revalidate=86400' } : {}),
    },
  });

export async function leerToken() {
  try {
    const { getStore } = await import('@netlify/blobs');
    const guardado = await getStore('instagram').get('token', { type: 'json' });
    if (guardado?.token) return guardado.token;
  } catch {
    // Sin Blobs (por ejemplo, en una prueba local): se usa la variable de entorno.
  }
  return process.env.INSTAGRAM_TOKEN || '';
}

export default async () => {
  const token = await leerToken();
  if (!token) return responder(200, { publicaciones: [] }, false);

  let datos;
  try {
    const r = await fetch(`https://graph.instagram.com/me/media?fields=${CAMPOS}&limit=6&access_token=${encodeURIComponent(token)}`);
    datos = await r.json();
    if (!r.ok) throw new Error(JSON.stringify(datos?.error || datos));
  } catch (err) {
    console.error('instagram: no se pudieron leer las publicaciones', String(err).slice(0, 300));
    return responder(200, { publicaciones: [] }, false);
  }

  const publicaciones = (datos.data || [])
    .map((p) => ({
      url: p.permalink,
      imagen: p.media_type === 'VIDEO' ? p.thumbnail_url : p.media_url,
      video: p.media_type === 'VIDEO',
      texto: (p.caption || '').replace(/\s+/g, ' ').trim().slice(0, 120),
    }))
    .filter((p) => p.url && p.imagen && /^https:\/\//.test(p.imagen));

  return responder(200, { publicaciones }, publicaciones.length > 0);
};

export const config = { path: '/api/instagram' };
