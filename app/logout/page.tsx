"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { signOut } from "@/lib/auth";

/* ── Icon ── */
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

export default function LogoutPage() {
  const router = useRouter();

  useEffect(() => {
    async function handleLogout() {
      try {
        // Get user data before clearing
        const userDataStr = localStorage.getItem("simmas_user");
        let userId = null;
        let userEmail = null;

        if (userDataStr) {
          const userData = JSON.parse(userDataStr);
          userId = userData.userId;
          userEmail = userData.email;
        }

        // Log logout activity
        if (userId) {
          await supabase.from("log_aktivitas").insert({
            user_id: userId,
            aktivitas: "LOGOUT",
            modul: "AUTH",
            deskripsi: `User ${userEmail} logged out`,
            ip_address: null,
            user_agent: navigator.userAgent,
          });
        }

        // Sign out from Supabase
        await signOut();

        // Clear localStorage
        localStorage.removeItem("simmas_user");

        // Redirect after animation
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      } catch (error) {
        console.error("Logout error:", error);
        // Still redirect even if logging fails
        localStorage.removeItem("simmas_user");
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      }
    }

    handleLogout();
  }, [router]);

  return (
    <div className="lg-success-overlay">
      <div className="lg-success-card">
        {/* Icon with gradient background */}
        <div className="lg-success-icon-wrap">
          <div className="lg-success-icon-bg">
            <IconGradCap className="lg-success-icon" />
          </div>
        </div>
        
        {/* Badge */}
        <div className="lg-success-badge">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <circle cx="8" cy="8" r="7.5" stroke="#3b82f6" strokeWidth="1" fill="#fff"/>
            <path d="M5 8l2 2 4-4" stroke="#3b82f6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="lg-success-badge-text">Mengakhiri Sesi</span>
        </div>
        
        {/* Main title */}
        <h2 className="lg-success-main-title">Keluar dari Sistem...</h2>
        
        {/* Hint text */}
        <p className="lg-success-description">Mohon tunggu sebentar, sedang membersihkan sesi dan mengalihkan Anda.</p>
        
        {/* Loading button */}
        <div className="lg-success-loading-btn">
          <svg className="lg-success-spinner" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" stroke="#e5e7eb" strokeWidth="3" fill="none"/>
            <circle cx="12" cy="12" r="10" stroke="#3b82f6" strokeWidth="3" fill="none" strokeLinecap="round" strokeDasharray="63" strokeDashoffset="16"/>
          </svg>
          <span>Mengalihkan ke Halaman Login...</span>
        </div>
      </div>
    </div>
  );
}
