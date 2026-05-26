"use client";

import { Bell, Search, User } from "lucide-react";
import { motion } from "framer-motion";

export function Header() {
  return (
    <header className="h-20 border-b border-border/50 flex items-center justify-between px-12 bg-background/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="flex items-center gap-4 text-muted-foreground">
        <Search className="w-4 h-4" />
        <input 
          type="text" 
          placeholder="SEARCH TALENT OR DATA..." 
          className="bg-transparent border-none text-[10px] uppercase tracking-[0.2em] font-bold focus:outline-none w-64 placeholder:text-muted-foreground/50"
        />
      </div>

      <div className="flex items-center gap-8">
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative text-muted-foreground hover:text-foreground transition-colors"
        >
          <Bell className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full" />
        </motion.button>

        <div className="flex items-center gap-4 group cursor-pointer">
          <div className="text-right">
            <p className="text-[10px] font-bold uppercase tracking-widest leading-none">Alexander Thorne</p>
            <p className="text-[8px] text-muted-foreground uppercase tracking-widest mt-1">Chief Talent Officer</p>
          </div>
          <div className="w-10 h-10 rounded-full border border-border/50 overflow-hidden bg-muted flex items-center justify-center transition-transform duration-500 group-hover:scale-110">
            <User className="w-6 h-6 text-muted-foreground" />
          </div>
        </div>
      </div>
    </header>
  );
}
