"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

/* ─── Icons ─── */
function IconBook({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
      strokeLinejoin="round" className={className}>
      <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
    </svg>
  );
}

function IconClock({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
      strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function IconCheckCircle({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
      strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

function IconAlertCircle({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
      strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  );
}

function IconTrash({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
      strokeLinejoin="round" className={className}>
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
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

interface Stats {
  menunggu: number;
  disetujui: number;
  perluRevisi: number;
}

type TabType = "jurnal" | "absensi";

export default function GuruJurnalAbsensi() {
  const [activeTab, setActiveTab] = useState<TabType>("jurnal");
  const [stats, setStats] = useState<Stats>({
    menunggu: 0,
    disetujui: 0,
    perluRevisi: 0,
  });
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchStats();
  }, [activeTab]);

  const fetchStats = async () => {
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

      if (activeTab === "jurnal") {
        // Fetch jurnal stats
        const { data: jurnalData } = await supabase
          .from("jurnal")
          .select("id, status")
          .eq("guru_id", guruData.id);

        const menunggu = jurnalData?.filter((j: any) => j.status === "pending").length || 0;
        const disetujui = jurnalData?.filter((j: any) => j.status === "disetujui").length || 0;
        const perluRevisi = jurnalData?.filter((j: any) => j.status === "revisi" || j.status === "ditolak").length || 0;

        setStats({ menunggu, disetujui, perluRevisi });
      } else {
        // Fetch absensi stats
        const { data: absensiData } = await supabase
          .from("absensi")
          .select("id, status")
          .eq("guru_id", guruData.id);

        const menunggu = absensiData?.filter((a: any) => a.status === "pending").length || 0;
        const disetujui = absensiData?.filter((a: any) => a.status === "hadir" || a.status === "approved").length || 0;
        const ditolak = absensiData?.filter((a: any) => a.status === "ditolak").length || 0;

        setStats({ menunggu, disetujui, perluRevisi: ditolak });
      }
    } catch (error) {
      console.error("Error fetching stats:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="db-container db-animate-in">
      {/* Header */}
      <div className="jurnal-header">
        <div className="jurnal-header-icon">
          <IconBook className="jurnal-icon" />
        </div>
        <h1 className="jurnal-title">Validasi Jurnal & Absensi</h1>
      </div>

      {/* Stats Cards */}
      <div className="jurnal-stats">
        {/* Menunggu Validasi */}
        <div className="jurnal-stat-card">
          <div className="jurnal-stat-header">
            <span className="jurnal-stat-label">MENUNGGU VALIDASI</span>
            <div className="jurnal-stat-icon jurnal-stat-icon-orange">
              <IconClock />
            </div>
          </div>
          <div className="jurnal-stat-body">
            <p className="jurnal-stat-value">{stats.menunggu}</p>
            <p className="jurnal-stat-desc">
              {activeTab === "jurnal" ? "Butuh review segera" : "Sakit / izin belum ditinjau"}
            </p>
          </div>
        </div>

        {/* Disetujui */}
        <div className="jurnal-stat-card">
          <div className="jurnal-stat-header">
            <span className="jurnal-stat-label">
              {activeTab === "jurnal" ? "JURNAL DISETUJUI" : "ABSENSI DISETUJUI"}
            </span>
            <div className="jurnal-stat-icon jurnal-stat-icon-green">
              <IconCheckCircle />
            </div>
          </div>
          <div className="jurnal-stat-body">
            <p className="jurnal-stat-value">{stats.disetujui}</p>
            <p className="jurnal-stat-desc">Bulan ini</p>
          </div>
        </div>

        {/* Perlu Revisi / Ditolak */}
        <div className="jurnal-stat-card">
          <div className="jurnal-stat-header">
            <span className="jurnal-stat-label">
              {activeTab === "jurnal" ? "PERLU REVISI" : "DITOLAK"}
            </span>
            <div className="jurnal-stat-icon jurnal-stat-icon-red">
              <IconAlertCircle />
            </div>
          </div>
          <div className="jurnal-stat-body">
            <p className="jurnal-stat-value">{stats.perluRevisi}</p>
            <p className="jurnal-stat-desc">
              {activeTab === "jurnal" ? "Menunggu perbaikan siswa" : "Perlu tindak lanjut"}
            </p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="jurnal-tabs">
        <button
          className={`jurnal-tab ${activeTab === "jurnal" ? "jurnal-tab-active" : ""}`}
          onClick={() => setActiveTab("jurnal")}
        >
          Jurnal
        </button>
        <button
          className={`jurnal-tab ${activeTab === "absensi" ? "jurnal-tab-active" : ""}`}
          onClick={() => setActiveTab("absensi")}
        >
          Absensi
        </button>
      </div>

      {/* Content Card */}
      <div className="jurnal-content-card">
        {/* Search Section */}
        <div className="jurnal-search-section">
          <div className="jurnal-search-box">
            <IconSearch className="jurnal-search-icon" />
            <input
              type="text"
              className="jurnal-search-input"
              placeholder={
                activeTab === "jurnal"
                  ? "Cari nama siswa atau kegiatan..."
                  : "Cari nama siswa..."
              }
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Table */}
        <div className="jurnal-table-wrap">
          <table className="jurnal-table">
            <thead>
              <tr>
                <th>TANGGAL & SISWA</th>
                <th>{activeTab === "jurnal" ? "KEGIATAN" : "KEHADIRAN"}</th>
                <th>FOTO</th>
                <th>{activeTab === "jurnal" ? "STATUS" : "VALIDASI"}</th>
                <th>AKSI</th>
              </tr>
            </thead>
            <tbody>
              {/* Empty State */}
              <tr>
                <td colSpan={5}>
                  <div className="jurnal-empty">
                    <p className="jurnal-empty-text">
                      {activeTab === "jurnal"
                        ? "Tidak ada jurnal yang sesuai dengan kriteria."
                        : "Tidak ada data absensi yang sesuai dengan kriteria."}
                    </p>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <style jsx>{`
        .jurnal-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 2rem;
        }

        .jurnal-header-icon {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
        }

        .jurnal-icon {
          width: 28px;
          height: 28px;
        }

        .jurnal-title {
          font-size: 1.75rem;
          font-weight: 700;
          color: #111827;
          margin: 0;
        }

        .jurnal-stats {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        .jurnal-stat-card {
          background: white;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          padding: 1.5rem;
          transition: all 0.2s;
        }

        .jurnal-stat-card:hover {
          border-color: #3b82f6;
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.1);
          transform: translateY(-2px);
        }

        .jurnal-stat-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }

        .jurnal-stat-label {
          font-size: 0.75rem;
          font-weight: 600;
          color: #6b7280;
          letter-spacing: 0.05em;
        }

        .jurnal-stat-icon {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .jurnal-stat-icon-orange {
          background: #fed7aa;
          color: #f97316;
        }

        .jurnal-stat-icon-green {
          background: #d1fae5;
          color: #10b981;
        }

        .jurnal-stat-icon-red {
          background: #fee2e2;
          color: #ef4444;
        }

        .jurnal-stat-body {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .jurnal-stat-value {
          font-size: 2.5rem;
          font-weight: 700;
          color: #111827;
          line-height: 1;
          margin: 0;
        }

        .jurnal-stat-desc {
          font-size: 0.875rem;
          color: #6b7280;
          margin: 0;
        }

        .jurnal-tabs {
          display: flex;
          gap: 0;
          margin-bottom: 1.5rem;
          border-bottom: 2px solid #e5e7eb;
        }

        .jurnal-tab {
          padding: 0.875rem 1.5rem;
          font-size: 0.9375rem;
          font-weight: 500;
          color: #6b7280;
          background: transparent;
          border: none;
          border-bottom: 2px solid transparent;
          margin-bottom: -2px;
          cursor: pointer;
          transition: all 0.2s;
        }

        .jurnal-tab:hover {
          color: #111827;
        }

        .jurnal-tab-active {
          color: #111827;
          font-weight: 600;
          border-bottom-color: #111827;
        }

        .jurnal-content-card {
          background: white;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          overflow: hidden;
        }

        .jurnal-search-section {
          padding: 1.25rem 1.5rem;
          background: #f9fafb;
          border-bottom: 1px solid #e5e7eb;
        }

        .jurnal-search-box {
          position: relative;
          max-width: 100%;
        }

        .jurnal-search-icon {
          position: absolute;
          left: 1rem;
          top: 50%;
          transform: translateY(-50%);
          color: #9ca3af;
          pointer-events: none;
        }

        .jurnal-search-input {
          width: 100%;
          padding: 0.75rem 1rem 0.75rem 3rem;
          font-size: 0.875rem;
          color: #111827;
          background: white;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          outline: none;
          transition: all 0.2s;
        }

        .jurnal-search-input::placeholder {
          color: #9ca3af;
        }

        .jurnal-search-input:focus {
          border-color: #3b82f6;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.05);
        }

        .jurnal-table-wrap {
          overflow-x: auto;
        }

        .jurnal-table {
          width: 100%;
          border-collapse: collapse;
        }

        .jurnal-table thead th {
          padding: 1rem 1.5rem;
          text-align: left;
          font-size: 0.75rem;
          font-weight: 600;
          color: #6b7280;
          letter-spacing: 0.05em;
          background: #f9fafb;
          border-bottom: 1px solid #e5e7eb;
        }

        .jurnal-table tbody td {
          padding: 1rem 1.5rem;
          font-size: 0.875rem;
          color: #374151;
          border-bottom: 1px solid #f3f4f6;
        }

        .jurnal-empty {
          padding: 4rem 2rem;
          text-align: center;
        }

        .jurnal-empty-text {
          font-size: 0.9375rem;
          color: #6b7280;
          margin: 0;
        }

        @media (max-width: 768px) {
          .jurnal-stats {
            grid-template-columns: 1fr;
          }

          .jurnal-stat-value {
            font-size: 2rem;
          }

          .jurnal-table-wrap {
            overflow-x: scroll;
          }
        }
      `}</style>
    </div>
  );
}
