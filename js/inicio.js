// Inicio v2. Origen: prototipo terere-v3.html
"use strict";
const WA = "5493644328260";
const PLANES = {
  base: {
    nombre: "Plan Base", sub: "// landing page estática", para: "Para profesionales y negocios que quieren presentar sus servicios.",
    detalle: "Pago único",
    entrega: "en el día · máximo 2 días hábiles",
    destacado: false,
    puntos: ["Página a medida en código puro", "Dominio y hosting por un año", "Primer mes de cambios incluido", "Botón de WhatsApp y SEO básico"],
    incluye: ["Diseño a medida de una página", "Versión para celular y PC", "Dominio y hosting por un año", "Certificado de seguridad (HTTPS)", "Mantenimiento y personalización del primer mes", "Botón de WhatsApp y formulario de contacto"],
    noIncluye: ["Cambios después del primer mes", "Catálogo de productos o turnos", "Cobros en línea"],
    temporalidad: "Pagás una sola vez y la página es tuya. Dominio y hosting incluidos durante el primer año."
  },
  emprendedor: {
    nombre: "Plan Catálogo", sub: "// catálogo con pedido por WhatsApp", para: "Para emprendedores que venden por WhatsApp y quieren mostrar sus productos.",
    detalle: "Entrada",
    entrega: "≈ 10 días hábiles",
    destacado: true,
    puntos: ["Catálogo con fotos, precios y variantes", "Carrito que arma el pedido", "El pedido llega a tu WhatsApp", "Cargo y edito tus productos cada mes"],
    incluye: ["Catálogo con fotos, precios y variantes (talle, color)", "Carrito guardado en el navegador del cliente", "Pedido armado que llega a tu WhatsApp", "Carga, edición y baja de productos cada mes", "Productos agotados y banners de temporada"],
    noIncluye: ["Control de stock automático", "Cobro en línea dentro de la página (se suma como adicional)"],
    temporalidad: "Pagás los meses que quieras. Si dejás la cuota, el sitio sigue siendo tuyo, pero ya no se actualiza."
  },
  tienda: {
    oculto: true,
    nombre: "Plan Tienda Online", sub: "// tienda online propia", para: "Para negocios que quieren vender y cobrar en línea con su propia tienda.",
    detalle: "Desde",
    entrega: "a definir según el catálogo", destacado: false,
    puntos: ["Tienda propia en código puro", "Carrito y cobro en línea", "Panel para gestionar productos", "Dominio, hosting y seguridad"],
    incluye: ["Tienda online propia en código puro", "Carrito de compras", "Cobro en línea con pasarela de pagos", "Panel para gestionar productos", "Dominio, hosting y certificado de seguridad"],
    noIncluye: ["Comisiones de la pasarela de pagos (las cobra la pasarela)"],
    temporalidad: "Plan preparado, pero oculto hasta tener la primera tienda propia publicada."
  },
  servicios: {
    nombre: "Plan Servicios", sub: "// turnos online", para: "Para profesionales que trabajan con turnos: peluquería, estética, consultorios.",
    detalle: "Entrada",
    entrega: "≈ 2 días hábiles",
    destacado: false,
    puntos: ["Tus servicios con precio", "Reserva de turnos por día y horario", "Panel para gestionar tus turnos", "Pago coordinado por WhatsApp"],
    incluye: ["Página con tus servicios y precios", "Reserva de turnos online por día y horario", "Panel para ver y gestionar tus turnos", "Aviso del turno por WhatsApp", "Mantenimiento mensual"],
    noIncluye: ["Cobro en línea (Mercado Pago, como adicional)", "Catálogo de productos"],
    temporalidad: "Pagás los meses que quieras. La agenda de turnos funciona mientras la cuota esté activa."
  }
};

const EN_PLANES = {
  base: { nombre: "Base Plan", sub: "// static landing page", corto: "For professionals and businesses", monto: "USD 100", detalle: "One-time payment", cuota: "Later changes quoted separately", entrega: "same day · 2 business days max", puntos: ["Custom page in pure code", "Domain and hosting for one year", "First month of changes included", "WhatsApp button and basic SEO"] },
  emprendedor: { nombre: "Catalog Plan", sub: "// catalog with WhatsApp orders", corto: "For entrepreneurs who sell on WhatsApp", monto: "USD 70", detalle: "Setup", cuota: "+ USD 18 per month", entrega: "≈ 10 business days", puntos: ["Catalog with photos, prices and variants", "Cart that builds the order", "Orders arrive on your WhatsApp", "I add and edit your products every month"] },
  tienda: { nombre: "Online Store Plan", sub: "// your own online store", corto: "For businesses that want to sell online", monto: "USD 350", detalle: "From", cuota: "Maintenance to be agreed", entrega: "depends on the catalog", puntos: ["Your own store in pure code", "Cart and online payments", "Panel to manage products", "Domain, hosting and security"] },
  servicios: { nombre: "Services Plan", sub: "// online booking", corto: "For professionals who take bookings", monto: "USD 70", detalle: "Setup", cuota: "+ USD 18 per month", entrega: "≈ 2 business days", puntos: ["Your services with prices", "Booking by day and time", "Panel to manage your bookings", "Payment arranged on WhatsApp"] }
};
const CORTO = { tienda: "Para negocios que quieren vender en línea", base: "Para profesionales y negocios", emprendedor: "Para emprendedores que venden por WhatsApp", servicios: "Para profesionales que trabajan con turnos" };
let idioma = "es";
const lista = document.getElementById("lista-planes");
const PT_PLANES = {
  base: { nombre: "Plano Base", sub: "// landing page estática", corto: "Para profissionais e negócios", monto: "USD 100", detalle: "Pagamento único", cuota: "Alterações posteriores: a combinar", entrega: "no mesmo dia · até 2 dias úteis", puntos: ["Página sob medida em código puro", "Domínio e hospedagem por um ano", "Primeiro mês de alterações incluído", "Botão de WhatsApp e SEO básico"] },
  emprendedor: { nombre: "Plano Catálogo", sub: "// catálogo com pedido pelo WhatsApp", corto: "Para empreendedores que vendem pelo WhatsApp", monto: "USD 70", detalle: "Entrada", cuota: "+ USD 18 por mês", entrega: "≈ 10 dias úteis", puntos: ["Catálogo com fotos, preços e variações", "Carrinho que monta o pedido", "O pedido chega no seu WhatsApp", "Cadastro e edito seus produtos todo mês"] },
  servicios: { nombre: "Plano Serviços", sub: "// agendamento online", corto: "Para profissionais que trabalham com horário marcado", monto: "USD 70", detalle: "Entrada", cuota: "+ USD 18 por mês", entrega: "≈ 2 dias úteis", puntos: ["Seus serviços com preço", "Agendamento por dia e horário", "Painel para gerenciar seus horários", "Pagamento combinado pelo WhatsApp"] },
  tienda: { nombre: "Plano Loja Online", sub: "// sua própria loja online", corto: "Para negócios que querem vender online", monto: "USD 350", detalle: "A partir de", cuota: "Manutenção a combinar", entrega: "conforme o catálogo", puntos: ["Loja própria em código puro", "Carrinho e pagamento online", "Painel de produtos", "Domínio, hospedagem e segurança"] }
};
const TXT_PLAN = {
  es: { rec: "recomendado", verMas: "Ver más", conseguir: "Conseguir el plan", entrega: "entrega: " },
  en: { rec: "recommended", verMas: "See more", conseguir: "Get the plan", entrega: "delivery: " },
  pt: { rec: "recomendado", verMas: "Ver mais", conseguir: "Quero este plano", entrega: "entrega: " }
};
// Precios por moneda. ARS solo para visitantes de Argentina que navegan en español;
// en cualquier otro caso (otro país o idioma distinto de español) se muestra USD.
const PRECIOS = {
  ars: {
    base: { monto: "$150.000", cuota: "Cambios posteriores desde $25.000" },
    emprendedor: { monto: "$100.000", cuota: "+ $25.000 por mes" },
    servicios: { monto: "$100.000", cuota: "+ $25.000 por mes" },
    tienda: { monto: "$500.000", cuota: "Mantenimiento a convenir" }
  },
  usd: {
    base: { monto: "USD 100", cuota: "Cambios posteriores: a definir" },
    emprendedor: { monto: "USD 70", cuota: "+ USD 18 por mes" },
    servicios: { monto: "USD 70", cuota: "+ USD 18 por mes" },
    tienda: { monto: "USD 350", cuota: "Mantenimiento a convenir" }
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
  const q = PRECIOS[monedaActual()][id];
  if (id === "base") return [["Pago", q.monto + " único"], ["Después", q.cuota], ["Entrega", PLANES.base.entrega]];
  if (id === "tienda") return [["Desde", q.monto], ["Mantenimiento", "A convenir"], ["Entrega", "Según el catálogo"]];
  return [["Entrada", q.monto], ["Cuota", q.cuota.replace(/^\+ /, "")], ["Entrega", PLANES[id].entrega]];
}
// ===== Planes: carrusel 3D con números y detalle =====
const DETALLE = {
  base: { clase: "base", tag: "Pago único", para: "Tu presencia propia en internet, lista en uno o dos días.", bajada: "Una página que trabaja por vos: te presenta, te posiciona y lleva cada visita a tu WhatsApp.",
    puntos: [["Tu nombre propio en internet", "Una dirección que es tuya, como tunegocio.com.ar. Tu marca deja de depender de una red social y gana un lugar que nadie te puede apagar."],
      ["Lista en uno o dos días", "Diseño a medida, adaptada a celular y computadora, sin plantillas. Mientras otros esperan semanas, vos ya estás en línea."],
      ["Encontrable en Google y en la IA", "Títulos, descripción, datos estructurados y velocidad pensados para buscadores (SEO) y para asistentes como ChatGPT o Gemini (GEO)."],
      ["Un año resuelto", "Dominio, hosting, certificado de seguridad y el primer mes de cambios incluidos. Después, cada ajuste se cotiza aparte."]],
    entrega: "En el día o, como máximo, en dos días hábiles." },
  emprendedor: { clase: "catalogo", tag: "El más pedido", para: "Tu vidriera abierta las 24 horas, con pedidos directo a tu WhatsApp.", bajada: "El comercio de hoy pasa por el celular. Tu catálogo, ordenado y siempre abierto, convierte cada visita en un pedido.",
    puntos: [["Una vidriera que no cierra", "Tus productos por categoría, con fotos, precios y variantes como talle o color. Se encuentran en segundos, a cualquier hora."],
      ["El pedido llega armado", "Tu cliente elige, el carrito suma y el pedido te llega listo por WhatsApp. Vos confirmás y cerrás la venta a tu manera, sin comisiones por venta."],
      ["Productos que aparecen cuando los buscan", "Cada producto con nombre, descripción y datos estructurados para que Google y los asistentes de IA lo muestren a quien lo busca."],
      ["Siempre actualizado", "Cada mes cargo, edito y marco agotados. Promos y temporadas sin que tengas que tocar una línea de código."]],
    entrega: "Alrededor de diez días hábiles, según la cantidad de productos." },
  servicios: { clase: "servicios", tag: "Turnos online", para: "Tus servicios a la vista y tu agenda llenándose sola.", bajada: "Tu agenda trabaja aunque estés atendiendo: tus clientes eligen día y horario en tu página.",
    puntos: [["Lo que hacés, explicado con claridad", "Cada servicio con su precio, duración y fotos. Tu cliente llega sabiendo qué quiere y cuánto cuesta."],
      ["Turnos las 24 horas", "Reservan por día y horario desde el celular, incluso fuera de tu horario de atención."],
      ["Para que te encuentren cerca", "SEO local para aparecer cuando alguien busca tu servicio en tu ciudad, en Google, en Maps y en los asistentes de IA."],
      ["Tu agenda bajo control", "Un panel para ver y gestionar los turnos, con aviso por WhatsApp para que nadie se olvide."]],
    entrega: "Alrededor de dos días hábiles." }
};
const PAGO_TXT = "Con Mercado Pago (tarjetas, dinero en cuenta y cuotas sin tarjeta) o por transferencia, a convenir.";
const TXT_CF = { es: ["Ver qué incluye", "Contratar"], en: ["What's included", "Get the plan"], pt: ["O que inclui", "Quero este plano"] };
let planActual = 1, idsVisibles = [];
function dibujarPlanes() {
  const extra = idioma === "en" ? EN_PLANES : idioma === "pt" ? PT_PLANES : null;
  const precios = PRECIOS[monedaActual()];
  const [tVer, tContratar] = TXT_CF[idioma] || TXT_CF.es;
  idsVisibles = Object.keys(PLANES).filter(id => !PLANES[id].oculto);
  lista.replaceChildren();
  const numeros = $("cf-numeros"); numeros.replaceChildren();
  idsVisibles.forEach((id, i) => {
    const p = { ...PLANES[id], corto: CORTO[id], ...precios[id], ...(extra ? extra[id] : {}) };
    const d = DETALLE[id] || {};
    const t = document.createElement("article");
    t.className = "cf-tarjeta " + (d.clase || id);
    t.dataset.i = i;
    t.innerHTML = `<div class="cf-top"><span class="cf-num">0${i + 1}</span><span class="cf-tag"></span></div><h3></h3><p class="cf-para"></p><div class="cf-precio"><span class="det"></span><b></b><span class="cuota"></span></div><ul></ul><div class="cf-acciones"><button type="button" class="boton boton-borde ver"></button><button type="button" class="boton contratar"></button></div>`;
    t.querySelector(".cf-tag").textContent = d.tag || "";
    t.querySelector("h3").textContent = p.nombre;
    t.querySelector(".cf-para").textContent = extra ? p.corto + "." : (d.para || p.para);
    t.querySelector(".det").textContent = p.detalle;
    t.querySelector(".cf-precio b").textContent = p.monto;
    t.querySelector(".cuota").textContent = p.cuota;
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
  const id = idsVisibles[planActual], p = PLANES[id], d = DETALLE[id];
  if (!d) return;
  $("det-titulo").textContent = `${p.nombre}, punto por punto`;
  $("det-bajada").textContent = d.bajada;
  $("det-lista").replaceChildren(...d.puntos.map(([h, t], i) => {
    const li = document.createElement("li");
    li.innerHTML = `<b>0${i + 1}</b><div><h4></h4><p></p></div>`;
    li.querySelector("h4").textContent = h; li.querySelector("p").textContent = t;
    return li;
  }));
  $("det-datos").replaceChildren(...[["¿Cuánto tarda?", d.entrega], ["¿Cómo pago?", PAGO_TXT]].map(([k, v]) => {
    const div = document.createElement("div"), dt = document.createElement("dt"), dd = document.createElement("dd");
    dt.textContent = k; dd.textContent = v; div.append(dt, dd); return div;
  }));
  $("det-contratar").textContent = `Contratar el ${p.nombre}`;
  const q = $("det-consulta"); q.href = `https://wa.me/${WA}?text=${encodeURIComponent(`Hola Leonardo, tengo una duda sobre el ${p.nombre}.`)}`; q.target = "_blank"; q.rel = "noopener noreferrer";
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
  actual = id; const p = PLANES[id];
  $("ventana-titulo").textContent = p.nombre; $("ventana-sub").textContent = p.sub;
  $("resumen").replaceChildren(...resumenDe(id).map(([k, v]) => { const d = document.createElement("div"); const dt = document.createElement("dt"); dt.textContent = k; const dd = document.createElement("dd"); dd.textContent = v; d.append(dt, dd); return d; }));
  llenarLista($("incluye"), p.incluye); llenarLista($("no-incluye"), p.noIncluye);
  $("temporalidad").textContent = p.temporalidad;
  irA(paso);
  ventana.showModal();
}
ventana.addEventListener("click", e => {
  if (e.target === ventana || e.target.closest("[data-cerrar]")) ventana.close();
  const ir = e.target.closest("[data-ir]"); if (ir) irA(Number(ir.dataset.ir));
});

$("form-datos").addEventListener("submit", e => {
  e.preventDefault();
  const nombre = $("f-nombre").value.trim();
  const err = $("error-datos");
  if (nombre.length < 3) { err.textContent = "Escribí tu nombre completo para que sepa con quién hablo."; err.hidden = false; $("f-nombre").focus(); return; }
  if (!$("f-acepto").checked) { err.textContent = "Para seguir, aceptá el uso de tus datos para responderte."; err.hidden = false; return; }
  err.hidden = true;
  datos.nombre = nombre; datos.rubro = $("f-rubro").value.trim(); datos.idea = $("f-idea").value.trim();
  irA(3);
});
$("form-pago").addEventListener("change", actualizarFinal);

function actualizarFinal() {
  if (!actual) return;
  const p = PLANES[actual];
  const pago = new FormData($("form-pago")).get("pago");
  const convenir = pago === "A convenir";
  const lineas = [
    convenir ? `Hola Leonardo, quiero contratar el ${p.nombre} de Tereré Estudio y coordinar el pago.` : `Hola Leonardo, acabo de contratar el ${p.nombre} de Tereré Estudio.`,
    `Soy ${datos.nombre || "(tu nombre)"}${datos.rubro ? ` (${datos.rubro})` : ""}.`,
    datos.idea ? `Mi idea: ${datos.idea}` : "",
    `Forma de pago: ${pago}.`
  ].filter(Boolean);
  const texto = lineas.join("\n");
  $("previa").textContent = texto;
  $("link-wa").href = `https://wa.me/${WA}?text=${encodeURIComponent(texto)}`;
  $("link-wa").textContent = convenir ? "Escribirle a Leonardo →" : "Ya pagué: avisarle a Leonardo →";
  const lp = $("link-pago");
  const esMP = pago === "Mercado Pago";
  lp.hidden = convenir;
  lp.textContent = `Pagar con ${pago}`;
  lp.removeAttribute("target");
  if (esMP) { lp.removeAttribute("aria-disabled"); lp.removeAttribute("title"); }
  else { lp.setAttribute("aria-disabled", "true"); lp.title = "Este medio de pago todavía no está disponible"; }
  $("link-wa").hidden = esMP;
  $("error-pago").hidden = true;
  const pasos = convenir
    ? ["Tocá el botón y se abre WhatsApp con tu pedido.", "Coordinamos la transferencia o el pago en efectivo.", "Arrancamos con tu proyecto."]
    : esMP
      ? ["Tocá \"Pagar con Mercado Pago\": te llevamos a Mercado Pago para pagar.", "Al terminar volvés a mi página y me avisás por WhatsApp con un toque.", "Confirmo el pago y arrancamos."]
      : ["Este medio de pago todavía no está disponible.", "Elegí Mercado Pago o A convenir."];
  llenarLista($("instrucciones"), pasos);
}

const waGeneral = `https://wa.me/${WA}?text=${encodeURIComponent("Hola Leonardo, vi tu página y quiero hacerte una consulta.")}`;
document.querySelectorAll("[data-whatsapp]").forEach(a => { a.href = waGeneral; a.target = "_blank"; a.rel = "noopener noreferrer"; });
$("cotizar").href = `https://wa.me/${WA}?text=${encodeURIComponent("Hola Leonardo, busco algo a mi medida y quiero armar mi proyecto.")}`;
$("cotizar").target = "_blank"; $("cotizar").rel = "noopener noreferrer";

document.querySelectorAll("[data-pendiente]").forEach(a => { a.title = "Enlace pendiente"; a.addEventListener("click", e => e.preventDefault()); });
const dockBoton = document.querySelector(".dock-boton"), dockMenu = $("dock-menu");
const cerrarDock = () => { dockMenu.hidden = true; dockBoton.setAttribute("aria-expanded", "false"); dockBoton.setAttribute("aria-label", "Abrir menú"); };
dockBoton.addEventListener("click", () => { const abrirlo = dockMenu.hidden; dockMenu.hidden = !abrirlo; dockBoton.setAttribute("aria-expanded", String(abrirlo)); dockBoton.setAttribute("aria-label", abrirlo ? "Cerrar menú" : "Abrir menú"); });
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

// Idiomas: traducción propia (sin el traductor del navegador)
const EN = {
  verPlanes: "See plans", ceja: "// from Corrientes to the world", h1a: "Your business, on a page that", h1b: "sells", h1c: ".",
  bajada: "Custom landing pages in pure code. Fast, easy to find on Google and AI, and built so people reach out.",
  btnPlan: "Get your plan →", btnTrabajos: "See my work", item2: "WhatsApp catalogs", item3: "Online booking", hola: "Hi, I'm ", founder: "founder of Tereré Estudio",
  mPlanes: "// plans", hPlanes: "Pick your plan and let's start today", pPlanes: "Clear prices, short timelines and direct contact with me. Tap a plan to see everything it includes.",
  medidaA: "Looking for something custom?", medidaB: "Message me on WhatsApp and we'll plan your project together.", cotizar: "Chat on WhatsApp →", cpServicios: "Services Plan", cpBase: "Base Plan", cdSilk: "Website with online booking", cdHR: "Brand identity and landing page", cpVacio: "plan", cdVacio: "Project description", promoVacio: "Client promo message →", capPend: "screenshot pending",
  nota: "* Prices in US dollars for clients outside Argentina. This is a starting price and may change depending on what your project needs.",
  pagarCon: "You can pay with", chip1: "Digital wallets", chip2: "Installments", chip3: "Bank transfer", chip4: "Cash",
  mClientes: "// clients", hClientes: "They trusted me", verPortfolio: "See the full portfolio →",
  mValores: "// why tereré", hValores: "What you'll notice",
  v1m: "security", v1h: "Secure from day one", v1p: "Encryption, anti-spam forms and best practices against common attacks.",
  v2m: "speed", v2h: "Loads instantly", v2p: "Pure code, no templates or plugins. Fast even on a weak signal.",
  v3m: "trust", v3h: "You talk to me", v3p: "Clear prices and everything agreed in writing before we start.",
  v4m: "innovation", v4h: "New tools", v4p: "I use artificial intelligence so your business moves faster.",
  v5m: "creativity", v5h: "Made for you", v5p: "Design with your brand's identity, not just another template.",
  mPasos: "// how I work", hPasos: "From idea to website, in five steps",
  p1h: "You pick a plan", p1p: "Tell me your idea and pay here or arrange it on WhatsApp.",
  p2h: "Custom design", p2p: "I build the proposal with your brand, texts and photos.",
  p3h: "We review together", p3p: "We adjust whatever is needed before going live.",
  p4h: "Your site goes live", p4p: "I publish your site with domain, hosting and security ready.",
  mPie: "// let's talk", hPie: "Shall we build your website?", pPie: "Message me, tell me your idea and I'll get back to you shortly.", btnWa: "Message me on WhatsApp →",
  mFeed: "// latest on instagram", desarrollado: "Developed by", firmaTip: "It ain't much, but it's honest work", versiones: "Previous versions of this site",
  ps1: "Looking for hair removal?", ps2: "Book with Flor →", pm1: "Laser hair removal", pm2: "with Flor →", promoHR: "Got a legal problem? HR Estudio Jurídico can help you in Chaco, Argentina →", globo: "Want to know more? Tap here", pronto: "soon", d6: "Lab", m1: "Plans", m2: "Work", m3: "How I work", m4: "Contact", m6: "Lab", d1: "Plans", d2: "Work", d3: "How I work", d4: "Contact"
};
const PT = {
  verPlanes: "Ver planos", ceja: "// de Corrientes para o mundo", h1a: "Seu negócio, numa página que", h1b: "vende", h1c: ".",
  bajada: "Landing pages sob medida, em código puro. Rápidas, fáceis de achar no Google e na IA, e feitas para que te chamem.",
  btnPlan: "Quero meu plano →", btnTrabajos: "Ver trabalhos", item2: "Catálogos com WhatsApp", item3: "Agendamento online", hola: "Oi, eu sou ", founder: "fundador da Tereré Estudio",
  mPlanes: "// planos", hPlanes: "Escolha seu plano e começamos hoje", pPlanes: "Preços claros, prazos curtos e contato direto comigo. Toque em um plano para ver tudo o que inclui.",
  medidaA: "Procura algo sob medida?", medidaB: "Me chama no WhatsApp e montamos seu projeto juntos.", cotizar: "Falar no WhatsApp →", cpServicios: "Plano Serviços", cpBase: "Plano Base", cdSilk: "Site com agendamento online", cdHR: "Identidade visual e landing page", cpVacio: "plano", cdVacio: "Descrição do trabalho", promoVacio: "Mensagem promocional do cliente →", capPend: "captura pendente",
  pagarCon: "Você pode pagar com", chip1: "Carteiras digitais", chip3: "Transferência", chip4: "Dinheiro",
  mClientes: "// clientes", hClientes: "Confiaram em mim", verPortfolio: "Ver todo o portfólio →",
  ps1: "Quer se depilar?", ps2: "Agende com a Flor →", pm1: "Depilação a laser", pm2: "com a Flor →", promoHR: "Tem algum problema jurídico? O HR Estudio Jurídico pode te ajudar no Chaco, Argentina →",
  mValores: "// por que tereré", hValores: "O que você vai notar",
  v1m: "segurança", v1h: "Nasce protegido", v1p: "Criptografia, formulários antispam e boas práticas contra ataques comuns.",
  v2m: "velocidade", v2h: "Carrega num instante", v2p: "Código puro, sem templates nem plugins. Rápido mesmo com sinal fraco.",
  v3m: "confiança", v3h: "Você fala comigo", v3p: "Preços claros e tudo combinado por escrito antes de começar.",
  v4m: "inovação", v4h: "Ferramentas novas", v4p: "Uso inteligência artificial para o seu negócio avançar mais rápido.",
  v5m: "criatividade", v5h: "Feito para você", v5p: "Design com a identidade da sua marca, não só mais um template.",
  mPasos: "// como trabalho", hPasos: "Da ideia ao seu site, em cinco passos",
  p1h: "Você escolhe o plano", p1p: "Me conta sua ideia e paga por aqui ou combinamos pelo WhatsApp.",
  p2h: "Design sob medida", p2p: "Monto a proposta com sua marca, seus textos e suas fotos.",
  p3h: "Revisamos juntos", p3p: "Ajustamos o que for preciso antes de publicar.",
  p4h: "Seu site no ar", p4p: "Publico seu site com domínio, hospedagem e segurança prontos.",
  mPie: "// vamos conversar", hPie: "Vamos criar seu site?", pPie: "Me chama, conta sua ideia e eu respondo o quanto antes.", btnWa: "Falar no WhatsApp →",
  mFeed: "// últimas publicações no instagram", desarrollado: "Desenvolvido por", firmaTip: "Não é muito, mas é trabalho honesto", versiones: "Versões anteriores do site",
  globo: "Quer saber mais? Toque aqui", pronto: "em breve", d6: "Laboratório", m1: "Planos", m2: "Trabalhos", m3: "Como trabalho", m4: "Contato", m6: "Laboratório",
  d1: "Planos", d2: "Trabalhos", d3: "Como trabalho", d4: "Contato"
};
const ES = {};
document.querySelectorAll("[data-i18n]").forEach(el => { ES[el.dataset.i18n] = el.textContent; });
function aplicarIdioma(lang) {
  idioma = lang;
  const dic = lang === "en" ? EN : lang === "pt" ? PT : ES;
  document.querySelectorAll("[data-i18n]").forEach(el => { const t = dic[el.dataset.i18n]; if (t !== undefined) el.textContent = t; });
  document.documentElement.lang = { en: "en", pt: "pt-BR" }[lang] || "es-AR";
  $("idioma-actual").textContent = lang.toUpperCase();
  document.querySelectorAll("[data-idioma]").forEach(b => b.setAttribute("aria-checked", String(b.dataset.idioma === lang)));
  dibujarPlanes();
  try { localStorage.setItem("terere-idioma", lang); } catch (e) {}
}
const idiomaBoton = document.querySelector(".idioma-boton"), idiomaMenu = $("idioma-menu");
const cerrarIdioma = () => { idiomaMenu.hidden = true; idiomaBoton.setAttribute("aria-expanded", "false"); };
idiomaBoton.addEventListener("click", () => { const abrirlo = idiomaMenu.hidden; idiomaMenu.hidden = !abrirlo; idiomaBoton.setAttribute("aria-expanded", String(abrirlo)); });
idiomaMenu.addEventListener("click", e => { const b = e.target.closest("[data-idioma]"); if (b) { aplicarIdioma(b.dataset.idioma); cerrarIdioma(); } });
document.addEventListener("click", e => { if (!e.target.closest(".idioma")) cerrarIdioma(); });
document.addEventListener("keydown", e => { if (e.key === "Escape") cerrarIdioma(); });
try { const guardado = localStorage.getItem("terere-idioma"); if (guardado === "en" || guardado === "pt") aplicarIdioma(guardado); } catch (e) {}

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
  const encender = () => { vals.forEach((v, i) => v.classList.toggle("encendida", i === vi)); vi = (vi + 1) % vals.length; };
  if (!red) new IntersectionObserver(([e]) => { clearInterval(vt); if (e.isIntersecting) { encender(); vt = setInterval(encender, 2600); } }, { threshold: 0.3 }).observe($("valores"));

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
      ["SEO", titulo.length >= 30 && titulo.length <= 65, "Título", `${titulo.length} caracteres (ideal: 30 a 65)`, 1],
      ["SEO", desc.length >= 70 && desc.length <= 160, "Descripción", `${desc.length} caracteres (ideal: 70 a 160)`, 1],
      ["SEO", h1 === 1, "Un solo título principal", `${h1} H1 en la página`],
      ["SEO", !saltos, "Jerarquía de títulos", saltos ? "Hay saltos de nivel" : "Ordenada, sin saltos"],
      ["SEO", sinAlt === 0, "Textos alternativos", `${imgs.length - sinAlt} de ${imgs.length} imágenes con descripción`],
      ["SEO", !!document.querySelector('link[rel="canonical"]'), "URL canónica", document.querySelector('link[rel="canonical"]') ? "Definida" : "Falta"],
      ["SEO", !!og("og:title") && !!og("og:image"), "Vista al compartir", og("og:title") ? "Título e imagen para redes" : "Falta Open Graph"],
      ["GEO", tipos.has("ProfessionalService") || tipos.has("LocalBusiness"), "Negocio identificado", "Datos estructurados del estudio", 1],
      ["GEO", tipos.has("Offer"), "Planes con precio", "Ofertas legibles por la IA", 1],
      ["GEO", /Corrientes/.test(JSON.stringify(ld)), "Ubicación", "Corrientes, para búsquedas locales"],
      ["Velocidad", carga !== null && carga < 2500, "Carga inicial", carga !== null ? `${(carga / 1000).toFixed(2)} s` : "Sin dato", 1],
      ["Seguridad", location.protocol === "https:", "Conexión segura", location.protocol === "https:" ? "HTTPS" : "Sin HTTPS"],
      ["Seguridad", !!document.querySelector('meta[name="viewport"]'), "Apta para celular", "Diseño adaptable"]
    ];
    const fila = ([g, ok, nombre, det], i) => { const li = document.createElement("li"); li.innerHTML = `<span class="${ok ? "ok" : "ojo"}">${ok ? "✓" : "!"}</span><div><strong></strong><span class="det"></span></div>`; li.querySelector("strong").textContent = nombre; li.querySelector(".det").textContent = det; setTimeout(() => li.classList.add("listo"), red ? 0 : 120 + i * 90); return li; };
    $("audit-resumen").replaceChildren(...items.filter(x => x[4]).map(fila));
    const resto = $("audit-lista"); resto.replaceChildren(); let grupo = "";
    items.filter(x => !x[4]).forEach((x, i) => { if (x[0] !== grupo) { grupo = x[0]; resto.append(Object.assign(document.createElement("p"), { className: "audit-tipo", textContent: grupo })); } resto.append(fila(x, i)); });
    const puntaje = Math.round(items.filter(x => x[1]).length / items.length * 100), n = $("audit-n");
    if (red) { n.textContent = puntaje; return; }
    const t0 = performance.now(), dur = 1200; const paso = t => { const k = Math.min(1, (t - t0) / dur); n.textContent = Math.round(puntaje * (1 - Math.pow(1 - k, 3))); if (k < 1) requestAnimationFrame(paso); }; requestAnimationFrame(paso);
  }
  new IntersectionObserver(([e], o) => { if (e.isIntersecting) { o.disconnect(); auditar(); } }, { threshold: 0.3 }).observe($("auditoria"));
  $("audit-ver").addEventListener("click", e => { const b = e.currentTarget, abierto = $("audit-mas").classList.toggle("abierto"); b.setAttribute("aria-expanded", String(abierto)); b.textContent = abierto ? "Ver menos" : "Ver más"; });

  // Cómo trabajo: avanza solo y celebra en el paso 5
  const pasos = qq("#pasos li"), pista = $("pasos"), frase = $("pasos-frase"), barra = $("pasos-progreso");
  const FRASES = ["Tu negocio, abierto las 24 horas.", "Te encuentran en Google y en la IA.", "Vendés incluso mientras dormís.", "Tu marca, con nombre propio en internet."];
  let pi = -1, pt = null, fi = 0;
  const confeti = li => { const col = ["#231F20", "#F3E9DA", "#4A5F12", "#FFFFFF"]; for (let k = 0; k < 34; k++) { const c = document.createElement("i"); c.className = "confeti"; c.style.left = Math.random() * 100 + "%"; c.style.background = col[k % col.length]; c.style.setProperty("--cx", (Math.random() * 120 - 60).toFixed(0) + "px"); c.style.setProperty("--cr", (Math.random() * 720 - 360).toFixed(0) + "deg"); c.style.setProperty("--cdur", (1.2 + Math.random() * 1.1).toFixed(2) + "s"); c.style.animationDelay = (Math.random() * 0.25).toFixed(2) + "s"; li.append(c); setTimeout(() => c.remove(), 2800); } };
  function avanzar() {
    pi = (pi + 1) % (pasos.length + 2); const k = Math.min(pi, pasos.length - 1);
    pasos.forEach((li, i) => { li.classList.toggle("hecho", i <= k); li.classList.toggle("actual", i === k); });
    barra.style.setProperty("--pp", ((k + 1) / pasos.length).toFixed(3));
    if (matchMedia("(max-width: 860px)").matches) pista.scrollTo({ left: pasos[k].offsetLeft - (pista.clientWidth - pasos[k].offsetWidth) / 2, behavior: "smooth" });
    if (pi === pasos.length - 1) { confeti(pasos[k]); frase.replaceChildren(Object.assign(document.createElement("span"), { textContent: FRASES[fi++ % FRASES.length] })); }
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
  lp.textContent = "Conectando con Mercado Pago…";
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
