"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  Users, 
  UserSquare2, 
  CreditCard, 
  Settings,
  Activity,
  ChevronRight
} from "lucide-react";
import { motion } from "framer-motion";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Candidates", href: "/candidates", icon: UserSquare2 },
  { name: "Employees", href: "/employees", icon: Users },
  { name: "Payroll", href: "/payroll", icon: CreditCard },
  { name: "Settings", href: "/settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex h-full w-64 flex-col bg-background/50 backdrop-blur-xl border-r border-white/10">
      <div className="flex h-16 items-center px-6 gap-2 border-b border-white/10">
        <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shadow-[0_0_15px_rgba(79,70,229,0.4)]">
          <Activity className="w-5 h-5 text-white" />
        </div>
        <span className="text-lg font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
          TalentPulse
        </span>
      </div>
      
      <nav className="flex-1 space-y-1 px-4 py-6">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "group flex items-center justify-between px-3 py-2.5 text-sm font-medium rounded-xl transition-all duration-200 relative overflow-hidden",
                isActive 
                  ? "text-white bg-white/10" 
                  : "text-muted-foreground hover:text-white hover:bg-white/5"
              )}
            >
              <div className="flex items-center gap-3">
                <item.icon className={cn(
                  "w-5 h-5 transition-colors",
                  isActive ? "text-primary" : "text-muted-foreground group-hover:text-white"
                )} />
                {item.name}
              </div>
              {isActive && (
                <motion.div 
                  layoutId="active-pill"
                  className="absolute left-0 w-1 h-6 bg-primary rounded-r-full"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <ChevronRight className={cn(
                "w-4 h-4 opacity-0 transition-all",
                isActive ? "opacity-100 translate-x-0" : "group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0"
              )} />
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/10">
        <div className="bg-white/5 border border-white/10 rounded-2xl p-4 overflow-hidden relative group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 blur-2xl rounded-full -mr-12 -mt-12 transition-all group-hover:bg-primary/20" />
          <h4 className="text-xs font-bold uppercase tracking-widest text-primary mb-1">Enterprise Plan</h4>
          <p className="text-xs text-muted-foreground mb-3 font-mono">2,450 / 5,000 Slots</p>
          <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: "49%" }}
              className="bg-primary h-full"
              transition={{ duration: 1, ease: "easeOut" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
