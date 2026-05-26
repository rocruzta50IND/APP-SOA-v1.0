"use client";

import React from "react";
import { 
  Plus, 
  Search, 
  ExternalLink, 
  RefreshCw, 
  ShieldCheck,
  Zap,
  Box,
  Cloud,
  Database,
  Lock
} from "lucide-react";
import { cn } from "@/lib/utils";

const integrations = [
  { name: "AWS CloudWatch", category: "Infrastructure", status: "Connected", icon: Cloud, color: "text-orange-400" },
  { name: "Stripe Connect", category: "Payments", status: "Connected", icon: Lock, color: "text-indigo-400" },
  { name: "PostgreSQL Production", category: "Database", status: "Connected", icon: Database, color: "text-blue-400" },
  { name: "Redis Cache", category: "Cache", status: "Error", icon: Zap, color: "text-rose-400" },
  { name: "Slack Alerts", category: "Notifications", status: "Connected", icon: Box, color: "text-emerald-400" },
  { name: "Datadog", category: "Monitoring", status: "Disconnected", icon: ShieldCheck, color: "text-purple-400" },
];

export default function IntegrationsPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-end justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold tracking-tight text-zinc-100">Integrations</h1>
          <p className="text-zinc-500 text-sm">Connect and manage external services and infrastructure components.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 rounded-md text-sm font-medium text-white hover:bg-indigo-500 transition-colors shadow-lg shadow-indigo-900/20">
          <Plus className="w-4 h-4" />
          Add Integration
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {integrations.map((item) => (
          <div key={item.name} className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-lg flex flex-col hover:border-zinc-700 transition-all">
            <div className="flex items-start justify-between mb-6">
              <div className={cn("p-3 bg-zinc-800 rounded-lg", item.color)}>
                <item.icon className="w-6 h-6" />
              </div>
              <span className={cn(
                "text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider",
                item.status === "Connected" ? "bg-emerald-500/10 text-emerald-400" : 
                item.status === "Error" ? "bg-rose-500/10 text-rose-400" : "bg-zinc-800 text-zinc-500"
              )}>
                {item.status}
              </span>
            </div>
            
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-zinc-100">{item.name}</h3>
              <p className="text-xs text-zinc-500 mt-1">{item.category}</p>
            </div>

            <div className="mt-8 pt-4 border-t border-zinc-800 flex items-center justify-between">
              <div className="flex gap-4">
                <button className="text-[11px] font-medium text-zinc-500 hover:text-zinc-100 flex items-center gap-1.5 transition-colors">
                  <RefreshCw className="w-3 h-3" />
                  Sync
                </button>
                <button className="text-[11px] font-medium text-zinc-500 hover:text-zinc-100 flex items-center gap-1.5 transition-colors">
                  <ExternalLink className="w-3 h-3" />
                  Docs
                </button>
              </div>
              <button className="text-[11px] font-medium text-zinc-200 hover:text-white transition-colors">
                Configure
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Recommended Section */}
      <div className="mt-12">
        <h2 className="text-sm font-semibold text-zinc-400 uppercase tracking-widest mb-6">Recommended for you</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center justify-between p-4 bg-zinc-900/30 border border-zinc-800 border-dashed rounded-lg">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-md bg-zinc-800 flex items-center justify-center">
                <Box className="w-5 h-5 text-zinc-600" />
              </div>
              <div>
                <h4 className="text-sm font-medium text-zinc-200">GitHub Actions</h4>
                <p className="text-xs text-zinc-600">Automate your CI/CD workflow.</p>
              </div>
            </div>
            <button className="text-xs font-medium text-indigo-400 hover:text-indigo-300">Connect</button>
          </div>
          <div className="flex items-center justify-between p-4 bg-zinc-900/30 border border-zinc-800 border-dashed rounded-lg">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-md bg-zinc-800 flex items-center justify-center">
                <Database className="w-5 h-5 text-zinc-600" />
              </div>
              <div>
                <h4 className="text-sm font-medium text-zinc-200">MongoDB Atlas</h4>
                <p className="text-xs text-zinc-600">Scale your data with ease.</p>
              </div>
            </div>
            <button className="text-xs font-medium text-indigo-400 hover:text-indigo-300">Connect</button>
          </div>
        </div>
      </div>
    </div>
  );
}
