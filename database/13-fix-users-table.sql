-- ============================================================================
-- SIMMAS - Fix Users Table (Remove password_hash)
-- ============================================================================
-- Supabase Auth menyimpan password di tabel auth.users (internal)
-- Tabel users kita hanya untuk menyimpan role dan metadata
-- Jadi password_hash tidak diperlukan!
-- ============================================================================

-- ============================================================================
-- STEP 1: Drop password_hash column
-- ============================================================================

ALTER TABLE users DROP COLUMN IF EXISTS password_hash;

-- ============================================================================
-- STEP 2: Verify table structure
-- ============================================================================

-- Check columns
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'users' AND table_schema = 'public'
ORDER BY ordinal_position;

-- ============================================================================
-- STEP 3: Now you can insert users without password_hash
-- ============================================================================

-- Example: Insert admin user
-- Ganti dengan UID dari Supabase Authentication Dashboard!
/*
INSERT INTO users (id, email, role, is_active)
VALUES (
  'd0cd4b04-9672-435a-8a23-4c823209a945', -- UID dari Dashboard
  'admin@smkn1tasik.sch.id',
  'admin',
  true
);
*/

-- ============================================================================
-- Success Message
-- ============================================================================
DO $$
BEGIN
  RAISE NOTICE '';
  RAISE NOTICE '═══════════════════════════════════════════════════';
  RAISE NOTICE '  USERS TABLE FIXED!';
  RAISE NOTICE '═══════════════════════════════════════════════════';
  RAISE NOTICE '';
  RAISE NOTICE '✅ Column password_hash telah dihapus';
  RAISE NOTICE '';
  RAISE NOTICE '📋 Struktur tabel users sekarang:';
  RAISE NOTICE '  - id (UUID, PK)';
  RAISE NOTICE '  - email (TEXT)';
  RAISE NOTICE '  - role (TEXT)';
  RAISE NOTICE '  - is_active (BOOLEAN)';
  RAISE NOTICE '  - created_at (TIMESTAMP)';
  RAISE NOTICE '  - updated_at (TIMESTAMP)';
  RAISE NOTICE '';
  RAISE NOTICE '🔐 Password disimpan di auth.users (Supabase internal)';
  RAISE NOTICE '';
  RAISE NOTICE '⏭️  Next: Insert user dengan UID dari Dashboard';
  RAISE NOTICE '';
  RAISE NOTICE '═══════════════════════════════════════════════════';
END $$;
