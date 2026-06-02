"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
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
import { 
  TrendingUp, 
  Users, 
  MousePointer2, 
  Mail, 
  Globe, 
  Linkedin,
  Filter,
  Download
} from "lucide-react";

const channelData = [
  { name: "LinkedIn", value: 4500, conversion: 12 },
  { name: "Direct", value: 3200, conversion: 8 },
  { name: "Organic", value: 2800, conversion: 15 },
  { name: "Email", value: 2100, conversion: 22 },
  { name: "Referral", value: 1200, conversion: 5 },
];

const conversionData = [
  { name: "Mon", rate: 2.4 },
  { name: "Tue", rate: 3.2 },
  { name: "Wed", rate: 2.8 },
  { name: "Thu", rate: 4.5 },
  { name: "Fri", rate: 3.8 },
  { name: "Sat", rate: 2.1 },
  { name: "Sun", rate: 1.8 },
];

const segmentData = [
  { name: "Enterprise", value: 400, color: "#4f46e5" },
  { name: "Mid-Market", value: 300, color: "#6366f1" },
  { name: "SMB", value: 200, color: "#818cf8" },
  { name: "Strategic", value: 100, color: "#a5b4fc" },
];

export default function AnalyticsPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black tracking-tighter">Insights & Intelligence</h1>
          <p className="text-muted-foreground mt-1">Deep-dive into your ecosystem performance metrics.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl border bg-card hover:bg-muted transition-all text-xs font-bold uppercase tracking-widest">
            <Filter className="h-3 w-3" />
            Segment
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-white hover:bg-primary/90 transition-all text-xs font-bold uppercase tracking-widest shadow-lg shadow-primary/20">
            <Download className="h-3 w-3" />
            Export Data
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Bar Chart */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-2 bg-card/50 backdrop-blur-xl border border-border rounded-3xl p-8"
        >
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-xl font-bold tracking-tight">Channel Performance</h3>
            <div className="flex items-center gap-4 text-xs font-bold">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-primary" />
                <span>Impressions</span>
              </div>
            </div>
          </div>
          <div className="h-[300px] w-full">
            {mounted && (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={channelData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#00000008" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#888' }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#888' }} />
                  <Tooltip 
                    cursor={{ fill: 'rgba(0,0,0,0.02)' }}
                    contentStyle={{ backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #eee' }} 
                  />
                  <Bar dataKey="value" fill="#4f46e5" radius={[6, 6, 0, 0]} barSize={40} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </motion.div>

        {/* Pie Chart */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-card/50 backdrop-blur-xl border border-border rounded-3xl p-8"
        >
          <h3 className="text-xl font-bold tracking-tight mb-8">Market Segmentation</h3>
          <div className="h-[250px] w-full">
            {mounted && (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={segmentData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {segmentData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>
          <div className="space-y-3 mt-4">
            {segmentData.map((s) => (
              <div key={s.name} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full" style={{ backgroundColor: s.color }} />
                  <span className="text-muted-foreground">{s.name}</span>
                </div>
                <span className="font-bold">{s.value}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Avg. Session", value: "4m 32s", trend: "+12%", icon: Globe, color: "text-blue-500" },
          { label: "Lead Velocity", value: "18.5/day", trend: "+5.4%", icon: TrendingUp, color: "text-emerald-500" },
          { label: "CTR Aggregate", value: "3.8%", trend: "-0.2%", icon: MousePointer2, color: "text-indigo-500" },
          { label: "Email Open Avg", value: "44.2%", trend: "+8.1%", icon: Mail, color: "text-amber-500" },
        ].map((metric, i) => (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + (i * 0.1) }}
            className="bg-card border border-border rounded-2xl p-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <metric.icon className={cn("h-5 w-5", metric.color)} />
              <span className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">{metric.label}</span>
            </div>
            <div className="flex items-end justify-between">
              <p className="text-2xl font-black tracking-tighter font-mono">{metric.value}</p>
              <span className={cn(
                "text-xs font-bold",
                metric.trend.startsWith('+') ? "text-emerald-500" : "text-rose-500"
              )}>{metric.trend}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Conversion Rate Line Chart */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6 }}
        className="bg-card/50 backdrop-blur-xl border border-border rounded-3xl p-8"
      >
        <div className="flex justify-between items-center mb-8">
          <div>
            <h3 className="text-xl font-bold tracking-tight">Conversion Velocity</h3>
            <p className="text-sm text-muted-foreground">Weekly aggregate conversion trend</p>
          </div>
        </div>
        <div className="h-[250px] w-full">
          {mounted && (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={conversionData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#00000008" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#888' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#888' }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #eee' }} 
                />
                <Line type="monotone" dataKey="rate" stroke="#4f46e5" strokeWidth={3} dot={{ r: 4, fill: '#4f46e5', strokeWidth: 0 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>
      </motion.div>
    </div>
  );
}