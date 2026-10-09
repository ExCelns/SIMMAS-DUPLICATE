"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
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

function IconLayoutDashboard({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
      strokeLinejoin="round" className={className}>
      <rect width="7" height="9" x="3" y="3" rx="1" />
      <rect width="7" height="5" x="14" y="3" rx="1" />
      <rect width="7" height="9" x="14" y="12" rx="1" />
      <rect width="7" height="5" x="3" y="16" rx="1" />
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

function IconBook({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
      strokeLinejoin="round" className={className}>
      <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
    </svg>
  );
}

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

function IconPanelLeft({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
      strokeLinejoin="round" className={className}>
      <rect width="18" height="18" x="3" y="3" rx="2" />
      <path d="M9 3v18" />
    </svg>
  );
}

interface MenuItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

const menuItems: {
  overview: MenuItem[];
  bimbingan: MenuItem[];
} = {
  overview: [
    { label: "Dashboard", href: "/guru/dashboard", icon: IconLayoutDashboard },
  ],
  bimbingan: [
    { label: "Siswa Bimbingan", href: "/guru/siswa", icon: IconUsers },
    { label: "Jurnal & Absensi", href: "/guru/jurnal", icon: IconBook },
    { label: "Kunjungan Lapangan", href: "/guru/kunjungan", icon: IconMapPin },
  ],
};

export default function GuruSidebar() {
  const pathname = usePathname();
  const { isCollapsed, toggleSidebar } = useSidebar();

  useEffect(() => {
    if (isCollapsed) {
      document.body.classList.add("sidebar-collapsed");
    } else {
      document.body.classList.remove("sidebar-collapsed");
    }
  }, [isCollapsed]);

  return (
    <aside className={`db-sidebar ${isCollapsed ? "db-sidebar-collapsed" : ""}`}>
      {/* Brand */}
      <Link href="/guru/dashboard" className="db-sidebar-brand">
        <div className="db-sidebar-logo">
          <IconGradCap className="db-sidebar-logo-icon" />
        </div>
        <div className="db-sidebar-brand-text">
          <span className="db-sidebar-brand-name">SIMMAS</span>
          <span className="db-sidebar-brand-role">PEMBIMBING</span>
        </div>
      </Link>

      {/* Navigation */}
      <nav className="db-sidebar-nav">
        {/* Overview */}
        <div className="db-nav-section">
          <p className="db-nav-label">OVERVIEW</p>
          {menuItems.overview.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`db-nav-item ${isActive ? "db-nav-item-active" : ""}`}
              >
                <Icon className="db-nav-icon" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>

        {/* Bimbingan */}
        <div className="db-nav-section">
          <p className="db-nav-label">BIMBINGAN</p>
          {menuItems.bimbingan.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`db-nav-item ${isActive ? "db-nav-item-active" : ""}`}
              >
                <Icon className="db-nav-icon" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Toggle Button - Hidden with CSS */}
      <button
        className="db-sidebar-toggle guru-sidebar-toggle-hidden"
        onClick={toggleSidebar}
        aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        style={{ display: 'none' }}
      >
        <IconPanelLeft className={`db-sidebar-toggle-icon ${isCollapsed ? "db-sidebar-toggle-icon-collapsed" : ""}`} />
      </button>
    </aside>
  );
}
