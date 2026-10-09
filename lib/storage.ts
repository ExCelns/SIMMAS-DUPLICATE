// lib/storage.ts
import { supabase } from './supabase';

/**
 * Storage Helper Functions
 * Untuk upload & manage files ke Supabase Storage
 */

// ============================================================================
// TYPES
// ============================================================================

export type BucketName = 'absensi-foto' | 'kunjungan-foto' | 'dokumen' | 'profil-foto';

export interface UploadResult {
  url: string;
  path: string;
  error?: string;
}

// ============================================================================
// FILE VALIDATION
// ============================================================================

const BUCKET_CONFIGS = {
  'absensi-foto': {
    maxSize: 5 * 1024 * 1024, // 5MB
    allowedTypes: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'],
  },
  'kunjungan-foto': {
    maxSize: 5 * 1024 * 1024, // 5MB
    allowedTypes: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'],
  },
  'profil-foto': {
    maxSize: 2 * 1024 * 1024, // 2MB
    allowedTypes: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'],
  },
  'dokumen': {
    maxSize: 10 * 1024 * 1024, // 10MB
    allowedTypes: [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    ],
  },
};

export function validateFile(file: File, bucket: BucketName): { valid: boolean; error?: string } {
  const config = BUCKET_CONFIGS[bucket];

  // Check file size
  if (file.size > config.maxSize) {
    const maxSizeMB = config.maxSize / (1024 * 1024);
    return {
      valid: false,
      error: `Ukuran file maksimal ${maxSizeMB}MB`,
    };
  }

  // Check file type
  if (!config.allowedTypes.includes(file.type)) {
    const allowedExts = config.allowedTypes.map(t => t.split('/')[1]).join(', ');
    return {
      valid: false,
      error: `Format file harus: ${allowedExts}`,
    };
  }

  return { valid: true };
}

// ============================================================================
// UPLOAD FUNCTIONS
// ============================================================================

/**
 * Upload file ke Supabase Storage
 * @param bucket - Nama bucket
 * @param file - File object dari input
 * @param path - Optional custom path (default: auto-generated)
 * @returns Upload result with public URL
 */
export async function uploadFile(
  bucket: BucketName,
  file: File,
  path?: string
): Promise<UploadResult> {
  try {
    // Validate file
    const validation = validateFile(file, bucket);
    if (!validation.valid) {
      return { url: '', path: '', error: validation.error };
    }

    // Generate file path if not provided
    const filePath = path || generateFilePath(file.name);

    // Upload to Supabase Storage
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false, // Don't overwrite existing files
      });

    if (error) {
      console.error('Upload error:', error);
      return { url: '', path: '', error: error.message };
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from(bucket)
      .getPublicUrl(data.path);

    return {
      url: urlData.publicUrl,
      path: data.path,
    };
  } catch (error) {
    console.error('Upload failed:', error);
    return {
      url: '',
      path: '',
      error: error instanceof Error ? error.message : 'Upload failed',
    };
  }
}

/**
 * Upload foto absensi (masuk/keluar)
 * @param file - Foto dari camera/file input
 * @param userId - User ID siswa
 * @param type - 'masuk' atau 'keluar'
 */
export async function uploadAbsensiFoto(
  file: File,
  userId: string,
  type: 'masuk' | 'keluar'
): Promise<UploadResult> {
  const year = new Date().getFullYear();
  const month = String(new Date().getMonth() + 1).padStart(2, '0');
  const timestamp = Date.now();
  const extension = file.name.split('.').pop();

  // Path: 2024/10/user123_1728000000_masuk.jpg
  const path = `${year}/${month}/${userId}_${timestamp}_${type}.${extension}`;

  return uploadFile('absensi-foto', file, path);
}

/**
 * Upload foto kunjungan guru ke DUDI
 */
export async function uploadKunjunganFoto(
  file: File,
  guruId: string
): Promise<UploadResult> {
  const year = new Date().getFullYear();
  const month = String(new Date().getMonth() + 1).padStart(2, '0');
  const timestamp = Date.now();
  const extension = file.name.split('.').pop();

  const path = `${year}/${month}/${guruId}_${timestamp}.${extension}`;

  return uploadFile('kunjungan-foto', file, path);
}

/**
 * Upload foto profil user
 */
export async function uploadProfilFoto(
  file: File,
  userId: string
): Promise<UploadResult> {
  const extension = file.name.split('.').pop();
  const path = `${userId}.${extension}`;

  // Delete old profile photo first
  await deleteFile('profil-foto', path);

  return uploadFile('profil-foto', file, path);
}

/**
 * Upload dokumen (jurnal attachment, reports, etc)
 */
export async function uploadDokumen(
  file: File,
  folder: string, // e.g., 'jurnal', 'reports'
  userId: string
): Promise<UploadResult> {
  const timestamp = Date.now();
  const sanitizedName = file.name.replace(/[^a-z0-9.]/gi, '_').toLowerCase();
  const path = `${folder}/${userId}_${timestamp}_${sanitizedName}`;

  return uploadFile('dokumen', file, path);
}

// ============================================================================
// DELETE FUNCTIONS
// ============================================================================

/**
 * Delete file from storage
 */
export async function deleteFile(bucket: BucketName, path: string): Promise<boolean> {
  try {
    const { error } = await supabase.storage.from(bucket).remove([path]);

    if (error) {
      console.error('Delete error:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Delete failed:', error);
    return false;
  }
}

/**
 * Delete multiple files
 */
export async function deleteFiles(bucket: BucketName, paths: string[]): Promise<boolean> {
  try {
    const { error } = await supabase.storage.from(bucket).remove(paths);

    if (error) {
      console.error('Delete error:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Delete failed:', error);
    return false;
  }
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Generate unique file path with timestamp
 */
function generateFilePath(originalName: string): string {
  const timestamp = Date.now();
  const randomString = Math.random().toString(36).substring(2, 8);
  const sanitizedName = originalName.replace(/[^a-z0-9.]/gi, '_').toLowerCase();

  return `${timestamp}_${randomString}_${sanitizedName}`;
}

/**
 * Get file extension from filename
 */
export function getFileExtension(filename: string): string {
  return filename.split('.').pop()?.toLowerCase() || '';
}

/**
 * Format file size for display
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
}

/**
 * Check if file is an image
 */
export function isImageFile(file: File): boolean {
  return file.type.startsWith('image/');
}

/**
 * Check if file is a document
 */
export function isDocumentFile(file: File): boolean {
  const docTypes = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  ];
  return docTypes.includes(file.type);
}

// ============================================================================
// IMAGE COMPRESSION (Optional)
// ============================================================================

/**
 * Compress image before upload
 * Install: npm install browser-image-compression
 */
export async function compressImage(file: File): Promise<File> {
  // Optional: Install browser-image-compression package
  // import imageCompression from 'browser-image-compression';
  
  // For now, return original file
  // Implement compression if needed
  return file;
  
  /*
  const options = {
    maxSizeMB: 1,
    maxWidthOrHeight: 1920,
    useWebWorker: true,
  };
  
  return await imageCompression(file, options);
  */
}
