"use client";

import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { motion } from "framer-motion";
import { Search, Filter, Plus, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

const candidates = [
  { id: "1", name: "Marcus Aurelius", role: "Creative Director", status: "Interview", match: "98%", source: "Direct Headhunt" },
  { id: "2", name: "Sophia Loren", role: "Senior VP of Engineering", status: "Offer", match: "94%", source: "LinkedIn Premium" },
  { id: "3", name: "Dante Alighieri", role: "Chief Security Officer", status: "Screening", match: "89%", source: "Internal Referral" },
  { id: "4", name: "Isabella d'Este", role: "Head of Talent", status: "Hired", match: "100%", source: "Executive Search" },
  { id: "5", name: "Leonardo da Vinci", role: "Fullstack Polymath", status: "Technical Assessment", match: "99%", source: "GitHub Portfolio" },
];

const statusStyles: Record<string, string> = {
  "Interview": "text-primary border-primary/30 bg-primary/5",
  "Offer": "text-emerald-500 border-emerald-500/30 bg-emerald-500/5",
  "Screening": "text-blue-500 border-blue-500/30 bg-blue-500/5",
  "Hired": "text-muted-foreground border-muted-foreground/30 bg-muted-foreground/5",
  "Technical Assessment": "text-amber-500 border-amber-500/30 bg-amber-500/5",
};

export default function RecruitmentPage() {
  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header Section */}
        <section className="flex flex-col md:flex-row justify-between items-end gap-8">
          <div className="space-y-4">
            <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-primary">Talent Acquisition</span>
            <h1 className="font-serif text-6xl md:text-8xl tracking-tighter leading-none">
              Elite <br />
              <span className="text-muted-foreground/20">Pipeline</span>
            </h1>
          </div>
          <div className="flex gap-4">
            <button className="flex items-center gap-2 px-8 py-4 border border-border/50 text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-muted/50 transition-all duration-500 rounded-full">
              <Filter className="w-3 h-3" /> Filter
            </button>
            <button className="flex items-center gap-2 px-8 py-4 bg-foreground text-background text-[10px] uppercase tracking-[0.2em] font-bold hover:opacity-80 transition-all duration-500 rounded-full shadow-2xl">
              <Plus className="w-3 h-3" /> New Search
            </button>
          </div>
        </section>

        {/* Search Bar */}
        <section className="relative">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input 
            type="text" 
            placeholder="SEARCH BY NAME, ROLE OR COMPETENCY..." 
            className="w-full bg-card/30 border border-border/50 py-6 pl-16 pr-8 text-[10px] uppercase tracking-[0.2em] font-bold focus:outline-none focus:border-primary/50 transition-colors"
          />
        </section>

        {/* Candidate List */}
        <section className="space-y-4">
          <div className="grid grid-cols-12 px-8 py-4 text-[8px] uppercase tracking-[0.3em] font-black text-muted-foreground/50">
            <div className="col-span-4">Candidate Identity</div>
            <div className="col-span-3">Target Role</div>
            <div className="col-span-2">Current Status</div>
            <div className="col-span-2">Al Match</div>
            <div className="col-span-1 text-right">Actions</div>
          </div>

          <div className="space-y-2">
            {candidates.map((candidate, index) => (
              <motion.div
                key={candidate.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="grid grid-cols-12 items-center px-8 py-8 border border-border/50 bg-card/30 hover:bg-card/50 transition-all duration-500 group cursor-pointer"
              >
                <div className="col-span-4 flex items-center gap-4">
                  <div className="w-12 h-12 bg-muted border border-border/50 flex items-center justify-center font-serif text-lg group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-700">
                    {candidate.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest leading-none">{candidate.name}</p>
                    <p className="text-[8px] text-muted-foreground uppercase tracking-widest mt-1.5">{candidate.source}</p>
                  </div>
                </div>
                <div className="col-span-3">
                  <p className="text-[10px] font-bold uppercase tracking-widest">{candidate.role}</p>
                </div>
                <div className="col-span-2">
                  <span className={cn(
                    "px-3 py-1 border text-[8px] font-bold uppercase tracking-widest",
                    statusStyles[candidate.status] || "text-muted-foreground border-border bg-muted/5"
                  )}>
                    {candidate.status}
                  </span>
                </div>
                <div className="col-span-2">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-1 bg-muted/30 overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: candidate.match }}
                        transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
                        className="h-full bg-primary"
                      />
                    </div>
                    <span className="text-[8px] font-bold tracking-widest">{candidate.match}</span>
                  </div>
                </div>
                <div className="col-span-1 text-right">
                  <button className="text-muted-foreground hover:text-foreground">
                    <MoreHorizontal className="w-4 h-4 ml-auto" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Footer Note */}
        <section className="pt-16 border-t border-border/50 flex justify-between items-center text-muted-foreground/50">
          <p className="text-[8px] uppercase tracking-[0.3em] font-bold italic">End of Current Selection Cycle</p>
          <p className="text-[8px] uppercase tracking-[0.3em] font-bold underline cursor-pointer hover:text-primary transition-colors">Load Historical Data</p>
        </section>
      </div>
    </DashboardLayout>
  );
}
