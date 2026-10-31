// Yacarés animados de las tarjetas de "Productos y automatizaciones".
// Dibuja al yacaré Tereré en SVG (estilo dibujo animado de los años 30: verde, panza amarilla,
// boina negra con flor blanca, guantes blancos y brazos de manguera) y una escena por tarjeta.
// Las animaciones son SMIL (<animate>), que funcionan en todos los navegadores; inicio.js las pausa
// fuera de pantalla y con "movimiento reducido".
// Uso: node herramientas/yacares.cjs   → reemplaza lo que está entre <!-- yac:NOMBRE --> y <!-- /yac:NOMBRE -->
// en src/paginas/index.html. Después, node build.mjs.
const fs = require('fs'), path = require('path');
const R = path.resolve(__dirname, '..');
const C = { tinta: '#231F20', verde: '#6F9C43', verdeOsc: '#557E2F', panza: '#F2D36B', panzaOsc: '#D9B44A', blanco: '#FFFFFF', crema: '#F3E9DA', marca: '#9FBD2B' };
const T = `stroke="${C.tinta}" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"`;

// Cuerpo y cabeza (sin brazos). Coordenadas: 120 × 140; mira hacia la derecha.
function cuerpo(p, { mirada = null } = {}) {
  const pupila = (cx, cy) => {
    const mov = mirada ? `<animateTransform attributeName="transform" type="translate" ${mirada}/>` : '';
    return `<g><ellipse cx="${cx}" cy="${cy}" rx="4" ry="6" fill="${C.tinta}"/><path d="M${cx + 1} ${cy - 5} l2.6 3.4 l-3.2 .8z" fill="${C.blanco}"/>${mov}</g>`;
  };
  const parpado = (cx, cy) => `<ellipse cx="${cx}" cy="${cy}" rx="10" ry="0" fill="${C.verde}" ${T}><animate attributeName="ry" values="0;0;12;0" keyTimes="0;.93;.965;1" dur="4.2s" repeatCount="indefinite"/></ellipse>`;
  return `
  <path d="M30 140 C30 118 34 100 46 96 L76 96 C88 100 92 118 92 140 Z" fill="${C.verde}" ${T}/>
  <path d="M47 140 C46 122 50 106 61 104 C72 106 76 122 75 140 Z" fill="${C.panza}" ${T}/>
  <path d="M50 116 Q61 120 72 116 M48.5 127 Q61 131 73.5 127" fill="none" stroke="${C.panzaOsc}" stroke-width="2.4" stroke-linecap="round"/>
  <path d="M32 76 C22 62 26 40 46 36 C58 34 66 40 70 46 C84 46 100 46 108 50 C117 54 117 70 108 73 C92 77 72 83 56 83 C46 83 38 81 32 76 Z" fill="${C.verde}" ${T}/>
  <path d="M62 75 C76 78 94 75 108 70 C104 76 90 80 70 82 Z" fill="${C.verdeOsc}"/>
  <path d="M60 68 C76 72 94 70 110 64" fill="none" ${T}/>
  <path d="M60 68 C57 66 56 63 58 61" fill="none" ${T}/>
  <path d="M74 71 l2 4 l2 -3.6 M88 70.4 l2 4 l2 -3.8" fill="${C.blanco}" stroke="${C.tinta}" stroke-width="1.6" stroke-linejoin="round"/>
  <circle cx="103" cy="50" r="3.2" fill="${C.verde}" ${T}/><circle cx="103.4" cy="50.4" r="1" fill="${C.tinta}"/>
  <path d="M40 54 q4 -2 6 1 M36 62 q4 -2 6 1" fill="none" stroke="${C.verdeOsc}" stroke-width="2" stroke-linecap="round"/>
  <ellipse cx="38" cy="25" rx="21" ry="8.5" transform="rotate(-14 38 25)" fill="${C.tinta}"/>
  <circle cx="34" cy="16" r="3" fill="${C.tinta}"/>
  <g transform="translate(22 28)">${[0, 72, 144, 216, 288].map(a => `<circle cx="${(Math.cos(a * Math.PI / 180) * 4).toFixed(1)}" cy="${(Math.sin(a * Math.PI / 180) * 4).toFixed(1)}" r="3.2" fill="${C.blanco}" stroke="${C.tinta}" stroke-width="1"/>`).join('')}<circle r="2" fill="${C.panza}"/></g>
  <ellipse cx="49" cy="35" rx="9.5" ry="11.5" fill="${C.blanco}" ${T}/>
  <ellipse cx="64" cy="33" rx="9.5" ry="11.5" fill="${C.blanco}" ${T}/>
  ${pupila(52, 37)}${pupila(67, 35)}
  ${parpado(49, 35)}${parpado(64, 33)}`;
}

// Brazo de manguera: una curva que cambia de forma (fotogramas) y un guante que sigue la punta.
// f = [[x0,y0, c1x,c1y, c2x,c2y, x1,y1], ...]
function brazo(id, f, dur, { keyTimes = null, guante = true, extra = '' } = {}) {
  const d = q => `M${q[0]} ${q[1]} C${q[2]} ${q[3]} ${q[4]} ${q[5]} ${q[6]} ${q[7]}`;
  const kt = keyTimes ? ` keyTimes="${keyTimes}"` : '';
  const spl = ` calcMode="spline" keySplines="${f.slice(1).map(() => '.45 0 .55 1').join(';')}"`;
  const anim = f.length > 1 ? `<animate attributeName="d" values="${f.map(d).join(';')}" dur="${dur}" repeatCount="indefinite"${kt}${spl}/>` : '';
  const mano = f.length > 1 ? `<animateTransform attributeName="transform" type="translate" values="${f.map(q => `${q[6]} ${q[7]}`).join(';')}" dur="${dur}" repeatCount="indefinite"${kt}${spl}/>` : '';
  return `
  <defs><path id="${id}" d="${d(f[0])}">${anim}</path></defs>
  <use href="#${id}" fill="none" stroke="${C.tinta}" stroke-width="11" stroke-linecap="round"/>
  <use href="#${id}" fill="none" stroke="${C.verde}" stroke-width="6" stroke-linecap="round"/>
  ${guante ? `<g transform="translate(${f[0][6]} ${f[0][7]})">${mano}<circle r="7.5" fill="${C.blanco}" stroke="${C.tinta}" stroke-width="2.6"/><circle cx="-5" cy="-5" r="3.2" fill="${C.blanco}" stroke="${C.tinta}" stroke-width="2.2"/><path d="M-2 2 l4 0 M-2 -1 l4 0" stroke="${C.tinta}" stroke-width="1.4" stroke-linecap="round"/>${extra}</g>` : ''}`;
}

const svg = (vb, cont, clase = '') => `<svg class="yac ${clase}" viewBox="${vb}" aria-hidden="true" focusable="false">${cont}</svg>`;
const luz = (cx, cy, r, color, op) => `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${color}" opacity="${op}"/>`;

// 1. Asistente de WhatsApp: mira el celular, saluda con el otro brazo y salen corazones y tildes
const wa = svg('0 0 150 150', `
  ${luz(70, 84, 62, C.blanco, .55)}
  <g transform="translate(6 10)">
  ${brazo('yw-a', [[44, 104, 30, 90, 14, 70, 14, 44], [44, 104, 20, 96, 4, 72, 2, 50], [44, 104, 30, 90, 14, 70, 14, 44]], '1.4s')}
  ${cuerpo('w', { mirada: 'values="0 0;2 2;2 2;0 0" keyTimes="0;.3;.8;1" dur="3s" repeatCount="indefinite"' })}
  <g><animateTransform attributeName="transform" type="rotate" values="-4 118 96;4 118 96;-4 118 96" dur=".5s" repeatCount="indefinite"/>
    <rect x="106" y="74" width="24" height="40" rx="5" fill="${C.tinta}"/><rect x="109" y="80" width="18" height="26" rx="2" fill="${C.marca}"/>
    <path d="M112 86 h11 M112 91 h8 M112 96 h10" stroke="${C.tinta}" stroke-width="2" stroke-linecap="round"/></g>
  ${brazo('yw-b', [[80, 106, 92, 118, 104, 112, 112, 102], [80, 106, 92, 120, 104, 114, 113, 98], [80, 106, 92, 118, 104, 112, 112, 102]], '.5s')}
  <g fill="${C.marca}" stroke="${C.tinta}" stroke-width="1.6">
    <path d="M132 64 c-3 -5 -10 -2 -6 4 l6 5 l6 -5 c4 -6 -3 -9 -6 -4z" fill="#E4572E"><animateTransform attributeName="transform" type="translate" values="0 10;0 -46" dur="2.4s" repeatCount="indefinite"/><animate attributeName="opacity" values="0;1;1;0" keyTimes="0;.15;.7;1" dur="2.4s" repeatCount="indefinite"/></path>
    <g><animateTransform attributeName="transform" type="translate" values="-10 18;-14 -40" dur="2.4s" begin="1.2s" repeatCount="indefinite"/><animate attributeName="opacity" values="0;1;1;0" keyTimes="0;.15;.7;1" dur="2.4s" begin="1.2s" repeatCount="indefinite"/><circle cx="140" cy="60" r="7"/><path d="M136.5 60 l2.6 2.6 l4.4 -5" fill="none" stroke="${C.tinta}" stroke-width="2"/></g>
  </g></g>`, 'yac-wa');

// 2. Agentes por tarea: dirige la orquesta de agentes con dos brazos de manguera
const agentes = svg('0 0 150 150', `
  ${luz(70, 86, 60, C.marca, .16)}
  <g transform="translate(8 10)">
  ${brazo('ya-a', [[44, 104, 26, 96, 10, 80, 6, 58], [44, 104, 30, 104, 14, 100, 0, 94], [44, 104, 26, 96, 10, 80, 6, 58]], '1s')}
  ${cuerpo('a', { mirada: 'values="0 0;1.5 -1;0 0" dur="1s" repeatCount="indefinite"' })}
  ${brazo('ya-b', [[80, 106, 104, 110, 120, 96, 130, 72], [80, 106, 104, 118, 122, 116, 134, 104], [80, 106, 104, 110, 120, 96, 130, 72]], '1s', { keyTimes: '0;.5;1', extra: `<path d="M4 -4 L20 -22" stroke="${C.tinta}" stroke-width="3" stroke-linecap="round"/><circle cx="20" cy="-22" r="2.6" fill="${C.marca}" stroke="${C.tinta}" stroke-width="1.5"/>` })}
  ${[[124, 24, 0], [140, 46, .5]].map(([x, y, b]) => `<g fill="${C.marca}" stroke="${C.tinta}" stroke-width="1.4"><path d="M${x} ${y} v-14 l8 -3 v12" fill="none" stroke="${C.marca}" stroke-width="2.4"/><circle cx="${x - 3}" cy="${y}" r="3.4"/><circle cx="${x + 5}" cy="${y - 3}" r="3.4"/><animateTransform attributeName="transform" type="translate" values="0 6;4 -10" dur="1.6s" begin="${b}s" repeatCount="indefinite"/><animate attributeName="opacity" values="0;1;0" dur="1.6s" begin="${b}s" repeatCount="indefinite"/></g>`).join('')}
  </g>`, 'yac-agentes');

// 3. Auditoría de visibilidad: recorre las barras con una lupa grande
const lupaF = [[80, 106, 100, 104, 116, 86, 124, 40], [80, 106, 100, 108, 118, 96, 126, 70], [80, 106, 100, 112, 118, 108, 126, 100], [80, 106, 100, 116, 118, 124, 126, 128], [80, 106, 100, 104, 116, 86, 124, 40]];
const visible = svg('0 0 150 150', `
  ${luz(66, 86, 60, C.blanco, .5)}
  <g transform="translate(4 8)">
  ${brazo('yv-a', [[44, 104, 34, 112, 30, 122, 40, 128]], '4s')}
  ${cuerpo('v', { mirada: 'values="1 -3;1 0;1 3;1 5;1 -3" dur="4s" repeatCount="indefinite"' })}
  ${brazo('yv-b', lupaF, '4s', { keyTimes: '0;.25;.5;.75;1', extra: `<path d="M3 -4 L10 -12" stroke="${C.tinta}" stroke-width="5" stroke-linecap="round"/><circle cx="18" cy="-20" r="12" fill="${C.blanco}" fill-opacity=".55" stroke="${C.tinta}" stroke-width="3.4"/><path d="M12 -26 a8 8 0 0 1 9 -2" fill="none" stroke="${C.blanco}" stroke-width="2.4" stroke-linecap="round"/>` })}
  </g>`, 'yac-visible');

// 4. Automatizaciones: tipea en la compu con los dos brazos y giran los engranajes
const engranaje = (cx, cy, r, dur, sentido, color) => {
  const dientes = Array.from({ length: 8 }, (_, i) => `<rect x="${-r * .22}" y="${-r - 4}" width="${r * .44}" height="8" rx="1.5" transform="rotate(${i * 45})"/>`).join('');
  return `<g transform="translate(${cx} ${cy})"><g fill="${color}" stroke="${C.tinta}" stroke-width="2">${dientes}<circle r="${r}"/><circle r="${r * .38}" fill="${C.tinta}"/><animateTransform attributeName="transform" type="rotate" from="0" to="${sentido * 360}" dur="${dur}" repeatCount="indefinite"/></g></g>`;
};
const tecla = (a, b) => [[a[0], a[1], a[2], a[3], a[4], a[5], a[6], a[7]], [b[0], b[1], b[2], b[3], b[4], b[5], b[6], b[7]], [a[0], a[1], a[2], a[3], a[4], a[5], a[6], a[7]]];
const flujo = svg('0 0 172 150', `
  ${luz(66, 86, 60, C.marca, .16)}
  ${engranaje(140, 22, 10, '3s', 1, C.panza)}${engranaje(158, 40, 6.5, '2s', -1, C.marca)}
  <g transform="translate(-6 10)">
  ${brazo('yf-a', tecla([44, 104, 60, 130, 104, 130, 126, 118], [44, 104, 60, 134, 104, 138, 128, 124]), '.36s')}
  ${cuerpo('f', { mirada: 'values="3 3;3 3" dur="1s" repeatCount="indefinite"' })}
  <rect x="122" y="66" width="52" height="40" rx="4" fill="${C.tinta}" stroke="${C.crema}" stroke-width="2"/>
  <rect x="127" y="71" width="42" height="30" rx="2" fill="#2E3A16"/>
  <path d="M131 78 h26 M131 85 h18 M131 92 h30" stroke="${C.marca}" stroke-width="2.6" stroke-linecap="round" stroke-dasharray="0 40"><animate attributeName="stroke-dasharray" values="0 40;40 0;40 0" keyTimes="0;.7;1" dur="1.4s" repeatCount="indefinite"/></path>
  <path d="M112 106 L182 106 L176 118 L106 118 Z" fill="${C.crema}" ${T}/>
  <path d="M118 111 h50" stroke="${C.tinta}" stroke-width="1.6" stroke-dasharray="3 3"/>
  ${brazo('yf-b', tecla([80, 106, 100, 128, 130, 128, 150, 114], [80, 106, 100, 132, 130, 136, 152, 120]), '.36s', { keyTimes: '0;.5;1' })}
  </g>`, 'yac-flujo');

// 5. Saludo del encabezado de Productos (solo PC): mira hacia el título, saluda y titilan estrellas
const estrella = (x, y, r, b, color) => `<path d="M${x} ${y - r} Q${x} ${y} ${x + r} ${y} Q${x} ${y} ${x} ${y + r} Q${x} ${y} ${x - r} ${y} Q${x} ${y} ${x} ${y - r}Z" fill="${color}"><animateTransform attributeName="transform" type="rotate" values="0 ${x} ${y};90 ${x} ${y}" dur="3s" begin="${b}s" repeatCount="indefinite"/><animate attributeName="opacity" values=".15;1;.15" dur="2s" begin="${b}s" repeatCount="indefinite"/></path>`;
const saludo = svg('-10 0 190 170', `
  ${luz(96, 100, 64, C.marca, .14)}
  <circle cx="160" cy="34" r="9" fill="${C.panza}" stroke="${C.tinta}" stroke-width="2.4"/><ellipse cx="160" cy="34" rx="16" ry="4.5" fill="none" stroke="${C.marca}" stroke-width="2.4" transform="rotate(-20 160 34)"/>
  ${estrella(70, 10, 6, 0, C.panza)}${estrella(150, 82, 5, .7, C.marca)}${estrella(36, 70, 4, 1.3, C.crema)}${estrella(120, 14, 4, .4, C.crema)}
  <g><animateTransform attributeName="transform" type="translate" values="0 0;0 -3;0 0" dur="1.2s" repeatCount="indefinite" calcMode="spline" keySplines=".45 0 .55 1;.45 0 .55 1"/>
  <g transform="translate(160 26) scale(-1 1)">
  ${brazo('ys-a', [[44, 104, 34, 114, 30, 124, 40, 130]], '1s')}
  ${cuerpo('s', { mirada: 'values="2 -1;2 -1" dur="1s" repeatCount="indefinite"' })}
  ${brazo('ys-b', [[80, 106, 116, 104, 136, 84, 134, 50], [80, 106, 120, 110, 150, 92, 152, 60], [80, 106, 116, 104, 136, 84, 134, 50]], '.9s', { extra: `<path d="M-6 -12 q-4 -4 -2 -9 M2 -14 q2 -5 6 -6" fill="none" stroke="${C.crema}" stroke-width="2" stroke-linecap="round"><animate attributeName="opacity" values="0;1;0" dur=".9s" repeatCount="indefinite"/></path>` })}
  </g></g>`, 'yac-saludo');

const escenas = { wa, agentes, visible, flujo, saludo };
const archivo = path.join(R, 'src/paginas/index.html');
let html = fs.readFileSync(archivo, 'utf8');
for (const [n, s] of Object.entries(escenas)) {
  const re = new RegExp(`<!-- yac:${n} -->[\\s\\S]*?<!-- /yac:${n} -->`);
  const limpio = s.replace(/\n\s*/g, '');
  if (!re.test(html)) { console.error('Falta la marca <!-- yac:' + n + ' --> en index.html'); process.exitCode = 1; continue; }
  html = html.replace(re, `<!-- yac:${n} -->${limpio}<!-- /yac:${n} -->`);
}
fs.writeFileSync(archivo, html);
console.log('Yacarés actualizados:', Object.keys(escenas).join(', '));
