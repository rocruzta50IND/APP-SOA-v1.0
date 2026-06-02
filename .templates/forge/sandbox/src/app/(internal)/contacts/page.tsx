"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { 
  Search, 
  Filter, 
  Plus, 
  MoreVertical, 
  Mail, 
  Phone, 
  Building2,
  BadgeCheck,
  Star
} from "lucide-react";

const contacts = [
  { id: 1, name: "Sarah Johnson", company: "Stellar Corp", email: "sarah@stellar.io", status: "Qualified", score: 92, lastTouch: "2h ago" },
  { id: 2, name: "Michael Chen", company: "Nexus Logic", email: "m.chen@nexus.com", status: "Negotiation", score: 85, lastTouch: "5h ago" },
  { id: 3, name: "Emma Wilson", company: "Aetheris AI", email: "emma@aetheris.tech", status: "New", score: 45, lastTouch: "1d ago" },
  { id: 4, name: "David Miller", company: "CloudFlow", email: "david.m@cloudflow.net", status: "Discovery", score: 78, lastTouch: "3d ago" },
  { id: 5, name: "Olivia Taylor", company: "Summit Systems", email: "olivia@summit.co", status: "Proposal", score: 88, lastTouch: "4h ago" },
  { id: 6, name: "Robert Garcia", company: "Velocity Media", email: "robert@velocity.com", status: "Qualified", score: 95, lastTouch: "1h ago" },
];

export default function ContactsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tighter">Enterprise Contacts</h1>
          <p className="text-muted-foreground mt-1">Manage and nurture your high-ticket leads.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl border bg-card hover:bg-muted transition-all text-sm font-bold">
            <Filter className="h-4 w-4" />
            Filter
          </button>
          <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-white hover:bg-primary/90 transition-all text-sm font-bold shadow-[0_5px_15px_rgba(79,70,229,0.2)]">
            <Plus className="h-4 w-4" />
            Add Contact
          </button>
        </div>
      </div>

      <div className="bg-card/50 backdrop-blur-xl border border-border rounded-3xl overflow-hidden shadow-sm">
        <div className="p-4 border-b border-border/50 flex items-center gap-4 bg-muted/20">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Search contacts..." 
              className="w-full bg-background border rounded-xl pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-primary/20 transition-all outline-none"
            />
          </div>
          <div className="h-8 w-[1px] bg-border" />
          <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
            Showing {contacts.length} of 2,451 contacts
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-muted/30">
                <th className="px-6 py-4 text-[10px] uppercase tracking-widest font-black text-muted-foreground">Contact</th>
                <th className="px-6 py-4 text-[10px] uppercase tracking-widest font-black text-muted-foreground">Company</th>
                <th className="px-6 py-4 text-[10px] uppercase tracking-widest font-black text-muted-foreground">Status</th>
                <th className="px-6 py-4 text-[10px] uppercase tracking-widest font-black text-muted-foreground">Lead Score</th>
                <th className="px-6 py-4 text-[10px] uppercase tracking-widest font-black text-muted-foreground">Last Touch</th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {contacts.map((contact, idx) => (
                <motion.tr 
                  key={contact.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="group hover:bg-muted/50 transition-all cursor-pointer"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-bold">
                        {contact.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="text-sm font-bold group-hover:text-primary transition-colors">{contact.name}</p>
                        <p className="text-xs text-muted-foreground">{contact.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-sm">
                      <Building2 className="h-4 w-4 text-muted-foreground" />
                      {contact.company}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={cn(
                      "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider",
                      contact.status === "Qualified" ? "bg-emerald-500/10 text-emerald-600" :
                      contact.status === "Negotiation" ? "bg-amber-500/10 text-amber-600" :
                      contact.status === "Discovery" ? "bg-blue-500/10 text-blue-600" :
                      "bg-muted text-muted-foreground"
                    )}>
                      <div className={cn(
                        "h-1.5 w-1.5 rounded-full",
                        contact.status === "Qualified" ? "bg-emerald-500" :
                        contact.status === "Negotiation" ? "bg-amber-500" :
                        contact.status === "Discovery" ? "bg-blue-500" :
                        "bg-muted-foreground"
                      )} />
                      {contact.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-1.5 w-24 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary rounded-full"
                          style={{ width: `${contact.score}%` }}
                        />
                      </div>
                      <span className="text-xs font-mono font-bold">{contact.score}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-xs text-muted-foreground">
                    {contact.lastTouch}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="h-8 w-8 rounded-lg hover:bg-muted flex items-center justify-center text-muted-foreground transition-colors">
                      <MoreVertical className="h-4 w-4" />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-primary/5 border border-primary/10 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-8 w-8 rounded-lg bg-primary text-white flex items-center justify-center">
              <Star className="h-4 w-4 fill-current" />
            </div>
            <h3 className="font-bold">Top Prospects</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-4">You have 12 contacts with a lead score over 90. Prioritize these for immediate outreach.</p>
          <button className="text-xs font-bold text-primary hover:underline">View Priority List</button>
        </div>
        <div className="bg-card border rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-8 w-8 rounded-lg bg-muted flex items-center justify-center text-muted-foreground">
              <Mail className="h-4 w-4" />
            </div>
            <h3 className="font-bold">Pending Follow-ups</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-4">8 contacts haven't been reached in over 5 days. Automated sequences are ready.</p>
          <button className="text-xs font-bold text-primary hover:underline">Start Sequence</button>
        </div>
        <div className="bg-card border rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-8 w-8 rounded-lg bg-muted flex items-center justify-center text-muted-foreground">
              <Phone className="h-4 w-4" />
            </div>
            <h3 className="font-bold">Recent Inbound</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-4">5 new leads captured from your 'Enterprise Q3' landing page in the last 12 hours.</p>
          <button className="text-xs font-bold text-primary hover:underline">Review Leads</button>
        </div>
      </div>
    </div>
  );
}
