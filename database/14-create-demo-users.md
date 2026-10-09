# Membuat User Demo untuk Login

## Akun Demo yang Harus Dibuat

Berdasarkan login page, ada 3 akun demo:

1. **Admin**: admin@simmas.sch.id
2. **Guru**: guru@simmas.sch.id  
3. **Siswa**: siswa@simmas.sch.id

**Password semua akun**: `password123`

## Langkah 1: Buat User di Supabase Dashboard

Untuk **SETIAP** akun di atas:

1. Buka Supabase Dashboard: https://supabase.com/dashboard
2. Pilih project: **pyufuatqzoixziujvxcp**
3. Klik menu **Authentication** (ikon kunci di sidebar kiri)
4. Klik tab **Users**
5. Klik tombol **Add user** (hijau, kanan atas)
6. Pilih **Create new user**
7. Isi form:
   - **Email**: (sesuai list di atas)
   - **Password**: `password123`
   - **Auto Confirm User**: ✅ CENTANG (supaya langsung bisa login)
8. Klik **Create user**
9. **PENTING**: Copy **User UID** yang muncul (contoh: `d0cd4b04-9672-435a-8a23-4c823209a945`)

Ulangi untuk ketiga akun.

## Langkah 2: Link User ke Database

Setelah membuat ketiga user di Dashboard, jalankan SQL ini di **Supabase SQL Editor**:

### Ganti <UID> dengan User UID yang Anda copy

```sql
-- ══════════════════════════════════════════════════════════
-- 1. ADMIN USER
-- ══════════════════════════════════════════════════════════
-- Ganti <admin_uid> dengan UID dari user admin@simmas.sch.id
INSERT INTO public.users (id, email, role, is_active, created_at, updated_at)
VALUES (
  '<admin_uid>',  -- ← GANTI INI
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
-- Ganti <guru_uid> dengan UID dari user guru@simmas.sch.id

-- 2a. Insert ke tabel users
INSERT INTO public.users (id, email, role, is_active, created_at, updated_at)
VALUES (
  '<guru_uid>',  -- ← GANTI INI
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

-- 2b. Tambahkan data guru ke tabel guru (dengan nama)
INSERT INTO public.guru (id, user_id, nip, nama, kontak, status, created_at, updated_at)
VALUES (
  gen_random_uuid(),
  '<guru_uid>',  -- ← GANTI INI (sama dengan di atas)
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
-- 3. SISWA USER
-- ══════════════════════════════════════════════════════════
-- Ganti <siswa_uid> dengan UID dari user siswa@simmas.sch.id

-- 3a. Insert ke tabel users
INSERT INTO public.users (id, email, role, is_active, created_at, updated_at)
VALUES (
  '<siswa_uid>',  -- ← GANTI INI
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

-- 3b. Tambahkan data siswa ke tabel siswa (dengan nama)
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
  '<siswa_uid>',  -- ← GANTI INI (sama dengan di atas)
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

## Langkah 3: Verifikasi User Sudah Terbuat

Jalankan query ini untuk cek:

```sql
-- Cek semua user demo
SELECT id, email, role, is_active, created_at
FROM public.users
WHERE email IN (
  'admin@simmas.sch.id',
  'guru@simmas.sch.id',
  'siswa@simmas.sch.id'
)
ORDER BY role;

-- Cek data guru (dengan nama)
SELECT g.id, g.nip, g.nama, u.email, u.role
FROM guru g
JOIN users u ON g.user_id = u.id
WHERE u.email = 'guru@simmas.sch.id';

-- Cek data siswa (dengan nama)
SELECT s.id, s.nis, s.nama, s.kelas, u.email, u.role
FROM siswa s
JOIN users u ON s.user_id = u.id
WHERE u.email = 'siswa@simmas.sch.id';
```

## Contoh Output yang Benar

### Query 1 (users):
```
id                                   | email                 | role  | is_active
-------------------------------------|-----------------------|-------|----------
d0cd4b04-9672-435a-8a23-4c823209a945 | admin@simmas.sch.id   | admin | true
a1b2c3d4-1234-5678-90ab-cdef12345678 | guru@simmas.sch.id    | guru  | true
e5f6g7h8-9012-3456-78ij-klmn90123456 | siswa@simmas.sch.id   | siswa | true
```

### Query 2 (guru):
```
id          | nip                  | nama                 | email              | role
------------|----------------------|----------------------|--------------------|------
xyz123...   | 197801012006041001   | Budi Santoso, S.Pd  | guru@simmas.sch.id | guru
```

### Query 3 (siswa):
```
id          | nis   | nama         | kelas    | email               | role
------------|-------|--------------|----------|---------------------|------
abc789...   | 12345 | Ahmad Fauzi  | XII RPL  | siswa@simmas.sch.id | siswa
```

## Troubleshooting

### Error: "duplicate key value violates unique constraint"
**Artinya**: User dengan email tersebut sudah ada di `public.users`

**Solusi**: Query sudah menggunakan `ON CONFLICT DO UPDATE`, jadi seharusnya tidak error. Kalau tetap error, cek apakah ada constraint lain yang bermasalah.

### Error: "violates foreign key constraint"
**Artinya**: UID yang Anda masukkan tidak ada di `auth.users`

**Solusi**: 
1. Pastikan user sudah dibuat di Supabase Dashboard → Authentication → Users
2. Copy UID yang **BENAR** dari Dashboard
3. Jalankan ulang query dengan UID yang benar

### User ada di database tapi tidak bisa login
**Penyebab**: Kemungkinan user di `auth.users` belum di-confirm

**Solusi**:
1. Buka Supabase Dashboard → Authentication → Users
2. Cari user yang bermasalah
3. Pastikan ada centang hijau di kolom "Confirmed"
4. Jika tidak, klik user → Enable "Email Confirmed"

## Langkah Selanjutnya

Setelah ketiga user berhasil dibuat:

1. ✅ Update login page untuk menggunakan Supabase Auth (bukan localStorage)
2. ✅ Test login dengan ketiga akun demo
3. ✅ Verifikasi redirect sesuai role (admin → /admin, guru → /guru, siswa → /siswa)

## Checklist

- [ ] User `admin@simmas.sch.id` dibuat di Supabase Dashboard
- [ ] User `guru@simmas.sch.id` dibuat di Supabase Dashboard
- [ ] User `siswa@simmas.sch.id` dibuat di Supabase Dashboard
- [ ] SQL script dijalankan untuk link user ke database
- [ ] Verifikasi query menunjukkan 3 user ada di `public.users`
- [ ] Verifikasi ada 1 record di tabel `guru`
- [ ] Verifikasi ada 1 record di tabel `siswa`
- [ ] Login page sudah diupdate untuk menggunakan Supabase Auth
- [ ] Test login berhasil untuk ketiga akun
