<?php

namespace App\Controllers;

class PublicController extends BaseController
{
    public function index(): string { return view('pages/public/index'); }
    public function about(): string { return view('pages/public/about'); }
    public function contact(): string { return view('pages/public/contact'); }
    public function help(): string { return view('pages/public/help'); }
}
