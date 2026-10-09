# ⚡ Quick Fix - Error "column nama does not exist"

## 🔴 Problem
Error: `column "nama" of relation "users" does not exist`

## ✅ Solution
Tabel `users` TIDAK PUNYA kolom `nama`. Nama disimpan di tabel `guru` dan `siswa`.

## 📝 Struktur Tabel yang Benar

### Tabel `users`
```
- id (UUID)
- email (TEXT)
- role (TEXT) → 'admin', 'guru', 'siswa'
- is_active (BOOLEAN)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

❌ **TIDAK ADA**: `nama`, `password_hash`

### Tabel `guru`
```
- id (UUID)
- user_id (UUID) → FK ke users.id
- nip (TEXT)
- nama (TEXT) ← NAMA ADA DI SINI
- mata_pelajaran (TEXT)
- kontak (TEXT)
- status (TEXT)
```

### Tabel `siswa`
```
- id (UUID)
- user_id (UUID) → FK ke users.id
- nis (TEXT)
- nama (TEXT) ← NAMA ADA DI SINI
- kelas (TEXT)
- jurusan (TEXT)
- kontak (TEXT)
- alamat (TEXT)
```

## 🚀 Cara Insert User yang Benar

### Copy SQL ini dan ganti `<uid>`

```sql
-- ADMIN (hanya insert ke users)
INSERT INTO users (id, email, role, is_active)
VALUES ('<admin_uid>', 'admin@simmas.sch.id', 'admin', true)
ON CONFLICT (id) DO UPDATE SET
  role = EXCLUDED.role, updated_at = NOW();

-- GURU (insert ke users + guru)
INSERT INTO users (id, email, role, is_active)
VALUES ('<guru_uid>', 'guru@simmas.sch.id', 'guru', true)
ON CONFLICT (id) DO UPDATE SET
  role = EXCLUDED.role, updated_at = NOW();

INSERT INTO guru (id, user_id, nip, nama, kontak, status)
VALUES (gen_random_uuid(), '<guru_uid>', '197801012006041001', 'Budi Santoso, S.Pd', '081234567890', 'aktif')
ON CONFLICT (user_id) DO UPDATE SET
  nama = EXCLUDED.nama, updated_at = NOW();

-- SISWA (insert ke users + siswa)
INSERT INTO users (id, email, role, is_active)
VALUES ('<siswa_uid>', 'siswa@simmas.sch.id', 'siswa', true)
ON CONFLICT (id) DO UPDATE SET
  role = EXCLUDED.role, updated_at = NOW();

INSERT INTO siswa (id, user_id, nis, nama, kelas, jurusan, kontak, alamat, status)
VALUES (gen_random_uuid(), '<siswa_uid>', '12345', 'Ahmad Fauzi', 'XII RPL', 'Rekayasa Perangkat Lunak', '081234567891', 'Jl. Contoh No. 123', 'aktif')
ON CONFLICT (user_id) DO UPDATE SET
  nama = EXCLUDED.nama, updated_at = NOW();
```

## 📍 Step by Step

1. **Buka Supabase Dashboard** → Authentication → Users
2. **Buat 3 user**: 
   - `admin@simmas.sch.id` / `password123`
   - `guru@simmas.sch.id` / `password123`
   - `siswa@simmas.sch.id` / `password123`
   - ✅ Centang "Auto Confirm User"
3. **Copy UID** setiap user
4. **Paste UID** ke SQL di atas (ganti `<admin_uid>`, `<guru_uid>`, `<siswa_uid>`)
5. **Jalankan SQL** di Supabase SQL Editor
6. **Test login** di `http://localhost:3000/login`

## ✅ Verifikasi

```sql
-- Cek users
SELECT id, email, role FROM users 
WHERE email LIKE '%@simmas.sch.id';

-- Cek guru dengan nama
SELECT u.email, g.nama, g.nip FROM guru g
JOIN users u ON g.user_id = u.id;

-- Cek siswa dengan nama
SELECT u.email, s.nama, s.nis, s.kelas FROM siswa s
JOIN users u ON s.user_id = u.id;
```

## 🎯 File yang Sudah Diperbaiki

- ✅ `database/15-insert-demo-users.sql` → SQL script yang benar
- ✅ `database/SETUP-DEMO-USERS.md` → Panduan quick setup
- ✅ `database/14-create-demo-users.md` → Panduan lengkap
- ✅ `app/login/page.tsx` → Login page menggunakan Supabase Auth

---

**Gunakan file `15-insert-demo-users.sql` untuk insert user!** 🚀
