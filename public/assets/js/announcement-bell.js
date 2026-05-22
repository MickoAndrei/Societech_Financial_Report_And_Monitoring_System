/**
 * Wires every .notificationBtn to an announcements dropdown.
 */
(function (global) {
  const bellSvg =
    '<svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">' +
    '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>' +
    '</svg>';

  function announcementsPageUrl() {
    const path = window.location.pathname.replace(/\\/g, '/');
    const base = path.includes('/public/')
      ? `${window.location.origin}${path.replace(/\/public\/.*$/, '/public')}`
      : `${window.location.origin}/Societech_Financial_And_Monitoring/public`;
    if (path.includes('/admin/')) return `${base}/admin/announcements`;
    return `${base}/student/notifications`;
  }

  function escapeHtml(text) {
    const d = document.createElement('div');
    d.textContent = text || '';
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
      li.className = 'announcementDropdownItem';
      li.innerHTML =
        `<h4>${escapeHtml(a.title)}</h4>` +
        `<p>${escapeHtml(a.body)}</p>` +
        `<div class="announcementDropdownMeta">Posted ${escapeHtml(
          global.SocietechAnnouncements.formatPostedDate(a.postedAt),
        )} &middot; ${escapeHtml(global.SocietechAnnouncements.formatEndLabel(a.endsAt))}</div>`;
      listEl.appendChild(li);
    });
  }

  function updateBadge(badge, count) {
    if (!badge) return;
    if (count > 0) {
      badge.textContent = String(count > 9 ? '9+' : count);
      badge.classList.remove('is-hidden');
      badge.removeAttribute('hidden');
      return;
    }

    badge.textContent = '0';
    badge.classList.add('is-hidden');
    badge.setAttribute('hidden', '');
  }

  function ensureWrapper(btn) {
    let wrapper = btn.closest('.notificationWrapper');
    if (wrapper) return wrapper;

    wrapper = document.createElement('div');
    wrapper.className = 'notificationWrapper';
    wrapper.style.position = 'relative';
    wrapper.style.display = 'inline-flex';
    btn.parentNode.insertBefore(wrapper, btn);
    wrapper.appendChild(btn);
    return wrapper;
  }

  function ensureDropdown(wrapper) {
    let dropdown = wrapper.querySelector('#notificationDropdown, .announcementDropdown');
    if (dropdown) return dropdown;

    dropdown = document.createElement('div');
    dropdown.id = 'notificationDropdown';
    dropdown.className = 'announcementDropdown';
    dropdown.setAttribute('role', 'region');
    dropdown.setAttribute('aria-label', 'Ongoing announcements');
    dropdown.style.position = 'fixed';
    dropdown.style.zIndex = '9999';

    const viewUrl = announcementsPageUrl();
    dropdown.innerHTML =
      '<div class="announcementDropdownHeader">' +
      '<strong>Ongoing announcements</strong>' +
      `<a href="${viewUrl}">View all</a>` +
      '</div>' +
      '<ul class="announcementDropdownList"></ul>' +
      '<p class="announcementDropdownEmpty">No ongoing announcements right now.</p>' +
      '<div class="announcementDropdownFooter">Posted by Societech admin</div>';

    wrapper.appendChild(dropdown);
    return dropdown;
  }

  function positionDropdown(btn, dropdown) {
    const rect = btn.getBoundingClientRect();
    const viewportPadding = 16;
    const dropdownWidth = Math.min(360, window.innerWidth - viewportPadding * 2);
    const preferredRight = window.innerWidth - rect.right;
    const maxRight = window.innerWidth - dropdownWidth - viewportPadding;
    const right = Math.max(viewportPadding, Math.min(preferredRight, maxRight));

    dropdown.style.top = `${rect.bottom + 10}px`;
    dropdown.style.right = `${right}px`;
  }

  function setDropdownOpen(btn, dropdown, open) {
    dropdown.classList.toggle('show', open);
    dropdown.style.display = open ? 'flex' : 'none';
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
  }

  function refreshBellUI() {
    if (!global.SocietechAnnouncements) return;

    const items = global.SocietechAnnouncements.getOngoingAnnouncements();
    const count = items.length;

    document.querySelectorAll('.notificationBtn').forEach((btn) => {
      updateBadge(btn.querySelector('.notificationBadge'), count);

      const dropdown = btn
        .closest('.notificationWrapper')
        ?.querySelector('.announcementDropdown, #notificationDropdown');

      if (!dropdown) return;

      renderDropdownList(
        dropdown.querySelector('.announcementDropdownList'),
        dropdown.querySelector('.announcementDropdownEmpty'),
        items,
      );

      const footer = dropdown.querySelector('.announcementDropdownFooter');
      if (footer) {
        footer.textContent =
          count === 1 ? '1 ongoing announcement' : `${count} ongoing announcements`;
      }
    });
  }

  function setupBell(btn) {
    if (btn.dataset.announcementBellReady === '1') return;
    btn.dataset.announcementBellReady = '1';

    btn.removeAttribute('onclick');
    btn.setAttribute('type', 'button');
    btn.setAttribute('aria-label', 'View announcements');
    btn.setAttribute('aria-haspopup', 'true');
    btn.setAttribute('aria-expanded', 'false');

    if (!btn.querySelector('svg')) {
      btn.insertAdjacentHTML('afterbegin', bellSvg);
    }

    let badge = btn.querySelector('.notificationBadge');
    if (!badge) {
      badge = document.createElement('span');
      badge.className = 'notificationBadge is-hidden';
      badge.setAttribute('hidden', '');
      btn.appendChild(badge);
    }

    const wrapper = ensureWrapper(btn);
    const dropdown = ensureDropdown(wrapper);

    btn.addEventListener('click', (event) => {
      event.stopPropagation();
      const open = !dropdown.classList.contains('show');
      if (open) positionDropdown(btn, dropdown);
      setDropdownOpen(btn, dropdown, open);

      const menu = document.getElementById('profileMenu');
      if (menu) menu.style.display = 'none';
    });
  }

  function initAll() {
    if (!global.SocietechAnnouncements) return;
    document.querySelectorAll('.notificationBtn').forEach(setupBell);
    refreshBellUI();
  }

  global.toggleNotifications = function toggleNotifications() {
    const btn = document.querySelector('.notificationBtn');
    const dropdown = btn
      ?.closest('.notificationWrapper')
      ?.querySelector('.announcementDropdown, #notificationDropdown');

    if (!btn || !dropdown) return;

    const open = !dropdown.classList.contains('show');
    if (open) positionDropdown(btn, dropdown);
    setDropdownOpen(btn, dropdown, open);
  };

  global.AnnouncementBell = { initAll, refreshBellUI, setDropdownOpen };

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
