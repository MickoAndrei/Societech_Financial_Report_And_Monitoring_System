/**
 * Loads announcement CSS + JS on any page that includes this script (before shared.js / student.js).
 */
(function () {
  const ASSET_BASE = (function resolveBase() {
    const scripts = document.getElementsByTagName('script');
    for (let i = scripts.length - 1; i >= 0; i--) {
      const src = scripts[i].getAttribute('src') || '';
      if (src.includes('announcements-loader.js')) {
        return src.replace(/announcements-loader\.js.*$/, '');
      }
    }
    return '../assets/js/';
  })();

  const CSS_HREF = ASSET_BASE.replace(/\/js\/$/, '/css/announcement-notifications.css');

  if (!document.querySelector('link[data-announcement-css]')) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = CSS_HREF;
    link.setAttribute('data-announcement-css', '1');
    document.head.appendChild(link);
  }

  function loadScript(src, next) {
    if (document.querySelector(`script[src="${src}"]`)) {
      next();
      return;
    }
    const s = document.createElement('script');
    s.src = src;
    s.onload = next;
    s.onerror = next;
    document.body.appendChild(s);
  }

  loadScript(ASSET_BASE + 'societech-announcements.js', function () {
    loadScript(ASSET_BASE + 'announcement-bell.js', function () {
      if (window.AnnouncementBell) window.AnnouncementBell.initAll();
    });
  });
})();
