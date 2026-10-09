-- ============================================================================
-- SIMMAS Database Schema - Part 1: Create Tables
-- ============================================================================
-- Jalankan script ini di Supabase SQL Editor
-- ============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================================
-- 1. TABLE: users
-- ============================================================================
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('admin', 'guru', 'siswa')),
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

COMMENT ON TABLE users IS 'Tabel pengguna untuk autentikasi dan manajemen role';
COMMENT ON COLUMN users.role IS 'Role pengguna: admin, guru, atau siswa';

-- ============================================================================
-- 2. TABLE: guru
-- ============================================================================
CREATE TABLE guru (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  nip TEXT UNIQUE NOT NULL,
  nama TEXT NOT NULL,
  mata_pelajaran TEXT,
  kontak TEXT,
  status TEXT DEFAULT 'aktif' CHECK (status IN ('aktif', 'tidak_aktif')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

COMMENT ON TABLE guru IS 'Tabel data guru pembimbing magang';
COMMENT ON COLUMN guru.nip IS 'Nomor Induk Pegawai';

-- ============================================================================
-- 3. TABLE: siswa
-- ============================================================================
CREATE TABLE siswa (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  nis TEXT UNIQUE NOT NULL,
  nama TEXT NOT NULL,
  kelas TEXT NOT NULL,
  jurusan TEXT NOT NULL,
  kontak TEXT,
  alamat TEXT,
  guru_pembimbing_id UUID REFERENCES guru(id) ON DELETE SET NULL,
  status TEXT DEFAULT 'aktif' CHECK (status IN ('aktif', 'tidak_aktif', 'lulus')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

COMMENT ON TABLE siswa IS 'Tabel data siswa yang melakukan magang';
COMMENT ON COLUMN siswa.nis IS 'Nomor Induk Siswa';

-- ============================================================================
-- 4. TABLE: dudi
-- ============================================================================
CREATE TABLE dudi (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  kode TEXT UNIQUE NOT NULL,
  nama TEXT NOT NULL,
  bidang_usaha TEXT NOT NULL,
  alamat TEXT,
  kota TEXT,
  kontak TEXT,
  email TEXT,
  website TEXT,
  kapasitas_siswa INTEGER DEFAULT 0,
  status TEXT DEFAULT 'terverifikasi' CHECK (status IN ('terverifikasi', 'menunggu_verifikasi', 'ditolak')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

COMMENT ON TABLE dudi IS 'Tabel data Dunia Usaha dan Dunia Industri (tempat magang)';
COMMENT ON COLUMN dudi.kapasitas_siswa IS 'Jumlah maksimal siswa yang bisa diterima';

-- ============================================================================
-- 5. TABLE: penempatan
-- ============================================================================
CREATE TABLE penempatan (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  siswa_id UUID REFERENCES siswa(id) ON DELETE CASCADE,
  dudi_id UUID REFERENCES dudi(id) ON DELETE CASCADE,
  guru_pembimbing_id UUID REFERENCES guru(id) ON DELETE SET NULL,
  posisi TEXT,
  tanggal_pengajuan DATE NOT NULL,
  tanggal_mulai DATE,
  tanggal_selesai DATE,
  periode TEXT,
  status TEXT DEFAULT 'menunggu' CHECK (status IN ('menunggu', 'disetujui', 'ditolak', 'selesai')),
  catatan TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

COMMENT ON TABLE penempatan IS 'Tabel penempatan siswa ke DUDI';
COMMENT ON COLUMN penempatan.periode IS 'Contoh: Sep 2024 - Feb 2025';

-- ============================================================================
-- 6. TABLE: absensi
-- ============================================================================
CREATE TABLE absensi (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  siswa_id UUID REFERENCES siswa(id) ON DELETE CASCADE,
  penempatan_id UUID REFERENCES penempatan(id) ON DELETE CASCADE,
  tanggal DATE NOT NULL,
  jam_masuk TIME,
  jam_keluar TIME,
  foto_masuk_url TEXT,
  foto_keluar_url TEXT,
  lokasi_masuk TEXT,
  lokasi_keluar TEXT,
  status TEXT DEFAULT 'hadir' CHECK (status IN ('hadir', 'izin', 'sakit', 'alpha')),
  keterangan TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(siswa_id, tanggal)
);

COMMENT ON TABLE absensi IS 'Tabel absensi harian siswa dengan foto';
COMMENT ON COLUMN absensi.lokasi_masuk IS 'Koordinat GPS atau nama lokasi';

-- ============================================================================
-- 7. TABLE: jurnal
-- ============================================================================
CREATE TABLE jurnal (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  siswa_id UUID REFERENCES siswa(id) ON DELETE CASCADE,
  penempatan_id UUID REFERENCES penempatan(id) ON DELETE CASCADE,
  tanggal DATE NOT NULL,
  waktu TIME NOT NULL,
  kegiatan TEXT NOT NULL,
  status TEXT DEFAULT 'terkirim' CHECK (status IN ('draft', 'terkirim', 'direvisi', 'disetujui')),
  catatan_revisi TEXT,
  divalidasi_oleh UUID REFERENCES guru(id) ON DELETE SET NULL,
  tanggal_validasi TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

COMMENT ON TABLE jurnal IS 'Tabel jurnal kegiatan harian siswa';
COMMENT ON COLUMN jurnal.status IS 'Status: draft, terkirim, direvisi, disetujui';

-- ============================================================================
-- 8. TABLE: kunjungan
-- ============================================================================
CREATE TABLE kunjungan (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  guru_id UUID REFERENCES guru(id) ON DELETE CASCADE,
  dudi_id UUID REFERENCES dudi(id) ON DELETE CASCADE,
  siswa_id UUID REFERENCES siswa(id) ON DELETE SET NULL,
  tanggal DATE NOT NULL,
  waktu TIME,
  tujuan TEXT,
  hasil_kunjungan TEXT,
  catatan TEXT,
  foto_dokumentasi_url TEXT,
  status TEXT DEFAULT 'terjadwal' CHECK (status IN ('terjadwal', 'selesai', 'dibatalkan')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

COMMENT ON TABLE kunjungan IS 'Tabel kunjungan guru ke DUDI';

-- ============================================================================
-- 9. TABLE: log_aktivitas
-- ============================================================================
CREATE TABLE log_aktivitas (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  aktivitas TEXT NOT NULL,
  modul TEXT,
  deskripsi TEXT,
  ip_address TEXT,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

COMMENT ON TABLE log_aktivitas IS 'Tabel tracking aktivitas penting dalam sistem';
COMMENT ON COLUMN log_aktivitas.modul IS 'Nama modul: siswa, guru, dudi, penempatan, dll';

-- ============================================================================
-- 10. TABLE: pengaturan
-- ============================================================================
CREATE TABLE pengaturan (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  key TEXT UNIQUE NOT NULL,
  value TEXT,
  tipe TEXT DEFAULT 'string' CHECK (tipe IN ('string', 'number', 'boolean', 'json')),
  deskripsi TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

COMMENT ON TABLE pengaturan IS 'Tabel konfigurasi dan pengaturan sistem';

-- ============================================================================
-- 11. TABLE: notifikasi
-- ============================================================================
CREATE TABLE notifikasi (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  judul TEXT NOT NULL,
  pesan TEXT NOT NULL,
  tipe TEXT DEFAULT 'info' CHECK (tipe IN ('info', 'warning', 'error', 'success')),
  link TEXT,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

COMMENT ON TABLE notifikasi IS 'Tabel sistem notifikasi untuk user';

-- ============================================================================
-- Success Message
-- ============================================================================
DO $$
BEGIN
  RAISE NOTICE '✅ Semua tabel berhasil dibuat!';
  RAISE NOTICE 'Lanjutkan dengan script 02-create-indexes.sql';
END $$;
