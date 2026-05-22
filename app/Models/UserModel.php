<?php

namespace App\Models;

class UserModel extends BaseSocietechModel
{
    protected $table = 'users';
    protected $allowedFields = [
        'organization_id',
        'student_no',
        'first_name',
        'last_name',
        'email',
        'phone',
        'password_hash',
        'role',
        'avatar_path',
        'email_verified_at',
        'status',
        'last_login_at',
    ];
    protected $useSoftDeletes = true;

    public function findByEmail(string $email): ?array
    {
        return $this->where('email', $email)
            ->where('status', 'active')
            ->first();
    }

    public function getByRole(string $role, int $orgId): array
    {
        return $this->where('role', $role)
            ->where('organization_id', $orgId)
            ->findAll();
    }

    public function fullName(array $user): string
    {
        return trim(($user['first_name'] ?? '') . ' ' . ($user['last_name'] ?? ''));
    }
}
