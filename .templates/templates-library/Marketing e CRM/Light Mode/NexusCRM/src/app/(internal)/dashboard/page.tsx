"use client";

import React from "react";
import { 
  Users, 
  Target, 
  Zap, 
  TrendingUp, 
  ArrowUpRight, 
  ArrowDownRight,
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

const data = [
  { name: "Mon", revenue: 4000, leads: 240 },
  { name: "Tue", revenue: 3000, leads: 198 },
  { name: "Wed", revenue: 2000, leads: 980 },
  { name: "Thu", revenue: 2780, leads: 390 },
  { name: "Fri", revenue: 1890, leads: 480 },
  { name: "Sat", revenue: 2390, leads: 380 },
  { name: "Sun", revenue: 3490, leads: 430 },
];

const stats = [
  { label: "Total Revenue", value: "$128,430", trend: "+12.5%", isPositive: true, icon: TrendingUp },
  { label: "Active Leads", value: "2,840", trend: "+18.2%", isPositive: true, icon: Users },
  { label: "Conversion Rate", value: "3.2%", trend: "-2.4%", isPositive: false, icon: Target },
  { label: "Campaign ROI", value: "4.8x", trend: "+5.1%", isPositive: true, icon: Zap },
];

const recentLeads = [
  { name: "Alex Rivera", company: "TechFlow Solutions", value: "$12,000", status: "Negotiation" },
  { name: "Sarah Chen", company: "Nexus Systems", value: "$8,500", status: "Qualified" },
  { name: "Mark Thompson", company: "CloudScale Inc", value: "$25,000", status: "Proposal" },
  { name: "Elena Rodriguez", company: "Vertex Global", value: "$5,200", status: "Discovery" },
  { name: "James Wilson", company: "DataSync Co", value: "$18,000", status: "Closed" },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
          Executive Overview
        </h1>
        <p className="text-muted-foreground mt-1">Welcome back, Rodrigo. Here's what's happening with NexusCRM today.</p>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <div key={i} className="group relative overflow-hidden bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:border-white/20 hover:bg-white/10 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                <stat.icon className="h-5 w-5" />
              </div>
              <div className={cn(
                "flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-lg",
                stat.isPositive ? "bg-emerald-500/10 text-emerald-400" : "bg-red-500/10 text-red-400"
              )}>
                {stat.isPositive ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                {stat.trend}
              </div>
            </div>
            <p className="text-sm text-muted-foreground font-medium">{stat.label}</p>
            <p className="text-2xl font-bold mt-1 tracking-tight font-mono">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Main Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Area Chart */}
        <div className="lg:col-span-2 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-lg font-semibold">Revenue Performance</h3>
              <p className="text-sm text-muted-foreground">Daily revenue breakdown for the last 7 days</p>
            </div>
            <select className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white outline-none focus:ring-1 focus:ring-primary/50">
              <option>Last 7 days</option>
              <option>Last 30 days</option>
            </select>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ffffff05" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fill: '#71717a', fontSize: 12}}
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fill: '#71717a', fontSize: 12}}
                />
                <Tooltip 
                  contentStyle={{backgroundColor: '#18181b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px'}}
                  itemStyle={{color: '#fff'}}
                />
                <Area 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#4f46e5" 
                  strokeWidth={2}
                  fillOpacity={1} 
                  fill="url(#colorRev)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Lead Activity Bar Chart */}
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6">
          <h3 className="text-lg font-semibold mb-1">Lead Volume</h3>
          <p className="text-sm text-muted-foreground mb-8">New leads per day</p>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ffffff05" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fill: '#71717a', fontSize: 12}}
                  dy={10}
                />
                <Tooltip 
                  contentStyle={{backgroundColor: '#18181b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px'}}
                  cursor={{fill: 'rgba(255,255,255,0.05)'}}
                />
                <Bar dataKey="leads" fill="#4f46e5" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Leads Table */}
      <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <h3 className="text-lg font-semibold">High-Value Opportunities</h3>
          <button className="text-sm text-primary hover:underline font-medium">View all leads</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-white/[0.02] text-muted-foreground text-xs uppercase tracking-wider font-semibold">
                <th className="px-6 py-4">Lead</th>
                <th className="px-6 py-4">Company</th>
                <th className="px-6 py-4">Est. Value</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {recentLeads.map((lead, i) => (
                <tr key={i} className="hover:bg-white/[0.02] transition-colors group">
                  <td className="px-6 py-4 font-medium text-white">{lead.name}</td>
                  <td className="px-6 py-4 text-muted-foreground text-sm">{lead.company}</td>
                  <td className="px-6 py-4 text-sm font-mono">{lead.value}</td>
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase bg-primary/10 text-primary border border-primary/20">
                      {lead.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 hover:bg-white/5 rounded-lg text-muted-foreground hover:text-white transition-all">
                      <MoreHorizontal className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
