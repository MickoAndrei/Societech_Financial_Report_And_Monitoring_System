# Project Structure Documentation

## Directory Structure

```
Societech Financial And Monitoring/
│
├── public/                          # Public-facing pages
│   ├── index.html                  # Home page
│   ├── about.html                  # About the system
│   ├── contact.html                # Contact information
│   └── help.html                   # System guide/help
│
├── auth/                           # Authentication pages
│   ├── login.html                  # Login page
│   ├── register.html               # Registration page
│   ├── verify-email.html           # Email verification
│   ├── forgot-password.html        # Forgot password
│   └── reset-password.html         # Reset password
│
├── student/                        # Student dashboard
│   ├── index.html                  # Student dashboard home
│   ├── financial-records.html      # My Financial Records
│   ├── contributions.html          # Cash Contributions
│   ├── notifications.html          # Notifications
│   └── profile.html                # Profile settings
│
├── treasurer/                      # Classroom Treasurer
│   ├── index.html                  # Treasurer dashboard
│   ├── payments.html               # Student Payments
│   ├── cash-flow.html              # Class Cash Flow
│   ├── reports.html                # Class Reports
│   └── verification.html           # Payment Verification
│
├── admin/                          # Admin/Moderator Dashboard
│   ├── index.html                  # Admin dashboard (existing)
│   ├── classes.html                # All Classes
│   ├── payments.html               # Payment Records
│   ├── verify.html                 # Verify Records
│   ├── cash-flow.html              # Cash Flow Management
│   ├── reports.html                # Reports
│   ├── users.html                  # User Management
│   ├── fees.html                   # Fee Configuration
│   ├── announcements.html          # Announcements
│   ├── audit-logs.html             # Audit Logs
│   └── settings.html               # System Settings
│
├── super-admin/                    # Super Admin
│   ├── index.html                  # Super Admin Dashboard
│   ├── organizations.html          # Organization Management
│   ├── admins.html                 # Admin Management
│   ├── monitoring.html             # System Monitoring
│   ├── backup.html                 # Backup and Recovery
│   └── global-settings.html        # Global Settings
│
├── reports/                        # Reports Module
│   ├── financial-summary.html      # Financial Summary
│   ├── cash-flow.html              # Cash Flow Reports
│   ├── collections.html            # Collection Reports
│   ├── outstanding.html            # Outstanding Balances
│   └── contributions.html          # Class Contribution Reports
│
└── assets/                         # Shared assets
    ├── css/
    │   ├── main.css                # Main stylesheet
    │   ├── components.css          # Component styles
    │   └── utilities.css           # Utility classes
    ├── js/
    │   ├── main.js                 # Main JavaScript
    │   ├── auth.js                 # Authentication logic
    │   ├── dashboard.js            # Dashboard functionality
    │   └── charts.js               # Chart configurations
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
