# Project Structure Documentation

## Directory Structure

**Note:** Pages marked **(WIP placeholder)** currently exist as simple placeholder HTML files that display a **WORK IN PROGRESS** message. This helps prevent broken links while the full pages are still being built.

```
Societech Financial And Monitoring/
│
├── public/                          # Public-facing pages
│   ├── index.html                  # Home page
│   ├── about.html                  # About the system (WIP placeholder)
│   ├── contact.html                # Contact information (WIP placeholder)
│   ├── help.html                   # System guide/help (WIP placeholder)
│   └── assets/                     # Assets when serving `public/` as web root
│       └── images/
│           └── d6d628d6-1548-4d35-8176-5656c91409f5.jpg  # Background image copy
│
├── auth/                           # Authentication pages
│   ├── login.html                  # Login page
│   ├── register.html               # Registration page (WIP placeholder)
│   ├── verify-email.html           # Email verification (WIP placeholder)
│   ├── forgot-password.html        # Forgot password (WIP placeholder)
│   └── reset-password.html         # Reset password (WIP placeholder)
│
├── student/                        # Student dashboard
│   ├── index.html                  # Student dashboard home (WIP placeholder)
│   ├── financial-records.html      # My Financial Records (WIP placeholder)
│   ├── contributions.html          # Cash Contributions (WIP placeholder)
│   ├── notifications.html          # Notifications (WIP placeholder)
│   └── profile.html                # Profile settings (WIP placeholder)
│
├── treasurer/                      # Classroom Treasurer
│   ├── index.html                  # Treasurer dashboard (WIP placeholder)
│   ├── payments.html               # Student Payments (WIP placeholder)
│   ├── cash-flow.html              # Class Cash Flow (WIP placeholder)
│   ├── reports.html                # Class Reports (WIP placeholder)
│   └── verification.html           # Payment Verification (WIP placeholder)
│
├── admin/                          # Admin/Moderator Dashboard
│   ├── index.html                  # Admin dashboard (existing)
│   ├── classes.html                # All Classes (WIP placeholder)
│   ├── payments.html               # Payment Records (WIP placeholder)
│   ├── verify.html                 # Verify Records (WIP placeholder)
│   ├── cash-flow.html              # Cash Flow Management (WIP placeholder)
│   ├── reports.html                # Reports (WIP placeholder)
│   ├── users.html                  # User Management (WIP placeholder)
│   ├── fees.html                   # Fee Configuration (WIP placeholder)
│   ├── announcements.html          # Announcements (WIP placeholder)
│   ├── audit-logs.html             # Audit Logs (WIP placeholder)
│   └── settings.html               # System Settings (WIP placeholder)
│
├── super-admin/                    # Super Admin
│   ├── index.html                  # Super Admin Dashboard (WIP placeholder)
│   ├── organizations.html          # Organization Management (WIP placeholder)
│   ├── admins.html                 # Admin Management (WIP placeholder)
│   ├── monitoring.html             # System Monitoring (WIP placeholder)
│   ├── backup.html                 # Backup and Recovery (WIP placeholder)
│   └── global-settings.html        # Global Settings (WIP placeholder)
│
├── reports/                        # Reports Module
│   ├── financial-summary.html      # Financial Summary (WIP placeholder)
│   ├── cash-flow.html              # Cash Flow Reports (WIP placeholder)
│   ├── collections.html            # Collection Reports (WIP placeholder)
│   ├── outstanding.html            # Outstanding Balances (WIP placeholder)
│   └── contributions.html          # Class Contribution Reports (WIP placeholder)
│
└── assets/                         # Shared assets
    ├── css/
    │   ├── background.css          # Background-specific styles
    │   ├── main.css                # Main stylesheet
    │   ├── components.css          # Component styles (WIP placeholder)
    │   └── utilities.css           # Utility classes (WIP placeholder)
    ├── js/
    │   ├── main.js                 # Main JavaScript (WIP placeholder)
    │   ├── auth.js                 # Authentication logic (WIP placeholder)
    │   ├── dashboard.js            # Dashboard functionality (WIP placeholder)
    │   └── charts.js               # Chart configurations (WIP placeholder)
    └── images/
        ├── societech_logo.png      # Logo
        └── [other images]
```

## File Naming Conventions

- HTML files: `kebab-case.html`
- CSS files: `kebab-case.css`
- JavaScript files: `kebab-case.js`
- Images: `kebab-case.png/jpg`

## Page Routes Mapping

### Public Routes
- `/` → `public/index.html`
- `/about` → `public/about.html`
- `/contact` → `public/contact.html`
- `/help` → `public/help.html`

### Authentication Routes
- `/login` → `auth/login.html`
- `/register` → `auth/register.html`
- `/verify-email` → `auth/verify-email.html`
- `/forgot-password` → `auth/forgot-password.html`
- `/reset-password` → `auth/reset-password.html`

### Student Routes
- `/student` → `student/index.html`
- `/student/financial-records` → `student/financial-records.html`
- `/student/contributions` → `student/contributions.html`
- `/student/notifications` → `student/notifications.html`
- `/student/profile` → `student/profile.html`

### Treasurer Routes
- `/treasurer` → `treasurer/index.html`
- `/treasurer/payments` → `treasurer/payments.html`
- `/treasurer/cash-flow` → `treasurer/cash-flow.html`
- `/treasurer/reports` → `treasurer/reports.html`
- `/treasurer/verification` → `treasurer/verification.html`

### Admin Routes
- `/admin` → `admin/index.html`
- `/admin/classes` → `admin/classes.html`
- `/admin/payments` → `admin/payments.html`
- `/admin/verify` → `admin/verify.html`
- `/admin/cash-flow` → `admin/cash-flow.html`
- `/admin/reports` → `admin/reports.html`
- `/admin/users` → `admin/users.html`
- `/admin/fees` → `admin/fees.html`
- `/admin/announcements` → `admin/announcements.html`
- `/admin/audit-logs` → `admin/audit-logs.html`
- `/admin/settings` → `admin/settings.html`

### Super Admin Routes
- `/super-admin` → `super-admin/index.html`
- `/super-admin/organizations` → `super-admin/organizations.html`
- `/super-admin/admins` → `super-admin/admins.html`
- `/super-admin/monitoring` → `super-admin/monitoring.html`
- `/super-admin/backup` → `super-admin/backup.html`
- `/super-admin/global-settings` → `super-admin/global-settings.html`

### Reports Routes
- `/reports/financial-summary` → `reports/financial-summary.html`
- `/reports/cash-flow` → `reports/cash-flow.html`
- `/reports/collections` → `reports/collections.html`
- `/reports/outstanding` → `reports/outstanding.html`
- `/reports/contributions` → `reports/contributions.html`

## Component Reusability

### Shared Components
- Navigation/Sidebar
- Header with notifications
- Footer
- Modal dialogs
- Form components
- Table components
- Card components
- Status badges
- Charts (using Chart.js)

### Shared Styles
- Color scheme
- Typography
- Spacing system
- Button styles
- Form styles
- Table styles

## Data Flow

1. **Authentication Flow**
   - Login → Verify Credentials → Set Session → Redirect to Dashboard
   - Register → Validate → Send Verification Email → Verify → Login

2. **Payment Flow**
   - Student/Treasurer records payment → Pending verification → Admin approves/rejects → Update balance

3. **Report Generation**
   - Select filters → Query data → Generate report → Export (PDF/Excel)

4. **Notification Flow**
   - Event triggers → Create notification → Display to user → Mark as read

## Security Considerations

- All authentication pages should validate user sessions
- Role-based access control (RBAC) for different user types
- CSRF protection for forms
- Input validation and sanitization
- Secure password storage (hashing)
- Session management

## Future Enhancements

- Backend API integration
- Database schema design
- Real-time notifications
- Email service integration
- File upload functionality
- Advanced reporting features
- Mobile responsive design improvements
