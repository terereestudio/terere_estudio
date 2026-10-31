// Portfolio v2. Origen: prototipo portfolio.html
"use strict";
const TODAS = [
  { id: "web", titulo: "Páginas", cursiva: " web", img: "img/v2/silkderma.webp", trabajos: [
    { nombre: "Silkderma Depilación Láser", tipo: "Página web con turnero", texto: "Sitio de servicios con reserva de turnos online.", img: "img/v2/silkderma.webp", href: "https://silkderma.com.ar" },
    { nombre: "HR Estudio Jurídico", tipo: "Identidad y landing page", texto: "Identidad visual completa y landing page en código.", img: "img/v2/portfolio/hr-estudio-juridico-landing-chica.webp" },
    { nombre: "Tereré Estudio v1", tipo: "Sitio propio", texto: "Primera versión de este sitio, validada por el W3C.", img: "img/v2/portfolio/terere-estudio-v1-chica.webp" }
  ]},
  { id: "tienda", titulo: "Tienda", cursiva: " online", img: "img/v2/portfolio/algarrobo-negro-tienda-chica.webp", trabajos: [
    { nombre: "Algarrobo Negro", tipo: "Tienda online", texto: "Tienda online con catálogo, medios de pago y envíos.", img: "img/v2/portfolio/algarrobo-negro-tienda-chica.webp" }
  ]},
  { id: "tableros", oculto: true, titulo: "Dash", cursiva: "boards", img: "", trabajos: [
    { nombre: "Tablero comercial (ejemplo)", tipo: "Tablero de datos", texto: "Ventas, pedidos y canales en una sola pantalla. Datos ficticios.", img: "" }
  ]},
  { id: "branding", titulo: "Bran", cursiva: "ding", img: "img/v2/portfolio/garete-bar-1-chica.webp", trabajos: [
    { nombre: "Garete Bar", tipo: "Marca ficticia", texto: "Ejercicio de identidad visual y aplicaciones.", img: "img/v2/portfolio/garete-bar-1-chica.webp", imgs: ["img/v2/portfolio/garete-bar-1-chica.webp", "img/v2/portfolio/garete-bar-2-chica.webp", "img/v2/portfolio/garete-bar-3-chica.webp", "img/v2/portfolio/garete-bar-4-chica.webp"] },
    { nombre: "Panadería Carmona", tipo: "Marca ficticia", texto: "Ejercicio de identidad visual y aplicaciones.", img: "img/v2/portfolio/panaderia-carmona-1-chica.webp", imgs: ["img/v2/portfolio/panaderia-carmona-1-chica.webp", "img/v2/portfolio/panaderia-carmona-2-chica.webp", "img/v2/portfolio/panaderia-carmona-3-chica.webp", "img/v2/portfolio/panaderia-carmona-4-chica.webp"] },
    { nombre: "R. E. San Francisco de Asís", tipo: "Marca ficticia", texto: "Ejercicio de identidad visual y aplicaciones.", img: "img/v2/portfolio/reserva-san-francisco-1-chica.webp", imgs: ["img/v2/portfolio/reserva-san-francisco-1-chica.webp", "img/v2/portfolio/reserva-san-francisco-2-chica.webp", "img/v2/portfolio/reserva-san-francisco-3-chica.webp", "img/v2/portfolio/reserva-san-francisco-4-chica.webp"] },
    { nombre: "Caribaux Caza & Pesca", tipo: "Marca ficticia", texto: "Ejercicio de identidad visual y aplicaciones.", img: "img/v2/portfolio/caribaux-caza-pesca-1-chica.webp", imgs: ["img/v2/portfolio/caribaux-caza-pesca-1-chica.webp", "img/v2/portfolio/caribaux-caza-pesca-2-chica.webp", "img/v2/portfolio/caribaux-caza-pesca-3-chica.webp", "img/v2/portfolio/caribaux-caza-pesca-4-chica.webp"] },
    { nombre: "Supermercados Farelli", tipo: "Marca ficticia", texto: "Ejercicio de identidad visual y aplicaciones.", img: "img/v2/portfolio/supermercados-farelli-1-chica.webp", imgs: ["img/v2/portfolio/supermercados-farelli-1-chica.webp", "img/v2/portfolio/supermercados-farelli-2-chica.webp", "img/v2/portfolio/supermercados-farelli-3-chica.webp", "img/v2/portfolio/supermercados-farelli-4-chica.webp"] },
    { nombre: "Cardano Transporte", tipo: "Marca ficticia", texto: "Ejercicio de identidad visual y aplicaciones.", img: "img/v2/portfolio/cardano-transporte-1-chica.webp", imgs: ["img/v2/portfolio/cardano-transporte-1-chica.webp", "img/v2/portfolio/cardano-transporte-2-chica.webp", "img/v2/portfolio/cardano-transporte-3-chica.webp", "img/v2/portfolio/cardano-transporte-4-chica.webp"] }
  ]},
  { id: "contenido", titulo: "Conte", cursiva: "nido", img: "img/v2/portfolio/pieza-01-chica.webp", trabajos: [
    { nombre: "Flyers y piezas para redes", tipo: "Diseño gráfico · 12 piezas", texto: "Flyers e historias para redes, para clientes y proyectos propios.", img: "img/v2/portfolio/pieza-01-chica.webp", imgs: ["img/v2/portfolio/pieza-01-chica.webp", "img/v2/portfolio/pieza-02-chica.webp", "img/v2/portfolio/pieza-03-chica.webp", "img/v2/portfolio/pieza-04-chica.webp", "img/v2/portfolio/pieza-05-chica.webp", "img/v2/portfolio/pieza-06-chica.webp", "img/v2/portfolio/pieza-07-chica.webp", "img/v2/portfolio/pieza-08-chica.webp", "img/v2/portfolio/pieza-09-chica.webp", "img/v2/portfolio/pieza-10-chica.webp", "img/v2/portfolio/pieza-11-chica.webp", "img/v2/portfolio/pieza-12-chica.webp"] },
    { nombre: "Historia: Sérum TEI", tipo: "Historia animada", texto: "Pieza animada para historias de Instagram.", video: "video/v2/historia-serum-tei", img: "video/v2/historia-serum-tei.webp" },
    { nombre: "Historia: Agua micelar Algabo", tipo: "Historia animada", texto: "Pieza animada para historias de Instagram.", video: "video/v2/historia-agua-micelar-algabo", img: "video/v2/historia-agua-micelar-algabo.webp" }
  ]}
];
const CATEGORIAS = TODAS.filter(c => !c.oculto); // Dashboards: oculto por ahora
const el = (tag, cls, txt) => { const e = document.createElement(tag); if (cls) e.className = cls; if (txt !== undefined) e.textContent = txt; return e; };
const total = CATEGORIAS.reduce((n, c) => n + c.trabajos.length, 0);
const cifras = document.getElementById("cifras");
[[String(total).padStart(2, "0"), "trabajos"], [String(CATEGORIAS.length).padStart(2, "0"), "categorías"]].forEach(([n, t]) => { const d = el("div"); d.append(el("b", "", n), el("span", "mono", t)); cifras.append(d); });

const zona = document.getElementById("panel-zona");
const grilla = document.getElementById("categorias");
let abierta = null;
// Inclinación 3D solo con mouse o lápiz (puntero fino) y si la persona no pidió menos movimiento
const puedeInclinar = window.matchMedia("(hover: hover) and (pointer: fine)").matches && !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
function inclinable(b) {
  let cuadro = 0, ultimo = null;
  const limitar = n => Math.max(-1, Math.min(1, n));
  b.addEventListener("pointermove", e => {
    ultimo = e;
    if (cuadro) return;
    cuadro = requestAnimationFrame(() => {
      cuadro = 0;
      const r = b.getBoundingClientRect();
      // --mx y --my van de -1 a 1: el CSS los traduce en giro, brillo y paralaje de la portada
      b.style.setProperty("--mx", limitar(((ultimo.clientX - r.left) / r.width) * 2 - 1).toFixed(3));
      b.style.setProperty("--my", limitar(((ultimo.clientY - r.top) / r.height) * 2 - 1).toFixed(3));
      b.classList.add("inclinando");
    });
  });
  b.addEventListener("pointerleave", () => {
    cancelAnimationFrame(cuadro); cuadro = 0;
    b.classList.remove("inclinando");
    b.style.setProperty("--mx", "0"); b.style.setProperty("--my", "0");
  });
}
CATEGORIAS.forEach((c, i) => {
  const b = el("button", "categoria"); b.type = "button"; b.setAttribute("aria-expanded", "false"); b.setAttribute("aria-controls", "panel-zona");
  b.style.setProperty("--i", String(i)); // desfasa el vaivén de cada tarjeta
  const fig = el("div", "categoria-img" + (c.img ? "" : " vacia"));
  if (c.img) { const img = el("img"); img.src = c.img; img.alt = ""; img.loading = "eager"; /* las 4 portadas se ven al abrir la página */ fig.append(img); } else fig.append(el("span", "", "próximamente"));
  const pie = el("div", "categoria-pie");
  const izq = el("div"); izq.append(el("span", "num", String(i + 1).padStart(2, "0")));
  const h = el("h2"); h.append(document.createTextNode(c.titulo)); const em = el("em", "", c.cursiva); h.append(em); izq.append(h);
  const der = el("span", "num"); der.append(document.createTextNode(c.trabajos.length + (c.trabajos.length === 1 ? " trabajo " : " trabajos "))); der.append(el("span", "flecha", "→"));
  pie.append(izq, der);
  const flota = el("span", "categoria-flota"), tarjeta = el("span", "categoria-tarjeta");
  tarjeta.append(fig, pie, el("span", "categoria-brillo"));
  flota.append(tarjeta);
  const sombra = el("span", "categoria-sombra"); sombra.setAttribute("aria-hidden", "true");
  b.append(sombra, flota);
  if (puedeInclinar) inclinable(b);
  b.addEventListener("click", () => abrir(c, b));
  grilla.append(b);
});
function carruselMini(t) {
  const caja = el("div", "trabajo-img mini");
  const pista = el("div", "mini-pista");
  t.imgs.forEach((src, i) => { const img = el("img"); img.src = src; img.alt = t.nombre + ", imagen " + (i + 1) + " de " + t.imgs.length; img.loading = "lazy"; pista.append(img); });
  const ant = el("button", "mini-flecha ant", "←"); ant.type = "button"; ant.setAttribute("aria-label", "Imagen anterior");
  const sig = el("button", "mini-flecha sig", "→"); sig.type = "button"; sig.setAttribute("aria-label", "Imagen siguiente");
  const puntos = el("div", "mini-puntos"); t.imgs.forEach(() => puntos.append(el("i")));
  const actual = () => Math.round(pista.scrollLeft / pista.clientWidth);
  const ir = n => { const total = t.imgs.length; n = (n + total) % total; pista.scrollTo({ left: n * pista.clientWidth, behavior: "smooth" }); };
  const marcar = () => [...puntos.children].forEach((p, i) => p.classList.toggle("activo", i === actual()));
  ant.addEventListener("click", () => ir(actual() - 1));
  sig.addEventListener("click", () => ir(actual() + 1));
  pista.addEventListener("scroll", () => requestAnimationFrame(marcar), { passive: true });
  caja.append(pista, ant, sig, puntos);
  requestAnimationFrame(marcar);
  return caja;
}
function abrir(c, boton) {
  const misma = abierta === c.id;
  grilla.querySelectorAll(".categoria").forEach(x => x.setAttribute("aria-expanded", "false"));
  zona.replaceChildren();
  abierta = misma ? null : c.id;
  if (misma) return;
  boton.setAttribute("aria-expanded", "true");
  const panel = el("div", "panel");
  const cab = el("div", "panel-cabecera");
  const h = el("h2"); h.append(document.createTextNode(c.titulo)); h.append(el("em", "", c.cursiva));
  const cerrar = el("button", "cerrar-panel", "Cerrar ×"); cerrar.type = "button"; cerrar.addEventListener("click", () => abrir(c, boton));
  cab.append(h, cerrar);
  const lista = el("div", "trabajos");
  c.trabajos.forEach(t => {
    const a = t.imgs ? el("div", "trabajo") : el("a", "trabajo");
    if (!t.imgs) { a.href = t.href || "#"; if (t.href) { a.target = "_blank"; a.rel = "noopener noreferrer"; } }
    let fig;
    if (t.video) {
      fig = el("div", "trabajo-img video");
      const v = el("video"); v.muted = true; v.loop = true; v.playsInline = true; v.preload = "none"; v.poster = t.img; v.setAttribute("aria-label", t.nombre);
      ["webm", "mp4"].forEach(ext => { const so = el("source"); so.src = t.video + "." + ext; so.type = "video/" + ext; v.append(so); });
      fig.append(v);
      if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) new IntersectionObserver(([e]) => { if (e.isIntersecting) v.play().catch(() => {}); else v.pause(); }, { threshold: 0.4 }).observe(v);
    }
    else if (t.imgs) fig = carruselMini(t);
    else {
      fig = el("div", "trabajo-img" + (t.img ? "" : " vacia"));
      if (t.img) { const img = el("img"); img.src = t.img; img.alt = "Vista de " + t.nombre; img.loading = "lazy"; fig.append(img); } else fig.textContent = "captura pendiente";
    }
    const meta = el("p", "mono"); meta.append(el("span", "", t.tipo));
    a.append(fig, meta, el("h3", "", t.nombre), el("p", "", t.texto));
    lista.append(a);
  });
  panel.append(cab, lista);
  zona.append(panel);
  panel.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" });
}
