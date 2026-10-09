# 🚀 Quick Start Guide - SIMMAS Database

Panduan cepat untuk setup database SIMMAS di Supabase dalam 10 menit!

---

## ⚡ Setup Cepat (Rekomendasi)

### Opsi 1: Copy-Paste Individual Scripts (Paling Aman)

1. **Buka Supabase Dashboard** → Project Anda → SQL Editor

2. **Jalankan script satu per satu:**

```bash
# Script 1: Tabel
Copy isi file: 01-create-tables.sql → Paste → Run

# Script 2: Indexes  
Copy isi file: 02-create-indexes.sql → Paste → Run

# Script 3: Functions & Triggers
Copy isi file: 03-create-functions-triggers.sql → Paste → Run

# Script 4: Views
Copy isi file: 04-create-views.sql → Paste → Run

# Script 5: Enable RLS
Copy isi file: 05-enable-rls.sql → Paste → Run

# Script 6: Admin Policies
Copy isi file: 06-create-policies-admin.sql → Paste → Run

# Script 7: Guru Policies
Copy isi file: 07-create-policies-guru.sql → Paste → Run

# Script 8: Siswa Policies
Copy isi file: 08-create-policies-siswa.sql → Paste → Run

# Script 9: Storage Buckets
Copy isi file: 09-create-storage.sql → Paste → Run

# Script 10: Sample Data
Copy isi file: 10-seed-data.sql → Paste → Run
```

⏱️ **Estimasi waktu:** 10-15 menit

---

## ✅ Verifikasi Setup

Setelah semua script dijalankan, verifikasi dengan query berikut:

### 1. Cek Tabel

```sql
SELECT tablename 
FROM pg_tables 
WHERE schemaname = 'public' 
ORDER BY tablename;
```

**Expected output:** 11 tabel (users, guru, siswa, dudi, penempatan, absensi, jurnal, kunjungan, log_aktivitas, pengaturan, notifikasi)

### 2. Cek Views

```sql
SELECT viewname 
FROM pg_views 
WHERE schemaname = 'public' 
ORDER BY viewname;
```

**Expected output:** 15+ views (v_statistik_admin, v_monitoring_absensi, dll)

### 3. Cek Functions

```sql
SELECT proname 
FROM pg_proc 
WHERE pronamespace = 'public'::regnamespace 
ORDER BY proname;
```

**Expected output:** 10+ functions (is_admin, is_guru, is_siswa, dll)

### 4. Cek RLS Policies

```sql
SELECT schemaname, tablename, policyname, cmd
FROM pg_policies 
WHERE schemaname = 'public'
ORDER BY tablename, policyname;
```

**Expected output:** 50+ policies untuk berbagai tabel dan role

### 5. Cek Storage Buckets

```sql
SELECT * FROM storage.buckets;
```

**Expected output:** 4 buckets (absensi-foto, dokumen, kunjungan-foto, profil-foto)

### 6. Cek Sample Data

```sql
-- Cek guru
SELECT COUNT(*) as total_guru FROM guru;
-- Expected: 4 guru

-- Cek siswa
SELECT COUNT(*) as total_siswa FROM siswa;
-- Expected: 5 siswa

-- Cek dudi
SELECT COUNT(*) as total_dudi FROM dudi;
-- Expected: 5 dudi

-- Cek penempatan
SELECT COUNT(*) as total_penempatan FROM penempatan;
-- Expected: 4 penempatan

-- Cek pengaturan
SELECT key, value FROM pengaturan ORDER BY key;
-- Expected: 12 pengaturan sistem
```

---

## 🧪 Test Login

### Test dengan Supabase Auth API

```javascript
// Admin Login
const { data, error } = await supabase.auth.signInWithPassword({
  email: 'admin@smkn1tasik.sch.id',
  password: 'admin123' // GANTI di production!
});

console.log('Admin User:', data.user);
console.log('Role:', data.user.user_metadata.role);
```

```javascript
// Guru Login
const { data, error } = await supabase.auth.signInWithPassword({
  email: 'ahmad.yusuf@smkn1tasik.sch.id',
  password: 'guru123' // GANTI di production!
});
```

```javascript
// Siswa Login
const { data, error } = await supabase.auth.signInWithPassword({
  email: 'adelia.putri@student.smkn1tasik.sch.id',
  password: 'siswa123' // GANTI di production!
});
```

---

## 🔍 Test RLS Policies

### Test sebagai Admin

```sql
-- Set role sebagai admin (simulasi)
SET LOCAL ROLE authenticated;
SET LOCAL request.jwt.claims = '{"sub": "admin-user-id", "role": "admin"}';

-- Admin bisa lihat semua siswa
SELECT * FROM siswa;
-- Expected: Semua data siswa muncul ✅
```

### Test sebagai Guru

```sql
-- Set role sebagai guru
SET LOCAL request.jwt.claims = '{"sub": "guru-user-id", "role": "guru"}';

-- Guru hanya lihat siswa bimbingan
SELECT * FROM siswa;
-- Expected: Hanya siswa dengan guru_pembimbing_id = guru tersebut ✅
```

### Test sebagai Siswa

```sql
-- Set role sebagai siswa
SET LOCAL request.jwt.claims = '{"sub": "siswa-user-id", "role": "siswa"}';

-- Siswa hanya lihat data sendiri
SELECT * FROM siswa;
-- Expected: Hanya 1 data (siswa sendiri) ✅

-- Siswa tidak bisa lihat siswa lain
SELECT * FROM siswa WHERE nis != '202401001';
-- Expected: 0 rows ✅
```

---

## 📤 Test Storage Upload

### Upload File dengan JavaScript

```javascript
// Upload foto absensi
const siswaId = 'uuid-siswa-id';
const file = /* File object dari input */;

const { data, error } = await supabase.storage
  .from('absensi-foto')
  .upload(`${siswaId}/2024-10-04_masuk.jpg`, file, {
    contentType: 'image/jpeg',
    upsert: true
  });

if (error) {
  console.error('Upload error:', error);
} else {
  console.log('Upload success:', data.path);
}
```

### Get Public URL

```javascript
const { data } = supabase.storage
  .from('profil-foto')
  .getPublicUrl('user-id/avatar.jpg');

console.log('Public URL:', data.publicUrl);
```

---

## 🎯 Common Operations

### 1. Tambah Siswa Baru

```sql
-- 1. Insert user
INSERT INTO users (email, password_hash, role)
VALUES ('baru.siswa@student.smkn1tasik.sch.id', '$2a$10$...', 'siswa')
RETURNING id;

-- 2. Insert siswa (gunakan id dari step 1)
INSERT INTO siswa (user_id, nis, nama, kelas, jurusan, guru_pembimbing_id)
VALUES (
  'user-id-dari-step-1',
  '202401099',
  'Siswa Baru',
  'XII RPL 1',
  'Rekayasa Perangkat Lunak',
  (SELECT id FROM guru WHERE nip = '197805122008012001')
);
```

### 2. Approve Penempatan

```sql
UPDATE penempatan
SET status = 'disetujui',
    tanggal_mulai = '2024-10-01',
    tanggal_selesai = '2025-03-31'
WHERE id = 'penempatan-id'
  AND status = 'menunggu';
```

### 3. Validasi Jurnal

```sql
UPDATE jurnal
SET status = 'disetujui',
    divalidasi_oleh = (SELECT id FROM guru WHERE user_id = auth.uid()),
    tanggal_validasi = NOW()
WHERE id = 'jurnal-id'
  AND status = 'terkirim';
```

### 4. Lihat Dashboard Admin

```sql
-- Statistik ringkas
SELECT * FROM v_statistik_admin;

-- Absensi hari ini
SELECT * FROM v_monitoring_absensi 
WHERE tanggal = CURRENT_DATE;

-- Jurnal perlu validasi
SELECT * FROM v_monitoring_jurnal 
WHERE status = 'terkirim';
```

---

## ⚠️ Troubleshooting

### Error: "permission denied for table"

**Penyebab:** RLS policies belum dibuat atau user tidak punya akses

**Solusi:**
```sql
-- Cek policies untuk tabel
SELECT * FROM pg_policies WHERE tablename = 'nama_tabel';

-- Jalankan ulang script policies
-- 06-create-policies-admin.sql
-- 07-create-policies-guru.sql
-- 08-create-policies-siswa.sql
```

### Error: "violates foreign key constraint"

**Penyebab:** Mencoba insert data dengan foreign key yang tidak ada

**Solusi:**
```sql
-- Pastikan data parent sudah ada
SELECT * FROM users WHERE id = 'user-id-yang-direferensikan';
SELECT * FROM guru WHERE id = 'guru-id-yang-direferensikan';
```

### Error: "duplicate key value violates unique constraint"

**Penyebab:** Mencoba insert data dengan nilai unique yang sudah ada (email, nis, nip, dll)

**Solusi:**
```sql
-- Cek data yang sudah ada
SELECT * FROM users WHERE email = 'email@example.com';
SELECT * FROM siswa WHERE nis = '202401001';
SELECT * FROM guru WHERE nip = '197805122008012001';
```

### Error: "function does not exist"

**Penyebab:** Functions belum dibuat

**Solusi:**
```sql
-- Jalankan ulang script functions
-- 03-create-functions-triggers.sql
```

---

## 🔒 Security Checklist

Sebelum production:

- [ ] ✅ Ganti semua password default
- [ ] ✅ Review RLS policies
- [ ] ✅ Test policies untuk setiap role
- [ ] ✅ Enable Supabase Auth Email Verification
- [ ] ✅ Setup password strength requirements
- [ ] ✅ Enable MFA untuk admin
- [ ] ✅ Review storage bucket policies
- [ ] ✅ Setup backup schedule
- [ ] ✅ Enable audit logging
- [ ] ✅ Setup monitoring alerts

---

## 📊 Performance Optimization

### Indexes Already Created

✅ Foreign key indexes  
✅ Date column indexes  
✅ Status column indexes  
✅ Full-text search indexes  
✅ Composite indexes  

### Monitor Slow Queries

```sql
-- Enable query stats
ALTER DATABASE postgres SET track_activity_queries = on;

-- View slow queries
SELECT query, calls, total_time, mean_time
FROM pg_stat_statements
ORDER BY mean_time DESC
LIMIT 10;
```

---

## 🎓 Next Steps

1. **Setup Frontend Integration**
   - Install Supabase JS Client
   - Configure environment variables
   - Implement authentication

2. **Customize**
   - Adjust RLS policies sesuai kebutuhan
   - Tambah field custom jika perlu
   - Modifikasi views untuk reporting

3. **Deploy**
   - Test thoroughly di development
   - Setup staging environment
   - Deploy to production

4. **Monitor**
   - Setup Supabase monitoring
   - Review logs regularly
   - Optimize slow queries

---

## 📚 Resources

- [Supabase Documentation](https://supabase.com/docs)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Row Level Security Guide](https://supabase.com/docs/guides/auth/row-level-security)
- [Storage Documentation](https://supabase.com/docs/guides/storage)

---

## 🆘 Need Help?

Jika masih ada masalah:

1. Cek error message di Supabase Logs
2. Review dokumentasi di `README.md`
3. Lihat ERD di `ERD.md`
4. Konsultasi dengan team

---

**Happy Coding! 🚀**

Last Updated: October 4, 2026
