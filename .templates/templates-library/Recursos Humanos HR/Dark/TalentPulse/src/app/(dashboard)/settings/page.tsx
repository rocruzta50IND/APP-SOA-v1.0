"use client";

import { cn } from "@/lib/utils";
import { 
  User, 
  Bell, 
  Lock, 
  Globe, 
  Database,
  Shield,
  CreditCard,
  ChevronRight
} from "lucide-react";
import { motion } from "framer-motion";

const sections = [
  { name: "General Profile", icon: User, description: "Manage your personal information and public profile." },
  { name: "Notifications", icon: Bell, description: "Configure how and when you receive alerts." },
  { name: "Security", icon: Lock, description: "Update your password and enable two-factor auth." },
  { name: "Integrations", icon: Globe, description: "Connect with Slack, Jira, and other tools." },
  { name: "Billing", icon: CreditCard, description: "Manage your subscription and payment methods." },
  { name: "Advanced", icon: Database, description: "API access, webhooks, and data export." },
];

export default function SettingsPage() {
  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tighter text-white">Settings</h1>
        <p className="text-muted-foreground mt-1">Configure your account and platform preferences.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1 space-y-1">
          {sections.map((section, i) => (
            <button
              key={section.name}
              className={cn(
                "w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all group",
                i === 0 ? "bg-white/10 text-white" : "text-muted-foreground hover:bg-white/5 hover:text-white"
              )}
            >
              <div className="flex items-center gap-3">
                <section.icon className={cn("w-4 h-4", i === 0 ? "text-primary" : "group-hover:text-primary")} />
                <span className="text-sm font-medium">{section.name}</span>
              </div>
              <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
            </button>
          ))}
        </div>

        <div className="md:col-span-2 space-y-6">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8"
          >
            <h3 className="text-xl font-bold text-white mb-6">General Profile</h3>
            
            <div className="space-y-6">
              <div className="flex items-center gap-6 pb-6 border-b border-white/5">
                <div className="w-20 h-20 rounded-2xl bg-primary/20 border-2 border-dashed border-primary/40 flex items-center justify-center">
                  <User className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <button className="bg-primary text-white text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-lg hover:bg-primary/90 transition-all">
                    Upload Photo
                  </button>
                  <p className="text-[10px] text-muted-foreground mt-2 uppercase tracking-widest font-mono">JPG, PNG or WEBP. Max 2MB.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Full Name</label>
                  <input 
                    type="text" 
                    placeholder="Alex Rivers" 
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-2 px-4 text-sm focus:outline-none focus:ring-1 focus:ring-primary/50"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Email Address</label>
                  <input 
                    type="email" 
                    placeholder="alex.r@talentpulse.com" 
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-2 px-4 text-sm focus:outline-none focus:ring-1 focus:ring-primary/50"
                  />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Professional Bio</label>
                  <textarea 
                    rows={4}
                    placeholder="Lead Recruiter with over 10 years of experience in talent acquisition..." 
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-2 px-4 text-sm focus:outline-none focus:ring-1 focus:ring-primary/50 resize-none"
                  />
                </div>
              </div>

              <div className="pt-6 border-t border-white/5 flex justify-end">
                <button className="bg-primary text-white rounded-xl px-6 py-2.5 text-sm font-medium hover:bg-primary/90 shadow-[0_0_20px_rgba(79,70,229,0.3)] transition-all">
                  Save Changes
                </button>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8"
          >
            <div className="flex items-center gap-2 mb-6 text-emerald-500">
              <Shield className="w-5 h-5" />
              <h3 className="text-lg font-bold">Platform Security</h3>
            </div>
            
            <div className="flex items-center justify-between py-4 border-b border-white/5">
              <div>
                <p className="text-sm font-medium text-white">Two-Factor Authentication</p>
                <p className="text-xs text-muted-foreground">Add an extra layer of security to your account.</p>
              </div>
              <div className="w-10 h-5 bg-primary rounded-full relative cursor-pointer">
                <div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full" />
              </div>
            </div>

            <div className="flex items-center justify-between py-4">
              <div>
                <p className="text-sm font-medium text-white">Session Management</p>
                <p className="text-xs text-muted-foreground">Automatically log out after 30 minutes of inactivity.</p>
              </div>
              <div className="w-10 h-5 bg-white/10 rounded-full relative cursor-pointer">
                <div className="absolute left-1 top-1 w-3 h-3 bg-white/40 rounded-full" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
