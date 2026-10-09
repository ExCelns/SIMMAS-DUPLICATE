"use client";

import Link from "next/link";

/* ─── Icons ─── */
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

function IconBuilding2({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
      strokeLinejoin="round" className={className}>
      <path d="M10 12h4" /><path d="M10 8h4" />
      <path d="M14 21v-3a2 2 0 0 0-4 0v3" />
      <path d="M6 10H4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-2" />
      <path d="M6 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16" />
    </svg>
  );
}

function IconUserCheck({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
      strokeLinejoin="round" className={className}>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <polyline points="16 11 18 13 22 9" />
    </svg>
  );
}

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

function IconSearch({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
      strokeLinejoin="round" className={className}>
      <circle cx="11" cy="11" r="8" />
      <path d="M21 21l-4.35-4.35" />
    </svg>
  );
}

function IconPlus({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
      strokeLinejoin="round" className={className}>
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  );
}

function IconEye({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
      strokeLinejoin="round" className={className}>
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function IconCheck({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
      strokeLinejoin="round" className={className}>
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function IconX({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
      strokeLinejoin="round" className={className}>
      <path d="M18 6 6 18" />
      <path d="M6 6l12 12" />
    </svg>
  );
}

export default function PenempatanMagang() {
  const penempatanData = [
    {
      nama: "Adelia Putri",
      kelas: "XII RPL 1",
      dudi: "PT. Universal Big Data",
      tanggalPengajuan: "10 Sep 2024",
      periode: "Sep 2024 - Feb 2025",
      status: "Menunggu"
    },
    {
      nama: "Bagus Pratama", 
      kelas: "XII RPL 1",
      dudi: "PT. Jaya Giok",
      tanggalPengajuan: "12 Sep 2024",
      periode: "Sep 2024 - Feb 2025",
      status: "Menunggu"
    },
    {
      nama: "Candra Sari",
      kelas: "XII RPL 1", 
      dudi: "PT. Universal Big Data",
      tanggalPengajuan: "15 Sep 2024",
      periode: "Sep 2024 - Feb 2025",
      status: "Disetujui"
    },
    {
      nama: "Dinda Ayu",
      kelas: "XII RPL 2",
      dudi: "PT. Telkom Sidoarjo",
      tanggalPengajuan: "18 Sep 2024",
      periode: "Sep 2024 - Feb 2025", 
      status: "Disetujui"
    },
    {
      nama: "Eko Prasetyo",
      kelas: "XII RPL 1",
      dudi: "PT. Jaya Giok", 
      tanggalPengajuan: "20 Sep 2024",
      periode: "Sep 2024 - Feb 2025",
      status: "Menunggu"
    },
    {
      nama: "Fajar",
      kelas: "XII RPL 2",
      dudi: "PT. Suka Makmur",
      tanggalPengajuan: "22 Sep 2024",
      periode: "Sep 2024 - Feb 2025",
      status: "Disetujui"
    }
  ];

  return (
    <div className="penempatan-container">
      {/* Stats Cards */}
      <div className="penempatan-stats-grid">
        {/* Pengajuan Masuk */}
        <div className="penempatan-stat-card">
          <div className="penempatan-stat-header">
            <div className="penempatan-stat-icon-wrap penempatan-stat-icon-orange">
              <IconClock className="penempatan-stat-icon" />
            </div>
          </div>
          <p className="penempatan-stat-label">PENGAJUAN MASUK</p>
          <p className="penempatan-stat-value">2</p>
          <p className="penempatan-stat-sub">— Menunggu validasi</p>
        </div>

        {/* Sedang Magang */}
        <div className="penempatan-stat-card">
          <div className="penempatan-stat-header">
            <div className="penempatan-stat-icon-wrap penempatan-stat-icon-blue">
              <IconUsers className="penempatan-stat-icon" />
            </div>
          </div>
          <p className="penempatan-stat-label">SEDANG MAGANG</p>
          <p className="penempatan-stat-value">10</p>
          <p className="penempatan-stat-sub">— Aktif magang</p>
        </div>

        {/* Belum Ditempatkan */}
        <div className="penempatan-stat-card">
          <div className="penempatan-stat-header">
            <div className="penempatan-stat-icon-wrap penempatan-stat-icon-purple">
              <IconBuilding2 className="penempatan-stat-icon" />
            </div>
          </div>
          <p className="penempatan-stat-label">BELUM DITEMPATKAN</p>
          <p className="penempatan-stat-value">0</p>
          <p className="penempatan-stat-sub">— Menunggu penempatan</p>
        </div>

        {/* Selesai Magang */}
        <div className="penempatan-stat-card">
          <div className="penempatan-stat-header">
            <div className="penempatan-stat-icon-wrap penempatan-stat-icon-green">
              <IconUserCheck className="penempatan-stat-icon" />
            </div>
          </div>
          <p className="penempatan-stat-label">SELESAI MAGANG</p>
          <p className="penempatan-stat-value">4</p>
          <p className="penempatan-stat-sub">— Telah selesai</p>
        </div>
      </div>

      {/* Penempatan Magang Table */}
      <div className="penempatan-card">
        <div className="penempatan-card-header">
          <div>
            <h3 className="penempatan-card-title">Penempatan Magang</h3>
            <p className="penempatan-card-subtitle">Kelola pengajuan dan penempatan siswa magang</p>
          </div>
          <div className="penempatan-header-actions">
            <div className="penempatan-search-box">
              <IconSearch className="penempatan-search-icon" />
              <input type="text" placeholder="Cari pengajuan..." className="penempatan-search-input" />
            </div>
            <select className="penempatan-filter-select">
              <option>Semua Status</option>
              <option>Menunggu</option>
              <option>Disetujui</option>
              <option>Ditolak</option>
            </select>
            <select className="penempatan-filter-select">
              <option>Semua Periode</option>
              <option>Sep 2024 - Feb 2025</option>
              <option>Mar 2025 - Agu 2025</option>
            </select>
            <button className="penempatan-add-btn">
              <IconPlus className="penempatan-add-icon" />
              Buat Penempatan
            </button>
          </div>
        </div>
        
        <div className="penempatan-card-body">
          <div className="penempatan-table-wrapper">
            <table className="penempatan-table">
              <thead className="penempatan-table-head">
                <tr>
                  <th>NAMA SISWA</th>
                  <th>KELAS</th>
                  <th>TEMPAT MAGANG</th>
                  <th>TGL PENGAJUAN</th>
                  <th>PERIODE MAGANG</th>
                  <th>STATUS</th>
                  <th>AKSI</th>
                </tr>
              </thead>
              <tbody className="penempatan-table-body">
                {penempatanData.map((item, index) => (
                  <tr key={index} className="penempatan-table-row">
                    <td className="penempatan-table-cell">
                      <div className="penempatan-nama-cell">
                        <div className="penempatan-avatar">
                          {item.nama.split(' ').map(n => n[0]).join('')}
                        </div>
                        <span className="penempatan-nama">{item.nama}</span>
                      </div>
                    </td>
                    <td className="penempatan-table-cell">
                      <span className="penempatan-kelas">{item.kelas}</span>
                    </td>
                    <td className="penempatan-table-cell">
                      <span className="penempatan-dudi">{item.dudi}</span>
                    </td>
                    <td className="penempatan-table-cell">
                      <span className="penempatan-tanggal">{item.tanggalPengajuan}</span>
                    </td>
                    <td className="penempatan-table-cell">
                      <span className="penempatan-periode">{item.periode}</span>
                    </td>
                    <td className="penempatan-table-cell">
                      <span className={`penempatan-status ${
                        item.status === 'Menunggu' ? 'penempatan-status-pending' :
                        item.status === 'Disetujui' ? 'penempatan-status-approved' : 'penempatan-status-rejected'
                      }`}>{item.status}</span>
                    </td>
                    <td className="penempatan-table-cell">
                      <div className="penempatan-actions">
                        <button className="penempatan-action-btn penempatan-action-view">
                          <IconEye className="penempatan-action-icon" />
                          Detail
                        </button>
                        {item.status === 'Menunggu' && (
                          <>
                            <button className="penempatan-action-btn penempatan-action-approve">
                              <IconCheck className="penempatan-action-icon" />
                              Setujui
                            </button>
                            <button className="penempatan-action-btn penempatan-action-reject">
                              <IconX className="penempatan-action-icon" />
                              Tolak
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Table Footer */}
        <div className="penempatan-table-footer">
          <span className="penempatan-footer-text">Menampilkan 1-6 dari 16 total pengajuan</span>
          <div className="penempatan-pagination">
            <button className="penempatan-page-btn penempatan-page-prev" disabled>‹</button>
            <button className="penempatan-page-btn penempatan-page-active">1</button>
            <button className="penempatan-page-btn">2</button>
            <button className="penempatan-page-btn">3</button>
            <button className="penempatan-page-btn penempatan-page-next">›</button>
          </div>
        </div>
      </div>
    </div>
  );
}