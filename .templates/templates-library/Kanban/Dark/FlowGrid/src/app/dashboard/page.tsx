"use client";

import { cn } from "@/lib/utils";
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
import { ArrowUpRight, ArrowDownRight, Activity, Users, CreditCard, Box } from "lucide-react";

const revenueData = [
  { name: "Jan", total: 1200 },
  { name: "Feb", total: 2100 },
  { name: "Mar", total: 1800 },
  { name: "Apr", total: 2800 },
  { name: "May", total: 2500 },
  { name: "Jun", total: 3400 },
];

const taskData = [
  { name: "Mon", completed: 45, added: 30 },
  { name: "Tue", completed: 52, added: 38 },
  { name: "Wed", completed: 38, added: 42 },
  { name: "Thu", completed: 65, added: 35 },
  { name: "Fri", completed: 48, added: 28 },
  { name: "Sat", completed: 25, added: 15 },
  { name: "Sun", completed: 20, added: 10 },
];

const recentActivities = [
  { id: 1, user: "Alice Walker", action: "completed task", target: "Update Landing Page", time: "2 hours ago", status: "" },
  { id: 2, user: "Bob Smith", action: "commented on", target: "Auth Flow Bug", time: "4 hours ago", status: "" },
  { id: 3, user: "Charlie Davis", action: "moved", target: "Database Migration", status: "In Progress", time: "5 hours ago" },
  { id: 4, user: "Diana Prince", action: "created epic", target: "Q3 Marketing Campaign", time: "1 day ago", status: "" },
  { id: 5, user: "Evan Wright", action: "completed task", target: "Fix Typo in Pricing", time: "1 day ago", status: "" },
];

export default function DashboardPage() {
  return (
    <div className="p-6 lg:p-8 flex flex-col gap-8 max-w-[1600px] mx-auto">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight leading-none">Dashboard</h1>
          <p className="text-sm text-muted-foreground mt-2">
            Overview of your workspace performance and current activities.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <select className="h-9 rounded-md border border-border bg-background px-3 py-1 text-sm text-foreground focus:ring-2 focus:ring-ring focus:outline-none">
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>This Quarter</option>
          </select>
          <button className={cn(
            "inline-flex items-center justify-center rounded-md text-sm font-medium transition-all duration-300 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            "bg-foreground text-background hover:opacity-90 h-9 px-4"
          )}>
            Download Report
          </button>
        </div>
      </div>

      {/* KPI Cards (CSS Grid) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-md border border-border bg-card shadow-sm p-6 flex flex-col hover:-translate-y-1 transition-transform duration-300">
          <div className="flex items-center justify-between pb-2">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-widest">
              Total Revenue
            </span>
            <Activity className="w-4 h-4 text-muted-foreground" />
          </div>
          <div className="flex flex-col gap-1 mt-2">
            <span className="text-3xl font-black tracking-tight">$45,231.89</span>
            <span className="text-sm text-foreground flex items-center gap-1 font-medium">
              <ArrowUpRight className="w-4 h-4" />
              +20.1% from last month
            </span>
          </div>
        </div>

        <div className="rounded-md border border-border bg-card shadow-sm p-6 flex flex-col hover:-translate-y-1 transition-transform duration-300">
          <div className="flex items-center justify-between pb-2">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-widest">
              Active Users
            </span>
            <Users className="w-4 h-4 text-muted-foreground" />
          </div>
          <div className="flex flex-col gap-1 mt-2">
            <span className="text-3xl font-black tracking-tight">+2350</span>
            <span className="text-sm text-foreground flex items-center gap-1 font-medium">
              <ArrowUpRight className="w-4 h-4" />
              +180.1% from last month
            </span>
          </div>
        </div>

        <div className="rounded-md border border-border bg-card shadow-sm p-6 flex flex-col hover:-translate-y-1 transition-transform duration-300">
          <div className="flex items-center justify-between pb-2">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-widest">
              Tasks Completed
            </span>
            <Box className="w-4 h-4 text-muted-foreground" />
          </div>
          <div className="flex flex-col gap-1 mt-2">
            <span className="text-3xl font-black tracking-tight">12,234</span>
            <span className="text-sm text-foreground flex items-center gap-1 font-medium">
              <ArrowUpRight className="w-4 h-4" />
              +19% from last month
            </span>
          </div>
        </div>

        <div className="rounded-md border border-border bg-card shadow-sm p-6 flex flex-col hover:-translate-y-1 transition-transform duration-300">
          <div className="flex items-center justify-between pb-2">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-widest">
              Avg. Resolution
            </span>
            <CreditCard className="w-4 h-4 text-muted-foreground" />
          </div>
          <div className="flex flex-col gap-1 mt-2">
            <span className="text-3xl font-black tracking-tight">2.4 days</span>
            <span className="text-sm text-muted-foreground flex items-center gap-1 font-medium">
              <ArrowDownRight className="w-4 h-4" />
              -1.2% from last month
            </span>
          </div>
        </div>
      </div>

      {/* Main Charts Bento Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-7 gap-6">
        
        {/* Area Chart - Spans 4 cols */}
        <div className="lg:col-span-4 rounded-md border border-border bg-card shadow-sm flex flex-col">
          <div className="p-6 border-b border-border/50">
            <h3 className="font-black leading-none tracking-tight text-lg">Revenue Overview</h3>
            <p className="text-sm text-muted-foreground mt-2">Monthly financial performance</p>
          </div>
          <div className="p-6 pt-8 flex-1 min-h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="currentColor" className="text-foreground" stopOpacity={0.15}/>
                    <stop offset="95%" stopColor="currentColor" className="text-foreground" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="currentColor" className="text-border" />
                <XAxis 
                  dataKey="name" 
                  stroke="currentColor" 
                  className="text-muted-foreground text-xs" 
                  tickLine={false}
                  axisLine={false}
                  dy={10}
                />
                <YAxis 
                  stroke="currentColor" 
                  className="text-muted-foreground text-xs" 
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `$${value}`}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--color-card)', borderColor: 'var(--color-border)', borderRadius: '0.3rem', color: 'var(--color-foreground)' }}
                  itemStyle={{ color: 'var(--color-foreground)' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="total" 
                  stroke="currentColor" 
                  className="text-foreground"
                  fillOpacity={1} 
                  fill="url(#colorTotal)" 
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bar Chart - Spans 3 cols */}
        <div className="lg:col-span-3 rounded-md border border-border bg-card shadow-sm flex flex-col">
          <div className="p-6 border-b border-border/50">
            <h3 className="font-black leading-none tracking-tight text-lg">Task Velocity</h3>
            <p className="text-sm text-muted-foreground mt-2">Completed vs Added per week</p>
          </div>
          <div className="p-6 pt-8 flex-1 min-h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={taskData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="currentColor" className="text-border" />
                <XAxis 
                  dataKey="name" 
                  stroke="currentColor" 
                  className="text-muted-foreground text-xs" 
                  tickLine={false}
                  axisLine={false}
                  dy={10}
                />
                <YAxis 
                  stroke="currentColor" 
                  className="text-muted-foreground text-xs" 
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip 
                  cursor={{fill: 'var(--color-muted)', opacity: 0.4}}
                  contentStyle={{ backgroundColor: 'var(--color-card)', borderColor: 'var(--color-border)', borderRadius: '0.3rem', color: 'var(--color-foreground)' }}
                />
                <Bar dataKey="completed" fill="currentColor" className="text-foreground" radius={[4, 4, 0, 0]} />
                <Bar dataKey="added" fill="currentColor" className="text-muted-foreground" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* Lists / Data Table Area */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Recent Activity List */}
        <div className="rounded-md border border-border bg-card shadow-sm">
          <div className="p-6 border-b border-border/50">
            <h3 className="font-black leading-none tracking-tight text-lg">Recent Activity</h3>
            <p className="text-sm text-muted-foreground mt-2">Latest actions across your workspace</p>
          </div>
          <div className="p-0">
            {recentActivities.map((activity, i) => (
              <div key={activity.id} className={cn(
                "p-4 px-6 flex items-center justify-between hover:bg-muted/30 transition-colors",
                i !== recentActivities.length - 1 && "border-b border-border/50"
              )}>
                <div className="flex items-center gap-4">
                  <div className="w-9 h-9 rounded-full bg-muted flex items-center justify-center text-muted-foreground text-xs font-bold">
                    {activity.user.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-medium leading-none">
                      {activity.user} <span className="text-muted-foreground font-normal">{activity.action}</span>
                    </p>
                    <p className="text-sm font-semibold mt-1">
                      {activity.target} {activity.status && <span className="ml-2 inline-flex items-center rounded-sm bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">{activity.status}</span>}
                    </p>
                  </div>
                </div>
                <div className="text-xs text-muted-foreground whitespace-nowrap">
                  {activity.time}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Performers / Progress Bento */}
        <div className="rounded-md border border-border bg-card shadow-sm p-6 flex flex-col justify-between">
           <div>
              <h3 className="font-black leading-none tracking-tight text-lg">Sprint Progress</h3>
              <p className="text-sm text-muted-foreground mt-2">Current iteration metrics</p>
           </div>
           
           <div className="mt-8 flex flex-col gap-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm font-medium">
                  <span>Design System update</span>
                  <span>75%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                  <div className="h-full bg-foreground w-[75%] rounded-full transition-all duration-500"></div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm font-medium">
                  <span>Authentication Flow</span>
                  <span>100%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                  <div className="h-full bg-foreground w-full rounded-full transition-all duration-500"></div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm font-medium">
                  <span>Database Migration</span>
                  <span>30%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                  <div className="h-full bg-foreground w-[30%] rounded-full transition-all duration-500"></div>
                </div>
              </div>
           </div>

           <div className="mt-8 pt-6 border-t border-border/50">
             <button className={cn(
                "w-full inline-flex items-center justify-center rounded-md text-sm font-medium transition-all duration-300 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                "bg-muted text-foreground hover:bg-muted/80 h-10 px-4"
              )}>
                View Full Sprint Board
             </button>
           </div>
        </div>
      </div>

    </div>
  );
}
