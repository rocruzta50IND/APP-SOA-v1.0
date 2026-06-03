"use client";

import { DashboardShell } from "@/components/ui/DashboardShell";
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  PieChart, 
  Pie, 
  Cell,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend,
  AreaChart,
  Area
} from "recharts";
import { 
  TrendingUp, 
  Users, 
  Target, 
  Zap,
  ArrowUpRight,
  Download
} from "lucide-react";
import { cn } from "@/lib/utils";

const growthData = [
  { month: "Jan", headcount: 120, revenue: 400 },
  { month: "Feb", headcount: 135, revenue: 450 },
  { month: "Mar", headcount: 150, revenue: 520 },
  { month: "Apr", headcount: 180, revenue: 610 },
  { month: "May", headcount: 210, revenue: 750 },
  { month: "Jun", headcount: 250, revenue: 900 },
];

const performanceData = [
  { name: "Tech", score: 85 },
  { name: "Sales", score: 92 },
  { name: "Product", score: 78 },
  { name: "HR", score: 88 },
  { name: "Design", score: 95 },
];

const sourceData = [
  { name: "LinkedIn", value: 45, color: "#6366f1" },
  { name: "Referrals", value: 25, color: "#8b5cf6" },
  { name: "Direct", value: 20, color: "#ec4899" },
  { name: "Agencies", value: 10, color: "#f43f5e" },
];

export default function AnalyticsPage() {
  return (
    <DashboardShell>
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
              Advanced Analytics
            </h1>
            <p className="text-muted-foreground mt-1">Deep insights into your organization's performance and growth.</p>
          </div>
          <button className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm font-medium hover:bg-white/10 transition-colors flex items-center gap-2">
            <Download className="h-4 w-4" />
            Generate PDF Report
          </button>
        </div>

        {/* Analytics Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Growth Chart */}
          <div className="lg:col-span-2 bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-lg font-semibold text-white">Headcount & Revenue Growth</h3>
                <p className="text-sm text-muted-foreground">Correlation between talent and financial scaling.</p>
              </div>
              <div className="flex items-center gap-2 text-emerald-400 text-sm font-bold">
                <TrendingUp className="h-4 w-4" />
                +28.5% Growth
              </div>
            </div>
            <div className="h-[350px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={growthData}>
                  <defs>
                    <linearGradient id="colorHeadcount" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ffffff10" />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1e1b4b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff' }}
                  />
                  <Area type="monotone" dataKey="headcount" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorHeadcount)" />
                  <Area type="monotone" dataKey="revenue" stroke="#ec4899" strokeWidth={3} fillOpacity={0} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Sourcing Breakdown */}
          <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl">
            <h3 className="text-lg font-semibold text-white mb-6">Candidate Sources</h3>
            <div className="h-[250px] w-full">
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
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-3 mt-4">
              {sourceData.map((source) => (
                <div key={source.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full" style={{ backgroundColor: source.color }} />
                    <span className="text-sm text-muted-foreground">{source.name}</span>
                  </div>
                  <span className="text-sm font-bold text-white">{source.value}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Performance Bar */}
          <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl">
            <h3 className="text-lg font-semibold text-white mb-6">Departmental Performance</h3>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ffffff10" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                  <YAxis hide />
                  <Tooltip 
                    cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                    contentStyle={{ backgroundColor: '#1e1b4b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff' }}
                  />
                  <Bar dataKey="score" fill="#6366f1" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Strategic Insights */}
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-primary/20 to-transparent border border-white/10 p-6 rounded-2xl relative overflow-hidden group">
              <Zap className="absolute -right-4 -bottom-4 h-24 w-24 text-primary/10 group-hover:scale-110 transition-transform" />
              <h4 className="text-white font-bold flex items-center gap-2 mb-2">
                <Target className="h-4 w-4 text-primary" />
                Hiring Velocity
              </h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Your hiring velocity has increased by <span className="text-white font-bold">12%</span> this month. We recommend opening 3 more positions in Engineering to maintain momentum.
              </p>
            </div>
            <div className="bg-gradient-to-br from-emerald-500/10 to-transparent border border-white/10 p-6 rounded-2xl relative overflow-hidden group">
              <TrendingUp className="absolute -right-4 -bottom-4 h-24 w-24 text-emerald-500/10 group-hover:scale-110 transition-transform" />
              <h4 className="text-white font-bold flex items-center gap-2 mb-2">
                <Users className="h-4 w-4 text-emerald-400" />
                Retention Rate
              </h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Employee retention is at an all-time high of <span className="text-white font-bold">96.4%</span>. The new remote-work policy is showing significant positive impact.
              </p>
            </div>
          </div>

        </div>
      </div>
    </DashboardShell>
  );
}
