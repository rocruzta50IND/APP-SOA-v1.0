"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { 
  User, 
  Shield, 
  Bell, 
  Key, 
  Globe, 
  LogOut,
  ChevronRight,
  Eye
} from "lucide-react";

const sections = [
  { 
    id: "profile", 
    title: "Institutional Profile", 
    description: "Manage your corporate identity and authorized representatives.",
    icon: User 
  },
  { 
    id: "security", 
    title: "Security & Custody", 
    description: "Configure Multi-Sig, 2FA, and Hardware Security Modules.",
    icon: Shield 
  },
  { 
    id: "notifications", 
    title: "Intelligence Alerts", 
    description: "Set custom triggers for market movements and audit events.",
    icon: Bell 
  },
  { 
    id: "api", 
    title: "API Access", 
    description: "Generate high-frequency trading keys and webhook secrets.",
    icon: Key 
  },
];

export default function SettingsPage() {
  return (
    <div className="space-y-12">
      {/* Header Section */}
      <section>
        <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-primary mb-2">System Configuration</p>
        <h1 className="text-6xl font-serif tracking-tighter leading-none mb-4">Account Settings</h1>
        <p className="text-muted-foreground max-w-2xl text-lg font-light">
          Fine-tune your institutional environment and security protocols.
        </p>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Navigation */}
        <div className="lg:col-span-1 space-y-2">
          {sections.map((section) => (
            <button 
              key={section.id}
              className="w-full text-left p-6 border border-border/50 bg-card/30 backdrop-blur-sm group hover:border-primary/50 transition-all duration-500 flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-muted/50 rounded-full text-muted-foreground group-hover:text-primary transition-colors duration-500">
                  <section.icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-medium tracking-tight">{section.title}</h3>
                  <p className="text-[10px] uppercase tracking-widest text-muted-foreground">{section.id}</p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-all group-hover:translate-x-1" />
            </button>
          ))}
          
          <button className="w-full text-left p-6 border border-rose-500/20 bg-rose-500/5 group hover:bg-rose-500 hover:text-white transition-all duration-500 flex items-center justify-between mt-12">
             <div className="flex items-center gap-4">
                <LogOut className="w-5 h-5" />
                <span className="text-sm font-medium tracking-tight">Terminate All Sessions</span>
             </div>
          </button>
        </div>

        {/* Content Area */}
        <div className="lg:col-span-2 space-y-8">
          <div className="p-12 border border-border/50 bg-card/30 backdrop-blur-sm">
            <h3 className="text-2xl font-serif tracking-tight mb-8">Personal Information</h3>
            
            <div className="space-y-8">
              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground">Full Legal Name</label>
                  <input 
                    type="text" 
                    placeholder="Alexander Von Strauss" 
                    className="w-full bg-transparent border-b border-border/50 py-3 focus:outline-none focus:border-primary transition-colors text-sm font-medium"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground">Professional Email</label>
                  <input 
                    type="email" 
                    placeholder="alex@strauss-capital.com" 
                    className="w-full bg-transparent border-b border-border/50 py-3 focus:outline-none focus:border-primary transition-colors text-sm font-medium"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground">Corporate Biography</label>
                <textarea 
                  placeholder="Managing Director at Strauss Capital Management. Focused on institutional crypto-asset allocation."
                  rows={4}
                  className="w-full bg-transparent border border-border/50 p-4 focus:outline-none focus:border-primary transition-colors text-sm font-medium resize-none"
                />
              </div>

              <div className="pt-8 flex justify-end">
                <button className="px-12 py-4 bg-foreground text-background rounded-full text-[10px] font-bold uppercase tracking-[0.2em] hover:opacity-80 transition-all">
                  Save Changes
                </button>
              </div>
            </div>
          </div>

          <div className="p-12 border border-border/50 bg-card/30 backdrop-blur-sm">
            <div className="flex justify-between items-start mb-8">
               <div>
                 <h3 className="text-2xl font-serif tracking-tight">API Management</h3>
                 <p className="text-sm text-muted-foreground mt-2">Generate keys for external system integrations.</p>
               </div>
               <button className="px-6 py-3 border border-primary text-primary text-[10px] font-bold uppercase tracking-widest hover:bg-primary hover:text-background transition-all">
                 Generate New Key
               </button>
            </div>

            <div className="space-y-4">
               {[1, 2].map((i) => (
                 <div key={i} className="flex justify-between items-center p-6 border border-border/50 bg-muted/20">
                    <div className="flex items-center gap-4">
                       <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                          <Globe className="w-5 h-5 text-muted-foreground" />
                       </div>
                       <div>
                          <p className="text-sm font-medium">Trading Bot {i}</p>
                          <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Created on Oct 12, 2025</p>
                       </div>
                    </div>
                    <div className="flex items-center gap-4">
                       <button className="p-2 text-muted-foreground hover:text-foreground">
                          <Eye className="w-4 h-4" />
                       </button>
                       <button className="text-[10px] font-bold uppercase tracking-widest text-rose-500">Revoke</button>
                    </div>
                 </div>
               ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
