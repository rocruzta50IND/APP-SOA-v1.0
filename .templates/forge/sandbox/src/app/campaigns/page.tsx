"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts";
import { Play, Pause, CheckCircle2, TrendingUp } from "lucide-react";

const chartData = [
  { name: "Mon", leads: 400, clicks: 240 },
  { name: "Tue", leads: 300, clicks: 139 },
  { name: "Wed", leads: 200, clicks: 980 },
  { name: "Thu", leads: 278, clicks: 390 },
  { name: "Fri", leads: 189, clicks: 480 },
  { name: "Sat", leads: 239, clicks: 380 },
  { name: "Sun", leads: 349, clicks: 430 },
];

const campaigns = [
  { id: 1, name: "Q4 Black Friday Promo", type: "Email", budget: "$15,000", leads: 1240, status: "Active" },
  { id: 2, name: "SaaS Enterprise Demo", type: "Social", budget: "$8,500", leads: 340, status: "Paused" },
  { id: 3, name: "Webinar: Tech 2024", type: "Paid Search", budget: "$12,000", leads: 890, status: "Active" },
  { id: 4, name: "Newsletter Sponsor", type: "Display", budget: "$3,000", leads: 150, status: "Completed" },
  { id: 5, name: "Retargeting Cart Abandon", type: "Social", budget: "$5,000", leads: 420, status: "Active" },
];

const spring = { type: "spring", stiffness: 400, damping: 30 };

export default function CampaignsPage() {
  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
          Marketing Campaigns
        </h1>
        <p className="text-sm text-muted-foreground mt-1">Monitor performance and ROI across all channels.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={spring}
          className="lg:col-span-2 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6 relative"
        >
          <div className="absolute top-0 right-0 -m-4 bg-primary/10 blur-[100px] w-64 h-64 rounded-full pointer-events-none" />
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-white">Engagement Overview</h3>
              <p className="text-sm text-muted-foreground">Clicks vs Leads generated</p>
            </div>
            <div className="flex items-center gap-2 text-xs font-medium">
              <span className="flex items-center gap-1 text-primary"><div className="w-2 h-2 rounded-full bg-primary" /> Leads</span>
              <span className="flex items-center gap-1 text-emerald-400"><div className="w-2 h-2 rounded-full bg-emerald-400" /> Clicks</span>
            </div>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorLeads" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorClicks" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#34d399" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#34d399" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="#ffffff10" vertical={false} />
                <XAxis dataKey="name" stroke="#ffffff50" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#ffffff50" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#09090b', borderColor: '#ffffff20', borderRadius: '12px' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Area type="monotone" dataKey="leads" stroke="#4f46e5" fillOpacity={1} fill="url(#colorLeads)" />
                <Area type="monotone" dataKey="clicks" stroke="#34d399" fillOpacity={1} fill="url(#colorClicks)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...spring, delay: 0.1 }}
          className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6 flex flex-col justify-center items-center text-center relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent pointer-events-none" />
          <div className="w-16 h-16 rounded-2xl bg-primary/20 border border-primary/30 flex items-center justify-center mb-6">
            <TrendingUp className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-4xl font-bold text-white mb-2">$84,500</h2>
          <p className="text-sm text-muted-foreground font-medium mb-6">Total Ad Spend this month</p>
          <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden mb-2">
            <div className="h-full bg-primary rounded-full w-[70%]" />
          </div>
          <p className="text-xs text-muted-foreground self-start">70% of $120k budget used</p>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...spring, delay: 0.2 }}
        className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md overflow-hidden shadow-xl"
      >
        <div className="p-4 border-b border-white/10 flex items-center justify-between">
          <h3 className="font-semibold text-white">Active Campaigns</h3>
          <button className="text-sm text-primary hover:text-white transition-colors">View All</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-muted-foreground bg-white/5">
              <tr>
                <th className="px-6 py-4 font-medium">Campaign Name</th>
                <th className="px-6 py-4 font-medium">Type</th>
                <th className="px-6 py-4 font-medium">Budget</th>
                <th className="px-6 py-4 font-medium">Leads Gen</th>
                <th className="px-6 py-4 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10 text-white">
              {campaigns.map((camp) => (
                <tr key={camp.id} className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 font-medium">{camp.name}</td>
                  <td className="px-6 py-4 text-muted-foreground">{camp.type}</td>
                  <td className="px-6 py-4 font-mono">{camp.budget}</td>
                  <td className="px-6 py-4 font-mono">{camp.leads}</td>
                  <td className="px-6 py-4">
                    <span className={cn(
                      "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border",
                      camp.status === "Active" ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" :
                      camp.status === "Paused" ? "bg-amber-500/10 text-amber-400 border-amber-500/20" :
                      "bg-blue-500/10 text-blue-400 border-blue-500/20"
                    )}>
                      {camp.status === "Active" && <Play className="w-3 h-3 fill-current" />}
                      {camp.status === "Paused" && <Pause className="w-3 h-3 fill-current" />}
                      {camp.status === "Completed" && <CheckCircle2 className="w-3 h-3" />}
                      {camp.status}
                    </span>
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
