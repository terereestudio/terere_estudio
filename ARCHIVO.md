# Tereré Estudio — Archivo de versiones

> **Estado: guardado, sin publicar.** Por ahora la V2 se luce sola. La página
> `versiones.html` y la carpeta `v1/` están en el repositorio pero devuelven 404
> (`_redirects`) y no hay enlaces hacia ellas. Cómo activarlas: ver el comentario
> al principio de `src/paginas/versiones.html`.

Cada vez que el sitio pasa a una versión nueva, la anterior se guarda tal como
estaba, en dos lugares:

1. **Una rama del repositorio** (`version-1`, `version-2`, …) con el código completo.
2. **Una carpeta dentro del sitio actual** (`v1/`, `v2/`, …) para que se pueda
   navegar desde terereestudio.com.ar/versiones.html.

Las carpetas de archivo llevan un cartel arriba ("Versión N · archivo"), no se
indexan en Google (`noindex`) y quedan afuera del armado (`build.mjs`) y de la
revisión automática.

## v1 — septiembre y octubre de 2026

Primera versión, hecha a mano en HTML, CSS y JavaScript. Trabajo final para la
UTN, aprobado con 10.

- **Rama `version-1`:** la V1 final (con carga diferida de imágenes y el botón
  "Cotizar proyecto" del pie), más el cartel de archivo.
- **Carpeta `v1/`:** copia de esa rama (sin README ni `_headers`), con los enlaces
  del cartel apuntando al sitio actual.
- Imágenes, GIFs y audio comprimidos (111 MB → 23 MB) con los mismos nombres.
  El original sin comprimir sigue en el historial de la rama (commit 18d0b17).

## v2 — desde octubre de 2026 (actual)

Sitio armado con `build.mjs` a partir de `src/`. Ver `README.md`.

## Cómo archivar la versión actual cuando llegue la siguiente

1. Crear la rama `version-N` desde `main` antes del cambio.
2. Agregar el cartel de archivo y `noindex` a sus páginas
   (`herramientas/archivar-version.py`, cambiando el número y las fechas del cartel).
3. Copiar la rama a la carpeta `vN/` del sitio nuevo, sin README ni `_headers`.
4. Sumar la versión a `src/paginas/versiones.html` con una captura del inicio
   (`img/versiones/vN-inicio.webp` y `-chica.webp`).
5. Agregar `/vN/*` a `_headers`, `robots.txt` y a las carpetas que ignoran
   `build.mjs` y `herramientas/revisar-sitio.cjs`.
