"use client";

import React from "react";
import { Bell, Search, User } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center border-b border-white/5 bg-background/50 backdrop-blur-md px-8">
      <div className="flex w-full items-center justify-between">
        {/* Search */}
        <div className="relative w-96 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search everything..."
            className="h-10 w-full rounded-xl border border-white/10 bg-white/5 pl-10 pr-4 text-sm outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
          />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <button className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all">
            <Bell className="h-5 w-5 text-muted-foreground" />
            <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-primary" />
          </button>
          
          <div className="flex items-center gap-3 pl-2">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium text-white">Rodrigo Forge</p>
              <p className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">Pro Member</p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-gradient-to-br from-primary/20 to-primary/5 p-0.5">
              <div className="flex h-full w-full items-center justify-center rounded-lg bg-background">
                <User className="h-5 w-5 text-primary" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
