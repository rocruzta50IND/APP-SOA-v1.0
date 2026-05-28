"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  Users, 
  UserPlus, 
  CreditCard, 
  Settings,
  Sparkles
} from "lucide-react";
import { motion } from "framer-motion";

const navItems = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Employees", href: "/employees", icon: Users },
  { name: "Recruitment", href: "/recruitment", icon: UserPlus },
  { name: "Payroll", href: "/payroll", icon: CreditCard },
  { name: "Settings", href: "/settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-white/10 bg-white/5 backdrop-blur-md transition-transform lg:translate-x-0">
      <div className="flex h-full flex-col px-4 py-6">
        <div className="mb-10 flex items-center px-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary shadow-[0_0_20px_rgba(79,70,229,0.3)]">
            <Sparkles className="h-6 w-6 text-white" />
          </div>
          <span className="ml-3 text-xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
            TalentAura
          </span>
        </div>
        
        <nav className="flex-1 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "group relative flex items-center rounded-xl px-3 py-2.5 text-sm font-medium transition-all hover:bg-white/10 hover:text-white",
                  isActive ? "bg-white/10 text-white" : "text-muted-foreground"
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute inset-0 rounded-xl bg-white/10"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <item.icon className={cn(
                  "mr-3 h-5 w-5 transition-colors",
                  isActive ? "text-primary" : "group-hover:text-primary"
                )} />
                <span className="relative z-10">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto pt-6">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-md">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Pro Plan</p>
            <p className="text-sm text-white/80 mb-4">Unlock advanced talent analytics and AI insights.</p>
            <button className="w-full bg-primary text-white hover:bg-primary/90 shadow-[0_0_20px_rgba(79,70,229,0.3)] rounded-xl px-4 py-2 text-sm font-medium transition-all">
              Upgrade Now
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}
