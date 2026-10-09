-- =====================================================
-- TABLE: jurusan (Master Data Jurusan/Program Keahlian)
-- =====================================================
-- Deskripsi: Menyimpan data jurusan yang ada di sekolah
-- Author: SIMMAS Development Team
-- Date: 2026-10-04
-- =====================================================

CREATE TABLE IF NOT EXISTS public.jurusan (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  kode_jurusan VARCHAR(10) UNIQUE NOT NULL,
  nama_jurusan VARCHAR(100) NOT NULL,
  singkatan VARCHAR(10) NOT NULL,
  deskripsi TEXT,
  kuota_siswa INTEGER DEFAULT 36,
  status VARCHAR(20) DEFAULT 'aktif' CHECK (status IN ('aktif', 'nonaktif')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- INDEXES untuk performa query
-- =====================================================
CREATE INDEX IF NOT EXISTS idx_jurusan_kode ON public.jurusan(kode_jurusan);
CREATE INDEX IF NOT EXISTS idx_jurusan_status ON public.jurusan(status);

-- =====================================================
-- TRIGGER untuk auto-update updated_at
-- =====================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_jurusan_updated_at 
  BEFORE UPDATE ON public.jurusan
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- ROW LEVEL SECURITY (RLS)
-- =====================================================
ALTER TABLE public.jurusan ENABLE ROW LEVEL SECURITY;

-- Policy: Admin bisa semua operasi
CREATE POLICY "Admin can do everything on jurusan"
  ON public.jurusan
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.users
      WHERE users.id = auth.uid()
      AND users.role = 'admin'
    )
  );

-- Policy: Guru dan Siswa hanya bisa READ
CREATE POLICY "Guru and Siswa can read jurusan"
  ON public.jurusan
  FOR SELECT
  TO authenticated
  USING (true);

-- =====================================================
-- DATA DUMMY untuk testing
-- =====================================================
INSERT INTO public.jurusan (kode_jurusan, nama_jurusan, singkatan, deskripsi, kuota_siswa, status) VALUES
('RPL', 'Rekayasa Perangkat Lunak', 'RPL', 'Program keahlian pengembangan software dan aplikasi', 36, 'aktif'),
('TKJ', 'Teknik Komputer dan Jaringan', 'TKJ', 'Program keahlian jaringan komputer dan server', 36, 'aktif'),
('MM', 'Multimedia', 'MM', 'Program keahlian desain grafis dan multimedia', 32, 'aktif'),
('SIJA', 'Sistem Informasi Jaringan dan Aplikasi', 'SIJA', 'Program keahlian sistem informasi berbasis jaringan', 36, 'aktif'),
('TJKT', 'Teknik Jaringan Komputer dan Telekomunikasi', 'TJKT', 'Program keahlian jaringan dan telekomunikasi', 32, 'aktif')
ON CONFLICT (kode_jurusan) DO NOTHING;

-- =====================================================
-- GRANT PERMISSIONS
-- =====================================================
GRANT ALL ON public.jurusan TO authenticated;
GRANT ALL ON public.jurusan TO service_role;

COMMENT ON TABLE public.jurusan IS 'Master data jurusan/program keahlian sekolah';
COMMENT ON COLUMN public.jurusan.kode_jurusan IS 'Kode unik jurusan (contoh: RPL, TKJ)';
COMMENT ON COLUMN public.jurusan.nama_jurusan IS 'Nama lengkap jurusan';
COMMENT ON COLUMN public.jurusan.singkatan IS 'Singkatan/akronim jurusan';
COMMENT ON COLUMN public.jurusan.kuota_siswa IS 'Kapasitas maksimal siswa per kelas';
COMMENT ON COLUMN public.jurusan.status IS 'Status jurusan: aktif atau nonaktif';
