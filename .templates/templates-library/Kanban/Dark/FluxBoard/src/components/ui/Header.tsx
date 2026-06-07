"use client";

import { Bell, Search } from "lucide-react";

export function Header() {
  return (
    <header className="h-16 border-b border-border bg-background flex items-center justify-between px-6 sticky top-0 z-10 shrink-0">
      <div className="flex items-center gap-4 flex-1">
        <div className="relative w-full max-w-md">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input 
            type="text" 
            placeholder="Search boards, tasks..." 
            className="w-full h-9 pl-9 pr-4 rounded-md border border-border bg-muted/30 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
          />
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <button className="relative w-9 h-9 flex items-center justify-center rounded-md hover:bg-muted/50 transition-colors border border-transparent hover:border-border">
          <Bell className="w-4 h-4 text-muted-foreground" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-foreground rounded-full border border-background"></span>
        </button>
        <div className="h-8 w-8 rounded-md bg-muted border border-border flex items-center justify-center overflow-hidden">
          <span className="text-xs font-bold text-muted-foreground">JD</span>
        </div>
      </div>
    </header>
  );
}
