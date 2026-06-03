"use client";

import { DashboardShell } from "@/components/ui/DashboardShell";
import { 
  Users, 
  Briefcase, 
  TrendingUp, 
  Clock,
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
  ResponsiveContainer 
} from "recharts";
import { cn } from "@/lib/utils";

const stats = [
  { name: "Total Candidates", value: "1,284", change: "+12.5%", trending: "up" },
  { name: "Active Employees", value: "452", change: "+3.2%", trending: "up" },
  { name: "Open Positions", value: "24", change: "-2.1%", trending: "down" },
  { name: "Avg. Time to Hire", value: "18d", change: "-4.5%", trending: "up" },
];

const chartData = [
  { name: "Jan", applications: 400, hires: 240 },
  { name: "Feb", applications: 300, hires: 139 },
  { name: "Mar", applications: 200, hires: 980 },
  { name: "Apr", applications: 278, hires: 390 },
  { name: "May", applications: 189, hires: 480 },
  { name: "Jun", applications: 239, hires: 380 },
];

const recentCandidates = [
  { name: "Sarah Chen", role: "Senior Frontend Engineer", status: "Interviewing", score: "94" },
  { name: "Michael Ross", role: "Product Designer", status: "Screening", score: "88" },
  { name: "Elena Gilbert", role: "DevOps Architect", status: "Offer Sent", score: "96" },
  { name: "David Miller", role: "Marketing Lead", status: "Applied", score: "82" },
  { name: "James Wilson", role: "QA Engineer", status: "Interviewing", score: "90" },
];

export default function DashboardPage() {
  return (
    <DashboardShell>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
            Welcome back, Rodrigo
          </h1>
          <p className="text-muted-foreground mt-1">Here's what's happening with your talent pipeline today.</p>
        </div>

        {/* KPI Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <div key={stat.name} className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl hover:border-white/20 transition-all group">
              <div className="flex items-center justify-between mb-4">
                <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                  {stat.name.includes("Candidates") && <Users className="h-5 w-5" />}
                  {stat.name.includes("Employees") && <Briefcase className="h-5 w-5" />}
                  {stat.name.includes("Positions") && <TrendingUp className="h-5 w-5" />}
                  {stat.name.includes("Time") && <Clock className="h-5 w-5" />}
                </div>
                <div className={cn(
                  "flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full",
                  stat.trending === "up" ? "bg-emerald-500/10 text-emerald-400" : "bg-red-500/10 text-red-400"
                )}>
                  {stat.change}
                  {stat.trending === "up" ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                </div>
              </div>
              <p className="text-sm text-muted-foreground font-medium">{stat.name}</p>
              <h3 className="text-2xl font-bold tracking-tighter mt-1 font-mono">{stat.value}</h3>
            </div>
          ))}
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Chart Section */}
          <div className="lg:col-span-2 bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-lg font-semibold text-white">Application Trends</h3>
                <p className="text-sm text-muted-foreground">Monthly overview of talent acquisition.</p>
              </div>
              <select className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50">
                <option>Last 6 months</option>
                <option>Last year</option>
              </select>
            </div>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorApps" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ffffff10" />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#94a3b8', fontSize: 12 }}
                    dy={10}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#94a3b8', fontSize: 12 }}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1e1b4b', 
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '12px',
                      color: '#fff'
                    }} 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="applications" 
                    stroke="#6366f1" 
                    strokeWidth={2}
                    fillOpacity={1} 
                    fill="url(#colorApps)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Recent Candidates List */}
          <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl flex flex-col">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-white">Top Candidates</h3>
              <button className="text-primary text-sm hover:underline">View all</button>
            </div>
            <div className="space-y-4 flex-1">
              {recentCandidates.map((candidate) => (
                <div key={candidate.name} className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/5 transition-colors group">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                    {candidate.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">{candidate.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{candidate.role}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-bold text-emerald-400">{candidate.score}%</p>
                    <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">{candidate.status}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
