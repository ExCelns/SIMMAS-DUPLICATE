"use client";

import Link from "next/link";

/* ─── Icons ─── */
function IconGraduationCap({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
      strokeLinejoin="round" className={className}>
      <path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z" />
      <path d="M22 10v6" />
      <path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5" />
    </svg>
  );
}

function IconCalendar({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
      strokeLinejoin="round" className={className}>
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

function IconFileText({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
      strokeLinejoin="round" className={className}>
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
      <path d="M10 9H8" />
      <path d="M16 13H8" />
      <path d="M16 17H8" />
    </svg>
  );
}

function IconCamera({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
      strokeLinejoin="round" className={className}>
      <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
      <circle cx="12" cy="13" r="3" />
    </svg>
  );
}

function IconBuilding({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
      strokeLinejoin="round" className={className}>
      <rect width="16" height="20" x="4" y="2" rx="2" ry="2" />
      <path d="M9 22v-4h6v4" />
      <path d="M8 6h.01" />
      <path d="M16 6h.01" />
      <path d="M12 6h.01" />
      <path d="M12 10h.01" />
      <path d="M12 14h.01" />
      <path d="M16 10h.01" />
      <path d="M16 14h.01" />
      <path d="M8 10h.01" />
      <path d="M8 14h.01" />
    </svg>
  );
}

function IconUser({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
      strokeLinejoin="round" className={className}>
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function IconArrowRight({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
      strokeLinejoin="round" className={className}>
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

export default function SiswaDashboard() {
  // Generate dynamic date
  const getDynamicDate = () => {
    const days = ['MINGGU', 'SENIN', 'SELASA', 'RABU', 'KAMIS', 'JUMAT', 'SABTU'];
    const months = ['JANUARI', 'FEBRUARI', 'MARET', 'APRIL', 'MEI', 'JUNI', 'JULI', 'AGUSTUS', 'SEPTEMBER', 'OKTOBER', 'NOVEMBER', 'DESEMBER'];
    
    const now = new Date();
    const dayName = days[now.getDay()];
    const date = now.getDate();
    const monthName = months[now.getMonth()];
    const year = now.getFullYear();
    
    return `${dayName}, ${date} ${monthName} ${year}`;
  };

  return (
    <div className="siswa-db-container">
      {/* Hero Card */}
      <div className="siswa-db-hero-card">
        <div className="siswa-db-hero-content">
          <p className="siswa-db-hero-date">{getDynamicDate()}</p>
          <h2 className="siswa-db-hero-title">Semangat magang, Siswa Magang!</h2>
          <p className="siswa-db-hero-subtitle">
            Lanjutkan perjalanan magang Anda dengan tetap semangat dan penuh dedikasi. 
            Setiap hari adalah kesempatan baru untuk belajar!
          </p>
        </div>
        <Link href="/siswa/jurnal">
          <button className="siswa-db-hero-btn">
            <IconGraduationCap className="siswa-db-hero-btn-icon" />
            Tulis Jurnal
            <IconArrowRight className="siswa-db-hero-btn-arrow" />
          </button>
        </Link>
      </div>

      {/* Progress Stats */}
      <div className="siswa-db-progress-grid">
        {/* Hari ke */}
        <div className="siswa-db-progress-card">
          <div className="siswa-db-progress-icon-wrap siswa-db-progress-icon-blue">
            <IconCalendar className="siswa-db-progress-icon" />
          </div>
          <div className="siswa-db-progress-content">
            <p className="siswa-db-progress-label">HARI KE</p>
            <p className="siswa-db-progress-value">2</p>
            <p className="siswa-db-progress-sub">— Dari total kegiatan</p>
          </div>
        </div>

        {/* Total Kehadiran */}
        <div className="siswa-db-progress-card">
          <div className="siswa-db-progress-icon-wrap siswa-db-progress-icon-green">
            <IconCalendar className="siswa-db-progress-icon" />
          </div>
          <div className="siswa-db-progress-content">
            <p className="siswa-db-progress-label">TOTAL KEHADIRAN</p>
            <p className="siswa-db-progress-value">1</p>
            <p className="siswa-db-progress-sub">— Hari hadir</p>
          </div>
        </div>

        {/* Laporan */}
        <div className="siswa-db-progress-card">
          <div className="siswa-db-progress-icon-wrap siswa-db-progress-icon-purple">
            <IconFileText className="siswa-db-progress-icon" />
          </div>
          <div className="siswa-db-progress-content">
            <p className="siswa-db-progress-label">JURNAL HARIAN</p>
            <p className="siswa-db-progress-value">1</p>
            <p className="siswa-db-progress-sub">— Laporan dibuat</p>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="siswa-db-content-grid">
        {/* Informasi Magang */}
        <div className="siswa-db-card">
          <div className="siswa-db-card-header">
            <div>
              <h3 className="siswa-db-card-title">Informasi Magang</h3>
              <p className="siswa-db-card-subtitle">Detail tempat dan pembimbing magang Anda</p>
            </div>
          </div>
          <div className="siswa-db-card-body">
            <div className="siswa-db-info-list">
              {/* Tempat Magang */}
              <div className="siswa-db-info-item">
                <div className="siswa-db-info-icon-wrap siswa-db-info-icon-blue">
                  <IconBuilding className="siswa-db-info-icon" />
                </div>
                <div className="siswa-db-info-content">
                  <p className="siswa-db-info-label">Tempat Magang</p>
                  <p className="siswa-db-info-value">PT. Universal Big Data</p>
                </div>
              </div>

              {/* Pembimbing */}
              <div className="siswa-db-info-item">
                <div className="siswa-db-info-icon-wrap siswa-db-info-icon-green">
                  <IconUser className="siswa-db-info-icon" />
                </div>
                <div className="siswa-db-info-content">
                  <p className="siswa-db-info-label">Pembimbing</p>
                  <p className="siswa-db-info-value">Drs. H. Rudi Santoso, M.Kom</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Absensi Harian */}
        <div className="siswa-db-card">
          <div className="siswa-db-card-header">
            <div>
              <h3 className="siswa-db-card-title">Absensi Harian</h3>
              <p className="siswa-db-card-subtitle">Foto absensi masuk dan keluar hari ini</p>
            </div>
            <Link href="/siswa/absensi" className="siswa-db-card-link">
              Lihat Riwayat
            </Link>
          </div>
          <div className="siswa-db-card-body">
            <div className="siswa-db-absensi-content">
              <div className="siswa-db-absensi-status">
                <div className="siswa-db-absensi-today">
                  <p className="siswa-db-absensi-date">Hari ini</p>
                  <p className="siswa-db-absensi-day">{new Date().toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long' })}</p>
                </div>
              </div>
              
              <div className="siswa-db-absensi-actions">
                <Link href="/siswa/absensi">
                  <button className="siswa-db-absensi-btn siswa-db-absensi-btn-masuk">
                    <IconCamera className="siswa-db-absensi-btn-icon" />
                    Foto Masuk
                  </button>
                </Link>
                <button className="siswa-db-absensi-btn siswa-db-absensi-btn-keluar" disabled>
                  <IconCamera className="siswa-db-absensi-btn-icon" />
                  Foto Keluar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Jurnal Kegiatan */}
      <div className="siswa-db-card siswa-db-jurnal-card">
        <div className="siswa-db-card-header">
          <div>
            <h3 className="siswa-db-card-title">Jurnal Kegiatan</h3>
            <p className="siswa-db-card-subtitle">Catat kegiatan harian magang Anda</p>
          </div>
          <Link href="/siswa/jurnal" className="siswa-db-card-link">
            Lihat Semua
          </Link>
        </div>
        <div className="siswa-db-card-body">
          <form className="siswa-db-jurnal-form">
            <div className="siswa-db-form-group">
              <label className="siswa-db-form-label">Kegiatan Hari Ini</label>
              <textarea 
                className="siswa-db-form-textarea"
                placeholder="Ceritakan kegiatan magang Anda hari ini..."
                rows={4}
              />
            </div>
            <div className="siswa-db-form-actions">
              <Link href="/siswa/jurnal">
                <button type="button" className="siswa-db-form-btn">
                  <IconFileText className="siswa-db-form-btn-icon" />
                  Simpan Jurnal
                  <IconArrowRight className="siswa-db-form-btn-arrow" />
                </button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}