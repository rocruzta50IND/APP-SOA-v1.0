"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { ArrowRight, BarChart3, Globe2, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

export function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-20 overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_50%,rgba(var(--primary),0.1),transparent_50%)]" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-primary/5 to-transparent blur-3xl opacity-50" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-muted/50 text-xs font-medium text-muted-foreground mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            VeloceMarket Pro v2.0 is now live
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 pb-2 bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70">
            Engineered for High-Volume <br /> B2B Operations
          </h1>
          
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground mb-10 leading-relaxed">
            The all-in-one platform for complex supply chains, tiered pricing, 
            and global inventory management. Scale your wholesale business with precision.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="w-full sm:w-auto gap-2">
              Start Scaling <ArrowRight className="size-4" />
            </Button>
            <Button size="lg" variant="outline" className="w-full sm:w-auto">
              Request Demo
            </Button>
          </div>
        </motion.div>

        {/* Floating Stats */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 border border-border/50 bg-background/50 backdrop-blur-sm rounded-2xl p-8"
        >
          <div className="space-y-1">
            <p className="text-3xl font-bold tracking-tight">$4.2B</p>
            <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Total GMV Processed</p>
          </div>
          <div className="space-y-1">
            <p className="text-3xl font-bold tracking-tight">120+</p>
            <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Global Warehouses</p>
          </div>
          <div className="space-y-1">
            <p className="text-3xl font-bold tracking-tight">99.9%</p>
            <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Inventory Accuracy</p>
          </div>
          <div className="space-y-1">
            <p className="text-3xl font-bold tracking-tight">15ms</p>
            <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Order Sync Latency</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}