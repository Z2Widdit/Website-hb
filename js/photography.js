function sitePerfTier() { return document.documentElement.dataset.perf || 'high'; }
        function isTouchLikeDevice() { return document.documentElement.dataset.touch === 'true' || window.matchMedia('(pointer: coarse)').matches; }
        function isLowPerfDevice() { return sitePerfTier() === 'low'; }
        function isMediumPerfDevice() { return sitePerfTier() === 'medium'; }
        function shouldReduceMotionEffects() { return isLowPerfDevice() || window.matchMedia('(prefers-reduced-motion: reduce)').matches; }

        function optimizeGalleryImages() {
            const photos = document.querySelectorAll('#photography .photo-gallery:not(.hidden) .photo-thumb');
            photos.forEach((img, index) => {
                img.loading = 'lazy';
                img.decoding = 'async';
                if ('fetchPriority' in img) {
                    img.fetchPriority = index < 8 ? 'high' : 'low';
                }
            });
        }

        function runWhenIdle(callback, timeout) {
            if ('requestIdleCallback' in window) { window.requestIdleCallback(callback, { timeout: timeout || 1800 }); return; }
            window.setTimeout(callback, 1);
        }

        function getTheme() { return document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark'; }
        function syncNavLogo(theme) {
            const video = document.getElementById('nav-logo-video');
            if (!video) return;
            if (theme === 'light') video.pause(); else video.play().catch(() => {});
        }
        function applyTheme(theme) {
            const next = theme === 'light' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', next);
            try { localStorage.setItem('fsc-theme', next); } catch (e) {}
            syncNavLogo(next);
        }
        function toggleTheme() { applyTheme(getTheme() === 'dark' ? 'light' : 'dark'); }

        function joinDiscord() { window.open('https://discord.com/invite/Baqd8PqY58', '_blank'); }
        function toggleMobileMenu() { document.getElementById('mobile-menu').classList.toggle('hidden'); }

        function filterPhotography(filter) {
            document.querySelectorAll('.photo-filter-btn').forEach(btn => {
                btn.classList.toggle('active', btn.dataset.filter === filter);
            });
            document.querySelectorAll('.photo-gallery').forEach(gallery => {
                const show = filter === 'all' || gallery.dataset.category === filter;
                gallery.classList.toggle('hidden', !show);
            });
            document.querySelectorAll('#photography .photo-card.is-active').forEach(card => {
                card.classList.remove('is-active');
            });
            optimizeGalleryImages();
        }

        let modalGalleryImages = [];
        let modalGalleryAlts = [];
        let currentModalIndex = -1;

        function getVisibleGalleryThumbs() {
            return Array.from(
                document.querySelectorAll('#photography .photo-gallery:not(.hidden) .photo-thumb')
            );
        }

        function getVisibleGalleryImages() {
            return getVisibleGalleryThumbs().map((thumb) => thumb.src).filter(Boolean);
        }

        function updateModalNavControls() {
            const prevBtn = document.getElementById('modal-prev');
            const nextBtn = document.getElementById('modal-next');
            const counter = document.getElementById('modal-counter');
            const total = modalGalleryImages.length;
            const showNav = total > 1;

            if (prevBtn) prevBtn.classList.toggle('is-hidden', !showNav);
            if (nextBtn) nextBtn.classList.toggle('is-hidden', !showNav);
            if (counter) counter.textContent = showNav ? `${currentModalIndex + 1} / ${total}` : '';
        }

        function showModalImage(index) {
            const img = document.getElementById('modal-img');
            if (!img || !modalGalleryImages.length) return;

            const len = modalGalleryImages.length;
            currentModalIndex = ((index % len) + len) % len;
            img.src = modalGalleryImages[currentModalIndex];
            img.alt = modalGalleryAlts[currentModalIndex] || '';
            updateModalNavControls();
        }

        function navigateModalImage(direction) {
            if (modalGalleryImages.length <= 1) return;
            showModalImage(currentModalIndex + direction);
        }

        function openImageModal(src) {
            const modal = document.getElementById('image-modal');
            const img = document.getElementById('modal-img');
            if (!modal || !img || !src) return;

            const thumbs = getVisibleGalleryThumbs();
            modalGalleryImages = thumbs.map((thumb) => thumb.src).filter(Boolean);
            modalGalleryAlts = thumbs.map((thumb) => thumb.alt || '');
            currentModalIndex = modalGalleryImages.indexOf(src);
            if (currentModalIndex === -1) {
                modalGalleryImages = [src];
                modalGalleryAlts = [''];
                currentModalIndex = 0;
            }

            img.src = modalGalleryImages[currentModalIndex];
            img.alt = modalGalleryAlts[currentModalIndex] || '';
            modal.classList.remove('hidden');
            modal.classList.add('flex');
            document.body.style.overflow = 'hidden';
            updateModalNavControls();
        }

        function scrollToGalleryThumb(src) {
            if (!src) return;
            const thumb = Array.from(document.querySelectorAll('#photography .photo-thumb'))
                .find((img) => img.src === src);
            if (!thumb) return;

            const card = thumb.closest('.photo-card');
            const behavior = shouldReduceMotionEffects() ? 'auto' : 'smooth';

            requestAnimationFrame(() => {
                thumb.scrollIntoView({ behavior, block: 'center', inline: 'nearest' });
                if (card) {
                    card.classList.add('is-active');
                    window.setTimeout(() => card.classList.remove('is-active'), 1200);
                }
            });
        }

        function closeImageModal(ev, force = false) {
            if (!force && ev && ev.target && ev.target.id !== 'image-modal') return;
            const modal = document.getElementById('image-modal');
            const img = document.getElementById('modal-img');
            if (!modal) return;

            const lastViewedSrc = currentModalIndex >= 0 && modalGalleryImages[currentModalIndex]
                ? modalGalleryImages[currentModalIndex]
                : null;

            modal.classList.add('hidden');
            modal.classList.remove('flex');
            document.body.style.overflow = '';
            if (img) img.removeAttribute('src');
            modalGalleryImages = [];
            modalGalleryAlts = [];
            currentModalIndex = -1;
            updateModalNavControls();

            scrollToGalleryThumb(lastViewedSrc);
        }

        function initModalSwipe() {
            const modal = document.getElementById('image-modal');
            if (!modal) return;

            let touchStartX = 0;
            let touchStartY = 0;

            modal.addEventListener('touchstart', (e) => {
                if (modal.classList.contains('hidden')) return;
                touchStartX = e.changedTouches[0].screenX;
                touchStartY = e.changedTouches[0].screenY;
            }, { passive: true });

            modal.addEventListener('touchend', (e) => {
                if (modal.classList.contains('hidden')) return;
                const dx = e.changedTouches[0].screenX - touchStartX;
                const dy = e.changedTouches[0].screenY - touchStartY;
                if (Math.abs(dx) < 50 || Math.abs(dx) < Math.abs(dy)) return;
                navigateModalImage(dx > 0 ? -1 : 1);
            }, { passive: true });
        }

        function initPhotographyInteractions() {
            const section = document.getElementById('photography');
            if (!section) return;
            if (shouldReduceMotionEffects() || isTouchLikeDevice()) return;

            const spotlight = section.querySelector('.photo-spotlight');
            const header = section.querySelector('.photo-header-parallax');
            const cards = section.querySelectorAll('.photo-card');
            const filterBtns = section.querySelectorAll('.photo-filter-btn');

            let activeCard = null;
            let isGalleryScrolling = false;
            let galleryScrollTimer = null;

            function resetCard(card) {
                card.classList.remove('is-active');
            }

            window.addEventListener('scroll', () => {
                isGalleryScrolling = true;
                section.classList.add('is-scrolling');
                if (activeCard) resetCard(activeCard);
                activeCard = null;
                if (spotlight) spotlight.style.opacity = '0';
                if (header) header.style.transform = '';
                clearTimeout(galleryScrollTimer);
                galleryScrollTimer = setTimeout(() => {
                    isGalleryScrolling = false;
                    section.classList.remove('is-scrolling');
                }, 160);
            }, { passive: true });

            section.addEventListener('mousemove', (e) => {
                if (isGalleryScrolling) return;

                const rect = section.getBoundingClientRect();
                const localX = e.clientX - rect.left;
                const localY = e.clientY - rect.top;
                if (spotlight) {
                    spotlight.style.setProperty('--mx', `${localX}px`);
                    spotlight.style.setProperty('--my', `${localY}px`);
                    spotlight.style.opacity = '1';
                }
                if (header) {
                    const x = (e.clientX - rect.left) / rect.width - 0.5;
                    const y = (e.clientY - rect.top) / rect.height - 0.5;
                    header.style.transform = `translate(${x * 10}px, ${y * 6}px)`;
                }

                const card = e.target.closest('.photo-card');
                if (card !== activeCard) {
                    if (activeCard) resetCard(activeCard);
                    activeCard = card;
                    if (activeCard) activeCard.classList.add('is-active');
                }
            });

            section.addEventListener('mouseleave', () => {
                if (activeCard) resetCard(activeCard);
                activeCard = null;
                if (spotlight) spotlight.style.opacity = '0';
                if (header) header.style.transform = '';
            });

            filterBtns.forEach(btn => {
                btn.classList.add('tilt');
                btn.addEventListener('mousemove', (e) => {
                    const btnRect = btn.getBoundingClientRect();
                    const x = ((e.clientX - btnRect.left) / btnRect.width) - 0.5;
                    const y = ((e.clientY - btnRect.top) / btnRect.height) - 0.5;
                    btn.style.transform = `perspective(700px) rotateX(${y * -12}deg) rotateY(${x * 16}deg) scale(1.04)`;
                });
                btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
            });
        }

        const GTA_MENU_SOUND_URL = 'sounds/gta-menu-hover.mp3';
        const GTA_MENU_HOVER_SELECTORS = [
            'a[href]', 'button', '[role="button"]', '.nav-link', '.photo-card', '.photo-filter-btn',
            '.theme-toggle-btn', '.logo-video-wrap', '[onclick]', '[tabindex]:not([tabindex="-1"])'
        ].join(', ');
        let gtaMenuAudioPrimed = false, gtaMenuLastHoverTarget = null, gtaMenuLastTouchTarget = null, gtaMenuLastPlayAt = 0;
        const GTA_MENU_SOUND_VOLUME = 0.62, GTA_MENU_PLAY_DEBOUNCE_MS = 90;

        function getGtaMenuAudioElement() { return document.getElementById('gta-menu-hover-audio'); }
        function ensureGtaMenuAudioSrc(audio) {
            if (!audio) return null;
            if (!audio.getAttribute('src')) audio.setAttribute('src', GTA_MENU_SOUND_URL);
            if (!audio.src) audio.src = GTA_MENU_SOUND_URL;
            return audio;
        }
        function primeGtaMenuAudioSync() {
            if (gtaMenuAudioPrimed) return true;
            const audio = ensureGtaMenuAudioSrc(getGtaMenuAudioElement());
            if (!audio) return false;
            try {
                audio.volume = 0.001; audio.currentTime = 0;
                const playAttempt = audio.play();
                if (playAttempt && typeof playAttempt.then === 'function') {
                    playAttempt.then(() => { audio.pause(); audio.currentTime = 0; audio.volume = GTA_MENU_SOUND_VOLUME; gtaMenuAudioPrimed = true; }).catch(() => {});
                } else { gtaMenuAudioPrimed = true; }
                return true;
            } catch (error) { return false; }
        }
        function playGtaMenuSoundSync() {
            if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
            const now = Date.now();
            if (now - gtaMenuLastPlayAt < GTA_MENU_PLAY_DEBOUNCE_MS) return false;
            gtaMenuLastPlayAt = now;
            const audio = ensureGtaMenuAudioSrc(getGtaMenuAudioElement());
            if (!audio) return false;
            try {
                audio.volume = GTA_MENU_SOUND_VOLUME;
                if (!audio.paused && audio.currentTime > 0) audio.pause();
                audio.currentTime = 0;
                const playAttempt = audio.play();
                if (playAttempt && typeof playAttempt.then === 'function') playAttempt.then(() => { gtaMenuAudioPrimed = true; }).catch(() => {});
                else gtaMenuAudioPrimed = true;
                return true;
            } catch (error) { return false; }
        }
        function triggerGtaMenuSoundFromTarget(target) { if (!target) return; primeGtaMenuAudioSync(); playGtaMenuSoundSync(); }
        function supportsDesktopHoverUi() { return window.matchMedia('(hover: hover)').matches && !window.matchMedia('(pointer: coarse)').matches; }

        function initGtaMenuHoverSounds() {
            ensureGtaMenuAudioSrc(getGtaMenuAudioElement());
            const unlockAudio = () => { primeGtaMenuAudioSync(); };
            ['pointerdown', 'mousedown', 'keydown', 'touchstart'].forEach((eventName) => {
                document.addEventListener(eventName, unlockAudio, { capture: true });
            });
            document.addEventListener('pointerdown', (event) => {
                const target = event.target.closest(GTA_MENU_HOVER_SELECTORS);
                if (!target) return;
                if (event.pointerType === 'touch') {
                    if (target === gtaMenuLastTouchTarget) return;
                    gtaMenuLastTouchTarget = target;
                }
                triggerGtaMenuSoundFromTarget(target);
            }, { capture: true, passive: true });
            document.addEventListener('pointerup', () => { gtaMenuLastTouchTarget = null; }, { capture: true, passive: true });
            if (supportsDesktopHoverUi()) {
                document.addEventListener('mouseover', (event) => {
                    const target = event.target.closest(GTA_MENU_HOVER_SELECTORS);
                    if (!target || target === gtaMenuLastHoverTarget) return;
                    const from = event.relatedTarget;
                    if (from && target.contains(from)) return;
                    gtaMenuLastHoverTarget = target;
                    if (!gtaMenuAudioPrimed) return;
                    playGtaMenuSoundSync();
                });
                document.addEventListener('mouseout', (event) => {
                    const target = event.target.closest(GTA_MENU_HOVER_SELECTORS);
                    if (!target) return;
                    const to = event.relatedTarget;
                    if (to && target.contains(to)) return;
                    if (gtaMenuLastHoverTarget === target) gtaMenuLastHoverTarget = null;
                });
            }
        }

        function addMouseInteractions() {
            const glow = document.getElementById('mouse-glow');
            const enablePointerFx = !isTouchLikeDevice() && !isLowPerfDevice();
            if (glow && enablePointerFx) {
                let mouseX = window.innerWidth / 2, mouseY = window.innerHeight / 2, currentX = mouseX, currentY = mouseY;
                document.addEventListener('mousemove', (e) => { mouseX = e.clientX; mouseY = e.clientY; glow.style.opacity = '0.65'; });
                document.addEventListener('mouseleave', () => { glow.style.opacity = '0.2'; });
                (function updateGlow() {
                    currentX += (mouseX - currentX) * 0.12;
                    currentY += (mouseY - currentY) * 0.12;
                    glow.style.transform = `translate(${currentX}px, ${currentY}px) translate(-50%, -50%)`;
                    requestAnimationFrame(updateGlow);
                })();
            } else if (glow) { glow.style.display = 'none'; }
            initPhotographyInteractions();
        }

        function setupKeyboard() {
            document.addEventListener('keydown', function(e) {
                const imgModal = document.getElementById('image-modal');
                const isOpen = imgModal && !imgModal.classList.contains('hidden');
                if (!isOpen) return;

                if (e.key === 'Escape') {
                    closeImageModal();
                    return;
                }

                if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
                    e.preventDefault();
                    navigateModalImage(e.key === 'ArrowLeft' ? -1 : 1);
                }
            });
        }

        function initializePhotographyPage() {
            optimizeGalleryImages();
            setupKeyboard();
            initModalSwipe();
            const logoVideo = document.getElementById('nav-logo-video');
            if (logoVideo) {
                if (isLowPerfDevice()) logoVideo.preload = 'none';
                if (getTheme() === 'dark') {
                    const playLogo = () => { if (getTheme() === 'dark') logoVideo.play().catch(() => {}); };
                    if (!isLowPerfDevice()) playLogo();
                    document.addEventListener('click', playLogo, { once: true });
                    document.addEventListener('touchstart', playLogo, { once: true });
                } else {
                    syncNavLogo(getTheme());
                }
            }
            runWhenIdle(() => {
                initGtaMenuHoverSounds();
                addMouseInteractions();
            }, 1200);
        }

        window.onload = initializePhotographyPage;

// --- CSP-safe event delegation (no inline handlers) ---
(function bindCspSafeHandlers() {
    document.addEventListener('click', function (e) {
        const t = e.target;
        if (!(t instanceof Element)) return;

        // Photo modal nav
        if (t.closest('#modal-prev')) {
            if (typeof navigateModalImage === 'function') navigateModalImage(-1);
            return;
        }
        if (t.closest('#modal-next')) {
            if (typeof navigateModalImage === 'function') navigateModalImage(1);
            return;
        }

        const photo = t.closest('.photo-thumb');
        if (photo && typeof openImageModal === 'function') {
            openImageModal(photo.currentSrc || photo.src);
            return;
        }

        // Backdrop click (only when the modal shell itself is the target)
        if (t.id === 'image-modal' && typeof closeImageModal === 'function') {
            closeImageModal(e, false);
            return;
        }

        const el = t.closest('[data-action]');
        if (!el) return;

        const action = el.dataset.action;
        switch (action) {
            case 'toggle-theme':
                if (typeof toggleTheme === 'function') toggleTheme();
                break;
            case 'toggle-mobile':
                if (typeof toggleMobileMenu === 'function') toggleMobileMenu();
                break;
            case 'join-discord':
                if (typeof joinDiscord === 'function') joinDiscord();
                if (el.dataset.closeMobile === '1' && typeof toggleMobileMenu === 'function') toggleMobileMenu();
                break;
            case 'filter-photo':
                if (typeof filterPhotography === 'function') filterPhotography(el.dataset.filter || 'all');
                break;
            case 'close-mobile':
                if (typeof toggleMobileMenu === 'function') toggleMobileMenu();
                break;
            case 'close-image-modal':
                if (typeof closeImageModal === 'function') {
                    const force = !(e.target && e.target.id === 'image-modal');
                    if (force || e.target.id === 'image-modal') closeImageModal(e, force);
                }
                break;
            case 'stop-modal':
                e.stopPropagation();
                break;
            default:
                break;
        }
    });
})();
