"use client";

import { Header } from "@/components/ui/Header";
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Package, 
  ShoppingCart, 
  Users,
  ArrowUpRight
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
import { motion } from "framer-motion";

const data = [
  { name: "Jan", revenue: 45000, orders: 240 },
  { name: "Feb", revenue: 52000, orders: 300 },
  { name: "Mar", revenue: 48000, orders: 280 },
  { name: "Apr", revenue: 61000, orders: 350 },
  { name: "May", revenue: 55000, orders: 320 },
  { name: "Jun", revenue: 67000, orders: 400 },
];

const stats = [
  {
    name: "Total Revenue",
    value: "$128,430",
    change: "+12.5%",
    trend: "up",
    icon: DollarSign,
  },
  {
    name: "Active Orders",
    value: "1,240",
    change: "+18.2%",
    trend: "up",
    icon: ShoppingCart,
  },
  {
    name: "Inventory Items",
    value: "8,542",
    change: "-2.4%",
    trend: "down",
    icon: Package,
  },
  {
    name: "New Customers",
    value: "452",
    change: "+5.1%",
    trend: "up",
    icon: Users,
  },
];

const recentOrders = [
  { id: "ORD-001", customer: "Aetheris Corp", amount: "$12,400", status: "Processing", date: "2 mins ago" },
  { id: "ORD-002", customer: "Nexus Systems", amount: "$8,250", status: "Shipped", date: "15 mins ago" },
  { id: "ORD-003", customer: "Lumina Labs", amount: "$4,100", status: "Delivered", date: "1 hour ago" },
  { id: "ORD-004", customer: "Veloce Market", amount: "$15,800", status: "Pending", date: "3 hours ago" },
  { id: "ORD-005", customer: "NeoVault Solutions", amount: "$2,900", status: "Processing", date: "5 hours ago" },
];

export default function DashboardPage() {
  return (
    <div className="flex flex-col h-full">
      <Header title="Dashboard Overview" />
      <div className="flex-1 overflow-y-auto p-8 space-y-8">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: index * 0.05 }}
              className="rounded-md border border-border bg-background p-6 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div className="rounded-md bg-muted p-2">
                  <stat.icon className="h-5 w-5 text-foreground" />
                </div>
                <div className={cn(
                  "flex items-center gap-1 text-xs font-medium",
                  stat.trend === "up" ? "text-emerald-600" : "text-rose-600"
                )}>
                  {stat.change}
                  {stat.trend === "up" ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                </div>
              </div>
              <div className="mt-4">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-widest">{stat.name}</p>
                <h3 className="mt-1 text-2xl font-bold tracking-tight">{stat.value}</h3>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Revenue Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: 0.2 }}
            className="lg:col-span-2 rounded-md border border-border bg-background p-6 shadow-sm"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-sm font-semibold tracking-tight">Revenue Analytics</h3>
                <p className="text-xs text-muted-foreground">Monthly performance tracking</p>
              </div>
              <select className="text-xs border border-border rounded-md px-2 py-1 bg-background">
                <option>Last 6 months</option>
                <option>Last year</option>
              </select>
            </div>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#18181b" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#18181b" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 12, fill: "#64748b" }} 
                    dy={10}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 12, fill: "#64748b" }}
                    tickFormatter={(value) => `$${value / 1000}k`}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: "#fff", 
                      borderRadius: "6px", 
                      border: "1px solid #e2e8f0",
                      fontSize: "12px",
                      boxShadow: "0 1px 2px 0 rgb(0 0 0 / 0.05)"
                    }} 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="#18181b" 
                    strokeWidth={2}
                    fillOpacity={1} 
                    fill="url(#colorRevenue)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Recent Orders */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: 0.3 }}
            className="rounded-md border border-border bg-background p-6 shadow-sm"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-sm font-semibold tracking-tight">Recent Orders</h3>
              <button className="text-xs font-medium text-primary hover:underline">View all</button>
            </div>
            <div className="space-y-6">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-xs font-bold">{order.customer}</span>
                    <span className="text-[10px] text-muted-foreground">{order.id} • {order.date}</span>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-xs font-medium">{order.amount}</span>
                    <span className={cn(
                      "text-[10px] px-1.5 py-0.5 rounded-full",
                      order.status === "Delivered" ? "bg-emerald-100 text-emerald-700" :
                      order.status === "Shipped" ? "bg-blue-100 text-blue-700" :
                      order.status === "Processing" ? "bg-amber-100 text-amber-700" :
                      "bg-slate-100 text-slate-700"
                    )}>
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bento Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="lg:col-span-2 rounded-md border border-border bg-background p-6 shadow-sm flex flex-col justify-between">
            <div>
              <h3 className="text-sm font-semibold tracking-tight">Expansion Strategy</h3>
              <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                Your B2B segment has grown by 24% this quarter. Consider increasing inventory for high-ticket electronics to meet upcoming enterprise demand.
              </p>
            </div>
            <div className="mt-4 flex items-center gap-2">
              <button className="bg-primary text-primary-foreground px-3 py-1.5 rounded-md text-xs font-medium hover:opacity-90 transition-opacity">
                Review Strategy
              </button>
              <button className="border border-border px-3 py-1.5 rounded-md text-xs font-medium hover:bg-muted transition-colors">
                Dismiss
              </button>
            </div>
          </div>
          <div className="rounded-md border border-border bg-background p-6 shadow-sm">
            <h3 className="text-sm font-semibold tracking-tight text-rose-600 flex items-center gap-2">
              <Package className="h-4 w-4" />
              Low Stock Alert
            </h3>
            <p className="mt-2 text-xs font-bold">8 Items below threshold</p>
            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-[10px]">
                <span>Quantum Processor X1</span>
                <span className="font-bold text-rose-600">2 left</span>
              </div>
              <div className="w-full bg-muted rounded-full h-1">
                <div className="bg-rose-500 h-1 rounded-full w-[20%]"></div>
              </div>
              <div className="flex justify-between text-[10px]">
                <span>Neural Display 27"</span>
                <span className="font-bold text-rose-600">5 left</span>
              </div>
              <div className="w-full bg-muted rounded-full h-1">
                <div className="bg-rose-500 h-1 rounded-full w-[40%]"></div>
              </div>
            </div>
          </div>
          <div className="rounded-md border border-border bg-background p-6 shadow-sm flex flex-col items-center justify-center text-center">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
              <ArrowUpRight className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-sm font-semibold tracking-tight">Performance Score</h3>
            <span className="text-3xl font-bold mt-1">98.2</span>
            <p className="text-[10px] text-muted-foreground mt-1">Exceptional efficiency</p>
          </div>
        </div>
      </div>
    </div>
  );
}
