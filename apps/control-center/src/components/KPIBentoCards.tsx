"use client";

import React, { useEffect, useState } from "react";
import { Box, CheckCircle2, Clock } from "lucide-react";

export function KPIBentoCards() {
  const [kpis, setKpis] = useState({ totalForges: 0, successRate: 0, avgDurationMs: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchKPIs = async () => {
      if (window.electronAPI?.getDashboardKPIs) {
        try {
          const data = await window.electronAPI.getDashboardKPIs();
          setKpis(data);
        } catch (e) {
          console.error("Failed to load KPIs", e);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchKPIs();
  }, []);

  if (loading) return <div className="animate-pulse bg-zinc-900/50 h-32 rounded-2xl border border-white/5" />;

  const avgDurationStr = kpis.avgDurationMs > 0 ? (kpis.avgDurationMs / 1000).toFixed(1) + "s" : "-";

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
      <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5 backdrop-blur-md flex flex-col gap-2 relative overflow-hidden">
        <div className="absolute -right-4 -top-4 w-24 h-24 bg-orange-500/10 rounded-full blur-2xl" />
        <p className="text-zinc-400 text-sm font-medium flex items-center gap-2">
          <Box className="w-4 h-4" /> Total de Forjas
        </p>
        <p className="text-4xl font-bold text-white tracking-tight">{kpis.totalForges}</p>
      </div>
      <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5 backdrop-blur-md flex flex-col gap-2 relative overflow-hidden">
        <div className="absolute -right-4 -top-4 w-24 h-24 bg-green-500/10 rounded-full blur-2xl" />
        <p className="text-zinc-400 text-sm font-medium flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-green-500" /> Taxa de Sucesso
        </p>
        <p className="text-4xl font-bold text-white tracking-tight">{kpis.successRate}%</p>
      </div>
      <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5 backdrop-blur-md flex flex-col gap-2 relative overflow-hidden">
        <div className="absolute -right-4 -top-4 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl" />
        <p className="text-zinc-400 text-sm font-medium flex items-center gap-2">
          <Clock className="w-4 h-4 text-blue-500" /> Tempo Médio
        </p>
        <p className="text-4xl font-bold text-white tracking-tight">{avgDurationStr}</p>
      </div>
    </div>
  );
}
