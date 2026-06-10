"use client";

import { cn } from "@/lib/utils";
import { Search, Bell, Menu } from "lucide-react";

export function Header() {
  return (
    <header className="h-16 w-full border-b border-border bg-background flex items-center justify-between px-4 lg:px-6 sticky top-0 z-10">
      <div className="flex items-center gap-4">
        <button className="md:hidden p-2 text-muted-foreground hover:text-foreground transition-colors">
          <Menu className="w-5 h-5" />
        </button>
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 border border-border rounded-md bg-muted/30 focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 transition-all">
          <Search className="w-4 h-4 text-muted-foreground" />
          <input 
            type="text" 
            placeholder="Search tasks, boards..." 
            className="bg-transparent border-none outline-none text-sm w-64 text-foreground placeholder:text-muted-foreground"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button className="p-2 relative text-muted-foreground hover:text-foreground transition-all duration-300 ease-out hover:bg-muted rounded-md">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-foreground rounded-full border border-background"></span>
        </button>
        <button className={cn(
          "inline-flex items-center justify-center rounded-md text-sm font-medium transition-all duration-300 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          "bg-primary text-primary-foreground hover:opacity-90 h-9 px-4"
        )}>
          New Task
        </button>
      </div>
    </header>
  );
}
