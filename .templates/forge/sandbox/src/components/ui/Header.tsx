"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { 
  Search, 
  Bell, 
  User,
  Plus,
  HelpCircle
} from "lucide-react";

export function Header() {
  return (
    <header className="flex h-16 items-center justify-between border-b bg-card/50 backdrop-blur-xl px-8 sticky top-0 z-10">
      <div className="flex items-center gap-4 flex-1">
        <div className="relative max-w-md w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input 
            type="text" 
            placeholder="Search campaigns, contacts, or analytics..." 
            className="w-full rounded-xl bg-muted/50 border-none pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-primary/20 transition-all outline-none"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button className="flex h-9 w-9 items-center justify-center rounded-xl bg-muted/50 hover:bg-muted text-muted-foreground hover:text-foreground transition-all">
          <Plus className="h-5 w-5" />
        </button>
        <button className="flex h-9 w-9 items-center justify-center rounded-xl bg-muted/50 hover:bg-muted text-muted-foreground hover:text-foreground transition-all relative">
          <Bell className="h-5 w-5" />
          <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-primary" />
        </button>
        <button className="flex h-9 w-9 items-center justify-center rounded-xl bg-muted/50 hover:bg-muted text-muted-foreground hover:text-foreground transition-all">
          <HelpCircle className="h-5 w-5" />
        </button>
        
        <div className="h-8 w-[1px] bg-border mx-2" />
        
        <button className="flex items-center gap-3 pl-2 group">
          <div className="text-right">
            <p className="text-sm font-bold leading-none group-hover:text-primary transition-colors">Alex Rivera</p>
            <p className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground mt-1">Growth Lead</p>
          </div>
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary to-blue-600 p-[2px]">
            <div className="h-full w-full rounded-[10px] bg-background flex items-center justify-center">
              <User className="h-5 w-5 text-primary" />
            </div>
          </div>
        </button>
      </div>
    </header>
  );
}
