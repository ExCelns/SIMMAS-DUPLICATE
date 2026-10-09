-- ============================================================================
-- SIMMAS Database Schema - Part 4: Create Views
-- ============================================================================
-- Jalankan script ini setelah 03-create-functions-triggers.sql
-- ============================================================================

-- ============================================================================
-- VIEW: Statistik Dashboard Admin
-- ============================================================================
CREATE OR REPLACE VIEW v_statistik_admin AS
SELECT 
  (SELECT COUNT(*) FROM siswa WHERE status = 'aktif') as total_siswa,
  (SELECT COUNT(*) FROM guru WHERE status = 'aktif') as total_guru,
  (SELECT COUNT(*) FROM dudi WHERE status = 'terverifikasi') as total_dudi,
  (SELECT COUNT(*) FROM penempatan WHERE status = 'disetujui') as siswa_magang_aktif,
  (SELECT COUNT(*) FROM penempatan WHERE status = 'menunggu') as pengajuan_pending,
  (SELECT COUNT(*) FROM penempatan WHERE status = 'selesai') as siswa_selesai_magang,
  (SELECT COUNT(*) FROM siswa WHERE guru_pembimbing_id IS NULL AND status = 'aktif') as siswa_belum_ada_pembimbing;

COMMENT ON VIEW v_statistik_admin IS 'View untuk statistik dashboard admin';

-- ============================================================================
-- VIEW: Monitoring Absensi
-- ============================================================================
CREATE OR REPLACE VIEW v_monitoring_absensi AS
SELECT 
  a.id,
  a.tanggal,
  a.jam_masuk,
  a.jam_keluar,
  a.status,
  a.keterangan,
  s.nis,
  s.nama as nama_siswa,
  s.kelas,
  d.nama as nama_dudi,
  d.kota as kota_dudi,
  g.nama as nama_pembimbing,
  g.kontak as kontak_pembimbing,
  p.periode as periode_magang
FROM absensi a
JOIN siswa s ON a.siswa_id = s.id
JOIN penempatan p ON a.penempatan_id = p.id
JOIN dudi d ON p.dudi_id = d.id
LEFT JOIN guru g ON s.guru_pembimbing_id = g.id
ORDER BY a.tanggal DESC, s.nama;

COMMENT ON VIEW v_monitoring_absensi IS 'View untuk monitoring absensi siswa dengan detail lengkap';

-- ============================================================================
-- VIEW: Monitoring Jurnal
-- ============================================================================
CREATE OR REPLACE VIEW v_monitoring_jurnal AS
SELECT 
  j.id,
  j.tanggal,
  j.waktu,
  j.kegiatan,
  j.status,
  j.catatan_revisi,
  j.tanggal_validasi,
  s.nis,
  s.nama as nama_siswa,
  s.kelas,
  d.nama as nama_dudi,
  gp.nama as nama_pembimbing,
  gv.nama as divalidasi_oleh_nama
FROM jurnal j
JOIN siswa s ON j.siswa_id = s.id
JOIN penempatan p ON j.penempatan_id = p.id
JOIN dudi d ON p.dudi_id = d.id
LEFT JOIN guru gp ON s.guru_pembimbing_id = gp.id
LEFT JOIN guru gv ON j.divalidasi_oleh = gv.id
ORDER BY j.tanggal DESC, j.status;

COMMENT ON VIEW v_monitoring_jurnal IS 'View untuk monitoring jurnal siswa dengan detail lengkap';

-- ============================================================================
-- VIEW: Data Lengkap Siswa
-- ============================================================================
CREATE OR REPLACE VIEW v_siswa_lengkap AS
SELECT 
  s.id,
  s.nis,
  s.nama,
  s.kelas,
  s.jurusan,
  s.kontak,
  s.alamat,
  s.status,
  u.email,
  u.is_active as akun_aktif,
  g.nama as nama_pembimbing,
  g.kontak as kontak_pembimbing,
  p.posisi as posisi_magang,
  p.status as status_penempatan,
  d.nama as nama_dudi,
  d.kota as kota_dudi,
  p.tanggal_mulai,
  p.tanggal_selesai,
  p.periode
FROM siswa s
JOIN users u ON s.user_id = u.id
LEFT JOIN guru g ON s.guru_pembimbing_id = g.id
LEFT JOIN penempatan p ON s.id = p.siswa_id AND p.status IN ('disetujui', 'selesai')
LEFT JOIN dudi d ON p.dudi_id = d.id
ORDER BY s.nama;

COMMENT ON VIEW v_siswa_lengkap IS 'View data siswa dengan informasi lengkap termasuk penempatan';

-- ============================================================================
-- VIEW: Data Lengkap Guru
-- ============================================================================
CREATE OR REPLACE VIEW v_guru_lengkap AS
SELECT 
  g.id,
  g.nip,
  g.nama,
  g.mata_pelajaran,
  g.kontak,
  g.status,
  u.email,
  u.is_active as akun_aktif,
  COUNT(DISTINCT s.id) as jumlah_siswa_bimbingan,
  COUNT(DISTINCT p.id) as jumlah_penempatan_aktif
FROM guru g
JOIN users u ON g.user_id = u.id
LEFT JOIN siswa s ON g.id = s.guru_pembimbing_id AND s.status = 'aktif'
LEFT JOIN penempatan p ON g.id = p.guru_pembimbing_id AND p.status = 'disetujui'
GROUP BY g.id, g.nip, g.nama, g.mata_pelajaran, g.kontak, g.status, u.email, u.is_active
ORDER BY g.nama;

COMMENT ON VIEW v_guru_lengkap IS 'View data guru dengan statistik siswa bimbingan';

-- ============================================================================
-- VIEW: Data Lengkap DUDI
-- ============================================================================
CREATE OR REPLACE VIEW v_dudi_lengkap AS
SELECT 
  d.id,
  d.kode,
  d.nama,
  d.bidang_usaha,
  d.alamat,
  d.kota,
  d.kontak,
  d.email,
  d.website,
  d.kapasitas_siswa,
  d.status,
  COUNT(DISTINCT p.id) FILTER (WHERE p.status = 'disetujui') as siswa_aktif,
  COUNT(DISTINCT p.id) FILTER (WHERE p.status = 'selesai') as siswa_selesai,
  (d.kapasitas_siswa - COUNT(DISTINCT p.id) FILTER (WHERE p.status = 'disetujui')) as sisa_kapasitas
FROM dudi d
LEFT JOIN penempatan p ON d.id = p.dudi_id
GROUP BY d.id, d.kode, d.nama, d.bidang_usaha, d.alamat, d.kota, 
         d.kontak, d.email, d.website, d.kapasitas_siswa, d.status
ORDER BY d.nama;

COMMENT ON VIEW v_dudi_lengkap IS 'View data DUDI dengan statistik penempatan dan kapasitas';

-- ============================================================================
-- VIEW: Penempatan Lengkap
-- ============================================================================
CREATE OR REPLACE VIEW v_penempatan_lengkap AS
SELECT 
  p.id,
  p.tanggal_pengajuan,
  p.tanggal_mulai,
  p.tanggal_selesai,
  p.periode,
  p.posisi,
  p.status,
  p.catatan,
  s.nis,
  s.nama as nama_siswa,
  s.kelas,
  s.kontak as kontak_siswa,
  d.kode as kode_dudi,
  d.nama as nama_dudi,
  d.bidang_usaha,
  d.alamat as alamat_dudi,
  d.kota as kota_dudi,
  d.kontak as kontak_dudi,
  g.nama as nama_pembimbing,
  g.kontak as kontak_pembimbing
FROM penempatan p
JOIN siswa s ON p.siswa_id = s.id
JOIN dudi d ON p.dudi_id = d.id
LEFT JOIN guru g ON p.guru_pembimbing_id = g.id
ORDER BY p.tanggal_pengajuan DESC;

COMMENT ON VIEW v_penempatan_lengkap IS 'View penempatan dengan detail lengkap siswa, dudi, dan pembimbing';

-- ============================================================================
-- VIEW: Statistik Absensi Per Siswa
-- ============================================================================
CREATE OR REPLACE VIEW v_statistik_absensi_siswa AS
SELECT 
  s.id as siswa_id,
  s.nis,
  s.nama as nama_siswa,
  s.kelas,
  COUNT(a.id) as total_absensi,
  COUNT(a.id) FILTER (WHERE a.status = 'hadir') as total_hadir,
  COUNT(a.id) FILTER (WHERE a.status = 'izin') as total_izin,
  COUNT(a.id) FILTER (WHERE a.status = 'sakit') as total_sakit,
  COUNT(a.id) FILTER (WHERE a.status = 'alpha') as total_alpha,
  ROUND(
    (COUNT(a.id) FILTER (WHERE a.status = 'hadir')::NUMERIC / NULLIF(COUNT(a.id), 0)) * 100,
    2
  ) as persentase_kehadiran
FROM siswa s
LEFT JOIN absensi a ON s.id = a.siswa_id
WHERE s.status = 'aktif'
GROUP BY s.id, s.nis, s.nama, s.kelas
ORDER BY s.nama;

COMMENT ON VIEW v_statistik_absensi_siswa IS 'View statistik absensi per siswa';

-- ============================================================================
-- VIEW: Statistik Jurnal Per Siswa
-- ============================================================================
CREATE OR REPLACE VIEW v_statistik_jurnal_siswa AS
SELECT 
  s.id as siswa_id,
  s.nis,
  s.nama as nama_siswa,
  s.kelas,
  COUNT(j.id) as total_jurnal,
  COUNT(j.id) FILTER (WHERE j.status = 'draft') as total_draft,
  COUNT(j.id) FILTER (WHERE j.status = 'terkirim') as total_terkirim,
  COUNT(j.id) FILTER (WHERE j.status = 'direvisi') as total_direvisi,
  COUNT(j.id) FILTER (WHERE j.status = 'disetujui') as total_disetujui,
  ROUND(
    (COUNT(j.id) FILTER (WHERE j.status = 'disetujui')::NUMERIC / NULLIF(COUNT(j.id), 0)) * 100,
    2
  ) as persentase_disetujui
FROM siswa s
LEFT JOIN jurnal j ON s.id = j.siswa_id
WHERE s.status = 'aktif'
GROUP BY s.id, s.nis, s.nama, s.kelas
ORDER BY s.nama;

COMMENT ON VIEW v_statistik_jurnal_siswa IS 'View statistik jurnal per siswa';

-- ============================================================================
-- VIEW: Jadwal Kunjungan
-- ============================================================================
CREATE OR REPLACE VIEW v_jadwal_kunjungan AS
SELECT 
  k.id,
  k.tanggal,
  k.waktu,
  k.tujuan,
  k.hasil_kunjungan,
  k.catatan,
  k.status,
  g.nama as nama_guru,
  g.kontak as kontak_guru,
  d.nama as nama_dudi,
  d.alamat as alamat_dudi,
  d.kota as kota_dudi,
  d.kontak as kontak_dudi,
  s.nama as nama_siswa_terkait
FROM kunjungan k
JOIN guru g ON k.guru_id = g.id
JOIN dudi d ON k.dudi_id = d.id
LEFT JOIN siswa s ON k.siswa_id = s.id
ORDER BY k.tanggal DESC, k.waktu DESC;

COMMENT ON VIEW v_jadwal_kunjungan IS 'View jadwal kunjungan guru ke DUDI';

-- ============================================================================
-- VIEW: Log Aktivitas Lengkap
-- ============================================================================
CREATE OR REPLACE VIEW v_log_aktivitas_lengkap AS
SELECT 
  l.id,
  l.aktivitas,
  l.modul,
  l.deskripsi,
  l.ip_address,
  l.user_agent,
  l.created_at,
  u.email as user_email,
  u.role as user_role,
  COALESCE(s.nama, g.nama, 'Admin') as nama_user
FROM log_aktivitas l
LEFT JOIN users u ON l.user_id = u.id
LEFT JOIN siswa s ON u.id = s.user_id
LEFT JOIN guru g ON u.id = g.user_id
ORDER BY l.created_at DESC;

COMMENT ON VIEW v_log_aktivitas_lengkap IS 'View log aktivitas dengan detail user';

-- ============================================================================
-- VIEW: Dashboard Siswa
-- ============================================================================
CREATE OR REPLACE VIEW v_dashboard_siswa AS
SELECT 
  s.id as siswa_id,
  s.nama,
  s.kelas,
  p.status as status_penempatan,
  d.nama as nama_dudi,
  p.periode,
  COUNT(DISTINCT a.id) as total_absensi,
  COUNT(DISTINCT a.id) FILTER (WHERE a.status = 'hadir') as hari_hadir,
  COUNT(DISTINCT j.id) as total_jurnal,
  COUNT(DISTINCT j.id) FILTER (WHERE j.status = 'disetujui') as jurnal_disetujui,
  COUNT(DISTINCT n.id) FILTER (WHERE n.is_read = FALSE) as notifikasi_belum_dibaca
FROM siswa s
LEFT JOIN penempatan p ON s.id = p.siswa_id AND p.status IN ('disetujui', 'selesai')
LEFT JOIN dudi d ON p.dudi_id = d.id
LEFT JOIN absensi a ON s.id = a.siswa_id
LEFT JOIN jurnal j ON s.id = j.siswa_id
LEFT JOIN users u ON s.user_id = u.id
LEFT JOIN notifikasi n ON u.id = n.user_id
WHERE s.status = 'aktif'
GROUP BY s.id, s.nama, s.kelas, p.status, d.nama, p.periode;

COMMENT ON VIEW v_dashboard_siswa IS 'View untuk dashboard siswa dengan statistik ringkas';

-- ============================================================================
-- VIEW: Dashboard Guru
-- ============================================================================
CREATE OR REPLACE VIEW v_dashboard_guru AS
SELECT 
  g.id as guru_id,
  g.nama,
  g.mata_pelajaran,
  COUNT(DISTINCT s.id) as jumlah_siswa_bimbingan,
  COUNT(DISTINCT p.id) FILTER (WHERE p.status = 'disetujui') as siswa_magang_aktif,
  COUNT(DISTINCT j.id) FILTER (WHERE j.status = 'terkirim') as jurnal_perlu_validasi,
  COUNT(DISTINCT k.id) FILTER (WHERE k.status = 'terjadwal' AND k.tanggal >= CURRENT_DATE) as kunjungan_mendatang,
  COUNT(DISTINCT n.id) FILTER (WHERE n.is_read = FALSE) as notifikasi_belum_dibaca
FROM guru g
LEFT JOIN siswa s ON g.id = s.guru_pembimbing_id AND s.status = 'aktif'
LEFT JOIN penempatan p ON g.id = p.guru_pembimbing_id
LEFT JOIN jurnal j ON s.id = j.siswa_id
LEFT JOIN kunjungan k ON g.id = k.guru_id
LEFT JOIN users u ON g.user_id = u.id
LEFT JOIN notifikasi n ON u.id = n.user_id
WHERE g.status = 'aktif'
GROUP BY g.id, g.nama, g.mata_pelajaran;

COMMENT ON VIEW v_dashboard_guru IS 'View untuk dashboard guru dengan statistik ringkas';

-- ============================================================================
-- Success Message
-- ============================================================================
DO $$
BEGIN
  RAISE NOTICE '✅ Semua views berhasil dibuat!';
  RAISE NOTICE 'Lanjutkan dengan script 05-enable-rls.sql';
END $$;
