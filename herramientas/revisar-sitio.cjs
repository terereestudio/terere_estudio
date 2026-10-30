// Revisión automática del sitio: errores de consola y de CSP, recursos 404, enlaces y anclas rotas,
// ids duplicados, imágenes sin alt, scroll lateral en celular, títulos, descripciones, H1 y canonical.
// Uso (desde la raíz del repo):
//   python3 -m http.server 8803 &
//   node herramientas/revisar-sitio.cjs
// Necesita Playwright (npm i -D playwright). Correlo antes de cada push.
const { chromium } = require('playwright');
const fs = require('fs'), path = require('path');
const R = path.resolve(__dirname, '..');
const headers = fs.readFileSync(R + '/_headers', 'utf8');
const cspPor = (ruta) => { const bloques = headers.split(/\n(?=\/)/); let csp = null;
  for (const b of bloques) { const [pat, ...rest] = b.split('\n'); const l = rest.find(x => x.includes('Content-Security-Policy')); if (!l) continue;
    const p = pat.trim(); const ok = p === ruta || (p.endsWith('*') && ruta.startsWith(p.slice(0, -1))) || (p === '/' && ruta === '/index.html'); if (ok) csp = l.split(': ').slice(1).join(': ').trim(); }
  return csp; };
const paginas = [];
const recorrer = d => fs.readdirSync(d).forEach(f => { const p = path.join(d, f); if (['v1','src','node_modules','.git','netlify','herramientas'].includes(f)) return; if (fs.statSync(p).isDirectory()) recorrer(p); else if (f.endsWith('.html')) paginas.push('/' + path.relative(R, p)); });
recorrer(R);
(async () => { const b = await chromium.launch(); const informe = [];
 for (const ruta of paginas) for (const [disp, w] of [['pc', 1440], ['cel', 390]]) {
  const ctx = await b.newContext({ viewport: { width: w, height: 900 } }); const p = await ctx.newPage(); const prob = [];
  const csp = cspPor(ruta); if (!csp && disp === 'pc') prob.push('Sin Content-Security-Policy en _headers');
  p.on('pageerror', e => prob.push('Error JS: ' + e.message));
  p.on('console', m => { if (m.type() === 'error') prob.push('Consola: ' + m.text().slice(0, 160)); });
  p.on('response', r => { if (r.status() >= 400) prob.push(`Recurso ${r.status()}: ${decodeURI(r.url().replace('http://localhost:8803', ''))}`); });
  await p.route('**/*', async r => { const res = await r.fetch(); const hd = { ...res.headers() }; if (r.request().resourceType() === 'document' && csp) hd['content-security-policy'] = csp; await r.fulfill({ response: res, headers: hd }); });
  await p.route('**/api/**', r => r.fulfill({ status: 200, body: '{}' }));
  await p.goto('http://localhost:8803' + encodeURI(ruta), { waitUntil: 'networkidle' }).catch(e => prob.push('No carga: ' + e.message));
  await p.waitForTimeout(600);
  const d = await p.evaluate(() => {
    const out = [];
    if (document.documentElement.scrollWidth > innerWidth + 1) out.push(`Scroll lateral (${document.documentElement.scrollWidth}px)`);
    const ids = {}; document.querySelectorAll('[id]').forEach(e => ids[e.id] = (ids[e.id] || 0) + 1);
    Object.entries(ids).filter(([, n]) => n > 1).forEach(([i]) => out.push('Id duplicado: ' + i));
    document.querySelectorAll('img:not([alt])').forEach(i => out.push('Imagen sin alt: ' + i.getAttribute('src')));
    // Carga diferida: lo que está debajo de la primera pantalla va con loading="lazy";
    // lo que se ve al abrir la página, NO (si no, la página tarda más en mostrarse).
    // Solo se exige "sin lazy" a la imagen más grande de la primera pantalla (la que el navegador
    // usa para medir cuándo la página "ya se ve"); las otras visibles pueden llevarlo igual.
    let mayor = null, area = 0;
    document.querySelectorAll('img').forEach(i => {
      const r = i.getBoundingClientRect();
      if (!r.width) return; // imagen oculta (ventana cerrada, pestaña sin abrir)
      const lazy = i.getAttribute('loading') === 'lazy';
      if (r.top > innerHeight * 1.5 && !lazy) out.push('Imagen debajo de la primera pantalla sin loading="lazy": ' + i.getAttribute('src'));
      const visible = Math.max(0, Math.min(r.bottom, innerHeight) - Math.max(r.top, 0)) * r.width;
      if (visible > area) { area = visible; mayor = i; }
    });
    if (mayor && area > 40000 && mayor.getAttribute('loading') === 'lazy') out.push('La imagen principal de la primera pantalla tiene loading="lazy" (sacáselo): ' + mayor.getAttribute('src'));
    document.querySelectorAll('a[href^="#"]').forEach(a => { const h = a.getAttribute('href'); if (h.length > 1 && !document.getElementById(decodeURIComponent(h.slice(1)))) out.push('Ancla rota: ' + h); });
    const meta = {
      titulo: document.title, desc: document.querySelector('meta[name=description]')?.content || '',
      h1: document.querySelectorAll('h1').length, canonical: !!document.querySelector('link[rel=canonical]'),
      links: [...document.querySelectorAll('a[href]')].map(a => a.getAttribute('href')).filter(h => !/^(https?:|mailto:|tel:|#|javascript:)/.test(h))
    };
    return { out, meta };
  });
  prob.push(...d.out);
  if (disp === 'pc') {
    const m = d.meta;
    if (!m.titulo) prob.push('Sin <title>'); else if (m.titulo.length > 65) prob.push(`Título largo (${m.titulo.length})`);
    if (!m.desc) prob.push('Sin meta description'); else if (m.desc.length > 160) prob.push(`Descripción larga (${m.desc.length})`);
    if (m.h1 !== 1) prob.push(`H1: ${m.h1}`);
    if (!m.canonical) prob.push('Sin canonical');
    for (const h of new Set(m.links)) { const sinQ = h.split('#')[0].split('?')[0]; if (!sinQ) continue;
      const abs = path.normalize(path.join(path.dirname(R + ruta), decodeURIComponent(sinQ)));
      const ok = fs.existsSync(abs) && (fs.statSync(abs).isFile() || fs.existsSync(path.join(abs, 'index.html'))) || fs.existsSync(abs + '.html');
      if (!ok) prob.push('Enlace roto: ' + h); }
  }
  if (prob.length) informe.push([ruta, disp, [...new Set(prob)]]);
  await ctx.close(); }
 await b.close();
 console.log(`Páginas revisadas: ${paginas.length} (${paginas.join(', ')})`);
 for (const [r, d, ps] of informe) { console.log(`\n${r} [${d}]`); ps.forEach(x => console.log('  - ' + x)); }
})();
