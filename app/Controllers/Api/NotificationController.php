<?php

namespace App\Controllers\Api;

use App\Controllers\BaseController;
use App\Models\NotificationModel;

class NotificationController extends BaseController
{
    public function index()
    {
        $items = (new NotificationModel())
            ->where('user_id', session()->get('user_id'))
            ->orderBy('created_at', 'DESC')
            ->findAll(50);

        return $this->response->setJSON(['data' => $items]);
    }

    public function markRead(int $id)
    {
        (new NotificationModel())->update($id, ['read_at' => date('Y-m-d H:i:s')]);

        return $this->response->setJSON(['success' => true]);
    }
}
