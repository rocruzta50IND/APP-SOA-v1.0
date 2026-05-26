"use client";

import { motion } from "framer-motion";
import { ChevronRight, Shield, Scale, Zap } from "lucide-react";
import Link from "next/link";

export function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-20 overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-white/5 blur-[120px] rounded-full -z-10" />
      
      <div className="max-w-4xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-xs font-medium text-zinc-400 mb-8"
        >
          <span className="flex h-2 w-2 rounded-full bg-white animate-pulse" />
          Lexora Intelligence v4.0 is now live
          <ChevronRight className="size-3" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-5xl md:text-8xl font-bold tracking-tight mb-8 pb-2 bg-clip-text text-transparent bg-gradient-to-b from-white to-zinc-500"
        >
          Legal infrastructure <br /> for the modern age.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          Streamline complex litigation, automate discovery, and manage high-stakes compliance with our enterprise-grade legal operating system.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link 
            href="/login"
            className="w-full sm:w-auto px-8 py-4 bg-white text-black font-semibold rounded-xl hover:bg-zinc-200 transition-all active:scale-95"
          >
            Deploy LexoraPro
          </Link>
          <button className="w-full sm:w-auto px-8 py-4 bg-zinc-900 text-white font-semibold rounded-xl border border-white/10 hover:bg-zinc-800 transition-all">
            Request Demo
          </button>
        </motion.div>
      </div>

      {/* Decorative icons floating */}
      <motion.div 
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-10 top-1/4 hidden lg:block p-4 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm"
      >
        <Shield className="size-8 text-white/50" />
      </motion.div>
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute right-10 bottom-1/4 hidden lg:block p-4 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm"
      >
        <Scale className="size-8 text-white/50" />
      </motion.div>
    </section>
  );
}
