<?php

namespace App\Controllers;

use App\Models\FeeModel;
use App\Models\NotificationModel;
use App\Models\SectionModel;

class StudentController extends BaseController
{
    public function dashboard(): string
    {
        return view('pages/student/index', ['fees' => $this->studentFees()]);
    }

    public function financialRecords(): string
    {
        return view('pages/student/financial-records', ['fees' => $this->studentFees()]);
    }

    public function contributions(): string { return view('pages/student/contributions'); }
    public function classRoster(): string { return view('pages/student/class-roster'); }

    public function notifications(): string
    {
        $items = (new NotificationModel())->getUnread((int) session()->get('user_id'));
        return view('pages/student/notifications', ['notifications' => $items]);
    }

    public function profile(): string { return view('pages/student/profile'); }
    public function settings(): string { return view('pages/student/settings'); }
    public function settingsPost() { return redirect()->back()->with('success', 'Settings saved.'); }

    public function societechDashboard(): string
    {
        return view('pages/student/societech-dashboard', ['sections' => $this->sections()]);
    }

    public function societechAllClasses(): string
    {
        return view('pages/student/societech-all-classes', ['sections' => $this->sections()]);
    }

    public function societechSectionRoster(): string { return view('pages/student/societech-section-roster'); }
    public function societechPayments(): string { return view('pages/student/societech-payments'); }

    private function studentFees(): array
    {
        return (new FeeModel())->getStudentFees((int) session()->get('user_id'), (int) session()->get('org_id'));
    }

    private function sections(): array
    {
        return (new SectionModel())->getWithTreasurer((int) session()->get('org_id'));
    }
}
