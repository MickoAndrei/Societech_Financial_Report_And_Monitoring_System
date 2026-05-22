function toggleNotifications() {
  if (window.AnnouncementBell) {
    const btn = document.querySelector('.notificationBtn');
    if (btn) {
      btn.click();
      return;
    }
  }
  const dropdown = document.getElementById('notificationDropdown');
  if (dropdown) {
    const open = dropdown.classList.toggle('show');
    dropdown.style.display = open ? 'flex' : 'none';
  }
}

function toggleProfileMenu() {
  const menu = document.getElementById('profileMenu');
  if (menu) {
    menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
  }
}

window.logout = function () {
  const base = window.location.pathname.includes('/public/')
    ? window.location.pathname.replace(/\/public\/.*$/, '/public')
    : '/Societech_Financial_And_Monitoring/public';
  window.location.href = `${window.location.origin}${base}/auth/logout`;
};

// Single unified click-outside handler for both profile menu and notification dropdown
document.addEventListener('click', function (event) {
  const profile = document.querySelector('.profileWrapper');
  const menu = document.getElementById('profileMenu');
  if (profile && menu && !profile.contains(event.target)) {
    menu.style.display = 'none';
  }

  const notifWrap = document.querySelector('.notificationWrapper');
  const dropdown = document.getElementById('notificationDropdown');
  if (notifWrap && dropdown && !notifWrap.contains(event.target)) {
    const btn = notifWrap.querySelector('.notificationBtn');
    if (btn && window.AnnouncementBell?.setDropdownOpen) {
      window.AnnouncementBell.setDropdownOpen(btn, dropdown, false);
    } else {
      dropdown.classList.remove('show');
      dropdown.style.display = 'none';
      if (btn) btn.setAttribute('aria-expanded', 'false');
    }
  }
});

function tableHasRealRows(tbody) {
  return Array.from(tbody.children).some((row) => !row.hasAttribute('data-empty-state'));
}

function renderEmptyTableState(table) {
  const tbody = table.querySelector('tbody');
  if (!tbody || tableHasRealRows(tbody) || tbody.querySelector('[data-empty-state]')) {
    return;
  }

  const columnCount = Math.max(1, table.querySelectorAll('thead th').length);
  const row = document.createElement('tr');
  row.setAttribute('data-empty-state', 'true');
  row.className = 'tableEmptyRow';
  row.innerHTML =
    `<td colspan="${columnCount}">` +
    '<div class="tableEmptyState">' +
    '<svg width="26" height="26" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">' +
    '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7h16M4 12h16M4 17h10"></path>' +
    '</svg>' +
    '<span>No data available</span>' +
    '</div>' +
    '</td>';
  tbody.appendChild(row);
}

function setupEmptyTableStates() {
  document.querySelectorAll('table').forEach((table) => {
    const tbody = table.querySelector('tbody');
    if (!tbody || tbody.dataset.emptyStateReady === '1') {
      return;
    }

    tbody.dataset.emptyStateReady = '1';
    renderEmptyTableState(table);
    const observer = new MutationObserver(() => {
      const emptyRow = tbody.querySelector('[data-empty-state]');
      if (tableHasRealRows(tbody)) {
        emptyRow?.remove();
        return;
      }
      renderEmptyTableState(table);
    });
    observer.observe(tbody, { childList: true });
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', setupEmptyTableStates);
} else {
  setupEmptyTableStates();
}
