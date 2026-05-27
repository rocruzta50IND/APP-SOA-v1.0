"use client";

import React from "react";
import { motion } from "framer-motion";
import { Search, Plus, Filter, MoreHorizontal, Package, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

const inventory = [
  { id: "PRD-001", name: "Aura Watch Pro", category: "Electronics", price: "$299.00", stock: 45, status: "In Stock" },
  { id: "PRD-002", name: "Nebula Headset", category: "Electronics", price: "$150.00", stock: 12, status: "Low Stock" },
  { id: "PRD-003", name: "Zenith Backpack", category: "Accessories", price: "$89.00", stock: 120, status: "In Stock" },
  { id: "PRD-004", name: "Quantum Mouse", category: "Electronics", price: "$65.00", stock: 0, status: "Out of Stock" },
  { id: "PRD-005", name: "Titanium Case", category: "Accessories", price: "$45.00", stock: 85, status: "In Stock" },
  { id: "PRD-006", name: "Solar Charger", category: "Electronics", price: "$79.00", stock: 34, status: "In Stock" },
];

export default function InventoryPage() {
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tighter text-white bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
            Inventory Management
          </h1>
          <p className="text-muted-foreground mt-1">Manage and track your product catalog.</p>
        </div>
        <button className="premium-button flex items-center gap-2 w-fit">
          <Plus className="h-4 w-4" /> Add Product
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search products..."
            className="h-10 w-full rounded-xl border border-white/10 bg-white/5 pl-10 pr-4 text-sm outline-none focus:border-primary/50 transition-all"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-xl border border-white/10 bg-white/5 text-sm font-medium text-white hover:bg-white/10 transition-all">
          <Filter className="h-4 w-4" /> Filters
        </button>
      </div>

      {/* Inventory Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        className="glass-card overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/5">
                <th className="px-6 py-4 text-[10px] uppercase tracking-widest font-bold text-muted-foreground">Product</th>
                <th className="px-6 py-4 text-[10px] uppercase tracking-widest font-bold text-muted-foreground">Category</th>
                <th className="px-6 py-4 text-[10px] uppercase tracking-widest font-bold text-muted-foreground">SKU</th>
                <th className="px-6 py-4 text-[10px] uppercase tracking-widest font-bold text-muted-foreground">Stock</th>
                <th className="px-6 py-4 text-[10px] uppercase tracking-widest font-bold text-muted-foreground">Price</th>
                <th className="px-6 py-4 text-[10px] uppercase tracking-widest font-bold text-muted-foreground">Status</th>
                <th className="px-6 py-4 text-[10px] uppercase tracking-widest font-bold text-muted-foreground text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {inventory.map((item) => (
                <tr key={item.id} className="hover:bg-white/5 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
                        <Package className="h-5 w-5 text-primary" />
                      </div>
                      <span className="text-sm font-medium text-white">{item.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{item.category}</td>
                  <td className="px-6 py-4 text-sm font-mono text-muted-foreground">{item.id}</td>
                  <td className="px-6 py-4 text-sm font-mono text-white">{item.stock}</td>
                  <td className="px-6 py-4 text-sm font-mono text-white">{item.price}</td>
                  <td className="px-6 py-4">
                    <span className={cn(
                      "inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider",
                      item.status === "In Stock" ? "bg-emerald-500/10 text-emerald-500" :
                      item.status === "Low Stock" ? "bg-amber-500/10 text-amber-500" :
                      "bg-rose-500/10 text-rose-500"
                    )}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 rounded-lg hover:bg-white/10 text-muted-foreground hover:text-white transition-all">
                      <MoreHorizontal className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-4 border-t border-white/5 bg-white/2 flex items-center justify-between text-xs text-muted-foreground font-medium">
          Showing 6 of 124 products
          <div className="flex gap-2">
            <button className="px-3 py-1 rounded-lg border border-white/10 hover:bg-white/5 transition-all">Previous</button>
            <button className="px-3 py-1 rounded-lg border border-white/10 hover:bg-white/5 transition-all">Next</button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
