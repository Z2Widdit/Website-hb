if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
window.scrollTo(0, 0);
(function () {
    var saved = localStorage.getItem('fsc-theme');
    document.documentElement.setAttribute('data-theme', saved === 'light' ? 'light' : 'dark');
})();
(function () {
    var conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    var saveData = !!(conn && conn.saveData);
    var slowNet = !!(conn && /^(slow-2g|2g|3g)$/.test(conn.effectiveType || ''));
    var lowCores = navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4;
    var lowMem = navigator.deviceMemory && navigator.deviceMemory <= 4;
    var mobile = window.matchMedia('(max-width: 767px), (pointer: coarse)').matches;
    var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var perf = 'high';

    if (reduced || saveData) perf = 'low';
    else if (slowNet || lowCores || lowMem || mobile) perf = 'medium';
    if (saveData && slowNet) perf = 'low';

    document.documentElement.dataset.perf = perf;
    if (mobile) document.documentElement.dataset.touch = 'true';
})();
