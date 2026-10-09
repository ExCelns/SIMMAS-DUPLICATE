# 📑 Database Files Index - SIMMAS

Daftar lengkap semua file database dengan deskripsi dan urutan eksekusi.

---

## 📂 File Structure

```
database/
├── INDEX.md                              ← You are here
├── README.md                             ← Main documentation
├── QUICK-START.md                        ← Quick setup guide
├── ERD.md                                ← Database diagram & relationships
│
├── 01-create-tables.sql                  ← Step 1: Create all tables
├── 02-create-indexes.sql                 ← Step 2: Create indexes
├── 03-create-functions-triggers.sql      ← Step 3: Create functions & triggers
├── 04-create-views.sql                   ← Step 4: Create views
├── 05-enable-rls.sql                     ← Step 5: Enable RLS
├── 06-create-policies-admin.sql          ← Step 6: Admin policies
├── 07-create-policies-guru.sql           ← Step 7: Guru policies
├── 08-create-policies-siswa.sql          ← Step 8: Siswa policies
├── 09-create-storage.sql                 ← Step 9: Storage buckets
├── 10-seed-data.sql                      ← Step 10: Sample data
│
└── run-all.sql                           ← Run all scripts (advanced)
```

---

## 📖 Documentation Files

### 🌟 **INDEX.md** (This File)
**Purpose:** Quick navigation dan overview semua file  
**Read First:** Yes  
**File Type:** Documentation

### 📘 **README.md**
**Purpose:** Main documentation dengan penjelasan lengkap  
**Contains:**
- Prerequisite & requirements
- Detailed setup instructions
- Troubleshooting guide
- Deployment checklist

**When to Read:** Sebelum setup, sebagai reference utama  
**File Type:** Documentation

### ⚡ **QUICK-START.md**
**Purpose:** Setup cepat dalam 10 menit  
**Contains:**
- Step-by-step quick setup
- Verification queries
- Test scripts
- Common operations

**When to Read:** Untuk setup pertama kali  
**File Type:** Documentation

### 📊 **ERD.md**
**Purpose:** Visual database structure  
**Contains:**
- Entity Relationship Diagram
- Table relationships
- Field details
- Use case diagrams

**When to Read:** Untuk memahami struktur database  
**File Type:** Documentation

---

## 🔧 SQL Script Files

### ✅ Setup Scripts (Execute in Order)

#### **01-create-tables.sql**
**Status:** ⭐ Required  
**Execute:** First  
**Purpose:** Membuat semua tabel database  
**Creates:**
- 11 tables (users, guru, siswa, dudi, penempatan, absensi, jurnal, kunjungan, log_aktivitas, pengaturan, notifikasi)
- Primary keys
- Foreign keys
- Check constraints
- Unique constraints

**Duration:** ~30 seconds  
**Dependencies:** None  

---

#### **02-create-indexes.sql**
**Status:** ⭐ Required  
**Execute:** Second  
**Purpose:** Membuat indexes untuk performa query  
**Creates:**
- B-tree indexes untuk foreign keys
- Indexes untuk date columns
- Indexes untuk status columns
- Full-text search indexes (GIN)
- Composite indexes

**Duration:** ~1 minute  
**Dependencies:** 01-create-tables.sql  

---

#### **03-create-functions-triggers.sql**
**Status:** ⭐ Required  
**Execute:** Third  
**Purpose:** Membuat automasi database  
**Creates:**
- 10+ functions untuk business logic
- Triggers untuk auto-update timestamp
- Triggers untuk logging
- Triggers untuk notifications
- Validation functions

**Key Functions:**
- `update_updated_at_column()` - Auto timestamp
- `is_admin()`, `is_guru()`, `is_siswa()` - Role checks
- `get_guru_id()`, `get_siswa_id()` - Get current user IDs
- `validasi_kapasitas_dudi()` - Capacity validation
- `kirim_notifikasi()` - Send notifications

**Duration:** ~1 minute  
**Dependencies:** 01-create-tables.sql  

---

#### **04-create-views.sql**
**Status:** ⭐ Required  
**Execute:** Fourth  
**Purpose:** Membuat views untuk reporting  
**Creates:**
- 15+ views untuk dashboard
- Views untuk monitoring
- Views dengan JOIN kompleks
- Statistical views

**Key Views:**
- `v_statistik_admin` - Admin dashboard stats
- `v_monitoring_absensi` - Attendance monitoring
- `v_monitoring_jurnal` - Journal monitoring
- `v_dashboard_siswa` - Student dashboard
- `v_dashboard_guru` - Teacher dashboard

**Duration:** ~30 seconds  
**Dependencies:** 01-create-tables.sql  

---

#### **05-enable-rls.sql**
**Status:** ⭐ Required  
**Execute:** Fifth  
**Purpose:** Mengaktifkan Row Level Security  
**Enables RLS on:**
- All 11 tables
- Prepares for policy creation

**Duration:** ~10 seconds  
**Dependencies:** 01-create-tables.sql  

---

#### **06-create-policies-admin.sql**
**Status:** ⭐ Required  
**Execute:** Sixth  
**Purpose:** Membuat RLS policies untuk Admin  
**Creates:**
- Full access policies untuk admin
- Helper function `is_admin()`
- Policies untuk semua operasi CRUD

**Duration:** ~1 minute  
**Dependencies:** 05-enable-rls.sql  

---

#### **07-create-policies-guru.sql**
**Status:** ⭐ Required  
**Execute:** Seventh  
**Purpose:** Membuat RLS policies untuk Guru  
**Creates:**
- Limited access policies untuk guru
- Helper function `is_guru()`, `get_guru_id()`
- Access to siswa bimbingan only
- Validation rights for journals

**Duration:** ~1 minute  
**Dependencies:** 05-enable-rls.sql, 06-create-policies-admin.sql  

---

#### **08-create-policies-siswa.sql**
**Status:** ⭐ Required  
**Execute:** Eighth  
**Purpose:** Membuat RLS policies untuk Siswa  
**Creates:**
- Restricted access policies untuk siswa
- Helper function `is_siswa()`, `get_siswa_id()`
- Access to own data only
- CRUD rights for own attendance & journals

**Duration:** ~1 minute  
**Dependencies:** 05-enable-rls.sql, 06-create-policies-admin.sql  

---

#### **09-create-storage.sql**
**Status:** ⭐ Required  
**Execute:** Ninth  
**Purpose:** Membuat storage buckets & policies  
**Creates:**
- 4 storage buckets
  - absensi-foto (5MB, images)
  - dokumen (10MB, documents)
  - kunjungan-foto (5MB, images)
  - profil-foto (2MB, images, public)
- Storage policies untuk setiap role

**Duration:** ~30 seconds  
**Dependencies:** 06-create-policies-admin.sql  

---

#### **10-seed-data.sql**
**Status:** ⚠️ Optional (Recommended for Testing)  
**Execute:** Tenth  
**Purpose:** Insert sample data untuk testing  
**Inserts:**
- 12 pengaturan sistem
- 1 admin user
- 4 guru
- 5 siswa
- 5 DUDI
- 4 penempatan
- Sample absensi & jurnal

**⚠️ WARNING:** 
- Password hash adalah placeholder!
- Harus implement bcrypt di aplikasi
- Ganti semua password default

**Duration:** ~30 seconds  
**Dependencies:** All previous scripts  

---

### 🚀 **run-all.sql**
**Status:** 🔥 Advanced  
**Execute:** Only if you know what you're doing  
**Purpose:** Run semua script sekaligus  
**Contains:** Includes all 10 scripts above

**⚠️ CAUTION:**
- Hanya untuk clean database
- Tidak bisa rollback
- Gunakan dengan hati-hati

**Duration:** ~5-7 minutes  
**Dependencies:** All SQL files must exist  

---

## 🎯 Recommended Reading Order

### For First Time Setup
```
1. INDEX.md (this file) → Overview
2. QUICK-START.md → Setup dalam 10 menit
3. README.md → Reference jika ada masalah
4. ERD.md → Memahami struktur database
```

### For Understanding Database
```
1. ERD.md → Visual structure
2. README.md → Detailed documentation
3. 01-create-tables.sql → See table definitions
4. 04-create-views.sql → See view definitions
```

### For Debugging
```
1. README.md → Troubleshooting section
2. QUICK-START.md → Verification queries
3. Check specific script yang bermasalah
```

---

## 📊 File Statistics

| Category | Count | Total Size |
|----------|-------|------------|
| Documentation | 4 files | ~50KB |
| SQL Scripts | 11 files | ~200KB |
| **Total** | **15 files** | **~250KB** |

---

## ✅ Completion Checklist

### Documentation
- [x] INDEX.md - File navigation
- [x] README.md - Main documentation
- [x] QUICK-START.md - Quick setup guide
- [x] ERD.md - Database diagram

### SQL Scripts
- [x] 01-create-tables.sql
- [x] 02-create-indexes.sql
- [x] 03-create-functions-triggers.sql
- [x] 04-create-views.sql
- [x] 05-enable-rls.sql
- [x] 06-create-policies-admin.sql
- [x] 07-create-policies-guru.sql
- [x] 08-create-policies-siswa.sql
- [x] 09-create-storage.sql
- [x] 10-seed-data.sql
- [x] run-all.sql

---

## 🔗 Quick Links

| Need | Go To |
|------|-------|
| Setup database quickly | [QUICK-START.md](QUICK-START.md) |
| Detailed documentation | [README.md](README.md) |
| Understand structure | [ERD.md](ERD.md) |
| Troubleshooting | [README.md#troubleshooting](README.md#troubleshooting) |
| Test queries | [QUICK-START.md#test-rls-policies](QUICK-START.md#test-rls-policies) |

---

## 💡 Tips

**First Time Setup:**
```bash
# Ikuti urutan ini
1. Baca QUICK-START.md
2. Jalankan script 01-10 secara berurutan
3. Verifikasi dengan queries di QUICK-START.md
4. Test login dengan sample users
```

**If Something Goes Wrong:**
```bash
# Cek dokumentasi
1. Baca error message
2. Lihat troubleshooting di README.md
3. Cek script yang error
4. Jalankan ulang script tersebut
```

**For Production:**
```bash
# PENTING!
1. Review semua RLS policies
2. Ganti password default
3. Test thoroughly
4. Setup backup
5. Enable monitoring
```

---

## 📞 Support

**Found a bug?**
- Review error message
- Check troubleshooting guide
- Consult with team

**Need clarification?**
- Read detailed docs in README.md
- Check ERD for structure
- Review specific SQL file

---

**Last Updated:** October 4, 2026  
**Version:** 1.0.0  
**Maintainer:** SIMMAS Development Team
