-- ============================================================================
-- SIMMAS - Test Queries untuk Verifikasi Sync
-- ============================================================================
-- Jalankan query ini satu per satu di Supabase SQL Editor untuk test
-- ============================================================================

-- ══════════════════════════════════════════════════════════
-- 1. CEK SEMUA TABEL
-- ══════════════════════════════════════════════════════════
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
  AND table_type = 'BASE TABLE'
ORDER BY table_name;

-- Expected: 11 tables (users, guru, siswa, dudi, penempatan, absensi, jurnal, kunjungan, log_aktivitas, pengaturan, notifikasi)

-- ══════════════════════════════════════════════════════════
-- 2. CEK DEMO USERS (Lengkap dengan Nama)
-- ══════════════════════════════════════════════════════════
SELECT 
  u.id, 
  u.email, 
  u.role, 
  u.is_active,
  CASE 
    WHEN u.role = 'guru' THEN g.nama
    WHEN u.role = 'siswa' THEN s.nama
    ELSE 'Administrator'
  END as nama,
  CASE 
    WHEN u.role = 'guru' THEN g.nip
    WHEN u.role = 'siswa' THEN s.nis
    ELSE NULL
  END as identifier
FROM users u
LEFT JOIN guru g ON u.id = g.user_id
LEFT JOIN siswa s ON u.id = s.user_id
WHERE u.email LIKE '%@simmas.sch.id'
ORDER BY u.role;

-- Expected: 3 rows
-- admin@simmas.sch.id | admin | Administrator
-- guru@simmas.sch.id  | guru  | Budi Santoso, S.Pd
-- siswa@simmas.sch.id | siswa | Ahmad Fauzi

-- ══════════════════════════════════════════════════════════
-- 3. CEK AUTH USERS (dari Supabase Auth)
-- ══════════════════════════════════════════════════════════
SELECT 
  id, 
  email, 
  email_confirmed_at,
  created_at
FROM auth.users
WHERE email LIKE '%@simmas.sch.id'
ORDER BY email;

-- Expected: 3 users dengan email_confirmed_at terisi

-- ══════════════════════════════════════════════════════════
-- 4. CEK RLS POLICIES
-- ══════════════════════════════════════════════════════════
SELECT 
  schemaname, 
  tablename, 
  policyname,
  CASE 
    WHEN policyname LIKE '%admin%' THEN 'Admin'
    WHEN policyname LIKE '%guru%' THEN 'Guru'
    WHEN policyname LIKE '%siswa%' THEN 'Siswa'
    ELSE 'Other'
  END as role
FROM pg_policies 
WHERE schemaname = 'public'
ORDER BY tablename, policyname;

-- Expected: Multiple policies per table (admin, guru, siswa policies)

-- ══════════════════════════════════════════════════════════
-- 5. CEK STORAGE BUCKETS
-- ══════════════════════════════════════════════════════════
SELECT 
  id, 
  name, 
  public,
  file_size_limit,
  allowed_mime_types
FROM storage.buckets
ORDER BY name;

-- Expected: 3 buckets
-- - absensi-photos
-- - jurnal-attachments
-- - kunjungan-photos

-- ══════════════════════════════════════════════════════════
-- 6. CEK INDEXES
-- ══════════════════════════════════════════════════════════
SELECT 
  schemaname,
  tablename,
  indexname,
  indexdef
FROM pg_indexes
WHERE schemaname = 'public'
  AND tablename IN ('users', 'guru', 'siswa', 'dudi', 'penempatan', 'absensi', 'jurnal')
ORDER BY tablename, indexname;

-- Expected: Multiple indexes per table

-- ══════════════════════════════════════════════════════════
-- 7. CEK UNIQUE CONSTRAINTS
-- ══════════════════════════════════════════════════════════
SELECT
  tc.constraint_name,
  tc.table_name,
  kcu.column_name
FROM information_schema.table_constraints tc
JOIN information_schema.key_column_usage kcu 
  ON tc.constraint_name = kcu.constraint_name
WHERE tc.table_schema = 'public'
  AND tc.constraint_type = 'UNIQUE'
  AND tc.table_name IN ('guru', 'siswa', 'users', 'dudi')
ORDER BY tc.table_name, tc.constraint_name;

-- Expected: 
-- guru.user_id → UNIQUE ✅
-- siswa.user_id → UNIQUE ✅
-- users.email → UNIQUE ✅
-- dudi.kode → UNIQUE ✅

-- ══════════════════════════════════════════════════════════
-- 8. CEK FOREIGN KEYS
-- ══════════════════════════════════════════════════════════
SELECT
  tc.constraint_name,
  tc.table_name,
  kcu.column_name,
  ccu.table_name AS foreign_table_name,
  ccu.column_name AS foreign_column_name
FROM information_schema.table_constraints tc
JOIN information_schema.key_column_usage kcu
  ON tc.constraint_name = kcu.constraint_name
JOIN information_schema.constraint_column_usage ccu
  ON ccu.constraint_name = tc.constraint_name
WHERE tc.constraint_type = 'FOREIGN KEY'
  AND tc.table_schema = 'public'
ORDER BY tc.table_name, tc.constraint_name;

-- Expected: Foreign keys connecting:
-- guru.user_id → users.id
-- siswa.user_id → users.id
-- penempatan.siswa_id → siswa.id
-- etc.

-- ══════════════════════════════════════════════════════════
-- 9. CEK VIEWS
-- ══════════════════════════════════════════════════════════
SELECT 
  table_name,
  view_definition
FROM information_schema.views 
WHERE table_schema = 'public'
ORDER BY table_name;

-- Expected: v_statistik_admin dan views lainnya

-- ══════════════════════════════════════════════════════════
-- 10. CEK FUNCTIONS & TRIGGERS
-- ══════════════════════════════════════════════════════════
SELECT 
  trigger_name,
  event_object_table,
  action_timing,
  event_manipulation
FROM information_schema.triggers
WHERE trigger_schema = 'public'
ORDER BY event_object_table, trigger_name;

-- Expected: update_updated_at_column triggers on tables with updated_at

-- ══════════════════════════════════════════════════════════
-- 11. TEST QUERY - Get Admin Dashboard Statistics
-- ══════════════════════════════════════════════════════════
SELECT
  (SELECT COUNT(*) FROM siswa WHERE status = 'aktif') as total_siswa,
  (SELECT COUNT(*) FROM guru WHERE status = 'aktif') as total_guru,
  (SELECT COUNT(*) FROM dudi WHERE status = 'terverifikasi') as total_dudi,
  (SELECT COUNT(*) FROM penempatan WHERE status = 'disetujui') as siswa_magang_aktif,
  (SELECT COUNT(*) FROM penempatan WHERE status = 'menunggu') as pengajuan_pending;

-- Expected: Numbers (could be 0 if no data yet, except demo users: 1 guru, 1 siswa)

-- ══════════════════════════════════════════════════════════
-- 12. TEST RLS - Try as Different Roles
-- ══════════════════════════════════════════════════════════
-- NOTE: Ini hanya bisa ditest via aplikasi atau dengan SET ROLE
-- Test via aplikasi:
-- 1. Login sebagai admin → bisa akses semua data
-- 2. Login sebagai guru → hanya bisa akses data siswa yang dibimbingnya
-- 3. Login sebagai siswa → hanya bisa akses data diri sendiri

-- ══════════════════════════════════════════════════════════
-- 13. TEST INSERT - Add Test Data
-- ══════════════════════════════════════════════════════════
-- Test insert DUDI
INSERT INTO dudi (
  kode, nama, bidang_usaha, alamat, kota, 
  kontak, email, kapasitas_siswa, status
) VALUES (
  'DUDI001',
  'PT. Tech Indonesia',
  'Software Development',
  'Jl. Sudirman No. 123',
  'Jakarta',
  '021-12345678',
  'info@techindonesia.com',
  10,
  'terverifikasi'
);

-- Test query DUDI
SELECT * FROM dudi WHERE kode = 'DUDI001';

-- ══════════════════════════════════════════════════════════
-- 14. TEST QUERY - Join Complex
-- ══════════════════════════════════════════════════════════
SELECT 
  s.nama as nama_siswa,
  s.kelas,
  s.jurusan,
  g.nama as nama_pembimbing,
  d.nama as nama_dudi,
  p.status as status_penempatan
FROM siswa s
LEFT JOIN guru g ON s.guru_pembimbing_id = g.id
LEFT JOIN penempatan p ON p.siswa_id = s.id
LEFT JOIN dudi d ON p.dudi_id = d.id
ORDER BY s.nama;

-- Expected: Data siswa dengan relasi lengkap

-- ══════════════════════════════════════════════════════════
-- 15. CLEANUP TEST DATA (Optional)
-- ══════════════════════════════════════════════════════════
-- Hapus test DUDI jika perlu
-- DELETE FROM dudi WHERE kode = 'DUDI001';

-- ============================================================================
-- HASIL YANG DIHARAPKAN
-- ============================================================================
-- ✅ Query 1-2: 11 tables, 3 demo users
-- ✅ Query 3: 3 auth users
-- ✅ Query 4: Multiple RLS policies
-- ✅ Query 5: 3 storage buckets
-- ✅ Query 6: Multiple indexes
-- ✅ Query 7-8: Constraints dan FKs lengkap
-- ✅ Query 9-10: Views dan triggers ada
-- ✅ Query 11: Statistics query works
-- ✅ Query 13-14: Insert dan join works

-- Jika semua query berhasil = PROJECT FULLY SYNCED! 🎉
-- ============================================================================
