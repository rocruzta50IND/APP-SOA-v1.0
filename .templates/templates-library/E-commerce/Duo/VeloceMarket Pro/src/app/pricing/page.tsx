"use client";

import { Sidebar } from "@/components/ui/Sidebar";
import { cn } from "@/lib/utils";
import { 
  TrendingUp, 
  Settings2, 
  Check, 
  AlertCircle,
  HelpCircle,
  Layers
} from "lucide-react";

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-muted/20">
      <Sidebar />
      <main className="pl-64 pr-8 pt-20 pb-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Tiered Pricing Engine</h1>
              <p className="text-muted-foreground mt-1">Configure volume-based discounts and client levels</p>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-xl text-sm font-medium hover:bg-primary/90 transition-colors">
              <Settings2 className="size-4" />
              Configure Engine
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <div className="border border-border bg-background rounded-2xl p-6 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold">Active Price Tiers</h3>
                  <button className="text-xs text-primary font-bold hover:underline">Add New Tier</button>
                </div>
                
                <div className="space-y-4">
                  {[
                    { name: "Bronze Distributor", min: "1", discount: "0%", clients: 420 },
                    { name: "Silver Partner", min: "500", discount: "12%", clients: 85 },
                    { name: "Gold Enterprise", min: "5,000", discount: "25%", clients: 14 },
                  ].map((tier, i) => (
                    <div key={i} className="flex items-center justify-between p-4 border border-border rounded-xl hover:border-primary/50 transition-colors cursor-pointer group">
                      <div className="flex items-center gap-4">
                        <div className="size-10 rounded-lg bg-muted flex items-center justify-center font-bold text-sm group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                          T{i+1}
                        </div>
                        <div>
                          <p className="font-bold text-sm">{tier.name}</p>
                          <p className="text-xs text-muted-foreground">Min. volume: {tier.min} units</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold">{tier.discount}</p>
                        <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">{tier.clients} active accounts</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border border-border bg-background rounded-2xl p-6 shadow-sm">
                <h3 className="text-lg font-bold mb-6">Automated Rules</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    "Auto-promote client after 3 consistent months of volume",
                    "Apply 2% surcharge for split-warehouse delivery",
                    "Dynamic pricing updates every 12 hours based on GMV",
                    "Locked pricing contracts override engine defaults",
                  ].map((rule, i) => (
                    <div key={i} className="p-4 border border-border rounded-xl bg-muted/20 flex gap-3">
                      <Check className="size-4 text-emerald-500 shrink-0 mt-0.5" />
                      <p className="text-sm font-medium">{rule}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div className="border border-border bg-primary text-primary-foreground rounded-2xl p-6 shadow-xl">
                <div className="flex items-center gap-2 mb-4">
                  <Layers className="size-5" />
                  <h4 className="font-bold">Engine Health</h4>
                </div>
                <p className="text-sm text-primary-foreground/80 mb-6 leading-relaxed">
                  Your pricing engine is currently processing 1,240 active contracts with a sync latency of 15ms.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span>Sync Status</span>
                    <span className="font-bold">Operational</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/20 rounded-full overflow-hidden">
                    <div className="h-full w-full bg-white animate-pulse" />
                  </div>
                </div>
              </div>

              <div className="border border-border bg-background rounded-2xl p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <AlertCircle className="size-5 text-amber-500" />
                  <h4 className="font-bold">Pending Overrides</h4>
                </div>
                <div className="space-y-4">
                  <div className="p-3 border border-border rounded-xl bg-muted/30">
                    <p className="text-sm font-bold">TechFlow Inc</p>
                    <p className="text-xs text-muted-foreground mt-1">Requested 30% discount on order #8489</p>
                    <div className="mt-3 flex gap-2">
                      <button className="flex-1 py-1.5 rounded-lg bg-emerald-500 text-white text-[10px] font-bold uppercase">Approve</button>
                      <button className="flex-1 py-1.5 rounded-lg border border-border text-[10px] font-bold uppercase">Decline</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}