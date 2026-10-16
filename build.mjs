// =========================================================================
// Tereré Estudio — armado del sitio
// Uso: node build.mjs
//
// Lee las páginas de src/paginas/, les agrega el <head>, el header y el
// footer compartidos (src/partes/) y escribe el HTML final en la raíz del
// repositorio, que es lo que publica Netlify. No necesita instalar nada.
// =========================================================================

import { readFileSync, writeFileSync, mkdirSync, readdirSync, statSync } from 'node:fs';
import { join, dirname, relative, sep } from 'node:path';

const DOMINIO = 'https://terereestudio.com.ar';
const RAIZ = dirname(new URL(import.meta.url).pathname);
const SRC = join(RAIZ, 'src');
const MESES = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];

const leer = (ruta) => readFileSync(join(SRC, ruta), 'utf8');
const partes = {
  head: leer('partes/head.html'),
  header: leer('partes/header.html'),
  footer: leer('partes/footer.html'),
  articulo: leer('partes/articulo.html'),
};
const posts = JSON.parse(leer('blog.json')).sort((a, b) => b.fecha.localeCompare(a.fecha));

const fechaLegible = (iso) => {
  const [a, m, d] = iso.split('-').map(Number);
  return `${d} ${MESES[m - 1]} ${a}`;
};
const resumir = (t, max = 150) => (t.length > max ? `${t.slice(0, max).replace(/\s+\S*$/, '')}…` : t);
const escapar = (t) => String(t).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

function listarPaginas(dir) {
  return readdirSync(dir).flatMap((nombre) => {
    const ruta = join(dir, nombre);
    return statSync(ruta).isDirectory() ? listarPaginas(ruta) : nombre.endsWith('.html') ? [ruta] : [];
  });
}

// Tarjeta de artículo (blog y últimos artículos del inicio)
function tarjeta(post, raiz, nivelTitulo = 'h3') {
  const svg = post.imagen.endsWith('.svg');
  const base = post.imagen.replace(/\.(webp|svg)$/, '');
  const img = svg
    ? `<img src="${raiz}${post.imagen}" width="1200" height="630" alt="" loading="lazy" decoding="async">`
    : `<img src="${raiz}${base}-chica.webp" srcset="${raiz}${base}-chica.webp 600w, ${raiz}${base}.webp 1200w" sizes="(max-width: 700px) 100vw, 360px" width="600" height="315" alt="" loading="lazy" decoding="async">`;
  const sello = post.selloIA
    ? `<p class="tarjeta-sello-ia">Texto generado con IA como práctica de prompting</p>`
    : '';
  return `<article class="tarjeta-post" data-categoria="${post.categoria}">
  <a class="tarjeta-post-enlace" href="${raiz}${post.href}">
    <div class="tarjeta-post-imagen">${img}</div>
    <div class="tarjeta-post-cuerpo">
      <p class="tarjeta-post-meta"><span>${post.etiqueta}</span> <time datetime="${post.fecha}">${fechaLegible(post.fecha)}</time></p>
      <${nivelTitulo}>${post.titulo}</${nivelTitulo}>
      <p>${resumir(post.resumen)}</p>
      ${sello}
    </div>
  </a>
</article>`;
}

function jsonLd(meta, url) {
  if (meta.tipo === 'article') {
    return {
      '@context': 'https://schema.org', '@type': 'BlogPosting',
      headline: meta.titulo, description: meta.descripcion, datePublished: meta.fecha,
      image: `${DOMINIO}/${meta.imagen}`, url, inLanguage: 'es-AR',
      author: { '@type': 'Person', name: 'Leonardo Lavrovic', url: `${DOMINIO}/sobre-mi.html` },
      publisher: { '@type': 'Organization', name: 'Tereré Estudio', url: DOMINIO },
    };
  }
  if (meta.ldInicio) {
    return [
      {
        '@context': 'https://schema.org', '@type': 'ProfessionalService',
        name: 'Tereré Estudio', url: DOMINIO, image: `${DOMINIO}/img/marca/icono-512.png`,
        telephone: '+5493644328260', areaServed: 'AR',
        address: { '@type': 'PostalAddress', addressLocality: 'Corrientes', addressCountry: 'AR' },
        founder: { '@type': 'Person', name: 'Leonardo Lavrovic' },
      },
      {
        '@context': 'https://schema.org', '@type': 'Person', name: 'Leonardo Lavrovic',
        jobTitle: 'Desarrollador web', url: `${DOMINIO}/sobre-mi.html`,
        address: { '@type': 'PostalAddress', addressLocality: 'Corrientes', addressCountry: 'AR' },
        sameAs: ['https://www.linkedin.com/in/leonardo-lavrovic/', 'https://github.com/terereestudio', 'https://instagram.com/terere.ecommerce'],
      },
    ];
  }
  return null;
}

const generadas = [];

for (const archivo of listarPaginas(join(SRC, 'paginas'))) {
  const rel = relative(join(SRC, 'paginas'), archivo).split(sep).join('/');
  const nivel = rel.split('/').length - 1;
  let raiz = '../'.repeat(nivel);
  let fuente = readFileSync(archivo, 'utf8');

  const m = fuente.match(/^<!--meta ([\s\S]*?) -->\n?/);
  if (!m) throw new Error(`Falta el bloque <!--meta --> en ${rel}`);
  const meta = JSON.parse(m[1]);
  if (meta.raizAbsoluta) raiz = '/'; // la página 404 se muestra en cualquier ruta
  let cuerpo = fuente.slice(m[0].length);

  // Artículos del blog: se envuelven en la plantilla de artículo
  if (meta.tipo === 'article') {
    const indice = meta.indice?.length
      ? `<nav class="articulo-indice" aria-label="En esta nota"><p>En esta nota</p><ol>${meta.indice.map(([h, t]) => `<li><a href="${h}">${t.trim()}</a></li>`).join('')}</ol></nav>`
      : '';
    const podcast = meta.podcast ? leer('partes/podcast.html') : '';
    const sello = meta.selloIA
      ? '<p class="articulo-sello-ia">Este texto fue generado con IA como práctica de prompting.</p>'
      : '';
    cuerpo = partes.articulo
      .replace('{{etiqueta}}', meta.etiqueta)
      .replace('{{fechaISO}}', meta.fecha)
      .replace('{{fecha}}', fechaLegible(meta.fecha))
      .replace('{{tituloArticulo}}', meta.titulo)
      .replace('{{lead}}', meta.lead)
      .replace('{{selloIA}}', sello)
      .replace('{{podcast}}', podcast)
      .replace('{{indice}}', indice)
      .replace('{{contenido}}', cuerpo);
  }

  // Listados del blog
  cuerpo = cuerpo
    .replace('<!--blog:lista-->', posts.map((p) => tarjeta(p, raiz, 'h2')).join('\n'))
    .replace('<!--blog:ultimos-->', posts.slice(0, 3).map((p) => tarjeta(p, raiz)).join('\n'));

  const url = rel === 'index.html' ? `${DOMINIO}/` : `${DOMINIO}/${encodeURI(rel)}`;
  const ld = jsonLd(meta, url);
  const tituloCompleto = meta.tituloHead || (rel === 'index.html' ? meta.titulo : `${meta.titulo} | Tereré Estudio`);

  const head = partes.head
    .replaceAll('{{tituloHead}}', escapar(tituloCompleto))
    .replaceAll('{{descripcion}}', escapar(meta.descripcion))
    .replaceAll('{{canonical}}', url)
    .replaceAll('{{ogTipo}}', meta.tipo === 'article' ? 'article' : 'website')
    .replaceAll('{{ogImagen}}', `${DOMINIO}/${meta.ogImagen || 'img/marca/og-terere-estudio.jpg'}`)
    .replaceAll('{{robots}}', meta.noindex ? '<meta name="robots" content="noindex">' : '')
    .replaceAll('{{jsonld}}', ld ? `<script type="application/ld+json">${JSON.stringify(ld)}</script>` : '');

  let html = `<!DOCTYPE html>
<html lang="es-AR">
<head>
${head}
</head>
<body class="${meta.claseBody || ''}">
${partes.header}
<main id="contenido">
${cuerpo}
</main>
${partes.footer}
</body>
</html>
`;

  for (const seccion of ['servicios', 'portfolio', 'blog', 'sobre-mi']) {
    html = html.replaceAll(`{{activo-${seccion}}}`, meta.activo === seccion ? ' aria-current="page"' : '');
  }
  html = html.replaceAll('{{raiz}}', raiz).replaceAll('{{anio}}', String(new Date().getFullYear()));

  const destino = join(RAIZ, rel);
  mkdirSync(dirname(destino), { recursive: true });
  writeFileSync(destino, html);
  if (!meta.noindex) generadas.push({ url, fecha: meta.fecha });
  console.log('✓', rel);
}

// css/estilos.css: se genera desde src/estilos.css reemplazando las variables
// por sus valores, para que el validador del W3C no muestre avisos por ellas.
{
  const fuente = leer('estilos.css');
  const bloque = fuente.match(/:root\s*\{([\s\S]*?)\n\}/);
  const vars = {};
  for (const m of bloque[1].matchAll(/(--[\w-]+)\s*:\s*([^;]+);/g)) vars[m[1]] = m[2].trim();
  const resolver = (t) => t.replace(/var\((--[\w-]+)\)/g, (_, n) => {
    if (!(n in vars)) throw new Error(`Variable CSS sin definir: ${n}`);
    return resolver(vars[n]);
  });
  const css = resolver(fuente.replace(bloque[0], '/* Archivo generado por build.mjs: editá src/estilos.css */'));
  mkdirSync(join(RAIZ, 'css'), { recursive: true });
  writeFileSync(join(RAIZ, 'css', 'estilos.css'), css);
  console.log('✓ css/estilos.css');
}

// sitemap.xml
const hoy = new Date().toISOString().slice(0, 10);
writeFileSync(join(RAIZ, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${generadas.map((g) => `  <url><loc>${g.url}</loc><lastmod>${g.fecha || hoy}</lastmod></url>`).join('\n')}
</urlset>
`);
console.log('✓ sitemap.xml');
