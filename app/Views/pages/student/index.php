<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Dashboard • Societech Student</title>
  <link rel="stylesheet" href="<?= base_url('assets/css/main.css') ?>" />
  <link rel="stylesheet" href="<?= base_url('assets/css/student.css') ?>" />
  <link rel="stylesheet" href="<?= base_url('assets/css/responsive-breakpoints.css') ?>" />
</head>
<body class="studentLayout" data-page="dashboard">
  <div class="pageBackground" aria-hidden="true"></div>
  <div class="studentShell">
    <aside id="sidebar-container" class="sidebar"></aside>

    <div class="studentContent">
      <header class="studentTopbar">
        <div class="headerTitle">
          <h1>Dashboard</h1>
          <div class="headerBreadcrumb">Societech and BSIT class balances, dues, and updates</div>
        </div>

        <div class="headerActions">
          <button class="notificationBtn" type="button">
            <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
            </svg>
            <span class="notificationBadge" hidden>0</span>
          </button>

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

      <main class="studentMain">
        <div class="studentContentOverlay">
          <div class="studentDashboardGrid">
            <div class="studentGrid studentGridStats">
              <div class="studentCard">
                <h4>Total Balance</h4>
                <p class="studentMeta">No balance data yet</p>
              </div>
              <div class="studentCard">
                <h4>Next Due Date</h4>
                <p class="studentMeta">No due date yet</p>
              </div>
              <div class="studentCard">
                <h4>Payments This Term</h4>
                <p class="studentMeta">No payment data yet</p>
              </div>
            </div>

            <section class="studentSection studentSectionWide">
              <h2 class="sectionTitle">Uncleared Items</h2>
              <p class="sectionSubtitle">Outstanding Societech and class liabilities</p>
              <div class="studentSearch">
                <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
                <input type="text" id="unclearedSearch" placeholder="Search fees (e.g. membership, Panagmaya)" onkeyup="studentSearchTable('unclearedTable','unclearedSearch')" />
              </div>
              <table class="studentTable" id="unclearedTable">
                <thead>
                  <tr>
                    <th>Liability</th>
                    <th>Deadline</th>
                    <th>Amount</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody></tbody>
              </table>
            </section>

            <section class="studentSection studentSectionWide">
              <h2 class="sectionTitle">Cleared Items</h2>
              <p class="sectionSubtitle">Posted to your Societech clearing record</p>
              <table class="studentTable">
                <thead>
                  <tr>
                    <th>Liability</th>
                    <th>Paid</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody></tbody>
              </table>
            </section>

            <section class="studentSection studentSectionWide">
              <h2 class="sectionTitle">Recent Transactions</h2>
              <table class="studentTable">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Description</th>
                    <th>Amount</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody></tbody>
              </table>
            </section>

            <section class="studentSection studentSectionWide">
              <h2 class="sectionTitle">Announcements</h2>
              <div id="announcementsFeed"></div>
            </section>
          </div>
        </div>
      </main>
    </div>
  </div>

  <script src="<?= base_url('assets/js/student/student-session.js') ?>"></script>
  <script src="<?= base_url('assets/js/student/student.js') ?>"></script>
  <script src="<?= base_url('assets/js/announcements-loader.js') ?>"></script>
  <script src="<?= base_url('assets/js/student/notifications-feed.js') ?>"></script>
  <script src="<?= base_url('assets/js/student/student-bar.js') ?>"></script>
</body>
</html>




