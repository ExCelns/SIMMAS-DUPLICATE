"use client";

import { useState } from 'react';
import { supabase } from '@/lib/supabase';

interface TestUser {
  email: string;
  password: string;
  role: 'admin' | 'guru' | 'siswa';
  nama: string;
  nip?: string;
  nis?: string;
  kelas?: string;
  jurusan?: string;
}

export default function SetupUsers() {
  const [creating, setCreating] = useState(false);
  const [results, setResults] = useState<any[]>([]);

  const testUsers: TestUser[] = [
    {
      email: 'admin@smkn1tasik.sch.id',
      password: 'admin123',
      role: 'admin',
      nama: 'Administrator'
    },
    {
      email: 'ahmad.yusuf@smkn1tasik.sch.id',
      password: 'guru123',
      role: 'guru',
      nama: 'Ahmad Yusuf',
      nip: '197805122008012001'
    },
    {
      email: 'budi.santoso@smkn1tasik.sch.id',
      password: 'guru123',
      role: 'guru',
      nama: 'Budi Santoso',
      nip: '198203152010012002'
    },
    {
      email: 'adelia.putri@student.smkn1tasik.sch.id',
      password: 'siswa123',
      role: 'siswa',
      nama: 'Adelia Putri',
      nis: '202401001',
      kelas: 'XII RPL 1',
      jurusan: 'Rekayasa Perangkat Lunak'
    },
    {
      email: 'bagus.pratama@student.smkn1tasik.sch.id',
      password: 'siswa123',
      role: 'siswa',
      nama: 'Bagus Pratama',
      nis: '202401003',
      kelas: 'XII RPL 1',
      jurusan: 'Rekayasa Perangkat Lunak'
    }
  ];

  const createUsers = async () => {
    setCreating(true);
    setResults([]);
    const tempResults: any[] = [];

    for (const user of testUsers) {
      try {
        console.log(`\n🔧 Creating ${user.role}: ${user.email}...`);

        // 1. Sign up user dengan Supabase Auth
        const { data: authData, error: authError } = await supabase.auth.signUp({
          email: user.email,
          password: user.password,
          options: {
            data: {
              role: user.role,
              nama: user.nama
            }
          }
        });

        if (authError) {
          console.error(`❌ Auth error:`, authError.message);
          tempResults.push({
            email: user.email,
            status: '❌ Failed',
            error: authError.message
          });
          continue;
        }

        const userId = authData.user?.id;
        if (!userId) {
          tempResults.push({
            email: user.email,
            status: '❌ Failed',
            error: 'No user ID returned'
          });
          continue;
        }

        // 2. Insert ke tabel users
        const { error: usersError } = await supabase
          .from('users')
          .insert({
            id: userId,
            email: user.email,
            role: user.role,
            is_active: true
          });

        if (usersError) {
          console.error(`❌ Users table error:`, usersError.message);
        }

        // 3. Insert ke tabel guru/siswa sesuai role
        if (user.role === 'guru' && user.nip) {
          const { error: guruError } = await supabase
            .from('guru')
            .upsert({
              user_id: userId,
              nip: user.nip,
              nama: user.nama,
              status: 'aktif'
            }, {
              onConflict: 'nip'
            });

          if (guruError) {
            console.error(`❌ Guru table error:`, guruError.message);
          }
        }

        if (user.role === 'siswa' && user.nis) {
          const { error: siswaError } = await supabase
            .from('siswa')
            .upsert({
              user_id: userId,
              nis: user.nis,
              nama: user.nama,
              kelas: user.kelas!,
              jurusan: user.jurusan!,
              status: 'aktif'
            }, {
              onConflict: 'nis'
            });

          if (siswaError) {
            console.error(`❌ Siswa table error:`, siswaError.message);
          }
        }

        console.log(`✅ Successfully created ${user.email}`);
        tempResults.push({
          email: user.email,
          role: user.role,
          status: '✅ Success',
          userId: userId
        });

        // Logout after each creation
        await supabase.auth.signOut();

      } catch (err: any) {
        console.error(`❌ Error creating ${user.email}:`, err);
        tempResults.push({
          email: user.email,
          status: '❌ Error',
          error: err.message
        });
      }

      // Wait a bit between creations
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    setResults(tempResults);
    setCreating(false);
  };

  return (
    <div style={{ padding: '40px', maxWidth: '1000px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '32px', marginBottom: '10px' }}>👥 Setup Test Users</h1>
      <p style={{ color: '#666', marginBottom: '30px' }}>
        Create test users untuk development & testing
      </p>

      {/* Warning */}
      <div style={{
        padding: '20px',
        backgroundColor: '#fef3c7',
        border: '2px solid #fbbf24',
        borderRadius: '8px',
        marginBottom: '30px'
      }}>
        <strong>⚠️ Peringatan:</strong>
        <ul style={{ marginTop: '10px', marginLeft: '20px' }}>
          <li>Halaman ini hanya untuk setup awal development</li>
          <li>Jangan gunakan di production</li>
          <li>Password akan dikirim ke email (jika email confirmation enabled)</li>
          <li>Pastikan Email confirmation di-disable dulu di Supabase Settings</li>
        </ul>
      </div>

      {/* Users yang akan dibuat */}
      <div style={{ marginBottom: '30px' }}>
        <h2 style={{ fontSize: '24px', marginBottom: '15px' }}>📋 Test Users:</h2>
        <div style={{
          backgroundColor: '#f3f4f6',
          padding: '20px',
          borderRadius: '8px'
        }}>
          {testUsers.map((user, index) => (
            <div key={index} style={{
              padding: '15px',
              backgroundColor: 'white',
              borderRadius: '6px',
              marginBottom: '10px',
              border: '1px solid #e5e7eb'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <strong>{user.nama}</strong>
                  <div style={{ fontSize: '14px', color: '#666', marginTop: '5px' }}>
                    {user.email} • {user.password}
                  </div>
                  {user.nip && <div style={{ fontSize: '12px', color: '#999' }}>NIP: {user.nip}</div>}
                  {user.nis && <div style={{ fontSize: '12px', color: '#999' }}>NIS: {user.nis}</div>}
                </div>
                <span style={{
                  padding: '5px 15px',
                  borderRadius: '20px',
                  fontSize: '12px',
                  fontWeight: 'bold',
                  backgroundColor: user.role === 'admin' ? '#dbeafe' : user.role === 'guru' ? '#d1fae5' : '#fef3c7',
                  color: user.role === 'admin' ? '#1e40af' : user.role === 'guru' ? '#065f46' : '#92400e'
                }}>
                  {user.role.toUpperCase()}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Create Button */}
      <button
        onClick={createUsers}
        disabled={creating}
        style={{
          padding: '15px 30px',
          backgroundColor: creating ? '#9ca3af' : '#3b82f6',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          fontSize: '16px',
          fontWeight: 'bold',
          cursor: creating ? 'not-allowed' : 'pointer',
          width: '100%',
          marginBottom: '30px'
        }}
      >
        {creating ? '⏳ Creating users...' : '🚀 Create All Test Users'}
      </button>

      {/* Results */}
      {results.length > 0 && (
        <div>
          <h2 style={{ fontSize: '24px', marginBottom: '15px' }}>📊 Results:</h2>
          <div style={{
            backgroundColor: '#1f2937',
            color: '#f3f4f6',
            padding: '20px',
            borderRadius: '8px',
            fontSize: '14px',
            fontFamily: 'monospace'
          }}>
            {results.map((result, index) => (
              <div key={index} style={{
                padding: '10px',
                backgroundColor: '#374151',
                borderRadius: '4px',
                marginBottom: '10px'
              }}>
                <div><strong>{result.email}</strong></div>
                <div style={{ marginTop: '5px' }}>
                  Status: <span style={{
                    color: result.status.includes('✅') ? '#10b981' : '#ef4444'
                  }}>{result.status}</span>
                </div>
                {result.userId && <div style={{ fontSize: '12px', color: '#9ca3af' }}>User ID: {result.userId}</div>}
                {result.error && <div style={{ color: '#ef4444', fontSize: '12px' }}>Error: {result.error}</div>}
              </div>
            ))}
          </div>

          {/* Next Steps */}
          {results.every(r => r.status.includes('✅')) && (
            <div style={{
              marginTop: '20px',
              padding: '20px',
              backgroundColor: '#d1fae5',
              border: '2px solid #10b981',
              borderRadius: '8px'
            }}>
              <strong>✅ Semua users berhasil dibuat!</strong>
              <div style={{ marginTop: '10px' }}>
                Selanjutnya:
                <ol style={{ marginLeft: '20px', marginTop: '10px' }}>
                  <li>Buka <a href="/test-db" style={{ color: '#2563eb', textDecoration: 'underline' }}>/test-db</a> untuk test koneksi</li>
                  <li>Coba login di <a href="/login" style={{ color: '#2563eb', textDecoration: 'underline' }}>/login</a></li>
                  <li>Gunakan salah satu email & password di atas</li>
                </ol>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Instructions */}
      <div style={{
        marginTop: '30px',
        padding: '20px',
        backgroundColor: '#f3f4f6',
        borderRadius: '8px',
        fontSize: '14px'
      }}>
        <strong>📚 Troubleshooting:</strong>
        <ul style={{ marginTop: '10px', marginLeft: '20px', lineHeight: '1.8' }}>
          <li>Jika error "User already registered", users sudah ada (skip atau delete dulu)</li>
          <li>Jika error "Email confirmation", disable di Supabase → Authentication → Settings → Email Auth</li>
          <li>Jika error "Policy violation", check RLS policies di database</li>
          <li>Check browser console (F12) untuk detail error</li>
        </ul>
      </div>
    </div>
  );
}
