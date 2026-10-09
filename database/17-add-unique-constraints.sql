-- ============================================================================
-- SIMMAS - Add Unique Constraints
-- ============================================================================
-- Tambahkan UNIQUE constraint pada user_id agar ON CONFLICT bisa digunakan
-- ============================================================================

-- Add UNIQUE constraint pada guru.user_id
ALTER TABLE guru 
ADD CONSTRAINT guru_user_id_unique UNIQUE (user_id);

-- Add UNIQUE constraint pada siswa.user_id
ALTER TABLE siswa 
ADD CONSTRAINT siswa_user_id_unique UNIQUE (user_id);

-- ============================================================================
-- Verifikasi Constraints
-- ============================================================================
SELECT
  tc.constraint_name,
  tc.table_name,
  kcu.column_name
FROM information_schema.table_constraints tc
JOIN information_schema.key_column_usage kcu 
  ON tc.constraint_name = kcu.constraint_name
WHERE tc.constraint_type = 'UNIQUE'
  AND tc.table_name IN ('guru', 'siswa')
ORDER BY tc.table_name;

-- ============================================================================
-- Success Message
-- ============================================================================
DO $$
BEGIN
  RAISE NOTICE '✅ UNIQUE constraints berhasil ditambahkan!';
  RAISE NOTICE '   - guru.user_id → UNIQUE';
  RAISE NOTICE '   - siswa.user_id → UNIQUE';
  RAISE NOTICE '';
  RAISE NOTICE '⏭️  Next: Jalankan 18-insert-demo-users-final.sql';
END $$;
