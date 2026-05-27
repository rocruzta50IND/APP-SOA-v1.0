"use client";

import { Bell, Search, User } from "lucide-react";
import { cn } from "@/lib/utils";

interface HeaderProps {
  title: string;
}

export function Header({ title }: HeaderProps) {
  return (
    <header className="flex h-16 items-center justify-between border-b border-border bg-background px-8">
      <div className="flex items-center gap-4">
        <h1 className="text-lg font-semibold tracking-tight">{title}</h1>
      </div>
      <div className="flex items-center gap-4">
        <div className="relative hidden md:block">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <input
            type="search"
            placeholder="Search..."
            className="h-9 w-64 rounded-md border border-border bg-muted/50 pl-9 pr-4 text-xs focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
        <button className="relative rounded-md border border-border p-2 hover:bg-muted transition-colors">
          <Bell className="h-4 w-4 text-foreground" />
          <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-primary" />
        </button>
        <button className="rounded-md border border-border p-2 hover:bg-muted transition-colors">
          <User className="h-4 w-4 text-foreground" />
        </button>
      </div>
    </header>
  );
}
