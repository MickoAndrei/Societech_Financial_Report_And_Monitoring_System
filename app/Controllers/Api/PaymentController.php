<?php

namespace App\Controllers\Api;

use App\Controllers\BaseController;
use App\Models\AuditLogModel;
use App\Models\PaymentModel;

class PaymentController extends BaseController
{
    public function index()
    {
        $items = (new PaymentModel())
            ->where('organization_id', session()->get('org_id'))
            ->orderBy('paid_at', 'DESC')
            ->findAll();

        return $this->response->setJSON(['data' => $items]);
    }

    public function create()
    {
        $data = $this->payload();
        $id = (new PaymentModel())->insert([
            'organization_id' => session()->get('org_id'),
            'fee_id' => $data['fee_id'] ?? null,
            'student_id' => $data['student_id'] ?? null,
            'section_id' => $data['section_id'] ?? null,
            'recorded_by' => session()->get('user_id'),
            'reference_no' => $data['reference_no'] ?? null,
            'payment_method' => $data['payment_method'] ?? 'cash',
            'amount' => $data['amount'] ?? 0,
            'paid_at' => $data['paid_at'] ?? date('Y-m-d H:i:s'),
            'status' => $data['status'] ?? 'pending',
            'remarks' => $data['remarks'] ?? null,
        ]);

        (new AuditLogModel())->record('payment.create', 'payments', (int) $id);

        return $this->response->setStatusCode(201)->setJSON(['id' => $id]);
    }

    public function update(int $id)
    {
        $allowed = ['fee_id', 'student_id', 'section_id', 'verified_by', 'reference_no', 'payment_method', 'amount', 'paid_at', 'status', 'remarks'];
        $data = array_intersect_key($this->payload(), array_flip($allowed));

        (new PaymentModel())->update($id, $data);
        (new AuditLogModel())->record('payment.update', 'payments', $id);

        return $this->response->setJSON(['success' => true]);
    }

    public function delete(int $id)
    {
        (new PaymentModel())->delete($id);
        (new AuditLogModel())->record('payment.delete', 'payments', $id);

        return $this->response->setJSON(['success' => true]);
    }

    private function payload(): array
    {
        return $this->request->getJSON(true) ?: $this->request->getPost();
    }
}
