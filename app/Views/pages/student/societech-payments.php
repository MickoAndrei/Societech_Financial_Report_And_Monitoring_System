<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Manage Payments</title>
  <link rel="stylesheet" href="<?= base_url('assets/css/main.css') ?>" />
  <link rel="stylesheet" href="<?= base_url('assets/css/student.css') ?>" />
  <link rel="stylesheet" href="<?= base_url('assets/css/responsive-breakpoints.css') ?>" />
</head>
<body class="studentLayout" data-page="societech-payments">
  <div class="pageBackground" aria-hidden="true"></div>
  <div class="studentShell">
    <aside id="sidebar-container" class="sidebar"></aside>
    <div class="studentContent">
      <header class="studentTopbar">
        <div class="headerTitle">
          <h1>Manage Payments</h1>
          <div class="headerBreadcrumb">Add and edit Societech assessments (e.g. IT Panagmaya)</div>
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
          <div class="stPageToolbar">
            <p class="sectionSubtitle stPaymentsLede">
              Add fees that apply to all members. Each assessment needs a name, amount (PHP), and deadline.
            </p>
            <button type="button" class="btn btnPrimary" id="addPaymentBtn">Add Payment</button>
          </div>
          <table class="studentTable" id="paymentsTable">
            <thead>
              <tr>
                <th>Payment name</th>
                <th>Amount</th>
                <th>Deadline</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody></tbody>
          </table>
        </div>
      </main>
    </div>
  </div>

  <script src="<?= base_url('assets/js/class-rosters.js') ?>"></script>
  <script src="<?= base_url('assets/js/societech-payments.js') ?>"></script>
  <script src="<?= base_url('assets/js/student/student-session.js') ?>"></script>
  <script src="<?= base_url('assets/js/student/student.js') ?>"></script>
  <script src="<?= base_url('assets/js/student/student-bar.js') ?>"></script>

  <div class="studentModalOverlay stFormModal" id="paymentFormModal">
    <div class="studentModal">
      <div class="studentModalHeader">
        <h2 id="paymentModalTitle">Add Payment</h2>
      </div>
      <form id="paymentForm">
        <div class="cardContent">
          <div class="formGroup">
            <label for="paymentName">Payment name</label>
            <input class="formInput" id="paymentName" required placeholder="e.g. IT Days / Panagmaya" />
          </div>
          <div class="formGroup">
            <label for="paymentAmount">Amount (PHP)</label>
            <input class="formInput" id="paymentAmount" type="number" min="0" step="0.01" required />
          </div>
          <div class="formGroup">
            <label for="paymentDeadline">Deadline</label>
            <input class="formInput" id="paymentDeadline" type="date" required />
          </div>
          <div class="formGroup">
            <label for="paymentDescription">Description</label>
            <textarea class="formInput" id="paymentDescription" rows="3" placeholder="Optional notes"></textarea>
          </div>
        </div>
        <div class="studentModalFooter">
          <button type="button" class="btn btnSecondary" data-close-payment-modal>Cancel</button>
          <button type="submit" class="btn btnPrimary">Save</button>
        </div>
      </form>
    </div>
  </div>
  <script src="<?= base_url('assets/js/student/societech-payments-page.js') ?>"></script>
</body>
</html>




