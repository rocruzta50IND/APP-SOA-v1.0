"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  Users, 
  Megaphone, 
  BarChart3, 
  Settings,
  ChevronRight,
  Zap
} from "lucide-react";
import { motion } from "framer-motion";

const navItems = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Contacts", href: "/contacts", icon: Users },
  { name: "Campaigns", href: "/campaigns", icon: Megaphone },
  { name: "Analytics", href: "/analytics", icon: BarChart3 },
  { name: "Settings", href: "/settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex h-full w-64 flex-col border-r bg-card/50 backdrop-blur-xl">
      <div className="flex h-16 items-center px-6">
        <Link href="/dashboard" className="flex items-center gap-2 font-bold text-xl tracking-tighter">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary shadow-[0_0_15px_rgba(79,70,229,0.4)]">
            <Zap className="h-5 w-5 text-primary-foreground fill-current" />
          </div>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/60">
            OmniNexus
          </span>
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto py-6 px-3">
        <nav className="space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "group relative flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition-all duration-200",
                  isActive 
                    ? "bg-primary/10 text-primary" 
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <item.icon className={cn(
                  "h-5 w-5 transition-colors",
                  isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
                )} />
                {item.name}
                {isActive && (
                  <motion.div
                    layoutId="active-nav"
                    className="absolute left-0 h-5 w-1 rounded-full bg-primary"
                    transition={{ type: "spring", stiffness: 400, damping: 30 } as const}
                  />
                )}
                <ChevronRight className={cn(
                  "ml-auto h-4 w-4 opacity-0 transition-all",
                  isActive ? "opacity-100" : "group-hover:translate-x-1 group-hover:opacity-100"
                )} />
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="p-4 border-t">
        <div className="rounded-2xl bg-gradient-to-br from-primary/20 via-primary/5 to-transparent p-4 border border-primary/10">
          <p className="text-xs font-semibold text-primary uppercase tracking-widest mb-2">Pro Plan</p>
          <p className="text-sm text-muted-foreground mb-3 leading-snug">Unlock advanced CRM analytics and AI campaigns.</p>
          <button className="w-full rounded-lg bg-primary px-3 py-2 text-xs font-bold text-white hover:bg-primary/90 transition-all shadow-[0_5px_15px_rgba(79,70,229,0.2)]">
            Upgrade Now
          </button>
        </div>
      </div>
    </div>
  );
}
