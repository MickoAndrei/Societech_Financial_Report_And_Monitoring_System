# Societech Financial & Monitoring — CI4 MVC Migration Guide

> **What this document is:** A complete map of every legacy file to its CI4 MVC destination, plus ready-to-use Routes, Models, and Controllers you can paste directly into your project.

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Legacy File Inventory](#2-legacy-file-inventory)
3. [CI4 Folder Structure (Target)](#3-ci4-folder-structure-target)
4. [File Migration Map](#4-file-migration-map)
   - [HTML → Views](#41-html--views)
   - [CSS → public/assets/css](#42-css--publicassetscss)
   - [JavaScript → public/assets/js (or role folders)](#43-javascript--publicassetsjs)
   - [Images → public/assets/images](#44-images--publicassetsimages)
5. [Routes (`app/Config/Routes.php`)](#5-routes)
6. [Models (`app/Models/`)](#6-models)
7. [Controllers (`app/Controllers/`)](#7-controllers)
8. [Filters (`app/Filters/`)](#8-filters)
9. [Database — Tables & What Drives Them](#9-database)
10. [JavaScript Replacement Strategy](#10-javascript-replacement-strategy)
11. [Step-by-Step Migration Checklist](#11-step-by-step-migration-checklist)

---

## 1. Project Overview

Societech is a **student-organization financial management system** with four user roles:

| Role | Access | Legacy Folder |
|---|---|---|
| `student` | Own fees, payments, announcements | `student/` |
| `treasurer` (class-level) | Section roster, payment collection | `student/` (treasurer views) |
| `admin` (org-level) | All classes, fees, payments, reports | `admin/` |
| `super_admin` | Organizations, system settings, monitoring | `super-admin/` |

---

## 2. Legacy File Inventory

### HTML Pages (become CI4 Views)

| Legacy Path | Role | Status |
|---|---|---|
| `public/index.html` | Public landing page | ✅ Full page |
| `public/about.html` | Public info | 🚧 WIP placeholder |
| `public/contact.html` | Public info | 🚧 WIP placeholder |
| `public/help.html` | Public info | 🚧 WIP placeholder |
| `auth/login.html` | Student login | ✅ Full page |
| `auth/admin-login.html` | Admin/super-admin login | ✅ Full page |
| `auth/register.html` | Registration | 🚧 WIP placeholder |
| `auth/forgot-password.html` | Password reset | 🚧 WIP placeholder |
| `auth/reset-password.html` | Password reset | 🚧 WIP placeholder |
| `auth/verify-email.html` | Email verification | 🚧 WIP placeholder |
| `student/index.html` | Student dashboard | ✅ Full page |
| `student/financial-records.html` | Student fee records | ✅ Full page |
| `student/contributions.html` | Contribution history | ✅ Full page |
| `student/class-roster.html` | Class treasurer roster | ✅ Full page |
| `student/notifications.html` | Notifications | ✅ Full page |
| `student/profile.html` | Student profile | ✅ Full page |
| `student/settings.html` | Account settings | ✅ Full page |
| `student/societech-dashboard.html` | Societech treasurer dashboard | ✅ Full page |
| `student/societech-all-classes.html` | All sections overview | ✅ Full page |
| `student/societech-section-roster.html` | Per-section roster | ✅ Full page |
| `student/societech-payments.html` | Manage fee assessments | ✅ Full page |
| `admin/dashboard.html` | Admin overview | ✅ Full page |
| `admin/all-classes.html` | All sections table | ✅ Full page |
| `admin/payments.html` | Payment records | ✅ Full page |
| `admin/verify.html` | Verify batch payments | ✅ Full page |
| `admin/cash-flow.html` | Cash flow ledger | ✅ Full page |
| `admin/reports.html` | Report hub | ✅ Full page |
| `admin/fees.html` | Fee configuration | ✅ Full page |
| `admin/section.html` | Section detail/roster | ✅ Full page |
| `admin/announcements.html` | Manage announcements | ✅ Full page |
| `admin/audit-logs.html` | Audit trail | ✅ Full page |
| `admin/users.html` | User management | ✅ Full page |
| `admin/settings.html` | Org settings | ✅ Full page |
| `super-admin/index.html` | Super-admin dashboard | 🚧 WIP placeholder |
| `super-admin/organizations.html` | Manage orgs | 🚧 WIP placeholder |
| `super-admin/admins.html` | Manage admins | 🚧 WIP placeholder |
| `super-admin/monitoring.html` | System monitoring | 🚧 WIP placeholder |
| `super-admin/global-settings.html` | Global settings | 🚧 WIP placeholder |
| `super-admin/backup.html` | DB backup | 🚧 WIP placeholder |
| `treasurer/index.html` | Class treasurer dashboard | 🚧 WIP placeholder |
| `treasurer/payments.html` | Record payments | 🚧 WIP placeholder |
| `treasurer/verification.html` | Submit verification batch | 🚧 WIP placeholder |
| `treasurer/cash-flow.html` | Section cash flow | 🚧 WIP placeholder |
| `treasurer/reports.html` | Section reports | 🚧 WIP placeholder |
| `reports/financial-summary.html` | Org-wide financial summary | 🚧 WIP placeholder |
| `reports/collections.html` | Collections report | 🚧 WIP placeholder |
| `reports/contributions.html` | Contributions report | 🚧 WIP placeholder |
| `reports/cash-flow.html` | Cash flow report | 🚧 WIP placeholder |
| `reports/outstanding.html` | Outstanding balances | 🚧 WIP placeholder |

### CSS Files

| Legacy Path | Purpose |
|---|---|
| `assets/css/main.css` | Global base styles, design tokens |
| `assets/css/background.css` | Page background styles |
| `assets/css/components.css` | Reusable UI components |
| `assets/css/dashboard.css` | Dashboard-specific styles |
| `assets/css/responsive-breakpoints.css` | Media queries |
| `assets/css/utilities.css` | Utility classes |
| `assets/css/announcement-notifications.css` | Announcement bell dropdown |
| `assets/css/wip.css` | WIP placeholder page styles |
| `admin/admin-shared-styles.css` | Admin layout styles |
| `auth/auth-style.css` | Auth page styles |
| `student/student.css` | Student portal styles |

### JavaScript Files

| Legacy Path | Purpose | Data Source |
|---|---|---|
| `assets/js/main.js` | Global entrypoint (WIP stub) | — |
| `assets/js/auth.js` | Auth helpers (WIP stub) | — |
| `assets/js/charts.js` | Chart config helpers (WIP stub) | — |
| `assets/js/dashboard.js` | Dashboard helpers (WIP stub) | — |
| `assets/js/class-rosters.js` | Section roster data module | `localStorage` → **API** |
| `assets/js/societech-announcements.js` | Announcements CRUD module | `localStorage` → **API** |
| `assets/js/societech-payments.js` | Fee assessment CRUD module | `localStorage` → **API** |
| `assets/js/announcement-bell.js` | Notification bell UI | Driven by announcements module |
| `assets/js/announcements-loader.js` | Lazy-loads announcement JS+CSS | — |
| `assets/js/announcements-public-feed.js` | Public landing page feed | `localStorage` → **API** |
| `admin/sidebar.js` | Admin sidebar HTML + active state | — |
| `admin/shared.js` | Logout, profile menu, click-outside | Session |
| `admin/announcements-page.js` | Admin announcement CRUD UI | `SocietechAnnouncements` |
| `admin/section-roster.js` | Admin section detail table | `ClassRosters` |
| `admin/table-filters.js` | Table search/filter helpers | — |
| `student/student-session.js` | Session read/write module | `localStorage` → **CI4 session** |
| `student/student.js` | Student page init + topbar | Session |
| `student/student-bar.js` | Student sidebar nav HTML | Session |
| `student/notifications-feed.js` | Notifications list render | `localStorage` → **API** |
| `student/settings.js` | Settings form + avatar upload | `localStorage` → **API** |
| `student/societech-treasurer.js` | Societech treasurer dashboard | `ClassRosters`, `SocietechPayments` |
| `student/societech-all-classes.js` | All-classes table render | `ClassRosters` → **API** |
| `student/societech-section-roster.js` | Per-section roster render | `ClassRosters` → **API** |
| `student/societech-payments-page.js` | Fee assessment CRUD UI | `SocietechPayments` → **API** |
| `student/treasurer-roster.js` | Class treasurer roster table | `ClassRosters` → **API** |
| `student/treasurer-fee-dataset.js` | Fee data for treasurer views | `SocietechPayments` → **API** |

---

## 3. CI4 Folder Structure (Target)

```
your-project/
├── app/
│   ├── Config/
│   │   ├── Routes.php          ← define all URL routes
│   │   └── Filters.php         ← register AuthFilter, GuestFilter
│   ├── Controllers/
│   │   ├── BaseController.php
│   │   ├── AuthController.php          ← login, logout, register
│   │   ├── PublicController.php        ← landing, about, contact, help
│   │   ├── StudentController.php       ← student + class treasurer pages
│   │   ├── TreasurerController.php     ← class treasurer dedicated pages
│   │   ├── AdminController.php         ← admin section pages
│   │   ├── SuperAdminController.php    ← super-admin pages
│   │   ├── ReportController.php        ← all report pages
│   │   └── Api/
│   │       ├── AuthApiController.php       ← POST login/logout (JSON)
│   │       ├── AnnouncementController.php  ← GET/POST/PUT/DELETE
│   │       ├── FeeController.php           ← fee CRUD
│   │       ├── PaymentController.php       ← payment CRUD
│   │       ├── SectionController.php       ← roster data
│   │       ├── UserController.php          ← user management
│   │       ├── CashFlowController.php      ← cash flow entries
│   │       └── NotificationController.php  ← notifications
│   ├── Filters/
│   │   ├── AuthFilter.php       ← redirect unauthenticated users
│   │   ├── GuestFilter.php      ← redirect already-logged-in users
│   │   └── RoleFilter.php       ← check role (admin, treasurer, etc.)
│   ├── Models/
│   │   ├── BaseSocietechModel.php
│   │   ├── UserModel.php
│   │   ├── OrganizationModel.php
│   │   ├── AcademicYearModel.php
│   │   ├── SectionModel.php
│   │   ├── SectionMemberModel.php
│   │   ├── FeeCategoryModel.php
│   │   ├── FeeModel.php
│   │   ├── StudentFeeBalanceModel.php
│   │   ├── PaymentModel.php
│   │   ├── VerificationBatchModel.php
│   │   ├── CashFlowEntryModel.php
│   │   ├── AnnouncementModel.php
│   │   ├── NotificationModel.php
│   │   ├── AuditLogModel.php
│   │   └── SettingModel.php
│   ├── Views/
│   │   ├── layouts/
│   │   │   ├── main.php            ← base HTML shell for all pages
│   │   │   ├── admin.php           ← admin layout (sidebar + header)
│   │   │   └── student.php         ← student layout (sidebar + header)
│   │   ├── partials/
│   │   │   ├── admin_sidebar.php   ← replaces admin/sidebar.js
│   │   │   ├── student_sidebar.php ← replaces student/student-bar.js
│   │   │   ├── flash_messages.php  ← reusable alert banners
│   │   │   └── profile_menu.php    ← dropdown profile menu
│   │   ├── public/
│   │   │   ├── index.php
│   │   │   ├── about.php
│   │   │   ├── contact.php
│   │   │   └── help.php
│   │   ├── auth/
│   │   │   ├── login.php
│   │   │   ├── admin_login.php
│   │   │   ├── register.php
│   │   │   ├── forgot_password.php
│   │   │   ├── reset_password.php
│   │   │   └── verify_email.php
│   │   ├── student/
│   │   │   ├── dashboard.php
│   │   │   ├── financial_records.php
│   │   │   ├── contributions.php
│   │   │   ├── class_roster.php
│   │   │   ├── notifications.php
│   │   │   ├── profile.php
│   │   │   ├── settings.php
│   │   │   ├── societech_dashboard.php
│   │   │   ├── societech_all_classes.php
│   │   │   ├── societech_section_roster.php
│   │   │   └── societech_payments.php
│   │   ├── treasurer/
│   │   │   ├── dashboard.php
│   │   │   ├── payments.php
│   │   │   ├── verification.php
│   │   │   ├── cash_flow.php
│   │   │   └── reports.php
│   │   ├── admin/
│   │   │   ├── dashboard.php
│   │   │   ├── all_classes.php
│   │   │   ├── payments.php
│   │   │   ├── verify.php
│   │   │   ├── cash_flow.php
│   │   │   ├── reports.php
│   │   │   ├── fees.php
│   │   │   ├── section.php
│   │   │   ├── announcements.php
│   │   │   ├── audit_logs.php
│   │   │   ├── users.php
│   │   │   └── settings.php
│   │   ├── super_admin/
│   │   │   ├── dashboard.php
│   │   │   ├── organizations.php
│   │   │   ├── admins.php
│   │   │   ├── monitoring.php
│   │   │   ├── global_settings.php
│   │   │   └── backup.php
│   │   └── reports/
│   │       ├── financial_summary.php
│   │       ├── collections.php
│   │       ├── contributions.php
│   │       ├── cash_flow.php
│   │       └── outstanding.php
│   └── Database/
│       ├── Migrations/
│       │   └── 2026-05-22-000001_CreateSocietechCoreSchema.php  ← already done
│       └── Seeds/
│           └── SocietechInitialSeeder.php  ← already done
└── public/
    ├── index.php               ← CI4 front controller (do not touch)
    └── assets/
        ├── css/
        │   ├── main.css
        │   ├── background.css
        │   ├── components.css
        │   ├── dashboard.css
        │   ├── responsive-breakpoints.css
        │   ├── utilities.css
        │   ├── announcement-notifications.css
        │   ├── wip.css
        │   ├── admin.css             ← renamed from admin-shared-styles.css
        │   ├── auth.css              ← renamed from auth/auth-style.css
        │   └── student.css           ← from student/student.css
        ├── js/
        │   ├── main.js
        │   ├── auth.js
        │   ├── charts.js
        │   ├── class-rosters.js
        │   ├── societech-announcements.js
        │   ├── societech-payments.js
        │   ├── announcement-bell.js
        │   ├── announcements-loader.js
        │   ├── announcements-public-feed.js
        │   ├── admin/
        │   │   ├── sidebar.js
        │   │   ├── shared.js
        │   │   ├── announcements-page.js
        │   │   ├── section-roster.js
        │   │   └── table-filters.js
        │   └── student/
        │       ├── student-session.js
        │       ├── student.js
        │       ├── student-bar.js
        │       ├── notifications-feed.js
        │       ├── settings.js
        │       ├── societech-treasurer.js
        │       ├── societech-all-classes.js
        │       ├── societech-section-roster.js
        │       ├── societech-payments-page.js
        │       ├── treasurer-roster.js
        │       └── treasurer-fee-dataset.js
        └── images/
            ├── societech_logo.png
            └── d6d628d6-1548-4d35-8176-5656c91409f5.jpg
```

---

## 4. File Migration Map

### 4.1 HTML → Views

| Legacy HTML file | → CI4 View path | Notes |
|---|---|---|
| `public/index.html` | `app/Views/public/index.php` | Convert `href="..."` to `site_url()` |
| `public/about.html` | `app/Views/public/about.php` | |
| `public/contact.html` | `app/Views/public/contact.php` | |
| `public/help.html` | `app/Views/public/help.php` | |
| `auth/login.html` | `app/Views/auth/login.php` | Add `form_open('auth/login')` + `csrf_field()` |
| `auth/admin-login.html` | `app/Views/auth/admin_login.php` | Add `form_open('auth/admin-login')` + `csrf_field()` |
| `auth/register.html` | `app/Views/auth/register.php` | |
| `auth/forgot-password.html` | `app/Views/auth/forgot_password.php` | |
| `auth/reset-password.html` | `app/Views/auth/reset_password.php` | |
| `auth/verify-email.html` | `app/Views/auth/verify_email.php` | |
| `student/index.html` | `app/Views/student/dashboard.php` | |
| `student/financial-records.html` | `app/Views/student/financial_records.php` | |
| `student/contributions.html` | `app/Views/student/contributions.php` | |
| `student/class-roster.html` | `app/Views/student/class_roster.php` | |
| `student/notifications.html` | `app/Views/student/notifications.php` | |
| `student/profile.html` | `app/Views/student/profile.php` | |
| `student/settings.html` | `app/Views/student/settings.php` | |
| `student/societech-dashboard.html` | `app/Views/student/societech_dashboard.php` | |
| `student/societech-all-classes.html` | `app/Views/student/societech_all_classes.php` | |
| `student/societech-section-roster.html` | `app/Views/student/societech_section_roster.php` | |
| `student/societech-payments.html` | `app/Views/student/societech_payments.php` | |
| `admin/dashboard.html` | `app/Views/admin/dashboard.php` | |
| `admin/all-classes.html` | `app/Views/admin/all_classes.php` | |
| `admin/payments.html` | `app/Views/admin/payments.php` | |
| `admin/verify.html` | `app/Views/admin/verify.php` | |
| `admin/cash-flow.html` | `app/Views/admin/cash_flow.php` | |
| `admin/reports.html` | `app/Views/admin/reports.php` | |
| `admin/fees.html` | `app/Views/admin/fees.php` | |
| `admin/section.html` | `app/Views/admin/section.php` | |
| `admin/announcements.html` | `app/Views/admin/announcements.php` | |
| `admin/audit-logs.html` | `app/Views/admin/audit_logs.php` | |
| `admin/users.html` | `app/Views/admin/users.php` | |
| `admin/settings.html` | `app/Views/admin/settings.php` | |
| `super-admin/index.html` | `app/Views/super_admin/dashboard.php` | |
| `super-admin/organizations.html` | `app/Views/super_admin/organizations.php` | |
| `super-admin/admins.html` | `app/Views/super_admin/admins.php` | |
| `super-admin/monitoring.html` | `app/Views/super_admin/monitoring.php` | |
| `super-admin/global-settings.html` | `app/Views/super_admin/global_settings.php` | |
| `super-admin/backup.html` | `app/Views/super_admin/backup.php` | |
| `treasurer/index.html` | `app/Views/treasurer/dashboard.php` | |
| `treasurer/payments.html` | `app/Views/treasurer/payments.php` | |
| `treasurer/verification.html` | `app/Views/treasurer/verification.php` | |
| `treasurer/cash-flow.html` | `app/Views/treasurer/cash_flow.php` | |
| `treasurer/reports.html` | `app/Views/treasurer/reports.php` | |
| `reports/financial-summary.html` | `app/Views/reports/financial_summary.php` | |
| `reports/collections.html` | `app/Views/reports/collections.php` | |
| `reports/contributions.html` | `app/Views/reports/contributions.php` | |
| `reports/cash-flow.html` | `app/Views/reports/cash_flow.php` | |
| `reports/outstanding.html` | `app/Views/reports/outstanding.php` | |

### 4.2 CSS → `public/assets/css/`

| Legacy path | → CI4 public path | Rename? |
|---|---|---|
| `assets/css/main.css` | `public/assets/css/main.css` | No |
| `assets/css/background.css` | `public/assets/css/background.css` | No |
| `assets/css/components.css` | `public/assets/css/components.css` | No |
| `assets/css/dashboard.css` | `public/assets/css/dashboard.css` | No |
| `assets/css/responsive-breakpoints.css` | `public/assets/css/responsive-breakpoints.css` | No |
| `assets/css/utilities.css` | `public/assets/css/utilities.css` | No |
| `assets/css/announcement-notifications.css` | `public/assets/css/announcement-notifications.css` | No |
| `assets/css/wip.css` | `public/assets/css/wip.css` | No |
| `admin/admin-shared-styles.css` | `public/assets/css/admin.css` | ✅ Rename |
| `auth/auth-style.css` | `public/assets/css/auth.css` | ✅ Rename |
| `student/student.css` | `public/assets/css/student.css` | ✅ Rename |

**In views**, replace all `href="../assets/css/main.css"` with:
```php
<link rel="stylesheet" href="<?= base_url('assets/css/main.css') ?>">
```

### 4.3 JavaScript → `public/assets/js/`

| Legacy path | → CI4 public path |
|---|---|
| `assets/js/main.js` | `public/assets/js/main.js` |
| `assets/js/auth.js` | `public/assets/js/auth.js` |
| `assets/js/charts.js` | `public/assets/js/charts.js` |
| `assets/js/class-rosters.js` | `public/assets/js/class-rosters.js` |
| `assets/js/societech-announcements.js` | `public/assets/js/societech-announcements.js` |
| `assets/js/societech-payments.js` | `public/assets/js/societech-payments.js` |
| `assets/js/announcement-bell.js` | `public/assets/js/announcement-bell.js` |
| `assets/js/announcements-loader.js` | `public/assets/js/announcements-loader.js` |
| `assets/js/announcements-public-feed.js` | `public/assets/js/announcements-public-feed.js` |
| `admin/sidebar.js` | `public/assets/js/admin/sidebar.js` |
| `admin/shared.js` | `public/assets/js/admin/shared.js` |
| `admin/announcements-page.js` | `public/assets/js/admin/announcements-page.js` |
| `admin/section-roster.js` | `public/assets/js/admin/section-roster.js` |
| `admin/table-filters.js` | `public/assets/js/admin/table-filters.js` |
| `student/student-session.js` | `public/assets/js/student/student-session.js` |
| `student/student.js` | `public/assets/js/student/student.js` |
| `student/student-bar.js` | `public/assets/js/student/student-bar.js` |
| `student/notifications-feed.js` | `public/assets/js/student/notifications-feed.js` |
| `student/settings.js` | `public/assets/js/student/settings.js` |
| `student/societech-treasurer.js` | `public/assets/js/student/societech-treasurer.js` |
| `student/societech-all-classes.js` | `public/assets/js/student/societech-all-classes.js` |
| `student/societech-section-roster.js` | `public/assets/js/student/societech-section-roster.js` |
| `student/societech-payments-page.js` | `public/assets/js/student/societech-payments-page.js` |
| `student/treasurer-roster.js` | `public/assets/js/student/treasurer-roster.js` |
| `student/treasurer-fee-dataset.js` | `public/assets/js/student/treasurer-fee-dataset.js` |

**In views**, replace `src="sidebar.js"` with:
```php
<script src="<?= base_url('assets/js/admin/sidebar.js') ?>"></script>
```

### 4.4 Images → `public/assets/images/`

| Legacy path | → CI4 public path |
|---|---|
| `assets/images/societech_logo.png` | `public/assets/images/societech_logo.png` |
| `assets/images/d6d628d6-1548-4d35-8176-5656c91409f5.jpg` | `public/assets/images/background.jpg` ← Rename for clarity |

---

## 5. Routes

Paste this entire file as `app/Config/Routes.php`:

```php
<?php

use CodeIgniter\Router\RouteCollection;

/** @var RouteCollection $routes */

// ── Public ────────────────────────────────────────────────────────────────────
$routes->get('/',               'PublicController::index');
$routes->get('about',           'PublicController::about');
$routes->get('contact',         'PublicController::contact');
$routes->get('help',            'PublicController::help');

// ── Auth (pages) ─────────────────────────────────────────────────────────────
$routes->get( 'login',                'AuthController::loginPage',      ['filter' => 'guest']);
$routes->post('auth/login',           'AuthController::loginPost',      ['filter' => 'guest']);
$routes->get( 'auth/admin-login',     'AuthController::adminLoginPage', ['filter' => 'guest']);
$routes->post('auth/admin-login',     'AuthController::adminLoginPost', ['filter' => 'guest']);
$routes->get( 'register',             'AuthController::registerPage',   ['filter' => 'guest']);
$routes->post('auth/register',        'AuthController::registerPost',   ['filter' => 'guest']);
$routes->get( 'auth/forgot-password', 'AuthController::forgotPage');
$routes->post('auth/forgot-password', 'AuthController::forgotPost');
$routes->get( 'auth/reset-password',  'AuthController::resetPage');
$routes->post('auth/reset-password',  'AuthController::resetPost');
$routes->get( 'auth/verify-email',    'AuthController::verifyEmailPage');
$routes->get( 'auth/logout',          'AuthController::logout');
$routes->get( 'logout',               'AuthController::logout');

// ── Auth (JSON endpoint for JS) ───────────────────────────────────────────────
$routes->get('auth/me', 'Api\AuthApiController::me', ['filter' => 'auth']);

// ── Student ───────────────────────────────────────────────────────────────────
$routes->group('student', ['filter' => 'auth:student,treasurer'], function ($routes) {
    $routes->get('/',                    'StudentController::dashboard');
    $routes->get('financial-records',    'StudentController::financialRecords');
    $routes->get('contributions',        'StudentController::contributions');
    $routes->get('class-roster',         'StudentController::classRoster');
    $routes->get('notifications',        'StudentController::notifications');
    $routes->get('profile',              'StudentController::profile');
    $routes->get('settings',             'StudentController::settings');
    $routes->post('settings',            'StudentController::settingsPost');
    // Societech treasurer sub-section
    $routes->get('societech-dashboard',        'StudentController::societechDashboard');
    $routes->get('societech-all-classes',      'StudentController::societechAllClasses');
    $routes->get('societech-section-roster',   'StudentController::societechSectionRoster');
    $routes->get('societech-payments',         'StudentController::societechPayments');
});

// ── Treasurer ─────────────────────────────────────────────────────────────────
$routes->group('treasurer', ['filter' => 'auth:treasurer,admin,super_admin'], function ($routes) {
    $routes->get('/',             'TreasurerController::dashboard');
    $routes->get('payments',      'TreasurerController::payments');
    $routes->post('payments',     'TreasurerController::paymentsPost');
    $routes->get('verification',  'TreasurerController::verification');
    $routes->post('verification', 'TreasurerController::verificationPost');
    $routes->get('cash-flow',     'TreasurerController::cashFlow');
    $routes->get('reports',       'TreasurerController::reports');
});

// ── Admin ─────────────────────────────────────────────────────────────────────
$routes->group('admin', ['filter' => 'auth:admin,super_admin'], function ($routes) {
    $routes->get('/',              'AdminController::dashboard');
    $routes->get('all-classes',    'AdminController::allClasses');
    $routes->get('payments',       'AdminController::payments');
    $routes->get('verify',         'AdminController::verify');
    $routes->get('cash-flow',      'AdminController::cashFlow');
    $routes->get('reports',        'AdminController::reports');
    $routes->get('fees',           'AdminController::fees');
    $routes->get('section',        'AdminController::section');
    $routes->get('announcements',  'AdminController::announcements');
    $routes->get('audit-logs',     'AdminController::auditLogs');
    $routes->get('users',          'AdminController::users');
    $routes->get('settings',       'AdminController::settings');
    $routes->post('settings',      'AdminController::settingsPost');
});

// ── Super-Admin ───────────────────────────────────────────────────────────────
$routes->group('super-admin', ['filter' => 'auth:super_admin'], function ($routes) {
    $routes->get('/',                 'SuperAdminController::dashboard');
    $routes->get('organizations',     'SuperAdminController::organizations');
    $routes->get('admins',            'SuperAdminController::admins');
    $routes->get('monitoring',        'SuperAdminController::monitoring');
    $routes->get('global-settings',   'SuperAdminController::globalSettings');
    $routes->post('global-settings',  'SuperAdminController::globalSettingsPost');
    $routes->get('backup',            'SuperAdminController::backup');
    $routes->post('backup',           'SuperAdminController::backupPost');
});

// ── Reports ───────────────────────────────────────────────────────────────────
$routes->group('reports', ['filter' => 'auth:admin,super_admin'], function ($routes) {
    $routes->get('financial-summary', 'ReportController::financialSummary');
    $routes->get('collections',       'ReportController::collections');
    $routes->get('contributions',     'ReportController::contributions');
    $routes->get('cash-flow',         'ReportController::cashFlow');
    $routes->get('outstanding',       'ReportController::outstanding');
});

// ── JSON API ──────────────────────────────────────────────────────────────────
$routes->group('api', ['filter' => 'auth'], function ($routes) {
    // Announcements
    $routes->get( 'announcements',           'Api\AnnouncementController::index');
    $routes->post('announcements',           'Api\AnnouncementController::create');
    $routes->put( 'announcements/(:num)',    'Api\AnnouncementController::update/$1');
    $routes->delete('announcements/(:num)', 'Api\AnnouncementController::delete/$1');

    // Fees
    $routes->get( 'fees',            'Api\FeeController::index');
    $routes->post('fees',            'Api\FeeController::create');
    $routes->put( 'fees/(:num)',     'Api\FeeController::update/$1');
    $routes->delete('fees/(:num)', 'Api\FeeController::delete/$1');

    // Payments
    $routes->get( 'payments',           'Api\PaymentController::index');
    $routes->post('payments',           'Api\PaymentController::create');
    $routes->put( 'payments/(:num)',    'Api\PaymentController::update/$1');
    $routes->delete('payments/(:num)', 'Api\PaymentController::delete/$1');

    // Sections / Rosters
    $routes->get('sections',                    'Api\SectionController::index');
    $routes->get('sections/(:num)',             'Api\SectionController::show/$1');
    $routes->get('sections/(:num)/roster',      'Api\SectionController::roster/$1');

    // Users
    $routes->get( 'users',           'Api\UserController::index');
    $routes->post('users',           'Api\UserController::create');
    $routes->put( 'users/(:num)',    'Api\UserController::update/$1');
    $routes->delete('users/(:num)', 'Api\UserController::delete/$1');

    // Cash Flow
    $routes->get( 'cash-flow',         'Api\CashFlowController::index');
    $routes->post('cash-flow',         'Api\CashFlowController::create');
    $routes->delete('cash-flow/(:num)','Api\CashFlowController::delete/$1');

    // Notifications
    $routes->get('notifications',            'Api\NotificationController::index');
    $routes->put('notifications/(:num)/read','Api\NotificationController::markRead/$1');
    $routes->put('notifications/read-all',   'Api\NotificationController::markAllRead');
});
```

---

## 6. Models

### `app/Models/BaseSocietechModel.php`
```php
<?php
namespace App\Models;
use CodeIgniter\Model;

abstract class BaseSocietechModel extends Model
{
    protected $returnType     = 'array';
    protected $useTimestamps  = true;
    protected $useSoftDeletes = false;
    protected $protectFields  = true;
}
```

### `app/Models/UserModel.php`
```php
<?php
namespace App\Models;

class UserModel extends BaseSocietechModel
{
    protected $table          = 'users';
    protected $useSoftDeletes = true;
    protected $allowedFields  = [
        'organization_id', 'student_no', 'first_name', 'last_name',
        'email', 'phone', 'password_hash', 'role', 'avatar_path',
        'email_verified_at', 'status', 'last_login_at',
    ];

    public function findByEmail(string $email): ?array
    {
        return $this->where('email', $email)->where('status', 'active')->first();
    }

    public function getByRole(string $role, int $orgId): array
    {
        return $this->where('role', $role)->where('organization_id', $orgId)->findAll();
    }

    public function fullName(array $user): string
    {
        return trim($user['first_name'] . ' ' . $user['last_name']);
    }
}
```

### `app/Models/SectionModel.php`
```php
<?php
namespace App\Models;

class SectionModel extends BaseSocietechModel
{
    protected $table          = 'sections';
    protected $useSoftDeletes = true;
    protected $allowedFields  = [
        'organization_id', 'program', 'year_level',
        'section_name', 'treasurer_id', 'status',
    ];

    public function getWithTreasurer(int $orgId): array
    {
        return $this->db->table('sections s')
            ->select('s.*, u.first_name, u.last_name, u.email as treasurer_email')
            ->join('users u', 'u.id = s.treasurer_id', 'left')
            ->where('s.organization_id', $orgId)
            ->where('s.status', 'active')
            ->whereNull('s.deleted_at')
            ->get()->getResultArray();
    }
}
```

### `app/Models/FeeModel.php`
```php
<?php
namespace App\Models;

class FeeModel extends BaseSocietechModel
{
    protected $table          = 'fees';
    protected $useSoftDeletes = true;
    protected $allowedFields  = [
        'organization_id', 'academic_year_id', 'category_id', 'section_id',
        'title', 'description', 'amount', 'due_on', 'scope', 'status', 'created_by',
    ];

    public function getActiveFees(int $orgId): array
    {
        return $this->where('organization_id', $orgId)
                    ->whereIn('status', ['active', 'draft'])
                    ->findAll();
    }

    public function getStudentFees(int $userId, int $orgId): array
    {
        return $this->db->query("
            SELECT f.*, sfb.amount_paid, sfb.amount_due, sfb.status AS balance_status
            FROM fees f
            LEFT JOIN student_fee_balances sfb
                ON sfb.fee_id = f.id AND sfb.user_id = ?
            WHERE f.organization_id = ?
              AND f.status = 'active'
              AND f.deleted_at IS NULL
            ORDER BY f.due_on ASC
        ", [$userId, $orgId])->getResultArray();
    }
}
```

### `app/Models/PaymentModel.php`
```php
<?php
namespace App\Models;

class PaymentModel extends BaseSocietechModel
{
    protected $table          = 'payments';
    protected $useSoftDeletes = true;
    protected $allowedFields  = [
        'organization_id', 'fee_id', 'student_id', 'section_id',
        'recorded_by', 'verified_by', 'reference_no', 'payment_method',
        'amount', 'paid_at', 'status', 'remarks',
    ];

    public function getPending(int $orgId): array
    {
        return $this->where('organization_id', $orgId)
                    ->where('status', 'pending')
                    ->findAll();
    }

    public function getTotalCollected(int $orgId): float
    {
        $result = $this->selectSum('amount')
                       ->where('organization_id', $orgId)
                       ->where('status', 'approved')
                       ->first();
        return (float)($result['amount'] ?? 0);
    }
}
```

### `app/Models/AnnouncementModel.php`
```php
<?php
namespace App\Models;

class AnnouncementModel extends BaseSocietechModel
{
    protected $table          = 'announcements';
    protected $useSoftDeletes = true;
    protected $allowedFields  = [
        'organization_id', 'title', 'body', 'audience',
        'posted_by', 'posted_at', 'ends_at', 'is_active',
    ];

    public function getActive(int $orgId): array
    {
        return $this->where('organization_id', $orgId)
                    ->where('is_active', 1)
                    ->groupStart()
                        ->where('ends_at IS NULL')
                        ->orWhere('ends_at >=', date('Y-m-d H:i:s'))
                    ->groupEnd()
                    ->orderBy('posted_at', 'DESC')
                    ->findAll(20);
    }
}
```

### `app/Models/CashFlowEntryModel.php`
```php
<?php
namespace App\Models;

class CashFlowEntryModel extends BaseSocietechModel
{
    protected $table          = 'cash_flow_entries';
    protected $useSoftDeletes = true;
    protected $allowedFields  = [
        'organization_id', 'section_id', 'type', 'scope',
        'category', 'description', 'amount', 'occurred_on',
        'payment_id', 'recorded_by',
    ];

    public function getSummary(int $orgId): array
    {
        $result = $this->db->query("
            SELECT
                SUM(CASE WHEN type='inflow'  THEN amount ELSE 0 END) AS total_in,
                SUM(CASE WHEN type='outflow' THEN amount ELSE 0 END) AS total_out
            FROM cash_flow_entries
            WHERE organization_id = ? AND deleted_at IS NULL
        ", [$orgId])->getRowArray();
        return [
            'total_in'  => (float)($result['total_in']  ?? 0),
            'total_out' => (float)($result['total_out'] ?? 0),
            'net'       => (float)(($result['total_in'] ?? 0) - ($result['total_out'] ?? 0)),
        ];
    }
}
```

### `app/Models/NotificationModel.php`
```php
<?php
namespace App\Models;

class NotificationModel extends BaseSocietechModel
{
    protected $table         = 'notifications';
    protected $allowedFields = [
        'organization_id', 'user_id', 'type', 'title', 'message', 'data', 'read_at',
    ];

    public function getUnread(int $userId): array
    {
        return $this->where('user_id', $userId)
                    ->where('read_at IS NULL')
                    ->orderBy('created_at', 'DESC')
                    ->findAll(50);
    }
}
```

### `app/Models/AuditLogModel.php`
```php
<?php
namespace App\Models;

class AuditLogModel extends BaseSocietechModel
{
    protected $table         = 'audit_logs';
    protected $useTimestamps = false;
    protected $allowedFields = [
        'organization_id', 'actor_id', 'action', 'entity_type',
        'entity_id', 'ip_address', 'user_agent', 'metadata',
    ];

    public function record(string $action, string $entityType = '', int $entityId = 0, array $meta = []): void
    {
        $this->insert([
            'organization_id' => session()->get('org_id'),
            'actor_id'        => session()->get('user_id'),
            'action'          => $action,
            'entity_type'     => $entityType,
            'entity_id'       => $entityId ?: null,
            'ip_address'      => service('request')->getIPAddress(),
            'user_agent'      => service('request')->getUserAgent()->getAgentString(),
            'metadata'        => $meta ? json_encode($meta) : null,
            'created_at'      => date('Y-m-d H:i:s'),
        ]);
    }
}
```

---

## 7. Controllers

### `app/Controllers/AuthController.php`
```php
<?php
namespace App\Controllers;
use App\Models\UserModel;

class AuthController extends BaseController
{
    public function loginPage()
    {
        return view('auth/login');
    }

    public function loginPost()
    {
        if (! $this->validate(['email' => 'required|valid_email', 'password' => 'required'])) {
            return redirect()->back()->withInput()->with('errors', $this->validator->getErrors());
        }
        $model = new UserModel();
        $user  = $model->findByEmail($this->request->getPost('email'));
        if (! $user || ! password_verify($this->request->getPost('password'), $user['password_hash'])) {
            return redirect()->back()->withInput()->with('error', 'Invalid email or password.');
        }
        $this->setSession($user);
        $model->update($user['id'], ['last_login_at' => date('Y-m-d H:i:s')]);
        return redirect()->to($this->dashboardFor($user['role']));
    }

    public function adminLoginPage()   { return view('auth/admin_login'); }
    public function adminLoginPost()
    {
        if (! $this->validate(['email' => 'required|valid_email', 'password' => 'required'])) {
            return redirect()->back()->withInput()->with('errors', $this->validator->getErrors());
        }
        $model = new UserModel();
        $user  = $model->where('email', $this->request->getPost('email'))
                       ->whereIn('role', ['admin','super_admin'])
                       ->where('status','active')->first();
        if (! $user || ! password_verify($this->request->getPost('password'), $user['password_hash'])) {
            return redirect()->back()->withInput()->with('error', 'Invalid admin credentials.');
        }
        $this->setSession($user);
        $model->update($user['id'], ['last_login_at' => date('Y-m-d H:i:s')]);
        return redirect()->to($this->dashboardFor($user['role']));
    }

    public function logout()
    {
        session()->destroy();
        return redirect()->to('/login');
    }

    public function registerPage()  { return view('auth/register'); }
    public function registerPost()
    {
        $rules = [
            'first_name' => 'required|min_length[2]',
            'last_name'  => 'required|min_length[2]',
            'email'      => 'required|valid_email|is_unique[users.email]',
            'password'   => 'required|min_length[8]',
        ];
        if (! $this->validate($rules)) {
            return redirect()->back()->withInput()->with('errors', $this->validator->getErrors());
        }
        (new UserModel())->insert([
            'organization_id' => 1,
            'first_name'      => $this->request->getPost('first_name'),
            'last_name'       => $this->request->getPost('last_name'),
            'email'           => $this->request->getPost('email'),
            'student_no'      => $this->request->getPost('student_no') ?: null,
            'password_hash'   => password_hash($this->request->getPost('password'), PASSWORD_DEFAULT),
            'role'            => 'student',
            'status'          => 'pending',
        ]);
        return redirect()->to('/login')->with('success', 'Account created! Awaiting activation.');
    }

    public function forgotPage()  { return view('auth/forgot_password'); }
    public function forgotPost()  { /* send reset email logic here */ return redirect()->back(); }
    public function resetPage()   { return view('auth/reset_password'); }
    public function resetPost()   { /* handle token + new password */ return redirect()->to('/login'); }
    public function verifyEmailPage() { return view('auth/verify_email'); }

    private function setSession(array $user): void
    {
        session()->set([
            'user_id'   => $user['id'],
            'user_role' => $user['role'],
            'user_email'=> $user['email'],
            'user_name' => trim($user['first_name'] . ' ' . $user['last_name']),
            'org_id'    => $user['organization_id'],
        ]);
    }

    private function dashboardFor(string $role): string
    {
        return match($role) {
            'super_admin' => '/super-admin',
            'admin'       => '/admin',
            'treasurer'   => '/treasurer',
            default       => '/student',
        };
    }
}
```

### `app/Controllers/AdminController.php`
```php
<?php
namespace App\Controllers;
use App\Models\{PaymentModel, SectionModel, UserModel, FeeModel, CashFlowEntryModel, AnnouncementModel, AuditLogModel};

class AdminController extends BaseController
{
    public function dashboard(): string
    {
        $orgId    = (int) session()->get('org_id');
        $payments = new PaymentModel();
        $sections = new SectionModel();
        $users    = new UserModel();
        $cashFlow = new CashFlowEntryModel();

        return view('admin/dashboard', [
            'totalCollections' => $payments->getTotalCollected($orgId),
            'pendingCount'     => count($payments->getPending($orgId)),
            'activeClasses'    => count($sections->getWithTreasurer($orgId)),
            'totalStudents'    => count($users->getByRole('student', $orgId)),
            'cashSummary'      => $cashFlow->getSummary($orgId),
        ]);
    }

    public function allClasses(): string
    {
        $sections = (new SectionModel())->getWithTreasurer((int) session()->get('org_id'));
        return view('admin/all_classes', ['sections' => $sections]);
    }

    public function payments(): string
    {
        $payments = (new PaymentModel())->where('organization_id', session()->get('org_id'))->findAll();
        return view('admin/payments', ['payments' => $payments]);
    }

    public function verify(): string
    {
        $pending = (new PaymentModel())->getPending((int) session()->get('org_id'));
        return view('admin/verify', ['pending' => $pending]);
    }

    public function cashFlow(): string
    {
        $orgId   = (int) session()->get('org_id');
        $entries = (new CashFlowEntryModel())->where('organization_id', $orgId)->orderBy('occurred_on','DESC')->findAll();
        return view('admin/cash_flow', ['entries' => $entries]);
    }

    public function reports(): string        { return view('admin/reports'); }
    public function fees(): string
    {
        $fees = (new FeeModel())->getActiveFees((int) session()->get('org_id'));
        return view('admin/fees', ['fees' => $fees]);
    }
    public function section(): string        { return view('admin/section'); }
    public function auditLogs(): string
    {
        $logs = (new AuditLogModel())->orderBy('created_at','DESC')->findAll(200);
        return view('admin/audit_logs', ['logs' => $logs]);
    }
    public function users(): string
    {
        $users = (new UserModel())->where('organization_id', session()->get('org_id'))->findAll();
        return view('admin/users', ['users' => $users]);
    }
    public function settings(): string       { return view('admin/settings'); }
    public function settingsPost()           { return redirect()->back()->with('success','Settings saved.'); }

    public function announcements(): string
    {
        $items = (new AnnouncementModel())->getActive((int) session()->get('org_id'));
        return view('admin/announcements', ['announcements' => $items]);
    }
}
```

### `app/Controllers/StudentController.php`
```php
<?php
namespace App\Controllers;
use App\Models\{FeeModel, NotificationModel, PaymentModel, SectionModel};

class StudentController extends BaseController
{
    public function dashboard(): string
    {
        $userId = (int) session()->get('user_id');
        $orgId  = (int) session()->get('org_id');
        $fees   = (new FeeModel())->getStudentFees($userId, $orgId);
        return view('student/dashboard', ['fees' => $fees]);
    }

    public function financialRecords(): string
    {
        $fees = (new FeeModel())->getStudentFees((int)session()->get('user_id'), (int)session()->get('org_id'));
        return view('student/financial_records', ['fees' => $fees]);
    }

    public function contributions(): string  { return view('student/contributions'); }
    public function classRoster(): string    { return view('student/class_roster'); }
    public function notifications(): string
    {
        $notes = (new NotificationModel())->getUnread((int) session()->get('user_id'));
        return view('student/notifications', ['notifications' => $notes]);
    }
    public function profile(): string        { return view('student/profile'); }
    public function settings(): string       { return view('student/settings'); }
    public function settingsPost()           { return redirect()->back()->with('success', 'Settings saved.'); }

    // Societech-treasurer views
    public function societechDashboard(): string
    {
        $sections = (new SectionModel())->getWithTreasurer((int) session()->get('org_id'));
        return view('student/societech_dashboard', ['sections' => $sections]);
    }
    public function societechAllClasses(): string
    {
        $sections = (new SectionModel())->getWithTreasurer((int) session()->get('org_id'));
        return view('student/societech_all_classes', ['sections' => $sections]);
    }
    public function societechSectionRoster(): string { return view('student/societech_section_roster'); }
    public function societechPayments(): string      { return view('student/societech_payments'); }
}
```

### `app/Controllers/Api/AnnouncementController.php`
```php
<?php
namespace App\Controllers\Api;
use App\Controllers\BaseController;
use App\Models\{AnnouncementModel, AuditLogModel};

class AnnouncementController extends BaseController
{
    public function index()
    {
        try {
            $items = (new AnnouncementModel())->getActive((int) session()->get('org_id'));
            return $this->response->setJSON(['data' => $items]);
        } catch (\Throwable $e) {
            return $this->response->setJSON(['data' => [], 'error' => 'DB unavailable']);
        }
    }

    public function create()
    {
        $data = $this->request->getJSON(true);
        $id   = (new AnnouncementModel())->insert([
            'organization_id' => session()->get('org_id'),
            'title'     => $data['title']   ?? '',
            'body'      => $data['body']    ?? '',
            'audience'  => $data['audience']?? 'all',
            'posted_by' => session()->get('user_id'),
            'posted_at' => date('Y-m-d H:i:s'),
            'is_active' => 1,
        ]);
        (new AuditLogModel())->record('announcement.create', 'announcements', (int)$id);
        return $this->response->setStatusCode(201)->setJSON(['id' => $id]);
    }

    public function update(int $id)
    {
        $data = $this->request->getJSON(true);
        (new AnnouncementModel())->update($id, array_intersect_key($data, array_flip(['title','body','audience','ends_at','is_active'])));
        return $this->response->setJSON(['success' => true]);
    }

    public function delete(int $id)
    {
        (new AnnouncementModel())->delete($id);
        return $this->response->setJSON(['success' => true]);
    }
}
```

### `app/Controllers/Api/PaymentController.php`
```php
<?php
namespace App\Controllers\Api;
use App\Controllers\BaseController;
use App\Models\{PaymentModel, AuditLogModel};

class PaymentController extends BaseController
{
    public function index()
    {
        $orgId    = (int) session()->get('org_id');
        $payments = (new PaymentModel())->where('organization_id', $orgId)->findAll();
        return $this->response->setJSON(['data' => $payments]);
    }

    public function create()
    {
        $data = $this->request->getJSON(true);
        $id   = (new PaymentModel())->insert([
            'organization_id' => session()->get('org_id'),
            'fee_id'          => $data['fee_id']        ?? null,
            'student_id'      => $data['student_id'],
            'section_id'      => $data['section_id']    ?? null,
            'recorded_by'     => session()->get('user_id'),
            'payment_method'  => $data['payment_method']?? 'cash',
            'amount'          => $data['amount'],
            'paid_at'         => $data['paid_at']       ?? date('Y-m-d H:i:s'),
            'status'          => 'pending',
            'remarks'         => $data['remarks']       ?? '',
        ]);
        (new AuditLogModel())->record('payment.create', 'payments', (int)$id);
        return $this->response->setStatusCode(201)->setJSON(['id' => $id]);
    }

    public function update(int $id)
    {
        $data = $this->request->getJSON(true);
        (new PaymentModel())->update($id, array_intersect_key($data, array_flip(['status','verified_by','remarks'])));
        (new AuditLogModel())->record('payment.update', 'payments', $id);
        return $this->response->setJSON(['success' => true]);
    }

    public function delete(int $id)
    {
        (new PaymentModel())->delete($id);
        return $this->response->setJSON(['success' => true]);
    }
}
```

### `app/Controllers/Api/SectionController.php`
```php
<?php
namespace App\Controllers\Api;
use App\Controllers\BaseController;
use App\Models\{SectionModel, UserModel};

class SectionController extends BaseController
{
    public function index()
    {
        $sections = (new SectionModel())->getWithTreasurer((int) session()->get('org_id'));
        return $this->response->setJSON(['data' => $sections]);
    }

    public function show(int $id)
    {
        $section = (new SectionModel())->find($id);
        if (! $section) return $this->response->setStatusCode(404)->setJSON(['error'=>'Not found']);
        return $this->response->setJSON(['data' => $section]);
    }

    public function roster(int $sectionId)
    {
        $members = $this->db->table('section_members sm')
            ->select('u.id, u.first_name, u.last_name, u.email, u.student_no, u.role')
            ->join('users u', 'u.id = sm.user_id')
            ->where('sm.section_id', $sectionId)
            ->where('sm.is_current', 1)
            ->get()->getResultArray();
        return $this->response->setJSON(['data' => $members]);
    }
}
```

---

## 8. Filters

### `app/Filters/AuthFilter.php`
```php
<?php
namespace App\Filters;
use CodeIgniter\Filters\FilterInterface;
use CodeIgniter\HTTP\{RequestInterface, ResponseInterface};

class AuthFilter implements FilterInterface
{
    public function before(RequestInterface $request, $arguments = null)
    {
        if (! session()->get('user_id')) {
            // JSON requests get 401 instead of redirect
            if ($request->isAJAX() || str_starts_with($request->getPath(), 'api/')) {
                return service('response')->setStatusCode(401)->setJSON(['error' => 'Unauthenticated']);
            }
            return redirect()->to('/login')->with('error', 'Please log in to continue.');
        }
        if ($arguments) {
            $role = session()->get('user_role');
            if (! in_array($role, $arguments)) {
                return redirect()->to('/')->with('error', 'Access denied.');
            }
        }
    }

    public function after(RequestInterface $request, ResponseInterface $response, $arguments = null) {}
}
```

### `app/Filters/GuestFilter.php`
```php
<?php
namespace App\Filters;
use CodeIgniter\Filters\FilterInterface;
use CodeIgniter\HTTP\{RequestInterface, ResponseInterface};

class GuestFilter implements FilterInterface
{
    public function before(RequestInterface $request, $arguments = null)
    {
        if (session()->get('user_id')) {
            $role = session()->get('user_role');
            $dest = match($role) {
                'super_admin' => '/super-admin',
                'admin'       => '/admin',
                'treasurer'   => '/treasurer',
                default       => '/student',
            };
            return redirect()->to($dest);
        }
    }

    public function after(RequestInterface $request, ResponseInterface $response, $arguments = null) {}
}
```

### Register in `app/Config/Filters.php`
```php
public array $aliases = [
    // ... existing aliases ...
    'auth'  => \App\Filters\AuthFilter::class,
    'guest' => \App\Filters\GuestFilter::class,
];
```

---

## 9. Database

All 16 tables are already defined in the migration. Here is what each table powers:

| Table | Drives |
|---|---|
| `organizations` | Multi-org support; `org_id` in session scopes all queries |
| `academic_years` | Semester/year scoping for fees and sections |
| `users` | All roles: `student`, `treasurer`, `admin`, `super_admin` |
| `sections` | Class sections; each has an optional `treasurer_id` |
| `section_members` | Many-to-many: students ↔ sections |
| `fee_categories` | Categories like "Membership", "Events", "IT Days" |
| `fees` | Fee assessments per org/section/student |
| `student_fee_balances` | Running balance per student per fee |
| `payments` | Individual payment records (pending → approved) |
| `verification_batches` | Treasurers batch-submit payments for admin review |
| `verification_batch_payments` | Links batches to individual payments |
| `cash_flow_entries` | Double-entry ledger (inflow/outflow) |
| `announcements` | Org-wide announcements with audience filter |
| `notifications` | Per-user in-app notifications |
| `audit_logs` | Every action logged with actor + IP |
| `settings` | Key-value config per organization |

---

## 10. JavaScript Replacement Strategy

All the legacy JS modules stored data in `localStorage`. In CI4 MVC, these should be replaced with API calls. Here is the mapping:

| Legacy JS module | What it did | Replace with |
|---|---|---|
| `student-session.js` (localStorage) | Stored user role/name/classKey | Use `GET /auth/me` to hydrate session in JS; drop localStorage writes |
| `societech-announcements.js` (localStorage) | CRUD for announcements | `GET/POST/PUT/DELETE /api/announcements` |
| `societech-payments.js` (localStorage) | CRUD for fee assessments | `GET/POST/PUT/DELETE /api/fees` |
| `class-rosters.js` (localStorage) | Roster per section | `GET /api/sections/:id/roster` |
| `societech-all-classes.js` | Renders sections table | Feed from `GET /api/sections` |
| `treasurer-fee-dataset.js` | Fee list for treasurer views | Feed from `GET /api/fees` |
| `notifications-feed.js` | Renders notification list | Feed from `GET /api/notifications` |

The **sidebar JS files** (`sidebar.js`, `student-bar.js`) can remain as-is — they just render HTML nav. Only update the `.html` hrefs to CI4 paths and the logout call from `window.location.href = '../auth/admin-login.html'` to `/auth/logout`.

---

## 11. Step-by-Step Migration Checklist

```
Phase 1 — Setup (do this first)
  [ ] composer install  (restores vendor/)
  [ ] Copy .env, set DB credentials
  [ ] php spark migrate
  [ ] php spark db:seed SocietechInitialSeeder
  [ ] Confirm http://localhost/your-project/public/ loads

Phase 2 — Static Assets
  [ ] Copy all CSS files to public/assets/css/ (rename 3 files per §4.2)
  [ ] Copy all JS files to public/assets/js/admin/ and /student/ (per §4.3)
  [ ] Copy images to public/assets/images/

Phase 3 — Config
  [ ] Paste Routes.php (§5)
  [ ] Register AuthFilter + GuestFilter in Config/Filters.php (§8)
  [ ] Enable form + url helpers in BaseController

Phase 4 — Models
  [ ] Create all Models per §6

Phase 5 — Controllers
  [ ] AuthController (§7)
  [ ] AdminController (§7)
  [ ] StudentController (§7)
  [ ] TreasurerController (stub: return view)
  [ ] SuperAdminController (stub: return view)
  [ ] ReportController (stub: return view)
  [ ] PublicController (stub: return view for each public page)
  [ ] Api\AnnouncementController (§7)
  [ ] Api\PaymentController (§7)
  [ ] Api\SectionController (§7)
  [ ] Api\FeeController, UserController, CashFlowController, NotificationController (follow same pattern)

Phase 6 — Views (convert HTML → PHP)
  [ ] For each HTML file in §4.1:
      - Copy HTML content into the .php view file
      - Replace ../assets/css/  with <?= base_url('assets/css/') ?>
      - Replace ../assets/js/   with <?= base_url('assets/js/') ?>
      - Replace ../assets/images/ with <?= base_url('assets/images/') ?>
      - Replace *.html hrefs    with <?= site_url('route') ?>
      - Replace logout JS       with href="<?= site_url('auth/logout') ?>"
      - Add <?= csrf_field() ?> to any form
      - Add flash message display at top of each form page

Phase 7 — JS API Wiring
  [ ] Replace localStorage reads/writes with fetch() calls to /api/* endpoints
  [ ] Update student-session.js to call GET /auth/me instead of reading localStorage
  [ ] Test each page with real DB data

Phase 8 — Test by Role
  [ ] Student login → /student dashboard shows real fees
  [ ] Class treasurer → /student/class-roster shows real roster
  [ ] Societech treasurer → /student/societech-dashboard shows real sections
  [ ] Admin → /admin/dashboard shows real stats
  [ ] Admin → /admin/announcements CRUD works via API
  [ ] Super-admin → /super-admin accessible only to super_admin role
```