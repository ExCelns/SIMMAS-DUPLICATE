"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import GuruSidebar from "../components/GuruSidebar";
import DashboardHeader from "../components/DashboardHeader";
import { SidebarProvider } from "../components/SidebarContext";

export default function GuruLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Check if user is logged in
    const userDataStr = localStorage.getItem("simmas_user");
    
    if (!userDataStr) {
      // Not logged in, redirect to login
      router.push("/login");
      return;
    }

    const userData = JSON.parse(userDataStr);
    
    // Check if user is guru
    if (userData.role !== "guru") {
      // Not guru, redirect to appropriate dashboard or login
      router.push("/login");
      return;
    }

    // Trigger animation after component mount
    setTimeout(() => {
      setIsLoaded(true);
    }, 50);
  }, [router]);

  return (
    <SidebarProvider>
      <div className={`db-layout ${isLoaded ? 'db-layout-loaded' : ''}`}>
        <GuruSidebar />
        <div className="db-content-wrap">
          <DashboardHeader />
          <main className="db-main">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
