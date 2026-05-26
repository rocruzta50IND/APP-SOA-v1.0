"use client";

import { motion } from "framer-motion";
import { Globe, MapPin, Zap } from "lucide-react";

export function WarehouseMap() {
  return (
    <section className="py-32 bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex p-3 rounded-2xl bg-primary/10 text-primary mb-6">
              <Globe className="size-6" />
            </div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
              Global Distribution, <br /> Local Speed
            </h2>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              Our network of 120+ strategic warehouses ensures your products are always 
              within 48 hours of your customers. Reduce shipping costs and transit times 
              with intelligent routing.
            </p>
            
            <div className="space-y-6">
              {[
                { title: "North America", hubs: "45 Hubs", latency: "12ms" },
                { title: "Europe & UK", hubs: "32 Hubs", latency: "15ms" },
                { title: "Asia Pacific", hubs: "28 Hubs", latency: "18ms" },
              ].map((region, i) => (
                <div key={i} className="flex items-center justify-between p-4 border border-border rounded-2xl bg-muted/30">
                  <div className="flex items-center gap-4">
                    <MapPin className="size-5 text-primary" />
                    <div>
                      <p className="font-bold">{region.title}</p>
                      <p className="text-xs text-muted-foreground">{region.hubs}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Zap className="size-3 text-amber-500" />
                    <span className="text-sm font-medium">{region.latency}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            {/* Abstract Map Visualization */}
            <div className="aspect-square relative flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-transparent to-primary/10 rounded-full blur-3xl" />
              <div className="relative size-full border border-border/50 rounded-full flex items-center justify-center animate-[spin_60s_linear_infinite]">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 size-4 bg-primary rounded-full shadow-[0_0_20px_rgba(var(--primary),0.5)]" />
                <div className="absolute bottom-1/4 right-0 translate-x-1/2 size-3 bg-primary/60 rounded-full" />
                <div className="absolute top-1/3 left-0 -translate-x-1/2 size-3 bg-primary/40 rounded-full" />
                
                <div className="size-3/4 border border-border/30 rounded-full flex items-center justify-center">
                  <div className="size-3/4 border border-border/20 rounded-full" />
                </div>
              </div>
              
              <div className="absolute inset-0 flex items-center justify-center">
                <Globe className="size-32 text-foreground opacity-10" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}