-- ============================================================================
-- SIMMAS Database Schema - Part 2: Create Indexes
-- ============================================================================
-- Jalankan script ini setelah 01-create-tables.sql
-- ============================================================================

-- ============================================================================
-- INDEXES untuk TABLE: guru
-- ============================================================================
CREATE INDEX idx_guru_user_id ON guru(user_id);
CREATE INDEX idx_guru_nip ON guru(nip);
CREATE INDEX idx_guru_status ON guru(status);

-- ============================================================================
-- INDEXES untuk TABLE: siswa
-- ============================================================================
CREATE INDEX idx_siswa_user_id ON siswa(user_id);
CREATE INDEX idx_siswa_nis ON siswa(nis);
CREATE INDEX idx_siswa_guru_pembimbing ON siswa(guru_pembimbing_id);
CREATE INDEX idx_siswa_kelas ON siswa(kelas);
CREATE INDEX idx_siswa_status ON siswa(status);

-- Full-text search index untuk nama siswa
CREATE INDEX idx_siswa_nama_gin ON siswa USING gin(to_tsvector('indonesian', nama));

-- ============================================================================
-- INDEXES untuk TABLE: dudi
-- ============================================================================
CREATE INDEX idx_dudi_kode ON dudi(kode);
CREATE INDEX idx_dudi_status ON dudi(status);
CREATE INDEX idx_dudi_bidang_usaha ON dudi(bidang_usaha);
CREATE INDEX idx_dudi_kota ON dudi(kota);

-- Full-text search index untuk nama dudi
CREATE INDEX idx_dudi_nama_gin ON dudi USING gin(to_tsvector('indonesian', nama));

-- ============================================================================
-- INDEXES untuk TABLE: penempatan
-- ============================================================================
CREATE INDEX idx_penempatan_siswa ON penempatan(siswa_id);
CREATE INDEX idx_penempatan_dudi ON penempatan(dudi_id);
CREATE INDEX idx_penempatan_guru ON penempatan(guru_pembimbing_id);
CREATE INDEX idx_penempatan_status ON penempatan(status);
CREATE INDEX idx_penempatan_tanggal_pengajuan ON penempatan(tanggal_pengajuan DESC);

-- Composite index untuk query yang sering digunakan
CREATE INDEX idx_penempatan_siswa_status ON penempatan(siswa_id, status);
CREATE INDEX idx_penempatan_dudi_status ON penempatan(dudi_id, status);

-- ============================================================================
-- INDEXES untuk TABLE: absensi
-- ============================================================================
CREATE INDEX idx_absensi_siswa ON absensi(siswa_id);
CREATE INDEX idx_absensi_penempatan ON absensi(penempatan_id);
CREATE INDEX idx_absensi_tanggal ON absensi(tanggal DESC);
CREATE INDEX idx_absensi_status ON absensi(status);

-- Composite index untuk query statistik
CREATE INDEX idx_absensi_siswa_tanggal ON absensi(siswa_id, tanggal DESC);
CREATE INDEX idx_absensi_siswa_status ON absensi(siswa_id, status);

-- ============================================================================
-- INDEXES untuk TABLE: jurnal
-- ============================================================================
CREATE INDEX idx_jurnal_siswa ON jurnal(siswa_id);
CREATE INDEX idx_jurnal_penempatan ON jurnal(penempatan_id);
CREATE INDEX idx_jurnal_status ON jurnal(status);
CREATE INDEX idx_jurnal_tanggal ON jurnal(tanggal DESC);
CREATE INDEX idx_jurnal_divalidasi_oleh ON jurnal(divalidasi_oleh);

-- Composite index untuk filter siswa dan status
CREATE INDEX idx_jurnal_siswa_status ON jurnal(siswa_id, status);

-- Full-text search index untuk kegiatan jurnal
CREATE INDEX idx_jurnal_kegiatan_gin ON jurnal USING gin(to_tsvector('indonesian', kegiatan));

-- ============================================================================
-- INDEXES untuk TABLE: kunjungan
-- ============================================================================
CREATE INDEX idx_kunjungan_guru ON kunjungan(guru_id);
CREATE INDEX idx_kunjungan_dudi ON kunjungan(dudi_id);
CREATE INDEX idx_kunjungan_siswa ON kunjungan(siswa_id);
CREATE INDEX idx_kunjungan_tanggal ON kunjungan(tanggal DESC);
CREATE INDEX idx_kunjungan_status ON kunjungan(status);

-- Composite index untuk jadwal kunjungan guru
CREATE INDEX idx_kunjungan_guru_tanggal ON kunjungan(guru_id, tanggal DESC);

-- ============================================================================
-- INDEXES untuk TABLE: log_aktivitas
-- ============================================================================
CREATE INDEX idx_log_user ON log_aktivitas(user_id);
CREATE INDEX idx_log_created_at ON log_aktivitas(created_at DESC);
CREATE INDEX idx_log_modul ON log_aktivitas(modul);
CREATE INDEX idx_log_aktivitas ON log_aktivitas(aktivitas);

-- Composite index untuk filter user dan tanggal
CREATE INDEX idx_log_user_created_at ON log_aktivitas(user_id, created_at DESC);

-- ============================================================================
-- INDEXES untuk TABLE: pengaturan
-- ============================================================================
CREATE INDEX idx_pengaturan_key ON pengaturan(key);
CREATE INDEX idx_pengaturan_tipe ON pengaturan(tipe);

-- ============================================================================
-- INDEXES untuk TABLE: notifikasi
-- ============================================================================
CREATE INDEX idx_notifikasi_user ON notifikasi(user_id);
CREATE INDEX idx_notifikasi_is_read ON notifikasi(is_read);
CREATE INDEX idx_notifikasi_created_at ON notifikasi(created_at DESC);
CREATE INDEX idx_notifikasi_tipe ON notifikasi(tipe);

-- Composite index untuk notifikasi belum dibaca
CREATE INDEX idx_notifikasi_user_is_read ON notifikasi(user_id, is_read);

-- ============================================================================
-- INDEXES untuk TABLE: users
-- ============================================================================
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_users_is_active ON users(is_active);

-- ============================================================================
-- Success Message
-- ============================================================================
DO $$
BEGIN
  RAISE NOTICE '✅ Semua indexes berhasil dibuat!';
  RAISE NOTICE 'Lanjutkan dengan script 03-create-functions-triggers.sql';
END $$;
