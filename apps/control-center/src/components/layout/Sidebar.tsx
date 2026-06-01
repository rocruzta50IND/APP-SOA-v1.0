"use client";

import React, { useState } from "react";
import { 
  ChevronLeft, 
  ChevronRight, 
  Cpu, 
  Layout, 
  Zap, 
  History, 
  Settings,
  Plus,
  Terminal
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();

  const menuItems = [
    { name: "Forja", icon: Zap, href: "/" },
    { name: "Galeria", icon: Layout, href: "/gallery" },
    { name: "Histórico", icon: History, href: "/history" },
  ];

  return (
    <aside 
      className={cn(
        "h-screen bg-black border-r border-orange-500/10 flex flex-col transition-all duration-300 relative z-50 shadow-[4px_0_24px_rgba(0,0,0,0.5)]",
        isCollapsed ? "w-16" : "w-64"
      )}
    >
      {/* Brand */}
      <div className="p-4 flex items-center gap-3 h-16 border-b border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 to-transparent pointer-events-none" />
        <div className="bg-orange-500/10 p-2 rounded-lg shrink-0 border border-orange-500/20">
          <Cpu className="w-5 h-5 text-orange-500" />
        </div>
        {!isCollapsed && (
          <span className="font-bold text-sm tracking-tight truncate bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">Forge v7.5</span>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1 mt-4">
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all group relative overflow-hidden",
              pathname === item.href 
                ? "bg-orange-500/10 text-white border border-orange-500/20" 
                : "text-zinc-500 hover:text-zinc-200 hover:bg-white/5"
            )}
          >
            {pathname === item.href && (
              <motion.div 
                layoutId="activeSide"
                className="absolute left-0 w-1 h-4 bg-orange-500 rounded-r-full"
              />
            )}
            <item.icon className={cn(
              "w-5 h-5 shrink-0 transition-colors",
              pathname === item.href ? "text-orange-500 drop-shadow-[0_0_8px_rgba(245,158,11,0.5)]" : "group-hover:text-orange-400"
            )} />
            {!isCollapsed && <span className="text-sm font-bold tracking-tight">{item.name}</span>}
          </Link>
        ))}
      </nav>

      {/* Bottom Actions */}
      <div className="p-3 border-t border-white/5 space-y-1 bg-gradient-to-t from-orange-500/5 to-transparent">
        <button className={cn(
          "flex items-center gap-3 px-3 py-2 w-full text-zinc-500 hover:text-white hover:bg-white/5 rounded-lg transition-all",
          isCollapsed ? "justify-center" : ""
        )}>
          <Settings className="w-5 h-5 shrink-0" />
          {!isCollapsed && <span className="text-sm font-medium">Configurações</span>}
        </button>
        
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={cn(
            "flex items-center gap-3 px-3 py-2 w-full text-zinc-600 hover:text-white hover:bg-white/5 rounded-lg transition-all border-t border-white/5 mt-1",
            isCollapsed ? "justify-center" : ""
          )}
        >
          {isCollapsed ? (
            <ChevronRight className="w-5 h-5 shrink-0" />
          ) : (
            <>
              <ChevronLeft className="w-5 h-5 shrink-0" />
              <span className="text-xs font-bold uppercase tracking-widest">Recolher</span>
            </>
          )}
        </button>
      </div>
    </aside>
  );
}
