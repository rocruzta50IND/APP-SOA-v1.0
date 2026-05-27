"use client";

import { Search, Filter, ArrowUpRight, ArrowDownLeft, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

const assets = [
  { name: "Bitcoin", symbol: "BTC", price: "$64,230.12", change24h: "+2.4%", trend: "up", balance: "0.452 BTC", value: "$29,032.01" },
  { name: "Ethereum", symbol: "ETH", price: "$3,450.00", change24h: "-1.2%", trend: "down", balance: "12.5 ETH", value: "$43,125.00" },
  { name: "Solana", symbol: "SOL", price: "$145.22", change24h: "+8.5%", trend: "up", balance: "245 SOL", value: "$35,578.90" },
  { name: "Cardano", symbol: "ADA", price: "$0.45", change24h: "+0.2%", trend: "up", balance: "15,000 ADA", value: "$6,750.00" },
  { name: "Polkadot", symbol: "DOT", price: "$7.20", change24h: "-3.4%", trend: "down", balance: "850 DOT", value: "$6,120.00" },
  { name: "Chainlink", symbol: "LINK", price: "$18.50", change24h: "+1.5%", trend: "up", balance: "420 LINK", value: "$7,770.00" },
  { name: "Polygon", symbol: "MATIC", price: "$0.72", change24h: "-0.5%", trend: "down", balance: "2,500 MATIC", value: "$1,800.00" },
];

export default function AssetsPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-3xl font-black tracking-tighter">Your Assets</h1>
          <p className="text-muted-foreground text-sm">Manage and monitor your digital portfolio.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" size="sm">Export CSV</Button>
          <Button size="sm">Add Asset</Button>
        </div>
      </div>

      <Card className="border-border/50 overflow-hidden">
        <div className="p-4 border-b border-border/50 flex items-center justify-between bg-muted/20">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <input
              type="search"
              placeholder="Search assets..."
              className="h-9 w-64 rounded-md border border-border bg-background pl-9 text-sm focus:outline-none focus:ring-1 focus:ring-primary transition-all"
            />
          </div>
          <Button variant="outline" size="sm" className="gap-2">
            <Filter className="w-4 h-4" />
            Filter
          </Button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-border/50 bg-muted/10">
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Asset</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-muted-foreground text-right">Price</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-muted-foreground text-right">24h Change</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-muted-foreground text-right">Balance</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-muted-foreground text-right">Value</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-muted-foreground"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40">
              {assets.map((asset) => (
                <tr key={asset.symbol} className="hover:bg-muted/30 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center font-bold text-xs">
                        {asset.symbol[0]}
                      </div>
                      <div>
                        <p className="text-sm font-bold">{asset.name}</p>
                        <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-widest">{asset.symbol}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right text-sm font-medium">{asset.price}</td>
                  <td className="px-6 py-4 text-right">
                    <span className={cn(
                      "text-xs font-bold flex items-center justify-end gap-1",
                      asset.trend === "up" ? "text-green-500" : "text-red-500"
                    )}>
                      {asset.trend === "up" ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownLeft className="w-3 h-3" />}
                      {asset.change24h}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right text-sm font-medium">{asset.balance}</td>
                  <td className="px-6 py-4 text-right text-sm font-black tracking-tight">{asset.value}</td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-1 rounded-md hover:bg-muted text-muted-foreground opacity-0 group-hover:opacity-100 transition-all">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
