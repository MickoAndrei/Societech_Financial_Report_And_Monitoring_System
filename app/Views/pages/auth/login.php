<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login - Societech Financial System</title>
    <link rel="stylesheet" href="<?= base_url('assets/css/main.css') ?>">
    <style>
        .loginContainer {
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 2rem;
            position: relative;
        }

        .loginBackground {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-image: url('<?= base_url('assets/images/d6d628d6-1548-4d35-8176-5656c91409f5.jpg') ?>');
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
            filter: blur(8px);
            z-index: 0;
        }

        .loginContainer::before {
            content: '';
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(135deg, rgba(102, 126, 234, 0.8) 0%, rgba(118, 75, 162, 0.8) 100%);
            z-index: 1;
        }

        .loginCard {
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
            border-radius: var(--radius-xl);
            padding: 3rem;
            width: 100%;
            max-width: 400px;
            box-shadow: var(--shadow-xl);
            position: relative;
            z-index: 2;
        }

        .loginHeader {
            text-align: center;
            margin-bottom: 2rem;
        }

        .loginHeader img {
            height: 60px;
            margin-bottom: 1rem;
        }

        .loginHeader h1 {
            font-size: 1.75rem;
            color: var(--gray-900);
            margin-bottom: 0.5rem;
        }

        .loginHeader p {
            color: var(--gray-600);
        }

        .formGroup {
            margin-bottom: 1.5rem;
        }

        .formOptions {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 1.5rem;
            font-size: var(--font-size-sm);
        }

        .formOptions label {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            cursor: pointer;
        }

        .formOptions a {
            color: var(--primary-color);
            text-decoration: none;
        }

        .formOptions a:hover {
            text-decoration: underline;
        }

        .adminLink,
        .backHomeLink {
            display: block;
            text-align: center;
            font-size: var(--font-size-sm);
        }

        .adminLink {
            margin-bottom: 0.5rem;
            color: var(--primary-color);
            text-decoration: none;
            font-weight: 500;
        }

        .adminLink:hover {
            text-decoration: underline;
        }

        .backHomeLink {
            color: var(--gray-500);
            text-decoration: none;
        }

        .backHomeLink:hover {
            text-decoration: underline;
            color: var(--gray-600);
        }

        .btnLogin {
            width: 100%;
            padding: 0.75rem;
            font-size: var(--font-size-base);
            margin-bottom: 1rem;
        }

        .divider {
            text-align: center;
            margin: 1.5rem 0;
            position: relative;
            color: var(--gray-500);
        }

        .divider::before {
            content: '';
            position: absolute;
            left: 0;
            top: 50%;
            width: 100%;
            height: 1px;
            background: var(--gray-200);
        }

        .divider span {
            background: white;
            padding: 0 1rem;
            position: relative;
        }

        .registerLink {
            text-align: center;
            margin-top: 1.5rem;
            color: var(--gray-600);
        }

        .registerLink a {
            color: var(--primary-color);
            text-decoration: none;
            font-weight: 500;
        }

        .registerLink a:hover {
            text-decoration: underline;
        }
    </style>
  <link rel="stylesheet" href="<?= base_url('assets/css/responsive-breakpoints.css') ?>" />
</head>
<body>
    <div class="loginBackground"></div>
    <div class="loginContainer">
        <div class="loginCard">
            <div class="loginHeader">
                <img src="<?= base_url('assets/images/societech_logo.png') ?>" alt="Societech Logo">
                <h1>Welcome</h1>
                <p>Sign in to your account</p>
            </div>

            <?php if (session()->getFlashdata('error')): ?>
                <div class="alert alertError"><?= esc(session()->getFlashdata('error')) ?></div>
            <?php endif; ?>
            <?php if (session()->getFlashdata('success')): ?>
                <div class="alert alertSuccess"><?= esc(session()->getFlashdata('success')) ?></div>
            <?php endif; ?>

            <form id="loginForm" method="post" action="<?= site_url('login') ?>">
                <?= csrf_field() ?>
                <div class="formGroup">
                    <label class="formLabel" for="email">Email Address</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        class="formInput"
                        placeholder="Enter your email"
                        value="<?= old('email') ?>"
                        required
                    >
                </div>

                <div class="formGroup">
                    <label class="formLabel" for="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        class="formInput"
                        placeholder="Enter your password"
                        required
                    >
                </div>

                <div class="formOptions">
                    <label>
                        <input type="checkbox" id="remember" name="remember" value="1">
                        Remember me
                    </label>
                    <a href="<?= site_url('auth/forgot-password') ?>">Forgot password?</a>
                </div>

                <button type="submit" class="btn btnPrimary btnLogin">Sign In</button>
                <a href="<?= site_url('admin-login') ?>" class="adminLink">Admin Here</a>
                <a href="<?= site_url('/') ?>" class="backHomeLink">Back to Homepage</a>
            </form>

        </div>
    </div>

</body>
</html>



