-- ============================================================================
-- SIMMAS - Insert Demo Users (FINAL VERSION)
-- ============================================================================
-- Pastikan sudah menjalankan 17-add-unique-constraints.sql terlebih dahulu!
-- ============================================================================

-- ══════════════════════════════════════════════════════════
-- 1. ADMIN USER
-- ══════════════════════════════════════════════════════════
-- Ganti ADMIN_UID_HERE dengan UID dari Dashboard
-- Contoh: aa355845-402d-44e2-b2be-35efc0d87ca4 (tanpa tanda < >)

INSERT INTO public.users (id, email, role, is_active, created_at, updated_at)
VALUES (
  'ADMIN_UID_HERE',
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
-- Ganti GURU_UID_HERE dengan UID dari Dashboard

-- 2a. Insert ke tabel users
INSERT INTO public.users (id, email, role, is_active, created_at, updated_at)
VALUES (
  'GURU_UID_HERE',
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

-- 2b. Insert ke tabel guru
INSERT INTO public.guru (id, user_id, nip, nama, mata_pelajaran, kontak, status, created_at, updated_at)
VALUES (
  gen_random_uuid(),
  'GURU_UID_HERE',
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
-- Ganti SISWA_UID_HERE dengan UID dari Dashboard

-- 3a. Insert ke tabel users
INSERT INTO public.users (id, email, role, is_active, created_at, updated_at)
VALUES (
  'SISWA_UID_HERE',
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

-- 3b. Insert ke tabel siswa
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
  'SISWA_UID_HERE',
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
SELECT 
  u.id, 
  u.email, 
  u.role, 
  u.is_active,
  CASE 
    WHEN u.role = 'guru' THEN g.nama
    WHEN u.role = 'siswa' THEN s.nama
    ELSE 'Administrator'
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
  RAISE NOTICE '════════════════════════════════════════════';
  RAISE NOTICE '  ✅ DEMO USERS BERHASIL DIBUAT!';
  RAISE NOTICE '════════════════════════════════════════════';
  RAISE NOTICE '';
  RAISE NOTICE '📧 Email & Password:';
  RAISE NOTICE '  • admin@simmas.sch.id / password123';
  RAISE NOTICE '  • guru@simmas.sch.id / password123';
  RAISE NOTICE '  • siswa@simmas.sch.id / password123';
  RAISE NOTICE '';
  RAISE NOTICE '🔗 Test login:';
  RAISE NOTICE '  http://localhost:3000/login';
  RAISE NOTICE '';
  RAISE NOTICE '════════════════════════════════════════════';
END $$;
