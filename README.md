# Tereré Estudio — versión 2

Sitio de **Tereré Estudio**, la marca profesional de Leonardo Lavrovic (Corrientes, Argentina): páginas web, tiendas online y tableros de datos para negocios.

Hecho a mano en **HTML, CSS y JavaScript**, sin frameworks ni dependencias. Publicado en Netlify.

## Cómo está organizado

| Carpeta o archivo | Qué es |
| --- | --- |
| `src/paginas/` | El contenido de cada página. **Acá se edita.** |
| `src/partes/` | Lo que se repite en todas las páginas: `head`, `header`, `footer`, plantilla de artículo y podcast. |
| `src/estilos.css` | Los estilos, con los colores y medidas como variables en `:root`. |
| `src/blog.json` | La lista de artículos del blog (título, fecha, categoría, imagen). |
| `build.mjs` | Arma el sitio: junta páginas y partes y escribe el HTML final en la raíz. |
| `*.html`, `blog/`, `css/` | **Archivos generados.** No editarlos a mano: se pisan con cada build. |
| `img/`, `video/`, `audio/` | Imágenes en WebP, videos cortos y el podcast, ya optimizados. |
| `js/main.js` | Todo el JavaScript del sitio. |
| `v1/` | La primera versión del sitio, guardada como archivo histórico. |
| `_headers`, `_redirects`, `robots.txt` | Configuración de Netlify, seguridad y SEO. |

## Cómo hacer un cambio

1. Editá lo que necesites en `src/` (o `js/main.js`).
2. Corré el armado (necesita Node.js, sin instalar nada más):
   ```
   node build.mjs
   ```
3. Revisá el resultado abriendo `index.html` o con un servidor local.
4. Subí todo con Git: Netlify publica solo.

### Sumar un artículo al blog

1. Creá el archivo en `src/paginas/blog/`, copiando el formato de uno existente (empieza con un bloque `<!--meta {...} -->`).
2. Agregá el artículo a `src/blog.json`.
3. Corré `node build.mjs`. El artículo aparece en el blog y, si es de los tres más nuevos, en el inicio.

## Pendientes para completar el sitio

- Video de presentación: en `src/paginas/index.html`, buscá "VIDEO DE PRESENTACIÓN".
- Testimonios reales: buscá "TESTIMONIOS" en el mismo archivo.
- Resultados del caso IPRI Bijou: buscá "RESULTADOS" (con autorización de la marca).
- CV en PDF (español e inglés) y enlaces a certificados: en `src/paginas/sobre-mi.html`.
- Confirmar el dominio principal: está en `build.mjs` (`DOMINIO`), `robots.txt` y en el enlace del sello HTML de "Sobre mí".

## Créditos

Íconos: [Font Awesome Free](https://fontawesome.com) 6.4.0, licencia CC BY 4.0.
