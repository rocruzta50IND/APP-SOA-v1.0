"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Building2, CreditCard, Users, Bell, Shield, Paintbrush } from "lucide-react";

const spring = { type: "spring", stiffness: 400, damping: 30 };

const tabs = [
  { id: "general", label: "General", icon: Building2 },
  { id: "team", label: "Team Members", icon: Users },
  { id: "billing", label: "Billing", icon: CreditCard },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "security", label: "Security", icon: Shield },
  { id: "appearance", label: "Appearance", icon: Paintbrush },
];

export default function SettingsPage() {
  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
          Settings
        </h1>
        <p className="text-sm text-muted-foreground mt-1">Manage your workspace preferences and billing.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Nav */}
        <nav className="w-full md:w-64 flex flex-col gap-1">
          {tabs.map((tab, i) => (
            <button
              key={tab.id}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all text-left",
                i === 0
                  ? "bg-white/10 text-white border border-white/10"
                  : "text-muted-foreground hover:bg-white/5 hover:text-white"
              )}
            >
              <tab.icon className={cn("w-4 h-4", i === 0 ? "text-primary" : "text-muted-foreground")} />
              {tab.label}
            </button>
          ))}
        </nav>

        {/* Content Area */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={spring}
          className="flex-1 space-y-6"
        >
          {/* Profile Card */}
          <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6 shadow-xl">
            <h3 className="text-lg font-semibold text-white mb-4">Workspace Profile</h3>
            <div className="space-y-4">
              <div className="grid gap-2">
                <label className="text-sm font-medium text-muted-foreground">Workspace Name</label>
                <input 
                  type="text" 
                  defaultValue="Acme Corp" 
                  className="w-full md:w-2/3 bg-black/20 border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                />
              </div>
              <div className="grid gap-2">
                <label className="text-sm font-medium text-muted-foreground">Support Email</label>
                <input 
                  type="email" 
                  defaultValue="support@acme.corp" 
                  className="w-full md:w-2/3 bg-black/20 border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                />
              </div>
              <div className="pt-4 flex justify-end md:justify-start">
                <button className="inline-flex items-center justify-center rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_0_20px_rgba(79,70,229,0.3)] h-10 px-6 text-sm font-medium transition-all">
                  Save Changes
                </button>
              </div>
            </div>
          </div>

          {/* Danger Zone */}
          <div className="rounded-2xl border border-rose-500/20 bg-rose-500/5 backdrop-blur-md p-6 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 -m-8 bg-rose-500/10 blur-[50px] w-32 h-32 rounded-full pointer-events-none" />
            <h3 className="text-lg font-semibold text-rose-400 mb-2">Danger Zone</h3>
            <p className="text-sm text-muted-foreground mb-4">Permanently delete this workspace and all of its data. This action cannot be undone.</p>
            <button className="inline-flex items-center justify-center rounded-xl bg-rose-500/20 text-rose-400 hover:bg-rose-500/30 border border-rose-500/30 h-10 px-6 text-sm font-medium transition-all">
              Delete Workspace
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
