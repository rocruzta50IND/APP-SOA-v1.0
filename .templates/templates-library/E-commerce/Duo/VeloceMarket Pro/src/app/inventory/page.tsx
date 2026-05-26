"use client";

import { Sidebar } from "@/components/ui/Sidebar";
import { cn } from "@/lib/utils";
import { 
  Search, 
  Filter, 
  Download, 
  Plus, 
  MoreVertical,
  AlertTriangle,
  CheckCircle2,
  Clock
} from "lucide-react";

const inventory = [
  { id: "VM-101", name: "Industrial Steel Case", category: "Hardware", stock: 1240, warehouse: "Hub North", status: "Healthy" },
  { id: "VM-102", name: "Circuit Board v4", category: "Electronics", stock: 85, warehouse: "Hub South", status: "Critical" },
  { id: "VM-103", name: "Heavy Duty Motor", category: "Machinery", stock: 450, warehouse: "West Coast", status: "Reordering" },
  { id: "VM-104", name: "Optical Sensor", category: "Electronics", stock: 2100, warehouse: "Hub North", status: "Healthy" },
  { id: "VM-105", name: "Power Supply 500W", category: "Electronics", stock: 12, warehouse: "East Central", status: "Critical" },
];

export default function InventoryPage() {
  return (
    <div className="min-h-screen bg-muted/20">
      <Sidebar />
      <main className="pl-64 pr-8 pt-20 pb-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Inventory Management</h1>
              <p className="text-muted-foreground mt-1">Multi-warehouse stock control and tracking</p>
            </div>
            <div className="flex gap-4">
              <button className="flex items-center gap-2 px-4 py-2 border border-border bg-background rounded-xl text-sm font-medium hover:bg-muted transition-colors">
                <Download className="size-4" />
                Export CSV
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-xl text-sm font-medium hover:bg-primary/90 transition-colors">
                <Plus className="size-4" />
                Add Item
              </button>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <input 
                placeholder="Search products, SKUs, or categories..."
                className="w-full h-11 pl-10 pr-4 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary/20 outline-none transition-all"
              />
            </div>
            <button className="flex items-center gap-2 px-4 py-2 border border-border bg-background rounded-xl text-sm font-medium hover:bg-muted transition-colors">
              <Filter className="size-4" />
              Filter
            </button>
          </div>

          <div className="border border-border bg-background rounded-2xl overflow-hidden shadow-sm">
            <table className="w-full text-left">
              <thead className="bg-muted/50 border-b border-border">
                <tr>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">Product</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">SKU</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">Stock Level</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">Warehouse</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">Status</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {inventory.map((item, i) => (
                  <tr key={i} className="hover:bg-muted/30 transition-colors">
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-bold text-sm">{item.name}</p>
                        <p className="text-xs text-muted-foreground">{item.category}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-muted-foreground">{item.id}</td>
                    <td className="px-6 py-4 font-bold text-sm">{item.stock.toLocaleString()}</td>
                    <td className="px-6 py-4 text-sm">{item.warehouse}</td>
                    <td className="px-6 py-4">
                      <span className={cn(
                        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase",
                        item.status === "Healthy" ? "bg-emerald-500/10 text-emerald-500" : 
                        item.status === "Critical" ? "bg-red-500/10 text-red-500" : 
                        "bg-amber-500/10 text-amber-500"
                      )}>
                        {item.status === "Healthy" && <CheckCircle2 className="size-3" />}
                        {item.status === "Critical" && <AlertTriangle className="size-3" />}
                        {item.status === "Reordering" && <Clock className="size-3" />}
                        {item.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="p-2 hover:bg-muted rounded-lg transition-colors text-muted-foreground">
                        <MoreVertical className="size-4" />
                      </button>
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