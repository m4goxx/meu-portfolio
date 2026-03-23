import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/Navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Murilo | Freelancer Developer",
  description: "Portfólio de Murilo, desenvolvedor freelancer especializado em bots e automação.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-[#030712] text-slate-100 selection:bg-blue-500/30 bg-grid">
        <main className="max-w-4xl mx-auto px-6 pt-12 pb-48">
          {children}
        </main>
        <Navigation />
      </body>
    </html>
  );
}
