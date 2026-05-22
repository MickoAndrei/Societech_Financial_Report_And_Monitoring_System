CREATE DATABASE IF NOT EXISTS societech_financial_monitoring
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_general_ci;

USE societech_financial_monitoring;

SET @now = NOW();
SET @placeholder_password = '$2y$10$X/BMeX4MwR/3zyEF6PrvU.wOwqmfJVJrwREN8sI0Otrm6sZf/Mq9S';

INSERT IGNORE INTO organizations
  (id, name, slug, description, email, status, created_at, updated_at)
VALUES
  (1, 'SOCIATECH', 'societech', 'Technology and Innovation Student Organization', 'admin@societech.local', 'active', @now, @now);

INSERT IGNORE INTO academic_years
  (id, organization_id, name, is_active, created_at, updated_at)
VALUES
  (1, 1, '2026-2027', 1, @now, @now);

INSERT IGNORE INTO users
  (id, organization_id, student_no, first_name, last_name, email, password_hash, role, email_verified_at, status, created_at, updated_at)
VALUES
  (10, 1, 'SOC-TRES-001', 'Societech', 'Treasurer', 'societech.treasurer@societech.local', @placeholder_password, 'treasurer', @now, 'active', @now, @now),
  (11, 1, 'CLASS-TRES-001', 'Classroom', 'Treasurer', 'class.treasurer@societech.local', @placeholder_password, 'treasurer', @now, 'active', @now, @now),
  (12, 1, 'STUDENT-001', 'Placeholder', 'Student', 'student@societech.local', @placeholder_password, 'student', @now, 'active', @now, @now),
  (13, 1, NULL, 'Organization', 'Admin', 'org.admin@societech.local', @placeholder_password, 'admin', @now, 'active', @now, @now);

INSERT IGNORE INTO sections
  (id, organization_id, program, year_level, section_name, treasurer_id, status, created_at, updated_at)
VALUES
  (1, 1, 'BSIT', 1, 'A', 11, 'active', @now, @now);

INSERT IGNORE INTO section_members
  (id, section_id, user_id, academic_year_id, is_current, created_at, updated_at)
VALUES
  (1, 1, 11, 1, 1, @now, @now),
  (2, 1, 12, 1, 1, @now, @now);
