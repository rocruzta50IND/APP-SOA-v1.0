"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { 
  LayoutDashboard, 
  Wallet, 
  History, 
  ArrowLeftRight, 
  Settings, 
  Search, 
  Bell, 
  User,
  LogOut,
  ChevronRight,
  TrendingUp
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Portfolio", href: "/portfolio", icon: Wallet },
  { name: "Transactions", href: "/transactions", icon: History },
  { name: "Swap", href: "/swap", icon: ArrowLeftRight },
  { name: "Settings", href: "/settings", icon: Settings },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 z-50 w-64 border-r border-border bg-background/50 backdrop-blur-xl transition-all duration-300">
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-16 items-center px-6 border-b border-border/50">
            <Link href="/dashboard" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center bg-primary text-primary-foreground">
                <TrendingUp size={18} />
              </div>
              <span className="text-lg font-bold tracking-tight uppercase">Vortex</span>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 px-3 py-6">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "group flex items-center gap-3 px-3 py-2 text-sm font-medium transition-all duration-200",
                    isActive 
                      ? "bg-primary text-primary-foreground" 
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <item.icon className={cn("h-4 w-4 shrink-0", isActive ? "text-primary-foreground" : "group-hover:text-foreground")} />
                  {item.name}
                  {isActive && (
                    <motion.div 
                      layoutId="active-nav"
                      className="ml-auto h-1 w-1 rounded-full bg-primary-foreground"
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="border-t border-border/50 p-4">
            <div className="flex items-center gap-3 px-2 py-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-none bg-muted border border-border">
                <User size={16} />
              </div>
              <div className="flex flex-col overflow-hidden">
                <span className="truncate text-xs font-semibold uppercase tracking-wider">Enterprise Admin</span>
                <span className="truncate text-[10px] text-muted-foreground uppercase">Pro Account</span>
              </div>
            </div>
            <Link href="/" className="block mt-2">
              <Button variant="ghost" size="sm" className="w-full justify-start gap-2 text-muted-foreground hover:text-destructive">
                <LogOut size={14} />
                <span className="text-xs uppercase font-bold tracking-widest">Sign Out</span>
              </Button>
            </Link>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 pl-64">
        {/* Header */}
        <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-border/50 bg-background/80 px-8 backdrop-blur-md">
          <div className="flex items-center gap-4 flex-1 max-w-xl">
            <div className="relative w-full group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground transition-colors group-focus-within:text-primary" />
              <input 
                type="text" 
                placeholder="SEARCH ASSETS, TRANSACTIONS, OR REPORTS..."
                className="h-10 w-full bg-muted/50 border border-border px-10 text-[10px] uppercase tracking-widest focus:outline-none focus:ring-1 focus:ring-primary transition-all placeholder:text-muted-foreground/50"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" className="h-9 w-9 rounded-none border-border/50 relative">
              <Bell size={16} />
              <span className="absolute top-2 right-2 h-1.5 w-1.5 bg-primary" />
            </Button>
            <div className="h-4 w-[1px] bg-border mx-2" />
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-[10px] font-bold uppercase tracking-widest">Market Status</p>
                <p className="text-[10px] text-emerald-500 font-bold uppercase">Operational</p>
              </div>
              <Button variant="primary" size="sm" className="hidden lg:flex gap-2">
                <Wallet size={14} />
                <span className="text-[10px] uppercase font-bold tracking-widest">Connect Wallet</span>
              </Button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-8">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            {children}
          </motion.div>
        </div>
      </main>
    </div>
  );
}
