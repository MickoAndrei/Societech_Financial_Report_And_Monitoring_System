<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Section Class List</title>
  <link rel="stylesheet" href="<?= base_url('assets/css/main.css') ?>" />
  <link rel="stylesheet" href="<?= base_url('assets/css/student.css') ?>" />
  <link rel="stylesheet" href="<?= base_url('assets/css/responsive-breakpoints.css') ?>" />
</head>
<body class="studentLayout" data-page="societech-section-roster">
  <div class="pageBackground" aria-hidden="true"></div>
  <div class="studentShell">
    <aside id="sidebar-container" class="sidebar"></aside>
    <div class="studentContent">
      <header class="studentTopbar">
        <div class="headerTitle">
          <h1 id="pageMainTitle">Section Class List</h1>
          <div class="headerBreadcrumb">Student roster for the selected section</div>
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

            <a href="<?= site_url('student/societech-all-classes') ?>" class="rosterBackLink">Back to All Classes</a>
            <div class="treasurerRosterAlert">
              <span>Viewing <strong id="sectionTitle">section</strong> — select a student for fee details. Enter the amount each student paid; balance updates automatically.</span>
            </div>
            <div class="treasurerRosterCard">
              <div class="treasurerRosterHeader">
                <div>
                  <h2 class="sectionTitle" id="rosterSectionHeading">Section roster</h2>
                  <p class="sectionSubtitle">
                    Total: <strong id="totalStudents">0</strong>
                    · Cleared: <strong id="clearedCount" class="countCleared">0</strong>
                    · Not cleared: <strong id="notClearedCount" class="countNotCleared">0</strong>
                  </p>
                </div>
                <div class="treasurerRosterToolbar">
                  <label class="treasurerSortLabel" for="rosterSort">
                    Sort by
                    <select id="rosterSort" class="formInput treasurerSortSelect" autocomplete="off">
                      <option value="default">Section order</option>
                      <option value="cleared-first">Cleared first</option>
                      <option value="not-cleared-first">Not cleared first</option>
                    </select>
                  </label>
                  <div class="studentSearch treasurerRosterSearch">
                    <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-4.3-4.3m1.8-5.2a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                    <input id="studentSearch" type="search" placeholder="Search by name or balance" autocomplete="off" />
                  </div>
                </div>
              </div>
              <p class="rosterResultMeta" id="resultCount">Showing 0 students</p>
              <div class="tableContainer">
                <table id="studentsTable" class="studentTable treasurerRosterTable">
                  <thead><tr><th>Student</th><th>Balance (total)</th><th>Clearance</th></tr></thead>
                  <tbody></tbody>
                </table>
              </div>
            </div>

        </div>
      </main>
    </div>
  </div>

  <script src="<?= base_url('assets/js/class-rosters.js') ?>"></script>
  <script src="<?= base_url('assets/js/societech-payments.js') ?>"></script>
  <script src="<?= base_url('assets/js/student/treasurer-fee-dataset.js') ?>"></script>
  <script src="<?= base_url('assets/js/student/student-session.js') ?>"></script>
  <script src="<?= base_url('assets/js/student/student.js') ?>"></script>
  <script src="<?= base_url('assets/js/announcements-loader.js') ?>"></script>
  <script src="<?= base_url('assets/js/student/student-bar.js') ?>"></script>

  <div class="studentModalOverlay" id="studentPaymentsModal" role="dialog" aria-modal="true">
    <div class="studentModal studentModalWide">
      <div class="studentModalHeader">
        <h2 id="studentPaymentsTitle">Student</h2>
        <p id="studentPaymentsSubtitle"></p>
      </div>
      <div class="tableContainer">
        <table id="studentPaymentsTable" class="studentTable">
          <thead><tr><th>Fee</th><th>Due</th><th>Paid</th><th>Balance</th><th>Status</th></tr></thead>
          <tbody></tbody>
        </table>
      </div>
      <div class="studentModalFooter">
        <button type="button" class="btn btnPrimary" data-close-modal>Close</button>
      </div>
    </div>
  </div>
  <script src="<?= base_url('assets/js/student/societech-section-roster.js') ?>"></script>
</body>
</html>




