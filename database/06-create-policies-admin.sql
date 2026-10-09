-- ============================================================================
-- SIMMAS Database Schema - Part 6: RLS Policies untuk ADMIN
-- ============================================================================
-- Jalankan script ini setelah 05-enable-rls.sql
-- ============================================================================

-- ============================================================================
-- HELPER FUNCTION: Check if user is admin
-- ============================================================================
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM users 
    WHERE id = auth.uid() AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

COMMENT ON FUNCTION is_admin() IS 'Check apakah user yang sedang login adalah admin';

-- ============================================================================
-- POLICIES untuk TABLE: users
-- ============================================================================

-- Admin dapat melihat semua users
CREATE POLICY "Admin dapat melihat semua users"
ON users FOR SELECT
TO authenticated
USING (is_admin());

-- Admin dapat membuat user baru
CREATE POLICY "Admin dapat membuat user baru"
ON users FOR INSERT
TO authenticated
WITH CHECK (is_admin());

-- Admin dapat update user
CREATE POLICY "Admin dapat update user"
ON users FOR UPDATE
TO authenticated
USING (is_admin());

-- Admin dapat delete user
CREATE POLICY "Admin dapat delete user"
ON users FOR DELETE
TO authenticated
USING (is_admin());

-- User dapat melihat data diri sendiri
CREATE POLICY "User dapat melihat data diri sendiri"
ON users FOR SELECT
TO authenticated
USING (id = auth.uid());

-- User dapat update data diri sendiri (terbatas)
CREATE POLICY "User dapat update data diri sendiri"
ON users FOR UPDATE
TO authenticated
USING (id = auth.uid())
WITH CHECK (id = auth.uid() AND role = (SELECT role FROM users WHERE id = auth.uid()));

-- ============================================================================
-- POLICIES untuk TABLE: guru
-- ============================================================================

-- Admin dapat akses semua data guru
CREATE POLICY "Admin dapat melihat semua guru"
ON guru FOR SELECT
TO authenticated
USING (is_admin());

CREATE POLICY "Admin dapat membuat guru"
ON guru FOR INSERT
TO authenticated
WITH CHECK (is_admin());

CREATE POLICY "Admin dapat update guru"
ON guru FOR UPDATE
TO authenticated
USING (is_admin());

CREATE POLICY "Admin dapat delete guru"
ON guru FOR DELETE
TO authenticated
USING (is_admin());

-- ============================================================================
-- POLICIES untuk TABLE: siswa
-- ============================================================================

-- Admin dapat akses semua data siswa
CREATE POLICY "Admin dapat melihat semua siswa"
ON siswa FOR SELECT
TO authenticated
USING (is_admin());

CREATE POLICY "Admin dapat membuat siswa"
ON siswa FOR INSERT
TO authenticated
WITH CHECK (is_admin());

CREATE POLICY "Admin dapat update siswa"
ON siswa FOR UPDATE
TO authenticated
USING (is_admin());

CREATE POLICY "Admin dapat delete siswa"
ON siswa FOR DELETE
TO authenticated
USING (is_admin());

-- ============================================================================
-- POLICIES untuk TABLE: dudi
-- ============================================================================

-- Admin dapat akses semua data dudi
CREATE POLICY "Admin dapat melihat semua dudi"
ON dudi FOR SELECT
TO authenticated
USING (is_admin());

CREATE POLICY "Admin dapat membuat dudi"
ON dudi FOR INSERT
TO authenticated
WITH CHECK (is_admin());

CREATE POLICY "Admin dapat update dudi"
ON dudi FOR UPDATE
TO authenticated
USING (is_admin());

CREATE POLICY "Admin dapat delete dudi"
ON dudi FOR DELETE
TO authenticated
USING (is_admin());

-- Semua user dapat melihat dudi yang terverifikasi (untuk pilihan saat pengajuan)
CREATE POLICY "Semua user dapat melihat dudi terverifikasi"
ON dudi FOR SELECT
TO authenticated
USING (status = 'terverifikasi');

-- ============================================================================
-- POLICIES untuk TABLE: penempatan
-- ============================================================================

-- Admin dapat akses semua penempatan
CREATE POLICY "Admin dapat melihat semua penempatan"
ON penempatan FOR SELECT
TO authenticated
USING (is_admin());

CREATE POLICY "Admin dapat membuat penempatan"
ON penempatan FOR INSERT
TO authenticated
WITH CHECK (is_admin());

CREATE POLICY "Admin dapat update penempatan"
ON penempatan FOR UPDATE
TO authenticated
USING (is_admin());

CREATE POLICY "Admin dapat delete penempatan"
ON penempatan FOR DELETE
TO authenticated
USING (is_admin());

-- ============================================================================
-- POLICIES untuk TABLE: absensi
-- ============================================================================

-- Admin dapat melihat semua absensi
CREATE POLICY "Admin dapat melihat semua absensi"
ON absensi FOR SELECT
TO authenticated
USING (is_admin());

CREATE POLICY "Admin dapat update absensi"
ON absensi FOR UPDATE
TO authenticated
USING (is_admin());

CREATE POLICY "Admin dapat delete absensi"
ON absensi FOR DELETE
TO authenticated
USING (is_admin());

-- ============================================================================
-- POLICIES untuk TABLE: jurnal
-- ============================================================================

-- Admin dapat melihat semua jurnal
CREATE POLICY "Admin dapat melihat semua jurnal"
ON jurnal FOR SELECT
TO authenticated
USING (is_admin());

CREATE POLICY "Admin dapat update jurnal"
ON jurnal FOR UPDATE
TO authenticated
USING (is_admin());

CREATE POLICY "Admin dapat delete jurnal"
ON jurnal FOR DELETE
TO authenticated
USING (is_admin());

-- ============================================================================
-- POLICIES untuk TABLE: kunjungan
-- ============================================================================

-- Admin dapat akses semua kunjungan
CREATE POLICY "Admin dapat melihat semua kunjungan"
ON kunjungan FOR SELECT
TO authenticated
USING (is_admin());

CREATE POLICY "Admin dapat membuat kunjungan"
ON kunjungan FOR INSERT
TO authenticated
WITH CHECK (is_admin());

CREATE POLICY "Admin dapat update kunjungan"
ON kunjungan FOR UPDATE
TO authenticated
USING (is_admin());

CREATE POLICY "Admin dapat delete kunjungan"
ON kunjungan FOR DELETE
TO authenticated
USING (is_admin());

-- ============================================================================
-- POLICIES untuk TABLE: log_aktivitas
-- ============================================================================

-- Admin dapat melihat semua log
CREATE POLICY "Admin dapat melihat semua log"
ON log_aktivitas FOR SELECT
TO authenticated
USING (is_admin());

-- Sistem dapat insert log (tidak perlu check admin)
CREATE POLICY "Sistem dapat insert log"
ON log_aktivitas FOR INSERT
TO authenticated
WITH CHECK (true);

-- Admin dapat delete log lama
CREATE POLICY "Admin dapat delete log"
ON log_aktivitas FOR DELETE
TO authenticated
USING (is_admin());

-- ============================================================================
-- POLICIES untuk TABLE: pengaturan
-- ============================================================================

-- Admin dapat akses semua pengaturan
CREATE POLICY "Admin dapat melihat semua pengaturan"
ON pengaturan FOR SELECT
TO authenticated
USING (is_admin());

CREATE POLICY "Admin dapat membuat pengaturan"
ON pengaturan FOR INSERT
TO authenticated
WITH CHECK (is_admin());

CREATE POLICY "Admin dapat update pengaturan"
ON pengaturan FOR UPDATE
TO authenticated
USING (is_admin());

CREATE POLICY "Admin dapat delete pengaturan"
ON pengaturan FOR DELETE
TO authenticated
USING (is_admin());

-- Semua user dapat melihat pengaturan publik tertentu
CREATE POLICY "Semua user dapat melihat pengaturan publik"
ON pengaturan FOR SELECT
TO authenticated
USING (key IN ('nama_sekolah', 'tahun_ajaran', 'logo_sekolah'));

-- ============================================================================
-- POLICIES untuk TABLE: notifikasi
-- ============================================================================

-- Admin dapat melihat semua notifikasi
CREATE POLICY "Admin dapat melihat semua notifikasi"
ON notifikasi FOR SELECT
TO authenticated
USING (is_admin());

-- Sistem dapat membuat notifikasi untuk semua user
CREATE POLICY "Sistem dapat membuat notifikasi"
ON notifikasi FOR INSERT
TO authenticated
WITH CHECK (true);

-- Admin dapat delete notifikasi
CREATE POLICY "Admin dapat delete notifikasi"
ON notifikasi FOR DELETE
TO authenticated
USING (is_admin());

-- ============================================================================
-- Success Message
-- ============================================================================
DO $$
BEGIN
  RAISE NOTICE '✅ RLS Policies untuk ADMIN berhasil dibuat!';
  RAISE NOTICE 'Lanjutkan dengan script 07-create-policies-guru.sql';
END $$;
