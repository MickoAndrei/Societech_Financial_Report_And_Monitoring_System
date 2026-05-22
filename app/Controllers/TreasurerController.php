<?php

namespace App\Controllers;

class TreasurerController extends BaseController
{
    public function dashboard()
    {
        return redirect()->to($this->studentTreasurerRoute());
    }

    public function payments()
    {
        return redirect()->to('/student/societech-payments');
    }

    public function verification()
    {
        return redirect()->to('/admin/verify');
    }

    public function cashFlow()
    {
        return redirect()->to('/student/financial-records');
    }

    public function reports()
    {
        return redirect()->to('/student/contributions');
    }

    private function studentTreasurerRoute(): string
    {
        return session()->get('treasurer_scope') === 'societech'
            ? '/student/societech-dashboard'
            : '/student/class-roster';
    }
}
