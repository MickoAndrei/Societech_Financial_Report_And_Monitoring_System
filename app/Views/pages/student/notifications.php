<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Notifications • Societech Student</title>
  <!-- Global base styles shared across the app -->
  <link rel="stylesheet" href="<?= base_url('assets/css/main.css') ?>" />
  <!-- Student-specific layout and component styles -->
  <link rel="stylesheet" href="<?= base_url('assets/css/student.css') ?>" />
  <link rel="stylesheet" href="<?= base_url('assets/css/responsive-breakpoints.css') ?>" />
</head>
<body class="studentLayout" data-page="notifications">
  <div class="pageBackground" aria-hidden="true"></div>

  <!-- ============================================================
       SHELL: Outer wrapper that holds the sidebar + main content
       in a side-by-side flex layout
  ============================================================ -->
  <div class="studentShell">

    <!-- Sidebar: Empty on load, populated by student-bar.js -->
    <aside id="sidebar-container" class="sidebar"></aside>

    <!-- ============================================================
         MAIN CONTENT: Everything to the right of the sidebar
    ============================================================ -->
    <div class="studentContent">

      <!-- ── Top Bar ──────────────────────────────────────────────
           Sticky header with notification bell and profile menu
      ──────────────────────────────────────────────────────────── -->
      <header class="studentTopbar">
        <div class="headerTitle">
          <h1>Notifications</h1>
          <div class="headerBreadcrumb">Treasurer deadlines, Societech posts, and admin verifications</div>
        </div>

        <div class="headerActions">

          <!-- Notification bell with unread badge -->
          <button class="notificationBtn" type="button" aria-label="View announcements">
            <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
            </svg>
            <span class="notificationBadge" hidden>0</span>
          </button>

          <!-- Profile avatar — toggles the dropdown menu on click -->
          <div class="profileWrapper">
            <div class="profile" onclick="toggleProfileMenu()">
              <div class="profileImg"></div>
              <div class="profileInfo">
                <div class="profileName"></div>
                <div class="profileRole"></div>
              </div>
            </div>
            <div class="profileMenu" id="profileMenu">
              <button type="button" onclick="window.location.href='<?= site_url('student/settings') ?>'">
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
      <!-- ── End Top Bar ─────────────────────────────────────── -->

      <!-- ── Page Body ────────────────────────────────────────────
           Scrollable content area with frosted glass overlay card
      ──────────────────────────────────────────────────────────── -->
      <main class="studentMain">
        <div class="studentContentOverlay">

          <!-- ── Stat Summary Cards ─────────────────────────────
               At-a-glance notification counts with admin-style icons
          ──────────────────────────────────────────────────────── -->
          <div class="statsGrid" style="margin-bottom:24px;">
            <!-- Unread reminders stat card -->
            <div class="statCard orange">
              <div class="statHeader">
                <div class="statTitle">Payment Reminders</div>
                <div class="statIcon">
                  <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
              </div>
              <div class="statValue">0</div>
              <div class="statTrend">No fetched reminders</div>
            </div>
            <!-- Announcements stat card -->
            <div class="statCard blue">
              <div class="statHeader">
                <div class="statTitle">Announcements</div>
                <div class="statIcon">
                  <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"></path>
                  </svg>
                </div>
              </div>
              <div class="statValue" id="announcementStatCount">0</div>
              <div class="statTrend">Ongoing from admin</div>
            </div>
            <!-- Verification status stat card -->
            <div class="statCard green">
              <div class="statHeader">
                <div class="statTitle">Verifications</div>
                <div class="statIcon">
                  <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                  </svg>
                </div>
              </div>
              <div class="statValue">0</div>
              <div class="statTrend">No fetched verifications</div>
            </div>
          </div>

          <!-- ── Section: Payment Reminders ────────────────────
               Upcoming fee deadlines the student needs to act on
          ──────────────────────────────────────────────────────── -->
          <section class="studentSection">
            <h2 class="sectionTitle">Payment Reminders</h2>
            <div class="studentList studentEmptyList">
              <div class="studentListItem">
                <h4>No data available</h4>
                <p class="studentMeta">Payment reminders will appear here after records are fetched.</p>
              </div>
            </div>
          </section>
          <!-- ── End Payment Reminders ──────────────────────── -->

          <!-- ── Section: Announcements ─────────────────────────
               System-wide notices posted by admin/moderators
          ──────────────────────────────────────────────────────── -->
          <section class="studentSection">
            <h2 class="sectionTitle">Announcements</h2>
            <div id="announcementsFeed"></div>
          </section>
          <!-- ── End Announcements ───────────────────────────── -->

          <!-- ── Section: Verification Status ──────────────────
               Current review/verification state of student
               submissions such as scholarships and clearances
          ──────────────────────────────────────────────────────── -->
          <section class="studentSection">
            <h2 class="sectionTitle">Verification Status</h2>
            <table class="studentTable">
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Status</th>
                  <th>Last Update</th>
                </tr>
              </thead>
              <tbody></tbody>
            </table>
          </section>
          <!-- ── End Verification Status ────────────────────── -->

        </div>
      </main>
      <!-- ── End Page Body ───────────────────────────────────── -->

    </div>
    <!-- ── End Main Content ──────────────────────────────────── -->

  </div>
  <!-- ── End Shell ─────────────────────────────────────────── -->

  <!-- student.js: Handles search, profile menu toggle, logout -->
  <script src="<?= base_url('assets/js/announcements-loader.js') ?>"></script>
  <script src="<?= base_url('assets/js/student/student-session.js') ?>"></script>
  <script src="<?= base_url('assets/js/student/student.js') ?>"></script>
  <script src="<?= base_url('assets/js/student/student-bar.js') ?>"></script>
  <script src="<?= base_url('assets/js/societech-announcements.js') ?>"></script>
  <script src="<?= base_url('assets/js/student/notifications-feed.js') ?>"></script>

</body>
</html>




