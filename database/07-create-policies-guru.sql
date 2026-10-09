-- ============================================================================
-- SIMMAS Database Schema - Part 7: RLS Policies untuk GURU
-- ============================================================================
-- Jalankan script ini setelah 06-create-policies-admin.sql
-- ============================================================================

-- ============================================================================
-- HELPER FUNCTION: Check if user is guru
-- ============================================================================
CREATE OR REPLACE FUNCTION is_guru()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM users 
    WHERE id = auth.uid() AND role = 'guru'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

COMMENT ON FUNCTION is_guru() IS 'Check apakah user yang sedang login adalah guru';

-- ============================================================================
-- HELPER FUNCTION: Get guru_id dari user yang sedang login
-- ============================================================================
CREATE OR REPLACE FUNCTION get_guru_id()
RETURNS UUID AS $$
BEGIN
  RETURN (SELECT id FROM guru WHERE user_id = auth.uid());
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

COMMENT ON FUNCTION get_guru_id() IS 'Mendapatkan guru_id dari user yang sedang login';

-- ============================================================================
-- POLICIES untuk TABLE: guru
-- ============================================================================

-- Guru dapat melihat data diri sendiri
CREATE POLICY "Guru dapat melihat data diri sendiri"
ON guru FOR SELECT
TO authenticated
USING (user_id = auth.uid());

-- Guru dapat update data diri sendiri (terbatas)
CREATE POLICY "Guru dapat update data diri sendiri"
ON guru FOR UPDATE
TO authenticated
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

-- Guru dapat melihat guru lain (untuk koordinasi)
CREATE POLICY "Guru dapat melihat guru lain"
ON guru FOR SELECT
TO authenticated
USING (is_guru());

-- ============================================================================
-- POLICIES untuk TABLE: siswa
-- ============================================================================

-- Guru dapat melihat siswa bimbingannya
CREATE POLICY "Guru dapat melihat siswa bimbingan"
ON siswa FOR SELECT
TO authenticated
USING (
  guru_pembimbing_id = get_guru_id()
);

-- Guru dapat melihat semua siswa (untuk keperluan monitoring)
CREATE POLICY "Guru dapat melihat semua siswa"
ON siswa FOR SELECT
TO authenticated
USING (is_guru());

-- Guru dapat update siswa bimbingannya
CREATE POLICY "Guru dapat update siswa bimbingan"
ON siswa FOR UPDATE
TO authenticated
USING (guru_pembimbing_id = get_guru_id())
WITH CHECK (guru_pembimbing_id = get_guru_id());

-- ============================================================================
-- POLICIES untuk TABLE: penempatan
-- ============================================================================

-- Guru dapat melihat penempatan siswa bimbingannya
CREATE POLICY "Guru dapat melihat penempatan siswa bimbingan"
ON penempatan FOR SELECT
TO authenticated
USING (
  guru_pembimbing_id = get_guru_id() OR
  siswa_id IN (SELECT id FROM siswa WHERE guru_pembimbing_id = get_guru_id())
);

-- Guru dapat update status penempatan siswa bimbingannya
CREATE POLICY "Guru dapat update penempatan siswa bimbingan"
ON penempatan FOR UPDATE
TO authenticated
USING (guru_pembimbing_id = get_guru_id())
WITH CHECK (guru_pembimbing_id = get_guru_id());

-- ============================================================================
-- POLICIES untuk TABLE: absensi
-- ============================================================================

-- Guru dapat melihat absensi siswa bimbingannya
CREATE POLICY "Guru dapat melihat absensi siswa bimbingan"
ON absensi FOR SELECT
TO authenticated
USING (
  siswa_id IN (SELECT id FROM siswa WHERE guru_pembimbing_id = get_guru_id())
);

-- Guru dapat update absensi siswa bimbingannya (untuk koreksi)
CREATE POLICY "Guru dapat update absensi siswa bimbingan"
ON absensi FOR UPDATE
TO authenticated
USING (
  siswa_id IN (SELECT id FROM siswa WHERE guru_pembimbing_id = get_guru_id())
);

-- ============================================================================
-- POLICIES untuk TABLE: jurnal
-- ============================================================================

-- Guru dapat melihat jurnal siswa bimbingannya
CREATE POLICY "Guru dapat melihat jurnal siswa bimbingan"
ON jurnal FOR SELECT
TO authenticated
USING (
  siswa_id IN (SELECT id FROM siswa WHERE guru_pembimbing_id = get_guru_id())
);

-- Guru dapat update jurnal siswa bimbingannya (untuk validasi)
CREATE POLICY "Guru dapat validasi jurnal siswa bimbingan"
ON jurnal FOR UPDATE
TO authenticated
USING (
  siswa_id IN (SELECT id FROM siswa WHERE guru_pembimbing_id = get_guru_id())
)
WITH CHECK (
  siswa_id IN (SELECT id FROM siswa WHERE guru_pembimbing_id = get_guru_id())
);

-- ============================================================================
-- POLICIES untuk TABLE: kunjungan
-- ============================================================================

-- Guru dapat melihat kunjungan yang dilakukannya
CREATE POLICY "Guru dapat melihat kunjungan sendiri"
ON kunjungan FOR SELECT
TO authenticated
USING (guru_id = get_guru_id());

-- Guru dapat membuat kunjungan
CREATE POLICY "Guru dapat membuat kunjungan"
ON kunjungan FOR INSERT
TO authenticated
WITH CHECK (
  guru_id = get_guru_id() AND is_guru()
);

-- Guru dapat update kunjungan yang dilakukannya
CREATE POLICY "Guru dapat update kunjungan sendiri"
ON kunjungan FOR UPDATE
TO authenticated
USING (guru_id = get_guru_id())
WITH CHECK (guru_id = get_guru_id());

-- Guru dapat delete kunjungan yang belum selesai
CREATE POLICY "Guru dapat delete kunjungan sendiri"
ON kunjungan FOR DELETE
TO authenticated
USING (
  guru_id = get_guru_id() AND status = 'terjadwal'
);

-- Guru dapat melihat semua kunjungan (untuk koordinasi)
CREATE POLICY "Guru dapat melihat semua kunjungan"
ON kunjungan FOR SELECT
TO authenticated
USING (is_guru());

-- ============================================================================
-- POLICIES untuk TABLE: notifikasi
-- ============================================================================

-- Guru dapat melihat notifikasi sendiri
CREATE POLICY "Guru dapat melihat notifikasi sendiri"
ON notifikasi FOR SELECT
TO authenticated
USING (user_id = auth.uid());

-- Guru dapat update notifikasi sendiri (mark as read)
CREATE POLICY "Guru dapat update notifikasi sendiri"
ON notifikasi FOR UPDATE
TO authenticated
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

-- Guru dapat delete notifikasi sendiri
CREATE POLICY "Guru dapat delete notifikasi sendiri"
ON notifikasi FOR DELETE
TO authenticated
USING (user_id = auth.uid());

-- ============================================================================
-- POLICIES untuk TABLE: log_aktivitas
-- ============================================================================

-- Guru dapat melihat log aktivitas sendiri
CREATE POLICY "Guru dapat melihat log sendiri"
ON log_aktivitas FOR SELECT
TO authenticated
USING (user_id = auth.uid());

-- ============================================================================
-- Success Message
-- ============================================================================
DO $$
BEGIN
  RAISE NOTICE '✅ RLS Policies untuk GURU berhasil dibuat!';
  RAISE NOTICE 'Lanjutkan dengan script 08-create-policies-siswa.sql';
END $$;
