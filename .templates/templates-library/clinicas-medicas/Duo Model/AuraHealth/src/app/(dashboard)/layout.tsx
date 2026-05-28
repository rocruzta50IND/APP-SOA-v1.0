"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  DollarSign, 
  Pill, 
  Settings, 
  Bell, 
  Search,
  ChevronRight,
  Menu,
  X,
  User,
  LogOut
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

const navItems = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Pacientes", href: "/pacientes", icon: Users },
  { name: "Agenda", href: "/agenda", icon: Calendar },
  { name: "Finanças", href: "/financas", icon: DollarSign },
  { name: "Farmácia", href: "/farmacia", icon: Pill },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground flex overflow-hidden">
      {/* Sidebar - Desktop */}
      <aside className="hidden lg:flex flex-col w-64 border-r border-white/10 bg-black/20 backdrop-blur-xl shrink-0 h-screen sticky top-0">
        <div className="p-6">
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shadow-[0_0_20px_rgba(var(--primary),0.3)]">
              <span className="font-bold text-white text-lg">A</span>
            </div>
            <span className="text-xl font-bold tracking-tighter text-gradient">AuraHealth</span>
          </Link>
        </div>

        <nav className="flex-1 px-4 space-y-1 py-4">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link key={item.href} href={item.href}>
                <div className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-xl transition-all duration-300 group relative",
                  isActive ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
                )}>
                  <item.icon className={cn("w-5 h-5", isActive ? "text-primary" : "group-hover:text-foreground")} />
                  <span className="font-medium">{item.name}</span>
                  {isActive && (
                    <motion.div 
                      layoutId="active-pill"
                      className="absolute left-0 w-1 h-6 bg-primary rounded-full"
                    />
                  )}
                </div>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/10 space-y-4">
          <div className="flex items-center gap-3 p-2">
            <div className="w-10 h-10 rounded-full bg-white/10 border border-white/10 flex items-center justify-center overflow-hidden">
              <User className="w-6 h-6 text-muted-foreground" />
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-medium truncate">Dr. Ricardo Oliveira</p>
              <p className="text-xs text-muted-foreground truncate">Diretor Clínico</p>
            </div>
          </div>
          <Link href="/login">
            <Button variant="outline" className="w-full justify-start gap-2 border-white/5 bg-transparent hover:bg-red-500/10 hover:text-red-500 hover:border-red-500/20 transition-all duration-300">
              <LogOut className="w-4 h-4" />
              Sair
            </Button>
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Header */}
        <header className="h-16 border-b border-white/10 bg-black/20 backdrop-blur-md flex items-center justify-between px-6 shrink-0 z-10">
          <div className="flex items-center gap-4 lg:hidden">
            <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(true)}>
              <Menu className="w-6 h-6" />
            </Button>
            <Link href="/dashboard" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="font-bold text-white text-lg">A</span>
              </div>
            </Link>
          </div>

          <div className="hidden md:flex items-center relative w-96 max-w-full">
            <Search className="absolute left-3 w-4 h-4 text-muted-foreground" />
            <Input 
              placeholder="Buscar prontuários, exames..." 
              className="pl-10 bg-white/5 border-white/10 h-10 focus-visible:ring-primary/50"
            />
          </div>

          <div className="flex items-center gap-3">
            <Button variant="outline" size="icon" className="relative rounded-xl border-white/10 bg-white/5">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full border-2 border-background" />
            </Button>
            <div className="w-px h-6 bg-white/10 mx-2 hidden sm:block" />
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium">AuraHealth Clinic</p>
                <p className="text-xs text-primary font-mono tracking-tighter uppercase">Unidade Jardins</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary/60 p-[1px]">
                <div className="w-full h-full rounded-[11px] bg-background flex items-center justify-center">
                   <LayoutDashboard className="w-5 h-5 text-primary" />
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden p-6 relative">
          {/* Ambient Glows */}
          <div className="glow w-[500px] h-[500px] top-[-250px] right-[-100px] opacity-20" />
          <div className="glow w-[300px] h-[300px] bottom-[-150px] left-[-50px] opacity-10" />
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="max-w-7xl mx-auto"
          >
            {children}
          </motion.div>
        </main>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 lg:hidden"
            />
            <motion.div 
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 w-72 bg-background border-r border-white/10 z-50 lg:hidden flex flex-col"
            >
              <div className="p-6 flex items-center justify-between">
                <Link href="/dashboard" className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                    <span className="font-bold text-white text-lg">A</span>
                  </div>
                  <span className="text-xl font-bold tracking-tighter text-gradient">AuraHealth</span>
                </Link>
                <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(false)}>
                  <X className="w-6 h-6" />
                </Button>
              </div>
              <nav className="flex-1 px-4 space-y-1 py-4">
                {navItems.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link key={item.href} href={item.href} onClick={() => setIsMobileMenuOpen(false)}>
                      <div className={cn(
                        "flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-300",
                        isActive ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-white/5"
                      )}>
                        <item.icon className="w-5 h-5" />
                        <span className="font-medium text-lg">{item.name}</span>
                      </div>
                    </Link>
                  );
                })}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
