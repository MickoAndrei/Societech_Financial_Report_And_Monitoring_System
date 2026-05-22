<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Societech Treasurer Dashboard</title>
  <link rel="stylesheet" href="<?= base_url('assets/css/main.css') ?>" />
  <link rel="stylesheet" href="<?= base_url('assets/css/student.css') ?>" />
  <link rel="stylesheet" href="<?= base_url('assets/css/responsive-breakpoints.css') ?>" />
</head>
<body class="studentLayout" data-page="societech-dashboard">
  <div class="pageBackground" aria-hidden="true"></div>
  <div class="studentShell">
    <aside id="sidebar-container" class="sidebar"></aside>
    <div class="studentContent">
      <header class="studentTopbar">
        <div class="headerTitle">
          <h1>Societech Treasurer Dashboard</h1>
          <div class="headerBreadcrumb">Society-wide collections, sections, and payment assessments</div>
        </div>
        <div class="headerActions">
          <div class="profileWrapper">
            <div class="profile" onclick="toggleProfileMenu()">
              <div class="profileImg"></div>
              <div class="profileInfo">
                <div class="profileName"></div>
                <div class="profileRole"></div>
              </div>
            </div>
            <div class="profileMenu" id="profileMenu">
              <button type="button" onclick="window.location.href='<?= site_url('student/settings') ?>'">Settings</button>
              <button type="button" onclick="logout()">Logout</button>
            </div>
          </div>

        </div>
      </header>
      <main class="studentMain">
        <div class="studentContentOverlay">
          <div class="stDashboardStats">
            <div class="stStatCard"><h4>Sections</h4><div class="stStatValue" id="statSections">0</div></div>
            <div class="stStatCard"><h4>Total Students</h4><div class="stStatValue" id="statStudents">0</div></div>
            <div class="stStatCard"><h4>Collections</h4><div class="stStatValue" id="statCollections">0</div></div>
            <div class="stStatCard"><h4>Outstanding</h4><div class="stStatValue" id="statBalance">0</div></div>
            <div class="stStatCard"><h4>Active Payments</h4><div class="stStatValue" id="statPayments">0</div></div>
          </div>
          <div class="studentDashboardGrid">
            <section class="studentSection">
              <h2 class="sectionTitle">Recent Payment Assessments</h2>
              <p class="sectionSubtitle"><a href="<?= site_url('student/societech-payments') ?>">Manage all payments</a></p>
              <table class="studentTable" id="recentPaymentsTable">
                <thead><tr><th>Payment</th><th>Amount</th><th>Deadline</th></tr></thead>
                <tbody></tbody>
              </table>
            </section>
            <section class="studentSection">
              <h2 class="sectionTitle">Quick Section Access</h2>
              <p class="sectionSubtitle"><a href="<?= site_url('student/societech-all-classes') ?>">View all classes</a></p>
              <ul id="sectionsQuickList"></ul>
            </section>
          </div>
        </div>
      </main>
    </div>
  </div>

  <script src="<?= base_url('assets/js/class-rosters.js') ?>"></script>
  <script src="<?= base_url('assets/js/societech-payments.js') ?>"></script>
  <script src="<?= base_url('assets/js/student/student-session.js') ?>"></script>
  <script src="<?= base_url('assets/js/student/student.js') ?>"></script>
  <script src="<?= base_url('assets/js/student/student-bar.js') ?>"></script>
  <script src="<?= base_url('assets/js/student/societech-treasurer.js') ?>"></script>
  <!-- FIX: initDashboard now triggered by societech-session-ready inside societech-treasurer.js -->
</body>
</html>