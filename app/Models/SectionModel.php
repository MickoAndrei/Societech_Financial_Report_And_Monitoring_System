<?php

namespace App\Models;

class SectionModel extends BaseSocietechModel
{
    protected $table = 'sections';
    protected $allowedFields = [
        'organization_id',
        'program',
        'year_level',
        'section_name',
        'treasurer_id',
        'status',
    ];
    protected $useSoftDeletes = true;

    public function getWithTreasurer(int $orgId): array
    {
        return $this->db->table('sections s')
            ->select('s.*, u.first_name, u.last_name, u.email AS treasurer_email')
            ->join('users u', 'u.id = s.treasurer_id', 'left')
            ->where('s.organization_id', $orgId)
            ->where('s.status', 'active')
            ->where('s.deleted_at', null)
            ->get()
            ->getResultArray();
    }
}
