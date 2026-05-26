"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Bell, Search, User } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-white/10 bg-black/20 px-8 backdrop-blur-md">
      <div className="flex items-center gap-4">
        <div className="relative flex items-center group">
          <Search className="absolute left-3 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
          <input
            type="text"
            placeholder="Search everything..."
            className="h-10 w-64 rounded-xl border border-white/10 bg-white/5 pl-10 pr-4 text-sm outline-none ring-primary/20 transition-all focus:border-primary/50 focus:ring-4"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors">
          <Bell className="h-5 w-5 text-muted-foreground" />
          <span className="absolute right-3 top-3 flex h-2 w-2 rounded-full bg-primary" />
        </button>
        <div className="h-8 w-px bg-white/10 mx-2" />
        <div className="flex items-center gap-3 pl-2 cursor-pointer group">
          <div className="flex flex-col items-end">
            <span className="text-sm font-medium text-white group-hover:text-primary transition-colors">Alex Rivera</span>
            <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-mono">HR Director</span>
          </div>
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-gradient-to-br from-primary to-primary/50 shadow-lg">
            <User className="h-6 w-6 text-white" />
          </div>
        </div>
      </div>
    </header>
  );
}
