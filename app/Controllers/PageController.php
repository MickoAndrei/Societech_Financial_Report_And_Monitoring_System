<?php

namespace App\Controllers;

use CodeIgniter\Exceptions\PageNotFoundException;

class PageController extends BaseController
{
    private array $defaultPages = [
        'public' => 'index',
        'auth' => 'login',
        'student' => 'index',
        'treasurer' => 'index',
        'admin' => 'dashboard',
        'super-admin' => 'index',
        'reports' => 'financial-summary',
    ];

    public function show(string $section = 'public', string $page = ''): string
    {
        $section = $this->cleanSegment($section);
        $page = $this->cleanPage($page ?: ($this->defaultPages[$section] ?? 'index'));

        $view = "pages/{$section}/{$page}";

        if (! is_file(APPPATH . 'Views/' . $view . '.php')) {
            throw PageNotFoundException::forPageNotFound($view);
        }

        return view($view);
    }

    private function cleanSegment(string $segment): string
    {
        $segment = trim($segment, '/');
        if (! preg_match('/^[a-z0-9-]+$/', $segment)) {
            throw PageNotFoundException::forPageNotFound($segment);
        }

        return $segment;
    }

    private function cleanPage(string $page): string
    {
        $page = trim($page, '/');
        $page = preg_replace('/\.html$/', '', $page) ?? '';

        if ($page === '' || ! preg_match('/^[a-z0-9-]+$/', $page)) {
            throw PageNotFoundException::forPageNotFound($page);
        }

        return $page;
    }
}
