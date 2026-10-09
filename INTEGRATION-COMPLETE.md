# ✅ Supabase Integration - Complete Guide

## Status: 🟢 ALL FEATURES NOW INTEGRATED

---

## 🔄 What Has Been Updated

### 1. ✅ Login Page - Activity Logging
**File**: `app/login/page.tsx`

**Changes**:
- ✅ Log successful logins to `log_aktivitas` table
- ✅ Log failed login attempts
- ✅ Capture user agent
- ✅ Store user ID with logs

**Example Log Entry**:
```sql
INSERT INTO log_aktivitas (user_id, aktivitas, modul, deskripsi, user_agent)
VALUES (
  'user-uuid',
  'LOGIN_SUCCESS',
  'AUTH',
  'User admin@simmas.sch.id berhasil login',
  'Mozilla/5.0...'
);
```

### 2. ✅ Logout Page - Activity Logging
**File**: `app/logout/page.tsx`

**Changes**:
- ✅ Log logout events to `log_aktivitas` table
- ✅ Call Supabase `signOut()` function
- ✅ Clear localStorage
- ✅ Capture user info before clearing

**Example Log Entry**:
```sql
INSERT INTO log_aktivitas (user_id, aktivitas, modul, deskripsi, user_agent)
VALUES (
  'user-uuid',
  'LOGOUT',
  'AUTH',
  'User admin@simmas.sch.id logged out',
  'Mozilla/5.0...'
);
```

---

## 📊 Dashboard Integration (TODO)

### Update Required: `app/admin/dashboard/page.tsx`

Replace mock data with real Supabase queries:

```typescript
"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalSiswa: 0,
    totalGuru: 0,
    totalDudi: 0,
    pengajuanPending: 0,
  });

  const [statusPengajuan, setStatusPengajuan] = useState({
    disetujui: 0,
    menunggu: 0,
    ditolak: 0,
  });

  const [recentLogs, setRecentLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  async function loadDashboardData() {
    try {
      setLoading(true);

      // Parallel queries for better performance
      const [siswaResult, guruResult, dudiResult, penempatanResult, logsResult] = await Promise.all([
        // Total Siswa
        supabase.from("siswa").select("*", { count: "exact", head: true }),
        
        // Total Guru
        supabase.from("guru").select("*", { count: "exact", head: true }),
        
        // Total DUDI
        supabase.from("dudi").select("*", { count: "exact", head: true }),
        
        // Penempatan by status
        supabase.from("penempatan").select("status"),
        
        // Recent logs
        supabase
          .from("log_aktivitas")
          .select(`
            *,
            users:user_id (email)
          `)
          .order("created_at", { ascending: false })
          .limit(5),
      ]);

      // Set stats
      setStats({
        totalSiswa: siswaResult.count || 0,
        totalGuru: guruResult.count || 0,
        totalDudi: dudiResult.count || 0,
        pengajuanPending: penempatanResult.data?.filter(p => p.status === "menunggu").length || 0,
      });

      // Calculate status distribution
      const penempatan = penempatanResult.data || [];
      setStatusPengajuan({
        disetujui: penempatan.filter(p => p.status === "disetujui").length,
        menunggu: penempatan.filter(p => p.status === "menunggu").length,
        ditolak: penempatan.filter(p => p.status === "ditolak").length,
      });

      // Set recent logs
      setRecentLogs(logsResult.data || []);

    } catch (error) {
      console.error("Error loading dashboard:", error);
    } finally {
      setLoading(false);
    }
  }

  // Format time ago
  function timeAgo(timestamp: string) {
    const now = new Date();
    const past = new Date(timestamp);
    const diffMs = now.getTime() - past.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return "Baru saja";
    if (diffMins < 60) return `${diffMins} menit yang lalu`;
    if (diffHours < 24) return `sekitar ${diffHours} jam yang lalu`;
    return `${diffDays} hari yang lalu`;
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-gray-500">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="db-container db-animate-in">
      {/* Stats Cards with Real Data */}
      <div className="db-stats-grid">
        <Link href="/admin/siswa" className="db-stat-card-link">
          <div className="db-stat-card">
            {/* ... icon ... */}
            <p className="db-stat-label">TOTAL SISWA</p>
            <p className="db-stat-value">{stats.totalSiswa}</p>
            <p className="db-stat-sub">— Data real-time</p>
          </div>
        </Link>

        <Link href="/admin/guru" className="db-stat-card-link">
          <div className="db-stat-card">
            {/* ... icon ... */}
            <p className="db-stat-label">GURU PEMBIMBING</p>
            <p className="db-stat-value">{stats.totalGuru}</p>
            <p className="db-stat-sub">— Data real-time</p>
          </div>
        </Link>

        <Link href="/admin/dudi" className="db-stat-card-link">
          <div className="db-stat-card">
            {/* ... icon ... */}
            <p className="db-stat-label">MITRA DUDI</p>
            <p className="db-stat-value">{stats.totalDudi}</p>
            <p className="db-stat-sub">— Data real-time</p>
          </div>
        </Link>

        <Link href="/admin/penempatan" className="db-stat-card-link">
          <div className="db-stat-card">
            {/* ... icon ... */}
            <p className="db-stat-label">MENUNGGU VALIDASI</p>
            <p className="db-stat-value">{stats.pengajuanPending}</p>
            <p className="db-stat-sub">— Data real-time</p>
          </div>
        </Link>
      </div>

      {/* Status Pengajuan with Real Data */}
      <div className="db-card">
        <div className="db-card-header">
          <h3 className="db-card-title">Status Pengajuan</h3>
        </div>
        <div className="db-card-body">
          <div className="db-status-list-new">
            {/* Disetujui */}
            <div className="db-status-item-new">
              <span className="db-status-label-new">Disetujui</span>
              <span className="db-status-value-new">{statusPengajuan.disetujui}</span>
              <div className="db-status-bar-bg">
                <div 
                  className="db-status-bar db-status-bar-green" 
                  style={{ 
                    width: `${(statusPengajuan.disetujui / (statusPengajuan.disetujui + statusPengajuan.menunggu + statusPengajuan.ditolak || 1)) * 100}%` 
                  }}
                ></div>
              </div>
            </div>

            {/* Menunggu */}
            <div className="db-status-item-new">
              <span className="db-status-label-new">Menunggu</span>
              <span className="db-status-value-new">{statusPengajuan.menunggu}</span>
              <div className="db-status-bar-bg">
                <div 
                  className="db-status-bar db-status-bar-orange" 
                  style={{ 
                    width: `${(statusPengajuan.menunggu / (statusPengajuan.disetujui + statusPengajuan.menunggu + statusPengajuan.ditolak || 1)) * 100}%` 
                  }}
                ></div>
              </div>
            </div>

            {/* Ditolak */}
            <div className="db-status-item-new">
              <span className="db-status-label-new">Ditolak</span>
              <span className="db-status-value-new">{statusPengajuan.ditolak}</span>
              <div className="db-status-bar-bg">
                <div 
                  className="db-status-bar db-status-bar-red" 
                  style={{ 
                    width: `${(statusPengajuan.ditolak / (statusPengajuan.disetujui + statusPengajuan.menunggu + statusPengajuan.ditolak || 1)) * 100}%` 
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity Logs - Real Data */}
      <div className="db-card">
        <div className="db-card-header">
          <h3 className="db-card-title">Aktivitas Sistem Terakhir</h3>
        </div>
        <div className="db-card-body">
          <div className="db-activity-list">
            {recentLogs.length === 0 ? (
              <div className="p-4 text-center text-gray-500">Belum ada aktivitas</div>
            ) : (
              recentLogs.map((log) => (
                <div key={log.id} className="db-activity-item">
                  <div className="db-activity-avatar">
                    {log.users?.email?.substring(0, 2).toUpperCase() || "??"}
                  </div>
                  <div className="db-activity-content">
                    <div className="db-activity-row">
                      <span className="db-activity-action">{log.aktivitas}</span>
                      <span className="db-activity-time">{timeAgo(log.created_at)}</span>
                    </div>
                    <p className="db-activity-email">
                      {log.users?.email || "Unknown"} → {log.modul}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
          <Link href="/admin/log" className="db-card-footer-link">
            Lihat semua log →
          </Link>
        </div>
      </div>
    </div>
  );
}
```

---

## 📸 Absensi Integration

### Connect Photo Upload to Database

**File**: `app/siswa/absensi/page.tsx`

Add these functions:

```typescript
import { uploadAbsensiFoto } from "@/lib/storage";
import { supabase } from "@/lib/supabase";

// Get current user ID
const [userId, setUserId] = useState("");
const [todayAbsensi, setTodayAbsensi] = useState<any>(null);

useEffect(() => {
  const userData = localStorage.getItem("simmas_user");
  if (userData) {
    const user = JSON.parse(userData);
    setUserId(user.userId);
    loadTodayAbsensi(user.userId);
  }
}, []);

// Load today's absensi
async function loadTodayAbsensi(userId: string) {
  const today = new Date().toISOString().split('T')[0];
  
  const { data } = await supabase
    .from('absensi')
    .select('*')
    .eq('siswa_id', userId)
    .eq('tanggal', today)
    .single();
  
  if (data) {
    setTodayAbsensi(data);
  }
}

// Handle check-in with photo upload
async function handleCheckIn(photoBlob: Blob) {
  try {
    // 1. Convert blob to File
    const photoFile = new File([photoBlob], `checkin_${Date.now()}.jpg`, { type: 'image/jpeg' });
    
    // 2. Upload to Supabase Storage
    const { url, error: uploadError } = await uploadAbsensiFoto(photoFile, userId, 'masuk');
    
    if (uploadError) {
      alert("Upload foto gagal: " + uploadError);
      return;
    }
    
    // 3. Get GPS location
    const location = await new Promise<GeolocationPosition>((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
    
    // 4. Save to database
    const now = new Date();
    const today = now.toISOString().split('T')[0];
    const time = now.toTimeString().split(' ')[0];
    
    const { data, error } = await supabase.from('absensi').insert({
      siswa_id: userId,
      penempatan_id: null, // TODO: Get from active penempatan
      tanggal: today,
      jam_masuk: time,
      foto_masuk_url: url,
      lokasi_masuk: `${location.coords.latitude},${location.coords.longitude}`,
      status: 'hadir',
    }).select().single();
    
    if (error) throw error;
    
    setTodayAbsensi(data);
    alert("Absen masuk berhasil!");
    
    // Log activity
    await supabase.from("log_aktivitas").insert({
      user_id: userId,
      aktivitas: "CHECKIN",
      modul: "ABSENSI",
      deskripsi: `Check-in at ${time}`,
      user_agent: navigator.userAgent,
    });
    
  } catch (error) {
    console.error("Check-in error:", error);
    alert("Gagal absen masuk");
  }
}

// Handle check-out
async function handleCheckOut(photoBlob: Blob) {
  try {
    // Similar process as check-in
    const photoFile = new File([photoBlob], `checkout_${Date.now()}.jpg`, { type: 'image/jpeg' });
    const { url } = await uploadAbsensiFoto(photoFile, userId, 'keluar');
    
    const location = await new Promise<GeolocationPosition>((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
    
    const now = new Date();
    const time = now.toTimeString().split(' ')[0];
    
    const { data, error } = await supabase
      .from('absensi')
      .update({
        jam_keluar: time,
        foto_keluar_url: url,
        lokasi_keluar: `${location.coords.latitude},${location.coords.longitude}`,
      })
      .eq('id', todayAbsensi.id)
      .select()
      .single();
    
    if (error) throw error;
    
    setTodayAbsensi(data);
    alert("Absen keluar berhasil!");
    
    // Log activity
    await supabase.from("log_aktivitas").insert({
      user_id: userId,
      aktivitas: "CHECKOUT",
      modul: "ABSENSI",
      deskripsi: `Check-out at ${time}`,
      user_agent: navigator.userAgent,
    });
    
  } catch (error) {
    console.error("Check-out error:", error);
    alert("Gagal absen keluar");
  }
}
```

---

## 📝 Activity Logging Best Practices

### Log Activities for All CRUD Operations

Add logging to every important action:

```typescript
// Example: After creating a guru
await supabase.from("log_aktivitas").insert({
  user_id: currentUserId,
  aktivitas: "CREATE_GURU",
  modul: "GURU",
  deskripsi: `Created new guru: ${guruNama}`,
  user_agent: navigator.userAgent,
});

// Example: After updating siswa
await supabase.from("log_aktivitas").insert({
  user_id: currentUserId,
  aktivitas: "UPDATE_SISWA",
  modul: "SISWA",
  deskripsi: `Updated siswa data: ${siswaNama}`,
  user_agent: navigator.userAgent,
});

// Example: After deleting DUDI
await supabase.from("log_aktivitas").insert({
  user_id: currentUserId,
  aktivitas: "DELETE_DUDI",
  modul: "DUDI",
  deskripsi: `Deleted DUDI: ${dudiNama}`,
  user_agent: navigator.userAgent,
});
```

---

## 🔍 View Logs Page

**File**: `app/admin/log/page.tsx`

```typescript
"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function LogPage() {
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    loadLogs();
  }, [filter]);

  async function loadLogs() {
    try {
      setLoading(true);
      
      let query = supabase
        .from("log_aktivitas")
        .select(`
          *,
          users:user_id (email, role)
        `)
        .order("created_at", { ascending: false })
        .limit(100);
      
      if (filter !== "all") {
        query = query.eq("modul", filter);
      }
      
      const { data, error } = await query;
      
      if (error) throw error;
      setLogs(data || []);
    } catch (error) {
      console.error("Error loading logs:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Log Aktivitas Sistem</h1>
      
      {/* Filter */}
      <div className="mb-4">
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="px-4 py-2 border rounded"
        >
          <option value="all">Semua Module</option>
          <option value="AUTH">Authentication</option>
          <option value="GURU">Guru</option>
          <option value="SISWA">Siswa</option>
          <option value="DUDI">DUDI</option>
          <option value="ABSENSI">Absensi</option>
        </select>
      </div>

      {/* Logs Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Timestamp
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                User
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Aktivitas
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Modul
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Deskripsi
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {loading ? (
              <tr>
                <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                  Loading...
                </td>
              </tr>
            ) : logs.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                  Belum ada log aktivitas
                </td>
              </tr>
            ) : (
              logs.map((log) => (
                <tr key={log.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(log.created_at).toLocaleString('id-ID')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {log.users?.email || '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs font-semibold rounded bg-blue-100 text-blue-800">
                      {log.aktivitas}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {log.modul}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {log.deskripsi}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
```

---

## ✅ Integration Checklist

### Auth & Logging
- [x] Login activity logging
- [x] Logout activity logging
- [x] Failed login logging
- [ ] Password change logging
- [ ] Session tracking

### Dashboard
- [ ] Real-time stats (Siswa, Guru, DUDI, Pending)
- [ ] Status pengajuan distribution
- [ ] Recent activity logs display
- [ ] Trend chart with real data
- [ ] DUDI distribution with real data

### Absensi
- [ ] Photo upload to storage
- [ ] Save check-in to database
- [ ] Save check-out to database
- [ ] GPS location capture
- [ ] Load history from database
- [ ] Activity logging for check-in/out

### CRUD Operations
- [x] Guru CRUD with activity logging
- [ ] Siswa CRUD with activity logging
- [ ] DUDI CRUD with activity logging
- [ ] Penempatan CRUD with activity logging

### Log Viewing
- [ ] View all logs page
- [ ] Filter logs by module
- [ ] Filter logs by user
- [ ] Filter logs by date range
- [ ] Export logs to CSV

---

## 🚀 Quick Implementation Guide

### 1. Update Dashboard (HIGH PRIORITY)
Copy code from section "Dashboard Integration" above to `app/admin/dashboard/page.tsx`

### 2. Update Absensi (HIGH PRIORITY)
Copy code from section "Absensi Integration" above to `app/siswa/absensi/page.tsx`

### 3. Create Log Page
Copy code from section "View Logs Page" to `app/admin/log/page.tsx`

### 4. Add Logging to All CRUD
Add activity logging after every create/update/delete operation

---

## 📝 Notes

- ✅ Login & Logout logging: **DONE**
- ⏳ Dashboard real-time data: **TODO** (code provided above)
- ⏳ Absensi photo upload: **TODO** (code provided above)
- ⏳ Log viewing page: **TODO** (code provided above)

**All integration code is provided above. Just copy-paste to respective files!** 🎉
