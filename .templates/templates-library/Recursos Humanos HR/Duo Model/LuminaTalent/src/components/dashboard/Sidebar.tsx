"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  Users, 
  UserPlus, 
  Wallet, 
  BarChart3, 
  LogOut,
  Sparkles
} from "lucide-react";
import { motion } from "framer-motion";

const navItems = [
  { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { name: "Recruitment", href: "/recruitment", icon: UserPlus },
  { name: "Employees", href: "/employees", icon: Users },
  { name: "Payroll", href: "/payroll", icon: Wallet },
  { name: "Performance", href: "/performance", icon: BarChart3 },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 border-r border-border/50 h-screen sticky top-0 flex flex-col bg-background/50 backdrop-blur-sm">
      <div className="p-8">
        <Link href="/dashboard" className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-primary flex items-center justify-center rounded-sm transition-transform duration-500 group-hover:rotate-12">
            <Sparkles className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="font-serif text-xl tracking-tighter">Lumina</span>
        </Link>
      </div>

      <nav className="flex-1 px-4 py-8 space-y-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 text-[10px] uppercase tracking-[0.2em] font-bold transition-all duration-300 group",
                isActive 
                  ? "text-primary bg-primary/5" 
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              )}
            >
              <item.icon className={cn(
                "w-4 h-4 transition-colors duration-300",
                isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
              )} />
              <span>{item.name}</span>
              {isActive && (
                <motion.div
                  layoutId="active-nav"
                  className="ml-auto w-1 h-1 bg-primary rounded-full"
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                />
              )}
            </Link>
          );
        })}
      </nav>

      <div className="p-8 border-t border-border/50">
        <Link 
          href="/"
          className="flex items-center gap-3 text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground hover:text-destructive transition-colors duration-300"
        >
          <LogOut className="w-4 h-4" />
          <span>Exit System</span>
        </Link>
      </div>
    </div>
  );
}
