import { createClient } from '@supabase/supabase-js';

// Create Supabase client
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Auth helper functions
export const auth = {
  // Sign in with email and password
  async signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { data, error };
  },

  // Sign out
  async signOut() {
    const { error } = await supabase.auth.signOut();
    return { error };
  },

  // Get current session
  async getSession() {
    const { data: { session }, error } = await supabase.auth.getSession();
    return { session, error };
  },

  // Get current user
  async getUser() {
    const { data: { user }, error } = await supabase.auth.getUser();
    return { user, error };
  },

  // Update password
  async updatePassword(newPassword: string) {
    const { data, error } = await supabase.auth.updateUser({
      password: newPassword,
    });
    return { data, error };
  },
};

// User data helper functions
export const userData = {
  // Get user profile with role data
  async getUserProfile(userId: string) {
    const { data, error } = await supabase
      .from('users')
      .select(`
        *,
        admin (*),
        guru (*),
        siswa (*)
      `)
      .eq('id', userId)
      .single();
    
    return { data, error };
  },

  // Get user role
  async getUserRole(userId: string) {
    const { data, error } = await supabase
      .from('users')
      .select('role')
      .eq('id', userId)
      .single();
    
    return { role: data?.role, error };
  },

  // Get guru data by user_id
  async getGuruData(userId: string) {
    const { data, error } = await supabase
      .from('guru')
      .select('*')
      .eq('user_id', userId)
      .single();
    
    return { data, error };
  },

  // Get siswa data by user_id
  async getSiswaData(userId: string) {
    const { data, error } = await supabase
      .from('siswa')
      .select('*')
      .eq('user_id', userId)
      .single();
    
    return { data, error };
  },

  // Get admin data by user_id
  async getAdminData(userId: string) {
    const { data, error } = await supabase
      .from('admin')
      .select('*')
      .eq('user_id', userId)
      .single();
    
    return { data, error };
  },
};

// Activity logging
export const activityLog = {
  async log(action: string, description: string, userId?: string) {
    try {
      // Get current user if not provided
      if (!userId) {
        const { user } = await auth.getUser();
        userId = user?.id;
      }

      if (!userId) return;

      const { error } = await supabase
        .from('log_aktivitas')
        .insert({
          user_id: userId,
          action,
          description,
          ip_address: 'N/A', // Can be filled from request if needed
          user_agent: typeof window !== 'undefined' ? window.navigator.userAgent : 'N/A',
        });

      if (error) {
        console.error('Failed to log activity:', error);
      }
    } catch (error) {
      console.error('Activity log error:', error);
    }
  },
};

export default supabase;
