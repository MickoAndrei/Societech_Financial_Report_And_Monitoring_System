(function () {
  const body = document.body;
  const page = body.getAttribute('data-page');
  const pageMeta = {
    dashboard: {
      title: 'Dashboard',
      breadcrumb: 'Overview of your balances, payments, and updates'
    },
    records: {
      title: 'My Financial Records',
      breadcrumb: 'Track your balances, payment history, and fee breakdown'
    },
    contributions: {
      title: 'Cash Contributions',
      breadcrumb: 'View class and organizational contribution requirements'
    },
    notifications: {
      title: 'Notifications',
      breadcrumb: 'Stay updated on reminders, announcements, and verification status'
    },
    settings: {
      title: 'Settings',
      breadcrumb: 'Manage your account preferences and personal information'
    },
    profile: {
      title: 'Profile',
      breadcrumb: 'Review and update your personal and account details'
    }
  };
  const navLinks = document.querySelectorAll('.student-nav a');
  const topbar = document.querySelector('.student-topbar');

  if (topbar && !topbar.querySelector('.header-title')) {
    const meta = pageMeta[page] || { title: 'Student Portal', breadcrumb: 'Manage your account information and finances' };
    const heading = document.createElement('div');
    heading.className = 'header-title';
    heading.innerHTML = `<h1>${meta.title}</h1><div class="header-breadcrumb">${meta.breadcrumb}</div>`;
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

  // Close profile menu when clicking outside
  document.addEventListener('click', (event) => {
    const profile = document.querySelector('.profile');
    const menu = document.getElementById('profileMenu');
    if (profile && menu && !profile.contains(event.target) && !menu.contains(event.target)) {
      menu.style.display = 'none';
    }
  });

  // Logout function
  window.logout = function() {
    // Simple logout - redirect to login page
    window.location.href = '../auth/login.html';
  };

  // Load profile image from localStorage
  function loadProfileImage() {
    const profilePicture = localStorage.getItem('studentProfilePicture');
    if (profilePicture) {
      const profileImg = document.querySelector('.profile-img');
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
      const firstCell = rows[i].getElementsByTagName('td')[0];
      if (!firstCell) {
        continue;
      }
      const text = (firstCell.textContent || firstCell.innerText).toLowerCase();
      rows[i].style.display = text.indexOf(filter) > -1 ? '' : 'none';
    }
  };
})();
