"use client";

import React, { useEffect, useState } from "react";
import { ShieldCheck, ShieldAlert, Activity } from "lucide-react";

export function QualityGateStats() {
  const [qgStats, setQgStats] = useState({ total: 0, passed: 0, failed: 0, avgAttempts: 0, totalAttempts: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCharts = async () => {
      if (window.electronAPI?.getDashboardChartsData) {
        try {
          const res = await window.electronAPI.getDashboardChartsData();
          if (res.qgStats) {
             setQgStats(res.qgStats);
          }
        } catch (e) {
          console.error("Failed to load QG stats", e);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchCharts();
  }, []);

  if (loading) return <div className="animate-pulse bg-zinc-900/50 h-[300px] w-full rounded-2xl border border-white/5" />;

  const passRate = qgStats.total > 0 ? Math.round((qgStats.passed / qgStats.total) * 100) : 0;

  return (
    <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5 backdrop-blur-md w-full flex-1 flex flex-col gap-4">
      <h2 className="text-sm font-bold text-white uppercase tracking-wider">Quality Gate Health</h2>
      
      <div className="flex flex-col gap-4 flex-1 justify-center">
        
        <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/5">
           <div className="flex items-center gap-3">
             <div className="p-2 bg-purple-500/10 rounded-lg text-purple-500">
               <ShieldCheck className="w-5 h-5" />
             </div>
             <div>
               <p className="text-sm font-medium text-white">Pass-Rate Global</p>
               <p className="text-xs text-zinc-500">Gerações validadas</p>
             </div>
           </div>
           <span className="text-xl font-bold font-mono text-purple-400">{passRate}%</span>
        </div>

        <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/5">
           <div className="flex items-center gap-3">
             <div className="p-2 bg-orange-500/10 rounded-lg text-orange-500">
               <Activity className="w-5 h-5" />
             </div>
             <div>
               <p className="text-sm font-medium text-white">Fricção Média</p>
               <p className="text-xs text-zinc-500">Tentativas de auto-cura</p>
             </div>
           </div>
           <span className="text-xl font-bold font-mono text-orange-400">{qgStats.avgAttempts.toFixed(1)}</span>
        </div>

        <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/5">
           <div className="flex items-center gap-3">
             <div className="p-2 bg-red-500/10 rounded-lg text-red-500">
               <ShieldAlert className="w-5 h-5" />
             </div>
             <div>
               <p className="text-sm font-medium text-white">Falhas Fatais</p>
               <p className="text-xs text-zinc-500">Auto-cura esgotada</p>
             </div>
           </div>
           <span className="text-xl font-bold font-mono text-red-400">{qgStats.failed}</span>
        </div>

      </div>
    </div>
  );
}
