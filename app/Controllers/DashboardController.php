<?php

namespace App\Controllers;

class DashboardController extends BaseController
{
    public function student()
    {
        return view('dashboards/student');
    }

    public function treasurer()
    {
        return view('dashboards/treasurer');
    }

    public function admin()
    {
        return view('dashboards/admin');
    }

    public function superAdmin()
    {
        return view('dashboards/super_admin');
    }
}
