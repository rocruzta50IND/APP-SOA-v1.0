"use client";

import { Header } from "@/components/ui/Header";
import { 
  User, 
  Lock, 
  Bell, 
  Globe, 
  CreditCard,
  Shield,
  LogOut
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const sections = [
  { id: "profile", label: "Profile", icon: User },
  { id: "security", label: "Security", icon: Lock },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "billing", label: "Billing", icon: CreditCard },
  { id: "team", label: "Team", icon: Globe },
];

export default function SettingsPage() {
  return (
    <div className="flex flex-col h-full">
      <Header title="Settings" />
      <div className="flex-1 overflow-y-auto p-8">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-[200px_1fr] gap-12">
          {/* Navigation */}
          <div className="space-y-1">
            {sections.map((section) => (
              <button
                key={section.id}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors",
                  section.id === "profile" 
                    ? "bg-muted text-foreground" 
                    : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                )}
              >
                <section.icon className="h-4 w-4" />
                {section.label}
              </button>
            ))}
            <div className="pt-4 mt-4 border-t border-border">
              <button className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-rose-600 hover:bg-rose-50 rounded-md transition-colors">
                <LogOut className="h-4 w-4" />
                Sign Out
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-8">
            <motion.section
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div>
                <h3 className="text-lg font-bold tracking-tight">Public Profile</h3>
                <p className="text-xs text-muted-foreground mt-1">Manage how you appear on the ZenithRetail platform.</p>
              </div>

              <div className="grid grid-cols-1 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Full Name</label>
                  <input 
                    placeholder="John Doe" 
                    className="h-10 px-3 rounded-md border border-border bg-background text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Email Address</label>
                  <input 
                    placeholder="john@aetheris.corp" 
                    className="h-10 px-3 rounded-md border border-border bg-background text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Biography</label>
                  <textarea 
                    placeholder="Senior Operations Manager at Aetheris Corp. Overseeing global logistics and supply chain optimization." 
                    rows={4}
                    className="p-3 rounded-md border border-border bg-background text-sm focus:outline-none focus:ring-1 focus:ring-primary resize-none"
                  />
                </div>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-border">
                <button className="bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-medium hover:opacity-90 transition-opacity">
                  Save Changes
                </button>
                <button className="border border-border px-4 py-2 rounded-md text-sm font-medium hover:bg-muted transition-colors">
                  Cancel
                </button>
              </div>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="space-y-6 pt-8 border-t border-border"
            >
              <div>
                <h3 className="text-lg font-bold tracking-tight">Security</h3>
                <p className="text-xs text-muted-foreground mt-1">Configure your account protection and access levels.</p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-md border border-border bg-muted/20">
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-background rounded border border-border">
                      <Shield className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-bold">Two-Factor Authentication</p>
                      <p className="text-xs text-muted-foreground">Add an extra layer of security to your account.</p>
                    </div>
                  </div>
                  <button className="text-xs font-bold uppercase tracking-widest text-primary hover:underline">Enable</button>
                </div>
              </div>
            </motion.section>
          </div>
        </div>
      </div>
    </div>
  );
}
