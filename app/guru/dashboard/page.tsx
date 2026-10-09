"use client";

import Link from "next/link";

/* ─── Icons ─── */
function IconUsers({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
      strokeLinejoin="round" className={className}>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
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

function IconCheckCircle({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
      strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="10" />
      <path d="m9 12 2 2 4-4" />
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

export default function GuruDashboard() {
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
    <div className="guru-db-container">
      {/* Hero Card */}
      <div className="guru-db-hero-card">
        <div className="guru-db-hero-content">
          <p className="guru-db-hero-date">{getDynamicDate()}</p>
          <h2 className="guru-db-hero-title">Selamat datang kembali, Guru Pembimbing</h2>
          <p className="guru-db-hero-subtitle">
            Ada <strong>3 jurnal</strong> yang menunggu verifikasi Anda hari ini.
          </p>
        </div>
        <Link href="/guru/jurnal">
          <button className="guru-db-hero-btn">
            <IconCheckCircle className="guru-db-hero-btn-icon" />
            Verifikasi Jurnal
            <IconArrowRight className="guru-db-hero-btn-arrow" />
          </button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="guru-db-stats-grid">
        {/* Siswa Bimbingan */}
        <div className="guru-db-stat-card">
          <div className="guru-db-stat-header">
            <div className="guru-db-stat-icon-wrap guru-db-stat-icon-blue">
              <IconUsers className="guru-db-stat-icon" />
            </div>
          </div>
          <p className="guru-db-stat-label">SISWA BIMBINGAN</p>
          <p className="guru-db-stat-value">8</p>
          <p className="guru-db-stat-sub">— Siswa aktif</p>
        </div>

        {/* Jurnal Pending */}
        <div className="guru-db-stat-card">
          <div className="guru-db-stat-header">
            <div className="guru-db-stat-icon-wrap guru-db-stat-icon-orange">
              <IconFileText className="guru-db-stat-icon" />
            </div>
          </div>
          <p className="guru-db-stat-label">JURNAL PENDING</p>
          <p className="guru-db-stat-value">3</p>
          <p className="guru-db-stat-sub">— Menunggu verifikasi</p>
        </div>

        {/* Jurnal Verified */}
        <div className="guru-db-stat-card">
          <div className="guru-db-stat-header">
            <div className="guru-db-stat-icon-wrap guru-db-stat-icon-green">
              <IconCheckCircle className="guru-db-stat-icon" />
            </div>
          </div>
          <p className="guru-db-stat-label">JURNAL VERIFIED</p>
          <p className="guru-db-stat-value">45</p>
          <p className="guru-db-stat-sub">— Telah diverifikasi</p>
        </div>

        {/* Kunjungan DUDI */}
        <div className="guru-db-stat-card">
          <div className="guru-db-stat-header">
            <div className="guru-db-stat-icon-wrap guru-db-stat-icon-purple">
              <IconCalendar className="guru-db-stat-icon" />
            </div>
          </div>
          <p className="guru-db-stat-label">KUNJUNGAN DUDI</p>
          <p className="guru-db-stat-value">2</p>
          <p className="guru-db-stat-sub">— Agenda bulan ini</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="guru-db-content-grid">
        {/* Siswa Bimbingan */}
        <div className="guru-db-card">
          <div className="guru-db-card-header">
            <div>
              <h3 className="guru-db-card-title">Siswa Bimbingan Saya</h3>
              <p className="guru-db-card-subtitle">Daftar siswa yang Anda bimbing</p>
            </div>
            <Link href="/guru/siswa" className="guru-db-card-link">
              Lihat Semua
            </Link>
          </div>
          <div className="guru-db-card-body">
            <div className="guru-db-siswa-list">
              {[
                { nama: "Adelia Putri", dudi: "PT. Universal Big Data", status: "Aktif" },
                { nama: "Bagus Pratama", dudi: "PT. Jaya Giok", status: "Aktif" },
                { nama: "Candra Sari", dudi: "PT. Universal Big Data", status: "Aktif" },
                { nama: "Eko Prasetyo", dudi: "PT. Jaya Giok", status: "Aktif" }
              ].map((siswa, index) => (
                <div key={index} className="guru-db-siswa-item">
                  <div className="guru-db-siswa-avatar">
                    {siswa.nama.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="guru-db-siswa-info">
                    <p className="guru-db-siswa-nama">{siswa.nama}</p>
                    <p className="guru-db-siswa-dudi">{siswa.dudi}</p>
                  </div>
                  <span className="guru-db-siswa-status">{siswa.status}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Jurnal Pending */}
        <div className="guru-db-card">
          <div className="guru-db-card-header">
            <div>
              <h3 className="guru-db-card-title">Jurnal Menunggu Verifikasi</h3>
              <p className="guru-db-card-subtitle">Jurnal yang perlu ditinjau</p>
            </div>
            <Link href="/guru/jurnal" className="guru-db-card-link">
              Lihat Semua
            </Link>
          </div>
          <div className="guru-db-card-body">
            <div className="guru-db-jurnal-list">
              {[
                { siswa: "Adelia Putri", tanggal: "30 Sep 2024", kegiatan: "Implementasi fitur login system" },
                { siswa: "Bagus Pratama", tanggal: "30 Sep 2024", kegiatan: "Debugging API integration" },
                { siswa: "Candra Sari", tanggal: "29 Sep 2024", kegiatan: "Meeting dengan klien" }
              ].map((jurnal, index) => (
                <div key={index} className="guru-db-jurnal-item">
                  <div className="guru-db-jurnal-header">
                    <span className="guru-db-jurnal-siswa">{jurnal.siswa}</span>
                    <span className="guru-db-jurnal-tanggal">{jurnal.tanggal}</span>
                  </div>
                  <p className="guru-db-jurnal-kegiatan">{jurnal.kegiatan}</p>
                  <div className="guru-db-jurnal-actions">
                    <button className="guru-db-jurnal-btn guru-db-jurnal-btn-verify">
                      <IconCheckCircle className="guru-db-jurnal-btn-icon" />
                      Verifikasi
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Agenda Kunjungan */}
      <div className="guru-db-card">
        <div className="guru-db-card-header">
          <div>
            <h3 className="guru-db-card-title">Agenda Kunjungan DUDI</h3>
            <p className="guru-db-card-subtitle">Jadwal kunjungan ke tempat magang</p>
          </div>
          <button className="guru-db-add-btn">
            <IconCalendar className="guru-db-add-icon" />
            Tambah Agenda
          </button>
        </div>
        <div className="guru-db-card-body">
          <div className="guru-db-agenda-list">
            {[
              { 
                dudi: "PT. Universal Big Data", 
                tanggal: "5 Oktober 2024", 
                waktu: "09:00 - 12:00",
                siswa: "3 siswa",
                status: "Akan Datang"
              },
              { 
                dudi: "PT. Jaya Giok", 
                tanggal: "12 Oktober 2024", 
                waktu: "10:00 - 13:00",
                siswa: "2 siswa",
                status: "Akan Datang"
              }
            ].map((agenda, index) => (
              <div key={index} className="guru-db-agenda-item">
                <div className="guru-db-agenda-icon">
                  <IconCalendar className="guru-db-agenda-icon-svg" />
                </div>
                <div className="guru-db-agenda-content">
                  <h4 className="guru-db-agenda-dudi">{agenda.dudi}</h4>
                  <div className="guru-db-agenda-details">
                    <span className="guru-db-agenda-tanggal">{agenda.tanggal}</span>
                    <span className="guru-db-agenda-separator">•</span>
                    <span className="guru-db-agenda-waktu">{agenda.waktu}</span>
                    <span className="guru-db-agenda-separator">•</span>
                    <span className="guru-db-agenda-siswa">{agenda.siswa}</span>
                  </div>
                </div>
                <span className="guru-db-agenda-status">{agenda.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}