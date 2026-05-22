<?php

namespace App\Controllers;

use App\Models\AnnouncementModel;
use App\Models\AuditLogModel;
use App\Models\CashFlowEntryModel;
use App\Models\FeeModel;
use App\Models\PaymentModel;
use App\Models\SectionModel;
use App\Models\UserModel;

class AdminController extends BaseController
{
    public function dashboard(): string
    {
        $orgId = (int) session()->get('org_id');

        return view('pages/admin/dashboard', [
            'totalCollections' => (new PaymentModel())->getTotalCollected($orgId),
            'pendingCount' => count((new PaymentModel())->getPending($orgId)),
            'activeClasses' => count((new SectionModel())->getWithTreasurer($orgId)),
            'totalStudents' => count((new UserModel())->getByRole('student', $orgId)),
            'cashSummary' => (new CashFlowEntryModel())->getSummary($orgId),
        ]);
    }

    public function allClasses(): string { return view('pages/admin/all-classes', ['sections' => (new SectionModel())->getWithTreasurer((int) session()->get('org_id'))]); }
    public function payments(): string { return view('pages/admin/payments', ['payments' => (new PaymentModel())->where('organization_id', session()->get('org_id'))->findAll()]); }
    public function verify(): string { return view('pages/admin/verify', ['pending' => (new PaymentModel())->getPending((int) session()->get('org_id'))]); }
    public function cashFlow(): string { return view('pages/admin/cash-flow', ['entries' => (new CashFlowEntryModel())->where('organization_id', session()->get('org_id'))->orderBy('occurred_on', 'DESC')->findAll()]); }
    public function reports(): string { return view('pages/admin/reports'); }
    public function fees(): string { return view('pages/admin/fees', ['fees' => (new FeeModel())->getActiveFees((int) session()->get('org_id'))]); }
    public function section(): string { return view('pages/admin/section'); }
    public function announcements(): string { return view('pages/admin/announcements', ['announcements' => (new AnnouncementModel())->getActive((int) session()->get('org_id'))]); }
    public function auditLogs(): string { return view('pages/admin/audit-logs', ['logs' => (new AuditLogModel())->orderBy('created_at', 'DESC')->findAll(200)]); }
    public function users(): string { return view('pages/admin/users', ['users' => (new UserModel())->where('organization_id', session()->get('org_id'))->findAll()]); }
    public function settings(): string { return view('pages/admin/settings'); }
    public function settingsPost() { return redirect()->back()->with('success', 'Settings saved.'); }
}
