import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-geist-sans" });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-geist-mono" });

export const metadata: Metadata = {
  title: "Forge Control Center",
  description: "Advanced UI Template Factory",
};

import { DashboardShell } from "@/components/layout/DashboardShell";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased bg-zinc-950 text-white relative`}>
        {/* Subtle Theme Light */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-500/5 blur-[150px] rounded-full pointer-events-none -z-10" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-orange-500/2 blur-[150px] rounded-full pointer-events-none -z-10" />

        <DashboardShell>
          {children}
        </DashboardShell>
      </body>
    </html>
  );
}
