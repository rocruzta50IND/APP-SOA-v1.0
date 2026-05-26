"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ArrowRight, Shield, Zap, Globe } from "lucide-react";
import Link from "next/link";

export function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-20 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[120px] -z-10" />
      
      <div className="container px-4 md:px-6 flex flex-col items-center text-center space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center rounded-full border border-border/50 bg-muted/50 px-3 py-1 text-sm font-medium backdrop-blur-xl"
        >
          <span className="flex h-2 w-2 rounded-full bg-primary mr-2" />
          Next-Gen Crypto Infrastructure
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-5xl md:text-8xl font-bold tracking-tight pb-2"
        >
          Institutional Grade <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/40">
            Digital Asset Forge
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-[700px] text-muted-foreground text-lg md:text-xl"
        >
          CryptoNexis provides the high-performance foundation for enterprise-level 
          blockchain operations. Scalable, secure, and built for the future of finance.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Link href="/login">
            <button className="h-12 px-8 rounded-full bg-primary text-primary-foreground font-medium hover:opacity-90 transition-all flex items-center gap-2">
              Start Building <ArrowRight className="size-4" />
            </button>
          </Link>
          <button className="h-12 px-8 rounded-full border border-border bg-background/50 backdrop-blur-md font-medium hover:bg-muted transition-all">
            View Documentation
          </button>
        </motion.div>

        {/* Floating Icons */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16">
          {[
            { icon: Shield, label: "Military-Grade Security" },
            { icon: Zap, label: "Instant Execution" },
            { icon: Globe, label: "Global Liquidity" },
            { icon: Zap, label: "Infinite Scalability" },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
              className="flex flex-col items-center gap-2"
            >
              <div className="size-12 rounded-2xl bg-muted/50 border border-border/50 flex items-center justify-center text-primary backdrop-blur-sm">
                <item.icon className="size-6" />
              </div>
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-widest">{item.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
