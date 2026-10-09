-- ============================================================================
-- SIMMAS - Manual User Setup Helper
-- ============================================================================
-- Script helper untuk setup user secara manual
-- Gunakan setelah create user via Supabase Dashboard
-- ============================================================================

-- ============================================================================
-- INSTRUCTIONS:
-- ============================================================================
-- 1. Buka Supabase Dashboard → Authentication → Users → Add user
-- 2. Create user dengan email & password
-- 3. CATAT User UID yang ter-generate
-- 4. GANTI 'USER_UID_HERE' di bawah dengan UID asli
-- 5. Run script ini di SQL Editor
-- ============================================================================

-- ============================================================================
-- ADMIN USER
-- ============================================================================
-- Email: admin@smkn1tasik.sch.id
-- Password: admin123 (set di Dashboard)
-- ============================================================================

INSERT INTO users (id, email, role, is_active)
VALUES (
  'USER_UID_HERE', -- ⚠️ GANTI dengan UID dari Supabase Dashboard!
  'admin@smkn1tasik.sch.id',
  'admin',
  true
)
ON CONFLICT (id) DO UPDATE SET role = 'admin', email = EXCLUDED.email;

-- ============================================================================
-- GURU 1: Ahmad Yusuf
-- ============================================================================
-- Email: ahmad.yusuf@smkn1tasik.sch.id
-- Password: guru123 (set di Dashboard)
-- ============================================================================

-- Step 1: Insert ke users
INSERT INTO users (id, email, role, is_active)
VALUES (
  'USER_UID_HERE', -- ⚠️ GANTI!
  'ahmad.yusuf@smkn1tasik.sch.id',
  'guru',
  true
)
ON CONFLICT (id) DO NOTHING;

-- Step 2: Insert ke guru
INSERT INTO guru (user_id, nip, nama, mata_pelajaran, kontak, status)
VALUES (
  'USER_UID_HERE', -- ⚠️ SAMA dengan di atas!
  '197805122008012001',
  'Ahmad Yusuf',
  'Rekayasa Perangkat Lunak',
  '081234567801',
  'aktif'
)
ON CONFLICT (nip) 
DO UPDATE SET 
  user_id = EXCLUDED.user_id,
  nama = EXCLUDED.nama;

-- ============================================================================
-- GURU 2: Budi Santoso
-- ============================================================================
-- Email: budi.santoso@smkn1tasik.sch.id
-- Password: guru123 (set di Dashboard)
-- ============================================================================

INSERT INTO users (id, email, role, is_active)
VALUES (
  'USER_UID_HERE', -- ⚠️ GANTI!
  'budi.santoso@smkn1tasik.sch.id',
  'guru',
  true
)
ON CONFLICT (id) DO NOTHING;

INSERT INTO guru (user_id, nip, nama, mata_pelajaran, kontak, status)
VALUES (
  'USER_UID_HERE', -- ⚠️ SAMA!
  '198203152010012002',
  'Budi Santoso',
  'Basis Data',
  '081234567802',
  'aktif'
)
ON CONFLICT (nip) 
DO UPDATE SET 
  user_id = EXCLUDED.user_id,
  nama = EXCLUDED.nama;

-- ============================================================================
-- SISWA 1: Adelia Putri
-- ============================================================================
-- Email: adelia.putri@student.smkn1tasik.sch.id
-- Password: siswa123 (set di Dashboard)
-- ============================================================================

INSERT INTO users (id, email, role, is_active)
VALUES (
  'USER_UID_HERE', -- ⚠️ GANTI!
  'adelia.putri@student.smkn1tasik.sch.id',
  'siswa',
  true
)
ON CONFLICT (id) DO NOTHING;

INSERT INTO siswa (user_id, nis, nama, kelas, jurusan, kontak, status)
VALUES (
  'USER_UID_HERE', -- ⚠️ SAMA!
  '202401001',
  'Adelia Putri',
  'XII RPL 1',
  'Rekayasa Perangkat Lunak',
  '081234560001',
  'aktif'
)
ON CONFLICT (nis) 
DO UPDATE SET 
  user_id = EXCLUDED.user_id,
  nama = EXCLUDED.nama;

-- ============================================================================
-- SISWA 2: Bagus Pratama  
-- ============================================================================
-- Email: bagus.pratama@student.smkn1tasik.sch.id
-- Password: siswa123 (set di Dashboard)
-- ============================================================================

INSERT INTO users (id, email, role, is_active)
VALUES (
  'USER_UID_HERE', -- ⚠️ GANTI!
  'bagus.pratama@student.smkn1tasik.sch.id',
  'siswa',
  true
)
ON CONFLICT (id) DO NOTHING;

INSERT INTO siswa (user_id, nis, nama, kelas, jurusan, kontak, status)
VALUES (
  'USER_UID_HERE', -- ⚠️ SAMA!
  '202401003',
  'Bagus Pratama',
  'XII RPL 1',
  'Rekayasa Perangkat Lunak',
  '081234560003',
  'aktif'
)
ON CONFLICT (nis) 
DO UPDATE SET 
  user_id = EXCLUDED.user_id,
  nama = EXCLUDED.nama;

-- ============================================================================
-- VERIFICATION QUERIES
-- ============================================================================

-- Check semua users
SELECT 
  u.id,
  u.email,
  u.role,
  COALESCE(g.nama, s.nama, 'Admin') as nama,
  u.is_active
FROM users u
LEFT JOIN guru g ON u.id = g.user_id
LEFT JOIN siswa s ON u.id = s.user_id
ORDER BY u.role, u.email;

-- Check guru dengan user_id
SELECT 
  g.nip,
  g.nama,
  u.email,
  g.user_id
FROM guru g
LEFT JOIN users u ON g.user_id = u.id
ORDER BY g.nama;

-- Check siswa dengan user_id
SELECT 
  s.nis,
  s.nama,
  s.kelas,
  u.email,
  s.user_id
FROM siswa s
LEFT JOIN users u ON s.user_id = u.id
ORDER BY s.nama;

-- ============================================================================
-- Success Message
-- ============================================================================
DO $$
BEGIN
  RAISE NOTICE '';
  RAISE NOTICE '═══════════════════════════════════════════════════';
  RAISE NOTICE '  MANUAL USER SETUP COMPLETE!';
  RAISE NOTICE '═══════════════════════════════════════════════════';
  RAISE NOTICE '';
  RAISE NOTICE '✅ Jika semua users ter-insert dengan benar:';
  RAISE NOTICE '';
  RAISE NOTICE '📋 Test Accounts:';
  RAISE NOTICE '  Admin:  admin@smkn1tasik.sch.id / admin123';
  RAISE NOTICE '  Guru:   ahmad.yusuf@smkn1tasik.sch.id / guru123';
  RAISE NOTICE '  Siswa:  adelia.putri@student.smkn1tasik.sch.id / siswa123';
  RAISE NOTICE '';
  RAISE NOTICE '🧪 Next: Test login di /login';
  RAISE NOTICE '';
  RAISE NOTICE '═══════════════════════════════════════════════════';
END $$;
