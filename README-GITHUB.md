# 🎓 SIMMAS - Sistem Informasi Manajemen Magang Siswa

Aplikasi web untuk mengelola program magang siswa SMK, dari pengajuan penempatan hingga monitoring harian.

## ✨ Features

### 👨‍💼 Admin
- ✅ Kelola data siswa, guru, dan DUDI
- ✅ Approve/reject pengajuan penempatan
- ✅ Monitoring absensi & jurnal real-time
- ✅ Dashboard statistik lengkap
- ✅ Kelola pengaturan sistem

### 👨‍🏫 Guru Pembimbing
- ✅ Monitor siswa bimbingan
- ✅ Validasi jurnal kegiatan siswa
- ✅ Lihat absensi siswa
- ✅ Jadwal kunjungan ke DUDI
- ✅ Dashboard siswa bimbingan

### 👨‍🎓 Siswa
- ✅ Absensi dengan foto & GPS
- ✅ Jurnal kegiatan harian
- ✅ Ajukan penempatan magang
- ✅ Notifikasi real-time
- ✅ Track progress magang

## 🛠️ Tech Stack

- **Frontend:** Next.js 15 + React 19
- **Backend:** Supabase (PostgreSQL + Auth + Storage)
- **Styling:** Tailwind CSS
- **Language:** TypeScript
- **Security:** Row Level Security (RLS)

## 📋 Prerequisites

- Node.js 18+ 
- npm atau yarn
- Akun Supabase (gratis)

## 🚀 Quick Start

### 1. Clone Repository

```bash
git clone https://github.com/yourusername/project-simmas.git
cd project-simmas
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Database

1. Buat project baru di [Supabase](https://supabase.com)
2. Buka SQL Editor
3. Jalankan script database secara berurutan:
   - `database/01-create-tables.sql`
   - `database/02-create-indexes.sql`
   - `database/03-create-functions-triggers.sql`
   - `database/04-create-views.sql`
   - `database/05-enable-rls.sql`
   - `database/06-create-policies-admin.sql`
   - `database/07-create-policies-guru.sql`
   - `database/08-create-policies-siswa.sql`
   - `database/09-create-storage.sql`
   - `database/10-seed-data.sql` (optional, untuk sample data)

📚 **Dokumentasi lengkap:** Lihat `database/README.md`

### 4. Setup Environment Variables

```bash
# Copy template
cp .env.example .env.local

# Edit .env.local dan isi dengan credentials dari Supabase
# Dashboard → Settings → API
```

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-public-key
```

### 5. Run Development Server

```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000)

## 🧪 Test Accounts

Setelah menjalankan seed data (`10-seed-data.sql`):

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@smkn1tasik.sch.id | admin123 |
| Guru | ahmad.yusuf@smkn1tasik.sch.id | guru123 |
| Siswa | adelia.putri@student.smkn1tasik.sch.id | siswa123 |

⚠️ **Ganti password setelah login pertama!**

## 📁 Project Structure

```
project-simmas/
├── app/                      # Next.js app directory
│   ├── admin/               # Admin pages
│   ├── guru/                # Guru pages
│   ├── siswa/               # Siswa pages
│   ├── components/          # Reusable components
│   └── hooks/               # Custom React hooks
│
├── lib/                     # Utility libraries
│   ├── supabase.ts         # Supabase client
│   └── auth.ts             # Auth helpers
│
├── database/                # Database scripts
│   ├── README.md           # Database documentation
│   ├── 01-create-tables.sql
│   ├── 02-create-indexes.sql
│   └── ... (10 files total)
│
├── public/                  # Static assets
├── .env.example            # Environment template
└── .env.local              # Your credentials (not committed)
```

## 🔒 Security

- ✅ Row Level Security (RLS) untuk semua tabel
- ✅ Policies terpisah untuk Admin, Guru, Siswa
- ✅ Storage policies untuk file upload
- ✅ Environment variables tidak ter-commit
- ✅ Password hashing dengan bcrypt

📖 **Detail security:** Lihat `SECURITY.md`

## 🗄️ Database Schema

### 11 Tabel Utama:
- **users** - Authentication & role
- **guru** - Data guru pembimbing
- **siswa** - Data siswa
- **dudi** - Dunia Usaha Dunia Industri
- **penempatan** - Penempatan siswa ke DUDI
- **absensi** - Absensi harian
- **jurnal** - Jurnal kegiatan
- **kunjungan** - Kunjungan guru
- **log_aktivitas** - System logs
- **pengaturan** - Config sistem
- **notifikasi** - User notifications

📊 **ERD & Detail:** Lihat `database/ERD.md`

## 🚢 Deployment

### Deploy ke Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Setup environment variables di Vercel Dashboard
# Settings → Environment Variables
# Tambahkan NEXT_PUBLIC_SUPABASE_URL & NEXT_PUBLIC_SUPABASE_ANON_KEY
```

### Deploy ke Netlify

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Deploy
netlify deploy

# Setup environment variables di Netlify Dashboard
```

## 📚 Documentation

- [Database Setup](database/README.md) - Panduan setup database lengkap
- [Quick Start Guide](database/QUICK-START.md) - Setup cepat 10 menit
- [ERD Diagram](database/ERD.md) - Struktur & relasi database
- [Security Guidelines](SECURITY.md) - Best practices keamanan

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

- **Developer:** Your Name
- **Institution:** SMK Negeri 1 Tasikmalaya

## 📞 Support

Jika ada pertanyaan atau issue:
- Open an issue di GitHub
- Email: your.email@example.com

---

**Made with ❤️ for Indonesian Vocational Education**
