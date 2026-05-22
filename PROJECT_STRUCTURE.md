# PROJECT_STRUCTURE.md

# Societech Financial & Monitoring — Updated Project Structure (CI4 MVC Migration)

## Overview

This document reflects the updated architecture of the **Societech Financial & Monitoring System** after migration planning to **CodeIgniter 4 (CI4) MVC architecture**.

The system supports four major user roles:

| Role        | Description                                       |
| ----------- | ------------------------------------------------- |
| Student     | View fees, balances, contributions, notifications |
| Treasurer   | Manage class-level payments and verification      |
| Admin       | Manage organization-wide finances and users       |
| Super Admin | Manage organizations and system-wide settings     |

---

# 1. CI4 Target Project Structure

```text
your-project/
├── app/
│   ├── Config/
│   │   ├── Routes.php
│   │   └── Filters.php
│   │
│   ├── Controllers/
│   │   ├── BaseController.php
│   │   ├── AuthController.php
│   │   ├── PublicController.php
│   │   ├── StudentController.php
│   │   ├── TreasurerController.php
│   │   ├── AdminController.php
│   │   ├── SuperAdminController.php
│   │   ├── ReportController.php
│   │   │
│   │   └── Api/
│   │       ├── AuthApiController.php
│   │       ├── AnnouncementController.php
│   │       ├── FeeController.php
│   │       ├── PaymentController.php
│   │       ├── SectionController.php
│   │       ├── UserController.php
│   │       ├── CashFlowController.php
│   │       └── NotificationController.php
│   │
│   ├── Filters/
│   │   ├── AuthFilter.php
│   │   ├── GuestFilter.php
│   │   └── RoleFilter.php
│   │
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
│   │
│   ├── Views/
│   │   ├── layouts/
│   │   │   ├── main.php
│   │   │   ├── admin.php
│   │   │   └── student.php
│   │   │
│   │   ├── partials/
│   │   │   ├── admin_sidebar.php
│   │   │   ├── student_sidebar.php
│   │   │   ├── flash_messages.php
│   │   │   └── profile_menu.php
│   │   │
│   │   ├── public/
│   │   │   ├── index.php
│   │   │   ├── about.php
│   │   │   ├── contact.php
│   │   │   └── help.php
│   │   │
│   │   ├── auth/
│   │   │   ├── login.php
│   │   │   ├── admin_login.php
│   │   │   ├── register.php
│   │   │   ├── forgot_password.php
│   │   │   ├── reset_password.php
│   │   │   └── verify_email.php
│   │   │
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
│   │   │
│   │   ├── treasurer/
│   │   │   ├── dashboard.php
│   │   │   ├── payments.php
│   │   │   ├── verification.php
│   │   │   ├── cash_flow.php
│   │   │   └── reports.php
│   │   │
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
│   │   │
│   │   ├── super_admin/
│   │   │   ├── dashboard.php
│   │   │   ├── organizations.php
│   │   │   ├── admins.php
│   │   │   ├── monitoring.php
│   │   │   ├── global_settings.php
│   │   │   └── backup.php
│   │   │
│   │   └── reports/
│   │       ├── financial_summary.php
│   │       ├── collections.php
│   │       ├── contributions.php
│   │       ├── cash_flow.php
│   │       └── outstanding.php
│   │
│   └── Database/
│       ├── Migrations/
│       └── Seeds/
│
├── public/
│   ├── index.php
│   │
│   └── assets/
│       ├── css/
│       │   ├── main.css
│       │   ├── background.css
│       │   ├── components.css
│       │   ├── dashboard.css
│       │   ├── responsive-breakpoints.css
│       │   ├── utilities.css
│       │   ├── announcement-notifications.css
│       │   ├── wip.css
│       │   ├── admin.css
│       │   ├── auth.css
│       │   └── student.css
│       │
│       ├── js/
│       │   ├── main.js
│       │   ├── auth.js
│       │   ├── charts.js
│       │   ├── class-rosters.js
│       │   ├── societech-announcements.js
│       │   ├── societech-payments.js
│       │   ├── announcement-bell.js
│       │   ├── announcements-loader.js
│       │   ├── announcements-public-feed.js
│       │   │
│       │   ├── admin/
│       │   │   ├── sidebar.js
│       │   │   ├── shared.js
│       │   │   ├── announcements-page.js
│       │   │   ├── section-roster.js
│       │   │   └── table-filters.js
│       │   │
│       │   └── student/
│       │       ├── student-session.js
│       │       ├── student.js
│       │       ├── student-bar.js
│       │       ├── notifications-feed.js
│       │       ├── settings.js
│       │       ├── societech-treasurer.js
│       │       ├── societech-all-classes.js
│       │       ├── societech-section-roster.js
│       │       ├── societech-payments-page.js
│       │       ├── treasurer-roster.js
│       │       └── treasurer-fee-dataset.js
│       │
│       └── images/
│           ├── societech_logo.png
│           └── background.jpg
│
└── writable/
    ├── cache/
    ├── logs/
    ├── session/
    └── uploads/
```

---

# 2. Legacy to CI4 MVC Migration Map

## HTML Files → Views

| Legacy HTML            | CI4 View                            |
| ---------------------- | ----------------------------------- |
| public/index.html      | app/Views/public/index.php          |
| auth/login.html        | app/Views/auth/login.php            |
| student/index.html     | app/Views/student/dashboard.php     |
| admin/dashboard.html   | app/Views/admin/dashboard.php       |
| super-admin/index.html | app/Views/super_admin/dashboard.php |
| treasurer/index.html   | app/Views/treasurer/dashboard.php   |

Additional pages follow the same naming conversion:

* kebab-case.html → snake_case.php
* Example:

  * financial-records.html → financial_records.php
  * cash-flow.html → cash_flow.php
  * audit-logs.html → audit_logs.php

---

# 3. Asset Migration

## CSS Migration

| Legacy Path                   | New Path                      |
| ----------------------------- | ----------------------------- |
| assets/css/main.css           | public/assets/css/main.css    |
| admin/admin-shared-styles.css | public/assets/css/admin.css   |
| auth/auth-style.css           | public/assets/css/auth.css    |
| student/student.css           | public/assets/css/student.css |

## JavaScript Migration

| Legacy Path            | New Path                                |
| ---------------------- | --------------------------------------- |
| assets/js/main.js      | public/assets/js/main.js                |
| admin/sidebar.js       | public/assets/js/admin/sidebar.js       |
| student/student.js     | public/assets/js/student/student.js     |
| student/student-bar.js | public/assets/js/student/student-bar.js |

## Image Migration

| Legacy Path                                            | New Path                                |
| ------------------------------------------------------ | --------------------------------------- |
| assets/images/societech_logo.png                       | public/assets/images/societech_logo.png |
| assets/images/d6d628d6-1548-4d35-8176-5656c91409f5.jpg | public/assets/images/background.jpg     |

---

# 4. Routing Structure

## Public Routes

| Route    | Controller Method         |
| -------- | ------------------------- |
| /        | PublicController::index   |
| /about   | PublicController::about   |
| /contact | PublicController::contact |
| /help    | PublicController::help    |

## Authentication Routes

| Route        | Controller Method            |
| ------------ | ---------------------------- |
| /login       | AuthController::loginPage    |
| /register    | AuthController::registerPage |
| /auth/login  | AuthController::loginPost    |
| /auth/logout | AuthController::logout       |

## Student Routes

| Route                      | Controller Method                   |
| -------------------------- | ----------------------------------- |
| /student                   | StudentController::dashboard        |
| /student/financial-records | StudentController::financialRecords |
| /student/contributions     | StudentController::contributions    |
| /student/class-roster      | StudentController::classRoster      |
| /student/notifications     | StudentController::notifications    |
| /student/profile           | StudentController::profile          |
| /student/settings          | StudentController::settings         |

## Treasurer Routes

| Route                   | Controller Method                 |
| ----------------------- | --------------------------------- |
| /treasurer              | TreasurerController::dashboard    |
| /treasurer/payments     | TreasurerController::payments     |
| /treasurer/verification | TreasurerController::verification |
| /treasurer/cash-flow    | TreasurerController::cashFlow     |
| /treasurer/reports      | TreasurerController::reports      |

## Admin Routes

| Route                | Controller Method              |
| -------------------- | ------------------------------ |
| /admin               | AdminController::dashboard     |
| /admin/all-classes   | AdminController::allClasses    |
| /admin/payments      | AdminController::payments      |
| /admin/verify        | AdminController::verify        |
| /admin/cash-flow     | AdminController::cashFlow      |
| /admin/reports       | AdminController::reports       |
| /admin/fees          | AdminController::fees          |
| /admin/announcements | AdminController::announcements |
| /admin/users         | AdminController::users         |
| /admin/settings      | AdminController::settings      |

## Super Admin Routes

| Route                        | Controller Method                    |
| ---------------------------- | ------------------------------------ |
| /super-admin                 | SuperAdminController::dashboard      |
| /super-admin/organizations   | SuperAdminController::organizations  |
| /super-admin/admins          | SuperAdminController::admins         |
| /super-admin/monitoring      | SuperAdminController::monitoring     |
| /super-admin/global-settings | SuperAdminController::globalSettings |
| /super-admin/backup          | SuperAdminController::backup         |

---

# 5. Shared Layout Components

## Shared Layouts

* layouts/main.php
* layouts/admin.php
* layouts/student.php

## Shared Partials

* partials/admin_sidebar.php
* partials/student_sidebar.php
* partials/profile_menu.php
* partials/flash_messages.php

## Reusable UI Components

* Navigation bars
* Sidebars
* Notification dropdowns
* Tables
* Cards
* Forms
* Charts
* Status badges
* Modal dialogs

---

# 6. Database Architecture

## Core Tables

| Table                | Purpose                           |
| -------------------- | --------------------------------- |
| organizations        | Multi-organization support        |
| academic_years       | Academic year/semester management |
| users                | Authentication and roles          |
| sections             | Class/section management          |
| section_members      | Student-section relationship      |
| fee_categories       | Fee grouping/categories           |
| fees                 | Fee assessments                   |
| student_fee_balances | Student balances                  |
| payments             | Payment records                   |
| verification_batches | Treasurer verification batches    |
| cash_flow_entries    | Financial inflow/outflow ledger   |
| announcements        | Organization announcements        |
| notifications        | User notifications                |
| audit_logs           | System activity logs              |
| settings             | Organization settings             |

---

# 7. Authentication & Security

## Authentication Flow

```text
Login → Validate Credentials → Create Session → Redirect by Role
```

## Role-Based Access Control (RBAC)

| Role        | Access Scope                 |
| ----------- | ---------------------------- |
| student     | Own records only             |
| treasurer   | Assigned section management  |
| admin       | Organization-wide management |
| super_admin | Entire system management     |

## Security Features

* Session-based authentication
* Password hashing
* CSRF protection
* Input validation & sanitization
* Route protection using Filters
* Role-based route restrictions
* Audit logging

---

# 8. API Architecture

## API Endpoints

| Endpoint           | Purpose                    |
| ------------------ | -------------------------- |
| /api/announcements | Announcement CRUD          |
| /api/fees          | Fee CRUD                   |
| /api/payments      | Payment CRUD               |
| /api/sections      | Section and roster data    |
| /api/users         | User management            |
| /api/cash-flow     | Cash flow entries          |
| /api/notifications | Notification data          |
| /auth/me           | Session hydration endpoint |

---

# 9. JavaScript Modernization Strategy

Legacy JavaScript modules originally depended heavily on `localStorage`.

The new CI4 MVC architecture replaces localStorage-based persistence with:

* CI4 Sessions
* REST API endpoints
* Database-driven state

## Migration Strategy

| Old System                 | New System                |
| -------------------------- | ------------------------- |
| localStorage session       | CI4 Session + /auth/me    |
| localStorage announcements | /api/announcements        |
| localStorage fees          | /api/fees                 |
| localStorage roster        | /api/sections/{id}/roster |
| localStorage notifications | /api/notifications        |

---

# 10. Development Phases

## Phase 1 — Setup

* Install dependencies
* Configure environment
* Configure database
* Run migrations
* Run seeders

## Phase 2 — Static Asset Migration

* Move CSS files
* Move JS files
* Move images
* Rename files to CI4 conventions

## Phase 3 — Core MVC Setup

* Configure Routes
* Configure Filters
* Create Models
* Create Controllers
* Create Views

## Phase 4 — API Integration

* Replace localStorage
* Connect frontend fetch() calls
* Test CRUD operations

## Phase 5 — Testing

* Student role testing
* Treasurer testing
* Admin testing
* Super-admin testing
* API testing
* Session testing

---

# 11. Naming Conventions

## File Naming

| Type        | Convention               |
| ----------- | ------------------------ |
| HTML        | kebab-case.html          |
| PHP Views   | snake_case.php           |
| CSS         | kebab-case.css           |
| JavaScript  | kebab-case.js            |
| Controllers | PascalCaseController.php |
| Models      | PascalCaseModel.php      |

---

# 12. Future Enhancements

* Real-time notifications
* Email service integration
* PDF & Excel report exports
* Advanced analytics dashboard
* Mobile responsiveness improvements
* Multi-organization scaling
* Queue system for notifications
* File upload management
* Audit log analytics
* Role permission customization

---

# 13. Notes

Pages currently marked as WIP placeholders should still exist as valid views to prevent broken routes during development.

All frontend assets should use CI4 helper functions:

```php
<?= base_url('assets/css/main.css') ?>
<?= base_url('assets/js/main.js') ?>
<?= base_url('assets/images/logo.png') ?>
```

All internal navigation links should use:

```php
<?= site_url('student') ?>
<?= site_url('admin/payments') ?>
```

All forms must include CSRF protection:

```php
<?= csrf_field() ?>
```
