"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { User, Bell, Shield, Key, Save } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="p-8 space-y-8 max-w-5xl">
      <div>
        <h1 className="text-3xl font-black tracking-tighter uppercase leading-none">Settings</h1>
        <p className="text-muted-foreground mt-1 text-sm font-medium">Manage your account settings and preferences.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <aside className="space-y-1">
          <nav className="flex flex-col gap-1">
            <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-md bg-muted text-foreground text-sm font-bold uppercase tracking-tight transition-colors">
               <User className="w-4 h-4" /> Profile
            </button>
            <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-muted-foreground hover:bg-muted/50 hover:text-foreground text-sm font-bold uppercase tracking-tight transition-colors">
               <Bell className="w-4 h-4" /> Notifications
            </button>
            <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-muted-foreground hover:bg-muted/50 hover:text-foreground text-sm font-bold uppercase tracking-tight transition-colors">
               <Shield className="w-4 h-4" /> Security
            </button>
            <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-muted-foreground hover:bg-muted/50 hover:text-foreground text-sm font-bold uppercase tracking-tight transition-colors">
               <Key className="w-4 h-4" /> API Keys
            </button>
          </nav>
        </aside>

        <div className="md:col-span-3 space-y-6">
          <div className="rounded-md border border-border bg-background shadow-sm">
            <div className="p-6 border-b border-border/50">
              <h3 className="font-semibold leading-none tracking-tight">Public Profile</h3>
              <p className="text-sm text-muted-foreground mt-1.5">This is how others will see you on the platform.</p>
            </div>
            <div className="p-6 space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground" htmlFor="name">Full Name</label>
                <input 
                  id="name" 
                  type="text" 
                  defaultValue="John Doe"
                  className="flex h-10 w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground" htmlFor="email">Email Address</label>
                <input 
                  id="email" 
                  type="email" 
                  defaultValue="john.doe@example.com"
                  className="flex h-10 w-full rounded-md border border-border bg-muted/50 px-3 py-2 text-sm text-muted-foreground cursor-not-allowed focus:outline-none" 
                  disabled
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground" htmlFor="bio">Bio</label>
                <textarea 
                  id="bio" 
                  rows={4}
                  defaultValue="Senior Marketing Director leading enterprise campaigns and lead generation."
                  className="flex w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none" 
                />
              </div>
            </div>
            <div className="p-6 border-t border-border/50 flex justify-end">
               <button className={cn(
                "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none disabled:opacity-50",
                "bg-primary text-primary-foreground hover:opacity-90 h-10 px-4 py-2 gap-2"
              )}>
                <Save className="w-4 h-4" />
                Save Changes
              </button>
            </div>
          </div>

          <div className="rounded-md border border-red-500/20 bg-background shadow-sm">
            <div className="p-6 border-b border-red-500/20">
              <h3 className="font-semibold leading-none tracking-tight text-red-600">Danger Zone</h3>
              <p className="text-sm text-muted-foreground mt-1.5">Irreversible and destructive actions.</p>
            </div>
            <div className="p-6 flex items-center justify-between">
              <div>
                 <h4 className="font-medium text-sm">Delete Account</h4>
                 <p className="text-xs text-muted-foreground mt-1">Permanently remove your account and all data.</p>
              </div>
              <button className={cn(
                "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none disabled:opacity-50",
                "bg-red-50 text-red-600 hover:bg-red-100 border border-red-200 h-10 px-4 py-2"
              )}>
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}