"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

/* ─── Icons ─── */
function IconUsers({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
      strokeLinejoin="round" className={className} style={style}>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function IconTarget({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
      strokeLinejoin="round" className={className} style={style}>
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  );
}

function IconCheckCircle({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
      strokeLinejoin="round" className={className} style={style}>
      <circle cx="12" cy="12" r="10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

function IconSearch({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
      strokeLinejoin="round" className={className} style={style}>
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

interface SiswaStats {
  totalBimbingan: number;
  sedangAktif: number;
  selesai: number;
}

export default function GuruSiswa() {
  const [stats, setStats] = useState<SiswaStats>({
    totalBimbingan: 0,
    sedangAktif: 0,
    selesai: 0,
  });
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);

      // Get guru data
      const userData = localStorage.getItem("simmas_user");
      if (!userData) {
        return;
      }

      const user = JSON.parse(userData);
      const userId = user.userId || user.id;

      // Get guru_id
      const { data: guruData } = await supabase
        .from("guru")
        .select("id")
        .eq("user_id", userId)
        .single();

      if (!guruData) {
        return;
      }

      // Get siswa bimbingan count
      const { data: siswaBimbingan } = await supabase
        .from("siswa")
        .select("id, status")
        .eq("guru_id", guruData.id);

      const total = siswaBimbingan?.length || 0;
      const aktif = siswaBimbingan?.filter((s: any) => s.status === "aktif").length || 0;
      const selesai = siswaBimbingan?.filter((s: any) => s.status === "lulus" || s.status === "selesai").length || 0;

      setStats({
        totalBimbingan: total,
        sedangAktif: aktif,
        selesai: selesai,
      });
    } catch (error) {
      console.error("Error fetching stats:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="db-container db-animate-in">
      {/* Header dengan Icon */}
      <div className="guru-siswa-header">
        <div className="guru-siswa-header-icon">
          <IconUsers className="guru-siswa-icon" />
        </div>
        <h1 className="guru-siswa-title">Bimbingan Siswa</h1>
      </div>

      {/* Stats Cards */}
      <div className="guru-siswa-stats">
        {/* Total Bimbingan */}
        <div className="guru-siswa-stat-card">
          <div className="guru-siswa-stat-header">
            <span className="guru-siswa-stat-label">TOTAL BIMBINGAN</span>
            <div className="guru-siswa-stat-icon guru-siswa-stat-icon-blue">
              <IconUsers style={{ width: '20px', height: '20px' }} />
            </div>
          </div>
          <div className="guru-siswa-stat-body">
            <p className="guru-siswa-stat-value">{stats.totalBimbingan}</p>
            <p className="guru-siswa-stat-desc">Siswa di-plot ke Anda</p>
          </div>
        </div>

        {/* Sedang Aktif */}
        <div className="guru-siswa-stat-card">
          <div className="guru-siswa-stat-header">
            <span className="guru-siswa-stat-label">SEDANG AKTIF</span>
            <div className="guru-siswa-stat-icon guru-siswa-stat-icon-orange">
              <IconTarget style={{ width: '20px', height: '20px' }} />
            </div>
          </div>
          <div className="guru-siswa-stat-body">
            <p className="guru-siswa-stat-value">{stats.sedangAktif}</p>
            <p className="guru-siswa-stat-desc">Aktif di tempat magang</p>
          </div>
        </div>

        {/* Selesai (Dinilai) */}
        <div className="guru-siswa-stat-card">
          <div className="guru-siswa-stat-header">
            <span className="guru-siswa-stat-label">SELESAI (DINILAI)</span>
            <div className="guru-siswa-stat-icon guru-siswa-stat-icon-green">
              <IconCheckCircle style={{ width: '20px', height: '20px' }} />
            </div>
          </div>
          <div className="guru-siswa-stat-body">
            <p className="guru-siswa-stat-value">{stats.selesai}</p>
            <p className="guru-siswa-stat-desc">Sudah diberi nilai</p>
          </div>
        </div>
      </div>

      {/* Content Card: Search + Empty State */}
      <div className="guru-siswa-content-card">
        {/* Search Box */}
        <div className="guru-siswa-search-section">
          <div style={{ position: 'relative', maxWidth: '100%' }}>
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
              className="guru-siswa-search-input"
              placeholder="Cari nama, NIS, atau kelas..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ paddingLeft: '2.75rem' }}
            />
          </div>
        </div>

        {/* Empty State */}
        <div className="guru-siswa-empty">
          <div className="guru-siswa-empty-icon">
            <IconUsers />
          </div>
          <h3 className="guru-siswa-empty-title">Belum ada siswa bimbingan</h3>
          <p className="guru-siswa-empty-desc">
            Siswa yang di-plot ke Anda oleh admin akan muncul di sini.
          </p>
        </div>
      </div>

      <style jsx>{`
        .guru-siswa-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 2rem;
        }

        .guru-siswa-header-icon {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
        }

        .guru-siswa-icon {
          width: 28px;
          height: 28px;
        }

        .guru-siswa-title {
          font-size: 1.75rem;
          font-weight: 700;
          color: #111827;
          margin: 0;
        }

        .guru-siswa-stats {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        .guru-siswa-stat-card {
          background: white;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          padding: 1.5rem;
          transition: all 0.2s;
        }

        .guru-siswa-stat-card:hover {
          border-color: #3b82f6;
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.1);
          transform: translateY(-2px);
        }

        .guru-siswa-stat-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }

        .guru-siswa-stat-label {
          font-size: 0.75rem;
          font-weight: 600;
          color: #6b7280;
          letter-spacing: 0.05em;
        }

        .guru-siswa-stat-icon {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .guru-siswa-stat-icon-blue {
          background: #dbeafe;
          color: #3b82f6;
        }

        .guru-siswa-stat-icon-orange {
          background: #fed7aa;
          color: #f97316;
        }

        .guru-siswa-stat-icon-green {
          background: #d1fae5;
          color: #10b981;
        }

        .guru-siswa-stat-body {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .guru-siswa-stat-value {
          font-size: 2.5rem;
          font-weight: 700;
          color: #111827;
          line-height: 1;
          margin: 0;
        }

        .guru-siswa-stat-desc {
          font-size: 0.875rem;
          color: #6b7280;
          margin: 0;
        }

        .guru-siswa-content-card {
          background: white;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          overflow: hidden;
        }

        .guru-siswa-search-section {
          padding: 1.25rem 1.5rem;
          background: #f9fafb;
          border-bottom: 1px solid #e5e7eb;
        }

        .guru-siswa-search-box {
          position: relative;
          max-width: 100%;
        }

        .guru-siswa-search-icon {
          position: absolute;
          left: 1rem;
          top: 50%;
          transform: translateY(-50%);
          color: #9ca3af;
          pointer-events: none;
        }

        .guru-siswa-search-input {
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

        .guru-siswa-search-input::placeholder {
          color: #9ca3af;
        }

        .guru-siswa-search-input:focus {
          border-color: #3b82f6;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.05);
        }

        .guru-siswa-empty {
          padding: 4rem 2rem;
          text-align: center;
        }

        .guru-siswa-empty-icon {
          width: 80px;
          height: 80px;
          margin: 0 auto 1.5rem;
          border-radius: 50%;
          background: #dbeafe;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #3b82f6;
        }

        .guru-siswa-empty-icon svg {
          width: 40px;
          height: 40px;
        }

        .guru-siswa-empty-title {
          font-size: 1.25rem;
          font-weight: 600;
          color: #111827;
          margin: 0 0 0.5rem 0;
        }

        .guru-siswa-empty-desc {
          font-size: 0.9375rem;
          color: #6b7280;
          margin: 0;
          max-width: 500px;
          margin-left: auto;
          margin-right: auto;
        }

        @media (max-width: 768px) {
          .guru-siswa-stats {
            grid-template-columns: 1fr;
          }

          .guru-siswa-stat-value {
            font-size: 2rem;
          }
        }
      `}</style>
    </div>
  );
}
