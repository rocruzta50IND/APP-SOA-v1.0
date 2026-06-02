"use client";

import { motion } from "framer-motion";
import { 
  User, 
  Lock, 
  Bell, 
  Shield, 
  Zap, 
  Globe, 
  ChevronRight,
  CreditCard
} from "lucide-react";
import { cn } from "@/lib/utils";

const sections = [
  { 
    title: "Profile Synthesis", 
    desc: "Manage your digital identity and access credentials.",
    icon: User,
    items: ["Identity Details", "Avatar & Presence", "Language Preferences"]
  },
  { 
    title: "Security Protocols", 
    desc: "Configure encryption levels and multi-factor neural auth.",
    icon: Shield,
    items: ["Two-Factor Auth", "Session Management", "API Access Keys"]
  },
  { 
    title: "Notification Matrix", 
    desc: "Define how and when system alerts are delivered.",
    icon: Bell,
    items: ["Critical Alerts", "Weekly Synthesis", "Market Deviations"]
  },
  { 
    title: "Performance Tuning", 
    desc: "Adjust neural engine processing and regional overrides.",
    icon: Zap,
    items: ["Computation Priority", "Regional Caching", "Auto-Scale Thresholds"]
  }
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};

export default function SettingsPage() {
  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="max-w-4xl space-y-16"
    >
      <div>
        <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-primary mb-2 block">
          Configuration
        </span>
        <h2 className="text-5xl font-serif tracking-tighter italic">Core Parameters</h2>
      </div>

      <div className="space-y-12">
        {sections.map((section, index) => (
          <motion.div 
            key={index} 
            variants={item}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-12 border-b border-border/40 last:border-0"
          >
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <section.icon className="w-4 h-4 text-primary" />
                <h3 className="text-xl font-serif tracking-tight">{section.title}</h3>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed tracking-wide">
                {section.desc}
              </p>
            </div>

            <div className="md:col-span-2 space-y-4">
              {section.items.map((sub, i) => (
                <button 
                  key={i}
                  className="w-full flex items-center justify-between p-6 border border-border/40 bg-secondary/5 hover:bg-secondary/10 hover:border-primary/20 transition-all group"
                >
                  <span className="text-[10px] uppercase tracking-[0.2em] font-bold group-hover:tracking-[0.3em] transition-all">
                    {sub}
                  </span>
                  <ChevronRight className="w-3 h-3 text-muted-foreground group-hover:text-primary transition-colors" />
                </button>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="p-10 border border-primary/20 bg-primary/5 flex items-center justify-between relative overflow-hidden group cursor-pointer">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-3xl -mr-16 -mt-16 group-hover:bg-primary/20 transition-all duration-700" />
        <div className="flex items-center gap-6 relative z-10">
          <div className="w-12 h-12 bg-background border border-primary/20 flex items-center justify-center">
            <CreditCard className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h4 className="font-serif text-2xl leading-none mb-2 tracking-tighter">Enterprise Allocation</h4>
            <p className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">Manage billing and node quotas</p>
          </div>
        </div>
        <button className="relative z-10 px-8 py-3 bg-foreground text-background text-[9px] uppercase tracking-[0.2em] font-bold hover:bg-primary transition-all duration-500">
          View Ledger
        </button>
      </div>
    </motion.div>
  );
}
