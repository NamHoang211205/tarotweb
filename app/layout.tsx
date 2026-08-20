import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tarot Luyện Tập",
  description: "Trang luyện tập xem bài Tarot cho bản thân",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="vi"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <header className="border-b border-border">
          <nav className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
            <Link href="/" className="font-semibold text-accent text-lg">
              ✦ Tarot Luyện Tập
            </Link>
            <div className="flex gap-4 text-sm">
              <Link href="/" className="hover:text-accent transition-colors">
                Trải Bài
              </Link>
              <Link href="/history" className="hover:text-accent transition-colors">
                Lịch Sử
              </Link>
            </div>
          </nav>
        </header>
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
