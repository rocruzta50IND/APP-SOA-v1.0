"use client";

import { Bell, Search, Command } from "lucide-react";
import { cn } from "@/lib/utils";

export function Header() {
  return (
    <header className="h-16 border-b border-white/10 bg-black/20 backdrop-blur-md flex items-center justify-between px-8 sticky top-0 z-50">
      <div className="flex items-center gap-4 w-1/3">
        <div className="relative group w-full max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
          <input 
            type="text" 
            placeholder="Search talent, reports, settings..." 
            className="w-full bg-white/5 border border-white/10 rounded-xl py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 px-1.5 py-0.5 rounded border border-white/10 bg-white/5 text-[10px] text-muted-foreground">
            <Command className="w-2.5 h-2.5" />
            <span>K</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="p-2 rounded-xl bg-white/5 border border-white/10 text-muted-foreground hover:text-white hover:bg-white/10 transition-all relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full border-2 border-background"></span>
        </button>
        <div className="h-8 w-px bg-white/10 mx-2"></div>
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-muted-foreground">Enterprise Plan</span>
          <button className={cn(
            "text-xs font-semibold bg-primary/10 text-primary border border-primary/20 px-3 py-1.5 rounded-lg hover:bg-primary/20 transition-all"
          )}>
            Upgrade
          </button>
        </div>
      </div>
    </header>
  );
}
