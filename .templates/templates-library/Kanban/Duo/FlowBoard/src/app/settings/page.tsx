"use client";

import { motion } from "framer-motion";
import { User, Bell, Shield, Key, Building, CreditCard } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Settings</h1>
        <p className="text-muted-foreground mt-1">Manage your account preferences and configurations.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8 items-start">
        {/* Settings Navigation */}
        <aside className="w-full md:w-64 shrink-0 space-y-1">
          {[
            { id: "profile", label: "Profile", icon: User, active: true },
            { id: "notifications", label: "Notifications", icon: Bell },
            { id: "security", label: "Security", icon: Shield },
            { id: "api-keys", label: "API Keys", icon: Key },
            { id: "organization", label: "Organization", icon: Building },
            { id: "billing", label: "Billing", icon: CreditCard },
          ].map((item) => (
            <button
              key={item.id}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                item.active 
                  ? "bg-muted text-foreground" 
                  : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
              }`}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </button>
          ))}
        </aside>

        {/* Settings Content */}
        <motion.div 
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="flex-1 space-y-6 w-full"
        >
          <div className="bg-background border border-border shadow-sm rounded-md overflow-hidden">
            <div className="p-6 border-b border-border">
              <h2 className="text-lg font-semibold text-foreground">Personal Information</h2>
              <p className="text-sm text-muted-foreground">Update your photo and personal details here.</p>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 rounded-full bg-muted border border-border flex items-center justify-center overflow-hidden shrink-0">
                  <User className="w-8 h-8 text-muted-foreground" />
                </div>
                <div>
                  <div className="flex gap-3">
                    <button className="bg-primary text-primary-foreground hover:opacity-90 rounded-md px-4 py-2 text-sm font-medium transition-all active:scale-95">
                      Upload new
                    </button>
                    <button className="bg-background border border-border shadow-sm hover:bg-muted rounded-md px-4 py-2 text-sm font-medium transition-all active:scale-95 text-foreground">
                      Remove
                    </button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">JPG, GIF or PNG. Max size of 800K.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-foreground">First Name</label>
                  <input type="text" defaultValue="Alex" className="w-full bg-background border border-border shadow-sm rounded-md px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-foreground">Last Name</label>
                  <input type="text" defaultValue="Fornell" className="w-full bg-background border border-border shadow-sm rounded-md px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all" />
                </div>
              </div>
              
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-foreground">Email Address</label>
                <input type="email" defaultValue="alex.f@example.com" className="w-full bg-background border border-border shadow-sm rounded-md px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all" />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-foreground">Bio</label>
                <textarea rows={4} defaultValue="Senior Frontend Engineer" className="w-full bg-background border border-border shadow-sm rounded-md px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none" />
                <p className="text-xs text-muted-foreground">Brief description for your profile.</p>
              </div>
            </div>

            <div className="px-6 py-4 bg-muted/30 border-t border-border flex items-center justify-end gap-3">
              <button className="text-sm font-medium text-muted-foreground hover:text-foreground px-4 py-2 transition-colors">
                Cancel
              </button>
              <button className="bg-primary text-primary-foreground hover:opacity-90 rounded-md px-4 py-2 text-sm font-medium transition-all active:scale-95 shadow-sm">
                Save Changes
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}