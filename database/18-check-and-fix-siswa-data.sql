-- ═══════════════════════════════════════════════════════════════════════════
-- CHECK DAN FIX DATA SISWA UNTUK ABSENSI
-- ═══════════════════════════════════════════════════════════════════════════

-- Step 1: Cek apakah user siswa sudah ada
-- Jalankan query ini dulu untuk dapatkan user_id siswa
SELECT id, email, role 
FROM public.users 
WHERE email = 'siswa@simmas.sch.id';

-- Step 2: Cek apakah data siswa sudah ada di tabel siswa
SELECT * 
FROM public.siswa 
WHERE user_id IN (
  SELECT id FROM public.users WHERE email = 'siswa@simmas.sch.id'
);

-- Step 3: Jika belum ada, INSERT data siswa
-- GANTI '<siswa_uid>' dengan id yang didapat dari Step 1
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
  '<siswa_uid>',  -- ← GANTI dengan user_id dari Step 1
  '2024001',
  'Ahmad Fauzi',
  'XII RPL 1',
  'Rekayasa Perangkat Lunak',
  '081234567891',
  'Jl. Merdeka No. 123, Tasikmalaya',
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

-- Step 4: Verifikasi data siswa sudah ada
SELECT 
  s.id as siswa_id,
  s.nis,
  s.nama,
  s.kelas,
  u.email,
  u.role
FROM public.siswa s
JOIN public.users u ON s.user_id = u.id
WHERE u.email = 'siswa@simmas.sch.id';

-- Jika query ini return 1 row, berarti sudah OK!
-- Sekarang bisa test absensi di aplikasi
