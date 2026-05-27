"use client";

import { 
  Search, 
  Filter, 
  Download, 
  ExternalLink,
  ShoppingCart,
  CheckCircle2,
  Clock,
  Truck,
  AlertCircle
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const orders = [
  { id: "ORD-9201", customer: "Cyberdyne Systems", items: 3, total: "$2,450.00", status: "Delivered", date: "May 24, 2026" },
  { id: "ORD-9202", customer: "Weyland-Yutani", items: 12, total: "$15,800.00", status: "Processing", date: "May 25, 2026" },
  { id: "ORD-9203", customer: "Stark Industries", items: 1, total: "$890.00", status: "Shipped", date: "May 25, 2026" },
  { id: "ORD-9204", customer: "Oscorp Ent.", items: 5, total: "$4,200.00", status: "Cancelled", date: "May 26, 2026" },
  { id: "ORD-9205", customer: "Tyrell Corp", items: 8, total: "$9,150.00", status: "Processing", date: "May 27, 2026" },
  { id: "ORD-9206", customer: "Wayne Enterprises", items: 2, total: "$1,100.00", status: "Delivered", date: "May 27, 2026" },
  { id: "ORD-9207", customer: "Umbrella Co.", items: 15, total: "$22,400.00", status: "Shipped", date: "May 27, 2026" },
];

const statusStyles = {
  Delivered: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
  Processing: "text-amber-400 bg-amber-400/10 border-amber-400/20",
  Shipped: "text-indigo-400 bg-indigo-400/10 border-indigo-400/20",
  Cancelled: "text-rose-400 bg-rose-400/10 border-rose-400/20",
};

const statusIcons = {
  Delivered: CheckCircle2,
  Processing: Clock,
  Shipped: Truck,
  Cancelled: AlertCircle,
};

export default function OrdersPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
            Order Management
          </h1>
          <p className="text-muted-foreground mt-1">Track and process your B2B transactions.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="border-white/10 bg-white/5 rounded-xl gap-2 text-xs">
            <Download className="h-4 w-4" />
            Export CSV
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: "Total Orders", value: "1,284", icon: ShoppingCart },
          { label: "Pending", value: "42", icon: Clock },
          { label: "In Transit", value: "156", icon: Truck },
          { label: "Completed", value: "1,086", icon: CheckCircle2 },
        ].map((stat, i) => (
          <Card key={i} className="bg-white/5 border-white/10 backdrop-blur-md">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{stat.label}</p>
                  <p className="text-2xl font-black tracking-tighter font-mono mt-1">{stat.value}</p>
                </div>
                <div className="h-10 w-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                  <stat.icon className="h-5 w-5 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-white/5 border-white/10 backdrop-blur-md">
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search orders..." className="pl-9 h-10 w-64 bg-white/5 border-white/10 text-xs rounded-xl" />
              </div>
              <div className="flex items-center gap-1">
                {["All", "Pending", "Shipped", "Delivered"].map((tab) => (
                  <button key={tab} className={cn(
                    "px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider rounded-lg transition-all",
                    tab === "All" ? "bg-primary text-white" : "text-muted-foreground hover:bg-white/5 hover:text-white"
                  )}>
                    {tab}
                  </button>
                ))}
              </div>
            </div>
            <Button variant="outline" size="sm" className="h-10 border-white/10 bg-white/5 gap-2 text-xs rounded-xl">
              <Filter className="h-4 w-4" />
              Advanced Filters
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="relative w-full overflow-auto">
            <table className="w-full caption-bottom text-sm">
              <thead className="[&_tr]:border-b border-white/5">
                <tr className="border-b border-white/5">
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground text-[10px] uppercase tracking-widest">Order Number</th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground text-[10px] uppercase tracking-widest">Client</th>
                  <th className="h-12 px-4 text-center align-middle font-medium text-muted-foreground text-[10px] uppercase tracking-widest">Items</th>
                  <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground text-[10px] uppercase tracking-widest">Total Value</th>
                  <th className="h-12 px-4 text-center align-middle font-medium text-muted-foreground text-[10px] uppercase tracking-widest">Status</th>
                  <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground text-[10px] uppercase tracking-widest">Date</th>
                  <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground text-[10px] uppercase tracking-widest"></th>
                </tr>
              </thead>
              <tbody className="[&_tr:last-child]:border-0">
                {orders.map((order) => {
                  const StatusIcon = statusIcons[order.status as keyof typeof statusIcons];
                  return (
                    <tr key={order.id} className="border-b border-white/5 transition-colors hover:bg-white/5 group">
                      <td className="p-4 align-middle font-mono text-xs text-primary">{order.id}</td>
                      <td className="p-4 align-middle font-medium">{order.customer}</td>
                      <td className="p-4 align-middle text-center font-mono text-xs">{order.items}</td>
                      <td className="p-4 align-middle text-right font-mono font-bold">{order.total}</td>
                      <td className="p-4 align-middle text-center">
                        <div className={cn(
                          "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[10px] font-bold uppercase",
                          statusStyles[order.status as keyof typeof statusStyles]
                        )}>
                          <StatusIcon className="h-3 w-3" />
                          {order.status}
                        </div>
                      </td>
                      <td className="p-4 align-middle text-right text-muted-foreground text-xs">{order.date}</td>
                      <td className="p-4 align-middle text-right">
                        <button className="h-8 w-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-primary hover:border-primary">
                          <ExternalLink className="h-3.5 w-3.5 text-white" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
