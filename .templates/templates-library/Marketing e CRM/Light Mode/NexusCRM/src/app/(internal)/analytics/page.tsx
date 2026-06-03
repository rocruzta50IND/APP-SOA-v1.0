"use client";

import React from "react";
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  DollarSign, 
  ArrowUpRight, 
  ArrowDownRight,
  Download,
  Calendar
} from "lucide-react";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { cn } from "@/lib/utils";

const performanceData = [
  { month: "Jan", sales: 4000, conversion: 2.4 },
  { month: "Feb", sales: 3000, conversion: 2.8 },
  { month: "Mar", sales: 2000, conversion: 3.2 },
  { month: "Apr", sales: 2780, conversion: 3.5 },
  { month: "May", sales: 1890, conversion: 4.1 },
  { month: "Jun", sales: 2390, conversion: 3.8 },
  { month: "Jul", sales: 3490, conversion: 4.5 },
];

const sourceData = [
  { name: "Direct Sales", value: 400, color: "#4f46e5" },
  { name: "Marketing", value: 300, color: "#818cf8" },
  { name: "LinkedIn", value: 300, color: "#a5b4fc" },
  { name: "Referrals", value: 200, color: "#c7d2fe" },
];

export default function AnalyticsPage() {
  return (
    <div className="space-y-8 animate-in slide-in-from-right-4 duration-700">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
            Performance Analytics
          </h1>
          <p className="text-muted-foreground mt-1">Deep dive into your CRM data and growth metrics.</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-5 py-2.5 font-medium transition-all hover:bg-white/10">
            <Calendar className="h-4 w-4" />
            Last 30 Days
          </button>
          <button className="flex items-center gap-2 bg-primary text-white hover:bg-primary/90 shadow-[0_0_20px_rgba(79,70,229,0.3)] rounded-xl px-5 py-2.5 font-medium transition-all">
            <Download className="h-4 w-4" />
            Export Report
          </button>
        </div>
      </div>

      {/* Analytics Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold tracking-tight">Revenue vs Conversion</h3>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-primary" />
                <span className="text-xs text-muted-foreground font-medium">Sales</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-emerald-500" />
                <span className="text-xs text-muted-foreground font-medium">Conv %</span>
              </div>
            </div>
          </div>
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ffffff05" />
                <XAxis 
                  dataKey="month" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fill: '#71717a', fontSize: 12}}
                  dy={10}
                />
                <YAxis 
                  yAxisId="left"
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fill: '#71717a', fontSize: 12}}
                />
                <YAxis 
                  yAxisId="right"
                  orientation="right"
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fill: '#71717a', fontSize: 12}}
                />
                <Tooltip 
                  contentStyle={{backgroundColor: '#18181b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px'}}
                  itemStyle={{color: '#fff'}}
                />
                <Line 
                  yAxisId="left"
                  type="monotone" 
                  dataKey="sales" 
                  stroke="#4f46e5" 
                  strokeWidth={3}
                  dot={{ r: 4, fill: "#4f46e5", strokeWidth: 2, stroke: "#09090b" }}
                  activeDot={{ r: 6, strokeWidth: 0 }}
                />
                <Line 
                  yAxisId="right"
                  type="monotone" 
                  dataKey="conversion" 
                  stroke="#10b981" 
                  strokeWidth={3}
                  dot={{ r: 4, fill: "#10b981", strokeWidth: 2, stroke: "#09090b" }}
                  activeDot={{ r: 6, strokeWidth: 0 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8">
          <h3 className="text-xl font-bold tracking-tight mb-8">Lead Sources</h3>
          <div className="h-[250px] w-full mb-8">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={sourceData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {sourceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{backgroundColor: '#18181b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px'}}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-4">
            {sourceData.map((source, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full" style={{ backgroundColor: source.color }} />
                  <span className="text-xs font-medium text-muted-foreground">{source.name}</span>
                </div>
                <span className="text-xs font-bold text-white font-mono">{source.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Secondary Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Customer LTV", value: "$4,250", change: "+12.4%", up: true, icon: DollarSign },
          { label: "Churn Rate", value: "1.2%", change: "-0.5%", up: false, icon: TrendingUp },
          { label: "Sales Velocity", value: "12 days", change: "+2 days", up: true, icon: BarChart3 },
          { label: "Active Users", value: "842", change: "+84", up: true, icon: Users },
        ].map((metric, i) => (
          <div key={i} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4 text-muted-foreground">
              <metric.icon className="h-4 w-4" />
              <span className="text-xs font-bold uppercase tracking-widest">{metric.label}</span>
            </div>
            <div className="flex items-end justify-between">
              <p className="text-2xl font-bold font-mono text-white">{metric.value}</p>
              <div className={cn(
                "flex items-center gap-0.5 text-[10px] font-bold px-1.5 py-0.5 rounded-md",
                metric.up ? "bg-emerald-500/10 text-emerald-400" : "bg-red-500/10 text-red-400"
              )}>
                {metric.up ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                {metric.change}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
