"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  Coins, 
  ArrowLeftRight, 
  BarChart3, 
  Settings,
  Shield,
  CreditCard,
  LogOut
} from "lucide-react";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Assets", href: "/assets", icon: Coins },
  { name: "Exchange", href: "/exchange", icon: ArrowLeftRight },
  { name: "Analytics", href: "/analytics", icon: BarChart3 },
  { name: "Settings", href: "/settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex h-full w-64 flex-col bg-background border-r border-border">
      <div className="flex h-16 items-center px-6 border-b border-border">
        <Link href="/dashboard" className="flex items-center gap-2 font-bold tracking-tighter text-xl">
          <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
            <Shield className="w-5 h-5 text-primary-foreground" />
          </div>
          <span>AUREM</span>
        </Link>
      </div>
      
      <div className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
        <div className="px-2 mb-4">
          <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Menu</p>
        </div>
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors",
                isActive 
                  ? "bg-primary text-primary-foreground" 
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              )}
            >
              <item.icon className="w-4 h-4" />
              {item.name}
            </Link>
          );
        })}
      </div>

      <div className="p-4 border-t border-border space-y-1">
        <button className="flex w-full items-center gap-3 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors">
          <CreditCard className="w-4 h-4" />
          Billing
        </button>
        <Link href="/" className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-destructive hover:bg-destructive/10 rounded-md transition-colors">
          <LogOut className="w-4 h-4" />
          Sign out
        </Link>
      </div>
    </div>
  );
}
