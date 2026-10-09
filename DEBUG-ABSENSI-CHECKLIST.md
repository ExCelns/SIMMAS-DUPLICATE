# Debug Checklist: Absensi Foto Error

## 🔍 Error: "Error saving photo: {}"

Error object kosong biasanya berarti ada masalah di salah satu step, tapi error tidak ter-capture dengan benar.

---

## ✅ STEP-BY-STEP DEBUGGING

### 1️⃣ Buka Browser Console (F12)

**Klik tab "Console"** dan lihat semua log yang muncul saat upload foto.

### 2️⃣ Check Log Output

Dengan update terbaru, sekarang akan muncul log detail. Cari log ini:

```
Starting upload process...
Siswa ID: <uuid>
Absensi Type: masuk
Converting base64 to blob...
Blob created: { size: 123456, type: "image/jpeg" }
Uploading file: <filename>.jpg
```

**❌ Jika berhenti di "Uploading file"**, berarti masalah di Storage RLS.

**✅ Jika muncul "Upload successful"**, lanjut ke step berikutnya.

---

### 3️⃣ Test Upload Storage Langsung

Buka browser console dan jalankan ini:

```javascript
// Test 1: Check Supabase client
console.log("Supabase URL:", process.env.NEXT_PUBLIC_SUPABASE_URL);
console.log("Supabase Key:", process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.substring(0, 20) + "...");

// Test 2: Check bucket exists
const { data: buckets, error: bucketsError } = await supabase.storage.listBuckets();
console.log("Buckets:", buckets);
console.log("Has absensi-foto?", buckets?.some(b => b.id === 'absensi-foto'));

// Test 3: Try upload test file
const testBlob = new Blob(['test'], { type: 'text/plain' });
const testFileName = `test_${Date.now()}.txt`;
const { data, error } = await supabase.storage
  .from('absensi-foto')
  .upload(testFileName, testBlob);
console.log("Test upload result:", { data, error });
```

**Expected output:**
- ✅ Supabase URL and Key ada
- ✅ Bucket "absensi-foto" ada di list
- ✅ Test upload success (no error)

**Jika ada error di Test 3**, copy error message dan jalankan fix RLS lagi.

---

### 4️⃣ Check Data Siswa di Database

Jalankan query ini di Supabase SQL Editor:

```sql
-- 1. Cek user siswa
SELECT id, email, role 
FROM public.users 
WHERE email = 'siswa@simmas.sch.id';

-- 2. Cek data siswa (ganti <user_id> dengan result dari query 1)
SELECT * 
FROM public.siswa 
WHERE user_id = '<user_id>';
```

**Expected:**
- Query 1: Return 1 row dengan role = 'siswa'
- Query 2: Return 1 row dengan nis, nama, kelas, dll

**Jika Query 2 tidak return apa-apa**, data siswa belum ada. Insert dengan:

```sql
INSERT INTO public.siswa (
  id, user_id, nis, nama, kelas, jurusan, kontak, alamat, status, created_at, updated_at
)
VALUES (
  gen_random_uuid(),
  '<user_id>',  -- dari query 1
  '2024001',
  'Ahmad Fauzi',
  'XII RPL 1',
  'Rekayasa Perangkat Lunak',
  '081234567891',
  'Jl. Merdeka No. 123',
  'aktif',
  NOW(),
  NOW()
)
ON CONFLICT (user_id) DO UPDATE SET nama = EXCLUDED.nama;
```

---

### 5️⃣ Check Table Absensi Structure

```sql
-- Check columns di table absensi
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'absensi'
ORDER BY ordinal_position;
```

**Required columns:**
- `id` (uuid)
- `siswa_id` (uuid)
- `tanggal` (date)
- `waktu_masuk` (time or varchar)
- `waktu_keluar` (time or varchar)
- `foto_masuk_url` (varchar or text)
- `foto_keluar_url` (varchar or text)
- `status` (varchar)
- `keterangan` (text, nullable)

**Jika ada column yang missing**, berarti database schema belum lengkap.

---

### 6️⃣ Check RLS Policies di Table Absensi

```sql
-- Check RLS status
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE tablename = 'absensi';

-- Check policies
SELECT policyname, permissive, roles, cmd
FROM pg_policies
WHERE tablename = 'absensi';
```

**Jika `rowsecurity = true` tapi tidak ada policies**, insert akan fail.

**Quick fix (development only):**

```sql
-- Disable RLS sementara
ALTER TABLE public.absensi DISABLE ROW LEVEL SECURITY;
```

**Atau buat policy:**

```sql
-- Allow all operations untuk testing
CREATE POLICY "Allow all for testing" ON public.absensi
FOR ALL TO public
USING (true)
WITH CHECK (true);
```

---

### 7️⃣ Test Insert Manually

Test insert data absensi manual via SQL:

```sql
-- Ganti <siswa_id> dengan id dari query step 4
INSERT INTO public.absensi (
  id, siswa_id, tanggal, waktu_masuk, foto_masuk_url, status, created_at, updated_at
)
VALUES (
  gen_random_uuid(),
  '<siswa_id>',
  CURRENT_DATE,
  '08:00:00',
  'https://example.com/test.jpg',
  'hadir',
  NOW(),
  NOW()
);
```

**Jika error**, copy error message.

**Jika success**, berarti masalah di frontend code, bukan database.

---

### 8️⃣ Check .env.local

Buka file `.env.local` dan pastikan:

```env
NEXT_PUBLIC_SUPABASE_URL=https://pyufuatqzoixziujvxcp.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc....(panjang)
```

- ✅ URL harus HTTPS
- ✅ Key harus lengkap (biasanya 100+ karakter)
- ✅ Tidak ada spasi atau quote

**Jika ada perubahan**, restart dev server:

```bash
# Stop (Ctrl+C)
npm run dev
```

---

## 📊 COMMON ISSUES & SOLUTIONS

### Issue 1: "StorageApiError: new row violates row-level security policy"
**Fix:** Jalankan `database/QUICK-FIX-ABSENSI-RLS.sql`

### Issue 2: "Data siswa tidak ditemukan"
**Fix:** Insert data siswa (step 4 di atas)

### Issue 3: "Blob created: { size: 0 }"
**Fix:** Foto tidak ter-capture dengan benar. Check kamera permission.

### Issue 4: "Insert failed: null value in column..."
**Fix:** Ada column NOT NULL yang tidak diisi. Check schema atau set default.

### Issue 5: Upload success tapi data tidak muncul di riwayat
**Fix:** 
```javascript
// Hard reload data
window.location.reload();
```

---

## 🚀 AFTER DEBUGGING

Setelah fix error:

1. **Clear console** (icon 🚫 atau Ctrl+L)
2. **Logout** dari aplikasi
3. **Login ulang** sebagai siswa
4. **Test absensi** dengan console terbuka
5. **Verify** log menunjukkan "All operations completed successfully!"

---

## 📸 EXPECTED SUCCESS LOG

```
Loading user data...
LocalStorage data: {"email":"siswa@simmas.sch.id",...}
User parsed: { email: 'siswa@simmas.sch.id', role: 'siswa', userId: '...' }
Fetching siswa data for user_id: ...
Siswa data loaded: { id: '...', nis: '2024001', nama: 'Ahmad Fauzi', kelas: 'XII RPL 1' }

[User clicks "Foto Masuk", takes photo, clicks "Simpan"]

Starting upload process...
Siswa ID: <uuid>
Absensi Type: masuk
Converting base64 to blob...
Blob created: { size: 45678, type: "image/jpeg" }
Uploading file: <uuid>_masuk_1234567890.jpg
Upload successful: { path: "...", id: "...", fullPath: "..." }
Public URL: https://...supabase.co/storage/v1/object/public/absensi-foto/...
Saving to database...
Today: 2024-10-04 Waktu: 08:30:15
Creating new absensi record
Insert data: { siswa_id: '...', tanggal: '2024-10-04', ... }
Insert successful
Logging activity...
All operations completed successfully!
[Alert] Absensi masuk berhasil disimpan!
Reloading data...
```

**Jika semua log ini muncul**, berarti SUKSES! ✅

---

**Last Updated:** $(Get-Date -Format "yyyy-MM-dd HH:mm:ss")
