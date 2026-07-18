(function () {
    function getTheme() {
        return document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
    }

    function applyTheme(next) {
        document.documentElement.setAttribute('data-theme', next === 'light' ? 'light' : 'dark');
        try {
            localStorage.setItem('fsc-theme', next === 'light' ? 'light' : 'dark');
        } catch (e) { /* ignore quota / private mode */ }
    }

    function toggleTheme() {
        applyTheme(getTheme() === 'dark' ? 'light' : 'dark');
    }

    document.addEventListener('click', function (e) {
        const el = e.target instanceof Element ? e.target.closest('[data-action="toggle-theme"]') : null;
        if (el) toggleTheme();
    });
})();
