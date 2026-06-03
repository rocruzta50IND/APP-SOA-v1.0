"use client";

import React from "react";
import { 
  LineChart, 
  Line, 
  ResponsiveContainer 
} from "recharts";
import { Search, TrendingUp, TrendingDown, Clock, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const sparklineData = [
  { value: 40 }, { value: 35 }, { value: 55 }, { value: 45 }, { value: 60 }, { value: 50 }, { value: 75 }
];

const trendingAssets = [
  { name: "Bitcoin", symbol: "BTC", price: "$64,210.00", change: "+4.2%", up: true },
  { name: "Ethereum", symbol: "ETH", price: "$3,420.00", change: "+2.8%", up: true },
  { name: "Solana", symbol: "SOL", price: "$145.00", change: "+12.5%", up: true },
  { name: "Cardano", symbol: "ADA", price: "$0.45", change: "-1.2%", up: false },
];

const marketOverview = [
  { id: 1, name: "Bitcoin", symbol: "BTC", price: "$64,210.00", mcap: "$1.2T", volume: "$35.2B", change: "+4.2%", up: true },
  { id: 2, name: "Ethereum", symbol: "ETH", price: "$3,420.00", mcap: "$412.5B", volume: "$18.4B", change: "+2.8%", up: true },
  { id: 3, name: "Tether", symbol: "USDT", price: "$1.00", mcap: "$110.2B", volume: "$65.1B", change: "0.0%", up: true },
  { id: 4, name: "BNB", symbol: "BNB", price: "$584.00", mcap: "$89.4B", volume: "$1.2B", change: "-0.5%", up: false },
  { id: 5, name: "Solana", symbol: "SOL", price: "$145.00", mcap: "$64.8B", volume: "$4.8B", change: "+12.5%", up: true },
  { id: 6, name: "XRP", symbol: "XRP", price: "$0.62", mcap: "$34.1B", volume: "$2.1B", change: "-1.8%", up: false },
  { id: 7, name: "USDC", symbol: "USDC", price: "$1.00", mcap: "$32.5B", volume: "$5.4B", change: "+0.01%", up: true },
  { id: 8, name: "Cardano", symbol: "ADA", price: "$0.45", mcap: "$16.2B", volume: "$450M", change: "-1.2%", up: false },
];

export default function MarketDataPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Market Data</h1>
          <p className="text-muted-foreground">Real-time tracking of global financial assets.</p>
        </div>
        <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
          <Clock className="h-3 w-3" />
          Last updated: 30s ago
        </div>
      </div>

      {/* Trending Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {trendingAssets.map((asset) => (
          <div key={asset.symbol} className="rounded-md border border-border bg-background p-4 shadow-sm transition-colors hover:border-primary/30">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-md bg-muted flex items-center justify-center font-bold text-[10px]">
                  {asset.symbol}
                </div>
                <div>
                  <p className="text-xs font-semibold">{asset.name}</p>
                  <p className="text-[10px] text-muted-foreground">{asset.symbol}</p>
                </div>
              </div>
              <div className={cn(
                "flex items-center gap-1 text-[10px] font-bold",
                asset.up ? "text-green-600" : "text-red-600"
              )}>
                {asset.up ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                {asset.change}
              </div>
            </div>
            <div className="mt-4 flex items-end justify-between">
              <h3 className="text-lg font-bold">{asset.price}</h3>
              <div className="h-8 w-16">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={sparklineData}>
                    <Line 
                      type="monotone" 
                      dataKey="value" 
                      stroke={asset.up ? "#16a34a" : "#dc2626"} 
                      strokeWidth={2} 
                      dot={false} 
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Market Overview Table */}
      <div className="rounded-md border border-border bg-background shadow-sm">
        <div className="border-b border-border p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold tracking-tight">Market Overview</h3>
            <div className="relative w-72">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input 
                type="text" 
                placeholder="Search by asset or ticker..." 
                className="h-9 w-full rounded-md border border-border bg-muted/30 pl-10 pr-4 text-sm outline-none focus:bg-background"
              />
            </div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-border text-[10px] font-medium uppercase tracking-widest text-muted-foreground bg-muted/30">
                <th className="py-3 pl-6">#</th>
                <th className="py-3 px-4">Asset</th>
                <th className="py-3 px-4 text-right">Price</th>
                <th className="py-3 px-4 text-right">24h Change</th>
                <th className="py-3 px-4 text-right">Market Cap</th>
                <th className="py-3 px-4 text-right">Volume (24h)</th>
                <th className="py-3 pr-6 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {marketOverview.map((item) => (
                <tr key={item.id} className="group transition-colors hover:bg-muted/50">
                  <td className="py-4 pl-6 text-xs text-muted-foreground">{item.id}</td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center font-bold text-[10px]">
                        {item.symbol[0]}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm font-semibold">{item.name}</span>
                        <span className="text-[10px] text-muted-foreground bg-muted px-1.5 rounded">{item.symbol}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-right text-sm font-medium">{item.price}</td>
                  <td className="py-4 px-4 text-right">
                    <span className={cn(
                      "text-xs font-bold",
                      item.up ? "text-green-600" : "text-red-600"
                    )}>
                      {item.change}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-right text-sm text-muted-foreground">{item.mcap}</td>
                  <td className="py-4 px-4 text-right text-sm text-muted-foreground">{item.volume}</td>
                  <td className="py-4 pr-6 text-right">
                    <button className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline">
                      Trade <ChevronRight className="h-3 w-3" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
