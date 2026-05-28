"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  BarChart as BarChartIcon, 
  TrendingUp, 
  Users, 
  DollarSign, 
  Clock, 
  Download,
  Filter
} from "lucide-react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell,
  LineChart,
  Line
} from "recharts";
import { cn } from "@/lib/utils";

const sourceData = [
  { name: "LinkedIn", value: 450, color: "#4F46E5" },
  { name: "Referrals", value: 300, color: "#10B981" },
  { name: "Indeed", value: 200, color: "#F59E0B" },
  { name: "Direct", value: 150, color: "#6366F1" },
  { name: "GitHub", value: 100, color: "#EC4899" },
];

const hiringVelocity = [
  { month: "Jan", days: 24 },
  { month: "Feb", days: 22 },
  { month: "Mar", days: 19 },
  { month: "Apr", days: 21 },
  { month: "May", days: 18 },
  { month: "Jun", days: 16 },
];

const diversityData = [
  { group: "Engineering", hired: 45, goal: 50 },
  { group: "Product", hired: 28, goal: 30 },
  { group: "Design", hired: 15, goal: 20 },
  { group: "Marketing", hired: 32, goal: 35 },
  { group: "Sales", hired: 55, goal: 60 },
];

export default function AnalyticsPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
            Talent Analytics
          </h1>
          <p className="text-muted-foreground mt-1">Deep insights into your hiring performance and pipeline efficiency.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium hover:bg-white/10 transition-all">
            <Filter className="h-4 w-4" />
            Last 6 Months
          </button>
          <button className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-4 py-2 text-sm font-bold text-white hover:bg-white/20 transition-all">
            <Download className="h-4 w-4" />
            Export Report
          </button>
        </div>
      </div>

      {/* High-Level Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Avg. Cost per Hire", value: "$4,250", trend: "-12%", icon: DollarSign },
          { label: "Time to Fill", value: "18 Days", trend: "-4 days", icon: Clock },
          { label: "Offer Accept Rate", value: "84%", trend: "+5%", icon: TrendingUp },
          { label: "Sourcing ROI", value: "4.2x", trend: "+0.8x", icon: BarChartIcon },
        ].map((stat, i) => (
          <div key={i} className="rounded-2xl border border-white/10 bg-white/5 p-6 relative overflow-hidden">
            <div className="flex items-center gap-3 text-muted-foreground mb-3">
              <stat.icon className="h-4 w-4" />
              <span className="text-[10px] uppercase tracking-widest font-bold">{stat.label}</span>
            </div>
            <div className="flex items-end justify-between">
              <span className="text-2xl font-black text-white">{stat.value}</span>
              <span className={cn(
                "text-xs font-bold",
                stat.trend.startsWith('+') ? "text-emerald-400" : "text-emerald-400" // Positive in both cases for efficiency
              )}>{stat.trend}</span>
            </div>
            <div className="absolute -right-2 -bottom-2 h-16 w-16 bg-primary/5 rounded-full blur-2xl" />
          </div>
        ))}
      </div>

      {/* Main Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Sourcing Channels */}
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <h3 className="font-bold mb-8 flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            Candidate Sourcing Channels
          </h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={sourceData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {sourceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} stroke="transparent" />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "rgba(0,0,0,0.8)", 
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "12px"
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
            {sourceData.map((source, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full" style={{ backgroundColor: source.color }} />
                <span className="text-xs text-muted-foreground">{source.name}</span>
                <span className="text-xs font-bold text-white ml-auto">{source.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Hiring Velocity */}
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <h3 className="font-bold mb-8 flex items-center gap-2">
            <Clock className="h-5 w-5 text-primary" />
            Hiring Velocity (Days to Fill)
          </h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={hiringVelocity}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                <XAxis 
                  dataKey="month" 
                  stroke="#ffffff30" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false} 
                />
                <YAxis 
                  stroke="#ffffff30" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false} 
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "rgba(0,0,0,0.8)", 
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "12px"
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="days" 
                  stroke="#4F46E5" 
                  strokeWidth={3} 
                  dot={{ r: 4, fill: "#4F46E5", strokeWidth: 0 }} 
                  activeDot={{ r: 6, strokeWidth: 0 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <p className="mt-4 text-xs text-muted-foreground text-center">
            Velocity improved by <span className="text-emerald-400 font-bold">33%</span> over the last 6 months.
          </p>
        </div>

        {/* Hiring Goals */}
        <div className="lg:col-span-2 rounded-2xl border border-white/10 bg-white/5 p-6">
          <h3 className="font-bold mb-8">Hiring Goals vs. Actuals by Department</h3>
          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={diversityData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                <XAxis 
                  dataKey="group" 
                  stroke="#ffffff30" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false} 
                />
                <YAxis 
                  stroke="#ffffff30" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false} 
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "rgba(0,0,0,0.8)", 
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "12px"
                  }}
                />
                <Bar dataKey="hired" fill="#4F46E5" radius={[4, 4, 0, 0]} barSize={40} />
                <Bar dataKey="goal" fill="#ffffff10" radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-8 mt-4 text-xs">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-sm bg-primary" />
              <span className="text-muted-foreground">Hired</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-sm bg-white/10" />
              <span className="text-muted-foreground">Goal</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
