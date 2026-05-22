<?php

namespace App\Database\Seeds;

use CodeIgniter\Database\Seeder;

class SocietechInitialSeeder extends Seeder
{
    public function run(): void
    {
        $now = date('Y-m-d H:i:s');

        $this->db->table('organizations')->ignore(true)->insert([
            'id' => 1,
            'name' => 'SOCIATECH',
            'slug' => 'societech',
            'description' => 'Technology and Innovation Student Organization',
            'email' => 'admin@societech.local',
            'status' => 'active',
            'created_at' => $now,
            'updated_at' => $now,
        ]);

        $this->db->table('academic_years')->ignore(true)->insert([
            'id' => 1,
            'organization_id' => 1,
            'name' => '2026-2027',
            'is_active' => 1,
            'created_at' => $now,
            'updated_at' => $now,
        ]);

        $this->db->table('users')->ignore(true)->insert([
            'id' => 1,
            'organization_id' => 1,
            'first_name' => 'System',
            'last_name' => 'Admin',
            'email' => 'admin@societech.local',
            'password_hash' => password_hash('admin12345', PASSWORD_DEFAULT),
            'role' => 'super_admin',
            'email_verified_at' => $now,
            'status' => 'active',
            'created_at' => $now,
            'updated_at' => $now,
        ]);

        $placeholderPassword = password_hash('password123', PASSWORD_DEFAULT);

        $this->db->table('users')->ignore(true)->insertBatch([
            [
                'id' => 10,
                'organization_id' => 1,
                'student_no' => 'SOC-TRES-001',
                'first_name' => 'Societech',
                'last_name' => 'Treasurer',
                'email' => 'societech.treasurer@societech.local',
                'password_hash' => $placeholderPassword,
                'role' => 'treasurer',
                'email_verified_at' => $now,
                'status' => 'active',
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'id' => 11,
                'organization_id' => 1,
                'student_no' => 'CLASS-TRES-001',
                'first_name' => 'Classroom',
                'last_name' => 'Treasurer',
                'email' => 'class.treasurer@societech.local',
                'password_hash' => $placeholderPassword,
                'role' => 'treasurer',
                'email_verified_at' => $now,
                'status' => 'active',
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'id' => 12,
                'organization_id' => 1,
                'student_no' => 'STUDENT-001',
                'first_name' => 'Placeholder',
                'last_name' => 'Student',
                'email' => 'student@societech.local',
                'password_hash' => $placeholderPassword,
                'role' => 'student',
                'email_verified_at' => $now,
                'status' => 'active',
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'id' => 13,
                'organization_id' => 1,
                'student_no' => null,
                'first_name' => 'Organization',
                'last_name' => 'Admin',
                'email' => 'org.admin@societech.local',
                'password_hash' => $placeholderPassword,
                'role' => 'admin',
                'email_verified_at' => $now,
                'status' => 'active',
                'created_at' => $now,
                'updated_at' => $now,
            ],
        ]);

        $this->db->table('sections')->ignore(true)->insert([
            'id' => 1,
            'organization_id' => 1,
            'program' => 'BSIT',
            'year_level' => 1,
            'section_name' => 'A',
            'treasurer_id' => 11,
            'status' => 'active',
            'created_at' => $now,
            'updated_at' => $now,
        ]);

        $this->db->table('section_members')->ignore(true)->insertBatch([
            [
                'id' => 1,
                'section_id' => 1,
                'user_id' => 11,
                'academic_year_id' => 1,
                'is_current' => 1,
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'id' => 2,
                'section_id' => 1,
                'user_id' => 12,
                'academic_year_id' => 1,
                'is_current' => 1,
                'created_at' => $now,
                'updated_at' => $now,
            ],
        ]);
    }
}
