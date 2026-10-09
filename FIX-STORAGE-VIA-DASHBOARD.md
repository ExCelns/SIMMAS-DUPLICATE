# Fix Storage Policy Via Supabase Dashboard

## ❌ Error: "must be owner of table objects"

Anda tidak bisa alter `storage.objects` via SQL karena permission. Harus via Dashboard.

---

## ✅ SOLUTION: Fix via Dashboard (3 Menit)

### **Step 1: Buka Storage Settings**

1. Kunjungi: https://supabase.com/dashboard/project/pyufuatqzoixziujvxcp/storage/buckets
2. Cari bucket **"absensi-foto"**
   - Jika **TIDAK ADA**, klik **"New bucket"**:
     - Name: `absensi-foto`
     - Public: **✅ CENTANG**
     - File size limit: `5 MB`
     - Allowed MIME types: `image/jpeg, image/png, image/jpg`
   - Jika **SUDAH ADA**, klik bucket tersebut

### **Step 2: Set Bucket to Public**

1. Klik bucket **"absensi-foto"**
2. Klik tab **"Configuration"**
3. Toggle **"Public bucket"** → **ON** (hijau)
4. Klik **"Save"**

### **Step 3: Add/Update Policies**

1. Klik tab **"Policies"** di bucket absensi-foto
2. Klik **"New Policy"**
3. **Option 1 - Simple (Recommended for Development):**
   - Template: **"Allow public access"**
   - Policy name: `Public access for absensi-foto`
   - Allowed operations: **SELECT ALL** (INSERT, SELECT, UPDATE, DELETE)
   - Target roles: **public**
   - USING expression: `bucket_id = 'absensi-foto'`
   - WITH CHECK expression: `bucket_id = 'absensi-foto'`
   - Klik **"Save policy"**

4. **Option 2 - Custom Policy (if Option 1 not available):**
   ```sql
   -- Policy name: Public full access
   -- For operation: ALL
   -- Policy definition (USING):
   bucket_id = 'absensi-foto'
   
   -- WITH CHECK:
   bucket_id = 'absensi-foto'
   ```

### **Step 4: Verify**

1. Masih di tab **"Policies"**
2. Pastikan ada policy dengan:
   - Name: `Public access for absensi-foto` (atau nama lain)
   - Allowed operations: **ALL** atau **INSERT, SELECT**
   - Enabled: **✅**

---

## 🧪 **ALTERNATIVE: Disable RLS Completely (Quick Test)**

Jika terlalu ribet, untuk testing bisa disable RLS sama sekali:

### Via Dashboard:

1. Buka: https://supabase.com/dashboard/project/pyufuatqzoixziujvxcp/database/tables
2. Klik table **"objects"** (dalam schema **storage**)
3. Tab **"RLS"** atau **"Policies"**
4. Toggle **"Enable RLS"** → **OFF**

⚠️ **WARNING:** Ini untuk testing only! Enable lagi nanti setelah selesai develop.

---

## 📋 **QUICK CHECKLIST**

Setelah fix via Dashboard:

- [ ] Bucket `absensi-foto` ada
- [ ] Bucket public = **true** (hijau)
- [ ] Policy untuk INSERT/SELECT ada dan enabled
- [ ] Test upload foto di aplikasi

---

## 🎯 **CURRENT STATUS & NEXT STEPS**

### **What We've Fixed:**
1. ✅ localStorage key (simmas_user)
2. ✅ Hydration error (suppressHydrationWarning)
3. ✅ Error logging (detailed console.log)
4. ⏳ Table absensi columns → **RUN SQL NOW**
5. ⏳ Storage policies → **FIX VIA DASHBOARD**

### **What You Need to Do:**

**PRIORITY 1: Fix Table Absensi**
```
1. Buka Supabase SQL Editor
2. Run: database/FINAL-FIX-ABSENSI.sql (Part 1 & 2)
3. Verify columns muncul di output
```

**PRIORITY 2: Fix Storage via Dashboard**
```
1. Buka Storage Buckets
2. Set absensi-foto → Public = ON
3. Add policy "Allow public access"
```

**PRIORITY 3: Test Upload**
```
1. Refresh halaman absensi (F5)
2. Klik "Foto Masuk"
3. Ambil foto
4. Simpan
5. Check console untuk success message
```

---

## 🔍 **Debugging Tips**

Jika masih error setelah fix:

**Check Console:**
```
F12 → Console tab
Lihat log detail dari "Starting upload process..." sampai error
```

**Check Network:**
```
F12 → Network tab
Filter: Fetch/XHR
Lihat request yang failed (merah)
Klik request → Response tab → Copy error message
```

**Check Supabase Logs:**
```
https://supabase.com/dashboard/project/pyufuatqzoixziujvxcp/logs/explorer
Filter: Error, Last 1 hour
Cari error terkait storage atau absensi
```

---

## ✅ **EXPECTED SUCCESS**

Setelah semua fix, console log harus show:

```
✅ Upload successful: { path: "...", id: "..." }
✅ Public URL: https://...supabase.co/storage/v1/object/public/absensi-foto/...
✅ Saving to database...
✅ Insert successful
✅ All operations completed successfully!
[Alert] Absensi masuk berhasil disimpan!
```

Dan di database:

```sql
SELECT * FROM public.absensi ORDER BY created_at DESC LIMIT 1;
-- Harus ada row baru dengan waktu_masuk dan foto_masuk_url
```

---

**Last Updated:** $(Get-Date -Format "yyyy-MM-dd HH:mm:ss")
