"use client";

import React from "react";
import { Search, Bell, HelpCircle, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export function Header() {
  return (
    <header className="flex h-16 items-center justify-between border-b border-white/10 bg-black/20 px-8 backdrop-blur-md">
      <div className="flex items-center gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search resources, tests or logs..."
            className="h-10 w-80 rounded-xl border border-white/10 bg-white/5 pl-10 pr-4 text-sm text-white placeholder:text-muted-foreground focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="flex h-10 items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 text-sm font-medium text-white hover:bg-white/10 transition-all">
          <HelpCircle className="h-4 w-4" />
          Docs
        </button>
        
        <div className="h-8 w-[1px] bg-white/10" />
        
        <button className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-muted-foreground hover:bg-white/10 hover:text-white transition-all">
          <Bell className="h-5 w-5" />
          <span className="absolute right-2.5 top-2.5 flex h-2 w-2 rounded-full bg-primary" />
        </button>

        <button className="flex h-10 items-center gap-2 rounded-xl bg-primary px-4 text-sm font-medium text-white shadow-[0_0_15px_rgba(79,70,229,0.3)] hover:bg-primary/90 transition-all">
          <Plus className="h-4 w-4" />
          New Test
        </button>
      </div>
    </header>
  );
}
