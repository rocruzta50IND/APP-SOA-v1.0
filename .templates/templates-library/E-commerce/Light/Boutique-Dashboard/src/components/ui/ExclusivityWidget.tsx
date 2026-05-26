"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Star, TrendingUp, Shield, Crown } from "lucide-react";

export function ExclusivityWidget() {
  return (
    <section className="py-32 bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1">
            <h2 className="font-serif text-4xl md:text-6xl font-bold mb-8 leading-tight">
              Mensure seu <span className="italic">Market Rarity</span> em tempo real
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Nossa tecnologia proprietária analisa milhões de pontos de dados para calcular o score de exclusividade 
              da sua marca, garantindo que você nunca sature o mercado e mantenha o desejo elevado.
            </p>
            
            <div className="space-y-6">
              {[
                { icon: Star, text: "Curadoria algorítmica de tendências emergentes" },
                { icon: Shield, text: "Controle de escassez e distribuição VIP" },
                { icon: Crown, text: "Posicionamento premium em marketplaces globais" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="size-10 rounded-full bg-secondary flex items-center justify-center text-primary">
                    <item.icon className="size-5" />
                  </div>
                  <span className="font-medium">{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex-1 w-full max-w-xl">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative p-8 rounded-[40px] border border-border bg-white shadow-2xl"
            >
              <div className="flex justify-between items-start mb-12">
                <div>
                  <h3 className="font-serif text-2xl font-bold mb-1">Exclusivity Score</h3>
                  <p className="text-sm text-muted-foreground">Market Position: Elite</p>
                </div>
                <div className="bg-primary/5 text-primary px-3 py-1 rounded-full text-xs font-bold">
                  +2.4% this week
                </div>
              </div>

              <div className="flex justify-center mb-12 relative">
                {/* Custom Gauge Simulation */}
                <div className="size-64 rounded-full border-[16px] border-secondary relative flex items-center justify-center">
                   <motion.div 
                    initial={{ rotate: -90 }}
                    whileInView={{ rotate: 110 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="absolute inset-0 border-[16px] border-primary rounded-full border-t-transparent border-l-transparent border-b-transparent"
                   />
                   <div className="text-center">
                    <span className="text-6xl font-bold">94</span>
                    <span className="text-xl text-muted-foreground font-medium">/100</span>
                   </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-secondary/50 border border-border/50">
                  <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">Scarcity Index</p>
                  <p className="text-xl font-bold">High</p>
                </div>
                <div className="p-4 rounded-2xl bg-secondary/50 border border-border/50">
                  <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">Sentiment</p>
                  <p className="text-xl font-bold">Luxury</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
