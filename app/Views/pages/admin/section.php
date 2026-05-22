<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Section • Societech Admin</title>
  <link rel="stylesheet" type="text/css" href="<?= base_url('assets/css/admin.css') ?>" />
  <link rel="stylesheet" type="text/css" href="<?= base_url('assets/css/background.css') ?>" />
  <link rel="stylesheet" href="<?= base_url('assets/css/responsive-breakpoints.css') ?>" />
</head>
<body>
  <div class="pageBackground"></div>
  <div class="pageContent">
    <div class="dashboardContainer">

      <aside id="sidebar-container" class="sidebar"></aside>

      <main class="mainContent">
        <header class="header">
          <div class="headerTitle">
            <h1 id="pageMainTitle">Section</h1>
            <div class="headerBreadcrumb">Student roster and clearance status for this class</div>
          </div>

          <div class="headerActions">
            <button class="notificationBtn" type="button" aria-label="Notifications">
              <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9">
                </path>
              </svg>
              <span class="notificationBadge" hidden>0</span>
            </button>

            <div class="profileWrapper">
              <div class="profile" onclick="toggleProfileMenu()">
                <div class="profileImg" aria-label="Admin profile">AD</div>
                <div class="profileInfo">
                  <div class="profileName"></div>
                  <div class="profileRole"></div>
                </div>
              </div>

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

        <div class="contentSection active">
          <div class="alert alertInfo">
            <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
              <path fill-rule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clip-rule="evenodd">
              </path>
            </svg>
            <span>Membership clearance for this section. Search filters the table; totals below update to match visible rows.</span>
          </div>

          <div class="card sectionRosterCard">
            <div class="breadcrumbs rosterBreadcrumbs">
              <a class="breadcrumbLink" href="<?= site_url('admin/all-classes') ?>" aria-label="Go to Class Section">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M15 18l-6-6 6-6">
                  </path>
                </svg>
                Back to All Classes
              </a>
            </div>

            <div class="cardHeader">
              <div>
                <div class="cardTitle" id="sectionTitle">Section</div>
                <div class="cardSubtitle">
                  <span>Total Students: <strong id="totalStudents">5</strong></span>
                  <span aria-hidden="true" style="color: #d1d5db;"> · </span>
                  <span>Cleared: <strong id="clearedCount" class="amountPositive">3</strong></span>
                  <span aria-hidden="true" style="color: #d1d5db;"> · </span>
                  <span>Not Cleared: <strong id="notClearedCount" class="amountNegative">2</strong></span>
                </div>
              </div>
              <div class="searchBox">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" width="18" height="18" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M21 21l-4.3-4.3m1.8-5.2a7 7 0 11-14 0 7 7 0 0114 0z">
                  </path>
                </svg>
                <input id="studentSearch" type="search" placeholder="Search by name…" autocomplete="off" />
              </div>
            </div>

            <p class="rosterResultMeta" id="resultCount">Showing 5 students</p>

            <div class="tableContainer">
              <table id="studentsTable" aria-label="Students list">
                <thead>
                  <tr>
                    <th>Student</th>
                    <th style="text-align: right; padding-right: 16px;">Status</th>
                  </tr>
                </thead>
                <tbody></tbody>
              </table>
            </div>
          </div>
        </div>
      </main>

    </div>

    <div class="modalOverlay" id="studentPaymentsModal" role="dialog" aria-modal="true" aria-labelledby="studentPaymentsTitle">
      <div class="modal modalWide">
        <div class="modalHeader">
          <h2 class="modalTitle" id="studentPaymentsTitle">Student</h2>
          <p class="modalSubtitle" id="studentPaymentsSubtitle"></p>
        </div>
        <div class="tableContainer">
          <table id="studentPaymentsTable" aria-label="Student fee payments">
            <thead>
              <tr>
                <th>Fee / assessment</th>
                <th>Amount due</th>
                <th>Amount paid</th>
                <th>Balance</th>
                <th style="text-align: right;">Status</th>
              </tr>
            </thead>
            <tbody></tbody>
          </table>
        </div>
        <div class="modalFooter">
          <button type="button" class="btn btnPrimary" data-close-modal>Close</button>
        </div>
      </div>
    </div>

    <script src="<?= base_url('assets/js/class-rosters.js') ?>"></script>
    <script src="<?= base_url('assets/js/societech-payments.js') ?>"></script>
  <script src="<?= base_url('assets/js/admin/sidebar.js') ?>"></script>
  <script src="<?= base_url('assets/js/announcements-loader.js') ?>"></script>
  <script src="<?= base_url('assets/js/admin/shared.js') ?>"></script>
  <script src="<?= base_url('assets/js/admin/table-filters.js') ?>"></script>
  <script src="<?= base_url('assets/js/admin/section-roster.js') ?>"></script>
  <script>
      initSectionPage({
        searchInputId: 'studentSearch',
        tableId: 'studentsTable',
        resultCountId: 'resultCount',
        totalId: 'totalStudents',
        clearedId: 'clearedCount',
        notClearedId: 'notClearedCount'
      });
    </script>
  </div>
</body>
</html>






