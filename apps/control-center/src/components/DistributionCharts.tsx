"use client";

import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

export function DistributionCharts() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCharts = async () => {
      if (window.electronAPI?.getDashboardChartsData) {
        try {
          const res = await window.electronAPI.getDashboardChartsData();
          if (res.byTier) {
             const formatted = Object.keys(res.byTier)
                .map(tier => ({ 
                  tier: `Tier ${tier}`, 
                  success: res.byTier[tier].success || 0,
                  failed: res.byTier[tier].failed || 0
                }))
                .sort((a, b) => a.tier.localeCompare(b.tier));
             setData(formatted);
          }
        } catch (e) {
          console.error("Failed to load tier data", e);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchCharts();
  }, []);

  if (loading) return <div className="animate-pulse bg-zinc-900/50 h-[300px] w-full rounded-2xl border border-white/5" />;

  return (
    <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5 backdrop-blur-md w-full h-[300px] flex flex-col">
      <h2 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Taxa de Sucesso por Tier</h2>
      <div className="flex-1 min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical" margin={{ top: 0, right: 10, left: 10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#3f3f46" horizontal={false} />
            <XAxis type="number" stroke="#a1a1aa" fontSize={12} tickLine={false} axisLine={false} allowDecimals={false} />
            <YAxis type="category" dataKey="tier" stroke="#a1a1aa" fontSize={12} tickLine={false} axisLine={false} />
            <Tooltip 
              cursor={{ fill: '#27272a' }}
              contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', color: '#fff', borderRadius: '8px' }}
            />
            <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
            <Bar dataKey="success" name="Sucesso" stackId="a" fill="#22c55e" radius={[0, 0, 0, 0]} barSize={20} />
            <Bar dataKey="failed" name="Falha" stackId="a" fill="#ef4444" radius={[0, 4, 4, 0]} barSize={20} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
