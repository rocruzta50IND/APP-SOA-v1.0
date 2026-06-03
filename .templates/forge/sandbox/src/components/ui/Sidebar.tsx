"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  Users, 
  Briefcase, 
  CreditCard, 
  BarChart3, 
  Settings, 
  LogOut,
  Sparkles
} from "lucide-react";
import { motion } from "framer-motion";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Candidates", href: "/candidates", icon: Users },
  { name: "Employees", href: "/employees", icon: Briefcase },
  { name: "Payroll", href: "/payroll", icon: CreditCard },
  { name: "Analytics", href: "/analytics", icon: BarChart3 },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="hidden lg:flex h-full w-72 flex-col fixed inset-y-0 z-50 bg-background/50 backdrop-blur-xl border-r border-white/10">
      <div className="p-6 flex items-center gap-3">
        <div className="h-10 w-10 rounded-xl bg-primary flex items-center justify-center shadow-[0_0_20px_rgba(79,70,229,0.3)]">
          <Sparkles className="h-6 w-6 text-white" />
        </div>
        <span className="text-xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
          VividTalent
        </span>
      </div>

      <nav className="flex-1 px-4 space-y-2 mt-4">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group relative",
                isActive 
                  ? "text-white bg-white/10" 
                  : "text-muted-foreground hover:text-white hover:bg-white/5"
              )}
            >
              <item.icon className={cn(
                "h-5 w-5 transition-colors",
                isActive ? "text-primary" : "group-hover:text-primary"
              )} />
              <span className="font-medium">{item.name}</span>
              {isActive && (
                <motion.div
                  layoutId="active-nav"
                  className="absolute left-0 w-1 h-6 bg-primary rounded-r-full"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 mt-auto border-t border-white/10">
        <button className="flex items-center gap-3 px-4 py-3 w-full text-muted-foreground hover:text-white hover:bg-white/5 rounded-xl transition-all group">
          <Settings className="h-5 w-5 group-hover:text-primary transition-colors" />
          <span className="font-medium">Settings</span>
        </button>
        <Link href="/" className="flex items-center gap-3 px-4 py-3 w-full text-muted-foreground hover:text-red-400 hover:bg-red-400/10 rounded-xl transition-all group mt-2">
          <LogOut className="h-5 w-5 group-hover:text-red-400 transition-colors" />
          <span className="font-medium">Logout</span>
        </Link>
      </div>
    </div>
  );
}
