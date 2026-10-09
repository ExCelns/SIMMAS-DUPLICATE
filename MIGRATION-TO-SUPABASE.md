# MIGRATION TO SUPABASE - ACTION PLAN

## Current Status
- ✅ Supabase client setup (`lib/supabase.ts`)
- ✅ Auth helper functions (`lib/auth.ts`)
- ✅ Login page uses Supabase Auth
- ❌ Many components still use localStorage
- ❌ Need to replace all localStorage.getItem("simmas_user")

---

## FILES THAT USE localStorage (NEED TO REPLACE)

### 1. **Layout Files** (Auth Check)
```
app/admin/layout.tsx
app/guru/layout.tsx
app/siswa/layout.tsx
```
**Current**: Check localStorage for user
**New**: Use Supabase session + middleware

### 2. **Header Component**
```
app/components/DashboardHeader.tsx
```
**Lines to replace**:
- User profile display
- Change password function
**Solution**: Fetch from Supabase users table + use auth.updatePassword()

### 3. **Guru Pages**
```
app/guru/siswa/page.tsx - Line ~73: localStorage.getItem("simmas_user")
app/guru/jurnal/page.tsx - Line ~127: localStorage.getItem("simmas_user")  
app/guru/dashboard/page.tsx - Uses localStorage
```
**Solution**: Use `auth.getUser()` then `userData.getGuruData(userId)`

### 4. **Siswa Pages**
```
app/siswa/absensi/page.tsx - Line ~62: localStorage.getItem("simmas_user")
app/siswa/dashboard/page.tsx - Uses localStorage
app/siswa/jurnal/page.tsx - Uses localStorage
```
**Solution**: Use `auth.getUser()` then `userData.getSiswaData(userId)`

### 5. **Admin Pages**
```
app/admin/dashboard/page.tsx - May use localStorage
app/admin/siswa/page.tsx - May use localStorage
app/admin/guru/page.tsx - May use localStorage
```
**Solution**: Use `auth.getUser()` for admin operations

---

## IMPLEMENTATION STRATEGY

### Phase 1: Create Auth Middleware ✅
File: `middleware.ts` (root)
```typescript
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })
  
  const {
    data: { session },
  } = await supabase.auth.getSession()

  // Protect routes
  if (!session && (
    req.nextUrl.pathname.startsWith('/admin') ||
    req.nextUrl.pathname.startsWith('/guru') ||
    req.nextUrl.pathname.startsWith('/siswa')
  )) {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  return res
}

export const config = {
  matcher: ['/admin/:path*', '/guru/:path*', '/siswa/:path*']
}
```

### Phase 2: Create useAuth Hook
File: `hooks/useAuth.ts`
```typescript
import { useEffect, useState } from 'react';
import { auth, userData } from '@/lib/supabase';

export function useAuth() {
  const [user, setUser] = useState<any>(null);
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUser() {
      const { user } = await auth.getUser();
      if (user) {
        const { data: profile } = await userData.getUserProfile(user.id);
        setUser(profile);
        setRole(profile?.role);
      }
      setLoading(false);
    }
    loadUser();
  }, []);

  return { user, role, loading };
}
```

### Phase 3: Create useGuruData Hook  
File: `hooks/useGuruData.ts`
```typescript
import { useEffect, useState } from 'react';
import { auth, userData } from '@/lib/supabase';

export function useGuruData() {
  const [guruData, setGuruData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadGuru() {
      const { user } = await auth.getUser();
      if (user) {
        const { data } = await userData.getGuruData(user.id);
        setGuruData(data);
      }
      setLoading(false);
    }
    loadGuru();
  }, []);

  return { guruData, loading };
}
```

### Phase 4: Create useSiswaData Hook
File: `hooks/useSiswaData.ts`
```typescript
import { useEffect, useState } from 'react';
import { auth, userData } from '@/lib/supabase';

export function useSiswaData() {
  const [siswaData, setSiswaData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect() => {
    async function loadSiswa() {
      const { user } = await auth.getUser();
      if (user) {
        const { data } = await userData.getSiswaData(user.id);
        setSiswaData(data);
      }
      setLoading(false);
    }
    loadSiswa();
  }, []);

  return { siswaData, loading };
}
```

---

## REPLACEMENT PATTERN

### ❌ OLD (localStorage):
```typescript
const userData = localStorage.getItem("simmas_user");
if (!userData) {
  router.push("/login");
  return;
}
const user = JSON.parse(userData);
const userId = user.userId || user.id;
```

### ✅ NEW (Supabase):
```typescript
const { user } = await auth.getUser();
if (!user) {
  router.push("/login");
  return;
}
const userId = user.id;
```

### For Guru-specific data:
```typescript
const { data: guruData } = await userData.getGuruData(userId);
const guruId = guruData?.id;
```

### For Siswa-specific data:
```typescript
const { data: siswaData } = await userData.getSiswaData(userId);
const siswaId = siswaData?.id;
```

---

## SPECIFIC FILE CHANGES

### 1. `app/guru/siswa/page.tsx`
**Line ~73-82**: Replace localStorage with:
```typescript
const { user } = await auth.getUser();
if (!user) return;

const { data: guruData } = await userData.getGuruData(user.id);
if (!guruData) return;
```

### 2. `app/guru/jurnal/page.tsx`
**Line ~127-136**: Same as above

### 3. `app/siswa/absensi/page.tsx`
**Line ~62-70**: Replace with:
```typescript
const { user } = await auth.getUser();
if (!user) {
  alert("Silakan login terlebih dahulu");
  return;
}

const { data: siswaData } = await userData.getSiswaData(user.id);
if (!siswaData) {
  alert("Data siswa tidak ditemukan");
  return;
}
const siswaId = siswaData.id;
```

### 4. `app/components/DashboardHeader.tsx`
**User profile section**: Fetch real data
```typescript
const [userProfile, setUserProfile] = useState<any>(null);

useEffect(() => {
  async function loadProfile() {
    const { user } = await auth.getUser();
    if (user) {
      const { data } = await userData.getUserProfile(user.id);
      setUserProfile(data);
    }
  }
  loadProfile();
}, []);
```

**Change password**: Use Supabase Auth
```typescript
const { error } = await auth.updatePassword(newPassword);
if (error) {
  setPasswordError(error.message);
} else {
  alert("Password berhasil diubah!");
  handleChangePasswordClose();
}
```

### 5. All Layout Files
Remove localStorage check, rely on middleware:
```typescript
// Remove this:
const userDataStr = localStorage.getItem("simmas_user");
if (!userDataStr) {
  router.push("/login");
  return;
}

// Keep only:
// Layout rendering code
```

---

## TESTING CHECKLIST

### Authentication
- [ ] Login with correct credentials works
- [ ] Login with wrong credentials shows error
- [ ] Logout clears session properly
- [ ] Protected routes redirect to login when not authenticated
- [ ] Session persists on page reload

### Data Fetching
- [ ] Guru pages fetch correct guru_id
- [ ] Siswa pages fetch correct siswa_id
- [ ] Admin pages work without errors
- [ ] All stats cards show real data
- [ ] Search and filter work correctly

### CRUD Operations
- [ ] Can create records (jurnal, absensi, kunjungan)
- [ ] Can read/list records
- [ ] Can update records
- [ ] Can delete records
- [ ] RLS policies work correctly

### User Profile
- [ ] Profile shows correct name and email
- [ ] Change password works
- [ ] Role-based menus show correctly

---

## PRIORITY ORDER

1. **CRITICAL** (Do First):
   - ✅ Auth helpers (`lib/supabase.ts`, `lib/auth.ts`)
   - [ ] Middleware for route protection
   - [ ] Custom hooks (useAuth, useGuruData, useSiswaData)
   - [ ] Update DashboardHeader for real user data
   - [ ] Update all layout files

2. **HIGH** (Do Next):
   - [ ] Replace localStorage in guru pages
   - [ ] Replace localStorage in siswa pages
   - [ ] Update absensi page
   - [ ] Update jurnal pages

3. **MEDIUM** (After Core):
   - [ ] Admin page integrations
   - [ ] Dashboard real stats
   - [ ] Search implementations

4. **LOW** (Polish):
   - [ ] Real-time subscriptions
   - [ ] Optimistic updates
   - [ ] Error boundaries

---

## COMMANDS TO RUN

```bash
# Install required packages (if not already)
npm install @supabase/auth-helpers-nextjs

# Test build
npm run build

# Run dev server
npm run dev
```

---

## NOTES

1. **RLS Policies**: Make sure all tables have proper RLS policies
2. **Session Management**: Supabase handles this automatically
3. **Activity Logging**: Use `activityLog.log()` from lib/supabase.ts
4. **Error Handling**: Always check for errors from Supabase
5. **Performance**: Consider caching user data in React Query or SWR

---

## COMPLETION CRITERIA

✅ When all these are true:
- No localStorage usage for authentication
- All pages fetch real data from Supabase
- All CRUD operations work
- Tests pass
- No console errors
- User experience is smooth

