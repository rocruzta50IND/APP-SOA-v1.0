"use client";

import { motion } from "framer-motion";
import { Playfair_Display, Inter } from "next/font/google";
import { Save, Shield, Key, Bell, User } from "lucide-react";
import { cn } from "@/lib/utils";

const playfair = Playfair_Display({ subsets: ["latin"] });
const inter = Inter({ subsets: ["latin"] });

const transitionPhysics = { duration: 1.2, ease: [0.16, 1, 0.3, 1] };

export default function SettingsPage() {
  return (
    <div className="p-12 md:p-24 max-w-5xl mx-auto w-full">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={transitionPhysics}
        className="mb-16"
      >
        <div className={cn(inter.className, "text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground mb-4")}>
          System Preferences
        </div>
        <h1 className={cn(playfair.className, "text-6xl md:text-8xl font-bold tracking-tighter leading-none text-foreground")}>
          Account<br/>Settings.
        </h1>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-16">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ ...transitionPhysics, delay: 0.1 }}
          className="md:col-span-4 space-y-2"
        >
          {[
            { icon: User, label: "Profile Information", active: true },
            { icon: Shield, label: "Security & Access", active: false },
            { icon: Bell, label: "Notifications", active: false },
            { icon: Key, label: "API Integrations", active: false },
          ].map((item, i) => (
            <button
              key={i}
              className={cn(
                "w-full flex items-center gap-4 px-6 py-4 text-left transition-all duration-300",
                item.active 
                  ? "bg-foreground text-background" 
                  : "text-muted-foreground hover:bg-muted/20 hover:text-foreground"
              )}
            >
              <item.icon className="w-4 h-4" strokeWidth={1.5} />
              <span className="text-sm font-medium tracking-wide">{item.label}</span>
            </button>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...transitionPhysics, delay: 0.2 }}
          className="md:col-span-8 space-y-12"
        >
          <div className="border border-border/50 p-10 bg-background">
            <h2 className={cn(playfair.className, "text-3xl font-bold tracking-tight mb-8 border-b border-border/50 pb-6")}>
              Personal Details
            </h2>
            
            <div className="space-y-8">
              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className={cn(inter.className, "text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground block")}>First Name</label>
                  <input 
                    type="text" 
                    defaultValue="Jonathan"
                    className="w-full h-14 px-4 bg-transparent border border-border/50 text-foreground text-sm tracking-wide focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  />
                </div>
                <div className="space-y-3">
                  <label className={cn(inter.className, "text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground block")}>Last Name</label>
                  <input 
                    type="text" 
                    defaultValue="Doe"
                    className="w-full h-14 px-4 bg-transparent border border-border/50 text-foreground text-sm tracking-wide focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className={cn(inter.className, "text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground block")}>Professional Email</label>
                <input 
                  type="email" 
                  defaultValue="jonathan.doe@crmforge.com"
                  className="w-full h-14 px-4 bg-transparent border border-border/50 text-foreground text-sm tracking-wide focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                />
              </div>

              <div className="space-y-3">
                <label className={cn(inter.className, "text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground block")}>Role / Title</label>
                <input 
                  type="text" 
                  defaultValue="Senior Wealth Manager"
                  readOnly
                  className="w-full h-14 px-4 bg-muted/30 border border-border/50 text-muted-foreground text-sm tracking-wide cursor-not-allowed"
                />
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-border/50 flex justify-end">
              <button className="inline-flex items-center justify-center transition-all duration-500 bg-foreground text-background hover:opacity-80 px-10 py-4 text-sm font-medium tracking-widest uppercase gap-3 active:scale-95">
                <Save className="w-4 h-4" strokeWidth={1.5} />
                <span>Save Changes</span>
              </button>
            </div>
          </div>
          
          <div className="border border-border/50 p-10 bg-background">
            <h2 className={cn(playfair.className, "text-3xl font-bold tracking-tight mb-8 border-b border-border/50 pb-6")}>
              Enterprise Branding
            </h2>
            <div className="flex items-center gap-8">
              <div className="w-24 h-24 bg-foreground flex items-center justify-center shrink-0">
                <span className="text-background text-3xl font-serif font-bold tracking-tighter">C</span>
              </div>
              <div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  Upload your organization's signature logo. This will be displayed on client-facing reports and portals.
                </p>
                <button className="px-6 py-3 border border-border/50 text-xs font-bold uppercase tracking-[0.2em] hover:bg-muted/30 transition-colors">
                  Change Insignia
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
