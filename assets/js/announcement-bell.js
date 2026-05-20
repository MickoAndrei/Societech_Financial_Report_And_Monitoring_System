/**
 * Wires every .notification-btn to an announcements dropdown (no alert popups).
 */
(function (global) {
  const BELL_SVG =
    '<svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">' +
    '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>' +
    '</svg>';

  function announcementsPageUrl() {
    const path = window.location.pathname.replace(/\\/g, '/');
    if (path.includes('/admin/')) return 'announcements.html';
    if (path.includes('/student/')) return 'notifications.html';
    if (path.includes('/public/')) return '../student/notifications.html';
    return 'notifications.html';
  }

  function escapeHtml(text) {
    const d = document.createElement('div');
    d.textContent = text;
    return d.innerHTML;
  }

  function renderDropdownList(listEl, emptyEl, items) {
    if (!listEl || !emptyEl) return;
    listEl.innerHTML = '';
    if (!items.length) {
      emptyEl.style.display = 'block';
      return;
    }
    emptyEl.style.display = 'none';
    items.forEach((a) => {
      const li = document.createElement('li');
      li.className = 'announcement-dropdown-item';
      li.innerHTML =
        `<h4>${escapeHtml(a.title)}</h4>` +
        `<p>${escapeHtml(a.body)}</p>` +
        `<div class="announcement-dropdown-meta">Posted ${escapeHtml(
          global.SocietechAnnouncements.formatPostedDate(a.postedAt),
        )} · ${escapeHtml(global.SocietechAnnouncements.formatEndLabel(a.endsAt))}</div>`;
      listEl.appendChild(li);
    });
  }

  function updateBadge(badge, count) {
    if (!badge) return;
    if (count > 0) {
      badge.textContent = String(count > 9 ? '9+' : count);
      badge.classList.remove('is-hidden');
      badge.removeAttribute('hidden');
    } else {
      badge.textContent = '0';
      badge.classList.add('is-hidden');
      badge.setAttribute('hidden', '');
    }
  }

  function ensureWrapper(btn) {
    let wrapper = btn.closest('.notification-wrapper');
    if (wrapper) return wrapper;

    wrapper = document.createElement('div');
    wrapper.className = 'notification-wrapper';
    btn.parentNode.insertBefore(wrapper, btn);
    wrapper.appendChild(btn);
    return wrapper;
  }

  function ensureDropdown(wrapper, btn) {
    let dropdown = wrapper.querySelector('#notificationDropdown, .announcement-dropdown');
    if (dropdown) return dropdown;

    dropdown = document.createElement('div');
    dropdown.id = 'notificationDropdown';
    dropdown.className = 'announcement-dropdown';
    dropdown.setAttribute('role', 'region');
    dropdown.setAttribute('aria-label', 'Ongoing announcements');

    const viewUrl = announcementsPageUrl();
    dropdown.innerHTML =
      '<div class="announcement-dropdown-header">' +
      '<strong>Ongoing announcements</strong>' +
      `<a href="${viewUrl}">View all</a>` +
      '</div>' +
      '<ul class="announcement-dropdown-list"></ul>' +
      '<p class="announcement-dropdown-empty">No ongoing announcements right now.</p>' +
      '<div class="announcement-dropdown-footer">Posted by Societech admin</div>';

    wrapper.appendChild(dropdown);
    return dropdown;
  }

  function refreshBellUI() {
    if (!global.SocietechAnnouncements) return;
    const items = global.SocietechAnnouncements.getOngoingAnnouncements();
    const count = items.length;

    document.querySelectorAll('.notification-btn').forEach((btn) => {
      const badge = btn.querySelector('.notification-badge');
      updateBadge(badge, count);

      const wrapper = btn.closest('.notification-wrapper');
      const dropdown = wrapper?.querySelector('.announcement-dropdown, #notificationDropdown');
      if (dropdown) {
        const listEl = dropdown.querySelector('.announcement-dropdown-list');
        const emptyEl = dropdown.querySelector('.announcement-dropdown-empty');
        renderDropdownList(listEl, emptyEl, items);
        const footer = dropdown.querySelector('.announcement-dropdown-footer');
        if (footer) {
          footer.textContent =
            count === 1 ? '1 ongoing announcement' : `${count} ongoing announcements`;
        }
      }
    });
  }

  function setupBell(btn) {
    btn.removeAttribute('onclick');
    btn.setAttribute('type', 'button');
    btn.setAttribute('aria-label', 'View announcements');
    btn.setAttribute('aria-haspopup', 'true');
    btn.setAttribute('aria-expanded', 'false');

    if (!btn.querySelector('svg')) {
      btn.insertAdjacentHTML('afterbegin', BELL_SVG);
    }

    let badge = btn.querySelector('.notification-badge');
    if (!badge) {
      badge = document.createElement('span');
      badge.className = 'notification-badge is-hidden';
      badge.setAttribute('hidden', '');
      btn.appendChild(badge);
    }

    const wrapper = ensureWrapper(btn);
    const dropdown = ensureDropdown(wrapper, btn);

    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const open = dropdown.classList.toggle('show');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      const menu = document.getElementById('profileMenu');
      if (menu) menu.style.display = 'none';
    });
  }

  function initAll() {
    if (!global.SocietechAnnouncements) return;
    document.querySelectorAll('.notification-btn').forEach(setupBell);
    refreshBellUI();
  }

  global.toggleNotifications = function toggleNotifications() {
    const btn = document.querySelector('.notification-btn');
    const dropdown = document.getElementById('notificationDropdown');
    if (btn && dropdown) {
      btn.click();
      return;
    }
    const first = document.querySelector('.announcement-dropdown');
    if (first) first.classList.toggle('show');
  };

  global.AnnouncementBell = { initAll, refreshBellUI };

  function boot() {
    initAll();
    global.addEventListener('societech-announcements-changed', refreshBellUI);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})(window);
