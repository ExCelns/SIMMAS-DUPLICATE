"use client";

import Link from "next/link";

/* ─── Icons ─── */
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

export default function DataDudi() {
  const dudiData = [
    {
      kode: "PT001",
      nama: "PT. Universal Big Data",
      bidangUsaha: "Teknologi Informasi",
      alamat: "Jl. Raya Tasikmalaya No. 123",
      kontak: "021-12345678",
      kapasitas: "10 siswa",
      status: "Terverifikasi"
    },
    {
      kode: "PT002", 
      nama: "PT. Telkom Sidoarjo",
      bidangUsaha: "Telekomunikasi", 
      alamat: "Jl. Surabaya, Sidoarjo",
      kontak: "031-87654321",
      kapasitas: "3 siswa",
      status: "Terverifikasi"
    },
    {
      kode: "PT003",
      nama: "PT. Jaya Giok",
      bidangUsaha: "Perdagangan",
      alamat: "Jl. Brantas No. 456",
      kontak: "0341-11223344",
      kapasitas: "12 siswa", 
      status: "Terverifikasi"
    },
    {
      kode: "PT004",
      nama: "PT. Suka Makmur",
      bidangUsaha: "Manufaktur",
      alamat: "Jl. Industri, Probolinggo",
      kontak: "0335-55667788",
      kapasitas: "10 siswa",
      status: "Terverifikasi"
    }
  ];

  return (
    <div className="dudi-container">
      {/* Stats Cards */}
      <div className="dudi-stats-grid">
        {/* Total DUDI */}
        <div className="dudi-stat-card">
          <div className="dudi-stat-header">
            <div className="dudi-stat-icon-wrap dudi-stat-icon-blue">
              <IconBuilding2 className="dudi-stat-icon" />
            </div>
          </div>
          <p className="dudi-stat-label">TOTAL DUDI</p>
          <p className="dudi-stat-value">5</p>
          <p className="dudi-stat-sub">— Mitra terdaftar</p>
        </div>

        {/* Terverifikasi */}
        <div className="dudi-stat-card">
          <div className="dudi-stat-header">
            <div className="dudi-stat-icon-wrap dudi-stat-icon-green">
              <IconUserCheck className="dudi-stat-icon" />
            </div>
          </div>
          <p className="dudi-stat-label">TERVERIFIKASI</p>
          <p className="dudi-stat-value">4</p>
          <p className="dudi-stat-sub">— Status aktif</p>
        </div>

        {/* Siswa Magang */}
        <div className="dudi-stat-card">
          <div className="dudi-stat-header">
            <div className="dudi-stat-icon-wrap dudi-stat-icon-purple">
              <IconUsers className="dudi-stat-icon" />
            </div>
          </div>
          <p className="dudi-stat-label">SISWA MAGANG</p>
          <p className="dudi-stat-value">1</p>
          <p className="dudi-stat-sub">— Sedang magang</p>
        </div>

        {/* Kapasitas Total */}
        <div className="dudi-stat-card">
          <div className="dudi-stat-header">
            <div className="dudi-stat-icon-wrap dudi-stat-icon-orange">
              <IconClock className="dudi-stat-icon" />
            </div>
          </div>
          <p className="dudi-stat-label">KAPASITAS TOTAL</p>
          <p className="dudi-stat-value">13</p>
          <p className="dudi-stat-sub">— Total kapasitas</p>
        </div>
      </div>

      {/* Data DUDI Table */}
      <div className="dudi-card">
        <div className="dudi-card-header">
          <div>
            <h3 className="dudi-card-title">Data DUDI</h3>
            <p className="dudi-card-subtitle">Kelola informasi mitra industri dan kapasitas magang</p>
          </div>
          <div className="dudi-header-actions">
            <div className="dudi-search-box">
              <IconSearch className="dudi-search-icon" />
              <input type="text" placeholder="Cari DUDI..." className="dudi-search-input" />
            </div>
            <select className="dudi-filter-select">
              <option>Semua Bidang</option>
              <option>Teknologi Informasi</option>
              <option>Telekomunikasi</option>
              <option>Perdagangan</option>
              <option>Manufaktur</option>
            </select>
            <select className="dudi-filter-select">
              <option>Semua Status</option>
              <option>Terverifikasi</option>
              <option>Menunggu Verifikasi</option>
            </select>
            <button className="dudi-add-btn">
              <IconPlus className="dudi-add-icon" />
              Tambah DUDI
            </button>
          </div>
        </div>
        
        <div className="dudi-card-body">
          <div className="dudi-table-wrapper">
            <table className="dudi-table">
              <thead className="dudi-table-head">
                <tr>
                  <th>KODE</th>
                  <th>NAMA PERUSAHAAN</th>
                  <th>BIDANG USAHA</th>
                  <th>ALAMAT</th>
                  <th>KONTAK</th>
                  <th>KAPASITAS</th>
                  <th>STATUS</th>
                  <th>AKSI</th>
                </tr>
              </thead>
              <tbody className="dudi-table-body">
                {dudiData.map((dudi, index) => (
                  <tr key={index} className="dudi-table-row">
                    <td className="dudi-table-cell">
                      <span className="dudi-kode">{dudi.kode}</span>
                    </td>
                    <td className="dudi-table-cell">
                      <div className="dudi-nama-cell">
                        <div className="dudi-avatar">
                          {dudi.nama.split(' ')[1]?.[0] || dudi.nama[0]}{dudi.nama.split(' ')[2]?.[0] || dudi.nama[1] || ''}
                        </div>
                        <div className="dudi-nama-info">
                          <span className="dudi-nama">{dudi.nama}</span>
                        </div>
                      </div>
                    </td>
                    <td className="dudi-table-cell">
                      <span className="dudi-bidang">{dudi.bidangUsaha}</span>
                    </td>
                    <td className="dudi-table-cell">
                      <span className="dudi-alamat">{dudi.alamat}</span>
                    </td>
                    <td className="dudi-table-cell">
                      <span className="dudi-kontak">{dudi.kontak}</span>
                    </td>
                    <td className="dudi-table-cell">
                      <span className="dudi-kapasitas">{dudi.kapasitas}</span>
                    </td>
                    <td className="dudi-table-cell">
                      <span className="dudi-status dudi-status-verified">{dudi.status}</span>
                    </td>
                    <td className="dudi-table-cell">
                      <div className="dudi-actions">
                        <button className="dudi-action-btn dudi-action-view">
                          <IconEye className="dudi-action-icon" />
                          Detail
                        </button>
                        <button className="dudi-action-btn dudi-action-edit">
                          <IconEdit className="dudi-action-icon" />
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
        <div className="dudi-table-footer">
          <span className="dudi-footer-text">Menampilkan 1-4 dari 5 total DUDI</span>
          <div className="dudi-pagination">
            <button className="dudi-page-btn dudi-page-prev" disabled>‹</button>
            <button className="dudi-page-btn dudi-page-active">1</button>
            <button className="dudi-page-btn dudi-page-next">›</button>
          </div>
        </div>
      </div>
    </div>
  );
}