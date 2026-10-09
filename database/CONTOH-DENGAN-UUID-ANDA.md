# Contoh Insert dengan UUID yang Anda Punya

## UID yang Anda Copy dari Dashboard:
```
aa355845-402d-44e2-b2be-35efc0d87ca4
```

## ❌ SALAH - Jangan Seperti Ini:
```sql
VALUES (
  '<aa355845-402d-44e2-b2be-35efc0d87ca4>',  -- ❌ Ada tanda < >
  'admin@simmas.sch.id',
  'admin',
  true,
  NOW(),
  NOW()
)
```

## ✅ BENAR - Harus Seperti Ini:
```sql
VALUES (
  'aa355845-402d-44e2-b2be-35efc0d87ca4',  -- ✅ Tanpa tanda < >
  'admin@simmas.sch.id',
  'admin',
  true,
  NOW(),
  NOW()
)
```

## 🚀 Cara yang Paling Mudah:

1. **Buka file**: `database/16-insert-demo-users-fixed.sql`
2. **Find (Ctrl+F)**: `PASTE_ADMIN_UID_DI_SINI`
3. **Replace dengan**: `aa355845-402d-44e2-b2be-35efc0d87ca4` (UID admin Anda)
4. **Find**: `PASTE_GURU_UID_DI_SINI`
5. **Replace dengan**: (UID guru Anda, tanpa `< >`)
6. **Find**: `PASTE_SISWA_UID_DI_SINI`
7. **Replace dengan**: (UID siswa Anda, tanpa `< >`)
8. **Copy semua** SQL yang sudah diganti
9. **Paste** ke Supabase SQL Editor
10. **Run**

## 📝 Contoh Lengkap (jika admin UID = aa355845...)

```sql
-- ADMIN
INSERT INTO public.users (id, email, role, is_active, created_at, updated_at)
VALUES (
  'aa355845-402d-44e2-b2be-35efc0d87ca4',
  'admin@simmas.sch.id',
  'admin',
  true,
  NOW(),
  NOW()
)
ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  role = EXCLUDED.role,
  is_active = EXCLUDED.is_active,
  updated_at = NOW();

-- GURU (ganti dengan UID guru Anda)
INSERT INTO public.users (id, email, role, is_active, created_at, updated_at)
VALUES (
  'PASTE_UID_GURU_ANDA_DI_SINI',
  'guru@simmas.sch.id',
  'guru',
  true,
  NOW(),
  NOW()
)
ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  role = EXCLUDED.role,
  is_active = EXCLUDED.is_active,
  updated_at = NOW();

INSERT INTO public.guru (id, user_id, nip, nama, mata_pelajaran, kontak, status, created_at, updated_at)
VALUES (
  gen_random_uuid(),
  'PASTE_UID_GURU_ANDA_DI_SINI',
  '197801012006041001',
  'Budi Santoso, S.Pd',
  'Pemrograman Web',
  '081234567890',
  'aktif',
  NOW(),
  NOW()
)
ON CONFLICT (user_id) DO UPDATE SET
  nip = EXCLUDED.nip,
  nama = EXCLUDED.nama,
  mata_pelajaran = EXCLUDED.mata_pelajaran,
  kontak = EXCLUDED.kontak,
  status = EXCLUDED.status,
  updated_at = NOW();

-- SISWA (ganti dengan UID siswa Anda)
INSERT INTO public.users (id, email, role, is_active, created_at, updated_at)
VALUES (
  'PASTE_UID_SISWA_ANDA_DI_SINI',
  'siswa@simmas.sch.id',
  'siswa',
  true,
  NOW(),
  NOW()
)
ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  role = EXCLUDED.role,
  is_active = EXCLUDED.is_active,
  updated_at = NOW();

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
  'PASTE_UID_SISWA_ANDA_DI_SINI',
  '12345',
  'Ahmad Fauzi',
  'XII RPL',
  'Rekayasa Perangkat Lunak',
  '081234567891',
  'Jl. Contoh No. 123, Tasikmalaya',
  'aktif',
  NOW(),
  NOW()
)
ON CONFLICT (user_id) DO UPDATE SET
  nis = EXCLUDED.nis,
  nama = EXCLUDED.nama,
  kelas = EXCLUDED.kelas,
  jurusan = EXCLUDED.jurusan,
  kontak = EXCLUDED.kontak,
  alamat = EXCLUDED.alamat,
  status = EXCLUDED.status,
  updated_at = NOW();
```

## 🎯 Checklist

- [ ] Copy UID admin dari Dashboard (tanpa `< >`)
- [ ] Copy UID guru dari Dashboard (tanpa `< >`)
- [ ] Copy UID siswa dari Dashboard (tanpa `< >`)
- [ ] Replace semua `PASTE_..._UID_DI_SINI` dengan UID yang benar
- [ ] Pastikan tidak ada tanda `< >` di SQL
- [ ] Run SQL di Supabase SQL Editor
- [ ] Cek hasil dengan query verifikasi

---

**Ingat**: Tanda `< >` hanya untuk menandai "ganti di sini", TIDAK ikut di-paste! 🚫
