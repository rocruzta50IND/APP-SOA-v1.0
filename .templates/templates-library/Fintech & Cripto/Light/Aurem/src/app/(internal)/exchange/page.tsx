"use client";

import { ArrowUpDown, RefreshCw, Info, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export default function ExchangePage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-black tracking-tighter">Instant Exchange</h1>
        <p className="text-muted-foreground text-sm">Swap between any supported digital assets with zero slippage.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Swap Card */}
        <Card className="p-6 border-border/50 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Swap</h3>
            <Button variant="ghost" size="sm" className="h-8 px-2">
              <RefreshCw className="w-4 h-4" />
            </Button>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs px-1">
              <span className="text-muted-foreground font-medium uppercase tracking-widest">From</span>
              <span className="text-muted-foreground">Balance: 0.452 BTC</span>
            </div>
            <div className="relative group">
              <input
                type="number"
                placeholder="0.00"
                className="w-full h-16 bg-muted/30 border border-border rounded-lg px-4 text-2xl font-black tracking-tighter focus:outline-none focus:ring-1 focus:ring-primary transition-all pr-32"
              />
              <button className="absolute right-3 top-3 bottom-3 px-3 bg-background border border-border rounded-md flex items-center gap-2 hover:bg-muted transition-colors">
                <div className="w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center text-[10px] text-white font-bold">B</div>
                <span className="text-sm font-bold">BTC</span>
                <ChevronDown className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>
          </div>

          <div className="flex justify-center -my-3 relative z-10">
            <button className="w-10 h-10 bg-primary text-primary-foreground rounded-full border-4 border-background flex items-center justify-center hover:scale-110 transition-transform shadow-lg">
              <ArrowUpDown className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs px-1">
              <span className="text-muted-foreground font-medium uppercase tracking-widest">To</span>
              <span className="text-muted-foreground">Balance: 12.5 ETH</span>
            </div>
            <div className="relative group">
              <input
                type="number"
                placeholder="0.00"
                className="w-full h-16 bg-muted/30 border border-border rounded-lg px-4 text-2xl font-black tracking-tighter focus:outline-none focus:ring-1 focus:ring-primary transition-all pr-32"
              />
              <button className="absolute right-3 top-3 bottom-3 px-3 bg-background border border-border rounded-md flex items-center gap-2 hover:bg-muted transition-colors">
                <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center text-[10px] text-white font-bold">E</div>
                <span className="text-sm font-bold">ETH</span>
                <ChevronDown className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>
          </div>

          <div className="bg-muted/30 border border-border/50 rounded-md p-4 space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground font-medium uppercase tracking-widest">Rate</span>
              <span className="font-bold">1 BTC = 18.62 ETH</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground font-medium uppercase tracking-widest">Slippage Tolerance</span>
              <span className="font-bold text-green-500">0.5%</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground font-medium uppercase tracking-widest">Network Fee</span>
              <span className="font-bold">$12.45</span>
            </div>
          </div>

          <Button className="w-full h-12 text-md font-bold uppercase tracking-widest">Review Swap</Button>
        </Card>

        {/* Market Info */}
        <div className="space-y-6">
          <Card className="p-6 border-border/50">
            <div className="flex items-center gap-2 mb-4">
              <Info className="w-4 h-4 text-muted-foreground" />
              <h3 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Market Statistics</h3>
            </div>
            <div className="space-y-4">
              <div>
                <p className="text-xs text-muted-foreground font-medium">Market Cap</p>
                <p className="text-xl font-black tracking-tighter">$1.24 Trillion</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-medium">24h Volume</p>
                <p className="text-xl font-black tracking-tighter">$84.5 Billion</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-medium">BTC Dominance</p>
                <p className="text-xl font-black tracking-tighter">52.4%</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 border-border/50 bg-primary text-primary-foreground overflow-hidden relative">
            <div className="relative z-10">
              <h3 className="text-lg font-black tracking-tighter mb-2">Liquidity Provider</h3>
              <p className="text-xs text-primary-foreground/70 mb-4 font-medium leading-relaxed">
                Provide liquidity to the AUREM pool and earn up to 12% APY in rewards.
              </p>
              <Button variant="secondary" size="sm" className="w-full font-bold uppercase tracking-widest text-[10px]">Start Earning</Button>
            </div>
            <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-background/10 rounded-full blur-2xl" />
          </Card>
        </div>
      </div>
    </div>
  );
}
