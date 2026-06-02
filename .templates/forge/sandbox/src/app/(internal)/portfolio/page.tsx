"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  Tooltip 
} from "recharts";
import { cn } from "@/lib/utils";
import { 
  Coins, 
  BarChart3, 
  History, 
  ArrowRight,
  Filter,
  Download
} from "lucide-react";

const allocationData = [
  { name: "Bitcoin", value: 45, color: "hsl(var(--primary))" },
  { name: "Ethereum", value: 25, color: "hsl(var(--muted-foreground))" },
  { name: "Stablecoins", value: 15, color: "hsl(var(--foreground))" },
  { name: "DeFi", value: 10, color: "hsl(var(--primary)/0.6)" },
  { name: "Others", value: 5, color: "hsl(var(--muted))" },
];

const assets = [
  { id: 1, name: "Bitcoin", symbol: "BTC", balance: "12.4200", value: "$840,502.10", change: "+4.2%", up: true },
  { id: 2, name: "Ethereum", symbol: "ETH", balance: "154.8000", value: "$352,840.50", change: "+1.8%", up: true },
  { id: 3, name: "Solana", symbol: "SOL", balance: "1,200.0000", value: "$180,000.00", change: "-2.4%", up: false },
  { id: 4, name: "Chainlink", symbol: "LINK", balance: "5,000.0000", value: "$75,000.00", change: "+12.1%", up: true },
  { id: 5, name: "Polkadot", symbol: "DOT", balance: "8,500.0000", value: "$54,400.00", change: "-0.5%", up: false },
  { id: 6, name: "Uniswap", symbol: "UNI", balance: "3,200.0000", value: "$28,800.00", change: "+5.3%", up: true },
];

export default function PortfolioPage() {
  return (
    <div className="space-y-12">
      {/* Header Section */}
      <section className="flex justify-between items-end">
        <div>
          <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-primary mb-2">Asset Management</p>
          <h1 className="text-6xl font-serif tracking-tighter leading-none mb-4">Portfolio Holdings</h1>
          <p className="text-muted-foreground max-w-2xl text-lg font-light">
            Real-time valuation of your global digital asset repository.
          </p>
        </div>
        <div className="flex gap-4">
          <button className="p-4 border border-border/50 rounded-full hover:bg-muted transition-colors duration-500">
            <Filter className="w-4 h-4" />
          </button>
          <button className="flex items-center gap-2 px-8 py-4 bg-foreground text-background rounded-full text-sm font-medium tracking-[0.2em] uppercase transition-all duration-500 hover:opacity-80">
            <Download className="w-4 h-4" />
            <span>Export Report</span>
          </button>
        </div>
      </section>

      {/* Allocation Overview */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 p-12 border border-border/50 bg-card/30 backdrop-blur-sm flex flex-col items-center justify-center">
          <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground mb-8 text-center w-full">Global Allocation</p>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={allocationData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {allocationData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "hsl(var(--background))", 
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "0px",
                    fontSize: "10px",
                    textTransform: "uppercase"
                  }} 
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-8 space-y-2 w-full">
            {allocationData.map((item) => (
              <div key={item.name} className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-[10px] uppercase tracking-widest font-bold">{item.name}</span>
                </div>
                <span className="text-[10px] font-bold">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2 space-y-8">
           <div className="p-8 border border-border/50 bg-card/30 backdrop-blur-sm">
             <div className="overflow-x-auto">
               <table className="w-full text-left">
                 <thead>
                   <tr className="border-b border-border/50">
                     <th className="pb-4 text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground">Asset</th>
                     <th className="pb-4 text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground">Balance</th>
                     <th className="pb-4 text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground">Value</th>
                     <th className="pb-4 text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground">24h Change</th>
                     <th className="pb-4"></th>
                   </tr>
                 </thead>
                 <tbody className="divide-y divide-border/50">
                   {assets.map((asset, i) => (
                     <motion.tr 
                        key={asset.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05, duration: 0.8 }}
                        className="group hover:bg-muted/30 transition-colors"
                     >
                       <td className="py-6">
                         <div className="flex items-center gap-3">
                           <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-[10px] font-bold">
                             {asset.symbol}
                           </div>
                           <div>
                             <p className="text-sm font-medium tracking-tight">{asset.name}</p>
                             <p className="text-[10px] uppercase tracking-widest text-muted-foreground">{asset.symbol}</p>
                           </div>
                         </div>
                       </td>
                       <td className="py-6 font-mono text-sm">{asset.balance}</td>
                       <td className="py-6 font-medium text-sm">{asset.value}</td>
                       <td className="py-6">
                         <span className={cn(
                           "text-[10px] font-bold tracking-widest uppercase",
                           asset.up ? "text-emerald-500" : "text-rose-500"
                         )}>
                           {asset.change}
                         </span>
                       </td>
                       <td className="py-6 text-right">
                         <button className="p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                           <ArrowRight className="w-4 h-4 text-muted-foreground hover:text-primary" />
                         </button>
                       </td>
                     </motion.tr>
                   ))}
                 </tbody>
               </table>
             </div>
           </div>
        </div>
      </section>
    </div>
  );
}
