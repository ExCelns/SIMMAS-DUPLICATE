-- ============================================================================
-- SIMMAS Database - RUN ALL SCRIPT
-- ============================================================================
-- Script ini menjalankan SEMUA script sekaligus
-- Untuk setup database dari awal
-- ============================================================================
-- CATATAN: 
-- 1. Jalankan di Supabase SQL Editor
-- 2. Pastikan database masih kosong atau siap untuk reset
-- 3. Proses akan memakan waktu beberapa menit
-- ============================================================================

DO $$
BEGIN
  RAISE NOTICE '';
  RAISE NOTICE '╔════════════════════════════════════════════════════════════╗';
  RAISE NOTICE '║           SIMMAS DATABASE SETUP - ALL IN ONE               ║';
  RAISE NOTICE '╚════════════════════════════════════════════════════════════╝';
  RAISE NOTICE '';
  RAISE NOTICE 'Memulai setup database...';
  RAISE NOTICE '';
END $$;

-- ============================================================================
-- STEP 1: CREATE TABLES
-- ============================================================================
\echo '▶ Step 1/10: Creating tables...'
\i 01-create-tables.sql

-- ============================================================================
-- STEP 2: CREATE INDEXES
-- ============================================================================
\echo '▶ Step 2/10: Creating indexes...'
\i 02-create-indexes.sql

-- ============================================================================
-- STEP 3: CREATE FUNCTIONS & TRIGGERS
-- ============================================================================
\echo '▶ Step 3/10: Creating functions and triggers...'
\i 03-create-functions-triggers.sql

-- ============================================================================
-- STEP 4: CREATE VIEWS
-- ============================================================================
\echo '▶ Step 4/10: Creating views...'
\i 04-create-views.sql

-- ============================================================================
-- STEP 5: ENABLE RLS
-- ============================================================================
\echo '▶ Step 5/10: Enabling Row Level Security...'
\i 05-enable-rls.sql

-- ============================================================================
-- STEP 6: CREATE ADMIN POLICIES
-- ============================================================================
\echo '▶ Step 6/10: Creating admin policies...'
\i 06-create-policies-admin.sql

-- ============================================================================
-- STEP 7: CREATE GURU POLICIES
-- ============================================================================
\echo '▶ Step 7/10: Creating guru policies...'
\i 07-create-policies-guru.sql

-- ============================================================================
-- STEP 8: CREATE SISWA POLICIES
-- ============================================================================
\echo '▶ Step 8/10: Creating siswa policies...'
\i 08-create-policies-siswa.sql

-- ============================================================================
-- STEP 9: CREATE STORAGE BUCKETS
-- ============================================================================
\echo '▶ Step 9/10: Creating storage buckets...'
\i 09-create-storage.sql

-- ============================================================================
-- STEP 10: SEED DATA
-- ============================================================================
\echo '▶ Step 10/10: Inserting seed data...'
\i 10-seed-data.sql

-- ============================================================================
-- FINAL MESSAGE
-- ============================================================================
DO $$
BEGIN
  RAISE NOTICE '';
  RAISE NOTICE '╔════════════════════════════════════════════════════════════╗';
  RAISE NOTICE '║              DATABASE SETUP COMPLETED! ✅                  ║';
  RAISE NOTICE '╚════════════════════════════════════════════════════════════╝';
  RAISE NOTICE '';
  RAISE NOTICE 'Database SIMMAS berhasil dibuat dengan:';
  RAISE NOTICE '  ✅ 11 Tables';
  RAISE NOTICE '  ✅ Indexes untuk performa';
  RAISE NOTICE '  ✅ Functions & Triggers untuk automasi';
  RAISE NOTICE '  ✅ 15+ Views untuk reporting';
  RAISE NOTICE '  ✅ Row Level Security (RLS)';
  RAISE NOTICE '  ✅ RLS Policies untuk Admin, Guru, Siswa';
  RAISE NOTICE '  ✅ 4 Storage Buckets';
  RAISE NOTICE '  ✅ Sample Data untuk testing';
  RAISE NOTICE '';
  RAISE NOTICE 'Selanjutnya:';
  RAISE NOTICE '  1. Test login dengan akun default (lihat 10-seed-data.sql)';
  RAISE NOTICE '  2. Ganti semua password default';
  RAISE NOTICE '  3. Review RLS policies sesuai kebutuhan';
  RAISE NOTICE '  4. Setup monitoring di Supabase Dashboard';
  RAISE NOTICE '';
  RAISE NOTICE 'Happy Coding! 🚀';
  RAISE NOTICE '';
END $$;
