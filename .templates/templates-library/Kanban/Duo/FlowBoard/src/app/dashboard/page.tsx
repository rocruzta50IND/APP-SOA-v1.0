"use client";

import { motion } from "framer-motion";
import { 
  ArrowUpRight, 
  ArrowDownRight, 
  MoreHorizontal,
  Clock,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

const performanceData = [
  { name: "Mon", tasks: 12 },
  { name: "Tue", tasks: 18 },
  { name: "Wed", tasks: 15 },
  { name: "Thu", tasks: 25 },
  { name: "Fri", tasks: 22 },
  { name: "Sat", tasks: 30 },
  { name: "Sun", tasks: 28 },
];

const distributionData = [
  { name: "Design", value: 400 },
  { name: "Dev", value: 300 },
  { name: "Marketing", value: 200 },
  { name: "Sales", value: 100 },
];

const recentTasks = [
  { id: "TSK-01", title: "Update authentication flow", status: "In Progress", priority: "High", time: "2h ago" },
  { id: "TSK-02", title: "Design new landing page", status: "Review", priority: "Medium", time: "4h ago" },
  { id: "TSK-03", title: "Fix navigation bug", status: "Completed", priority: "High", time: "1d ago" },
  { id: "TSK-04", title: "Prepare Q3 report", status: "Todo", priority: "Low", time: "2d ago" },
  { id: "TSK-05", title: "Client meeting prep", status: "In Progress", priority: "Medium", time: "2d ago" },
];

const metrics = [
  { label: "Active Tasks", value: "142", trend: "+12.5%", isPositive: true, icon: Clock },
  { label: "Completed", value: "854", trend: "+5.2%", isPositive: true, icon: CheckCircle2 },
  { label: "Overdue", value: "12", trend: "-2.4%", isPositive: false, icon: AlertCircle },
];

export default function DashboardPage() {
  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground leading-tight">Overview</h1>
          <p className="text-muted-foreground mt-1 text-sm">Monitor your team&apos;s workflow and performance metrics.</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-widest">Date Range:</span>
          <select className="bg-background border border-border rounded-md px-3 py-1.5 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring cursor-pointer hover:bg-muted/50 transition-colors">
            <option>Last 7 Days</option>
            <option>Last 30 Days</option>
            <option>This Quarter</option>
          </select>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {metrics.map((metric, i) => (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: i * 0.05, ease: "easeOut" }}
            key={metric.label}
            className="bg-background border border-border p-5 rounded-md shadow-sm hover:-translate-y-0.5 transition-transform duration-200"
          >
            <div className="flex justify-between items-start mb-4">
              <metric.icon className="w-5 h-5 text-muted-foreground" />
              <div className={`flex items-center text-xs font-medium ${metric.isPositive ? 'text-primary' : 'text-destructive'}`}>
                {metric.trend}
                {metric.isPositive ? <ArrowUpRight className="w-3 h-3 ml-1" /> : <ArrowDownRight className="w-3 h-3 ml-1" />}
              </div>
            </div>
            <div className="space-y-1">
              <h3 className="text-2xl font-bold tracking-tight">{metric.value}</h3>
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-widest">{metric.label}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts Bento */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, delay: 0.15, ease: "easeOut" }}
          className="lg:col-span-2 bg-background border border-border rounded-md shadow-sm p-5"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-sm font-bold uppercase tracking-widest">Task Velocity</h2>
            <button className="text-muted-foreground hover:text-foreground transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm">
              <MoreHorizontal className="w-4 h-4" />
            </button>
          </div>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={performanceData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorTasks" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: "hsl(var(--background))", border: "1px solid hsl(var(--border))", borderRadius: "6px", fontSize: "12px", fontWeight: 500 }}
                  itemStyle={{ color: "hsl(var(--foreground))" }}
                />
                <Area type="monotone" dataKey="tasks" stroke="hsl(var(--primary))" strokeWidth={2} fillOpacity={1} fill="url(#colorTasks)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, delay: 0.2, ease: "easeOut" }}
          className="bg-background border border-border rounded-md shadow-sm p-5 flex flex-col"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-sm font-bold uppercase tracking-widest">Distribution</h2>
            <button className="text-muted-foreground hover:text-foreground transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm">
              <MoreHorizontal className="w-4 h-4" />
            </button>
          </div>
          <div className="flex-1 min-h-[250px] w-full">
             <ResponsiveContainer width="100%" height="100%">
              <BarChart data={distributionData} layout="vertical" margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="hsl(var(--border))" />
                <XAxis type="number" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "hsl(var(--foreground))", fontWeight: 500 }} />
                <Tooltip 
                  cursor={{ fill: "hsl(var(--muted))", opacity: 0.4 }}
                  contentStyle={{ backgroundColor: "hsl(var(--background))", border: "1px solid hsl(var(--border))", borderRadius: "6px", fontSize: "12px", fontWeight: 500 }}
                  itemStyle={{ color: "hsl(var(--foreground))" }}
                />
                <Bar dataKey="value" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} barSize={24} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Recent Tasks Data Table */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2, delay: 0.25, ease: "easeOut" }}
        className="bg-background border border-border rounded-md shadow-sm overflow-hidden"
      >
        <div className="p-5 border-b border-border flex items-center justify-between bg-background">
          <h2 className="text-sm font-bold uppercase tracking-widest">Recent Activity</h2>
          <button className="text-xs font-medium text-primary hover:underline outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm">View All</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs font-medium text-muted-foreground uppercase tracking-widest bg-muted/30 border-b border-border">
              <tr>
                <th className="px-5 py-3 font-medium">Task ID</th>
                <th className="px-5 py-3 font-medium">Title</th>
                <th className="px-5 py-3 font-medium">Status</th>
                <th className="px-5 py-3 font-medium">Priority</th>
                <th className="px-5 py-3 font-medium">Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {recentTasks.map((task) => (
                <tr key={task.id} className="hover:bg-muted/10 transition-colors">
                  <td className="px-5 py-4 font-mono text-xs text-muted-foreground">{task.id}</td>
                  <td className="px-5 py-4 font-medium text-foreground">{task.title}</td>
                  <td className="px-5 py-4">
                    <span className={`inline-flex items-center px-2 py-1 rounded-sm text-[10px] font-bold uppercase tracking-wider border ${
                      task.status === 'Completed' ? 'bg-primary/5 text-primary border-primary/20' : 
                      task.status === 'In Progress' ? 'bg-muted text-foreground border-border' :
                      task.status === 'Review' ? 'bg-muted/50 text-muted-foreground border-border/50' :
                      'bg-transparent text-muted-foreground border-transparent'
                    }`}>
                      {task.status}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <span className={`text-xs font-medium ${
                      task.priority === 'High' ? 'text-foreground font-bold' : 
                      task.priority === 'Medium' ? 'text-muted-foreground' : 'text-muted-foreground/50'
                    }`}>
                      {task.priority}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-xs text-muted-foreground whitespace-nowrap">{task.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
