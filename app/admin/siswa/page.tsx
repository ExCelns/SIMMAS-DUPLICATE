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

function IconGraduationCap({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
      strokeLinejoin="round" className={className}>
      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
      <path d="M6 12v5c3 3 9 3 12 0v-5" />
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

function IconEdit({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
      strokeLinejoin="round" className={className}>
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4Z" />
    </svg>
  );
}

interface Siswa {
  nis: string;
  nama: string;
  kelas: string;
  jurusan: string;
  status: string;
}

export default function DataSiswa() {
  const siswaData = [
    {
      nis: "",
      nama: "", 
      kelas: "",
      jurusan: "Rekayasa Perangkat Lunak",
      status: "Aktif Magang"
    },
    {
      nis: "202401002",
      nama: "Andi Wijaya",
      kelas: "XII RPL 2", 
      jurusan: "Rekayasa Perangkat Lunak",
      status: "Aktif Magang"
    },
    {
      nis: "202401003",
      nama: "Bagus Pratama",
      kelas: "XII RPL 1",
      jurusan: "Rekayasa Perangkat Lunak", 
      status: "Aktif Magang"
    },
    {
      nis: "202401004",
      nama: "Bayu",
      kelas: "XII RPL 2",
      jurusan: "Rekayasa Perangkat Lunak",
      status: "Aktif Magang"
    },
    {
      nis: "202401005", 
      nama: "Candra Sari",
      kelas: "XII RPL 1",
      jurusan: "Rekayasa Perangkat Lunak",
      status: "Aktif Magang"
    },
    {
      nis: "202401006",
      nama: "Dinda Ayu",
      kelas: "XII RPL 2",
      jurusan: "Rekayasa Perangkat Lunak",
      status: "Aktif Magang"
    },
    {
      nis: "202401007",
      nama: "Eko Prasetyo", 
      kelas: "XII RPL 1",
      jurusan: "Rekayasa Perangkat Lunak",
      status: "Aktif Magang"
    },
    {
      nis: "202401008",
      nama: "Fajar",
      kelas: "XII RPL 2",
      jurusan: "Rekayasa Perangkat Lunak",
      status: "Aktif Magang"
    }
  ];

  return (
    <div className="siswa-container">
      {/* Stats Cards */}
      <div className="siswa-stats-grid">
        {/* Total Siswa */}
        <div className="siswa-stat-card">
          <div className="siswa-stat-header">
            <div className="siswa-stat-icon-wrap siswa-stat-icon-blue">
              <IconUsers className="siswa-stat-icon" />
            </div>
          </div>
          <p className="siswa-stat-label">TOTAL SISWA</p>
          <p className="siswa-stat-value">21</p>
          <p className="siswa-stat-sub">— Siswa terdaftar</p>
        </div>

        {/* Kelas XII */}
        <div className="siswa-stat-card">
          <div className="siswa-stat-header">
            <div className="siswa-stat-icon-wrap siswa-stat-icon-green">
              <IconGraduationCap className="siswa-stat-icon" />
            </div>
          </div>
          <p className="siswa-stat-label">KELAS XII</p>
          <p className="siswa-stat-value">6</p>
          <p className="siswa-stat-sub">— Aktif magang</p>
        </div>

        {/* RPL Aktif */}
        <div className="siswa-stat-card">
          <div className="siswa-stat-header">
            <div className="siswa-stat-icon-wrap siswa-stat-icon-purple">
              <IconUserCheck className="siswa-stat-icon" />
            </div>
          </div>
          <p className="siswa-stat-label">RPL AKTIF</p>
          <p className="siswa-stat-value">4</p>
          <p className="siswa-stat-sub">— Jurusan RPL</p>
        </div>

        {/* Menunggu Penempatan */}
        <div className="siswa-stat-card">
          <div className="siswa-stat-header">
            <div className="siswa-stat-icon-wrap siswa-stat-icon-orange">
              <IconClock className="siswa-stat-icon" />
            </div>
          </div>
          <p className="siswa-stat-label">MENUNGGU PENEMPATAN</p>
          <p className="siswa-stat-value">0</p>
          <p className="siswa-stat-sub">— Belum ditempatkan</p>
        </div>
      </div>

      {/* Data Siswa Table */}
      <div className="siswa-card">
        <div className="siswa-card-header">
          <div>
            <h3 className="siswa-card-title">Data Siswa</h3>
            <p className="siswa-card-subtitle">Kelola informasi siswa dan status magang</p>
          </div>
          <div className="siswa-header-actions">
            <div className="siswa-search-box">
              <IconSearch className="siswa-search-icon" />
              <input type="text" placeholder="Cari siswa..." className="siswa-search-input" />
            </div>
            <select className="siswa-filter-select">
              <option>Semua Kelas</option>
              <option>XII RPL 1</option>
              <option>XII RPL 2</option>
            </select>
            <select className="siswa-filter-select">
              <option>Semua Status</option>
              <option>Aktif Magang</option>
              <option>Menunggu Penempatan</option>
            </select>
            <button className="siswa-add-btn">
              <IconPlus className="siswa-add-icon" />
              Tambah Siswa
            </button>
          </div>
        </div>
        
        <div className="siswa-card-body">
          <div className="siswa-table-wrapper">
            <table className="siswa-table">
              <thead className="siswa-table-head">
                <tr>
                  <th>NIS</th>
                  <th>NAMA SISWA</th>
                  <th>KELAS</th>
                  <th>JURUSAN</th>
                  <th>STATUS</th>
                  <th>AKSI</th>
                </tr>
              </thead>
              <tbody className="siswa-table-body">
                {siswaData.map((siswa, index) => (
                  <tr key={index} className="siswa-table-row">
                    <td className="siswa-table-cell">
                      <span className="siswa-nis">{siswa.nis}</span>
                    </td>
                    <td className="siswa-table-cell">
                      <div className="siswa-nama-cell">
                        <div className="siswa-avatar">
                          {siswa.nama.split(' ').map(n => n[0]).join('')}
                        </div>
                        <span className="siswa-nama">{siswa.nama}</span>
                      </div>
                    </td>
                    <td className="siswa-table-cell">
                      <span className="siswa-kelas">{siswa.kelas}</span>
                    </td>
                    <td className="siswa-table-cell">
                      <span className="siswa-jurusan">{siswa.jurusan}</span>
                    </td>
                    <td className="siswa-table-cell">
                      <span className="siswa-status siswa-status-active">{siswa.status}</span>
                    </td>
                    <td className="siswa-table-cell">
                      <div className="siswa-actions">
                        <button className="siswa-action-btn siswa-action-view">
                          <IconEye className="siswa-action-icon" />
                          Detail
                        </button>
                        <button className="siswa-action-btn siswa-action-edit">
                          <IconEdit className="siswa-action-icon" />
                          Edit
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
        <div className="siswa-table-footer">
          <span className="siswa-footer-text">Menampilkan 1-8 dari 21 total siswa</span>
          <div className="siswa-pagination">
            <button className="siswa-page-btn siswa-page-prev" disabled>‹</button>
            <button className="siswa-page-btn siswa-page-active">1</button>
            <button className="siswa-page-btn">2</button>
            <button className="siswa-page-btn">3</button>
            <button className="siswa-page-btn siswa-page-next">›</button>
          </div>
        </div>
      </div>
    </div>
  );
}