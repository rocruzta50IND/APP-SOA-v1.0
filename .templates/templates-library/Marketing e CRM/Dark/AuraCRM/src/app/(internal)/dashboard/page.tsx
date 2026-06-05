"use client";

import React from "react";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from "recharts";
import { 
  TrendingUp, 
  Users, 
  Target, 
  DollarSign, 
  ArrowUpRight, 
  ArrowDownRight,
  MoreHorizontal
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const data = [
  { name: "Jan", value: 4000 },
  { name: "Feb", value: 3000 },
  { name: "Mar", value: 5000 },
  { name: "Apr", value: 2780 },
  { name: "May", value: 1890 },
  { name: "Jun", value: 2390 },
  { name: "Jul", value: 3490 },
];

const stats = [
  {
    title: "Total Revenue",
    value: "$128,430",
    trend: "+12.5%",
    trendUp: true,
    icon: DollarSign,
    color: "text-emerald-500",
  },
  {
    title: "Active Leads",
    value: "2,840",
    trend: "+18.2%",
    trendUp: true,
    icon: Users,
    color: "text-blue-500",
  },
  {
    title: "Conversion Rate",
    value: "3.2%",
    trend: "-2.4%",
    trendUp: false,
    icon: Target,
    color: "text-amber-500",
  },
  {
    title: "Avg. Deal Size",
    value: "$12,500",
    trend: "+4.3%",
    trendUp: true,
    icon: TrendingUp,
    color: "text-purple-500",
  },
];

const recentLeads = [
  { id: 1, name: "Nexus Corp", value: "$45,000", status: "Negotiation", avatar: "NC" },
  { id: 2, name: "Stellar AI", value: "$12,800", status: "Qualified", avatar: "SA" },
  { id: 3, name: "Vertex Media", value: "$8,500", status: "Proposal", avatar: "VM" },
  { id: 4, name: "CloudScale", value: "$32,000", status: "Closed", avatar: "CS" },
  { id: 5, name: "Orbit Solutions", value: "$15,400", status: "New", avatar: "OS" },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
            Overview
          </h1>
          <p className="text-muted-foreground">
            Welcome back, Alex. Here's what's happening with your workspace today.
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">Download Report</Button>
          <Button>Generate Insights</Button>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="relative overflow-hidden">
            <div className={cn("absolute right-0 top-0 h-24 w-24 translate-x-8 translate-y--8 opacity-10 blur-3xl", stat.color.replace('text-', 'bg-'))} />
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className={cn("h-4 w-4", stat.color)} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white font-mono">{stat.value}</div>
              <p className="mt-1 flex items-center text-xs">
                {stat.trendUp ? (
                  <ArrowUpRight className="mr-1 h-3 w-3 text-emerald-500" />
                ) : (
                  <ArrowDownRight className="mr-1 h-3 w-3 text-red-500" />
                )}
                <span className={stat.trendUp ? "text-emerald-500" : "text-red-500"}>
                  {stat.trend}
                </span>
                <span className="ml-1 text-muted-foreground text-[10px]">vs last month</span>
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Revenue Analytics</CardTitle>
                <CardDescription>Monthly revenue growth over the last quarter.</CardDescription>
              </div>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
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
                    tickFormatter={(value) => `$${value}`}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: "rgba(0,0,0,0.8)", 
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: "12px",
                      backdropBlur: "12px"
                    }}
                    itemStyle={{ color: "#fff" }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="value" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={3}
                    fillOpacity={1} 
                    fill="url(#colorValue)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest high-value leads and deals.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {recentLeads.map((lead) => (
                <div key={lead.id} className="flex items-center justify-between group cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 border border-white/10 font-bold text-xs group-hover:bg-primary/20 group-hover:border-primary/50 transition-all">
                      {lead.avatar}
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white">{lead.name}</div>
                      <div className="text-xs text-muted-foreground">{lead.status}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-mono font-bold text-white">{lead.value}</div>
                    <div className="text-[10px] text-muted-foreground">USD</div>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="mt-6 w-full text-xs h-9">
              View All Pipeline
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
