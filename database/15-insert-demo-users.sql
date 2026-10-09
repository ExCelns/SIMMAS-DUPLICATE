-- ============================================================================
-- SIMMAS - Insert Demo Users
-- ============================================================================
-- Script ini untuk membuat 3 user demo: admin, guru, siswa
-- Pastikan user sudah dibuat di Supabase Dashboard → Authentication → Users
-- ============================================================================

-- ============================================================================
-- CATATAN PENTING:
-- 1. Buat user di Dashboard terlebih dahulu dengan email dan password
-- 2. Copy User UID dari Dashboard
-- 3. Ganti <admin_uid>, <guru_uid>, <siswa_uid> dengan UID yang benar
-- 4. Jalankan script ini di Supabase SQL Editor
-- ============================================================================

-- ══════════════════════════════════════════════════════════
-- 1. ADMIN USER
-- ══════════════════════════════════════════════════════════
-- Email: admin@simmas.sch.id
-- Password: password123 (diset di Dashboard)
-- ══════════════════════════════════════════════════════════

INSERT INTO public.users (id, email, role, is_active, created_at, updated_at)
VALUES (
  '<admin_uid>',  -- ← GANTI dengan UID dari Dashboard
  'admin@simmas.sch.id',
  'admin',
  true,
  NOW(),
  NOW()
)
ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  role = EXCLUDED.role,
  is_active = EXCLUDED.is_active,
  updated_at = NOW();

-- ══════════════════════════════════════════════════════════
-- 2. GURU USER
-- ══════════════════════════════════════════════════════════
-- Email: guru@simmas.sch.id
-- Password: password123 (diset di Dashboard)
-- ══════════════════════════════════════════════════════════

-- 2a. Insert ke tabel users
INSERT INTO public.users (id, email, role, is_active, created_at, updated_at)
VALUES (
  '<guru_uid>',  -- ← GANTI dengan UID dari Dashboard
  'guru@simmas.sch.id',
  'guru',
  true,
  NOW(),
  NOW()
)
ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  role = EXCLUDED.role,
  is_active = EXCLUDED.is_active,
  updated_at = NOW();

-- 2b. Insert ke tabel guru (dengan detail lengkap)
INSERT INTO public.guru (id, user_id, nip, nama, mata_pelajaran, kontak, status, created_at, updated_at)
VALUES (
  gen_random_uuid(),
  '<guru_uid>',  -- ← GANTI dengan UID yang sama
  '197801012006041001',
  'Budi Santoso, S.Pd',
  'Pemrograman Web',
  '081234567890',
  'aktif',
  NOW(),
  NOW()
)
ON CONFLICT (user_id) DO UPDATE SET
  nip = EXCLUDED.nip,
  nama = EXCLUDED.nama,
  mata_pelajaran = EXCLUDED.mata_pelajaran,
  kontak = EXCLUDED.kontak,
  status = EXCLUDED.status,
  updated_at = NOW();

-- ══════════════════════════════════════════════════════════
-- 3. SISWA USER
-- ══════════════════════════════════════════════════════════
-- Email: siswa@simmas.sch.id
-- Password: password123 (diset di Dashboard)
-- ══════════════════════════════════════════════════════════

-- 3a. Insert ke tabel users
INSERT INTO public.users (id, email, role, is_active, created_at, updated_at)
VALUES (
  '<siswa_uid>',  -- ← GANTI dengan UID dari Dashboard
  'siswa@simmas.sch.id',
  'siswa',
  true,
  NOW(),
  NOW()
)
ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  role = EXCLUDED.role,
  is_active = EXCLUDED.is_active,
  updated_at = NOW();

-- 3b. Insert ke tabel siswa (dengan detail lengkap)
INSERT INTO public.siswa (
  id, 
  user_id, 
  nis, 
  nama, 
  kelas, 
  jurusan, 
  kontak, 
  alamat,
  status,
  created_at, 
  updated_at
)
VALUES (
  gen_random_uuid(),
  '<siswa_uid>',  -- ← GANTI dengan UID yang sama
  '12345',
  'Ahmad Fauzi',
  'XII RPL',
  'Rekayasa Perangkat Lunak',
  '081234567891',
  'Jl. Contoh No. 123, Tasikmalaya',
  'aktif',
  NOW(),
  NOW()
)
ON CONFLICT (user_id) DO UPDATE SET
  nis = EXCLUDED.nis,
  nama = EXCLUDED.nama,
  kelas = EXCLUDED.kelas,
  jurusan = EXCLUDED.jurusan,
  kontak = EXCLUDED.kontak,
  alamat = EXCLUDED.alamat,
  status = EXCLUDED.status,
  updated_at = NOW();

-- ============================================================================
-- VERIFIKASI
-- ============================================================================

-- Cek semua user demo
SELECT 
  u.id, 
  u.email, 
  u.role, 
  u.is_active,
  CASE 
    WHEN u.role = 'guru' THEN g.nama
    WHEN u.role = 'siswa' THEN s.nama
    ELSE 'Admin'
  END as nama
FROM public.users u
LEFT JOIN guru g ON u.id = g.user_id
LEFT JOIN siswa s ON u.id = s.user_id
WHERE u.email IN (
  'admin@simmas.sch.id',
  'guru@simmas.sch.id',
  'siswa@simmas.sch.id'
)
ORDER BY u.role;

-- ============================================================================
-- Success Message
-- ============================================================================
DO $$
BEGIN
  RAISE NOTICE '';
  RAISE NOTICE '═══════════════════════════════════════════════════';
  RAISE NOTICE '  DEMO USERS CREATED!';
  RAISE NOTICE '═══════════════════════════════════════════════════';
  RAISE NOTICE '';
  RAISE NOTICE '✅ 3 user demo berhasil dibuat:';
  RAISE NOTICE '   1. admin@simmas.sch.id (role: admin)';
  RAISE NOTICE '   2. guru@simmas.sch.id (role: guru)';
  RAISE NOTICE '   3. siswa@simmas.sch.id (role: siswa)';
  RAISE NOTICE '';
  RAISE NOTICE '🔐 Password semua: password123';
  RAISE NOTICE '';
  RAISE NOTICE '⏭️  Next: Test login di http://localhost:3000/login';
  RAISE NOTICE '';
  RAISE NOTICE '═══════════════════════════════════════════════════';
END $$;
