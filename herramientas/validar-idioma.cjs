// Verifica una traducción contra el español. Uso: node herramientas/validar-idioma.cjs fr [portfolio|laboratorio|blog]
// Controla: mismas claves, mismas etiquetas HTML, mismos marcadores {así}, listas del mismo largo.
const fs = require('fs'), path = require('path');
const dir = path.join(__dirname, '..', 'idiomas', process.argv[3] || '');
const es = JSON.parse(fs.readFileSync(path.join(dir, 'es.json'), 'utf8'));
const cod = process.argv[2];
let d; try { d = JSON.parse(fs.readFileSync(path.join(dir, cod + '.json'), 'utf8')); } catch (e) { console.log('JSON inválido o inexistente:', e.message); process.exit(1); }
const err = [];
const etiquetas = s => (String(s).match(/<\/?[a-z][^>]*>/gi) || []).map(x => x.replace(/\s+/g, ' ')).join('');
const marcas = s => (String(s).match(/\{\w+\}/g) || []).sort().join(',');
const comparar = (ruta, a, b) => {
  if (Array.isArray(a)) { if (!Array.isArray(b) || a.length !== b.length) return err.push(`${ruta}: la lista debe tener ${a.length} elementos`); return a.forEach((x, i) => comparar(`${ruta}[${i}]`, x, b[i])); }
  if (a && typeof a === 'object') { if (!b || typeof b !== 'object') return err.push(`${ruta}: falta`); return Object.keys(a).forEach(k => { if (a[k] === undefined || a[k] === null) return; if (!(k in b)) err.push(`${ruta}.${k}: falta`); else comparar(`${ruta}.${k}`, a[k], b[k]); }); }
  if (typeof b !== 'string' || !b.trim()) return err.push(`${ruta}: vacío o no es texto`);
  if (marcas(a) !== marcas(b)) err.push(`${ruta}: marcadores distintos (${marcas(a)} → ${marcas(b)})`);
  if (ruta.startsWith('html.') && etiquetas(a) !== etiquetas(b)) err.push(`${ruta}: etiquetas HTML distintas`);
  if (!ruta.startsWith('html.') && /<[a-z]/i.test(b)) err.push(`${ruta}: no debe tener HTML`);
};
for (const sec of ['texto', 'html', 'attr', 'ui', 'planes', 'detalle']) if (es[sec]) comparar(sec, es[sec], d[sec]);
const extra = sec => Object.keys(d[sec] || {}).filter(k => !(k in es[sec])).map(k => `${sec}.${k}: clave que no existe en es.json`);
['texto', 'html', 'attr', 'ui'].forEach(s => { if (es[s]) err.push(...extra(s)); });
if (d.idioma !== cod) err.push(`"idioma" debe ser "${cod}"`);
console.log(err.length ? `${cod}: ${err.length} problemas\n- ` + err.slice(0, 40).join('\n- ') : `${cod}: OK`);
process.exit(err.length ? 1 : 0);
