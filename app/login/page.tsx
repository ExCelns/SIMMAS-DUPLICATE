"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "@/lib/auth";

/* ── Icons ── */
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
function IconCircleCheck({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
      strokeLinejoin="round" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="10" /><path d="m9 12 2 2 4-4" />
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
function IconEye({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
      strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}
function IconEyeOff({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
      strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49" />
      <path d="M14.084 14.158a3 3 0 0 1-4.242-4.242" />
      <path d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143" />
      <path d="m2 2 20 20" />
    </svg>
  );
}

const DEMO_PASSWORD = "password123";

const DEMO_ACCOUNTS = [
  { email: "admin@simmas.sch.id",  role: "Admin",  password: DEMO_PASSWORD },
  { email: "guru@simmas.sch.id",   role: "Guru",   password: DEMO_PASSWORD },
  { email: "siswa@simmas.sch.id",  role: "Siswa",  password: DEMO_PASSWORD },
];

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSuccessOverlay, setShowSuccessOverlay] = useState(false);

  function handleDemoClick(demoEmail: string, demoPassword: string) {
    setEmail(demoEmail);
    setPassword(demoPassword);
    setError("");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Validasi input
    if (!email || !password) {
      setError("Email dan password harus diisi");
      setLoading(false);
      return;
    }

    try {
      // Login menggunakan Supabase Auth
      const { user } = await signIn(email, password);
      
      if (!user) {
        setError("Login gagal, silakan coba lagi");
        setLoading(false);
        return;
      }

      // Ambil data user dari database untuk mendapatkan role
      const { supabase } = await import("@/lib/supabase");
      
      const { data: userData, error: userError } = await supabase
        .from("users")
        .select("role")
        .eq("id", user.id)
        .single();

      if (userError || !userData) {
        setError("Data user tidak ditemukan");
        setLoading(false);
        return;
      }

      // Log aktivitas login
      await supabase.from("log_aktivitas").insert({
        user_id: user.id,
        aktivitas: "LOGIN_SUCCESS",
        modul: "AUTH",
        deskripsi: `User ${user.email} berhasil login`,
        ip_address: null, // Browser doesn't have direct IP access
        user_agent: navigator.userAgent,
      });

      // Simpan ke localStorage untuk compatibility dengan layout yang ada
      const userDataForStorage = {
        email: user.email,
        role: userData.role,
        name: user.email?.split('@')[0] || 'User',
        loginTime: new Date().toISOString(),
        userId: user.id,
      };
      localStorage.setItem("simmas_user", JSON.stringify(userDataForStorage));

      // Show success overlay
      setShowSuccessOverlay(true);

      // Redirect berdasarkan role setelah delay
      setTimeout(() => {
        const role = userData.role.toLowerCase();
        if (role === "admin") {
          router.push("/admin/dashboard");
        } else if (role === "guru") {
          router.push("/guru/dashboard");
        } else if (role === "siswa") {
          router.push("/siswa/dashboard");
        } else {
          setError("Role tidak valid");
          setLoading(false);
        }
      }, 2000);

    } catch (err: unknown) {
      console.error("Login error:", err);
      
      // Log failed login attempt
      try {
        const { supabase } = await import("@/lib/supabase");
        await supabase.from("log_aktivitas").insert({
          user_id: null,
          aktivitas: "LOGIN_FAILED",
          modul: "AUTH",
          deskripsi: `Failed login attempt for ${email}: ${err instanceof Error ? err.message : 'Unknown error'}`,
          ip_address: null,
          user_agent: navigator.userAgent,
        });
      } catch (logError) {
        console.error("Failed to log error:", logError);
      }
      
      setError(err instanceof Error ? err.message : "Email atau password salah");
      setLoading(false);
    }
  }

  return (
    <div className="lg-root">
      {/* Success Overlay */}
      {showSuccessOverlay && (
        <div className="lg-success-overlay">
          <div className="lg-success-card">
            {/* Icon with gradient background */}
            <div className="lg-success-icon-wrap">
              <div className="lg-success-icon-bg">
                <IconGradCap className="lg-success-icon" />
              </div>
            </div>
            
            {/* Check mark badge */}
            <div className="lg-success-badge">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="8" cy="8" r="7.5" stroke="#3b82f6" strokeWidth="1" fill="#fff"/>
                <path d="M5 8l2 2 4-4" stroke="#3b82f6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="lg-success-badge-text">Autentikasi Berhasil</span>
            </div>
            
            {/* Main title */}
            <h2 className="lg-success-main-title">Mengalihkan ke Dashboard...</h2>
            
            {/* Hint text */}
            <p className="lg-success-description">Mohon tunggu sebentar, sedang menyiapkan data dashboard Anda.</p>
            
            {/* Loading button */}
            <div className="lg-success-loading-btn">
              <svg className="lg-success-spinner" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10" stroke="#e5e7eb" strokeWidth="3" fill="none"/>
                <circle cx="12" cy="12" r="10" stroke="#3b82f6" strokeWidth="3" fill="none" strokeLinecap="round" strokeDasharray="63" strokeDashoffset="16"/>
              </svg>
              <span>Memuat halaman...</span>
            </div>
          </div>
        </div>
      )}

      {/* ══ LEFT PANEL (branding) ══ */}
      <aside className="lg-aside">
        {/* Decorative circles */}
        <div className="lg-deco lg-deco-tr" />
        <div className="lg-deco lg-deco-bl" />
        <div className="lg-deco lg-deco-panel" />

        <div className="lg-aside-inner">
          {/* Logo */}
          <Link className="lg-brand" href="/">
            <div className="lg-brand-box">
              <div className="lg-brand-inner">
                <IconGradCap className="lg-brand-icon" />
              </div>
            </div>
            <span className="lg-brand-name">SIMMAS</span>
          </Link>

          {/* Hero text */}
          <div className="lg-aside-content">
            <p className="lg-aside-eyebrow">Sistem Informasi Manajemen Magang Siswa</p>
            <h1 className="lg-aside-h1">
              Magang<br />
              <span className="lg-aside-h1-muted">lebih</span><br />
              teratur.
            </h1>
            <p className="lg-aside-sub">
              Platform manajemen magang siswa SMK yang menghubungkan sekolah, guru
              pembimbing, dan dunia usaha dalam satu sistem terpadu.
            </p>
            <ul className="lg-checks">
              {[
                "Penempatan magang terpusat & transparan",
                "Monitoring kehadiran & jurnal real-time",
                "Koordinasi sekolah, guru, dan industri",
              ].map((item) => (
                <li key={item} className="lg-check-item">
                  <IconCircleCheck className="lg-check-icon" />
                  <span className="lg-check-text">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Stats bar */}
          <div className="lg-stats-bar">
            <div className="lg-stat">
              <p className="lg-stat-value">50+</p>
              <p className="lg-stat-label">SMK Aktif</p>
            </div>
            <div className="lg-stat-divider" />
            <div className="lg-stat">
              <p className="lg-stat-value">10k+</p>
              <p className="lg-stat-label">Siswa Terdaftar</p>
            </div>
            <div className="lg-stat-divider" />
            <div className="lg-stat">
              <p className="lg-stat-value">200+</p>
              <p className="lg-stat-label">Mitra DUDI</p>
            </div>
          </div>
        </div>
      </aside>

      {/* ══ RIGHT PANEL (form) ══ */}
      <main className="lg-main">
        <div className="lg-form-wrap">
          {/* Mobile logo (hidden on desktop) */}
          <Link className="lg-mobile-brand" href="/">
            <div className="lg-mobile-logo">
              <IconGradCap className="lg-brand-icon" />
            </div>
            <span className="lg-mobile-brand-name">SIMMAS</span>
          </Link>

          {/* Heading */}
          <p className="lg-portal-label">Portal Masuk</p>
          <h2 className="lg-form-h2">
            Masuk ke<br />
            <span className="lg-form-h2-blue">akun Anda.</span>
          </h2>
          <p className="lg-form-sub">
            Gunakan email sekolah dan password yang diberikan oleh admin sekolah Anda.
          </p>

          {/* Form */}
          <form className="lg-form" onSubmit={handleSubmit}>
            {/* Error Message */}
            {error && (
              <div className="lg-error-box">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
                  fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                  strokeLinejoin="round" className="lg-error-icon">
                  <circle cx="12" cy="12" r="10" />
                  <path d="m15 9-6 6" />
                  <path d="m9 9 6 6" />
                </svg>
                <span>{error}</span>
              </div>
            )}

            {/* Email */}
            <div className="lg-field">
              <label className="lg-label" htmlFor="email">Email Sekolah</label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="nama@sekolah.sch.id"
                className="lg-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Password */}
            <div className="lg-field">
              <div className="lg-password-header">
                <label className="lg-label" htmlFor="password">Password</label>
                <a className="lg-lupa" href="#">Lupa?</a>
              </div>
              <div className="lg-input-wrap">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="Masukkan password"
                  className="lg-input lg-input-pw"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="lg-eye-btn"
                  aria-label="Toggle password visibility"
                  onClick={() => setShowPassword((v) => !v)}
                >
                  {showPassword
                    ? <IconEyeOff className="lg-eye-icon" />
                    : <IconEye className="lg-eye-icon" />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button type="submit" className="lg-submit-btn" disabled={loading}>
              {loading ? (
                <>
                  <svg className="lg-spinner" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="lg-spinner-track" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="lg-spinner-path" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Mengautentikasi...
                </>
              ) : (
                <>
                  Masuk Dashboard
                  <IconArrowRight className="lg-submit-arrow" />
                </>
              )}
            </button>
          </form>

          {/* Demo accounts */}
          <div className="lg-demo-section">
            <p className="lg-demo-label">Akun Demo</p>
            <div className="lg-demo-list">
              {DEMO_ACCOUNTS.map(({ email: demoEmail, role, password: demoPassword }) => (
                <button
                  key={role}
                  type="button"
                  className="lg-demo-item"
                  onClick={() => handleDemoClick(demoEmail, demoPassword)}
                >
                  <span className="lg-demo-email">{demoEmail}</span>
                  <span className="lg-demo-role">{role.toUpperCase()}</span>
                </button>
              ))}
            </div>
            <p className="lg-demo-hint">Klik akun demo untuk mengisi email dan password secara otomatis.</p>
          </div>
        </div>
      </main>
    </div>
  );
}
