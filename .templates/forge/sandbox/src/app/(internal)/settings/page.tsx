"use client";

import React from "react";
import { 
  User, 
  Lock, 
  Bell, 
  Globe, 
  Shield, 
  CreditCard, 
  Code,
  Check,
  ChevronRight,
  Zap
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const sections = [
  { id: "profile", label: "Profile", icon: User, active: true },
  { id: "security", label: "Security", icon: Lock },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "api", label: "API Keys", icon: Code },
  { id: "billing", label: "Billing", icon: CreditCard },
  { id: "team", label: "Team", icon: Globe },
];

export default function SettingsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tighter text-white">Settings</h1>
        <p className="text-muted-foreground">Manage your account preferences and system configuration.</p>
      </div>

      <div className="grid gap-8 lg:grid-cols-4">
        {/* Sidebar Nav */}
        <div className="space-y-1">
          {sections.map((section) => (
            <button
              key={section.id}
              className={cn(
                "flex w-full items-center justify-between rounded-xl px-4 py-3 text-sm font-medium transition-all",
                section.active 
                  ? "bg-primary/10 text-primary border border-primary/20" 
                  : "text-muted-foreground hover:bg-white/5 hover:text-white"
              )}
            >
              <div className="flex items-center gap-3">
                <section.icon className="h-4 w-4" />
                {section.label}
              </div>
              {section.active && <ChevronRight className="h-4 w-4" />}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="lg:col-span-3 space-y-6">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl"
          >
            <h3 className="text-lg font-semibold text-white mb-6">Personal Information</h3>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Full Name</label>
                <input 
                  type="text" 
                  placeholder="Alex Rivera"
                  className="h-11 w-full rounded-xl border border-white/10 bg-black/20 px-4 text-sm text-white focus:border-primary/50 outline-none"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Email Address</label>
                <input 
                  type="email" 
                  placeholder="alex@quantix.io"
                  className="h-11 w-full rounded-xl border border-white/10 bg-black/20 px-4 text-sm text-white focus:border-primary/50 outline-none"
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Biography</label>
                <textarea 
                  placeholder="Lead Engineer at Quantix. Passionate about quality and automation."
                  rows={4}
                  className="w-full rounded-xl border border-white/10 bg-black/20 p-4 text-sm text-white focus:border-primary/50 outline-none resize-none"
                />
              </div>
            </div>
            
            <div className="mt-8 flex justify-end gap-3">
              <button className="px-6 py-2.5 rounded-xl border border-white/10 text-sm font-medium text-white hover:bg-white/10 transition-all">
                Cancel
              </button>
              <button className="px-6 py-2.5 rounded-xl bg-primary text-sm font-medium text-white shadow-[0_0_15px_rgba(79,70,229,0.3)] hover:bg-primary/90 transition-all">
                Save Changes
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl relative overflow-hidden"
          >
            <div className="flex items-center justify-between relative z-10">
               <div>
                  <h3 className="text-lg font-semibold text-white">Upgrade to Pro</h3>
                  <p className="text-sm text-muted-foreground mt-1">Get unlimited parallel runs and priority support.</p>
               </div>
               <button className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-white text-black text-sm font-bold hover:bg-white/90 transition-all">
                  <Zap className="h-4 w-4 fill-current" />
                  Go Pro
               </button>
            </div>
            <div className="absolute top-0 right-0 h-full w-1/3 bg-gradient-to-l from-primary/20 to-transparent pointer-events-none" />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
