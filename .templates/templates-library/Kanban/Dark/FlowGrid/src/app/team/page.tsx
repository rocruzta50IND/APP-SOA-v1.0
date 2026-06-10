"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Search, Plus, Mail, Shield, User, Circle, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const mockTeam = [
  { name: "Alice Johnson", role: "Product Manager", email: "alice@zenkanban.co", status: "Online", lastActive: "Just now", admin: true },
  { name: "Bob Smith", role: "Frontend Engineer", email: "bob@zenkanban.co", status: "Offline", lastActive: "2h ago", admin: false },
  { name: "Charlie Davis", role: "Backend Engineer", email: "charlie@zenkanban.co", status: "Online", lastActive: "Just now", admin: false },
  { name: "Diana Prince", role: "UX Designer", email: "diana@zenkanban.co", status: "Busy", lastActive: "In a meeting", admin: false },
  { name: "Evan Wright", role: "QA Tester", email: "evan@zenkanban.co", status: "Online", lastActive: "Just now", admin: false },
  { name: "Fiona Gallagher", role: "DevOps", email: "fiona@zenkanban.co", status: "Offline", lastActive: "1d ago", admin: true },
];

export default function TeamPage() {
  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Team Directory</h1>
          <p className="text-muted-foreground text-sm mt-1">Manage team members and their roles.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Find members..." 
              className="h-10 pl-9 pr-4 w-[250px] rounded-md border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
            />
          </div>
          <button className={cn("inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none disabled:opacity-50 bg-primary text-primary-foreground hover:opacity-90 h-10 px-4 py-2")}>
            <Plus className="w-4 h-4 mr-2" /> Invite User
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockTeam.map((member, i) => (
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.05, ease: "easeOut" }}
            key={i} 
            className="rounded-md border border-border bg-card text-card-foreground shadow-sm flex flex-col group hover:-translate-y-1 transition-all duration-300"
          >
            <div className="p-6 flex-1">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-muted border border-border flex items-center justify-center relative">
                    <User className="w-6 h-6 text-muted-foreground" />
                    <span className={cn(
                      "absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-background",
                      member.status === "Online" ? "bg-emerald-500" :
                      member.status === "Busy" ? "bg-red-500" : "bg-muted-foreground"
                    )} />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground flex items-center gap-2">
                      {member.name}
                      {member.admin && <Shield className="w-3.5 h-3.5 text-primary" />}
                    </h3>
                    <p className="text-xs text-muted-foreground font-medium mt-0.5">{member.role}</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 space-y-2">
                <div className="flex items-center text-sm text-muted-foreground">
                  <Mail className="w-4 h-4 mr-3" />
                  {member.email}
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Circle className="w-4 h-4 mr-3" />
                  {member.lastActive}
                </div>
              </div>
            </div>
            
            <div className="px-6 py-4 border-t border-border/50 bg-muted/10 flex items-center justify-between mt-auto">
              <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                {member.admin ? "Administrator" : "Member"}
              </span>
              <button className="text-xs font-bold uppercase tracking-widest text-foreground flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
                Manage <ArrowRight className="w-3 h-3 ml-1" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
