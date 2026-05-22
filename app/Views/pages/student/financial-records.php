<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Financial Records • Societech Student</title>
  <!-- Global base styles shared across the app -->
  <link rel="stylesheet" href="<?= base_url('assets/css/main.css') ?>" />
  <!-- Student-specific layout and component styles -->
  <link rel="stylesheet" href="<?= base_url('assets/css/student.css') ?>" />
  <link rel="stylesheet" href="<?= base_url('assets/css/responsive-breakpoints.css') ?>" />
</head>
<body class="studentLayout" data-page="records">
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
          <h1>Financial Records</h1>
          <div class="headerBreadcrumb">Membership, dues, IT Days (Panagmaya), and treasurer-posted payments</div>
        </div>

        <div class="headerActions">

          <!-- Notification bell with unread badge -->
          <button class="notificationBtn" type="button">
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

          <!-- ── Section: Current Balance ───────────────────────
               Summary cards for outstanding balance, next due
               date, and installment plan status
          ──────────────────────────────────────────────────────── -->
          <section class="studentSection">
            <h2 class="sectionTitle">Current Balance</h2>
            <div class="statsGrid">
              <!-- Outstanding balance stat card with money icon -->
              <div class="statCard red">
                <div class="statHeader">
                  <div class="statTitle">Total Outstanding</div>
                  <div class="statIcon">
                    <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </div>
                </div>
                <div class="statValue">₱0</div>
                <div class="statTrend">No fetched balance</div>
              </div>
              <!-- Next due date stat card with calendar icon -->
              <div class="statCard orange">
                <div class="statHeader">
                  <div class="statTitle">Next Due Date</div>
                  <div class="statIcon">
                    <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                    </svg>
                  </div>
                </div>
                <div class="statValue" style="font-size:22px;">No due date</div>
                <div class="statTrend">No fetched deadlines</div>
              </div>
            </div>
          </section>
          <!-- ── End Current Balance ─────────────────────────── -->

          <!-- ── Section: Payment History ───────────────────────
               Searchable table of all posted/completed payments
          ──────────────────────────────────────────────────────── -->
          <section class="studentSection">
            <h2 class="sectionTitle">Payment History</h2>

            <!-- Live search filters rows in #paymentTable via student.js -->
            <div class="studentSearch">
              <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
              <input type="text" id="paymentSearch" placeholder="Search Societech payments…" onkeyup="studentSearchTable('paymentTable','paymentSearch')" />
            </div>

            <table class="studentTable" id="paymentTable">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Reference</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody></tbody>
            </table>
          </section>
          <!-- ── End Payment History ─────────────────────────── -->

          <!-- ── Section: Fee Breakdown ─────────────────────────
               Per-fee-type breakdown showing individual statuses
          ──────────────────────────────────────────────────────── -->
          <section class="studentSection">
            <h2 class="sectionTitle">Fee Breakdown</h2>
            <table class="studentTable">
              <thead>
                <tr>
                  <th>Fee Type</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody></tbody>
            </table>
          </section>
          <!-- ── End Fee Breakdown ───────────────────────────── -->

          <!-- ── Section: Pending Payments ──────────────────────
               Searchable list of upcoming/unpaid obligations
          ──────────────────────────────────────────────────────── -->
          <section class="studentSection">
            <h2 class="sectionTitle">Pending Payments</h2>

            <!-- Live search filters rows in #pendingTable via student.js -->
            <div class="studentSearch">
              <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
              <input type="text" id="pendingSearch" placeholder="Search pending Societech items…" onkeyup="studentSearchTable('pendingTable','pendingSearch')" />
            </div>

            <table class="studentTable" id="pendingTable">
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Deadline</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody></tbody>
            </table>
          </section>
          <!-- ── End Pending Payments ────────────────────────── -->

        </div>
      </main>
      <!-- ── End Page Body ───────────────────────────────────── -->

    </div>
    <!-- ── End Main Content ──────────────────────────────────── -->

  </div>
  <!-- ── End Shell ─────────────────────────────────────────── -->

  <!-- student.js: Handles search, profile menu toggle, logout -->
  <script src="<?= base_url('assets/js/student/student-session.js') ?>"></script>
  <script src="<?= base_url('assets/js/student/student.js') ?>"></script>
  <!-- student-bar.js: Dynamically injects the student sidebar -->
  <script src="<?= base_url('assets/js/announcements-loader.js') ?>"></script>
  <script src="<?= base_url('assets/js/student/student-bar.js') ?>"></script>

</body>
</html>




