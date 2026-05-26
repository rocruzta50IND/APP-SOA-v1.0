"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Shield, Zap, Globe, BarChart3, Lock, Cpu } from "lucide-react";

const features = [
  {
    title: "Quantum-Resistant Custody",
    description: "Multi-party computation (MPC) combined with hardware isolation for maximum asset protection.",
    icon: Shield,
    className: "md:col-span-2",
  },
  {
    title: "Hyper-Execution Engine",
    description: "Sub-millisecond latency for high-frequency institutional trading.",
    icon: Zap,
    className: "md:col-span-1",
  },
  {
    title: "Global Liquidity Mesh",
    description: "Deep order books aggregated across 50+ tier-1 liquidity providers.",
    icon: Globe,
    className: "md:col-span-1",
  },
  {
    title: "Advanced Analytics",
    description: "Real-time on-chain metrics and behavioral analysis for predictive modeling.",
    icon: BarChart3,
    className: "md:col-span-2",
  },
  {
    title: "Programmable Compliance",
    description: "Built-in KYC/AML automation that scales with your jurisdictional requirements.",
    icon: Lock,
    className: "md:col-span-1",
  },
  {
    title: "Edge Node Network",
    description: "Localized processing for distributed ledger operations at the edge.",
    icon: Cpu,
    className: "md:col-span-2",
  },
];

export function Features() {
  return (
    <section className="py-24 md:py-32 bg-background relative overflow-hidden">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center text-center mb-20 space-y-4">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
            Engineered for <span className="text-muted-foreground">Absolute Performance</span>
          </h2>
          <p className="max-w-[800px] text-muted-foreground text-lg">
            Every layer of CryptoNexis is optimized for speed, security, and enterprise reliability.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={cn(
                "group relative overflow-hidden rounded-3xl border border-border/50 bg-card p-8 hover:border-primary/50 transition-colors",
                feature.className
              )}
            >
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                <feature.icon className="size-24 text-primary" />
              </div>
              
              <div className="relative z-10 space-y-4">
                <div className="size-12 rounded-2xl bg-muted/50 flex items-center justify-center text-primary">
                  <feature.icon className="size-6" />
                </div>
                <h3 className="text-2xl font-bold">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>

              {/* Hover Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
