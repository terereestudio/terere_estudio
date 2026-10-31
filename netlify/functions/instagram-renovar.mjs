// Función programada: renueva el token de Instagram una vez por semana.
// Los tokens de larga duración vencen a los 60 días; renovarlo seguido lo mantiene vivo.
// El token nuevo se guarda en Netlify Blobs (almacén "instagram", clave "token").
// Las funciones programadas solo corren en el sitio publicado (producción).

import { getStore } from '@netlify/blobs';
import { leerToken } from './instagram.mjs';

export default async () => {
  const token = await leerToken();
  if (!token) {
    console.log('instagram-renovar: todavía no hay token cargado');
    return;
  }
  const r = await fetch(`https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=${encodeURIComponent(token)}`);
  const datos = await r.json().catch(() => null);
  if (!r.ok || !datos?.access_token) {
    console.error('instagram-renovar: Instagram no renovó el token', r.status, JSON.stringify(datos?.error || datos).slice(0, 300));
    return;
  }
  await getStore('instagram').setJSON('token', {
    token: datos.access_token,
    renovado: new Date().toISOString(),
    venceEnDias: Math.round((datos.expires_in || 0) / 86400),
  });
  console.log('instagram-renovar: token renovado, vence en', Math.round((datos.expires_in || 0) / 86400), 'días');
};

export const config = { schedule: '@weekly' };
