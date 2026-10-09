# Troubleshooting: Absensi Foto Tidak Bisa Digunakan

## 🔴 Error: "Silakan login terlebih dahulu"

### Penyebab
Halaman absensi tidak menemukan data user di localStorage.

### Solusi
1. **Logout dan Login Kembali**
   ```
   1. Kunjungi: http://localhost:3000/logout
   2. Tunggu sampai diarahkan ke login
   3. Login kembali menggunakan siswa@simmas.sch.id
   ```

2. **Clear localStorage dan Login Ulang**
   - Buka browser DevTools (F12)
   - Tab Application → Storage → Local Storage
   - Hapus semua item
   - Login kembali

---

## 🔴 Error: "Data siswa tidak ditemukan"

### Penyebab
User siswa ada di `auth.users` dan `public.users`, tapi **TIDAK ADA** di tabel `public.siswa`.

### Cara Cek
Jalankan query ini di Supabase SQL Editor:

```sql
-- 1. Cek user_id siswa
SELECT id, email, role 
FROM public.users 
WHERE email = 'siswa@simmas.sch.id';
```

**Copy** `id` yang muncul (contoh: `d0cd4b04-9672-4b68-8a9f-123456789abc`)

```sql
-- 2. Cek apakah siswa ada di tabel siswa
SELECT * 
FROM public.siswa 
WHERE user_id = 'd0cd4b04-9672-4b68-8a9f-123456789abc';  -- ← Ganti dengan id Anda
```

Jika **tidak return apa-apa**, berarti data siswa belum ada.

### Solusi: Insert Data Siswa

Jalankan query ini (ganti `<siswa_uid>` dengan id dari step 1):

```sql
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
  '<siswa_uid>',  -- ← GANTI dengan user_id dari query pertama
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
  nama = EXCLUDED.nama,
  updated_at = NOW();
```

### Verifikasi
```sql
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
```

Jika return **1 row**, berarti sudah OK! ✅

---

## 🔴 Error: "Kamera Diblokir"

### Penyebab
Browser tidak mengizinkan akses kamera.

### Solusi

#### Chrome/Edge:
1. Klik ikon **kunci** di address bar
2. Site Settings → Camera → Allow
3. Reload halaman

#### Firefox:
1. Klik ikon **kamera dengan garis** di address bar
2. Allow camera access
3. Reload halaman

#### Safari:
1. Safari → Settings → Websites → Camera
2. Allow untuk localhost
3. Reload halaman

---

## 🔴 Error: "Failed to upload photo" atau "new row violates row-level security policy"

### Penyebab
Row Level Security (RLS) di Supabase Storage memblokir upload foto.

### Solusi Quick (Recommended)

**Jalankan SQL ini di Supabase SQL Editor:**

```sql
-- 1. Buat/Update bucket absensi-foto
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'absensi-foto',
  'absensi-foto',
  true,
  5242880,
  ARRAY['image/jpeg', 'image/png', 'image/jpg']
)
ON CONFLICT (id) DO UPDATE SET
  public = true,
  file_size_limit = 5242880,
  allowed_mime_types = ARRAY['image/jpeg', 'image/png', 'image/jpg'];

-- 2. Hapus policy lama yang konflik
DROP POLICY IF EXISTS "Allow upload to absensi-foto" ON storage.objects;
DROP POLICY IF EXISTS "Allow read from absensi-foto" ON storage.objects;
DROP POLICY IF EXISTS "Allow update in absensi-foto" ON storage.objects;
DROP POLICY IF EXISTS "Allow delete from absensi-foto" ON storage.objects;

-- 3. Buat policy baru yang permissive
CREATE POLICY "Allow upload to absensi-foto"
ON storage.objects
FOR INSERT
TO public
WITH CHECK (bucket_id = 'absensi-foto');

CREATE POLICY "Allow read from absensi-foto"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'absensi-foto');

CREATE POLICY "Allow update in absensi-foto"
ON storage.objects
FOR UPDATE
TO public
USING (bucket_id = 'absensi-foto');

CREATE POLICY "Allow delete from absensi-foto"
ON storage.objects
FOR DELETE
TO public
USING (bucket_id = 'absensi-foto');
```

### Alternatif: Disable RLS (Development Only)

**HANYA untuk testing/development:**

```sql
-- Disable RLS sementara
ALTER TABLE storage.objects DISABLE ROW LEVEL SECURITY;
```

Setelah testing selesai, enable lagi:

```sql
-- Enable RLS kembali
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;
```

### Verifikasi Storage Bucket

```sql
-- Cek bucket settings
SELECT id, name, public, file_size_limit, allowed_mime_types
FROM storage.buckets
WHERE id = 'absensi-foto';

-- Cek policies
SELECT policyname, cmd, qual, with_check
FROM pg_policies
WHERE tablename = 'objects'
  AND policyname LIKE '%absensi-foto%';
```

---

## 🔴 Error: Console Warning "Failed to log activity"

### Penyebab
Insert ke tabel `log_aktivitas` gagal, tapi absensi tetap berhasil tersimpan.

### Solusi
Biasanya tidak perlu diperbaiki karena tidak mempengaruhi fungsionalitas utama. Tapi jika ingin fix:

```sql
-- Cek struktur tabel log_aktivitas
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'log_aktivitas'
ORDER BY ordinal_position;
```

Pastikan kolom-kolom ini ada:
- `user_id` (uuid, nullable)
- `aktivitas` (varchar)
- `modul` (varchar)
- `deskripsi` (text, nullable)
- `user_agent` (text, nullable)

---

## ✅ Checklist: Absensi Harus Bisa

Pastikan semua ini sudah OK:

- [ ] User siswa ada di `auth.users` (buat di Dashboard)
- [ ] User siswa ada di `public.users` dengan role='siswa'
- [ ] Data siswa ada di `public.siswa` dengan `user_id` yang benar
- [ ] Bucket `absensi-foto` ada dan public
- [ ] Login menggunakan `siswa@simmas.sch.id` berhasil
- [ ] localStorage memiliki key `simmas_user` dengan `userId`
- [ ] Browser mengizinkan akses kamera
- [ ] Halaman absensi tidak loading selamanya

---

## 🧪 Test Flow Lengkap

### 1. Logout dulu (clear state)
```
http://localhost:3000/logout
```

### 2. Login sebagai siswa
```
Email: siswa@simmas.sch.id
Password: password123
```

### 3. Navigasi ke Absensi
```
Klik "Absensi Harian" di sidebar
```

### 4. Foto Masuk
```
1. Klik tombol "Foto Masuk"
2. Izinkan akses kamera
3. Ambil foto
4. Simpan
```

### 5. Verifikasi di Database
```sql
SELECT * FROM public.absensi
WHERE siswa_id IN (
  SELECT id FROM public.siswa WHERE user_id IN (
    SELECT id FROM public.users WHERE email = 'siswa@simmas.sch.id'
  )
)
ORDER BY tanggal DESC
LIMIT 1;
```

Jika ada data dengan `waktu_masuk` dan `foto_masuk_url`, berarti **SUKSES!** ✅

---

## 🆘 Still Not Working?

1. **Check Browser Console** (F12 → Console)
   - Lihat error merah
   - Screenshot dan share

2. **Check Network Tab** (F12 → Network)
   - Filter: Fetch/XHR
   - Lihat request yang failed
   - Screenshot response body

3. **Check Supabase Logs**
   - https://supabase.com/dashboard/project/pyufuatqzoixziujvxcp/logs/explorer
   - Filter: Last 1 hour
   - Cari error terkait absensi

4. **Restart Development Server**
   ```bash
   # Stop server (Ctrl+C)
   npm run dev
   ```

---

**Last Updated:** $(Get-Date -Format "yyyy-MM-dd HH:mm:ss")
