CREATE DATABASE IF NOT EXISTS societech_financial_monitoring
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_general_ci;

USE societech_financial_monitoring;

-- The canonical schema is maintained as a CodeIgniter migration:
-- app/Database/Migrations/2026-05-22-000001_CreateSocietechCoreSchema.php
--
-- Run from the CI4 project root:
-- php spark migrate
-- php spark db:seed SocietechInitialSeeder
