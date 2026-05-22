<?php

namespace App\Models;

class FeeModel extends BaseSocietechModel
{
    protected $table = 'fees';
    protected $allowedFields = [
        'organization_id',
        'academic_year_id',
        'category_id',
        'section_id',
        'title',
        'description',
        'amount',
        'due_on',
        'scope',
        'status',
        'created_by',
    ];
    protected $useSoftDeletes = true;

    public function getActiveFees(int $orgId): array
    {
        return $this->where('organization_id', $orgId)
            ->whereIn('status', ['active', 'draft'])
            ->findAll();
    }

    public function getStudentFees(int $userId, int $orgId): array
    {
        return $this->db->query(
            "SELECT f.*, sfb.amount_paid, sfb.amount_due, sfb.status AS balance_status
             FROM fees f
             LEFT JOIN student_fee_balances sfb
                ON sfb.fee_id = f.id AND sfb.user_id = ?
             WHERE f.organization_id = ?
                AND f.status = 'active'
                AND f.deleted_at IS NULL
             ORDER BY f.due_on ASC",
            [$userId, $orgId]
        )->getResultArray();
    }
}
