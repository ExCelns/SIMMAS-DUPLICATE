-- ============================================================================
-- SIMMAS - Insert Demo Users (FIXED)
-- ============================================================================
-- PENTING: Hapus tanda < > saat paste UID!
-- Contoh: 'aa355845-402d-44e2-b2be-35efc0d87ca4'
--         BUKAN '<aa355845-402d-44e2-b2be-35efc0d87ca4>'
-- ============================================================================

-- ══════════════════════════════════════════════════════════
-- 1. ADMIN USER
-- ══════════════════════════════════════════════════════════
INSERT INTO public.users (id, email, role, is_active, created_at, updated_at)
VALUES (
  'PASTE_ADMIN_UID_DI_SINI',
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
INSERT INTO public.users (id, email, role, is_active, created_at, updated_at)
VALUES (
  'PASTE_GURU_UID_DI_SINI',
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

INSERT INTO public.guru (id, user_id, nip, nama, mata_pelajaran, kontak, status, created_at, updated_at)
VALUES (
  gen_random_uuid(),
  'PASTE_GURU_UID_DI_SINI',
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
INSERT INTO public.users (id, email, role, is_active, created_at, updated_at)
VALUES (
  'PASTE_SISWA_UID_DI_SINI',
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
  'PASTE_SISWA_UID_DI_SINI',
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
  RAISE NOTICE '✅ Demo users berhasil dibuat!';
  RAISE NOTICE 'Test login di: http://localhost:3000/login';
END $$;
