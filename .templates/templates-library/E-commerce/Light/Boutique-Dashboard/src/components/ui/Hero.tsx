"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";

export function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-20 overflow-hidden bg-[radial-gradient(circle_at_top_right,rgba(240,240,240,0.5),transparent_50%)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block py-1 px-3 rounded-full bg-secondary text-secondary-foreground text-xs font-semibold tracking-widest uppercase mb-6">
            Luxury Curated for the Elite
          </span>
          <h1 className="font-serif text-5xl md:text-8xl font-bold tracking-tighter leading-tight mb-8">
            <span className="block">Redefining the</span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-zinc-900 via-zinc-500 to-zinc-900 py-2">Art of Curation</span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground mb-12 leading-relaxed">
            Elevate your brand with the world's most sophisticated inventory management 
            and VIP analytics platform. Designed for those who demand exclusivity.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="w-full sm:w-auto bg-primary text-primary-foreground px-8 py-4 rounded-full font-medium text-lg hover:opacity-90 transition-all flex items-center justify-center gap-2 group">
              Get Started
              <ChevronRight className="size-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="w-full sm:w-auto bg-transparent border border-border px-8 py-4 rounded-full font-medium text-lg hover:bg-secondary transition-all">
              View Showcase
            </button>
          </div>
        </motion.div>
      </div>

      {/* Background visual element */}
      <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-background to-transparent" />
      <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[500px] border border-border/40 rounded-t-[100px] bg-white/50 backdrop-blur-sm -z-10" />
    </section>
  );
}
