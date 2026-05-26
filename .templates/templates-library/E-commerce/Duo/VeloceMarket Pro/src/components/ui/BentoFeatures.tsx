"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { 
  Package, 
  TrendingUp, 
  ShieldCheck, 
  Layers, 
  Cpu, 
  Globe 
} from "lucide-react";

const features = [
  {
    title: "Real-time Multi-warehouse Sync",
    description: "Coordinate stock across hundreds of hubs with millisecond precision.",
    icon: Package,
    className: "md:col-span-2",
  },
  {
    title: "Dynamic Price Tiers",
    description: "Automated volume-based discounts tailored to every client level.",
    icon: TrendingUp,
    className: "md:col-span-1",
  },
  {
    title: "B2B Security Protocols",
    description: "Enterprise-grade authorization and audit logs for sensitive operations.",
    icon: ShieldCheck,
    className: "md:col-span-1",
  },
  {
    title: "Predictive Analytics",
    description: "AI-driven demand forecasting to optimize your restocking cycles.",
    icon: Cpu,
    className: "md:col-span-2",
  },
];

export function BentoFeatures() {
  return (
    <section className="py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
            Built for Infrastructure-Scale Commerce
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            VeloceMarket Pro replaces your fragmented tools with a single, high-performance engine.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={cn(
                "group relative overflow-hidden rounded-3xl border border-border bg-card p-8 hover:bg-accent/5 transition-colors",
                feature.className
              )}
            >
              <div className="relative z-10">
                <div className="mb-4 inline-flex p-3 rounded-2xl bg-primary/10 text-primary group-hover:scale-110 transition-transform">
                  <feature.icon className="size-6" />
                </div>
                <h3 className="text-xl font-bold mb-2 tracking-tight">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
              
              {/* Decorative background element */}
              <div className="absolute bottom-0 right-0 -mr-8 -mb-8 size-32 bg-primary/5 rounded-full blur-3xl transition-colors group-hover:bg-primary/10" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}