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
  const navLinks = document.querySelectorAll('.student-nav a');
  const topbar = document.querySelector('.student-topbar');

  if (topbar && !topbar.querySelector('.header-title')) {
    const meta = pageMeta[page] || { title: 'Societech Student', breadcrumb: 'Manage your Societech assessments and class finances' };
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
    if (window.StudentSession?.clearStudentSession) {
      window.StudentSession.clearStudentSession();
    }
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
