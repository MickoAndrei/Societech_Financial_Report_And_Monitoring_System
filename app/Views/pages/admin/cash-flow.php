<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Cash Flow • Societech Admin</title>
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
          <h1>Cash Flow</h1>
          <div class="headerBreadcrumb">Monitor inflows and outflows</div>
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
<div id="cash-flow" class="contentSection active">
                <div class="statsGrid">
                    <div class="statCard green">
                        <div class="statHeader">
                            <div class="statTitle">Total Cash Inflows</div>
                            <div class="statIcon" style="background: #dcfce7; color: #16a34a;">
                                <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 11l5-5m0 0l5 5m-5-5v12"></path>
                                </svg>
                            </div>
                        </div>
                        <div class="statValue">₱0</div>
                        <div class="statTrend" style="color: #6b7280;">No fetched inflows</div>
                    </div>

                    <div class="statCard red">
                        <div class="statHeader">
                            <div class="statTitle">Total Cash Outflows</div>
                            <div class="statIcon" style="background: #fee2e2; color: #dc2626;">
                                <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 13l-5 5m0 0l-5-5m5 5V6"></path>
                                </svg>
                            </div>
                        </div>
                        <div class="statValue">₱0</div>
                        <div class="statTrend" style="color: #6b7280;">No fetched outflows</div>
                    </div>

                    <div class="statCard blue">
                        <div class="statHeader">
                            <div class="statTitle">Net Cash Flow</div>
                            <div class="statIcon" style="background: #dbeafe; color: #2563eb;">
                                <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                                </svg>
                            </div>
                        </div>
                        <div class="statValue">₱0</div>
                        <div class="statTrend" style="color: #6b7280;">No fetched cash flow</div>
                    </div>
                </div>

                <div class="grid2">
                    <div class="card">
                        <div class="cardHeader">
                            <div class="cardTitle">Cash Inflows Breakdown</div>
                        </div>
                        <table>
                            <thead>
                                <tr>
                                    <th>Source</th>
                                    <th>Amount</th>
                                    <th>Percentage</th>
                                </tr>
                            </thead>
                            <tbody></tbody>
                        </table>
                    </div>

                    <div class="card">
                        <div class="cardHeader">
                            <div class="cardTitle">Organizational Expenses</div>
                        </div>
                        <table>
                            <thead>
                                <tr>
                                    <th>Category</th>
                                    <th>Amount</th>
                                    <th>Percentage</th>
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






