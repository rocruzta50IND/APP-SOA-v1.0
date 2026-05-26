"use client";

import React from "react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  Cell,
  PieChart,
  Pie
} from "recharts";
import { ArrowUpRight, ArrowDownRight, Filter, Download } from "lucide-react";
import { cn } from "@/lib/utils";

const performanceData = [
  { name: "Node A-1", uptime: 99.9, latency: 12, traffic: 4500 },
  { name: "Node A-2", uptime: 98.4, latency: 15, traffic: 3800 },
  { name: "Node B-1", uptime: 99.1, latency: 10, traffic: 5200 },
  { name: "Node B-2", uptime: 99.9, latency: 11, traffic: 4100 },
  { name: "Node C-1", uptime: 97.2, latency: 22, traffic: 2900 },
  { name: "Node C-2", uptime: 99.5, latency: 14, traffic: 4800 },
];

const trafficSourceData = [
  { name: "Direct", value: 45, color: "#4f46e5" },
  { name: "API", value: 30, color: "#6366f1" },
  { name: "Webhooks", value: 15, color: "#818cf8" },
  { name: "Other", value: 10, color: "#a5b4fc" },
];

export default function AnalyticsPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-end justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold tracking-tight text-zinc-100">Deep Analytics</h1>
          <p className="text-zinc-500 text-sm">Detailed performance metrics across all infrastructure nodes.</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-3 py-1.5 bg-zinc-900 border border-zinc-800 rounded-md text-xs font-medium text-zinc-300 hover:bg-zinc-800 transition-colors">
            <Filter className="w-3 h-3" />
            Filter
          </button>
          <button className="flex items-center gap-2 px-3 py-1.5 bg-indigo-600 rounded-md text-xs font-medium text-white hover:bg-indigo-500 transition-colors">
            <Download className="w-3 h-3" />
            Export Data
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Latency Chart */}
        <div className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-lg">
          <h3 className="text-sm font-semibold text-zinc-100 mb-6">Node Latency (ms)</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                <XAxis dataKey="name" stroke="#52525b" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="#52525b" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#18181b', border: '1px solid #27272a', borderRadius: '8px' }}
                  cursor={{ fill: '#27272a' }}
                />
                <Bar dataKey="latency" fill="#4f46e5" radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Traffic Distribution */}
        <div className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-lg">
          <h3 className="text-sm font-semibold text-zinc-100 mb-6">Traffic Distribution</h3>
          <div className="h-[300px] w-full flex items-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={trafficSourceData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {trafficSourceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#18181b', border: '1px solid #27272a', borderRadius: '8px' }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-4 pr-8">
              {trafficSourceData.map((item) => (
                <div key={item.name} className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: item.color }} />
                  <div>
                    <p className="text-xs font-medium text-zinc-200">{item.name}</p>
                    <p className="text-[10px] text-zinc-500">{item.value}%</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Table */}
      <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-zinc-800 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-zinc-100">Node Performance Breakdown</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-zinc-800 bg-zinc-900/30">
                <th className="px-6 py-3 font-medium text-zinc-400">Node Name</th>
                <th className="px-6 py-3 font-medium text-zinc-400">Status</th>
                <th className="px-6 py-3 font-medium text-zinc-400">Uptime</th>
                <th className="px-6 py-3 font-medium text-zinc-400">Latency</th>
                <th className="px-6 py-3 font-medium text-zinc-400 text-right">Throughput</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">
              {performanceData.map((node) => (
                <tr key={node.name} className="hover:bg-zinc-800/30 transition-colors">
                  <td className="px-6 py-4 font-medium text-zinc-200">{node.name}</td>
                  <td className="px-6 py-4">
                    <span className={cn(
                      "inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider",
                      node.uptime > 99 ? "bg-emerald-500/10 text-emerald-400" : "bg-amber-500/10 text-amber-400"
                    )}>
                      {node.uptime > 99 ? "Healthy" : "Degraded"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-zinc-400">{node.uptime}%</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className="text-zinc-200">{node.latency}ms</span>
                      {node.latency < 15 ? <ArrowDownRight className="w-3 h-3 text-emerald-400" /> : <ArrowUpRight className="w-3 h-3 text-amber-400" />}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-zinc-200 text-right">{(node.traffic / 1000).toFixed(1)} GB/s</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
