"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Plus, MoreVertical, Calendar } from "lucide-react";

const columns = [
  { id: "new", title: "New Opportunities" },
  { id: "qualification", title: "Qualification" },
  { id: "proposal", title: "Proposal Sent" },
  { id: "negotiation", title: "Negotiation" },
];

const deals = [
  { id: 1, title: "Enterprise SLA", company: "Stark Industries", value: "$120,000", col: "new", date: "Oct 24" },
  { id: 2, title: "Q3 Marketing Tools", company: "Wayne Ent.", value: "$45,000", col: "new", date: "Oct 22" },
  { id: 3, title: "Cloud Migration", company: "Oscorp", value: "$80,000", col: "qualification", date: "Oct 20" },
  { id: 4, title: "Security Audit", company: "Cyberdyne", value: "$15,000", col: "proposal", date: "Oct 18" },
  { id: 5, title: "Full Platform License", company: "Themyscira", value: "$210,000", col: "negotiation", date: "Oct 15" },
];

const spring = { type: "spring", stiffness: 400, damping: 30 };

export default function PipelinesPage() {
  return (
    <div className="h-full flex flex-col p-8 space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
            Sales Pipeline
          </h1>
          <p className="text-sm text-muted-foreground mt-1">Track deals across all stages of the funnel.</p>
        </div>
        <button className="inline-flex items-center justify-center rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_0_20px_rgba(79,70,229,0.3)] h-10 px-5 text-sm font-medium transition-all">
          <Plus className="w-4 h-4 mr-2" />
          New Deal
        </button>
      </div>

      <div className="flex-1 flex gap-6 overflow-x-auto pb-4">
        {columns.map((col, i) => (
          <motion.div
            key={col.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ ...spring, delay: i * 0.1 }}
            className="flex-shrink-0 w-80 flex flex-col bg-white/[0.02] border border-white/5 rounded-2xl p-4 h-full min-h-[500px]"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-white">{col.title}</h3>
              <span className="text-xs font-mono text-muted-foreground bg-white/10 px-2 py-0.5 rounded-full">
                {deals.filter(d => d.col === col.id).length}
              </span>
            </div>
            
            <div className="space-y-3 flex-1 overflow-y-auto">
              {deals.filter(d => d.col === col.id).map((deal, j) => (
                <motion.div
                  key={deal.id}
                  whileHover={{ scale: 1.02 }}
                  className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-4 cursor-grab active:cursor-grabbing hover:border-white/20 transition-colors relative group"
                >
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="text-muted-foreground hover:text-white">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </div>
                  <h4 className="font-medium text-white text-sm mb-1 pr-6">{deal.title}</h4>
                  <p className="text-xs text-muted-foreground mb-3">{deal.company}</p>
                  
                  <div className="flex items-center justify-between mt-auto pt-3 border-t border-white/5">
                    <span className="text-sm font-mono font-bold text-primary">{deal.value}</span>
                    <div className="flex items-center text-xs text-muted-foreground gap-1">
                      <Calendar className="w-3 h-3" />
                      {deal.date}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <button className="mt-4 w-full py-2 flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-white hover:bg-white/5 rounded-xl transition-colors border border-dashed border-white/10 hover:border-white/20">
              <Plus className="w-4 h-4" />
              Add Deal
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
