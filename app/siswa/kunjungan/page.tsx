"use client";

import { useState } from "react";

/* ─── Icons ─── */
function IconMapPin({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
      strokeLinejoin="round" className={className}>
      <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
      <circle cx="12" cy="10" r="3" />
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

function IconPlusCircle({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
      strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="10" />
      <path d="M8 12h8" />
      <path d="M12 8v8" />
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

function IconEdit({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
      strokeLinejoin="round" className={className}>
      <path d="M7 7h10v10" />
      <path d="M7 17 17 7" />
    </svg>
  );
}

function IconSearch({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
      strokeLinejoin="round" className={className}>
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

export default function SiswaKunjungan() {
  const [showAddForm, setShowAddForm] = useState(false);

  // Mock data kunjungan
  const kunjunganData = [
    {
      id: 1,
      tempat: "PT. Universal Big Data",
      tanggal: "15 Oktober 2024",
      waktu: "10:00 - 12:00",
      pembimbing: "Drs. H. Rudi Santoso, M.Kom",
      status: "Akan Datang",
      alamat: "Jl. Teknologi No. 123, Jakarta Selatan",
      agenda: "Monitoring dan evaluasi kegiatan magang siswa",
      catatan: "-"
    },
    {
      id: 2,
      tempat: "PT. Universal Big Data",
      tanggal: "1 Oktober 2024",
      waktu: "09:00 - 11:30",
      pembimbing: "Drs. H. Rudi Santoso, M.Kom",
      status: "Selesai",
      alamat: "Jl. Teknologi No. 123, Jakarta Selatan",
      agenda: "Kunjungan awal dan orientasi tempat magang",
      catatan: "Kunjungan berjalan lancar, siswa diterima dengan baik"
    }
  ];

  return (
    <div className="siswa-kunjungan-container">
      {/* Header */}
      <div className="siswa-kunjungan-header">
        <div className="siswa-kunjungan-header-content">
          <div className="siswa-kunjungan-header-info">
            <h1 className="siswa-kunjungan-title">Kunjungan Lapangan</h1>
            <p className="siswa-kunjungan-subtitle">Jadwal kunjungan ke tempat magang dan monitoring</p>
          </div>
          <button 
            className="siswa-kunjungan-add-btn"
            onClick={() => setShowAddForm(true)}
          >
            <IconPlusCircle className="siswa-kunjungan-add-icon" />
            Tambah Kunjungan Baru
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="siswa-kunjungan-stats">
        <div className="siswa-kunjungan-stat-card">
          <div className="siswa-kunjungan-stat-icon siswa-kunjungan-stat-icon-blue">
            <IconMapPin className="siswa-kunjungan-stat-icon-svg" />
          </div>
          <div className="siswa-kunjungan-stat-content">
            <p className="siswa-kunjungan-stat-label">TOTAL KUNJUNGAN</p>
            <p className="siswa-kunjungan-stat-value">2</p>
            <p className="siswa-kunjungan-stat-sub">— Kunjungan terjadwal</p>
          </div>
        </div>

        <div className="siswa-kunjungan-stat-card">
          <div className="siswa-kunjungan-stat-icon siswa-kunjungan-stat-icon-green">
            <IconCheckCircle className="siswa-kunjungan-stat-icon-svg" />
          </div>
          <div className="siswa-kunjungan-stat-content">
            <p className="siswa-kunjungan-stat-label">SELESAI</p>
            <p className="siswa-kunjungan-stat-value">1</p>
            <p className="siswa-kunjungan-stat-sub">— Kunjungan selesai</p>
          </div>
        </div>

        <div className="siswa-kunjungan-stat-card">
          <div className="siswa-kunjungan-stat-icon siswa-kunjungan-stat-icon-orange">
            <IconClock className="siswa-kunjungan-stat-icon-svg" />
          </div>
          <div className="siswa-kunjungan-stat-content">
            <p className="siswa-kunjungan-stat-label">AKAN DATANG</p>
            <p className="siswa-kunjungan-stat-value">1</p>
            <p className="siswa-kunjungan-stat-sub">— Kunjungan mendatang</p>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="siswa-kunjungan-controls">
        <div className="siswa-kunjungan-search">
          <IconSearch className="siswa-kunjungan-search-icon" />
          <input
            type="text"
            placeholder="Cari kunjungan atau tempat..."
            className="siswa-kunjungan-search-input"
          />
        </div>
        <select className="siswa-kunjungan-filter">
          <option>Semua Status</option>
          <option>Akan Datang</option>
          <option>Selesai</option>
          <option>Dibatalkan</option>
        </select>
      </div>

      {/* Kunjungan List */}
      <div className="siswa-kunjungan-list">
        {kunjunganData.length === 0 ? (
          <div className="siswa-kunjungan-empty">
            <div className="siswa-kunjungan-empty-content">
              <IconMapPin className="siswa-kunjungan-empty-icon" />
              <h3 className="siswa-kunjungan-empty-title">Belum ada kunjungan terjadwal</h3>
              <p className="siswa-kunjungan-empty-text">
                Tambahkan jadwal kunjungan ke tempat magang Anda
              </p>
              <button 
                className="siswa-kunjungan-empty-btn"
                onClick={() => setShowAddForm(true)}
              >
                Tambah Kunjungan
              </button>
            </div>
          </div>
        ) : (
          <div className="siswa-kunjungan-cards">
            {kunjunganData.map((kunjungan) => (
              <div key={kunjungan.id} className="siswa-kunjungan-card">
                <div className="siswa-kunjungan-card-header">
                  <div className="siswa-kunjungan-card-info">
                    <h3 className="siswa-kunjungan-card-title">{kunjungan.tempat}</h3>
                    <div className="siswa-kunjungan-card-datetime">
                      <div className="siswa-kunjungan-card-date">
                        <IconCalendar className="siswa-kunjungan-card-date-icon" />
                        <span>{kunjungan.tanggal}</span>
                      </div>
                      <div className="siswa-kunjungan-card-time">
                        <IconClock className="siswa-kunjungan-card-time-icon" />
                        <span>{kunjungan.waktu}</span>
                      </div>
                    </div>
                  </div>
                  <div className="siswa-kunjungan-card-actions">
                    <span className={`siswa-kunjungan-status ${
                      kunjungan.status === 'Selesai' ? 'siswa-kunjungan-status-done' :
                      kunjungan.status === 'Akan Datang' ? 'siswa-kunjungan-status-upcoming' :
                      'siswa-kunjungan-status-cancelled'
                    }`}>
                      {kunjungan.status}
                    </span>
                    <button className="siswa-kunjungan-card-edit">
                      <IconEdit />
                    </button>
                  </div>
                </div>

                <div className="siswa-kunjungan-card-body">
                  <div className="siswa-kunjungan-card-details">
                    {/* Pembimbing */}
                    <div className="siswa-kunjungan-detail-item">
                      <div className="siswa-kunjungan-detail-icon">
                        <IconUser className="siswa-kunjungan-detail-icon-svg" />
                      </div>
                      <div className="siswa-kunjungan-detail-content">
                        <p className="siswa-kunjungan-detail-label">Pembimbing</p>
                        <p className="siswa-kunjungan-detail-value">{kunjungan.pembimbing}</p>
                      </div>
                    </div>

                    {/* Alamat */}
                    <div className="siswa-kunjungan-detail-item">
                      <div className="siswa-kunjungan-detail-icon">
                        <IconMapPin className="siswa-kunjungan-detail-icon-svg" />
                      </div>
                      <div className="siswa-kunjungan-detail-content">
                        <p className="siswa-kunjungan-detail-label">Alamat</p>
                        <p className="siswa-kunjungan-detail-value">{kunjungan.alamat}</p>
                      </div>
                    </div>

                    {/* Agenda */}
                    <div className="siswa-kunjungan-detail-item">
                      <div className="siswa-kunjungan-detail-icon">
                        <IconBuilding className="siswa-kunjungan-detail-icon-svg" />
                      </div>
                      <div className="siswa-kunjungan-detail-content">
                        <p className="siswa-kunjungan-detail-label">Agenda</p>
                        <p className="siswa-kunjungan-detail-value">{kunjungan.agenda}</p>
                      </div>
                    </div>

                    {/* Catatan (hanya jika ada) */}
                    {kunjungan.catatan !== '-' && (
                      <div className="siswa-kunjungan-detail-item siswa-kunjungan-detail-note">
                        <div className="siswa-kunjungan-detail-content">
                          <p className="siswa-kunjungan-detail-label">Catatan</p>
                          <p className="siswa-kunjungan-detail-value">{kunjungan.catatan}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add Form Modal (basic placeholder) */}
      {showAddForm && (
        <div className="siswa-kunjungan-modal-overlay" onClick={() => setShowAddForm(false)}>
          <div className="siswa-kunjungan-modal" onClick={(e) => e.stopPropagation()}>
            <div className="siswa-kunjungan-modal-header">
              <h3 className="siswa-kunjungan-modal-title">Tambah Kunjungan Baru</h3>
              <button 
                className="siswa-kunjungan-modal-close"
                onClick={() => setShowAddForm(false)}
              >
                ×
              </button>
            </div>
            <div className="siswa-kunjungan-modal-body">
              <p className="siswa-kunjungan-modal-text">
                Fitur tambah kunjungan akan segera tersedia. 
                Untuk saat ini, hubungi pembimbing untuk menambahkan jadwal kunjungan.
              </p>
            </div>
            <div className="siswa-kunjungan-modal-footer">
              <button 
                className="siswa-kunjungan-modal-btn"
                onClick={() => setShowAddForm(false)}
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}