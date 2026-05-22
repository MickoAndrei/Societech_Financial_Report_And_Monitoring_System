<?php

namespace App\Controllers\Api;

use App\Controllers\BaseController;
use App\Models\AnnouncementModel;
use App\Models\AuditLogModel;

class AnnouncementController extends BaseController
{
    public function index()
    {
        $items = (new AnnouncementModel())->getActive((int) session()->get('org_id'));

        return $this->response->setJSON(['data' => $items]);
    }

    public function create()
    {
        $data = $this->payload();
        $id = (new AnnouncementModel())->insert([
            'organization_id' => session()->get('org_id'),
            'title' => $data['title'] ?? '',
            'body' => $data['body'] ?? '',
            'audience' => $data['audience'] ?? 'all',
            'posted_by' => session()->get('user_id'),
            'posted_at' => date('Y-m-d H:i:s'),
            'ends_at' => $data['ends_at'] ?? null,
            'is_active' => $data['is_active'] ?? 1,
        ]);

        (new AuditLogModel())->record('announcement.create', 'announcements', (int) $id);

        return $this->response->setStatusCode(201)->setJSON(['id' => $id]);
    }

    public function update(int $id)
    {
        $allowed = ['title', 'body', 'audience', 'ends_at', 'is_active'];
        $data = array_intersect_key($this->payload(), array_flip($allowed));

        (new AnnouncementModel())->update($id, $data);
        (new AuditLogModel())->record('announcement.update', 'announcements', $id);

        return $this->response->setJSON(['success' => true]);
    }

    public function delete(int $id)
    {
        (new AnnouncementModel())->delete($id);
        (new AuditLogModel())->record('announcement.delete', 'announcements', $id);

        return $this->response->setJSON(['success' => true]);
    }

    private function payload(): array
    {
        return $this->request->getJSON(true) ?: $this->request->getPost();
    }
}
