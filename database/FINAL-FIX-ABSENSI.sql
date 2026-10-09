-- ═══════════════════════════════════════════════════════════════════════════
-- 🚨 FINAL FIX: Absensi Table + Storage Policy
-- ═══════════════════════════════════════════════════════════════════════════

-- ============================================================================
-- PART 1: FIX TABLE ABSENSI COLUMNS
-- ============================================================================

-- Add missing columns to absensi table
ALTER TABLE public.absensi 
  ADD COLUMN IF NOT EXISTS waktu_masuk VARCHAR(10),
  ADD COLUMN IF NOT EXISTS waktu_keluar VARCHAR(10),
  ADD COLUMN IF NOT EXISTS foto_masuk_url TEXT,
  ADD COLUMN IF NOT EXISTS foto_keluar_url TEXT,
  ADD COLUMN IF NOT EXISTS keterangan TEXT;

-- Disable RLS on absensi table
ALTER TABLE public.absensi DISABLE ROW LEVEL SECURITY;

-- Verify absensi columns
SELECT column_name, data_type
FROM information_schema.columns
WHERE table_name = 'absensi' AND table_schema = 'public'
ORDER BY ordinal_position;

-- ============================================================================
-- PART 2: STORAGE BUCKET & POLICIES (Skip ALTER TABLE storage.objects)
-- ============================================================================

-- Create bucket if not exists
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

-- Drop existing policies (if any)
DROP POLICY IF EXISTS "Allow upload to absensi-foto" ON storage.objects;
DROP POLICY IF EXISTS "Allow read from absensi-foto" ON storage.objects;
DROP POLICY IF EXISTS "Allow update in absensi-foto" ON storage.objects;
DROP POLICY IF EXISTS "Allow delete from absensi-foto" ON storage.objects;
DROP POLICY IF EXISTS "Public access to absensi-foto" ON storage.objects;

-- Create permissive policies for absensi-foto bucket
CREATE POLICY "Public access to absensi-foto"
ON storage.objects
FOR ALL
TO public
USING (bucket_id = 'absensi-foto')
WITH CHECK (bucket_id = 'absensi-foto');

-- Verify storage bucket
SELECT id, name, public, file_size_limit
FROM storage.buckets
WHERE id = 'absensi-foto';

-- Verify policies
SELECT policyname, cmd, roles
FROM pg_policies
WHERE tablename = 'objects' AND policyname LIKE '%absensi-foto%';

-- ============================================================================
-- ✅ VERIFICATION SUMMARY
-- ============================================================================

-- If you see:
-- 1. Absensi columns: waktu_masuk, waktu_keluar, foto_masuk_url, foto_keluar_url
-- 2. Bucket absensi-foto: public = true
-- 3. Policy "Public access to absensi-foto" exists
-- 
-- Then you're READY TO TEST! 🚀

-- ============================================================================
-- 🧪 OPTIONAL: TEST INSERT
-- ============================================================================

-- Get siswa_id first
SELECT id, nama FROM public.siswa LIMIT 1;

-- Test insert (replace <siswa_id> with actual id)
/*
INSERT INTO public.absensi (
  id, siswa_id, tanggal, waktu_masuk, foto_masuk_url, status, created_at, updated_at
)
VALUES (
  gen_random_uuid(),
  '<siswa_id>',
  CURRENT_DATE,
  '08:30:15',
  'https://test.com/foto.jpg',
  'hadir',
  NOW(),
  NOW()
);

-- Check result
SELECT * FROM public.absensi ORDER BY created_at DESC LIMIT 1;

-- Clean up test data
DELETE FROM public.absensi WHERE foto_masuk_url = 'https://test.com/foto.jpg';
*/
