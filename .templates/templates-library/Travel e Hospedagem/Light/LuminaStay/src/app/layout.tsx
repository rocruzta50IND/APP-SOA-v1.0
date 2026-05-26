import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LuminaStay | Premium Travel Experience",
  description: "High-performance hospitality management for enterprise B2B and high-ticket B2C.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={cn(inter.className, "antialiased selection:bg-primary selection:text-primary-foreground")}>
        {children}
      </body>
    </html>
  );
}
