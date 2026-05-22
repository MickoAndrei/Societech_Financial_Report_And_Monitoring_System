<?php

use CodeIgniter\Router\RouteCollection;

/**
 * @var RouteCollection $routes
 */
// Root route - public homepage
$routes->get('/', 'PageController::show/public/index');

// Authentication routes
$routes->get('login', 'AuthController::loginPage', ['filter' => 'guest']);
$routes->post('login', 'AuthController::loginPost', ['filter' => 'guest']);
$routes->get('admin-login', 'AuthController::adminLoginPage', ['filter' => 'guest']);
$routes->post('admin-login', 'AuthController::adminLoginPost', ['filter' => 'guest']);
$routes->get('register', 'AuthController::registerPage', ['filter' => 'guest']);
$routes->post('register', 'AuthController::registerPost', ['filter' => 'guest']);
$routes->get('auth/logout', 'AuthController::logout');
// FIX: Added 'auth' filter to auth/me so unauthenticated requests get a clean
// 401 JSON response instead of a redirect that confuses the JS session checker.
$routes->get('auth/me', 'AuthController::me', ['filter' => 'auth']);
$routes->get('auth/forgot-password', 'AuthController::forgotPage', ['filter' => 'guest']);
$routes->post('auth/forgot-password', 'AuthController::forgotPost', ['filter' => 'guest']);
$routes->get('auth/reset-password', 'AuthController::resetPage', ['filter' => 'guest']);
$routes->post('auth/reset-password', 'AuthController::resetPost', ['filter' => 'guest']);
$routes->get('auth/verify-email', 'AuthController::verifyEmailPage', ['filter' => 'guest']);

$routes->group('student', ['filter' => 'auth:student,treasurer,admin,super_admin'], static function ($routes) {
    $routes->get('/', 'StudentController::dashboard');
    $routes->get('financial-records', 'StudentController::financialRecords');
    $routes->get('contributions', 'StudentController::contributions');
    $routes->get('class-roster', 'StudentController::classRoster');
    $routes->get('notifications', 'StudentController::notifications');
    $routes->get('profile', 'StudentController::profile');
    $routes->get('settings', 'StudentController::settings');
    $routes->post('settings', 'StudentController::settingsPost');
    $routes->get('societech-dashboard', 'StudentController::societechDashboard');
    $routes->get('societech-all-classes', 'StudentController::societechAllClasses');
    $routes->get('societech-section-roster', 'StudentController::societechSectionRoster');
    $routes->get('societech-payments', 'StudentController::societechPayments');
});

$routes->group('treasurer', ['filter' => 'auth:treasurer,admin,super_admin'], static function ($routes) {
    $routes->get('/', 'TreasurerController::dashboard');
    $routes->get('payments', 'TreasurerController::payments');
    $routes->get('verification', 'TreasurerController::verification');
    $routes->get('cash-flow', 'TreasurerController::cashFlow');
    $routes->get('reports', 'TreasurerController::reports');
});

$routes->group('admin', ['filter' => 'auth:admin,super_admin'], static function ($routes) {
    $routes->get('/', 'AdminController::dashboard');
    $routes->get('dashboard', 'AdminController::dashboard');
    $routes->get('all-classes', 'AdminController::allClasses');
    $routes->get('payments', 'AdminController::payments');
    $routes->get('verify', 'AdminController::verify');
    $routes->get('cash-flow', 'AdminController::cashFlow');
    $routes->get('reports', 'AdminController::reports');
    $routes->get('fees', 'AdminController::fees');
    $routes->get('section', 'AdminController::section');
    $routes->get('announcements', 'AdminController::announcements');
    $routes->get('audit-logs', 'AdminController::auditLogs');
    $routes->get('users', 'AdminController::users');
    $routes->get('settings', 'AdminController::settings');
    $routes->post('settings', 'AdminController::settingsPost');
});

$routes->group('super-admin', ['filter' => 'auth:super_admin'], static function ($routes) {
    $routes->get('/', 'SuperAdminController::dashboard');
    $routes->get('organizations', 'SuperAdminController::organizations');
    $routes->get('admins', 'SuperAdminController::admins');
    $routes->get('monitoring', 'SuperAdminController::monitoring');
    $routes->get('global-settings', 'SuperAdminController::globalSettings');
    $routes->get('backup', 'SuperAdminController::backup');
});

$routes->group('reports', ['filter' => 'auth:treasurer,admin,super_admin'], static function ($routes) {
    $routes->get('financial-summary', 'ReportController::financialSummary');
    $routes->get('collections', 'ReportController::collections');
    $routes->get('contributions', 'ReportController::contributions');
    $routes->get('cash-flow', 'ReportController::cashFlow');
    $routes->get('outstanding', 'ReportController::outstanding');
});

$routes->group('api', ['filter' => 'auth'], static function ($routes) {
    $routes->get('announcements', 'Api\AnnouncementController::index');
    $routes->post('announcements', 'Api\AnnouncementController::create');
    $routes->put('announcements/(:num)', 'Api\AnnouncementController::update/$1');
    $routes->delete('announcements/(:num)', 'Api\AnnouncementController::delete/$1');
    $routes->get('fees', 'Api\FeeController::index');
    $routes->post('fees', 'Api\FeeController::create');
    $routes->put('fees/(:num)', 'Api\FeeController::update/$1');
    $routes->delete('fees/(:num)', 'Api\FeeController::delete/$1');
    $routes->get('payments', 'Api\PaymentController::index');
    $routes->post('payments', 'Api\PaymentController::create');
    $routes->put('payments/(:num)', 'Api\PaymentController::update/$1');
    $routes->delete('payments/(:num)', 'Api\PaymentController::delete/$1');
    $routes->get('sections', 'Api\SectionController::index');
    $routes->get('sections/(:num)', 'Api\SectionController::show/$1');
    $routes->get('sections/(:num)/roster', 'Api\SectionController::roster/$1');
    $routes->get('users', 'Api\UserController::index');
    $routes->post('users', 'Api\UserController::create');
    $routes->put('users/(:num)', 'Api\UserController::update/$1');
    $routes->delete('users/(:num)', 'Api\UserController::delete/$1');
    $routes->get('cash-flow', 'Api\CashFlowController::index');
    $routes->post('cash-flow', 'Api\CashFlowController::create');
    $routes->put('cash-flow/(:num)', 'Api\CashFlowController::update/$1');
    $routes->delete('cash-flow/(:num)', 'Api\CashFlowController::delete/$1');
    $routes->get('notifications', 'Api\NotificationController::index');
    $routes->put('notifications/(:num)/read', 'Api\NotificationController::markRead/$1');
});

// Page routes converted from the legacy folder structure.
// Auth pages are for guests only (login, register, forgot password, etc.)
$routes->get('auth/(:segment)', 'PageController::show/auth/$1', ['filter' => 'guest']);

// Public pages - only allow specific public informational pages
$routes->get('about', 'PageController::show/public/about');
$routes->get('contact', 'PageController::show/public/contact');
$routes->get('help', 'PageController::show/public/help');

// Explicitly block access to /public/student (and other protected sections) without authentication
$routes->get('public/student', 'PageController::show/public/student', ['filter' => 'auth']);
$routes->get('public/student/(:any)', 'PageController::show/public/student/$1', ['filter' => 'auth']);

// Catch-all for any other public pages requires authentication
$routes->get('public/(:segment)', 'PageController::show/public/$1', ['filter' => 'auth']);
