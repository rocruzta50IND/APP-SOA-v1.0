"use client";

import { Header } from "@/components/ui/Header";
import { 
  Package, 
  Search, 
  Filter, 
  Plus, 
  MoreVertical,
  ArrowUpDown,
  AlertTriangle
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const inventory = [
  { id: "SKU-9021", name: "Quantum Processor X1", category: "Electronics", stock: 2, price: "$2,400", status: "Low Stock" },
  { id: "SKU-8842", name: "Neural Display 27\"", category: "Hardware", stock: 5, price: "$850", status: "Low Stock" },
  { id: "SKU-7721", name: "Veloce Router Pro", category: "Networking", stock: 45, price: "$1,200", status: "In Stock" },
  { id: "SKU-6651", name: "Aetheris Server Rack", category: "Infrastructure", stock: 12, price: "$15,000", status: "In Stock" },
  { id: "SKU-5541", name: "Lumina Sensor Kit", category: "IoT", stock: 0, price: "$450", status: "Out of Stock" },
  { id: "SKU-4431", name: "Nexus Power Core", category: "Power", stock: 28, price: "$3,200", status: "In Stock" },
  { id: "SKU-3321", name: "NeoVault Storage Unit", category: "Storage", stock: 15, price: "$5,400", status: "In Stock" },
];

export default function InventoryPage() {
  return (
    <div className="flex flex-col h-full">
      <Header title="Inventory Management" />
      <div className="flex-1 overflow-y-auto p-8 space-y-6">
        {/* Actions Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <input
              type="search"
              placeholder="Search products..."
              className="h-10 w-full sm:w-80 rounded-md border border-border bg-background pl-9 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 rounded-md border border-border bg-background px-3 py-2 text-sm font-medium hover:bg-muted transition-colors">
              <Filter className="h-4 w-4" />
              Filter
            </button>
            <button className="flex items-center gap-2 rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:opacity-90 transition-opacity">
              <Plus className="h-4 w-4" />
              Add Product
            </button>
          </div>
        </div>

        {/* Inventory Table */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-md border border-border bg-background shadow-sm overflow-hidden"
        >
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-widest">
                  <div className="flex items-center gap-2">
                    Product
                    <ArrowUpDown className="h-3 w-3" />
                  </div>
                </th>
                <th className="px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-widest">SKU</th>
                <th className="px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-widest">Category</th>
                <th className="px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-widest">Stock</th>
                <th className="px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-widest">Price</th>
                <th className="px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-widest">Status</th>
                <th className="px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-widest"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {inventory.map((item) => (
                <tr key={item.id} className="hover:bg-muted/30 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded bg-muted flex items-center justify-center">
                        <Package className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <span className="text-sm font-bold">{item.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{item.id}</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{item.category}</td>
                  <td className="px-6 py-4 text-sm font-medium">{item.stock}</td>
                  <td className="px-6 py-4 text-sm font-medium">{item.price}</td>
                  <td className="px-6 py-4">
                    <span className={cn(
                      "inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider",
                      item.status === "In Stock" ? "bg-emerald-100 text-emerald-700" :
                      item.status === "Low Stock" ? "bg-amber-100 text-amber-700" :
                      "bg-rose-100 text-rose-700"
                    )}>
                      {item.status === "Low Stock" && <AlertTriangle className="h-3 w-3" />}
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-1 rounded hover:bg-muted opacity-0 group-hover:opacity-100 transition-opacity">
                      <MoreVertical className="h-4 w-4 text-muted-foreground" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="px-6 py-4 border-t border-border bg-muted/10 flex items-center justify-between">
            <span className="text-xs text-muted-foreground">Showing 7 of 142 products</span>
            <div className="flex items-center gap-2">
              <button className="px-3 py-1 text-xs border border-border rounded-md hover:bg-muted disabled:opacity-50" disabled>Previous</button>
              <button className="px-3 py-1 text-xs border border-border rounded-md hover:bg-muted">Next</button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
