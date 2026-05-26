"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { Package2, Menu, X } from "lucide-react";
import { useState } from "react";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 border-b border-border/50 bg-background/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center gap-2">
            <Package2 className="size-6 text-primary" />
            <span className="text-xl font-bold tracking-tight">VeloceMarket Pro</span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Platform</Link>
            <Link href="/inventory" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Inventory</Link>
            <Link href="/orders" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Orders</Link>
            <Link href="/pricing" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Pricing</Link>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <ThemeToggle />
            <Link href="/login">
              <Button variant="ghost" size="sm">Sign In</Button>
            </Link>
            <Link href="/register">
              <Button size="sm">Get Started</Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-muted-foreground">
              {isOpen ? <X className="size-6" /> : <Menu className="size-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden border-t border-border bg-background py-4 px-4 space-y-4">
          <Link href="/" className="block text-base font-medium text-muted-foreground">Platform</Link>
          <Link href="/inventory" className="block text-base font-medium text-muted-foreground">Inventory</Link>
          <Link href="/orders" className="block text-base font-medium text-muted-foreground">Orders</Link>
          <Link href="/pricing" className="block text-base font-medium text-muted-foreground">Pricing</Link>
          <div className="pt-4 flex flex-col gap-2">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-muted-foreground">Appearance</span>
              <ThemeToggle />
            </div>
            <Link href="/login" className="w-full">
              <Button variant="ghost" className="w-full">Sign In</Button>
            </Link>
            <Link href="/register" className="w-full">
              <Button className="w-full">Get Started</Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}