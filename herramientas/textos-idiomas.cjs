// Arma idiomas/es.json (todos los textos del inicio, en español) y avisa qué falta traducir
// en cada idioma. Uso, con el sitio servido en el puerto 8803:
//   node build.mjs && node herramientas/textos-idiomas.cjs
// Para cada idioma, las traducciones van en idiomas/<código>.json con las mismas claves.
const { chromium } = require('playwright');
const fs = require('fs'), path = require('path');
const RAIZ = path.join(__dirname, '..');
(async () => {
  const b = await chromium.launch(); const p = await b.newPage();
  await p.goto('http://localhost:8803/index.html', { waitUntil: 'domcontentloaded' });
  await p.waitForFunction(() => typeof UNIDADES !== 'undefined');
  const es = await p.evaluate(() => {
    const texto = {}, html = {}, attr = {};
    UNIDADES.forEach(u => { if (u.modo === 'html') html[u.clave] = u.es.replace(/\s+/g, ' ').trim(); else texto[u.clave] = u.es.replace(/\s+/g, ' ').trim(); });
    ATRS.forEach(a => { attr[a.clave] = a.es.replace(/\s+/g, ' ').trim(); });
    const solo = o => JSON.parse(JSON.stringify(o));
    const planes = {}, detalle = {};
    Object.entries(PLANES).forEach(([id, v]) => { planes[id] = { nombre: v.nombre, sub: v.sub, para: v.para, entrega: v.entrega, puntos: v.puntos, incluye: v.incluye, noIncluye: v.noIncluye, temporalidad: v.temporalidad, detalle: v.detalle }; });
    Object.entries(DETALLE).forEach(([id, v]) => { detalle[id] = { tag: v.tag, para: v.para, bajada: v.bajada, puntos: v.puntos, entrega: v.entrega }; });
    return { idioma: 'es', texto, html, attr, ui: solo(UI), planes, detalle };
  });
  // Páginas internas (motor compartido js/idiomas.js): idiomas/<página>/es.json
  for (const pagina of ['portfolio', 'laboratorio', 'blog']) {
    const pg = await b.newPage();
    await pg.goto(`http://localhost:8803/${pagina}.html`, { waitUntil: 'domcontentloaded' });
    const ok = await pg.waitForFunction(() => typeof I18N !== 'undefined', null, { timeout: 4000 }).then(() => true).catch(() => false);
    if (!ok) { console.log(`${pagina}: todavía no usa js/idiomas.js`); await pg.close(); continue; }
    await pg.waitForTimeout(300);
    const datos = await pg.evaluate(() => {
      const { UNIDADES, ATRS, dinamicos, ui, huella, normal } = I18N._textos();
      const texto = {}, html = {}, attr = {};
      UNIDADES.forEach(u => { if (u.modo === 'html') html[u.clave] = normal(u.es); else texto[u.clave] = normal(u.es); });
      dinamicos.forEach(s => { texto[huella(normal(s))] = normal(s); });
      ATRS.forEach(a => { attr[a.clave] = normal(a.es); });
      return { texto, html, attr, ui };
    });
    await pg.close();
    const dirP = path.join(RAIZ, 'idiomas', pagina); fs.mkdirSync(dirP, { recursive: true });
    fs.writeFileSync(path.join(dirP, 'es.json'), JSON.stringify({ idioma: 'es', ...datos }, null, 1) + '\n');
    const n = o => Object.keys(o).length;
    console.log(`${pagina}/es.json: ${n(datos.texto)} textos, ${n(datos.html)} con formato, ${n(datos.attr)} atributos`);
    for (const f of fs.readdirSync(dirP).filter(f => f.endsWith('.json') && f !== 'es.json')) {
      const d = JSON.parse(fs.readFileSync(path.join(dirP, f), 'utf8')); let faltan = 0;
      for (const sec of ['texto', 'html', 'attr', 'ui']) for (const k of Object.keys(datos[sec])) if (!(d[sec] && k in d[sec])) faltan++;
      console.log(`  ${f}: ${faltan ? 'faltan ' + faltan : 'completo'}`);
    }
  }
  await b.close();
  const dir = path.join(RAIZ, 'idiomas'); fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'es.json'), JSON.stringify(es, null, 1) + '\n');
  const n = o => Object.keys(o).length;
  console.log(`es.json: ${n(es.texto)} textos, ${n(es.html)} con formato, ${n(es.attr)} atributos, ${n(es.ui)} textos de JavaScript`);
  for (const f of fs.readdirSync(dir).filter(f => f.endsWith('.json') && f !== 'es.json')) {
    const d = JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8'));
    const faltan = [];
    for (const sec of ['texto', 'html', 'attr', 'ui']) for (const k of Object.keys(es[sec])) if (!(d[sec] && k in d[sec])) faltan.push(sec + ':' + k);
    for (const sec of ['planes', 'detalle']) for (const id of Object.keys(es[sec])) if (!(d[sec] && d[sec][id])) faltan.push(sec + ':' + id);
    console.log(`${f}: ${faltan.length ? 'faltan ' + faltan.length + ' (' + faltan.slice(0, 6).join(', ') + (faltan.length > 6 ? '…' : '') + ')' : 'completo'}`);
  }
})();
