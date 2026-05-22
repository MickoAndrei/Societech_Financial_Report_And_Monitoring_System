<?php

namespace App\Filters;

use CodeIgniter\Filters\FilterInterface;
use CodeIgniter\HTTP\RequestInterface;
use CodeIgniter\HTTP\ResponseInterface;

class AuthFilter implements FilterInterface
{
    public function before(RequestInterface $request, $arguments = null)
    {
        if (! session()->get('user_id')) {
            if ($request->isAJAX() || str_starts_with($request->getPath(), 'api/')) {
                return service('response')->setStatusCode(401)->setJSON(['error' => 'Unauthenticated']);
            }

            return redirect()->to(site_url('login'))->with('error', 'Please log in to continue.');
        }

        if ($arguments !== null && $arguments !== []) {
            $role = (string) session()->get('user_role');
            if (! in_array($role, $arguments, true)) {
                return redirect()->to(site_url('/'))->with('error', 'Access denied.');
            }
        }
    }

    public function after(RequestInterface $request, ResponseInterface $response, $arguments = null)
    {
    }
}