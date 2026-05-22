<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Forgot Password - Socitech FRMS</title>

  <!-- Global base styles shared across the project -->
  <link rel="stylesheet" href="<?= base_url('assets/css/main.css') ?>" />

  <!-- Page-specific styles for the Forgot Password form -->
  <link rel="stylesheet" href="<?= base_url('assets/css/auth.css') ?>" />
  <link rel="stylesheet" href="<?= base_url('assets/css/responsive-breakpoints.css') ?>" />
</head>
<body>

  <!-- ============================================================
       Outer wrapper — centers the card both vertically
       and horizontally within the full viewport height
       ============================================================ -->
  <div class="container">

    <!-- ============================================================
         Card / Login Box — frosted-glass panel that holds
         the logo, system title, and the reset password form
         ============================================================ -->
    <div class="loginBox">

      <!-- Logo: replace src with the correct relative path
           once the image is moved into the project assets folder -->
      <div class="logoContainer">
        <img src="<?= base_url('assets/images/societech_logo.png') ?>" alt="Department of Information Technology" class="logo" />
      </div>

      <!-- System title displayed as a subtitle beneath the logo -->
      <h1>
        <small>Socitech Financial Report and Monitoring</small>
      </h1>

      <!-- ============================================================
           Reset Password Form
           Collects the user's registered email and their
           new password (with confirmation) before submitting
           ============================================================ -->
      <?php if (session()->getFlashdata('success')): ?>
        <div class="alert alertSuccess"><?= esc(session()->getFlashdata('success')) ?></div>
      <?php endif; ?>

      <form method="post" action="<?= site_url('auth/forgot-password') ?>">
        <?= csrf_field() ?>

        <!-- Email field: must match an existing account -->
        <div class="formGroup">
          <label for="email">Email Address</label>
          <input type="email" id="email" name="email" placeholder="Enter your registered email" value="<?= old('email') ?>" required />
        </div>

        <!-- Submit button: triggers the password reset logic -->
        <button type="submit" class="btnLogin">RESET PASSWORD</button>

        <!-- Navigation link back to the login page -->
        <div class="options">
          <a href="<?= site_url('login') ?>">Back to Login</a>
        </div>

      </form>

    </div><!-- /.loginBox -->
  </div><!-- /.container -->

</body>
</html>




