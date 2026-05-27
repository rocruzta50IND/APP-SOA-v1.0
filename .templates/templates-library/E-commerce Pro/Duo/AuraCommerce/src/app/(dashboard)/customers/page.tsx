"use client";

import React from "react";
import { motion } from "framer-motion";
import { Search, Mail, Phone, MoreHorizontal, UserCheck, Star } from "lucide-react";
import { cn } from "@/lib/utils";

const customers = [
  { id: 1, name: "Sarah Jenkins", email: "sarah.j@example.com", phone: "+1 (555) 123-4567", spent: "$12,450", orders: 24, status: "VIP" },
  { id: 2, name: "Michael Chen", email: "m.chen@techcorp.com", phone: "+1 (555) 987-6543", spent: "$8,200", orders: 15, status: "Active" },
  { id: 3, name: "Emma Wilson", email: "emma.w@designly.io", phone: "+1 (555) 456-7890", spent: "$3,100", orders: 8, status: "Active" },
  { id: 4, name: "James Miller", email: "jmiller@freelance.com", phone: "+1 (555) 234-5678", spent: "$950", orders: 3, status: "New" },
  { id: 5, name: "Olivia Brown", email: "olivia.b@creative.net", phone: "+1 (555) 345-6789", spent: "$5,600", orders: 12, status: "Active" },
  { id: 6, name: "Liam Davis", email: "liam.d@startup.co", phone: "+1 (555) 876-5432", spent: "$15,200", orders: 31, status: "VIP" },
];

export default function CustomersPage() {
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tighter text-white bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
          Customer Directory
        </h1>
        <p className="text-muted-foreground mt-1">Manage relationships and view customer lifetime value.</p>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: "Total Customers", value: "1,240", sub: "+48 this month" },
          { label: "Average Order Value", value: "$182.50", sub: "+5.2% from Q3" },
          { label: "Retention Rate", value: "94.2%", sub: "Industry leading" },
        ].map((stat, idx) => (
          <div key={idx} className="glass-card p-6 border-l-4 border-l-primary">
            <p className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">{stat.label}</p>
            <h3 className="text-2xl font-black text-white mt-1 font-mono">{stat.value}</h3>
            <p className="text-xs text-primary mt-1 font-medium">{stat.sub}</p>
          </div>
        ))}
      </div>

      {/* Customer List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {customers.map((customer, index) => (
          <motion.div
            key={customer.id}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 400, damping: 30, delay: index * 0.05 }}
            className="glass-card p-6 flex flex-col md:flex-row gap-6 hover:bg-white/10 transition-all group"
          >
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary to-primary/40 flex items-center justify-center text-white font-bold text-lg border border-white/20">
                  {customer.name.charAt(0)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-lg font-bold text-white">{customer.name}</h4>
                    {customer.status === "VIP" && <Star className="h-4 w-4 fill-amber-500 text-amber-500" />}
                  </div>
                  <span className={cn(
                    "text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full",
                    customer.status === "VIP" ? "bg-amber-500/10 text-amber-500" :
                    customer.status === "Active" ? "bg-emerald-500/10 text-emerald-500" :
                    "bg-blue-500/10 text-blue-500"
                  )}>
                    {customer.status}
                  </span>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Mail className="h-4 w-4" /> {customer.email}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Phone className="h-4 w-4" /> {customer.phone}
                </div>
              </div>
            </div>

            <div className="flex flex-row md:flex-col justify-between md:text-right border-t md:border-t-0 md:border-l border-white/5 pt-4 md:pt-0 md:pl-6">
              <div>
                <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Total Spent</p>
                <p className="text-xl font-black text-white font-mono">{customer.spent}</p>
              </div>
              <div className="mt-auto">
                <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Orders</p>
                <p className="text-lg font-bold text-white font-mono">{customer.orders}</p>
              </div>
              <div className="hidden md:flex justify-end gap-2 mt-4">
                <button className="h-8 px-3 rounded-lg bg-white/5 border border-white/10 text-xs font-bold uppercase tracking-widest text-white hover:bg-primary transition-all">
                  Profile
                </button>
                <button className="h-8 w-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-muted-foreground hover:text-white transition-all">
                  <MoreHorizontal className="h-4 w-4" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
