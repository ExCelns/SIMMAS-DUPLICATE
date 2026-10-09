# SUPABASE INTEGRATION AUDIT

## Status: IN PROGRESS
Last Updated: 2026-10-04

## Objective
Replace all localStorage usage with Supabase authentication and real-time data fetching.

---

## 1. AUTHENTICATION & SESSION MANAGEMENT

### Current Issues:
- ❌ Login uses localStorage for session (`simmas_user`)
- ❌ No proper Supabase Auth integration
- ❌ Manual role checking from localStorage

### Required Changes:
1. Implement Supabase Auth (signInWithPassword)
2. Use Supabase session management
3. Store user metadata in Supabase
4. Create auth middleware for protected routes

### Files to Update:
- [ ] `app/login/page.tsx`
- [ ] `app/logout/page.tsx`
- [ ] `app/components/DashboardHeader.tsx` (user profile)
- [ ] All layout files (auth check)

---

## 2. ADMIN PAGES

### Dashboard (`/admin/dashboard`)
- [ ] Stats cards: Fetch from Supabase
- [ ] Recent activities: Fetch from log_aktivitas
- [ ] Quick actions: Connect to real data

### Siswa Management (`/admin/siswa`)
- [ ] List siswa: FROM siswa table
- [ ] Search & filter
- [ ] CRUD operations

### Guru Management (`/admin/guru`)
- [ ] List guru: FROM guru table
- [ ] Search & filter
- [ ] CRUD operations

### DUDI Management (`/admin/dudi`)
- [ ] List DUDI: FROM dudi table
- [ ] Search & filter
- [ ] CRUD operations

### Penempatan (`/admin/penempatan`)
- [ ] List penempatan: FROM penempatan table
- [ ] Approve/reject pengajuan
- [ ] Real-time updates

### Monitoring (`/admin/monitoring`)
- [ ] Attendance stats: FROM absensi table
- [ ] Journal stats: FROM jurnal table
- [ ] Real-time monitoring

### Log Aktivitas (`/admin/log`)
- [ ] Fetch from log_aktivitas table
- [ ] Filter by date, user, action
- [ ] Pagination

### Pengaturan (`/admin/pengaturan`)
- [ ] System settings
- [ ] User management

---

## 3. GURU PAGES

### Dashboard (`/guru/dashboard`)
- [ ] Stats: siswa bimbingan, jurnal pending, etc
- [ ] FROM siswa, jurnal, kunjungan tables

### Siswa Bimbingan (`/guru/siswa`)
- [ ] List siswa: FROM siswa WHERE guru_id = current_user
- [ ] Stats integration
- [ ] Search functionality

### Jurnal & Absensi (`/guru/jurnal`)
- [x] Stats cards with Supabase
- [ ] Jurnal list with verification
- [ ] Absensi list with validation

### Kunjungan Lapangan (`/guru/kunjungan`)
- [x] Stats cards with Supabase
- [x] List kunjungan
- [x] Add kunjungan form
- [ ] Edit/delete kunjungan

---

## 4. SISWA PAGES

### Dashboard (`/siswa/dashboard`)
- [ ] Stats: absensi, jurnal, etc
- [ ] FROM absensi, jurnal tables

### Pengajuan (`/siswa/pengajuan`)
- [ ] Submit pengajuan magang
- [ ] INSERT INTO penempatan

### Absensi (`/siswa/absensi`)
- [x] Photo upload to Supabase Storage
- [x] INSERT INTO absensi
- [x] GPS location tracking

### Jurnal (`/siswa/jurnal`)
- [ ] List jurnal siswa
- [ ] Add/edit jurnal
- [ ] FROM jurnal WHERE siswa_id = current_user

### Kunjungan (`/siswa/kunjungan`)
- [ ] View kunjungan history
- [ ] FROM kunjungan WHERE siswa_id = current_user

---

## 5. SHARED COMPONENTS

### DashboardHeader.tsx
- [ ] User profile: FROM users table
- [ ] Notifications: FROM log_aktivitas or notifications table
- [ ] Change password: Supabase Auth updateUser

### Sidebar Components
- [ ] User info display
- [ ] Role-based menu

---

## 6. PRIORITY FIXES

### HIGH PRIORITY
1. ❌ Replace localStorage auth with Supabase Auth
2. ❌ Implement proper session management
3. ❌ Add RLS policies check
4. ❌ Implement real user profile fetching

### MEDIUM PRIORITY
5. ❌ Dashboard stats real data
6. ❌ CRUD operations completion
7. ❌ Search & filter implementations

### LOW PRIORITY
8. ❌ Real-time subscriptions
9. ❌ Optimistic updates
10. ❌ Advanced filtering

---

## 7. IMPLEMENTATION PLAN

### Phase 1: Authentication (CRITICAL)
- Create auth utility functions
- Replace all localStorage.getItem("simmas_user")
- Implement Supabase session
- Add auth middleware

### Phase 2: User Data Fetching
- Fetch user profile from Supabase
- Get user role and permissions
- Update all components to use real data

### Phase 3: Page-by-Page Integration
- Start with most used pages
- Test each integration
- Update documentation

### Phase 4: Testing & Validation
- Test all CRUD operations
- Verify RLS policies
- Performance testing

---

## 8. CODE PATTERNS TO REPLACE

### ❌ OLD PATTERN (localStorage):
```typescript
const userData = localStorage.getItem("simmas_user");
const user = JSON.parse(userData);
const userId = user.userId || user.id;
```

### ✅ NEW PATTERN (Supabase):
```typescript
const { data: { session } } = await supabase.auth.getSession();
const userId = session?.user?.id;
const { data: userData } = await supabase
  .from('users')
  .select('*, guru(*), siswa(*), admin(*)')
  .eq('id', userId)
  .single();
```

---

## NEXT STEPS
1. Create auth utility file
2. Update login/logout
3. Replace localStorage in all components
4. Test authentication flow
5. Implement real data fetching

