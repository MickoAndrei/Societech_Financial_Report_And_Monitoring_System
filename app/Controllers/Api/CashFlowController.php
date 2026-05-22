<?php

namespace App\Controllers\Api;

use App\Controllers\BaseController;
use App\Models\AuditLogModel;
use App\Models\CashFlowEntryModel;

class CashFlowController extends BaseController
{
    public function index()
    {
        $items = (new CashFlowEntryModel())
            ->where('organization_id', session()->get('org_id'))
            ->orderBy('occurred_on', 'DESC')
            ->findAll();

        return $this->response->setJSON(['data' => $items]);
    }

    public function create()
    {
        $data = $this->payload();
        $id = (new CashFlowEntryModel())->insert([
            'organization_id' => session()->get('org_id'),
            'section_id' => $data['section_id'] ?? null,
            'type' => $data['type'] ?? 'inflow',
            'scope' => $data['scope'] ?? 'organization',
            'category' => $data['category'] ?? 'General',
            'description' => $data['description'] ?? null,
            'amount' => $data['amount'] ?? 0,
            'occurred_on' => $data['occurred_on'] ?? date('Y-m-d'),
            'payment_id' => $data['payment_id'] ?? null,
            'recorded_by' => session()->get('user_id'),
        ]);

        (new AuditLogModel())->record('cash_flow.create', 'cash_flow_entries', (int) $id);

        return $this->response->setStatusCode(201)->setJSON(['id' => $id]);
    }

    public function update(int $id)
    {
        $allowed = ['section_id', 'type', 'scope', 'category', 'description', 'amount', 'occurred_on', 'payment_id'];
        $data = array_intersect_key($this->payload(), array_flip($allowed));

        (new CashFlowEntryModel())->update($id, $data);
        (new AuditLogModel())->record('cash_flow.update', 'cash_flow_entries', $id);

        return $this->response->setJSON(['success' => true]);
    }

    public function delete(int $id)
    {
        (new CashFlowEntryModel())->delete($id);
        (new AuditLogModel())->record('cash_flow.delete', 'cash_flow_entries', $id);

        return $this->response->setJSON(['success' => true]);
    }

    private function payload(): array
    {
        return $this->request->getJSON(true) ?: $this->request->getPost();
    }
}
