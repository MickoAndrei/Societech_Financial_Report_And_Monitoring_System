<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class CreateSocietechCoreSchema extends Migration
{
    public function up(): void
    {
        $this->forge->addField([
            'id' => ['type' => 'BIGINT', 'unsigned' => true, 'auto_increment' => true],
            'name' => ['type' => 'VARCHAR', 'constraint' => 160],
            'slug' => ['type' => 'VARCHAR', 'constraint' => 120],
            'description' => ['type' => 'TEXT', 'null' => true],
            'email' => ['type' => 'VARCHAR', 'constraint' => 160, 'null' => true],
            'phone' => ['type' => 'VARCHAR', 'constraint' => 40, 'null' => true],
            'status' => ['type' => 'ENUM', 'constraint' => ['active', 'inactive', 'archived'], 'default' => 'active'],
            'created_at' => ['type' => 'DATETIME', 'null' => true],
            'updated_at' => ['type' => 'DATETIME', 'null' => true],
            'deleted_at' => ['type' => 'DATETIME', 'null' => true],
        ]);
        $this->forge->addKey('id', true);
        $this->forge->addUniqueKey('slug');
        $this->forge->createTable('organizations');

        $this->forge->addField([
            'id' => ['type' => 'BIGINT', 'unsigned' => true, 'auto_increment' => true],
            'organization_id' => ['type' => 'BIGINT', 'unsigned' => true],
            'name' => ['type' => 'VARCHAR', 'constraint' => 80],
            'starts_on' => ['type' => 'DATE', 'null' => true],
            'ends_on' => ['type' => 'DATE', 'null' => true],
            'is_active' => ['type' => 'TINYINT', 'constraint' => 1, 'default' => 0],
            'created_at' => ['type' => 'DATETIME', 'null' => true],
            'updated_at' => ['type' => 'DATETIME', 'null' => true],
        ]);
        $this->forge->addKey('id', true);
        $this->forge->addKey('organization_id');
        $this->forge->addForeignKey('organization_id', 'organizations', 'id', 'CASCADE', 'CASCADE');
        $this->forge->createTable('academic_years');

        $this->forge->addField([
            'id' => ['type' => 'BIGINT', 'unsigned' => true, 'auto_increment' => true],
            'organization_id' => ['type' => 'BIGINT', 'unsigned' => true, 'null' => true],
            'student_no' => ['type' => 'VARCHAR', 'constraint' => 60, 'null' => true],
            'first_name' => ['type' => 'VARCHAR', 'constraint' => 80],
            'last_name' => ['type' => 'VARCHAR', 'constraint' => 80],
            'email' => ['type' => 'VARCHAR', 'constraint' => 160],
            'phone' => ['type' => 'VARCHAR', 'constraint' => 40, 'null' => true],
            'password_hash' => ['type' => 'VARCHAR', 'constraint' => 255],
            'role' => ['type' => 'ENUM', 'constraint' => ['student', 'treasurer', 'admin', 'super_admin'], 'default' => 'student'],
            'avatar_path' => ['type' => 'VARCHAR', 'constraint' => 255, 'null' => true],
            'email_verified_at' => ['type' => 'DATETIME', 'null' => true],
            'status' => ['type' => 'ENUM', 'constraint' => ['pending', 'active', 'suspended', 'archived'], 'default' => 'pending'],
            'last_login_at' => ['type' => 'DATETIME', 'null' => true],
            'created_at' => ['type' => 'DATETIME', 'null' => true],
            'updated_at' => ['type' => 'DATETIME', 'null' => true],
            'deleted_at' => ['type' => 'DATETIME', 'null' => true],
        ]);
        $this->forge->addKey('id', true);
        $this->forge->addUniqueKey('email');
        $this->forge->addUniqueKey('student_no');
        $this->forge->addKey(['organization_id', 'role']);
        $this->forge->addForeignKey('organization_id', 'organizations', 'id', 'SET NULL', 'CASCADE');
        $this->forge->createTable('users');

        $this->forge->addField([
            'id' => ['type' => 'BIGINT', 'unsigned' => true, 'auto_increment' => true],
            'organization_id' => ['type' => 'BIGINT', 'unsigned' => true],
            'program' => ['type' => 'VARCHAR', 'constraint' => 80, 'default' => 'BSIT'],
            'year_level' => ['type' => 'TINYINT', 'unsigned' => true],
            'section_name' => ['type' => 'VARCHAR', 'constraint' => 40],
            'treasurer_id' => ['type' => 'BIGINT', 'unsigned' => true, 'null' => true],
            'status' => ['type' => 'ENUM', 'constraint' => ['active', 'inactive', 'archived'], 'default' => 'active'],
            'created_at' => ['type' => 'DATETIME', 'null' => true],
            'updated_at' => ['type' => 'DATETIME', 'null' => true],
            'deleted_at' => ['type' => 'DATETIME', 'null' => true],
        ]);
        $this->forge->addKey('id', true);
        $this->forge->addKey(['organization_id', 'program', 'year_level']);
        $this->forge->addForeignKey('organization_id', 'organizations', 'id', 'CASCADE', 'CASCADE');
        $this->forge->addForeignKey('treasurer_id', 'users', 'id', 'SET NULL', 'CASCADE');
        $this->forge->createTable('sections');

        $this->forge->addField([
            'id' => ['type' => 'BIGINT', 'unsigned' => true, 'auto_increment' => true],
            'section_id' => ['type' => 'BIGINT', 'unsigned' => true],
            'user_id' => ['type' => 'BIGINT', 'unsigned' => true],
            'academic_year_id' => ['type' => 'BIGINT', 'unsigned' => true, 'null' => true],
            'is_current' => ['type' => 'TINYINT', 'constraint' => 1, 'default' => 1],
            'created_at' => ['type' => 'DATETIME', 'null' => true],
            'updated_at' => ['type' => 'DATETIME', 'null' => true],
        ]);
        $this->forge->addKey('id', true);
        $this->forge->addUniqueKey(['section_id', 'user_id', 'academic_year_id']);
        $this->forge->addForeignKey('section_id', 'sections', 'id', 'CASCADE', 'CASCADE');
        $this->forge->addForeignKey('user_id', 'users', 'id', 'CASCADE', 'CASCADE');
        $this->forge->addForeignKey('academic_year_id', 'academic_years', 'id', 'SET NULL', 'CASCADE');
        $this->forge->createTable('section_members');

        $this->forge->addField([
            'id' => ['type' => 'BIGINT', 'unsigned' => true, 'auto_increment' => true],
            'organization_id' => ['type' => 'BIGINT', 'unsigned' => true],
            'name' => ['type' => 'VARCHAR', 'constraint' => 120],
            'scope' => ['type' => 'ENUM', 'constraint' => ['organization', 'class'], 'default' => 'organization'],
            'description' => ['type' => 'TEXT', 'null' => true],
            'created_at' => ['type' => 'DATETIME', 'null' => true],
            'updated_at' => ['type' => 'DATETIME', 'null' => true],
        ]);
        $this->forge->addKey('id', true);
        $this->forge->addForeignKey('organization_id', 'organizations', 'id', 'CASCADE', 'CASCADE');
        $this->forge->createTable('fee_categories');

        $this->forge->addField([
            'id' => ['type' => 'BIGINT', 'unsigned' => true, 'auto_increment' => true],
            'organization_id' => ['type' => 'BIGINT', 'unsigned' => true],
            'academic_year_id' => ['type' => 'BIGINT', 'unsigned' => true, 'null' => true],
            'category_id' => ['type' => 'BIGINT', 'unsigned' => true, 'null' => true],
            'section_id' => ['type' => 'BIGINT', 'unsigned' => true, 'null' => true],
            'title' => ['type' => 'VARCHAR', 'constraint' => 160],
            'description' => ['type' => 'TEXT', 'null' => true],
            'amount' => ['type' => 'DECIMAL', 'constraint' => '12,2', 'default' => 0],
            'due_on' => ['type' => 'DATE', 'null' => true],
            'scope' => ['type' => 'ENUM', 'constraint' => ['organization', 'class', 'student'], 'default' => 'organization'],
            'status' => ['type' => 'ENUM', 'constraint' => ['draft', 'active', 'closed', 'archived'], 'default' => 'active'],
            'created_by' => ['type' => 'BIGINT', 'unsigned' => true, 'null' => true],
            'created_at' => ['type' => 'DATETIME', 'null' => true],
            'updated_at' => ['type' => 'DATETIME', 'null' => true],
            'deleted_at' => ['type' => 'DATETIME', 'null' => true],
        ]);
        $this->forge->addKey('id', true);
        $this->forge->addKey(['organization_id', 'scope', 'status']);
        $this->forge->addForeignKey('organization_id', 'organizations', 'id', 'CASCADE', 'CASCADE');
        $this->forge->addForeignKey('academic_year_id', 'academic_years', 'id', 'SET NULL', 'CASCADE');
        $this->forge->addForeignKey('category_id', 'fee_categories', 'id', 'SET NULL', 'CASCADE');
        $this->forge->addForeignKey('section_id', 'sections', 'id', 'SET NULL', 'CASCADE');
        $this->forge->addForeignKey('created_by', 'users', 'id', 'SET NULL', 'CASCADE');
        $this->forge->createTable('fees');

        $this->forge->addField([
            'id' => ['type' => 'BIGINT', 'unsigned' => true, 'auto_increment' => true],
            'fee_id' => ['type' => 'BIGINT', 'unsigned' => true],
            'user_id' => ['type' => 'BIGINT', 'unsigned' => true],
            'amount_due' => ['type' => 'DECIMAL', 'constraint' => '12,2', 'default' => 0],
            'amount_paid' => ['type' => 'DECIMAL', 'constraint' => '12,2', 'default' => 0],
            'status' => ['type' => 'ENUM', 'constraint' => ['unpaid', 'partial', 'paid', 'waived'], 'default' => 'unpaid'],
            'created_at' => ['type' => 'DATETIME', 'null' => true],
            'updated_at' => ['type' => 'DATETIME', 'null' => true],
        ]);
        $this->forge->addKey('id', true);
        $this->forge->addUniqueKey(['fee_id', 'user_id']);
        $this->forge->addForeignKey('fee_id', 'fees', 'id', 'CASCADE', 'CASCADE');
        $this->forge->addForeignKey('user_id', 'users', 'id', 'CASCADE', 'CASCADE');
        $this->forge->createTable('student_fee_balances');

        $this->forge->addField([
            'id' => ['type' => 'BIGINT', 'unsigned' => true, 'auto_increment' => true],
            'organization_id' => ['type' => 'BIGINT', 'unsigned' => true],
            'fee_id' => ['type' => 'BIGINT', 'unsigned' => true, 'null' => true],
            'student_id' => ['type' => 'BIGINT', 'unsigned' => true],
            'section_id' => ['type' => 'BIGINT', 'unsigned' => true, 'null' => true],
            'recorded_by' => ['type' => 'BIGINT', 'unsigned' => true, 'null' => true],
            'verified_by' => ['type' => 'BIGINT', 'unsigned' => true, 'null' => true],
            'reference_no' => ['type' => 'VARCHAR', 'constraint' => 120, 'null' => true],
            'payment_method' => ['type' => 'VARCHAR', 'constraint' => 80, 'null' => true],
            'amount' => ['type' => 'DECIMAL', 'constraint' => '12,2'],
            'paid_at' => ['type' => 'DATETIME', 'null' => true],
            'status' => ['type' => 'ENUM', 'constraint' => ['draft', 'pending', 'approved', 'rejected', 'void'], 'default' => 'pending'],
            'remarks' => ['type' => 'TEXT', 'null' => true],
            'created_at' => ['type' => 'DATETIME', 'null' => true],
            'updated_at' => ['type' => 'DATETIME', 'null' => true],
            'deleted_at' => ['type' => 'DATETIME', 'null' => true],
        ]);
        $this->forge->addKey('id', true);
        $this->forge->addKey(['organization_id', 'status', 'paid_at']);
        $this->forge->addForeignKey('organization_id', 'organizations', 'id', 'CASCADE', 'CASCADE');
        $this->forge->addForeignKey('fee_id', 'fees', 'id', 'SET NULL', 'CASCADE');
        $this->forge->addForeignKey('student_id', 'users', 'id', 'CASCADE', 'CASCADE');
        $this->forge->addForeignKey('section_id', 'sections', 'id', 'SET NULL', 'CASCADE');
        $this->forge->addForeignKey('recorded_by', 'users', 'id', 'SET NULL', 'CASCADE');
        $this->forge->addForeignKey('verified_by', 'users', 'id', 'SET NULL', 'CASCADE');
        $this->forge->createTable('payments');

        $this->forge->addField([
            'id' => ['type' => 'BIGINT', 'unsigned' => true, 'auto_increment' => true],
            'organization_id' => ['type' => 'BIGINT', 'unsigned' => true],
            'section_id' => ['type' => 'BIGINT', 'unsigned' => true, 'null' => true],
            'submitted_by' => ['type' => 'BIGINT', 'unsigned' => true],
            'reviewed_by' => ['type' => 'BIGINT', 'unsigned' => true, 'null' => true],
            'batch_no' => ['type' => 'VARCHAR', 'constraint' => 80],
            'total_amount' => ['type' => 'DECIMAL', 'constraint' => '12,2', 'default' => 0],
            'status' => ['type' => 'ENUM', 'constraint' => ['pending', 'approved', 'rejected', 'cancelled'], 'default' => 'pending'],
            'submitted_at' => ['type' => 'DATETIME', 'null' => true],
            'reviewed_at' => ['type' => 'DATETIME', 'null' => true],
            'review_notes' => ['type' => 'TEXT', 'null' => true],
            'created_at' => ['type' => 'DATETIME', 'null' => true],
            'updated_at' => ['type' => 'DATETIME', 'null' => true],
        ]);
        $this->forge->addKey('id', true);
        $this->forge->addUniqueKey('batch_no');
        $this->forge->addKey(['organization_id', 'status']);
        $this->forge->addForeignKey('organization_id', 'organizations', 'id', 'CASCADE', 'CASCADE');
        $this->forge->addForeignKey('section_id', 'sections', 'id', 'SET NULL', 'CASCADE');
        $this->forge->addForeignKey('submitted_by', 'users', 'id', 'CASCADE', 'CASCADE');
        $this->forge->addForeignKey('reviewed_by', 'users', 'id', 'SET NULL', 'CASCADE');
        $this->forge->createTable('verification_batches');

        $this->forge->addField([
            'id' => ['type' => 'BIGINT', 'unsigned' => true, 'auto_increment' => true],
            'verification_batch_id' => ['type' => 'BIGINT', 'unsigned' => true],
            'payment_id' => ['type' => 'BIGINT', 'unsigned' => true],
            'created_at' => ['type' => 'DATETIME', 'null' => true],
        ]);
        $this->forge->addKey('id', true);
        $this->forge->addUniqueKey(['verification_batch_id', 'payment_id']);
        $this->forge->addForeignKey('verification_batch_id', 'verification_batches', 'id', 'CASCADE', 'CASCADE');
        $this->forge->addForeignKey('payment_id', 'payments', 'id', 'CASCADE', 'CASCADE');
        $this->forge->createTable('verification_batch_payments');

        $this->forge->addField([
            'id' => ['type' => 'BIGINT', 'unsigned' => true, 'auto_increment' => true],
            'organization_id' => ['type' => 'BIGINT', 'unsigned' => true],
            'section_id' => ['type' => 'BIGINT', 'unsigned' => true, 'null' => true],
            'type' => ['type' => 'ENUM', 'constraint' => ['inflow', 'outflow'], 'default' => 'inflow'],
            'scope' => ['type' => 'ENUM', 'constraint' => ['organization', 'class'], 'default' => 'organization'],
            'category' => ['type' => 'VARCHAR', 'constraint' => 120],
            'description' => ['type' => 'TEXT', 'null' => true],
            'amount' => ['type' => 'DECIMAL', 'constraint' => '12,2'],
            'occurred_on' => ['type' => 'DATE'],
            'payment_id' => ['type' => 'BIGINT', 'unsigned' => true, 'null' => true],
            'recorded_by' => ['type' => 'BIGINT', 'unsigned' => true, 'null' => true],
            'created_at' => ['type' => 'DATETIME', 'null' => true],
            'updated_at' => ['type' => 'DATETIME', 'null' => true],
            'deleted_at' => ['type' => 'DATETIME', 'null' => true],
        ]);
        $this->forge->addKey('id', true);
        $this->forge->addKey(['organization_id', 'type', 'occurred_on']);
        $this->forge->addForeignKey('organization_id', 'organizations', 'id', 'CASCADE', 'CASCADE');
        $this->forge->addForeignKey('section_id', 'sections', 'id', 'SET NULL', 'CASCADE');
        $this->forge->addForeignKey('payment_id', 'payments', 'id', 'SET NULL', 'CASCADE');
        $this->forge->addForeignKey('recorded_by', 'users', 'id', 'SET NULL', 'CASCADE');
        $this->forge->createTable('cash_flow_entries');

        $this->forge->addField([
            'id' => ['type' => 'BIGINT', 'unsigned' => true, 'auto_increment' => true],
            'organization_id' => ['type' => 'BIGINT', 'unsigned' => true],
            'title' => ['type' => 'VARCHAR', 'constraint' => 180],
            'body' => ['type' => 'TEXT'],
            'audience' => ['type' => 'ENUM', 'constraint' => ['all', 'students', 'treasurers', 'admins'], 'default' => 'all'],
            'posted_by' => ['type' => 'BIGINT', 'unsigned' => true, 'null' => true],
            'posted_at' => ['type' => 'DATETIME', 'null' => true],
            'ends_at' => ['type' => 'DATETIME', 'null' => true],
            'is_active' => ['type' => 'TINYINT', 'constraint' => 1, 'default' => 1],
            'created_at' => ['type' => 'DATETIME', 'null' => true],
            'updated_at' => ['type' => 'DATETIME', 'null' => true],
            'deleted_at' => ['type' => 'DATETIME', 'null' => true],
        ]);
        $this->forge->addKey('id', true);
        $this->forge->addKey(['organization_id', 'is_active', 'posted_at']);
        $this->forge->addForeignKey('organization_id', 'organizations', 'id', 'CASCADE', 'CASCADE');
        $this->forge->addForeignKey('posted_by', 'users', 'id', 'SET NULL', 'CASCADE');
        $this->forge->createTable('announcements');

        $this->forge->addField([
            'id' => ['type' => 'BIGINT', 'unsigned' => true, 'auto_increment' => true],
            'organization_id' => ['type' => 'BIGINT', 'unsigned' => true, 'null' => true],
            'user_id' => ['type' => 'BIGINT', 'unsigned' => true],
            'type' => ['type' => 'VARCHAR', 'constraint' => 80],
            'title' => ['type' => 'VARCHAR', 'constraint' => 180],
            'message' => ['type' => 'TEXT', 'null' => true],
            'data' => ['type' => 'JSON', 'null' => true],
            'read_at' => ['type' => 'DATETIME', 'null' => true],
            'created_at' => ['type' => 'DATETIME', 'null' => true],
            'updated_at' => ['type' => 'DATETIME', 'null' => true],
        ]);
        $this->forge->addKey('id', true);
        $this->forge->addKey(['user_id', 'read_at']);
        $this->forge->addForeignKey('organization_id', 'organizations', 'id', 'CASCADE', 'CASCADE');
        $this->forge->addForeignKey('user_id', 'users', 'id', 'CASCADE', 'CASCADE');
        $this->forge->createTable('notifications');

        $this->forge->addField([
            'id' => ['type' => 'BIGINT', 'unsigned' => true, 'auto_increment' => true],
            'organization_id' => ['type' => 'BIGINT', 'unsigned' => true, 'null' => true],
            'actor_id' => ['type' => 'BIGINT', 'unsigned' => true, 'null' => true],
            'action' => ['type' => 'VARCHAR', 'constraint' => 120],
            'entity_type' => ['type' => 'VARCHAR', 'constraint' => 120, 'null' => true],
            'entity_id' => ['type' => 'BIGINT', 'unsigned' => true, 'null' => true],
            'ip_address' => ['type' => 'VARCHAR', 'constraint' => 45, 'null' => true],
            'user_agent' => ['type' => 'VARCHAR', 'constraint' => 255, 'null' => true],
            'metadata' => ['type' => 'JSON', 'null' => true],
            'created_at' => ['type' => 'DATETIME', 'null' => true],
        ]);
        $this->forge->addKey('id', true);
        $this->forge->addKey(['organization_id', 'action']);
        $this->forge->addForeignKey('organization_id', 'organizations', 'id', 'SET NULL', 'CASCADE');
        $this->forge->addForeignKey('actor_id', 'users', 'id', 'SET NULL', 'CASCADE');
        $this->forge->createTable('audit_logs');

        $this->forge->addField([
            'id' => ['type' => 'BIGINT', 'unsigned' => true, 'auto_increment' => true],
            'organization_id' => ['type' => 'BIGINT', 'unsigned' => true, 'null' => true],
            'setting_key' => ['type' => 'VARCHAR', 'constraint' => 120],
            'setting_value' => ['type' => 'TEXT', 'null' => true],
            'created_at' => ['type' => 'DATETIME', 'null' => true],
            'updated_at' => ['type' => 'DATETIME', 'null' => true],
        ]);
        $this->forge->addKey('id', true);
        $this->forge->addUniqueKey(['organization_id', 'setting_key']);
        $this->forge->addForeignKey('organization_id', 'organizations', 'id', 'CASCADE', 'CASCADE');
        $this->forge->createTable('settings');
    }

    public function down(): void
    {
        foreach ([
            'settings',
            'audit_logs',
            'notifications',
            'announcements',
            'cash_flow_entries',
            'verification_batch_payments',
            'verification_batches',
            'payments',
            'student_fee_balances',
            'fees',
            'fee_categories',
            'section_members',
            'sections',
            'users',
            'academic_years',
            'organizations',
        ] as $table) {
            $this->forge->dropTable($table, true);
        }
    }
}
