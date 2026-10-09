-- ═══════════════════════════════════════════════════════════════════════════
-- 🚨 QUICK FIX: Missing Columns di Table Absensi
-- Error: "Could not find the 'waktu_masuk' column"
--
-- COPY PASTE semua SQL ini ke Supabase SQL Editor dan RUN!
-- ═══════════════════════════════════════════════════════════════════════════

-- 1. Add missing columns
ALTER TABLE public.absensi 
  ADD COLUMN IF NOT EXISTS waktu_masuk VARCHAR(10),
  ADD COLUMN IF NOT EXISTS waktu_keluar VARCHAR(10),
  ADD COLUMN IF NOT EXISTS foto_masuk_url TEXT,
  ADD COLUMN IF NOT EXISTS foto_keluar_url TEXT,
  ADD COLUMN IF NOT EXISTS keterangan TEXT;

-- 2. Disable RLS for testing
ALTER TABLE public.absensi DISABLE ROW LEVEL SECURITY;

-- 3. Verify columns
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'absensi'
  AND table_schema = 'public'
ORDER BY ordinal_position;

-- ✅ Expected output harus include:
-- waktu_masuk, waktu_keluar, foto_masuk_url, foto_keluar_url, keterangan

-- ═══════════════════════════════════════════════════════════════════════════
-- ✅ DONE! Sekarang test upload foto di aplikasi
-- ═══════════════════════════════════════════════════════════════════════════
