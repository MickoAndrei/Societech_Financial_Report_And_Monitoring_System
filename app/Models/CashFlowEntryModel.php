<?php

namespace App\Models;

class CashFlowEntryModel extends BaseSocietechModel
{
    protected $table = 'cash_flow_entries';
    protected $allowedFields = [
        'organization_id',
        'section_id',
        'type',
        'scope',
        'category',
        'description',
        'amount',
        'occurred_on',
        'payment_id',
        'recorded_by',
    ];
    protected $useSoftDeletes = true;

    public function getSummary(int $orgId): array
    {
        $result = $this->db->query(
            "SELECT
                SUM(CASE WHEN type = 'inflow' THEN amount ELSE 0 END) AS total_in,
                SUM(CASE WHEN type = 'outflow' THEN amount ELSE 0 END) AS total_out
             FROM cash_flow_entries
             WHERE organization_id = ? AND deleted_at IS NULL",
            [$orgId]
        )->getRowArray();

        $totalIn = (float) ($result['total_in'] ?? 0);
        $totalOut = (float) ($result['total_out'] ?? 0);

        return [
            'total_in' => $totalIn,
            'total_out' => $totalOut,
            'net' => $totalIn - $totalOut,
        ];
    }
}
