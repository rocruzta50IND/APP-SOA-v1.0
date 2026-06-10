"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

const navLinks = [
  { name: "Portfolio", href: "#features" },
  { name: "Investment", href: "#pricing" },
  { name: "Philosophy", href: "#faq" },
];

export function PublicHeader() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/10 bg-background/5 backdrop-blur-xl">
      <nav className="container mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-foreground flex items-center justify-center">
            <span className="text-background font-serif font-bold text-xl">A</span>
          </div>
          <span className="font-serif text-xl font-bold tracking-tighter uppercase transition-colors group-hover:text-primary">
            Aethelgard
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-12">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-6">
          <Link
            href="/login"
            className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors hidden sm:block"
          >
            Access
          </Link>
          <Button variant="luxury" size="sm" asChild>
            <Link href="/register">Inquire</Link>
          </Button>
        </div>
      </nav>
    </header>
  );
}
