<?php

namespace App\Models;

class PaymentModel extends BaseSocietechModel
{
    protected $table = 'payments';
    protected $allowedFields = [
        'organization_id',
        'fee_id',
        'student_id',
        'section_id',
        'recorded_by',
        'verified_by',
        'reference_no',
        'payment_method',
        'amount',
        'paid_at',
        'status',
        'remarks',
    ];
    protected $useSoftDeletes = true;

    public function getPending(int $orgId): array
    {
        return $this->where('organization_id', $orgId)
            ->where('status', 'pending')
            ->findAll();
    }

    public function getTotalCollected(int $orgId): float
    {
        $result = $this->selectSum('amount')
            ->where('organization_id', $orgId)
            ->where('status', 'approved')
            ->first();

        return (float) ($result['amount'] ?? 0);
    }
}
