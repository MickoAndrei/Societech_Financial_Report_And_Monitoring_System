<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Dashboard • Societech Admin</title>
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
            <h1>Dashboard</h1>
            <div class="headerBreadcrumb">Overview of Societech finances and activity</div>
          </div>
          <div class="headerActions">
            <button class="notificationBtn" type="button">
              <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
              </svg>
              <span class="notificationBadge" hidden>0</span>
            </button>

            <!-- Profile wrapper anchors the dropdown to the button -->
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

        <div id="dashboard" class="contentSection active">
          <div class="statsGrid">
            <div class="statCard blue">
              <div class="statHeader">
                <div class="statTitle">Total Collections</div>
                <div class="statIcon" style="background: #dbeafe; color: #2563eb;">
                  <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
              </div>
              <div class="statValue">₱0</div>
              <div class="statTrend" style="color: #6b7280;">No fetched collections</div>
            </div>

            <div class="statCard red">
              <div class="statHeader">
                <div class="statTitle">Total Expenses</div>
                <div class="statIcon" style="background: #fee2e2; color: #dc2626;">
                  <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"></path>
                  </svg>
                </div>
              </div>
              <div class="statValue">₱0</div>
              <div class="statTrend" style="color: #6b7280;">No fetched expenses</div>
            </div>

            <div class="statCard green">
              <div class="statHeader">
                <div class="statTitle">Net Balance</div>
                <div class="statIcon" style="background: #dcfce7; color: #16a34a;">
                  <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
                  </svg>
                </div>
              </div>
              <div class="statValue">₱0</div>
              <div class="statTrend" style="color: #6b7280;">No fetched balance</div>
            </div>

            <div class="statCard orange">
              <div class="statHeader">
                <div class="statTitle">Pending Verifications</div>
                <div class="statIcon" style="background: #fef3c7; color: #d97706;">
                  <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
              </div>
              <div class="statValue">0</div>
              <div class="statTrend" style="color: #6b7280;">No fetched submissions</div>
            </div>

            <div class="statCard purple">
              <div class="statHeader">
                <div class="statTitle">Active Classes</div>
                <div class="statIcon" style="background: #f3e8ff; color: #7c3aed;">
                  <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
                  </svg>
                </div>
              </div>
              <div class="statValue">0</div>
              <div class="statTrend" style="color: #6b7280;">
                <span>No fetched classes</span>
              </div>
            </div>

            <div class="statCard indigo">
              <div class="statHeader">
                <div class="statTitle">Total Students</div>
                <div class="statIcon" style="background: #e0e7ff; color: #4f46e5;">
                  <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                  </svg>
                </div>
              </div>
              <div class="statValue">0</div>
              <div class="statTrend" style="color: #6b7280;">No fetched students</div>
            </div>
          </div>

          <div class="card">
            <div class="cardHeader">
              <div>
                <div class="cardTitle">Recent Activities</div>
                <div class="cardSubtitle">Latest Societech transactions and updates</div>
              </div>
              <button class="btn btnOutline">View All</button>
            </div>
            <div class="tableContainer">
              <table>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Activity</th>
                    <th>Class</th>
                    <th>Amount</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody></tbody>
              </table>
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






