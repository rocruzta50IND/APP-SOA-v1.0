import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AuraHealth | Premium HealthTech",
  description: "Enterprise-grade medical management and clinic operations platform.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" style={{ colorScheme: 'dark' }}>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          inter.variable,
          mono.variable
        )}
      >
        <div className="relative min-h-screen flex flex-col">
          {/* Ambient Glows for Tier 2 Persona */}
          <div className="fixed top-0 left-1/4 w-[500px] h-[500px] bg-primary/10 blur-[120px] rounded-full -z-10 pointer-events-none" />
          <div className="fixed bottom-0 right-1/4 w-[400px] h-[400px] bg-primary/5 blur-[100px] rounded-full -z-10 pointer-events-none" />
          
          <main className="flex-1">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
