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
  PieChart,
  Pie,
  Cell,
  Legend
} from "recharts";
import { 
  BarChart3, 
  Calendar, 
  Download, 
  Filter,
  ArrowUpRight,
  Zap,
  Clock,
  Globe
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const barData = [
  { name: "Mon", leads: 40, conversions: 24 },
  { name: "Tue", leads: 30, conversions: 18 },
  { name: "Wed", leads: 60, conversions: 35 },
  { name: "Thu", leads: 45, conversions: 28 },
  { name: "Fri", leads: 70, conversions: 42 },
  { name: "Sat", leads: 35, conversions: 20 },
  { name: "Sun", leads: 25, conversions: 12 },
];

const pieData = [
  { name: "Organic Search", value: 400, color: "hsl(var(--primary))" },
  { name: "Paid Ads", value: 300, color: "#9333ea" },
  { name: "Direct", value: 200, color: "#3b82f6" },
  { name: "Social Media", value: 100, color: "#06b6d4" },
];

export default function AnalyticsPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
            Analytics & Insights
          </h1>
          <p className="text-muted-foreground">
            Deep dive into your performance metrics and conversion funnels.
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2">
            <Calendar className="h-4 w-4" />
            Last 30 Days
          </Button>
          <Button variant="outline" size="icon">
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Lead Conversion Funnel</CardTitle>
                <CardDescription>Daily comparison between new leads and successful conversions.</CardDescription>
              </div>
              <Button variant="ghost" size="sm" className="gap-2">
                <Filter className="h-3.5 w-3.5" />
                Filter Data
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[350px] w-full pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barData}>
                  <defs>
                    <linearGradient id="barGradientPrimary" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={1}/>
                      <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0.6}/>
                    </linearGradient>
                    <linearGradient id="barGradientSecondary" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#9333ea" stopOpacity={1}/>
                      <stop offset="100%" stopColor="#9333ea" stopOpacity={0.6}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ffffff10" />
                  <XAxis 
                    dataKey="name" 
                    stroke="#ffffff40" 
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis 
                    stroke="#ffffff40" 
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: "rgba(0,0,0,0.8)", 
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: "12px",
                      backdropBlur: "12px"
                    }}
                    cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                  />
                  <Bar dataKey="leads" fill="url(#barGradientPrimary)" radius={[4, 4, 0, 0]} barSize={20} />
                  <Bar dataKey="conversions" fill="url(#barGradientSecondary)" radius={[4, 4, 0, 0]} barSize={20} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Acquisition Channels</CardTitle>
            <CardDescription>Traffic source distribution.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={8}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: "rgba(0,0,0,0.8)", 
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: "12px",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 space-y-3 w-full">
              {pieData.map((item) => (
                <div key={item.name} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-muted-foreground">{item.name}</span>
                  </div>
                  <span className="font-mono font-bold text-white">{item.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Avg. Session", value: "12m 45s", icon: Clock, change: "+14%" },
          { label: "Bounce Rate", value: "24.8%", icon: Zap, change: "-5%" },
          { label: "Global Reach", value: "142 Countries", icon: Globe, change: "+12" },
          { label: "Growth Rate", value: "18.2%", icon: ArrowUpRight, change: "+2.4%" },
        ].map((item) => (
          <Card key={item.label}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="h-8 w-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
                  <item.icon className="h-4 w-4 text-primary" />
                </div>
                <span className={cn(
                  "text-[10px] font-bold px-1.5 py-0.5 rounded-full border",
                  item.change.startsWith('+') ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" : "bg-red-500/10 text-red-500 border-red-500/20"
                )}>
                  {item.change}
                </span>
              </div>
              <div className="mt-4">
                <p className="text-xs text-muted-foreground">{item.label}</p>
                <p className="text-xl font-mono font-bold text-white mt-1">{item.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
