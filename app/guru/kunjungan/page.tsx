"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { createPortal } from "react-dom";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

/* ─── Icons ─── */
function IconMapPin({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
      strokeLinejoin="round" className={className}>
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function IconCalendar({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
      strokeLinejoin="round" className={className}>
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
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

function IconSearch({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
      strokeLinejoin="round" className={className}>
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

function IconPlus({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
      strokeLinejoin="round" className={className}>
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  );
}

function IconX({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
      strokeLinejoin="round" className={className}>
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}

function IconUpload({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
      strokeLinejoin="round" className={className}>
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" y1="3" x2="12" y2="15" />
    </svg>
  );
}

interface KunjunganStats {
  total: number;
  bulanIni: number;
  dudiDikunjungi: number;
}

interface Kunjungan {
  id: string;
  dudi_nama: string;
  catatan: string;
  tanggal: string;
}

interface Dudi {
  id: string;
  nama: string;
}

export default function GuruKunjungan() {
  const [stats, setStats] = useState<KunjunganStats>({
    total: 0,
    bulanIni: 0,
    dudiDikunjungi: 0,
  });
  const [kunjunganList, setKunjunganList] = useState<Kunjungan[]>([]);
  const [dudiList, setDudiList] = useState<Dudi[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    dudi_id: "",
    tanggal: new Date().toISOString().split("T")[0],
    catatan: "",
    foto: null as File | null,
  });

  useEffect(() => {
    fetchData();
    fetchDudiList();
  }, []);

  useEffect(() => {
    // Add blur effect to sidebar and header when modal is open
    if (showModal) {
      document.body.classList.add("modal-open-blur");
    } else {
      document.body.classList.remove("modal-open-blur");
    }

    // Cleanup on unmount
    return () => {
      document.body.classList.remove("modal-open-blur");
    };
  }, [showModal]);

  const fetchDudiList = async () => {
    try {
      const { data: dudiData } = await supabase
        .from("dudi")
        .select("id, nama")
        .order("nama");

      if (dudiData) {
        setDudiList(dudiData);
      }
    } catch (error) {
      console.error("Error fetching DUDI list:", error);
    }
  };

  const fetchData = async () => {
    try {
      setLoading(true);

      // Get guru data
      const userData = localStorage.getItem("simmas_user");
      if (!userData) return;

      const user = JSON.parse(userData);
      const userId = user.userId || user.id;

      const { data: guruData } = await supabase
        .from("guru")
        .select("id")
        .eq("user_id", userId)
        .single();

      if (!guruData) return;

      // Fetch kunjungan data
      const { data: kunjunganData } = await supabase
        .from("kunjungan")
        .select(`
          id,
          tanggal,
          catatan,
          dudi:dudi_id (
            nama
          )
        `)
        .eq("guru_id", guruData.id)
        .order("tanggal", { ascending: false });

      if (kunjunganData) {
        // Map data
        const mapped: Kunjungan[] = kunjunganData.map((k: any) => ({
          id: k.id,
          dudi_nama: k.dudi?.nama || "N/A",
          catatan: k.catatan || "",
          tanggal: k.tanggal,
        }));

        setKunjunganList(mapped);

        // Calculate stats
        const total = kunjunganData.length;
        
        // Bulan ini
        const now = new Date();
        const thisMonth = kunjunganData.filter((k: any) => {
          const kDate = new Date(k.tanggal);
          return kDate.getMonth() === now.getMonth() && kDate.getFullYear() === now.getFullYear();
        }).length;

        // DUDI unik
        const uniqueDudi = new Set(kunjunganData.map((k: any) => k.dudi_id)).size;

        setStats({
          total,
          bulanIni: thisMonth,
          dudiDikunjungi: uniqueDudi,
        });
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const months = [
      "Januari", "Februari", "Maret", "April", "Mei", "Juni",
      "Juli", "Agustus", "September", "Oktober", "November", "Desember"
    ];
    return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
  };

  const filteredKunjungan = kunjunganList.filter((k) =>
    k.dudi_nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
    k.catatan.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.dudi_id || !formData.tanggal || !formData.catatan) {
      alert("Mohon lengkapi semua field yang wajib diisi!");
      return;
    }

    try {
      setSubmitting(true);

      // Get guru data
      const userData = localStorage.getItem("simmas_user");
      if (!userData) return;

      const user = JSON.parse(userData);
      const userId = user.userId || user.id;

      const { data: guruData } = await supabase
        .from("guru")
        .select("id")
        .eq("user_id", userId)
        .single();

      if (!guruData) return;

      // Insert kunjungan
      const { error } = await supabase
        .from("kunjungan")
        .insert({
          guru_id: guruData.id,
          dudi_id: formData.dudi_id,
          tanggal: formData.tanggal,
          catatan: formData.catatan,
        });

      if (error) {
        console.error("Error inserting kunjungan:", error);
        alert("Gagal menyimpan kunjungan!");
        return;
      }

      // TODO: Upload foto if exists (will implement storage later)

      // Reset form and close modal
      setFormData({
        dudi_id: "",
        tanggal: new Date().toISOString().split("T")[0],
        catatan: "",
        foto: null,
      });
      setShowModal(false);

      // Refresh data
      fetchData();
      
      alert("Kunjungan berhasil disimpan!");
    } catch (error) {
      console.error("Error:", error);
      alert("Terjadi kesalahan!");
    } finally {
      setSubmitting(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, foto: e.target.files[0] });
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFormData({ ...formData, foto: e.dataTransfer.files[0] });
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <div className="db-container db-animate-in">
      {/* Header */}
      <div className="kunjungan-header">
        <div className="kunjungan-header-icon">
          <IconMapPin className="kunjungan-icon" />
        </div>
        <h1 className="kunjungan-title">Kunjungan Lapangan</h1>
      </div>

      {/* Stats Cards */}
      <div className="kunjungan-stats">
        {/* Total Kunjungan */}
        <div className="kunjungan-stat-card">
          <div className="kunjungan-stat-header">
            <span className="kunjungan-stat-label">TOTAL KUNJUNGAN</span>
            <div className="kunjungan-stat-icon kunjungan-stat-icon-blue">
              <IconMapPin style={{ width: '20px', height: '20px' }} />
            </div>
          </div>
          <div className="kunjungan-stat-body">
            <p className="kunjungan-stat-value">{stats.total}</p>
            <p className="kunjungan-stat-desc">Seluruh riwayat tercatat</p>
          </div>
        </div>

        {/* Bulan Ini */}
        <div className="kunjungan-stat-card">
          <div className="kunjungan-stat-header">
            <span className="kunjungan-stat-label">BULAN INI</span>
            <div className="kunjungan-stat-icon kunjungan-stat-icon-orange">
              <IconCalendar />
            </div>
          </div>
          <div className="kunjungan-stat-body">
            <p className="kunjungan-stat-value">{stats.bulanIni}</p>
            <p className="kunjungan-stat-desc">Kunjungan periode berjalan</p>
          </div>
        </div>

        {/* DUDI Dikunjungi */}
        <div className="kunjungan-stat-card">
          <div className="kunjungan-stat-header">
            <span className="kunjungan-stat-label">DUDI DIKUNJUNGI</span>
            <div className="kunjungan-stat-icon kunjungan-stat-icon-green">
              <IconBuilding style={{ width: '20px', height: '20px' }} />
            </div>
          </div>
          <div className="kunjungan-stat-body">
            <p className="kunjungan-stat-value">{stats.dudiDikunjungi}</p>
            <p className="kunjungan-stat-desc">Mitra industri unik</p>
          </div>
        </div>
      </div>

      {/* Search & Add Button */}
      <div className="kunjungan-toolbar">
        <div style={{ position: 'relative', flex: 1, minWidth: '280px' }}>
          <div style={{ 
            position: 'absolute', 
            left: '1rem', 
            top: '50%', 
            transform: 'translateY(-50%)',
            pointerEvents: 'none',
            color: '#9ca3af',
            display: 'flex',
            alignItems: 'center',
            zIndex: 10
          }}>
            <IconSearch style={{ width: '18px', height: '18px' }} />
          </div>
          <input
            type="text"
            className="kunjungan-search-input"
            placeholder="Cari DUDI atau catatan"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ 
              width: '100%',
              padding: '0.75rem 1rem 0.75rem 2.75rem',
              fontSize: '0.875rem',
              color: '#111827',
              background: 'white',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              outline: 'none'
            }}
          />
        </div>
        <div className="kunjungan-toolbar-right">
          <span className="kunjungan-count">{filteredKunjungan.length} Kunjungan</span>
          <button className="kunjungan-add-btn" onClick={() => setShowModal(true)}>
            <IconPlus />
            Tambah Kunjungan
          </button>
        </div>
      </div>

      {/* Kunjungan List */}
      <div className="kunjungan-list">
        {filteredKunjungan.length === 0 ? (
          <div className="kunjungan-empty">
            <p className="kunjungan-empty-text">Tidak ada kunjungan yang sesuai dengan kriteria.</p>
          </div>
        ) : (
          filteredKunjungan.map((kunjungan) => (
            <div key={kunjungan.id} className="kunjungan-item">
              <div className="kunjungan-item-icon">
                <IconBuilding style={{ width: '20px', height: '20px' }} />
              </div>
              <div className="kunjungan-item-content">
                <h3 className="kunjungan-item-title">{kunjungan.dudi_nama}</h3>
                <p className="kunjungan-item-desc">{kunjungan.catatan}</p>
              </div>
              <div className="kunjungan-item-date">
                <IconCalendar style={{ width: '14px', height: '14px' }} />
                <span>{formatDate(kunjungan.tanggal)}</span>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal Input Kunjungan */}
      {showModal && typeof window !== 'undefined' && createPortal(
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            {/* Modal Header */}
            <div className="modal-header">
              <div className="modal-header-left">
                <div className="modal-icon">
                  <IconMapPin style={{ width: '24px', height: '24px' }} />
                </div>
                <div className="modal-header-text">
                  <h2 className="modal-title">Input Kunjungan Lapangan</h2>
                  <p className="modal-subtitle">Catat riwayat kunjungan monitoring Anda ke tempat industri (DUDI).</p>
                </div>
              </div>
              <button className="modal-close" onClick={() => setShowModal(false)}>
                <IconX />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSubmit} className="modal-form">
              {/* Nama DUDI */}
              <div className="form-group">
                <label className="form-label">Nama DUDI</label>
                <select
                  className="form-select"
                  value={formData.dudi_id}
                  onChange={(e) => setFormData({ ...formData, dudi_id: e.target.value })}
                  required
                >
                  <option value="">Pilih tempat industri (DUDI)</option>
                  {dudiList.map((dudi) => (
                    <option key={dudi.id} value={dudi.id}>
                      {dudi.nama}
                    </option>
                  ))}
                </select>
              </div>

              {/* Tanggal Kunjungan */}
              <div className="form-group">
                <label className="form-label">Tanggal Kunjungan</label>
                <input
                  type="date"
                  className="form-input"
                  value={formData.tanggal}
                  onChange={(e) => setFormData({ ...formData, tanggal: e.target.value })}
                  required
                />
              </div>

              {/* Catatan / Hasil Evaluasi */}
              <div className="form-group">
                <label className="form-label">Catatan / Hasil Evaluasi</label>
                <textarea
                  className="form-textarea"
                  placeholder="Bagaimana perkembangan siswa? Adakah kendala di industri?"
                  rows={4}
                  value={formData.catatan}
                  onChange={(e) => setFormData({ ...formData, catatan: e.target.value })}
                  required
                />
              </div>

              {/* Foto Dokumentasi */}
              <div className="form-group">
                <label className="form-label">Foto Dokumentasi (Opsional)</label>
                <div
                  className="upload-area"
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onClick={() => document.getElementById('file-input')?.click()}
                >
                  <IconUpload className="upload-icon" />
                  <p className="upload-text">
                    {formData.foto ? formData.foto.name : "Klik untuk upload atau drag and drop foto"}
                  </p>
                  <input
                    id="file-input"
                    type="file"
                    accept="image/*"
                    style={{ display: 'none' }}
                    onChange={handleFileChange}
                  />
                </div>
              </div>

              {/* Modal Footer */}
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn-cancel"
                  onClick={() => setShowModal(false)}
                  disabled={submitting}
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="btn-submit"
                  disabled={submitting}
                >
                  {submitting ? "Menyimpan..." : "Simpan Kunjungan"}
                </button>
              </div>
            </form>
          </div>
        </div>,
        document.body
      )}

      <style jsx>{`
        .kunjungan-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 2rem;
        }

        .kunjungan-header-icon {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
        }

        .kunjungan-icon {
          width: 28px;
          height: 28px;
        }

        .kunjungan-title {
          font-size: 1.75rem;
          font-weight: 700;
          color: #111827;
          margin: 0;
        }

        .kunjungan-stats {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        .kunjungan-stat-card {
          background: white;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          padding: 1.5rem;
          transition: all 0.2s;
        }

        .kunjungan-stat-card:hover {
          border-color: #3b82f6;
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.1);
          transform: translateY(-2px);
        }

        .kunjungan-stat-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }

        .kunjungan-stat-label {
          font-size: 0.75rem;
          font-weight: 600;
          color: #6b7280;
          letter-spacing: 0.05em;
        }

        .kunjungan-stat-icon {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .kunjungan-stat-icon-blue {
          background: #dbeafe;
          color: #3b82f6;
        }

        .kunjungan-stat-icon-orange {
          background: #fed7aa;
          color: #f97316;
        }

        .kunjungan-stat-icon-green {
          background: #d1fae5;
          color: #10b981;
        }

        .kunjungan-stat-body {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .kunjungan-stat-value {
          font-size: 2.5rem;
          font-weight: 700;
          color: #111827;
          line-height: 1;
          margin: 0;
        }

        .kunjungan-stat-desc {
          font-size: 0.875rem;
          color: #6b7280;
          margin: 0;
        }

        .kunjungan-toolbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          margin-bottom: 1.5rem;
          flex-wrap: wrap;
        }

        .kunjungan-search-box {
          position: relative;
          flex: 1;
          min-width: 280px;
          display: block;
        }

        .kunjungan-search-icon {
          position: absolute;
          left: 1rem;
          top: 50%;
          transform: translateY(-50%);
          color: #9ca3af;
          pointer-events: none;
          z-index: 1;
          width: 18px;
          height: 18px;
        }

        .kunjungan-search-input {
          width: 100%;
          padding: 0.75rem 1rem 0.75rem 2.75rem;
          font-size: 0.875rem;
          color: #111827;
          background: white;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          outline: none;
          transition: all 0.2s;
          display: block;
        }

        .kunjungan-search-input::placeholder {
          color: #9ca3af;
        }

        .kunjungan-search-input:focus {
          border-color: #3b82f6;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.05);
        }

        .kunjungan-toolbar-right {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .kunjungan-count {
          font-size: 0.875rem;
          color: #6b7280;
          font-weight: 500;
        }

        .kunjungan-add-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.25rem;
          font-size: 0.875rem;
          font-weight: 600;
          color: white;
          background: #3b82f6;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s;
        }

        .kunjungan-add-btn:hover {
          background: #2563eb;
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
        }

        .kunjungan-list {
          display: flex;
          flex-direction: column;
          gap: 0;
          background: white;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          overflow: hidden;
        }

        .kunjungan-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1.25rem 1.5rem;
          border-bottom: 1px solid #f3f4f6;
          border-left: 3px solid transparent;
          transition: all 0.2s;
          position: relative;
        }

        .kunjungan-item:last-child {
          border-bottom: none;
        }

        .kunjungan-item:hover {
          background: #f9fafb;
          border-left-color: #3b82f6;
        }

        .kunjungan-item-icon {
          width: 40px;
          height: 40px;
          border-radius: 8px;
          background: #eff6ff;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #3b82f6;
          flex-shrink: 0;
        }

        .kunjungan-item-content {
          flex: 1;
          min-width: 0;
        }

        .kunjungan-item-title {
          font-size: 0.9375rem;
          font-weight: 600;
          color: #111827;
          margin: 0 0 0.375rem 0;
        }

        .kunjungan-item-desc {
          font-size: 0.8125rem;
          color: #6b7280;
          margin: 0;
          line-height: 1.4;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .kunjungan-item-date {
          display: flex;
          align-items: center;
          gap: 0.375rem;
          padding: 0.375rem 0.75rem;
          background: transparent;
          border-radius: 6px;
          font-size: 0.75rem;
          color: #6b7280;
          flex-shrink: 0;
        }

        .kunjungan-empty {
          padding: 4rem 2rem;
          text-align: center;
        }

        .kunjungan-empty-text {
          font-size: 0.9375rem;
          color: #6b7280;
          margin: 0;
        }

        /* Modal Styles */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.4);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 1rem;
          animation: fadeIn 0.2s ease-out;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .modal-content {
          background: white;
          border-radius: 12px;
          width: 100%;
          max-width: 560px;
          max-height: 85vh;
          overflow-y: auto;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
          animation: slideUp 0.3s ease-out;
        }

        .modal-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          padding: 1.5rem 1.5rem 1rem 1.5rem;
          border-bottom: 1px solid #f3f4f6;
        }

        .modal-header-left {
          display: flex;
          align-items: flex-start;
          gap: 0.875rem;
          flex: 1;
        }

        .modal-icon {
          width: 48px;
          height: 48px;
          border-radius: 10px;
          background: #fee2e2;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #ef4444;
          flex-shrink: 0;
        }

        .modal-header-text {
          flex: 1;
        }

        .modal-title {
          font-size: 1.125rem;
          font-weight: 700;
          color: #111827;
          margin: 0 0 0.375rem 0;
        }

        .modal-subtitle {
          font-size: 0.8125rem;
          color: #6b7280;
          margin: 0;
          line-height: 1.4;
        }

        .modal-close {
          width: 36px;
          height: 36px;
          border-radius: 6px;
          background: transparent;
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #6b7280;
          cursor: pointer;
          transition: all 0.2s;
          flex-shrink: 0;
        }

        .modal-close:hover {
          background: #f3f4f6;
          color: #111827;
        }

        .modal-form {
          padding: 1.5rem;
        }

        .form-group {
          margin-bottom: 1.25rem;
        }

        .form-group:last-of-type {
          margin-bottom: 0;
        }

        .form-label {
          display: block;
          font-size: 0.8125rem;
          font-weight: 600;
          color: #111827;
          margin-bottom: 0.5rem;
        }

        .form-input,
        .form-select {
          width: 100%;
          padding: 0.625rem 0.875rem;
          font-size: 0.875rem;
          color: #111827;
          background: white;
          border: 1px solid #d1d5db;
          border-radius: 8px;
          outline: none;
          transition: all 0.2s;
        }

        .form-input:focus,
        .form-select:focus {
          border-color: #3b82f6;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.08);
        }

        .form-select {
          cursor: pointer;
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='%236b7280' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 0.75rem center;
          background-size: 18px;
          padding-right: 2.5rem;
        }

        .form-textarea {
          width: 100%;
          padding: 0.625rem 0.875rem;
          font-size: 0.875rem;
          color: #111827;
          background: white;
          border: 1px solid #d1d5db;
          border-radius: 8px;
          outline: none;
          transition: all 0.2s;
          resize: vertical;
          font-family: inherit;
          min-height: 80px;
        }

        .form-textarea:focus {
          border-color: #3b82f6;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.08);
        }

        .form-textarea::placeholder {
          color: #9ca3af;
        }

        .upload-area {
          border: 2px dashed #d1d5db;
          border-radius: 8px;
          padding: 2rem 1rem;
          text-align: center;
          cursor: pointer;
          transition: all 0.2s;
          background: #f9fafb;
        }

        .upload-area:hover {
          border-color: #3b82f6;
          background: #eff6ff;
        }

        .upload-icon {
          color: #9ca3af;
          margin: 0 auto 0.5rem;
        }

        .upload-text {
          font-size: 0.8125rem;
          color: #6b7280;
          margin: 0;
        }

        .modal-footer {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 0.75rem;
          padding-top: 1.25rem;
          margin-top: 1.25rem;
          border-top: 1px solid #f3f4f6;
        }

        .btn-cancel,
        .btn-submit {
          padding: 0.625rem 1.25rem;
          font-size: 0.875rem;
          font-weight: 600;
          border-radius: 8px;
          border: none;
          cursor: pointer;
          transition: all 0.2s;
        }

        .btn-cancel {
          background: white;
          color: #6b7280;
          border: 1px solid #d1d5db;
        }

        .btn-cancel:hover:not(:disabled) {
          background: #f9fafb;
          color: #111827;
          border-color: #9ca3af;
        }

        .btn-submit {
          background: #3b82f6;
          color: white;
        }

        .btn-submit:hover:not(:disabled) {
          background: #2563eb;
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.25);
        }

        .btn-cancel:disabled,
        .btn-submit:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        @media (max-width: 768px) {
          .kunjungan-stats {
            grid-template-columns: 1fr;
          }

          .kunjungan-stat-value {
            font-size: 2rem;
          }

          .kunjungan-toolbar {
            flex-direction: column;
            align-items: stretch;
          }

          .kunjungan-search-box {
            min-width: 100%;
          }

          .kunjungan-toolbar-right {
            justify-content: space-between;
          }

          .kunjungan-card {
            flex-direction: column;
          }

          .kunjungan-card-date {
            align-self: flex-start;
          }

          .kunjungan-item {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.75rem;
          }

          .kunjungan-item-date {
            align-self: flex-start;
          }

          .modal-content {
            max-height: 95vh;
          }

          .modal-header {
            padding: 1.5rem;
          }

          .modal-icon {
            width: 48px;
            height: 48px;
          }

          .modal-title {
            font-size: 1.125rem;
          }

          .modal-form {
            padding: 1.5rem;
          }

          .modal-footer {
            flex-direction: column;
          }

          .btn-cancel,
          .btn-submit {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}
