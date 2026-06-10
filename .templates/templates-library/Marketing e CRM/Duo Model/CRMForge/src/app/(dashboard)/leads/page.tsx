"use client";

import { motion } from "framer-motion";
import { Playfair_Display, Inter } from "next/font/google";
import { MoreHorizontal, ArrowRight, UserPlus, Filter } from "lucide-react";
import { cn } from "@/lib/utils";

const playfair = Playfair_Display({ subsets: ["latin"] });
const inter = Inter({ subsets: ["latin"] });

const mockLeads = [
  { id: "L-001", name: "Eleanor Vance", company: "Vance Vanguard Holdings", value: "$4.2M", status: "Negotiation", date: "Oct 24, 2026" },
  { id: "L-002", name: "Arthur Pendelton", company: "Pendelton Private Wealth", value: "$1.8M", status: "Qualified", date: "Oct 23, 2026" },
  { id: "L-003", name: "Sofia Rostova", company: "Rostova Real Estate Group", value: "$8.5M", status: "Proposal", date: "Oct 21, 2026" },
  { id: "L-004", name: "Marcus Chen", company: "Chen Capital Partners", value: "$3.1M", status: "Contacted", date: "Oct 19, 2026" },
  { id: "L-005", name: "Helena Sterling", company: "Sterling Aviation", value: "$12.0M", status: "Closed Won", date: "Oct 15, 2026" },
  { id: "L-006", name: "Julian Fox", company: "Fox & Co. Associates", value: "$2.4M", status: "Qualified", date: "Oct 12, 2026" },
];

const transitionPhysics = { duration: 1.2, ease: [0.16, 1, 0.3, 1] };

export default function LeadsPage() {
  return (
    <div className="p-12 md:p-24 max-w-7xl mx-auto w-full">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={transitionPhysics}
        className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8"
      >
        <div>
          <div className={cn(inter.className, "text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground mb-4")}>
            CRM Module
          </div>
          <h1 className={cn(playfair.className, "text-6xl md:text-8xl font-bold tracking-tighter leading-none text-foreground")}>
            Private<br/>Leads.
          </h1>
        </div>
        <div className="flex gap-4">
          <button className="h-12 w-12 border border-border/50 flex items-center justify-center hover:bg-muted/30 transition-all duration-300 active:scale-95">
            <Filter className="w-4 h-4 text-foreground" strokeWidth={1.5} />
          </button>
          <button className="inline-flex items-center justify-center transition-all duration-500 bg-foreground text-background hover:opacity-80 px-8 py-3 text-sm font-medium tracking-widest uppercase gap-3 active:scale-95">
            <UserPlus className="w-4 h-4" strokeWidth={1.5} />
            <span>New Lead</span>
          </button>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...transitionPhysics, delay: 0.1 }}
        className="w-full"
      >
        <div className="w-full border-t border-border/50">
          <div className="grid grid-cols-12 gap-4 py-6 border-b border-border/50">
            <div className={cn(inter.className, "col-span-1 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground")}>ID</div>
            <div className={cn(inter.className, "col-span-4 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground")}>Client & Enterprise</div>
            <div className={cn(inter.className, "col-span-3 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground")}>Status</div>
            <div className={cn(inter.className, "col-span-2 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground text-right")}>Est. Value</div>
            <div className={cn(inter.className, "col-span-2 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground text-right")}>Actions</div>
          </div>
          
          <div className="flex flex-col">
            {mockLeads.map((lead, index) => (
              <motion.div
                key={lead.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...transitionPhysics, delay: 0.1 + index * 0.05 }}
                className="grid grid-cols-12 gap-4 py-8 border-b border-border/50 items-center group hover:bg-muted/10 transition-colors duration-500"
              >
                <div className="col-span-1 text-xs font-medium text-muted-foreground tracking-wider">{lead.id}</div>
                <div className="col-span-4 flex flex-col gap-1">
                  <span className="font-serif text-2xl font-bold tracking-tight text-foreground">{lead.name}</span>
                  <span className="text-sm text-muted-foreground">{lead.company}</span>
                </div>
                <div className="col-span-3">
                  <div className="inline-flex items-center px-3 py-1 border border-border/50 text-xs font-medium tracking-wide">
                    {lead.status}
                  </div>
                </div>
                <div className="col-span-2 text-right">
                  <span className="font-serif text-xl tracking-tight text-foreground">{lead.value}</span>
                </div>
                <div className="col-span-2 flex justify-end gap-2">
                  <button className="w-10 h-10 flex items-center justify-center border border-border/50 text-muted-foreground hover:text-foreground hover:border-foreground transition-all duration-300">
                    <MoreHorizontal className="w-4 h-4" strokeWidth={1.5} />
                  </button>
                  <button className="w-10 h-10 flex items-center justify-center bg-foreground text-background hover:opacity-80 transition-all duration-300">
                    <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
