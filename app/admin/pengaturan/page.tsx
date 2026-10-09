"use client";

import Link from "next/link";
import { useState } from "react";

/* ─── Icons ─── */
function IconSettings({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
      strokeLinejoin="round" className={className}>
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function IconDatabase({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
      strokeLinejoin="round" className={className}>
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5" />
      <path d="M3 12c0 1.66 4.03 3 9 3s9-1.34 9-3" />
    </svg>
  );
}

function IconMail({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
      strokeLinejoin="round" className={className}>
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  );
}

function IconShield({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
      strokeLinejoin="round" className={className}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}

function IconSave({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
      strokeLinejoin="round" className={className}>
      <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
      <polyline points="17,21 17,13 7,13 7,21" />
      <polyline points="7,3 7,8 15,8" />
    </svg>
  );
}

function IconRefresh({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
      strokeLinejoin="round" className={className}>
      <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
      <path d="M21 3v5h-5" />
      <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
      <path d="M3 21v-5h5" />
    </svg>
  );
}

export default function PengaturanSistem() {
  const [notifications, setNotifications] = useState({
    emailNotif: true,
    pushNotif: false,
    reportNotif: true
  });

  const [systemConfig, setSystemConfig] = useState({
    autoBackup: true,
    maintenanceMode: false,
    debugMode: false
  });

  const handleNotificationChange = (key: string) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key as keyof typeof prev]
    }));
  };

  const handleSystemConfigChange = (key: string) => {
    setSystemConfig(prev => ({
      ...prev,
      [key]: !prev[key as keyof typeof prev]
    }));
  };

  return (
    <div className="pengaturan-container">
      {/* Page Header */}
      <div className="pengaturan-header">
        <div>
          <h2 className="pengaturan-title">Pengaturan Sistem</h2>
          <p className="pengaturan-subtitle">Kelola konfigurasi dan pengaturan sistem SIMMAS</p>
        </div>
      </div>

      <div className="pengaturan-grid">
        {/* Pengaturan Umum */}
        <div className="pengaturan-card">
          <div className="pengaturan-card-header">
            <div className="pengaturan-card-icon pengaturan-icon-blue">
              <IconSettings className="pengaturan-icon" />
            </div>
            <div>
              <h3 className="pengaturan-card-title">Pengaturan Umum</h3>
              <p className="pengaturan-card-subtitle">Konfigurasi dasar sistem</p>
            </div>
          </div>
          <div className="pengaturan-card-body">
            <div className="pengaturan-form-group">
              <label className="pengaturan-label">Nama Sekolah</label>
              <input 
                type="text" 
                className="pengaturan-input" 
                defaultValue="SMK Negeri 1 Tasikmalaya"
                placeholder="Masukkan nama sekolah"
              />
            </div>
            <div className="pengaturan-form-group">
              <label className="pengaturan-label">Alamat Sekolah</label>
              <textarea 
                className="pengaturan-textarea" 
                defaultValue="Jl. Pendidikan No. 123, Tasikmalaya, Jawa Barat"
                placeholder="Masukkan alamat sekolah"
                rows={3}
              />
            </div>
            <div className="pengaturan-form-group">
              <label className="pengaturan-label">Tahun Ajaran Aktif</label>
              <select className="pengaturan-select">
                <option>2024/2025</option>
                <option>2023/2024</option>
                <option>2022/2023</option>
              </select>
            </div>
          </div>
        </div>

        {/* Database & Backup */}
        <div className="pengaturan-card">
          <div className="pengaturan-card-header">
            <div className="pengaturan-card-icon pengaturan-icon-green">
              <IconDatabase className="pengaturan-icon" />
            </div>
            <div>
              <h3 className="pengaturan-card-title">Database & Backup</h3>
              <p className="pengaturan-card-subtitle">Pengaturan database dan backup</p>
            </div>
          </div>
          <div className="pengaturan-card-body">
            <div className="pengaturan-toggle-group">
              <div className="pengaturan-toggle-item">
                <div>
                  <p className="pengaturan-toggle-title">Auto Backup Harian</p>
                  <p className="pengaturan-toggle-desc">Backup otomatis setiap hari pukul 02:00</p>
                </div>
                <label className="pengaturan-toggle">
                  <input 
                    type="checkbox" 
                    checked={systemConfig.autoBackup}
                    onChange={() => handleSystemConfigChange('autoBackup')}
                  />
                  <span className="pengaturan-toggle-slider"></span>
                </label>
              </div>
            </div>
            <div className="pengaturan-form-group">
              <label className="pengaturan-label">Lokasi Backup</label>
              <input 
                type="text" 
                className="pengaturan-input" 
                defaultValue="/backup/simmas/"
                placeholder="Path lokasi backup"
              />
            </div>
            <div className="pengaturan-action-buttons">
              <button className="pengaturan-btn pengaturan-btn-outline">
                <IconDatabase className="pengaturan-btn-icon" />
                Backup Manual
              </button>
              <button className="pengaturan-btn pengaturan-btn-outline">
                <IconRefresh className="pengaturan-btn-icon" />
                Restore Database
              </button>
            </div>
          </div>
        </div>

        {/* Notifikasi */}
        <div className="pengaturan-card">
          <div className="pengaturan-card-header">
            <div className="pengaturan-card-icon pengaturan-icon-purple">
              <IconMail className="pengaturan-icon" />
            </div>
            <div>
              <h3 className="pengaturan-card-title">Notifikasi</h3>
              <p className="pengaturan-card-subtitle">Pengaturan notifikasi sistem</p>
            </div>
          </div>
          <div className="pengaturan-card-body">
            <div className="pengaturan-toggle-group">
              <div className="pengaturan-toggle-item">
                <div>
                  <p className="pengaturan-toggle-title">Email Notification</p>
                  <p className="pengaturan-toggle-desc">Kirim notifikasi via email</p>
                </div>
                <label className="pengaturan-toggle">
                  <input 
                    type="checkbox" 
                    checked={notifications.emailNotif}
                    onChange={() => handleNotificationChange('emailNotif')}
                  />
                  <span className="pengaturan-toggle-slider"></span>
                </label>
              </div>
              <div className="pengaturan-toggle-item">
                <div>
                  <p className="pengaturan-toggle-title">Push Notification</p>
                  <p className="pengaturan-toggle-desc">Notifikasi real-time di browser</p>
                </div>
                <label className="pengaturan-toggle">
                  <input 
                    type="checkbox" 
                    checked={notifications.pushNotif}
                    onChange={() => handleNotificationChange('pushNotif')}
                  />
                  <span className="pengaturan-toggle-slider"></span>
                </label>
              </div>
              <div className="pengaturan-toggle-item">
                <div>
                  <p className="pengaturan-toggle-title">Laporan Otomatis</p>
                  <p className="pengaturan-toggle-desc">Kirim laporan mingguan/bulanan</p>
                </div>
                <label className="pengaturan-toggle">
                  <input 
                    type="checkbox" 
                    checked={notifications.reportNotif}
                    onChange={() => handleNotificationChange('reportNotif')}
                  />
                  <span className="pengaturan-toggle-slider"></span>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Keamanan */}
        <div className="pengaturan-card">
          <div className="pengaturan-card-header">
            <div className="pengaturan-card-icon pengaturan-icon-orange">
              <IconShield className="pengaturan-icon" />
            </div>
            <div>
              <h3 className="pengaturan-card-title">Keamanan</h3>
              <p className="pengaturan-card-subtitle">Pengaturan keamanan sistem</p>
            </div>
          </div>
          <div className="pengaturan-card-body">
            <div className="pengaturan-form-group">
              <label className="pengaturan-label">Durasi Sesi Login (menit)</label>
              <input 
                type="number" 
                className="pengaturan-input" 
                defaultValue={480}
                min={30}
                max={1440}
              />
            </div>
            <div className="pengaturan-form-group">
              <label className="pengaturan-label">Maksimal Percobaan Login</label>
              <input 
                type="number" 
                className="pengaturan-input" 
                defaultValue={3}
                min={1}
                max={10}
              />
            </div>
            <div className="pengaturan-toggle-group">
              <div className="pengaturan-toggle-item">
                <div>
                  <p className="pengaturan-toggle-title">Mode Maintenance</p>
                  <p className="pengaturan-toggle-desc">Aktifkan mode pemeliharaan sistem</p>
                </div>
                <label className="pengaturan-toggle">
                  <input 
                    type="checkbox" 
                    checked={systemConfig.maintenanceMode}
                    onChange={() => handleSystemConfigChange('maintenanceMode')}
                  />
                  <span className="pengaturan-toggle-slider"></span>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Informasi Sistem */}
        <div className="pengaturan-card pengaturan-card-full">
          <div className="pengaturan-card-header">
            <div>
              <h3 className="pengaturan-card-title">Informasi Sistem</h3>
              <p className="pengaturan-card-subtitle">Detail versi dan status sistem</p>
            </div>
          </div>
          <div className="pengaturan-card-body">
            <div className="pengaturan-info-grid">
              <div className="pengaturan-info-item">
                <span className="pengaturan-info-label">Versi SIMMAS</span>
                <span className="pengaturan-info-value">v2.1.0</span>
              </div>
              <div className="pengaturan-info-item">
                <span className="pengaturan-info-label">Database Version</span>
                <span className="pengaturan-info-value">MySQL 8.0.33</span>
              </div>
              <div className="pengaturan-info-item">
                <span className="pengaturan-info-label">Last Backup</span>
                <span className="pengaturan-info-value">30 Sep 2024, 02:00</span>
              </div>
              <div className="pengaturan-info-item">
                <span className="pengaturan-info-label">Uptime</span>
                <span className="pengaturan-info-value">15 hari 4 jam</span>
              </div>
              <div className="pengaturan-info-item">
                <span className="pengaturan-info-label">Storage Used</span>
                <span className="pengaturan-info-value">2.4 GB / 10 GB</span>
              </div>
              <div className="pengaturan-info-item">
                <span className="pengaturan-info-label">Active Users</span>
                <span className="pengaturan-info-value">127 pengguna</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="pengaturan-save-section">
        <button className="pengaturan-save-btn">
          <IconSave className="pengaturan-save-icon" />
          Simpan Perubahan
        </button>
      </div>
    </div>
  );
}