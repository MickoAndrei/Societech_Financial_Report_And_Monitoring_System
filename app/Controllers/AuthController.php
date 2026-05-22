<?php

namespace App\Controllers;

use App\Models\UserModel;

class AuthController extends BaseController
{
    public function loginPage(): string
    {
        return view('pages/auth/login');
    }

    public function adminLoginPage(): string
    {
        return view('pages/auth/admin-login');
    }

    public function loginPost()
    {
        return $this->handleLogin('/login');
    }

    public function adminLoginPost()
    {
        return $this->handleLogin('/admin-login', ['admin', 'super_admin']);
    }

    public function logout()
    {
        session()->destroy();

        return redirect()->to(site_url('login'));
    }

    public function me()
    {
        $role = (string) session()->get('user_role');
        if ($role === 'treasurer') {
            $role = session()->get('treasurer_scope') === 'societech'
                ? 'societechTreasurer'
                : 'classTreasurer';
        }

        return $this->response->setJSON([
            'id' => session()->get('user_id'),
            'role' => $role,
            'email' => session()->get('user_email'),
            'name' => session()->get('user_name'),
            'class_key' => session()->get('class_key'),
            'organization_id' => session()->get('org_id'),
        ]);
    }

    public function registerPage(): string
    {
        return view('pages/auth/register');
    }

    public function registerPost()
    {
        $rules = [
            'first_name' => 'required|min_length[2]',
            'last_name' => 'required|min_length[2]',
            'email' => 'required|valid_email|is_unique[users.email]',
            'password' => 'required|min_length[8]',
        ];

        if (! $this->validate($rules)) {
            return redirect()->back()->withInput()->with('errors', $this->validator->getErrors());
        }

        (new UserModel())->insert([
            'organization_id' => 1,
            'first_name' => $this->request->getPost('first_name'),
            'last_name' => $this->request->getPost('last_name'),
            'email' => $this->request->getPost('email'),
            'student_no' => $this->request->getPost('student_no') ?: null,
            'password_hash' => password_hash((string) $this->request->getPost('password'), PASSWORD_DEFAULT),
            'role' => 'student',
            'status' => 'pending',
        ]);

        return redirect()->to(site_url('login'))->with('success', 'Account created. Awaiting activation.');
    }

    public function forgotPage(): string
    {
        return view('pages/auth/forgot-password');
    }

    public function forgotPost()
    {
        return redirect()->back()->with('success', 'If that account exists, reset instructions will be sent.');
    }

    public function resetPage(): string
    {
        return view('pages/auth/reset-password');
    }

    public function resetPost()
    {
        return redirect()->to(site_url('login'))->with('success', 'Password reset request received.');
    }

    public function verifyEmailPage(): string
    {
        return view('pages/auth/verify-email');
    }

    private function handleLogin(string $fallback, array $allowedRoles = [])
    {
        $email = (string) $this->request->getPost('email');
        $password = (string) $this->request->getPost('password');
        $user = (new UserModel())->where('email', $email)->first();

        if (! $user || ! password_verify($password, $user['password_hash'])) {
            return redirect()->to(site_url(ltrim($fallback, '/')))->withInput()->with('error', 'Invalid email or password.');
        }

        if (($user['status'] ?? '') !== 'active') {
            return redirect()->to(site_url(ltrim($fallback, '/')))->withInput()->with('error', 'Your account is not active.');
        }

        if ($allowedRoles !== [] && ! in_array($user['role'], $allowedRoles, true)) {
            return redirect()->to(site_url(ltrim($fallback, '/')))->with('error', 'Use the correct portal for your account.');
        }

        $this->setSession($user);
        (new UserModel())->update($user['id'], ['last_login_at' => date('Y-m-d H:i:s')]);

        return redirect()->to($this->dashboardFor($user));
    }

    private function setSession(array $user): void
    {
        session()->set([
            'user_id' => $user['id'],
            'user_role' => $user['role'],
            'user_email' => $user['email'],
            'user_name' => trim($user['first_name'] . ' ' . $user['last_name']),
            'org_id' => $user['organization_id'],
            'student_no' => $user['student_no'] ?? null,
            'treasurer_scope' => $this->treasurerScope($user),
            'class_key' => $this->classKeyForUser((int) $user['id']),
        ]);
    }

    private function dashboardFor(array $user): string
    {
        return match ($user['role']) {
            'super_admin' => site_url('super-admin'),
            'admin'       => site_url('admin'),
            'treasurer'   => $this->treasurerScope($user) === 'societech'
                ? site_url('student/societech-dashboard')
                : site_url('student/class-roster'),
            default       => site_url('student'),
        };
    }

    private function treasurerScope(array $user): string
    {
        if (($user['role'] ?? '') !== 'treasurer') {
            return '';
        }

        $studentNo = strtoupper((string) ($user['student_no'] ?? ''));

        return str_starts_with($studentNo, 'SOC-TRES') ? 'societech' : 'classroom';
    }

    private function classKeyForUser(int $userId): string
    {
        $section = db_connect()->table('section_members sm')
            ->select('s.program, s.year_level, s.section_name')
            ->join('sections s', 's.id = sm.section_id')
            ->where('sm.user_id', $userId)
            ->where('sm.is_current', 1)
            ->get()
            ->getRowArray();

        if (! $section) {
            return '';
        }

        return strtoupper(preg_replace(
            '/[^A-Z0-9]/',
            '',
            ($section['program'] ?? '') . ($section['year_level'] ?? '') . ($section['section_name'] ?? '')
        ) ?? '');
    }
}