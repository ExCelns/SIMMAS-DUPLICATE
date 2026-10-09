"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const LOGIN = "/login";

/* ─── Icons (Lucide paths, exact from live site) ─── */
function IconGradCap({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"
      strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z" />
      <path d="M22 10v6" />
      <path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5" />
    </svg>
  );
}
function IconArrowRight({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
      strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
    </svg>
  );
}
function IconCircleCheck({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
      strokeLinejoin="round" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="10" /><path d="m9 12 2 2 4-4" />
    </svg>
  );
}
function IconBookOpen({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
      strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M12 5v16" />
      <path d="M20.001 19A2 2 0 0022 17V5a2 2 0 00-1.999-2L16 3.002A5 5 0 0012 5a5 5 0 00-4-2H4a2 2 0 00-2 2v12a2 2 0 001.999 2H8a5 5 0 014 2 5 5 0 014-2z" />
    </svg>
  );
}
function IconUsers({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
      strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <path d="M16 3.128a4 4 0 0 1 0 7.744" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <circle cx="9" cy="7" r="4" />
    </svg>
  );
}
function IconBriefcase({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
      strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      <rect width="20" height="14" x="2" y="6" rx="2" />
    </svg>
  );
}
function IconBuilding2({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
      strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M10 12h4" /><path d="M10 8h4" />
      <path d="M14 21v-3a2 2 0 0 0-4 0v3" />
      <path d="M6 10H4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-2" />
      <path d="M6 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16" />
    </svg>
  );
}
function IconUserPlus({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
      strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <line x1="19" x2="19" y1="8" y2="14" />
      <line x1="22" x2="16" y1="11" y2="11" />
    </svg>
  );
}
function IconFilePenLine({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
      strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M14.364 13.634a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506l4.013-4.009a1 1 0 0 0-3.004-3.004z" />
      <path d="M14.487 7.858A1 1 0 0 1 14 7V2" />
      <path d="M20 19.645V20a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l2.516 2.516" />
      <path d="M8 18h1" />
    </svg>
  );
}
function IconPresentation({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
      strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M2 3h20" />
      <path d="M21 3v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V3" />
      <path d="m7 21 5-5 5 5" />
    </svg>
  );
}
function IconMenu({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="4" y1="6" x2="20" y2="6" />
      <line x1="4" y1="12" x2="20" y2="12" />
      <line x1="4" y1="18" x2="20" y2="18" />
    </svg>
  );
}

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    
    // Trigger animation after component mount
    setTimeout(() => {
      setIsLoaded(true);
    }, 50);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={`lp-root ${isLoaded ? 'lp-root-loaded' : ''}`}>
      {/* ── HEADER ── */}
      <header className={`lp-header ${isScrolled ? "lp-header-scrolled" : ""}`}>
        <div className={`lp-nav-pill ${isScrolled ? "lp-nav-pill-scrolled" : ""}`}>
          {/* Brand */}
          <Link className="lp-brand" aria-label="SIMMAS home" href="/">
            <div className="lp-brand-box">
              <div className="lp-brand-inner">
                <IconGradCap className="lp-brand-icon" />
              </div>
            </div>
            <span className="lp-brand-name">SIMMAS</span>
          </Link>

          {/* Nav links */}
          <nav className="lp-nav-links">
            <a className="lp-nav-link" href="#features">Fitur</a>
            <a className="lp-nav-link" href="#panduan">Panduan</a>
          </nav>

          {/* Actions */}
          <div className="lp-nav-actions">
            <Link className="lp-btn-masuk" href={LOGIN}>Masuk</Link>
            <Link className="lp-btn-primary lp-btn-pill" href={LOGIN}>
              Mulai Sekarang
              <IconArrowRight className="lp-btn-arrow" />
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button className="lp-hamburger" aria-label="Toggle Menu">
            <IconMenu className="lp-hamburger-icon" />
          </button>
        </div>
      </header>

      <main className="lp-main">
        {/* ── HERO ── */}
        <section className="lp-hero">
          {/* Decorative circles */}
          <div className="lp-deco lp-deco-tr-lg" />
          <div className="lp-deco lp-deco-tr-sm" />
          <div className="lp-deco lp-deco-bl" />
          {/* Blue panel right */}
          <div className="lp-hero-panel" />
          <div className="lp-hero-panel-dots" />

          <div className="lp-hero-inner">
            <div className="lp-hero-grid">
              {/* Left content */}
              <div className="lp-hero-left">
                <p className="lp-eyebrow">Sistem Informasi Manajemen Magang Siswa</p>
                <h1 className="lp-hero-h1">
                  Magang
                  <br />
                  lebih
                  <br />
                  teratur.
                </h1>
                <p className="lp-hero-sub">
                  Platform manajemen magang siswa SMK yang menghubungkan sekolah, guru pembimbing,
                  dan dunia usaha dalam satu sistem terpadu.
                </p>
                <ul className="lp-checklist">
                  {[
                    "Penempatan magang terpusat & transparan",
                    "Monitoring kehadiran & jurnal real-time",
                    "Koordinasi sekolah, guru, dan industri",
                  ].map((item) => (
                    <li key={item} className="lp-check-item">
                      <IconCircleCheck className="lp-check-icon" />
                      <span className="lp-check-text">{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="lp-hero-cta">
                  <Link href={LOGIN}>
                    <button className="lp-btn-primary lp-btn-lg">
                      Mulai Sekarang
                      <IconArrowRight className="lp-cta-arrow" />
                    </button>
                  </Link>
                  <Link href="#features">
                    <button className="lp-btn-outline lp-btn-lg">Lihat Fitur</button>
                  </Link>
                </div>
              </div>

              {/* Right mockup */}
              <div className="lp-hero-right">
                <div className="lp-mock-wrap">
                  {/* Shadow card behind */}
                  <div className="lp-mock-shadow" />
                  {/* Browser window */}
                  <div className="lp-mock-window">
                    <div className="lp-mock-bar">
                      <div className="lp-mock-dot lp-dot-red" />
                      <div className="lp-mock-dot lp-dot-yellow" />
                      <div className="lp-mock-dot lp-dot-green" />
                      <div className="lp-mock-url" />
                    </div>
                    <Image
                      alt="Tampilan Dashboard SIMMAS"
                      src="/dashboard-mockup.png"
                      width={840}
                      height={840}
                      priority
                      className="lp-mock-img"
                    />
                  </div>
                  {/* Live badge */}
                  <div className="lp-live-badge">
                    <div className="lp-live-top">
                      <div className="lp-live-dot" />
                      <p className="lp-live-label">Live</p>
                    </div>
                    <p className="lp-live-count">324 Siswa</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── FEATURES ── */}
        <section id="features" className="lp-features">
          <div className="lp-deco lp-deco-feat-tr" />
          <div className="lp-container">
            {/* Section header */}
            <div className="lp-section-head">
              <p className="lp-eyebrow lp-eyebrow-sm">Fitur Platform</p>
              <h2 className="lp-section-h2">
                Solusi untuk<br />
                <span className="lp-text-primary">setiap peran.</span>
              </h2>
            </div>

            {/* Feature cards */}
            <div className="lp-cards3">
              {[
                {
                  Icon: IconBookOpen,
                  role: "Untuk Siswa",
                  title: "Jurnal & Kehadiran",
                  text: "Catat jurnal harian dan isi daftar hadir secara digital dari mana saja, kapan saja.",
                },
                {
                  Icon: IconUsers,
                  role: "Untuk Guru Pembimbing",
                  title: "Monitoring Terpadu",
                  text: "Pantau aktivitas, setujui jurnal, dan evaluasi performa siswa dalam satu dashboard.",
                },
                {
                  Icon: IconBriefcase,
                  role: "Untuk Admin Sekolah",
                  title: "Manajemen Penempatan",
                  text: "Kelola data DUDI, plotting pembimbing, dan cetak surat pengantar secara otomatis.",
                },
              ].map(({ Icon, role, title, text }) => (
                <div key={title} className="lp-card lp-card-group">
                  <div className="lp-card-icon-wrap">
                    <Icon className="lp-card-icon" />
                  </div>
                  <p className="lp-card-role">{role}</p>
                  <h3 className="lp-card-h3">{title}</h3>
                  <p className="lp-card-text">{text}</p>
                </div>
              ))}
            </div>

            {/* Accuracy sub-section */}
            <div className="lp-accuracy-grid">
              {/* Left text */}
              <div>
                <p className="lp-eyebrow lp-eyebrow-sm">Lebih dari Catatan Digital</p>
                <h3 className="lp-accuracy-h3">
                  Akurasi data,<br />
                  <span className="lp-text-primary">setiap hari.</span>
                </h3>
                <p className="lp-accuracy-sub">
                  SIMMAS memastikan akurasi data kehadiran dengan fitur pencatatan presisi dan
                  validasi lokasi magang.
                </p>
                <ul className="lp-checklist lp-checklist-gap">
                  {[
                    "Export Laporan Otomatis (PDF/Excel)",
                    "Notifikasi Real-time untuk Guru",
                    "Riwayat Penempatan per Angkatan",
                  ].map((item) => (
                    <li key={item} className="lp-check-item">
                      <IconCircleCheck className="lp-check-icon" />
                      <span className="lp-check-text lp-fw-semibold">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Right stats card */}
              <div className="lp-stats-rel">
                <div className="lp-stats-bg-accent" />
                <div className="lp-stats-card">
                  <p className="lp-stats-label">Ringkasan Mingguan</p>
                  <div className="lp-stats-grid">
                    {[
                      { label: "Jurnal Disetujui", value: "142" },
                      { label: "Absensi Tercatat", value: "98%" },
                      { label: "Siswa Aktif", value: "324" },
                      { label: "Perusahaan Mitra", value: "200+" },
                    ].map(({ label, value }) => (
                      <div key={label} className="lp-stat-item">
                        <p className="lp-stat-label">{label}</p>
                        <p className="lp-stat-value">{value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── PANDUAN ── */}
        <section id="panduan" className="lp-panduan">
          <div className="lp-deco lp-deco-panduan-bl" />
          <div className="lp-container">
            <div className="lp-section-head">
              <p className="lp-eyebrow lp-eyebrow-sm">Cara Kerja</p>
              <h2 className="lp-section-h2">
                Empat langkah,<br />
                <span className="lp-text-primary">satu sistem.</span>
              </h2>
            </div>
            <div className="lp-steps4">
              {[
                { Icon: IconBuilding2, num: "01", title: "Registrasi DUDI", text: "Admin sekolah mendaftarkan daftar industri (DUDI) dan menetapkan kuota penempatan siswa.", last: false },
                { Icon: IconUserPlus, num: "02", title: "Pengajuan Siswa", text: "Siswa memilih atau mengajukan tempat magang melalui dashboard masing-masing.", last: false },
                { Icon: IconFilePenLine, num: "03", title: "Persetujuan & Surat", text: "Sekolah mencetak surat pengantar otomatis untuk diserahkan ke pihak industri.", last: false },
                { Icon: IconPresentation, num: "04", title: "Monitoring", text: "Siswa mengisi jurnal harian, guru memantau perkembangan secara real-time dari sistem.", last: true },
              ].map(({ Icon, num, title, text, last }) => (
                <div key={num} className="lp-step-wrap lp-step-group">
                  {!last && <div className="lp-step-connector" />}
                  <div className="lp-step-card">
                    <div className="lp-step-top">
                      <div className="lp-step-icon-wrap">
                        <Icon className="lp-step-icon" />
                      </div>
                      <span className="lp-step-num">{num}</span>
                    </div>
                    <h3 className="lp-step-h3">{title}</h3>
                    <p className="lp-step-text">{text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA FINAL ── */}
        <section className="lp-cta-section">
          <div className="lp-deco lp-deco-cta-tr" />
          <div className="lp-deco lp-deco-cta-bl" />
          <div className="lp-deco lp-deco-cta-panel" />
          <div className="lp-cta-dots" />
          <div className="lp-cta-inner">
            <p className="lp-cta-eyebrow">Mulai Sekarang</p>
            <h2 className="lp-cta-h2">
              Siap untuk<br />
              <span className="lp-cta-muted">digitalisasi</span><br />
              magang?
            </h2>
            <p className="lp-cta-sub">
              Tingkatkan efisiensi pemantauan dan evaluasi siswa magang dengan platform yang
              dirancang untuk produktivitas maksimal.
            </p>
            <Link href={LOGIN}>
              <button className="lp-btn-white lp-btn-lg">
                Masuk ke Dashboard
                <IconArrowRight className="lp-cta-arrow" />
              </button>
            </Link>
          </div>
        </section>
      </main>

      {/* ── FOOTER ── */}
      <footer className="lp-footer">
        <div className="lp-footer-inner">
          <div className="lp-footer-grid">
            {/* Brand col */}
            <div className="lp-footer-brand-col">
              <Link className="lp-footer-brand" href="/">
                <div className="lp-footer-logo">
                  <IconGradCap className="lp-footer-logo-icon" />
                </div>
                <span className="lp-footer-brand-name">SIMMAS</span>
              </Link>
              <p className="lp-footer-desc">Sistem Informasi Manajemen Magang Siswa untuk SMK modern.</p>
            </div>

            {/* Produk */}
            <div>
              <p className="lp-footer-col-label">Produk</p>
              <ul className="lp-footer-links">
                <li><a className="lp-footer-link" href="#features">Fitur</a></li>
                <li><a className="lp-footer-link" href="#panduan">Panduan</a></li>
                <li><a className="lp-footer-link" href="#keamanan">Keamanan</a></li>
              </ul>
            </div>

            {/* Akses */}
            <div>
              <p className="lp-footer-col-label">Akses</p>
              <ul className="lp-footer-links">
                <li><a className="lp-footer-link" href={LOGIN}>Siswa</a></li>
                <li><a className="lp-footer-link" href={LOGIN}>Guru Pembimbing</a></li>
                <li><a className="lp-footer-link" href={LOGIN}>Administrator</a></li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <p className="lp-footer-col-label">Legal</p>
              <ul className="lp-footer-links">
                <li><a className="lp-footer-link" href="#">Kebijakan Privasi</a></li>
                <li><a className="lp-footer-link" href="#">Ketentuan Layanan</a></li>
              </ul>
            </div>
          </div>

          <div className="lp-footer-bar">
            <p className="lp-footer-copy">© 2026 SIMMAS. Didesain untuk pendidikan Indonesia.</p>
            <p className="lp-footer-version">Versi 2.0.0</p>
          </div>
        </div>
      </footer>
    </div>
  );
}