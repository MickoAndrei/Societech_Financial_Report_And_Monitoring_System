/**
 * Loads announcement CSS + JS on any page that includes this script.
 */
(function () {
  const assetBase = (function resolveBase() {
    const scripts = document.getElementsByTagName('script');
    for (let i = scripts.length - 1; i >= 0; i -= 1) {
      const src = scripts[i].getAttribute('src') || '';
      if (src.includes('announcements-loader.js')) {
        return src.replace(/announcements-loader\.js.*$/, '');
      }
    }
    if (window.location.pathname.includes('/public/')) {
      return `${window.location.origin}${window.location.pathname.replace(/\/public\/.*$/, '/public')}/assets/js/`;
    }

    return `${window.location.origin}/Societech_Financial_Report_And_Monitoring/public/assets/js/`;
  })();

  const cssHref = assetBase.replace(/\/js\/$/, '/css/announcement-notifications.css');

  if (!document.querySelector('link[data-announcement-css]')) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = cssHref;
    link.setAttribute('data-announcement-css', '1');
    document.head.appendChild(link);
  }

  function loadScript(src, next) {
    const existing = document.querySelector(`script[src="${src}"]`);
    if (existing) {
      if (existing.dataset.loaded === '1') {
        next();
      } else {
        existing.addEventListener('load', next, { once: true });
        existing.addEventListener('error', next, { once: true });
      }
      return;
    }

    const script = document.createElement('script');
    script.src = src;
    script.onload = function () {
      script.dataset.loaded = '1';
      next();
    };
    script.onerror = next;
    document.body.appendChild(script);
  }

  loadScript(assetBase + 'societech-announcements.js', function () {
    loadScript(assetBase + 'announcement-bell.js', function () {
      if (!window.AnnouncementBell) {
        return;
      }

      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', window.AnnouncementBell.initAll, { once: true });
      } else {
        window.AnnouncementBell.initAll();
      }
    });
  });
})();