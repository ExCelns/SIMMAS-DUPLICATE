# 🎓 SIMMAS - Sistem Informasi Manajemen Magang Siswa

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-16.3.6-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Supabase](https://img.shields.io/badge/Supabase-Database-green?style=for-the-badge&logo=supabase)
![TailwindCSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?style=for-the-badge&logo=tailwind-css)

**Platform manajemen magang siswa SMK berbasis web dengan Next.js dan Supabase**

[Demo](#) · [Documentation](#fitur-utama) · [Installation](#instalasi)

</div>

---

## 📋 Deskripsi

SIMMAS adalah sistem informasi manajemen yang dirancang khusus untuk mengelola kegiatan magang/PKL siswa SMK. Sistem ini menyediakan dashboard terpisah untuk **Admin**, **Guru Pembimbing**, dan **Siswa** dengan fitur-fitur lengkap untuk monitoring, absensi, jurnal, dan pelaporan.

## ✨ Fitur Utama

### 👨‍💼 Admin Dashboard
- ✅ **Manajemen Master Data** - Kelola data siswa, guru, DUDI, dan jurusan
- 📊 **Monitoring Global** - Dashboard statistik real-time
- 📍 **Penempatan Magang** - Kelola penempatan siswa ke DUDI
- 📝 **Log Aktivitas** - Audit trail semua aktivitas sistem
- ⚙️ **Pengaturan Sistem** - Konfigurasi aplikasi

### 👨‍🏫 Guru Pembimbing Dashboard
- 👥 **Siswa Bimbingan** - Daftar siswa yang dibimbing
- 📖 **Verifikasi Jurnal** - Review dan validasi jurnal siswa
- 🏢 **Kunjungan DUDI** - Jadwal dan laporan kunjungan lapangan
- 📊 **Statistik Bimbingan** - Progress siswa bimbingan

### 👨‍🎓 Siswa Dashboard
- 📸 **Absensi Foto** - Clock in/out dengan camera capture
- 📓 **Jurnal Kegiatan** - Catat kegiatan harian magang
- 📋 **Pengajuan Magang** - Submit pengajuan tempat magang
- 👀 **Kunjungan Pembimbing** - Lihat jadwal kunjungan guru

## 🛠️ Tech Stack

- **Frontend Framework:** Next.js 16.3.6 (App Router)
- **Language:** TypeScript
- **Styling:** CSS Modules + Tailwind CSS
- **Database:** Supabase (PostgreSQL)
- **Storage:** Supabase Storage (untuk foto absensi)
- **Authentication:** Supabase Auth
- **Deployment:** Vercel (recommended)

## 🚀 Instalasi

### Prerequisites

- Node.js 18+ dan npm/yarn/pnpm
- Akun Supabase (gratis)
- Git

### 1. Clone Repository

\`\`\`bash
git clone https://github.com/yourusername/project-simmas.git
cd project-simmas
\`\`\`

### 2. Install Dependencies

\`\`\`bash
npm install
# atau
yarn install
# atau
pnpm install
\`\`\`

### 3. Setup Environment Variables

Buat file \`.env.local\` di root project:

\`\`\`env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
\`\`\`

**Cara mendapatkan credentials:**
1. Buka [Supabase Dashboard](https://app.supabase.com)
2. Pilih project Anda
3. Go to **Settings** → **API**
4. Copy **Project URL** dan **anon/public key**

### 4. Setup Database

Jalankan SQL schema di Supabase SQL Editor:

\`\`\`bash
# File schema ada di folder database/
# Jalankan secara berurutan:
1. database/schema.sql
2. database/seed-data.sql (optional, untuk data dummy)
\`\`\`

### 5. Setup Storage Bucket

Di Supabase Dashboard:
1. Go to **Storage**
2. Create new bucket: \`absensi-foto\`
3. Set bucket sebagai **public**
4. Set RLS policies (lihat \`database/storage-policies.sql\`)

### 6. Run Development Server

\`\`\`bash
npm run dev
\`\`\`

Buka [http://localhost:3000](http://localhost:3000) di browser.

## 📁 Struktur Project

\`\`\`
project-simmas/
├── app/
│   ├── admin/           # Admin dashboard pages
│   │   ├── dashboard/
│   │   ├── siswa/
│   │   ├── guru/
│   │   ├── dudi/
│   │   ├── jurusan/
│   │   ├── penempatan/
│   │   ├── monitoring/
│   │   ├── log/
│   │   └── pengaturan/
│   ├── guru/            # Guru dashboard pages
│   │   ├── dashboard/
│   │   ├── siswa/
│   │   ├── jurnal/
│   │   └── kunjungan/
│   ├── siswa/           # Siswa dashboard pages
│   │   ├── dashboard/
│   │   ├── absensi/
│   │   ├── jurnal/
│   │   ├── pengajuan/
│   │   └── kunjungan/
│   ├── components/      # Shared components
│   │   ├── Sidebar.tsx
│   │   ├── DashboardHeader.tsx
│   │   ├── GuruSidebar.tsx
│   │   └── SiswaSidebar.tsx
│   ├── login/
│   ├── logout/
│   └── globals.css
├── lib/
│   ├── supabase.ts      # Supabase client
│   └── auth.ts          # Auth utilities
├── hooks/
│   ├── useAuth.ts
│   └── usePageTitle.ts
├── database/            # SQL schemas
│   ├── schema.sql
│   ├── seed-data.sql
│   └── storage-policies.sql
├── public/
└── package.json
\`\`\`

## 🎨 Fitur UI/UX

- ✅ **Responsive Design** - Mobile, tablet, dan desktop friendly
- 🎨 **Modern UI** - Clean dan intuitive interface
- 🔍 **Search & Filter** - Quick search dengan keyboard shortcut (Cmd/Ctrl+K)
- 🔔 **Notifications** - Real-time notification system
- 📸 **Camera Capture** - Native browser camera untuk absensi foto
- 🌓 **Backdrop Blur** - Modal dengan blur effect
- ⌨️ **Keyboard Navigation** - Arrow keys, Enter, ESC support

## 🔐 Authentication & Authorization

### Role-Based Access Control (RBAC)

| Role | Access |
|------|--------|
| **Admin** | Full access ke semua fitur sistem |
| **Guru** | Access ke siswa bimbingan, jurnal, dan kunjungan |
| **Siswa** | Access ke absensi, jurnal, dan pengajuan |

### Login Credentials (Development)

\`\`\`
Admin:
Email: admin@simmas.sch.id
Password: admin123

Guru:
Email: guru@simmas.sch.id
Password: guru123

Siswa:
Email: siswa@simmas.sch.id
Password: siswa123
\`\`\`

## 📊 Database Schema

### Core Tables

- \`users\` - User authentication
- \`siswa\` - Data siswa
- \`guru\` - Data guru pembimbing
- \`dudi\` - Data tempat magang (DUDI)
- \`jurusan\` - Data jurusan/program keahlian
- \`absensi\` - Data absensi siswa
- \`jurnal\` - Jurnal kegiatan siswa
- \`penempatan\` - Penempatan siswa ke DUDI
- \`kunjungan\` - Kunjungan guru ke DUDI
- \`activity_log\` - Log aktivitas sistem

### Relationships

\`\`\`
users (1) ─┬─> (1) siswa
           ├─> (1) guru
           └─> (1) admin

siswa (n) ──> (1) jurusan
siswa (n) ──> (1) dudi (via penempatan)
siswa (n) ──> (1) guru (pembimbing)

absensi (n) ──> (1) siswa
jurnal (n) ──> (1) siswa
kunjungan (n) ──> (1) guru
kunjungan (n) ──> (1) dudi
\`\`\`

## 🔧 Development

### Scripts

\`\`\`bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
\`\`\`

### Code Style

- TypeScript strict mode enabled
- ESLint + Prettier configured
- Component naming: PascalCase
- File naming: kebab-case
- CSS Modules for component-specific styles

## 🚢 Deployment

### Deploy to Vercel (Recommended)

1. Push code ke GitHub
2. Import project di [Vercel](https://vercel.com)
3. Add environment variables
4. Deploy!

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/project-simmas)

### Environment Variables di Vercel

Tambahkan di **Settings** → **Environment Variables**:
- \`NEXT_PUBLIC_SUPABASE_URL\`
- \`NEXT_PUBLIC_SUPABASE_ANON_KEY\`

## 📝 API Routes

\`\`\`
GET    /api/jurusan              # Get all jurusan
POST   /api/jurusan              # Create jurusan
PUT    /api/jurusan              # Update jurusan
DELETE /api/jurusan?id={id}     # Delete jurusan

# Similar patterns for:
# /api/siswa, /api/guru, /api/dudi, /api/absensi, etc.
\`\`\`

## 🐛 Bug Reports & Feature Requests

Jika menemukan bug atau ingin request fitur baru, silakan buat [Issue](https://github.com/yourusername/project-simmas/issues) di GitHub.

## 📄 License

MIT License - lihat file [LICENSE](LICENSE) untuk detail.

## 👥 Contributors

- **Your Name** - Initial work - [@yourusername](https://github.com/yourusername)

## 🙏 Acknowledgments

- Next.js team untuk framework yang amazing
- Supabase untuk BaaS platform
- Vercel untuk hosting
- SMK yang menjadi inspirasi project ini

---

<div align="center">

**⭐ Star project ini jika bermanfaat! ⭐**

Made with ❤️ for Indonesian Vocational Education

</div>
