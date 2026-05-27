"use client";

import { 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  Package, 
  AlertTriangle, 
  ArrowUpRight,
  Boxes
} from "lucide-react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from "recharts";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const inventoryStats = [
  { name: "Electronics", value: 450, color: "#4F46E5" },
  { name: "Furniture", value: 320, color: "#6366F1" },
  { name: "Apparel", value: 210, color: "#818CF8" },
  { name: "Beauty", value: 150, color: "#A5B4FC" },
  { name: "Others", value: 80, color: "#C7D2FE" },
];

const products = [
  { id: "SKU-901", name: "Neural Link Processor", category: "Electronics", stock: 12, price: "$499.00", status: "Low Stock" },
  { id: "SKU-902", name: "Quantum Display X1", category: "Electronics", stock: 45, price: "$899.00", status: "In Stock" },
  { id: "SKU-903", name: "ErgoDesk Pro", category: "Furniture", stock: 0, price: "$1,200.00", status: "Out of Stock" },
  { id: "SKU-904", name: "Titanium Case", category: "Accessories", stock: 124, price: "$89.00", status: "In Stock" },
  { id: "SKU-905", name: "Sonic Earbuds", category: "Electronics", stock: 8, price: "$199.00", status: "Low Stock" },
  { id: "SKU-906", name: "Fiber Optic Cable (10m)", category: "Connectivity", stock: 350, price: "$45.00", status: "In Stock" },
];

export default function InventoryPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
            Inventory Assets
          </h1>
          <p className="text-muted-foreground mt-1">Manage and track your global product catalog.</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 text-white rounded-xl gap-2 shadow-[0_0_20px_rgba(79,70,229,0.3)] transition-all">
          <Plus className="h-4 w-4" />
          Add Product
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 bg-white/5 border-white/10 backdrop-blur-md">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-semibold flex items-center gap-2">
              <Boxes className="h-4 w-4 text-primary" />
              Stock Distribution
            </CardTitle>
            <Badge variant="outline" className="border-white/10 text-[10px] uppercase tracking-wider font-mono">Total: 1,210 Units</Badge>
          </CardHeader>
          <CardContent className="h-[250px] w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={inventoryStats} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#ffffff08" />
                <XAxis type="number" hide />
                <YAxis 
                  dataKey="name" 
                  type="category" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#888888', fontSize: 10 }}
                  width={80}
                />
                <Tooltip 
                  cursor={{ fill: 'rgba(255, 255, 255, 0.05)' }}
                  contentStyle={{ 
                    backgroundColor: 'rgba(0, 0, 0, 0.8)', 
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '12px',
                    fontSize: '12px'
                  }} 
                />
                <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={20}>
                  {inventoryStats.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-white/10 backdrop-blur-md relative overflow-hidden group">
          <CardHeader>
            <CardTitle className="text-sm font-semibold text-rose-400 flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              Critical Alerts
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20">
              <p className="text-xs font-bold text-rose-400 uppercase tracking-wider">Out of Stock</p>
              <p className="text-sm font-medium mt-1">ErgoDesk Pro</p>
              <p className="text-[10px] text-muted-foreground mt-1">3 backorders pending</p>
            </div>
            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20">
              <p className="text-xs font-bold text-amber-400 uppercase tracking-wider">Low Stock</p>
              <p className="text-sm font-medium mt-1">Neural Link Processor</p>
              <p className="text-[10px] text-muted-foreground mt-1">12 units remaining</p>
            </div>
            <div className="p-3 rounded-xl bg-white/5 border border-white/10 opacity-50">
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Upcoming</p>
              <p className="text-sm font-medium mt-1">Quantum Display X1</p>
              <p className="text-[10px] text-muted-foreground mt-1">Restock scheduled in 2 days</p>
            </div>
          </CardContent>
          <div className="absolute top-0 right-0 w-24 h-24 bg-rose-500/5 blur-3xl rounded-full -z-10 group-hover:bg-rose-500/10 transition-all" />
        </Card>
      </div>

      <Card className="bg-white/5 border-white/10 backdrop-blur-md">
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <CardTitle className="text-sm font-semibold">Product Catalog</CardTitle>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search catalog..." className="pl-9 h-9 w-64 bg-white/5 border-white/10 text-xs" />
              </div>
              <Button variant="outline" size="sm" className="h-9 border-white/10 bg-white/5 gap-2 text-xs">
                <Filter className="h-3 w-3" />
                Filter
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="relative w-full overflow-auto">
            <table className="w-full caption-bottom text-sm">
              <thead className="[&_tr]:border-b border-white/5">
                <tr className="border-b border-white/5">
                  <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground text-[10px] uppercase tracking-widest">SKU</th>
                  <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground text-[10px] uppercase tracking-widest">Product Name</th>
                  <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground text-[10px] uppercase tracking-widest">Category</th>
                  <th className="h-10 px-4 text-center align-middle font-medium text-muted-foreground text-[10px] uppercase tracking-widest">Stock</th>
                  <th className="h-10 px-4 text-right align-middle font-medium text-muted-foreground text-[10px] uppercase tracking-widest">Price</th>
                  <th className="h-10 px-4 text-center align-middle font-medium text-muted-foreground text-[10px] uppercase tracking-widest">Status</th>
                  <th className="h-10 px-4 text-right align-middle font-medium text-muted-foreground text-[10px] uppercase tracking-widest"></th>
                </tr>
              </thead>
              <tbody className="[&_tr:last-child]:border-0">
                {products.map((product) => (
                  <tr key={product.id} className="border-b border-white/5 transition-colors hover:bg-white/5">
                    <td className="p-4 align-middle font-mono text-xs">{product.id}</td>
                    <td className="p-4 align-middle font-medium">{product.name}</td>
                    <td className="p-4 align-middle">
                      <Badge variant="outline" className="bg-white/5 border-white/10 font-normal text-[10px]">
                        {product.category}
                      </Badge>
                    </td>
                    <td className="p-4 align-middle text-center font-mono">{product.stock}</td>
                    <td className="p-4 align-middle text-right font-mono font-bold">{product.price}</td>
                    <td className="p-4 align-middle text-center">
                      <span className={cn(
                        "text-[10px] font-bold uppercase px-2 py-1 rounded-full",
                        product.status === "In Stock" ? "text-emerald-400 bg-emerald-400/10" :
                        product.status === "Low Stock" ? "text-amber-400 bg-amber-400/10" :
                        "text-rose-400 bg-rose-400/10"
                      )}>
                        {product.status}
                      </span>
                    </td>
                    <td className="p-4 align-middle text-right">
                      <button className="text-muted-foreground hover:text-white transition-colors">
                        <MoreVertical className="h-4 w-4" />
                      </button>
                    </td>
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
