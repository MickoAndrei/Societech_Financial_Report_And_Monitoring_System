<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Section Class List • Societech Student</title>
  <link rel="stylesheet" href="<?= base_url('assets/css/main.css') ?>" />
  <link rel="stylesheet" href="student.css" />
  <link rel="stylesheet" href="<?= base_url('assets/css/responsive-breakpoints.css') ?>" />
</head>
<body class="studentLayout" data-page="class-roster">
  <div class="pageBackground" aria-hidden="true"></div>
  <div class="studentShell">
    <aside id="sidebar-container" class="sidebar"></aside>

    <div class="studentContent">
      <header class="studentTopbar">
        <div class="headerTitle">
          <h1 id="pageMainTitle">Section Class List</h1>
          <div class="headerBreadcrumb">Students in your assigned section only</div>
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
          <section class="studentSection treasurerRosterSection">
            <div class="treasurerRosterAlert">
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path>
              </svg>
              <span>As classroom treasurer, you can view clearance status for <strong id="sectionTitle">your section</strong> only. Select a student to review fees and enter the amount each student paid; balance updates automatically.</span>
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
                    <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-4.3-4.3m1.8-5.2a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                    </svg>
                    <input id="studentSearch" type="search" placeholder="Search by name or balance..." autocomplete="off" />
                  </div>
                </div>
              </div>

              <p class="rosterResultMeta" id="resultCount">Showing 0 students</p>

              <div class="tableContainer">
                <table id="studentsTable" class="studentTable treasurerRosterTable" aria-label="Section class list">
                  <thead>
                    <tr>
                      <th>Student</th>
                      <th>Balance (total)</th>
                      <th>Clearance</th>
                    </tr>
                  </thead>
                  <tbody></tbody>
                </table>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  </div>

  <div class="studentModalOverlay" id="studentPaymentsModal" role="dialog" aria-modal="true" aria-labelledby="studentPaymentsTitle">
    <div class="studentModal studentModalWide">
      <div class="studentModalHeader">
        <h2 id="studentPaymentsTitle">Student</h2>
        <p id="studentPaymentsSubtitle"></p>
      </div>
      <div class="tableContainer">
        <table id="studentPaymentsTable" class="studentTable">
          <thead>
            <tr>
              <th>Fee / assessment</th>
              <th>Amount due</th>
              <th>Amount paid</th>
              <th>Balance</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody></tbody>
        </table>
      </div>
      <div class="studentModalFooter">
        <button type="button" class="btn btnPrimary" data-close-modal>Close</button>
      </div>
    </div>
  </div>

  <script src="<?= base_url('assets/js/class-rosters.js') ?>"></script>
  <script src="<?= base_url('assets/js/societech-payments.js') ?>"></script>
  <script src="treasurer-fee-dataset.js"></script>
  <script src="student-session.js"></script>
  <script src="student.js"></script>
  <script src="<?= base_url('assets/js/announcements-loader.js') ?>"></script>
  <script src="student-bar.js"></script>
  <script src="treasurer-roster.js"></script>
</body>
</html>



