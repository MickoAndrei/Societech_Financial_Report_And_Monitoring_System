<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>All Classes</title>
  <link rel="stylesheet" href="<?= base_url('assets/css/main.css') ?>" />
  <link rel="stylesheet" href="<?= base_url('assets/css/student.css') ?>" />
  <link rel="stylesheet" href="<?= base_url('assets/css/responsive-breakpoints.css') ?>" />
</head>
<body class="studentLayout" data-page="societech-all-classes">
  <div class="pageBackground" aria-hidden="true"></div>
  <div class="studentShell">
    <aside id="sidebar-container" class="sidebar"></aside>
    <div class="studentContent">
      <header class="studentTopbar">
        <div class="headerTitle">
          <h1>All Classes</h1>
          <div class="headerBreadcrumb">View all BSIT sections and class treasurers</div>
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
          <div class="stSearchFilterBar">
            <div class="studentSearch">
              <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
              <input type="search" id="classSearch" placeholder="Search classes..." autocomplete="off" />
            </div>
            <select id="yearFilter" class="stFilterSelect">
              <option value="all">All Years</option>
              <option value="BSIT 1">BSIT 1</option>
              <option value="BSIT 2">BSIT 2</option>
              <option value="BSIT 3">BSIT 3</option>
            </select>
            <select id="sectionFilter" class="stFilterSelect">
              <option value="all">All Sections</option>
              <option value="A">A</option>
              <option value="B">B</option>
            </select>
          </div>
          <div class="stClassesGrid" id="classesGrid"></div>
        </div>
      </main>
    </div>
  </div>

  <script src="<?= base_url('assets/js/class-rosters.js') ?>"></script>
  <script src="<?= base_url('assets/js/societech-payments.js') ?>"></script>
  <script src="<?= base_url('assets/js/student/student-session.js') ?>"></script>
  <script src="<?= base_url('assets/js/student/student.js') ?>"></script>
  <script src="<?= base_url('assets/js/student/student-bar.js') ?>"></script>
  <script src="<?= base_url('assets/js/student/societech-all-classes.js') ?>"></script>
</body>
</html>




