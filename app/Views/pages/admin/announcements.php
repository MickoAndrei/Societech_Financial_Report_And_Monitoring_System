<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Announcements • Societech Admin</title>
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
            <h1>Announcements</h1>
            <div class="headerBreadcrumb">Post society-wide updates — shown on all notification bells</div>
          </div>

          <div class="headerActions">
            <button class="notificationBtn" type="button" aria-label="View announcements">
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
                <button type="button" onclick="window.location.href='<?= site_url('admin/settings') ?>'">Settings</button>
                <button type="button" onclick="logout()">Logout</button>
              </div>
            </div>
          </div>
        </header>

        <div id="announcements" class="contentSection active">
          <div style="margin-bottom: 24px;">
            <button type="button" class="btn btnPrimary" id="showComposeBtn">
              <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
              </svg>
              Post New Announcement
            </button>
          </div>

          <div class="card announcementComposeCard" id="announcementComposeCard" hidden>
            <div class="cardHeader">
              <div class="cardTitle" id="announcementFormTitle">New announcement</div>
            </div>
            <form id="announcementForm" class="cardContent">
              <div class="formGroup">
                <label class="formLabel" for="announcementTitle">Title</label>
                <input class="formInput" id="announcementTitle" required placeholder="e.g. Fee payment deadline extension" />
              </div>
              <div class="formGroup">
                <label class="formLabel" for="announcementBody">Message</label>
                <textarea class="formInput" id="announcementBody" rows="4" required placeholder="Write the full announcement for students and treasurers…"></textarea>
              </div>
              <div class="grid2">
                <div class="formGroup">
                  <label class="formLabel" for="announcementAuthor">Posted by</label>
                  <input class="formInput" id="announcementAuthor" />
                </div>
                <div class="formGroup">
                  <label class="formLabel" for="announcementPosted">Posted date</label>
                  <input class="formInput" id="announcementPosted" type="date" required />
                </div>
              </div>
              <div class="grid2">
                <div class="formGroup">
                  <label class="formLabel" for="announcementEnds">End date (optional)</label>
                  <input class="formInput" id="announcementEnds" type="date" />
                  <small style="color:#6b7280;">Leave blank to keep visible until you deactivate it.</small>
                </div>
                <div class="formGroup" style="display:flex;align-items:flex-end;">
                  <label style="display:flex;align-items:center;gap:8px;cursor:pointer;">
                    <input type="checkbox" id="announcementActive" checked />
                    Active (show on notification bells)
                  </label>
                </div>
              </div>
              <div style="display:flex;flex-wrap:wrap;gap:12px;margin-top:8px;">
                <button type="submit" class="btn btnPrimary">Save announcement</button>
                <button type="button" class="btn btnSecondary" id="cancelComposeBtn" hidden>Cancel</button>
              </div>
            </form>
          </div>

          <div class="card">
            <div class="cardHeader">
              <div class="cardTitle">All announcements</div>
            </div>
            <div id="announcementList"></div>
          </div>
        </div>
      </main>
    </div>

    <script src="<?= base_url('assets/js/admin/sidebar.js') ?>"></script>
  <script src="<?= base_url('assets/js/announcements-loader.js') ?>"></script>
  <script src="<?= base_url('assets/js/admin/shared.js') ?>"></script>
  <script src="<?= base_url('assets/js/societech-announcements.js') ?>"></script>
  <script src="<?= base_url('assets/js/admin/announcements-page.js') ?>"></script>
  </div>
</body>
</html>






