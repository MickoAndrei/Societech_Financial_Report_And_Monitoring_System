<?php

namespace App\Controllers\Api;

use App\Controllers\BaseController;
use App\Models\AuditLogModel;
use App\Models\UserModel;

class UserController extends BaseController
{
    public function index()
    {
        $items = (new UserModel())
            ->where('organization_id', session()->get('org_id'))
            ->orderBy('last_name', 'ASC')
            ->findAll();

        return $this->response->setJSON(['data' => $items]);
    }

    public function create()
    {
        $data = $this->payload();
        $id = (new UserModel())->insert([
            'organization_id' => session()->get('org_id'),
            'student_no' => $data['student_no'] ?? null,
            'first_name' => $data['first_name'] ?? '',
            'last_name' => $data['last_name'] ?? '',
            'email' => $data['email'] ?? '',
            'phone' => $data['phone'] ?? null,
            'password_hash' => password_hash((string) ($data['password'] ?? 'societech123'), PASSWORD_DEFAULT),
            'role' => $data['role'] ?? 'student',
            'status' => $data['status'] ?? 'active',
        ]);

        (new AuditLogModel())->record('user.create', 'users', (int) $id);

        return $this->response->setStatusCode(201)->setJSON(['id' => $id]);
    }

    public function update(int $id)
    {
        $allowed = ['student_no', 'first_name', 'last_name', 'email', 'phone', 'role', 'avatar_path', 'status'];
        $data = array_intersect_key($this->payload(), array_flip($allowed));

        (new UserModel())->update($id, $data);
        (new AuditLogModel())->record('user.update', 'users', $id);

        return $this->response->setJSON(['success' => true]);
    }

    public function delete(int $id)
    {
        (new UserModel())->delete($id);
        (new AuditLogModel())->record('user.delete', 'users', $id);

        return $this->response->setJSON(['success' => true]);
    }

    private function payload(): array
    {
        return $this->request->getJSON(true) ?: $this->request->getPost();
    }
}
