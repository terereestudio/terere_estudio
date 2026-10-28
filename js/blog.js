// Blog v2. Origen: prototipo blog.html
"use strict";
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
const fechaLegible = f => new Date(f + "T12:00:00").toLocaleDateString("es-AR", { day: "numeric", month: "short", year: "numeric" });
const cont = document.getElementById("entradas");
function dibujar(filtro) {
  cont.replaceChildren();
  const lista = ENTRADAS.filter(e => filtro === "todas" || e.cat === filtro);
  lista.forEach((e, i) => {
    const a = document.createElement("a");
    a.className = "entrada" + (i === 0 ? " destacada" : "");
    a.href = e.href || "#";
    a.style.setProperty("--d", (-(i * 0.9) % 6) + "s");
    a.style.animationDelay = (i * 0.06) + "s, " + (-(i * 0.9) % 6) + "s";
    const fig = document.createElement("div"); fig.className = "entrada-img";
    const img = document.createElement("img"); img.src = e.img; img.alt = ""; img.loading = i < 3 ? "eager" : "lazy"; img.width = 640; img.height = 400;
    fig.append(img);
    if (e.ia) { const s = document.createElement("span"); s.className = "sello-ia"; s.textContent = "hecho con IA"; fig.append(s); }
    const c = document.createElement("div"); c.className = "entrada-cuerpo";
    const meta = document.createElement("div"); meta.className = "entrada-meta";
    const chip = document.createElement("span"); chip.className = "chip"; chip.textContent = e.et;
    const t = document.createElement("time"); t.className = "fecha"; t.dateTime = e.fecha; t.textContent = fechaLegible(e.fecha);
    meta.append(chip, t);
    const h = document.createElement("h2"); h.textContent = e.titulo;
    const p = document.createElement("p"); p.textContent = e.resumen;
    const l = document.createElement("span"); l.className = "leer"; l.textContent = "leer →";
    c.append(meta, h, p, l);
    a.append(fig, c);
    cont.append(a);
  });
  document.getElementById("vacio").hidden = lista.length > 0;
}
dibujar("todas");
document.querySelectorAll(".filtro").forEach(b => b.addEventListener("click", () => {
  document.querySelectorAll(".filtro").forEach(o => o.setAttribute("aria-pressed", String(o === b)));
  dibujar(b.dataset.filtro);
}));

// Código de fondo
const lineas = ["const blog = new Blog('tereré');", "blog.publicar({ tema: 'ia' });", "if (aprendo) compartir();", "<article class=\"entrada\">", "  <h2>Lo nuevo</h2>", "</article>", "fetch('/ideas').then(escribir);", "// código puro, hecho en Corrientes", "await pensar(cafe + tereré);", "export default curiosidad;", "while (true) { aprender(); }", "git commit -m \"nueva entrada\""];
let txt = ""; for (let i = 0; i < 80; i++) txt += lineas[(i * 7) % lineas.length].padStart(20 + (i * 13) % 50) + "\n";
document.getElementById("codigo").textContent = txt + txt;
