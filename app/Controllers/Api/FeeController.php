<?php

namespace App\Controllers\Api;

use App\Controllers\BaseController;
use App\Models\AuditLogModel;
use App\Models\FeeModel;

class FeeController extends BaseController
{
    public function index()
    {
        $items = (new FeeModel())->getActiveFees((int) session()->get('org_id'));

        return $this->response->setJSON(['data' => $items]);
    }

    public function create()
    {
        $data = $this->payload();
        $id = (new FeeModel())->insert([
            'organization_id' => session()->get('org_id'),
            'academic_year_id' => $data['academic_year_id'] ?? null,
            'category_id' => $data['category_id'] ?? null,
            'section_id' => $data['section_id'] ?? null,
            'title' => $data['title'] ?? '',
            'description' => $data['description'] ?? null,
            'amount' => $data['amount'] ?? 0,
            'due_on' => $data['due_on'] ?? null,
            'scope' => $data['scope'] ?? 'organization',
            'status' => $data['status'] ?? 'active',
            'created_by' => session()->get('user_id'),
        ]);

        (new AuditLogModel())->record('fee.create', 'fees', (int) $id);

        return $this->response->setStatusCode(201)->setJSON(['id' => $id]);
    }

    public function update(int $id)
    {
        $allowed = ['academic_year_id', 'category_id', 'section_id', 'title', 'description', 'amount', 'due_on', 'scope', 'status'];
        $data = array_intersect_key($this->payload(), array_flip($allowed));

        (new FeeModel())->update($id, $data);
        (new AuditLogModel())->record('fee.update', 'fees', $id);

        return $this->response->setJSON(['success' => true]);
    }

    public function delete(int $id)
    {
        (new FeeModel())->delete($id);
        (new AuditLogModel())->record('fee.delete', 'fees', $id);

        return $this->response->setJSON(['success' => true]);
    }

    private function payload(): array
    {
        return $this->request->getJSON(true) ?: $this->request->getPost();
    }
}
