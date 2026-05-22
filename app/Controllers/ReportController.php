<?php

namespace App\Controllers;

class ReportController extends BaseController
{
    public function financialSummary(): string { return view('pages/reports/financial-summary'); }
    public function collections(): string { return view('pages/reports/collections'); }
    public function contributions(): string { return view('pages/reports/contributions'); }
    public function cashFlow(): string { return view('pages/reports/cash-flow'); }
    public function outstanding(): string { return view('pages/reports/outstanding'); }
}
