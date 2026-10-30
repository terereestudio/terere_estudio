// Inicio v2. Origen: prototipo terere-v2.html
"use strict";
const WA = "543644328260";
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
function dibujarPlanes() {
  const t = TXT_PLAN[idioma] || TXT_PLAN.es;
  const extra = idioma === "en" ? EN_PLANES : idioma === "pt" ? PT_PLANES : null;
  const precios = PRECIOS[monedaActual()];
  lista.replaceChildren();
  for (const [id, base] of Object.entries(PLANES)) {
    if (base.oculto) continue;
    const p = { ...base, corto: CORTO[id], ...precios[id], ...(extra ? extra[id] : {}) };
    const art = document.createElement("article");
    art.className = "plan" + (p.destacado ? " destacado" : "");
    if (p.destacado) { const e = document.createElement("span"); e.className = "plan-etiqueta"; e.textContent = t.rec; art.append(e); }
    const sub = document.createElement("p"); sub.className = "mono"; sub.textContent = p.sub;
    const h = document.createElement("h3"); h.textContent = p.nombre;
    const para = document.createElement("p"); para.className = "plan-para"; para.textContent = extra ? p.corto + "." : p.para;
    const corto = document.createElement("p"); corto.className = "plan-corto"; corto.textContent = p.corto;
    const pr = document.createElement("div"); pr.className = "precio";
    const det = document.createElement("span"); det.className = "precio-detalle"; det.textContent = p.detalle;
    const m = document.createElement("span"); m.className = "precio-monto"; m.textContent = p.monto;
    const cu = document.createElement("span"); cu.className = "precio-detalle precio-cuota"; cu.textContent = p.cuota;
    pr.append(det, m, cu);
    const ul = document.createElement("ul");
    p.puntos.forEach(x => { const li = document.createElement("li"); li.textContent = x; ul.append(li); });
    const ent = document.createElement("p"); ent.className = "plan-entrega"; ent.textContent = t.entrega + p.entrega;
    const acc = document.createElement("div"); acc.className = "plan-acciones";
    const vm = document.createElement("button"); vm.className = "boton boton-borde ver-mas"; vm.type = "button"; vm.textContent = t.verMas; vm.addEventListener("click", () => abrir(id, 1));
    const b = document.createElement("button"); b.className = "boton"; b.type = "button"; b.textContent = t.conseguir; b.addEventListener("click", () => abrir(id, window.matchMedia("(max-width: 767px)").matches ? 2 : 1));
    acc.append(vm, b);
    art.append(sub, h, para, corto, pr, ul, ent, acc);
    art.addEventListener("pointermove", ev => { const r = art.getBoundingClientRect(); art.style.setProperty("--mx", (ev.clientX - r.left) + "px"); art.style.setProperty("--my", (ev.clientY - r.top) + "px"); });
    lista.append(art);
  }
}
dibujarPlanes();

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

const carrusel = document.getElementById("carrusel-clientes");
const pasoCarrusel = () => carrusel.firstElementChild.getBoundingClientRect().width + parseFloat(getComputedStyle(carrusel).columnGap || 16);
const moverCarrusel = dir => {
  const fin = carrusel.scrollWidth - carrusel.clientWidth - 4;
  if (dir > 0 && carrusel.scrollLeft >= fin) carrusel.scrollTo({ left: 0, behavior: reducido ? "auto" : "smooth" });
  else if (dir < 0 && carrusel.scrollLeft <= 4) carrusel.scrollTo({ left: fin + 4, behavior: reducido ? "auto" : "smooth" });
  else carrusel.scrollBy({ left: dir * pasoCarrusel(), behavior: reducido ? "auto" : "smooth" });
};
document.querySelectorAll("[data-mover]").forEach(b => b.addEventListener("click", () => moverCarrusel(Number(b.dataset.mover))));
// Avance automático: se pausa con el mouse encima, al tocar o mantener pulsado, o con el foco; retoma solo.
let pausado = false, carruselVisible = false, reanudar = null;
const pausar = () => { pausado = true; clearTimeout(reanudar); };
const soltar = (demora = 2500) => { clearTimeout(reanudar); reanudar = setTimeout(() => { pausado = false; }, demora); };
carrusel.addEventListener("mouseenter", pausar);
carrusel.addEventListener("mouseleave", () => soltar(600));
carrusel.addEventListener("pointerdown", pausar);
carrusel.addEventListener("touchstart", pausar, { passive: true });
carrusel.addEventListener("touchend", () => soltar());
carrusel.addEventListener("pointerup", e => { if (e.pointerType !== "mouse") soltar(); });
carrusel.addEventListener("focusin", pausar);
carrusel.addEventListener("focusout", () => soltar(600));
new IntersectionObserver(([e]) => { carruselVisible = e.isIntersecting; }, { threshold: 0.4 }).observe(carrusel);
if (!reducido) setInterval(() => { if (!pausado && carruselVisible && !document.hidden) moverCarrusel(1); }, 3200);

// En pantallas táctiles, el primer toque muestra el mensaje del cliente y el segundo abre su página.
carrusel.querySelectorAll(".cliente").forEach(c => {
  c.addEventListener("click", e => {
    if (!window.matchMedia("(hover: none)").matches) return;
    if (!c.classList.contains("activo")) { e.preventDefault(); carrusel.querySelectorAll(".cliente.activo").forEach(o => o.classList.remove("activo")); c.classList.add("activo"); pausar(); soltar(4000); }
  });
});

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

// Recorrido de "Cómo trabajo"
const recorrido = $("recorrido");
const pasosLi = [...recorrido.querySelectorAll(".pasos li")];
const progreso = recorrido.querySelector(".progreso");
const vertical = () => window.matchMedia("(max-width: 767px)").matches;
const puntoCentro = li => { const r = li.querySelector(".punto").getBoundingClientRect(), c = recorrido.getBoundingClientRect(); return { x: r.left - c.left + r.width / 2, y: r.top - c.top + r.height / 2 }; };
const pista = recorrido.querySelector(".pista");
function ajustarPista() {
  const a = puntoCentro(pasosLi[0]), z = puntoCentro(pasosLi[pasosLi.length - 1]);
  if (vertical()) { pista.style.width = "2px"; pista.style.height = (z.y - a.y) + "px"; }
  else { pista.style.height = "2px"; pista.style.width = (z.x - a.x) + "px"; }
}
function marcar(n) {
  ajustarPista();
  pasosLi.forEach((li, i) => li.classList.toggle("lleno", i <= n));
  const a = puntoCentro(pasosLi[0]), b = puntoCentro(pasosLi[Math.max(n, 0)]);
  if (vertical()) { progreso.style.width = "2px"; progreso.style.height = (n < 0 ? 0 : b.y - a.y) + "px"; }
  else { progreso.style.height = "2px"; progreso.style.width = (n < 0 ? 0 : b.x - a.x) + "px"; }
}
if (reducido) marcar(pasosLi.length - 1);
else {
  let paso = -1, enPantalla = false;
  new IntersectionObserver(([e]) => { enPantalla = e.isIntersecting; }, { threshold: 0.3 }).observe(recorrido);
  const ciclo = () => {
    if (enPantalla && !document.hidden) {
      paso = paso >= pasosLi.length - 1 ? -1 : paso + 1;
      marcar(paso);
    }
    setTimeout(ciclo, paso === pasosLi.length - 1 ? 2200 : paso === -1 ? 700 : 1300);
  };
  ciclo();
  window.addEventListener("resize", () => marcar(paso));
}

// Idiomas: traducción propia (sin el traductor del navegador)
const EN = {
  verPlanes: "See plans", ceja: "// pure code, made in Corrientes, Argentina", h1a: "Websites and landing pages", h1b: "made to measure", h1c: ", in pure code",
  bajada: "I design and build fast, secure websites ready to sell, for businesses in Argentina and around the world.",
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
  mPasos: "// how I work", hPasos: "From idea to website, in four steps",
  p1h: "You pick a plan", p1p: "Tell me your idea and pay here or arrange it on WhatsApp.",
  p2h: "Custom design", p2p: "I build the proposal with your brand, texts and photos.",
  p3h: "We review together", p3p: "We adjust whatever is needed before going live.",
  p4h: "Your site goes live", p4p: "I publish your site with domain, hosting and security ready.",
  mPie: "// let's talk", hPie: "Shall we build your website?", pPie: "Message me, tell me your idea and I'll get back to you shortly.", btnWa: "Message me on WhatsApp →",
  mFeed: "// latest on instagram", desarrollado: "Developed by", firmaTip: "It ain't much, but it's honest work",
  ps1: "Looking for hair removal?", ps2: "Book with Flor →", pm1: "Laser hair removal", pm2: "with Flor →", promoHR: "Got a legal problem? HR Estudio Jurídico can help you in Chaco, Argentina →", globo: "Want to know more? Tap here", pronto: "soon", d6: "Lab", m1: "Plans", m2: "Work", m3: "How I work", m4: "Contact", m6: "Lab", d1: "Plans", d2: "Work", d3: "How I work", d4: "Contact"
};
const PT = {
  verPlanes: "Ver planos", ceja: "// código puro, feito em Corrientes, Argentina", h1a: "Sites e landing pages", h1b: "sob medida", h1c: ", em código puro",
  bajada: "Desenho e desenvolvo sites rápidos, seguros e prontos para vender, para negócios da Argentina e do mundo.",
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
  mPasos: "// como trabalho", hPasos: "Da ideia ao seu site, em quatro passos",
  p1h: "Você escolhe o plano", p1p: "Me conta sua ideia e paga por aqui ou combinamos pelo WhatsApp.",
  p2h: "Design sob medida", p2p: "Monto a proposta com sua marca, seus textos e suas fotos.",
  p3h: "Revisamos juntos", p3p: "Ajustamos o que for preciso antes de publicar.",
  p4h: "Seu site no ar", p4p: "Publico seu site com domínio, hospedagem e segurança prontos.",
  mPie: "// vamos conversar", hPie: "Vamos criar seu site?", pPie: "Me chama, conta sua ideia e eu respondo o quanto antes.", btnWa: "Falar no WhatsApp →",
  mFeed: "// últimas publicações no instagram", desarrollado: "Desenvolvido por", firmaTip: "Não é muito, mas é trabalho honesto",
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
