-- ============================================================================
-- SIMMAS Database Schema - Part 10: Seed Data (Initial Data)
-- ============================================================================
-- Jalankan script ini setelah 09-create-storage.sql
-- ============================================================================
-- CATATAN: Password harus di-hash dengan bcrypt di aplikasi sebelum insert
-- Untuk testing, gunakan password sederhana seperti 'password123'
-- ============================================================================

-- ============================================================================
-- SEED: Pengaturan Sistem
-- ============================================================================
INSERT INTO pengaturan (key, value, tipe, deskripsi) VALUES
('nama_sekolah', 'SMK Negeri 1 Tasikmalaya', 'string', 'Nama sekolah/institusi'),
('alamat_sekolah', 'Jl. Pendidikan No. 123, Tasikmalaya', 'string', 'Alamat lengkap sekolah'),
('tahun_ajaran', '2024/2025', 'string', 'Tahun ajaran aktif'),
('semester', 'Ganjil', 'string', 'Semester aktif'),
('durasi_magang_hari', '180', 'number', 'Durasi magang dalam hari'),
('jam_masuk_magang', '08:00', 'string', 'Jam masuk standar magang'),
('jam_keluar_magang', '16:00', 'string', 'Jam keluar standar magang'),
('batas_keterlambatan_menit', '15', 'number', 'Batas toleransi keterlambatan dalam menit'),
('email_sekolah', 'info@smkn1tasik.sch.id', 'string', 'Email resmi sekolah'),
('telepon_sekolah', '0265-123456', 'string', 'Nomor telepon sekolah'),
('logo_sekolah', '/assets/logo-sekolah.png', 'string', 'Path logo sekolah'),
('max_siswa_per_guru', '10', 'number', 'Maksimal siswa bimbingan per guru')
ON CONFLICT (key) DO NOTHING;

-- ============================================================================
-- SEED: Users - Admin
-- ============================================================================
-- Password default: admin123 (HARUS DIGANTI setelah login pertama)
INSERT INTO users (email, password_hash, role, is_active) VALUES
('admin@smkn1tasik.sch.id', '$2a$10$X1234567890abcdefghijklmnopqrstuvwxyz', 'admin', true)
ON CONFLICT (email) DO NOTHING;

-- ============================================================================
-- SEED: Users & Data Guru
-- ============================================================================
-- Password default untuk semua guru: guru123

-- Guru 1: Ahmad Yusuf
INSERT INTO users (id, email, password_hash, role, is_active) VALUES
('550e8400-e29b-41d4-a716-446655440001', 'ahmad.yusuf@smkn1tasik.sch.id', '$2a$10$X1234567890abcdefghijklmnopqrstuvwxyz', 'guru', true)
ON CONFLICT (id) DO NOTHING;

INSERT INTO guru (user_id, nip, nama, mata_pelajaran, kontak, status) VALUES
('550e8400-e29b-41d4-a716-446655440001', '197805122008012001', 'Ahmad Yusuf', 'Rekayasa Perangkat Lunak', '081234567801', 'aktif')
ON CONFLICT (nip) DO NOTHING;

-- Guru 2: Budi Santoso
INSERT INTO users (id, email, password_hash, role, is_active) VALUES
('550e8400-e29b-41d4-a716-446655440002', 'budi.santoso@smkn1tasik.sch.id', '$2a$10$X1234567890abcdefghijklmnopqrstuvwxyz', 'guru', true)
ON CONFLICT (id) DO NOTHING;

INSERT INTO guru (user_id, nip, nama, mata_pelajaran, kontak, status) VALUES
('550e8400-e29b-41d4-a716-446655440002', '198203152010012002', 'Budi Santoso', 'Basis Data', '081234567802', 'aktif')
ON CONFLICT (nip) DO NOTHING;

-- Guru 3: Lisa Maharani
INSERT INTO users (id, email, password_hash, role, is_active) VALUES
('550e8400-e29b-41d4-a716-446655440003', 'lisa.maharani@smkn1tasik.sch.id', '$2a$10$X1234567890abcdefghijklmnopqrstuvwxyz', 'guru', true)
ON CONFLICT (id) DO NOTHING;

INSERT INTO guru (user_id, nip, nama, mata_pelajaran, kontak, status) VALUES
('550e8400-e29b-41d4-a716-446655440003', '197912082009022001', 'Lisa Maharani', 'Pemrograman Web', '081234567803', 'aktif')
ON CONFLICT (nip) DO NOTHING;

-- Guru 4: Sari Dewi
INSERT INTO users (id, email, password_hash, role, is_active) VALUES
('550e8400-e29b-41d4-a716-446655440004', 'sari.dewi@smkn1tasik.sch.id', '$2a$10$X1234567890abcdefghijklmnopqrstuvwxyz', 'guru', true)
ON CONFLICT (id) DO NOTHING;

INSERT INTO guru (user_id, nip, nama, mata_pelajaran, kontak, status) VALUES
('550e8400-e29b-41d4-a716-446655440004', '198506112012012003', 'Sari Dewi', 'Sistem Informasi', '081234567804', 'aktif')
ON CONFLICT (nip) DO NOTHING;

-- ============================================================================
-- SEED: DUDI (Dunia Usaha Dunia Industri)
-- ============================================================================
INSERT INTO dudi (id, kode, nama, bidang_usaha, alamat, kota, kontak, email, website, kapasitas_siswa, status) VALUES
('660e8400-e29b-41d4-a716-446655440001', 'PT001', 'PT. Universal Big Data', 'Teknologi Informasi', 'Jl. Raya Tasikmalaya No. 123', 'Tasikmalaya', '021-12345678', 'hrd@universalbigdata.com', 'www.universalbigdata.com', 10, 'terverifikasi'),
('660e8400-e29b-41d4-a716-446655440002', 'PT002', 'PT. Telkom Sidoarjo', 'Telekomunikasi', 'Jl. Surabaya, Sidoarjo', 'Sidoarjo', '031-87654321', 'recruitment@telkom.co.id', 'www.telkom.co.id', 5, 'terverifikasi'),
('660e8400-e29b-41d4-a716-446655440003', 'PT003', 'PT. Jaya Giok', 'Perdagangan', 'Jl. Brantas No. 456', 'Malang', '0341-11223344', 'info@jayagiok.com', 'www.jayagiok.com', 12, 'terverifikasi'),
('660e8400-e29b-41d4-a716-446655440004', 'PT004', 'PT. Suka Makmur', 'Manufaktur', 'Jl. Industri, Probolinggo', 'Probolinggo', '0335-55667788', 'hr@sukamakmur.co.id', 'www.sukamakmur.co.id', 8, 'terverifikasi'),
('660e8400-e29b-41d4-a716-446655440005', 'PT005', 'PT. Maju Bersama Tech', 'Teknologi Informasi', 'Jl. Innovation Park No. 88', 'Bandung', '022-87654321', 'career@majubersama.tech', 'www.majubersama.tech', 15, 'terverifikasi')
ON CONFLICT (id) DO NOTHING;

-- ============================================================================
-- SEED: Users & Data Siswa
-- ============================================================================
-- Password default untuk semua siswa: siswa123

-- Siswa 1: Adelia Putri
INSERT INTO users (id, email, password_hash, role, is_active) VALUES
('770e8400-e29b-41d4-a716-446655440001', 'adelia.putri@student.smkn1tasik.sch.id', '$2a$10$X1234567890abcdefghijklmnopqrstuvwxyz', 'siswa', true)
ON CONFLICT (id) DO NOTHING;

INSERT INTO siswa (user_id, nis, nama, kelas, jurusan, kontak, alamat, guru_pembimbing_id, status) VALUES
('770e8400-e29b-41d4-a716-446655440001', '202401001', 'Adelia Putri', 'XII RPL 1', 'Rekayasa Perangkat Lunak', '081234560001', 'Jl. Siswa No. 1, Tasikmalaya', 
(SELECT id FROM guru WHERE nip = '197805122008012001'), 'aktif')
ON CONFLICT (nis) DO NOTHING;

-- Siswa 2: Andi Wijaya
INSERT INTO users (id, email, password_hash, role, is_active) VALUES
('770e8400-e29b-41d4-a716-446655440002', 'andi.wijaya@student.smkn1tasik.sch.id', '$2a$10$X1234567890abcdefghijklmnopqrstuvwxyz', 'siswa', true)
ON CONFLICT (id) DO NOTHING;

INSERT INTO siswa (user_id, nis, nama, kelas, jurusan, kontak, alamat, guru_pembimbing_id, status) VALUES
('770e8400-e29b-41d4-a716-446655440002', '202401002', 'Andi Wijaya', 'XII RPL 2', 'Rekayasa Perangkat Lunak', '081234560002', 'Jl. Siswa No. 2, Tasikmalaya', 
(SELECT id FROM guru WHERE nip = '197805122008012001'), 'aktif')
ON CONFLICT (nis) DO NOTHING;

-- Siswa 3: Bagus Pratama
INSERT INTO users (id, email, password_hash, role, is_active) VALUES
('770e8400-e29b-41d4-a716-446655440003', 'bagus.pratama@student.smkn1tasik.sch.id', '$2a$10$X1234567890abcdefghijklmnopqrstuvwxyz', 'siswa', true)
ON CONFLICT (id) DO NOTHING;

INSERT INTO siswa (user_id, nis, nama, kelas, jurusan, kontak, alamat, guru_pembimbing_id, status) VALUES
('770e8400-e29b-41d4-a716-446655440003', '202401003', 'Bagus Pratama', 'XII RPL 1', 'Rekayasa Perangkat Lunak', '081234560003', 'Jl. Siswa No. 3, Tasikmalaya', 
(SELECT id FROM guru WHERE nip = '198203152010012002'), 'aktif')
ON CONFLICT (nis) DO NOTHING;

-- Siswa 4: Candra Sari
INSERT INTO users (id, email, password_hash, role, is_active) VALUES
('770e8400-e29b-41d4-a716-446655440004', 'candra.sari@student.smkn1tasik.sch.id', '$2a$10$X1234567890abcdefghijklmnopqrstuvwxyz', 'siswa', true)
ON CONFLICT (id) DO NOTHING;

INSERT INTO siswa (user_id, nis, nama, kelas, jurusan, kontak, alamat, guru_pembimbing_id, status) VALUES
('770e8400-e29b-41d4-a716-446655440004', '202401005', 'Candra Sari', 'XII RPL 1', 'Rekayasa Perangkat Lunak', '081234560005', 'Jl. Siswa No. 5, Tasikmalaya', 
(SELECT id FROM guru WHERE nip = '197912082009022001'), 'aktif')
ON CONFLICT (nis) DO NOTHING;

-- Siswa 5: Dinda Ayu
INSERT INTO users (id, email, password_hash, role, is_active) VALUES
('770e8400-e29b-41d4-a716-446655440005', 'dinda.ayu@student.smkn1tasik.sch.id', '$2a$10$X1234567890abcdefghijklmnopqrstuvwxyz', 'siswa', true)
ON CONFLICT (id) DO NOTHING;

INSERT INTO siswa (user_id, nis, nama, kelas, jurusan, kontak, alamat, guru_pembimbing_id, status) VALUES
('770e8400-e29b-41d4-a716-446655440005', '202401006', 'Dinda Ayu', 'XII RPL 2', 'Rekayasa Perangkat Lunak', '081234560006', 'Jl. Siswa No. 6, Tasikmalaya', 
(SELECT id FROM guru WHERE nip = '197912082009022001'), 'aktif')
ON CONFLICT (nis) DO NOTHING;

-- ============================================================================
-- SEED: Penempatan Magang (Sample)
-- ============================================================================
-- Penempatan untuk Adelia Putri
INSERT INTO penempatan (siswa_id, dudi_id, guru_pembimbing_id, posisi, tanggal_pengajuan, tanggal_mulai, tanggal_selesai, periode, status) VALUES
((SELECT id FROM siswa WHERE nis = '202401001'),
 (SELECT id FROM dudi WHERE kode = 'PT001'),
 (SELECT id FROM guru WHERE nip = '197805122008012001'),
 'Mobile Developer',
 '2024-08-24',
 '2024-09-01',
 '2025-02-28',
 'Sep 2024 - Feb 2025',
 'disetujui');

-- Penempatan untuk Bagus Pratama
INSERT INTO penempatan (siswa_id, dudi_id, guru_pembimbing_id, posisi, tanggal_pengajuan, tanggal_mulai, tanggal_selesai, periode, status) VALUES
((SELECT id FROM siswa WHERE nis = '202401003'),
 (SELECT id FROM dudi WHERE kode = 'PT003'),
 (SELECT id FROM guru WHERE nip = '198203152010012002'),
 'Backend Developer',
 '2024-09-12',
 '2024-09-15',
 '2025-03-15',
 'Sep 2024 - Mar 2025',
 'menunggu');

-- Penempatan untuk Candra Sari
INSERT INTO penempatan (siswa_id, dudi_id, guru_pembimbing_id, posisi, tanggal_pengajuan, tanggal_mulai, tanggal_selesai, periode, status) VALUES
((SELECT id FROM siswa WHERE nis = '202401005'),
 (SELECT id FROM dudi WHERE kode = 'PT001'),
 (SELECT id FROM guru WHERE nip = '197912082009022001'),
 'Frontend Developer',
 '2024-09-15',
 '2024-09-20',
 '2025-03-20',
 'Sep 2024 - Mar 2025',
 'disetujui');

-- Penempatan untuk Dinda Ayu
INSERT INTO penempatan (siswa_id, dudi_id, guru_pembimbing_id, posisi, tanggal_pengajuan, tanggal_mulai, tanggal_selesai, periode, status) VALUES
((SELECT id FROM siswa WHERE nis = '202401006'),
 (SELECT id FROM dudi WHERE kode = 'PT002'),
 (SELECT id FROM guru WHERE nip = '197912082009022001'),
 'Network Engineer',
 '2024-09-18',
 '2024-09-25',
 '2025-03-25',
 'Sep 2024 - Mar 2025',
 'disetujui');

-- ============================================================================
-- SEED: Sample Absensi (untuk siswa yang sudah disetujui)
-- ============================================================================
-- Absensi Adelia Putri
INSERT INTO absensi (siswa_id, penempatan_id, tanggal, jam_masuk, jam_keluar, status) VALUES
((SELECT id FROM siswa WHERE nis = '202401001'),
 (SELECT id FROM penempatan WHERE siswa_id = (SELECT id FROM siswa WHERE nis = '202401001') LIMIT 1),
 '2024-09-23',
 '08:07',
 NULL,
 'hadir');

INSERT INTO absensi (siswa_id, penempatan_id, tanggal, jam_masuk, jam_keluar, status) VALUES
((SELECT id FROM siswa WHERE nis = '202401001'),
 (SELECT id FROM penempatan WHERE siswa_id = (SELECT id FROM siswa WHERE nis = '202401001') LIMIT 1),
 '2024-09-25',
 '08:15',
 '16:45',
 'hadir');

INSERT INTO absensi (siswa_id, penempatan_id, tanggal, jam_masuk, jam_keluar, status) VALUES
((SELECT id FROM siswa WHERE nis = '202401001'),
 (SELECT id FROM penempatan WHERE siswa_id = (SELECT id FROM siswa WHERE nis = '202401001') LIMIT 1),
 '2024-09-30',
 '08:30',
 '16:30',
 'hadir');

-- ============================================================================
-- SEED: Sample Jurnal
-- ============================================================================
-- Jurnal Adelia Putri
INSERT INTO jurnal (siswa_id, penempatan_id, tanggal, waktu, kegiatan, status) VALUES
((SELECT id FROM siswa WHERE nis = '202401001'),
 (SELECT id FROM penempatan WHERE siswa_id = (SELECT id FROM siswa WHERE nis = '202401001') LIMIT 1),
 '2024-09-25',
 '16:00',
 'Meeting dengan tim development untuk diskusi project aplikasi mobile. Membahas fitur-fitur yang akan dikembangkan dan timeline pengerjaan.',
 'direvisi');

INSERT INTO jurnal (siswa_id, penempatan_id, tanggal, waktu, kegiatan, status) VALUES
((SELECT id FROM siswa WHERE nis = '202401001'),
 (SELECT id FROM penempatan WHERE siswa_id = (SELECT id FROM siswa WHERE nis = '202401001') LIMIT 1),
 '2024-09-30',
 '16:00',
 'Belajar tentang framework React Native dan implementasi komponennya. Mencoba membuat beberapa component dasar untuk aplikasi mobile.',
 'terkirim');

-- ============================================================================
-- Success Message
-- ============================================================================
DO $$
BEGIN
  RAISE NOTICE '✅ Seed data berhasil dibuat!';
  RAISE NOTICE '';
  RAISE NOTICE '═══════════════════════════════════════════════════';
  RAISE NOTICE '  DATABASE SETUP COMPLETED!';
  RAISE NOTICE '═══════════════════════════════════════════════════';
  RAISE NOTICE '';
  RAISE NOTICE 'Akun Login Default:';
  RAISE NOTICE '---------------------------------------------------';
  RAISE NOTICE 'ADMIN:';
  RAISE NOTICE '  Email    : admin@smkn1tasik.sch.id';
  RAISE NOTICE '  Password : admin123 (SEGERA DIGANTI!)';
  RAISE NOTICE '';
  RAISE NOTICE 'GURU (Contoh):';
  RAISE NOTICE '  Email    : ahmad.yusuf@smkn1tasik.sch.id';
  RAISE NOTICE '  Password : guru123';
  RAISE NOTICE '';
  RAISE NOTICE 'SISWA (Contoh):';
  RAISE NOTICE '  Email    : adelia.putri@student.smkn1tasik.sch.id';
  RAISE NOTICE '  Password : siswa123';
  RAISE NOTICE '';
  RAISE NOTICE '⚠️  CATATAN PENTING:';
  RAISE NOTICE '  1. Password di atas adalah placeholder';
  RAISE NOTICE '  2. Implementasikan bcrypt hash di aplikasi';
  RAISE NOTICE '  3. Ganti semua password default setelah setup';
  RAISE NOTICE '  4. Review dan sesuaikan RLS policies';
  RAISE NOTICE '═══════════════════════════════════════════════════';
END $$;
