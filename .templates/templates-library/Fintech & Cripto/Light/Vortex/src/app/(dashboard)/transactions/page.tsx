"use client";

import React from "react";
import { 
  Search, 
  Filter, 
  ArrowUpRight, 
  ArrowDownRight, 
  ArrowLeftRight,
  ChevronLeft,
  ChevronRight,
  Download,
  Calendar,
  MoreHorizontal
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const transactionData = [
  { id: "TX-9021", type: "received", asset: "BTC", amount: "0.45000000", value: "$19,008.94", status: "completed", date: "2024-05-28 14:20:12", address: "bc1qxy2kg...v7pk" },
  { id: "TX-9020", type: "sent", asset: "ETH", amount: "2.50000000", value: "$6,127.80", status: "completed", date: "2024-05-28 11:05:45", address: "0x71C765...d897" },
  { id: "TX-9019", type: "swapped", asset: "SOL/USDC", amount: "125.0000", value: "$12,806.25", status: "completed", date: "2024-05-27 23:45:30", address: "Vortex Internal" },
  { id: "TX-9018", type: "received", asset: "USDT", amount: "5,000.00", value: "$5,000.00", status: "pending", date: "2024-05-27 18:12:05", address: "0x3A2b...E4f1" },
  { id: "TX-9017", type: "sent", asset: "BTC", amount: "0.10000000", value: "$4,224.21", status: "completed", date: "2024-05-27 09:30:15", address: "bc1p09...z4x9" },
  { id: "TX-9016", type: "received", asset: "LINK", amount: "500.0000", value: "$9,250.00", status: "completed", date: "2024-05-26 15:55:00", address: "0x889...a2b3" },
  { id: "TX-9015", type: "swapped", asset: "DOT/ETH", amount: "1,000.0", value: "$7,230.00", status: "failed", date: "2024-05-26 10:20:44", address: "Vortex Internal" },
  { id: "TX-9014", type: "received", asset: "BTC", amount: "0.05000000", value: "$2,112.10", status: "completed", date: "2024-05-25 21:10:12", address: "bc1qxy2kg...v7pk" },
];

export default function TransactionsPage() {
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-black uppercase tracking-tighter">Transaction Ledger</h1>
          <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold">Immutable record of all account activities</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" className="h-8 rounded-none text-[10px] uppercase font-black tracking-widest">
            <Calendar size={14} className="mr-2" /> Date Range
          </Button>
          <Button variant="outline" size="sm" className="h-8 rounded-none text-[10px] uppercase font-black tracking-widest">
            <Download size={14} className="mr-2" /> Download Log
          </Button>
        </div>
      </div>

      {/* Filters Bar */}
      <Card className="rounded-none border-border/50 bg-muted/30">
        <CardContent className="p-4 flex flex-col md:flex-row gap-4 items-center">
          <div className="relative flex-1 w-full group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <input 
              type="text" 
              placeholder="SEARCH BY TXID, ADDRESS, OR ASSET..." 
              className="h-10 w-full bg-background border border-border pl-10 text-[10px] uppercase tracking-widest focus:outline-none focus:ring-1 focus:ring-primary transition-all"
            />
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
            {["All", "Sent", "Received", "Swapped", "Failed"].map((filter) => (
              <button 
                key={filter}
                className={cn(
                  "px-4 py-2 text-[10px] font-black uppercase tracking-widest border transition-all whitespace-nowrap",
                  filter === "All" ? "bg-primary text-primary-foreground border-primary" : "bg-background border-border hover:bg-muted"
                )}
              >
                {filter}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Ledger Table */}
      <Card className="rounded-none border-border/50">
        <CardContent className="p-0">
          <div className="relative overflow-x-auto">
            <table className="w-full text-left">
              <thead className="text-[10px] uppercase tracking-widest text-muted-foreground border-b border-border/50 bg-muted/20">
                <tr>
                  <th className="px-6 py-4 font-bold">TX ID</th>
                  <th className="px-6 py-4 font-bold">Type</th>
                  <th className="px-6 py-4 font-bold">Asset</th>
                  <th className="px-6 py-4 font-bold">Amount</th>
                  <th className="px-6 py-4 font-bold">Value</th>
                  <th className="px-6 py-4 font-bold">Status</th>
                  <th className="px-6 py-4 font-bold">Date & Time</th>
                  <th className="px-6 py-4 font-bold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                {transactionData.map((tx) => (
                  <tr key={tx.id} className="group hover:bg-muted/30 transition-colors">
                    <td className="px-6 py-4">
                      <p className="text-[10px] font-black tracking-widest font-mono text-muted-foreground group-hover:text-primary transition-colors cursor-pointer underline underline-offset-4">
                        {tx.id}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {tx.type === "received" ? (
                          <div className="h-6 w-6 flex items-center justify-center bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                            <ArrowDownRight size={12} />
                          </div>
                        ) : tx.type === "sent" ? (
                          <div className="h-6 w-6 flex items-center justify-center bg-rose-500/10 text-rose-500 border border-rose-500/20">
                            <ArrowUpRight size={12} />
                          </div>
                        ) : (
                          <div className="h-6 w-6 flex items-center justify-center bg-amber-500/10 text-amber-500 border border-amber-500/20">
                            <ArrowLeftRight size={12} />
                          </div>
                        )}
                        <span className="text-[10px] font-black uppercase tracking-widest">{tx.type}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-[10px] font-black uppercase tracking-widest">{tx.asset}</span>
                    </td>
                    <td className="px-6 py-4 font-mono text-[10px] font-bold tracking-tight">
                      {tx.amount}
                    </td>
                    <td className="px-6 py-4 font-mono text-[10px] font-bold tracking-tight">
                      {tx.value}
                    </td>
                    <td className="px-6 py-4">
                      <span className={cn(
                        "px-2 py-0.5 text-[8px] font-black uppercase tracking-widest border",
                        tx.status === "completed" 
                          ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" 
                          : tx.status === "pending"
                          ? "bg-amber-500/10 text-amber-500 border-amber-500/20"
                          : "bg-rose-500/10 text-rose-500 border-rose-500/20"
                      )}>
                        {tx.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-[10px] font-bold text-muted-foreground uppercase">{tx.date}</p>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Button variant="ghost" size="icon" className="h-8 w-8 rounded-none">
                        <MoreHorizontal size={14} />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
          Showing 1 - 8 of 1,245 transactions
        </p>
        <div className="flex items-center gap-1">
          <Button variant="outline" size="icon" className="h-8 w-8 rounded-none disabled:opacity-30" disabled>
            <ChevronLeft size={16} />
          </Button>
          {[1, 2, 3, "...", 156].map((page, i) => (
            <Button 
              key={i} 
              variant={page === 1 ? "primary" : "outline"} 
              className={cn("h-8 w-8 p-0 rounded-none text-[10px] font-black", typeof page === "string" && "border-none pointer-events-none")}
            >
              {page}
            </Button>
          ))}
          <Button variant="outline" size="icon" className="h-8 w-8 rounded-none">
            <ChevronRight size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
}
