// Laboratorio v2. Origen: prototipo laboratorio.html
"use strict";
const reducido = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const $ = id => document.getElementById(id);

// Letras de neón por turnos
const letras = [...document.querySelectorAll(".palabra span")];
const grupos = [[0, 1], [2, 3], [4, 5], [6, 7], [8, 9, 10], [6, 7], [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], [3], [9, 10], [2, 3, 4, 5]];
if (!reducido) {
  let g = 0;
  const parpadear = (idx, veces, fin) => {
    let n = 0;
    const paso = () => {
      const on = n % 2 === 0;
      idx.forEach(i => letras[i].classList.toggle("neon", on));
      n++;
      if (n < veces * 2) setTimeout(paso, 60 + Math.random() * 90);
      else { idx.forEach(i => letras[i].classList.add("neon")); setTimeout(() => { idx.forEach(i => letras[i].classList.remove("neon")); fin(); }, 900); }
    };
    paso();
  };
  const ciclo = () => { parpadear(grupos[g], 2 + Math.floor(Math.random() * 2), () => setTimeout(ciclo, 500)); g = (g + 1) % grupos.length; };
  setTimeout(ciclo, 900);
}

// Carrusel de carpetas
const carpetas = $("carpetas");
document.querySelectorAll("[data-mover]").forEach(b => b.addEventListener("click", () => {
  carpetas.scrollBy({ left: Number(b.dataset.mover) * 300, behavior: reducido ? "auto" : "smooth" });
}));

// Indicadores del carrusel (celular)
const ind = $("indicadores"), listaCarpetas = [...carpetas.children];
listaCarpetas.forEach(() => ind.append(document.createElement("i")));
const marcarInd = () => {
  const centro = carpetas.scrollLeft + carpetas.clientWidth / 2;
  let mejor = 0, dist = Infinity;
  listaCarpetas.forEach((c, i) => { const d = Math.abs(c.offsetLeft + c.offsetWidth / 2 - centro); if (d < dist) { dist = d; mejor = i; } });
  [...ind.children].forEach((x, i) => x.classList.toggle("activo", i === mejor));
};
carpetas.addEventListener("scroll", () => requestAnimationFrame(marcarInd), { passive: true });
marcarInd();
if (window.matchMedia("(hover: none)").matches) document.querySelector(".pista").textContent = "// deslizá para ver las carpetas · tocá para abrir";

// Carpetas clasificadas: tiemblan y, a veces, pasa algo
document.querySelectorAll(".carpeta.clasificada").forEach(c => {
  c.addEventListener("click", () => {
    c.classList.remove("temblando"); void c.offsetWidth; c.classList.add("temblando");
    if (reducido) return;
    const r = c.getBoundingClientRect();
    const x = r.left + r.width / 2, y = r.top + r.height * 0.45;
    if (c.dataset.efecto === "estrellas") estrellas(x, y);
    if (c.dataset.efecto === "lepisma") lepisma(x, y);
  });
});

// cosmo.app: chispas con forma de emoji. Un estallido al hacer clic y algún destello suelto al pasar el mouse.
// Las estrellas salen más seguido que los planetas y cohetes, para que se sienta mágico y no caótico.
const EMOJIS = ["✨", "✨", "✨", "⭐", "⭐", "🌟", "🌟", "💫", "💫"];
const azar = (min, max) => min + Math.random() * (max - min);
let chispasVivas = 0, ultimoEstallido = 0;
function chispa(x, y, { emoji, tam, dx, dy, giro, demora, dur, subida }) {
  const s = document.createElement("span");
  s.className = "cosmo-chispa"; s.textContent = emoji; s.setAttribute("aria-hidden", "true");
  s.style.setProperty("--tam", tam + "px");
  document.body.append(s);
  chispasVivas++;
  const base = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
  const r0 = giro * 0.2, r1 = giro;
  const a = s.animate([
    { transform: `${base} translate(0, 0) scale(0.2) rotate(${r0}deg)`, opacity: 0 },
    { offset: 0.14, opacity: 1 },
    { offset: 0.55, transform: `${base} translate(${dx}px, ${dy}px) scale(1) rotate(${r1}deg)`, opacity: 1, easing: "ease-in" },
    { transform: `${base} translate(${dx * 1.12}px, ${dy - subida}px) scale(0.8) rotate(${r1 + giro * 0.25}deg)`, opacity: 0 }
  ], { duration: dur, delay: demora, easing: "cubic-bezier(.16,.84,.3,1)", fill: "backwards" });
  const fin = () => { s.remove(); chispasVivas--; };
  a.onfinish = fin; a.oncancel = fin;
}
function estrellas(x, y) {
  const ahora = performance.now();
  // Si hacen clic muy seguido, el estallido es más chico (no se llena la pantalla)
  const cantidad = ahora - ultimoEstallido < 700 || chispasVivas > 20 ? 7 : 15;
  ultimoEstallido = ahora;
  const halo = document.createElement("span"); halo.className = "cosmo-halo";
  halo.style.setProperty("transform", `translate(${x}px, ${y}px)`);
  document.body.append(halo);
  const h = halo.animate([
    { transform: `translate(${x}px, ${y}px) scale(0.15)`, opacity: 0.95 },
    { transform: `translate(${x}px, ${y}px) scale(1.5)`, opacity: 0 }
  ], { duration: 750, easing: "cubic-bezier(.2,.8,.2,1)" });
  h.onfinish = h.oncancel = () => halo.remove();
  // En cada estallido completo sale un planeta y un cohete; el resto son estrellas y brillos
  const extras = cantidad > 10 ? ["🪐", "🚀"] : [];
  const desde = Math.floor(Math.random() * cantidad);
  for (let i = 0; i < cantidad; i++) {
    const k = (i - desde + cantidad) % cantidad;
    const emoji = k < extras.length ? extras[k] : EMOJIS[Math.floor(Math.random() * EMOJIS.length)];
    // Ángulos repartidos en abanico (con algo de azar) y sesgados hacia arriba
    const ang = (i / cantidad) * Math.PI * 2 + azar(-0.25, 0.25);
    const dist = azar(70, 170);
    const dx = Math.cos(ang) * dist, dy = Math.sin(ang) * dist * 0.85 - 40;
    // El cohete (🚀 mira a 45°) apunta hacia donde viaja; el resto gira un poco
    const giro = emoji === "🚀" ? ang * 180 / Math.PI + 45 : azar(-200, 200);
    const tam = emoji === "🪐" || emoji === "🚀" ? azar(26, 34) : azar(14, 30);
    chispa(x, y, { emoji, tam, dx, dy, giro, demora: azar(0, 220), dur: azar(1300, 1900), subida: azar(30, 70) });
  }
}
// Destellos sueltos al pasar el mouse por cosmo.app (solo con mouse y sin movimiento reducido)
const cosmo = document.querySelector('.carpeta[data-efecto="estrellas"]');
if (cosmo && !reducido && window.matchMedia("(hover: hover)").matches) {
  let ultimoDestello = 0;
  cosmo.addEventListener("pointermove", e => {
    const ahora = performance.now();
    if (ahora - ultimoDestello < 260 || chispasVivas > 8) return;
    ultimoDestello = ahora;
    const emoji = ["✨", "✨", "⭐", "🌟", "💫"][Math.floor(Math.random() * 5)];
    chispa(e.clientX + azar(-12, 12), e.clientY + azar(-8, 8), { emoji, tam: azar(15, 22), dx: azar(-24, 24), dy: azar(-46, -26), giro: azar(-90, 90), demora: 0, dur: azar(900, 1200), subida: azar(14, 26) });
  });
}
const LEPISMA = '<svg viewBox="0 0 92 46" aria-hidden="true">' +
  '<g stroke="#2a3138" stroke-width="1.6" stroke-linecap="round" fill="none">' +
  '<path d="M18 23 Q8 14 2 6"/><path d="M18 23 Q8 32 2 40"/>' +
  '<path d="M70 21 Q82 10 90 8"/><path d="M70 23 Q84 23 91 23"/><path d="M70 25 Q82 36 90 38"/>' +
  '<g class="pata"><path d="M32 16 L28 6"/><path d="M42 15 L40 4"/><path d="M52 16 L54 6"/></g>' +
  '<g class="pata b"><path d="M32 30 L28 40"/><path d="M42 31 L40 42"/><path d="M52 30 L54 40"/></g></g>' +
  '<path d="M16 23 C20 12 36 10 50 12 C60 13 68 18 72 23 C68 28 60 33 50 34 C36 36 20 34 16 23 Z" fill="#8f9aa3" stroke="#2a3138" stroke-width="1.4"/>' +
  '<g stroke="#5d6870" stroke-width="1.2"><path d="M28 13 Q30 23 28 33"/><path d="M36 12 Q38 23 36 34"/><path d="M44 12 Q46 23 44 34"/><path d="M52 13 Q54 23 52 33"/><path d="M60 15 Q61 23 60 31"/></g>' +
  '<path d="M18 23 H70" stroke="#9FBD2B" stroke-width="1" opacity="0.8"/>' +
  '<circle cx="20" cy="19" r="2" fill="#9FBD2B"/><circle cx="20" cy="27" r="2" fill="#9FBD2B"/></svg>';
function lepisma(x, y) {
  const b = document.createElement("div"); b.className = "lepisma"; b.innerHTML = LEPISMA; document.body.append(b);
  let px = x, py = y, ang = Math.random() * Math.PI * 2, vel = 4.2, t = 0;
  const mover = () => {
    t++;
    ang += (Math.random() - 0.5) * 0.5;
    if (t % 40 === 0) vel = 2 + Math.random() * 4;
    px += Math.cos(ang) * vel; py += Math.sin(ang) * vel;
    b.style.left = px + "px"; b.style.top = py + "px";
    b.style.transform = `rotate(${ang + Math.PI}rad)`;
    if (px < -120 || py < -120 || px > innerWidth + 120 || py > innerHeight + 120 || t > 900) { b.remove(); return; }
    requestAnimationFrame(mover);
  };
  mover();
}

// Modal del proyecto
const ventana = $("ventana");
const RUTAS = { ficha: ["neo-gestion", " / ficha"], web: ["neo-gestion", " / neo-landing.html"], lector: ["lector.", " / descarga"] };
const mostrarVista = v => {
  ["ficha", "web", "lector"].forEach(k => { $("vista-" + k).hidden = k !== v; });
  // data-vista: la ficha y lector. toman la altura de su contenido; la web emulada usa una ventana alta con scroll
  ventana.dataset.vista = v;
  ventana.setAttribute("aria-labelledby", v === "lector" ? "lx-titulo" : "neo-titulo");
  const [carpeta, resto] = RUTAS[v];
  $("ruta").replaceChildren(document.createTextNode("lab / "), Object.assign(document.createElement("b"), { textContent: carpeta }), document.createTextNode(resto));
  $("atras").textContent = v === "web" ? "← Volver a la ficha" : "← Volver a las carpetas";
  vistaActual = v;
};
let vistaActual = "ficha";
// Carpetas: lector. abierta, NEO "pronto" (abre su ficha con el botón para anotarse), cosmo clasificada.
// Para abrir una, poné su valor en false y devolvele la clase "abierta" en src/paginas/laboratorio.html.
const BLOQUEADA = { neo: false, lector: false };
if (!BLOQUEADA.neo) document.querySelector('[data-proyecto="neo"]').addEventListener("click", () => { mostrarVista("ficha"); ventana.showModal(); });
const carpetaLector = document.querySelector('[data-proyecto="lector"]');
if (!BLOQUEADA.lector) carpetaLector.addEventListener("click", () => {
  if (!reducido) { const r = carpetaLector.getBoundingClientRect(); lepisma(r.left + r.width / 2, r.top + r.height * 0.4); }
  setTimeout(() => { mostrarVista("lector"); ventana.showModal(); }, reducido ? 0 : 450);
});
// lector.: estado de Windows (data-estado en el HTML) y descarga destacada según el sistema
(() => {
  const win = $("lx-windows"), wb = $("lx-win-boton");
  if (win.dataset.estado === "disponible") {
    wb.href = win.dataset.store; wb.target = "_blank"; wb.rel = "noopener noreferrer";
    wb.removeAttribute("aria-disabled"); wb.removeAttribute("role");
    $("lx-win-texto").textContent = "Descargar en Microsoft Store";
    win.querySelector(".lx-estado").textContent = "Disponible";
    $("lx-win-nota").textContent = "Se instala desde la Microsoft Store y se actualiza sola.";
    $("lx-aviso").textContent = "Por ahora lector. está disponible para Windows y Android.";
  } else {
    wb.addEventListener("click", e => e.preventDefault());
  }
  const ua = navigator.userAgent;
  const ios = /iPhone|iPad|iPod/.test(ua) || (/Macintosh/.test(ua) && navigator.maxTouchPoints > 1);
  const mac = /Macintosh|Mac OS X/.test(ua) && !ios;
  if (/Android/i.test(ua)) $("lx-android").classList.add("destacada");
  else if (/Windows/i.test(ua) && win.dataset.estado === "disponible") win.classList.add("destacada");
  else if (ios || mac) $("lx-aviso").hidden = false;
  document.querySelectorAll(".lx-copiar").forEach(b => b.addEventListener("click", () => {
    const code = b.parentElement.querySelector("code");
    const listo = () => { b.textContent = "Copiado"; setTimeout(() => { b.textContent = "Copiar"; }, 1800); };
    const sel = () => { const r = document.createRange(); r.selectNodeContents(code); const s = getSelection(); s.removeAllRanges(); s.addRange(r); };
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(code.textContent).then(listo).catch(sel); else sel();
  }));
})();
$("ver-web").addEventListener("click", () => mostrarVista("web"));
$("atras").addEventListener("click", () => { if (vistaActual === "web") mostrarVista("ficha"); else ventana.close(); });
ventana.addEventListener("click", e => { if (e.target === ventana) ventana.close(); });

// Copiar correo
$("copiar").addEventListener("click", () => {
  const texto = $("correo").textContent;
  const listo = () => { $("aviso").hidden = false; setTimeout(() => { $("aviso").hidden = true; }, 2200); };
  const seleccionar = () => { const r = document.createRange(); r.selectNodeContents($("correo")); const s = getSelection(); s.removeAllRanges(); s.addRange(r); };
  if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(texto).then(listo).catch(seleccionar); else seleccionar();
});

// Enlace directo: laboratorio.html#lector abre la ficha de descargas
if (location.hash === "#lector" && !BLOQUEADA.lector) { mostrarVista("lector"); ventana.showModal(); }
