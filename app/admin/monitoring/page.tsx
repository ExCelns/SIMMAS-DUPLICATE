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

export default function MonitoringGlobal() {
  const siswaData = [
    {
      nama: "Adelia Putri",
      kelas: "XII RPL 1",
      dudi: "PT. Universal Big Data",
      pembimbing: "Budi Santoso",
      status: "Menginput Data"
    },
    {
      nama: "Andi Wijaya", 
      kelas: "XII RPL 2",
      dudi: "PT. Telkom Sidoarjo",
      pembimbing: "Sari Dewi",
      status: "Menginput Data"
    },
    {
      nama: "Bagus Pratama",
      kelas: "XII RPL 1", 
      dudi: "PT. Jaya Giok",
      pembimbing: "Ahmad Yusuf",
      status: "Menginput Data"
    },
    {
      nama: "Bayu",
      kelas: "XII RPL 2",
      dudi: "PT. Suka",
      pembimbing: "Lisa Maharani",
      status: "Menginput Data"
    },
    {
      nama: "Candra Sari",
      kelas: "XII RPL 1",
      dudi: "PT. Universal Big Data", 
      pembimbing: "Budi Santoso",
      status: "Menginput Data"
    },
    {
      nama: "Dinda Ayu",
      kelas: "XII RPL 2",
      dudi: "PT. Telkom Sidoarjo",
      pembimbing: "Sari Dewi", 
      status: "Menginput Data"
    },
    {
      nama: "Eko Prasetyo",
      kelas: "XII RPL 1",
      dudi: "PT. Jaya Giok",
      pembimbing: "Ahmad Yusuf",
      status: "Menginput Data"
    },
    {
      nama: "Fajar",
      kelas: "XII RPL 2", 
      dudi: "PT. Suka",
      pembimbing: "Lisa Maharani",
      status: "Menginput Data"
    }
  ];

  return (
    <div className="mon-container">
      {/* Stats Cards */}
      <div className="mon-stats-grid">
        {/* Total Siswa */}
        <div className="mon-stat-card">
          <div className="mon-stat-header">
            <div className="mon-stat-icon-wrap mon-stat-icon-blue">
              <IconUsers className="mon-stat-icon" />
            </div>
          </div>
          <p className="mon-stat-label">TOTAL SISWA</p>
          <p className="mon-stat-value">13</p>
          <p className="mon-stat-sub">— Data real-time</p>
        </div>

        {/* Guru Pembimbing */}
        <div className="mon-stat-card">
          <div className="mon-stat-header">
            <div className="mon-stat-icon-wrap mon-stat-icon-purple">
              <IconUserCheck className="mon-stat-icon" />
            </div>
          </div>
          <p className="mon-stat-label">GURU PEMBIMBING</p>
          <p className="mon-stat-value">3%</p>
          <p className="mon-stat-sub">— Data real-time</p>
        </div>

        {/* Mitra Industri */}
        <div className="mon-stat-card">
          <div className="mon-stat-header">
            <div className="mon-stat-icon-wrap mon-stat-icon-green">
              <IconBuilding2 className="mon-stat-icon" />
            </div>
          </div>
          <p className="mon-stat-label">MITRA INDUSTRI</p>
          <p className="mon-stat-value">0</p>
          <p className="mon-stat-sub">— Data real-time</p>
        </div>

        {/* Pengajuan Magang */}
        <div className="mon-stat-card">
          <div className="mon-stat-header">
            <div className="mon-stat-icon-wrap mon-stat-icon-orange">
              <IconFileText className="mon-stat-icon" />
            </div>
          </div>
          <p className="mon-stat-label">PENGAJUAN MAGANG</p>
          <p className="mon-stat-value">12</p>
          <p className="mon-stat-sub">— Data real-time</p>
        </div>
      </div>

      {/* Monitoring Table */}
      <div className="mon-card">
        <div className="mon-card-header">
          <div>
            <h3 className="mon-card-title">Monitoring Global</h3>
            <p className="mon-card-subtitle">Monitor real-time aktivitas siswa dan guru pembimbing</p>
          </div>
          <div className="mon-header-actions">
            <div className="mon-search-box">
              <IconSearch className="mon-search-icon" />
              <input type="text" placeholder="Cari siswa..." className="mon-search-input" />
            </div>
            <select className="mon-filter-select">
              <option>Semua Status</option>
              <option>Menginput Data</option>
              <option>Aktif</option>
              <option>Tidak Aktif</option>
            </select>
            <button className="mon-export-btn">
              Export Data
            </button>
          </div>
        </div>
        
        <div className="mon-card-body">
          <div className="mon-table-wrapper">
            <table className="mon-table">
              <thead className="mon-table-head">
                <tr>
                  <th>NAMA SISWA</th>
                  <th>KELAS</th>
                  <th>TEMPAT MAGANG</th>
                  <th>PEMBIMBING</th>
                  <th>STATUS</th>
                  <th>AKSI</th>
                </tr>
              </thead>
              <tbody className="mon-table-body">
                {siswaData.map((siswa, index) => (
                  <tr key={index} className="mon-table-row">
                    <td className="mon-table-cell">
                      <div className="mon-nama-cell">
                        <div className="mon-avatar">
                          {siswa.nama.split(' ').map(n => n[0]).join('')}
                        </div>
                        <span className="mon-nama">{siswa.nama}</span>
                      </div>
                    </td>
                    <td className="mon-table-cell">
                      <span className="mon-kelas">{siswa.kelas}</span>
                    </td>
                    <td className="mon-table-cell">
                      <span className="mon-dudi">{siswa.dudi}</span>
                    </td>
                    <td className="mon-table-cell">
                      <span className="mon-pembimbing">{siswa.pembimbing}</span>
                    </td>
                    <td className="mon-table-cell">
                      <span className="mon-status mon-status-active">{siswa.status}</span>
                    </td>
                    <td className="mon-table-cell">
                      <div className="mon-actions">
                        <button className="mon-action-btn mon-action-view">
                          <IconEye className="mon-action-icon" />
                          Detail
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Table Footer */}
        <div className="mon-table-footer">
          <span className="mon-footer-text">Menampilkan 1-8 dari 12 total data</span>
          <div className="mon-pagination">
            <button className="mon-page-btn mon-page-prev" disabled>‹</button>
            <button className="mon-page-btn mon-page-active">1</button>
            <button className="mon-page-btn">2</button>
            <button className="mon-page-btn mon-page-next">›</button>
          </div>
        </div>
      </div>
    </div>
  );
}