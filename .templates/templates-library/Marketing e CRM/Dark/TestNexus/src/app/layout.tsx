import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import { cn } from "@/lib/utils";
import "./globals.css";

const space = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "PeoplePulse | AI-Powered HR & Talent Intelligence",
  description: "The next generation of talent management. Optimize your workforce with predictive analytics and autonomous recruitment workflows.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased selection:bg-primary/30 selection:text-primary overflow-x-hidden",
          space.variable,
          mono.variable
        )}
      >
        {children}
      </body>
    </html>
  );
}
