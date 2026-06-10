"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Search, Filter, MoreHorizontal, ArrowUpRight, ArrowDownRight, UserPlus, Mail } from "lucide-react";

const leads = [
  { id: 1, name: "Alice Freeman", company: "Stark Industries", source: "Inbound", value: "$120,000", status: "Hot", lastAction: "2h ago" },
  { id: 2, name: "Bob Martin", company: "Wayne Enterprises", source: "Referral", value: "$45,000", status: "Warm", lastAction: "5h ago" },
  { id: 3, name: "Charlie Davis", company: "Oscorp", source: "Outbound", value: "$80,000", status: "Cold", lastAction: "1d ago" },
  { id: 4, name: "Diana Prince", company: "Themyscira LLC", source: "Webinar", value: "$210,000", status: "Hot", lastAction: "Just now" },
  { id: 5, name: "Evan Wright", company: "Cyberdyne Systems", source: "Inbound", value: "$15,000", status: "Warm", lastAction: "3d ago" },
];

const metrics = [
  { label: "Total Leads", value: "2,450", change: "+12.5%", positive: true },
  { label: "Conversion Rate", value: "8.4%", change: "+2.1%", positive: true },
  { label: "Pipeline Value", value: "$4.2M", change: "-5.2%", positive: false },
];

const spring = { type: "spring", stiffness: 400, damping: 30 };

export default function LeadsPage() {
  return (
    <div className="p-8 space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
            Leads Directory
          </h1>
          <p className="text-sm text-muted-foreground mt-1">Manage and track your inbound and outbound prospects.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="inline-flex items-center justify-center rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-white h-10 px-4 text-sm font-medium transition-all">
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </button>
          <button className="inline-flex items-center justify-center rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_0_20px_rgba(79,70,229,0.3)] h-10 px-5 text-sm font-medium transition-all">
            <UserPlus className="w-4 h-4 mr-2" />
            Add Lead
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {metrics.map((metric, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...spring, delay: i * 0.1 }}
            whileHover={{ scale: 1.02 }}
            className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6 relative overflow-hidden"
          >
            <div className="absolute -inset-2 bg-primary/10 blur-[50px] rounded-full z-0 pointer-events-none" />
            <div className="relative z-10">
              <h3 className="text-sm text-muted-foreground font-medium">{metric.label}</h3>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-3xl font-bold text-white">{metric.value}</span>
                <span className={cn(
                  "flex items-center text-xs font-semibold",
                  metric.positive ? "text-emerald-400" : "text-rose-400"
                )}>
                  {metric.positive ? <ArrowUpRight className="w-3 h-3 mr-1" /> : <ArrowDownRight className="w-3 h-3 mr-1" />}
                  {metric.change}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...spring, delay: 0.3 }}
        className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md overflow-hidden shadow-xl relative"
      >
        <div className="p-4 border-b border-white/10 flex items-center justify-between">
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Search leads..." 
              className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-4 py-2 text-sm text-white placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-muted-foreground bg-white/5">
              <tr>
                <th className="px-6 py-4 font-medium">Lead Name</th>
                <th className="px-6 py-4 font-medium">Company</th>
                <th className="px-6 py-4 font-medium">Source</th>
                <th className="px-6 py-4 font-medium">Value</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10 text-white">
              {leads.map((lead) => (
                <tr key={lead.id} className="hover:bg-white/5 transition-colors group">
                  <td className="px-6 py-4 font-medium flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xs">
                      {lead.name.charAt(0)}
                    </div>
                    {lead.name}
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">{lead.company}</td>
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-1 rounded-md bg-white/10 text-xs font-medium">
                      {lead.source}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-mono">{lead.value}</td>
                  <td className="px-6 py-4">
                    <span className={cn(
                      "px-2.5 py-1 rounded-full text-xs font-medium border",
                      lead.status === "Hot" ? "bg-rose-500/10 text-rose-400 border-rose-500/20" :
                      lead.status === "Warm" ? "bg-amber-500/10 text-amber-400 border-amber-500/20" :
                      "bg-blue-500/10 text-blue-400 border-blue-500/20"
                    )}>
                      {lead.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 hover:bg-white/10 rounded-lg text-muted-foreground hover:text-white transition-colors">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
