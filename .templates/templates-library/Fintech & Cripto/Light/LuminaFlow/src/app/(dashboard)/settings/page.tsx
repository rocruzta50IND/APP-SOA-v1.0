"use client";

import React from "react";
import { User, Shield, Bell, CreditCard, ExternalLink, Globe, Moon } from "lucide-react";
import { cn } from "@/lib/utils";

const sections = [
  { id: "profile", name: "Profile", icon: User },
  { id: "security", name: "Security", icon: Shield },
  { id: "notifications", name: "Notifications", icon: Bell },
  { id: "billing", name: "Billing", icon: CreditCard },
];

export default function SettingsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">Manage your account preferences and security settings.</p>
      </div>

      <div className="flex flex-col gap-8 lg:flex-row">
        {/* Sidebar Nav */}
        <aside className="w-full lg:w-64">
          <nav className="flex flex-row gap-2 overflow-x-auto pb-4 lg:flex-col lg:pb-0">
            {sections.map((item) => (
              <button
                key={item.id}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors whitespace-nowrap",
                  item.id === "profile" ? "bg-muted text-primary" : "text-muted-foreground hover:bg-muted/50 hover:text-primary"
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.name}
              </button>
            ))}
          </nav>
        </aside>

        {/* Settings Content */}
        <div className="flex-1 space-y-6">
          {/* Profile Section */}
          <section className="rounded-md border border-border bg-background p-6 shadow-sm">
            <h3 className="text-lg font-semibold tracking-tight">Profile Information</h3>
            <p className="mb-6 text-sm text-muted-foreground">Update your personal details and public profile.</p>
            
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Full Name</label>
                <input 
                  type="text" 
                  placeholder="John Doe" 
                  className="w-full rounded-md border border-border bg-muted/30 px-3 py-2 text-sm outline-none focus:bg-background focus:border-primary/50"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Email Address</label>
                <input 
                  type="email" 
                  placeholder="john@example.com" 
                  className="w-full rounded-md border border-border bg-muted/30 px-3 py-2 text-sm outline-none focus:bg-background focus:border-primary/50"
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Bio</label>
                <textarea 
                  placeholder="Crypto enthusiast and long-term investor..." 
                  rows={4}
                  className="w-full rounded-md border border-border bg-muted/30 px-3 py-2 text-sm outline-none focus:bg-background focus:border-primary/50 resize-none"
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <button className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90">
                Save Changes
              </button>
            </div>
          </section>

          {/* Preferences Section */}
          <section className="rounded-md border border-border bg-background p-6 shadow-sm">
            <h3 className="text-lg font-semibold tracking-tight">Preferences</h3>
            <p className="mb-6 text-sm text-muted-foreground">Configure your workspace and display options.</p>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-border pb-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-md bg-muted">
                    <Moon className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Dark Mode</p>
                    <p className="text-xs text-muted-foreground">Toggle between light and dark themes.</p>
                  </div>
                </div>
                <div className="h-6 w-11 rounded-full bg-muted border border-border relative cursor-pointer">
                  <div className="absolute left-1 top-1 h-4 w-4 rounded-full bg-primary" />
                </div>
              </div>

              <div className="flex items-center justify-between border-b border-border pb-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-md bg-muted">
                    <Globe className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Language</p>
                    <p className="text-xs text-muted-foreground">Select your preferred display language.</p>
                  </div>
                </div>
                <select className="bg-transparent text-sm font-medium outline-none">
                  <option>English (US)</option>
                  <option>Portuguese (BR)</option>
                  <option>Spanish</option>
                </select>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-md bg-muted">
                    <ExternalLink className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">API Access</p>
                    <p className="text-xs text-muted-foreground">Manage your developer API keys.</p>
                  </div>
                </div>
                <button className="text-xs font-bold uppercase tracking-widest text-primary hover:underline">
                  Manage Keys
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
