# Quick Setup: Demo Users untuk Login

## 🎯 Yang Harus Dilakukan

### Step 1: Buat 3 User di Supabase Dashboard

1. Buka: https://supabase.com/dashboard/project/pyufuatqzoixziujvxcp/auth/users
2. Untuk **SETIAP** email di bawah, klik **Add user** → **Create new user**:

| Email | Password | Auto Confirm |
|-------|----------|--------------|
| `admin@simmas.sch.id` | `password123` | ✅ CENTANG |
| `guru@simmas.sch.id` | `password123` | ✅ CENTANG |
| `siswa@simmas.sch.id` | `password123` | ✅ CENTANG |

3. **Setiap kali create user, COPY User UID-nya** (contoh: `d0cd4b04-9672-...`)

### Step 2: Link User ke Database

Buka Supabase SQL Editor dan jalankan query ini (ganti `<uid>` dengan UID yang Anda copy):

```sql
-- ══════════════════════════════════════════════════════════
-- ADMIN
-- ══════════════════════════════════════════════════════════
INSERT INTO public.users (id, email, role, is_active, created_at, updated_at)
VALUES (
  '<admin_uid>',  -- ← Ganti dengan UID admin dari Dashboard
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
-- GURU
-- ══════════════════════════════════════════════════════════
-- 1. Insert ke tabel users
INSERT INTO public.users (id, email, role, is_active, created_at, updated_at)
VALUES (
  '<guru_uid>',  -- ← Ganti dengan UID guru dari Dashboard
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

-- 2. Insert ke tabel guru (dengan nama)
INSERT INTO public.guru (id, user_id, nip, nama, kontak, status, created_at, updated_at)
VALUES (
  gen_random_uuid(),
  '<guru_uid>',  -- ← Ganti dengan UID guru (sama seperti di atas)
  '197801012006041001',
  'Budi Santoso, S.Pd',
  '081234567890',
  'aktif',
  NOW(),
  NOW()
)
ON CONFLICT (user_id) DO UPDATE SET
  nip = EXCLUDED.nip,
  nama = EXCLUDED.nama,
  kontak = EXCLUDED.kontak,
  status = EXCLUDED.status,
  updated_at = NOW();

-- ══════════════════════════════════════════════════════════
-- SISWA
-- ══════════════════════════════════════════════════════════
-- 1. Insert ke tabel users
INSERT INTO public.users (id, email, role, is_active, created_at, updated_at)
VALUES (
  '<siswa_uid>',  -- ← Ganti dengan UID siswa dari Dashboard
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

-- 2. Insert ke tabel siswa (dengan nama)
INSERT INTO public.siswa (
  id, user_id, nis, nama, kelas, jurusan, 
  kontak, alamat, status, created_at, updated_at
)
VALUES (
  gen_random_uuid(),
  '<siswa_uid>',  -- ← Ganti dengan UID siswa (sama seperti di atas)
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
```

### Step 3: Test Login

1. Pastikan dev server berjalan: `npm run dev`
2. Buka: http://localhost:3000/login
3. Klik salah satu tombol **Akun Demo**
4. Klik **Masuk Dashboard**

**Expected result**: Berhasil login dan diarahkan ke dashboard sesuai role

## 🔍 Verifikasi User Sudah Benar

Jalankan query ini untuk cek:

```sql
SELECT id, email, role, is_active
FROM public.users
WHERE email IN (
  'admin@simmas.sch.id',
  'guru@simmas.sch.id',
  'siswa@simmas.sch.id'
)
ORDER BY role;
```

Seharusnya muncul 3 rows: admin, guru, siswa.

## ❌ Troubleshooting

### "Invalid login credentials"
→ User belum dibuat di Supabase Dashboard, atau password salah

### "Data user tidak ditemukan"
→ User ada di `auth.users` tapi belum di-link ke `public.users` (belum jalankan Step 2)

### "Email rate limit exceeded"
→ Tunggu 5-10 menit, atau gunakan email lain

## ✅ Checklist

- [ ] 3 user dibuat di Supabase Dashboard (admin, guru, siswa)
- [ ] SQL query dijalankan untuk link ke database
- [ ] Verifikasi query menunjukkan 3 user ada
- [ ] Test login admin berhasil
- [ ] Test login guru berhasil
- [ ] Test login siswa berhasil

---

**Setelah semua berhasil**, Anda bisa mulai develop fitur-fitur lainnya! 🚀
