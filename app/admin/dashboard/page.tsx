"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

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

function IconArrowRight({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
      strokeLinejoin="round" className={className}>
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

function IconArrowUpRight({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
      strokeLinejoin="round" className={className}>
      <path d="M7 7h10v10" />
      <path d="M7 17 17 7" />
    </svg>
  );
}

function IconReview({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
      strokeLinejoin="round" className={className}>
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
      <path d="m9 15 2 2 4-4" />
    </svg>
  );
}

function IconInfo({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
      strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4" />
      <path d="M12 8h.01" />
    </svg>
  );
}

function IconActivity({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
      strokeLinejoin="round" className={className}>
      <path d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2" />
    </svg>
  );
}

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

function IconXCircle({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
      strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="10" />
      <path d="m15 9-6 6" />
      <path d="m9 9 6 6" />
    </svg>
  );
}

function IconChevronRight({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
      strokeLinejoin="round" className={className}>
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

interface Stats {
  totalSiswa: number;
  totalGuru: number;
  totalDudi: number;
  penempatanPending: number;
}

interface StatusDistribution {
  disetujui: number;
  pending: number;
  ditolak: number;
}

interface RecentActivity {
  id: string;
  user_email: string;
  aktivitas: string;
  modul: string;
  created_at: string;
}

interface DudiDistribution {
  nama_perusahaan: string;
  lokasi: string;
  jumlah_siswa: number;
  kapasitas: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({
    totalSiswa: 0,
    totalGuru: 0,
    totalDudi: 0,
    penempatanPending: 0,
  });

  const [statusDistribution, setStatusDistribution] = useState<StatusDistribution>({
    disetujui: 0,
    pending: 0,
    ditolak: 0,
  });

  const [recentActivities, setRecentActivities] = useState<RecentActivity[]>([]);
  const [dudiDistribution, setDudiDistribution] = useState<DudiDistribution[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);

      // Fetch all stats in parallel
      const [siswaRes, guruRes, dudiRes, penempatanRes, logsRes, dudiWithSiswa] = await Promise.all([
        supabase.from("siswa").select("*", { count: "exact", head: true }),
        supabase.from("guru").select("*", { count: "exact", head: true }),
        supabase.from("dudi").select("*", { count: "exact", head: true }),
        supabase.from("penempatan").select("status"),
        supabase
          .from("log_aktivitas")
          .select("id, aktivitas, modul, created_at, users:user_id (email)")
          .order("created_at", { ascending: false })
          .limit(5),
        supabase
          .from("penempatan")
          .select(`
            dudi_id,
            status,
            dudi:dudi_id (
              nama_perusahaan,
              lokasi,
              kapasitas
            )
          `)
          .eq("status", "disetujui")
      ]);

      // Set stats
      setStats({
        totalSiswa: siswaRes.count || 0,
        totalGuru: guruRes.count || 0,
        totalDudi: dudiRes.count || 0,
        penempatanPending: penempatanRes.data?.filter((p: any) => p.status === "pending").length || 0,
      });

      // Calculate status distribution
      const allPenempatan = penempatanRes.data || [];
      setStatusDistribution({
        disetujui: allPenempatan.filter((p: any) => p.status === "disetujui").length,
        pending: allPenempatan.filter((p: any) => p.status === "pending").length,
        ditolak: allPenempatan.filter((p: any) => p.status === "ditolak").length,
      });

      // Set recent activities
      const activities = (logsRes.data || []).map((log: any) => ({
        id: log.id,
        user_email: log.users?.email || "Unknown",
        aktivitas: log.aktivitas,
        modul: log.modul,
        created_at: log.created_at,
      }));
      setRecentActivities(activities);

      // Calculate DUDI distribution
      const dudiMap = new Map<string, DudiDistribution>();
      (dudiWithSiswa.data || []).forEach((item: any) => {
        if (item.dudi) {
          const dudiId = item.dudi_id;
          if (!dudiMap.has(dudiId)) {
            dudiMap.set(dudiId, {
              nama_perusahaan: item.dudi.nama_perusahaan,
              lokasi: item.dudi.lokasi,
              jumlah_siswa: 1,
              kapasitas: item.dudi.kapasitas || 10,
            });
          } else {
            dudiMap.get(dudiId)!.jumlah_siswa++;
          }
        }
      });

      setDudiDistribution(Array.from(dudiMap.values()));
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return "Baru saja";
    if (diffMins < 60) return `${diffMins} menit yang lalu`;
    if (diffHours < 24) return `sekitar ${diffHours} jam yang lalu`;
    return `${diffDays} hari yang lalu`;
  };

  const getDynamicDate = () => {
    const days = ['MINGGU', 'SENIN', 'SELASA', 'RABU', 'KAMIS', 'JUMAT', 'SABTU'];
    const months = ['JANUARI', 'FEBRUARI', 'MARET', 'APRIL', 'MEI', 'JUNI', 'JULI', 'AGUSTUS', 'SEPTEMBER', 'OKTOBER', 'NOVEMBER', 'DESEMBER'];
    
    const now = new Date();
    const dayName = days[now.getDay()];
    const date = now.getDate();
    const monthName = months[now.getMonth()];
    const year = now.getFullYear();
    
    return `${dayName}, ${date} ${monthName} ${year}`;
  };

  const getInitials = (email: string) => {
    if (email.includes("admin")) return "AD";
    if (email.includes("siswa")) return "SI";
    if (email.includes("guru")) return "GU";
    return email.substring(0, 2).toUpperCase();
  };

  const totalPenempatan = statusDistribution.disetujui + statusDistribution.pending + statusDistribution.ditolak;
  const percentDisetujui = totalPenempatan > 0 ? Math.round((statusDistribution.disetujui / totalPenempatan) * 100) : 0;
  const percentPending = totalPenempatan > 0 ? Math.round((statusDistribution.pending / totalPenempatan) * 100) : 0;
  const percentDitolak = totalPenempatan > 0 ? Math.round((statusDistribution.ditolak / totalPenempatan) * 100) : 0;

  if (loading) {
    return (
      <div className="db-container">
        <div style={{ padding: "2rem", textAlign: "center" }}>Loading...</div>
      </div>
    );
  }

  return (
    <div className="db-container db-animate-in">
      {/* Hero Card */}
      <div className="db-hero-card db-anim-item" style={{ animationDelay: '0.05s' }}>
        <div className="db-hero-content">
          <p className="db-hero-date">{getDynamicDate()}</p>
          <h2 className="db-hero-title">Selamat datang kembali, Admin</h2>
          <p className="db-hero-subtitle">
            Ada <strong>{stats.penempatanPending} pengajuan</strong> yang menunggu validasi Anda hari ini.
          </p>
        </div>
        <Link href="/admin/penempatan">
          <button className="db-hero-btn">
            <IconReview className="db-hero-btn-icon" />
            Tinjau Pengajuan
            <IconArrowRight className="db-hero-btn-arrow" />
          </button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="db-stats-grid db-anim-item" style={{ animationDelay: '0.1s' }}>
        {/* Total Siswa */}
        <Link href="/admin/siswa" className="db-stat-card-link">
          <div className="db-stat-card">
            <div className="db-stat-header">
              <div className="db-stat-icon-wrap db-stat-icon-blue">
                <IconUsers className="db-stat-icon" />
              </div>
              <button className="db-stat-link">
                <IconArrowUpRight className="db-stat-link-icon" />
              </button>
            </div>
            <p className="db-stat-label">TOTAL SISWA</p>
            <p className="db-stat-value">{stats.totalSiswa}</p>
            <p className="db-stat-sub">— Data real-time</p>
          </div>
        </Link>

        {/* Guru Pembimbing */}
        <Link href="/admin/guru" className="db-stat-card-link">
          <div className="db-stat-card">
            <div className="db-stat-header">
              <div className="db-stat-icon-wrap db-stat-icon-purple">
                <IconUserCheck className="db-stat-icon" />
              </div>
              <button className="db-stat-link">
                <IconArrowUpRight className="db-stat-link-icon" />
              </button>
            </div>
            <p className="db-stat-label">GURU PEMBIMBING</p>
            <p className="db-stat-value">{stats.totalGuru}</p>
            <p className="db-stat-sub">— Data real-time</p>
          </div>
        </Link>

        {/* Mitra DUDI */}
        <Link href="/admin/dudi" className="db-stat-card-link">
          <div className="db-stat-card">
            <div className="db-stat-header">
              <div className="db-stat-icon-wrap db-stat-icon-green">
                <IconBuilding2 className="db-stat-icon" />
              </div>
              <button className="db-stat-link">
                <IconArrowUpRight className="db-stat-link-icon" />
              </button>
            </div>
            <p className="db-stat-label">MITRA DUDI</p>
            <p className="db-stat-value">{stats.totalDudi}</p>
            <p className="db-stat-sub">— Data real-time</p>
          </div>
        </Link>

        {/* Menunggu Validasi */}
        <Link href="/admin/penempatan" className="db-stat-card-link">
          <div className="db-stat-card">
            <div className="db-stat-header">
              <div className="db-stat-icon-wrap db-stat-icon-orange">
                <IconClock className="db-stat-icon" />
              </div>
              <button className="db-stat-link">
                <IconArrowUpRight className="db-stat-link-icon" />
              </button>
            </div>
            <p className="db-stat-label">MENUNGGU VALIDASI</p>
            <p className="db-stat-value">{stats.penempatanPending}</p>
            <p className="db-stat-sub">— Data real-time</p>
          </div>
        </Link>
      </div>

      {/* Middle Section - Chart & Status */}
      <div className="db-middle-grid db-anim-item" style={{ animationDelay: '0.15s' }}>
        {/* Tren Pengajuan Magang with Chart */}
        <div className="db-card db-card-chart">
          <div className="db-card-header">
            <div>
              <h3 className="db-card-title">Tren Pengajuan Magang</h3>
              <p className="db-card-subtitle">Jumlah pengajuan & persetujuan 6 bulan terakhir</p>
            </div>
          </div>
          <div className="db-card-body">
            <div className="db-chart-area">
              <svg className="db-chart-svg" viewBox="0 0 600 200" preserveAspectRatio="none">
                {/* Simple area chart */}
                <path
                  d="M 0 180 L 100 170 L 200 160 L 300 120 L 400 90 L 500 70 L 600 60 L 600 200 L 0 200 Z"
                  fill="rgba(59, 130, 246, 0.15)"
                />
                
                {/* Simple line */}
                <polyline
                  points="0,180 100,170 200,160 300,120 400,90 500,70 600,60"
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth="2.5"
                />
              </svg>
              
              {/* Chart Labels */}
              <div className="db-chart-labels">
                <span className="db-chart-label">Jun</span>
                <span className="db-chart-label">Jul</span>
                <span className="db-chart-label">Agu</span>
                <span className="db-chart-label">Sep</span>
                <span className="db-chart-label">Okt</span>
              </div>
            </div>
          </div>
        </div>

        {/* Status Pengajuan */}
        <div className="db-card">
          <div className="db-card-header">
            <div>
              <h3 className="db-card-title">Status Pengajuan</h3>
              <p className="db-card-subtitle">Distribusi status magang siswa</p>
            </div>
            <Link href="/admin/penempatan" className="db-card-link">
              Detail
              <IconChevronRight className="db-card-link-icon" />
            </Link>
          </div>
          <div className="db-card-body">
            <div className="db-status-list-new">
              {/* Disetujui */}
              <div className="db-status-item-new">
                <div className="db-status-left">
                  <div className="db-status-icon-wrap db-status-icon-green">
                    <IconCheckCircle className="db-status-icon-sm" />
                  </div>
                  <span className="db-status-label-new">Disetujui</span>
                </div>
                <div className="db-status-right">
                  <span className="db-status-value-new">{statusDistribution.disetujui}</span>
                  <span className="db-status-percent">{percentDisetujui}%</span>
                </div>
                <div className="db-status-bar-bg">
                  <div className="db-status-bar db-status-bar-green" style={{ width: `${percentDisetujui}%` }}></div>
                </div>
              </div>

              {/* Menunggu */}
              <div className="db-status-item-new">
                <div className="db-status-left">
                  <div className="db-status-icon-wrap db-status-icon-orange">
                    <IconClock className="db-status-icon-sm" />
                  </div>
                  <span className="db-status-label-new">Menunggu</span>
                </div>
                <div className="db-status-right">
                  <span className="db-status-value-new">{statusDistribution.pending}</span>
                  <span className="db-status-percent">{percentPending}%</span>
                </div>
                <div className="db-status-bar-bg">
                  <div className="db-status-bar db-status-bar-orange" style={{ width: `${percentPending}%` }}></div>
                </div>
              </div>

              {/* Ditolak */}
              <div className="db-status-item-new">
                <div className="db-status-left">
                  <div className="db-status-icon-wrap db-status-icon-red">
                    <IconXCircle className="db-status-icon-sm" />
                  </div>
                  <span className="db-status-label-new">Ditolak</span>
                </div>
                <div className="db-status-right">
                  <span className="db-status-value-new">{statusDistribution.ditolak}</span>
                  <span className="db-status-percent">{percentDitolak}%</span>
                </div>
                <div className="db-status-bar-bg">
                  <div className="db-status-bar db-status-bar-red" style={{ width: `${percentDitolak}%` }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section - Activities & Quick Links */}
      <div className="db-bottom-grid-new db-anim-item" style={{ animationDelay: '0.2s' }}>
        {/* Aktivitas Sistem Terakhir */}
        <div className="db-card">
          <div className="db-card-header">
            <div>
              <h3 className="db-card-title">Aktivitas Sistem Terakhir</h3>
              <p className="db-card-subtitle">Log aktivitas terbaru dari seluruh pengguna</p>
            </div>
          </div>
          <div className="db-card-body">
            <div className="db-activity-list">
              {recentActivities.length === 0 ? (
                <div style={{ padding: "1rem", textAlign: "center", color: "#666" }}>
                  Belum ada aktivitas
                </div>
              ) : (
                recentActivities.map((activity) => (
                  <div key={activity.id} className="db-activity-item">
                    <div className="db-activity-avatar">{getInitials(activity.user_email)}</div>
                    <div className="db-activity-content">
                      <div className="db-activity-row">
                        <span className="db-activity-action">{activity.aktivitas}</span>
                        <span className="db-activity-time">{formatTimeAgo(activity.created_at)}</span>
                      </div>
                      <p className="db-activity-email">{activity.user_email} → {activity.modul}</p>
                    </div>
                    <button className="db-activity-info-btn">
                      <IconInfo className="db-activity-info-icon" />
                      INFO
                    </button>
                  </div>
                ))
              )}
            </div>
            <Link href="/admin/log" className="db-card-footer-link">
              Lihat semua log
              <IconArrowRight className="db-card-footer-icon" />
            </Link>
          </div>
        </div>

        {/* Kelola Data */}
        <div className="db-card">
          <div className="db-card-header">
            <div>
              <h3 className="db-card-title">Kelola Data</h3>
              <p className="db-card-subtitle">Pintasan navigasi dan manajemen data master</p>
            </div>
          </div>
          <div className="db-card-body">
            <div className="db-quick-links">
              <Link href="/admin/siswa" className="db-quick-link-item">
                <div className="db-quick-icon-wrap db-quick-icon-blue">
                  <IconUsers className="db-quick-icon" />
                </div>
                <div className="db-quick-content">
                  <p className="db-quick-title">Data Siswa</p>
                  <p className="db-quick-subtitle">{stats.totalSiswa} siswa terdaftar</p>
                </div>
                <IconChevronRight className="db-quick-chevron" />
              </Link>

              <Link href="/admin/guru" className="db-quick-link-item">
                <div className="db-quick-icon-wrap db-quick-icon-purple">
                  <IconUserCheck className="db-quick-icon" />
                </div>
                <div className="db-quick-content">
                  <p className="db-quick-title">Data Guru</p>
                  <p className="db-quick-subtitle">{stats.totalGuru} guru pembimbing aktif</p>
                </div>
                <IconChevronRight className="db-quick-chevron" />
              </Link>

              <Link href="/admin/dudi" className="db-quick-link-item">
                <div className="db-quick-icon-wrap db-quick-icon-green">
                  <IconBuilding2 className="db-quick-icon" />
                </div>
                <div className="db-quick-content">
                  <p className="db-quick-title">Mitra DUDI</p>
                  <p className="db-quick-subtitle">{stats.totalDudi} perusahaan terverifikasi</p>
                </div>
                <IconChevronRight className="db-quick-chevron" />
              </Link>

              <Link href="/admin/penempatan" className="db-quick-link-item">
                <div className="db-quick-icon-wrap db-quick-icon-orange">
                  <IconMapPin className="db-quick-icon" />
                </div>
                <div className="db-quick-content">
                  <p className="db-quick-title">Penempatan Magang</p>
                  <p className="db-quick-subtitle">{stats.penempatanPending} pengajuan menunggu validasi</p>
                </div>
                <IconChevronRight className="db-quick-chevron" />
              </Link>

              <Link href="/admin/monitoring" className="db-quick-link-item">
                <div className="db-quick-icon-wrap db-quick-icon-cyan">
                  <IconActivity className="db-quick-icon" />
                </div>
                <div className="db-quick-content">
                  <p className="db-quick-title">Monitoring Global</p>
                  <p className="db-quick-subtitle">Pantau absensi & jurnal siswa</p>
                </div>
                <IconChevronRight className="db-quick-chevron" />
              </Link>
            </div>
            <div className="db-quick-footer">
              <span className="db-quick-footer-text">5 Modul Terhubung</span>
              <span className="db-quick-footer-badge">Panel SIMMAS</span>
            </div>
          </div>
        </div>
      </div>

      {/* Sebaran Siswa per Tempat Magang */}
      <div className="db-card db-card-full db-anim-item" style={{ animationDelay: '0.25s' }}>
        <div className="db-card-header">
          <div>
            <h3 className="db-card-title">Sebaran Siswa per Tempat Magang</h3>
            <p className="db-card-subtitle">Jumlah siswa aktif magang di tiap mitra DUDI</p>
          </div>
        </div>
        <div className="db-card-body">
          <div className="db-dudi-table">
            <div className="db-dudi-header">
              <div className="db-dudi-col-name">MITRA DUDI</div>
              <div className="db-dudi-col-count">SISWA MAGANG</div>
              <div className="db-dudi-col-progress">PROPORSI</div>
            </div>
            {dudiDistribution.length === 0 ? (
              <div style={{ padding: "1rem", textAlign: "center", color: "#666" }}>
                Belum ada data penempatan
              </div>
            ) : (
              dudiDistribution.map((dudi, index) => {
                const percent = Math.round((dudi.jumlah_siswa / dudi.kapasitas) * 100);
                return (
                  <div key={index} className="db-dudi-row">
                    <div className="db-dudi-col-name">
                      <p className="db-dudi-name">{dudi.nama_perusahaan}</p>
                      <p className="db-dudi-location">{dudi.lokasi}</p>
                    </div>
                    <div className="db-dudi-col-count">
                      <span className="db-dudi-count">{dudi.jumlah_siswa}</span>
                      <span className="db-dudi-total">/{dudi.kapasitas}</span>
                    </div>
                    <div className="db-dudi-col-progress">
                      <div className="db-dudi-progress-bar">
                        <div className="db-dudi-progress-fill" style={{ width: `${Math.min(percent, 100)}%` }}></div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
