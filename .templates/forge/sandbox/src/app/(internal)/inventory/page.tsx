"use client";

import { 
  Plus, 
  Search, 
  Filter, 
  MoreHorizontal, 
  ArrowUpDown,
  AlertTriangle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const products = [
  { id: "SKU-901", name: "Premium Leather Satchel", stock: 45, price: "$249.00", category: "Accessories", status: "In Stock" },
  { id: "SKU-902", name: "Minimalist Ceramic Vase", stock: 12, price: "$89.00", category: "Home Decor", status: "Low Stock" },
  { id: "SKU-903", name: "Solid Oak Coffee Table", stock: 8, price: "$599.00", category: "Furniture", status: "Low Stock" },
  { id: "SKU-904", name: "Brass Desk Lamp", stock: 0, price: "$129.00", category: "Lighting", status: "Out of Stock" },
  { id: "SKU-905", name: "Linen Throw Pillow", stock: 120, price: "$45.00", category: "Home Decor", status: "In Stock" },
  { id: "SKU-906", name: "Hand-Woven Area Rug", stock: 15, price: "$899.00", category: "Furniture", status: "In Stock" },
];

export default function InventoryPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Inventory Management</h1>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Product
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-border shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-medium text-muted-foreground uppercase">Total SKUs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,284</div>
          </CardContent>
        </Card>
        <Card className="border-border shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-medium text-muted-foreground uppercase">Out of Stock</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center gap-2">
            <div className="text-2xl font-bold text-red-500">14</div>
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </CardContent>
        </Card>
        <Card className="border-border shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-medium text-muted-foreground uppercase">Inventory Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$428,500.00</div>
          </CardContent>
        </Card>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search SKU, name..." className="pl-9" />
        </div>
        <Button variant="outline" className="flex items-center gap-2">
          <Filter className="h-4 w-4" />
          Filters
        </Button>
      </div>

      <div className="rounded-md border border-border bg-background shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted/50 border-b border-border">
            <tr>
              <th className="px-4 py-3 text-left font-medium text-muted-foreground uppercase tracking-widest text-[10px]">
                <div className="flex items-center gap-1">Product <ArrowUpDown className="h-3 w-3" /></div>
              </th>
              <th className="px-4 py-3 text-left font-medium text-muted-foreground uppercase tracking-widest text-[10px]">Category</th>
              <th className="px-4 py-3 text-left font-medium text-muted-foreground uppercase tracking-widest text-[10px]">Stock</th>
              <th className="px-4 py-3 text-left font-medium text-muted-foreground uppercase tracking-widest text-[10px]">Price</th>
              <th className="px-4 py-3 text-left font-medium text-muted-foreground uppercase tracking-widest text-[10px]">Status</th>
              <th className="px-4 py-3 text-right font-medium text-muted-foreground uppercase tracking-widest text-[10px]">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {products.map((product) => (
              <tr key={product.id} className="hover:bg-muted/30 transition-colors">
                <td className="px-4 py-3">
                  <div className="font-medium">{product.name}</div>
                  <div className="text-[10px] text-muted-foreground">{product.id}</div>
                </td>
                <td className="px-4 py-3 text-muted-foreground">{product.category}</td>
                <td className="px-4 py-3">{product.stock}</td>
                <td className="px-4 py-3 font-mono">{product.price}</td>
                <td className="px-4 py-3">
                  <Badge 
                    variant={product.status === "In Stock" ? "secondary" : "outline"}
                    className={cn(
                      "text-[10px] uppercase tracking-wider",
                      product.status === "Out of Stock" && "border-red-500 text-red-500",
                      product.status === "Low Stock" && "border-amber-500 text-amber-500"
                    )}
                  >
                    {product.status}
                  </Badge>
                </td>
                <td className="px-4 py-3 text-right">
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
