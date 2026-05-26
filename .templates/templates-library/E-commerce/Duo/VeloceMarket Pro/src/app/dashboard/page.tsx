"use client";

import { Sidebar } from "@/components/ui/Sidebar";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { 
  ArrowUpRight, 
  ArrowDownRight, 
  TrendingUp, 
  Package, 
  ShoppingCart, 
  Users 
} from "lucide-react";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

const stats = [
  { name: "Total Revenue", value: "$1.28M", change: "+12.5%", trend: "up", icon: TrendingUp },
  { name: "Active Orders", value: "842", change: "+3.2%", trend: "up", icon: ShoppingCart },
  { name: "Low Stock Items", value: "12", change: "-2", trend: "down", icon: Package },
  { name: "New Customers", value: "48", change: "+18%", trend: "up", icon: Users },
];

const data = [
  { name: "Mon", sales: 4000 },
  { name: "Tue", sales: 3000 },
  { name: "Wed", sales: 5000 },
  { name: "Thu", sales: 2780 },
  { name: "Fri", sales: 1890 },
  { name: "Sat", sales: 2390 },
  { name: "Sun", sales: 3490 },
];

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-muted/20">
      <Sidebar />
      <main className="pl-64 pr-8 pt-20 pb-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Executive Overview</h1>
              <p className="text-muted-foreground mt-1">Real-time performance across your global network</p>
            </div>
            <div className="flex gap-4">
              <button className="px-4 py-2 border border-border bg-background rounded-xl text-sm font-medium hover:bg-muted transition-colors">Export Report</button>
              <button className="px-4 py-2 bg-primary text-primary-foreground rounded-xl text-sm font-medium hover:bg-primary/90 transition-colors">New Order</button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="p-6 border border-border bg-background rounded-2xl shadow-sm"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <stat.icon className="size-5 text-primary" />
                  </div>
                  <span className={cn(
                    "text-xs font-bold px-2 py-1 rounded-lg flex items-center gap-1",
                    stat.trend === "up" ? "bg-emerald-500/10 text-emerald-500" : "bg-red-500/10 text-red-500"
                  )}>
                    {stat.trend === "up" ? <ArrowUpRight className="size-3" /> : <ArrowDownRight className="size-3" />}
                    {stat.change}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground font-medium">{stat.name}</p>
                <p className="text-2xl font-bold tracking-tight mt-1">{stat.value}</p>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 border border-border bg-background rounded-2xl p-6 shadow-sm">
              <h3 className="text-lg font-bold mb-6">Sales Performance</h3>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={data}>
                    <defs>
                      <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.1}/>
                        <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                    <XAxis 
                      dataKey="name" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} 
                    />
                    <YAxis 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} 
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--background))', 
                        borderColor: 'hsl(var(--border))',
                        borderRadius: '12px',
                      }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="sales" 
                      stroke="hsl(var(--primary))" 
                      fillOpacity={1} 
                      fill="url(#colorSales)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="border border-border bg-background rounded-2xl p-6 shadow-sm">
              <h3 className="text-lg font-bold mb-6">Recent Activity</h3>
              <div className="space-y-6">
                {[
                  { user: "Acme Corp", action: "Placed bulk order", time: "2m ago", amount: "+$12,400" },
                  { user: "Global Logistics", action: "Stock replenishment", time: "45m ago", status: "In Transit" },
                  { user: "TechFlow Inc", action: "New pricing tier assigned", time: "2h ago", status: "Tier 3" },
                  { user: "Nexus S.A.", action: "Warehouse sync completed", time: "4h ago", status: "Verified" },
                ].map((act, i) => (
                  <div key={i} className="flex items-start justify-between border-b border-border last:border-0 pb-4 last:pb-0">
                    <div>
                      <p className="text-sm font-bold">{act.user}</p>
                      <p className="text-xs text-muted-foreground mt-1">{act.action}</p>
                      <p className="text-[10px] text-muted-foreground mt-1">{act.time}</p>
                    </div>
                    {act.amount && <span className="text-sm font-bold text-emerald-500">{act.amount}</span>}
                    {act.status && <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-muted border border-border">{act.status}</span>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}