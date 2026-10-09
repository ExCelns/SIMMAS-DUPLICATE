# 📸 Implementasi Absensi dengan Foto

## ✅ Storage Buckets Ready

Bucket **`absensi-foto`** sudah dikonfigurasi di Supabase dengan:
- Max file size: 5 MB
- Allowed types: image/jpeg, jpg, png, webp
- 5 policies configured (authenticated upload, public read)

---

## 🏗️ Arsitektur

```
User (Siswa) → Camera/File Input → Upload ke Storage → Save URL ke Database
                                                          ↓
                                               Tabel: absensi
                                               - foto_masuk_url
                                               - foto_keluar_url
                                               - lokasi_masuk (GPS)
                                               - lokasi_keluar (GPS)
```

---

## 💻 Code Implementation

### 1. Helper Functions (lib/storage.ts)

✅ **Sudah dibuat!** File: `lib/storage.ts`

Fungsi yang tersedia:
- `uploadAbsensiFoto(file, userId, 'masuk')` - Upload foto check-in
- `uploadAbsensiFoto(file, userId, 'keluar')` - Upload foto check-out
- `validateFile(file, 'absensi-foto')` - Validasi file
- `deleteFile('absensi-foto', path)` - Hapus foto

---

### 2. Halaman Absensi Siswa

**File**: `app/siswa/absensi/page.tsx`

```typescript
"use client";

import { useState, useRef, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { uploadAbsensiFoto } from "@/lib/storage";
import { getCurrentUser } from "@/lib/auth";

export default function AbsensiPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [userId, setUserId] = useState("");
  const [todayAbsensi, setTodayAbsensi] = useState<any>(null);
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  
  const fileInputMasukRef = useRef<HTMLInputElement>(null);
  const fileInputKeluarRef = useRef<HTMLInputElement>(null);

  // Get user ID and today's absensi on load
  useEffect(() => {
    async function init() {
      const user = await getCurrentUser();
      if (user) {
        setUserId(user.id);
        await loadTodayAbsensi(user.id);
      }
      
      // Get GPS location
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setLocation({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
          },
          (error) => {
            console.error("GPS error:", error);
          }
        );
      }
    }
    init();
  }, []);

  // Load today's absensi record
  async function loadTodayAbsensi(userId: string) {
    const today = new Date().toISOString().split('T')[0];
    
    const { data, error } = await supabase
      .from('absensi')
      .select('*')
      .eq('siswa_id', userId)
      .eq('tanggal', today)
      .single();
    
    if (data) {
      setTodayAbsensi(data);
    }
  }

  // Handle Check-in (Absen Masuk)
  async function handleCheckIn() {
    try {
      setLoading(true);
      setError("");
      setSuccess("");

      // Get photo from file input
      const fileInput = fileInputMasukRef.current;
      if (!fileInput || !fileInput.files || fileInput.files.length === 0) {
        setError("Pilih foto terlebih dahulu");
        setLoading(false);
        return;
      }

      const file = fileInput.files[0];

      // Upload photo to storage
      const uploadResult = await uploadAbsensiFoto(file, userId, 'masuk');
      
      if (uploadResult.error) {
        setError(uploadResult.error);
        setLoading(false);
        return;
      }

      // Save absensi record to database
      const now = new Date();
      const today = now.toISOString().split('T')[0];
      const time = now.toTimeString().split(' ')[0];

      const { data, error: dbError } = await supabase
        .from('absensi')
        .insert({
          siswa_id: userId,
          penempatan_id: null, // TODO: Get from current penempatan
          tanggal: today,
          jam_masuk: time,
          foto_masuk_url: uploadResult.url,
          lokasi_masuk: location ? `${location.lat},${location.lng}` : null,
          status: 'hadir',
        })
        .select()
        .single();

      if (dbError) {
        setError(dbError.message);
        setLoading(false);
        return;
      }

      setTodayAbsensi(data);
      setSuccess("Absen masuk berhasil!");
      setLoading(false);
      
      // Reset file input
      if (fileInput) fileInput.value = '';
      
    } catch (err) {
      console.error("Check-in error:", err);
      setError("Gagal absen masuk");
      setLoading(false);
    }
  }

  // Handle Check-out (Absen Keluar)
  async function handleCheckOut() {
    try {
      setLoading(true);
      setError("");
      setSuccess("");

      if (!todayAbsensi) {
        setError("Anda belum absen masuk hari ini");
        setLoading(false);
        return;
      }

      // Get photo from file input
      const fileInput = fileInputKeluarRef.current;
      if (!fileInput || !fileInput.files || fileInput.files.length === 0) {
        setError("Pilih foto terlebih dahulu");
        setLoading(false);
        return;
      }

      const file = fileInput.files[0];

      // Upload photo to storage
      const uploadResult = await uploadAbsensiFoto(file, userId, 'keluar');
      
      if (uploadResult.error) {
        setError(uploadResult.error);
        setLoading(false);
        return;
      }

      // Update absensi record
      const now = new Date();
      const time = now.toTimeString().split(' ')[0];

      const { data, error: dbError } = await supabase
        .from('absensi')
        .update({
          jam_keluar: time,
          foto_keluar_url: uploadResult.url,
          lokasi_keluar: location ? `${location.lat},${location.lng}` : null,
        })
        .eq('id', todayAbsensi.id)
        .select()
        .single();

      if (dbError) {
        setError(dbError.message);
        setLoading(false);
        return;
      }

      setTodayAbsensi(data);
      setSuccess("Absen keluar berhasil!");
      setLoading(false);
      
      // Reset file input
      if (fileInput) fileInput.value = '';
      
    } catch (err) {
      console.error("Check-out error:", err);
      setError("Gagal absen keluar");
      setLoading(false);
    }
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Absensi Harian</h1>

      {/* Error & Success Messages */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          {success}
        </div>
      )}

      {/* Today's Status */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4">Status Hari Ini</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-600">Tanggal</p>
            <p className="font-medium">{new Date().toLocaleDateString('id-ID')}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Status</p>
            <p className="font-medium">
              {todayAbsensi ? (
                todayAbsensi.jam_keluar ? (
                  <span className="text-green-600">Sudah Check-out</span>
                ) : (
                  <span className="text-blue-600">Sudah Check-in</span>
                )
              ) : (
                <span className="text-gray-500">Belum Absen</span>
              )}
            </p>
          </div>
        </div>

        {/* GPS Location */}
        {location && (
          <div className="mt-4 text-sm text-gray-600">
            📍 Lokasi: {location.lat.toFixed(6)}, {location.lng.toFixed(6)}
          </div>
        )}
      </div>

      {/* Check-in Section */}
      {!todayAbsensi && (
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">🟢 Absen Masuk</h2>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              Foto Selfie <span className="text-red-500">*</span>
            </label>
            <input
              ref={fileInputMasukRef}
              type="file"
              accept="image/jpeg,image/jpg,image/png,image/webp"
              capture="user"
              className="block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-50 file:text-blue-700
                hover:file:bg-blue-100"
            />
            <p className="text-xs text-gray-500 mt-1">
              Max 5MB. Format: JPG, PNG, WEBP
            </p>
          </div>

          <button
            onClick={handleCheckIn}
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium
              hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {loading ? "Memproses..." : "Absen Masuk"}
          </button>
        </div>
      )}

      {/* Check-out Section */}
      {todayAbsensi && !todayAbsensi.jam_keluar && (
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">🔴 Absen Keluar</h2>
          
          <div className="mb-4 p-4 bg-gray-50 rounded">
            <p className="text-sm text-gray-600">Absen masuk:</p>
            <p className="font-medium">{todayAbsensi.jam_masuk}</p>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              Foto Selfie <span className="text-red-500">*</span>
            </label>
            <input
              ref={fileInputKeluarRef}
              type="file"
              accept="image/jpeg,image/jpg,image/png,image/webp"
              capture="user"
              className="block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded file:border-0
                file:text-sm file:font-semibold
                file:bg-red-50 file:text-red-700
                hover:file:bg-red-100"
            />
            <p className="text-xs text-gray-500 mt-1">
              Max 5MB. Format: JPG, PNG, WEBP
            </p>
          </div>

          <button
            onClick={handleCheckOut}
            disabled={loading}
            className="w-full bg-red-600 text-white py-3 rounded-lg font-medium
              hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {loading ? "Memproses..." : "Absen Keluar"}
          </button>
        </div>
      )}

      {/* Today's Absensi Detail */}
      {todayAbsensi && (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Detail Absensi Hari Ini</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {/* Check-in Info */}
            <div className="border rounded-lg p-4">
              <h3 className="font-medium mb-3 text-green-600">✓ Masuk</h3>
              <div className="mb-3">
                <p className="text-sm text-gray-600">Waktu</p>
                <p className="font-medium">{todayAbsensi.jam_masuk}</p>
              </div>
              {todayAbsensi.foto_masuk_url && (
                <div>
                  <p className="text-sm text-gray-600 mb-2">Foto</p>
                  <img
                    src={todayAbsensi.foto_masuk_url}
                    alt="Foto Masuk"
                    className="w-full h-48 object-cover rounded"
                  />
                </div>
              )}
            </div>

            {/* Check-out Info */}
            {todayAbsensi.jam_keluar && (
              <div className="border rounded-lg p-4">
                <h3 className="font-medium mb-3 text-red-600">✓ Keluar</h3>
                <div className="mb-3">
                  <p className="text-sm text-gray-600">Waktu</p>
                  <p className="font-medium">{todayAbsensi.jam_keluar}</p>
                </div>
                {todayAbsensi.foto_keluar_url && (
                  <div>
                    <p className="text-sm text-gray-600 mb-2">Foto</p>
                    <img
                      src={todayAbsensi.foto_keluar_url}
                      alt="Foto Keluar"
                      className="w-full h-48 object-cover rounded"
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
```

---

## 🎨 Features yang Sudah Diimplementasi

### ✅ Check-in (Absen Masuk)
- Upload foto selfie
- Capture GPS location
- Save ke database dengan URL foto
- Validasi file (max 5MB, only images)

### ✅ Check-out (Absen Keluar)
- Upload foto selfie keluar
- Capture GPS location
- Update record absensi yang sudah ada

### ✅ Validations
- File size: max 5MB
- File type: JPG, PNG, WEBP only
- Must check-in before check-out
- One absensi per day

### ✅ Display
- Show today's status
- Show check-in/check-out photos
- Show timestamps
- Show GPS coordinates

---

## 📱 Mobile Camera Support

Code sudah support camera capture di mobile dengan attribute:
```html
<input
  type="file"
  accept="image/*"
  capture="user"  <!-- ← Ini akan buka camera langsung di mobile -->
/>
```

---

## 🔐 Security Features

### ✅ File Validation
```typescript
// Di lib/storage.ts
- Max file size: 5MB
- Allowed types: image/jpeg, jpg, png, webp
- Auto-reject jika tidak sesuai
```

### ✅ Storage Policies
```
- Authenticated users can upload
- Public can view (untuk tampilan di dashboard)
- Users can manage their own files
```

### ✅ File Naming
```
Pattern: {year}/{month}/{user_id}_{timestamp}_{type}.{ext}

Example:
2024/10/abc123_1728000000_masuk.jpg
2024/10/abc123_1728036000_keluar.jpg
```

---

## 📊 Database Structure

```sql
-- Tabel absensi (sudah ada)
CREATE TABLE absensi (
  id UUID PRIMARY KEY,
  siswa_id UUID REFERENCES siswa(id),
  penempatan_id UUID REFERENCES penempatan(id),
  tanggal DATE NOT NULL,
  jam_masuk TIME,
  jam_keluar TIME,
  foto_masuk_url TEXT,     -- ✅ URL from storage
  foto_keluar_url TEXT,    -- ✅ URL from storage
  lokasi_masuk TEXT,       -- GPS: "lat,lng"
  lokasi_keluar TEXT,      -- GPS: "lat,lng"
  status TEXT DEFAULT 'hadir',
  keterangan TEXT,
  created_at TIMESTAMP,
  updated_at TIMESTAMP,
  UNIQUE(siswa_id, tanggal)  -- One absensi per day
);
```

---

## 🚀 Next Steps

### 1. Riwayat Absensi
Tambahkan halaman untuk lihat history absensi:
- List semua absensi siswa
- Filter by month
- Export to PDF

### 2. Admin Monitoring
Dashboard admin untuk monitor absensi semua siswa:
- Realtime absensi hari ini
- Chart kehadiran
- Export reports

### 3. Notifications
- Notif jika siswa belum absen hingga jam tertentu
- Notif ke pembimbing jika siswa tidak hadir

### 4. Advanced Features
- Face recognition (optional)
- Geofencing (validate GPS is in DUDI location)
- Offline support (sync when online)

---

## ✅ Summary

**Storage Configuration**: ✅ READY  
**Helper Functions**: ✅ CREATED (`lib/storage.ts`)  
**Example Page**: ✅ DOCUMENTED  
**File Validation**: ✅ IMPLEMENTED  
**GPS Support**: ✅ INCLUDED  
**Mobile Camera**: ✅ SUPPORTED  

**Tinggal copy code dari dokumen ini ke project Anda!** 🚀

File foto akan otomatis tersimpan di bucket **`absensi-foto`** dan URL-nya disimpan di database.
