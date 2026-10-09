-- ═══════════════════════════════════════════════════════════════════════════
-- FIX TABLE ABSENSI STRUCTURE
-- Error: "Could not find the 'waktu_masuk' column"
-- ═══════════════════════════════════════════════════════════════════════════

-- Step 1: Check current structure
SELECT 
  column_name, 
  data_type, 
  is_nullable,
  column_default
FROM information_schema.columns
WHERE table_schema = 'public' 
  AND table_name = 'absensi'
ORDER BY ordinal_position;

-- ═══════════════════════════════════════════════════════════════════════════
-- Step 2: ADD MISSING COLUMNS (if needed)
-- ═══════════════════════════════════════════════════════════════════════════

-- Add waktu_masuk if not exists
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'absensi' AND column_name = 'waktu_masuk'
  ) THEN
    ALTER TABLE public.absensi ADD COLUMN waktu_masuk VARCHAR(10);
    RAISE NOTICE 'Added column waktu_masuk';
  END IF;
END $$;

-- Add waktu_keluar if not exists
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'absensi' AND column_name = 'waktu_keluar'
  ) THEN
    ALTER TABLE public.absensi ADD COLUMN waktu_keluar VARCHAR(10);
    RAISE NOTICE 'Added column waktu_keluar';
  END IF;
END $$;

-- Add foto_masuk_url if not exists
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'absensi' AND column_name = 'foto_masuk_url'
  ) THEN
    ALTER TABLE public.absensi ADD COLUMN foto_masuk_url TEXT;
    RAISE NOTICE 'Added column foto_masuk_url';
  END IF;
END $$;

-- Add foto_keluar_url if not exists
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'absensi' AND column_name = 'foto_keluar_url'
  ) THEN
    ALTER TABLE public.absensi ADD COLUMN foto_keluar_url TEXT;
    RAISE NOTICE 'Added column foto_keluar_url';
  END IF;
END $$;

-- Add keterangan if not exists
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'absensi' AND column_name = 'keterangan'
  ) THEN
    ALTER TABLE public.absensi ADD COLUMN keterangan TEXT;
    RAISE NOTICE 'Added column keterangan';
  END IF;
END $$;

-- ═══════════════════════════════════════════════════════════════════════════
-- Step 3: DISABLE RLS (for testing)
-- ═══════════════════════════════════════════════════════════════════════════

ALTER TABLE public.absensi DISABLE ROW LEVEL SECURITY;

-- ═══════════════════════════════════════════════════════════════════════════
-- Step 4: VERIFY FINAL STRUCTURE
-- ═══════════════════════════════════════════════════════════════════════════

SELECT 
  column_name, 
  data_type, 
  is_nullable
FROM information_schema.columns
WHERE table_schema = 'public' 
  AND table_name = 'absensi'
ORDER BY ordinal_position;

-- Expected columns:
-- id (uuid)
-- siswa_id (uuid)
-- tanggal (date)
-- waktu_masuk (varchar or time)
-- waktu_keluar (varchar or time)
-- foto_masuk_url (text)
-- foto_keluar_url (text)
-- status (varchar)
-- keterangan (text)
-- created_at (timestamp)
-- updated_at (timestamp)

-- ═══════════════════════════════════════════════════════════════════════════
-- Step 5: TEST INSERT
-- ═══════════════════════════════════════════════════════════════════════════

-- Get a test siswa_id first
SELECT id, nama FROM public.siswa LIMIT 1;

-- Then test insert (replace <siswa_id> with actual id from above)
/*
INSERT INTO public.absensi (
  id,
  siswa_id,
  tanggal,
  waktu_masuk,
  foto_masuk_url,
  status,
  created_at,
  updated_at
)
VALUES (
  gen_random_uuid(),
  '<siswa_id>',
  CURRENT_DATE,
  '08:30:00',
  'https://example.com/test.jpg',
  'hadir',
  NOW(),
  NOW()
);
*/

-- If insert works, DELETE the test data:
-- DELETE FROM public.absensi WHERE foto_masuk_url = 'https://example.com/test.jpg';
