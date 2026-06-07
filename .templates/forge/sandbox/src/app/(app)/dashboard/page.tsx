"use client";

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { ArrowUpRight, ArrowDownRight, Clock, CheckCircle2, AlertCircle } from 'lucide-react';
import { cn } from "@/lib/utils";

const mockRevenueData = [
  { name: 'Jan', value: 4000 },
  { name: 'Feb', value: 3000 },
  { name: 'Mar', value: 5000 },
  { name: 'Apr', value: 4500 },
  { name: 'May', value: 6000 },
  { name: 'Jun', value: 5500 },
  { name: 'Jul', value: 7000 },
];

const mockTaskData = [
  { name: 'Mon', completed: 12, pending: 4 },
  { name: 'Tue', completed: 15, pending: 3 },
  { name: 'Wed', completed: 10, pending: 8 },
  { name: 'Thu', completed: 18, pending: 2 },
  { name: 'Fri', completed: 14, pending: 5 },
  { name: 'Sat', completed: 5, pending: 1 },
  { name: 'Sun', completed: 3, pending: 0 },
];

export default function DashboardPage() {
  return (
    <div className="p-8 space-y-8 max-w-[1600px] mx-auto animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground mt-1 text-sm">Welcome back. Here is your overview for today.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 border border-border rounded-md text-sm font-medium hover:bg-muted/50 transition-colors">
            Download Report
          </button>
          <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:opacity-90 transition-opacity">
            Create Board
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Revenue", value: "$45,231.89", trend: "+20.1%", positive: true },
          { label: "Active Boards", value: "24", trend: "+4", positive: true },
          { label: "Tasks Completed", value: "1,204", trend: "+12.5%", positive: true },
          { label: "Blockers", value: "3", trend: "-2", positive: false },
        ].map((kpi, i) => (
          <div key={i} className="rounded-md border border-border bg-background p-6 shadow-sm hover:-translate-y-0.5 transition-transform duration-200 ease-out">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{kpi.label}</span>
              {kpi.positive ? (
                <ArrowUpRight className="w-4 h-4 text-emerald-500" />
              ) : (
                <ArrowDownRight className="w-4 h-4 text-red-500" />
              )}
            </div>
            <div className="mt-4 flex items-baseline gap-2">
              <span className="text-3xl font-black tracking-tight">{kpi.value}</span>
            </div>
            <div className="mt-1 flex items-center gap-1 text-xs">
              <span className={kpi.positive ? "text-emerald-500 font-medium" : "text-red-500 font-medium"}>{kpi.trend}</span>
              <span className="text-muted-foreground">from last month</span>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Bento Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Main Chart */}
        <div className="lg:col-span-2 rounded-md border border-border bg-background shadow-sm flex flex-col">
          <div className="p-6 border-b border-border/50">
            <h3 className="font-semibold leading-none tracking-tight">Revenue Analytics</h3>
            <p className="text-xs text-muted-foreground mt-2">Monthly recurring revenue over time</p>
          </div>
          <div className="p-6 flex-1 min-h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mockRevenueData}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--foreground)" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="var(--foreground)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" opacity={0.5} />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 12, fill: 'var(--muted-foreground)' }} 
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 12, fill: 'var(--muted-foreground)' }} 
                  dx={-10}
                  tickFormatter={(val) => `$${val/1000}k`}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--background)', borderColor: 'var(--border)', borderRadius: '0.3rem', fontSize: '12px' }}
                  itemStyle={{ color: 'var(--foreground)' }}
                  cursor={{ stroke: 'var(--border)', strokeWidth: 1 }}
                />
                <Area type="monotone" dataKey="value" stroke="var(--foreground)" strokeWidth={2} fillOpacity={1} fill="url(#colorValue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Secondary Chart */}
        <div className="rounded-md border border-border bg-background shadow-sm flex flex-col">
          <div className="p-6 border-b border-border/50">
            <h3 className="font-semibold leading-none tracking-tight">Task Velocity</h3>
            <p className="text-xs text-muted-foreground mt-2">Completed vs pending tasks</p>
          </div>
          <div className="p-6 flex-1 min-h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockTaskData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" opacity={0.5} />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 12, fill: 'var(--muted-foreground)' }}
                  dy={10} 
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--background)', borderColor: 'var(--border)', borderRadius: '0.3rem', fontSize: '12px' }}
                  cursor={{ fill: 'var(--muted)', opacity: 0.4 }}
                />
                <Bar dataKey="completed" fill="var(--foreground)" radius={[2, 2, 0, 0]} stackId="a" />
                <Bar dataKey="pending" fill="var(--border)" radius={[2, 2, 0, 0]} stackId="a" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Activity List */}
      <div className="rounded-md border border-border bg-background shadow-sm">
        <div className="p-6 border-b border-border/50 flex items-center justify-between">
          <div>
            <h3 className="font-semibold leading-none tracking-tight">Recent Activity</h3>
            <p className="text-xs text-muted-foreground mt-2">Latest updates across all your boards.</p>
          </div>
          <button className="text-xs font-medium text-muted-foreground hover:text-foreground transition-colors uppercase tracking-widest">
            View All
          </button>
        </div>
        <div className="p-0">
          <div className="divide-y divide-border/50">
            {[
              { icon: CheckCircle2, title: "Task Completed", desc: "Landing page redesign finalized", time: "2 hours ago", color: "text-emerald-500" },
              { icon: AlertCircle, title: "Blocker Reported", desc: "Payment gateway integration failing on staging", time: "4 hours ago", color: "text-red-500" },
              { icon: Clock, title: "Sprint Started", desc: "Sprint 42 initialized with 24 story points", time: "Yesterday", color: "text-blue-500" },
              { icon: CheckCircle2, title: "Task Completed", desc: "Update user profile API", time: "Yesterday", color: "text-emerald-500" },
            ].map((activity, i) => (
              <div key={i} className="flex items-center gap-4 p-4 hover:bg-muted/20 transition-colors">
                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center shrink-0">
                  <activity.icon className={cn("w-4 h-4", activity.color)} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{activity.title}</p>
                  <p className="text-xs text-muted-foreground truncate mt-0.5">{activity.desc}</p>
                </div>
                <div className="text-xs text-muted-foreground whitespace-nowrap">
                  {activity.time}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
