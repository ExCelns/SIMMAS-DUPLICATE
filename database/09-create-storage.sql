-- ============================================================================
-- SIMMAS Database Schema - Part 9: Storage Buckets & Policies
-- ============================================================================
-- Jalankan script ini setelah 08-create-policies-siswa.sql
-- ============================================================================

-- ============================================================================
-- CREATE STORAGE BUCKETS
-- ============================================================================

-- Bucket untuk foto absensi
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'absensi-foto', 
  'absensi-foto', 
  false,
  5242880, -- 5MB
  ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
)
ON CONFLICT (id) DO NOTHING;

-- Bucket untuk dokumen (PDF, Word, dll)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'dokumen', 
  'dokumen', 
  false,
  10485760, -- 10MB
  ARRAY[
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  ]
)
ON CONFLICT (id) DO NOTHING;

-- Bucket untuk foto dokumentasi kunjungan
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'kunjungan-foto', 
  'kunjungan-foto', 
  false,
  5242880, -- 5MB
  ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
)
ON CONFLICT (id) DO NOTHING;

-- Bucket untuk foto profil user
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'profil-foto', 
  'profil-foto', 
  true, -- Public agar bisa ditampilkan
  2097152, -- 2MB
  ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
)
ON CONFLICT (id) DO NOTHING;

-- ============================================================================
-- STORAGE POLICIES: absensi-foto
-- ============================================================================

-- Siswa dapat upload foto absensi sendiri
CREATE POLICY "Siswa dapat upload foto absensi sendiri"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'absensi-foto' AND
  (storage.foldername(name))[1] = (SELECT id::text FROM siswa WHERE user_id = auth.uid())
);

-- Siswa dapat melihat foto absensi sendiri
CREATE POLICY "Siswa dapat melihat foto absensi sendiri"
ON storage.objects FOR SELECT
TO authenticated
USING (
  bucket_id = 'absensi-foto' AND
  (storage.foldername(name))[1] = (SELECT id::text FROM siswa WHERE user_id = auth.uid())
);

-- Guru dapat melihat foto absensi siswa bimbingannya
CREATE POLICY "Guru dapat melihat foto absensi siswa bimbingan"
ON storage.objects FOR SELECT
TO authenticated
USING (
  bucket_id = 'absensi-foto' AND
  (storage.foldername(name))[1] IN (
    SELECT id::text FROM siswa 
    WHERE guru_pembimbing_id = (SELECT id FROM guru WHERE user_id = auth.uid())
  )
);

-- Admin dapat melihat semua foto absensi
CREATE POLICY "Admin dapat melihat semua foto absensi"
ON storage.objects FOR SELECT
TO authenticated
USING (
  bucket_id = 'absensi-foto' AND
  EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin')
);

-- Admin dapat delete foto absensi
CREATE POLICY "Admin dapat delete foto absensi"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'absensi-foto' AND
  EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin')
);

-- ============================================================================
-- STORAGE POLICIES: dokumen
-- ============================================================================

-- User dapat upload dokumen sendiri
CREATE POLICY "User dapat upload dokumen sendiri"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'dokumen' AND
  (storage.foldername(name))[1] = auth.uid()::text
);

-- User dapat melihat dokumen sendiri
CREATE POLICY "User dapat melihat dokumen sendiri"
ON storage.objects FOR SELECT
TO authenticated
USING (
  bucket_id = 'dokumen' AND
  (storage.foldername(name))[1] = auth.uid()::text
);

-- User dapat update dokumen sendiri
CREATE POLICY "User dapat update dokumen sendiri"
ON storage.objects FOR UPDATE
TO authenticated
USING (
  bucket_id = 'dokumen' AND
  (storage.foldername(name))[1] = auth.uid()::text
);

-- User dapat delete dokumen sendiri
CREATE POLICY "User dapat delete dokumen sendiri"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'dokumen' AND
  (storage.foldername(name))[1] = auth.uid()::text
);

-- Admin dapat akses semua dokumen
CREATE POLICY "Admin dapat akses semua dokumen"
ON storage.objects FOR ALL
TO authenticated
USING (
  bucket_id = 'dokumen' AND
  EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin')
);

-- ============================================================================
-- STORAGE POLICIES: kunjungan-foto
-- ============================================================================

-- Guru dapat upload foto kunjungan
CREATE POLICY "Guru dapat upload foto kunjungan"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'kunjungan-foto' AND
  (storage.foldername(name))[1] = (SELECT id::text FROM guru WHERE user_id = auth.uid())
);

-- Guru dapat melihat foto kunjungan sendiri
CREATE POLICY "Guru dapat melihat foto kunjungan sendiri"
ON storage.objects FOR SELECT
TO authenticated
USING (
  bucket_id = 'kunjungan-foto' AND
  (storage.foldername(name))[1] = (SELECT id::text FROM guru WHERE user_id = auth.uid())
);

-- Guru dapat delete foto kunjungan sendiri
CREATE POLICY "Guru dapat delete foto kunjungan sendiri"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'kunjungan-foto' AND
  (storage.foldername(name))[1] = (SELECT id::text FROM guru WHERE user_id = auth.uid())
);

-- Admin dapat akses semua foto kunjungan
CREATE POLICY "Admin dapat akses semua foto kunjungan"
ON storage.objects FOR ALL
TO authenticated
USING (
  bucket_id = 'kunjungan-foto' AND
  EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin')
);

-- Siswa dapat melihat foto kunjungan terkait
CREATE POLICY "Siswa dapat melihat foto kunjungan terkait"
ON storage.objects FOR SELECT
TO authenticated
USING (
  bucket_id = 'kunjungan-foto' AND
  (storage.foldername(name))[1] IN (
    SELECT k.guru_id::text FROM kunjungan k
    WHERE k.siswa_id = (SELECT id FROM siswa WHERE user_id = auth.uid())
  )
);

-- ============================================================================
-- STORAGE POLICIES: profil-foto
-- ============================================================================

-- User dapat upload foto profil sendiri
CREATE POLICY "User dapat upload foto profil sendiri"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'profil-foto' AND
  (storage.foldername(name))[1] = auth.uid()::text
);

-- Semua user dapat melihat foto profil (public bucket)
CREATE POLICY "Semua user dapat melihat foto profil"
ON storage.objects FOR SELECT
TO authenticated
USING (bucket_id = 'profil-foto');

-- User dapat update foto profil sendiri
CREATE POLICY "User dapat update foto profil sendiri"
ON storage.objects FOR UPDATE
TO authenticated
USING (
  bucket_id = 'profil-foto' AND
  (storage.foldername(name))[1] = auth.uid()::text
);

-- User dapat delete foto profil sendiri
CREATE POLICY "User dapat delete foto profil sendiri"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'profil-foto' AND
  (storage.foldername(name))[1] = auth.uid()::text
);

-- ============================================================================
-- Success Message
-- ============================================================================
DO $$
BEGIN
  RAISE NOTICE '✅ Storage buckets dan policies berhasil dibuat!';
  RAISE NOTICE 'Lanjutkan dengan script 10-seed-data.sql';
END $$;
