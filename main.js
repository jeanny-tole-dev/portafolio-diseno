// --- LÓGICA DE CAMBIO DE TEMA CLARO / OSCURO (EJECUCIÓN INMEDIATA & DELEGADA) ---
(function initTheme() {
    const savedTheme = localStorage.getItem("portfolio-theme");
    const prefersLight = window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches;

    if (savedTheme === "light" || (!savedTheme && prefersLight)) {
        document.body.classList.add("light-theme");
    }

    document.addEventListener("click", (e) => {
        const themeBtn = e.target.closest("#theme-toggle-btn");
        if (!themeBtn) return;

        e.preventDefault();
        e.stopPropagation();

        const isLight = document.body.classList.toggle("light-theme");
        if (isLight) {
            localStorage.setItem("portfolio-theme", "light");
            themeBtn.setAttribute("title", "Cambiar a Modo Oscuro");
        } else {
            localStorage.setItem("portfolio-theme", "dark");
            themeBtn.setAttribute("title", "Cambiar a Modo Claro");
        }
    });
})();

document.addEventListener("DOMContentLoaded", () => {
    const designContainer = document.getElementById("design-grid-container");

    if (!designContainer) {
        console.error("Falta el contenedor de proyectos de diseño en el HTML");
        return;
    }

    if (typeof projectsData === 'undefined') {
        console.error("projects.data.js no está cargando");
        return;
    }

    const designProjects = projectsData.filter(p => p.category === "design");

    // Actualizar indicador de página inicial (ej: 1 / 6)
    const designIndicator = document.getElementById("design-indicator");

    if (designIndicator) designIndicator.textContent = `1 / ${designProjects.length}`;

    const getTechIconSVG = (tag) => {
        const cleanTag = tag.toLowerCase().trim();
        if (cleanTag.includes('figma')) {
            return `<svg class="tech-icon-svg" viewBox="0 0 38 57" width="12" height="12"><path fill="#EA4C1D" d="M19 19a9.5 9.5 0 1 1 0-19h9.5a9.5 9.5 0 0 1 0 19H19z"/><path fill="#F24E1E" d="M9.5 19a9.5 9.5 0 0 1 0-19H19v19H9.5z"/><path fill="#A259FF" d="M9.5 38a9.5 9.5 0 0 1 0-19H19v19H9.5z"/><path fill="#1ABCFE" d="M9.5 57a9.5 9.5 0 0 1 0-19H19v9.5a9.5 9.5 0 0 1-9.5 9.5z"/><path fill="#0ACF83" d="M28.5 28.5a9.5 9.5 0 1 1-19 0 9.5 9.5 0 0 1 19 0z"/></svg>`;
        }
        if (cleanTag.includes('photoshop')) {
            return `<svg class="tech-icon-svg" viewBox="0 0 24 24" width="12" height="12"><rect width="24" height="24" rx="4" fill="#001E36"/><text x="12" y="16.5" font-size="11" font-weight="900" fill="#31A8FF" text-anchor="middle">Ps</text></svg>`;
        }
        if (cleanTag.includes('canva')) {
            return `<svg class="tech-icon-svg" viewBox="0 0 24 24" width="12" height="12"><circle cx="12" cy="12" r="11" fill="#00C4CC"/><text x="12" y="16.5" font-size="13" font-style="italic" font-weight="900" fill="#FFF" text-anchor="middle">c</text></svg>`;
        }
        if (cleanTag.includes('illustrator')) {
            return `<svg class="tech-icon-svg" viewBox="0 0 24 24" width="12" height="12"><rect width="24" height="24" rx="4" fill="#330000"/><text x="12" y="16.5" font-size="11" font-weight="900" fill="#FF9A00" text-anchor="middle">Ai</text></svg>`;
        }
        if (cleanTag.includes('react')) {
            return `<svg class="tech-icon-svg" viewBox="0 0 24 24" width="12" height="12"><circle cx="12" cy="12" r="2.5" fill="#61DAFB"/><g stroke="#61DAFB" stroke-width="1.2" fill="none"><ellipse cx="12" cy="12" rx="9" ry="3.5"/><ellipse cx="12" cy="12" rx="9" ry="3.5" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="9" ry="3.5" transform="rotate(120 12 12)"/></g></svg>`;
        }
        if (cleanTag.includes('html')) {
            return `<svg class="tech-icon-svg" viewBox="0 0 24 24" width="12" height="12"><path fill="#E34F26" d="M3 2l1.6 18 7.4 2 7.4-2L21 2H3z"/><path fill="#FFF" d="M12 17.6l4.2-1.2.5-5.4H9.4l-.2-2h7.8l.2-2H7l.6 7.4h6.8l-.3 3-2.4.7-2.4-.7-.2-2H7.2l.4 4.2 4.4 1.2z"/></svg>`;
        }
        if (cleanTag.includes('css')) {
            return `<svg class="tech-icon-svg" viewBox="0 0 24 24" width="12" height="12"><path fill="#1572B6" d="M3 2l1.6 18 7.4 2 7.4-2L21 2H3z"/><path fill="#FFF" d="M12 17.6l4.2-1.2.5-5.4H7.4l.2 2h7.1l-.2 2.2-2.5.7-2.5-.7-.2-2H7.2l.4 4.2 4.4 1.2z"/></svg>`;
        }
        if (cleanTag.includes('javascript') || cleanTag === 'js') {
            return `<svg class="tech-icon-svg" viewBox="0 0 24 24" width="12" height="12"><rect width="24" height="24" rx="3" fill="#F7DF1E"/><path fill="#000" d="M13.5 17.5c0 1.5 1.1 2.3 2.6 2.3 1.4 0 2.2-.7 2.2-1.7 0-2.4-5.2-1.5-5.2-5.4 0-2 1.6-3.3 4.1-3.3 2.1 0 3.6 1 4 2.2l-2 1.2c-.3-.7-.9-1.2-2-1.2-1.1 0-1.7.5-1.7 1.2 0 2.2 5.2 1.4 5.2 5.4 0 2.3-1.8 3.5-4.4 3.5-2.6 0-4.3-1.2-4.9-2.7l2.1-1.5z"/></svg>`;
        }
        if (cleanTag.includes('vite')) {
            return `<svg class="tech-icon-svg" viewBox="0 0 24 24" width="12" height="12"><path fill="#646CFF" d="M22.5 4.5L12 21 1.5 4.5h21z"/><path fill="#FFD42A" d="M15.5 4.5L11 13l-1.5-3.5L15.5 4.5z"/></svg>`;
        }
        if (cleanTag.includes('supabase')) {
            return `<svg class="tech-icon-svg" viewBox="0 0 24 24" width="12" height="12"><path fill="#3ECF8E" d="M13.3 2.4a1 1 0 0 0-1.6 0L2.5 14.7a1 1 0 0 0 .8 1.6H11v6.3a1 1 0 0 0 1.6 0l9.2-12.3a1 1 0 0 0-.8-1.6H13.3V2.4z"/></svg>`;
        }
        if (cleanTag.includes('whatsapp')) {
            return `<svg class="tech-icon-svg" viewBox="0 0 24 24" width="12" height="12"><path fill="#25D366" d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984 0 1.762.459 3.479 1.332 5.001L2 22l5.133-1.343c1.472.802 3.141 1.226 4.877 1.227h.004c5.505 0 9.988-4.478 9.989-9.985 0-2.667-1.037-5.176-2.922-7.062A9.923 9.923 0 0 0 12.012 2z"/></svg>`;
        }
        if (cleanTag.includes('three') || cleanTag.includes('3d')) {
            return `<svg class="tech-icon-svg" viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="#FFF" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>`;
        }
        if (cleanTag.includes('laravel') || cleanTag.includes('php')) {
            return `<svg class="tech-icon-svg" viewBox="0 0 24 24" width="12" height="12"><path fill="#FF2D20" d="M12 2L2 7v10l10 5 10-5V7L12 2z"/></svg>`;
        }
        if (cleanTag.includes('delivery')) {
            return `<svg class="tech-icon-svg" viewBox="0 0 24 24" width="12" height="12"><path fill="#FF7849" d="M19 7h-3V6a3 3 0 0 0-3-3H5a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h1a3 3 0 0 0 6 0h4a3 3 0 0 0 6 0h1v-5l-4-4zm-6-2a1 1 0 0 1 1 1v1H4V6a1 1 0 0 1 1-1h8z"/></svg>`;
        }
        return `<svg class="tech-icon-svg" viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="#d946ef" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`;
    };

    const createFlipCardHTML = (project, projectIdx, isFirst = false) => {
        const categoryLabel = project.category === 'frontend' ? 'Desarrollo Web & Frontend' : 'Diseño & Branding';
        const projectImages = (project.images && project.images.length > 0) ? project.images : [project.image];
        const hasMultipleImages = projectImages.length > 1;

        const imagesHTML = projectImages.map((imgObj, imgIdx) => {
            const imgSrc = typeof imgObj === 'object' ? imgObj.url : imgObj;
            const imgLabel = typeof imgObj === 'object' ? imgObj.label : '';
            const labelClass = imgLabel ? `badge-${imgLabel.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, "-")}` : '';
            const labelBadge = imgLabel ? `
                <span class="photo-label-badge ${labelClass}">
                    ${imgLabel}
                </span>
            ` : '';

            const isVideo = typeof imgSrc === 'string' && (imgSrc.endsWith('.mp4') || imgSrc.endsWith('.webm'));
            const mediaElement = isVideo ? `
                <video src="${imgSrc}" autoplay loop muted playsinline controls class="card-slider-img card-slider-video" title="Usa los controles para escuchar el audio"></video>
            ` : `
                <img src="${imgSrc}" alt="${project.title} - Foto ${imgIdx + 1}" class="card-slider-img" onerror="this.classList.add('img-error');">
            `;

            return `
                <div class="card-slider-item ${imgIdx === 0 ? 'active' : ''}">
                    ${mediaElement}
                    ${labelBadge}
                </div>
            `;
        }).join('');

        const zoomBtnHTML = `
            <button type="button" class="zoom-media-btn" data-project-index="${projectIdx}" aria-label="Ampliar imagen en pantalla completa" title="Ver en grande">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="11" cy="11" r="7"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    <line x1="11" y1="8" x2="11" y2="14"></line>
                    <line x1="8" y1="11" x2="14" y2="11"></line>
                </svg>
            </button>
        `;

        const navDotsHTML = hasMultipleImages ? `
            <div class="mini-carousel-arrow prev" data-action="prev" title="Ver foto anterior">&lsaquo;</div>
            <div class="mini-carousel-arrow next" data-action="next" title="Ver foto siguiente">&rsaquo;</div>
            <div class="mini-card-dots">
                ${projectImages.map((_, dotIdx) => `<span class="mini-card-dot ${dotIdx === 0 ? 'active' : ''}" data-index="${dotIdx}"></span>`).join('')}
            </div>
        ` : '';

        const projectMetricsList = Array.isArray(project.metrics) 
            ? project.metrics 
            : (project.metric ? [project.metric] : []);

        const metricBadgeHTML = projectMetricsList.map(mText => `
            <div class="project-impact-badge">
                <span class="impact-icon">📈</span>
                <span class="impact-text">${mText}</span>
            </div>
        `).join('');

        return `
            <div class="project-flip-card ${isFirst ? 'active' : ''}" data-project-index="${projectIdx}">
                <div class="flip-card-inner">
                    <!-- CARA FRONTAL -->
                    <div class="flip-card-front">
                        <div class="card-image-preview" data-active-index="0" data-total-images="${projectImages.length}">
                            ${imagesHTML}
                            ${zoomBtnHTML}
                            <div class="fallback-overlay">
                                <span class="fallback-icon">✦</span>
                                <span class="fallback-title">${project.title}</span>
                            </div>
                            ${navDotsHTML}
                        </div>
                        <div class="card-front-info">
                            <div class="card-front-header">
                                <span class="editorial-tag">${categoryLabel}</span>
                                <span class="flip-hint" role="button" tabindex="0" title="Toca para girar la tarjeta">Girar ↻</span>
                            </div>
                            <h3>${project.title}</h3>
                        </div>
                    </div>

                    <!-- CARA TRASERA -->
                    <div class="flip-card-back">
                        <div class="flip-card-back-scroll">
                            <div class="flip-card-back-header">
                                <span class="editorial-tag-back">${categoryLabel}</span>
                                <span class="flip-hint flip-hint-back" role="button" tabindex="0" title="Toca para volver a la portada">Volver ↺</span>
                            </div>
                            <h3>${project.title}</h3>
                            <p>${project.description}</p>
                            ${metricBadgeHTML}
                        </div>
                        <div class="flip-card-back-footer">
                            <span class="tech-section-title">Herramientas Utilizadas</span>
                            <div class="editorial-tags">
                                ${project.tags.map(tag => `<span class="tech-badge">${getTechIconSVG(tag)} <span>${tag}</span></span>`).join('')}
                            </div>
                            ${(project.liveUrl || project.repoUrl) ? `
                            <div class="editorial-links">
                                ${project.liveUrl ? `<a href="${project.liveUrl}" target="_blank" rel="noopener noreferrer" class="repo-link">${project.liveLabel || 'Ver Proyecto &rarr;'}</a>` : ''}
                                ${project.repoUrl ? `<a href="${project.repoUrl}" target="_blank" rel="noopener noreferrer" class="repo-link">GitHub &rarr;</a>` : ''}
                            </div>` : ''}
                        </div>
                    </div>
                </div>
            </div>
        `;
    };

    designContainer.innerHTML = designProjects.map((p, i) => createFlipCardHTML(p, i, i === 0)).join("");

    // --- SELECTOR RÁPIDO DE PROYECTOS (RECONOCIMIENTO ANTES QUE RECUERDO) ---
    const quickTabsContainer = document.getElementById("design-quick-tabs");
    const carouselStageWrapper = document.getElementById("design-carousel-stage");

    const getShortTabTitle = (title) => {
        if (title.includes("Jhaular")) return "Jhaular Joyería";
        if (title.includes("LearningAI")) return "LearningAI";
        return title;
    };

    if (quickTabsContainer) {
        quickTabsContainer.innerHTML = designProjects.map((p, idx) => `
            <button type="button"
                class="quick-tab-btn ${idx === 0 ? 'active' : ''}"
                role="tab"
                aria-selected="${idx === 0 ? 'true' : 'false'}"
                data-project-index="${idx}"
                title="${p.title}">
                ${getShortTabTitle(p.title)}
            </button>
        `).join("");
    }

    const syncStageFlipState = () => {
        if (!carouselStageWrapper) return;
        const activeCard = designContainer.querySelector('.project-flip-card.active');
        const isFlipped = Boolean(activeCard && activeCard.classList.contains('is-flipped'));
        carouselStageWrapper.classList.toggle('card-is-flipped', isFlipped);
    };

    // --- LÓGICA DE NAVEGACIÓN EN BUCLE POR COLUMNA (◄ 1/6 ►) ---
    const initCategoryLoop = (containerId, projectsList, indicatorId) => {
        const container = document.getElementById(containerId);
        const indicator = document.getElementById(indicatorId);
        const controls = document.querySelector(`.category-carousel-controls[data-target="${containerId}"]`);
        
        if (!container || !controls) return null;

        let currentIndex = 0;
        const total = projectsList.length;

        const stopCardVideos = (element) => {
            if (!element) return;
            element.querySelectorAll('video').forEach(v => {
                v.pause();
                v.currentTime = 0;
                v.muted = true;
            });
        };

        const updateActiveCard = (newIndex) => {
            if (total === 0) return;
            currentIndex = (newIndex + total) % total;

            const cards = container.querySelectorAll('.project-flip-card');
            cards.forEach((card, idx) => {
                const isActive = idx === currentIndex;
                card.classList.toggle('active', isActive);
                if (!isActive) {
                    card.classList.remove('is-flipped');
                    stopCardVideos(card);
                }
            });

            if (indicator) {
                indicator.textContent = `${currentIndex + 1} / ${total}`;
            }

            if (quickTabsContainer) {
                quickTabsContainer.querySelectorAll('.quick-tab-btn').forEach((btn, idx) => {
                    const isSelected = idx === currentIndex;
                    btn.classList.toggle('active', isSelected);
                    btn.setAttribute('aria-selected', isSelected ? 'true' : 'false');
                });
            }

            syncStageFlipState();
        };

        const prevBtn = controls.querySelector('.cat-nav-btn.prev');
        const nextBtn = controls.querySelector('.cat-nav-btn.next');

        if (prevBtn) {
            prevBtn.addEventListener('click', (e) => {
                e.preventDefault();
                updateActiveCard(currentIndex - 1);
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', (e) => {
                e.preventDefault();
                updateActiveCard(currentIndex + 1);
            });
        }

        // Soporte de deslizamiento táctil horizontal (Swipe) para cambiar de proyecto en celulares
        let touchStartX = 0;
        let touchStartY = 0;

        container.addEventListener('touchstart', (e) => {
            if (e.touches.length === 1) {
                touchStartX = e.touches[0].clientX;
                touchStartY = e.touches[0].clientY;
            }
        }, { passive: true });

        container.addEventListener('touchend', (e) => {
            if (e.changedTouches.length === 1) {
                const touchEndX = e.changedTouches[0].clientX;
                const touchEndY = e.changedTouches[0].clientY;
                const diffX = touchEndX - touchStartX;
                const diffY = touchEndY - touchStartY;
                if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 40) {
                    if (diffX < 0) {
                        updateActiveCard(currentIndex + 1); // Swipe izquierda -> Siguiente proyecto
                    } else {
                        updateActiveCard(currentIndex - 1); // Swipe derecha -> Anterior proyecto
                    }
                }
            }
        }, { passive: true });

        return { updateActiveCard };
    };

    // Inicializar bucle para Diseño & Branding
    const designLoop = initCategoryLoop('design-grid-container', designProjects, 'design-indicator');

    // Conectar barra de selección rápida de los 6 proyectos
    if (quickTabsContainer && designLoop) {
        quickTabsContainer.addEventListener('click', (e) => {
            const tabBtn = e.target.closest('.quick-tab-btn');
            if (!tabBtn) return;
            const idx = parseInt(tabBtn.getAttribute('data-project-index'), 10);
            if (!Number.isNaN(idx)) {
                designLoop.updateActiveCard(idx);
            }
        });
    }

    // Conectar carrusel de portada (Hero) para abrir exactamente el proyecto seleccionado
    document.querySelectorAll('.slider-card[data-project-index]').forEach(heroCard => {
        heroCard.addEventListener('click', (e) => {
            if (!designLoop) return;
            const idx = parseInt(heroCard.getAttribute('data-project-index'), 10);
            if (!Number.isNaN(idx)) {
                e.preventDefault();
                designLoop.updateActiveCard(idx);
                const projectsSection = document.getElementById('proyectos');
                if (projectsSection) {
                    projectsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        });
    });

    // --- LIGHTBOX DE VISTA AMPLIADA PARA FOTOS Y VIDEOS ---
    const lightboxEl = document.getElementById('media-lightbox');
    const lightboxBackdrop = document.getElementById('lightbox-backdrop');
    const lightboxCloseBtn = document.getElementById('lightbox-close-btn');
    const lightboxPrevBtn = document.getElementById('lightbox-prev-btn');
    const lightboxNextBtn = document.getElementById('lightbox-next-btn');
    const lightboxMediaContainer = document.getElementById('lightbox-media-container');
    const lightboxProjectTitle = document.getElementById('lightbox-project-title');
    const lightboxSlideLabel = document.getElementById('lightbox-slide-label');
    const lightboxCounter = document.getElementById('lightbox-counter');

    let lbProjectIdx = 0;
    let lbSlideIdx = 0;

    const renderLightboxSlide = () => {
        if (!lightboxEl || !lightboxMediaContainer) return;
        const project = designProjects[lbProjectIdx];
        if (!project) return;

        const mediaList = (project.images && project.images.length > 0) ? project.images : [project.image];
        const total = mediaList.length;
        lbSlideIdx = (lbSlideIdx + total) % total;

        const item = mediaList[lbSlideIdx];
        const src = typeof item === 'object' ? item.url : item;
        const label = typeof item === 'object' ? (item.label || '') : '';
        const isVideo = typeof src === 'string' && (src.endsWith('.mp4') || src.endsWith('.webm'));

        if (lightboxProjectTitle) lightboxProjectTitle.textContent = project.title;
        if (lightboxSlideLabel) {
            lightboxSlideLabel.textContent = label;
            lightboxSlideLabel.style.display = label ? 'inline-block' : 'none';
        }
        if (lightboxCounter) lightboxCounter.textContent = `${lbSlideIdx + 1} / ${total}`;

        if (lightboxPrevBtn) lightboxPrevBtn.style.visibility = total > 1 ? 'visible' : 'hidden';
        if (lightboxNextBtn) lightboxNextBtn.style.visibility = total > 1 ? 'visible' : 'hidden';

        lightboxMediaContainer.innerHTML = isVideo
            ? `<video src="${src}" controls autoplay playsinline class="lightbox-media-item"></video>`
            : `<img src="${src}" alt="${project.title}${label ? ' - ' + label : ''}" class="lightbox-media-item">`;
    };

    const openLightbox = (projectIdx, slideIdx = 0) => {
        if (!lightboxEl) return;
        // Pausar videos embebidos en las tarjetas para no duplicar audio
        designContainer.querySelectorAll('video').forEach(v => {
            v.pause();
            v.muted = true;
        });

        lbProjectIdx = projectIdx;
        lbSlideIdx = slideIdx;
        renderLightboxSlide();
        lightboxEl.classList.add('open');
        lightboxEl.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    };

    const closeLightbox = () => {
        if (!lightboxEl || !lightboxEl.classList.contains('open')) return;
        lightboxEl.classList.remove('open');
        lightboxEl.setAttribute('aria-hidden', 'true');
        if (lightboxMediaContainer) lightboxMediaContainer.innerHTML = '';
        document.body.style.overflow = '';
    };

    if (lightboxCloseBtn) lightboxCloseBtn.addEventListener('click', closeLightbox);
    if (lightboxBackdrop) lightboxBackdrop.addEventListener('click', closeLightbox);
    if (lightboxPrevBtn) lightboxPrevBtn.addEventListener('click', () => { lbSlideIdx -= 1; renderLightboxSlide(); });
    if (lightboxNextBtn) lightboxNextBtn.addEventListener('click', () => { lbSlideIdx += 1; renderLightboxSlide(); });

    document.addEventListener('keydown', (e) => {
        if (!lightboxEl || !lightboxEl.classList.contains('open')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') { lbSlideIdx -= 1; renderLightboxSlide(); }
        if (e.key === 'ArrowRight') { lbSlideIdx += 1; renderLightboxSlide(); }
    });

    // --- MANEJO DE EVENTOS DE MINI-CARRUSEL DE FOTOS & GIRO 3D ---
    document.querySelectorAll('.project-flip-card').forEach(card => {
        const imagePreviewBox = card.querySelector('.card-image-preview');
        const dots = card.querySelectorAll('.mini-card-dot');
        const sliderItems = card.querySelectorAll('.card-slider-item');

        const updateActiveImage = (newIdx) => {
            const total = sliderItems.length;
            if (total <= 1) return;

            let validIdx = (newIdx + total) % total;
            imagePreviewBox.setAttribute('data-active-index', validIdx);

            sliderItems.forEach((item, idx) => {
                const isActive = idx === validIdx;
                item.classList.toggle('active', isActive);
                
                const video = item.querySelector('video');
                if (video && !isActive) {
                    video.pause();
                    video.currentTime = 0;
                    video.muted = true;
                }
            });

            dots.forEach((dot, idx) => {
                dot.classList.toggle('active', idx === validIdx);
            });
        };

        // 1. Al hacer clic en las flechas de navegación del mini-carrusel (‹ y ›)
        const miniArrows = card.querySelectorAll('.mini-carousel-arrow');
        miniArrows.forEach(arrow => {
            arrow.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation(); // Evita el giro 3D y clics indeseados
                let currentIdx = parseInt(imagePreviewBox.getAttribute('data-active-index') || 0);
                const action = arrow.getAttribute('data-action');
                if (action === 'prev') {
                    updateActiveImage(currentIdx - 1);
                } else {
                    updateActiveImage(currentIdx + 1);
                }
            });
        });

        // 2. Deslizamiento táctil (Swipe) para avanzar/retroceder fotos en el mini-carrusel
        if (imagePreviewBox && sliderItems.length > 1) {
            let imgTouchStartX = 0;
            let imgTouchStartY = 0;

            imagePreviewBox.addEventListener('touchstart', (e) => {
                if (e.touches.length === 1) {
                    imgTouchStartX = e.touches[0].clientX;
                    imgTouchStartY = e.touches[0].clientY;
                }
            }, { passive: true });

            imagePreviewBox.addEventListener('touchend', (e) => {
                if (e.changedTouches.length === 1) {
                    const imgTouchEndX = e.changedTouches[0].clientX;
                    const imgTouchEndY = e.changedTouches[0].clientY;
                    const dX = imgTouchEndX - imgTouchStartX;
                    const dY = imgTouchEndY - imgTouchStartY;
                    if (Math.abs(dX) > Math.abs(dY) && Math.abs(dX) > 35) {
                        e.stopPropagation();
                        let currentIdx = parseInt(imagePreviewBox.getAttribute('data-active-index') || 0);
                        if (dX < 0) {
                            updateActiveImage(currentIdx + 1); // Swipe izquierda -> Siguiente foto
                        } else {
                            updateActiveImage(currentIdx - 1); // Swipe derecha -> Foto anterior
                        }
                    }
                }
            }, { passive: true });

            // Al hacer clic en la foto, avanza a la siguiente foto
            imagePreviewBox.addEventListener('click', (e) => {
                if (card.classList.contains('is-flipped')) return;
                if (e.target.tagName === 'VIDEO' || e.target.closest('video') || e.target.closest('.mini-carousel-arrow') || e.target.closest('.mini-card-dot') || e.target.closest('.zoom-media-btn')) {
                    return;
                }
                e.stopPropagation();
                let currentIdx = parseInt(imagePreviewBox.getAttribute('data-active-index') || 0);
                updateActiveImage(currentIdx + 1);
            });
        }

        // Botón discreto de vista ampliada (Lightbox) en la esquina superior derecha
        const zoomBtn = card.querySelector('.zoom-media-btn');
        if (zoomBtn) {
            zoomBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                if (card.classList.contains('is-flipped')) return;
                const pIdx = parseInt(card.getAttribute('data-project-index') || 0, 10);
                const sIdx = parseInt(imagePreviewBox.getAttribute('data-active-index') || 0, 10);
                openLightbox(pIdx, sIdx);
            });
        }

        // 3. Al hacer clic en los puntitos inferiores, va directamente a esa foto
        dots.forEach(dot => {
            dot.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                let targetIdx = parseInt(dot.getAttribute('data-index') || 0);
                updateActiveImage(targetIdx);
            });
        });

        // Helper unificado para girar la tarjeta y sincronizar anotaciones/videos
        const toggleCardFlip = () => {
            const isFlipped = card.classList.toggle('is-flipped');
            if (isFlipped) {
                card.querySelectorAll('video').forEach(v => {
                    v.pause();
                    v.currentTime = 0;
                    v.muted = true;
                });
            }
            syncStageFlipState();
        };

        // 4. Botones dedicados de giro táctil y teclado (Girar ↻ y Volver ↺)
        card.querySelectorAll('.flip-hint').forEach(hint => {
            hint.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                toggleCardFlip();
            });
            hint.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    e.stopPropagation();
                    toggleCardFlip();
                }
            });
        });

        // Asegurar que los enlaces externos (ej. Beacons.ai) abran sin disparar el giro de tarjeta
        card.querySelectorAll('.repo-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.stopPropagation();
            });
        });

        // 5. Giro 3D al hacer clic o tap general en la tarjeta (franja inferior o reverso)
        card.addEventListener('click', (e) => {
            if (e.target.closest('.mini-card-dot') || e.target.closest('.mini-carousel-arrow') || e.target.closest('.zoom-media-btn') || e.target.closest('.editorial-links') || e.target.tagName === 'A' || e.target.closest('a') || e.target.tagName === 'VIDEO' || e.target.closest('video')) {
                return;
            }
            toggleCardFlip();
        });
    });

    // --- LÓGICA DE SCROLLSPY PARA MARCAR SECCIÓN ACTIVA EN EL NAV MENU ---
    const initScrollSpy = () => {
        const navLinks = document.querySelectorAll('.nav-menu a');
        const sections = document.querySelectorAll('section[id]');

        if (!navLinks.length || !sections.length) return;

        const updateActiveNav = () => {
            let currentSectionId = '';
            const scrollPos = window.scrollY + (window.innerHeight / 3);

            sections.forEach(sec => {
                const secTop = sec.offsetTop;
                const secHeight = sec.offsetHeight;
                if (scrollPos >= secTop && scrollPos < secTop + secHeight) {
                    currentSectionId = sec.getAttribute('id');
                }
            });

            // Si está al final de la página, activar contacto
            if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 50) {
                currentSectionId = 'contacto';
            }

            navLinks.forEach(link => {
                const targetHref = link.getAttribute('href');
                if (targetHref === `#${currentSectionId}`) {
                    link.classList.add('active');
                } else {
                    link.classList.remove('active');
                }
            });
        };

        window.addEventListener('scroll', updateActiveNav, { passive: true });
        window.addEventListener('resize', updateActiveNav, { passive: true });
        updateActiveNav();
    };

    initScrollSpy();

    // --- LÓGICA DEL MENÚ DE TRES PUNTOS (KEBAB MENU) PARA MÓVIL ---
    const initMobileKebabMenu = () => {
        const wrapper = document.getElementById("nav-floating-wrapper");
        const trigger = document.getElementById("mobile-kebab-toggle") || document.getElementById("mobile-helm-toggle");
        const overlay = document.getElementById("mobile-helm-overlay");
        const navLinks = document.querySelectorAll(".nav-menu a");

        if (!wrapper || !trigger) return;

        const toggleMenu = (e) => {
            if (e) {
                e.preventDefault();
                e.stopPropagation();
            }
            const isOpen = wrapper.classList.toggle("kebab-active");
            if (overlay) {
                if (isOpen) {
                    overlay.classList.add("active");
                } else {
                    overlay.classList.remove("active");
                }
            }
        };

        const closeMenu = () => {
            wrapper.classList.remove("kebab-active");
            wrapper.classList.remove("helm-active");
            if (overlay) overlay.classList.remove("active");
        };

        trigger.addEventListener("click", toggleMenu);
        if (overlay) overlay.addEventListener("click", closeMenu);

        navLinks.forEach(link => {
            link.addEventListener("click", closeMenu);
        });

        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape") closeMenu();
        });
    };

    initMobileKebabMenu();
});