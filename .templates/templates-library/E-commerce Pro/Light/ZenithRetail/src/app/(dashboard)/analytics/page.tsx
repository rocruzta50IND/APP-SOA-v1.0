"use client";

import { Header } from "@/components/ui/Header";
import { 
  BarChart3, 
  TrendingUp, 
  Calendar, 
  Download,
  Info
} from "lucide-react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from "recharts";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const categoryData = [
  { name: "Electronics", value: 45, color: "#18181b" },
  { name: "Hardware", value: 25, color: "#3f3f46" },
  { name: "Networking", value: 15, color: "#71717a" },
  { name: "IoT", value: 10, color: "#a1a1aa" },
  { name: "Other", value: 5, color: "#e4e4e7" },
];

const performanceData = [
  { day: "Mon", sales: 4200, orders: 12 },
  { day: "Tue", sales: 3800, orders: 10 },
  { day: "Wed", sales: 5100, orders: 15 },
  { day: "Thu", sales: 4900, orders: 14 },
  { day: "Fri", sales: 6200, orders: 20 },
  { day: "Sat", sales: 5800, orders: 18 },
  { day: "Sun", sales: 4500, orders: 13 },
];

export default function AnalyticsPage() {
  return (
    <div className="flex flex-col h-full">
      <Header title="Analytics & Reports" />
      <div className="flex-1 overflow-y-auto p-8 space-y-8">
        {/* Page Actions */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 rounded-md border border-border bg-background p-1">
            <button className="px-3 py-1 text-xs font-medium bg-muted rounded-md transition-colors">7 Days</button>
            <button className="px-3 py-1 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors">30 Days</button>
            <button className="px-3 py-1 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors">12 Months</button>
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 rounded-md border border-border bg-background px-3 py-1.5 text-xs font-medium hover:bg-muted transition-colors">
              <Calendar className="h-3.3 w-3.5" />
              Custom Range
            </button>
            <button className="flex items-center gap-2 rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground hover:opacity-90 transition-opacity">
              <Download className="h-3.5 w-3.5" />
              Export Report
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Sales Performance Bar Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-md border border-border bg-background p-6 shadow-sm"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-sm font-semibold tracking-tight">Daily Sales Performance</h3>
              <Info className="h-4 w-4 text-muted-foreground cursor-help" />
            </div>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis 
                    dataKey="day" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 12, fill: "#64748b" }} 
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 12, fill: "#64748b" }}
                    tickFormatter={(value) => `$${value}`}
                  />
                  <Tooltip 
                    cursor={{ fill: '#f8fafc' }}
                    contentStyle={{ 
                      backgroundColor: "#fff", 
                      borderRadius: "6px", 
                      border: "1px solid #e2e8f0",
                      fontSize: "12px"
                    }} 
                  />
                  <Bar dataKey="sales" fill="#18181b" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Category Distribution Pie Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="rounded-md border border-border bg-background p-6 shadow-sm"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-sm font-semibold tracking-tight">Revenue by Category</h3>
              <select className="text-[10px] border border-border rounded-md px-2 py-1 bg-background font-bold uppercase tracking-wider">
                <option>Current Quarter</option>
                <option>Last Quarter</option>
              </select>
            </div>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: "#fff", 
                      borderRadius: "6px", 
                      border: "1px solid #e2e8f0",
                      fontSize: "12px"
                    }} 
                  />
                  <Legend 
                    verticalAlign="bottom" 
                    height={36} 
                    iconType="circle"
                    formatter={(value) => <span className="text-xs text-muted-foreground">{value}</span>}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>

        {/* Detailed Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { label: "Avg. Order Value", value: "$1,450.20", trend: "+4.2%", desc: "vs last period" },
            { label: "Conversion Rate", value: "3.42%", trend: "+0.8%", desc: "vs last period" },
            { label: "Return Rate", value: "1.12%", trend: "-0.3%", desc: "vs last period" },
          ].map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              className="rounded-md border border-border bg-background p-6 shadow-sm flex flex-col items-center text-center"
            >
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-widest mb-2">{item.label}</p>
              <h4 className="text-2xl font-bold tracking-tight mb-1">{item.value}</h4>
              <div className="flex items-center gap-1.5">
                <span className={cn(
                  "text-[10px] font-bold px-1.5 py-0.5 rounded-full",
                  item.trend.startsWith("+") ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700"
                )}>
                  {item.trend}
                </span>
                <span className="text-[10px] text-muted-foreground">{item.desc}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
