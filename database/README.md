# Database Setup - SIMMAS (Sistem Informasi Manajemen Magang Siswa)

Dokumentasi lengkap untuk setup database Supabase untuk aplikasi SIMMAS.

## 📋 Daftar Isi

1. [Prerequisite](#prerequisite)
2. [Urutan Eksekusi](#urutan-eksekusi)
3. [Detail Script](#detail-script)
4. [Struktur Database](#struktur-database)
5. [Row Level Security](#row-level-security)
6. [Storage Buckets](#storage-buckets)
7. [Troubleshooting](#troubleshooting)

---

## ✅ Prerequisite

Sebelum menjalankan script ini, pastikan:

1. ✅ Sudah memiliki akun Supabase
2. ✅ Sudah membuat project di Supabase
3. ✅ Akses ke Supabase SQL Editor
4. ✅ Connection string dan API keys tersedia

---

## 🚀 Urutan Eksekusi

**PENTING:** Jalankan script SQL dalam urutan berikut di Supabase SQL Editor:

### 1️⃣ `01-create-tables.sql`
Membuat semua tabel utama:
- users
- guru
- siswa
- dudi
- penempatan
- absensi
- jurnal
- kunjungan
- log_aktivitas
- pengaturan
- notifikasi

**Cara Jalankan:**
```sql
-- Copy paste isi file ke Supabase SQL Editor
-- Tekan tombol Run
```

---

### 2️⃣ `02-create-indexes.sql`
Membuat indexes untuk optimasi performa query.

**Indexes yang dibuat:**
- Index untuk foreign keys
- Index untuk kolom yang sering di-search
- Full-text search indexes
- Composite indexes untuk query kompleks

---

### 3️⃣ `03-create-functions-triggers.sql`
Membuat functions dan triggers untuk automasi.

**Functions:**
- `update_updated_at_column()` - Auto update timestamp
- `catat_log_aktivitas()` - Auto logging
- `hitung_siswa_aktif_dudi()` - Hitung siswa per DUDI
- `hitung_siswa_bimbingan_guru()` - Hitung siswa per guru
- `validasi_kapasitas_dudi()` - Validasi kapasitas
- `kirim_notifikasi()` - Helper notifikasi
- `notifikasi_jurnal_divalidasi()` - Notif jurnal
- `notifikasi_penempatan_status()` - Notif penempatan

**Triggers:**
- Auto update timestamp untuk semua tabel
- Auto log untuk operasi penting
- Validasi kapasitas DUDI
- Notifikasi otomatis

---

### 4️⃣ `04-create-views.sql`
Membuat views untuk query kompleks dan dashboard.

**Views yang dibuat:**
- `v_statistik_admin` - Statistik dashboard admin
- `v_monitoring_absensi` - Monitoring absensi lengkap
- `v_monitoring_jurnal` - Monitoring jurnal lengkap
- `v_siswa_lengkap` - Data siswa dengan penempatan
- `v_guru_lengkap` - Data guru dengan statistik
- `v_dudi_lengkap` - Data DUDI dengan kapasitas
- `v_penempatan_lengkap` - Penempatan detail
- `v_statistik_absensi_siswa` - Statistik per siswa
- `v_statistik_jurnal_siswa` - Statistik jurnal
- `v_jadwal_kunjungan` - Jadwal kunjungan
- `v_log_aktivitas_lengkap` - Log dengan detail user
- `v_dashboard_siswa` - Dashboard siswa
- `v_dashboard_guru` - Dashboard guru

---

### 5️⃣ `05-enable-rls.sql`
Mengaktifkan Row Level Security pada semua tabel.

**Tabel yang di-enable RLS:**
- ✅ users
- ✅ guru
- ✅ siswa
- ✅ dudi
- ✅ penempatan
- ✅ absensi
- ✅ jurnal
- ✅ kunjungan
- ✅ log_aktivitas
- ✅ pengaturan
- ✅ notifikasi

---

### 6️⃣ `06-create-policies-admin.sql`
Membuat RLS policies untuk role ADMIN.

**Hak Akses Admin:**
- ✅ Full access ke semua tabel
- ✅ CRUD operations pada semua data
- ✅ Lihat semua log aktivitas
- ✅ Kelola semua pengaturan

---

### 7️⃣ `07-create-policies-guru.sql`
Membuat RLS policies untuk role GURU.

**Hak Akses Guru:**
- ✅ Lihat dan update data diri sendiri
- ✅ Lihat siswa bimbingan
- ✅ Update siswa bimbingan
- ✅ Lihat dan validasi jurnal siswa bimbingan
- ✅ Lihat absensi siswa bimbingan
- ✅ CRUD kunjungan yang dilakukan sendiri
- ✅ Lihat notifikasi sendiri

---

### 8️⃣ `08-create-policies-siswa.sql`
Membuat RLS policies untuk role SISWA.

**Hak Akses Siswa:**
- ✅ Lihat dan update data diri sendiri (terbatas)
- ✅ Lihat data guru pembimbing
- ✅ Lihat DUDI tempat magang
- ✅ CRUD pengajuan penempatan (status menunggu)
- ✅ CRUD absensi sendiri
- ✅ CRUD jurnal sendiri
- ✅ Lihat kunjungan terkait
- ✅ Lihat notifikasi sendiri

---

### 9️⃣ `09-create-storage.sql`
Membuat storage buckets dan policies untuk file upload.

**Storage Buckets:**
1. **absensi-foto** (5MB max, images only)
   - Foto absensi masuk/keluar siswa
   
2. **dokumen** (10MB max, documents)
   - Dokumen PDF, Word, Excel
   
3. **kunjungan-foto** (5MB max, images only)
   - Foto dokumentasi kunjungan guru
   
4. **profil-foto** (2MB max, images only)
   - Foto profil user (public)

**Storage Policies:**
- Siswa: upload foto absensi sendiri
- Guru: upload foto kunjungan sendiri
- Admin: akses semua files
- User: upload/download file sendiri

---

### 🔟 `10-seed-data.sql`
Insert data awal untuk testing.

**Data yang di-insert:**
- ✅ Pengaturan sistem
- ✅ User admin default
- ✅ 4 Guru sample
- ✅ 5 DUDI sample
- ✅ 5 Siswa sample
- ✅ Sample penempatan
- ✅ Sample absensi
- ✅ Sample jurnal

**Akun Default:**
```
ADMIN:
Email: admin@smkn1tasik.sch.id
Password: admin123

GURU (Sample):
Email: ahmad.yusuf@smkn1tasik.sch.id
Password: guru123

SISWA (Sample):
Email: adelia.putri@student.smkn1tasik.sch.id
Password: siswa123
```

⚠️ **PENTING:** Password di atas adalah placeholder. Implementasikan bcrypt hashing di aplikasi!

---

## 📊 Struktur Database

### Tabel Utama

```
users (authentication)
├── guru (pembimbing)
├── siswa (peserta magang)
└── dudi (tempat magang)

penempatan (siswa → dudi)
├── absensi (daily attendance)
└── jurnal (daily journal)

kunjungan (guru → dudi)
log_aktivitas (system logs)
pengaturan (system config)
notifikasi (notifications)
```

### Entity Relationship

```
users 1──* siswa
users 1──* guru
siswa *──1 guru [pembimbing]
siswa 1──* penempatan
dudi 1──* penempatan
guru 1──* penempatan
penempatan 1──* absensi
penempatan 1──* jurnal
siswa 1──* absensi
siswa 1──* jurnal
guru *──* kunjungan
dudi *──* kunjungan
```

---

## 🔒 Row Level Security (RLS)

### Admin Policies
```sql
-- Admin dapat akses SEMUA data
CREATE POLICY "Admin dapat akses semua"
ON [table_name] FOR ALL
TO authenticated
USING (is_admin());
```

### Guru Policies
```sql
-- Guru hanya bisa akses data siswa bimbingannya
CREATE POLICY "Guru akses siswa bimbingan"
ON siswa FOR SELECT
TO authenticated
USING (guru_pembimbing_id = get_guru_id());
```

### Siswa Policies
```sql
-- Siswa hanya bisa akses data diri sendiri
CREATE POLICY "Siswa akses data sendiri"
ON siswa FOR SELECT
TO authenticated
USING (user_id = auth.uid());
```

---

## 💾 Storage Buckets

### Struktur Folder

```
absensi-foto/
├── {siswa_id}/
│   ├── {date}_masuk.jpg
│   └── {date}_keluar.jpg

dokumen/
├── {user_id}/
│   ├── cv.pdf
│   └── sertifikat.pdf

kunjungan-foto/
├── {guru_id}/
│   └── {date}_{dudi_id}.jpg

profil-foto/
└── {user_id}/
    └── avatar.jpg
```

### Upload Example (JavaScript)

```javascript
// Upload foto absensi
const { data, error } = await supabase.storage
  .from('absensi-foto')
  .upload(`${siswaId}/${date}_masuk.jpg`, file);

// Get public URL
const { data: { publicUrl } } = supabase.storage
  .from('profil-foto')
  .getPublicUrl(`${userId}/avatar.jpg`);
```

---

## 🔧 Troubleshooting

### Error: "relation already exists"
```sql
-- Sudah pernah jalankan script sebelumnya
-- Cek dengan:
SELECT tablename FROM pg_tables WHERE schemaname = 'public';

-- Jika ingin reset (HATI-HATI, data akan hilang):
DROP SCHEMA public CASCADE;
CREATE SCHEMA public;
```

### Error: "permission denied"
```sql
-- Pastikan RLS policies sudah dibuat
-- Cek policies:
SELECT * FROM pg_policies WHERE schemaname = 'public';

-- Test dengan role tertentu
SET LOCAL ROLE authenticated;
SELECT * FROM siswa;
```

### Error: "function does not exist"
```sql
-- Pastikan sudah jalankan script functions
-- Cek functions:
SELECT proname FROM pg_proc WHERE pronamespace = 'public'::regnamespace;
```

### Performance Issues
```sql
-- Cek indexes
SELECT * FROM pg_indexes WHERE schemaname = 'public';

-- Analyze query performance
EXPLAIN ANALYZE SELECT * FROM v_monitoring_absensi;

-- Rebuild indexes jika perlu
REINDEX TABLE siswa;
```

---

## 📝 Notes

1. **Password Hashing**
   - JANGAN simpan password plain text
   - Gunakan bcrypt dengan salt rounds 10+
   - Implementasi di aplikasi, bukan di database

2. **UUID vs Auto Increment**
   - Database ini menggunakan UUID untuk keamanan
   - Tidak bisa ditebak seperti auto increment ID
   - Lebih baik untuk distributed systems

3. **RLS Testing**
   - Test policies dengan user yang berbeda
   - Jangan disable RLS di production
   - Monitor unauthorized access attempts

4. **Backup Strategy**
   - Supabase auto backup daily
   - Download manual backup sebelum migration
   - Test restore procedure

5. **Monitoring**
   - Monitor slow queries di Supabase Dashboard
   - Set up alerts untuk high CPU usage
   - Review logs secara berkala

---

## 🆘 Support

Jika ada masalah:

1. Cek Supabase Logs di Dashboard
2. Review error message dengan teliti
3. Cek dokumentasi Supabase
4. Konsultasi dengan team

---

## ✅ Checklist Deployment

- [ ] Jalankan semua script 01-10 secara berurutan
- [ ] Verifikasi semua tabel terbuat
- [ ] Test login dengan akun default
- [ ] Test RLS policies untuk setiap role
- [ ] Test file upload ke storage
- [ ] Ganti semua password default
- [ ] Setup backup schedule
- [ ] Review dan adjust policies sesuai kebutuhan
- [ ] Monitor performa query
- [ ] Setup monitoring dan alerts

---

**Last Updated:** October 4, 2026
**Version:** 1.0.0
**Maintainer:** SIMMAS Development Team
