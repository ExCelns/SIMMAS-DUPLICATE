-- ============================================================================
-- SIMMAS Database - Fix Seed Passwords
-- ============================================================================
-- Script ini memperbaiki password seed data agar bisa digunakan untuk login
-- Jalankan setelah 10-seed-data.sql
-- ============================================================================

-- ⚠️ CATATAN PENTING:
-- Supabase Auth tidak menggunakan tabel 'users' untuk authentication
-- Supabase Auth menggunakan tabel internal 'auth.users'
-- Kita perlu create users via Supabase Auth API, bukan INSERT manual

-- Untuk sementara, kita akan create test users menggunakan SQL
-- Tapi cara terbaik adalah melalui aplikasi atau Supabase Dashboard

-- ============================================================================
-- OPTION 1: Create Test Users via Supabase Dashboard (REKOMENDASI)
-- ============================================================================

/*
1. Buka Supabase Dashboard → Authentication → Users
2. Klik "Add user" atau "Invite"
3. Tambahkan user berikut:

ADMIN:
- Email: admin@smkn1tasik.sch.id
- Password: admin123
- Email Confirm: Skip (atau confirm manual)

GURU:
- Email: ahmad.yusuf@smkn1tasik.sch.id  
- Password: guru123

- Email: budi.santoso@smkn1tasik.sch.id
- Password: guru123

SISWA:
- Email: adelia.putri@student.smkn1tasik.sch.id
- Password: siswa123

- Email: bagus.pratama@student.smkn1tasik.sch.id
- Password: siswa123

4. Setelah user dibuat, user_id akan auto-generate
5. Update tabel guru/siswa dengan user_id yang benar
*/

-- ============================================================================
-- OPTION 2: Create via SQL (Advanced)
-- ============================================================================

-- Hapus data users yang placeholder
DELETE FROM users WHERE password_hash LIKE '$2a$10$X1234%';

-- Note: Untuk create user via auth.users, butuh service_role access
-- Jadi lebih baik gunakan Option 1 (Dashboard) atau Option 3 (API)

-- ============================================================================
-- OPTION 3: Script untuk Create Users via API (REKOMENDASI untuk Production)
-- ============================================================================

-- Simpan script ini dan jalankan di aplikasi Next.js
-- File: scripts/create-test-users.ts

/*
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!; // Butuh service key

const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

async function createTestUsers() {
  const testUsers = [
    { email: 'admin@smkn1tasik.sch.id', password: 'admin123', role: 'admin' },
    { email: 'ahmad.yusuf@smkn1tasik.sch.id', password: 'guru123', role: 'guru' },
    { email: 'adelia.putri@student.smkn1tasik.sch.id', password: 'siswa123', role: 'siswa' },
  ];

  for (const user of testUsers) {
    const { data, error } = await supabaseAdmin.auth.admin.createUser({
      email: user.email,
      password: user.password,
      email_confirm: true
    });

    if (error) {
      console.error(`Failed to create ${user.email}:`, error);
    } else {
      console.log(`✅ Created ${user.email}`);
      
      // Update tabel users dengan role
      await supabaseAdmin.from('users').insert({
        id: data.user.id,
        email: user.email,
        role: user.role
      });
    }
  }
}

createTestUsers();
*/

-- ============================================================================
-- TEMPORARY FIX: Update existing records
-- ============================================================================

-- Jika Anda sudah create users via Dashboard/API, 
-- update user_id di tabel guru dan siswa

-- Contoh (ganti dengan UUID asli dari auth.users):
/*
UPDATE guru 
SET user_id = 'uuid-dari-auth-users'
WHERE nip = '197805122008012001';

UPDATE siswa 
SET user_id = 'uuid-dari-auth-users'
WHERE nis = '202401001';
*/

-- ============================================================================
-- VERIFICATION: Cek users yang sudah dibuat
-- ============================================================================

-- Cek auth users (butuh RLS policy atau service_role)
-- SELECT id, email, created_at FROM auth.users;

-- Cek mapping user_id di tabel guru/siswa
SELECT 
  u.email,
  u.role,
  g.nama as guru_nama,
  s.nama as siswa_nama
FROM users u
LEFT JOIN guru g ON u.id = g.user_id
LEFT JOIN siswa s ON u.id = s.user_id
WHERE u.role IN ('guru', 'siswa');

-- ============================================================================
-- Success Message
-- ============================================================================
DO $$
BEGIN
  RAISE NOTICE '';
  RAISE NOTICE '═══════════════════════════════════════════════════';
  RAISE NOTICE '  CARA MEMBUAT TEST USERS';
  RAISE NOTICE '═══════════════════════════════════════════════════';
  RAISE NOTICE '';
  RAISE NOTICE '🔧 OPTION 1 (TERMUDAH):';
  RAISE NOTICE '  1. Buka Supabase Dashboard';
  RAISE NOTICE '  2. Authentication → Users → Add user';
  RAISE NOTICE '  3. Tambahkan email & password manual';
  RAISE NOTICE '';
  RAISE NOTICE '🔧 OPTION 2 (via Aplikasi):';
  RAISE NOTICE '  1. Buat halaman /admin/create-users';
  RAISE NOTICE '  2. Gunakan signUp() untuk create users';
  RAISE NOTICE '';
  RAISE NOTICE '📋 Test Accounts yang perlu dibuat:';
  RAISE NOTICE '  • admin@smkn1tasik.sch.id / admin123';
  RAISE NOTICE '  • ahmad.yusuf@smkn1tasik.sch.id / guru123';
  RAISE NOTICE '  • adelia.putri@student.smkn1tasik.sch.id / siswa123';
  RAISE NOTICE '';
  RAISE NOTICE '⚠️  Setelah create user, jangan lupa update:';
  RAISE NOTICE '  - Tabel users (insert dengan role)';
  RAISE NOTICE '  - Tabel guru/siswa (update user_id)';
  RAISE NOTICE '';
  RAISE NOTICE '═══════════════════════════════════════════════════';
END $$;
