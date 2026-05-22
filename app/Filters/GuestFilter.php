<?php

namespace App\Filters;

use CodeIgniter\Filters\FilterInterface;
use CodeIgniter\HTTP\RequestInterface;
use CodeIgniter\HTTP\ResponseInterface;

class GuestFilter implements FilterInterface
{
    public function before(RequestInterface $request, $arguments = null)
    {
        if (session()->get('user_id')) {
            return redirect()->to($this->dashboardFor(
                (string) session()->get('user_role'),
                (string) session()->get('treasurer_scope')
            ));
        }
    }

    public function after(RequestInterface $request, ResponseInterface $response, $arguments = null)
    {
    }

    private function dashboardFor(string $role, string $treasurerScope = ''): string
    {
        return match ($role) {
            'super_admin' => site_url('super-admin'),
            'admin'       => site_url('admin'),
            'treasurer'   => $treasurerScope === 'societech'
                ? site_url('student/societech-dashboard')
                : site_url('student/class-roster'),
            default       => site_url('student'),
        };
    }
}