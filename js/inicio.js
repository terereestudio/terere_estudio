// Inicio v2. Origen: prototipo terere-v3.html
"use strict";
const WA = "5493644328260";

// ===== Idiomas =====
// El español está en la página. Los demás idiomas viven en idiomas/<código>.json y se cargan
// solo cuando alguien los elige. Cada texto de la página se reconoce solo (por su contenido en
// español), así que si un texto cambia y todavía no tiene traducción, queda en español.
const IDIOMAS = {
  es: { nombre: "Español", lang: "es-AR", buscar: "español castellano spanish espanol" },
  en: { nombre: "English", lang: "en", buscar: "inglés ingles english" },
  pt: { nombre: "Português", lang: "pt-BR", buscar: "portugués portugues portuguese brasil brazil" },
  fr: { nombre: "Français", lang: "fr", buscar: "francés frances french francais" },
  de: { nombre: "Deutsch", lang: "de", buscar: "alemán aleman german deutsch" },
  it: { nombre: "Italiano", lang: "it", buscar: "italiano italian" },
  zh: { nombre: "中文", lang: "zh-CN", buscar: "chino chinese mandarín mandarin zhongwen" },
  ja: { nombre: "日本語", lang: "ja", buscar: "japonés japones japanese nihongo" },
  hi: { nombre: "हिन्दी", lang: "hi", buscar: "hindi hindú indio india" },
  ar: { nombre: "العربية", lang: "ar", dir: "rtl", buscar: "árabe arabe arabic" },
  ru: { nombre: "Русский", lang: "ru", buscar: "ruso russian russkiy" },
  gn: { nombre: "Avañe'ẽ", lang: "gn", beta: true, buscar: "guaraní guarani avanee paraguay" }
};
// Textos que arma el JavaScript (en español). Las traducciones están en la sección "ui" de cada JSON.
const UI = {
  verQueIncluye: "Ver qué incluye", contratar: "Contratar", detTitulo: "{plan}, punto por punto",
  cuantoTarda: "¿Cuánto tarda?", comoPago: "¿Cómo pago?",
  pagoTxt: "Con Mercado Pago (tarjetas, dinero en cuenta y cuotas sin tarjeta) o por transferencia, a convenir.",
  detContratar: "Contratar el {plan}", waDuda: "Hola Leonardo, tengo una duda sobre el {plan}.",
  pago: "Pago", pagoUnico: "{m} único", despues: "Después", entrega: "Entrega", desde: "Desde", mantenimiento: "Mantenimiento",
  aConvenir: "A convenir", segunCatalogo: "Según el catálogo", entrada: "Entrada", cuota: "Cuota",
  cuotaMes: "+ {m} por mes", cambiosDesde: "Cambios posteriores desde {m}", cambiosDefinir: "Cambios posteriores: a definir", mantConvenir: "Mantenimiento a convenir",
  errNombre: "Escribí tu nombre completo para que sepa con quién hablo.", errAcepto: "Para seguir, aceptá el uso de tus datos para responderte.",
  msgConvenir: "Hola Leonardo, quiero contratar el {plan} de Tereré Estudio y coordinar el pago.", msgContrate: "Hola Leonardo, acabo de contratar el {plan} de Tereré Estudio.",
  msgSoy: "Soy {nombre}{rubro}.", tuNombre: "(tu nombre)", msgIdea: "Mi idea: {idea}", msgPago: "Forma de pago: {pago}.",
  escribirLeo: "Escribirle a Leonardo →", yaPague: "Ya pagué: avisarle a Leonardo →", pagarCon: "Pagar con {pago}", noDisponible: "Este medio de pago todavía no está disponible",
  pasosConvenir: ["Tocá el botón y se abre WhatsApp con tu pedido.", "Coordinamos la transferencia o el pago en efectivo.", "Arrancamos con tu proyecto."],
  pasosMP: ["Tocá \"Pagar con Mercado Pago\": te llevamos a Mercado Pago para pagar.", "Al terminar volvés a mi página y me avisás por WhatsApp con un toque.", "Confirmo el pago y arrancamos."],
  pasosNo: ["Este medio de pago todavía no está disponible.", "Elegí Mercado Pago o A convenir."],
  waGeneral: "Hola Leonardo, vi tu página y quiero hacerte una consulta.", waCotizar: "Hola Leonardo, busco algo a mi medida y quiero armar mi proyecto.",
  enlacePendiente: "Enlace pendiente", abrirMenu: "Abrir menú", cerrarMenu: "Cerrar menú", conectandoMP: "Conectando con Mercado Pago…",
  verMas: "Ver más", verMenos: "Ver menos", verX: "Ver {x}",
  productosCortos: ["Asistente", "Agentes", "Auditoría", "Automatiza"],
  frases: ["Tu negocio, abierto las 24 horas.", "Te encuentran en Google y en la IA.", "Vendés incluso mientras dormís.", "Tu marca, con nombre propio en internet."],
  igAlt: "Publicación de Instagram de Tereré Estudio",
  aTitulo: "Título", aTituloDet: "{n} caracteres (ideal: 30 a 65)", aDesc: "Descripción", aDescDet: "{n} caracteres (ideal: 70 a 160)",
  aH1: "Un solo título principal", aH1Det: "{n} H1 en la página", aJerarquia: "Jerarquía de títulos", aSaltos: "Hay saltos de nivel", aOrdenada: "Ordenada, sin saltos",
  aAlt: "Textos alternativos", aAltDet: "{a} de {b} imágenes con descripción", aCanonica: "URL canónica", aDefinida: "Definida", aFalta: "Falta",
  aCompartir: "Vista al compartir", aCompartirOk: "Título e imagen para redes", aCompartirNo: "Falta Open Graph",
  aNegocio: "Negocio identificado", aNegocioDet: "Datos estructurados del estudio", aPlanes: "Planes con precio", aPlanesDet: "Ofertas legibles por la IA",
  aUbicacion: "Ubicación", aUbicacionDet: "Corrientes, para búsquedas locales", aVelocidad: "Velocidad", aCarga: "Carga inicial", aSinDato: "Sin dato",
  aSeguridad: "Seguridad", aConexion: "Conexión segura", aSinHttps: "Sin HTTPS", aCelular: "Apta para celular", aAdaptable: "Diseño adaptable",
  buscarIdioma: "Buscar idioma…", sinIdioma: "No encontré ese idioma", beta: "beta"
};
let DIC = null; // diccionario del idioma elegido (null = español)
const REFRESCAR = []; // funciones que vuelven a dibujar textos armados por JavaScript
function t(clave, vars = {}) {
  const v = (DIC && DIC.ui && DIC.ui[clave] !== undefined) ? DIC.ui[clave] : UI[clave];
  if (Array.isArray(v)) return v;
  return String(v ?? clave).replace(/\{(\w+)\}/g, (_, n) => vars[n] ?? "");
}
const planTx = id => ({ ...PLANES[id], ...((DIC && DIC.planes && DIC.planes[id]) || {}) });
const detTx = id => ({ ...(DETALLE[id] || {}), ...((DIC && DIC.detalle && DIC.detalle[id]) || {}) });

// Reconocer los textos de la página (antes de que el JavaScript dibuje nada)
const huella = s => { let h = 0x811c9dc5; for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 0x01000193); } return (h >>> 0).toString(36); };
const normal = s => s.replace(/\s+/g, " ").trim();
const LETRA = /\p{L}/u;
const EN_LINEA = new Set(["B", "STRONG", "EM", "I", "SPAN", "SMALL", "BR", "CODE", "MARK", "SUP", "SUB", "ABBR", "TIME", "KBD", "S", "U", "Q", "WBR"]);
const SALTEAR = new Set(["SCRIPT", "STYLE", "SVG", "CANVAS", "VIDEO", "AUDIO", "NOSCRIPT", "TEMPLATE", "TEXTAREA", "SELECT", "IFRAME", "INPUT"]);
const ATRIBUTOS = ["alt", "aria-label", "title", "placeholder", "data-wa"];
const UNIDADES = [], ATRS = [];
const noTraducir = el => el.hasAttribute("data-no-traducir") || el.getAttribute("translate") === "no";
function soloEnLinea(el) { for (const c of el.children) if (!EN_LINEA.has(c.tagName) || c.id || noTraducir(c) || !soloEnLinea(c)) return false; return true; }
function atributos(el) { ATRIBUTOS.forEach(a => { const v = el.getAttribute(a); if (v && LETRA.test(v)) ATRS.push({ el, attr: a, es: v, clave: huella(normal(v)) }); }); }
function recolectar(el) {
  for (const n of [...el.childNodes]) {
    if (n.nodeType === 3) { if (el.children.length && LETRA.test(n.data)) UNIDADES.push({ modo: "nodo", nodo: n, es: n.data, clave: huella(normal(n.data)) }); continue; }
    if (n.nodeType !== 1 || SALTEAR.has(n.tagName.toUpperCase()) || noTraducir(n)) continue;
    atributos(n);
    if (LETRA.test(n.textContent) && soloEnLinea(n)) {
      const html = n.innerHTML, modo = n.children.length ? "html" : "texto";
      UNIDADES.push({ modo, el: n, es: modo === "html" ? html : n.textContent, clave: huella(normal(html)) });
      n.querySelectorAll("*").forEach(atributos);
    } else recolectar(n);
  }
}
recolectar(document.body);
const PLANES = {
  base: {
    nombre: "Plan Base", sub: "// landing page estática", para: "Para profesionales y negocios que quieren presentar sus servicios.",
    detalle: "Pago único",
    entrega: "en el día · máximo 2 días hábiles",
    destacado: false,
    puntos: ["Diseño a tu medida", "Dominio y hosting por 1 año", "Primer mes de cambios", "WhatsApp y SEO básico"],
    incluye: ["Diseño a medida de una página", "Versión para celular y PC", "Dominio y hosting por un año", "Certificado de seguridad (HTTPS)", "Mantenimiento y personalización del primer mes", "Botón de WhatsApp y formulario de contacto"],
    noIncluye: ["Cambios después del primer mes", "Catálogo de productos o turnos", "Cobros en línea"],
    temporalidad: "Pagás una sola vez y la página es tuya. Dominio y hosting incluidos durante el primer año."
  },
  emprendedor: {
    nombre: "Plan Catálogo", sub: "// catálogo con pedido por WhatsApp", para: "Para emprendedores que venden por WhatsApp y quieren mostrar sus productos.",
    detalle: "Entrada",
    entrega: "≈ 10 días hábiles",
    destacado: true,
    puntos: ["Fotos, precios y variantes", "Carrito que arma el pedido", "Pedidos a tu WhatsApp", "Carga mensual de productos"],
    incluye: ["Catálogo con fotos, precios y variantes (talle, color)", "Carrito guardado en el navegador del cliente", "Pedido armado que llega a tu WhatsApp", "Carga, edición y baja de productos cada mes", "Productos agotados y banners de temporada"],
    noIncluye: ["Control de stock automático", "Cobro en línea dentro de la página (se suma como adicional)"],
    temporalidad: "Pagás los meses que quieras. Si dejás la cuota, el sitio sigue siendo tuyo, pero ya no se actualiza."
  },
  tienda: {
    oculto: true,
    nombre: "Plan Tienda Online", sub: "// tienda online propia", para: "Para negocios que quieren vender y cobrar en línea con su propia tienda.",
    detalle: "Desde",
    entrega: "a definir según el catálogo", destacado: false,
    puntos: ["Tienda en código puro", "Carrito y cobro en línea", "Panel de productos", "Dominio y seguridad"],
    incluye: ["Tienda online propia en código puro", "Carrito de compras", "Cobro en línea con pasarela de pagos", "Panel para gestionar productos", "Dominio, hosting y certificado de seguridad"],
    noIncluye: ["Comisiones de la pasarela de pagos (las cobra la pasarela)"],
    temporalidad: "Plan preparado, pero oculto hasta tener la primera tienda propia publicada."
  },
  servicios: {
    nombre: "Plan Servicios", sub: "// turnos online", para: "Para profesionales que trabajan con turnos: peluquería, estética, consultorios.",
    detalle: "Entrada",
    entrega: "≈ 2 días hábiles",
    destacado: false,
    puntos: ["Servicios con precio", "Turnos por día y horario", "Panel de turnos", "Pago por WhatsApp"],
    incluye: ["Página con tus servicios y precios", "Reserva de turnos online por día y horario", "Panel para ver y gestionar tus turnos", "Aviso del turno por WhatsApp", "Mantenimiento mensual"],
    noIncluye: ["Cobro en línea (Mercado Pago, como adicional)", "Catálogo de productos"],
    temporalidad: "Pagás los meses que quieras. La agenda de turnos funciona mientras la cuota esté activa."
  }
};

let idioma = "es";
const lista = document.getElementById("lista-planes");
// Precios por moneda. ARS solo para visitantes de Argentina que navegan en español;
// en cualquier otro caso (otro país o idioma distinto de español) se muestra USD.
const PRECIOS = {
  ars: {
    base: { monto: "$150.000", cuota: () => t("cambiosDesde", { m: "$25.000" }) },
    emprendedor: { monto: "$100.000", cuota: () => t("cuotaMes", { m: "$15.000" }) },
    servicios: { monto: "$100.000", cuota: () => t("cuotaMes", { m: "$15.000" }) },
    tienda: { monto: "$500.000", cuota: () => t("mantConvenir") }
  },
  usd: {
    base: { monto: "USD 100", cuota: () => t("cambiosDefinir") },
    emprendedor: { monto: "USD 70", cuota: () => t("cuotaMes", { m: "USD 10" }) },
    servicios: { monto: "USD 70", cuota: () => t("cuotaMes", { m: "USD 10" }) },
    tienda: { monto: "USD 350", cuota: () => t("mantConvenir") }
  }
};
function esArgentina() {
  try {
    const zona = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
    return zona.startsWith("America/Argentina/") || zona === "America/Buenos_Aires" || zona === "America/Cordoba";
  } catch (e) { return false; }
}
function monedaActual() {
  return idioma === "es" && esArgentina() ? "ars" : "usd";
}
function resumenDe(id) {
  const q = PRECIOS[monedaActual()][id], p = planTx(id);
  if (id === "base") return [[t("pago"), t("pagoUnico", { m: q.monto })], [t("despues"), q.cuota()], [t("entrega"), p.entrega]];
  if (id === "tienda") return [[t("desde"), q.monto], [t("mantenimiento"), t("aConvenir")], [t("entrega"), t("segunCatalogo")]];
  return [[t("entrada"), q.monto], [t("cuota"), q.cuota().replace(/^\+ /, "")], [t("entrega"), p.entrega]];
}
// ===== Planes: carrusel 3D con números y detalle =====
const DETALLE = {
  base: { clase: "base", tag: "Pago único", para: "Tu lugar propio en internet, listo en 1 o 2 días.", bajada: "Una página que trabaja por vos: te presenta, te posiciona y lleva cada visita a tu WhatsApp.",
    puntos: [["Tu nombre propio en internet", "Una dirección que es tuya, como tunegocio.com.ar. Tu marca deja de depender de una red social y gana un lugar que nadie te puede apagar."],
      ["Lista en uno o dos días", "Diseño a medida, adaptada a celular y computadora, sin plantillas. Mientras otros esperan semanas, vos ya estás en línea."],
      ["Encontrable en Google y en la IA", "Títulos, descripción, datos estructurados y velocidad pensados para buscadores (SEO) y para asistentes como ChatGPT o Gemini (GEO)."],
      ["Un año resuelto", "Dominio, hosting, certificado de seguridad y el primer mes de cambios incluidos. Después, cada ajuste se cotiza aparte."]],
    entrega: "En el día o, como máximo, en dos días hábiles." },
  emprendedor: { clase: "catalogo", tag: "El más pedido", para: "Tu vidriera abierta 24 h, con pedidos a tu WhatsApp.", bajada: "El comercio de hoy pasa por el celular. Tu catálogo, ordenado y siempre abierto, convierte cada visita en un pedido.",
    puntos: [["Una vidriera que no cierra", "Tus productos por categoría, con fotos, precios y variantes como talle o color. Se encuentran en segundos, a cualquier hora."],
      ["El pedido llega armado", "Tu cliente elige, el carrito suma y el pedido te llega listo por WhatsApp. Vos confirmás y cerrás la venta a tu manera, sin comisiones por venta."],
      ["Productos que aparecen cuando los buscan", "Cada producto con nombre, descripción y datos estructurados para que Google y los asistentes de IA lo muestren a quien lo busca."],
      ["Siempre actualizado", "Cada mes cargo, edito y marco agotados. Promos y temporadas sin que tengas que tocar una línea de código."]],
    entrega: "Alrededor de diez días hábiles, según la cantidad de productos." },
  servicios: { clase: "servicios", tag: "Turnos online", para: "Tus servicios a la vista y tu agenda al día.", bajada: "Tu agenda trabaja aunque estés atendiendo: tus clientes eligen día y horario en tu página.",
    puntos: [["Lo que hacés, explicado con claridad", "Cada servicio con su precio, duración y fotos. Tu cliente llega sabiendo qué quiere y cuánto cuesta."],
      ["Turnos las 24 horas", "Reservan por día y horario desde el celular, incluso fuera de tu horario de atención."],
      ["Para que te encuentren cerca", "SEO local para aparecer cuando alguien busca tu servicio en tu ciudad, en Google, en Maps y en los asistentes de IA."],
      ["Tu agenda bajo control", "Un panel para ver y gestionar los turnos, con aviso por WhatsApp para que nadie se olvide."]],
    entrega: "Alrededor de dos días hábiles." }
};
let planActual = 1, idsVisibles = [];
function dibujarPlanes() {
  const precios = PRECIOS[monedaActual()];
  const tVer = t("verQueIncluye"), tContratar = t("contratar");
  idsVisibles = Object.keys(PLANES).filter(id => !PLANES[id].oculto);
  lista.replaceChildren();
  const numeros = $("cf-numeros"); numeros.replaceChildren();
  idsVisibles.forEach((id, i) => {
    const p = { ...planTx(id), ...precios[id] };
    const d = detTx(id);
    const t = document.createElement("article");
    t.className = "cf-tarjeta " + (d.clase || id);
    t.dataset.i = i;
    t.innerHTML = `<div class="cf-top"><span class="cf-num">0${i + 1}</span><span class="cf-tag"></span></div><h3></h3><p class="cf-para"></p><div class="cf-precio"><span class="det"></span><b></b><span class="cuota"></span></div><ul></ul><div class="cf-acciones"><button type="button" class="boton boton-borde ver"></button><button type="button" class="boton contratar"></button></div>`;
    t.querySelector(".cf-tag").textContent = d.tag || "";
    t.querySelector("h3").textContent = p.nombre;
    t.querySelector(".cf-para").textContent = d.para || p.para;
    t.querySelector(".det").textContent = p.detalle;
    t.querySelector(".cf-precio b").textContent = p.monto;
    t.querySelector(".cuota").textContent = p.cuota();
    t.querySelector("ul").replaceChildren(...p.puntos.map(x => Object.assign(document.createElement("li"), { textContent: x })));
    t.querySelector(".ver").textContent = tVer;
    t.querySelector(".contratar").textContent = tContratar;
    t.querySelector(".ver").addEventListener("click", e => { e.stopPropagation(); irPlan(i); abrirDetalle(); });
    t.querySelector(".contratar").addEventListener("click", e => { e.stopPropagation(); abrir(id, 2); });
    t.addEventListener("click", () => { if (i !== planActual) irPlan(i); });
    lista.append(t);
    const n = document.createElement("button");
    n.type = "button"; n.setAttribute("role", "tab"); n.innerHTML = `<b>0${i + 1}</b><span></span>`;
    n.querySelector("span").textContent = p.nombre;
    n.addEventListener("click", () => irPlan(i));
    numeros.append(n);
  });
  irPlan(Math.min(planActual, idsVisibles.length - 1));
}
function irPlan(n) {
  const total = idsVisibles.length;
  planActual = Math.max(0, Math.min(total - 1, n));
  [...lista.children].forEach((t, i) => {
    const d = i - planActual, ad = Math.abs(d);
    t.style.setProperty("--d", d); t.style.setProperty("--ad", ad); t.style.setProperty("--op", ad > 1 ? 0 : 1);
    t.classList.toggle("activa", d === 0); t.inert = d !== 0; t.setAttribute("aria-hidden", String(d !== 0));
  });
  [...$("cf-numeros").children].forEach((b, i) => { b.setAttribute("aria-selected", String(i === planActual)); b.tabIndex = i === planActual ? 0 : -1; });
  document.querySelector(".cf-barra").style.setProperty("--k", planActual);
  document.querySelector(".cf-barra i").style.width = `calc(100% / ${total})`;
  $("cf-n").textContent = "0" + (planActual + 1);
  document.querySelector(".cf-cuenta span").textContent = "/ 0" + total;
  $("cf-ant").disabled = planActual === 0; $("cf-sig").disabled = planActual === total - 1;
  llenarDetalle();
}
function llenarDetalle() {
  const id = idsVisibles[planActual], p = planTx(id), d = DETALLE[id] && detTx(id);
  if (!d) return;
  $("det-titulo").textContent = t("detTitulo", { plan: p.nombre });
  $("det-bajada").textContent = d.bajada;
  $("det-lista").replaceChildren(...d.puntos.map(([h, t], i) => {
    const li = document.createElement("li");
    li.innerHTML = `<b>0${i + 1}</b><div><h4></h4><p></p></div>`;
    li.querySelector("h4").textContent = h; li.querySelector("p").textContent = t;
    return li;
  }));
  $("det-datos").replaceChildren(...[[t("cuantoTarda"), d.entrega], [t("comoPago"), t("pagoTxt")]].map(([k, v]) => {
    const div = document.createElement("div"), dt = document.createElement("dt"), dd = document.createElement("dd");
    dt.textContent = k; dd.textContent = v; div.append(dt, dd); return div;
  }));
  $("det-contratar").textContent = t("detContratar", { plan: p.nombre });
  const q = $("det-consulta"); q.href = `https://wa.me/${WA}?text=${encodeURIComponent(t("waDuda", { plan: p.nombre }))}`; q.target = "_blank"; q.rel = "noopener noreferrer";
}
function abrirDetalle() {
  const det = $("detalle");
  det.classList.remove("abierto"); void det.offsetWidth; det.classList.add("abierto");
  setTimeout(() => det.scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" }), 250);
}

const ventana = document.getElementById("ventana");
let actual = null;
const datos = { nombre: "", rubro: "", idea: "" };
const $ = id => document.getElementById(id);
const llenarLista = (el, items) => { el.replaceChildren(...items.map(t => { const li = document.createElement("li"); li.textContent = t; return li; })); };

function irA(n) {
  ventana.querySelectorAll("[data-paso]").forEach(s => { s.hidden = s.dataset.paso !== String(n); });
  ventana.querySelectorAll(".pasos-modal li").forEach(li => li.classList.toggle("activo", Number(li.dataset.p) <= n));
  if (n === 3) actualizarFinal();
}
function abrir(id, paso = 1) {
  actual = id; const p = planTx(id);
  $("ventana-titulo").textContent = p.nombre; $("ventana-sub").textContent = p.sub;
  $("resumen").replaceChildren(...resumenDe(id).map(([k, v]) => { const d = document.createElement("div"); const dt = document.createElement("dt"); dt.textContent = k; const dd = document.createElement("dd"); dd.textContent = v; d.append(dt, dd); return d; }));
  llenarLista($("incluye"), p.incluye); llenarLista($("no-incluye"), p.noIncluye);
  $("temporalidad").textContent = p.temporalidad;
  irA(paso);
  if (!ventana.open) ventana.showModal();
}
ventana.addEventListener("click", e => {
  if (e.target === ventana || e.target.closest("[data-cerrar]")) ventana.close();
  const ir = e.target.closest("[data-ir]"); if (ir) irA(Number(ir.dataset.ir));
});

$("form-datos").addEventListener("submit", e => {
  e.preventDefault();
  const nombre = $("f-nombre").value.trim();
  const err = $("error-datos");
  if (nombre.length < 3) { err.textContent = t("errNombre"); err.hidden = false; $("f-nombre").focus(); return; }
  if (!$("f-acepto").checked) { err.textContent = t("errAcepto"); err.hidden = false; return; }
  err.hidden = true;
  datos.nombre = nombre; datos.rubro = $("f-rubro").value.trim(); datos.idea = $("f-idea").value.trim();
  irA(3);
});
$("form-pago").addEventListener("change", actualizarFinal);

function actualizarFinal() {
  if (!actual) return;
  const p = planTx(actual);
  const pago = new FormData($("form-pago")).get("pago");
  const convenir = pago === "A convenir";
  const pagoNombre = convenir ? t("aConvenir") : pago;
  const lineas = [
    t(convenir ? "msgConvenir" : "msgContrate", { plan: p.nombre }),
    t("msgSoy", { nombre: datos.nombre || t("tuNombre"), rubro: datos.rubro ? ` (${datos.rubro})` : "" }),
    datos.idea ? t("msgIdea", { idea: datos.idea }) : "",
    t("msgPago", { pago: pagoNombre })
  ].filter(Boolean);
  const texto = lineas.join("\n");
  $("previa").textContent = texto;
  $("link-wa").href = `https://wa.me/${WA}?text=${encodeURIComponent(texto)}`;
  $("link-wa").textContent = t(convenir ? "escribirLeo" : "yaPague");
  const lp = $("link-pago");
  const esMP = pago === "Mercado Pago";
  lp.hidden = convenir;
  lp.textContent = t("pagarCon", { pago });
  lp.removeAttribute("target");
  if (esMP) { lp.removeAttribute("aria-disabled"); lp.removeAttribute("title"); }
  else { lp.setAttribute("aria-disabled", "true"); lp.title = t("noDisponible"); }
  $("link-wa").hidden = esMP;
  $("error-pago").hidden = true;
  const pasos = t(convenir ? "pasosConvenir" : esMP ? "pasosMP" : "pasosNo");
  llenarLista($("instrucciones"), pasos);
}

const enlacesWa = () => {
  const general = `https://wa.me/${WA}?text=${encodeURIComponent(t("waGeneral"))}`;
  document.querySelectorAll("[data-whatsapp]").forEach(a => { a.href = general; a.target = "_blank"; a.rel = "noopener noreferrer"; });
  $("cotizar").href = `https://wa.me/${WA}?text=${encodeURIComponent(t("waCotizar"))}`;
  $("cotizar").target = "_blank"; $("cotizar").rel = "noopener noreferrer";
};
enlacesWa(); REFRESCAR.push(enlacesWa, () => { if (ventana.open && actual) { abrir(actual, Number([...ventana.querySelectorAll("[data-paso]")].find(x => !x.hidden)?.dataset.paso || 1)); } });

document.querySelectorAll("[data-pendiente]").forEach(a => { a.title = t("enlacePendiente"); a.addEventListener("click", e => e.preventDefault()); });
const dockBoton = document.querySelector(".dock-boton"), dockMenu = $("dock-menu");
const cerrarDock = () => { dockMenu.hidden = true; dockBoton.setAttribute("aria-expanded", "false"); dockBoton.setAttribute("aria-label", t("abrirMenu")); };
dockBoton.addEventListener("click", () => { const abrirlo = dockMenu.hidden; dockMenu.hidden = !abrirlo; dockBoton.setAttribute("aria-expanded", String(abrirlo)); dockBoton.setAttribute("aria-label", t(abrirlo ? "cerrarMenu" : "abrirMenu")); });
dockMenu.addEventListener("click", e => { if (e.target.closest("a")) cerrarDock(); });
document.addEventListener("keydown", e => { if (e.key === "Escape") cerrarDock(); });
document.addEventListener("click", e => { if (!e.target.closest(".dock")) cerrarDock(); });
const globo = $("dock-globo");
let globoVisto = false; try { globoVisto = sessionStorage.getItem("terere-globo") === "1"; } catch (e) {}
const ocultarGlobo = () => { globo.hidden = true; try { sessionStorage.setItem("terere-globo", "1"); } catch (e) {} };
if (!globoVisto) setTimeout(() => { if (dockMenu.hidden) globo.hidden = false; }, 2500);
globo.querySelector(".dock-globo-cerrar").addEventListener("click", e => { e.stopPropagation(); ocultarGlobo(); });
globo.addEventListener("click", () => { ocultarGlobo(); dockBoton.click(); });
dockBoton.addEventListener("click", ocultarGlobo);


const reducido = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const deco = document.querySelector("[data-decodificar]");
if (deco && !reducido) {
  const final = deco.textContent, chars = "01<>/{}=;#$*+", total = 22; let f = 0;
  const tick = () => {
    deco.textContent = [...final].map((c, i) => (c === " " || i < (f / total) * final.length) ? c : chars[Math.floor(Math.random() * chars.length)]).join("");
    if (f++ < total) requestAnimationFrame(() => setTimeout(tick, 40)); else deco.textContent = final;
  };
  setTimeout(tick, 300);
}

// Video del saludo: se carga después de la página, solo con buena conexión y sin movimiento reducido.
const conexion = navigator.connection || {};
const conexionLenta = conexion.saveData || /(^|-)2g|3g/.test(conexion.effectiveType || "");
if (!reducido && !conexionLenta) {
  const iniciarVideo = () => {
    const v = $(window.matchMedia("(max-width: 767px)").matches ? "video-mob" : "video-pc");
    if (!v || v.src) return;
    v.addEventListener("playing", () => v.classList.add("listo"), { once: true });
    v.addEventListener("error", () => v.classList.remove("listo"));
    const mp4 = v.canPlayType('video/mp4; codecs="avc1.42E01E"');
    v.src = mp4 ? v.dataset.src : v.dataset.src.replace(".mp4", ".webm");
    v.play().catch(() => {});
    new IntersectionObserver(([e]) => { if (e.isIntersecting) v.play().catch(() => {}); else v.pause(); }, { threshold: 0.2 }).observe(v);
  };
  if (document.readyState === "complete") setTimeout(iniciarVideo, 300); else window.addEventListener("load", () => setTimeout(iniciarVideo, 300), { once: true });
}

// Idiomas: aplicar, menú y buscador
const CACHE_IDIOMAS = {};
const cargarIdioma = lang => (CACHE_IDIOMAS[lang] ||= fetch(`idiomas/${lang}.json`).then(r => { if (!r.ok) throw new Error(r.status); return r.json(); }));
async function aplicarIdioma(lang, guardar = true) {
  if (!IDIOMAS[lang]) lang = "es";
  let D = null;
  if (lang !== "es") { try { D = await cargarIdioma(lang); } catch (e) { delete CACHE_IDIOMAS[lang]; return; } }
  idioma = lang; DIC = D;
  const tx = D ? (D.texto || {}) : {}, hx = D ? (D.html || {}) : {}, ax = D ? (D.attr || {}) : {};
  UNIDADES.forEach(u => {
    if (u.modo === "nodo") { const tr = tx[u.clave]; if (tr === undefined) { u.nodo.data = u.es; return; } const [, a, , b] = u.es.match(/^(\s*)([\s\S]*?)(\s*)$/); u.nodo.data = a + tr + b; }
    else if (u.modo === "html") u.el.innerHTML = hx[u.clave] ?? u.es;
    else u.el.textContent = tx[u.clave] ?? u.es;
  });
  ATRS.forEach(a => a.el.setAttribute(a.attr, ax[a.clave] ?? a.es));
  const info = IDIOMAS[lang];
  document.documentElement.lang = info.lang;
  document.documentElement.dir = info.dir || "ltr";
  $("idioma-actual").textContent = lang.toUpperCase();
  document.querySelectorAll("[data-idioma]").forEach(b => b.setAttribute("aria-pressed", String(b.dataset.idioma === lang)));
  dibujarPlanes();
  REFRESCAR.forEach(f => { try { f(); } catch (e) {} });
  if (guardar) try { localStorage.setItem("terere-idioma", lang); } catch (e) {}
}
const idiomaBoton = document.querySelector(".idioma-boton"), idiomaMenu = $("idioma-menu"), idiomaLista = $("idioma-lista"), idiomaBuscar = $("idioma-buscar");
// Botones de la lista (los nombres van en su propio idioma)
idiomaLista.replaceChildren(...Object.entries(IDIOMAS).map(([cod, info]) => {
  const li = document.createElement("li"), b = document.createElement("button");
  b.type = "button"; b.dataset.idioma = cod; b.lang = info.lang; b.setAttribute("aria-pressed", String(cod === idioma));
  b.innerHTML = `<span></span><small>${cod.toUpperCase()}</small>`; b.querySelector("span").textContent = info.nombre;
  if (info.beta) { const e = document.createElement("em"); e.className = "idioma-beta"; e.dataset.ui = "beta"; e.textContent = t("beta"); b.querySelector("span").append(" ", e); }
  li.dataset.buscar = (info.nombre + " " + cod + " " + info.buscar).normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
  li.append(b); return li;
}));
const sinIdioma = document.createElement("li"); sinIdioma.className = "idioma-vacio"; sinIdioma.hidden = true; idiomaLista.append(sinIdioma);
const filtrarIdiomas = () => {
  const q = idiomaBuscar.value.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().trim();
  let hay = 0; idiomaLista.querySelectorAll("li[data-buscar]").forEach(li => { const ok = !q || li.dataset.buscar.includes(q); li.hidden = !ok; if (ok) hay++; });
  sinIdioma.textContent = t("sinIdioma"); sinIdioma.hidden = hay > 0;
};
idiomaBuscar.addEventListener("input", filtrarIdiomas);
idiomaBuscar.addEventListener("keydown", e => { if (e.key === "Enter") { e.preventDefault(); idiomaLista.querySelector("li[data-buscar]:not([hidden]) button")?.click(); } if (e.key === "ArrowDown") { e.preventDefault(); idiomaLista.querySelector("li[data-buscar]:not([hidden]) button")?.focus(); } });
REFRESCAR.push(() => { idiomaBuscar.placeholder = t("buscarIdioma"); idiomaLista.querySelectorAll("[data-ui='beta']").forEach(e => { e.textContent = t("beta"); }); });
idiomaBuscar.placeholder = t("buscarIdioma");
const cerrarIdioma = () => { idiomaMenu.hidden = true; idiomaBoton.setAttribute("aria-expanded", "false"); };
idiomaBoton.addEventListener("click", () => {
  const abrirlo = idiomaMenu.hidden; idiomaMenu.hidden = !abrirlo; idiomaBoton.setAttribute("aria-expanded", String(abrirlo));
  if (abrirlo) { idiomaBuscar.value = ""; filtrarIdiomas(); if (matchMedia("(pointer: fine)").matches) idiomaBuscar.focus(); }
});
idiomaLista.addEventListener("click", e => { const b = e.target.closest("[data-idioma]"); if (b) { aplicarIdioma(b.dataset.idioma); cerrarIdioma(); idiomaBoton.focus(); } });
document.addEventListener("click", e => { if (!e.target.closest(".idioma")) cerrarIdioma(); });
document.addEventListener("keydown", e => { if (e.key === "Escape") cerrarIdioma(); });
try { const guardado = localStorage.getItem("terere-idioma"); if (guardado && guardado !== "es" && IDIOMAS[guardado]) aplicarIdioma(guardado, false); } catch (e) {}

const cv = $("lluvia");
if (cv && !reducido) {
  const ctx = cv.getContext("2d"); let cols = [], tam = 16, visible = true;
  const ajustar = () => { cv.width = cv.clientWidth; cv.height = cv.clientHeight; cols = Array.from({ length: Math.ceil(cv.width / tam) }, () => Math.random() * -50); };
  ajustar(); window.addEventListener("resize", ajustar);
  new IntersectionObserver(([e]) => { visible = e.isIntersecting; }).observe(cv);
  const glifos = "01アイウエオカキクケコ<>{}/=;tereré";
  let ultimo = 0;
  const dibujar = t => {
    requestAnimationFrame(dibujar);
    if (!visible || t - ultimo < 70) return; ultimo = t;
    ctx.fillStyle = "rgba(22,20,21,0.18)"; ctx.fillRect(0, 0, cv.width, cv.height);
    ctx.fillStyle = "#9FBD2B"; ctx.font = tam + "px JetBrains Mono, monospace";
    cols.forEach((y, i) => { ctx.fillText(glifos[Math.floor(Math.random() * glifos.length)], i * tam, y * tam); cols[i] = (y * tam > cv.height && Math.random() > 0.975) ? 0 : y + 1; });
  };
  requestAnimationFrame(dibujar);
}

// ===== Capa inmersiva (vista previa) =====
(() => {
  const red = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const hover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  const movil = () => window.matchMedia("(max-width: 767px)").matches;
  const prog = document.createElement("div"); prog.className = "inm-progreso"; document.body.append(prog);
  const luz = document.createElement("div"); luz.className = "inm-luz"; document.body.prepend(luz);

  const io = new IntersectionObserver((es) => es.forEach((e) => {
    if (!e.isIntersecting) return;
    const t = e.target; t.classList.add("inm-visto"); io.unobserve(t);
    setTimeout(() => t.classList.add("inm-listo"), 1400);
  }), { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });

  const inclinar = (el) => {
    el.classList.add("inm-tilt");
    el.addEventListener("pointermove", (ev) => {
      const r = el.getBoundingClientRect();
      const x = (ev.clientX - r.left) / r.width - 0.5, y = (ev.clientY - r.top) / r.height - 0.5;
      el.style.setProperty("--ry", (x * 10).toFixed(2) + "deg");
      el.style.setProperty("--rx", (-y * 10).toFixed(2) + "deg");
    });
    el.addEventListener("pointerleave", () => { el.style.setProperty("--rx", "0deg"); el.style.setProperty("--ry", "0deg"); });
  };
  const marcar = (lista, { grupo = false, tilt = false } = {}) => lista.forEach((el, i) => {
    if (!el || el.dataset.inm !== undefined) return;
    el.dataset.inm = ""; el.style.setProperty("--i", grupo ? i % 6 : 0);
    if (tilt && hover) inclinar(el);
    io.observe(el);
  });
  const $$ = (s) => [...document.querySelectorAll(s)];
  function aplicar() {
    marcar($$("main .seccion h2"));
    marcar($$("main .seccion .mono").filter((e) => !e.closest(".plan")));
    marcar($$(".pie-cta"));
  }
  if (!red) {
    aplicar();
    new MutationObserver(aplicar).observe(document.getElementById("lista-planes"), { childList: true });
    if (hover) addEventListener("pointermove", (e) => {
      luz.style.setProperty("--mx", e.clientX + "px"); luz.style.setProperty("--my", e.clientY + "px");
    }, { passive: true });
  }

  const hero = document.querySelector(".hero"), pista = document.querySelector(".inm-cinta-pista");
  let pendiente = false;
  const tick = () => {
    pendiente = false;
    const y = scrollY, max = document.documentElement.scrollHeight - innerHeight;
    prog.style.setProperty("--inm-p", max > 0 ? (y / max).toFixed(4) : 0);
    if (red) return;
    if (hero) hero.style.setProperty("--hs", Math.min(1, Math.max(0, y / hero.offsetHeight)).toFixed(3));
    if (pista) { const mitad = pista.scrollWidth / 2; pista.style.setProperty("--cx", (-((y * 0.6) % mitad)).toFixed(1) + "px"); }
  };
  addEventListener("scroll", () => { if (!pendiente) { pendiente = true; requestAnimationFrame(tick); } }, { passive: true });
  addEventListener("resize", tick); tick();
})();

dibujarPlanes();

// ===== v3: controles de planes, cartelera, onda de clientes, valores, auditoría y pasos =====
(() => {
  const q = s => document.querySelector(s), qq = s => [...document.querySelectorAll(s)];
  const red = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const wa = t => `https://wa.me/${WA}?text=${encodeURIComponent(t)}`;
  qq("[data-wa]").forEach(a => { a.href = wa(a.dataset.wa); a.target = "_blank"; a.rel = "noopener noreferrer"; });

  // Planes
  $("cf-ant").addEventListener("click", () => irPlan(planActual - 1));
  $("cf-sig").addEventListener("click", () => irPlan(planActual + 1));
  $("cf-numeros").addEventListener("keydown", e => { if (e.key === "ArrowRight") { irPlan(planActual + 1); $("cf-numeros").children[planActual].focus(); } if (e.key === "ArrowLeft") { irPlan(planActual - 1); $("cf-numeros").children[planActual].focus(); } });
  $("det-contratar").addEventListener("click", () => abrir(idsVisibles[planActual], 2));
  // Productos con IA: el mismo carrusel 3D que los planes
  const prodLista = $("lista-productos");
  if (prodLista) {
    const prods = [...prodLista.children];
    let prodActual = 0;
    const irProd = n => {
      prodActual = Math.max(0, Math.min(prods.length - 1, n));
      prods.forEach((t, i) => { const d = i - prodActual, ad = Math.abs(d); t.style.setProperty("--d", d); t.style.setProperty("--ad", ad); t.style.setProperty("--op", ad > 1 ? 0 : 1); t.classList.toggle("activa", d === 0); t.inert = d !== 0; t.setAttribute("aria-hidden", String(d !== 0)); });
      [...$("prod-numeros").children].forEach((b, i) => { b.setAttribute("aria-selected", String(i === prodActual)); b.tabIndex = i === prodActual ? 0 : -1; });
      const barra = $("prod-barra"); barra.style.setProperty("--k", prodActual); barra.style.setProperty("--n", prods.length);
      $("prod-n").textContent = "0" + (prodActual + 1);
      $("prod-ant").disabled = prodActual === 0; $("prod-sig").disabled = prodActual === prods.length - 1;
    };
    prods.forEach((t, i) => {
      const b = document.createElement("button"); b.type = "button"; b.setAttribute("role", "tab");
      b.innerHTML = `<b>0${i + 1}</b><span></span>`;
      b.addEventListener("click", () => irProd(i)); $("prod-numeros").append(b);
      t.addEventListener("click", () => { if (i !== prodActual) irProd(i); });
    });
    $("prod-ant").addEventListener("click", () => irProd(prodActual - 1));
    $("prod-sig").addEventListener("click", () => irProd(prodActual + 1));
    $("prod-numeros").addEventListener("keydown", e => { if (e.key === "ArrowRight") { irProd(prodActual + 1); $("prod-numeros").children[prodActual].focus(); } if (e.key === "ArrowLeft") { irProd(prodActual - 1); $("prod-numeros").children[prodActual].focus(); } });
    let px = null;
    prodLista.addEventListener("pointerdown", e => { px = e.clientX; });
    prodLista.addEventListener("pointerup", e => { if (px === null) return; const dx = e.clientX - px; px = null; if (Math.abs(dx) > 40) irProd(prodActual + (dx < 0 ? 1 : -1)); });
    const rotular = () => [...$("prod-numeros").children].forEach((b, i) => { b.querySelector("span").textContent = t("productosCortos")[i] || prods[i].querySelector("h3").textContent; b.setAttribute("aria-label", prods[i].querySelector("h3").textContent); });
    rotular(); REFRESCAR.push(rotular);
    irProd(0);
  }
  let x0 = null;
  lista.addEventListener("pointerdown", e => { x0 = e.clientX; });
  lista.addEventListener("pointerup", e => { if (x0 === null) return; const dx = e.clientX - x0; x0 = null; if (Math.abs(dx) > 40) irPlan(planActual + (dx < 0 ? 1 : -1)); });

  // Cartelera viva
  const cart = $("cartelera"), escenas = qq(".escena"), tabs = qq(".cart-pestanas [role=tab]"), pausa = q(".cart-pausa");
  let actual = 0, timer = null, pausadaUsuario = false, enVista = true, ticks = [];
  const limpiar = () => { ticks.forEach(clearInterval); ticks = []; };
  const flash = el => { el.classList.remove("c-flash"); void el.offsetWidth; el.classList.add("c-flash"); };
  const NEO = [
    ["Comercio", [["Yerba 1 kg · stock", "24"], ["Azúcar 1 kg · stock", "31"], ["Ventas de hoy", "$186.400"]]],
    ["Servicios", [["Turno 10:30 · corte", "confirmado"], ["Turno 11:15 · color", "confirmado"], ["Agenda de hoy", "8 turnos"]]],
    ["Gastronomía", [["Mesa 4 · comanda", "en cocina"], ["Delivery #318", "en camino"], ["Caja del turno", "$94.200"]]],
    ["Propiedades", [["Depto. centro · alquiler", "al día"], ["Casa norte · visita", "jueves 17 h"], ["Cobros del mes", "12 de 14"]]]
  ];
  const alEntrar = {
    "esc-1": () => { let p = 12, s = 48; ticks.push(setInterval(() => { p++; s = Math.max(0, s - 2); $("c-pedidos").textContent = p; $("c-stock").textContent = s; flash($("c-neo")); }, 2400)); },
    "esc-2": () => {
      let v = 0; const chips = qq("#n-verticales span");
      const pintar = () => { chips.forEach((c, i) => c.classList.toggle("on", i === v)); $("n-tabla").replaceChildren(...NEO[v][1].map(([a, b]) => { const f = document.createElement("div"); f.className = "n-fila"; f.innerHTML = "<span></span><span></span>"; f.children[0].textContent = a; f.children[1].textContent = b; return f; })); v = (v + 1) % NEO.length; };
      pintar(); ticks.push(setInterval(pintar, 2400));
    },
    "esc-3": () => { let n = 1240; ticks.push(setInterval(() => { n += Math.ceil(Math.random() * 9); $("m-likes").textContent = n.toLocaleString("es-AR"); }, 700)); },
    "esc-5": () => {
      const frases = [["Promo", "Esta semana: 2×1 en bizcochitos."], ["Feriado", "Abrimos el lunes de 9 a 13 h."], ["Nuevo", "Llegaron los termos de acero."], ["Turnos", "Quedan turnos para el sábado."]];
      let i = 0, j = 0, borrando = false; const t = $("l-titulo"), promo = $("l-promo"), hora = $("l-hora");
      const reloj = () => hora.textContent = "editado " + new Date().toLocaleTimeString("es-AR", { hour: "2-digit", minute: "2-digit" });
      t.textContent = ""; promo.textContent = frases[0][0]; reloj();
      ticks.push(setInterval(() => { const f = frases[i][1];
        if (!borrando) { j++; t.textContent = f.slice(0, j); if (j >= f.length) { borrando = true; j = f.length + 18; } }
        else { j--; if (j <= f.length) t.textContent = f.slice(0, Math.max(0, j)); if (j <= 0) { borrando = false; i = (i + 1) % frases.length; promo.textContent = frases[i][0]; reloj(); } } }, 55));
    }
  };
  function mostrar(n, foco = false) {
    limpiar(); actual = (n + escenas.length) % escenas.length;
    escenas.forEach((e, i) => { const on = i === actual; e.classList.toggle("activa", on); e.setAttribute("aria-hidden", String(!on)); e.inert = !on; });
    tabs.forEach((t, i) => { const on = i === actual; t.setAttribute("aria-selected", String(on)); t.tabIndex = on ? 0 : -1; t.querySelector("i").getAnimations?.({ subtree: true }).forEach(a => a.cancel()); });
    cart.style.setProperty("--dur", (escenas[actual].dataset.dur || 8) + "s");
    if (foco) tabs[actual].focus();
    if (!red) alEntrar[escenas[actual].id]?.();
    programar();
  }
  function restante() { const a = tabs[actual].querySelector("i")?.getAnimations?.({ subtree: true })?.[0]; if (!a || a.currentTime == null) return 1; return Math.max(0.05, 1 - a.currentTime / a.effect.getTiming().duration); }
  function programar() { clearTimeout(timer); const corre = !pausadaUsuario && enVista && !document.hidden && !red; cart.classList.toggle("pausada", !corre); if (corre) timer = setTimeout(() => mostrar(actual + 1), (escenas[actual].dataset.dur || 8) * 1000 * restante()); }
  tabs.forEach((t, i) => { t.addEventListener("click", () => mostrar(i)); t.addEventListener("keydown", e => { if (e.key === "ArrowRight") mostrar(actual + 1, true); if (e.key === "ArrowLeft") mostrar(actual - 1, true); }); });
  pausa.addEventListener("click", () => { pausadaUsuario = !pausadaUsuario; pausa.setAttribute("aria-pressed", String(pausadaUsuario)); pausa.textContent = pausadaUsuario ? "Reanudar" : "Pausar"; programar(); });
  cart.addEventListener("pointerenter", e => { if (e.pointerType === "mouse") { enVista = false; programar(); } });
  cart.addEventListener("pointerleave", e => { if (e.pointerType === "mouse") { enVista = true; programar(); } });
  cart.addEventListener("focusin", () => { enVista = false; programar(); });
  cart.addEventListener("focusout", () => { enVista = true; programar(); });
  new IntersectionObserver(([e]) => { enVista = e.isIntersecting; programar(); }, { threshold: 0.3 }).observe(cart);
  document.addEventListener("visibilitychange", programar);
  if (red) { pausadaUsuario = true; pausa.hidden = true; }
  if (cart.hidden) { pausadaUsuario = true; limpiar(); programar(); } // cartelera oculta: no anima nada
  mostrar(0);

  // Clientes en onda 3D
  const ola = $("ola"), clis = qq("#ola .cli").filter(c => !c.hidden);
  if (clis.length > 1) { ola.classList.add("varias"); if (!red) setInterval(() => { if (!ola.matches(":hover")) { const fin = ola.scrollLeft + ola.clientWidth >= ola.scrollWidth - 4; ola.scrollTo({ left: fin ? 0 : ola.scrollLeft + clis[0].offsetWidth + 28, behavior: "smooth" }); } }, 4200); }
  let pend = false;
  const olaTick = () => { pend = false; if (red) return; const vh = innerHeight, vw = innerWidth;
    clis.forEach(c => { const r = c.getBoundingClientRect(); const dy = (r.top + r.height / 2 - vh / 2) / vh, dx = (r.left + r.width / 2 - vw / 2) / vw;
      const cerca = Math.max(0, 1 - Math.min(1, Math.hypot(dy * 1.4, dx * 1.6)));
      c.style.setProperty("--c", cerca.toFixed(3)); c.style.setProperty("--t", Math.max(-1, Math.min(1, dy)).toFixed(3)); c.style.setProperty("--hx", Math.max(-1, Math.min(1, dx)).toFixed(3)); }); };
  const pedir = () => { if (!pend) { pend = true; requestAnimationFrame(olaTick); } };
  addEventListener("scroll", pedir, { passive: true }); ola.addEventListener("scroll", pedir, { passive: true }); addEventListener("resize", pedir); olaTick();

  // Por qué Tereré: se encienden solas
  const vals = qq(".val"); let vi = 0, vt = null;
  const caja = $("valores"), celu = matchMedia("(max-width: 700px)");
  let tocando = false, autoScroll = false;
  // Puntitos del carrusel (solo se ven en el celular)
  const puntos = document.createElement("div"); puntos.className = "val-puntos";
  const botones = vals.map((v, i) => { const b = document.createElement("button"); b.type = "button"; b.setAttribute("aria-label", t("verX", { x: v.querySelector("h3").textContent })); b.addEventListener("click", () => { marcar(i); centrar(i); }); puntos.append(b); return b; });
  caja.after(puntos);
  REFRESCAR.push(() => botones.forEach((b, i) => b.setAttribute("aria-label", t("verX", { x: vals[i].querySelector("h3").textContent }))));
  function marcar(i) { vals.forEach((v, j) => v.classList.toggle("encendida", j === i)); botones.forEach((b, j) => b.setAttribute("aria-current", String(j === i))); vi = i; }
  function centrar(i) { if (!celu.matches) return; const v = vals[i]; autoScroll = true; caja.scrollTo({ left: v.offsetLeft - (caja.clientWidth - v.offsetWidth) / 2, behavior: red ? "auto" : "smooth" }); setTimeout(() => { autoScroll = false; }, 700); }
  const encender = () => { if (tocando) return; const i = vi; marcar(i); centrar(i); vi = (i + 1) % vals.length; };
  // Si la persona desliza a mano, se enciende la tarjeta que quedó al centro y la animación espera un rato
  let esperaVal = null;
  caja.addEventListener("pointerdown", () => { tocando = true; clearTimeout(esperaVal); });
  caja.addEventListener("scroll", () => {
    if (autoScroll || !celu.matches) return;
    tocando = true; clearTimeout(esperaVal);
    esperaVal = setTimeout(() => {
      const centro = caja.scrollLeft + caja.clientWidth / 2;
      let cerca = 0; vals.forEach((v, i) => { if (Math.abs(v.offsetLeft + v.offsetWidth / 2 - centro) < Math.abs(vals[cerca].offsetLeft + vals[cerca].offsetWidth / 2 - centro)) cerca = i; });
      marcar(cerca); vi = (cerca + 1) % vals.length; tocando = false;
    }, 1800);
  }, { passive: true });
  marcar(0); vi = 0;
  if (!red) new IntersectionObserver(([e]) => { clearInterval(vt); if (e.isIntersecting) { encender(); vt = setInterval(encender, 2600); } }, { threshold: 0.3 }).observe(caja);

  // Auditoría SEO / GEO en vivo
  function auditar() {
    const meta = n => document.querySelector(`meta[name="${n}"]`)?.content || "", og = p => document.querySelector(`meta[property="${p}"]`)?.content || "";
    const titulo = document.title, desc = meta("description"), h1 = qq("h1").length;
    const niveles = qq("h1,h2,h3,h4").filter(h => !h.closest("[hidden],dialog")).map(h => +h.tagName[1]);
    const saltos = niveles.some((n, i) => i > 0 && n - niveles[i - 1] > 1);
    const imgs = qq("img"), sinAlt = imgs.filter(i => !i.hasAttribute("alt")).length;
    const ld = qq('script[type="application/ld+json"]').map(s => { try { return JSON.parse(s.textContent); } catch { return null; } }).filter(Boolean);
    const tipos = new Set(); const juntar = o => { if (Array.isArray(o)) o.forEach(juntar); else if (o && typeof o === "object") { if (o["@type"]) [].concat(o["@type"]).forEach(t => tipos.add(t)); Object.values(o).forEach(juntar); } }; juntar(ld);
    const nav = performance.getEntriesByType("navigation")[0], carga = nav ? Math.round(nav.domContentLoadedEventEnd) : null;
    const items = [
      ["SEO", titulo.length >= 30 && titulo.length <= 65, t("aTitulo"), t("aTituloDet", { n: titulo.length }), 1],
      ["SEO", desc.length >= 70 && desc.length <= 160, t("aDesc"), t("aDescDet", { n: desc.length }), 1],
      ["SEO", h1 === 1, t("aH1"), t("aH1Det", { n: h1 })],
      ["SEO", !saltos, t("aJerarquia"), t(saltos ? "aSaltos" : "aOrdenada")],
      ["SEO", sinAlt === 0, t("aAlt"), t("aAltDet", { a: imgs.length - sinAlt, b: imgs.length })],
      ["SEO", !!document.querySelector('link[rel="canonical"]'), t("aCanonica"), t(document.querySelector('link[rel="canonical"]') ? "aDefinida" : "aFalta")],
      ["SEO", !!og("og:title") && !!og("og:image"), t("aCompartir"), t(og("og:title") ? "aCompartirOk" : "aCompartirNo")],
      ["GEO", tipos.has("ProfessionalService") || tipos.has("LocalBusiness"), t("aNegocio"), t("aNegocioDet"), 1],
      ["GEO", tipos.has("Offer"), t("aPlanes"), t("aPlanesDet"), 1],
      ["GEO", /Corrientes/.test(JSON.stringify(ld)), t("aUbicacion"), t("aUbicacionDet")],
      [t("aVelocidad"), carga !== null && carga < 2500, t("aCarga"), carga !== null ? `${(carga / 1000).toFixed(2)} s` : t("aSinDato"), 1],
      [t("aSeguridad"), location.protocol === "https:", t("aConexion"), location.protocol === "https:" ? "HTTPS" : t("aSinHttps")],
      [t("aSeguridad"), !!document.querySelector('meta[name="viewport"]'), t("aCelular"), t("aAdaptable")]
    ];
    const fila = ([g, ok, nombre, det], i) => { const li = document.createElement("li"); li.innerHTML = `<span class="${ok ? "ok" : "ojo"}">${ok ? "✓" : "!"}</span><div><strong></strong><span class="det"></span></div>`; li.querySelector("strong").textContent = nombre; li.querySelector(".det").textContent = det; setTimeout(() => li.classList.add("listo"), red ? 0 : 120 + i * 90); return li; };
    $("audit-resumen").replaceChildren(...items.filter(x => x[4]).map(fila));
    const resto = $("audit-lista"); resto.replaceChildren(); let grupo = "";
    items.filter(x => !x[4]).forEach((x, i) => { if (x[0] !== grupo) { grupo = x[0]; resto.append(Object.assign(document.createElement("p"), { className: "audit-tipo", textContent: grupo })); } resto.append(fila(x, i)); });
    const puntaje = Math.round(items.filter(x => x[1]).length / items.length * 100), n = $("audit-n");
    if (red) { n.textContent = puntaje; return; }
    const t0 = performance.now(), dur = 1200; const paso = t => { const k = Math.min(1, (t - t0) / dur); n.textContent = Math.round(puntaje * (1 - Math.pow(1 - k, 3))); if (k < 1) requestAnimationFrame(paso); }; requestAnimationFrame(paso);
  }
  let auditado = false;
  new IntersectionObserver(([e], o) => { if (e.isIntersecting) { o.disconnect(); auditado = true; auditar(); } }, { threshold: 0.3 }).observe($("auditoria"));
  $("audit-ver").addEventListener("click", e => { const b = e.currentTarget, abierto = $("audit-mas").classList.toggle("abierto"); b.setAttribute("aria-expanded", String(abierto)); b.textContent = t(abierto ? "verMenos" : "verMas"); });
  REFRESCAR.push(() => { if (auditado) auditar(); const b = $("audit-ver"); b.textContent = t(b.getAttribute("aria-expanded") === "true" ? "verMenos" : "verMas"); });

  // Cómo trabajo: avanza solo y celebra en el paso 5
  const pasos = qq("#pasos li"), pista = $("pasos"), frase = $("pasos-frase"), barra = $("pasos-progreso");
  let pi = -1, pt = null, fi = 0;
  const confeti = li => { const col = ["#231F20", "#F3E9DA", "#4A5F12", "#FFFFFF"]; for (let k = 0; k < 34; k++) { const c = document.createElement("i"); c.className = "confeti"; c.style.left = Math.random() * 100 + "%"; c.style.background = col[k % col.length]; c.style.setProperty("--cx", (Math.random() * 120 - 60).toFixed(0) + "px"); c.style.setProperty("--cr", (Math.random() * 720 - 360).toFixed(0) + "deg"); c.style.setProperty("--cdur", (1.2 + Math.random() * 1.1).toFixed(2) + "s"); c.style.animationDelay = (Math.random() * 0.25).toFixed(2) + "s"; li.append(c); setTimeout(() => c.remove(), 2800); } };
  function avanzar() {
    pi = (pi + 1) % (pasos.length + 2); const k = Math.min(pi, pasos.length - 1);
    pasos.forEach((li, i) => { li.classList.toggle("hecho", i <= k); li.classList.toggle("actual", i === k); });
    barra.style.setProperty("--pp", ((k + 1) / pasos.length).toFixed(3));
    if (matchMedia("(max-width: 860px)").matches) pista.scrollTo({ left: pasos[k].offsetLeft - (pista.clientWidth - pasos[k].offsetWidth) / 2, behavior: "smooth" });
    if (pi === pasos.length - 1) { confeti(pasos[k]); frase.replaceChildren(Object.assign(document.createElement("span"), { textContent: t("frases")[fi++ % t("frases").length] })); }
    if (pi === 0) frase.textContent = "";
  }
  if (red) { pasos.forEach(li => li.classList.add("hecho")); barra.style.setProperty("--pp", 1); }
  else new IntersectionObserver(([e]) => { clearInterval(pt); if (e.isIntersecting) { avanzar(); pt = setInterval(avanzar, 2200); } }, { threshold: 0.35 }).observe($("como-trabajo"));
})();

// Pago con Mercado Pago Checkout Pro: el servidor define el monto y devuelve la URL de pago.
$("link-pago").addEventListener("click", async (e) => {
  e.preventDefault();
  const lp = e.currentTarget;
  const pago = new FormData($("form-pago")).get("pago");
  if (pago !== "Mercado Pago" || lp.getAttribute("aria-disabled") === "true" || lp.dataset.cargando) return;
  const texto = lp.textContent;
  lp.dataset.cargando = "1";
  lp.textContent = t("conectandoMP");
  try {
    const r = await fetch("/api/crear-pago", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ plan: actual, moneda: monedaActual() })
    });
    const d = await r.json().catch(() => ({}));
    if (!r.ok || !d.url) throw new Error(d.error || "error");
    location.href = d.url;
  } catch (err) {
    lp.textContent = texto;
    delete lp.dataset.cargando;
    $("error-pago").hidden = false;
    $("link-wa").hidden = false;
  }
});


// ===== Instagram: últimas publicaciones en el pie =====
// Si la conexión con Instagram no está lista o falla, queda el acceso al perfil.
(async () => {
  const feed = document.getElementById("feed-instagram");
  if (!feed) return;
  try {
    const r = await fetch("/api/instagram");
    if (!r.ok) return;
    const { publicaciones = [] } = await r.json();
    if (!publicaciones.length) return;
    feed.replaceChildren(...publicaciones.slice(0, 6).map(p => {
      const a = document.createElement("a");
      a.href = p.url; a.target = "_blank"; a.rel = "noopener noreferrer";
      if (p.video) a.className = "video";
      const img = document.createElement("img");
      img.src = p.imagen; img.alt = p.texto ? "Instagram: " + p.texto : t("igAlt");
      img.width = 320; img.height = 320; img.loading = "lazy"; img.decoding = "async";
      a.append(img); return a;
    }));
    feed.hidden = false;
  } catch { /* queda el acceso al perfil */ }
})();
