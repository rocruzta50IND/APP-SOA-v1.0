"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { ShoppingBag } from "lucide-react";

export function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center gap-2">
            <ShoppingBag className="size-6 text-primary" />
            <span className="font-serif text-2xl font-bold tracking-tight">BOUTIQUE</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
            <Link href="#features" className="hover:text-primary transition-colors">Exclusividade</Link>
            <Link href="#analytics" className="hover:text-primary transition-colors">Analytics</Link>
            <Link href="#pricing" className="hover:text-primary transition-colors">Pricing</Link>
          </div>

          <div className="flex items-center gap-4">
            <Link 
              href="/login" 
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Entrar
            </Link>
            <Link 
              href="/login" 
              className="bg-primary text-primary-foreground px-5 py-2.5 rounded-full text-sm font-medium hover:opacity-90 transition-opacity"
            >
              Start Curating
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
