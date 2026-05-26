"use client";

import { motion } from "framer-motion";
import { Check, Info } from "lucide-react";
import { cn } from "@/lib/utils";

const tiers = [
  {
    name: "Tier 1: Standard",
    units: "1 - 500",
    discount: "0%",
    features: ["Standard Shipping", "Email Support", "Basic Dashboard"],
  },
  {
    name: "Tier 2: Business",
    units: "501 - 5,000",
    discount: "12%",
    features: ["Priority Shipping", "24/7 Support", "Advanced Analytics", "Inventory API"],
    highlight: true,
  },
  {
    name: "Tier 3: Enterprise",
    units: "5,000+",
    discount: "25%",
    features: ["White-glove Delivery", "Dedicated Manager", "Custom Integrations", "Warehouse Priority"],
  },
];

export function PricingMatrix() {
  return (
    <section className="py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
            Dynamic Tiered Pricing
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Scale your margins as you scale your volume. Our automated matrix 
            adjusts pricing based on your purchasing power.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tiers.map((tier, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={cn(
                "relative flex flex-col p-8 rounded-3xl border border-border bg-background transition-all",
                tier.highlight && "ring-2 ring-primary shadow-xl scale-105 z-10"
              )}
            >
              {tier.highlight && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-1 bg-primary text-primary-foreground text-xs font-bold rounded-full uppercase tracking-wider">
                  Most Popular
                </div>
              )}
              
              <div className="mb-8">
                <h3 className="text-xl font-bold mb-2">{tier.name}</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold tracking-tight">{tier.discount}</span>
                  <span className="text-muted-foreground font-medium">discount</span>
                </div>
                <p className="text-sm text-muted-foreground mt-2">Volume: {tier.units} units</p>
              </div>

              <div className="space-y-4 mb-8 flex-1">
                {tier.features.map((feature, fIndex) => (
                  <div key={fIndex} className="flex items-center gap-3">
                    <div className="size-5 rounded-full bg-primary/10 flex items-center justify-center">
                      <Check className="size-3 text-primary" />
                    </div>
                    <span className="text-sm text-muted-foreground">{feature}</span>
                  </div>
                ))}
              </div>

              <button className={cn(
                "w-full py-3 px-4 rounded-xl font-bold transition-all",
                tier.highlight ? "bg-primary text-primary-foreground" : "border border-border hover:bg-muted"
              )}>
                Contact Sales
              </button>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-12 flex items-center justify-center gap-2 text-sm text-muted-foreground bg-muted/50 w-fit mx-auto px-4 py-2 rounded-full border border-border">
          <Info className="size-4" />
          <span>Custom volume-based pricing available for global distributors.</span>
        </div>
      </div>
    </section>
  );
}