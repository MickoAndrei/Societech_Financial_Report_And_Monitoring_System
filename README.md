# Societech Financial Report and Monitoring System

A comprehensive financial management system for educational organizations to track student payments, manage class contributions, and monitor financial records.

## Project Structure

```
Societech Financial And Monitoring/
├── public/              # Public pages (Home, About, Contact, Help)
├── auth/                # Authentication pages (Login, Register, Password Reset)
├── student/             # Student Dashboard and features
├── treasurer/           # Classroom Treasurer Dashboard
├── admin/               # Admin/Moderator Dashboard
├── super-admin/         # Super Admin Dashboard
├── reports/             # Reports module
├── assets/
│   ├── css/            # Shared stylesheets
│   ├── js/             # Shared JavaScript files
│   └── images/         # Images and logos
└── README.md
```

## System Sitemap

### 1. HOME PAGE
- System Overview
- Announcements
- Quick Links
- Login / Register
- Contact Information

### 2. PUBLIC PAGES
- About the System
- Contact Information
- System Guide / Help

### 3. AUTHENTICATION
- Login
- Register
- Email Verification
- Forgot Password
- Reset Password
- Logout

### 4. STUDENT DASHBOARD
- **Dashboard**: Overview, Balance Summary, Recent Transactions, Announcements
- **My Financial Records**: Current Balance, Payment History, Fee Breakdown, Pending Payments
- **Cash Contributions**: Class Contributions, Organizational Contributions
- **Notifications**: Payment Reminders, Announcements, Verification Status
- **Profile**: Personal Information, Change Password, Notification Settings

### 5. CLASSROOM TREASURER (SPECIAL ROLE)
- **Dashboard**: Class Financial Overview, Collection Progress, Recent Payments
- **Student Payments**: Record Payment, Mark Student as Paid, View Student Balance
- **Class Cash Flow**: Cash Inflows (Collections), Cash Outflows (Class Expenses)
- **Class Reports**: Payment Summary, Collection Report, Student Balance List
- **Payment Verification**: Submit Records for Approval, View Verification Status

### 6. SOCIATECH MODERATOR / ADMIN DASHBOARD
- **Dashboard**: Organization Financial Overview, Total Collections, Total Expenses, Financial Statistics
- **All Classes**: View Classes, Class Financial Status, Class Balance Summary
- **Payment Records**: All Transactions, Filter by Class, Filter by Date, Payment Logs
- **Verify Records**: Pending Treasurer Submissions, Approve Payment Records, Reject Payment Records, View Verification History
- **Cash Flow Management**: Cash Inflows, Cash Outflows, Organizational Expenses
- **Reports**: Financial Reports, Collection Reports, Expense Reports, Class Performance Reports
- **User Management**: View Students, Assign Roles, Tag Classroom Treasurer, Suspend Accounts
- **Fee Configuration**: Set Organization Fees, Set Class Fees, Update Fee Structure
- **Announcements**: Post Announcements, Edit Announcements, Delete Announcements
- **Audit Logs**: User Activity Logs, Payment Changes, Verification Logs
- **System Settings**: Organization Information, Academic Year Setup, Notification Settings

### 7. SUPER ADMIN
- **Super Admin Dashboard**: System Overview, Total Users, System Activity
- **Organization Management**: Manage Organizations, Create Organization, Assign Moderators
- **Admin Management**: Create Admin Accounts, Remove Admin, Manage Permissions
- **System Monitoring**: Server Logs, Security Logs, Error Logs
- **Backup and Recovery**: Database Backup, Restore System Data
- **Global Settings**: System Configuration, Access Control Settings, Maintenance Mode

### 8. REPORTS MODULE
- Financial Summary
- Cash Flow Reports
- Collection Reports
- Outstanding Balances
- Class Contribution Reports
- Export Reports (PDF / Excel)

### 9. NOTIFICATIONS SYSTEM
- Payment Reminders
- Approval Notifications
- Announcement Notifications
- System Alerts

### 10. LOGS AND MONITORING
- Activity Logs
- Payment Logs
- Verification Logs
- System Logs

## Technologies Used
- HTML5
- CSS3
- JavaScript
- Chart.js (for data visualization)

## Getting Started

1. Clone the repository
2. Open the desired page in a web browser
3. For development, use a local server (e.g., Live Server extension in VS Code)

## License
MIT License
