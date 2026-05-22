<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Audit Logs • Societech Admin</title>

  <!-- Shared admin dashboard styles -->
  <link rel="stylesheet" type="text/css" href="<?= base_url('assets/css/admin.css') ?>" />

  <!-- Background image/overlay styles -->
  <link rel="stylesheet" type="text/css" href="<?= base_url('assets/css/background.css') ?>" />
  <link rel="stylesheet" href="<?= base_url('assets/css/responsive-breakpoints.css') ?>" />
</head>
<body>

  <!-- Full-page background overlay element (styled via background.css) -->
  <div class="pageBackground"></div>

  <!-- Main page wrapper that sits on top of the background -->
  <div class="pageContent">
    <div class="dashboardContainer">

      <!-- Sidebar is injected dynamically by sidebar.js -->
      <aside id="sidebar-container" class="sidebar"></aside>

      <main class="mainContent">

        <!-- ============================================================
             PAGE HEADER
             Displays the page title, breadcrumb, notifications, and
             the logged-in admin's profile with a dropdown menu.
        ============================================================ -->
        <header class="header">
          <div class="headerTitle">
            <h1>Audit Logs</h1>
            <div class="headerBreadcrumb">Review system activity</div>
          </div>

          <div class="headerActions">

            <!-- Notification bell button with unread count badge -->
            <button class="notificationBtn" type="button">
              <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
              </svg>
              <span class="notificationBadge" hidden>0</span>
            </button>

            <!-- Profile button with dropdown (Settings / Logout) -->
            <div class="profileWrapper">
              <div class="profile" onclick="toggleProfileMenu()">
                <div class="profileImg"></div>
                <div class="profileInfo">
                  <div class="profileName"></div>
                  <div class="profileRole"></div>
                </div>
              </div>

              <!-- Dropdown menu — toggled by toggleProfileMenu() in shared.js -->
              <div class="profileMenu" id="profileMenu">
                <button type="button" onclick="window.location.href='<?= site_url('admin/settings') ?>'">
                  <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                  Settings
                </button>
                <button type="button" onclick="logout()">
                  <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                  </svg>
                  Logout
                </button>
              </div>
            </div>

          </div>
        </header>

        <!-- ============================================================
             AUDIT LOGS SECTION
             Displays a filterable table of system activity events
             (logins, approvals, rejections, role assignments, etc.)
             with an option to export the log entries.
        ============================================================ -->
        <div id="audit-logs" class="contentSection active">

          <!-- Search bar, activity filter, date range filter, and export button -->
          <div class="searchFilterBar">
            <div class="searchBox">
              <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
              <input type="text" placeholder="Search logs...">
            </div>

            <!-- Filter by activity type -->
            <select class="filterSelect">
              <option>All Activities</option>
              <option>User Login</option>
              <option>Payment Changes</option>
              <option>Verification</option>
              <option>User Management</option>
            </select>

            <!-- Filter by date range -->
            <select class="filterSelect">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
              <option>Last 3 Months</option>
            </select>

            <!-- Button to export the current log view -->
            <button class="btn btnOutline">Export Logs</button>
          </div>

          <!-- Card wrapping the audit log data table -->
          <div class="card">
            <div class="tableContainer">
              <table>
                <thead>
                  <tr>
                    <th>Timestamp</th>
                    <th>User</th>
                    <th>Action</th>
                    <th>Details</th>
                    <th>IP Address</th>
                  </tr>
                </thead>
                <tbody></tbody>
              </table>
            </div><!-- /.tableContainer -->
          </div><!-- /.card -->

        </div><!-- /#audit-logs -->

      </main>
    </div><!-- /.dashboardContainer -->

    <!-- Injects shared sidebar HTML into #sidebar-container -->
    <script src="<?= base_url('assets/js/admin/sidebar.js') ?>"></script>

    <!-- Shared utilities: toggleProfileMenu(), logout(), etc. -->
  <script src="<?= base_url('assets/js/announcements-loader.js') ?>"></script>
  <script src="<?= base_url('assets/js/admin/shared.js') ?>"></script>
  </div><!-- /.pageContent -->
</body>
</html>






