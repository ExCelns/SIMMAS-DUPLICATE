"use client";

import Link from "next/link";

/* ─── Icons ─── */
function IconFileText({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
      strokeLinejoin="round" className={className}>
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
    </svg>
  );
}

function IconClock({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
      strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
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

function IconBriefcase({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
      strokeLinejoin="round" className={className}>
      <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
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

function IconEdit({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
      strokeLinejoin="round" className={className}>
      <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
      <path d="m15 5 4 4" />
    </svg>
  );
}

export default function SiswaPengajuan() {
  // Status pengajuan dari backend (mock data)
  const pengajuanStatus = {
    status: "disetujui", // bisa: "belum", "ditinjau", "disetujui", "ditolak"
    dudi: "PT. Universal Big Data",
    posisi: "Mobile Dev",
    tanggal: "24 Agustus 2026"
  };

  return (
    <div className="siswa-pengajuan-container">
      {/* Status Steps */}
      <div className="siswa-pengajuan-header">
        <div className="siswa-pengajuan-steps">
          <div className="siswa-step-item siswa-step-completed">
            <div className="siswa-step-circle">
              <IconFileText />
            </div>
            <div className="siswa-step-line siswa-step-line-completed"></div>
            <span className="siswa-step-label">Ajukan</span>
          </div>

          <div className="siswa-step-item siswa-step-completed">
            <div className="siswa-step-circle">
              <IconClock />
            </div>
            <div className="siswa-step-line siswa-step-line-completed"></div>
            <span className="siswa-step-label">Ditinjau Sekolah</span>
          </div>

          <div className="siswa-step-item siswa-step-completed">
            <div className="siswa-step-circle">
              <IconCheckCircle />
            </div>
            <span className="siswa-step-label">Disetujui</span>
          </div>
        </div>

        {/* Status Badge */}
        {pengajuanStatus.status === "disetujui" && (
          <div className="siswa-pengajuan-badge">
            <span className="siswa-badge-dot"></span>
            Disetujui
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="siswa-pengajuan-content">
        {/* Left Side - Detail */}
        <div className="siswa-pengajuan-detail">
          <h2 className="siswa-pengajuan-title">Detail Pengajuan Magang</h2>
          <p className="siswa-pengajuan-subtitle">Informasi tempat magang yang diajukan.</p>

          <div className="siswa-pengajuan-info-list">
            {/* Tempat Magang */}
            <div className="siswa-pengajuan-info-item">
              <div className="siswa-pengajuan-info-icon siswa-icon-blue">
                <IconBuilding />
              </div>
              <div className="siswa-pengajuan-info-content">
                <p className="siswa-pengajuan-info-label">Tempat Magang (DUDI)</p>
                <p className="siswa-pengajuan-info-value">{pengajuanStatus.dudi}</p>
                <p className="siswa-pengajuan-info-note">Tasikmalaya</p>
              </div>
            </div>

            {/* Posisi */}
            <div className="siswa-pengajuan-info-item">
              <div className="siswa-pengajuan-info-icon siswa-icon-blue">
                <IconBriefcase />
              </div>
              <div className="siswa-pengajuan-info-content">
                <p className="siswa-pengajuan-info-label">Posisi yang Diajukan</p>
                <p className="siswa-pengajuan-info-value">{pengajuanStatus.posisi}</p>
              </div>
            </div>

            {/* Tanggal */}
            <div className="siswa-pengajuan-info-item">
              <div className="siswa-pengajuan-info-icon siswa-icon-green">
                <IconCalendar />
              </div>
              <div className="siswa-pengajuan-info-content">
                <p className="siswa-pengajuan-info-label">Tanggal Pengajuan</p>
                <p className="siswa-pengajuan-info-value">{pengajuanStatus.tanggal}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Status Card */}
        <div className="siswa-pengajuan-status-card">
          <div className="siswa-pengajuan-status-icon">
            <IconCheckCircle />
          </div>
          <h3 className="siswa-pengajuan-status-title">Pengajuan Magang Aktif</h3>
          <p className="siswa-pengajuan-status-text">
            Selamat! Anda sudah terdaftar dan aktif magang. Silakan isi absensi atau jurnal harian Anda.
          </p>

          <div className="siswa-pengajuan-status-actions">
            <Link href="/siswa/absensi">
              <button className="siswa-pengajuan-action-btn siswa-btn-primary">
                <IconFileText className="siswa-btn-icon" />
                Isi Absensi
              </button>
            </Link>
            <Link href="/siswa/jurnal">
              <button className="siswa-pengajuan-action-btn siswa-btn-secondary">
                <IconEdit className="siswa-btn-icon" />
                Tulis Jurnal
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
