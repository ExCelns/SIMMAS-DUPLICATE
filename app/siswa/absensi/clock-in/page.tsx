"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

function IconArrowLeft({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
      strokeLinejoin="round" className={className}>
      <path d="M19 12H5M12 19l-7-7 7-7" />
    </svg>
  );
}

function IconCamera({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
      strokeLinejoin="round" className={className}>
      <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
      <circle cx="12" cy="13" r="3" />
    </svg>
  );
}

function IconRotateCcw({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
      strokeLinejoin="round" className={className}>
      <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
      <path d="M3 3v5h5" />
    </svg>
  );
}

export default function ClockInPage() {
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    startCamera();
    return () => {
      stopCamera();
    };
  }, []);

  async function startCamera() {
    try {
      setError("");
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "user",
          width: { ideal: 1280 },
          height: { ideal: 720 }
        }
      });
      
      setStream(mediaStream);
      
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err: any) {
      console.error("Error accessing camera:", err);
      setError("Tidak dapat mengakses kamera. Pastikan izin kamera sudah diberikan.");
    }
  }

  function stopCamera() {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
  }

  function capturePhoto() {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    if (!context) return;

    // Set canvas size to video size
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Draw video frame to canvas
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Convert to base64
    const photoData = canvas.toDataURL('image/jpeg', 0.8);
    setCapturedPhoto(photoData);
    
    // Stop camera after capture
    stopCamera();
  }

  function retakePhoto() {
    setCapturedPhoto(null);
    setError("");
    startCamera();
  }

  async function handleSubmit() {
    if (!capturedPhoto) {
      setError("Silakan ambil foto terlebih dahulu");
      return;
    }

    try {
      setUploading(true);
      setError("");

      // Get user data
      const userData = localStorage.getItem("simmas_user");
      if (!userData) {
        router.push("/login");
        return;
      }

      const user = JSON.parse(userData);
      const userId = user.userId || user.id;

      // Get siswa data
      const { data: siswaData, error: siswaError } = await supabase
        .from("siswa")
        .select("id, nama")
        .eq("user_id", userId)
        .single();

      if (siswaError || !siswaData) {
        throw new Error("Data siswa tidak ditemukan");
      }

      const siswaId = siswaData.id;
      const today = new Date().toISOString().split('T')[0];
      const now = new Date();
      const waktu = now.toLocaleTimeString('id-ID', { 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit',
        hour12: false 
      });

      // Convert base64 to blob
      const blob = await fetch(capturedPhoto).then(r => r.blob());
      
      // Upload photo to Supabase Storage
      const fileName = `${siswaId}_masuk_${Date.now()}.jpg`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('absensi-foto')
        .upload(fileName, blob, {
          contentType: 'image/jpeg',
          upsert: false
        });

      if (uploadError) {
        throw new Error(`Gagal upload foto: ${uploadError.message}`);
      }

      // Get public URL
      const { data: urlData } = supabase.storage
        .from('absensi-foto')
        .getPublicUrl(fileName);

      const fotoUrl = urlData.publicUrl;

      // Check if today's absensi exists
      const { data: existingAbsensi } = await supabase
        .from("absensi")
        .select("id")
        .eq("siswa_id", siswaId)
        .eq("tanggal", today)
        .single();

      if (existingAbsensi) {
        // Update existing
        const { error: updateError } = await supabase
          .from("absensi")
          .update({
            waktu_masuk: waktu,
            foto_masuk_url: fotoUrl,
            status: 'hadir',
            updated_at: new Date().toISOString()
          })
          .eq("id", existingAbsensi.id);

        if (updateError) throw updateError;
      } else {
        // Create new
        const { error: insertError } = await supabase
          .from("absensi")
          .insert({
            siswa_id: siswaId,
            tanggal: today,
            waktu_masuk: waktu,
            foto_masuk_url: fotoUrl,
            status: 'hadir'
          });

        if (insertError) throw insertError;
      }

      alert("✅ Clock In berhasil!");
      router.push("/siswa/absensi");

    } catch (err: any) {
      console.error("Error submitting clock in:", err);
      setError(err.message || "Gagal menyimpan absensi");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div style={{ 
      minHeight: '100vh',
      background: '#f9fafb',
      padding: '24px'
    }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: '24px' }}>
          <button
            onClick={() => router.push("/siswa/absensi")}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 16px',
              background: '#fff',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              fontSize: '0.875rem',
              fontWeight: '600',
              color: '#374151',
              cursor: 'pointer',
              marginBottom: '16px'
            }}
          >
            <IconArrowLeft style={{ width: '20px', height: '20px' }} />
            Kembali
          </button>

          <h1 style={{ 
            margin: 0, 
            fontSize: '1.875rem', 
            fontWeight: '700',
            color: '#111827'
          }}>
            Clock In - Absensi Masuk
          </h1>
          <p style={{ 
            margin: '8px 0 0', 
            fontSize: '0.875rem',
            color: '#6b7280'
          }}>
            Ambil foto selfie untuk absensi masuk
          </p>
        </div>

        {/* Camera/Photo Card */}
        <div style={{
          background: '#fff',
          borderRadius: '16px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          overflow: 'hidden',
          marginBottom: '24px'
        }}>
          {/* Error Message */}
          {error && (
            <div style={{
              padding: '16px',
              background: '#fef2f2',
              borderBottom: '1px solid #fecaca',
              color: '#991b1b',
              fontSize: '0.875rem'
            }}>
              {error}
            </div>
          )}

          {/* Camera/Photo Display */}
          <div style={{ 
            position: 'relative',
            paddingTop: '56.25%', // 16:9 aspect ratio
            background: '#000'
          }}>
            {capturedPhoto ? (
              <img 
                src={capturedPhoto} 
                alt="Captured" 
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain'
                }}
              />
            ) : (
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transform: 'scaleX(-1)' // Mirror effect
                }}
              />
            )}
          </div>

          {/* Hidden canvas for capture */}
          <canvas ref={canvasRef} style={{ display: 'none' }} />

          {/* Action Buttons */}
          <div style={{ 
            padding: '24px',
            display: 'flex',
            gap: '12px',
            justifyContent: 'center'
          }}>
            {capturedPhoto ? (
              <>
                <button
                  onClick={retakePhoto}
                  disabled={uploading}
                  style={{
                    padding: '12px 24px',
                    background: '#fff',
                    color: '#374151',
                    border: '2px solid #e5e7eb',
                    borderRadius: '10px',
                    fontSize: '0.9375rem',
                    fontWeight: '600',
                    cursor: uploading ? 'not-allowed' : 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    opacity: uploading ? 0.5 : 1
                  }}
                >
                  <IconRotateCcw style={{ width: '20px', height: '20px' }} />
                  Ulangi
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={uploading}
                  style={{
                    padding: '12px 32px',
                    background: uploading ? '#9ca3af' : '#10b981',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '10px',
                    fontSize: '0.9375rem',
                    fontWeight: '600',
                    cursor: uploading ? 'not-allowed' : 'pointer',
                    boxShadow: '0 4px 6px -1px rgba(16, 185, 129, 0.3)'
                  }}
                >
                  {uploading ? 'Menyimpan...' : 'Konfirmasi Clock In'}
                </button>
              </>
            ) : (
              <button
                onClick={capturePhoto}
                disabled={!stream}
                style={{
                  padding: '12px 32px',
                  background: stream ? '#3b82f6' : '#9ca3af',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '10px',
                  fontSize: '0.9375rem',
                  fontWeight: '600',
                  cursor: stream ? 'pointer' : 'not-allowed',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  boxShadow: '0 4px 6px -1px rgba(59, 130, 246, 0.3)'
                }}
              >
                <IconCamera style={{ width: '20px', height: '20px' }} />
                Ambil Foto
              </button>
            )}
          </div>
        </div>

        {/* Info Card */}
        <div style={{
          background: '#eff6ff',
          border: '1px solid #dbeafe',
          borderRadius: '12px',
          padding: '16px',
          fontSize: '0.875rem',
          color: '#1e40af'
        }}>
          <strong>Tips:</strong> Pastikan wajah Anda terlihat jelas dan pencahayaan cukup
        </div>
      </div>
    </div>
  );
}
