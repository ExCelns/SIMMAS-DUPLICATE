import { useEffect, useState } from 'react';
import { auth, userData, supabase } from '@/lib/supabase';

export interface AuthUser {
  id: string;
  email: string;
  role: 'admin' | 'guru' | 'siswa';
  nama: string;
  admin?: any;
  guru?: any;
  siswa?: any;
}

export function useAuth() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUser() {
      try {
        const { user: authUser } = await auth.getUser();
        if (authUser) {
          const { data: profile } = await userData.getUserProfile(authUser.id);
          if (profile) {
            setUser(profile as AuthUser);
          }
        }
      } catch (error) {
        console.error('Error loading user:', error);
      } finally {
        setLoading(false);
      }
    }
    
    loadUser();

    // Subscribe to auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        setUser(null);
      } else {
        loadUser();
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return { user, loading, isAuthenticated: !!user };
}
