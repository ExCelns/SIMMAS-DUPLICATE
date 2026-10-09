-- ============================================================================
-- SIMMAS Database Schema - Part 8: RLS Policies untuk SISWA
-- ============================================================================
-- Jalankan script ini setelah 07-create-policies-guru.sql
-- ============================================================================

-- ============================================================================
-- HELPER FUNCTION: Check if user is siswa
-- ============================================================================
CREATE OR REPLACE FUNCTION is_siswa()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM users 
    WHERE id = auth.uid() AND role = 'siswa'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

COMMENT ON FUNCTION is_siswa() IS 'Check apakah user yang sedang login adalah siswa';

-- ============================================================================
-- HELPER FUNCTION: Get siswa_id dari user yang sedang login
-- ============================================================================
CREATE OR REPLACE FUNCTION get_siswa_id()
RETURNS UUID AS $$
BEGIN
  RETURN (SELECT id FROM siswa WHERE user_id = auth.uid());
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

COMMENT ON FUNCTION get_siswa_id() IS 'Mendapatkan siswa_id dari user yang sedang login';

-- ============================================================================
-- POLICIES untuk TABLE: siswa
-- ============================================================================

-- Siswa dapat melihat data diri sendiri
CREATE POLICY "Siswa dapat melihat data diri sendiri"
ON siswa FOR SELECT
TO authenticated
USING (user_id = auth.uid());

-- Siswa dapat update data diri sendiri (terbatas)
CREATE POLICY "Siswa dapat update data diri sendiri"
ON siswa FOR UPDATE
TO authenticated
USING (user_id = auth.uid())
WITH CHECK (
  user_id = auth.uid() AND
  -- Siswa tidak bisa mengubah field tertentu
  guru_pembimbing_id = (SELECT guru_pembimbing_id FROM siswa WHERE user_id = auth.uid()) AND
  status = (SELECT status FROM siswa WHERE user_id = auth.uid())
);

-- ============================================================================
-- POLICIES untuk TABLE: guru
-- ============================================================================

-- Siswa dapat melihat data guru pembimbingnya
CREATE POLICY "Siswa dapat melihat guru pembimbing"
ON guru FOR SELECT
TO authenticated
USING (
  id = (SELECT guru_pembimbing_id FROM siswa WHERE user_id = auth.uid())
);

-- ============================================================================
-- POLICIES untuk TABLE: dudi
-- ============================================================================

-- Siswa dapat melihat DUDI tempat magangnya
CREATE POLICY "Siswa dapat melihat dudi tempat magang"
ON dudi FOR SELECT
TO authenticated
USING (
  id IN (
    SELECT dudi_id FROM penempatan 
    WHERE siswa_id = get_siswa_id()
  )
);

-- ============================================================================
-- POLICIES untuk TABLE: penempatan
-- ============================================================================

-- Siswa dapat melihat penempatan diri sendiri
CREATE POLICY "Siswa dapat melihat penempatan sendiri"
ON penempatan FOR SELECT
TO authenticated
USING (siswa_id = get_siswa_id());

-- Siswa dapat membuat pengajuan penempatan
CREATE POLICY "Siswa dapat membuat pengajuan penempatan"
ON penempatan FOR INSERT
TO authenticated
WITH CHECK (
  siswa_id = get_siswa_id() AND
  status = 'menunggu' AND
  is_siswa()
);

-- Siswa dapat update pengajuan yang masih menunggu
CREATE POLICY "Siswa dapat update pengajuan menunggu"
ON penempatan FOR UPDATE
TO authenticated
USING (
  siswa_id = get_siswa_id() AND
  status = 'menunggu'
)
WITH CHECK (
  siswa_id = get_siswa_id() AND
  status = 'menunggu'
);

-- Siswa dapat delete pengajuan yang masih menunggu
CREATE POLICY "Siswa dapat delete pengajuan menunggu"
ON penempatan FOR DELETE
TO authenticated
USING (
  siswa_id = get_siswa_id() AND
  status = 'menunggu'
);

-- ============================================================================
-- POLICIES untuk TABLE: absensi
-- ============================================================================

-- Siswa dapat melihat absensi sendiri
CREATE POLICY "Siswa dapat melihat absensi sendiri"
ON absensi FOR SELECT
TO authenticated
USING (siswa_id = get_siswa_id());

-- Siswa dapat membuat absensi sendiri
CREATE POLICY "Siswa dapat membuat absensi sendiri"
ON absensi FOR INSERT
TO authenticated
WITH CHECK (
  siswa_id = get_siswa_id() AND
  is_siswa()
);

-- Siswa dapat update absensi hari ini (untuk foto keluar)
CREATE POLICY "Siswa dapat update absensi hari ini"
ON absensi FOR UPDATE
TO authenticated
USING (
  siswa_id = get_siswa_id() AND
  tanggal = CURRENT_DATE
)
WITH CHECK (
  siswa_id = get_siswa_id() AND
  tanggal = CURRENT_DATE
);

-- ============================================================================
-- POLICIES untuk TABLE: jurnal
-- ============================================================================

-- Siswa dapat melihat jurnal sendiri
CREATE POLICY "Siswa dapat melihat jurnal sendiri"
ON jurnal FOR SELECT
TO authenticated
USING (siswa_id = get_siswa_id());

-- Siswa dapat membuat jurnal sendiri
CREATE POLICY "Siswa dapat membuat jurnal sendiri"
ON jurnal FOR INSERT
TO authenticated
WITH CHECK (
  siswa_id = get_siswa_id() AND
  is_siswa()
);

-- Siswa dapat update jurnal sendiri (yang belum disetujui)
CREATE POLICY "Siswa dapat update jurnal sendiri"
ON jurnal FOR UPDATE
TO authenticated
USING (
  siswa_id = get_siswa_id() AND
  status IN ('draft', 'terkirim', 'direvisi')
)
WITH CHECK (
  siswa_id = get_siswa_id() AND
  status IN ('draft', 'terkirim', 'direvisi')
);

-- Siswa dapat delete jurnal draft
CREATE POLICY "Siswa dapat delete jurnal draft"
ON jurnal FOR DELETE
TO authenticated
USING (
  siswa_id = get_siswa_id() AND
  status = 'draft'
);

-- ============================================================================
-- POLICIES untuk TABLE: kunjungan
-- ============================================================================

-- Siswa dapat melihat kunjungan yang terkait dengan dirinya
CREATE POLICY "Siswa dapat melihat kunjungan terkait"
ON kunjungan FOR SELECT
TO authenticated
USING (
  siswa_id = get_siswa_id() OR
  dudi_id IN (
    SELECT dudi_id FROM penempatan 
    WHERE siswa_id = get_siswa_id() AND status = 'disetujui'
  )
);

-- ============================================================================
-- POLICIES untuk TABLE: notifikasi
-- ============================================================================

-- Siswa dapat melihat notifikasi sendiri
CREATE POLICY "Siswa dapat melihat notifikasi sendiri"
ON notifikasi FOR SELECT
TO authenticated
USING (user_id = auth.uid());

-- Siswa dapat update notifikasi sendiri (mark as read)
CREATE POLICY "Siswa dapat update notifikasi sendiri"
ON notifikasi FOR UPDATE
TO authenticated
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

-- Siswa dapat delete notifikasi sendiri
CREATE POLICY "Siswa dapat delete notifikasi sendiri"
ON notifikasi FOR DELETE
TO authenticated
USING (user_id = auth.uid());

-- ============================================================================
-- POLICIES untuk TABLE: log_aktivitas
-- ============================================================================

-- Siswa dapat melihat log aktivitas sendiri
CREATE POLICY "Siswa dapat melihat log sendiri"
ON log_aktivitas FOR SELECT
TO authenticated
USING (user_id = auth.uid());

-- ============================================================================
-- Success Message
-- ============================================================================
DO $$
BEGIN
  RAISE NOTICE '✅ RLS Policies untuk SISWA berhasil dibuat!';
  RAISE NOTICE 'Lanjutkan dengan script 09-create-storage.sql';
END $$;
