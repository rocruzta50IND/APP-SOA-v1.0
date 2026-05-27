"use client";

import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { 
  Search, 
  Filter, 
  ArrowUpRight, 
  ArrowDownRight,
  MoreHorizontal,
  ArrowRight
} from "lucide-react";

const assets = [
  { name: "Bitcoin", symbol: "BTC", price: "$65,234.12", change24h: "+2.45%", balance: "0.4523", value: "$29,505.12", trend: "up" },
  { name: "Ethereum", symbol: "ETH", price: "$3,450.80", change24h: "-1.12%", balance: "4.5201", value: "$15,600.45", trend: "down" },
  { name: "Solana", symbol: "SOL", price: "$145.20", change24h: "+5.67%", balance: "125.40", value: "$18,208.08", trend: "up" },
  { name: "Chainlink", symbol: "LINK", price: "$18.45", change24h: "+0.32%", balance: "500.00", value: "$9,225.00", trend: "up" },
  { name: "Polygon", symbol: "MATIC", price: "$0.72", change24h: "-3.40%", balance: "12,500.00", value: "$9,000.00", trend: "down" },
  { name: "Cardano", symbol: "ADA", price: "$0.45", change24h: "+1.15%", balance: "25,000.00", value: "$11,250.00", trend: "up" },
  { name: "Avalanche", symbol: "AVAX", price: "$38.90", change24h: "-2.10%", balance: "150.00", value: "$5,835.00", trend: "down" },
  { name: "Polkadot", symbol: "DOT", price: "$7.20", change24h: "+0.85%", balance: "1,200.00", value: "$8,640.00", trend: "up" },
];

export default function AssetsPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tighter">Your Assets</h1>
          <p className="text-muted-foreground text-sm">Manage and monitor your digital asset portfolio.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="h-8 text-[10px] font-bold uppercase tracking-widest">
            Deposit
          </Button>
          <Button variant="outline" size="sm" className="h-8 text-[10px] font-bold uppercase tracking-widest">
            Withdraw
          </Button>
          <Button size="sm" className="h-8 text-[10px] font-bold uppercase tracking-widest">
            Buy Assets
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="shadow-none border-border">
          <CardContent className="pt-6">
            <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">Portfolio Value</div>
            <div className="text-2xl font-black tracking-tighter">$55,234.12</div>
            <div className="text-[10px] text-emerald-500 font-bold uppercase mt-1">+ $2,450.12 (4.5%) today</div>
          </CardContent>
        </Card>
        <Card className="shadow-none border-border">
          <CardContent className="pt-6">
            <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">Net Deposits</div>
            <div className="text-2xl font-black tracking-tighter">$42,000.00</div>
            <div className="text-[10px] text-muted-foreground font-bold uppercase mt-1">Life-time performance: +31.5%</div>
          </CardContent>
        </Card>
        <Card className="shadow-none border-border">
          <CardContent className="pt-6">
            <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">Available Cash</div>
            <div className="text-2xl font-black tracking-tighter">$12,450.00</div>
            <div className="text-[10px] text-muted-foreground font-bold uppercase mt-1">USD Wallet Balance</div>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-none border-border overflow-hidden">
        <CardHeader className="border-b border-border bg-muted/30">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <CardTitle className="text-[10px] font-bold uppercase tracking-widest">Asset List</CardTitle>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
                <Input 
                  placeholder="Filter assets..." 
                  className="pl-8 h-8 w-[200px] text-xs bg-background"
                />
              </div>
              <Button variant="outline" size="icon" className="h-8 w-8">
                <Filter className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-border bg-muted/10">
                  <th className="px-6 py-3 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Asset</th>
                  <th className="px-6 py-3 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Price</th>
                  <th className="px-6 py-3 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">24h Change</th>
                  <th className="px-6 py-3 text-[10px] font-bold uppercase tracking-widest text-muted-foreground text-right">Balance</th>
                  <th className="px-6 py-3 text-[10px] font-bold uppercase tracking-widest text-muted-foreground text-right">Value</th>
                  <th className="px-6 py-3 text-[10px] font-bold uppercase tracking-widest text-muted-foreground text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {assets.map((asset) => (
                  <tr key={asset.symbol} className="hover:bg-muted/30 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/5 border border-primary/10 flex items-center justify-center font-bold text-xs">
                          {asset.symbol[0]}
                        </div>
                        <div>
                          <div className="text-sm font-bold tracking-tight">{asset.name}</div>
                          <div className="text-[10px] text-muted-foreground uppercase">{asset.symbol}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium">{asset.price}</td>
                    <td className="px-6 py-4">
                      <div className={cn(
                        "flex items-center gap-1 text-xs font-bold",
                        asset.trend === "up" ? "text-emerald-500" : "text-rose-500"
                      )}>
                        {asset.trend === "up" ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                        {asset.change24h}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-right font-mono">{asset.balance}</td>
                    <td className="px-6 py-4 text-sm font-black tracking-tighter text-right">{asset.value}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
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
