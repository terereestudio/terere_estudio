/* ========================================================================= */
/* TERERÉ ESTUDIO - SCRIPT PRINCIPAL OPTIMIZADO                              */
/* ========================================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* ===================================================================== */
    /* 1. TEXTO DINÁMICO (HERO INICIO)                                       */
    /* ===================================================================== */
    const frases = [
        "tu nivel",
        "tu marca",
        "tus redes",
        "tu estrategia"
    ];

    let indexActual = 0;
    const elementoTexto = document.getElementById("texto-dinamico");

    function cambiarFrase() {
        if (elementoTexto) {
            elementoTexto.classList.add("fade-out");
            setTimeout(() => {
                indexActual = (indexActual + 1) % frases.length;
                elementoTexto.textContent = frases[indexActual];
                elementoTexto.classList.remove("fade-out");
            }, 500);
        }
    }

    if (elementoTexto) {
        setInterval(cambiarFrase, 3500);
    }


    /* ===================================================================== */
    /* 2. MENÚ DESPLEGABLE (HEADER DROPDOWN)                                 */
    /* ===================================================================== */
    const dropdown = document.getElementById("dropdown-menu");
    const btnDropdown = document.getElementById("btn-dropdown");

    if (dropdown && btnDropdown) {
        btnDropdown.addEventListener("click", (e) => {
            e.stopPropagation();
            dropdown.classList.toggle("activo");
        });

        window.addEventListener("click", () => {
            if (dropdown.classList.contains("activo")) {
                dropdown.classList.remove("activo");
            }
        });
    }


    /* ===================================================================== */
    /* 3. APERTURA DE VENTANA MODAL EN PÁGINAS DE SERVICIOS                  */
    /* ===================================================================== */
    const modalContacto = document.getElementById("modal-contacto");
    const botonCerrarModal = document.querySelector(".modal-cerrar");
    const botonesAbrirModal = document.querySelectorAll(".btn-accion-modal, a.btn-cta[href='#contacto']");

    if (modalContacto) {
        botonesAbrirModal.forEach(function (btn) {
            btn.addEventListener("click", function (e) {
                e.preventDefault();
                modalContacto.classList.add("activo");
            });
        });

        if (botonCerrarModal) {
            botonCerrarModal.addEventListener("click", function () {
                modalContacto.classList.remove("activo");
            });
        }

        modalContacto.addEventListener("click", function (e) {
            if (e.target === modalContacto) {
                modalContacto.classList.remove("activo");
            }
        });

        document.addEventListener("keydown", function (e) {
            if (e.key === "Escape") {
                modalContacto.classList.remove("activo");
            }
        });
    }


    /* ===================================================================== */
    /* 4. MODALES Y ACORDEÓN DEL PORTFOLIO                                   */
    /* ===================================================================== */
    const tarjetasModal = document.querySelectorAll(".abrir-modal");
    const modalProyectoOverlay = document.getElementById("modal-proyecto");
    const btnCerrarModal = document.getElementById("cerrar-modal");
    const modalBody = document.getElementById("modal-body-content");

    const infoProyectos = {
        ecommerce: {
            titulo: "Tiendas Online de Alto Rendimiento",
            descripcion: "Desarrollo integral enfocado en la conversión comercial. Configuramos pasarelas de pago locales, optimización de velocidad de carga y una experiencia de usuario minimalista orientada a potenciar las ventas directas del cliente.",
            link: "https://instagram.com/terere.ecommerce"
        },
        landing: {
            titulo: "Landing Pages de Alta Conversión",
            descripcion: "Estructuras web de una sola página desarrolladas 100% en código puro (HTML/CSS/JS) sin frameworks pesados. Diseñadas específicamente para campañas publicitarias y captación directa de leads.",
            link: "index.html#contacto"
        }
    };

    if (tarjetasModal.length > 0 && modalProyectoOverlay) {
        tarjetasModal.forEach(tarjeta => {
            tarjeta.addEventListener("click", () => {
                const tipoProyecto = tarjeta.getAttribute("data-proyecto");
                const datos = infoProyectos[tipoProyecto];

                if (datos) {
                    modalBody.innerHTML = `
                        <div class="modal-info-proyecto">
                            <h2>${datos.titulo}</h2>
                            <p>${datos.descripcion}</p>
                            <a href="${datos.link}" target="_blank" class="modal-link-btn">Visitar proyecto en vivo &rarr;</a>
                        </div>
                    `;
                    modalProyectoOverlay.classList.add("activo");
                }
            });
        });

        if (btnCerrarModal) {
            btnCerrarModal.addEventListener("click", () => modalProyectoOverlay.classList.remove("activo"));
        }

        modalProyectoOverlay.addEventListener("click", (e) => {
            if (e.target === modalProyectoOverlay) modalProyectoOverlay.classList.remove("activo");
        });
    }

    // Acordeón Portfolio
    const itemsAcordeon = document.querySelectorAll(".item-proyecto-acordeon");
    if (itemsAcordeon.length > 0) {
        itemsAcordeon.forEach(item => {
            item.addEventListener("mouseenter", () => item.classList.add("activo"));
            item.addEventListener("mouseleave", () => item.classList.remove("activo"));
        });
    }


    /* ===================================================================== */
    /* 5. CARRUSEL ROTATIVO DE CAJITAS (BRANDING)                             */
    /* ===================================================================== */
    const trackCajitas = document.querySelector(".carrusel-cajitas-track");
    const cajitas = document.querySelectorAll(".cajita-branding");
    const nextBtn = document.querySelector(".next-btn");
    const prevBtn = document.querySelector(".prev-btn");

    if (trackCajitas && cajitas.length > 0) {
        let currentIndex = 0;
        const totalCajitas = cajitas.length;
        const maxIndex = totalCajitas - 3; 

        function actualizarCarrusel() {
            const anchoCajita = cajitas[0].getBoundingClientRect().width;
            const gap = 20;
            const desplazamiento = currentIndex * (anchoCajita + gap);
            trackCajitas.style.transform = `translateX(-${desplazamiento}px)`;
        }

        if (nextBtn && prevBtn) {
            nextBtn.addEventListener("click", () => {
                currentIndex = currentIndex < maxIndex ? currentIndex + 1 : 0;
                actualizarCarrusel();
            });

            prevBtn.addEventListener("click", () => {
                currentIndex = currentIndex > 0 ? currentIndex - 1 : maxIndex;
                actualizarCarrusel();
            });
        }
    }


    /* ===================================================================== */
    /* 6. FILTROS Y DESPLEGABLE DEL BLOG                                     */
    /* ===================================================================== */
    const btnToggleFiltro = document.getElementById("btn-filtro-toggle");
    const panelFiltro = document.getElementById("blog-filtro-panel");
    const botonesFiltro = document.querySelectorAll(".filtro-tag");
    const tarjetasBlog = document.querySelectorAll(".blog-card");

    if (btnToggleFiltro && panelFiltro) {
        btnToggleFiltro.addEventListener("click", (e) => {
            e.stopPropagation();
            panelFiltro.classList.toggle("activo");
        });

        document.addEventListener("click", () => {
            panelFiltro.classList.remove("activo");
        });

        panelFiltro.addEventListener("click", (e) => e.stopPropagation());
    }

    if (botonesFiltro.length > 0 && tarjetasBlog.length > 0) {
        botonesFiltro.forEach(boton => {
            boton.addEventListener("click", () => {
                botonesFiltro.forEach(b => b.classList.remove("activo"));
                boton.classList.add("activo");

                const categoriaSeleccionada = boton.getAttribute("data-filtro");

                tarjetasBlog.forEach(tarjeta => {
                    const categoriaTarjeta = tarjeta.getAttribute("data-categoria");
                    if (categoriaSeleccionada === "todos" || categoriaTarjeta === categoriaSeleccionada) {
                        tarjeta.style.display = "flex";
                    } else {
                        tarjeta.style.display = "none";
                    }
                });

                panelFiltro.classList.remove("activo");
            });
        });
    }


    /* ===================================================================== */
    /* 7. CONTROLADOR GLOBAL DE TOOLTIPS (SELLOS DE IA)                      */
    /* ===================================================================== */
    const sellosIA = document.querySelectorAll(".sello-ia-advertencia-img");
    let tooltipGlobal = document.createElement("div");
    tooltipGlobal.className = "tooltip-ia-global";
    document.body.appendChild(tooltipGlobal);

    sellosIA.forEach(sello => {
        const textoTooltip = sello.getAttribute("data-tooltip");

        sello.addEventListener("mouseenter", () => {
            tooltipGlobal.textContent = textoTooltip;
            tooltipGlobal.classList.add("activo");
            
            const rect = sello.getBoundingClientRect();
            tooltipGlobal.style.top = `${rect.top - 50}px`;
            tooltipGlobal.style.left = `${rect.left - 160}px`;
        });

        sello.addEventListener("mouseleave", () => {
            tooltipGlobal.classList.remove("activo");
        });
    });


    /* ===================================================================== */
    /* 8. REPRODUCTOR DE PODCAST                                             */
    /* ===================================================================== */
    const audioPodcast = document.getElementById("audio-podcast");
    const btnPodcast = document.getElementById("btn-reproducir-podcast");
    const iconoAudio = document.getElementById("icono-audio");
    const btnRewind = document.getElementById("btn-rewind");
    const btnForward = document.getElementById("btn-forward");
    const tiempoActualEl = document.getElementById("tiempo-actual");
    const tiempoTotalEl = document.getElementById("tiempo-total");
    const barraProgreso = document.getElementById("barra-progreso");
    const progresoFill = document.getElementById("progreso-fill");

    if (audioPodcast && btnPodcast) {
        function formatearTiempo(segundos) {
            let min = Math.floor(segundos / 60);
            let seg = Math.floor(segundos % 60);
            return `${min}:${seg < 10 ? '0' : ''}${seg}`;
        }

        audioPodcast.addEventListener("loadedmetadata", () => {
            tiempoTotalEl.textContent = formatearTiempo(audioPodcast.duration);
        });

        btnPodcast.addEventListener("click", () => {
            if (audioPodcast.paused) {
                audioPodcast.play();
                iconoAudio.className = "fa-solid fa-pause";
            } else {
                audioPodcast.pause();
                iconoAudio.className = "fa-solid fa-play";
            }
        });

        audioPodcast.addEventListener("timeupdate", () => {
            tiempoActualEl.textContent = formatearTiempo(audioPodcast.currentTime);
            let porcentaje = (audioPodcast.currentTime / audioPodcast.duration) * 100;
            progresoFill.style.width = `${porcentaje}%`;
        });

        if (btnRewind) {
            btnRewind.addEventListener("click", () => {
                audioPodcast.currentTime = Math.max(0, audioPodcast.currentTime - 10);
            });
        }

        if (btnForward) {
            btnForward.addEventListener("click", () => {
                audioPodcast.currentTime = Math.min(audioPodcast.duration, audioPodcast.currentTime + 10);
            });
        }

        if (barraProgreso) {
            barraProgreso.addEventListener("click", (e) => {
                const rect = barraProgreso.getBoundingClientRect();
                const clickX = e.clientX - rect.left;
                const porcentajeClick = clickX / rect.width;
                audioPodcast.currentTime = porcentajeClick * audioPodcast.duration;
            });
        }

        audioPodcast.addEventListener("ended", () => {
            iconoAudio.className = "fa-solid fa-play";
            progresoFill.style.width = "0%";
        });
    }

    const btnHamburguesa = document.getElementById("btn-hamburguesa");
    const menuLinks = document.getElementById("menu-links"); 

    if (btnHamburguesa && menuLinks) {
        btnHamburguesa.addEventListener("click", (e) => {
            e.stopPropagation();
            menuLinks.classList.toggle("nav-activo");
        });

        window.addEventListener("click", () => {
            if (menuLinks.classList.contains("nav-activo")) {
                menuLinks.classList.remove("nav-activo");
            }
        });
    }
    
    /* ===================================================================== */
    /* VISOR DE IMÁGENES (LIGHTBOX) GLOBAL Y ULTRA-ROBUSTO CON FLECHAS       */
    /* ===================================================================== */

    if (!document.getElementById('lightbox-modal')) {
        const lightboxHtml = `
            <div id="lightbox-modal" class="lightbox-overlay">
                <div class="lightbox-imagen-contenedor">
                    <button type="button" id="lightbox-cerrar" class="lightbox-cerrar">&times;</button>
                    <button type="button" id="lightbox-prev" class="lightbox-flecha lightbox-prev">&#10094;</button>
                    <button type="button" id="lightbox-next" class="lightbox-flecha lightbox-next">&#10095;</button>
                    <img id="lightbox-img" src="" alt="Imagen ampliada del portfolio">
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', lightboxHtml);
    }

    let imagenesArray = [];
    let indiceImagenActual = 0;

    window.addEventListener('click', function(e) {
        const lightbox = document.getElementById('lightbox-modal');
        const lightboxImg = document.getElementById('lightbox-img');
        
        const imgTarget = e.target.closest('.recuadro-screenshot img, .portfolio-img-container img, .flyer-slot img');
        
        if (imgTarget && lightbox && lightboxImg) {
            e.preventDefault();
            const contenedorPadre = imgTarget.closest('.cajita-branding, .panel-desplegable, .portfolio-grid');
            const selectorBusqueda = contenedorPadre ? contenedorPadre.querySelectorAll('img') : document.querySelectorAll('.cajita-grid-expandida img');
            
            imagenesArray = Array.from(selectorBusqueda);
            indiceImagenActual = imagenesArray.indexOf(imgTarget);

            lightboxImg.src = imgTarget.src;
            lightbox.classList.add('activo');
            return;
        }

        if (e.target.id === 'lightbox-next' || e.target.closest('#lightbox-next')) {
            if (imagenesArray.length > 0) {
                indiceImagenActual = (indiceImagenActual + 1) % imagenesArray.length;
                lightboxImg.src = imagenesArray[indiceImagenActual].src;
            }
        }

        if (e.target.id === 'lightbox-prev' || e.target.closest('#lightbox-prev')) {
            if (imagenesArray.length > 0) {
                indiceImagenActual = (indiceImagenActual - 1 + imagenesArray.length) % imagenesArray.length;
                lightboxImg.src = imagenesArray[indiceImagenActual].src;
            }
        }

        if (e.target.id === 'lightbox-cerrar' || e.target.id === 'lightbox-modal') {
            if (lightbox && lightboxImg) {
                lightbox.classList.remove('activo');
                lightboxImg.src = '';
            }
        }
    });

    window.addEventListener('keydown', function(e) {
        const lightbox = document.getElementById('lightbox-modal');
        const lightboxImg = document.getElementById('lightbox-img');
        
        if (lightbox && lightbox.classList.contains('activo')) {
            if (e.key === 'Escape') {
                lightbox.classList.remove('activo');
                lightboxImg.src = '';
            } else if (e.key === 'ArrowRight' && imagenesArray.length > 0) {
                indiceImagenActual = (indiceImagenActual + 1) % imagenesArray.length;
                lightboxImg.src = imagenesArray[indiceImagenActual].src;
            } else if (e.key === 'ArrowLeft' && imagenesArray.length > 0) {
                indiceImagenActual = (indiceImagenActual - 1 + imagenesArray.length) % imagenesArray.length;
                lightboxImg.src = imagenesArray[indiceImagenActual].src;
            }
        }
    });


    /* ===================================================================== */
    /* MACRO-VENTANA MODAL DE BRANDING Y VISOR DE DETALLE (LUPA)             */
    /* ===================================================================== */
    if (!document.getElementById('branding-macro-modal')) {
        const macroModalHtml = `
            <div id="branding-macro-modal" class="branding-modal-overlay">
                <div class="branding-modal-contenedor">
                    <button type="button" id="branding-cerrar" class="branding-modal-cerrar">&times;</button>
                    
                    <div class="branding-modal-header-mobile-wrap">
                        <span id="macro-categoria">Identidad Completa</span>
                        <h2 id="macro-titulo">Nombre del Proyecto</h2>
                    </div>
                    
                    <div class="branding-modal-left">
                        <img id="macro-img-principal" src="" alt="Vista previa ampliada">
                    </div>

                    <div id="macro-grid-minianturas" class="branding-modal-grid-scroll">
                    </div>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', macroModalHtml);
    }

    window.addEventListener('click', function(e) {
        const trigger = e.target.closest('.trigger-modal-branding');
        
        if (trigger) {
            e.preventDefault();
            const cajitaBranding = trigger.closest('.cajita-branding');
            
            if (cajitaBranding) {
                const tituloProyecto = cajitaBranding.querySelector('h3').textContent;
                const subtituloProyecto = cajitaBranding.querySelector('.cajita-header-preview span').textContent;
                
                const imagenesOcultas = cajitaBranding.querySelectorAll('.galeria-completa-proyecto img');
                
                const modalActivo = document.getElementById('branding-macro-modal');
                const imgPrincipalActiva = document.getElementById('macro-img-principal');
                const tituloActivo = document.getElementById('macro-titulo');
                const catActiva = document.getElementById('macro-categoria');
                const gridActivo = document.getElementById('macro-grid-minianturas');
                
                if (imagenesOcultas.length > 0 && modalActivo) {
                    tituloActivo.textContent = tituloProyecto;
                    catActiva.textContent = subtituloProyecto;
                    gridActivo.innerHTML = '';

                    gridActivo.className = window.innerWidth <= 991 ? "branding-modal-grid-scroll mobile-carrusel-miniaturas" : "branding-modal-grid-scroll";

                    imgPrincipalActiva.src = imagenesOcultas[0].src;

                    imagenesOcultas.forEach((img, index) => {
                        const thumbDiv = document.createElement('div');
                        thumbDiv.className = `thumb-miniatura ${index === 0 ? 'activo' : ''}`;
                        thumbDiv.innerHTML = `<img src="${img.src}" alt="miniatura">`;

                        thumbDiv.addEventListener('click', function() {
                            imgPrincipalActiva.src = img.src;
                            document.querySelectorAll('.thumb-miniatura').forEach(t => t.classList.remove('activo'));
                            thumbDiv.classList.add('activo');
                        });

                        gridActivo.appendChild(thumbDiv);
                    });

                    modalActivo.classList.add('activo');
                }
            }
        }
    });

    const visualizadorLeft = document.querySelector('.branding-modal-left');
    const imgPrincipal = document.getElementById('macro-img-principal');

    if (visualizadorLeft && imgPrincipal) {
        visualizadorLeft.addEventListener('mousemove', function(e) {
            if (window.innerWidth > 991) {
                const rect = visualizadorLeft.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const xPercent = (x / rect.width) * 100;
                const yPercent = (y / rect.height) * 100;

                imgPrincipal.style.transformOrigin = `${xPercent}% ${yPercent}%`;
                imgPrincipal.style.transform = "scale(2.5)";
            }
        });

        visualizadorLeft.addEventListener('mouseleave', function() {
            imgPrincipal.style.transformOrigin = "center center";
            imgPrincipal.style.transform = "scale(1)";
        });
    }

    function cerrarMacroModal() {
        const modal = document.getElementById('branding-macro-modal');
        if (modal) {
            modal.classList.remove('activo');
        }
    }

    window.addEventListener('click', function(e) {
        const modal = document.getElementById('branding-macro-modal');
        if (e.target.id === 'branding-cerrar' || e.target === modal) {
            cerrarMacroModal();
        }
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            cerrarMacroModal();
        }
    });


    /* ===================================================================== */
    /* 9. CONTROLADOR DE FORMULARIOS VÍA FETCH (MODAL Y FOOTER)              */
    /* ===================================================================== */
    function configurarFormularioFetch(formId, contenidoId, exitoId, botonCerrarId, esModal) {
        const form = document.getElementById(formId);
        const contenido = document.getElementById(contenidoId);
        const exito = document.getElementById(exitoId);
        const btnCerrarExito = document.getElementById(botonCerrarId);

        if (form && exito) {
            form.addEventListener("submit", function (e) {
                e.preventDefault(); // Evita la redirección a Formspree
                const formData = new FormData(form);

                fetch(form.action, {
                    method: "POST",
                    body: formData,
                    headers: { 'Accept': 'application/json' }
                })
                .then(response => {
                    if (response.ok) {
                        if (contenido) contenido.style.display = "none";
                        exito.style.display = "block";
                        form.reset();
                    } else {
                        return response.json().then(data => {
                            console.error("Error de Formspree:", data);
                            alert("Hubo un problema al enviar. Revisá los datos e intentá nuevamente.");
                        });
                    }
                })
                .catch(error => {
                    console.error("Error de red:", error);
                    alert("Error de conexión. Verificá tu red.");
                });
            });

            if (btnCerrarExito) {
                btnCerrarExito.addEventListener("click", function () {
                    if (esModal && modalContacto) {
                        modalContacto.classList.remove("activo");
                    }
                    exito.style.display = "none";
                    if (contenido) contenido.style.display = "block";
                });
            }
        }
    }

    // Inicializar Formulario del Modal (Dashboards, Ecommerce, Redes, Landing)
    configurarFormularioFetch("form-contacto-modal", "contenido-formulario", "mensaje-exito", "btn-cerrar-exito", true);

    // Inicializar Formulario del Footer (Index y otras páginas)
    configurarFormularioFetch("form-contacto-footer", "contenido-formulario-footer", "mensaje-exito-footer", "btn-reiniciar-footer", false);
    /* ===================================================================== */
    /* CONTROLADOR DEFINITIVO PARA EL FORMULARIO DEL FOOTER                  */
    /* ===================================================================== */
    const formFooter = document.getElementById("form-contacto-footer");
    const contenidoFormFooter = document.getElementById("contenido-formulario-footer");
    const mensajeExitoFooter = document.getElementById("mensaje-exito-footer");
    const btnReiniciarFooter = document.getElementById("btn-reiniciar-footer");

    if (formFooter && mensajeExitoFooter) {
        formFooter.addEventListener("submit", function (e) {
            e.preventDefault(); // Detiene totalmente la recarga y la redirección fea
            const formData = new FormData(formFooter);

            fetch(formFooter.action, {
                method: "POST",
                body: formData,
                headers: { 'Accept': 'application/json' }
            })
            .then(response => {
                if (response.ok) {
                    if (contenidoFormFooter) contenidoFormFooter.style.display = "none";
                    mensajeExitoFooter.style.display = "block";
                    formFooter.reset();
                } else {
                    return response.json().then(data => {
                        console.error("Error de Formspree:", data);
                        alert("Hubo un problema al enviar. Revisá los datos.");
                    });
                }
            })
            .catch(error => {
                console.error("Error de red:", error);
                alert("Error de conexión. Verificá tu red.");
            });
        });

        if (btnReiniciarFooter) {
            btnReiniciarFooter.addEventListener("click", function () {
                mensajeExitoFooter.style.display = "none";
                if (contenidoFormFooter) contenidoFormFooter.style.display = "block";
            });
        }
    }
});