-- ═══════════════════════════════════════════════════════════════════════════
-- FIX STORAGE RLS POLICY UNTUK ABSENSI FOTO
-- Error: "new row violates row-level security policy"
-- ═══════════════════════════════════════════════════════════════════════════

-- Step 1: Pastikan bucket 'absensi-foto' ada
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'absensi-foto',
  'absensi-foto',
  true,
  5242880,  -- 5MB
  ARRAY['image/jpeg', 'image/png', 'image/jpg']
)
ON CONFLICT (id) DO UPDATE SET
  public = true,
  file_size_limit = 5242880,
  allowed_mime_types = ARRAY['image/jpeg', 'image/png', 'image/jpg'];

-- Step 2: Hapus semua policy lama (jika ada)
DROP POLICY IF EXISTS "Allow authenticated uploads" ON storage.objects;
DROP POLICY IF EXISTS "Allow public uploads" ON storage.objects;
DROP POLICY IF EXISTS "Allow public read access" ON storage.objects;
DROP POLICY IF EXISTS "Public Upload Access absensi-foto" ON storage.objects;
DROP POLICY IF EXISTS "Public Read Access absensi-foto" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can upload to absensi-foto" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can read from absensi-foto" ON storage.objects;

-- Step 3: Buat policy baru yang permissive untuk absensi-foto

-- Policy 1: Allow INSERT (upload) untuk semua user di bucket absensi-foto
CREATE POLICY "Allow upload to absensi-foto"
ON storage.objects
FOR INSERT
TO public
WITH CHECK (bucket_id = 'absensi-foto');

-- Policy 2: Allow SELECT (read) untuk semua user di bucket absensi-foto
CREATE POLICY "Allow read from absensi-foto"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'absensi-foto');

-- Policy 3: Allow UPDATE untuk owner atau authenticated user
CREATE POLICY "Allow update in absensi-foto"
ON storage.objects
FOR UPDATE
TO public
USING (bucket_id = 'absensi-foto');

-- Policy 4: Allow DELETE untuk owner atau authenticated user
CREATE POLICY "Allow delete from absensi-foto"
ON storage.objects
FOR DELETE
TO public
USING (bucket_id = 'absensi-foto');

-- Step 4: Verifikasi policies
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual,
  with_check
FROM pg_policies
WHERE tablename = 'objects'
  AND policyname LIKE '%absensi-foto%';

-- ═══════════════════════════════════════════════════════════════════════════
-- ALTERNATIF: Jika masih error, disable RLS untuk testing
-- (HANYA UNTUK DEVELOPMENT, JANGAN DI PRODUCTION!)
-- ═══════════════════════════════════════════════════════════════════════════

-- UNCOMMENT ini jika ingin disable RLS sementara:
-- ALTER TABLE storage.objects DISABLE ROW LEVEL SECURITY;

-- Untuk enable lagi nanti:
-- ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- ═══════════════════════════════════════════════════════════════════════════
-- VERIFIKASI BUCKET SETTINGS
-- ═══════════════════════════════════════════════════════════════════════════

SELECT 
  id,
  name,
  public,
  file_size_limit,
  allowed_mime_types
FROM storage.buckets
WHERE id = 'absensi-foto';

-- Expected output:
-- id: absensi-foto
-- name: absensi-foto  
-- public: true
-- file_size_limit: 5242880
-- allowed_mime_types: {image/jpeg,image/png,image/jpg}
