"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  Package, 
  BarChart3, 
  Users, 
  Settings, 
  Bell, 
  Search, 
  LogOut,
  ShoppingBag
} from "lucide-react";

const menuItems = [
  { icon: LayoutDashboard, label: "Overview", href: "/dashboard" },
  { icon: Package, label: "Inventory", href: "/inventory" },
  { icon: BarChart3, label: "Analytics", href: "/analytics" },
  { icon: Users, label: "VIP Clients", href: "#" },
  { icon: Settings, label: "Settings", href: "#" },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 border-r border-border bg-background flex flex-col h-screen sticky top-0">
      <div className="p-8 border-b border-border mb-8">
        <Link href="/" className="flex items-center gap-2">
          <ShoppingBag className="size-6" />
          <span className="font-serif text-xl font-bold tracking-tight">BOUTIQUE</span>
        </Link>
      </div>

      <nav className="flex-1 px-4 space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className={cn(
              "flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium transition-all",
              pathname === item.href 
                ? "bg-primary text-primary-foreground" 
                : "text-muted-foreground hover:bg-secondary hover:text-primary"
            )}
          >
            <item.icon className="size-5" />
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="p-4 mt-auto">
        <div className="bg-secondary/50 rounded-2xl p-4 mb-4">
          <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">Status</p>
          <div className="flex items-center gap-2">
            <div className="size-2 rounded-full bg-green-500 animate-pulse" />
            <p className="text-xs font-medium">Concierge Online</p>
          </div>
        </div>
        <Link 
          href="/login" 
          className="flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium text-red-500 hover:bg-red-50 transition-all"
        >
          <LogOut className="size-5" />
          Sair
        </Link>
      </div>
    </aside>
  );
}
