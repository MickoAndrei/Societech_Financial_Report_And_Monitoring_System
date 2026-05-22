<?php

namespace App\Models;

class NotificationModel extends BaseSocietechModel
{
    protected $table = 'notifications';
    protected $allowedFields = [
        'organization_id',
        'user_id',
        'type',
        'title',
        'message',
        'data',
        'read_at',
    ];

    public function getUnread(int $userId): array
    {
        return $this->where('user_id', $userId)
            ->where('read_at IS NULL')
            ->orderBy('created_at', 'DESC')
            ->findAll(50);
    }
}
