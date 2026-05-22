<?php

namespace App\Controllers;

class SuperAdminController extends BaseController
{
    public function dashboard(): string { return view('pages/super-admin/index'); }
    public function organizations(): string { return view('pages/super-admin/organizations'); }
    public function admins(): string { return view('pages/super-admin/admins'); }
    public function monitoring(): string { return view('pages/super-admin/monitoring'); }
    public function globalSettings(): string { return view('pages/super-admin/global-settings'); }
    public function backup(): string { return view('pages/super-admin/backup'); }
}
