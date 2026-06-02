"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { 
  LayoutDashboard, 
  Wallet, 
  ArrowLeftRight, 
  Lock, 
  Settings,
  Shield,
  LogOut
} from "lucide-react";

const menuItems = [
  { icon: LayoutDashboard, label: "Overview", href: "/dashboard" },
  { icon: Wallet, label: "Portfolio", href: "/portfolio" },
  { icon: ArrowLeftRight, label: "Exchange", href: "/exchange" },
  { icon: Lock, label: "Staking", href: "/staking" },
  { icon: Settings, label: "Settings", href: "/settings" },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 h-screen border-r border-border/50 bg-background flex flex-col sticky top-0">
      <div className="p-8">
        <div className="flex items-center gap-2 mb-12">
          <Shield className="w-8 h-8 text-primary" />
          <span className="font-serif text-2xl tracking-tighter uppercase">Kryptera</span>
        </div>

        <nav className="space-y-1">
          <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground mb-4">Management</p>
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link key={item.href} href={item.href}>
                <div className={cn(
                  "group flex items-center gap-3 px-4 py-3 text-sm font-medium transition-all duration-500 rounded-full relative overflow-hidden",
                  isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
                )}>
                  {isActive && (
                    <motion.div
                      layoutId="sidebar-active"
                      className="absolute inset-0 bg-primary/5 rounded-full"
                      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    />
                  )}
                  <item.icon className={cn("w-4 h-4 transition-colors duration-500", isActive ? "text-primary" : "group-hover:text-foreground")} />
                  <span className="relative z-10">{item.label}</span>
                </div>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="mt-auto p-8 border-t border-border/50">
        <Link href="/login">
          <div className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground transition-all duration-500 rounded-full hover:bg-muted/50">
            <LogOut className="w-4 h-4" />
            <span>Terminate Session</span>
          </div>
        </Link>
      </div>
    </div>
  );
}
