"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { User, Bell, Lock, CreditCard, Palette, Globe, HardDrive } from "lucide-react";

const sections = [
  { id: "profile", label: "Profile", icon: User },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "security", label: "Security", icon: Lock },
  { id: "billing", label: "Billing", icon: CreditCard },
  { id: "appearance", label: "Appearance", icon: Palette },
  { id: "integrations", label: "Integrations", icon: Globe },
  { id: "advanced", label: "Advanced", icon: HardDrive },
];

export default function SettingsPage() {
  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Settings</h1>
        <p className="text-muted-foreground text-sm mt-1">Manage your account settings and preferences.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        <aside className="w-full md:w-64 shrink-0">
          <nav className="flex flex-col space-y-1">
            {sections.map((sec, i) => (
              <button
                key={sec.id}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors w-full text-left",
                  i === 0 
                    ? "bg-muted text-foreground" 
                    : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                )}
              >
                <sec.icon className="w-4 h-4" />
                {sec.label}
              </button>
            ))}
          </nav>
        </aside>

        <div className="flex-1 space-y-8">
          <div className="rounded-md border border-border bg-card text-card-foreground shadow-sm">
            <div className="p-6 border-b border-border/50">
              <h3 className="font-semibold leading-none tracking-tight text-lg">Public Profile</h3>
              <p className="text-sm text-muted-foreground mt-2">This is how others will see you on the site.</p>
            </div>
            <div className="p-6 space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Username
                </label>
                <input 
                  type="text" 
                  placeholder="zen_master" 
                  className="flex h-10 w-full md:w-2/3 rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background transition-all"
                />
                <p className="text-[0.8rem] text-muted-foreground">This is your public display name.</p>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Email
                </label>
                <input 
                  type="email" 
                  placeholder="user@zenkanban.co" 
                  className="flex h-10 w-full md:w-2/3 rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Bio
                </label>
                <textarea 
                  placeholder="I manage projects." 
                  className="flex min-h-[100px] w-full md:w-2/3 rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background transition-all"
                />
              </div>
            </div>
            <div className="p-6 pt-0 border-t border-border/50 bg-muted/10 mt-6 flex items-center justify-end rounded-b-md">
              <button className={cn("mt-4 inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none disabled:opacity-50 bg-primary text-primary-foreground hover:opacity-90 h-10 px-4 py-2")}>
                Update Profile
              </button>
            </div>
          </div>

          <div className="rounded-md border border-red-500/20 bg-red-500/5 text-card-foreground shadow-sm">
            <div className="p-6 border-b border-red-500/20">
              <h3 className="font-semibold leading-none tracking-tight text-red-500 text-lg">Danger Zone</h3>
              <p className="text-sm text-red-500/80 mt-2">Permanently delete your account and all associated data.</p>
            </div>
            <div className="p-6 flex items-center justify-between">
              <div>
                <h4 className="font-medium text-foreground">Delete Account</h4>
                <p className="text-sm text-muted-foreground">This action cannot be undone.</p>
              </div>
              <button className={cn("inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none border border-red-500/50 text-red-500 hover:bg-red-500 hover:text-white h-10 px-4 py-2")}>
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
