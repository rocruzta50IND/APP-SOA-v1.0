"use client";

import { cn } from "@/lib/utils";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import { Users, UserPlus, DollarSign, Activity } from "lucide-react";

const revenueData = [
  { name: "Jan", total: 12000 },
  { name: "Feb", total: 15000 },
  { name: "Mar", total: 18000 },
  { name: "Apr", total: 22000 },
  { name: "May", total: 26000 },
  { name: "Jun", total: 32000 },
];

const hiringData = [
  { name: "Engineering", count: 24 },
  { name: "Sales", count: 18 },
  { name: "Marketing", count: 12 },
  { name: "Design", count: 8 },
  { name: "Product", count: 10 },
];

const kpis = [
  { title: "Total Employees", value: "2,853", trend: "+12.5%", icon: Users, positive: true },
  { title: "New Candidates", value: "482", trend: "+24.1%", icon: UserPlus, positive: true },
  { title: "Payroll Run", value: "$1.2M", trend: "-4.2%", icon: DollarSign, positive: false },
  { title: "Engagement Score", value: "94%", trend: "+2.4%", icon: Activity, positive: true },
];

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-1 text-sm">Overview of your organization's HR metrics.</p>
      </div>

      {/* KPIs */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {kpis.map((kpi) => (
          <div key={kpi.title} className="rounded-md border border-border/50 bg-background p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                {kpi.title}
              </span>
              <kpi.icon className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="mt-4 flex items-baseline gap-2">
              <span className="text-3xl font-bold tracking-tighter text-foreground">{kpi.value}</span>
              <span className={cn("text-xs font-medium", kpi.positive ? "text-emerald-500" : "text-rose-500")}>
                {kpi.trend}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Bento Grid */}
      <div className="grid gap-4 lg:grid-cols-7">
        <div className="rounded-md border border-border/50 bg-background p-6 shadow-sm lg:col-span-4">
          <div className="mb-4">
            <h3 className="text-sm font-medium uppercase tracking-widest text-muted-foreground">Payroll Overview</h3>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ffffff" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#ffffff" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#333" />
                <XAxis dataKey="name" stroke="#888" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#000', borderColor: '#333' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Area type="monotone" dataKey="total" stroke="#fff" fillOpacity={1} fill="url(#colorTotal)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-md border border-border/50 bg-background p-6 shadow-sm lg:col-span-3">
          <div className="mb-4">
            <h3 className="text-sm font-medium uppercase tracking-widest text-muted-foreground">Hiring by Department</h3>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={hiringData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#333" />
                <XAxis dataKey="name" stroke="#888" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  cursor={{ fill: '#222' }}
                  contentStyle={{ backgroundColor: '#000', borderColor: '#333' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Bar dataKey="count" fill="#fff" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}