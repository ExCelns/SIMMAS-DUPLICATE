"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

/* ─── Icons ─── */
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

function IconTrash({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
      strokeLinejoin="round" className={className}>
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
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

interface Guru {
  id: string;
  user_id: string;
  nip: string;
  nama: string;
  mata_pelajaran: string | null;
  kontak: string | null;
  status: string;
  alamat: string | null;
  hobi: string | null;
  siswa_count?: number;
}

export default function DataGuru() {
  const [guruList, setGuruList] = useState<Guru[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showModal, setShowModal] = useState(false);
  const [editingGuru, setEditingGuru] = useState<Guru | null>(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Form state
  const [formData, setFormData] = useState({
    nip: "",
    nama: "",
    mata_pelajaran: "",
    kontak: "",
    alamat: "",
    hobi: "",
    email: "",
    status: "aktif",
  });

  // Stats
  const [stats, setStats] = useState({
    total: 0,
    aktif: 0,
    totalSiswa: 0,
  });

  useEffect(() => {
    loadGuru();
  }, []);

  // Load guru from database
  async function loadGuru() {
    try {
      setLoading(true);
      
      // Get guru with siswa count
      const { data, error } = await supabase
        .from("guru")
        .select(`
          *,
          siswa_count:siswa(count)
        `)
        .order("nama", { ascending: true });

      if (error) throw error;

      const guruWithCount = (data || []).map((g: any) => ({
        ...g,
        siswa_count: g.siswa_count?.[0]?.count || 0,
      }));

      setGuruList(guruWithCount);

      // Calculate stats
      const totalGuru = guruWithCount.length;
      const aktifGuru = guruWithCount.filter((g: Guru) => g.status === "aktif").length;
      const totalSiswa = guruWithCount.reduce((sum: number, g: any) => sum + (g.siswa_count || 0), 0);

      setStats({
        total: totalGuru,
        aktif: aktifGuru,
        totalSiswa,
      });
    } catch (err) {
      console.error("Error loading guru:", err);
      setError("Gagal memuat data guru");
    } finally {
      setLoading(false);
    }
  }

  // Filter guru
  const filteredGuru = guruList.filter((guru) => {
    const matchSearch =
      guru.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
      guru.nip.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = statusFilter === "all" || guru.status === statusFilter;
    return matchSearch && matchStatus;
  });

  // Open modal
  function openModal(guru?: Guru) {
    if (guru) {
      setEditingGuru(guru);
      setFormData({
        nip: guru.nip,
        nama: guru.nama,
        mata_pelajaran: guru.mata_pelajaran || "",
        kontak: guru.kontak || "",
        alamat: guru.alamat || "",
        hobi: guru.hobi || "",
        email: "",
        status: guru.status,
      });
    } else {
      setEditingGuru(null);
      setFormData({
        nip: "",
        nama: "",
        mata_pelajaran: "",
        kontak: "",
        alamat: "",
        hobi: "",
        email: "",
        status: "aktif",
      });
    }
    setShowModal(true);
    setError("");
    setSuccess("");
  }

  // Close modal
  function closeModal() {
    setShowModal(false);
    setEditingGuru(null);
    setError("");
  }

  // Handle submit
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      if (editingGuru) {
        // Update
        const { error } = await supabase
          .from("guru")
          .update({
            nip: formData.nip,
            nama: formData.nama,
            mata_pelajaran: formData.mata_pelajaran || null,
            kontak: formData.kontak || null,
            alamat: formData.alamat || null,
            hobi: formData.hobi || null,
            status: formData.status,
            updated_at: new Date().toISOString(),
          })
          .eq("id", editingGuru.id);

        if (error) throw error;
        setSuccess("Data guru berhasil diupdate");
      } else {
        // Create - auto-generate email from nama
        const autoEmail = formData.email || 
          `${formData.nama.toLowerCase().replace(/[^a-z0-9]+/g, '.')}@sekolah.sch.id`;

        // Create temp user_id (will be replaced with real auth later)
        const tempUserId = crypto.randomUUID();

        // Insert user
        const { error: userError } = await supabase.from("users").insert({
          id: tempUserId,
          email: autoEmail,
          role: "guru",
          is_active: true,
        });

        if (userError) throw userError;

        // Insert guru
        const { error: guruError } = await supabase.from("guru").insert({
          user_id: tempUserId,
          nip: formData.nip,
          nama: formData.nama,
          mata_pelajaran: formData.mata_pelajaran || null,
          kontak: formData.kontak || null,
          status: formData.status,
          alamat: formData.alamat || null,
          hobi: formData.hobi || null,
        });

        if (guruError) throw guruError;
        setSuccess("Guru berhasil ditambahkan");
      }

      loadGuru();
      setTimeout(() => {
        closeModal();
        setSuccess("");
      }, 2000);
    } catch (err: any) {
      console.error("Error saving guru:", err);
      setError(err.message || "Gagal menyimpan data guru");
    }
  }

  // Handle delete
  async function handleDelete(guru: Guru) {
    if (!confirm(`Hapus guru ${guru.nama}?`)) return;

    try {
      const { error } = await supabase.from("guru").delete().eq("id", guru.id);
      if (error) throw error;

      setSuccess("Guru berhasil dihapus");
      loadGuru();
      setTimeout(() => setSuccess(""), 3000);
    } catch (err: any) {
      console.error("Error deleting guru:", err);
      setError(err.message || "Gagal menghapus guru");
    }
  }

  return (
    <div className="guru-container">
      {/* Success/Error Messages */}
      {success && !showModal && (
        <div className="mb-4 p-4 bg-green-50 border border-green-200 text-green-700 rounded-lg">
          {success}
        </div>
      )}
      {error && !showModal && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      {/* Stats Cards */}
      <div className="guru-stats-grid">
        <div className="guru-stat-card">
          <div className="guru-stat-header">
            <div className="guru-stat-icon-wrap guru-stat-icon-blue">
              <IconUserCheck className="guru-stat-icon" />
            </div>
          </div>
          <p className="guru-stat-label">TOTAL GURU</p>
          <p className="guru-stat-value">{stats.total}</p>
          <p className="guru-stat-sub">— Guru terdaftar</p>
        </div>

        <div className="guru-stat-card">
          <div className="guru-stat-header">
            <div className="guru-stat-icon-wrap guru-stat-icon-green">
              <IconGraduationCap className="guru-stat-icon" />
            </div>
          </div>
          <p className="guru-stat-label">GURU AKTIF</p>
          <p className="guru-stat-value">{stats.aktif}</p>
          <p className="guru-stat-sub">— Aktif membimbing</p>
        </div>

        <div className="guru-stat-card">
          <div className="guru-stat-header">
            <div className="guru-stat-icon-wrap guru-stat-icon-purple">
              <IconUsers className="guru-stat-icon" />
            </div>
          </div>
          <p className="guru-stat-label">SISWA BIMBINGAN</p>
          <p className="guru-stat-value">{stats.totalSiswa}</p>
          <p className="guru-stat-sub">— Total bimbingan</p>
        </div>

        <div className="guru-stat-card">
          <div className="guru-stat-header">
            <div className="guru-stat-icon-wrap guru-stat-icon-orange">
              <IconClock className="guru-stat-icon" />
            </div>
          </div>
          <p className="guru-stat-label">RATA-RATA BIMBINGAN</p>
          <p className="guru-stat-value">
            {stats.aktif > 0 ? Math.round((stats.totalSiswa / stats.aktif) * 10) / 10 : 0}
          </p>
          <p className="guru-stat-sub">— Siswa per guru</p>
        </div>
      </div>

      {/* Data Table */}
      <div className="guru-card">
        <div className="guru-card-header">
          <div>
            <h3 className="guru-card-title">Data Guru</h3>
            <p className="guru-card-subtitle">Kelola informasi guru pembimbing</p>
          </div>
          <div className="guru-header-actions">
            <div className="guru-search-box">
              <IconSearch className="guru-search-icon" />
              <input
                type="text"
                placeholder="Cari guru..."
                className="guru-search-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select
              className="guru-filter-select"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">Semua Status</option>
              <option value="aktif">Aktif</option>
              <option value="tidak_aktif">Tidak Aktif</option>
            </select>
            <button className="guru-add-btn" onClick={() => openModal()}>
              <IconPlus className="guru-add-icon" />
              Tambah Guru
            </button>
          </div>
        </div>

        <div className="guru-card-body">
          {loading ? (
            <div className="p-8 text-center text-gray-500">Loading...</div>
          ) : filteredGuru.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              {searchTerm ? "Tidak ada guru yang ditemukan" : "Belum ada data guru"}
            </div>
          ) : (
            <div className="guru-table-wrapper">
              <table className="guru-table">
                <thead className="guru-table-head">
                  <tr>
                    <th>NIP</th>
                    <th>NAMA GURU</th>
                    <th>MATA PELAJARAN</th>
                    <th>SISWA BIMBINGAN</th>
                    <th>ALAMAT</th> 
                    <th>HOBI</th>
                    <th>STATUS</th>
                    <th>AKSI</th>
                  </tr>
                </thead>
                <tbody className="guru-table-body">
                  {filteredGuru.map((guru) => (
                    <tr key={guru.id} className="guru-table-row">
                      <td className="guru-table-cell">
                        <span className="guru-nip">{guru.nip}</span>
                      </td>
                      <td className="guru-table-cell">
                        <div className="guru-nama-cell">
                          <div className="guru-avatar">
                            {guru.nama
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </div>
                          <span className="guru-nama">{guru.nama}</span>
                        </div>
                      </td>
                      <td className="guru-table-cell">
                        <span className="guru-mapel">{guru.mata_pelajaran || "-"}</span>
                      </td>
                      <td className="guru-table-cell">
                        <span className="guru-bimbingan">{guru.siswa_count || 0} siswa</span>
                      </td>
                      <td className="guru-table-cell">
                        <span className="guru-alamat">{guru.alamat || "-"}</span>
                      </td>
                      <td className="guru-table-cell">
                        <span className="guru-hobi">{guru.hobi || "-"}</span>
                      </td>
                      <td className="guru-table-cell">
                        <span
                          className={`guru-status ${
                            guru.status === "aktif"
                              ? "guru-status-active"
                              : "guru-status-inactive"
                          }`}
                        >
                          {guru.status}
                        </span>
                      </td>
                      <td className="guru-table-cell">
                        <div className="guru-actions">
                          <button
                            className="guru-action-btn guru-action-edit"
                            onClick={() => openModal(guru)}
                          >
                            <IconEdit className="guru-action-icon" />
                            Edit
                          </button>
                          <button
                            className="guru-action-btn guru-action-delete"
                            onClick={() => handleDelete(guru)}
                          >
                            <IconTrash className="guru-action-icon" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Modal Add/Edit */}
      {showModal && (
        <div 
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.4)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            padding: '20px'
          }}
          onClick={closeModal}
        >
          <div 
            style={{
              background: '#fff',
              borderRadius: '20px',
              width: '100%',
              maxWidth: '520px',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
              position: 'relative'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button 
              onClick={closeModal}
              style={{
                position: 'absolute',
                top: '24px',
                right: '24px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#9ca3af',
                transition: 'color 0.15s',
                zIndex: 1
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#1f2937'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#9ca3af'}
            >
              <div style={{ width: '20px', height: '20px' }}>
                <IconX />
              </div>
            </button>

            {/* Form */}
            <form onSubmit={handleSubmit} style={{ padding: '40px' }}>
              {/* Header dengan Icon */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', marginBottom: '32px' }}>
                {/* Icon Circle */}
                <div style={{
                  width: '48px',
                  height: '48px',
                  background: '#eef2ff',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <div style={{ width: '24px', height: '24px', color: '#6366f1' }}>
                    <IconUserCheck />
                  </div>
                </div>

                {/* Title & Subtitle */}
                <div style={{ flex: 1, paddingRight: '24px' }}>
                  <h3 style={{ 
                    margin: 0, 
                    fontSize: '1.25rem', 
                    fontWeight: '700', 
                    color: '#111827',
                    marginBottom: '4px',
                    lineHeight: '1.5'
                  }}>
                    Tambah Guru Baru
                  </h3>
                  <p style={{ 
                    margin: 0, 
                    fontSize: '0.875rem', 
                    color: '#6b7280',
                    lineHeight: '1.4'
                  }}>
                    Akun login akan dibuat otomatis dari nama guru.
                  </p>
                </div>
              </div>

              {/* Error/Success Messages */}
              {error && (
                <div style={{
                  marginBottom: '20px',
                  padding: '12px 16px',
                  background: '#fef2f2',
                  border: '1px solid #fecaca',
                  borderRadius: '8px',
                  color: '#991b1b',
                  fontSize: '0.875rem'
                }}>
                  {error}
                </div>
              )}

              {success && (
                <div style={{
                  marginBottom: '20px',
                  padding: '12px 16px',
                  background: '#f0fdf4',
                  border: '1px solid #bbf7d0',
                  borderRadius: '8px',
                  color: '#166534',
                  fontSize: '0.875rem'
                }}>
                  {success}
                </div>
              )}

              {/* Nama Lengkap */}
              <div style={{ marginBottom: '20px' }}>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '8px', 
                  fontSize: '0.875rem', 
                  fontWeight: '600',
                  color: '#111827'
                }}>
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  placeholder="Budi Santoso, S.Kom."
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '2px solid #3b82f6',
                    borderRadius: '12px',
                    fontSize: '0.9375rem',
                    outline: 'none',
                    transition: 'all 0.15s',
                    color: '#111827'
                  }}
                  value={formData.nama}
                  onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                  onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                  onBlur={(e) => e.target.style.borderColor = formData.nama ? '#3b82f6' : '#e5e7eb'}
                  required
                  autoFocus
                />
              </div>

              {/* NIP */}
              <div style={{ marginBottom: '20px' }}>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '8px', 
                  fontSize: '0.875rem', 
                  fontWeight: '600',
                  color: '#111827'
                }}>
                  NIP
                </label>
                <input
                  type="text"
                  placeholder="198001012005011001"
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '2px solid #e5e7eb',
                    borderRadius: '12px',
                    fontSize: '0.9375rem',
                    outline: 'none',
                    transition: 'all 0.15s',
                    color: '#111827',
                    background: '#f9fafb'
                  }}
                  value={formData.nip}
                  onChange={(e) => setFormData({ ...formData, nip: e.target.value })}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#3b82f6';
                    e.target.style.background = '#fff';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#e5e7eb';
                    e.target.style.background = '#f9fafb';
                  }}
                  required
                />
              </div>

              {/* Jurusan - Dropdown */}
              <div style={{ marginBottom: '32px' }}>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '8px', 
                  fontSize: '0.875rem', 
                  fontWeight: '600',
                  color: '#111827'
                }}>
                  Jurusan
                </label>
                <div style={{ position: 'relative' }}>
                  <select
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      paddingRight: '40px',
                      border: '2px solid #e5e7eb',
                      borderRadius: '12px',
                      fontSize: '0.9375rem',
                      outline: 'none',
                      transition: 'all 0.15s',
                      color: '#111827',
                      appearance: 'none',
                      background: '#f9fafb',
                      cursor: 'pointer'
                    }}
                    value={formData.mata_pelajaran}
                    onChange={(e) => setFormData({ ...formData, mata_pelajaran: e.target.value })}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#3b82f6';
                      e.target.style.background = '#fff';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = '#e5e7eb';
                      e.target.style.background = '#f9fafb';
                    }}
                  >
                    <option value="RPL">RPL</option>
                    <option value="TKJ">TKJ</option>
                    <option value="MM">MM</option>
                    <option value="SIJA">SIJA</option>
                    <option value="TJKT">TJKT</option>
                    <option value="Pemrograman Web">Pemrograman Web</option>
                    <option value="Pemrograman Bergerak">Pemrograman Bergerak</option>
                    <option value="Sistem Informasi">Sistem Informasi</option>
                    <option value="Jaringan Komputer">Jaringan Komputer</option>
                    <option value="Desain Grafis">Desain Grafis</option>
                  </select>
                  <svg 
                    style={{
                      position: 'absolute',
                      right: '16px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      width: '20px',
                      height: '20px',
                      color: '#9ca3af',
                      pointerEvents: 'none'
                    }}
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  >
                    <path d="m6 9 6 6 6-6"/>
                  </svg>
                </div>
              </div>

              <div style={{ 
                display: 'flex',
                flexDirection: 'column',
                gap: '12px'
              }}>
                <label htmlFor="alamat" style={{ fontSize: '0.875rem', fontWeight: '600', color: '#374151' }}>
                  Alamat
                </label>
                <input
                  type="text"
                  id="alamat"
                  value={formData.alamat}
                  onChange={(e) => setFormData({ ...formData, alamat: e.target.value })}
                  style={{
                    padding: '8px 12px',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    fontSize: '0.875rem',
                    background: '#f9fafb',
                    color: '#374151'
                  }}
                />
              </div>

              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                marginTop: '16px'
              }}>
                <label htmlFor="hobi" style={{ fontSize: '0.875rem', fontWeight: '600', color: '#374151' }}>
                  Hobi
                </label>
                <input
                  type="text"
                  id="hobi"
                  value={formData.hobi}
                  onChange={(e) => setFormData({ ...formData, hobi: e.target.value })}
                  style={{
                    padding: '8px 12px',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    fontSize: '0.875rem',
                    background: '#f9fafb',
                    color: '#374151'
                  }}
                />
              </div>

              {/* Footer Buttons */}
              <div style={{ 
                display: 'flex', 
                gap: '12px', 
                justifyContent: 'flex-end'
              }}>
                <button
                  type="button"
                  onClick={closeModal}
                  style={{
                    padding: '12px 24px',
                    background: '#fff',
                    color: '#374151',
                    border: '2px solid #e5e7eb',
                    borderRadius: '10px',
                    fontSize: '0.9375rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.15s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#f9fafb';
                    e.currentTarget.style.borderColor = '#d1d5db';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = '#fff';
                    e.currentTarget.style.borderColor = '#e5e7eb';
                  }}
                >
                  Batal
                </button>
                <button
                  type="submit"
                  style={{
                    padding: '12px 32px',
                    background: '#3b82f6',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '10px',
                    fontSize: '0.9375rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'background 0.15s',
                    boxShadow: '0 4px 6px -1px rgba(59, 130, 246, 0.3)'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = '#2563eb'}
                  onMouseLeave={(e) => e.currentTarget.style.background = '#3b82f6'}
                >
                  Buat Akun Guru
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
