"use client";

import { useState } from "react";

/* ─── Icons ─── */
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

function IconAlertCircle({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
      strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  );
}

function IconSend({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
      strokeLinejoin="round" className={className}>
      <path d="m22 2-7 20-4-9-9-4Z" />
      <path d="M22 2 11 13" />
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

export default function SiswaJurnal() {
  const [selectedDate, setSelectedDate] = useState("");
  const [jurnalContent, setJurnalContent] = useState("");
  const [showForm, setShowForm] = useState(false);

  // Mock data jurnal
  const jurnalData = [
    { 
      tanggal: "30 Sep 2024", 
      kegiatan: "Belajar tentang framework React dan implementasi komponennya", 
      status: "Terkirim",
      waktu: "16:30"
    },
    { 
      tanggal: "29 Sep 2024", 
      kegiatan: "Meeting dengan tim development untuk diskusi project", 
      status: "Direvisi",
      waktu: "15:45"
    },
  ];

  const handleSubmitJurnal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate || !jurnalContent.trim()) {
      alert("Mohon isi semua field");
      return;
    }
    
    // Here you would typically send to backend
    console.log("Jurnal submitted:", { date: selectedDate, content: jurnalContent });
    
    // Reset form
    setSelectedDate("");
    setJurnalContent("");
    setShowForm(false);
    
    // Show success message
    alert("Jurnal berhasil dikirim!");
  };

  return (
    <div className="siswa-jurnal-container">
      {/* Header */}
      <div className="siswa-jurnal-header">
        <div className="siswa-jurnal-header-content">
          <div className="siswa-jurnal-header-info">
            <h1 className="siswa-jurnal-title">Validasi Jurnal & Absensi</h1>
            <p className="siswa-jurnal-subtitle">Catat dan validasi kegiatan harian magang Anda</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="siswa-jurnal-stats">
        <div className="siswa-jurnal-stat-card">
          <div className="siswa-jurnal-stat-icon siswa-jurnal-stat-icon-blue">
            <IconCheckCircle className="siswa-jurnal-stat-icon-svg" />
          </div>
          <div className="siswa-jurnal-stat-content">
            <p className="siswa-jurnal-stat-label">PENDIDIKAN SELESAI</p>
            <p className="siswa-jurnal-stat-value">0</p>
            <p className="siswa-jurnal-stat-sub">— Jurnal disetujui</p>
          </div>
        </div>

        <div className="siswa-jurnal-stat-card">
          <div className="siswa-jurnal-stat-icon siswa-jurnal-stat-icon-green">
            <IconSend className="siswa-jurnal-stat-icon-svg" />
          </div>
          <div className="siswa-jurnal-stat-content">
            <p className="siswa-jurnal-stat-label">JURNAL TERKIRIM</p>
            <p className="siswa-jurnal-stat-value">0</p>
            <p className="siswa-jurnal-stat-sub">— Menunggu validasi</p>
          </div>
        </div>

        <div className="siswa-jurnal-stat-card">
          <div className="siswa-jurnal-stat-icon siswa-jurnal-stat-icon-orange">
            <IconAlertCircle className="siswa-jurnal-stat-icon-svg" />
          </div>
          <div className="siswa-jurnal-stat-content">
            <p className="siswa-jurnal-stat-label">JURNAL REVISI</p>
            <p className="siswa-jurnal-stat-value">0</p>
            <p className="siswa-jurnal-stat-sub">— Perlu diperbaiki</p>
          </div>
        </div>
      </div>

      {/* Form Section */}
      <div className="siswa-jurnal-form-section">
        <div className="siswa-jurnal-form-header">
          <h2 className="siswa-jurnal-form-title">Tulis Jurnal Kegiatan</h2>
          <button 
            className="siswa-jurnal-toggle-btn"
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? 'Tutup Form' : 'Buat Jurnal Baru'}
          </button>
        </div>

        {showForm && (
          <form className="siswa-jurnal-form" onSubmit={handleSubmitJurnal}>
            <div className="siswa-jurnal-form-grid">
              <div className="siswa-jurnal-form-group">
                <label className="siswa-jurnal-form-label">Tanggal</label>
                <div className="siswa-jurnal-form-input-wrap">
                  <IconCalendar className="siswa-jurnal-form-input-icon" />
                  <input
                    type="date"
                    className="siswa-jurnal-form-input"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="siswa-jurnal-form-group">
                <label className="siswa-jurnal-form-label">Waktu</label>
                <div className="siswa-jurnal-form-input-wrap">
                  <IconClock className="siswa-jurnal-form-input-icon" />
                  <input
                    type="time"
                    className="siswa-jurnal-form-input"
                    defaultValue={new Date().toTimeString().slice(0, 5)}
                  />
                </div>
              </div>
            </div>

            <div className="siswa-jurnal-form-group">
              <label className="siswa-jurnal-form-label">Kegiatan Hari Ini</label>
              <textarea
                className="siswa-jurnal-form-textarea"
                placeholder="Ceritakan kegiatan magang Anda hari ini secara detail..."
                rows={6}
                value={jurnalContent}
                onChange={(e) => setJurnalContent(e.target.value)}
                required
              />
            </div>

            <div className="siswa-jurnal-form-actions">
              <button
                type="button"
                className="siswa-jurnal-form-btn siswa-jurnal-form-btn-cancel"
                onClick={() => setShowForm(false)}
              >
                Batal
              </button>
              <button
                type="submit"
                className="siswa-jurnal-form-btn siswa-jurnal-form-btn-submit"
              >
                <IconSend className="siswa-jurnal-form-btn-icon" />
                Kirim Jurnal
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Journal History */}
      <div className="siswa-jurnal-history">
        <div className="siswa-jurnal-history-header">
          <h2 className="siswa-jurnal-history-title">Riwayat Jurnal</h2>
          <div className="siswa-jurnal-history-actions">
            <div className="siswa-jurnal-search">
              <IconSearch className="siswa-jurnal-search-icon" />
              <input
                type="text"
                placeholder="Cari jurnal kegiatan..."
                className="siswa-jurnal-search-input"
              />
            </div>
            <select className="siswa-jurnal-filter">
              <option>Semua Status</option>
              <option>Terkirim</option>
              <option>Direvisi</option>
              <option>Disetujui</option>
            </select>
          </div>
        </div>

        <div className="siswa-jurnal-list">
          {jurnalData.length === 0 ? (
            <div className="siswa-jurnal-empty">
              <div className="siswa-jurnal-empty-content">
                <IconFileText className="siswa-jurnal-empty-icon" />
                <h3 className="siswa-jurnal-empty-title">Belum ada jurnal yang dibuat</h3>
                <p className="siswa-jurnal-empty-text">
                  Mulai catat kegiatan harian magang Anda dengan membuat jurnal baru
                </p>
                <button 
                  className="siswa-jurnal-empty-btn"
                  onClick={() => setShowForm(true)}
                >
                  Buat Jurnal Pertama
                </button>
              </div>
            </div>
          ) : (
            <div className="siswa-jurnal-cards">
              {jurnalData.map((jurnal, index) => (
                <div key={index} className="siswa-jurnal-card">
                  <div className="siswa-jurnal-card-header">
                    <div className="siswa-jurnal-card-date">
                      <IconCalendar className="siswa-jurnal-card-date-icon" />
                      <span>{jurnal.tanggal}</span>
                      <span className="siswa-jurnal-card-time">{jurnal.waktu}</span>
                    </div>
                    <div className="siswa-jurnal-card-actions">
                      <span className={`siswa-jurnal-status ${
                        jurnal.status === 'Terkirim' ? 'siswa-jurnal-status-sent' :
                        jurnal.status === 'Direvisi' ? 'siswa-jurnal-status-revision' :
                        'siswa-jurnal-status-approved'
                      }`}>
                        {jurnal.status}
                      </span>
                      <button className="siswa-jurnal-card-edit">
                        <IconEdit />
                      </button>
                    </div>
                  </div>
                  <div className="siswa-jurnal-card-body">
                    <p className="siswa-jurnal-card-content">{jurnal.kegiatan}</p>
                  </div>
                  {jurnal.status === 'Direvisi' && (
                    <div className="siswa-jurnal-card-footer">
                      <div className="siswa-jurnal-revision-note">
                        <IconAlertCircle className="siswa-jurnal-revision-icon" />
                        <span className="siswa-jurnal-revision-text">
                          Perlu perbaikan: Tambahkan detail teknis implementasi
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}