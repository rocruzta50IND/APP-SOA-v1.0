"use client";

import React from "react";
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Activity, 
  DollarSign, 
  Clock,
  ArrowUpRight,
  MoreHorizontal
} from "lucide-react";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar
} from "recharts";
import { cn } from "@/lib/utils";

// Mock Data
const kpiData = [
  { label: "Total Revenue", value: "$428,291", trend: "+12.5%", positive: true, icon: DollarSign },
  { label: "Active Nodes", value: "2,842", trend: "+3.2%", positive: true, icon: Activity },
  { label: "Total Users", value: "84,291", trend: "-1.4%", positive: false, icon: Users },
  { label: "Avg. Latency", value: "18ms", trend: "-22%", positive: true, icon: Clock },
];

const chartData = [
  { month: "Jan", revenue: 45000, nodes: 2100 },
  { month: "Feb", revenue: 52000, nodes: 2300 },
  { month: "Mar", revenue: 48000, nodes: 2200 },
  { month: "Apr", revenue: 61000, nodes: 2600 },
  { month: "May", revenue: 55000, nodes: 2400 },
  { month: "Jun", revenue: 67000, nodes: 2842 },
];

const recentActivity = [
  { id: 1, type: "Integration", name: "AWS S3 Bucket Connected", time: "2m ago", status: "Success" },
  { id: 2, type: "Security", name: "New API Key Generated", time: "15m ago", status: "Warning" },
  { id: 3, type: "System", name: "Database Backup Completed", time: "1h ago", status: "Success" },
  { id: 4, type: "Alert", name: "High Memory Usage Detected", time: "3h ago", status: "Critical" },
  { id: 5, type: "User", name: "New Admin User Added", time: "5h ago", status: "Success" },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold tracking-tight text-zinc-100">System Overview</h1>
        <p className="text-zinc-500 text-sm">Real-time performance metrics and active system nodes.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiData.map((kpi) => (
          <div key={kpi.label} className="bg-zinc-900/50 border border-zinc-800 p-5 rounded-lg hover:border-zinc-700 transition-colors">
            <div className="flex items-start justify-between">
              <div className="p-2 bg-zinc-800 rounded-md">
                <kpi.icon className="w-4 h-4 text-indigo-400" />
              </div>
              <div className={cn(
                "flex items-center gap-1 text-[10px] font-bold px-1.5 py-0.5 rounded",
                kpi.positive ? "text-emerald-400 bg-emerald-400/10" : "text-rose-400 bg-rose-400/10"
              )}>
                {kpi.positive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                {kpi.trend}
              </div>
            </div>
            <div className="mt-4">
              <p className="text-zinc-500 text-xs font-medium uppercase tracking-wider">{kpi.label}</p>
              <h3 className="text-2xl font-bold text-zinc-100 mt-1">{kpi.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Chart */}
        <div className="lg:col-span-2 bg-zinc-900/50 border border-zinc-800 p-6 rounded-lg">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-sm font-semibold text-zinc-100">Revenue & Infrastructure Growth</h3>
              <p className="text-xs text-zinc-500 mt-1">Net performance over the last 6 months.</p>
            </div>
            <button className="text-zinc-500 hover:text-zinc-100 transition-colors">
              <MoreHorizontal className="w-4 h-4" />
            </button>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                <XAxis 
                  dataKey="month" 
                  stroke="#52525b" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false} 
                />
                <YAxis 
                  stroke="#52525b" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false} 
                  tickFormatter={(value) => `$${value/1000}k`}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#18181b', border: '1px solid #27272a', borderRadius: '8px' }}
                  itemStyle={{ color: '#f4f4f5' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#4f46e5" 
                  fillOpacity={1} 
                  fill="url(#colorRevenue)" 
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Side List */}
        <div className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-lg">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-sm font-semibold text-zinc-100">System Activity</h3>
            <Link href="/analytics" className="text-xs text-indigo-400 hover:text-indigo-300 font-medium">View all</Link>
          </div>
          <div className="space-y-6">
            {recentActivity.map((item) => (
              <div key={item.id} className="flex items-start gap-4">
                <div className={cn(
                  "w-2 h-2 mt-1.5 rounded-full shrink-0",
                  item.status === "Success" ? "bg-emerald-500" : 
                  item.status === "Warning" ? "bg-amber-500" : "bg-rose-500"
                )} />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-zinc-200 truncate">{item.name}</p>
                  <p className="text-[10px] text-zinc-500 mt-1">{item.type} • {item.time}</p>
                </div>
                <button className="text-zinc-600 hover:text-zinc-100">
                  <ArrowUpRight className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
          <button className="w-full mt-8 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-medium rounded transition-colors border border-zinc-700">
            Generate Full Report
          </button>
        </div>
      </div>
    </div>
  );
}

// Minimal Link stub since we are using physical pages
function Link({ href, children, className }: any) {
  return <a href={href} className={className}>{children}</a>;
}
