"use client";

import { Bell, Search } from "lucide-react";

export function Header() {
  return (
    <header className="h-24 border-b border-border/50 bg-background flex items-center justify-between px-12 sticky top-0 z-10 shrink-0">
      <div className="flex items-center gap-4 flex-1">
        <div className="relative w-full max-w-lg">
          <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input 
            type="text" 
            placeholder="Search campaigns, leads or assets..." 
            className="w-full h-12 pl-12 pr-4 bg-transparent border border-border/50 text-sm font-sans tracking-wide text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 ease-out placeholder:text-muted-foreground/50"
          />
        </div>
      </div>
      
      <div className="flex items-center gap-6">
        <button className="relative w-12 h-12 flex items-center justify-center border border-border/50 hover:bg-muted/30 transition-all duration-300 ease-out active:scale-95">
          <Bell className="w-4 h-4 text-foreground" strokeWidth={1.5} />
          <span className="absolute top-3 right-3 w-2 h-2 bg-primary"></span>
        </button>
        <div className="h-12 w-12 bg-foreground border border-border/50 flex items-center justify-center cursor-pointer hover:opacity-90 transition-all duration-300 active:scale-95">
          <span className="text-xs font-bold font-sans text-background tracking-widest">JD</span>
        </div>
      </div>
    </header>
  );
}
