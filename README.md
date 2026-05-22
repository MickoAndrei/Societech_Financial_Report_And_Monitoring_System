# CodeIgniter 4 Application Starter

## What is CodeIgniter?

CodeIgniter is a PHP full-stack web framework that is light, fast, flexible and secure.
More information can be found at the [official site](https://codeigniter.com).

This repository holds a composer-installable app starter.
It has been built from the
[development repository](https://github.com/codeigniter4/CodeIgniter4).

More information about the plans for version 4 can be found in [CodeIgniter 4](https://forum.codeigniter.com/forumdisplay.php?fid=28) on the forums.

You can read the [user guide](https://codeigniter.com/user_guide/)
corresponding to the latest version of the framework.

## Installation & updates

`composer create-project codeigniter4/appstarter` then `composer update` whenever
there is a new release of the framework.

When updating, check the release notes to see if there are any changes you might need to apply
to your `app` folder. The affected files can be copied or merged from
`vendor/codeigniter4/framework/app`.

## Setup

Copy `env` to `.env` and tailor for your app, specifically the baseURL
and any database settings.

## Important Change with index.php

`index.php` is no longer in the root of the project! It has been moved inside the *public* folder,
for better security and separation of components.

This means that you should configure your web server to "point" to your project's *public* folder, and
not to the project root. A better practice would be to configure a virtual host to point there. A poor practice would be to point your web server to the project root and expect to enter *public/...*, as the rest of your logic and the
framework are exposed.

**Please** read the user guide for a better explanation of how CI4 works!

## Repository Management

We use GitHub issues, in our main repository, to track **BUGS** and to track approved **DEVELOPMENT** work packages.
We use our [forum](http://forum.codeigniter.com) to provide SUPPORT and to discuss
FEATURE REQUESTS.

This repository is a "distribution" one, built by our release preparation script.
Problems with it can be raised on our forum, or as issues in the main repository.

## Server Requirements

PHP version 8.2 or higher is required, with the following extensions installed:

- [intl](http://php.net/manual/en/intl.requirements.php)
- [mbstring](http://php.net/manual/en/mbstring.installation.php)

> [!WARNING]
> - The end of life date for PHP 7.4 was November 28, 2022.
> - The end of life date for PHP 8.0 was November 26, 2023.
> - The end of life date for PHP 8.1 was December 31, 2025.
> - If you are still using below PHP 8.2, you should upgrade immediately.
> - The end of life date for PHP 8.2 will be December 31, 2026.

Additionally, make sure that the following extensions are enabled in your PHP:

- json (enabled by default - don't turn it off)
- [mysqlnd](http://php.net/manual/en/mysqlnd.install.php) if you plan to use MySQL
- [libcurl](http://php.net/manual/en/curl.requirements.php) if you plan to use the HTTP\CURLRequest library

# Societech Financial & Monitoring System

## Installation & Setup Guide (CodeIgniter 4 MVC)

---

# 1. System Requirements

Before running the project, make sure the following are installed:

## Required Software

| Software        | Recommended Version      |
| --------------- | ------------------------ |
| PHP             | 8.1 or higher            |
| Composer        | Latest                   |
| MySQL / MariaDB | Latest stable            |
| Apache / XAMPP  | Latest                   |
| Git             | Optional but recommended |

---

# 2. Install Required Software

## Install XAMPP

Download and install:

* Apache
* MySQL
* PHP

Recommended:

* XAMPP with PHP 8.1+

Start:

* Apache
* MySQL

from the XAMPP Control Panel.

---

## Install Composer

Download Composer:

https://getcomposer.org/

Verify installation:

```bash
composer --version
```

---

# 3. Clone or Extract the Project

Place the project folder inside:

```text
htdocs/
```

Example:

```text
C:/xampp/htdocs/societech/
```

---

# 4. Open Terminal in the Project Folder

Example:

```bash
cd C:/xampp/htdocs/societech
```

---

# 5. Install Dependencies

Run:

```bash
composer install
```

This restores the `vendor/` directory and installs all required packages.

---

# 6. Configure Environment File

Copy the environment template:

```bash
copy env .env
```

OR manually duplicate:

```text
env → .env
```

---

# 7. Configure Database Connection

Open:

```text
.env
```

Find and update:

```env
database.default.hostname = localhost
database.default.database = societech_db
database.default.username = root
database.default.password =
database.default.DBDriver = MySQLi
database.default.port = 3306
```

---

# 8. Create the Database

Open:

```text
http://localhost/phpmyadmin
```

Create a new database:

```text
societech_db
```

Recommended Collation:

```text
utf8mb4_general_ci
```

---

# 9. Run Database Migrations

Run:

```bash
php spark migrate
```

This creates all required tables:

* users
* sections
* fees
* payments
* notifications
* announcements
* audit_logs
* settings
* and more

---

# 10. Seed Initial Data

Run:

```bash
php spark db:seed SocietechInitialSeeder
```

This inserts:

* Initial admin accounts
* Default organizations
* Default settings
* Sample data (if configured)

---

# 11. Run the Development Server

Run:

```bash
php spark serve
```

Default URL:

```text
http://localhost:8080
```

---

# 12. Alternative Apache/XAMPP Access

If using Apache directly:

```text
http://localhost/societech/public
```

IMPORTANT:
The CI4 public folder must be the web root.

---

# 13. Login Access

Example roles:

| Role        | Access                  |
| ----------- | ----------------------- |
| Student     | Student dashboard       |
| Treasurer   | Treasurer dashboard     |
| Admin       | Organization management |
| Super Admin | Full system management  |

Default credentials depend on the Seeder configuration.

---

# 14. Project Structure Overview

## Main Directories

| Folder          | Purpose               |
| --------------- | --------------------- |
| app/Controllers | Business logic        |
| app/Models      | Database interaction  |
| app/Views       | Frontend pages        |
| app/Filters     | Authentication & RBAC |
| app/Database    | Migrations & seeders  |
| public/assets   | CSS, JS, images       |
| writable/       | Cache, logs, uploads  |

---

# 15. Asset Locations

## CSS

```text
public/assets/css/
```

## JavaScript

```text
public/assets/js/
```

## Images

```text
public/assets/images/
```

---

# 16. Important CI4 Commands

## Run Server

```bash
php spark serve
```

## Run Migrations

```bash
php spark migrate
```

## Rollback Migration

```bash
php spark migrate:rollback
```

## Run Seeder

```bash
php spark db:seed SocietechInitialSeeder
```

## Clear Cache

```bash
php spark cache:clear
```

---

# 17. Authentication & Security

The system uses:

* Session-based authentication
* Role-based access control (RBAC)
* CSRF protection
* Password hashing
* Protected routes using Filters

---

# 18. API Endpoints

Example API routes:

```text
/api/announcements
/api/payments
/api/fees
/api/sections
/api/users
/api/notifications
```

These endpoints power the frontend JavaScript modules.

---

# 19. Development Workflow

Recommended order:

1. Configure environment
2. Configure database
3. Run migrations
4. Run seeders
5. Start server
6. Test login
7. Test each role dashboard

---

# 20. Common Problems & Fixes

## Composer Not Recognized

Restart terminal after installing Composer.

---

## Port Already in Use

Use another port:

```bash
php spark serve --port=8081
```

---

## Database Connection Error

Check:

* MySQL is running
* Database exists
* Username/password in `.env`

---

## 404 Errors

Make sure you access:

```text
/public
```

when using Apache/XAMPP.

---

# 21. Notes for Developers

## Replace Static Paths

Use CI4 helper functions:

```php
<?= base_url('assets/css/main.css') ?>
<?= base_url('assets/js/main.js') ?>
<?= base_url('assets/images/logo.png') ?>
```

## Internal Links

Use:

```php
<?= site_url('student') ?>
<?= site_url('admin/payments') ?>
```

## Forms

Always include:

```php
<?= csrf_field() ?>
```

---

# 22. Recommended Development Tools

| Tool             | Purpose             |
| ---------------- | ------------------- |
| VS Code / Cursor | Code editor         |
| XAMPP            | Apache + MySQL      |
| Postman          | API testing         |
| Git              | Version control     |
| phpMyAdmin       | Database management |

---

# 23. System Architecture

The project follows:

```text
CodeIgniter 4 MVC Architecture
```

Structure:

```text
Controller → Model → Database
Controller → View → Browser
JavaScript → API → Database
```

---

# 24. Final Checklist

Before running:

```text
[ ] PHP installed
[ ] Composer installed
[ ] MySQL running
[ ] Database created
[ ] .env configured
[ ] composer install completed
[ ] php spark migrate completed
[ ] php spark db:seed completed
[ ] php spark serve running
```

---

# 25. Project Status

Some pages are currently WIP placeholders.

These pages intentionally exist to avoid broken routes while full features are still under development.

---


