"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface LogActivity {
  id: string;
  user_id: string;
  aktivitas: string;
  modul: string;
  deskripsi: string;
  ip_address: string | null;
  user_agent: string | null;
  created_at: string;
  users: {
    email: string;
  } | null;
}

export default function LogAktivitas() {
  const [logs, setLogs] = useState<LogActivity[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterModul, setFilterModul] = useState("ALL");
  const [filterAktivitas, setFilterAktivitas] = useState("ALL");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const logsPerPage = 20;

  useEffect(() => {
    fetchLogs();
  }, [currentPage, filterModul, filterAktivitas, searchTerm]);

  const fetchLogs = async () => {
    try {
      setLoading(true);

      let query = supabase
        .from("log_aktivitas")
        .select("*, users:user_id (email)", { count: "exact" })
        .order("created_at", { ascending: false });

      // Apply filters
      if (filterModul !== "ALL") {
        query = query.eq("modul", filterModul);
      }

      if (filterAktivitas !== "ALL") {
        query = query.eq("aktivitas", filterAktivitas);
      }

      if (searchTerm) {
        query = query.or(`deskripsi.ilike.%${searchTerm}%,users.email.ilike.%${searchTerm}%`);
      }

      // Apply pagination
      const from = (currentPage - 1) * logsPerPage;
      const to = from + logsPerPage - 1;
      query = query.range(from, to);

      const { data, error, count } = await query;

      if (error) throw error;

      setLogs(data || []);
      setTotalCount(count || 0);
    } catch (error) {
      console.error("Error fetching logs:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString("id-ID", {
      dateStyle: "medium",
      timeStyle: "medium",
    });
  };

  const getActivityBadgeColor = (aktivitas: string) => {
    if (aktivitas.includes("SUCCESS") || aktivitas.includes("CREATE")) return "badge-success";
    if (aktivitas.includes("FAILED") || aktivitas.includes("DELETE")) return "badge-danger";
    if (aktivitas.includes("UPDATE")) return "badge-warning";
    if (aktivitas.includes("LOGOUT")) return "badge-secondary";
    return "badge-info";
  };

  const getModulBadgeColor = (modul: string) => {
    switch (modul) {
      case "AUTH": return "badge-primary";
      case "GURU": return "badge-purple";
      case "SISWA": return "badge-blue";
      case "DUDI": return "badge-green";
      case "PENEMPATAN": return "badge-orange";
      case "ABSENSI": return "badge-cyan";
      case "JURNAL": return "badge-indigo";
      case "KUNJUNGAN": return "badge-pink";
      default: return "badge-secondary";
    }
  };

  const totalPages = Math.ceil(totalCount / logsPerPage);

  return (
    <div className="db-admin-content">
      <div className="db-page-header">
        <div>
          <h1 className="db-page-title">Log Aktivitas Sistem</h1>
          <p className="db-page-subtitle">
            Riwayat aktivitas lengkap dari semua pengguna SIMMAS
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="db-filter-section">
        <div className="db-search-box">
          <svg
            className="db-search-icon"
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <input
            type="text"
            className="db-search-input"
            placeholder="Cari email, deskripsi aktivitas..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>

        <div className="db-filter-group">
          <select
            className="db-filter-select"
            value={filterModul}
            onChange={(e) => {
              setFilterModul(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="ALL">Semua Modul</option>
            <option value="AUTH">AUTH</option>
            <option value="GURU">GURU</option>
            <option value="SISWA">SISWA</option>
            <option value="DUDI">DUDI</option>
            <option value="PENEMPATAN">PENEMPATAN</option>
            <option value="ABSENSI">ABSENSI</option>
            <option value="JURNAL">JURNAL</option>
            <option value="KUNJUNGAN">KUNJUNGAN</option>
          </select>

          <select
            className="db-filter-select"
            value={filterAktivitas}
            onChange={(e) => {
              setFilterAktivitas(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="ALL">Semua Aktivitas</option>
            <option value="LOGIN_SUCCESS">LOGIN SUCCESS</option>
            <option value="LOGIN_FAILED">LOGIN FAILED</option>
            <option value="LOGOUT">LOGOUT</option>
            <option value="CREATE">CREATE</option>
            <option value="UPDATE">UPDATE</option>
            <option value="DELETE">DELETE</option>
          </select>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="log-stats-grid">
        <div className="log-stat-card">
          <div className="log-stat-icon log-stat-icon-blue">📊</div>
          <div className="log-stat-content">
            <p className="log-stat-value">{totalCount}</p>
            <p className="log-stat-label">Total Log</p>
          </div>
        </div>
        <div className="log-stat-card">
          <div className="log-stat-icon log-stat-icon-green">✅</div>
          <div className="log-stat-content">
            <p className="log-stat-value">{logs.filter(l => l.aktivitas.includes("SUCCESS")).length}</p>
            <p className="log-stat-label">Berhasil</p>
          </div>
        </div>
        <div className="log-stat-card">
          <div className="log-stat-icon log-stat-icon-red">❌</div>
          <div className="log-stat-content">
            <p className="log-stat-value">{logs.filter(l => l.aktivitas.includes("FAILED")).length}</p>
            <p className="log-stat-label">Gagal</p>
          </div>
        </div>
        <div className="log-stat-card">
          <div className="log-stat-icon log-stat-icon-purple">👤</div>
          <div className="log-stat-content">
            <p className="log-stat-value">{new Set(logs.map(l => l.user_id)).size}</p>
            <p className="log-stat-label">User Aktif</p>
          </div>
        </div>
      </div>

      {/* Logs Table */}
      <div className="db-table-card">
        {loading ? (
          <div className="db-loading">Loading...</div>
        ) : logs.length === 0 ? (
          <div className="db-empty-state">
            <p>Tidak ada log aktivitas yang ditemukan</p>
          </div>
        ) : (
          <>
            <div className="log-table-wrapper">
              <table className="log-table">
                <thead>
                  <tr>
                    <th>Waktu</th>
                    <th>User</th>
                    <th>Modul</th>
                    <th>Aktivitas</th>
                    <th>Deskripsi</th>
                    <th>IP Address</th>
                  </tr>
                </thead>
                <tbody>
                  {logs.map((log) => (
                    <tr key={log.id}>
                      <td className="log-time">{formatDate(log.created_at)}</td>
                      <td className="log-user">
                        <div className="log-user-info">
                          <div className="log-user-avatar">
                            {(log.users?.email || "?").substring(0, 2).toUpperCase()}
                          </div>
                          <span>{log.users?.email || "Unknown"}</span>
                        </div>
                      </td>
                      <td>
                        <span className={`log-badge ${getModulBadgeColor(log.modul)}`}>
                          {log.modul}
                        </span>
                      </td>
                      <td>
                        <span className={`log-badge ${getActivityBadgeColor(log.aktivitas)}`}>
                          {log.aktivitas}
                        </span>
                      </td>
                      <td className="log-description">{log.deskripsi}</td>
                      <td className="log-ip">{log.ip_address || "-"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="db-pagination">
              <div className="db-pagination-info">
                Menampilkan {Math.min((currentPage - 1) * logsPerPage + 1, totalCount)} - {Math.min(currentPage * logsPerPage, totalCount)} dari {totalCount} log
              </div>
              <div className="db-pagination-buttons">
                <button
                  className="db-pagination-btn"
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
                <span className="db-pagination-page">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  className="db-pagination-btn"
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      <style jsx>{`
        .log-stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .log-stat-card {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem;
          background: white;
          border-radius: 8px;
          border: 1px solid #e5e7eb;
        }

        .log-stat-icon {
          width: 50px;
          height: 50px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 8px;
          font-size: 1.5rem;
        }

        .log-stat-icon-blue { background: #dbeafe; }
        .log-stat-icon-green { background: #d1fae5; }
        .log-stat-icon-red { background: #fee2e2; }
        .log-stat-icon-purple { background: #e9d5ff; }

        .log-stat-value {
          font-size: 1.5rem;
          font-weight: 700;
          color: #111827;
          margin: 0;
        }

        .log-stat-label {
          font-size: 0.875rem;
          color: #6b7280;
          margin: 0;
        }

        .log-table-wrapper {
          overflow-x: auto;
        }

        .log-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 0.875rem;
        }

        .log-table thead {
          background: #f9fafb;
          border-bottom: 2px solid #e5e7eb;
        }

        .log-table th {
          padding: 0.75rem 1rem;
          text-align: left;
          font-weight: 600;
          color: #374151;
          text-transform: uppercase;
          font-size: 0.75rem;
          letter-spacing: 0.05em;
        }

        .log-table td {
          padding: 0.75rem 1rem;
          border-bottom: 1px solid #e5e7eb;
          color: #111827;
        }

        .log-table tbody tr:hover {
          background: #f9fafb;
        }

        .log-time {
          font-family: monospace;
          font-size: 0.8125rem;
          color: #6b7280;
          white-space: nowrap;
        }

        .log-user-info {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .log-user-avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: #3b82f6;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          font-size: 0.75rem;
        }

        .log-badge {
          display: inline-block;
          padding: 0.25rem 0.625rem;
          border-radius: 9999px;
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          white-space: nowrap;
        }

        .badge-success {
          background: #d1fae5;
          color: #065f46;
        }

        .badge-danger {
          background: #fee2e2;
          color: #991b1b;
        }

        .badge-warning {
          background: #fed7aa;
          color: #92400e;
        }

        .badge-info {
          background: #dbeafe;
          color: #1e40af;
        }

        .badge-secondary {
          background: #e5e7eb;
          color: #374151;
        }

        .badge-primary {
          background: #dbeafe;
          color: #1e40af;
        }

        .badge-purple {
          background: #e9d5ff;
          color: #6b21a8;
        }

        .badge-blue {
          background: #dbeafe;
          color: #1e3a8a;
        }

        .badge-green {
          background: #d1fae5;
          color: #065f46;
        }

        .badge-orange {
          background: #fed7aa;
          color: #92400e;
        }

        .badge-cyan {
          background: #cffafe;
          color: #155e75;
        }

        .badge-indigo {
          background: #e0e7ff;
          color: #3730a3;
        }

        .badge-pink {
          background: #fce7f3;
          color: #9f1239;
        }

        .log-description {
          max-width: 300px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .log-ip {
          font-family: monospace;
          font-size: 0.8125rem;
          color: #6b7280;
        }
      `}</style>
    </div>
  );
}
