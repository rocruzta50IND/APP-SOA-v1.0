"use client";

import { Bell, Search, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

export function Header() {
  return (
    <header className="h-16 border-b border-white/10 bg-black/20 backdrop-blur-xl px-8 flex items-center justify-between">
      <div className="flex items-center gap-4 flex-1">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search across NexusMarket..." 
            className="pl-10 bg-white/5 border-white/10 focus:border-primary/50 transition-all rounded-xl"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="relative h-10 w-10 flex items-center justify-center rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all">
          <Bell className="h-4 w-4 text-white" />
          <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-primary" />
        </button>
        
        <div className="h-10 w-[1px] bg-white/10 mx-2" />

        <div className="flex items-center gap-3 pl-2">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-medium text-white">Rodrigo Forge</p>
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-bold">Administrator</p>
          </div>
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary to-indigo-600 flex items-center justify-center border border-white/20 shadow-lg">
            <User className="h-5 w-5 text-white" />
          </div>
        </div>
      </div>
    </header>
  );
}
