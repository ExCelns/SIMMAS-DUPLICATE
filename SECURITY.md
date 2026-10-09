# 🔒 Security Guidelines - SIMMAS

## Environment Variables

### ✅ Yang BOLEH di-commit ke GitHub:

```
✅ .env.example (template tanpa nilai asli)
✅ README.md
✅ package.json
✅ tsconfig.json
✅ Source code (.tsx, .ts, .css)
```

### ❌ Yang JANGAN PERNAH di-commit:

```
❌ .env.local (berisi credentials asli)
❌ .env.production
❌ .env.development
❌ node_modules/
❌ .next/
❌ Private keys atau certificates
```

---

## 🔑 API Keys yang Digunakan

### Untuk SIMMAS, kita HANYA menggunakan:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1...
```

### ❌ TIDAK menggunakan:

```env
# JANGAN tambahkan ini!
# SUPABASE_SERVICE_ROLE_KEY=...
```

**Alasan:**
- ✅ RLS policies sudah handle security
- ✅ Anon key aman untuk client-side
- ❌ Service role key terlalu powerful
- ❌ Risiko kebocoran data jika ter-expose

---

## 🛡️ Security Layers

### 1. Row Level Security (RLS)

Semua tabel dilindungi RLS:

```sql
-- Admin: Full access
CREATE POLICY "Admin dapat akses semua"...

-- Guru: Hanya siswa bimbingan
CREATE POLICY "Guru akses siswa bimbingan"...

-- Siswa: Hanya data sendiri
CREATE POLICY "Siswa akses data sendiri"...
```

### 2. Authentication

```typescript
// User harus login dulu
const { data, error } = await supabase.auth.signInWithPassword({
  email, password
});

// Token otomatis di-handle Supabase
// RLS policies check token untuk authorization
```

### 3. Storage Policies

```sql
-- Siswa hanya upload foto sendiri
CREATE POLICY "Siswa dapat upload foto absensi sendiri"...

-- Guru hanya lihat foto siswa bimbingan
CREATE POLICY "Guru dapat melihat foto absensi siswa bimbingan"...
```

---

## 📋 Checklist Sebelum Push ke GitHub

### Before First Push:

- [ ] ✅ `.gitignore` sudah include `.env*`
- [ ] ✅ `.env.local` sudah terisi dengan credentials
- [ ] ✅ `.env.example` sudah dibuat (tanpa credentials)
- [ ] ✅ Test: `git status` tidak show `.env.local`
- [ ] ✅ Hapus service_role key dari `.env.local`

### Before Every Push:

```bash
# 1. Check file yang akan di-commit
git status

# 2. Pastikan .env.local TIDAK muncul
# Jika muncul, jangan push!

# 3. Check git diff
git diff

# 4. Jika aman, commit & push
git add .
git commit -m "Your commit message"
git push
```

---

## 🚨 Jika Accidentally Commit Secret Key

### Step 1: REGENERATE KEY IMMEDIATELY

```
1. Buka Supabase Dashboard
2. Settings → API → Reset anon key
3. Update .env.local dengan key baru
4. Restart dev server
```

### Step 2: Remove from Git History

```bash
# CAREFUL! This rewrites history
git filter-branch --force --index-filter \
  "git rm --cached --ignore-unmatch .env.local" \
  --prune-empty --tag-name-filter cat -- --all

# Force push (jika sudah di-push)
git push origin --force --all
```

### Step 3: Verify

```bash
# Check history
git log --all --full-history -- .env.local

# Should return nothing
```

---

## 🔐 Production Security Checklist

### Before Deploy to Production:

- [ ] Ganti semua password default
- [ ] Review RLS policies
- [ ] Test RLS dengan berbagai role
- [ ] Enable email verification
- [ ] Setup password requirements
- [ ] Enable MFA untuk admin
- [ ] Setup backup schedule
- [ ] Enable audit logging
- [ ] Monitor slow queries
- [ ] Setup error alerts

### Environment Variables Production:

```
Vercel/Netlify:
→ Dashboard → Settings → Environment Variables
→ Tambahkan NEXT_PUBLIC_SUPABASE_URL
→ Tambahkan NEXT_PUBLIC_SUPABASE_ANON_KEY
→ JANGAN tambahkan service_role key
```

---

## 📖 Best Practices

### 1. Never Hardcode Credentials

❌ **JANGAN:**
```typescript
const supabase = createClient(
  'https://abcd.supabase.co',  // ❌ Hardcoded!
  'eyJhbGci...'                 // ❌ Hardcoded!
);
```

✅ **LAKUKAN:**
```typescript
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
```

### 2. Use Environment-Specific Configs

```
Development:  .env.local
Staging:      .env.staging (di deployment platform)
Production:   .env.production (di deployment platform)
```

### 3. Regular Security Audits

```bash
# Check untuk exposed secrets
npm install -g secretlint
secretlint "**/*"

# Scan dependencies
npm audit

# Update packages
npm update
```

---

## 🆘 Emergency Contacts

Jika terjadi security breach:

1. **Immediately:**
   - Regenerate all API keys
   - Change all passwords
   - Review access logs

2. **Contact:**
   - Team lead
   - System administrator
   - Supabase support (jika perlu)

3. **Document:**
   - What was exposed
   - When it happened
   - Actions taken

---

## ✅ Security Summary

**SIMMAS menggunakan security model berlapis:**

```
┌─────────────────────────────────────┐
│  Layer 1: Authentication            │
│  (Supabase Auth)                    │
├─────────────────────────────────────┤
│  Layer 2: Row Level Security        │
│  (RLS Policies per role)            │
├─────────────────────────────────────┤
│  Layer 3: Storage Security          │
│  (Policies per bucket)              │
├─────────────────────────────────────┤
│  Layer 4: Application Logic         │
│  (Input validation, etc)            │
└─────────────────────────────────────┘
```

**Result:** ✅ Aman untuk production!

---

**Last Updated:** October 4, 2026  
**Version:** 1.0.0
