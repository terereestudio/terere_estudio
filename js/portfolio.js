// Portfolio v2. Origen: prototipo portfolio.html
"use strict";
const TODAS = [
  { id: "web", titulo: "Páginas", cursiva: " web", img: "img/v2/silkderma.webp", trabajos: [
    { nombre: "Silkderma Depilación Láser", tipo: "Página web con turnero", texto: "Sitio de servicios con reserva de turnos online.", img: "img/v2/silkderma.webp", href: "https://silkderma.com.ar" },
    { nombre: "Tereré Estudio v1", tipo: "Sitio propio · primera versión", texto: "La primera iteración de este sitio, hecha a mano para la UTN y validada por el W3C. Entrá y recorrela.", img: "img/v2/portfolio/terere-estudio-v1-chica.webp", href: "/v1/" }
    /* Diseños disponibles: sitios terminados, sin la marca del cliente, listos para reservar.
       Para sumar uno: { nombre: "Diseño Aurora", tipo: "Sitio web", texto: "Para estudios y consultorios.", img: "img/v2/portfolio/disponibles/aurora-chica.webp", disponible: true, demo: "/disenos/aurora/" } */
  ]},
  { id: "tienda", titulo: "Tienda", cursiva: " online", img: "img/v2/portfolio/algarrobo-negro-tienda-chica.webp", trabajos: [
    { nombre: "Algarrobo Negro", tipo: "Tienda online", texto: "Tienda online con catálogo, medios de pago y envíos.", img: "img/v2/portfolio/algarrobo-negro-tienda-chica.webp" }
  ]},
  { id: "tableros", oculto: true, titulo: "Dash", cursiva: "boards", img: "", trabajos: [
    { nombre: "Tablero comercial (ejemplo)", tipo: "Tablero de datos", texto: "Ventas, pedidos y canales en una sola pantalla. Datos ficticios.", img: "" }
  ]},
  { id: "branding", titulo: "Bran", cursiva: "ding", img: "img/v2/portfolio/garete-bar-1-chica.webp", marcas: true, trabajos: [
    { nombre: "HR Estudio Jurídico", tipo: "Cliente real", texto: "Logo, paleta, tipografía, tarjetas y piezas para redes.", logo: "img/v2/portfolio/branding/hr-estudio-juridico-logo.webp", galeria: ["img/v2/portfolio/branding/hr-estudio-juridico-1.webp", "img/v2/portfolio/branding/hr-estudio-juridico-2.webp", "img/v2/portfolio/branding/hr-estudio-juridico-3.webp", "img/v2/portfolio/branding/hr-estudio-juridico-4.webp", "img/v2/portfolio/branding/hr-estudio-juridico-5.webp", "img/v2/portfolio/branding/hr-estudio-juridico-6.webp", "img/v2/portfolio/branding/hr-estudio-juridico-7.webp", "img/v2/portfolio/branding/hr-estudio-juridico-8.webp"], pies: ["Logo", "Paleta de colores", "Tipografía", "Ícono para la web", "Tarjeta de presentación", "Perfil de Instagram", "Historias de efemérides", "Historias informativas"] },
    { nombre: "Garete Bar", tipo: "Marca ficticia", texto: "Bar con identidad manuscrita: logo, paleta, uniforme y promo.", logo: "img/v2/portfolio/branding/garete-bar-logo.webp", galeria: ["img/v2/portfolio/branding/garete-bar-1.webp", "img/v2/portfolio/branding/garete-bar-2.webp", "img/v2/portfolio/branding/garete-bar-3.webp", "img/v2/portfolio/branding/garete-bar-4.webp"], pies: ["Logo", "Paleta de colores", "Uniforme", "Flyer de promoción"] },
    { nombre: "Panadería Carmona", tipo: "Marca ficticia", texto: "Panadería de barrio: logo, tipografía, uniforme y packaging.", logo: "img/v2/portfolio/branding/panaderia-carmona-logo.webp", galeria: ["img/v2/portfolio/branding/panaderia-carmona-1.webp", "img/v2/portfolio/branding/panaderia-carmona-2.webp", "img/v2/portfolio/branding/panaderia-carmona-3.webp", "img/v2/portfolio/branding/panaderia-carmona-4.webp"], pies: ["Logo", "Tipografía", "Uniformes", "Bolsa de papel"] },
    { nombre: "R. E. San Francisco de Asís", tipo: "Marca ficticia", texto: "Reserva ecológica: logo, paleta, uniforme y cartelería.", logo: "img/v2/portfolio/branding/reserva-san-francisco-logo.webp", galeria: ["img/v2/portfolio/branding/reserva-san-francisco-1.webp", "img/v2/portfolio/branding/reserva-san-francisco-2.webp", "img/v2/portfolio/branding/reserva-san-francisco-3.webp", "img/v2/portfolio/branding/reserva-san-francisco-4.webp"], pies: ["Logo", "Paleta de colores", "Uniformes", "Cartelería"] },
    { nombre: "Caribaux Caza & Pesca", tipo: "Marca ficticia", texto: "Tienda outdoor: logo, paleta y piezas para redes.", logo: "img/v2/portfolio/branding/caribaux-caza-pesca-logo.webp", galeria: ["img/v2/portfolio/branding/caribaux-caza-pesca-1.webp", "img/v2/portfolio/branding/caribaux-caza-pesca-2.webp", "img/v2/portfolio/branding/caribaux-caza-pesca-3.webp", "img/v2/portfolio/branding/caribaux-caza-pesca-4.webp"], pies: ["Logo", "Paleta de colores", "Post motivacional", "Post de equipamiento"] },
    { nombre: "Supermercados Farelli", tipo: "Marca ficticia", texto: "Supermercado familiar: logo, paleta, tipografía y aplicación.", logo: "img/v2/portfolio/branding/supermercados-farelli-logo.webp", galeria: ["img/v2/portfolio/branding/supermercados-farelli-1.webp", "img/v2/portfolio/branding/supermercados-farelli-2.webp", "img/v2/portfolio/branding/supermercados-farelli-3.webp", "img/v2/portfolio/branding/supermercados-farelli-4.webp"], pies: ["Logo", "Paleta de colores", "Tipografía", "Aplicación de marca"] },
    { nombre: "Cardano Transporte", tipo: "Marca ficticia", texto: "Empresa de logística: logo, paleta, valores y flota.", logo: "img/v2/portfolio/branding/cardano-transporte-logo.webp", galeria: ["img/v2/portfolio/branding/cardano-transporte-1.webp", "img/v2/portfolio/branding/cardano-transporte-2.webp", "img/v2/portfolio/branding/cardano-transporte-3.webp", "img/v2/portfolio/branding/cardano-transporte-4.webp"], pies: ["Logo", "Paleta de colores", "Valores de la empresa", "Camión de la flota"] },
  ]},
  { id: "contenido", titulo: "Conte", cursiva: "nido", img: "img/v2/portfolio/pieza-01-chica.webp", piezas: true, trabajos: [
    { nombre: "Basílica de Itatí", tipo: "Folleto · 4:5", texto: "Información para peregrinos: horarios de misas y servicios.", img: "img/v2/portfolio/contenido/basilica-itati-chica.webp", grande: "img/v2/portfolio/contenido/basilica-itati.webp" },
    { nombre: "Mercado Municipal Navideño", tipo: "Historia · 9:16", texto: "Difusión del mercado navideño para redes.", img: "img/v2/portfolio/contenido/mercado-navideno-chica.webp", grande: "img/v2/portfolio/contenido/mercado-navideno.webp" },
    { nombre: "Becas para pueblos originarios", tipo: "Folleto · 4:5", texto: "Pieza informativa sobre la convocatoria de becas.", img: "img/v2/portfolio/contenido/becas-pueblos-originarios-chica.webp", grande: "img/v2/portfolio/contenido/becas-pueblos-originarios.webp" },
    { nombre: "Branding de YPF", tipo: "Folleto · 4:5", texto: "Portada para una nota del blog sobre identidad de marca.", img: "img/v2/portfolio/contenido/branding-ypf-chica.webp", grande: "img/v2/portfolio/contenido/branding-ypf.webp" },
    { nombre: "24 de marzo", tipo: "Historia · 9:16", texto: "Efeméride: Día de la Memoria por la Verdad y la Justicia.", img: "img/v2/portfolio/contenido/efemerides-24-marzo-chica.webp", grande: "img/v2/portfolio/contenido/efemerides-24-marzo.webp" },
    { nombre: "Bálsamos de frutilla", tipo: "Folleto · 4:5", texto: "Oferta de producto para redes.", img: "img/v2/portfolio/contenido/balsamos-frutilla-chica.webp", grande: "img/v2/portfolio/contenido/balsamos-frutilla.webp" },
    { nombre: "Torno para uñas · City Girl", tipo: "Historia · 9:16", texto: "Promoción de aniversario con precios y descuentos.", img: "img/v2/portfolio/contenido/torno-city-girl-chica.webp", grande: "img/v2/portfolio/contenido/torno-city-girl.webp" },
    { nombre: "Ofertas semanales", tipo: "Folleto · 4:5", texto: "Ofertas de la semana de accesorios y bijou.", img: "img/v2/portfolio/contenido/ofertas-semanales-chica.webp", grande: "img/v2/portfolio/contenido/ofertas-semanales.webp" },
    { nombre: "Medios de pago · IPRI Bijou", tipo: "Historia · 9:16", texto: "Historia fija con los medios de pago de la tienda.", img: "img/v2/portfolio/contenido/medios-de-pago-ipri-chica.webp", grande: "img/v2/portfolio/contenido/medios-de-pago-ipri.webp" },
    { nombre: "Anillos · IPRI Bijou", tipo: "Historia · 9:16", texto: "Mockup de producto para redes.", img: "img/v2/portfolio/contenido/anillos-ipri-chica.webp", grande: "img/v2/portfolio/contenido/anillos-ipri.webp" },
    { nombre: "Esmalte Cherimoya", tipo: "Historia · 9:16", texto: "Pieza de producto para historias de Instagram.", img: "img/v2/portfolio/contenido/esmalte-cherimoya-chica.webp", grande: "img/v2/portfolio/contenido/esmalte-cherimoya.webp" },
    { nombre: "Escarapelas · IPRI Bijou", tipo: "Folleto · 4:5", texto: "Producto para las fechas patrias.", img: "img/v2/portfolio/contenido/escarapelas-ipri-chica.webp", grande: "img/v2/portfolio/contenido/escarapelas-ipri.webp" },
    { nombre: "Rebaja · Algarrobo Negro", tipo: "Folleto · 4:5", texto: "Promoción de remeras para la tienda online.", img: "img/v2/portfolio/contenido/remera-algarrobo-negro-chica.webp", grande: "img/v2/portfolio/contenido/remera-algarrobo-negro.webp" },
    { nombre: "Piscina Party", tipo: "Folleto · 4:5", texto: "Flyer para un evento (ejercicio de diseño).", img: "img/v2/portfolio/contenido/piscina-party-chica.webp", grande: "img/v2/portfolio/contenido/piscina-party.webp" },
    { nombre: "12 de octubre", tipo: "Historia · 9:16", texto: "Efeméride: Día del Respeto a la Diversidad Cultural.", img: "img/v2/portfolio/contenido/efemerides-12-octubre-chica.webp", grande: "img/v2/portfolio/contenido/efemerides-12-octubre.webp" },
    { nombre: "Historia: Sérum TEI", tipo: "Historia animada", texto: "Pieza animada para historias de Instagram.", video: "video/v2/historia-serum-tei", img: "video/v2/historia-serum-tei.webp" },
    { nombre: "Historia: Agua micelar Algabo", tipo: "Historia animada", texto: "Pieza animada para historias de Instagram.", video: "video/v2/historia-agua-micelar-algabo", img: "video/v2/historia-agua-micelar-algabo.webp" }
  ]}
];
const CATEGORIAS = TODAS.filter(c => !c.oculto); // Dashboards: oculto por ahora
const el = (tag, cls, txt) => { const e = document.createElement(tag); if (cls) e.className = cls; if (txt !== undefined) e.textContent = txt; return e; };
const total = CATEGORIAS.reduce((n, c) => n + c.trabajos.length, 0);
const T = (es, vars) => I18N.t(es, vars);
// Textos que se muestran más tarde (al abrir paneles): se registran para poder traducirlos
I18N.registrar([].concat(...TODAS.map(c => [c.titulo + c.cursiva, ...c.trabajos.flatMap(t => [t.nombre, t.tipo, t.texto, ...(t.pies || [])])])));
I18N.registrar(["trabajos", "categorías", "trabajo", "próximamente", "imagen {a} de {b}", "Imagen anterior", "Imagen siguiente", "Cerrar ×", "Ver en grande: {x}", "Vista de {x}", "captura pendiente", "Pieza en grande", "Cerrar", "Pieza anterior", "Pieza siguiente", "{a} de {b}", "Logo de {x}", "Ver la identidad de {x}", "Cerrar y volver al carrusel", "{n} piezas", "Identidad de {x}", "pieza {n}", "Diseño disponible", "libre para reservar", "Ver el diseño", "Reservar este diseño →", "Hola Leonardo, quiero reservar el diseño {x} para mi negocio."]);
// Título de categoría: en español se respeta el corte original (Bran<em>ding</em>); en otros idiomas va en cursiva la última palabra
function tituloCat(c, h) {
  h.replaceChildren();
  if (I18N.idioma === "es") { h.append(document.createTextNode(c.titulo), el("em", "", c.cursiva)); return; }
  const palabras = T(c.titulo + c.cursiva).trim().split(/\s+/);
  const ult = palabras.pop();
  if (palabras.length) h.append(document.createTextNode(palabras.join(" ") + " "));
  h.append(el("em", "", ult));
}
const cifras = document.getElementById("cifras");
const dibujarCifras = () => cifras.replaceChildren(...[[String(total).padStart(2, "0"), T("trabajos")], [String(CATEGORIAS.length).padStart(2, "0"), T("categorías")]].map(([n, t]) => { const d = el("div"); d.append(el("b", "", n), el("span", "mono", t)); return d; }));
dibujarCifras();

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
function dibujarGrilla() {
grilla.replaceChildren();
CATEGORIAS.forEach((c, i) => {
  const b = el("button", "categoria"); b.dataset.cat = c.id; b.type = "button"; b.setAttribute("aria-expanded", "false"); b.setAttribute("aria-controls", "panel-zona");
  b.style.setProperty("--i", String(i)); // desfasa el vaivén de cada tarjeta
  const fig = el("div", "categoria-img" + (c.img ? "" : " vacia"));
  if (c.img) { const img = el("img"); img.src = c.img; img.alt = ""; img.loading = "eager"; /* las 4 portadas se ven al abrir la página */ fig.append(img); } else fig.append(el("span", "", T("próximamente")));
  const pie = el("div", "categoria-pie");
  const izq = el("div"); izq.append(el("span", "num", String(i + 1).padStart(2, "0")));
  const h = el("h2"); tituloCat(c, h); izq.append(h);
  const der = el("span", "num"); der.append(document.createTextNode(c.trabajos.length + " " + T(c.trabajos.length === 1 ? "trabajo" : "trabajos") + " ")); der.append(el("span", "flecha", "→"));
  if (abierta === c.id) b.setAttribute("aria-expanded", "true");
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
}
dibujarGrilla();
function carruselMini(t) {
  const caja = el("div", "trabajo-img mini");
  const pista = el("div", "mini-pista");
  t.imgs.forEach((src, i) => { const img = el("img"); img.src = src; img.alt = T(t.nombre) + ", " + T("imagen {a} de {b}", { a: i + 1, b: t.imgs.length }); img.loading = "lazy"; pista.append(img); });
  const ant = el("button", "mini-flecha ant", "←"); ant.type = "button"; ant.setAttribute("aria-label", T("Imagen anterior"));
  const sig = el("button", "mini-flecha sig", "→"); sig.type = "button"; sig.setAttribute("aria-label", T("Imagen siguiente"));
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
  const h = el("h2"); tituloCat(c, h);
  const cerrar = el("button", "cerrar-panel", T("Cerrar ×")); cerrar.type = "button"; cerrar.addEventListener("click", () => abrir(c, boton));
  cab.append(h, cerrar);
  const lista = el("div", "trabajos" + (c.piezas ? " piezas" : "") + (c.marcas ? " marcas" : ""));
  const conVisor = c.trabajos.filter(t => t.grande);
  (c.marcas ? [] : c.trabajos).forEach(t => {
    const a = t.imgs || t.disponible ? el("div", "trabajo" + (t.disponible ? " disponible" : "")) : t.grande ? el("button", "trabajo") : el("a", "trabajo");
    if (t.grande) { a.type = "button"; a.setAttribute("aria-label", T("Ver en grande: {x}", { x: T(t.nombre) })); a.addEventListener("click", () => verPieza(conVisor, conVisor.indexOf(t), a)); }
    else if (!t.imgs && !t.disponible) { a.href = t.href || "#"; if (/^https?:/.test(t.href || "")) { a.target = "_blank"; a.rel = "noopener noreferrer"; } }
    let fig;
    if (t.video) {
      fig = el("div", "trabajo-img video");
      const v = el("video"); v.muted = true; v.loop = true; v.playsInline = true; v.preload = "none"; v.poster = t.img; v.setAttribute("aria-label", T(t.nombre));
      ["webm", "mp4"].forEach(ext => { const so = el("source"); so.src = t.video + "." + ext; so.type = "video/" + ext; v.append(so); });
      fig.append(v);
      if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) new IntersectionObserver(([e]) => { if (e.isIntersecting) v.play().catch(() => {}); else v.pause(); }, { threshold: 0.4 }).observe(v);
    }
    else if (t.imgs) fig = carruselMini(t);
    else {
      fig = el("div", "trabajo-img" + (t.img ? "" : " vacia") + (t.grande ? " pieza" : ""));
      if (t.img) { const img = el("img"); img.src = t.img; img.alt = T("Vista de {x}", { x: T(t.nombre) }); img.loading = "lazy"; fig.append(img); } else fig.textContent = T("captura pendiente");
    }
    const meta = el("p", "mono"); meta.append(el("span", "", T(t.tipo)));
    if (t.disponible) { fig.append(el("span", "sello-disponible", T("Diseño disponible"))); meta.append(el("span", "", T("libre para reservar"))); }
    a.append(fig, meta, el("h3", "", T(t.nombre)), el("p", "", T(t.texto)));
    if (t.disponible) {
      const acc = el("div", "disponible-acciones");
      if (t.demo) { const v = el("a", "boton-borde", T("Ver el diseño")); v.href = t.demo; v.target = "_blank"; v.rel = "noopener"; acc.append(v); }
      const r = el("a", "boton", T("Reservar este diseño →")); r.href = "https://wa.me/5493644328260?text=" + encodeURIComponent(T("Hola Leonardo, quiero reservar el diseño {x} para mi negocio.", { x: T(t.nombre) })); r.target = "_blank"; r.rel = "noopener noreferrer";
      acc.append(r); a.append(acc);
    }
    lista.append(a);
  });
  panel.append(cab, c.marcas ? carruselMarcas(c) : lista);
  zona.append(panel);
  panel.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" });
}

// Visor de piezas de contenido: la imagen en grande, con anterior / siguiente
const visor = document.createElement("dialog");
visor.className = "visor-pieza";
visor.innerHTML = '<figure><img alt=""><figcaption><b></b><span class="mono"></span></figcaption></figure><button type="button" class="visor-cerrar">×</button><button type="button" class="visor-flecha ant">←</button><button type="button" class="visor-flecha sig">→</button>';
document.body.append(visor);
const etiquetasVisor = () => {
  visor.setAttribute("aria-label", T("Pieza en grande"));
  visor.querySelector(".visor-cerrar").setAttribute("aria-label", T("Cerrar"));
  visor.querySelector(".ant").setAttribute("aria-label", T("Pieza anterior"));
  visor.querySelector(".sig").setAttribute("aria-label", T("Pieza siguiente"));
};
etiquetasVisor();
let visorLista = [], visorI = 0, visorOrigen = null;
const mostrarPieza = n => {
  visorI = (n + visorLista.length) % visorLista.length;
  const t = visorLista[visorI], img = visor.querySelector("img");
  img.src = t.grande; img.alt = [T(t.nombre), T(t.texto)].filter(Boolean).join(". ");
  visor.querySelector("b").textContent = T(t.nombre);
  visor.querySelector("figcaption .mono").textContent = [T(t.tipo), T("{a} de {b}", { a: visorI + 1, b: visorLista.length })].filter(Boolean).join(" · ");
};
function verPieza(lista, i, origen) { visorLista = lista; visorOrigen = origen; mostrarPieza(i); visor.showModal(); }
visor.querySelector(".visor-cerrar").addEventListener("click", () => visor.close());
visor.querySelector(".ant").addEventListener("click", () => mostrarPieza(visorI - 1));
visor.querySelector(".sig").addEventListener("click", () => mostrarPieza(visorI + 1));
visor.addEventListener("click", e => { if (e.target === visor) visor.close(); });
visor.addEventListener("keydown", e => { if (e.key === "ArrowRight") mostrarPieza(visorI + 1); if (e.key === "ArrowLeft") mostrarPieza(visorI - 1); });
visor.addEventListener("close", () => { visor.querySelector("img").removeAttribute("src"); if (visorOrigen) visorOrigen.focus(); });
let visorX = null;
visor.addEventListener("pointerdown", e => { visorX = e.clientX; });
visor.addEventListener("pointerup", e => { if (visorX === null) return; const dx = e.clientX - visorX; visorX = null; if (Math.abs(dx) > 50) mostrarPieza(visorI + (dx < 0 ? 1 : -1)); });


// Branding: carrusel de logos que pasan solos. Al tocar uno, el carrusel se frena, el logo queda
// a la izquierda (arriba en el celular) y se despliega a la derecha el panel con las piezas de la marca.
function carruselMarcas(c) {
  const escena = el("div", "marcas-escena");
  const cinta = el("div", "marcas-cinta");
  const pista = el("div", "marcas-pista");
  pista.style.setProperty("--n", c.trabajos.length);
  const logo = (t, copia) => {
    const b = el("button", "marca-logo"); b.type = "button";
    const img = el("img"); img.src = t.logo; img.alt = copia ? "" : T("Logo de {x}", { x: T(t.nombre) }); img.loading = "lazy"; b.append(img);
    if (copia) { b.tabIndex = -1; b.setAttribute("aria-hidden", "true"); } else b.setAttribute("aria-label", T("Ver la identidad de {x}", { x: T(t.nombre) }));
    b.addEventListener("click", () => elegir(t));
    return b;
  };
  // Dos vueltas de logos para que la cinta sea continua
  c.trabajos.forEach(t => pista.append(logo(t, false)));
  c.trabajos.forEach(t => pista.append(logo(t, true)));
  cinta.append(pista);

  const detalle = el("div", "marca-detalle"); detalle.hidden = true;
  const lado = el("div", "marca-lado"); const ladoImg = el("img"); ladoImg.alt = ""; lado.append(ladoImg);
  const caja = el("section", "marca-panel");
  const cab = el("header", "marca-panel-cab");
  const h = el("h3"), cuenta = el("p", "mono"), cerrar = el("button", "marca-cerrar", "×");
  cerrar.type = "button"; cerrar.setAttribute("aria-label", T("Cerrar y volver al carrusel"));
  const textos = el("div"); textos.append(h, cuenta); cab.append(textos, cerrar);
  const piezas = el("div", "marca-piezas");
  caja.append(cab, piezas); detalle.append(lado, caja);
  escena.append(cinta, detalle);

  let origen = null;
  function elegir(t) {
    origen = document.activeElement;
    const nom = T(t.nombre), pie = k => T(t.pies[k]) || T("pieza {n}", { n: k + 1 });
    ladoImg.src = t.logo; ladoImg.alt = T("Logo de {x}", { x: nom });
    h.textContent = nom; cuenta.textContent = T("{n} piezas", { n: t.galeria.length });
    caja.setAttribute("aria-label", T("Identidad de {x}", { x: nom }));
    const lista = t.galeria.map((src, k) => ({ grande: src, nombre: `${nom}: ${pie(k)}`, tipo: T(t.pies[k]) || "", texto: "" }));
    piezas.replaceChildren(...t.galeria.map((src, k) => {
      const b = el("button", "marca-pieza"); b.type = "button"; b.setAttribute("aria-label", T("Ver en grande: {x}", { x: pie(k) }));
      const img = el("img"); img.src = src; img.alt = ""; img.loading = "lazy";
      b.append(img, el("span", "mono", T(t.pies[k]) || ""));
      b.addEventListener("click", () => verPieza(lista, k, b));
      return b;
    }));
    escena.classList.add("con-marca"); cinta.hidden = true; detalle.hidden = false;
    // reinicia la animación de despliegue
    detalle.classList.remove("abriendo"); void detalle.offsetWidth; detalle.classList.add("abriendo");
    cerrar.focus({ preventScroll: true });
    escena.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "nearest" });
  }
  function volver() {
    if (detalle.hidden) return;
    escena.classList.remove("con-marca"); detalle.hidden = true; cinta.hidden = false;
    if (origen && origen.isConnected) origen.focus({ preventScroll: true });
  }
  cerrar.addEventListener("click", volver);
  // Tocar afuera del panel (y del visor de imágenes) lo cierra; Escape también
  document.addEventListener("click", e => { if (!detalle.hidden && escena.isConnected && !e.target.closest(".marca-detalle, .marca-logo, .visor-pieza")) volver(); });
  document.addEventListener("keydown", e => { if (e.key === "Escape" && !detalle.hidden && !document.querySelector(".visor-pieza[open]")) volver(); });
  return escena;
}

// Enlace directo a una categoría: portfolio.html#web abre "Páginas web"
const abrirDesdeAncla = () => { const id = decodeURIComponent(location.hash.slice(1)), c = CATEGORIAS.find(x => x.id === id), b = c && grilla.querySelector(`[data-cat="${id}"]`); if (b && abierta !== id) abrir(c, b); };
abrirDesdeAncla(); addEventListener("hashchange", abrirDesdeAncla);

// Cambio de idioma: se vuelven a dibujar las tarjetas, los datos y el panel abierto
I18N.alCambiar(() => {
  dibujarCifras(); etiquetasVisor();
  const id = abierta; abierta = null; zona.replaceChildren(); dibujarGrilla();
  if (id) { const c = CATEGORIAS.find(x => x.id === id), b = grilla.querySelector(`[data-cat="${id}"]`); if (c && b) { abrir(c, b); } }
});
