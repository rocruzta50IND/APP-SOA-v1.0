"use client";

import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  Wallet, 
  BarChart3, 
  Shield, 
  Settings, 
  Bell, 
  Search, 
  LogOut,
  ChevronRight,
  TrendingUp,
  Cpu,
  History
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function DashboardSidebar() {
  const pathname = usePathname();
  
  const menuItems = [
    { icon: LayoutDashboard, label: "Overview", href: "/dashboard", active: true },
    { icon: Wallet, label: "Vaults", href: "#" },
    { icon: TrendingUp, label: "Execution", href: "#" },
    { icon: BarChart3, label: "Analytics", href: "#" },
    { icon: Cpu, label: "Node Cluster", href: "#" },
    { icon: History, label: "Activity Log", href: "#" },
    { icon: Shield, label: "Security", href: "#" },
    { icon: Settings, label: "Settings", href: "#" },
  ];

  return (
    <aside className="hidden lg:flex flex-col w-64 border-r border-border bg-card/50 backdrop-blur-xl h-screen sticky top-0">
      <div className="p-6">
        <Link href="/" className="flex items-center gap-2 mb-8">
          <Shield className="size-6 text-primary" />
          <span className="text-xl font-bold tracking-tight">CryptoNexis</span>
        </Link>
        
        <nav className="space-y-1">
          {menuItems.map((item) => (
            <Link 
              key={item.label}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all group",
                item.active 
                  ? "bg-primary text-primary-foreground" 
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <item.icon className="size-4" />
              {item.label}
              {item.active && <ChevronRight className="size-4 ml-auto" />}
            </Link>
          ))}
        </nav>
      </div>

      <div className="mt-auto p-6 border-t border-border">
        <div className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground cursor-pointer transition-all">
          <LogOut className="size-4" />
          Sign Out
        </div>
      </div>
    </aside>
  );
}

export function DashboardHeader() {
  return (
    <header className="h-16 border-b border-border bg-background/50 backdrop-blur-md flex items-center justify-between px-6 sticky top-0 z-40">
      <div className="flex items-center gap-4 flex-1">
        <div className="relative max-w-md w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <input 
            type="text" 
            placeholder="Search vault, tx id, or address..." 
            className="w-full h-10 pl-10 pr-4 rounded-lg bg-muted/50 border border-border/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="relative size-10 flex items-center justify-center rounded-lg border border-border hover:bg-muted transition-all">
          <Bell className="size-5 text-muted-foreground" />
          <span className="absolute top-2 right-2 size-2 bg-red-500 rounded-full border-2 border-background" />
        </button>
        
        <div className="h-10 w-[1px] bg-border mx-2" />
        
        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <p className="text-xs font-bold">Alex Thorne</p>
            <p className="text-[10px] text-muted-foreground">Admin Access</p>
          </div>
          <div className="size-10 rounded-lg bg-gradient-to-br from-primary to-primary/40 border border-white/10" />
        </div>
      </div>
    </header>
  );
}
