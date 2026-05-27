"use client";

import { Header } from "@/components/ui/Header";
import { 
  ShoppingCart, 
  Search, 
  Download, 
  CheckCircle2, 
  Clock, 
  Truck, 
  XCircle,
  ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const orders = [
  { id: "ORD-9901", customer: "Aetheris Corp", date: "Oct 24, 2023", items: 12, total: "$12,400.00", status: "Processing" },
  { id: "ORD-9902", customer: "Nexus Systems", date: "Oct 24, 2023", items: 4, total: "$8,250.00", status: "Shipped" },
  { id: "ORD-9903", customer: "Lumina Labs", date: "Oct 23, 2023", items: 2, total: "$4,100.00", status: "Delivered" },
  { id: "ORD-9904", customer: "Veloce Market", date: "Oct 23, 2023", items: 45, total: "$15,800.00", status: "Pending" },
  { id: "ORD-9905", customer: "NeoVault Solutions", date: "Oct 22, 2023", items: 8, total: "$2,900.00", status: "Cancelled" },
  { id: "ORD-9906", customer: "Horizon Tech", date: "Oct 22, 2023", items: 3, total: "$6,700.00", status: "Delivered" },
  { id: "ORD-9907", customer: "CloudScale Inc", date: "Oct 21, 2023", items: 1, total: "$1,250.00", status: "Shipped" },
];

export default function OrdersPage() {
  return (
    <div className="flex flex-col h-full">
      <Header title="Order Management" />
      <div className="flex-1 overflow-y-auto p-8 space-y-8">
        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { label: "Pending", value: "14", icon: Clock, color: "text-amber-600" },
            { label: "Processing", value: "28", icon: CheckCircle2, color: "text-blue-600" },
            { label: "Shipped", value: "42", icon: Truck, color: "text-indigo-600" },
            { label: "Delivered", value: "156", icon: CheckCircle2, color: "text-emerald-600" },
          ].map((stat) => (
            <div key={stat.label} className="rounded-md border border-border bg-background p-4 flex items-center gap-4">
              <div className={cn("p-2 rounded-full bg-muted", stat.color)}>
                <stat.icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground">{stat.label}</p>
                <p className="text-xl font-bold">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Orders List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <input
                type="search"
                placeholder="Search orders..."
                className="h-9 w-64 rounded-md border border-border bg-background pl-9 pr-4 text-xs focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
            <button className="flex items-center gap-2 rounded-md border border-border bg-background px-3 py-1.5 text-xs font-medium hover:bg-muted transition-colors">
              <Download className="h-3 w-3" />
              Export CSV
            </button>
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="rounded-md border border-border bg-background overflow-hidden"
          >
            <div className="grid grid-cols-6 px-6 py-3 bg-muted/30 text-[10px] font-bold text-muted-foreground uppercase tracking-widest border-b border-border">
              <div className="col-span-1">Order ID</div>
              <div className="col-span-2">Customer</div>
              <div className="col-span-1">Items</div>
              <div className="col-span-1">Total</div>
              <div className="col-span-1">Status</div>
            </div>
            <div className="divide-y divide-border">
              {orders.map((order, index) => (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="grid grid-cols-6 px-6 py-4 items-center hover:bg-muted/30 transition-colors group cursor-pointer"
                >
                  <div className="col-span-1 text-sm font-medium">{order.id}</div>
                  <div className="col-span-2">
                    <p className="text-sm font-bold">{order.customer}</p>
                    <p className="text-[10px] text-muted-foreground">{order.date}</p>
                  </div>
                  <div className="col-span-1 text-sm">{order.items} items</div>
                  <div className="col-span-1 text-sm font-bold">{order.total}</div>
                  <div className="col-span-1 flex items-center justify-between">
                    <span className={cn(
                      "px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider",
                      order.status === "Delivered" ? "bg-emerald-100 text-emerald-700" :
                      order.status === "Shipped" ? "bg-blue-100 text-blue-700" :
                      order.status === "Processing" ? "bg-amber-100 text-amber-700" :
                      order.status === "Pending" ? "bg-slate-100 text-slate-700" :
                      "bg-rose-100 text-rose-700"
                    )}>
                      {order.status}
                    </span>
                    <ChevronRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-all" />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
