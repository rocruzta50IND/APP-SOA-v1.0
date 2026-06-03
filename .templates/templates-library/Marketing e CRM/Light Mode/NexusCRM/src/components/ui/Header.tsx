"use client";

import React from "react";
import { Search, Bell, User } from "lucide-react";

export function Header() {
  return (
    <header className="fixed top-0 right-0 z-30 flex h-16 w-[calc(100%-16rem)] items-center justify-between border-b border-white/10 bg-black/20 px-8 backdrop-blur-xl">
      {/* Search Bar */}
      <div className="relative w-96">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search leads, campaigns..."
          className="h-10 w-full rounded-xl border border-white/10 bg-white/5 pl-10 pr-4 text-sm text-white placeholder:text-muted-foreground focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all"
        />
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4">
        <button className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-muted-foreground transition-all hover:bg-white/10 hover:text-white">
          <Bell className="h-5 w-5" />
          <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-primary" />
        </button>
        
        <div className="h-8 w-px bg-white/10 mx-2" />

        <button className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-1.5 pr-3 transition-all hover:bg-white/10">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-indigo-600">
            <User className="h-4 w-4 text-white" />
          </div>
          <div className="flex flex-col items-start">
            <span className="text-xs font-semibold text-white">Rodrigo Forge</span>
            <span className="text-[10px] text-muted-foreground uppercase tracking-wider">Pro Plan</span>
          </div>
        </button>
      </div>
    </header>
  );
}
