-- ============================================================================
-- SIMMAS Database Schema - Part 5: Enable Row Level Security (RLS)
-- ============================================================================
-- Jalankan script ini setelah 04-create-views.sql
-- ============================================================================

-- ============================================================================
-- ENABLE RLS pada semua tabel
-- ============================================================================

ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE guru ENABLE ROW LEVEL SECURITY;
ALTER TABLE siswa ENABLE ROW LEVEL SECURITY;
ALTER TABLE dudi ENABLE ROW LEVEL SECURITY;
ALTER TABLE penempatan ENABLE ROW LEVEL SECURITY;
ALTER TABLE absensi ENABLE ROW LEVEL SECURITY;
ALTER TABLE jurnal ENABLE ROW LEVEL SECURITY;
ALTER TABLE kunjungan ENABLE ROW LEVEL SECURITY;
ALTER TABLE log_aktivitas ENABLE ROW LEVEL SECURITY;
ALTER TABLE pengaturan ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifikasi ENABLE ROW LEVEL SECURITY;

-- ============================================================================
-- Success Message
-- ============================================================================
DO $$
BEGIN
  RAISE NOTICE '✅ Row Level Security berhasil diaktifkan pada semua tabel!';
  RAISE NOTICE 'Lanjutkan dengan script 06-create-policies-admin.sql';
END $$;
