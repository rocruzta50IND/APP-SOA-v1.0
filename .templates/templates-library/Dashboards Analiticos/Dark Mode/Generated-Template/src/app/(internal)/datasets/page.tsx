"use client";

import { motion } from "framer-motion";
import { 
  Search, 
  Filter, 
  Download, 
  Plus, 
  MoreHorizontal,
  FileText,
  Database,
  ShieldCheck
} from "lucide-react";
import { cn } from "@/lib/utils";

const datasets = [
  { id: "DS-001", name: "Market Liquidity v2", size: "1.2 TB", lastUpdate: "2h ago", status: "Verified", type: "Financial" },
  { id: "DS-002", name: "User Sentiment Alpha", size: "450 GB", lastUpdate: "12h ago", status: "Verified", type: "Social" },
  { id: "DS-003", name: "Geospatial Vectors", size: "8.4 TB", lastUpdate: "1d ago", status: "Processing", type: "Mapping" },
  { id: "DS-004", name: "Historical Revenue", size: "120 GB", lastUpdate: "3d ago", status: "Verified", type: "Internal" },
  { id: "DS-005", name: "NLP Training Set", size: "15 TB", lastUpdate: "1w ago", status: "Verified", type: "AI/ML" },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
};

const item = {
  hidden: { opacity: 0, x: -10 },
  show: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};

export default function DatasetsPage() {
  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-12"
    >
      <div className="flex justify-between items-end">
        <div>
          <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-primary mb-2 block">
            Data Repository
          </span>
          <h2 className="text-5xl font-serif tracking-tighter">Information Assets</h2>
        </div>
        <button className="px-8 py-4 bg-foreground text-background text-[10px] uppercase tracking-widest font-bold hover:bg-primary transition-all duration-500 rounded-full flex items-center gap-3 group">
          <Plus className="w-3 h-3 group-hover:rotate-90 transition-transform" />
          Ingest New Source
        </button>
      </div>

      <div className="flex items-center gap-4 py-6 border-y border-border/40">
        <div className="flex-1 flex items-center gap-3 px-4 py-2 bg-secondary/20 border border-border/40 group focus-within:border-primary/40 transition-all">
          <Search className="w-4 h-4 text-muted-foreground" />
          <input 
            type="text" 
            placeholder="FILTER BY ASSET NAME OR ID..." 
            className="bg-transparent border-none outline-none text-[10px] uppercase tracking-widest font-bold w-full"
          />
        </div>
        <button className="px-6 py-2 border border-border/40 flex items-center gap-2 hover:border-primary/40 transition-all">
          <Filter className="w-3 h-3 text-muted-foreground" />
          <span className="text-[9px] uppercase tracking-widest font-bold">Parameters</span>
        </button>
        <button className="px-6 py-2 border border-border/40 flex items-center gap-2 hover:border-primary/40 transition-all">
          <Download className="w-3 h-3 text-muted-foreground" />
          <span className="text-[9px] uppercase tracking-widest font-bold">Export All</span>
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {datasets.map((ds) => (
          <motion.div 
            key={ds.id}
            variants={item}
            className="group flex items-center gap-8 p-6 border border-border/40 bg-background hover:bg-secondary/5 transition-all duration-500 relative"
          >
            <div className="w-12 h-12 bg-secondary/20 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
              <Database className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
            </div>
            
            <div className="flex-1 grid grid-cols-4 gap-8 items-center">
              <div className="col-span-1">
                <span className="text-[8px] uppercase tracking-widest font-bold text-muted-foreground block mb-1">Asset Identity</span>
                <h4 className="font-serif text-lg leading-tight">{ds.name}</h4>
                <span className="text-[9px] font-mono text-muted-foreground">{ds.id}</span>
              </div>
              
              <div>
                <span className="text-[8px] uppercase tracking-widest font-bold text-muted-foreground block mb-1">Volume / Type</span>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold tracking-tight">{ds.size}</span>
                  <div className="w-1 h-1 rounded-full bg-border" />
                  <span className="text-[9px] uppercase tracking-widest font-bold text-primary/60">{ds.type}</span>
                </div>
              </div>

              <div>
                <span className="text-[8px] uppercase tracking-widest font-bold text-muted-foreground block mb-1">Last Sync</span>
                <span className="text-[10px] uppercase tracking-widest font-bold">{ds.lastUpdate}</span>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[8px] uppercase tracking-widest font-bold text-muted-foreground block mb-1">Integrity</span>
                  <div className="flex items-center gap-2">
                    <ShieldCheck className={cn(
                      "w-3 h-3",
                      ds.status === "Verified" ? "text-emerald-500" : "text-amber-500"
                    )} />
                    <span className="text-[9px] uppercase tracking-widest font-bold">{ds.status}</span>
                  </div>
                </div>
                
                <button className="p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="flex justify-between items-center pt-8">
        <span className="text-[9px] uppercase tracking-[0.2em] font-bold text-muted-foreground">Showing 5 of 128 registered assets</span>
        <div className="flex gap-2">
          {[1, 2, 3, "...", 12].map((p, i) => (
            <button key={i} className={cn(
              "w-8 h-8 border border-border/40 text-[9px] font-bold flex items-center justify-center hover:border-primary/40 transition-all",
              p === 1 ? "bg-primary text-background border-primary" : ""
            )}>
              {p}
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
