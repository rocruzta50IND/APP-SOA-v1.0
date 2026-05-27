"use client";

import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { 
  ArrowDown, 
  Settings2, 
  Info,
  ChevronDown
} from "lucide-react";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from "recharts";

const priceData = [
  { time: "00:00", price: 64200 },
  { time: "04:00", price: 64500 },
  { time: "08:00", price: 63800 },
  { time: "12:00", price: 65100 },
  { time: "16:00", price: 64900 },
  { time: "20:00", price: 65400 },
  { time: "23:59", price: 65234 },
];

export default function ExchangePage() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      <div className="lg:col-span-8 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center font-bold text-primary-foreground">B</div>
            <div>
              <h1 className="text-xl font-black tracking-tighter flex items-center gap-2">
                BTC / USDC
                <Badge variant="outline" className="text-[10px] font-bold uppercase tracking-widest border-border">Spot</Badge>
              </h1>
              <div className="flex items-center gap-3 mt-0.5">
                <span className="text-2xl font-black tracking-tighter">$65,234.12</span>
                <span className="text-xs font-bold text-emerald-500">+2.45%</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="h-8 text-[10px] font-bold uppercase">1H</Button>
            <Button variant="outline" size="sm" className="h-8 text-[10px] font-bold uppercase bg-muted">1D</Button>
            <Button variant="outline" size="sm" className="h-8 text-[10px] font-bold uppercase">1W</Button>
            <Button variant="outline" size="sm" className="h-8 text-[10px] font-bold uppercase">1M</Button>
          </div>
        </div>

        <Card className="shadow-none border-border h-[450px]">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-[10px] font-bold uppercase tracking-widest">Price History</CardTitle>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-primary" />
                <span className="text-[10px] font-bold uppercase text-muted-foreground">BTC Price</span>
              </div>
            </div>
          </CardHeader>
          <CardContent className="h-[360px] pb-0">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={priceData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="time" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }}
                />
                <YAxis 
                  hide
                  domain={['dataMin - 500', 'dataMax + 500']}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "hsl(var(--background))", 
                    border: "1px solid hsl(var(--border))",
                    fontSize: "12px",
                    fontWeight: "600",
                    borderRadius: "4px"
                  }}
                  labelStyle={{ color: "hsl(var(--muted-foreground))", marginBottom: "4px" }}
                />
                <Line 
                  type="monotone" 
                  dataKey="price" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 4, strokeWidth: 0 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <div className="grid grid-cols-2 gap-4">
          <Card className="shadow-none border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-[10px] font-bold uppercase tracking-widest">Market Depth</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-1">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="flex items-center justify-between text-[10px] font-mono">
                    <span className="text-rose-500 font-bold">65,245.50</span>
                    <span className="text-muted-foreground">0.4523</span>
                  </div>
                ))}
                <div className="py-2 border-y border-border my-2 flex justify-between items-center px-1">
                  <span className="text-sm font-black tracking-tighter">65,234.12</span>
                  <span className="text-[10px] text-muted-foreground">≈ $65,234.12</span>
                </div>
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="flex items-center justify-between text-[10px] font-mono">
                    <span className="text-emerald-500 font-bold">65,222.10</span>
                    <span className="text-muted-foreground">1.1205</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-none border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-[10px] font-bold uppercase tracking-widest">Market Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-2">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-bold uppercase text-muted-foreground">Market Cap</span>
                <span className="text-xs font-bold">$1.2T</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-bold uppercase text-muted-foreground">24h High</span>
                <span className="text-xs font-bold">$65,890.00</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-bold uppercase text-muted-foreground">24h Low</span>
                <span className="text-xs font-bold">$63,120.50</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-bold uppercase text-muted-foreground">Circulating Supply</span>
                <span className="text-xs font-bold">19.5M BTC</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="lg:col-span-4 sticky top-24">
        <Card className="shadow-none border-border">
          <CardHeader className="flex flex-row items-center justify-between border-b border-border mb-6">
            <CardTitle className="text-sm font-black tracking-tight">Swap Assets</CardTitle>
            <Settings2 className="w-4 h-4 text-muted-foreground cursor-pointer hover:text-foreground transition-colors" />
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Sell</label>
                <span className="text-[10px] font-bold uppercase text-muted-foreground">Balance: 0.4523 BTC</span>
              </div>
              <div className="relative">
                <Input 
                  placeholder="0.00" 
                  className="h-14 text-xl font-black tracking-tighter bg-muted/30 border-none shadow-none focus-visible:ring-1 pr-24"
                />
                <button className="absolute right-3 top-3 h-8 px-2 bg-background border border-border rounded-md flex items-center gap-2 hover:bg-muted transition-colors">
                  <span className="text-xs font-bold uppercase">BTC</span>
                  <ChevronDown className="w-3 h-3" />
                </button>
              </div>
            </div>

            <div className="flex justify-center -my-2 relative z-10">
              <button className="p-2 bg-background border border-border rounded-full hover:bg-muted transition-colors shadow-sm">
                <ArrowDown className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Buy</label>
                <span className="text-[10px] font-bold uppercase text-muted-foreground">Balance: 12,450 USDC</span>
              </div>
              <div className="relative">
                <Input 
                  placeholder="0.00" 
                  className="h-14 text-xl font-black tracking-tighter bg-muted/30 border-none shadow-none focus-visible:ring-1 pr-24"
                />
                <button className="absolute right-3 top-3 h-8 px-2 bg-background border border-border rounded-md flex items-center gap-2 hover:bg-muted transition-colors">
                  <span className="text-xs font-bold uppercase">USDC</span>
                  <ChevronDown className="w-3 h-3" />
                </button>
              </div>
            </div>

            <Card className="bg-muted/30 border-none shadow-none p-4 mt-6">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-bold uppercase text-muted-foreground flex items-center gap-1">
                    Rate <Info className="w-3 h-3" />
                  </span>
                  <span className="text-xs font-medium">1 BTC ≈ 65,234.12 USDC</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-bold uppercase text-muted-foreground">Network Fee</span>
                  <span className="text-xs font-medium">$2.50</span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-border/50">
                  <span className="text-[10px] font-bold uppercase text-muted-foreground">Slippage Tolerance</span>
                  <span className="text-xs font-medium">0.5%</span>
                </div>
              </div>
            </Card>

            <Button className="w-full h-12 text-xs font-black uppercase tracking-widest mt-6">
              Preview Swap
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function Badge({ children, variant, className }: { children: React.ReactNode, variant?: string, className?: string }) {
  return (
    <span className={cn(
      "px-1.5 py-0.5 rounded text-[10px] font-bold",
      variant === "outline" ? "border border-border" : "bg-primary text-primary-foreground",
      className
    )}>
      {children}
    </span>
  );
}
