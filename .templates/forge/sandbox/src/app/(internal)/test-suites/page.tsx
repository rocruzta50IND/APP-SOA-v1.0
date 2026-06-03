"use client";

import React from "react";
import { 
  Layers, 
  Search, 
  Filter, 
  Plus, 
  MoreVertical, 
  Play, 
  FileCode, 
  History,
  ShieldCheck,
  Zap,
  Clock
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const suites = [
  { 
    name: "Auth & Security", 
    description: "End-to-end authentication and RBAC validation suites.",
    tests: 42, 
    coverage: "98%", 
    lastRun: "2h ago", 
    status: "healthy",
    owner: "Security Team"
  },
  { 
    name: "Payment Gateway", 
    description: "Stripe integration and transaction integrity tests.",
    tests: 28, 
    coverage: "94%", 
    lastRun: "15m ago", 
    status: "healthy",
    owner: "Fintech Squad"
  },
  { 
    name: "Core API V2", 
    description: "REST endpoint validation and schema compliance.",
    tests: 156, 
    coverage: "88%", 
    lastRun: "5m ago", 
    status: "warning",
    owner: "Backend Infra"
  },
  { 
    name: "Inventory Sync", 
    description: "Real-time stock updates and race condition checks.",
    tests: 64, 
    coverage: "91%", 
    lastRun: "1d ago", 
    status: "healthy",
    owner: "Commerce Team"
  },
  { 
    name: "Mobile Onboarding", 
    description: "React Native flow validation across iOS/Android.",
    tests: 35, 
    coverage: "82%", 
    lastRun: "4h ago", 
    status: "healthy",
    owner: "Mobile Squad"
  },
  { 
    name: "Legacy Support", 
    description: "Backwards compatibility tests for V1 endpoints.",
    tests: 12, 
    coverage: "100%", 
    lastRun: "1w ago", 
    status: "healthy",
    owner: "Backend Infra"
  },
];

export default function TestSuitesPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tighter text-white">Test Suites</h1>
          <p className="text-muted-foreground">Manage and organize your automated test collections.</p>
        </div>
        <button className="flex h-10 items-center gap-2 rounded-xl bg-primary px-4 text-sm font-medium text-white shadow-[0_0_15px_rgba(79,70,229,0.3)] hover:bg-primary/90 transition-all">
          <Plus className="h-4 w-4" />
          Create Suite
        </button>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search suites by name, owner or tags..."
            className="h-10 w-full rounded-xl border border-white/10 bg-white/5 pl-10 pr-4 text-sm text-white focus:border-primary/50 outline-none"
          />
        </div>
        <button className="flex h-10 items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 text-sm font-medium text-white hover:bg-white/10">
          <Filter className="h-4 w-4" />
          Filters
        </button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {suites.map((suite, i) => (
          <motion.div
            key={suite.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05, type: "spring", stiffness: 400, damping: 30 }}
            className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md hover:border-white/20 hover:bg-white/10 transition-all"
          >
            <div>
              <div className="flex items-start justify-between mb-4">
                <div className="rounded-xl bg-primary/10 p-2.5 text-primary">
                  <Layers className="h-5 w-5" />
                </div>
                <div className="flex items-center gap-2">
                  <span className={cn(
                    "flex h-2 w-2 rounded-full",
                    suite.status === "healthy" ? "bg-emerald-400" : "bg-amber-400"
                  )} />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{suite.status}</span>
                </div>
              </div>

              <h3 className="text-lg font-bold text-white group-hover:text-primary transition-colors">{suite.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{suite.description}</p>
            </div>

            <div className="mt-8">
              <div className="mb-4 grid grid-cols-2 gap-4">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Coverage</p>
                  <p className="text-lg font-mono font-bold text-white">{suite.coverage}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Tests</p>
                  <p className="text-lg font-mono font-bold text-white">{suite.tests}</p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-white/5">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Clock className="h-3.5 w-3.5" />
                  {suite.lastRun}
                </div>
                <div className="flex gap-1">
                  <button className="p-2 rounded-lg hover:bg-white/5 text-muted-foreground hover:text-white transition-all">
                    <History className="h-4 w-4" />
                  </button>
                  <button className="p-2 rounded-lg hover:bg-white/5 text-primary transition-all">
                    <Play className="h-4 w-4 fill-current" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
