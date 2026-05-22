<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Profile • Societech Student</title>
  <link rel="stylesheet" href="<?= base_url('assets/css/main.css') ?>" />
  <link rel="stylesheet" href="<?= base_url('assets/css/student.css') ?>" />
  <link rel="stylesheet" href="<?= base_url('assets/css/responsive-breakpoints.css') ?>" />
</head>
<body class="studentLayout" data-page="profile">
  <div class="pageBackground" aria-hidden="true"></div>
  <div class="studentShell">
    <aside id="sidebar-container" class="sidebar"></aside>

    <div class="studentContent">
      <header class="studentTopbar">
        <div class="headerTitle">
          <h1>Profile</h1>
          <div class="headerBreadcrumb">Societech membership and BSIT class account details</div>
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
          <section class="studentSection">
            <h2 class="sectionTitle">Personal Information</h2>
            <p class="sectionSubtitle">Details should match your registrar records and Societech roster.</p>

            <div class="settingsGrid">
              <div class="settingsCard">
                <div class="cardHeader">
                  <h3>Account Details</h3>
                  <p>Shown on receipts and clearance checks for BSIT 1A.</p>
                </div>
                <div class="cardContent">
                  <div class="formGroup">
                    <label class="formLabel" for="studentName">Full Name</label>
                    <input class="formInput" id="studentName" type="text" />
                  </div>
                  <div class="formGroup">
                    <label class="formLabel" for="studentId">School ID</label>
                    <input class="formInput" id="studentId" type="text" value="2024-001234" readonly />
                  </div>
                  <div class="formGroup">
                    <label class="formLabel" for="studentEmail">Email</label>
                    <input class="formInput" id="studentEmail" type="email" />
                  </div>
                  <div class="formGroup">
                    <label class="formLabel" for="studentPhone">Phone</label>
                    <input class="formInput" id="studentPhone" type="tel" value="+63 917 555 0142" />
                  </div>
                  <button class="btn btnPrimary" type="button">Save Changes</button>
                </div>
              </div>

              <div class="settingsCard">
                <div class="cardHeader">
                  <h3>Change Password</h3>
                  <p>Refresh your Societech Student Portal login.</p>
                </div>
                <div class="cardContent">
                  <div class="formGroup">
                    <label class="formLabel" for="currentPassword">Current Password</label>
                    <input class="formInput" id="currentPassword" type="password" placeholder="Enter current password" />
                  </div>
                  <div class="formGroup">
                    <label class="formLabel" for="newPassword">New Password</label>
                    <input class="formInput" id="newPassword" type="password" placeholder="Enter new password" />
                  </div>
                  <div class="formGroup">
                    <label class="formLabel" for="confirmPassword">Confirm Password</label>
                    <input class="formInput" id="confirmPassword" type="password" placeholder="Confirm new password" />
                  </div>
                  <button class="btn btnPrimary" type="button">Update Password</button>
                </div>
              </div>

              <div class="settingsCard">
                <div class="cardHeader">
                  <h3>Notification Preferences</h3>
                  <p>Fee reminders from your class treasurer and Societech moderators.</p>
                </div>
                <div class="cardContent">
                  <div class="formGroup">
                    <label class="formLabel" for="emailNotif">Email Notifications</label>
                    <select class="formSelect" id="emailNotif">
                      <option selected>Enabled</option>
                      <option>Disabled</option>
                    </select>
                  </div>
                  <div class="formGroup">
                    <label class="formLabel" for="smsNotif">SMS Notifications</label>
                    <select class="formSelect" id="smsNotif">
                      <option>Enabled</option>
                      <option selected>Disabled</option>
                    </select>
                  </div>
                  <button class="btn btnPrimary" type="button">Save Preferences</button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  </div>

  <script src="<?= base_url('assets/js/student/student-session.js') ?>"></script>
  <script src="<?= base_url('assets/js/student/student.js') ?>"></script>
  <script src="<?= base_url('assets/js/announcements-loader.js') ?>"></script>
  <script src="<?= base_url('assets/js/student/student-bar.js') ?>"></script>
</body>
</html>




