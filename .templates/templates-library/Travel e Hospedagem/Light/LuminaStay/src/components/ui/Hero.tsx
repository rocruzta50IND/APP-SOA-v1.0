"use client";

import { motion } from "framer-motion";
import { Button } from "./Button";
import { ArrowRight, Star } from "lucide-react";
import Link from "next/link";

export function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-16 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 -z-10 h-full w-full bg-white">
        <div className="absolute bottom-auto left-auto right-0 top-0 h-[500px] w-[500px] -translate-x-[30%] translate-y-[20%] rounded-full bg-[rgba(173,109,244,0.1)] opacity-50 blur-[80px]"></div>
        <div className="absolute bottom-0 left-0 right-auto top-auto h-[500px] w-[500px] translate-x-[20%] -translate-y-[20%] rounded-full bg-[rgba(100,200,250,0.1)] opacity-50 blur-[80px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-secondary border border-border text-xs font-medium mb-8"
        >
          <Star className="size-3 text-primary fill-primary" />
          <span>New: Enterprise Booking Engine 2.0</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter pb-4 leading-[1.1]"
        >
          Redefining the <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-muted-foreground to-primary">
            Hospitality Standard
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground mt-6"
        >
          LuminaStay provides the ultimate operational layer for high-end travel brands. 
          Performance, precision, and world-class design in one single platform.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 mt-10"
        >
          <Link href="/login">
            <Button size="lg" className="h-12 px-8">
              Start Free Trial <ArrowRight className="ml-2 size-4" />
            </Button>
          </Link>
          <Link href="#features">
            <Button variant="outline" size="lg" className="h-12 px-8">
              Book a Demo
            </Button>
          </Link>
        </motion.div>

        {/* Dashboard Preview */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-20 relative max-w-5xl mx-auto"
        >
          <div className="rounded-xl border border-border bg-background/50 backdrop-blur-sm p-2 shadow-2xl">
            <div className="rounded-lg border border-border bg-muted/30 aspect-[16/9] overflow-hidden flex items-center justify-center">
              <div className="grid grid-cols-3 gap-4 w-full p-8">
                <div className="col-span-2 h-64 bg-background rounded-lg border border-border animate-pulse" />
                <div className="h-64 bg-background rounded-lg border border-border animate-pulse" />
                <div className="h-32 bg-background rounded-lg border border-border animate-pulse" />
                <div className="h-32 bg-background rounded-lg border border-border animate-pulse" />
                <div className="h-32 bg-background rounded-lg border border-border animate-pulse" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
