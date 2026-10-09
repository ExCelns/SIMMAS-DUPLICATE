# 👥 Manual User Creation via Supabase Dashboard

Jika `/setup-users` gagal, buat users secara manual di Supabase Dashboard.

## 📋 Langkah-langkah:

### 1. Buka Supabase Dashboard

```
https://supabase.com/dashboard
→ Pilih project Anda
→ Klik "Authentication" di sidebar
→ Klik "Users"
```

### 2. Disable Email Confirmation (WAJIB!)

```
Authentication → Settings
→ Scroll ke "Email Auth"
→ UNCHECK "Enable email confirmations"
→ Click "Save"
```

### 3. Create Users Satu per Satu

Untuk setiap user, klik **"Add user"** atau **"Invite"** dan isi:

---

#### 👨‍💼 User 1: Admin

```
Email: admin@smkn1tasik.sch.id
Password: admin123
Auto Confirm Email: ✅ YES
```

Setelah dibuat, catat **User UID** nya.

Lalu jalankan di SQL Editor:
```sql
-- Insert ke tabel users
INSERT INTO users (id, email, role, is_active)
VALUES ('USER_UID_DARI_AUTH', 'admin@smkn1tasik.sch.id', 'admin', true)
ON CONFLICT (id) DO UPDATE SET role = 'admin';
```

---

#### 👨‍🏫 User 2: Guru - Ahmad Yusuf

```
Email: ahmad.yusuf@smkn1tasik.sch.id
Password: guru123
Auto Confirm Email: ✅ YES
```

Catat **User UID**, lalu di SQL Editor:
```sql
-- Insert ke tabel users
INSERT INTO users (id, email, role, is_active)
VALUES ('USER_UID_DARI_AUTH', 'ahmad.yusuf@smkn1tasik.sch.id', 'guru', true)
ON CONFLICT (id) DO NOTHING;

-- Insert/Update guru
INSERT INTO guru (user_id, nip, nama, mata_pelajaran, kontak, status)
VALUES (
  'USER_UID_DARI_AUTH',
  '197805122008012001',
  'Ahmad Yusuf',
  'Rekayasa Perangkat Lunak',
  '081234567801',
  'aktif'
)
ON CONFLICT (nip) 
DO UPDATE SET user_id = EXCLUDED.user_id;
```

---

#### 👨‍🏫 User 3: Guru - Budi Santoso

```
Email: budi.santoso@smkn1tasik.sch.id
Password: guru123
Auto Confirm Email: ✅ YES
```

SQL:
```sql
INSERT INTO users (id, email, role, is_active)
VALUES ('USER_UID_DARI_AUTH', 'budi.santoso@smkn1tasik.sch.id', 'guru', true)
ON CONFLICT (id) DO NOTHING;

INSERT INTO guru (user_id, nip, nama, mata_pelajaran, kontak, status)
VALUES (
  'USER_UID_DARI_AUTH',
  '198203152010012002',
  'Budi Santoso',
  'Basis Data',
  '081234567802',
  'aktif'
)
ON CONFLICT (nip) 
DO UPDATE SET user_id = EXCLUDED.user_id;
```

---

#### 👨‍🎓 User 4: Siswa - Adelia Putri

```
Email: adelia.putri@student.smkn1tasik.sch.id
Password: siswa123
Auto Confirm Email: ✅ YES
```

SQL:
```sql
INSERT INTO users (id, email, role, is_active)
VALUES ('USER_UID_DARI_AUTH', 'adelia.putri@student.smkn1tasik.sch.id', 'siswa', true)
ON CONFLICT (id) DO NOTHING;

INSERT INTO siswa (user_id, nis, nama, kelas, jurusan, kontak, status)
VALUES (
  'USER_UID_DARI_AUTH',
  '202401001',
  'Adelia Putri',
  'XII RPL 1',
  'Rekayasa Perangkat Lunak',
  '081234560001',
  'aktif'
)
ON CONFLICT (nis) 
DO UPDATE SET user_id = EXCLUDED.user_id;
```

---

#### 👨‍🎓 User 5: Siswa - Bagus Pratama

```
Email: bagus.pratama@student.smkn1tasik.sch.id
Password: siswa123
Auto Confirm Email: ✅ YES
```

SQL:
```sql
INSERT INTO users (id, email, role, is_active)
VALUES ('USER_UID_DARI_AUTH', 'bagus.pratama@student.smkn1tasik.sch.id', 'siswa', true)
ON CONFLICT (id) DO NOTHING;

INSERT INTO siswa (user_id, nis, nama, kelas, jurusan, kontak, status)
VALUES (
  'USER_UID_DARI_AUTH',
  '202401003',
  'Bagus Pratama',
  'XII RPL 1',
  'Rekayasa Perangkat Lunak',
  '081234560003',
  'aktif'
)
ON CONFLICT (nis) 
DO UPDATE SET user_id = EXCLUDED.user_id;
```

---

## ✅ Verification

Setelah semua user dibuat, verifikasi:

### 1. Check Auth Users
```
Dashboard → Authentication → Users
Expected: 5 users
```

### 2. Check Database
```sql
-- Di SQL Editor
SELECT 
  u.email,
  u.role,
  COALESCE(g.nama, s.nama) as nama
FROM users u
LEFT JOIN guru g ON u.id = g.user_id
LEFT JOIN siswa s ON u.id = s.user_id
ORDER BY u.role, u.email;

-- Expected: 5 rows dengan nama yang sesuai
```

### 3. Test Login

Buka `/login` dan coba:
```
Email: admin@smkn1tasik.sch.id
Password: admin123
```

Harus berhasil login dan redirect ke dashboard!

---

## 🎯 Quick Template SQL

Copy template ini, ganti `USER_UID_DARI_AUTH` dengan UID asli:

```sql
-- ===========================================
-- TEMPLATE: Insert User Data
-- Ganti 'USER_UID_DARI_AUTH' dengan UID asli!
-- ===========================================

-- For Admin
INSERT INTO users (id, email, role, is_active)
VALUES ('USER_UID_DARI_AUTH', 'admin@smkn1tasik.sch.id', 'admin', true);

-- For Guru
INSERT INTO users (id, email, role, is_active)
VALUES ('USER_UID_DARI_AUTH', 'email@guru.com', 'guru', true);

INSERT INTO guru (user_id, nip, nama, status)
VALUES ('USER_UID_DARI_AUTH', 'NIP_NUMBER', 'NAMA_GURU', 'aktif');

-- For Siswa
INSERT INTO users (id, email, role, is_active)
VALUES ('USER_UID_DARI_AUTH', 'email@student.com', 'siswa', true);

INSERT INTO siswa (user_id, nis, nama, kelas, jurusan, status)
VALUES ('USER_UID_DARI_AUTH', 'NIS_NUMBER', 'NAMA_SISWA', 'XII RPL 1', 'RPL', 'aktif');
```

---

## ⚠️ Common Issues

### Issue: "User already exists"
**Solution:** User sudah ada, skip atau delete dulu di Auth Users

### Issue: "Foreign key violation"
**Solution:** Pastikan insert ke `users` dulu, baru `guru`/`siswa`

### Issue: "duplicate key value"
**Solution:** NIS/NIP sudah ada, gunakan nomor berbeda atau update

---

## 📞 Need Help?

Jika stuck:
1. Screenshot error message
2. Check Supabase Auth logs
3. Verify user UID benar
4. Make sure email confirmation disabled

---

**Good luck! 🚀**
