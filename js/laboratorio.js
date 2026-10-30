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
let clicsCosmo = 0;
document.querySelectorAll(".carpeta.clasificada").forEach(c => {
  c.addEventListener("click", () => {
    c.classList.remove("temblando"); void c.offsetWidth; c.classList.add("temblando");
    if (reducido) return;
    const r = c.getBoundingClientRect();
    const x = r.left + r.width / 2, y = r.top + r.height * 0.45;
    if (c.dataset.efecto === "estrellas") { clicsCosmo++; if (clicsCosmo % 2 === 1 || Math.random() < 0.4) estrellas(x, y); }
    if (c.dataset.efecto === "lepisma") lepisma(x, y);
  });
});
function estrellas(x, y) {
  const puff = document.createElement("span"); puff.className = "puff"; puff.style.left = x + "px"; puff.style.top = y + "px"; document.body.append(puff);
  puff.animate([{ transform: "scale(0.2)", opacity: 0.9 }, { transform: "scale(1.8)", opacity: 0 }], { duration: 600, easing: "ease-out" }).onfinish = () => puff.remove();
  for (let i = 0; i < 14; i++) {
    const s = document.createElement("span"); s.className = "estrella"; s.textContent = Math.random() < 0.5 ? "✦" : "✧";
    s.style.left = x + "px"; s.style.top = y + "px"; s.style.fontSize = (10 + Math.random() * 16) + "px";
    document.body.append(s);
    const ang = Math.random() * Math.PI * 2, dist = 60 + Math.random() * 140;
    s.animate([{ transform: "translate(-50%,-50%) scale(0.3) rotate(0)", opacity: 1 }, { transform: `translate(calc(-50% + ${Math.cos(ang) * dist}px), calc(-50% + ${Math.sin(ang) * dist - 30}px)) scale(1) rotate(${Math.random() * 360}deg)`, opacity: 0 }], { duration: 700 + Math.random() * 500, easing: "cubic-bezier(.2,.8,.2,1)" }).onfinish = () => s.remove();
  }
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
