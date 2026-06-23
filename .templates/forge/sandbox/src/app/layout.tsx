import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AppShell from "@/components/AppShell";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ProTask Kanban",
  description: "Modern Kanban Board for Task Management",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="antialiased h-full">
      <body className={`${inter.className} h-full bg-slate-50 dark:bg-slate-900`}>
        <AppShell>
          {children}
        </AppShell>
      </body>
    </html>
  );
}
