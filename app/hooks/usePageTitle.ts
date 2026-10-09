"use client";

import { useEffect } from 'react';

export function usePageTitle(title: string) {
  useEffect(() => {
    document.title = `${title} | SIMMAS`;
    
    // Cleanup function to restore original title when component unmounts
    return () => {
      document.title = 'SIMMAS - Sistem Informasi Manajemen Magang Siswa';
    };
  }, [title]);
}