"use client";

import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from "recharts";
import { 
  ArrowUpRight, 
  ArrowDownRight, 
  DollarSign, 
  Users, 
  Package, 
  TrendingUp 
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";

const data = [
  { name: "Mon", revenue: 4200, orders: 24 },
  { name: "Tue", revenue: 5800, orders: 32 },
  { name: "Wed", revenue: 4900, orders: 28 },
  { name: "Thu", revenue: 7200, orders: 41 },
  { name: "Fri", revenue: 6100, orders: 35 },
  { name: "Sat", revenue: 8400, orders: 48 },
  { name: "Sun", revenue: 9100, orders: 52 },
];

const stats = [
  {
    title: "Total Revenue",
    value: "$128,430.00",
    change: "+12.5%",
    trend: "up",
    icon: DollarSign,
  },
  {
    title: "Active Customers",
    value: "2,430",
    change: "+18.2%",
    trend: "up",
    icon: Users,
  },
  {
    title: "Total Orders",
    value: "15,231",
    change: "-4.1%",
    trend: "down",
    icon: Package,
  },
  {
    title: "Conversion Rate",
    value: "3.24%",
    change: "+2.4%",
    trend: "up",
    icon: TrendingUp,
  },
];

const recentOrders = [
  { id: "ORD-7231", customer: "Quantum Dynamics", amount: "$12,400.00", status: "Fulfilled" },
  { id: "ORD-7232", customer: "Nova Retail Group", amount: "$4,230.50", status: "Processing" },
  { id: "ORD-7233", customer: "Apex Solutions", amount: "$8,900.00", status: "Fulfilled" },
  { id: "ORD-7234", customer: "Lumina Labs", amount: "$2,100.00", status: "Shipped" },
  { id: "ORD-7235", customer: "Vortex Systems", amount: "$15,600.00", status: "Pending" },
];

export default function DashboardPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Executive Dashboard</h1>
        <Badge variant="outline" className="px-2 py-1">
          Last updated: Today, 09:42 AM
        </Badge>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="border-border shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="flex items-center text-xs mt-1">
                {stat.trend === "up" ? (
                  <ArrowUpRight className="mr-1 h-3 w-3 text-emerald-500" />
                ) : (
                  <ArrowDownRight className="mr-1 h-3 w-3 text-red-500" />
                )}
                <span className={stat.trend === "up" ? "text-emerald-500" : "text-red-500"}>
                  {stat.change}
                </span>
                <span className="ml-1 text-muted-foreground text-[10px]">from last month</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-7">
        <Card className="col-span-4 border-border shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold tracking-tight">Revenue Overview</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <div className="h-[300px] w-full">
              {mounted ? (
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={data}>
                    <defs>
                      <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.1}/>
                        <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                    <XAxis 
                      dataKey="name" 
                      stroke="hsl(var(--muted-foreground))" 
                      fontSize={12} 
                      tickLine={false} 
                      axisLine={false} 
                    />
                    <YAxis 
                      stroke="hsl(var(--muted-foreground))" 
                      fontSize={12} 
                      tickLine={false} 
                      axisLine={false} 
                      tickFormatter={(value) => `$${value}`}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: "hsl(var(--background))", 
                        borderColor: "hsl(var(--border))",
                        borderRadius: "6px",
                        fontSize: "12px"
                      }}
                      itemStyle={{ color: "hsl(var(--foreground))" }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="revenue" 
                      stroke="hsl(var(--primary))" 
                      strokeWidth={2}
                      fillOpacity={1} 
                      fill="url(#colorRevenue)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              ) : (
                <div className="w-full h-full bg-muted/20 animate-pulse rounded-md" />
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3 border-border shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold tracking-tight">Recent Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between border-b border-border pb-4 last:border-0 last:pb-0">
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">{order.customer}</p>
                    <p className="text-xs text-muted-foreground">{order.id}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold">{order.amount}</p>
                    <Badge variant={order.status === "Fulfilled" ? "secondary" : "outline"} className="text-[10px] h-4">
                      {order.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
