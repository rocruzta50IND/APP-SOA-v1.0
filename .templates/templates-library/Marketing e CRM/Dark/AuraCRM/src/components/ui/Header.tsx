"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Search, Bell, Command, Sun } from "lucide-react";
import { Button } from "./Button";

export function Header() {
  return (
    <header className="flex h-16 items-center justify-between border-b border-white/10 bg-black/20 px-8 backdrop-blur-xl">
      <div className="flex items-center gap-4">
        <div className="relative flex items-center">
          <Search className="absolute left-3 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search records, campaigns..."
            className="h-10 w-80 rounded-xl border border-white/10 bg-white/5 pl-10 pr-4 text-sm text-white placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all"
          />
          <div className="absolute right-3 hidden items-center gap-1 sm:flex">
            <kbd className="pointer-events-none flex h-5 select-none items-center gap-1 rounded border border-white/20 bg-white/5 px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
              <span className="text-xs">⌘</span>K
            </kbd>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Button variant="outline" size="icon" className="h-9 w-9 rounded-lg">
          <Sun className="h-4 w-4 text-muted-foreground" />
        </Button>
        <Button variant="outline" size="icon" className="h-9 w-9 rounded-lg relative">
          <Bell className="h-4 w-4 text-muted-foreground" />
          <span className="absolute right-2 top-2 flex h-2 w-2 rounded-full bg-primary" />
        </Button>
        <div className="h-8 w-px bg-white/10 mx-2" />
        <Button className="h-9 gap-2 text-xs font-semibold uppercase tracking-wider">
          <Command className="h-3.5 w-3.5" />
          Quick Action
        </Button>
      </div>
    </header>
  );
}
