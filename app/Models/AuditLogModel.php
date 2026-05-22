<?php

namespace App\Models;

class AuditLogModel extends BaseSocietechModel
{
    protected $table = 'audit_logs';
    protected $useTimestamps = false;
    protected $allowedFields = [
        'organization_id',
        'actor_id',
        'action',
        'entity_type',
        'entity_id',
        'ip_address',
        'user_agent',
        'metadata',
        'created_at',
    ];

    public function record(string $action, string $entityType = '', int $entityId = 0, array $meta = []): void
    {
        $request = service('request');

        $this->insert([
            'organization_id' => session()->get('org_id'),
            'actor_id' => session()->get('user_id'),
            'action' => $action,
            'entity_type' => $entityType ?: null,
            'entity_id' => $entityId ?: null,
            'ip_address' => $request->getIPAddress(),
            'user_agent' => $request->getUserAgent()->getAgentString(),
            'metadata' => $meta === [] ? null : json_encode($meta),
            'created_at' => date('Y-m-d H:i:s'),
        ]);
    }
}
