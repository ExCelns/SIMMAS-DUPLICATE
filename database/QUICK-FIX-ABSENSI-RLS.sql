-- ═══════════════════════════════════════════════════════════════════════════
-- 🚨 QUICK FIX: RLS Error saat Upload Foto Absensi
-- Error: "new row violates row-level security policy"
-- 
-- COPY PASTE semua SQL ini ke Supabase SQL Editor dan RUN!
-- ═══════════════════════════════════════════════════════════════════════════

-- ============================================================================
-- OPTION 1: FIX RLS POLICIES (RECOMMENDED)
-- ============================================================================

-- 1. Buat/update bucket
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

-- 2. Drop old policies
DROP POLICY IF EXISTS "Allow upload to absensi-foto" ON storage.objects;
DROP POLICY IF EXISTS "Allow read from absensi-foto" ON storage.objects;
DROP POLICY IF EXISTS "Allow update in absensi-foto" ON storage.objects;
DROP POLICY IF EXISTS "Allow delete from absensi-foto" ON storage.objects;

-- 3. Create new permissive policies
CREATE POLICY "Allow upload to absensi-foto"
ON storage.objects
FOR INSERT
TO public
WITH CHECK (bucket_id = 'absensi-foto');

CREATE POLICY "Allow read from absensi-foto"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'absensi-foto');

CREATE POLICY "Allow update in absensi-foto"
ON storage.objects
FOR UPDATE
TO public
USING (bucket_id = 'absensi-foto');

CREATE POLICY "Allow delete from absensi-foto"
ON storage.objects
FOR DELETE
TO public
USING (bucket_id = 'absensi-foto');

-- ============================================================================
-- OPTION 2: DISABLE RLS (QUICK BUT NOT RECOMMENDED FOR PRODUCTION)
-- ============================================================================
-- Uncomment line di bawah jika Option 1 tidak work:

-- ALTER TABLE storage.objects DISABLE ROW LEVEL SECURITY;

-- ============================================================================
-- VERIFICATION
-- ============================================================================

-- Check bucket
SELECT id, name, public, file_size_limit
FROM storage.buckets
WHERE id = 'absensi-foto';

-- Check policies
SELECT policyname, cmd
FROM pg_policies
WHERE tablename = 'objects'
  AND policyname LIKE '%absensi-foto%';

-- ============================================================================
-- ✅ DONE! Sekarang test upload foto di aplikasi
-- ============================================================================
