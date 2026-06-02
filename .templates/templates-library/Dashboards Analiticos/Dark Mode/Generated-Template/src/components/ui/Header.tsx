"use client";

import { motion } from "framer-motion";
import { Search, Bell, Command } from "lucide-react";
import { usePathname } from "next/navigation";

export function Header() {
  const pathname = usePathname();
  const title = pathname.split("/").pop() || "Overview";

  return (
    <header className="sticky top-0 z-30 flex h-20 w-full items-center justify-between border-b border-border/40 bg-background/80 px-12 backdrop-blur-md">
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="flex items-center gap-4"
      >
        <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-muted-foreground">
          System /
        </span>
        <h1 className="font-serif text-2xl capitalize tracking-tight">
          {title.replace("-", " ")}
        </h1>
      </motion.div>

      <div className="flex items-center gap-8">
        <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-secondary/50 border border-border/40 rounded-full group transition-all duration-500 hover:border-primary/30">
          <Search className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary transition-colors" />
          <input 
            type="text" 
            placeholder="SEARCH PARAMETERS..." 
            className="bg-transparent border-none outline-none text-[9px] uppercase tracking-widest font-bold placeholder:text-muted-foreground/60 w-40"
          />
          <div className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-background border border-border/60">
            <Command className="w-2 h-2 text-muted-foreground" />
            <span className="text-[8px] font-bold text-muted-foreground">K</span>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <button className="relative group">
            <Bell className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full border-2 border-background" />
          </button>
          
          <div className="h-4 w-[1px] bg-border/40" />
          
          <div className="flex items-center gap-3">
            <span className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground hidden lg:block">
              V0.9.2-BETA
            </span>
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          </div>
        </div>
      </div>
    </header>
  );
}
