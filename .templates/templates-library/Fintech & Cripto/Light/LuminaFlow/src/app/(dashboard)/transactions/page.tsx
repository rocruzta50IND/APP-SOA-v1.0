"use client";

import React from "react";
import { Search, Filter, Download, ArrowUpRight, ArrowDownRight, RefreshCcw } from "lucide-react";
import { cn } from "@/lib/utils";

const transactions = [
  { id: "TX-9021", type: "Buy", asset: "Bitcoin", symbol: "BTC", amount: "0.05 BTC", price: "$3,210.50", date: "May 12, 2026", status: "Completed" },
  { id: "TX-9020", type: "Sell", asset: "Ethereum", symbol: "ETH", amount: "1.5 ETH", price: "$5,130.00", date: "May 10, 2026", status: "Completed" },
  { id: "TX-9019", type: "Transfer", asset: "USDT", symbol: "USDT", amount: "2,000 USDT", price: "$2,000.00", date: "May 08, 2026", status: "Pending" },
  { id: "TX-9018", type: "Buy", asset: "Solana", symbol: "SOL", amount: "15.0 SOL", price: "$2,175.00", date: "May 05, 2026", status: "Completed" },
  { id: "TX-9017", type: "Withdrawal", asset: "USD", symbol: "USD", amount: "$5,000.00", price: "$5,000.00", date: "May 02, 2026", status: "Failed" },
  { id: "TX-9016", type: "Buy", asset: "Bitcoin", symbol: "BTC", amount: "0.01 BTC", price: "$640.20", date: "Apr 28, 2026", status: "Completed" },
  { id: "TX-9015", type: "Sell", asset: "Chainlink", symbol: "LINK", amount: "100 LINK", price: "$1,800.00", date: "Apr 25, 2026", status: "Completed" },
  { id: "TX-9014", type: "Buy", asset: "Ethereum", symbol: "ETH", amount: "0.5 ETH", price: "$1,710.00", date: "Apr 20, 2026", status: "Completed" },
  { id: "TX-9013", type: "Deposit", asset: "USD", symbol: "USD", amount: "$10,000.00", price: "$10,000.00", date: "Apr 15, 2026", status: "Completed" },
];

export default function TransactionsPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Transactions</h1>
          <p className="text-muted-foreground">Review and export your transaction history.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 rounded-md border border-border bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-muted">
            <Download className="h-4 w-4" />
            Export CSV
          </button>
          <button className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90">
            New Transaction
          </button>
        </div>
      </div>

      <div className="rounded-md border border-border bg-background shadow-sm">
        <div className="border-b border-border p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative w-80">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input 
                  type="text" 
                  placeholder="Search transactions..." 
                  className="h-9 w-full rounded-md border border-border bg-muted/30 pl-10 pr-4 text-sm outline-none focus:bg-background"
                />
              </div>
              <button className="flex h-9 items-center gap-2 rounded-md border border-border bg-background px-3 text-sm font-medium hover:bg-muted">
                <Filter className="h-4 w-4 text-muted-foreground" />
                Filters
              </button>
            </div>
            <p className="text-xs text-muted-foreground">Showing 1-9 of 142 transactions</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-border text-[10px] font-medium uppercase tracking-widest text-muted-foreground bg-muted/30">
                <th className="py-3 pl-6">ID</th>
                <th className="py-3 px-4">Type</th>
                <th className="py-3 px-4">Asset</th>
                <th className="py-3 px-4 text-right">Amount</th>
                <th className="py-3 px-4 text-right">Value</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 pr-6 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {transactions.map((tx) => (
                <tr key={tx.id} className="group transition-colors hover:bg-muted/50">
                  <td className="py-4 pl-6 text-xs font-mono text-muted-foreground">{tx.id}</td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <div className={cn(
                        "flex h-7 w-7 items-center justify-center rounded-md",
                        tx.type === "Buy" ? "bg-green-100 text-green-700" :
                        tx.type === "Sell" ? "bg-red-100 text-red-700" :
                        tx.type === "Transfer" ? "bg-blue-100 text-blue-700" : "bg-muted text-primary"
                      )}>
                        {tx.type === "Buy" ? <ArrowDownRight className="h-3.5 w-3.5" /> :
                         tx.type === "Sell" ? <ArrowUpRight className="h-3.5 w-3.5" /> :
                         tx.type === "Transfer" ? <RefreshCcw className="h-3.5 w-3.5" /> : <Download className="h-3.5 w-3.5" />}
                      </div>
                      <span className="text-sm font-medium">{tx.type}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold">{tx.asset}</span>
                      <span className="text-[10px] text-muted-foreground">{tx.symbol}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-right text-sm font-medium">{tx.amount}</td>
                  <td className="py-4 px-4 text-right text-sm font-semibold">{tx.price}</td>
                  <td className="py-4 px-4 text-sm text-muted-foreground">{tx.date}</td>
                  <td className="py-4 pr-6 text-right">
                    <span className={cn(
                      "inline-flex items-center rounded-md px-2 py-1 text-[10px] font-bold uppercase tracking-wider",
                      tx.status === "Completed" ? "bg-green-50 text-green-700 border border-green-200" :
                      tx.status === "Pending" ? "bg-amber-50 text-amber-700 border border-amber-200" :
                      "bg-red-50 text-red-700 border border-red-200"
                    )}>
                      {tx.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="border-t border-border p-4 flex items-center justify-center">
          <nav className="flex items-center gap-1">
            <button className="h-8 w-8 rounded-md border border-border flex items-center justify-center text-muted-foreground hover:bg-muted disabled:opacity-50" disabled>
              &lt;
            </button>
            <button className="h-8 w-8 rounded-md bg-primary text-primary-foreground text-xs font-bold">1</button>
            <button className="h-8 w-8 rounded-md border border-border text-xs hover:bg-muted">2</button>
            <button className="h-8 w-8 rounded-md border border-border text-xs hover:bg-muted">3</button>
            <span className="px-2 text-muted-foreground">...</span>
            <button className="h-8 w-8 rounded-md border border-border text-xs hover:bg-muted">12</button>
            <button className="h-8 w-8 rounded-md border border-border flex items-center justify-center text-muted-foreground hover:bg-muted">
              &gt;
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
}
