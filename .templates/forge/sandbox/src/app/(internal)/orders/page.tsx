"use client";

import { 
  Clock, 
  CheckCircle2, 
  Truck, 
  AlertCircle,
  FileText,
  Download
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const orders = [
  { id: "LX-10082", date: "2024-05-12", customer: "Sophia Anderson", items: 3, total: "$840.00", status: "Delivered", payment: "Paid" },
  { id: "LX-10081", date: "2024-05-12", customer: "Marcus Wright", items: 1, total: "$2,100.00", status: "Processing", payment: "Paid" },
  { id: "LX-10080", date: "2024-05-11", customer: "Elena Rossi", items: 5, total: "$12,450.00", status: "Shipped", payment: "Paid" },
  { id: "LX-10079", date: "2024-05-11", customer: "James Chen", items: 2, total: "$540.00", status: "Pending", payment: "Authorized" },
  { id: "LX-10078", date: "2024-05-10", customer: "Isabella Garcia", items: 4, total: "$3,200.00", status: "Delivered", payment: "Paid" },
];

export default function OrdersPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Sales Orders</h1>
        <Button variant="outline" className="flex items-center gap-2">
          <Download className="h-4 w-4" />
          Export Report
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card className="border-border shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs font-medium text-muted-foreground uppercase">Pending</CardTitle>
            <Clock className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
          </CardContent>
        </Card>
        <Card className="border-border shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs font-medium text-muted-foreground uppercase">Processing</CardTitle>
            <AlertCircle className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
          </CardContent>
        </Card>
        <Card className="border-border shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs font-medium text-muted-foreground uppercase">Shipped</CardTitle>
            <Truck className="h-4 w-4 text-indigo-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
          </CardContent>
        </Card>
        <Card className="border-border shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs font-medium text-muted-foreground uppercase">Completed</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,402</div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-border shadow-sm">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted/50 border-b border-border">
                <tr>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground uppercase tracking-widest text-[10px]">Order ID</th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground uppercase tracking-widest text-[10px]">Date</th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground uppercase tracking-widest text-[10px]">Customer</th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground uppercase tracking-widest text-[10px]">Items</th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground uppercase tracking-widest text-[10px]">Total</th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground uppercase tracking-widest text-[10px]">Status</th>
                  <th className="px-4 py-3 text-right font-medium text-muted-foreground uppercase tracking-widest text-[10px]">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {orders.map((order) => (
                  <tr key={order.id} className="hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-3 font-mono font-medium">{order.id}</td>
                    <td className="px-4 py-3 text-muted-foreground">{order.date}</td>
                    <td className="px-4 py-3 font-medium">{order.customer}</td>
                    <td className="px-4 py-3">{order.items}</td>
                    <td className="px-4 py-3 font-mono font-semibold">{order.total}</td>
                    <td className="px-4 py-3">
                      <Badge 
                        variant="secondary"
                        className={cn(
                          "text-[10px] uppercase tracking-wider",
                          order.status === "Pending" && "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
                          order.status === "Delivered" && "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
                          order.status === "Shipped" && "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                        )}
                      >
                        {order.status}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <Button variant="ghost" size="sm" className="h-8 gap-1">
                        <FileText className="h-3 w-3" />
                        Details
                      </Button>
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
