"use client";

import React from "react";
import { Search, Bell, User, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export function Header() {
  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-white/10 bg-black/20 px-8 backdrop-blur-xl">
      {/* Search Bar */}
      <div className="flex w-96 items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-muted-foreground focus-within:border-primary/50 focus-within:ring-1 focus-within:ring-primary/50 transition-all">
        <Search className="h-4 w-4" />
        <input
          type="text"
          placeholder="Search candidates, jobs..."
          className="w-full bg-transparent text-sm text-white outline-none placeholder:text-muted-foreground/50"
        />
      </div>

      {/* Actions */}
      <div className="flex items-center gap-6">
        <button className="relative rounded-xl border border-white/10 bg-white/5 p-2 text-muted-foreground hover:bg-white/10 hover:text-white transition-all">
          <Bell className="h-5 w-5" />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-primary shadow-[0_0_10px_rgba(79,70,229,0.5)]"></span>
        </button>

        <div className="flex items-center gap-3 border-l border-white/10 pl-6">
          <div className="flex flex-col items-end">
            <span className="text-sm font-semibold text-white">Alex Rivera</span>
            <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">HR Director</span>
          </div>
          <button className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary/80 to-primary border border-white/10 shadow-lg">
            <User className="h-5 w-5 text-white" />
          </button>
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        </div>
      </div>
    </header>
  );
}
