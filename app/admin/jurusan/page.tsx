"use client";

import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

/* ─── Icons ─── */
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
      <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
      <path d="m15 5 4 4" />
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

interface Jurusan {
  id: string;
  kode_jurusan: string;
  nama_jurusan: string;
  singkatan: string;
  deskripsi: string | null;
  kuota_siswa: number;
  status: string;
  created_at: string;
  updated_at: string;
}

interface FormData {
  id?: string;
  kode_jurusan: string;
  nama_jurusan: string;
  singkatan: string;
  deskripsi: string;
  kuota_siswa: number;
  status: string;
}

export default function JurusanPage() {
  const [jurusanList, setJurusanList] = useState<Jurusan[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("semua");
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
  const [selectedJurusan, setSelectedJurusan] = useState<Jurusan | null>(null);
  const [submitting, setSubmitting] = useState(false);
  
  const [formData, setFormData] = useState<FormData>({
    kode_jurusan: "",
    nama_jurusan: "",
    singkatan: "",
    deskripsi: "",
    kuota_siswa: 36,
    status: "aktif"
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // Load jurusan data
  useEffect(() => {
    fetchJurusan();
  }, [searchQuery, statusFilter]);

  async function fetchJurusan() {
    try {
      setLoading(true);
      
      let query = supabase
        .from('jurusan')
        .select('*')
        .order('nama_jurusan', { ascending: true });

      // Apply search filter
      if (searchQuery) {
        query = query.or(`nama_jurusan.ilike.%${searchQuery}%,kode_jurusan.ilike.%${searchQuery}%,singkatan.ilike.%${searchQuery}%`);
      }

      // Apply status filter
      if (statusFilter !== 'semua') {
        query = query.eq('status', statusFilter);
      }

      const { data, error } = await query;

      if (error) throw error;

      setJurusanList(data || []);
    } catch (error) {
      console.error('Error fetching jurusan:', error);
      alert('Gagal memuat data jurusan');
    } finally {
      setLoading(false);
    }
  }

  // Open modal for add
  function handleAddClick() {
    setModalMode('add');
    setFormData({
      kode_jurusan: "",
      nama_jurusan: "",
      singkatan: "",
      deskripsi: "",
      kuota_siswa: 36,
      status: "aktif"
    });
    setFormErrors({});
    setShowModal(true);
  }

  // Open modal for edit
  function handleEditClick(jurusan: Jurusan) {
    setModalMode('edit');
    setSelectedJurusan(jurusan);
    setFormData({
      id: jurusan.id,
      kode_jurusan: jurusan.kode_jurusan,
      nama_jurusan: jurusan.nama_jurusan,
      singkatan: jurusan.singkatan,
      deskripsi: jurusan.deskripsi || "",
      kuota_siswa: jurusan.kuota_siswa,
      status: jurusan.status
    });
    setFormErrors({});
    setShowModal(true);
  }

  // Validate form
  function validateForm(): boolean {
    const errors: Record<string, string> = {};

    if (!formData.kode_jurusan.trim()) {
      errors.kode_jurusan = "Kode jurusan wajib diisi";
    } else if (formData.kode_jurusan.length > 10) {
      errors.kode_jurusan = "Kode jurusan maksimal 10 karakter";
    }

    if (!formData.nama_jurusan.trim()) {
      errors.nama_jurusan = "Nama jurusan wajib diisi";
    } else if (formData.nama_jurusan.length > 100) {
      errors.nama_jurusan = "Nama jurusan maksimal 100 karakter";
    }

    if (!formData.singkatan.trim()) {
      errors.singkatan = "Singkatan wajib diisi";
    } else if (formData.singkatan.length > 10) {
      errors.singkatan = "Singkatan maksimal 10 karakter";
    }

    if (formData.kuota_siswa < 1 || formData.kuota_siswa > 100) {
      errors.kuota_siswa = "Kuota siswa harus antara 1-100";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  }

  // Submit form (add or edit)
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      setSubmitting(true);

      if (modalMode === 'add') {
        // CREATE
        const { error } = await supabase
          .from('jurusan')
          .insert([{
            kode_jurusan: formData.kode_jurusan.toUpperCase(),
            nama_jurusan: formData.nama_jurusan,
            singkatan: formData.singkatan.toUpperCase(),
            deskripsi: formData.deskripsi || null,
            kuota_siswa: formData.kuota_siswa,
            status: formData.status
          }]);

        if (error) throw error;

        alert('✅ Jurusan berhasil ditambahkan!');
      } else {
        // UPDATE
        const { error } = await supabase
          .from('jurusan')
          .update({
            kode_jurusan: formData.kode_jurusan.toUpperCase(),
            nama_jurusan: formData.nama_jurusan,
            singkatan: formData.singkatan.toUpperCase(),
            deskripsi: formData.deskripsi || null,
            kuota_siswa: formData.kuota_siswa,
            status: formData.status
          })
          .eq('id', formData.id);

        if (error) throw error;

        alert('✅ Jurusan berhasil diupdate!');
      }

      setShowModal(false);
      fetchJurusan();
    } catch (error: any) {
      console.error('Error submitting jurusan:', error);
      
      if (error.code === '23505') {
        alert('❌ Kode jurusan sudah digunakan!');
      } else {
        alert(`❌ Gagal menyimpan: ${error.message}`);
      }
    } finally {
      setSubmitting(false);
    }
  }

  // Delete jurusan
  async function handleDelete() {
    if (!selectedJurusan) return;

    try {
      setSubmitting(true);

      const { error } = await supabase
        .from('jurusan')
        .delete()
        .eq('id', selectedJurusan.id);

      if (error) throw error;

      alert('✅ Jurusan berhasil dihapus!');
      setShowDeleteModal(false);
      setSelectedJurusan(null);
      fetchJurusan();
    } catch (error: any) {
      console.error('Error deleting jurusan:', error);
      alert(`❌ Gagal menghapus: ${error.message}`);
    } finally {
      setSubmitting(false);
    }
  }

  // Filtered list
  const filteredJurusan = jurusanList;

  return (
    <>
      <div style={{ padding: '24px' }}>
        {/* Header Card */}
        <div style={{
          background: '#fff',
          borderRadius: '12px',
          padding: '24px',
          marginBottom: '24px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
            <div style={{
              width: '48px',
              height: '48px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <IconGraduationCap style={{ width: '24px', height: '24px', color: '#fff' }} />
            </div>
            <div>
              <h2 style={{ margin: 0, fontSize: '1.5rem', fontWeight: '700', color: '#1e293b' }}>
                Master Data Jurusan
              </h2>
              <p style={{ margin: '4px 0 0', fontSize: '0.875rem', color: '#64748b' }}>
                Kelola data jurusan/program keahlian sekolah
              </p>
            </div>
          </div>
        </div>

        {/* Filters & Actions */}
        <div style={{
          background: '#fff',
          borderRadius: '12px',
          padding: '20px',
          marginBottom: '24px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
        }}>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center' }}>
            {/* Search */}
            <div style={{ position: 'relative', flex: '1', minWidth: '200px', maxWidth: '400px' }}>
              <IconSearch style={{
                position: 'absolute',
                left: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '18px',
                height: '18px',
                color: '#94a3b8',
                pointerEvents: 'none'
              }} />
              <input
                type="text"
                placeholder="Cari jurusan..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 12px 10px 40px',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  fontSize: '0.875rem',
                  outline: 'none'
                }}
              />
            </div>

            {/* Filter Status */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              style={{
                padding: '10px 12px',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                fontSize: '0.875rem',
                outline: 'none',
                cursor: 'pointer'
              }}
            >
              <option value="semua">Semua Status</option>
              <option value="aktif">Aktif</option>
              <option value="nonaktif">Non-Aktif</option>
            </select>

            {/* Add Button */}
            <button
              onClick={handleAddClick}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '10px 20px',
                background: 'var(--blue)',
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                fontSize: '0.875rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'background .15s'
              }}
            >
              <IconPlus style={{ width: '16px', height: '16px' }} />
              Tambah Jurusan
            </button>
          </div>
        </div>

        {/* Table */}
        <div style={{
          background: '#fff',
          borderRadius: '12px',
          overflow: 'hidden',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
        }}>
          {loading ? (
            <div style={{ padding: '40px', textAlign: 'center', color: '#64748b' }}>
              Loading...
            </div>
          ) : filteredJurusan.length === 0 ? (
            <div style={{ padding: '40px', textAlign: 'center', color: '#64748b' }}>
              <IconGraduationCap style={{ width: '48px', height: '48px', margin: '0 auto 12px', opacity: 0.3 }} />
              <p style={{ margin: 0 }}>Tidak ada data jurusan</p>
            </div>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                  <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '0.75rem', fontWeight: '600', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Kode</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '0.75rem', fontWeight: '600', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Nama Jurusan</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '0.75rem', fontWeight: '600', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Singkatan</th>
                  <th style={{ padding: '12px 16px', textAlign: 'center', fontSize: '0.75rem', fontWeight: '600', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Kuota</th>
                  <th style={{ padding: '12px 16px', textAlign: 'center', fontSize: '0.75rem', fontWeight: '600', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Status</th>
                  <th style={{ padding: '12px 16px', textAlign: 'center', fontSize: '0.75rem', fontWeight: '600', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filteredJurusan.map((jurusan) => (
                  <tr key={jurusan.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '16px', fontSize: '0.875rem', fontWeight: '600', color: '#3b82f6' }}>
                      {jurusan.kode_jurusan}
                    </td>
                    <td style={{ padding: '16px', fontSize: '0.875rem', color: '#1e293b' }}>
                      {jurusan.nama_jurusan}
                    </td>
                    <td style={{ padding: '16px', fontSize: '0.875rem', color: '#64748b' }}>
                      {jurusan.singkatan}
                    </td>
                    <td style={{ padding: '16px', textAlign: 'center', fontSize: '0.875rem', color: '#64748b' }}>
                      {jurusan.kuota_siswa} siswa
                    </td>
                    <td style={{ padding: '16px', textAlign: 'center' }}>
                      <span style={{
                        display: 'inline-block',
                        padding: '4px 12px',
                        borderRadius: '9999px',
                        fontSize: '0.75rem',
                        fontWeight: '600',
                        background: jurusan.status === 'aktif' ? '#dcfce7' : '#fee2e2',
                        color: jurusan.status === 'aktif' ? '#166534' : '#991b1b'
                      }}>
                        {jurusan.status === 'aktif' ? 'AKTIF' : 'NON-AKTIF'}
                      </span>
                    </td>
                    <td style={{ padding: '16px', textAlign: 'center' }}>
                      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                        <button
                          onClick={() => handleEditClick(jurusan)}
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px',
                            padding: '6px 12px',
                            background: '#eff6ff',
                            color: '#2563eb',
                            border: 'none',
                            borderRadius: '6px',
                            fontSize: '0.75rem',
                            fontWeight: '600',
                            cursor: 'pointer'
                          }}
                        >
                          <IconEdit style={{ width: '14px', height: '14px' }} />
                          Edit
                        </button>
                        <button
                          onClick={() => {
                            setSelectedJurusan(jurusan);
                            setShowDeleteModal(true);
                          }}
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px',
                            padding: '6px 12px',
                            background: '#fef2f2',
                            color: '#dc2626',
                            border: 'none',
                            borderRadius: '6px',
                            fontSize: '0.75rem',
                            fontWeight: '600',
                            cursor: 'pointer'
                          }}
                        >
                          <IconTrash style={{ width: '14px', height: '14px' }} />
                          Hapus
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Info Footer */}
        <div style={{ marginTop: '16px', textAlign: 'center', fontSize: '0.875rem', color: '#64748b' }}>
          Total: <strong>{filteredJurusan.length}</strong> jurusan
        </div>
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.5)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          padding: '20px'
        }} onClick={() => !submitting && setShowModal(false)}>
          <div style={{
            background: '#fff',
            borderRadius: '16px',
            width: '100%',
            maxWidth: '600px',
            maxHeight: '90vh',
            overflow: 'auto',
            boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)'
          }} onClick={(e) => e.stopPropagation()}>
            {/* Modal Header */}
            <div style={{
              padding: '24px',
              borderBottom: '1px solid #e2e8f0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: '700', color: '#1e293b' }}>
                {modalMode === 'add' ? '➕ Tambah Jurusan Baru' : '✏️ Edit Jurusan'}
              </h3>
              <button
                onClick={() => !submitting && setShowModal(false)}
                disabled={submitting}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '1.5rem',
                  color: '#64748b',
                  cursor: 'pointer',
                  padding: '4px 8px'
                }}
              >
                ×
              </button>
            </div>

            {/* Modal Body - Form */}
            <form onSubmit={handleSubmit} style={{ padding: '24px' }}>
              {/* Kode Jurusan */}
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.875rem', fontWeight: '600', color: '#1e293b' }}>
                  Kode Jurusan <span style={{ color: '#dc2626' }}>*</span>
                </label>
                <input
                  type="text"
                  value={formData.kode_jurusan}
                  onChange={(e) => setFormData({ ...formData, kode_jurusan: e.target.value.toUpperCase() })}
                  placeholder="Contoh: RPL, TKJ"
                  maxLength={10}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    border: `1px solid ${formErrors.kode_jurusan ? '#dc2626' : '#e2e8f0'}`,
                    borderRadius: '8px',
                    fontSize: '0.875rem',
                    outline: 'none'
                  }}
                />
                {formErrors.kode_jurusan && (
                  <p style={{ margin: '4px 0 0', fontSize: '0.75rem', color: '#dc2626' }}>
                    {formErrors.kode_jurusan}
                  </p>
                )}
              </div>

              {/* Nama Jurusan */}
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.875rem', fontWeight: '600', color: '#1e293b' }}>
                  Nama Jurusan <span style={{ color: '#dc2626' }}>*</span>
                </label>
                <input
                  type="text"
                  value={formData.nama_jurusan}
                  onChange={(e) => setFormData({ ...formData, nama_jurusan: e.target.value })}
                  placeholder="Rekayasa Perangkat Lunak"
                  maxLength={100}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    border: `1px solid ${formErrors.nama_jurusan ? '#dc2626' : '#e2e8f0'}`,
                    borderRadius: '8px',
                    fontSize: '0.875rem',
                    outline: 'none'
                  }}
                />
                {formErrors.nama_jurusan && (
                  <p style={{ margin: '4px 0 0', fontSize: '0.75rem', color: '#dc2626' }}>
                    {formErrors.nama_jurusan}
                  </p>
                )}
              </div>

              {/* Singkatan */}
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.875rem', fontWeight: '600', color: '#1e293b' }}>
                  Singkatan <span style={{ color: '#dc2626' }}>*</span>
                </label>
                <input
                  type="text"
                  value={formData.singkatan}
                  onChange={(e) => setFormData({ ...formData, singkatan: e.target.value.toUpperCase() })}
                  placeholder="RPL"
                  maxLength={10}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    border: `1px solid ${formErrors.singkatan ? '#dc2626' : '#e2e8f0'}`,
                    borderRadius: '8px',
                    fontSize: '0.875rem',
                    outline: 'none'
                  }}
                />
                {formErrors.singkatan && (
                  <p style={{ margin: '4px 0 0', fontSize: '0.75rem', color: '#dc2626' }}>
                    {formErrors.singkatan}
                  </p>
                )}
              </div>

              {/* Kuota Siswa */}
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.875rem', fontWeight: '600', color: '#1e293b' }}>
                  Kuota Siswa <span style={{ color: '#dc2626' }}>*</span>
                </label>
                <input
                  type="number"
                  value={formData.kuota_siswa}
                  onChange={(e) => setFormData({ ...formData, kuota_siswa: parseInt(e.target.value) || 0 })}
                  min={1}
                  max={100}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    border: `1px solid ${formErrors.kuota_siswa ? '#dc2626' : '#e2e8f0'}`,
                    borderRadius: '8px',
                    fontSize: '0.875rem',
                    outline: 'none'
                  }}
                />
                {formErrors.kuota_siswa && (
                  <p style={{ margin: '4px 0 0', fontSize: '0.75rem', color: '#dc2626' }}>
                    {formErrors.kuota_siswa}
                  </p>
                )}
              </div>

              {/* Status */}
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.875rem', fontWeight: '600', color: '#1e293b' }}>
                  Status
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    fontSize: '0.875rem',
                    outline: 'none',
                    cursor: 'pointer'
                  }}
                >
                  <option value="aktif">Aktif</option>
                  <option value="nonaktif">Non-Aktif</option>
                </select>
              </div>

              {/* Deskripsi */}
              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.875rem', fontWeight: '600', color: '#1e293b' }}>
                  Deskripsi (Opsional)
                </label>
                <textarea
                  value={formData.deskripsi}
                  onChange={(e) => setFormData({ ...formData, deskripsi: e.target.value })}
                  placeholder="Deskripsi singkat tentang jurusan ini..."
                  rows={3}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    fontSize: '0.875rem',
                    outline: 'none',
                    resize: 'vertical'
                  }}
                />
              </div>

              {/* Buttons */}
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  disabled={submitting}
                  style={{
                    padding: '10px 20px',
                    background: '#f1f5f9',
                    color: '#64748b',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    cursor: 'pointer'
                  }}
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  style={{
                    padding: '10px 20px',
                    background: submitting ? '#94a3b8' : 'var(--blue)',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    cursor: submitting ? 'not-allowed' : 'pointer'
                  }}
                >
                  {submitting ? 'Menyimpan...' : (modalMode === 'add' ? 'Tambah' : 'Simpan')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && selectedJurusan && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.5)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          padding: '20px'
        }} onClick={() => !submitting && setShowDeleteModal(false)}>
          <div style={{
            background: '#fff',
            borderRadius: '16px',
            width: '100%',
            maxWidth: '400px',
            padding: '24px',
            textAlign: 'center',
            boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)'
          }} onClick={(e) => e.stopPropagation()}>
            <div style={{
              width: '64px',
              height: '64px',
              background: '#fee2e2',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px'
            }}>
              <IconTrash style={{ width: '32px', height: '32px', color: '#dc2626' }} />
            </div>

            <h3 style={{ margin: '0 0 8px', fontSize: '1.25rem', fontWeight: '700', color: '#1e293b' }}>
              Hapus Jurusan?
            </h3>
            <p style={{ margin: '0 0 24px', fontSize: '0.875rem', color: '#64748b' }}>
              Apakah Anda yakin ingin menghapus jurusan <strong>{selectedJurusan.nama_jurusan}</strong>?
              <br />Tindakan ini tidak dapat dibatalkan.
            </p>

            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                onClick={() => setShowDeleteModal(false)}
                disabled={submitting}
                style={{
                  flex: 1,
                  padding: '10px',
                  background: '#f1f5f9',
                  color: '#64748b',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                Batal
              </button>
              <button
                onClick={handleDelete}
                disabled={submitting}
                style={{
                  flex: 1,
                  padding: '10px',
                  background: submitting ? '#fca5a5' : '#dc2626',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  cursor: submitting ? 'not-allowed' : 'pointer'
                }}
              >
                {submitting ? 'Menghapus...' : 'Ya, Hapus'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
