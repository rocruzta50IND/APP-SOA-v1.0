"use client";

import React from "react";
import { Bell, Search, User } from "lucide-react";
import { cn } from "@/lib/utils";

export function Header() {
  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-border bg-background/95 px-8 backdrop-blur">
      <div className="flex items-center gap-4">
        <div className="relative w-96">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search assets, transactions, market updates..."
            className="h-9 w-full rounded-md border border-border bg-muted/30 pl-10 pr-4 text-sm outline-none transition-colors focus:border-primary/50 focus:bg-background"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="relative flex h-9 w-9 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors hover:bg-muted hover:text-primary">
          <Bell className="h-4 w-4" />
          <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-primary" />
        </button>
        <div className="h-6 w-px bg-border mx-2" />
        <button className="flex items-center gap-2 rounded-md border border-border bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground transition-opacity hover:opacity-90">
          <User className="h-3.5 w-3.5" />
          Connect Wallet
        </button>
      </div>
    </header>
  );
}
