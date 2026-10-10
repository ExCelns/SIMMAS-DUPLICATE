'use client';

import { useState } from 'react';
import DashboardHeader from './DashboardHeader';
import SiswaSidebar from './SiswaSidebar';
import { SidebarProvider } from './SidebarContext';

export default function SiswaLayout({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-[#f4f6fb]">
        <SiswaSidebar />
        <div className="flex-1 min-w-0 flex flex-col">
          <DashboardHeader />
          <main className="flex-1 p-5 md:px-6 md:py-5">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}