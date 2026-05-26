"use client";

import { motion } from "framer-motion";
import { Shield, Zap, Search, Globe, Lock, Cpu } from "lucide-react";
import { cn } from "@/lib/utils";

const features = [
  {
    title: "AI-Powered Discovery",
    description: "Surface critical evidence in seconds across millions of documents using advanced semantic search.",
    icon: Search,
    className: "md:col-span-2",
  },
  {
    title: "Zero-Knowledge Security",
    description: "Your data is encrypted client-side. We never see your files.",
    icon: Lock,
    className: "md:col-span-1",
  },
  {
    title: "Global Compliance",
    description: "Automatic tracking of regulatory changes across 150+ jurisdictions.",
    icon: Globe,
    className: "md:col-span-1",
  },
  {
    title: "Smart Litigation Engine",
    description: "Predict case outcomes with 89% accuracy based on historical judicial data.",
    icon: Cpu,
    className: "md:col-span-2",
  },
];

export function BentoFeatures() {
  return (
    <section id="features" className="py-32 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-20">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">Built for scale.</h2>
        <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
          The infrastructure used by the world's most innovative law firms and legal departments.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {features.map((feature, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className={cn(
              "p-8 rounded-3xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent flex flex-col justify-between min-h-[300px] hover:border-white/20 transition-colors group",
              feature.className
            )}
          >
            <div className="size-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <feature.icon className="size-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-zinc-400 leading-relaxed">{feature.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
