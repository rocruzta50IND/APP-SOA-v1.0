"use client";

import React from "react";
import { 
  Search, 
  Filter, 
  Plus, 
  MoreHorizontal, 
  Mail, 
  Phone, 
  ExternalLink,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils";

const leads = [
  { id: 1, name: "Marcus Wright", email: "marcus@aerotech.io", company: "AeroTech Solutions", phone: "+1 555-0123", status: "Hot", source: "Direct Sales", date: "2024-05-28" },
  { id: 2, name: "Sofia Chen", email: "sofia@nexus.ai", company: "Nexus Systems", phone: "+1 555-0124", status: "Warm", source: "Inbound Marketing", date: "2024-05-27" },
  { id: 3, name: "David Miller", email: "david@cloudscale.com", company: "CloudScale Inc", phone: "+1 555-0125", status: "Cold", source: "LinkedIn", date: "2024-05-26" },
  { id: 4, name: "Emma Wilson", email: "emma@datasync.co", company: "DataSync Co", phone: "+1 555-0126", status: "Hot", source: "Referral", date: "2024-05-25" },
  { id: 5, name: "Julian Rossi", email: "julian@vertigo.it", company: "Vertigo Design", phone: "+1 555-0127", status: "Qualified", source: "Conference", date: "2024-05-24" },
  { id: 6, name: "Sarah Jenkins", email: "s.jenkins@globex.com", company: "Globex Corp", phone: "+1 555-0128", status: "Warm", source: "Webinar", date: "2024-05-23" },
  { id: 7, name: "Leo Martinez", email: "leo@fusion-x.com", company: "FusionX Lab", phone: "+1 555-0129", status: "Hot", source: "Direct Sales", date: "2024-05-22" },
  { id: 8, name: "Alice Thorne", email: "alice@bio-logic.org", company: "BioLogic Research", phone: "+1 555-0130", status: "Qualified", source: "Organic Search", date: "2024-05-21" },
];

export default function LeadsPage() {
  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-700">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
            Leads Management
          </h1>
          <p className="text-muted-foreground mt-1">Manage and qualify your high-ticket B2B prospects.</p>
        </div>
        <button className="flex items-center gap-2 bg-primary text-white hover:bg-primary/90 shadow-[0_0_20px_rgba(79,70,229,0.3)] rounded-xl px-5 py-2.5 font-medium transition-all w-fit">
          <Plus className="h-4 w-4" />
          Import Leads
        </button>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by name, company or email..."
            className="h-11 w-full rounded-xl border border-white/10 bg-white/5 pl-10 pr-4 text-sm text-white placeholder:text-muted-foreground focus:border-primary/50 focus:outline-none transition-all"
          />
        </div>
        <button className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 h-11 text-sm font-medium hover:bg-white/10 transition-all">
          <Filter className="h-4 w-4 text-muted-foreground" />
          Filters
        </button>
        <select className="rounded-xl border border-white/10 bg-white/5 px-4 h-11 text-sm font-medium text-white outline-none focus:border-primary/50 transition-all">
          <option>Newest First</option>
          <option>Value: High to Low</option>
          <option>Status: Hot First</option>
        </select>
      </div>

      {/* Leads Table */}
      <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-white/[0.02] text-muted-foreground text-[10px] uppercase tracking-widest font-bold">
                <th className="px-6 py-4">Lead Detail</th>
                <th className="px-6 py-4">Company</th>
                <th className="px-6 py-4">Contact</th>
                <th className="px-6 py-4">Source</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {leads.map((lead) => (
                <tr key={lead.id} className="hover:bg-white/[0.02] transition-colors group">
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-primary/20 to-indigo-600/20 flex items-center justify-center text-primary font-bold border border-primary/20">
                        {lead.name[0]}
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-white">{lead.name}</div>
                        <div className="text-xs text-muted-foreground mt-0.5">{lead.date}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-white/90">{lead.company}</span>
                      <span className="text-[10px] text-muted-foreground flex items-center gap-1 mt-1">
                        <ExternalLink className="h-3 w-3" /> Visit site
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground hover:text-white cursor-pointer transition-colors">
                        <Mail className="h-3 w-3" /> {lead.email}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground hover:text-white cursor-pointer transition-colors">
                        <Phone className="h-3 w-3" /> {lead.phone}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span className="text-xs font-medium text-muted-foreground">{lead.source}</span>
                  </td>
                  <td className="px-6 py-5">
                    <span className={cn(
                      "px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase border",
                      lead.status === "Hot" && "bg-orange-500/10 text-orange-400 border-orange-500/20",
                      lead.status === "Warm" && "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
                      lead.status === "Qualified" && "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
                      lead.status === "Cold" && "bg-slate-500/10 text-slate-400 border-slate-500/20"
                    )}>
                      {lead.status}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <button className="p-2 hover:bg-white/5 rounded-lg text-muted-foreground hover:text-white transition-all">
                      <MoreHorizontal className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-4 border-t border-white/10 flex items-center justify-between">
          <p className="text-xs text-muted-foreground">Showing <span className="text-white">8</span> of <span className="text-white">124</span> leads</p>
          <div className="flex items-center gap-2">
            <button className="p-2 border border-white/10 rounded-lg text-muted-foreground hover:bg-white/5 disabled:opacity-50" disabled>
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button className="h-8 w-8 text-xs font-bold rounded-lg bg-primary text-white">1</button>
            <button className="h-8 w-8 text-xs font-bold rounded-lg text-muted-foreground hover:bg-white/5">2</button>
            <button className="h-8 w-8 text-xs font-bold rounded-lg text-muted-foreground hover:bg-white/5">3</button>
            <button className="p-2 border border-white/10 rounded-lg text-muted-foreground hover:bg-white/5">
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
