"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { 
  Users, 
  TrendingUp, 
  MousePointerClick, 
  DollarSign, 
  ArrowUpRight, 
  ArrowDownRight,
  MoreHorizontal,
  Zap
} from "lucide-react";
import { 
  Area, 
  AreaChart, 
  CartesianGrid, 
  ResponsiveContainer, 
  Tooltip, 
  XAxis, 
  YAxis 
} from "recharts";

const metrics = [
  {
    title: "Total Leads",
    value: "12,450",
    change: "+14.5%",
    trend: "up",
    icon: Users,
    color: "text-blue-500",
  },
  {
    title: "Monthly Revenue",
    value: "$142,300",
    change: "+8.2%",
    trend: "up",
    icon: DollarSign,
    color: "text-emerald-500",
  },
  {
    title: "Conversion Rate",
    value: "4.8%",
    change: "-1.2%",
    trend: "down",
    icon: MousePointerClick,
    color: "text-orange-500",
  },
  {
    title: "Active Campaigns",
    value: "24",
    change: "+4",
    trend: "up",
    icon: TrendingUp,
    color: "text-primary",
  },
];

const chartData = [
  { name: "Jan", leads: 1200, revenue: 12000 },
  { name: "Feb", leads: 1900, revenue: 18000 },
  { name: "Mar", leads: 1500, revenue: 16000 },
  { name: "Apr", leads: 2200, revenue: 24000 },
  { name: "May", leads: 2800, revenue: 29000 },
  { name: "Jun", leads: 3400, revenue: 38000 },
];

const recentLeads = [
  { id: "L-1042", name: "Acme Corp", contact: "john.doe@acme.com", status: "Hot", date: "2 mins ago", value: "$4,500" },
  { id: "L-1043", name: "GlobalTech", contact: "sarah.smith@globaltech.io", status: "Warm", date: "1 hour ago", value: "$12,000" },
  { id: "L-1044", name: "Nexus Industries", contact: "m.johnson@nexus.com", status: "Cold", date: "3 hours ago", value: "$2,100" },
  { id: "L-1045", name: "CyberDyne", contact: "t.connor@cyberdyne.sys", status: "Hot", date: "5 hours ago", value: "$28,000" },
];

const topCampaigns = [
  { name: "Q3 B2B Enterprise Outreach", clicks: "45.2K", conv: "3.2%" },
  { name: "SaaS Retargeting - US", clicks: "32.1K", conv: "4.8%" },
  { name: "Webinar: Future of AI in Sales", clicks: "18.5K", conv: "8.1%" },
];

export default function DashboardPage() {
  return (
    <div className="p-8 space-y-8 max-w-[1600px] mx-auto">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60 mb-2">
            Overview
          </h2>
          <p className="text-muted-foreground">Monitor your critical marketing metrics and lead flow.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className={cn(
            "inline-flex items-center justify-center rounded-xl text-sm font-medium transition-all focus:outline-none disabled:opacity-50",
            "bg-white/5 text-white border border-white/10 hover:bg-white/10 h-10 px-4 py-2"
          )}>
            Download Report
          </button>
          <button className={cn(
            "inline-flex items-center justify-center rounded-xl text-sm font-medium transition-all focus:outline-none disabled:opacity-50",
            "bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_0_20px_rgba(79,70,229,0.3)] h-10 px-5 py-2.5"
          )}>
            Create Campaign
          </button>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, i) => (
          <motion.div
            key={metric.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 30, delay: i * 0.1 }}
            whileHover={{ scale: 1.02 }}
            className="relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6 overflow-hidden group"
          >
            {/* Subtle glow on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            
            <div className="flex justify-between items-start mb-4 relative z-10">
              <div className="p-2 rounded-xl bg-white/5 border border-white/10">
                <metric.icon className={cn("h-5 w-5", metric.color)} />
              </div>
              <div className={cn(
                "flex items-center gap-1 text-sm font-medium px-2 py-1 rounded-full bg-white/5 border border-white/10",
                metric.trend === "up" ? "text-emerald-400" : "text-orange-400"
              )}>
                {metric.trend === "up" ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                {metric.change}
              </div>
            </div>
            
            <div className="relative z-10">
              <h3 className="text-sm font-medium text-muted-foreground mb-1">{metric.title}</h3>
              <p className="text-3xl font-bold tracking-tight text-white font-mono">{metric.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Main Content Bento Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart Section (Takes up 2 columns) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 400, damping: 30, delay: 0.4 }}
          className="lg:col-span-2 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6 flex flex-col"
        >
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="font-semibold text-white tracking-tight">Revenue & Leads Trend</h3>
              <p className="text-sm text-muted-foreground">Performance over the last 6 months</p>
            </div>
            <select className="bg-white/5 border border-white/10 rounded-lg text-sm text-white px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-primary/50">
              <option className="bg-[#09090b]">Last 6 Months</option>
              <option className="bg-[#09090b]">This Year</option>
            </select>
          </div>
          
          <div className="flex-1 min-h-[300px] w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorLeads" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ffffff10" />
                <XAxis dataKey="name" stroke="#a1a1aa" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#a1a1aa" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value / 1000}k`} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(9, 9, 11, 0.9)', 
                    borderColor: 'rgba(255,255,255,0.1)',
                    borderRadius: '12px',
                    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.5)'
                  }}
                  itemStyle={{ color: '#fff' }}
                />
                <Area type="monotone" dataKey="revenue" stroke="hsl(var(--primary))" strokeWidth={2} fillOpacity={1} fill="url(#colorRevenue)" />
                <Area type="monotone" dataKey="leads" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorLeads)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Side Section (1 column) */}
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 30, delay: 0.5 }}
            className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6"
          >
            <h3 className="font-semibold text-white tracking-tight mb-4">Top Campaigns</h3>
            <div className="space-y-4">
              {topCampaigns.map((campaign, i) => (
                <div key={i} className="group relative p-3 rounded-xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/10">
                  <div className="flex justify-between items-start mb-2">
                    <p className="text-sm font-medium text-white truncate pr-4">{campaign.name}</p>
                    <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
                  </div>
                  <div className="flex justify-between items-center text-xs text-muted-foreground font-mono">
                    <span>Clicks: <span className="text-white">{campaign.clicks}</span></span>
                    <span>Conv: <span className="text-emerald-400">{campaign.conv}</span></span>
                  </div>
                  <div className="h-1 w-full bg-white/10 rounded-full mt-3 overflow-hidden">
                    <div 
                      className="h-full bg-primary rounded-full" 
                      style={{ width: `${Math.random() * 40 + 40}%` }} 
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Quick Action Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 30, delay: 0.6 }}
            className="rounded-2xl border border-primary/20 bg-primary/5 backdrop-blur-md p-6 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-primary/20 blur-[50px] rounded-full" />
            <div className="relative z-10">
              <div className="h-10 w-10 rounded-xl bg-primary text-primary-foreground flex items-center justify-center mb-4 shadow-[0_0_15px_rgba(79,70,229,0.4)]">
                <Zap className="h-5 w-5" />
              </div>
              <h3 className="font-semibold text-white tracking-tight mb-2">AI Lead Scoring</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Our AI has identified 12 high-intent leads ready for outreach today.
              </p>
              <button className="text-sm font-medium text-primary hover:text-white transition-colors flex items-center gap-1">
                View insights <ArrowUpRight className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Recent Leads Table / List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 400, damping: 30, delay: 0.7 }}
        className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md overflow-hidden"
      >
        <div className="p-6 border-b border-white/10 flex justify-between items-center bg-white/[0.02]">
          <div>
            <h3 className="font-semibold text-white tracking-tight">Recent Leads</h3>
            <p className="text-sm text-muted-foreground">Latest captures from all active sources.</p>
          </div>
          <button className="text-sm text-muted-foreground hover:text-white transition-colors flex items-center gap-1">
            View all
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-muted-foreground bg-white/5 uppercase">
              <tr>
                <th className="px-6 py-4 font-medium">Lead ID</th>
                <th className="px-6 py-4 font-medium">Company</th>
                <th className="px-6 py-4 font-medium">Contact</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Est. Value</th>
                <th className="px-6 py-4 font-medium text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {recentLeads.map((lead, i) => (
                <tr key={i} className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 font-mono text-muted-foreground">{lead.id}</td>
                  <td className="px-6 py-4 font-medium text-white">{lead.name}</td>
                  <td className="px-6 py-4 text-muted-foreground">{lead.contact}</td>
                  <td className="px-6 py-4">
                    <span className={cn(
                      "px-2.5 py-1 rounded-full text-xs font-medium border",
                      lead.status === "Hot" ? "bg-red-500/10 text-red-400 border-red-500/20" :
                      lead.status === "Warm" ? "bg-orange-500/10 text-orange-400 border-orange-500/20" :
                      "bg-blue-500/10 text-blue-400 border-blue-500/20"
                    )}>
                      {lead.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-mono text-white">{lead.value}</td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-muted-foreground hover:text-white transition-colors p-1 rounded hover:bg-white/10">
                      <MoreHorizontal className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}


