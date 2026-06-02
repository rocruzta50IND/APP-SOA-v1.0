"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { 
  User, 
  Lock, 
  Bell, 
  Globe, 
  Zap, 
  Key, 
  ShieldCheck,
  CreditCard,
  LogOut
} from "lucide-react";

const tabs = [
  { id: "profile", name: "Profile", icon: User },
  { id: "workspace", name: "Workspace", icon: Globe },
  { id: "notifications", name: "Notifications", icon: Bell },
  { id: "security", name: "Security", icon: ShieldCheck },
  { id: "api", name: "API Keys", icon: Key },
  { id: "billing", name: "Billing", icon: CreditCard },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = React.useState("profile");

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-black tracking-tighter">System Configuration</h1>
        <p className="text-muted-foreground mt-1">Manage your account, workspace, and orchestration preferences.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Tabs */}
        <aside className="w-full md:w-64 space-y-1">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all",
                  isActive 
                    ? "bg-primary text-white shadow-lg shadow-primary/20" 
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <tab.icon className="h-4 w-4" />
                {tab.name}
              </button>
            );
          })}
          <div className="pt-4 mt-4 border-t border-border/50">
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-rose-500 hover:bg-rose-500/10 transition-all">
              <LogOut className="h-4 w-4" />
              Sign Out
            </button>
          </div>
        </aside>

        {/* Settings Content */}
        <div className="flex-1 space-y-6">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-card/50 backdrop-blur-xl border border-border rounded-3xl p-8"
          >
            {activeTab === "profile" && (
              <div className="space-y-8">
                <div className="flex items-center gap-6 pb-8 border-b border-border/50">
                  <div className="h-20 w-20 rounded-3xl bg-gradient-to-br from-primary to-blue-600 p-[3px]">
                    <div className="h-full w-full rounded-[21px] bg-background flex items-center justify-center text-primary text-2xl font-black">
                      AR
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Profile Information</h3>
                    <p className="text-sm text-muted-foreground">Update your photo and personal details.</p>
                    <div className="flex gap-2 mt-3">
                      <button className="px-4 py-1.5 rounded-lg bg-primary text-white text-xs font-bold hover:bg-primary/90 transition-all">Change Avatar</button>
                      <button className="px-4 py-1.5 rounded-lg border text-xs font-bold hover:bg-muted transition-all">Remove</button>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-black text-muted-foreground">Full Name</label>
                    <input type="text" placeholder="Alex Rivera" className="w-full bg-background border rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary/20 transition-all outline-none" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-black text-muted-foreground">Email Address</label>
                    <input type="email" placeholder="alex@omninexus.ai" className="w-full bg-background border rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary/20 transition-all outline-none" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-black text-muted-foreground">Role</label>
                    <input type="text" placeholder="Growth Lead" className="w-full bg-background border rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary/20 transition-all outline-none" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-black text-muted-foreground">Timezone</label>
                    <select className="w-full bg-background border rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary/20 transition-all outline-none">
                      <option>UTC-5 (Eastern Time)</option>
                      <option>UTC+0 (GMT)</option>
                      <option>UTC+1 (CET)</option>
                    </select>
                  </div>
                </div>

                <div className="pt-6">
                  <button className="px-6 py-2.5 rounded-xl bg-primary text-white font-bold text-sm hover:bg-primary/90 transition-all shadow-lg shadow-primary/20">
                    Save Changes
                  </button>
                </div>
              </div>
            )}

            {activeTab === "api" && (
              <div className="space-y-8">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold">API Access</h3>
                    <p className="text-sm text-muted-foreground">Manage your secret keys for external integrations.</p>
                  </div>
                  <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary/90 transition-all">
                    <Zap className="h-3 w-3 fill-current" />
                    New Secret Key
                  </button>
                </div>

                <div className="space-y-4">
                  {[
                    { name: "Production CRM", key: "sk_live_••••••••••••••••", date: "Created 2 months ago" },
                    { name: "Dev Test Environment", key: "sk_test_••••••••••••••••", date: "Created 5 days ago" },
                  ].map((api) => (
                    <div key={api.name} className="flex items-center justify-between p-4 rounded-2xl bg-muted/30 border border-border/50">
                      <div>
                        <p className="text-sm font-bold">{api.name}</p>
                        <p className="text-xs font-mono text-muted-foreground mt-1">{api.key}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] font-bold text-muted-foreground">{api.date}</p>
                        <button className="text-xs font-bold text-rose-500 hover:underline mt-1">Revoke</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab !== "profile" && activeTab !== "api" && (
              <div className="h-64 flex flex-col items-center justify-center text-center space-y-4">
                <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
                  <activeTab.icon className="h-6 w-6 text-muted-foreground" />
                </div>
                <div>
                  <h3 className="font-bold">{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Settings</h3>
                  <p className="text-sm text-muted-foreground">This section is being orchestrated by the engine.</p>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
