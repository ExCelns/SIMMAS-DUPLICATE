"use client";

import { useState, useRef, useEffect } from "react";
import { supabase } from "@/lib/supabase";

/* ─── Icons ─── */
function IconCheck({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
      strokeLinejoin="round" className={className} style={style}>
      <path d="M9 12l2 2 4-4m6-2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function IconClock({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
      strokeLinejoin="round" className={className} style={style}>
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function IconImage({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
      strokeLinejoin="round" className={className} style={style}>
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <polyline points="21 15 16 10 5 21" />
    </svg>
  );
}

function IconX({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
      strokeLinejoin="round" className={className} style={style}>
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}

interface AbsensiData {
  id: string;
  tanggal: string;
  waktu_masuk: string | null;
  waktu_keluar: string | null;
  status: string;
  foto_masuk_url: string | null;
  foto_keluar_url: string | null;
}

export default function SiswaAbsensiPage() {
  const [loading, setLoading] = useState(true);
  const [todayAbsensi, setTodayAbsensi] = useState<AbsensiData | null>(null);
  const [absensiHistory, setAbsensiHistory] = useState<AbsensiData[]>([]);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showPhotoModal, setShowPhotoModal] = useState(false);
  const [photoToView, setPhotoToView] = useState<{ url: string; type: string } | null>(null);

  // Load data on mount
  useEffect(() => {
    loadAbsensiData();
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  async function loadAbsensiData() {
    try {
      setLoading(true);
      
      // Get current user (from Supabase Auth atau localStorage)
      const userData = localStorage.getItem("simmas_user");
      if (!userData) {
        alert("Silakan login terlebih dahulu");
        window.location.href = "/login";
        return;
      }

      const user = JSON.parse(userData);
      const userId = user.userId || user.id;

      // Get siswa data
      const { data: siswaData, error: siswaError } = await supabase
        .from("siswa")
        .select("id")
        .eq("user_id", userId)
        .single();

      if (siswaError || !siswaData) {
        console.error("Error fetching siswa:", siswaError);
        return;
      }

      const siswaId = siswaData.id;
      const today = new Date().toISOString().split('T')[0];

      // Get today's absensi
      const { data: todayData, error: todayError } = await supabase
        .from("absensi")
        .select("*")
        .eq("siswa_id", siswaId)
        .eq("tanggal", today)
        .single();

      if (!todayError && todayData) {
        setTodayAbsensi(todayData);
      }

      // Get history (last 30 days)
      const { data: historyData, error: historyError } = await supabase
        .from("absensi")
        .select("*")
        .eq("siswa_id", siswaId)
        .order("tanggal", { ascending: false })
        .limit(30);

      if (!historyError && historyData) {
        setAbsensiHistory(historyData);
      }

    } catch (error) {
      console.error("Error loading absensi:", error);
    } finally {
      setLoading(false);
    }
  }

  function formatTime(time: string | null) {
    if (!time) return "-";
    return time.substring(0, 5); // Get HH:MM
  }

  function formatDate(dateString: string) {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      day: 'numeric', 
      month: 'long' 
    };
    return new Intl.DateTimeFormat('id-ID', options).format(date);
  }

  function handleViewPhoto(url: string, type: string) {
    setPhotoToView({ url, type });
    setShowPhotoModal(true);
  }

  function handleCloseModal() {
    setShowPhotoModal(false);
    setPhotoToView(null);
  }

  async function handleClockIn() {
    window.location.href = "/siswa/absensi/clock-in";
  }

  async function handleClockOut() {
    window.location.href = "/siswa/absensi/clock-out";
  }

  if (loading) {
    return (
      <div style={{ padding: '24px', textAlign: 'center' }}>
        <p>Loading...</p>
      </div>
    );
  }

  const hasClockIn = todayAbsensi && todayAbsensi.waktu_masuk;
  const hasClockOut = todayAbsensi && todayAbsensi.waktu_keluar;

  return (
    <div style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto' }}>
      {/* Header Card - Today's Status */}
      <div style={{
        background: hasClockIn ? '#f0fdf4' : '#fff7ed',
        border: `2px solid ${hasClockIn ? '#bbf7d0' : '#fed7aa'}`,
        borderRadius: '16px',
        padding: '24px',
        marginBottom: '24px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
          <div style={{
            width: '48px',
            height: '48px',
            background: hasClockIn ? '#22c55e' : '#f97316',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <IconCheck style={{ width: '28px', height: '28px', color: '#fff' }} />
          </div>
          <div style={{ flex: 1 }}>
            <h2 style={{ 
              margin: 0, 
              fontSize: '1.125rem', 
              fontWeight: '700',
              color: hasClockIn ? '#166534' : '#9a3412'
            }}>
              {hasClockIn ? '✓ Kamu sudah absen hari ini' : '⚠ Belum absen hari ini'}
            </h2>
            <p style={{ 
              margin: '4px 0 0', 
              fontSize: '0.875rem', 
              color: hasClockIn ? '#166534' : '#9a3412',
              opacity: 0.8
            }}>
              {formatDate(new Date().toISOString())}
            </p>
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              onClick={handleClockIn}
              disabled={!!hasClockIn}
              style={{
                padding: '10px 20px',
                background: hasClockIn ? '#d1d5db' : '#10b981',
                color: '#fff',
                border: 'none',
                borderRadius: '10px',
                fontSize: '0.875rem',
                fontWeight: '600',
                cursor: hasClockIn ? 'not-allowed' : 'pointer',
                transition: 'background 0.15s'
              }}
            >
              Clock In
            </button>
            <button
              onClick={handleClockOut}
              disabled={!(hasClockIn && !hasClockOut)}
              style={{
                padding: '10px 20px',
                background: (!hasClockIn || hasClockOut) ? '#d1d5db' : '#6366f1',
                color: '#fff',
                border: 'none',
                borderRadius: '10px',
                fontSize: '0.875rem',
                fontWeight: '600',
                cursor: (!hasClockIn || hasClockOut) ? 'not-allowed' : 'pointer',
                transition: 'background 0.15s'
              }}
            >
              Clock Out
            </button>
          </div>
        </div>

        {/* Time Display */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '16px',
          marginTop: '16px'
        }}>
          <div>
            <p style={{ 
              margin: 0, 
              fontSize: '0.75rem', 
              fontWeight: '600',
              color: '#6b7280',
              marginBottom: '4px',
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}>
              Masuk
            </p>
            <p style={{ 
              margin: 0, 
              fontSize: '1.5rem', 
              fontWeight: '700',
              color: '#111827'
            }}>
              {hasClockIn ? formatTime(todayAbsensi.waktu_masuk) : '-'}
            </p>
          </div>
          <div>
            <p style={{ 
              margin: 0, 
              fontSize: '0.75rem', 
              fontWeight: '600',
              color: '#6b7280',
              marginBottom: '4px',
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}>
              Pulang
            </p>
            <p style={{ 
              margin: 0, 
              fontSize: '1.5rem', 
              fontWeight: '700',
              color: '#111827'
            }}>
              {hasClockOut ? formatTime(todayAbsensi.waktu_keluar) : '-'}
            </p>
          </div>
        </div>
      </div>

      {/* History Card */}
      <div style={{
        background: '#fff',
        borderRadius: '16px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        overflow: 'hidden'
      }}>
        <div style={{ padding: '20px', borderBottom: '1px solid #f3f4f6' }}>
          <h3 style={{ 
            margin: 0, 
            fontSize: '1.125rem', 
            fontWeight: '700',
            color: '#111827'
          }}>
            Riwayat Bulan Ini
          </h3>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead style={{ background: '#f9fafb' }}>
              <tr>
                <th style={{ 
                  padding: '12px 20px', 
                  textAlign: 'left',
                  fontSize: '0.75rem',
                  fontWeight: '600',
                  color: '#6b7280',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}>
                  TANGGAL
                </th>
                <th style={{ 
                  padding: '12px 20px', 
                  textAlign: 'center',
                  fontSize: '0.75rem',
                  fontWeight: '600',
                  color: '#6b7280',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}>
                  STATUS
                </th>
                <th style={{ 
                  padding: '12px 20px', 
                  textAlign: 'center',
                  fontSize: '0.75rem',
                  fontWeight: '600',
                  color: '#6b7280',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}>
                  MASUK
                </th>
                <th style={{ 
                  padding: '12px 20px', 
                  textAlign: 'center',
                  fontSize: '0.75rem',
                  fontWeight: '600',
                  color: '#6b7280',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}>
                  PULANG
                </th>
                <th style={{ 
                  padding: '12px 20px', 
                  textAlign: 'center',
                  fontSize: '0.75rem',
                  fontWeight: '600',
                  color: '#6b7280',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}>
                  FOTO
                </th>
              </tr>
            </thead>
            <tbody>
              {absensiHistory.length === 0 ? (
                <tr>
                  <td colSpan={5} style={{ 
                    padding: '40px', 
                    textAlign: 'center',
                    color: '#9ca3af',
                    fontSize: '0.875rem'
                  }}>
                    Belum ada riwayat absensi
                  </td>
                </tr>
              ) : (
                absensiHistory.map((absensi) => (
                  <tr key={absensi.id} style={{ borderBottom: '1px solid #f3f4f6' }}>
                    <td style={{ padding: '16px 20px', fontSize: '0.875rem', color: '#111827' }}>
                      {formatDate(absensi.tanggal)}
                    </td>
                    <td style={{ padding: '16px 20px', textAlign: 'center' }}>
                      <span style={{
                        display: 'inline-block',
                        padding: '4px 12px',
                        borderRadius: '9999px',
                        fontSize: '0.75rem',
                        fontWeight: '600',
                        background: absensi.status === 'hadir' ? '#dcfce7' : '#fee2e2',
                        color: absensi.status === 'hadir' ? '#166534' : '#991b1b'
                      }}>
                        • {absensi.status === 'hadir' ? 'Hadir' : 'Alpha'}
                      </span>
                    </td>
                    <td style={{ 
                      padding: '16px 20px', 
                      textAlign: 'center',
                      fontSize: '0.875rem',
                      fontWeight: '600',
                      color: '#111827'
                    }}>
                      {formatTime(absensi.waktu_masuk)}
                    </td>
                    <td style={{ 
                      padding: '16px 20px', 
                      textAlign: 'center',
                      fontSize: '0.875rem',
                      fontWeight: '600',
                      color: '#111827'
                    }}>
                      {formatTime(absensi.waktu_keluar)}
                    </td>
                    <td style={{ padding: '16px 20px', textAlign: 'center' }}>
                      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                        {absensi.foto_masuk_url && (
                          <button
                            onClick={() => handleViewPhoto(absensi.foto_masuk_url!, 'Masuk')}
                            style={{
                              padding: '6px 12px',
                              background: '#eff6ff',
                              color: '#2563eb',
                              border: '1px solid #dbeafe',
                              borderRadius: '6px',
                              fontSize: '0.75rem',
                              fontWeight: '600',
                              cursor: 'pointer',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '4px'
                            }}
                          >
                            <IconImage />
                            Masuk
                          </button>
                        )}
                        {absensi.foto_keluar_url && (
                          <button
                            onClick={() => handleViewPhoto(absensi.foto_keluar_url!, 'Pulang')}
                            style={{
                              padding: '6px 12px',
                              background: '#eff6ff',
                              color: '#2563eb',
                              border: '1px solid #dbeafe',
                              borderRadius: '6px',
                              fontSize: '0.75rem',
                              fontWeight: '600',
                              cursor: 'pointer',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '4px'
                            }}
                          >
                            <IconImage />
                            Pulang
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Photo Modal */}
      {showPhotoModal && photoToView && (
        <div 
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.75)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            padding: '20px'
          }}
          onClick={handleCloseModal}
        >
          <div 
            style={{
              background: '#fff',
              borderRadius: '20px',
              maxWidth: '600px',
              width: '100%',
              overflow: 'hidden',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div style={{
              padding: '20px 24px',
              borderBottom: '1px solid #f3f4f6',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <h3 style={{ 
                margin: 0, 
                fontSize: '1.125rem', 
                fontWeight: '700',
                color: '#111827'
              }}>
                Foto {photoToView.type}
              </h3>
              <button
                onClick={handleCloseModal}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '4px',
                  display: 'flex',
                  color: '#9ca3af'
                }}
              >
                <IconX />
              </button>
            </div>

            {/* Photo */}
            <div style={{ padding: '24px' }}>
              <img 
                src={photoToView.url} 
                alt={`Foto ${photoToView.type}`}
                style={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: '12px',
                  display: 'block'
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
