"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  Wallet, 
  BarChart3, 
  History, 
  Settings, 
  ChevronRight,
  TrendingUp
} from "lucide-react";

const navItems = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Portfolio", href: "/portfolio", icon: Wallet },
  { name: "Market Data", href: "/market-data", icon: BarChart3 },
  { name: "Transactions", href: "/transactions", icon: History },
  { name: "Settings", href: "/settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-border bg-background transition-transform lg:translate-x-0">
      <div className="flex h-full flex-col px-3 py-4">
        <Link href="/dashboard" className="mb-10 flex items-center gap-2 px-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary">
            <TrendingUp className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold tracking-tight">LuminaFlow</span>
        </Link>
        
        <nav className="flex-1 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "group flex items-center justify-between rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  isActive 
                    ? "bg-muted text-primary" 
                    : "text-muted-foreground hover:bg-muted/50 hover:text-primary"
                )}
              >
                <div className="flex items-center gap-3">
                  <item.icon className={cn("h-4 w-4", isActive ? "text-primary" : "text-muted-foreground group-hover:text-primary")} />
                  {item.name}
                </div>
                {isActive && <ChevronRight className="h-3 w-3" />}
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto border-t border-border pt-4 px-3">
          <div className="flex items-center gap-3 py-2">
            <div className="h-8 w-8 rounded-full bg-muted border border-border flex items-center justify-center font-bold text-xs">
              JD
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium">John Doe</span>
              <span className="text-xs text-muted-foreground">Pro Account</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
