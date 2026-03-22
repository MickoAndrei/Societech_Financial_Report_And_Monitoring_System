/* ============================================================
   student-bar.js
   Dynamically injects the student sidebar into any student
   page that has <aside id="sidebar-container" class="sidebar">
   Mirrors the structure of bar.js (admin sidebar) but with
   student-specific navigation links and labeling.
============================================================ */

document.addEventListener('DOMContentLoaded', function () {

  /* Target the empty <aside> placeholder in the HTML */
  const sidebarContainer = document.getElementById('sidebar-container');
  if (!sidebarContainer) return;

  /* Detect the current page filename to highlight the active nav link */
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';

  /* ── Sidebar HTML Template ──────────────────────────────────
     Built as a template literal so currentPath comparisons
     can set the 'active' class dynamically on the correct link
  ──────────────────────────────────────────────────────────── */
  const sidebarHTML = `

    <!-- Sidebar header: logo, app name, role label -->
    <div class="sidebar-header">
      <img class="societech_logo" src="../assets/images/societech_logo.png" alt="Societech Logo">
      <div class="sidebar-title">SOCIETECH</div>
      <div class="sidebar-subtitle">Student Dashboard</div>
    </div>

    <!-- Sidebar navigation -->
    <nav class="sidebar-nav">

      <!-- ── Main ─────────────────────────────────────────────
           Primary landing page for the student portal
      ──────────────────────────────────────────────────────── -->
      <div class="nav-section">
        <div class="nav-section-title">Main</div>
        <a href="index.html" class="nav-item ${currentPath === 'index.html' || currentPath === '' ? 'active' : ''}">
          <svg class="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
          </svg>
          Dashboard
        </a>
      </div>

      <!-- ── Finance ───────────────────────────────────────────
           Financial records and cash contribution pages
      ──────────────────────────────────────────────────────── -->
      <div class="nav-section">
        <div class="nav-section-title">Finance</div>
        <a href="financial-records.html" class="nav-item ${currentPath === 'financial-records.html' ? 'active' : ''}">
          <svg class="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path>
          </svg>
          My Financial Records
        </a>
        <a href="contributions.html" class="nav-item ${currentPath === 'contributions.html' ? 'active' : ''}">
          <svg class="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          Cash Contributions
        </a>
      </div>

      <!-- ── Account ───────────────────────────────────────────
           Notification inbox and account settings
      ──────────────────────────────────────────────────────── -->
      <div class="nav-section">
        <div class="nav-section-title">Account</div>
        <a href="notifications.html" class="nav-item ${currentPath === 'notifications.html' ? 'active' : ''}">
          <svg class="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
          </svg>
          Notifications
        </a>
        <a href="settings.html" class="nav-item ${currentPath === 'settings.html' ? 'active' : ''}">
          <svg class="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
          </svg>
          Settings
        </a>
      </div>

    </nav>
  `;
  /* ── End Sidebar HTML Template ──────────────────────────── */

  /* Inject the sidebar HTML into the placeholder <aside> */
  sidebarContainer.innerHTML = sidebarHTML;

});