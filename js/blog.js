// Blog v2. Origen: prototipo blog.html
"use strict";

// ---------------------------------------------------------------------------
// Textos visibles que arma este script (todo junto acá para poder traducirlo).
// ---------------------------------------------------------------------------
let LOCALE = "es-AR";
const TEXTOS = {
  leer: "leer →",
  hechoIA: "hecho con IA",
  formatoFecha: { day: "numeric", month: "short", year: "numeric" },
};

// Entradas del blog. El orden del arreglo no importa: se ordenan solas por fecha
// (la más nueva primero, a la izquierda), así una entrada nueva cae en su lugar.
const ENTRADAS = [
 {
  "cat": "ia",
  "et": "Inteligencia artificial",
  "fecha": "2026-10-23",
  "titulo": "Microduck: el pequeño robot que acerca la IA al mundo físico",
  "href": "blog/microduck.html",
  "resumen": "Descubrí Microduck, el pequeño robot bípedo de Pollen Robotics que combina inteligencia artificial, aprendizaje por refuerzo y software de código abierto.",
  "img": "img/v2/blog/microduck-chica.webp",
  "ia": true
 },
 {
  "cat": "ia",
  "et": "Inteligencia artificial",
  "fecha": "2026-10-13",
  "titulo": "Las mejores herramientas de inteligencia artificial para programar aplicaciones en 2026",
  "href": "blog/herramientas-ia-programar-aplicaciones.html",
  "resumen": "La inteligencia artificial está transformando la forma en que desarrollamos software. Hoy existen herramientas capaces de sugerir código, analizar proyectos completos, generar interfaces y construir aplicaciones a partir de instrucciones en lenguaje natural.",
  "img": "img/v2/blog/robots-ia-programar-chica.webp",
  "ia": false
 },
 {
  "cat": "ia",
  "et": "Inteligencia artificial",
  "fecha": "2026-10-08",
  "titulo": "Contexto: la nueva moneda de la inteligencia artificial",
  "href": "blog/contexto-inteligencia-artificial.html",
  "resumen": "No todo lo que le damos a una IA vale lo mismo. Entender cómo funciona el contexto puede cambiar completamente la forma en que trabajamos con ella.",
  "img": "img/v2/blog/robot-chica.webp",
  "ia": false
 },
 {
  "cat": "ciberseguridad",
  "et": "Ciberseguridad",
  "fecha": "2026-09-28",
  "titulo": "Ciberseguridad web básica: cómo protegí mi primera página web con Security Headers",
  "href": "blog/ciberseguridad-web-basica-security-headers.html",
  "resumen": "Una primera aproximación a la seguridad web desde la experiencia de un desarrollador junior.",
  "img": "img/v2/blog/ciberseguridad-chica.webp",
  "ia": false
 },
 {
  "cat": "diseno-ux",
  "et": "Diseño UX/UI",
  "fecha": "2026-09-22",
  "titulo": "Minimalismo en el Diseño UX/UI",
  "href": "blog/minimalismo_desarrollo_web.html",
  "resumen": "Es una filosofía que prioriza la claridad, la función y la experiencia del usuario por encima del ruido visual.",
  "img": "img/v2/blog/portada-minimalismo.svg",
  "ia": true
 },
 {
  "cat": "diseno-ux",
  "et": "Diseño UX/UI",
  "fecha": "2026-09-18",
  "titulo": "Rediseñando la mirada: ¿Qué hay detrás del cambio de Google y su salto a la barra lateral?",
  "href": "blog/cambio_google_pestañas.html",
  "resumen": "Si sos de los que entra a Google o navega por la web con frecuencia, es muy probable que hayas notado un cambio sutil pero profundo en la interfaz. Google decidió mover aquellas clásicas pestañas horizontales de la parte superior (Imágenes, Noticias, Videos, etc.) hacia una columna lateral en el lado izquierdo , un movimiento que también resuena con los cambios recientes en la gestión de interfaces y navegadores.",
  "img": "img/v2/blog/portada-pestanas.svg",
  "ia": true
 },
 {
  "cat": "desarrollo-web",
  "et": "Desarrollo web",
  "fecha": "2026-09-15",
  "titulo": "¿Vale la pena aprender a codear en 2026?",
  "href": "blog/valepenaaprendercoding.html",
  "resumen": "Si estás pensando en aprender a programar hay una pregunta que te frena en seco.",
  "img": "img/v2/blog/programador-ia-chica.webp",
  "ia": true
 },
 {
  "cat": "ia",
  "et": "Inteligencia artificial",
  "fecha": "2026-09-14",
  "titulo": "Entrevista con la IA: ¿Nos van a reemplazar?",
  "href": "blog/Entrevista_IA/nos_van_a_reemplazar.html",
  "resumen": "En esta entrevista tendremos repuesta a una de la preguntas más polémicas del siglo XXI según distintas inteligencias artificiales.",
  "img": "img/v2/blog/ia-reemplazar-chica.webp",
  "ia": false
 },
 {
  "cat": "desarrollo-web",
  "et": "Desarrollo web",
  "fecha": "2026-09-14",
  "titulo": "¿Qué es el VibeCoding?",
  "href": "blog/VibeCoding.html",
  "resumen": "Programar con la IA como puente técnico.",
  "img": "img/v2/blog/portada-vibecoding.svg",
  "ia": true
 }
];

const fechaLegible = f => new Date(f + "T12:00:00").toLocaleDateString(LOCALE, TEXTOS.formatoFecha);
const porFechaDesc = (a, b) => b.fecha.localeCompare(a.fecha);

const carril = document.getElementById("entradas");
const zona = carril.closest(".entradas-zona");
const escena = document.querySelector(".blog-escena");
const barraAvance = document.getElementById("progreso");
const btnAnterior = document.getElementById("anterior");
const btnSiguiente = document.getElementById("siguiente");
const escritorio = window.matchMedia("(min-width: 1024px)");
const sinMovimiento = window.matchMedia("(prefers-reduced-motion: reduce)");
let tarjetas = [];

// ---------------------------------------------------------------------------
// Tarjetas
// ---------------------------------------------------------------------------
function dibujar(filtro) {
  carril.replaceChildren();
  const lista = ENTRADAS.filter(e => filtro === "todas" || e.cat === filtro).sort(porFechaDesc);
  tarjetas = lista.map((e, i) => {
    const a = document.createElement("a");
    a.className = "entrada" + (i === 0 ? " destacada" : "");
    a.href = e.href || "#";
    const flote = (-(i * 0.9) % 6) + "s";
    a.style.setProperty("--d", flote);
    a.style.animationDelay = (i * 0.06) + "s, " + flote;
    const fig = document.createElement("div"); fig.className = "entrada-img";
    const img = document.createElement("img"); img.src = e.img; img.alt = ""; img.loading = i < 3 ? "eager" : "lazy"; img.decoding = "async"; img.width = 640; img.height = 400;
    fig.append(img);
    if (e.ia) { const s = document.createElement("span"); s.className = "sello-ia"; s.textContent = TEXTOS.hechoIA; fig.append(s); }
    const c = document.createElement("div"); c.className = "entrada-cuerpo";
    const meta = document.createElement("div"); meta.className = "entrada-meta";
    const chip = document.createElement("span"); chip.className = "chip"; chip.textContent = e.et;
    const t = document.createElement("time"); t.className = "fecha"; t.dateTime = e.fecha; t.textContent = fechaLegible(e.fecha);
    meta.append(chip, t);
    const h = document.createElement("h2"); h.textContent = e.titulo;
    const p = document.createElement("p"); p.textContent = e.resumen;
    const l = document.createElement("span"); l.className = "leer"; l.textContent = TEXTOS.leer;
    c.append(meta, h, p, l);
    a.append(fig, c);
    carril.append(a);
    return a;
  });
  document.getElementById("vacio").hidden = lista.length > 0;
  zona.classList.toggle("sin-entradas", lista.length === 0);
  // Al cambiar de filtro, el carril vuelve al principio
  detener();
  carril.scrollLeft = 0;
  actualizar();
}

// ---------------------------------------------------------------------------
// Carril horizontal: ruedita, flechas, teclado y efecto de salida por los bordes
// ---------------------------------------------------------------------------
const maximo = () => Math.max(0, carril.scrollWidth - carril.clientWidth);
const limitar = (v, a, b) => Math.min(b, Math.max(a, v));

// Desplazamiento suave propio (se acumula con cada giro de la ruedita)
let destino = null, cuadro = 0, moviendoNos = false;
function detener() { cancelAnimationFrame(cuadro); cuadro = 0; destino = null; moviendoNos = false; }
function irA(x) {
  destino = limitar(x, 0, maximo());
  if (sinMovimiento.matches) { carril.scrollLeft = destino; detener(); return; }
  if (!cuadro) cuadro = requestAnimationFrame(paso);
}
function paso() {
  const actual = carril.scrollLeft;
  const falta = destino - actual;
  if (Math.abs(falta) < 1) { moviendoNos = true; carril.scrollLeft = destino; detener(); return; }
  moviendoNos = true;
  carril.scrollLeft = actual + falta * 0.18;
  cuadro = requestAnimationFrame(paso);
}

// La ruedita vertical mueve el carril de costado. Cuando llega a una punta,
// suelta el evento para que la página siga bajando o subiendo como siempre.
escena.addEventListener("wheel", ev => {
  if (!escritorio.matches || ev.ctrlKey || tarjetas.length === 0) return;
  if (Math.abs(ev.deltaX) > Math.abs(ev.deltaY)) { detener(); return; } // gesto horizontal del trackpad: nativo
  const max = maximo();
  if (max <= 0) return;
  const unidad = ev.deltaMode === 1 ? 40 : ev.deltaMode === 2 ? carril.clientWidth : 1;
  const delta = ev.deltaY * unidad;
  const desde = destino ?? carril.scrollLeft;
  if ((delta < 0 && desde <= 0.5) || (delta > 0 && desde >= max - 0.5)) return;
  ev.preventDefault();
  irA(desde + delta);
}, { passive: false });

// Paso de las flechas y del teclado: más o menos una tarjeta
const pasoTarjeta = () => (tarjetas[1] ? tarjetas[1].offsetWidth + 18 : carril.clientWidth * 0.8);
btnAnterior.addEventListener("click", () => irA((destino ?? carril.scrollLeft) - pasoTarjeta()));
btnSiguiente.addEventListener("click", () => irA((destino ?? carril.scrollLeft) + pasoTarjeta()));
carril.addEventListener("keydown", ev => {
  if (ev.target !== carril) return;
  const desde = destino ?? carril.scrollLeft;
  const accion = { ArrowRight: desde + pasoTarjeta(), ArrowLeft: desde - pasoTarjeta(), Home: 0, End: maximo(), PageDown: desde + carril.clientWidth, PageUp: desde - carril.clientWidth }[ev.key];
  if (accion === undefined) return;
  ev.preventDefault();
  irA(accion);
});

// Efecto: cada tarjeta se achica y se desvanece según cuánto sale del carril
let pendiente = false;
function actualizar() {
  pendiente = false;
  const izq = carril.scrollLeft, ancho = carril.clientWidth, max = maximo();
  for (const c of tarjetas) {
    const x = c.offsetLeft - izq, w = c.offsetWidth || 1;
    const porIzq = Math.max(0, -x) / w, porDer = Math.max(0, x + w - ancho) / w;
    const salida = Math.min(1, Math.max(porIzq, porDer));
    c.style.setProperty("--salida", salida.toFixed(3));
    c.style.setProperty("--origen", porIzq > porDer ? "right center" : "left center");
  }
  barraAvance.style.setProperty("--avance", max > 0 ? (izq / max).toFixed(3) : "1");
  btnAnterior.disabled = izq <= 1;
  btnSiguiente.disabled = izq >= max - 1;
}
function pedirActualizacion() { if (!pendiente) { pendiente = true; requestAnimationFrame(actualizar); } }
carril.addEventListener("scroll", () => {
  // Si el que movió fue el usuario (trackpad, dedo, tab), olvidamos nuestro destino
  if (!moviendoNos && cuadro) detener();
  moviendoNos = false;
  pedirActualizacion();
}, { passive: true });
window.addEventListener("resize", pedirActualizacion);

// ---------------------------------------------------------------------------
// Filtros
// ---------------------------------------------------------------------------
dibujar("todas");
document.querySelectorAll(".filtro").forEach(b => b.addEventListener("click", () => {
  document.querySelectorAll(".filtro").forEach(o => o.setAttribute("aria-pressed", String(o === b)));
  dibujar(b.dataset.filtro);
}));

// Código de fondo
const lineas = ["const blog = new Blog('tereré');", "blog.publicar({ tema: 'ia' });", "if (aprendo) compartir();", "<article class=\"entrada\">", "  <h2>Lo nuevo</h2>", "</article>", "fetch('/ideas').then(escribir);", "// código puro, hecho en Corrientes", "await pensar(cafe + tereré);", "export default curiosidad;", "while (true) { aprender(); }", "git commit -m \"nueva entrada\""];
let txt = ""; for (let i = 0; i < 80; i++) txt += lineas[(i * 7) % lineas.length].padStart(20 + (i * 13) % 50) + "\n";
document.getElementById("codigo").textContent = txt + txt;
