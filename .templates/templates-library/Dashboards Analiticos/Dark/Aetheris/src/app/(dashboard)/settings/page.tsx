"use client";

import React from "react";
import { 
  User, 
  Bell, 
  Lock, 
  Shield, 
  Zap, 
  Globe, 
  Mail,
  ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils";

const sections = [
  { id: "profile", label: "Profile", icon: User, description: "Manage your personal information and preferences." },
  { id: "security", label: "Security", icon: Lock, description: "Update your password and enable 2FA security." },
  { id: "notifications", label: "Notifications", icon: Bell, description: "Choose how and when you want to be notified." },
  { id: "api", label: "API Keys", icon: Zap, description: "Manage your secret keys and developer access." },
  { id: "billing", label: "Billing", icon: Globe, description: "Manage your subscription plan and payment methods." },
];

export default function SettingsPage() {
  return (
    <div className="max-w-4xl space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold tracking-tight text-zinc-100">Settings</h1>
        <p className="text-zinc-500 text-sm">Control your account settings and infrastructure configurations.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-4">
        {/* Navigation */}
        <div className="md:col-span-4 space-y-1">
          {sections.map((section) => (
            <button
              key={section.id}
              className={cn(
                "w-full flex items-center justify-between px-4 py-3 rounded-md transition-all text-left group",
                section.id === "profile" 
                  ? "bg-zinc-900 border border-zinc-800 text-zinc-100" 
                  : "text-zinc-500 hover:text-zinc-200 hover:bg-zinc-900/50"
              )}
            >
              <div className="flex items-center gap-3">
                <section.icon className={cn("w-4 h-4", section.id === "profile" ? "text-indigo-400" : "text-zinc-600 group-hover:text-zinc-400")} />
                <span className="text-sm font-medium">{section.label}</span>
              </div>
              <ChevronRight className={cn("w-4 h-4 transition-transform", section.id === "profile" ? "translate-x-0 opacity-100" : "opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0")} />
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="md:col-span-8 space-y-8">
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-6">
            <h3 className="text-sm font-semibold text-zinc-100 border-b border-zinc-800 pb-4 mb-6">Personal Information</h3>
            
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-medium text-zinc-500">Full Name</label>
                  <input 
                    type="text" 
                    placeholder="Alex Sterling" 
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-md py-2 px-3 text-sm text-zinc-200 focus:outline-none focus:border-indigo-500/50"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-medium text-zinc-500">Public Username</label>
                  <input 
                    type="text" 
                    placeholder="asterling" 
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-md py-2 px-3 text-sm text-zinc-200 focus:outline-none focus:border-indigo-500/50"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-medium text-zinc-500">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
                  <input 
                    type="email" 
                    placeholder="alex@aetheris.io" 
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-md py-2 pl-10 pr-3 text-sm text-zinc-200 focus:outline-none focus:border-indigo-500/50"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-medium text-zinc-500">Bio</label>
                <textarea 
                  rows={4}
                  placeholder="Senior Infrastructure Architect based in San Francisco." 
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-md py-2 px-3 text-sm text-zinc-200 focus:outline-none focus:border-indigo-500/50 resize-none"
                />
              </div>

              <div className="pt-4 border-t border-zinc-800 flex justify-end gap-3">
                <button className="px-4 py-2 text-sm font-medium text-zinc-400 hover:text-zinc-100 transition-colors">Cancel</button>
                <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium rounded-md transition-colors">Save Changes</button>
              </div>
            </div>
          </div>

          <div className="bg-rose-500/5 border border-rose-500/20 rounded-lg p-6">
            <h3 className="text-sm font-semibold text-rose-500 mb-2">Danger Zone</h3>
            <p className="text-xs text-zinc-500 mb-6">Permanently delete your account and all associated infrastructure data.</p>
            <button className="px-4 py-2 bg-rose-500/10 hover:bg-rose-500 text-rose-500 hover:text-white text-sm font-medium rounded-md border border-rose-500/20 transition-all">
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
