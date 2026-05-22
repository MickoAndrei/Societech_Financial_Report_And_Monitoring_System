<?php

namespace App\Controllers\Api;

use App\Controllers\BaseController;
use App\Models\SectionModel;

class SectionController extends BaseController
{
    public function index()
    {
        $items = (new SectionModel())->getWithTreasurer((int) session()->get('org_id'));

        return $this->response->setJSON(['data' => $items]);
    }

    public function show(int $id)
    {
        $section = (new SectionModel())->find($id);

        if (! $section) {
            return $this->response->setStatusCode(404)->setJSON(['error' => 'Not found']);
        }

        return $this->response->setJSON(['data' => $section]);
    }

    public function roster(int $sectionId)
    {
        $items = db_connect()->table('section_members sm')
            ->select('u.id, u.first_name, u.last_name, u.email, u.student_no, u.role')
            ->join('users u', 'u.id = sm.user_id')
            ->where('sm.section_id', $sectionId)
            ->where('sm.is_current', 1)
            ->orderBy('u.last_name', 'ASC')
            ->get()
            ->getResultArray();

        return $this->response->setJSON(['data' => $items]);
    }
}
