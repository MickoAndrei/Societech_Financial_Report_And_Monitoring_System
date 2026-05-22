<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>System Settings • Societech Admin</title>
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
          <h1>System Settings</h1>
          <div class="headerBreadcrumb">Update organization settings</div>
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
    <button type="button" onclick="window.location.href='<?= site_url('admin/settings') ?>'">
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
<div id="settings" class="contentSection active">
                <div class="grid2">
                    <div class="card">
                        <div class="cardHeader">
                            <div class="cardTitle">Organization Information</div>
                        </div>
                        <div class="formGroup">
                            <label class="formLabel">Organization Name</label>
                            <input type="text" class="formInput" value="SOCIATECH" placeholder="Enter organization name">
                        </div>
                        <div class="formGroup">
                            <label class="formLabel">Organization Description</label>
                            <textarea class="formTextarea" placeholder="Enter description">Technology and Innovation Student Organization</textarea>
                        </div>
                        <div class="formGroup">
                            <label class="formLabel">Contact Email</label>
                            <input type="email" class="formInput" value="admin@sociatech.org" placeholder="Enter email">
                        </div>
                        <button class="btn btnPrimary">Save Organization Info</button>
                    </div>

                    <div class="card">
                        <div class="cardHeader">
                            <div class="cardTitle">Academic Year Setup</div>
                        </div>
                        <div class="formGroup">
                            <label class="formLabel">Current Academic Year</label>
                            <select class="formInput">
                                <option>Academic Year 2025-2026</option>
                                <option>Academic Year 2024-2025</option>
                            </select>
                        </div>
                        <div class="formGroup">
                            <label class="formLabel">First Semester Start</label>
                            <input type="date" class="formInput" value="2025-08-01">
                        </div>
                        <div class="formGroup">
                            <label class="formLabel">Second Semester Start</label>
                            <input type="date" class="formInput" value="2026-01-01">
                        </div>
                        <button class="btn btnPrimary">Update Academic Year</button>
                    </div>
                </div>

                <div class="card">
                    <div class="cardHeader">
                        <div class="cardTitle">Notification Settings</div>
                    </div>
                    <div style="display: flex; flex-direction: column; gap: 16px;">
                        <div style="display: flex; justify-content: space-between; align-items: center; padding: 16px; background: #f9fafb; border-radius: 8px;">
                            <div>
                                <div style="font-weight: 600; margin-bottom: 4px;">Email Notifications</div>
                                <div style="font-size: 14px; color: #6b7280;">Receive email alerts for important activities</div>
                            </div>
                            <input type="checkbox" checked style="width: 20px; height: 20px; cursor: pointer;">
                        </div>
                        <div style="display: flex; justify-content: space-between; align-items: center; padding: 16px; background: #f9fafb; border-radius: 8px;">
                            <div>
                                <div style="font-weight: 600; margin-bottom: 4px;">Payment Submission Alerts</div>
                                <div style="font-size: 14px; color: #6b7280;">Get notified when treasurers submit payments</div>
                            </div>
                            <input type="checkbox" checked style="width: 20px; height: 20px; cursor: pointer;">
                        </div>
                        <div style="display: flex; justify-content: space-between; align-items: center; padding: 16px; background: #f9fafb; border-radius: 8px;">
                            <div>
                                <div style="font-weight: 600; margin-bottom: 4px;">Weekly Reports</div>
                                <div style="font-size: 14px; color: #6b7280;">Receive weekly financial summary reports</div>
                            </div>
                            <input type="checkbox" checked style="width: 20px; height: 20px; cursor: pointer;">
                        </div>
                        <div style="display: flex; justify-content: space-between; align-items: center; padding: 16px; background: #f9fafb; border-radius: 8px;">
                            <div>
                                <div style="font-weight: 600; margin-bottom: 4px;">Deadline Reminders</div>
                                <div style="font-size: 14px; color: #6b7280;">Remind about upcoming payment deadlines</div>
                            </div>
                            <input type="checkbox" checked style="width: 20px; height: 20px; cursor: pointer;">
                        </div>
                    </div>
                    <button class="btn btnPrimary" style="margin-top: 20px;">Save Notification Settings</button>
                </div>

                <div class="card">
                    <div class="cardHeader">
                        <div class="cardTitle">Security Settings</div>
                    </div>
                    <div class="formGroup">
                        <label class="formLabel">Session Timeout (minutes)</label>
                        <input type="number" class="formInput" value="30" placeholder="Enter timeout duration">
                    </div>
                    <div class="formGroup">
                        <label class="formLabel">Password Reset</label>
                        <button class="btn btnOutline">Change Password</button>
                    </div>
                    <div class="formGroup">
                        <label class="formLabel">Two-Factor Authentication</label>
                        <button class="btn btnOutline">Enable 2FA</button>
                    </div>
                </div>
            </div>
    </main>
  </div>
  <script src="<?= base_url('assets/js/admin/sidebar.js') ?>"></script>
  <script src="<?= base_url('assets/js/announcements-loader.js') ?>"></script>
  <script src="<?= base_url('assets/js/admin/shared.js') ?>"></script>
  </div>
</body>
</html>






