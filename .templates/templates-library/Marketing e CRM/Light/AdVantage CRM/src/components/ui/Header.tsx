"use client";

import { Bell, Search, User } from "lucide-react";

export function Header() {
  return (
    <header className="fixed top-0 right-0 left-0 md:left-64 h-16 border-b border-border/50 bg-white/80 backdrop-blur-md z-40 flex items-center justify-between px-8">
      <div className="flex items-center gap-4 flex-1">
        <div className="relative w-full max-w-md hidden sm:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search campaigns, contacts..."
            className="w-full bg-muted/50 border border-border/50 rounded-md py-1.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-black transition-all"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="p-2 text-muted-foreground hover:text-foreground transition-colors relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-black rounded-full border-2 border-white"></span>
        </button>
        <div className="h-8 w-8 rounded-full bg-muted border border-border/50 flex items-center justify-center overflow-hidden">
          <User className="w-5 h-5 text-muted-foreground" />
        </div>
      </div>
    </header>
  );
}
