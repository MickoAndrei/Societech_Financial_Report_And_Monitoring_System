<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Settings • Societech Student</title>
  <!-- Global base styles shared across the app -->
  <link rel="stylesheet" href="<?= base_url('assets/css/main.css') ?>" />
  <!-- Student-specific layout and component styles -->
  <link rel="stylesheet" href="<?= base_url('assets/css/student.css') ?>" />
  <link rel="stylesheet" href="<?= base_url('assets/css/responsive-breakpoints.css') ?>" />
</head>
<body class="studentLayout" data-page="settings">
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
          <h1>Settings</h1>
          <div class="headerBreadcrumb">Societech Student Portal — alerts, password, and profile</div>
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

          <!-- ── Section: Settings ──────────────────────────────
               Three settings cards in a responsive grid:
               Notification preferences, password change,
               and personal information update
          ──────────────────────────────────────────────────────── -->
          <section class="studentSection">
            <div class="settingsGrid">

              <!-- ── Card: Notification Settings ───────────────
                   Checkboxes for toggling notification types.
                   Saved via saveNotificationSettings() in settings.js
              ──────────────────────────────────────────────────── -->
              <div class="settingsCard">
                <div class="cardHeader">
                  <h3>Notification Settings</h3>
                  <p>Choose what notifications you want to receive</p>
                </div>
                <div class="cardContent">
                  <div class="formGroup">
                    <label class="checkboxLabel">
                      <input type="checkbox" id="paymentReminders" checked>
                      <span class="checkmark"></span>
                      Payment Reminders
                    </label>
                  </div>
                  <div class="formGroup">
                    <label class="checkboxLabel">
                      <input type="checkbox" id="systemUpdates" checked>
                      <span class="checkmark"></span>
                      System Updates
                    </label>
                  </div>
                  <div class="formGroup">
                    <label class="checkboxLabel">
                      <input type="checkbox" id="classAnnouncements" checked>
                      <span class="checkmark"></span>
                      Class &amp; Societech announcements
                    </label>
                  </div>
                  <div class="formGroup">
                    <label class="checkboxLabel">
                      <input type="checkbox" id="financialAlerts" checked>
                      <span class="checkmark"></span>
                      Financial Alerts
                    </label>
                  </div>
                  <button class="btn btnPrimary" onclick="saveNotificationSettings()">Save Preferences</button>
                </div>
              </div>
              <!-- ── End Notification Settings ──────────────── -->

              <!-- ── Card: Change Password ──────────────────────
                   Three password fields validated and submitted
                   via changePassword() in settings.js
              ──────────────────────────────────────────────────── -->
              <div class="settingsCard">
                <div class="cardHeader">
                  <h3>Change Password</h3>
                  <p>Update your account password</p>
                </div>
                <div class="cardContent">
                  <div class="formGroup">
                    <label class="formLabel">Current Password</label>
                    <input type="password" class="formInput" id="currentPassword" placeholder="Enter current password">
                  </div>
                  <div class="formGroup">
                    <label class="formLabel">New Password</label>
                    <input type="password" class="formInput" id="newPassword" placeholder="Enter new password">
                  </div>
                  <div class="formGroup">
                    <label class="formLabel">Confirm New Password</label>
                    <input type="password" class="formInput" id="confirmPassword" placeholder="Confirm new password">
                  </div>
                  <button class="btn btnPrimary" onclick="changePassword()">Change Password</button>
                </div>
              </div>
              <!-- ── End Change Password ────────────────────── -->

              <!-- ── Card: Personal Information ─────────────────
                   Editable profile fields including a file input
                   for profile picture preview via settings.js
              ──────────────────────────────────────────────────── -->
              <div class="settingsCard">
                <div class="cardHeader">
                  <h3>Personal Information</h3>
                  <p>Update your personal details</p>
                </div>
                <div class="cardContent">
                  <div class="formGroup">
                    <label class="formLabel">Full Name</label>
                    <input type="text" class="formInput" id="fullName" placeholder="Enter your full name">
                  </div>
                  <div class="formGroup">
                    <label class="formLabel">Email Address</label>
                    <input type="email" class="formInput" id="email" placeholder="Enter your email">
                  </div>
                  <div class="formGroup">
                    <label class="formLabel">Phone Number</label>
                    <input type="tel" class="formInput" id="phone" placeholder="Enter your phone number">
                  </div>
                  <div class="formGroup">
                    <label class="formLabel">Program / Year</label>
                    <input type="text" class="formInput" id="program" placeholder="e.g. BSIT 1A — Societech member">
                  </div>
                  <div class="formGroup">
                    <label class="formLabel">Profile Picture</label>
                    <!-- onchange triggers a live preview via previewProfilePicture() in settings.js -->
                    <input type="file" class="formInput" id="profilePicture" accept="image/*" onchange="previewProfilePicture()">
                    <div class="profilePreview">
                      <img id="profilePreview" src="" alt="Profile Preview" style="display: none; width: 80px; height: 80px; border-radius: 50%; object-fit: cover; margin-top: 10px;">
                    </div>
                  </div>
                  <button class="btn btnPrimary" onclick="savePersonalInfo()">Save Information</button>
                </div>
              </div>
              <!-- ── End Personal Information ───────────────── -->

            </div>
          </section>
          <!-- ── End Settings ────────────────────────────────── -->

        </div>
      </main>
      <!-- ── End Page Body ───────────────────────────────────── -->

    </div>
    <!-- ── End Main Content ──────────────────────────────────── -->

  </div>
  <!-- ── End Shell ─────────────────────────────────────────── -->

  <script src="<?= base_url('assets/js/student/student-session.js') ?>"></script>
  <!-- student.js: Handles search, profile menu toggle, logout -->
  <script src="<?= base_url('assets/js/student/student.js') ?>"></script>
  <!-- settings.js: Handles save/change password/profile picture preview -->
  <script src="<?= base_url('assets/js/student/settings.js') ?>"></script>
  <!-- student-bar.js: Dynamically injects the student sidebar -->
  <script src="<?= base_url('assets/js/announcements-loader.js') ?>"></script>
  <script src="<?= base_url('assets/js/student/student-bar.js') ?>"></script>

</body>
</html>




