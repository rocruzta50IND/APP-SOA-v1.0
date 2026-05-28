"use client";

import { Bell, Search, User } from "lucide-react";
import { cn } from "@/lib/utils";

export function Header() {
  return (
    <header className="fixed top-0 right-0 left-64 z-30 h-16 border-b border-white/10 bg-white/5 backdrop-blur-md">
      <div className="flex h-full items-center justify-between px-8">
        <div className="relative w-96">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search talent, documents, or reports..."
            className="h-10 w-full rounded-xl border border-white/10 bg-white/5 pl-10 pr-4 text-sm outline-none transition-all focus:border-primary/50 focus:ring-1 focus:ring-primary/50"
          />
        </div>

        <div className="flex items-center space-x-4">
          <button className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-muted-foreground transition-all hover:bg-white/10 hover:text-white">
            <Bell className="h-5 w-5" />
            <span className="absolute top-2.5 right-2.5 h-2 w-2 rounded-full bg-primary shadow-[0_0_10px_rgba(79,70,229,0.5)]" />
          </button>
          
          <div className="h-8 w-[1px] bg-white/10 mx-2" />

          <button className="flex items-center space-x-3 rounded-xl border border-white/10 bg-white/5 p-1.5 pr-3 transition-all hover:bg-white/10">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary/60">
              <User className="h-4 w-4 text-white" />
            </div>
            <div className="flex flex-col items-start">
              <span className="text-xs font-semibold text-white">Alex Rivera</span>
              <span className="text-[10px] text-muted-foreground">Admin</span>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
}
