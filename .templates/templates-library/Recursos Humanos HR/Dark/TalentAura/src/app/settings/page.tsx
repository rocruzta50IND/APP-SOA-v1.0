"use client";

import { Sidebar } from "@/components/ui/Sidebar";
import { Header } from "@/components/ui/Header";
import { 
  Settings, 
  User, 
  Bell, 
  Shield, 
  CreditCard, 
  Globe, 
  Database,
  ChevronRight,
  LogOut,
  Moon,
  Zap
} from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const sections = [
  { 
    title: "Account", 
    items: [
      { name: "Profile Information", desc: "Manage your public profile and email address.", icon: User },
      { name: "Security & Password", desc: "Keep your account secure with 2FA and more.", icon: Shield },
      { name: "Notifications", desc: "Control how you receive alerts and updates.", icon: Bell },
    ]
  },
  { 
    title: "Workspace", 
    items: [
      { name: "General Settings", desc: "Manage workspace name, logo, and domain.", icon: Globe },
      { name: "Plans & Billing", desc: "View your current plan and payment history.", icon: CreditCard },
      { name: "Team Management", desc: "Invite members and manage their roles.", icon: Database },
    ]
  }
];

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Sidebar />
      <Header />
      
      <main className="pl-64 pt-16">
        <div className="p-8 max-w-5xl mx-auto space-y-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
              Settings
            </h1>
            <p className="text-muted-foreground mt-1">Manage your account preferences and workspace configuration.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Sidebar Navigation */}
            <div className="space-y-2">
              {[
                { label: "General", icon: Settings, active: true },
                { label: "Security", icon: Shield, active: false },
                { label: "Billing", icon: CreditCard, active: false },
                { label: "Integrations", icon: Zap, active: false },
              ].map((item) => (
                <button
                  key={item.label}
                  className={cn(
                    "w-full flex items-center space-x-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all border border-transparent",
                    item.active ? "bg-white/10 text-white border-white/10 shadow-sm" : "text-muted-foreground hover:bg-white/5 hover:text-white"
                  )}
                >
                  <item.icon className={cn("h-4 w-4", item.active ? "text-primary" : "text-muted-foreground")} />
                  <span>{item.label}</span>
                </button>
              ))}
              <div className="pt-4 mt-4 border-t border-white/5">
                <button className="w-full flex items-center space-x-3 px-4 py-2.5 rounded-xl text-sm font-medium text-rose-400 hover:bg-rose-500/10 transition-all">
                  <LogOut className="h-4 w-4" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>

            {/* Content Area */}
            <div className="md:col-span-2 space-y-8">
              {sections.map((section, idx) => (
                <motion.div 
                  key={section.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="space-y-4"
                >
                  <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-widest px-1">{section.title}</h3>
                  <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl overflow-hidden divide-y divide-white/5">
                    {section.items.map((item) => (
                      <button 
                        key={item.name} 
                        className="w-full flex items-center justify-between p-5 hover:bg-white/[0.03] transition-colors group text-left"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 group-hover:border-primary/20 transition-colors">
                            <item.icon className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-white">{item.name}</p>
                            <p className="text-xs text-muted-foreground">{item.desc}</p>
                          </div>
                        </div>
                        <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-white transition-all transform group-hover:translate-x-1" />
                      </button>
                    ))}
                  </div>
                </motion.div>
              ))}

              {/* Advanced Block */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="relative bg-gradient-to-br from-primary/20 to-primary/5 backdrop-blur-md border border-primary/20 rounded-3xl p-8 overflow-hidden group"
              >
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 blur-[80px] rounded-full -mr-32 -mt-32 transition-transform duration-700 group-hover:scale-110" />
                <div className="relative">
                  <h3 className="text-xl font-bold text-white tracking-tight flex items-center">
                    <Zap className="h-5 w-5 mr-2 text-primary" />
                    Developer API
                  </h3>
                  <p className="text-sm text-white/70 mt-2 mb-6 max-w-md">
                    Access your HR data programmatically with our high-performance REST API. 
                    Build custom integrations and extend TalentAura's capabilities.
                  </p>
                  <button className="bg-white text-black hover:bg-white/90 rounded-xl px-5 py-2.5 text-sm font-bold transition-all">
                    Generate API Key
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
