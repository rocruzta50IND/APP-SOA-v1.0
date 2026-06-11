import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { cn } from "@/lib/utils";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "FlowSprint Marketing OS | Enterprise Lead Intelligence",
  description: "The next-generation Marketing Operating System for enterprise lead scoring and ROI tracking.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          inter.variable,
          mono.variable
        )}
      >
        {children}
      </body>
    </html>
  );
}
