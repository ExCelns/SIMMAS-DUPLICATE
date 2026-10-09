# 🎯 Langkah Final - Setup Demo Users

## Error yang Terjadi
```
ERROR: there is no unique or exclusion constraint matching the ON CONFLICT specification
```

**Artinya**: Tabel `guru` dan `siswa` tidak punya UNIQUE constraint pada kolom `user_id`, jadi `ON CONFLICT (user_id)` tidak bisa digunakan.

## ✅ Solusi: 2 Langkah

### Step 1: Tambahkan UNIQUE Constraint

**File**: `database/17-add-unique-constraints.sql`

1. Copy isi file tersebut
2. Paste ke **Supabase SQL Editor**
3. Klik **RUN**

Query ini akan menambahkan:
- `UNIQUE` constraint pada `guru.user_id`
- `UNIQUE` constraint pada `siswa.user_id`

### Step 2: Insert Demo Users

**File**: `database/18-insert-demo-users-final.sql`

1. **Buka file** `18-insert-demo-users-final.sql`
2. **Ganti** placeholder dengan UID yang benar:
   - `ADMIN_UID_HERE` → ganti dengan UID admin (tanpa `< >`)
   - `GURU_UID_HERE` → ganti dengan UID guru (tanpa `< >`)
   - `SISWA_UID_HERE` → ganti dengan UID siswa (tanpa `< >`)
3. **Copy semua** SQL yang sudah diganti
4. **Paste** ke Supabase SQL Editor
5. **RUN**

## 📝 Contoh Cara Ganti UID

### ❌ SALAH:
```sql
VALUES (
  '<aa355845-402d-44e2-b2be-35efc0d87ca4>',  -- ❌ Ada < >
  ...
)
```

### ✅ BENAR:
```sql
VALUES (
  'aa355845-402d-44e2-b2be-35efc0d87ca4',  -- ✅ Tanpa < >
  ...
)
```

## 🚀 Cara Paling Mudah (VS Code)

1. Buka file `18-insert-demo-users-final.sql`
2. Tekan **Ctrl+H** (Find & Replace)
3. **Find**: `ADMIN_UID_HERE`
4. **Replace**: `aa355845-402d-44e2-b2be-35efc0d87ca4` (contoh UID Anda)
5. Klik **Replace All**
6. Ulangi untuk `GURU_UID_HERE` dan `SISWA_UID_HERE`
7. Copy semua → Paste ke Supabase → Run

## 🔍 Verifikasi Berhasil

Setelah menjalankan kedua SQL, jalankan query ini:

```sql
-- Cek users
SELECT id, email, role, is_active FROM users 
WHERE email LIKE '%@simmas.sch.id'
ORDER BY role;

-- Cek guru dengan nama
SELECT u.email, g.nama, g.nip, u.role FROM guru g
JOIN users u ON g.user_id = u.id;

-- Cek siswa dengan nama
SELECT u.email, s.nama, s.nis, s.kelas, u.role FROM siswa s
JOIN users u ON s.user_id = u.id;
```

**Expected Result**: 3 rows di tabel users, 1 row di guru, 1 row di siswa

## ✅ Checklist

- [ ] Jalankan `17-add-unique-constraints.sql`
- [ ] Verifikasi constraint berhasil ditambahkan
- [ ] Copy 3 UID dari Supabase Dashboard (admin, guru, siswa)
- [ ] Edit file `18-insert-demo-users-final.sql` dan ganti UID
- [ ] Pastikan tidak ada tanda `< >` di SQL
- [ ] Jalankan `18-insert-demo-users-final.sql`
- [ ] Jalankan query verifikasi
- [ ] Test login di http://localhost:3000/login

## 🎉 Setelah Berhasil

1. Buka: http://localhost:3000/login
2. Klik salah satu tombol **Akun Demo**
3. Klik **Masuk Dashboard**
4. Seharusnya berhasil login dan redirect ke dashboard!

---

**Files yang digunakan**:
1. `17-add-unique-constraints.sql` - Tambah constraint (jalankan sekali saja)
2. `18-insert-demo-users-final.sql` - Insert users (bisa dijalankan berulang kali)
