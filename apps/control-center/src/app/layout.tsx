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
import { ForgeProvider } from "@/context/ForgeContext";

import { ThemeGlows } from "@/components/layout/ThemeGlows";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased bg-zinc-950 text-white relative`}>
        <ThemeGlows />

        <ForgeProvider>
          <DashboardShell>
            {children}
          </DashboardShell>
        </ForgeProvider>
      </body>
    </html>
  );
}
