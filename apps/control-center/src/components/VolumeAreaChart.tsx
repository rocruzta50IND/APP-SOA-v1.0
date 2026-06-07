"use client";

import React, { useEffect, useState } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export function VolumeAreaChart() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCharts = async () => {
      if (window.electronAPI?.getDashboardChartsData) {
        try {
          const res = await window.electronAPI.getDashboardChartsData();
          if (res.byDate) {
            // Transform { "2023-01-01": 5 } to [{ date: "2023-01-01", count: 5 }]
            const formatted = Object.keys(res.byDate)
              .sort()
              .map(date => ({ date, count: res.byDate[date] }));
            setData(formatted);
          }
        } catch (e) {
          console.error("Failed to load chart data", e);
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
      <h2 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Volume de Forjas</h2>
      <div className="flex-1 min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f97316" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#3f3f46" vertical={false} />
            <XAxis dataKey="date" stroke="#a1a1aa" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke="#a1a1aa" fontSize={12} tickLine={false} axisLine={false} allowDecimals={false} />
            <Tooltip 
              contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', color: '#fff', borderRadius: '8px' }}
              itemStyle={{ color: '#f97316' }}
            />
            <Area type="monotone" dataKey="count" stroke="#f97316" strokeWidth={2} fillOpacity={1} fill="url(#colorCount)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
