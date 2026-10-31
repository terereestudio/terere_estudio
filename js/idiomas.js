// Idiomas para las páginas internas (portfolio, laboratorio, blog).
// El inicio tiene su propio motor en inicio.js; los dos comparten el idioma elegido (localStorage "terere-idioma").
//
// Cómo funciona:
// - Los textos fijos de la página se reconocen solos por su contenido en español (igual que en el inicio).
// - Los textos que arma el JavaScript de cada página pasan por I18N.t("texto en español").
// - Las traducciones viven en idiomas/<página>/<código>.json. Si falta una, queda en español.
// - Cada página avisa con I18N.alCambiar(fn) qué tiene que volver a dibujar cuando cambia el idioma.
"use strict";
const I18N = (() => {
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
  const PAGINA = (location.pathname.match(/(blog|laboratorio|portfolio)(\.html)?\/?$/) || [])[1] || "";
  const UI = { cambiar: "Cambiar idioma", buscar: "Buscar idioma…", sinIdioma: "No encontré ese idioma", beta: "beta" };

  let idioma = "es", D = null;
  const alCambiarFns = [], dinamicos = new Set();
  const huella = s => { let h = 0x811c9dc5; for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 0x01000193); } return (h >>> 0).toString(36); };
  const normal = s => String(s).replace(/\s+/g, " ").trim();
  const LETRA = /\p{L}/u;

  // Texto armado por JavaScript: se traduce por su contenido en español
  // (con {marcas} opcionales: t("Logo de {x}", { x: "Garete" }))
  function t(es, vars) {
    if (es === undefined || es === null || es === "") return es;
    dinamicos.add(normal(es));
    let r = es;
    if (D) { const tr = D.texto && D.texto[huella(normal(es))]; if (tr !== undefined) r = tr; }
    return vars ? String(r).replace(/\{(\w+)\}/g, (_, n) => vars[n] ?? "") : r;
  }

  // Reconocer los textos fijos de la página (antes de que el JavaScript de la página dibuje nada)
  const EN_LINEA = new Set(["B", "STRONG", "EM", "I", "SPAN", "SMALL", "BR", "CODE", "MARK", "SUP", "SUB", "ABBR", "TIME", "KBD", "S", "U", "Q", "WBR"]);
  const SALTEAR = new Set(["SCRIPT", "STYLE", "SVG", "CANVAS", "VIDEO", "AUDIO", "NOSCRIPT", "TEMPLATE", "TEXTAREA", "SELECT", "IFRAME", "INPUT"]);
  const ATRIBUTOS = ["alt", "aria-label", "title", "placeholder"];
  const UNIDADES = [], ATRS = [];
  const noTraducir = el => el.hasAttribute("data-no-traducir") || el.getAttribute("translate") === "no";
  const soloEnLinea = el => { for (const c of el.children) if (!EN_LINEA.has(c.tagName) || c.id || noTraducir(c) || !soloEnLinea(c)) return false; return true; };
  const atributos = el => ATRIBUTOS.forEach(a => { const v = el.getAttribute(a); if (v && LETRA.test(v)) ATRS.push({ el, attr: a, es: v, clave: huella(normal(v)) }); });
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

  const cache = {};
  const cargar = lang => (cache[lang] ||= fetch(`idiomas/${PAGINA}/${lang}.json`).then(r => { if (!r.ok) throw new Error(r.status); return r.json(); }));
  async function aplicar(lang, guardar = true) {
    if (!IDIOMAS[lang]) lang = "es";
    let nuevo = null;
    if (lang !== "es") { try { nuevo = await cargar(lang); } catch (e) { delete cache[lang]; return; } }
    idioma = lang; D = nuevo;
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
    menu.actualizar();
    alCambiarFns.forEach(f => { try { f(lang); } catch (e) {} });
    if (guardar) try { localStorage.setItem("terere-idioma", lang); } catch (e) {}
  }
  const ui = k => (D && D.ui && D.ui[k]) || UI[k];

  // Botón de idiomas: el globo se estira y se convierte en buscador (igual que en el inicio)
  const menu = (() => {
    const caja = document.createElement("div");
    caja.className = "idioma"; caja.setAttribute("data-no-traducir", "");
    caja.innerHTML = '<div class="idioma-caja"><button class="idioma-boton" type="button" aria-expanded="false" aria-controls="idioma-menu"><span class="idioma-icono" aria-hidden="true"><svg class="ico-globo" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.8 3.8 5.8 3.8 9s-1.3 6.2-3.8 9c-2.5-2.8-3.8-5.8-3.8-9S9.5 5.8 12 3z"/></svg><svg class="ico-lupa" viewBox="0 0 24 24"><circle cx="10.5" cy="10.5" r="6.5"/><path d="M15.5 15.5L21 21"/></svg></span><span class="idioma-actual">ES</span></button><input class="idioma-buscar" type="search" autocomplete="off" spellcheck="false" tabindex="-1"></div><div class="idioma-menu" id="idioma-menu" hidden><ul class="idioma-lista"></ul></div>';
    const boton = caja.querySelector(".idioma-boton"), buscar = caja.querySelector(".idioma-buscar"), panel = caja.querySelector(".idioma-menu"), lista = caja.querySelector(".idioma-lista");
    const sinNorma = s => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
    lista.replaceChildren(...Object.entries(IDIOMAS).map(([cod, info]) => {
      const li = document.createElement("li"), b = document.createElement("button");
      b.type = "button"; b.dataset.idioma = cod; b.lang = info.lang;
      b.innerHTML = "<span></span><small></small>"; b.querySelector("span").textContent = info.nombre; b.querySelector("small").textContent = cod.toUpperCase();
      if (info.beta) { const e = document.createElement("em"); e.className = "idioma-beta"; b.querySelector("span").append(" ", e); }
      li.dataset.buscar = sinNorma(info.nombre + " " + cod + " " + info.buscar);
      li.append(b); return li;
    }));
    const vacio = document.createElement("li"); vacio.className = "idioma-vacio"; vacio.hidden = true; lista.append(vacio);
    const filtrar = () => {
      const q = sinNorma(buscar.value).trim(); let hay = 0;
      lista.querySelectorAll("li[data-buscar]").forEach(li => { const ok = !q || li.dataset.buscar.includes(q); li.hidden = !ok; if (ok) hay++; });
      vacio.textContent = ui("sinIdioma"); vacio.hidden = hay > 0;
    };
    const cerrar = () => { if (panel.hidden) return; panel.hidden = true; caja.classList.remove("abierta"); boton.setAttribute("aria-expanded", "false"); buscar.tabIndex = -1; };
    const abrir = () => { buscar.value = ""; filtrar(); caja.classList.add("abierta"); panel.hidden = false; boton.setAttribute("aria-expanded", "true"); buscar.tabIndex = 0; setTimeout(() => buscar.focus({ preventScroll: true }), 120); };
    boton.addEventListener("click", () => { if (panel.hidden) abrir(); else cerrar(); });
    buscar.addEventListener("input", filtrar);
    buscar.addEventListener("keydown", e => { if (e.key === "Enter") { e.preventDefault(); lista.querySelector("li[data-buscar]:not([hidden]) button")?.click(); } if (e.key === "ArrowDown") { e.preventDefault(); lista.querySelector("li[data-buscar]:not([hidden]) button")?.focus(); } });
    lista.addEventListener("click", e => { const b = e.target.closest("[data-idioma]"); if (b) { aplicar(b.dataset.idioma); cerrar(); boton.focus(); } });
    document.addEventListener("click", e => { if (!e.target.closest(".idioma")) cerrar(); });
    document.addEventListener("keydown", e => { if (e.key === "Escape") cerrar(); });
    // Va en la barra de arriba, antes del enlace de volver
    const barra = document.querySelector(".barra .envoltura") || document.querySelector(".barra");
    if (barra) { const volver = barra.querySelector(".volver"); const grupo = document.createElement("div"); grupo.className = "barra-acciones-idioma"; if (volver) { volver.before(grupo); grupo.append(caja, volver); } else { barra.append(grupo); grupo.append(caja); } }
    return {
      actualizar() {
        caja.querySelector(".idioma-actual").textContent = idioma.toUpperCase();
        boton.setAttribute("aria-label", ui("cambiar")); buscar.setAttribute("aria-label", ui("buscar")); buscar.placeholder = ui("buscar");
        lista.querySelectorAll("[data-idioma]").forEach(b => b.setAttribute("aria-pressed", String(b.dataset.idioma === idioma)));
        lista.querySelectorAll(".idioma-beta").forEach(e => { e.textContent = ui("beta"); });
      }
    };
  })();
  menu.actualizar();

  // Si la persona ya eligió un idioma (en esta página o en el inicio), se aplica al cargar
  try { const g = localStorage.getItem("terere-idioma"); if (g && g !== "es" && IDIOMAS[g] && PAGINA) setTimeout(() => aplicar(g, false), 0); } catch (e) {}

  return {
    t, aplicar,
    get idioma() { return idioma; },
    get locale() { return IDIOMAS[idioma].lang; },
    alCambiar: fn => alCambiarFns.push(fn),
    // Registra textos que el JavaScript muestra más tarde (al abrir paneles), para que se puedan traducir
    registrar: lista => lista.forEach(s => { if (s && LETRA.test(s)) dinamicos.add(normal(s)); }),
    // Para herramientas/textos-idiomas.cjs: todo lo que hay que traducir en esta página
    _textos: () => ({ UNIDADES, ATRS, dinamicos: [...dinamicos], ui: UI, huella, normal })
  };
})();
