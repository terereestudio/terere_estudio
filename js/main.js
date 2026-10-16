/* =========================================================================
   TERERÉ ESTUDIO — JAVASCRIPT (versión 2)
   Cada bloque revisa si su elemento existe en la página antes de actuar.
   ========================================================================= */

const movimientoReducido = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* 1. Menú del celular ---------------------------------------------------- */
const botonMenu = document.querySelector('.menu-boton');
const menu = document.getElementById('menu-principal');

if (botonMenu && menu) {
  const cerrarMenu = () => {
    menu.classList.remove('abierto');
    botonMenu.setAttribute('aria-expanded', 'false');
  };
  botonMenu.addEventListener('click', () => {
    const abierto = menu.classList.toggle('abierto');
    botonMenu.setAttribute('aria-expanded', String(abierto));
  });
  menu.addEventListener('click', (e) => { if (e.target.closest('a')) cerrarMenu(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') cerrarMenu(); });
}

/* 2. El yacaré del logo mira hacia el mouse ------------------------------ */
const iso = document.querySelector('.marca .iso');
const pupilas = iso && iso.querySelector('.iso-pupilas');

if (pupilas && !movimientoReducido && window.matchMedia('(pointer: fine)').matches) {
  let pendiente = false;
  window.addEventListener('pointermove', (e) => {
    if (pendiente) return;
    pendiente = true;
    requestAnimationFrame(() => {
      const r = iso.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width * 0.3);
      const dy = e.clientY - (r.top + r.height * 0.25);
      const d = Math.hypot(dx, dy) || 1;
      const alcance = Math.min(1, d / 300) * 3.2;
      pupilas.style.transform = `translate(${(dx / d) * alcance}px, ${(dy / d) * alcance}px)`;
      pendiente = false;
    });
  });
}

/* 3. Frase que cambia en el hero ----------------------------------------- */
const rotativo = document.querySelector('.hero-rotativo');

if (rotativo && !movimientoReducido) {
  const frases = JSON.parse(rotativo.dataset.frases || '[]');
  let i = 0;
  if (frases.length > 1) {
    setInterval(() => {
      rotativo.classList.add('saliendo');
      setTimeout(() => {
        i = (i + 1) % frases.length;
        rotativo.textContent = frases[i];
        rotativo.classList.remove('saliendo');
      }, 350);
    }, 3200);
  }
}

/* 4. Carruseles ---------------------------------------------------------- */
document.querySelectorAll('.carrusel').forEach((carrusel) => {
  const pista = carrusel.querySelector('.carrusel-pista');
  carrusel.querySelectorAll('[data-carrusel]').forEach((boton) => {
    boton.addEventListener('click', () => {
      const paso = pista.firstElementChild.getBoundingClientRect().width + 14;
      pista.scrollBy({ left: Number(boton.dataset.carrusel) * paso, behavior: movimientoReducido ? 'auto' : 'smooth' });
    });
  });
});

/* 5. Filtros del blog ---------------------------------------------------- */
const filtros = document.querySelectorAll('.filtro');

filtros.forEach((filtro) => {
  filtro.addEventListener('click', () => {
    filtros.forEach((f) => f.setAttribute('aria-pressed', String(f === filtro)));
    const categoria = filtro.dataset.filtro;
    let visibles = 0;
    document.querySelectorAll('.tarjeta-post').forEach((t) => {
      const mostrar = categoria === 'todas' || t.dataset.categoria === categoria;
      t.hidden = !mostrar;
      if (mostrar) visibles += 1;
    });
    const aviso = document.getElementById('filtro-resultado');
    if (aviso) aviso.textContent = `${visibles} ${visibles === 1 ? 'artículo' : 'artículos'}`;
  });
});

/* 6. Visor de imágenes (galerías del portfolio) -------------------------- */
const visor = document.getElementById('visor');

if (visor) {
  const img = visor.querySelector('img');
  const leyenda = visor.querySelector('figcaption');
  const titulo = visor.querySelector('.visor-titulo');
  const nav = visor.querySelector('.visor-nav');
  let imagenes = [];
  let actual = 0;
  let origen = null;

  const mostrar = (n) => {
    actual = (n + imagenes.length) % imagenes.length;
    const it = imagenes[actual];
    img.src = it.src;
    img.alt = it.alt || '';
    leyenda.textContent = imagenes.length > 1 ? `${it.alt || ''} (${actual + 1} de ${imagenes.length})` : (it.alt || '');
  };

  const abrir = (lista, inicio, nombre, boton) => {
    imagenes = lista;
    origen = boton;
    titulo.textContent = nombre || '';
    nav.hidden = lista.length < 2;
    mostrar(inicio);
    visor.showModal();
  };

  document.addEventListener('click', (e) => {
    const disparador = e.target.closest('[data-visor]');
    if (!disparador) return;
    const grupo = disparador.dataset.visor;
    if (disparador.dataset.imagenes) {
      abrir(JSON.parse(disparador.dataset.imagenes), 0, disparador.dataset.titulo, disparador);
    } else {
      const del_grupo = [...document.querySelectorAll(`[data-visor="${grupo}"]`)].filter((b) => b.dataset.src);
      abrir(del_grupo.map((b) => ({ src: b.dataset.src, alt: b.dataset.alt })), del_grupo.indexOf(disparador), disparador.dataset.titulo, disparador);
    }
  });

  visor.querySelector('[data-visor-anterior]').addEventListener('click', () => mostrar(actual - 1));
  visor.querySelector('[data-visor-siguiente]').addEventListener('click', () => mostrar(actual + 1));
  visor.querySelector('[data-visor-cerrar]').addEventListener('click', () => visor.close());
  visor.addEventListener('click', (e) => { if (e.target === visor) visor.close(); });
  visor.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') mostrar(actual + 1);
    if (e.key === 'ArrowLeft') mostrar(actual - 1);
  });
  visor.addEventListener('close', () => { img.removeAttribute('src'); if (origen) origen.focus(); });
}

/* 7. Videos cortos: se reproducen solo cuando están en pantalla ---------- */
const videos = document.querySelectorAll('video[data-auto]');

if (videos.length && !movimientoReducido && 'IntersectionObserver' in window) {
  const observador = new IntersectionObserver((entradas) => {
    entradas.forEach((en) => {
      if (en.isIntersecting) en.target.play().catch(() => {});
      else en.target.pause();
    });
  }, { threshold: 0.4 });
  videos.forEach((v) => observador.observe(v));
} else {
  videos.forEach((v) => { v.controls = true; });
}

/* 8. Videos de YouTube: se cargan recién al tocar play ------------------- */
document.querySelectorAll('.video-fachada[data-youtube]').forEach((boton) => {
  boton.addEventListener('click', () => {
    const iframe = document.createElement('iframe');
    iframe.src = `https://www.youtube-nocookie.com/embed/${boton.dataset.youtube}?autoplay=1&rel=0`;
    iframe.title = boton.getAttribute('aria-label') || 'Video';
    iframe.allow = 'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture';
    iframe.allowFullscreen = true;
    boton.replaceChildren(iframe);
    boton.removeAttribute('aria-label');
  }, { once: true });
});

/* 9. Reproductor del podcast --------------------------------------------- */
document.querySelectorAll('[data-podcast]').forEach((caja) => {
  const audio = caja.querySelector('audio');
  const play = caja.querySelector('.podcast-play');
  const barra = caja.querySelector('.podcast-barra');
  const actual = caja.querySelector('[data-actual]');
  const total = caja.querySelector('[data-total]');
  const formato = (s) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`;

  play.addEventListener('click', () => {
    if (audio.paused) audio.play().catch(() => {});
    else audio.pause();
  });
  audio.addEventListener('play', () => { caja.classList.add('sonando'); play.setAttribute('aria-label', 'Pausar'); });
  audio.addEventListener('pause', () => { caja.classList.remove('sonando'); play.setAttribute('aria-label', 'Reproducir'); });
  audio.addEventListener('loadedmetadata', () => { total.textContent = formato(audio.duration); });
  audio.addEventListener('timeupdate', () => {
    actual.textContent = formato(audio.currentTime);
    if (audio.duration) barra.value = (audio.currentTime / audio.duration) * 100;
  });
  barra.addEventListener('input', () => {
    if (audio.duration) audio.currentTime = (barra.value / 100) * audio.duration;
  });
  caja.querySelectorAll('[data-saltar]').forEach((b) => {
    b.addEventListener('click', () => {
      audio.currentTime = Math.max(0, Math.min(audio.duration || 0, audio.currentTime + Number(b.dataset.saltar)));
    });
  });
});

/* 10. Formulario de contacto (Formspree) --------------------------------- */
const formulario = document.querySelector('form[data-formspree]');

if (formulario) {
  const estado = formulario.querySelector('.formulario-estado');
  const enviar = formulario.querySelector('button[type="submit"]');
  formulario.addEventListener('submit', async (e) => {
    e.preventDefault();
    estado.className = 'formulario-estado';
    estado.textContent = 'Enviando…';
    enviar.disabled = true;
    try {
      const r = await fetch(formulario.action, { method: 'POST', body: new FormData(formulario), headers: { Accept: 'application/json' } });
      if (!r.ok) throw new Error('respuesta no válida');
      formulario.reset();
      estado.classList.add('ok');
      estado.textContent = '¡Gracias! Recibí tu mensaje y te respondo a la brevedad.';
    } catch {
      estado.classList.add('error');
      estado.textContent = 'No se pudo enviar. Revisá tu conexión o escribime por WhatsApp.';
    } finally {
      enviar.disabled = false;
    }
  });
}

/* 11. Tablero de ejemplo: detalle al pasar el mouse o con el teclado ------ */
const grafico = document.querySelector('.grafico[data-tooltip]');

if (grafico) {
  const tip = grafico.querySelector('.grafico-tooltip');
  const mostrarTip = (col) => {
    tip.innerHTML = col.dataset.detalle;
    const g = grafico.getBoundingClientRect();
    const c = col.getBoundingClientRect();
    tip.style.left = `${c.left - g.left + c.width / 2}px`;
    tip.style.top = `${c.top - g.top}px`;
    tip.hidden = false;
  };
  grafico.querySelectorAll('.columna').forEach((col) => {
    col.addEventListener('pointerenter', () => mostrarTip(col));
    col.addEventListener('focus', () => mostrarTip(col));
    col.addEventListener('pointerleave', () => { tip.hidden = true; });
    col.addEventListener('blur', () => { tip.hidden = true; });
  });
}
