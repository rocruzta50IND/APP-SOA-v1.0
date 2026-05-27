"use client";

import { Bell, Search, Command } from "lucide-react";
import { Button } from "./Button";
import { Input } from "./Input";

export function Header() {
  return (
    <header className="h-16 border-b border-border bg-background/50 backdrop-blur-sm sticky top-0 z-10 flex items-center justify-between px-8">
      <div className="flex items-center gap-4 w-full max-w-sm relative">
        <Search className="absolute left-3 w-4 h-4 text-muted-foreground" />
        <Input 
          placeholder="Search markets, assets..." 
          className="pl-9 h-9 bg-muted/50 border-none shadow-none focus-visible:ring-1"
        />
        <div className="absolute right-3 hidden md:flex items-center gap-1 text-[10px] font-medium text-muted-foreground bg-background border border-border px-1.5 py-0.5 rounded">
          <Command className="w-2.5 h-2.5" />
          <span>K</span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="relative p-2 text-muted-foreground hover:text-foreground transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full border-2 border-background" />
        </button>
        <div className="h-4 w-px bg-border mx-2" />
        <Button variant="outline" size="sm" className="h-9 px-4 text-xs font-bold uppercase tracking-widest">
          Connect Wallet
        </Button>
      </div>
    </header>
  );
}
