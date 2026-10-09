import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Masuk | SIMMAS",
  description:
    "Platform terpusat pengelolaan magang SMK. Mudah, modern, dan efisien untuk Siswa, Guru, dan Admin.",
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return children;
}
