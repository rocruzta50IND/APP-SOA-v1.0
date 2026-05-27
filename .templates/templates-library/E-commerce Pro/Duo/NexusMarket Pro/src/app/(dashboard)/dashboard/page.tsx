"use client";

import { 
  ArrowUpRight, 
  ArrowDownRight, 
  DollarSign, 
  Users, 
  Package, 
  ShoppingCart,
  TrendingUp,
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
  Bar
} from "recharts";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const revenueData = [
  { month: "Jan", total: 2400 },
  { month: "Feb", total: 1398 },
  { month: "Mar", total: 9800 },
  { month: "Apr", total: 3908 },
  { month: "May", total: 4800 },
  { month: "Jun", total: 3800 },
  { month: "Jul", total: 4300 },
];

const salesData = [
  { name: "Mon", sales: 400 },
  { name: "Tue", sales: 300 },
  { name: "Wed", sales: 500 },
  { name: "Thu", sales: 280 },
  { name: "Fri", sales: 590 },
  { name: "Sat", sales: 320 },
  { name: "Sun", sales: 210 },
];

const recentOrders = [
  { id: "ORD-7281", customer: "Aether Corp", status: "Delivered", amount: "$1,240.00", date: "2 mins ago" },
  { id: "ORD-7282", customer: "Nova Systems", status: "Processing", amount: "$890.00", date: "15 mins ago" },
  { id: "ORD-7283", customer: "Zenith Labs", status: "Shipped", amount: "$2,100.00", date: "1 hour ago" },
  { id: "ORD-7284", customer: "Pulse Media", status: "Delivered", amount: "$450.00", date: "3 hours ago" },
  { id: "ORD-7285", customer: "Orbit Inc", status: "Cancelled", amount: "$120.00", date: "5 hours ago" },
];

const kpis = [
  { title: "Total Revenue", value: "$128,430.00", trend: "+12.5%", icon: DollarSign, positive: true },
  { title: "Active Customers", value: "2,420", trend: "+18.2%", icon: Users, positive: true },
  { title: "Total Inventory", value: "14,200", trend: "-2.4%", icon: Package, positive: false },
  { title: "Pending Orders", value: "48", trend: "+4.1%", icon: ShoppingCart, positive: true },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
          Command Center
        </h1>
        <p className="text-muted-foreground mt-1">Real-time overview of your NexusMarket ecosystem.</p>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, i) => (
          <Card key={i} className="bg-white/5 border-white/10 backdrop-blur-md overflow-hidden group hover:border-primary/50 transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{kpi.title}</CardTitle>
              <div className="h-8 w-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                <kpi.icon className="h-4 w-4 text-primary" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-black tracking-tighter font-mono">{kpi.value}</div>
              <div className={cn(
                "flex items-center gap-1 text-xs font-medium mt-1",
                kpi.positive ? "text-emerald-400" : "text-rose-400"
              )}>
                {kpi.positive ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                {kpi.trend}
                <span className="text-muted-foreground ml-1">vs last month</span>
              </div>
            </CardContent>
            {/* Subtle Gradient Glow */}
            <div className="absolute -bottom-4 -right-4 h-16 w-16 bg-primary/10 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
          </Card>
        ))}
      </div>

      {/* Charts & Bento Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 bg-white/5 border-white/10 backdrop-blur-md">
          <CardHeader>
            <CardTitle className="text-sm font-semibold flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-primary" />
              Revenue Performance
            </CardTitle>
          </CardHeader>
          <CardContent className="h-[300px] w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#4F46E5" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ffffff08" />
                <XAxis 
                  dataKey="month" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#888888', fontSize: 10 }}
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#888888', fontSize: 10 }}
                  tickFormatter={(value) => `$${value/1000}k`}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(0, 0, 0, 0.8)', 
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '12px',
                    backdropFilter: 'blur(8px)',
                    fontSize: '12px'
                  }} 
                  itemStyle={{ color: '#fff' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="total" 
                  stroke="#4F46E5" 
                  strokeWidth={2}
                  fillOpacity={1} 
                  fill="url(#colorTotal)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-white/10 backdrop-blur-md">
          <CardHeader>
            <CardTitle className="text-sm font-semibold flex items-center gap-2">
              <Clock className="h-4 w-4 text-primary" />
              Daily Sales Volume
            </CardTitle>
          </CardHeader>
          <CardContent className="h-[300px] w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ffffff08" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#888888', fontSize: 10 }}
                  dy={10}
                />
                <YAxis axisLine={false} tickLine={false} hide />
                <Tooltip 
                  cursor={{ fill: 'rgba(255, 255, 255, 0.05)' }}
                  contentStyle={{ 
                    backgroundColor: 'rgba(0, 0, 0, 0.8)', 
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '12px',
                    fontSize: '12px'
                  }} 
                />
                <Bar 
                  dataKey="sales" 
                  fill="#4F46E5" 
                  radius={[4, 4, 0, 0]} 
                  barSize={30}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Orders Table */}
      <Card className="bg-white/5 border-white/10 backdrop-blur-md">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-sm font-semibold">Recent Transactions</CardTitle>
          <Badge variant="outline" className="border-white/10 text-[10px] uppercase tracking-wider bg-white/5">
            View All
          </Badge>
        </CardHeader>
        <CardContent>
          <div className="relative w-full overflow-auto">
            <table className="w-full caption-bottom text-sm">
              <thead className="[&_tr]:border-b border-white/5">
                <tr className="border-b border-white/5 transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                  <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground text-[10px] uppercase tracking-widest">Order ID</th>
                  <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground text-[10px] uppercase tracking-widest">Customer</th>
                  <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground text-[10px] uppercase tracking-widest">Status</th>
                  <th className="h-10 px-4 text-right align-middle font-medium text-muted-foreground text-[10px] uppercase tracking-widest">Amount</th>
                  <th className="h-10 px-4 text-right align-middle font-medium text-muted-foreground text-[10px] uppercase tracking-widest">Date</th>
                </tr>
              </thead>
              <tbody className="[&_tr:last-child]:border-0">
                {recentOrders.map((order) => (
                  <tr key={order.id} className="border-b border-white/5 transition-colors hover:bg-white/5">
                    <td className="p-4 align-middle font-mono text-xs">{order.id}</td>
                    <td className="p-4 align-middle font-medium">{order.customer}</td>
                    <td className="p-4 align-middle">
                      <div className="flex items-center gap-2">
                        {order.status === "Delivered" && <CheckCircle2 className="h-3 w-3 text-emerald-400" />}
                        {order.status === "Processing" && <Clock className="h-3 w-3 text-amber-400" />}
                        {order.status === "Shipped" && <Package className="h-3 w-3 text-indigo-400" />}
                        {order.status === "Cancelled" && <AlertCircle className="h-3 w-3 text-rose-400" />}
                        <span className={cn(
                          "text-[10px] font-bold uppercase",
                          order.status === "Delivered" ? "text-emerald-400" :
                          order.status === "Processing" ? "text-amber-400" :
                          order.status === "Shipped" ? "text-indigo-400" : "text-rose-400"
                        )}>
                          {order.status}
                        </span>
                      </div>
                    </td>
                    <td className="p-4 align-middle text-right font-mono font-bold">{order.amount}</td>
                    <td className="p-4 align-middle text-right text-muted-foreground text-xs">{order.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
