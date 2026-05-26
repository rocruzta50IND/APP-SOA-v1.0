"use client";

import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const plans = [
  {
    name: "Starter",
    price: "$499",
    description: "Ideal for emerging crypto startups and small funds.",
    features: [
      "Up to 5 API keys",
      "Standard execution speed",
      "Basic on-chain analytics",
      "Email support",
      "Community access",
    ],
    highlight: false,
  },
  {
    name: "Professional",
    price: "$1,999",
    description: "Perfect for growing institutions and high-volume traders.",
    features: [
      "Unlimited API keys",
      "Ultra-low latency execution",
      "Advanced predictive analytics",
      "Priority 24/7 support",
      "Custom compliance rules",
      "Dedicated account manager",
    ],
    highlight: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "Tailored infrastructure for the world's largest financial entities.",
    features: [
      "White-label node clusters",
      "On-premise deployment options",
      "Bespoke security protocols",
      "Institutional-grade SLA",
      "Raw data stream access",
    ],
    highlight: false,
  },
];

export function Pricing() {
  return (
    <section className="py-24 md:py-32 bg-muted/30 relative">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center text-center mb-20 space-y-4">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
            Transparent <span className="text-primary">Institutional</span> Pricing
          </h2>
          <p className="max-w-[700px] text-muted-foreground text-lg">
            Choose the plan that fits your operation scale. No hidden fees, just performance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={cn(
                "relative flex flex-col p-8 rounded-3xl border transition-all",
                plan.highlight 
                  ? "bg-card border-primary ring-1 ring-primary scale-105 z-10 shadow-2xl shadow-primary/10" 
                  : "bg-background border-border hover:border-primary/50"
              )}
            >
              {plan.highlight && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                  Most Popular
                </div>
              )}

              <div className="mb-8">
                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  {plan.price !== "Custom" && <span className="text-muted-foreground">/mo</span>}
                </div>
                <p className="mt-4 text-muted-foreground text-sm leading-relaxed">
                  {plan.description}
                </p>
              </div>

              <div className="space-y-4 mb-10 flex-1">
                {plan.features.map((feature, i) => (
                  <div key={i} className="flex items-start gap-3 text-sm">
                    <div className="size-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <Check className="size-3 text-primary" />
                    </div>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              <button className={cn(
                "w-full h-12 rounded-xl font-bold transition-all flex items-center justify-center gap-2",
                plan.highlight
                  ? "bg-primary text-primary-foreground hover:opacity-90"
                  : "bg-muted hover:bg-muted/80"
              )}>
                {plan.price === "Custom" ? "Contact Sales" : "Get Started"}
                <ArrowRight className="size-4" />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
