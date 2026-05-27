"use client";

import React from "react";
import { motion } from "framer-motion";
import { Search, ShoppingCart, User, Calendar, ExternalLink, MoreVertical } from "lucide-react";
import { cn } from "@/lib/utils";

const orders = [
  { id: "#ORD-9281", customer: "Sarah Jenkins", date: "Oct 24, 2023", amount: "$1,240.00", status: "Completed", method: "Visa •••• 4242" },
  { id: "#ORD-9282", customer: "Michael Chen", date: "Oct 24, 2023", amount: "$850.00", status: "Processing", method: "MasterCard •••• 5555" },
  { id: "#ORD-9283", customer: "Emma Wilson", date: "Oct 23, 2023", amount: "$2,100.00", status: "Completed", method: "PayPal" },
  { id: "#ORD-9284", customer: "James Miller", date: "Oct 23, 2023", amount: "$420.00", status: "Pending", method: "Visa •••• 1111" },
  { id: "#ORD-9285", customer: "Olivia Brown", date: "Oct 22, 2023", amount: "$1,560.00", status: "Shipped", method: "Apple Pay" },
  { id: "#ORD-9286", customer: "Liam Davis", date: "Oct 22, 2023", amount: "$930.00", status: "Completed", method: "Visa •••• 9999" },
];

export default function OrdersPage() {
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tighter text-white bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
          Recent Orders
        </h1>
        <p className="text-muted-foreground mt-1">Track and manage customer transactions.</p>
      </div>

      {/* Search and Tabs */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex bg-white/5 p-1 rounded-xl border border-white/5">
          {["All Orders", "Active", "Completed", "Cancelled"].map((tab, idx) => (
            <button 
              key={tab} 
              className={cn(
                "px-4 py-1.5 text-xs font-bold uppercase tracking-widest rounded-lg transition-all",
                idx === 0 ? "bg-primary text-white" : "text-muted-foreground hover:text-white"
              )}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search orders..."
            className="h-9 w-full rounded-lg border border-white/10 bg-white/5 pl-10 pr-4 text-xs outline-none focus:border-primary/50 transition-all"
          />
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {orders.map((order, index) => (
          <motion.div
            key={order.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 30, delay: index * 0.05 }}
            className="glass-card p-4 hover:bg-white/10 transition-all group"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                  <ShoppingCart className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-white font-mono">{order.id}</span>
                    <span className={cn(
                      "text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full",
                      order.status === "Completed" ? "text-emerald-500 bg-emerald-500/10" :
                      order.status === "Processing" ? "text-blue-500 bg-blue-500/10" :
                      order.status === "Shipped" ? "text-purple-500 bg-purple-500/10" :
                      "text-amber-500 bg-amber-500/10"
                    )}>
                      {order.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 mt-1">
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <User className="h-3 w-3" /> {order.customer}
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3" /> {order.date}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between md:justify-end gap-8">
                <div className="text-right">
                  <p className="text-sm font-black text-white font-mono">{order.amount}</p>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-widest">{order.method}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button className="h-8 w-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-muted-foreground hover:text-white transition-all">
                    <ExternalLink className="h-4 w-4" />
                  </button>
                  <button className="h-8 w-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-muted-foreground hover:text-white transition-all">
                    <MoreVertical className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      <div className="flex justify-center pt-4">
        <button className="text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors">
          Load More Orders
        </button>
      </div>
    </div>
  );
}
