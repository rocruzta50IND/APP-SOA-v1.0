"use client";

import { Bell, Search, User, Menu } from "lucide-react";
import { cn } from "@/lib/utils";

export function Header() {
  return (
    <header className="h-16 border-b border-white/10 bg-background/50 backdrop-blur-xl sticky top-0 z-40 px-4 md:px-8 flex items-center justify-between">
      <div className="flex items-center gap-4 flex-1">
        <button className="lg:hidden p-2 text-muted-foreground hover:text-white">
          <Menu className="h-6 w-6" />
        </button>
        <div className="max-w-md w-full relative hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input 
            type="text" 
            placeholder="Search candidates, reports..."
            className="w-full bg-white/5 border border-white/10 rounded-xl py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="relative p-2 text-muted-foreground hover:text-white transition-colors">
          <Bell className="h-5 w-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full border-2 border-background" />
        </button>
        <div className="h-8 w-px bg-white/10 mx-2" />
        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-medium text-white">Rodrigo Forge</p>
            <p className="text-xs text-muted-foreground">Admin</p>
          </div>
          <div className="h-10 w-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden">
            <User className="h-6 w-6 text-muted-foreground" />
          </div>
        </div>
      </div>
    </header>
  );
}
