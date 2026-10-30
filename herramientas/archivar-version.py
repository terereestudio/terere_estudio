"""Convierte la V1 en sitio de archivo: cartel arriba de todo, noindex y estilos del cartel.
Uso: python3 archivar_v1.py <carpeta de la v1>"""
import os, re, sys
raiz = sys.argv[1]
CARTEL = ('<div class="aviso-archivo" role="note"><p><strong>Versión 1 · archivo</strong> <span class="aviso-archivo-texto">'
          'Así era el sitio de Tereré Estudio entre septiembre y octubre de 2026, '
          'cuando lo hice a mano como trabajo para la UTN (nota: 10). </span>'
          '<a href="https://terereestudio.com.ar/">Ir al sitio actual</a> · '
          '<a href="https://terereestudio.com.ar/versiones.html">Ver todas las versiones</a></p></div>')
ROBOTS = '<meta name="robots" content="noindex, follow">'
CSS = """
/* ========================================================================= */
/* ARCHIVO: cartel que avisa que esta es una versión anterior del sitio      */
/* ========================================================================= */
.aviso-archivo {
    background: #FFF4C2;
    color: #231F20;
    border-bottom: 2px solid #9FBD2B;
    padding: 10px 20px;
    font-size: 0.95rem;
    line-height: 1.45;
    text-align: center;
}
.aviso-archivo p { margin: 0; }
.aviso-archivo strong {
    display: inline-block;
    background: #231F20;
    color: #FFF4C2;
    border-radius: 4px;
    padding: 1px 8px;
    margin-right: 6px;
    font-size: 0.8rem;
    letter-spacing: 0.04em;
    text-transform: uppercase;
}
.aviso-archivo a { color: #231F20; font-weight: 700; text-decoration: underline; }
"""
n = 0
for d, _, fs in os.walk(raiz):
    if '/.git' in d: continue
    for f in fs:
        if not f.endswith('.html'): continue
        p = os.path.join(d, f); s = open(p, encoding='utf-8').read()
        if 'aviso-archivo' in s: continue
        s = re.sub(r'(<body\b[^>]*>)', lambda m: m.group(1) + '\n' + CARTEL, s, count=1)
        if 'name="robots"' not in s:
            s = s.replace('</head>', '    ' + ROBOTS + '\n</head>', 1)
        open(p, 'w', encoding='utf-8').write(s); n += 1
css = os.path.join(raiz, 'css/styles.css')
c = open(css, encoding='utf-8').read()
if 'aviso-archivo' not in c: open(css, 'a', encoding='utf-8').write(CSS)
print('páginas con cartel:', n)
