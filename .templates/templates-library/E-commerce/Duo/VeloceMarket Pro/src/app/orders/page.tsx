"use client";

import { Sidebar } from "@/components/ui/Sidebar";
import { cn } from "@/lib/utils";
import { 
  Search, 
  Filter, 
  MoreVertical,
  ExternalLink,
  ChevronRight,
  Package2,
  Truck
} from "lucide-react";

const orders = [
  { id: "ORD-8492", client: "Acme Corp", date: "May 18, 2026", total: "$12,450", status: "Processing", items: 24 },
  { id: "ORD-8491", client: "Nexus S.A.", date: "May 17, 2026", total: "$45,200", status: "Shipped", items: 156 },
  { id: "ORD-8490", client: "GlobalCorp", date: "May 17, 2026", total: "$8,900", status: "Delivered", items: 12 },
  { id: "ORD-8489", client: "TechFlow Inc", date: "May 16, 2026", total: "$21,150", status: "Processing", items: 84 },
  { id: "ORD-8488", client: "BioLogic Hub", date: "May 16, 2026", total: "$104,000", status: "On Hold", items: 1205 },
];

export default function OrdersPage() {
  return (
    <div className="min-h-screen bg-muted/20">
      <Sidebar />
      <main className="pl-64 pr-8 pt-20 pb-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Bulk Order Management</h1>
              <p className="text-muted-foreground mt-1">Track and manage high-volume B2B transactions</p>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-xl text-sm font-medium hover:bg-primary/90 transition-colors">
              <Package2 className="size-4" />
              New Bulk Order
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="p-6 border border-border bg-background rounded-2xl">
              <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-4">Awaiting Shipment</p>
              <p className="text-3xl font-bold">24</p>
              <div className="mt-4 flex items-center gap-2 text-xs text-amber-500 font-medium">
                <Truck className="size-3" />
                Priority pickup scheduled
              </div>
            </div>
            <div className="p-6 border border-border bg-background rounded-2xl">
              <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-4">Pending Approval</p>
              <p className="text-3xl font-bold">12</p>
              <p className="mt-4 text-xs text-muted-foreground">Requires manager override</p>
            </div>
            <div className="p-6 border border-border bg-background rounded-2xl">
              <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-4">Disputed Orders</p>
              <p className="text-3xl font-bold">2</p>
              <p className="mt-4 text-xs text-red-500 font-medium">High priority resolution</p>
            </div>
          </div>

          <div className="border border-border bg-background rounded-2xl overflow-hidden shadow-sm">
            <table className="w-full text-left">
              <thead className="bg-muted/50 border-b border-border">
                <tr>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">Order ID</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">Client</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">Date</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">Total</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">Items</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">Status</th>
                  <th className="px-6 py-4"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {orders.map((order, i) => (
                  <tr key={i} className="hover:bg-muted/30 transition-colors cursor-pointer group">
                    <td className="px-6 py-4 font-bold text-sm text-primary">{order.id}</td>
                    <td className="px-6 py-4">
                      <p className="font-bold text-sm">{order.client}</p>
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">{order.date}</td>
                    <td className="px-6 py-4 font-bold text-sm">{order.total}</td>
                    <td className="px-6 py-4 text-sm font-medium">{order.items}</td>
                    <td className="px-6 py-4">
                      <span className={cn(
                        "inline-flex px-2.5 py-1 rounded-full text-[10px] font-bold uppercase",
                        order.status === "Delivered" ? "bg-emerald-500/10 text-emerald-500" : 
                        order.status === "Processing" ? "bg-blue-500/10 text-blue-500" : 
                        order.status === "Shipped" ? "bg-indigo-500/10 text-indigo-500" :
                        "bg-amber-500/10 text-amber-500"
                      )}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <ChevronRight className="size-4 text-muted-foreground group-hover:text-foreground transition-colors inline" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}