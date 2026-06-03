"use client";

import { Bell, Search, User, Command } from "lucide-react";
import { cn } from "@/lib/utils";

export function Header() {
  return (
    <header className="h-16 border-b border-white/10 bg-background/50 backdrop-blur-md flex items-center justify-between px-8 sticky top-0 z-50">
      <div className="flex items-center gap-4 w-1/3">
        <div className="relative group w-full max-w-sm">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-muted-foreground" />
          </div>
          <input
            type="text"
            className="w-full bg-white/5 border border-white/10 rounded-xl py-2 pl-10 pr-12 text-sm focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all hover:bg-white/10"
            placeholder="Search candidates, reports..."
          />
          <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
            <div className="flex items-center gap-1 bg-white/5 border border-white/10 rounded px-1.5 py-0.5 text-[10px] text-muted-foreground font-mono">
              <Command className="w-3 h-3" />
              <span>K</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <button className="relative group p-2 text-muted-foreground hover:text-white transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full border-2 border-background" />
        </button>
        
        <div className="h-8 w-px bg-white/10 mx-2" />

        <div className="flex items-center gap-3 group cursor-pointer">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-medium text-white group-hover:text-primary transition-colors">Alex Rivers</p>
            <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold font-mono">Lead Recruiter</p>
          </div>
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary/80 to-primary flex items-center justify-center border border-white/20 group-hover:scale-105 transition-transform">
            <User className="w-5 h-5 text-white" />
          </div>
        </div>
      </div>
    </header>
  );
}
