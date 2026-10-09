// lib/auth.ts
import { supabase } from './supabase';

export type UserRole = 'admin' | 'guru' | 'siswa';

export interface AuthUser {
  id: string;
  email: string;
  role: UserRole;
}

// Login
export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;

  // Get user role from database
  const { data: userData, error: userError } = await supabase
    .from('users')
    .select('id, email, role')
    .eq('id', data.user.id)
    .single();

  if (userError) throw userError;

  return {
    user: data.user,
    session: data.session,
    role: userData.role,
  };
}

// Logout
export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

// Get current user
export async function getCurrentUser() {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) return null;

  // Get user role
  const { data: userData } = await supabase
    .from('users')
    .select('id, email, role')
    .eq('id', user.id)
    .single();

  return userData;
}

// Check if user is authenticated
export async function isAuthenticated() {
  const { data: { session } } = await supabase.auth.getSession();
  return !!session;
}

// Get user role
export async function getUserRole(): Promise<UserRole | null> {
  const user = await getCurrentUser();
  return user?.role || null;
}
