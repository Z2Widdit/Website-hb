(function () {
    function toggleMobileMenu() {
        const menu = document.getElementById('mobile-menu');
        if (menu) menu.classList.toggle('hidden');
    }

    function joinDiscord() {
        window.open('https://discord.com/invite/Baqd8PqY58', '_blank', 'noopener,noreferrer');
    }

    // Theme toggle is handled by theme.js; add page actions here.
    document.addEventListener('click', function (e) {
        const t = e.target;
        if (!(t instanceof Element)) return;
        const el = t.closest('[data-action]');
        if (!el) return;

        const action = el.dataset.action;
        if (action === 'toggle-mobile') {
            toggleMobileMenu();
        } else if (action === 'join-discord') {
            joinDiscord();
            if (el.dataset.closeMobile === '1') toggleMobileMenu();
        }
    });

    // Active TOC highlighting while scrolling
    const sections = Array.from(document.querySelectorAll('.privacy-section[id]'));
    const links = Array.from(document.querySelectorAll('.privacy-toc-nav a'));
    if (!sections.length || !links.length) return;

    const linkById = new Map(
        links.map((a) => [a.getAttribute('href').replace('#', ''), a])
    );

    function setActive(id) {
        links.forEach((a) => a.classList.toggle('is-active', a.getAttribute('href') === '#' + id));
    }

    const observer = new IntersectionObserver(
        (entries) => {
            const visible = entries
                .filter((en) => en.isIntersecting)
                .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
            if (visible[0] && visible[0].target.id) {
                setActive(visible[0].target.id);
            }
        },
        {
            rootMargin: '-25% 0px -55% 0px',
            threshold: [0.1, 0.25, 0.5],
        }
    );

    sections.forEach((s) => observer.observe(s));
    if (sections[0]) setActive(sections[0].id);

    // Smooth in-page nav without fighting native anchors
    links.forEach((a) => {
        a.addEventListener('click', function () {
            const id = a.getAttribute('href').slice(1);
            if (linkById.has(id)) setActive(id);
        });
    });
})();
