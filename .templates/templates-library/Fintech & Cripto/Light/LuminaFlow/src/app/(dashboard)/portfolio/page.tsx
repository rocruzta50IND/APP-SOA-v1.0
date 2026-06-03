"use client";

import React from "react";
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  Tooltip,
  Legend
} from "recharts";
import { Search, Filter, MoreHorizontal, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { cn } from "@/lib/utils";

const distributionData = [
  { name: "Bitcoin (BTC)", value: 45, color: "#18181b" },
  { name: "Ethereum (ETH)", value: 30, color: "#3f3f46" },
  { name: "Solana (SOL)", value: 15, color: "#71717a" },
  { name: "USDT", value: 10, color: "#a1a1aa" },
];

const assets = [
  { name: "Bitcoin", symbol: "BTC", balance: "0.842 BTC", value: "$54,064.82", price: "$64,210.00", change: "+2.4%", changeUp: true },
  { name: "Ethereum", symbol: "ETH", balance: "12.45 ETH", value: "$42,579.00", price: "$3,420.00", change: "-1.2%", changeUp: false },
  { name: "Solana", symbol: "SOL", balance: "245.00 SOL", value: "$35,525.00", price: "$145.00", change: "+8.5%", changeUp: true },
  { name: "Tether", symbol: "USDT", balance: "12,400 USDT", value: "$12,400.00", price: "$1.00", change: "0.0%", changeUp: true },
  { name: "Chainlink", symbol: "LINK", balance: "450.00 LINK", value: "$8,100.00", price: "$18.00", change: "-3.1%", changeUp: false },
  { name: "Polkadot", symbol: "DOT", balance: "1,200.00 DOT", value: "$8,400.00", price: "$7.00", change: "+1.5%", changeUp: true },
];

export default function PortfolioPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Portfolio</h1>
          <p className="text-muted-foreground">Manage and track your digital asset holdings.</p>
        </div>
        <button className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90">
          Add Asset
        </button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Distribution Chart */}
        <div className="col-span-1 rounded-md border border-border bg-background p-6 shadow-sm">
          <h3 className="mb-4 text-lg font-semibold tracking-tight">Asset Distribution</h3>
          <div className="h-[280px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={distributionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {distributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "hsl(var(--background))", 
                    borderColor: "hsl(var(--border))",
                    borderRadius: "6px",
                    fontSize: "12px"
                  }}
                />
                <Legend iconType="circle" wrapperStyle={{ fontSize: "12px", paddingTop: "20px" }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Portfolio Summary Table */}
        <div className="col-span-2 rounded-md border border-border bg-background p-6 shadow-sm">
          <div className="mb-6 flex items-center justify-between">
            <h3 className="text-lg font-semibold tracking-tight">Holdings</h3>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
                <input 
                  type="text" 
                  placeholder="Search assets..." 
                  className="h-8 rounded-md border border-border bg-muted/50 pl-8 pr-3 text-xs outline-none focus:bg-background"
                />
              </div>
              <button className="flex h-8 w-8 items-center justify-center rounded-md border border-border transition-colors hover:bg-muted">
                <Filter className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-border text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
                  <th className="pb-3 pl-2">Asset</th>
                  <th className="pb-3 text-right">Price</th>
                  <th className="pb-3 text-right">Balance</th>
                  <th className="pb-3 text-right">Value</th>
                  <th className="pb-3 text-right">24h Change</th>
                  <th className="pb-3 pr-2 text-right"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {assets.map((asset) => (
                  <tr key={asset.symbol} className="group transition-colors hover:bg-muted/30">
                    <td className="py-4 pl-2">
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-md bg-muted font-bold text-[10px] text-primary">
                          {asset.symbol}
                        </div>
                        <div>
                          <p className="text-sm font-semibold">{asset.name}</p>
                          <p className="text-[10px] text-muted-foreground">{asset.symbol}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 text-right text-sm font-medium">{asset.price}</td>
                    <td className="py-4 text-right">
                      <p className="text-sm font-medium">{asset.balance}</p>
                    </td>
                    <td className="py-4 text-right text-sm font-semibold">{asset.value}</td>
                    <td className="py-4 text-right">
                      <div className={cn(
                        "flex items-center justify-end gap-1 text-xs font-bold",
                        asset.changeUp ? "text-green-600" : "text-red-600"
                      )}>
                        {asset.changeUp ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                        {asset.change}
                      </div>
                    </td>
                    <td className="py-4 pr-2 text-right">
                      <button className="text-muted-foreground hover:text-primary">
                        <MoreHorizontal className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
