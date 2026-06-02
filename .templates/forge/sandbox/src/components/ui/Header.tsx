"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Bell, Search, User } from "lucide-react";
import { motion } from "framer-motion";

export function Header() {
  return (
    <header className="h-20 border-b border-border/50 bg-background/80 backdrop-blur-xl sticky top-0 z-50 flex items-center justify-between px-12">
      <div className="flex items-center gap-8 flex-1">
        <div className="relative max-w-md w-full group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground transition-colors group-focus-within:text-primary" />
          <input 
            type="text" 
            placeholder="Search assets, markets, or records..." 
            className="w-full bg-muted/30 border border-border/50 rounded-full py-2.5 pl-12 pr-4 text-xs font-sans tracking-wide focus:outline-none focus:border-primary/50 transition-all duration-500"
          />
        </div>
      </div>

      <div className="flex items-center gap-6">
        <button className="relative p-2 text-muted-foreground hover:text-foreground transition-colors duration-500">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-primary rounded-full" />
        </button>
        
        <div className="flex items-center gap-4 pl-6 border-l border-border/50">
          <div className="text-right">
            <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground">Premium Client</p>
            <p className="text-sm font-medium tracking-tight">Alexander Von Strauss</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center border border-border/50 overflow-hidden">
            <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
               <User className="w-5 h-5 text-primary" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
