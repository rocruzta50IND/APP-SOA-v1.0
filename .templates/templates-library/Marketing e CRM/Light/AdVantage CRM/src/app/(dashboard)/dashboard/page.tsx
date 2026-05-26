"use client";

import { 
  ArrowUpRight, 
  ArrowDownRight, 
  Users, 
  Target, 
  Zap, 
  TrendingUp 
} from "lucide-react";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from "recharts";
import { cn } from "@/lib/utils";

const data = [
  { name: "Jan", revenue: 4000, leads: 2400 },
  { name: "Feb", revenue: 3000, leads: 1398 },
  { name: "Mar", revenue: 2000, leads: 9800 },
  { name: "Apr", revenue: 2780, leads: 3908 },
  { name: "May", revenue: 1890, leads: 4800 },
  { name: "Jun", revenue: 2390, leads: 3800 },
  { name: "Jul", revenue: 3490, leads: 4300 },
];

const kpis = [
  {
    name: "Total Revenue",
    value: "$128,430",
    change: "+12.5%",
    trend: "up",
    icon: TrendingUp,
  },
  {
    name: "Active Leads",
    value: "2,840",
    change: "+4.2%",
    trend: "up",
    icon: Target,
  },
  {
    name: "Conversion Rate",
    value: "3.24%",
    change: "-0.8%",
    trend: "down",
    icon: Zap,
  },
  {
    name: "New Contacts",
    value: "142",
    change: "+18.2%",
    trend: "up",
    icon: Users,
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard Overview</h1>
        <p className="text-muted-foreground text-sm">Welcome back, here's what's happening today.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi) => (
          <div 
            key={kpi.name} 
            className="p-6 border border-border/50 rounded-none bg-white hover:border-black/20 transition-colors"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">
                {kpi.name}
              </span>
              <kpi.icon className="w-4 h-4 text-muted-foreground" />
            </div>
            <div className="flex items-end justify-between">
              <div className="text-2xl font-black tracking-tighter">{kpi.value}</div>
              <div className={cn(
                "flex items-center text-xs font-medium",
                kpi.trend === "up" ? "text-emerald-600" : "text-rose-600"
              )}>
                {kpi.change}
                {kpi.trend === "up" ? (
                  <ArrowUpRight className="w-3 h-3 ml-0.5" />
                ) : (
                  <ArrowDownRight className="w-3 h-3 ml-0.5" />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 p-6 border border-border/50 rounded-none bg-white">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Revenue Performance</h3>
              <p className="text-2xl font-black tracking-tighter">$42,500.00 <span className="text-sm font-normal text-muted-foreground tracking-normal ml-2">last 30 days</span></p>
            </div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#000" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#000" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 12, fill: "#888" }}
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 12, fill: "#888" }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "#fff", 
                    border: "1px solid #eee",
                    borderRadius: "0px",
                    boxShadow: "none"
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#000" 
                  strokeWidth={2}
                  fillOpacity={1} 
                  fill="url(#colorRevenue)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="p-6 border border-border/50 rounded-none bg-white">
          <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-6">Recent Activity</h3>
          <div className="space-y-6">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex gap-4">
                <div className="w-8 h-8 rounded-none bg-muted flex items-center justify-center text-[10px] font-bold">
                  {i}
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none">New lead generated: Sarah Jenkins</p>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-widest">Enterprise Campaign • 2h ago</p>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-8 py-2 text-[10px] uppercase tracking-widest font-bold border border-black hover:bg-black hover:text-white transition-colors">
            View All Activity
          </button>
        </div>
      </div>
    </div>
  );
}
