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

  const currentPath = window.location.pathname.replace(/\/$/, '').split('/').pop() || 'admin';
  const items = [
    ['Main', [
      ['dashboard', 'Dashboard', '/admin/dashboard', 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6'],
    ]],
    ['Financial Management', [
      ['all-classes', 'All Classes', '/admin/all-classes', 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10'],
      ['payments', 'Payment Records', '/admin/payments', 'M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z'],
      ['verify', 'Verify Records', '/admin/verify', 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'],
      ['cash-flow', 'Cash Flow', '/admin/cash-flow', 'M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z'],
      ['reports', 'Reports', '/admin/reports', 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z'],
    ]],
    ['Administration', [
      ['users', 'User Management', '/admin/users', 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z'],
      ['fees', 'Fee Configuration', '/admin/fees', 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z'],
      ['announcements', 'Announcements', '/admin/announcements', 'M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z'],
      ['audit-logs', 'Audit Logs', '/admin/audit-logs', 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'],
      ['settings', 'System Settings', '/admin/settings', 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z'],
    ]],
  ];

  const sections = items.map(([title, links]) => `
    <div class="navSection">
      <div class="navSectionTitle">${title}</div>
      ${links.map(([key, label, href, icon]) => `
        <a href="${route(href)}" class="navItem ${(currentPath === key || (key === 'dashboard' && currentPath === 'admin')) ? 'active' : ''}">
          <svg class="navIcon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="${icon}"></path>
          </svg>
          ${label}
        </a>
      `).join('')}
    </div>
  `).join('');

  sidebarContainer.innerHTML = `
    <div class="sidebarHeader">
      <img class="societechLogo" src="${route('/assets/images/societech_logo.png')}" alt="Societech Logo">
      <div class="sidebarTitle">SOCIETECH</div>
      <div class="sidebarSubtitle">Moderator Dashboard</div>
    </div>
    <nav class="sidebarNav">${sections}</nav>
  `;
});