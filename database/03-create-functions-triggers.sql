-- ============================================================================
-- SIMMAS Database Schema - Part 3: Functions & Triggers
-- ============================================================================
-- Jalankan script ini setelah 02-create-indexes.sql
-- ============================================================================

-- ============================================================================
-- FUNCTION: Auto Update Updated_at Timestamp
-- ============================================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

COMMENT ON FUNCTION update_updated_at_column() IS 'Otomatis update kolom updated_at saat ada perubahan data';

-- ============================================================================
-- TRIGGERS: Update Updated_at untuk semua tabel
-- ============================================================================

-- Trigger untuk users
CREATE TRIGGER update_users_updated_at 
BEFORE UPDATE ON users
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Trigger untuk guru
CREATE TRIGGER update_guru_updated_at 
BEFORE UPDATE ON guru
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Trigger untuk siswa
CREATE TRIGGER update_siswa_updated_at 
BEFORE UPDATE ON siswa
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Trigger untuk dudi
CREATE TRIGGER update_dudi_updated_at 
BEFORE UPDATE ON dudi
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Trigger untuk penempatan
CREATE TRIGGER update_penempatan_updated_at 
BEFORE UPDATE ON penempatan
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Trigger untuk absensi
CREATE TRIGGER update_absensi_updated_at 
BEFORE UPDATE ON absensi
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Trigger untuk jurnal
CREATE TRIGGER update_jurnal_updated_at 
BEFORE UPDATE ON jurnal
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Trigger untuk kunjungan
CREATE TRIGGER update_kunjungan_updated_at 
BEFORE UPDATE ON kunjungan
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Trigger untuk pengaturan
CREATE TRIGGER update_pengaturan_updated_at 
BEFORE UPDATE ON pengaturan
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- FUNCTION: Catat Log Aktivitas
-- ============================================================================
CREATE OR REPLACE FUNCTION catat_log_aktivitas()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO log_aktivitas (
    user_id, 
    aktivitas, 
    modul, 
    deskripsi
  )
  VALUES (
    auth.uid(),
    TG_OP,
    TG_TABLE_NAME,
    'Operasi ' || TG_OP || ' pada tabel ' || TG_TABLE_NAME
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

COMMENT ON FUNCTION catat_log_aktivitas() IS 'Otomatis mencatat aktivitas penting ke log_aktivitas';

-- ============================================================================
-- TRIGGERS: Log Aktivitas untuk tabel penting
-- ============================================================================

-- Log untuk penempatan
CREATE TRIGGER log_penempatan_changes
AFTER INSERT OR UPDATE ON penempatan
FOR EACH ROW EXECUTE FUNCTION catat_log_aktivitas();

-- Log untuk absensi
CREATE TRIGGER log_absensi_changes
AFTER INSERT ON absensi
FOR EACH ROW EXECUTE FUNCTION catat_log_aktivitas();

-- Log untuk jurnal
CREATE TRIGGER log_jurnal_changes
AFTER INSERT OR UPDATE ON jurnal
FOR EACH ROW EXECUTE FUNCTION catat_log_aktivitas();

-- ============================================================================
-- FUNCTION: Hitung Jumlah Siswa di DUDI
-- ============================================================================
CREATE OR REPLACE FUNCTION hitung_siswa_aktif_dudi(dudi_id_param UUID)
RETURNS INTEGER AS $$
DECLARE
  jumlah_siswa INTEGER;
BEGIN
  SELECT COUNT(*) INTO jumlah_siswa
  FROM penempatan
  WHERE dudi_id = dudi_id_param 
    AND status = 'disetujui';
  
  RETURN jumlah_siswa;
END;
$$ LANGUAGE plpgsql;

COMMENT ON FUNCTION hitung_siswa_aktif_dudi(UUID) IS 'Menghitung jumlah siswa aktif di DUDI tertentu';

-- ============================================================================
-- FUNCTION: Hitung Jumlah Siswa Bimbingan Guru
-- ============================================================================
CREATE OR REPLACE FUNCTION hitung_siswa_bimbingan_guru(guru_id_param UUID)
RETURNS INTEGER AS $$
DECLARE
  jumlah_siswa INTEGER;
BEGIN
  SELECT COUNT(*) INTO jumlah_siswa
  FROM siswa
  WHERE guru_pembimbing_id = guru_id_param 
    AND status = 'aktif';
  
  RETURN jumlah_siswa;
END;
$$ LANGUAGE plpgsql;

COMMENT ON FUNCTION hitung_siswa_bimbingan_guru(UUID) IS 'Menghitung jumlah siswa bimbingan guru tertentu';

-- ============================================================================
-- FUNCTION: Validasi Kapasitas DUDI
-- ============================================================================
CREATE OR REPLACE FUNCTION validasi_kapasitas_dudi()
RETURNS TRIGGER AS $$
DECLARE
  siswa_aktif INTEGER;
  kapasitas_max INTEGER;
BEGIN
  IF NEW.status = 'disetujui' THEN
    -- Hitung siswa yang sudah ditempatkan
    SELECT COUNT(*) INTO siswa_aktif
    FROM penempatan
    WHERE dudi_id = NEW.dudi_id 
      AND status = 'disetujui';
    
    -- Ambil kapasitas maksimum
    SELECT kapasitas_siswa INTO kapasitas_max
    FROM dudi
    WHERE id = NEW.dudi_id;
    
    -- Validasi
    IF siswa_aktif >= kapasitas_max THEN
      RAISE EXCEPTION 'Kapasitas DUDI sudah penuh. Maksimal % siswa', kapasitas_max;
    END IF;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

COMMENT ON FUNCTION validasi_kapasitas_dudi() IS 'Validasi kapasitas DUDI sebelum menyetujui penempatan';

-- ============================================================================
-- TRIGGER: Validasi Kapasitas DUDI
-- ============================================================================
CREATE TRIGGER check_kapasitas_dudi
BEFORE INSERT OR UPDATE ON penempatan
FOR EACH ROW
WHEN (NEW.status = 'disetujui')
EXECUTE FUNCTION validasi_kapasitas_dudi();

-- ============================================================================
-- FUNCTION: Update Status Penempatan Otomatis
-- ============================================================================
CREATE OR REPLACE FUNCTION update_status_penempatan()
RETURNS TRIGGER AS $$
BEGIN
  -- Jika tanggal selesai sudah lewat, update status menjadi selesai
  IF NEW.tanggal_selesai < CURRENT_DATE AND NEW.status = 'disetujui' THEN
    NEW.status := 'selesai';
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

COMMENT ON FUNCTION update_status_penempatan() IS 'Otomatis update status penempatan menjadi selesai jika periode sudah lewat';

-- ============================================================================
-- TRIGGER: Update Status Penempatan
-- ============================================================================
CREATE TRIGGER auto_update_status_penempatan
BEFORE UPDATE ON penempatan
FOR EACH ROW
EXECUTE FUNCTION update_status_penempatan();

-- ============================================================================
-- FUNCTION: Kirim Notifikasi
-- ============================================================================
CREATE OR REPLACE FUNCTION kirim_notifikasi(
  p_user_id UUID,
  p_judul TEXT,
  p_pesan TEXT,
  p_tipe TEXT DEFAULT 'info',
  p_link TEXT DEFAULT NULL
)
RETURNS UUID AS $$
DECLARE
  notif_id UUID;
BEGIN
  INSERT INTO notifikasi (user_id, judul, pesan, tipe, link)
  VALUES (p_user_id, p_judul, p_pesan, p_tipe, p_link)
  RETURNING id INTO notif_id;
  
  RETURN notif_id;
END;
$$ LANGUAGE plpgsql;

COMMENT ON FUNCTION kirim_notifikasi(UUID, TEXT, TEXT, TEXT, TEXT) IS 'Helper function untuk mengirim notifikasi ke user';

-- ============================================================================
-- FUNCTION: Notifikasi Saat Jurnal Divalidasi
-- ============================================================================
CREATE OR REPLACE FUNCTION notifikasi_jurnal_divalidasi()
RETURNS TRIGGER AS $$
DECLARE
  siswa_user_id UUID;
  pesan_notif TEXT;
BEGIN
  IF NEW.status != OLD.status AND NEW.status IN ('disetujui', 'direvisi') THEN
    -- Ambil user_id siswa
    SELECT user_id INTO siswa_user_id
    FROM siswa
    WHERE id = NEW.siswa_id;
    
    -- Buat pesan notifikasi
    IF NEW.status = 'disetujui' THEN
      pesan_notif := 'Jurnal tanggal ' || TO_CHAR(NEW.tanggal, 'DD Mon YYYY') || ' telah disetujui';
      PERFORM kirim_notifikasi(siswa_user_id, 'Jurnal Disetujui', pesan_notif, 'success', '/siswa/jurnal');
    ELSIF NEW.status = 'direvisi' THEN
      pesan_notif := 'Jurnal tanggal ' || TO_CHAR(NEW.tanggal, 'DD Mon YYYY') || ' perlu direvisi';
      PERFORM kirim_notifikasi(siswa_user_id, 'Jurnal Perlu Revisi', pesan_notif, 'warning', '/siswa/jurnal');
    END IF;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

COMMENT ON FUNCTION notifikasi_jurnal_divalidasi() IS 'Kirim notifikasi ke siswa saat jurnal divalidasi';

-- ============================================================================
-- TRIGGER: Notifikasi Jurnal Divalidasi
-- ============================================================================
CREATE TRIGGER send_notif_jurnal_divalidasi
AFTER UPDATE ON jurnal
FOR EACH ROW
EXECUTE FUNCTION notifikasi_jurnal_divalidasi();

-- ============================================================================
-- FUNCTION: Notifikasi Saat Penempatan Disetujui/Ditolak
-- ============================================================================
CREATE OR REPLACE FUNCTION notifikasi_penempatan_status()
RETURNS TRIGGER AS $$
DECLARE
  siswa_user_id UUID;
  nama_dudi TEXT;
  pesan_notif TEXT;
BEGIN
  IF NEW.status != OLD.status AND NEW.status IN ('disetujui', 'ditolak') THEN
    -- Ambil user_id siswa dan nama dudi
    SELECT s.user_id, d.nama INTO siswa_user_id, nama_dudi
    FROM siswa s, dudi d
    WHERE s.id = NEW.siswa_id AND d.id = NEW.dudi_id;
    
    -- Buat pesan notifikasi
    IF NEW.status = 'disetujui' THEN
      pesan_notif := 'Pengajuan magang Anda di ' || nama_dudi || ' telah disetujui';
      PERFORM kirim_notifikasi(siswa_user_id, 'Pengajuan Disetujui', pesan_notif, 'success', '/siswa/pengajuan');
    ELSIF NEW.status = 'ditolak' THEN
      pesan_notif := 'Pengajuan magang Anda di ' || nama_dudi || ' ditolak';
      PERFORM kirim_notifikasi(siswa_user_id, 'Pengajuan Ditolak', pesan_notif, 'error', '/siswa/pengajuan');
    END IF;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

COMMENT ON FUNCTION notifikasi_penempatan_status() IS 'Kirim notifikasi ke siswa saat penempatan disetujui/ditolak';

-- ============================================================================
-- TRIGGER: Notifikasi Penempatan Status
-- ============================================================================
CREATE TRIGGER send_notif_penempatan_status
AFTER UPDATE ON penempatan
FOR EACH ROW
EXECUTE FUNCTION notifikasi_penempatan_status();

-- ============================================================================
-- Success Message
-- ============================================================================
DO $$
BEGIN
  RAISE NOTICE '✅ Semua functions dan triggers berhasil dibuat!';
  RAISE NOTICE 'Lanjutkan dengan script 04-create-views.sql';
END $$;
