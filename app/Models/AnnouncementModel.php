<?php

namespace App\Models;

class AnnouncementModel extends BaseSocietechModel
{
    protected $table = 'announcements';
    protected $allowedFields = [
        'organization_id',
        'title',
        'body',
        'audience',
        'posted_by',
        'posted_at',
        'ends_at',
        'is_active',
    ];
    protected $useSoftDeletes = true;

    public function getActive(int $orgId): array
    {
        return $this->where('organization_id', $orgId)
            ->where('is_active', 1)
            ->groupStart()
                ->where('ends_at IS NULL')
                ->orWhere('ends_at >=', date('Y-m-d H:i:s'))
            ->groupEnd()
            ->orderBy('posted_at', 'DESC')
            ->findAll(20);
    }
}
