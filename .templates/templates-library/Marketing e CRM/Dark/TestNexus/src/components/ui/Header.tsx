"use client";

import { Bell, Search, User } from "lucide-react";
import { Button } from "./Button";
import { Input } from "./Input";
import { cn } from "@/lib/utils";

export function Header() {
  return (
    <header className="flex h-14 items-center justify-between border-b border-border bg-background px-4 lg:px-6">
      <div className="flex items-center flex-1">
        <div className="relative w-full max-w-sm hidden sm:flex items-center">
          <Search className="absolute left-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search test runs, suites..."
            className="w-full bg-background pl-9 h-9"
          />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" className="h-8 w-8 px-0">
          <Bell className="h-4 w-4 text-muted-foreground" />
          <span className="sr-only">Notifications</span>
        </Button>
        <Button variant="ghost" size="sm" className="h-8 w-8 px-0 rounded-full border border-border bg-muted">
          <User className="h-4 w-4 text-muted-foreground" />
          <span className="sr-only">Profile</span>
        </Button>
      </div>
    </header>
  );
}
