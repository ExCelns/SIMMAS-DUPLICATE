"use client";

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function TestDatabase() {
  const [status, setStatus] = useState<'checking' | 'success' | 'error'>('checking');
  const [results, setResults] = useState<any>({});
  const [error, setError] = useState<string>('');

  useEffect(() => {
    testConnection();
  }, []);

  const testConnection = async () => {
    const tests: any = {};

    try {
      // Test 1: Koneksi dasar
      console.log('🔍 Test 1: Testing basic connection...');
      const { data: healthCheck, error: healthError } = await supabase
        .from('pengaturan')
        .select('count')
        .limit(1);
      
      tests.connection = healthError ? '❌ Failed' : '✅ Connected';
      if (healthError) throw new Error(`Connection failed: ${healthError.message}`);

      // Test 2: Cek tabel users
      console.log('🔍 Test 2: Checking users table...');
      const { data: usersData, error: usersError } = await supabase
        .from('users')
        .select('id, email, role')
        .limit(5);
      
      tests.usersTable = usersError ? `❌ ${usersError.message}` : `✅ Found ${usersData?.length || 0} users`;
      tests.usersList = usersData;

      // Test 3: Cek tabel siswa
      console.log('🔍 Test 3: Checking siswa table...');
      const { data: siswaData, error: siswaError } = await supabase
        .from('siswa')
        .select('id, nis, nama')
        .limit(5);
      
      tests.siswaTable = siswaError ? `❌ ${siswaError.message}` : `✅ Found ${siswaData?.length || 0} siswa`;
      tests.siswaList = siswaData;

      // Test 4: Cek tabel guru
      console.log('🔍 Test 4: Checking guru table...');
      const { data: guruData, error: guruError } = await supabase
        .from('guru')
        .select('id, nip, nama')
        .limit(5);
      
      tests.guruTable = guruError ? `❌ ${guruError.message}` : `✅ Found ${guruData?.length || 0} guru`;
      tests.guruList = guruData;

      // Test 5: Cek views
      console.log('🔍 Test 5: Checking views...');
      const { data: statsData, error: statsError } = await supabase
        .from('v_statistik_admin')
        .select('*')
        .limit(1)
        .single();
      
      tests.views = statsError ? `❌ ${statsError.message}` : '✅ Views working';
      tests.statsData = statsData;

      // Test 6: Test Auth
      console.log('🔍 Test 6: Testing Auth...');
      const { data: { session }, error: authError } = await supabase.auth.getSession();
      tests.auth = authError ? `❌ ${authError.message}` : session ? '✅ User logged in' : '⚠️ Not logged in';

      setResults(tests);
      setStatus('success');
      console.log('✅ All tests completed!');
      
    } catch (err: any) {
      console.error('❌ Test failed:', err);
      setError(err.message);
      setResults(tests);
      setStatus('error');
    }
  };

  const testLogin = async () => {
    try {
      console.log('🔐 Testing login with seed data...');
      
      const testAccounts = [
        { email: 'admin@smkn1tasik.sch.id', password: 'admin123', role: 'admin' },
        { email: 'ahmad.yusuf@smkn1tasik.sch.id', password: 'guru123', role: 'guru' },
        { email: 'adelia.putri@student.smkn1tasik.sch.id', password: 'siswa123', role: 'siswa' }
      ];

      for (const account of testAccounts) {
        console.log(`\n🧪 Testing ${account.role}: ${account.email}`);
        
        const { data, error } = await supabase.auth.signInWithPassword({
          email: account.email,
          password: account.password
        });

        if (error) {
          console.error(`❌ Login failed:`, error.message);
          alert(`❌ Login ${account.role} failed: ${error.message}`);
        } else {
          console.log(`✅ Login ${account.role} success!`);
          alert(`✅ Login ${account.role} berhasil! User: ${data.user?.email}`);
          
          // Logout untuk test berikutnya
          await supabase.auth.signOut();
        }
      }
    } catch (err: any) {
      console.error('❌ Login test error:', err);
      alert(`Error: ${err.message}`);
    }
  };

  return (
    <div style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto', fontFamily: 'monospace' }}>
      <h1 style={{ fontSize: '32px', marginBottom: '20px' }}>🧪 Database Connection Test</h1>
      
      {/* Status Badge */}
      <div style={{ 
        padding: '15px 20px', 
        borderRadius: '8px', 
        marginBottom: '30px',
        backgroundColor: status === 'checking' ? '#fef3c7' : status === 'success' ? '#d1fae5' : '#fee2e2',
        border: `2px solid ${status === 'checking' ? '#fbbf24' : status === 'success' ? '#10b981' : '#ef4444'}`
      }}>
        <strong>Status: </strong>
        {status === 'checking' && '⏳ Checking...'}
        {status === 'success' && '✅ Connected'}
        {status === 'error' && '❌ Error'}
      </div>

      {/* Error Message */}
      {error && (
        <div style={{ 
          padding: '15px', 
          backgroundColor: '#fee2e2', 
          border: '2px solid #ef4444',
          borderRadius: '8px',
          marginBottom: '20px',
          color: '#dc2626'
        }}>
          <strong>Error:</strong> {error}
        </div>
      )}

      {/* Test Results */}
      <div style={{ marginBottom: '30px' }}>
        <h2 style={{ fontSize: '24px', marginBottom: '15px' }}>📊 Test Results:</h2>
        
        {Object.keys(results).length > 0 && (
          <div style={{ 
            backgroundColor: '#1f2937', 
            color: '#f3f4f6',
            padding: '20px', 
            borderRadius: '8px',
            fontSize: '14px',
            lineHeight: '1.8'
          }}>
            {Object.entries(results).map(([key, value]) => (
              <div key={key} style={{ marginBottom: '10px' }}>
                <strong style={{ color: '#60a5fa' }}>{key}:</strong>{' '}
                {typeof value === 'object' ? (
                  <pre style={{ 
                    marginTop: '5px',
                    padding: '10px',
                    backgroundColor: '#374151',
                    borderRadius: '4px',
                    overflow: 'auto'
                  }}>
                    {JSON.stringify(value, null, 2)}
                  </pre>
                ) : (
                  <span>{String(value)}</span>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Environment Check */}
      <div style={{ marginBottom: '30px' }}>
        <h2 style={{ fontSize: '24px', marginBottom: '15px' }}>🔧 Environment Variables:</h2>
        <div style={{ 
          backgroundColor: '#f3f4f6', 
          padding: '15px', 
          borderRadius: '8px',
          fontSize: '14px'
        }}>
          <div>
            <strong>NEXT_PUBLIC_SUPABASE_URL:</strong>{' '}
            {process.env.NEXT_PUBLIC_SUPABASE_URL ? 
              `✅ ${process.env.NEXT_PUBLIC_SUPABASE_URL}` : 
              '❌ Not set'}
          </div>
          <div style={{ marginTop: '10px' }}>
            <strong>NEXT_PUBLIC_SUPABASE_ANON_KEY:</strong>{' '}
            {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 
              `✅ ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY.substring(0, 20)}...` : 
              '❌ Not set'}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
        <button
          onClick={testConnection}
          style={{
            padding: '12px 24px',
            backgroundColor: '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: 'bold'
          }}
        >
          🔄 Refresh Tests
        </button>

        <button
          onClick={testLogin}
          style={{
            padding: '12px 24px',
            backgroundColor: '#10b981',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: 'bold'
          }}
        >
          🔐 Test Login (Seed Accounts)
        </button>

        <button
          onClick={() => window.location.href = '/login'}
          style={{
            padding: '12px 24px',
            backgroundColor: '#6366f1',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: 'bold'
          }}
        >
          ➡️ Go to Login Page
        </button>
      </div>

      {/* Instructions */}
      <div style={{ 
        marginTop: '40px', 
        padding: '20px',
        backgroundColor: '#fef3c7',
        border: '2px solid #fbbf24',
        borderRadius: '8px'
      }}>
        <h3 style={{ fontSize: '18px', marginBottom: '10px' }}>💡 Troubleshooting:</h3>
        <ol style={{ marginLeft: '20px', lineHeight: '1.8' }}>
          <li>Pastikan file <code>.env.local</code> sudah terisi dengan benar</li>
          <li>Pastikan semua script database (01-10) sudah dijalankan di Supabase</li>
          <li>Restart dev server setelah update <code>.env.local</code></li>
          <li>Check browser console (F12) untuk error details</li>
          <li>Jika login gagal, password di seed data mungkin tidak ter-hash dengan benar</li>
        </ol>
      </div>
    </div>
  );
}
