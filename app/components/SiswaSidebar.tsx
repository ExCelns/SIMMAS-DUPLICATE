"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useSidebar } from "./SidebarContext";

/* ─── Icons ─── */
function IconGradCap({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"
      strokeLinejoin="round" className={className}>
      <path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z" />
      <path d="M22 10v6" />
      <path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5" />
    </svg>
  );
}

function IconHome({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
      strokeLinejoin="round" className={className}>
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

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

function IconCamera({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
      strokeLinejoin="round" className={className}>
      <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
      <circle cx="12" cy="13" r="3" />
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

function IconBell({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
      strokeLinejoin="round" className={className}>
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
    </svg>
  );
}

function IconLogOut({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
      strokeLinejoin="round" className={className}>
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" x2="9" y1="12" y2="12" />
    </svg>
  );
}

function IconChevronLeft({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
      strokeLinejoin="round" className={className}>
      <path d="M15 18l-6-6 6-6" />
    </svg>
  );
}

function IconChevronDown({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
      strokeLinejoin="round" className={className}>
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

export default function SiswaSidebar() {
  const { isCollapsed, toggleSidebar } = useSidebar();
  const pathname = usePathname();
  const router = useRouter();
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  const siswaMenuItems = [
    { 
      href: "/siswa/dashboard", 
      icon: IconHome, 
      label: "Dashboard",
      isActive: pathname === "/siswa/dashboard"
    },
    { 
      href: "/siswa/pengajuan", 
      icon: IconFileText, 
      label: "Pengajuan Magang",
      isActive: pathname === "/siswa/pengajuan"
    },
    { 
      href: "/siswa/absensi", 
      icon: IconCamera, 
      label: "Absensi Harian",
      isActive: pathname === "/siswa/absensi"
    },
    { 
      href: "/siswa/jurnal", 
      icon: IconClock, 
      label: "Jurnal & Absensi",
      isActive: pathname === "/siswa/jurnal"
    },
    { 
      href: "/siswa/kunjungan", 
      icon: IconMapPin, 
      label: "Kunjungan Lapangan",
      isActive: pathname === "/siswa/kunjungan"
    }
  ];

  const handleLogoutClick = () => {
    setShowProfileDropdown(false);
    setShowLogoutConfirm(true);
  };

  const handleLogoutConfirm = () => {
    setShowLogoutConfirm(false);
    localStorage.removeItem("simmas_user");
    router.push("/logout");
  };

  const handleLogoutCancel = () => {
    setShowLogoutConfirm(false);
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setShowProfileDropdown(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="db-modal-overlay">
          <div className="db-modal-card">
            <div className="db-modal-icon-wrap">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <polyline points="16 17 21 12 16 7" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <line x1="21" x2="9" y1="12" y2="12" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3 className="db-modal-title">Konfirmasi Keluar</h3>
            <p className="db-modal-description">
              Apakah Anda yakin ingin keluar dari akun SIMMAS Anda?
            </p>
            <div className="db-modal-actions">
              <button className="db-modal-btn db-modal-btn-cancel" onClick={handleLogoutCancel}>
                Batal
              </button>
              <button className="db-modal-btn db-modal-btn-confirm" onClick={handleLogoutConfirm}>
                Ya, Keluar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="db-modal-overlay">
          <div className="db-modal-card">
            <div className="db-modal-icon-wrap">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <polyline points="16 17 21 12 16 7" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <line x1="21" x2="9" y1="12" y2="12" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3 className="db-modal-title">Konfirmasi Keluar</h3>
            <p className="db-modal-description">
              Apakah Anda yakin ingin keluar dari akun SIMMAS Anda?
            </p>
            <div className="db-modal-actions">
              <button className="db-modal-btn db-modal-btn-cancel" onClick={handleLogoutCancel}>
                Batal
              </button>
              <button className="db-modal-btn db-modal-btn-confirm" onClick={handleLogoutConfirm}>
                Ya, Keluar
              </button>
            </div>
          </div>
        </div>
      )}

      <aside className={`db-sidebar ${isCollapsed ? 'db-sidebar-collapsed' : ''}`}>
        {/* Brand */}
        <Link href="/siswa/dashboard" className="db-sidebar-brand">
          <div className="db-sidebar-logo">
            <IconGradCap className="db-sidebar-logo-icon" />
          </div>
          {!isCollapsed && (
            <div className="db-sidebar-brand-text">
              <span className="db-sidebar-brand-name">SIMMAS</span>
              <span className="db-sidebar-brand-role">PESERTA MAGANG</span>
            </div>
          )}
        </Link>

        {/* Navigation */}
        <nav className="db-sidebar-nav">
          {/* Overview Section */}
          <div className="db-nav-section">
            {!isCollapsed && <p className="db-nav-label">UTAMA</p>}
            {siswaMenuItems.slice(0, 1).map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className={`db-nav-item ${item.isActive ? 'db-nav-item-active' : ''}`}
              >
                <item.icon className="db-nav-icon" />
                {!isCollapsed && <span className="db-nav-text">{item.label}</span>}
              </Link>
            ))}
          </div>

          {/* Kegiatan Section */}
          <div className="db-nav-section">
            {!isCollapsed && <p className="db-nav-label">KEGIATAN MAGANG</p>}
            {siswaMenuItems.slice(1).map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className={`db-nav-item ${item.isActive ? 'db-nav-item-active' : ''}`}
              >
                <item.icon className="db-nav-icon" />
                {!isCollapsed && <span className="db-nav-text">{item.label}</span>}
              </Link>
            ))}
          </div>
        </nav>

        {/* Footer */}
        <div className="db-sidebar-footer">
          {/* Profile */}
          <div className="db-profile-wrap" ref={profileRef}>
            <button
              className="db-profile-trigger"
              onClick={() => setShowProfileDropdown(!showProfileDropdown)}
            >
              <div className="db-avatar db-avatar-siswa">
                <span className="db-avatar-text">SM</span>
              </div>
              {!isCollapsed && (
                <IconChevronDown className="db-profile-chevron" />
              )}
            </button>

            {showProfileDropdown && !isCollapsed && (
              <div className="db-profile-dropdown">
                <button 
                  className="db-dropdown-item db-dropdown-item-danger"
                  onClick={handleLogoutClick}
                >
                  <IconLogOut className="db-dropdown-icon" />
                  <span>Keluar</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}