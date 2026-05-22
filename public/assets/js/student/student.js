(function () {
  const body = document.body;
  const page = body.getAttribute('data-page');
  const pageMeta = {
    dashboard: {
      title: 'Dashboard',
      breadcrumb: 'Societech and BSIT class balances, dues, and updates'
    },
    records: {
      title: 'My Financial Records',
      breadcrumb: 'Membership, dues, IT Days (Panagmaya), and Societech assessments'
    },
    contributions: {
      title: 'Cash Contributions',
      breadcrumb: 'BSIT class fund and Societech society assessments'
    },
    notifications: {
      title: 'Notifications',
      breadcrumb: 'Treasurer reminders, Societech news, and verification status'
    },
    settings: {
      title: 'Settings',
      breadcrumb: 'Societech Student Portal preferences and security'
    },
    profile: {
      title: 'Profile',
      breadcrumb: 'BSIT class roster and Societech contact details'
    },
    'class-roster': {
      title: 'My Section Class List',
      breadcrumb: 'Classroom treasurer view — your assigned section only'
    },
    'societech-dashboard': {
      title: 'Societech Treasurer Dashboard',
      breadcrumb: 'Society-wide collections, sections, and assessments'
    },
    'societech-all-classes': {
      title: 'All Classes',
      breadcrumb: 'Every BSIT section — view class lists and treasurers'
    },
    'societech-section-roster': {
      title: 'Section Class List',
      breadcrumb: 'Student roster for the selected section'
    },
    'societech-payments': {
      title: 'Manage Payments',
      breadcrumb: 'Add and edit Societech fees with amount and deadline'
    }
  };
  const navLinks = document.querySelectorAll('.studentNav a');
  const topbar = document.querySelector('.studentTopbar');

  if (topbar && !topbar.querySelector('.headerTitle')) {
    const meta = pageMeta[page] || { title: 'Societech Student', breadcrumb: 'Manage your Societech assessments and class finances' };
    const heading = document.createElement('div');
    heading.className = 'headerTitle';
    heading.innerHTML = `<h1>${meta.title}</h1><div class="headerBreadcrumb">${meta.breadcrumb}</div>`;
    topbar.prepend(heading);
  }

  navLinks.forEach((link) => {
    if (link.dataset.page === page) {
      link.classList.add('active');
    }
  });

  // Load profile image from localStorage
  loadProfileImage();

  // Profile menu toggle functionality
  window.toggleProfileMenu = function() {
    const menu = document.getElementById('profileMenu');
    if (menu) {
      menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
    }
  };

  // Close profile menu and announcement dropdown when clicking outside
  document.addEventListener('click', (event) => {
    const profileWrap = document.querySelector('.profileWrapper');
    const menu = document.getElementById('profileMenu');
    if (profileWrap && menu && !profileWrap.contains(event.target)) {
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

  // Logout function
  window.logout = function() {
    if (window.StudentSession?.clearStudentSession) {
      window.StudentSession.clearStudentSession();
    }
    const base = window.location.pathname.includes('/public/')
      ? window.location.pathname.replace(/\/public\/.*$/, '/public')
      : '/Societech_Financial_And_Monitoring/public';
    window.location.href = `${window.location.origin}${base}/auth/logout`;
  };

  // Load profile image from localStorage
  function loadProfileImage() {
    const profilePicture = localStorage.getItem('studentProfilePicture');
    if (profilePicture) {
      const profileImg = document.querySelector('.profileImg');
      if (profileImg) {
        profileImg.innerHTML = `<img src="${profilePicture}" alt="Profile" style="width: 100%; height: 100%; border-radius: 50%; object-fit: cover;">`;
      }
    }
  }

  window.studentSearchTable = function (tableId, inputId) {
    const input = document.getElementById(inputId);
    const filter = input.value.toLowerCase();
    const table = document.getElementById(tableId);
    if (!table) {
      return;
    }
    const rows = table.getElementsByTagName('tr');

    for (let i = 1; i < rows.length; i += 1) {
      if (rows[i].hasAttribute('data-empty-state')) {
        rows[i].style.display = '';
        continue;
      }
      const firstCell = rows[i].getElementsByTagName('td')[0];
      if (!firstCell) {
        continue;
      }
      const text = (firstCell.textContent || firstCell.innerText).toLowerCase();
      rows[i].style.display = text.indexOf(filter) > -1 ? '' : 'none';
    }
  };

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
})();
