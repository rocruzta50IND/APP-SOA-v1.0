"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { ArrowRight, Sparkles } from "lucide-react";

export function CTA() {
  return (
    <section className="py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-primary px-8 py-20 text-center text-primary-foreground shadow-2xl">
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 -translate-x-1/4 -translate-y-1/4 size-96 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 translate-x-1/4 translate-y-1/4 size-96 bg-black/20 rounded-full blur-3xl" />
          
          <div className="relative z-10 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-bold uppercase tracking-widest mb-8">
              <Sparkles className="size-3" />
              Ready to transform?
            </div>
            
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-8">
              Start Scaling Your B2B Operations Today
            </h2>
            
            <p className="text-primary-foreground/80 text-lg md:text-xl mb-12 leading-relaxed">
              Join 500+ global enterprises that trust VeloceMarket Pro to power 
              their high-volume supply chains and wholesale platforms.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" variant="secondary" className="w-full sm:w-auto h-14 px-10 text-primary">
                Get Started Now
              </Button>
              <Button size="lg" variant="outline" className="w-full sm:w-auto h-14 px-10 border-white/20 hover:bg-white/10 text-white">
                Speak with an Expert
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}