document.addEventListener('DOMContentLoaded', function () {
  const sidebarContainer = document.getElementById('sidebar-container');
  if (!sidebarContainer) return;

  function appBase() {
    if (window.location.pathname.includes('/public/')) {
      return `${window.location.origin}${window.location.pathname.replace(/\/public\/.*$/, '/public')}`;
    }

    const marker = '/Societech_Financial_Report_And_Monitoring';
    if (window.location.pathname.includes(marker)) {
      return `${window.location.origin}${marker}/public`;
    }

    return window.location.origin;
  }

  function route(path) {
    return `${appBase()}${path}`;
  }

  function toggleProfileMenu() {
    const menu = document.getElementById('profileMenu');
    if (!menu) return;
    menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
  }

  window.toggleProfileMenu = toggleProfileMenu;
  window.logout = function () {
    window.location.href = `${appBase()}/auth/logout`;
  };

  document.addEventListener('click', function (event) {
    const profile = document.querySelector('.profileWrapper');
    const menu = document.getElementById('profileMenu');
    if (profile && menu && !profile.contains(event.target)) {
      menu.style.display = 'none';
    }
  });

  function renderSidebar() {
    const currentPath = window.location.pathname.replace(/\/$/, '').split('/').pop() || 'student';
    const isClassTreasurer = window.StudentSession?.isClassroomTreasurer() === true;
    const isSocietechTreasurer = window.StudentSession?.isSocietechTreasurer() === true;
    const classLabel = isClassTreasurer ? window.StudentSession.getTreasurerClassLabel() : '';

    let subtitle = 'Societech Student Portal';
    if (isSocietechTreasurer) subtitle = 'Student - Societech Treasurer';
    else if (isClassTreasurer) subtitle = `Student - Class Treasurer (${classLabel})`;

    const classTreasurerNav = isClassTreasurer
      ? `
      <div class="navSection" id="class-treasurer-nav">
        <div class="navSectionTitle">Class Treasurer</div>
        <a href="${route('/student/class-roster')}" class="navItem ${currentPath === 'class-roster' ? 'active' : ''}">
          <svg class="navIcon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
          </svg>
          My Section Class List
        </a>
      </div>`
      : '';

    const societechTreasurerNav = isSocietechTreasurer
      ? `
      <div class="navSection" id="societech-treasurer-nav">
        <div class="navSectionTitle">Societech Treasurer</div>
        <a href="${route('/student/societech-dashboard')}" class="navItem ${currentPath === 'societech-dashboard' ? 'active' : ''}">
          <svg class="navIcon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
          </svg>
          Treasurer Dashboard
        </a>
        <a href="${route('/student/societech-all-classes')}" class="navItem ${currentPath === 'societech-all-classes' ? 'active' : ''}">
          <svg class="navIcon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
          </svg>
          All Classes
        </a>
        <a href="${route('/student/societech-payments')}" class="navItem ${currentPath === 'societech-payments' ? 'active' : ''}">
          <svg class="navIcon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
          </svg>
          Manage Payments
        </a>
      </div>`
      : '';

    const mainDashboardActive = (currentPath === 'student' || currentPath === '') && !isSocietechTreasurer;

    sidebarContainer.innerHTML = `
      <div class="sidebarHeader">
        <img class="societechLogo" src="${route('/assets/images/societech_logo.png')}" alt="Societech Logo">
        <div class="sidebarTitle">SOCIETECH</div>
        <div class="sidebarSubtitle">${subtitle}</div>
      </div>
      <nav class="sidebarNav">
        <div class="navSection">
          <div class="navSectionTitle">Main</div>
          <a href="${route('/student')}" class="navItem ${mainDashboardActive ? 'active' : ''}">
            <svg class="navIcon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
            Dashboard
          </a>
        </div>
        <div class="navSection">
          <div class="navSectionTitle">Finance</div>
          <a href="${route('/student/financial-records')}" class="navItem ${currentPath === 'financial-records' ? 'active' : ''}">
            <svg class="navIcon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path></svg>
            My Financial Records
          </a>
          <a href="${route('/student/contributions')}" class="navItem ${currentPath === 'contributions' ? 'active' : ''}">
            <svg class="navIcon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            Cash Contributions
          </a>
        </div>
        ${societechTreasurerNav}
        ${classTreasurerNav}
        <div class="navSection">
          <div class="navSectionTitle">Account</div>
          <a href="${route('/student/notifications')}" class="navItem ${currentPath === 'notifications' ? 'active' : ''}">
            <svg class="navIcon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>
            Notifications
          </a>
          <a href="${route('/student/settings')}" class="navItem ${currentPath === 'settings' ? 'active' : ''}">
            <svg class="navIcon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
            Settings
          </a>
        </div>
      </nav>
    `;

    if (window.StudentSession?.applyProfileToPage) {
      window.StudentSession.applyProfileToPage();
    }
  }

  // Show a lightweight skeleton so the sidebar isn't blank while auth/me loads
  function renderSkeleton() {
    sidebarContainer.innerHTML = `
      <div class="sidebarHeader">
        <div class="sidebarTitle">SOCIETECH</div>
        <div class="sidebarSubtitle" style="opacity:0.4">Loading…</div>
      </div>
      <nav class="sidebarNav" aria-busy="true" style="opacity:0.35">
        <div class="navSection"><div class="navSectionTitle">Main</div>
          <a class="navItem" style="pointer-events:none">Dashboard</a></div>
        <div class="navSection"><div class="navSectionTitle">Finance</div>
          <a class="navItem" style="pointer-events:none">My Financial Records</a>
          <a class="navItem" style="pointer-events:none">Cash Contributions</a></div>
        <div class="navSection"><div class="navSectionTitle">Account</div>
          <a class="navItem" style="pointer-events:none">Notifications</a>
          <a class="navItem" style="pointer-events:none">Settings</a></div>
      </nav>`;
  }

  renderSkeleton();
  // Only do the real render once the session is known — avoids the flash where
  // the Societech Treasurer nav section appears missing then snaps in late.
  window.addEventListener('societech-session-ready', renderSidebar);
});