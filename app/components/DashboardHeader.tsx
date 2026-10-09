"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useSidebar } from "./SidebarContext";
import { auth, userData as supabaseUserData } from "@/lib/supabase";

/* ─── Icons ─── */
function IconSearch({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
      strokeLinejoin="round" className={className}>
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

function IconCommand({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
      strokeLinejoin="round" className={className}>
      <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
    </svg>
  );
}

function IconBell({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"
      strokeLinejoin="round" className={className}>
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
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

function IconLockKeyhole({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
      strokeLinejoin="round" className={className}>
      <circle cx="12" cy="16" r="1" />
      <rect x="3" y="10" width="18" height="12" rx="2" />
      <path d="M7 10V7a5 5 0 0 1 10 0v3" />
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

function IconActivity({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
      strokeLinejoin="round" className={className}>
      <path d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2" />
    </svg>
  );
}

function IconShieldCheck({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
      strokeLinejoin="round" className={className}>
      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
      <path d="m9 12 2 2 4-4" />
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

function IconPanelLeftOpen({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
      strokeLinejoin="round" className={className}>
      <rect width="18" height="18" x="3" y="3" rx="2" />
      <path d="M9 3v18" />
      <path d="m14 9 3 3-3 3" />
    </svg>
  );
}

export default function DashboardHeader() {
  const router = useRouter();
  const pathname = usePathname();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [passwordData, setPasswordData] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [passwordError, setPasswordError] = useState("");
  const [isSubmittingPassword, setIsSubmittingPassword] = useState(false);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const { toggleSidebar, isCollapsed } = useSidebar();

  // Load user profile from Supabase
  useEffect(() => {
    async function loadUserProfile() {
      try {
        const { user } = await auth.getUser();
        if (!user) {
          router.push('/login');
          return;
        }

        const { data: profile } = await supabaseUserData.getUserProfile(user.id);
        setUserProfile(profile);
      } catch (error) {
        console.error("Error loading user profile:", error);
      } finally {
        setLoading(false);
      }
    }

    loadUserProfile();
  }, [router]);

  // Get user role from pathname
  const getUserRole = () => {
    if (pathname?.startsWith('/admin')) return 'admin';
    if (pathname?.startsWith('/guru')) return 'guru';
    if (pathname?.startsWith('/siswa')) return 'siswa';
    return 'admin';
  };

  // Menu items based on role
  const getMenuItems = () => {
    const role = getUserRole();
    
    if (role === 'admin') {
      return [
        { title: 'Dashboard Admin', desc: 'Utama', path: '/admin/dashboard', icon: 'dashboard' },
        { title: 'Data Siswa', desc: 'Master Data', path: '/admin/siswa', icon: 'students' },
        { title: 'Data Guru Pembimbing', desc: 'Master Data', path: '/admin/guru', icon: 'teachers' },
        { title: 'Data Tempat Magang (DUDI)', desc: 'Master Data', path: '/admin/dudi', icon: 'building' },
        { title: 'Data Jurusan', desc: 'Master Data', path: '/admin/jurusan', icon: 'graduation' },
        { title: 'Penempatan & Pengajuan', desc: 'Manajemen Magang', path: '/admin/penempatan', icon: 'placement' },
        { title: 'Monitoring Kehadiran & Jurnal', desc: 'Manajemen Magang', path: '/admin/monitoring', icon: 'monitoring' },
        { title: 'Log Aktivitas Sistem', desc: 'Sistem', path: '/admin/log', icon: 'log' },
        { title: 'Pengaturan Aplikasi', desc: 'Sistem', path: '/admin/pengaturan', icon: 'settings' },
      ];
    } else if (role === 'guru') {
      return [
        { title: 'Dashboard Guru', desc: 'Utama', path: '/guru/dashboard', icon: 'dashboard' },
        { title: 'Siswa Bimbingan', desc: 'Bimbingan', path: '/guru/siswa', icon: 'students' },
        { title: 'Jurnal & Absensi', desc: 'Bimbingan', path: '/guru/jurnal', icon: 'journal' },
        { title: 'Kunjungan Lapangan', desc: 'Bimbingan', path: '/guru/kunjungan', icon: 'visit' },
      ];
    } else {
      return [
        { title: 'Dashboard Siswa', desc: 'Utama', path: '/siswa/dashboard', icon: 'dashboard' },
        { title: 'Pengajuan Magang', desc: 'Magang', path: '/siswa/pengajuan', icon: 'submission' },
        { title: 'Absensi Harian', desc: 'Magang', path: '/siswa/absensi', icon: 'attendance' },
        { title: 'Jurnal Kegiatan', desc: 'Magang', path: '/siswa/jurnal', icon: 'journal' },
        { title: 'Kunjungan Pembimbing', desc: 'Magang', path: '/siswa/kunjungan', icon: 'visit' },
      ];
    }
  };

  // Filter menu items based on search query
  const filteredMenuItems = getMenuItems().filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.desc.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle menu item click
  const handleMenuClick = (path: string) => {
    router.push(path);
    handleSearchClose();
  };

  // Function to get page title based on current route
  const getPageTitle = () => {
    const path = pathname || '';
    
    // Admin pages
    if (path === '/admin/dashboard' || path === '/admin') return 'Dashboard';
    if (path === '/admin/monitoring') return 'Monitoring';
    if (path === '/admin/siswa') return 'Manajemen Siswa';
    if (path === '/admin/guru') return 'Manajemen Guru';
    if (path === '/admin/dudi') return 'Manajemen DUDI';
    if (path === '/admin/penempatan') return 'Penempatan Magang';
    if (path === '/admin/pengaturan') return 'Pengaturan Sistem';
    if (path === '/admin/log') return 'Log Aktivitas & Audit';
    
    // Guru pages
    if (path === '/guru/dashboard' || path === '/guru') return 'Dashboard';
    if (path === '/guru/jurnal') return 'Verifikasi Jurnal';
    if (path === '/guru/siswa') return 'Siswa Bimbingan';
    if (path === '/guru/kunjungan') return 'Kunjungan DUDI';
    
    // Siswa pages
    if (path === '/siswa/dashboard' || path === '/siswa') return 'Dashboard';
    if (path === '/siswa/pengajuan') return 'Pengajuan Magang';
    if (path === '/siswa/absensi') return 'Absensi Harian';
    if (path === '/siswa/jurnal') return 'Jurnal & Absensi';
    if (path === '/siswa/kunjungan') return 'Kunjungan Lapangan';
    
    return 'Dashboard';
  };

  const handleSearchOpen = () => {
    setShowSearchModal(true);
    setSearchQuery("");
    setSelectedIndex(0);
    document.body.classList.add('search-modal-open');
  };

  const handleSearchClose = () => {
    setShowSearchModal(false);
    setSearchQuery("");
    setSelectedIndex(0);
    document.body.classList.remove('search-modal-open');
  };

  const handleLogoutClick = () => {
    console.log("Logout clicked, showing modal...");
    setIsDropdownOpen(false);
    setShowLogoutConfirm(true);
  };

  const handleLogoutConfirm = () => {
    console.log("Logout confirmed!");
    setShowLogoutConfirm(false);
    router.push("/logout");
  };

  const handleLogoutCancel = () => {
    console.log("Logout cancelled");
    setShowLogoutConfirm(false);
  };

  const handleChangePasswordOpen = () => {
    setIsDropdownOpen(false);
    setShowChangePassword(true);
    setPasswordData({ newPassword: "", confirmPassword: "" });
    setPasswordError("");
  };

  const handleChangePasswordClose = () => {
    setShowChangePassword(false);
    setPasswordData({ newPassword: "", confirmPassword: "" });
    setPasswordError("");
  };

  const handleChangePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError("");

    // Validation
    if (passwordData.newPassword.length < 6) {
      setPasswordError("Kata sandi minimal 6 karakter");
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordError("Kata sandi tidak cocok");
      return;
    }

    try {
      setIsSubmittingPassword(true);

      // Update password using Supabase
      const { error } = await auth.updatePassword(passwordData.newPassword);
      
      if (error) {
        throw error;
      }

      alert("Kata sandi berhasil diubah!");
      handleChangePasswordClose();
    } catch (error: any) {
      console.error("Error changing password:", error);
      setPasswordError(error.message || "Gagal mengubah kata sandi. Silakan coba lagi.");
    } finally {
      setIsSubmittingPassword(false);
    }
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setIsNotifOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Separate useEffect for keyboard shortcuts
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      // Cmd+K or Ctrl+K to open search
      if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
        event.preventDefault();
        handleSearchOpen();
      }
      
      if (showSearchModal) {
        // ESC to close search modal
        if (event.key === 'Escape') {
          handleSearchClose();
        }
        // Arrow Down
        else if (event.key === 'ArrowDown') {
          event.preventDefault();
          setSelectedIndex(prev => 
            prev < filteredMenuItems.length - 1 ? prev + 1 : prev
          );
        }
        // Arrow Up
        else if (event.key === 'ArrowUp') {
          event.preventDefault();
          setSelectedIndex(prev => prev > 0 ? prev - 1 : 0);
        }
        // Enter to navigate
        else if (event.key === 'Enter' && filteredMenuItems[selectedIndex]) {
          event.preventDefault();
          handleMenuClick(filteredMenuItems[selectedIndex].path);
        }
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [showSearchModal, selectedIndex, filteredMenuItems]);

  return (
    <>
      {/* Search Modal */}
      {showSearchModal && (
        <>
          {/* SVG Filter untuk blur effect */}
          <svg style={{ position: 'absolute', width: 0, height: 0 }}>
            <defs>
              <filter id="blur-filter">
                <feGaussianBlur in="SourceGraphic" stdDeviation="8" />
              </filter>
            </defs>
          </svg>
          
          <div className="db-search-modal-overlay" onClick={handleSearchClose}>
            <div className="db-search-modal" onClick={(e) => e.stopPropagation()}>
            <div className="db-search-modal-header">
              <div className="db-search-modal-input-wrap">
                <svg className="db-search-modal-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.3-4.3" />
                </svg>
                <input
                  type="text"
                  className="db-search-modal-input"
                  placeholder="Ketik halaman atau menu yang dituju..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setSelectedIndex(0);
                  }}
                  autoFocus
                />
              </div>
              <button className="db-search-modal-close" onClick={handleSearchClose}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </button>
            </div>

            <div className="db-search-modal-results">
              {filteredMenuItems.length === 0 ? (
                <div className="db-search-empty">
                  <p>Tidak ada hasil untuk "{searchQuery}"</p>
                </div>
              ) : (
                filteredMenuItems.map((item, index) => (
                  <div
                    key={item.path}
                    className={`db-search-result-item ${index === selectedIndex ? 'db-search-result-item-selected' : ''}`}
                    onClick={() => handleMenuClick(item.path)}
                    onMouseEnter={() => setSelectedIndex(index)}
                  >
                    <div className="db-search-result-icon">
                      {item.icon === 'dashboard' && (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <rect width="7" height="9" x="3" y="3" rx="1" />
                          <rect width="7" height="5" x="14" y="3" rx="1" />
                          <rect width="7" height="9" x="14" y="12" rx="1" />
                          <rect width="7" height="5" x="3" y="16" rx="1" />
                        </svg>
                      )}
                      {item.icon === 'students' && (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z" />
                          <path d="M22 10v6" />
                          <path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5" />
                        </svg>
                      )}
                      {item.icon === 'teachers' && (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                          <circle cx="9" cy="7" r="4" />
                          <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                        </svg>
                      )}
                      {item.icon === 'building' && (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M3 21h18" />
                          <path d="M5 21V7l8-4v18" />
                          <path d="M19 21V11l-6-4" />
                          <path d="M9 9v.01" />
                          <path d="M9 12v.01" />
                          <path d="M9 15v.01" />
                          <path d="M9 18v.01" />
                        </svg>
                      )}
                      {item.icon === 'graduation' && (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                          <path d="M6 12v5c3 3 9 3 12 0v-5" />
                        </svg>
                      )}
                      {item.icon === 'placement' && (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                        </svg>
                      )}
                      {item.icon === 'monitoring' && (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2" />
                        </svg>
                      )}
                      {item.icon === 'log' && (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                          <path d="M3 3v5h5" />
                          <path d="M12 7v5l4 2" />
                        </svg>
                      )}
                      {item.icon === 'settings' && (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
                          <circle cx="12" cy="12" r="3" />
                        </svg>
                      )}
                      {item.icon === 'journal' && (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
                        </svg>
                      )}
                      {item.icon === 'visit' && (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                          <circle cx="12" cy="10" r="3" />
                        </svg>
                      )}
                      {item.icon === 'submission' && (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                          <polyline points="14 2 14 8 20 8" />
                          <line x1="16" y1="13" x2="8" y2="13" />
                          <line x1="16" y1="17" x2="8" y2="17" />
                          <polyline points="10 9 9 9 8 9" />
                        </svg>
                      )}
                      {item.icon === 'attendance' && (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
                          <circle cx="12" cy="13" r="3" />
                        </svg>
                      )}
                    </div>
                    <div className="db-search-result-content">
                      <p className="db-search-result-title">{item.title}</p>
                      <p className="db-search-result-desc">{item.desc}</p>
                    </div>
                    <span className="db-search-result-badge">Buka</span>
                  </div>
                ))
              )}
            </div>

            <div className="db-search-modal-footer">
              <span className="db-search-modal-hint">Gunakan panah atas/klik untuk memilih</span>
              <span className="db-search-modal-shortcut">ESC untuk keluar</span>
            </div>
          </div>
        </div>
        </>
      )}

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="db-modal-overlay">
          <div className="db-modal-card">
            {/* Icon */}
            <div className="db-modal-icon-wrap">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <polyline points="16 17 21 12 16 7" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <line x1="21" x2="9" y1="12" y2="12" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>

            {/* Title */}
            <h3 className="db-modal-title">Konfirmasi Keluar</h3>

            {/* Description */}
            <p className="db-modal-description">
              Apakah Anda yakin ingin keluar dari akun SIMMAS Anda?
            </p>

            {/* Buttons */}
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

      {/* Change Password Modal */}
      {showChangePassword && (
        <div className="db-modal-overlay" onClick={handleChangePasswordClose}>
          <div className="db-change-password-modal" onClick={(e) => e.stopPropagation()}>
            {/* Header */}
            <div className="db-change-password-header">
              <div className="db-change-password-icon-wrap">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="16" r="1" />
                  <rect x="3" y="10" width="18" height="12" rx="2" />
                  <path d="M7 10V7a5 5 0 0 1 10 0v3" />
                </svg>
              </div>
              <div className="db-change-password-header-text">
                <h2 className="db-change-password-title">Ubah Kata Sandi</h2>
                <p className="db-change-password-subtitle">
                  Perbarui kata sandi akun Anda untuk meningkatkan keamanan akses SIMMAS.
                </p>
              </div>
              <button className="db-modal-close-btn" onClick={handleChangePasswordClose}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleChangePasswordSubmit} className="db-change-password-form">
              {/* Kata Sandi Baru */}
              <div className="db-form-group">
                <label className="db-form-label">Kata Sandi Baru</label>
                <input
                  type="password"
                  className="db-form-input"
                  placeholder="Minimal 6 karakter"
                  value={passwordData.newPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                  required
                  minLength={6}
                />
              </div>

              {/* Ulangi Kata Sandi Baru */}
              <div className="db-form-group">
                <label className="db-form-label">Ulangi Kata Sandi Baru</label>
                <input
                  type="password"
                  className="db-form-input"
                  placeholder="Ketik ulang kata sandi baru"
                  value={passwordData.confirmPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                  required
                  minLength={6}
                />
              </div>

              {/* Error Message */}
              {passwordError && (
                <div className="db-form-error">
                  {passwordError}
                </div>
              )}

              {/* Buttons */}
              <div className="db-change-password-actions">
                <button
                  type="button"
                  className="db-change-password-btn db-change-password-btn-cancel"
                  onClick={handleChangePasswordClose}
                  disabled={isSubmittingPassword}
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="db-change-password-btn db-change-password-btn-submit"
                  disabled={isSubmittingPassword}
                >
                  {isSubmittingPassword ? 'Menyimpan...' : 'Simpan Perubahan'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <header className="db-header">
      <div className="db-header-inner">
        {/* Left: Toggle + Page Title */}
        <div className="db-header-left">
          <button className="db-header-toggle" onClick={toggleSidebar}>
            {isCollapsed ? (
              <IconPanelLeft className="db-header-toggle-icon" />
            ) : (
              <IconPanelLeftOpen className="db-header-toggle-icon" />
            )}
          </button>
          <h1 className="db-page-title">{getPageTitle()}</h1>
        </div>

        {/* Right: Search, Notifications, Profile */}
        <div className="db-header-right">
          {/* Search */}
          <button className="db-search-trigger" onClick={handleSearchOpen}>
            <IconSearch className="db-search-icon" />
            <span className="db-search-text">Cari...</span>
            <div className="db-search-kbd">
              <IconCommand className="db-kbd-icon" />
              <span>K</span>
            </div>
          </button>

          {/* Notifications */}
          <div className="db-notif-wrap" ref={notifRef}>
            <button 
              className="db-icon-btn db-notif-btn"
              onClick={() => setIsNotifOpen(!isNotifOpen)}
            >
              <IconBell className="db-icon-btn-icon" />
              <span className="db-notif-dot"></span>
            </button>

            {isNotifOpen && (
              <div className="db-notif-dropdown">
                <div className="db-notif-header">
                  <h3 className="db-notif-title">AKTIVITAS & NOTIFIKASI</h3>
                  <span className="db-notif-count">
                    {pathname?.startsWith('/siswa') ? '2 item' : '3 item'}
                  </span>
                </div>
                
                <div className="db-notif-list">
                  {pathname?.startsWith('/guru') ? (
                    // Guru notifications
                    <>
                      <div 
                        className="db-notif-item" 
                        onClick={() => {
                          router.push('/guru/jurnal');
                          setIsNotifOpen(false);
                        }}
                        style={{ cursor: 'pointer' }}
                      >
                        <div className="db-notif-icon-wrap db-notif-icon-blue">
                          <IconFileText className="db-notif-icon" />
                        </div>
                        <div className="db-notif-content">
                          <p className="db-notif-item-title">Verifikasi Jurnal Kegiatan</p>
                          <p className="db-notif-item-text">Validasi jurnal yang diunggah siswa bimbingan</p>
                        </div>
                      </div>

                      <div 
                        className="db-notif-item"
                        onClick={() => {
                          router.push('/guru/siswa');
                          setIsNotifOpen(false);
                        }}
                        style={{ cursor: 'pointer' }}
                      >
                        <div className="db-notif-icon-wrap db-notif-icon-green">
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="db-notif-icon">
                            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                            <circle cx="9" cy="7" r="4" />
                            <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                          </svg>
                        </div>
                        <div className="db-notif-content">
                          <p className="db-notif-item-title">Daftar Siswa & Penilaian</p>
                          <p className="db-notif-item-text">Beri nilai akhir bagi siswa yang selesai magang</p>
                        </div>
                      </div>

                      <div 
                        className="db-notif-item"
                        onClick={() => {
                          router.push('/guru/kunjungan');
                          setIsNotifOpen(false);
                        }}
                        style={{ cursor: 'pointer' }}
                      >
                        <div className="db-notif-icon-wrap db-notif-icon-purple">
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="db-notif-icon">
                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                            <line x1="16" y1="2" x2="16" y2="6" />
                            <line x1="8" y1="2" x2="8" y2="6" />
                            <line x1="3" y1="10" x2="21" y2="10" />
                          </svg>
                        </div>
                        <div className="db-notif-content">
                          <p className="db-notif-item-title">Agenda Kunjungan DUDI</p>
                          <p className="db-notif-item-text">Catat pelaksanaan supervisi dan visitasi</p>
                        </div>
                      </div>
                    </>
                  ) : pathname?.startsWith('/siswa') ? (
                    // Siswa notifications
                    <>
                      <div 
                        className="db-notif-item"
                        onClick={() => {
                          router.push('/siswa/absensi');
                          setIsNotifOpen(false);
                        }}
                        style={{ cursor: 'pointer' }}
                      >
                        <div className="db-notif-icon-wrap db-notif-icon-blue">
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="db-notif-icon">
                            <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
                            <circle cx="12" cy="13" r="3" />
                          </svg>
                        </div>
                        <div className="db-notif-content">
                          <p className="db-notif-item-title">Absensi Harian</p>
                          <p className="db-notif-item-text">Jangan lupa absen foto hari ini</p>
                        </div>
                      </div>

                      <div 
                        className="db-notif-item"
                        onClick={() => {
                          router.push('/siswa/jurnal');
                          setIsNotifOpen(false);
                        }}
                        style={{ cursor: 'pointer' }}
                      >
                        <div className="db-notif-icon-wrap db-notif-icon-green">
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="db-notif-icon">
                            <circle cx="12" cy="12" r="10" />
                            <polyline points="12 6 12 12 16 14" />
                          </svg>
                        </div>
                        <div className="db-notif-content">
                          <p className="db-notif-item-title">Jurnal Kegiatan</p>
                          <p className="db-notif-item-text">Isi jurnal kegiatan harian Anda</p>
                        </div>
                      </div>
                    </>
                  ) : (
                    // Admin notifications  
                    <>
                      <div 
                        className="db-notif-item"
                        onClick={() => {
                          router.push('/admin/penempatan');
                          setIsNotifOpen(false);
                        }}
                        style={{ cursor: 'pointer' }}
                      >
                        <div className="db-notif-icon-wrap db-notif-icon-blue">
                          <IconFileText className="db-notif-icon" />
                        </div>
                        <div className="db-notif-content">
                          <p className="db-notif-item-title">Pengajuan Magang Siswa</p>
                          <p className="db-notif-item-text">Perlu tinjau untuk pengajuan magang</p>
                        </div>
                      </div>

                      <div 
                        className="db-notif-item"
                        onClick={() => {
                          router.push('/admin/monitoring');
                          setIsNotifOpen(false);
                        }}
                        style={{ cursor: 'pointer' }}
                      >
                        <div className="db-notif-icon-wrap db-notif-icon-green">
                          <IconActivity className="db-notif-icon" />
                        </div>
                        <div className="db-notif-content">
                          <p className="db-notif-item-title">Monitoring Siswa & DUDI</p>
                          <p className="db-notif-item-text">Pantau rekap kehadiran siswa jurnal harian</p>
                        </div>
                      </div>

                      <div 
                        className="db-notif-item"
                        onClick={() => {
                          router.push('/admin/log');
                          setIsNotifOpen(false);
                        }}
                        style={{ cursor: 'pointer' }}
                      >
                        <div className="db-notif-icon-wrap db-notif-icon-purple">
                          <IconShieldCheck className="db-notif-icon" />
                        </div>
                        <div className="db-notif-content">
                          <p className="db-notif-item-title">Audit Trail Sistem</p>
                          <p className="db-notif-item-text">Tinjau log aktivitas dan riwayat mutasi data</p>
                        </div>
                      </div>
                    </>
                  )}
                </div>

                <div className="db-notif-footer">
                  <button 
                    className="db-notif-footer-btn"
                    onClick={() => {
                      if (pathname?.startsWith('/guru')) {
                        router.push('/guru/jurnal');
                      } else if (pathname?.startsWith('/siswa')) {
                        router.push('/siswa/dashboard');
                      } else {
                        router.push('/admin/penempatan');
                      }
                      setIsNotifOpen(false);
                    }}
                  >
                    {pathname?.startsWith('/guru') ? 'Lihat Semua Jurnal' : pathname?.startsWith('/siswa') ? 'Lihat Semua Aktivitas' : 'Lihat Semua Pengajuan'}
                    <IconArrowRight className="db-notif-footer-icon" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Profile Dropdown */}
          <div className="db-profile-wrap" ref={profileRef}>
            <button
              className="db-profile-trigger"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <div className="db-avatar">
                <span className="db-avatar-text">
                  {loading ? '...' : (userProfile?.nama ? userProfile.nama.substring(0, 2).toUpperCase() : (pathname?.startsWith('/guru') ? 'GP' : pathname?.startsWith('/siswa') ? 'SM' : 'AS'))}
                </span>
              </div>
              <span className="db-profile-name">
                {loading ? 'Loading...' : (userProfile?.nama || (pathname?.startsWith('/guru') ? 'Guru' : pathname?.startsWith('/siswa') ? 'Siswa' : 'Admin'))}
              </span>
              <IconChevronDown className="db-profile-chevron" />
            </button>

            {isDropdownOpen && (
              <div className="db-dropdown">
                <div className="db-dropdown-header">
                  <div className="db-dropdown-avatar">
                    <span className="db-dropdown-avatar-text">
                      {pathname?.startsWith('/guru') ? 'GP' : pathname?.startsWith('/siswa') ? 'SM' : 'AS'}
                    </span>
                  </div>
                  <div className="db-dropdown-user">
                    <p className="db-dropdown-name">
                      {pathname?.startsWith('/guru') ? 'Guru Pembimbing' : pathname?.startsWith('/siswa') ? 'Siswa Magang' : 'Admin SIMMAS'}
                    </p>
                    <p className="db-dropdown-email">
                      {pathname?.startsWith('/guru') ? 'guru@simmas.sch.id' : pathname?.startsWith('/siswa') ? 'siswa@simmas.sch.id' : 'admin@simmas.sch.id'}
                    </p>
                    <span className="db-dropdown-role">
                      {pathname?.startsWith('/guru') ? 'PEMBIMBING' : pathname?.startsWith('/siswa') ? 'MAGANG' : 'ADMINISTRATOR'}
                    </span>
                  </div>
                </div>
                <div className="db-dropdown-divider" />
                <div className="db-dropdown-menu">
                  <button className="db-dropdown-item" onClick={handleChangePasswordOpen}>
                    <IconLockKeyhole className="db-dropdown-icon" />
                    <span>Ubah Kata Sandi</span>
                  </button>
                  <button 
                    className="db-dropdown-item db-dropdown-item-danger"
                    onClick={handleLogoutClick}
                  >
                    <IconLogOut className="db-dropdown-icon" />
                    <span>Keluar</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
    </>
  );
}
