// Entrada del blog v2: índice, progreso, accesibilidad, lectura en voz alta y podcast
"use strict";
const $ = s => document.querySelector(s), $$ = s => [...document.querySelectorAll(s)];
const raiz = document.documentElement, texto = $("#texto");
const guardar = (k, v) => { try { localStorage.setItem(k, v); } catch (e) {} };
const leer = k => { try { return localStorage.getItem(k); } catch (e) { return null; } };

// Minutos de lectura
const palabras = texto.innerText.trim().split(/\s+/).length;
$("#minutos").textContent = `· ${Math.max(1, Math.round(palabras / 200))} min de lectura`;

// Índice automático con la sección activa resaltada
const titulos = $$(".texto h2:not(.sin-numero)");
titulos.forEach((h, i) => { if (!h.id) h.id = "sec-" + (i + 1); const li = document.createElement("li"), a = document.createElement("a"); a.href = "#" + h.id; a.textContent = h.textContent; li.append(a); $("#indice").append(li); });
const enlaces = $$("#indice a");
const ioIndice = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) enlaces.forEach(a => a.classList.toggle("activo", a.getAttribute("href") === "#" + e.target.id)); }), { rootMargin: "-20% 0px -70% 0px" });
titulos.forEach(h => ioIndice.observe(h));

// Progreso de lectura y portada que se acerca
let pend = false;
const tick = () => { pend = false; const r = texto.getBoundingClientRect(); const p = Math.min(1, Math.max(0, -r.top / Math.max(1, r.height - innerHeight))); raiz.style.setProperty("--p", p.toFixed(4)); $(".progreso").style.setProperty("--p", p.toFixed(4)); };
addEventListener("scroll", () => { if (!pend) { pend = true; requestAnimationFrame(tick); } }, { passive: true }); tick();
const portada = $("#portada");
if (matchMedia("(hover: hover)").matches) {
  portada.addEventListener("pointermove", e => { const r = portada.getBoundingClientRect(); portada.style.setProperty("--ry", ((e.clientX - r.left) / r.width - 0.5) * 10 + "deg"); portada.style.setProperty("--rx", -((e.clientY - r.top) / r.height - 0.5) * 10 + "deg"); });
  portada.addEventListener("pointerleave", () => { portada.style.setProperty("--rx", "0deg"); portada.style.setProperty("--ry", "0deg"); });
}

// Aparición del texto
const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("visto"); io.unobserve(e.target); } }), { threshold: 0.08 });
const revelables = [...texto.querySelectorAll(":scope > figure, :scope > p, :scope > h2, :scope > ul, :scope > ol, :scope > blockquote, .articulo-texto > *, .articulo-texto section > *, .cierre")];
revelables.forEach(el => { el.classList.add("revelar"); io.observe(el); });

// Accesibilidad: panel y preferencias guardadas
const panel = $("#panel"), abrirPanel = $("#a11y-abrir");
abrirPanel.addEventListener("click", () => { const abierto = panel.hidden; panel.hidden = !abierto; abrirPanel.setAttribute("aria-expanded", String(abierto)); if (abierto) panel.querySelector("button").focus(); });
document.addEventListener("keydown", e => { if (e.key === "Escape" && !panel.hidden) { panel.hidden = true; abrirPanel.setAttribute("aria-expanded", "false"); abrirPanel.focus(); } });
document.addEventListener("click", e => { if (!panel.hidden && !panel.contains(e.target) && e.target !== abrirPanel) { panel.hidden = true; abrirPanel.setAttribute("aria-expanded", "false"); } });
const ESCALAS = [0.9, 1, 1.15, 1.3, 1.5];
let escala = Number(leer("tt-escala") ?? 1);
const aplicarEscala = () => { raiz.style.setProperty("--escala", ESCALAS[escala]); guardar("tt-escala", escala); };
$$("[data-texto]").forEach(b => b.addEventListener("click", () => { const d = Number(b.dataset.texto); escala = d === 0 ? 1 : Math.max(0, Math.min(ESCALAS.length - 1, escala + d)); aplicarEscala(); }));
aplicarEscala();
$$("[data-op]").forEach(b => {
  const clase = b.dataset.op, activo = leer("tt-" + clase) === "1";
  const pintar = on => { raiz.classList.toggle(clase, on); b.setAttribute("aria-pressed", String(on)); b.textContent = on ? "Sí" : "No"; };
  pintar(activo);
  b.addEventListener("click", () => { const on = b.getAttribute("aria-pressed") !== "true"; pintar(on); guardar("tt-" + clase, on ? "1" : "0"); if (clase === "a-quieto" && on) revelables.forEach(el => el.classList.add("visto")); });
});
if (raiz.classList.contains("a-quieto") || matchMedia("(prefers-reduced-motion: reduce)").matches) revelables.forEach(el => el.classList.add("visto"));

// Escuchar la entrada (voz del dispositivo, sin servicios externos)
const voz = $("#voz"), play = $("#voz-play"), estado = $("#voz-estado"), vtexto = $("#voz-texto");
const habla = window.speechSynthesis;
const bloques = [...texto.querySelectorAll("p, h2, h3, li, blockquote")].filter(el => el.innerText.trim() && !el.closest(".cierre, .podcast, figure, table") && !el.querySelector("p, li") && !(el.tagName === "P" && el.closest("blockquote, li")));
const VELOCIDADES = [1, 1.25, 1.5, 0.85];
let vel = 0, actual = 0, sonando = false, pausado = false, vozElegida = null;
function elegirVoz() { const vs = habla.getVoices(); vozElegida = vs.find(v => /es[-_]AR/i.test(v.lang)) || vs.find(v => /es[-_](MX|US|419)/i.test(v.lang)) || vs.find(v => /^es/i.test(v.lang)) || null; }
function marcar(i) { bloques.forEach(b => b.classList.remove("leyendo")); if (bloques[i]) { bloques[i].classList.add("leyendo"); const r = bloques[i].getBoundingClientRect(); if (r.top < 90 || r.bottom > innerHeight - 40) bloques[i].scrollIntoView({ block: "center", behavior: raiz.classList.contains("a-quieto") ? "auto" : "smooth" }); } }
function decir(i) {
  if (i >= bloques.length) { detener(); estado.textContent = "Terminó la lectura."; return; }
  actual = i; marcar(i);
  const u = new SpeechSynthesisUtterance(bloques[i].innerText.trim());
  u.lang = "es-AR"; if (vozElegida) u.voice = vozElegida; u.rate = VELOCIDADES[vel];
  u.onend = () => { if (sonando && !pausado) decir(actual + 1); };
  u.onerror = e => { if (e.error !== "interrupted" && e.error !== "canceled") { estado.textContent = "No se pudo leer en voz alta en este dispositivo."; detener(); } };
  habla.speak(u);
  estado.textContent = `Leyendo ${i + 1} de ${bloques.length}`;
}
function pintarPlay() { voz.classList.toggle("sonando", sonando && !pausado); play.setAttribute("aria-pressed", String(sonando && !pausado)); vtexto.textContent = !sonando ? "Escuchar" : pausado ? "Seguir" : "Pausar"; }
function detener() { sonando = false; pausado = false; habla.cancel(); bloques.forEach(b => b.classList.remove("leyendo")); pintarPlay(); }
if (!habla || typeof SpeechSynthesisUtterance === "undefined") { voz.hidden = true; }
else {
  elegirVoz(); habla.onvoiceschanged = elegirVoz;
  play.addEventListener("click", () => {
    if (!sonando) { sonando = true; pausado = false; habla.cancel(); decir(actual >= bloques.length - 1 ? 0 : actual); }
    else if (!pausado) { pausado = true; habla.pause(); estado.textContent = "En pausa."; }
    else { pausado = false; habla.resume(); if (!habla.speaking) decir(actual); estado.textContent = `Leyendo ${actual + 1} de ${bloques.length}`; }
    pintarPlay();
  });
  $("#voz-stop").addEventListener("click", () => { detener(); actual = 0; estado.textContent = "Lectura detenida."; });
  $("#voz-vel").addEventListener("click", e => { vel = (vel + 1) % VELOCIDADES.length; e.currentTarget.textContent = VELOCIDADES[vel] + "x"; e.currentTarget.setAttribute("aria-label", "Velocidad de lectura: " + VELOCIDADES[vel] + "x"); if (sonando && !pausado) { habla.cancel(); decir(actual); } });
  bloques.forEach((b, i) => b.addEventListener("dblclick", () => { sonando = true; pausado = false; habla.cancel(); decir(i); pintarPlay(); }));
  addEventListener("pagehide", () => habla.cancel());
}

// Podcast (artículos que lo tienen)
document.querySelectorAll("[data-podcast]").forEach(caja => {
  const audio = caja.querySelector("audio"), play = caja.querySelector(".podcast-play"), barra = caja.querySelector(".podcast-barra");
  const actualT = caja.querySelector("[data-actual]"), totalT = caja.querySelector("[data-total]");
  const formato = s => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;
  play.addEventListener("click", () => { if (audio.paused) { if (window.speechSynthesis) speechSynthesis.cancel(); audio.play().catch(() => {}); } else audio.pause(); });
  audio.addEventListener("play", () => { caja.classList.add("sonando"); play.setAttribute("aria-label", "Pausar"); });
  audio.addEventListener("pause", () => { caja.classList.remove("sonando"); play.setAttribute("aria-label", "Reproducir"); });
  audio.addEventListener("loadedmetadata", () => { totalT.textContent = formato(audio.duration); });
  audio.addEventListener("timeupdate", () => { actualT.textContent = formato(audio.currentTime); if (audio.duration) barra.value = (audio.currentTime / audio.duration) * 100; });
  barra.addEventListener("input", () => { if (audio.duration) audio.currentTime = (barra.value / 100) * audio.duration; });
  caja.querySelectorAll("[data-saltar]").forEach(b => b.addEventListener("click", () => { audio.currentTime = Math.max(0, Math.min(audio.duration || 0, audio.currentTime + Number(b.dataset.saltar))); }));
});
