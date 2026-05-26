"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Privé",
    price: "€2,500",
    description: "Ideal para boutiques emergentes que buscam curadoria básica.",
    features: ["Curadoria Mensal", "Suporte VIP 24/7", "Analytics Básico", "1 Usuário"],
    highlight: false,
  },
  {
    name: "Maison",
    price: "€5,000",
    description: "Para marcas estabelecidas que exigem o máximo de performance.",
    features: ["Curadoria Semanal", "Dedicated Concierge", "Analytics Avançado", "5 Usuários", "API Access"],
    highlight: true,
  },
  {
    name: "Atelier",
    price: "Custom",
    description: "Soluções sob medida para conglomerados globais de luxo.",
    features: ["Daily Curations", "Global Logistics", "Unlimited Users", "Custom Branding", "On-site Training"],
    highlight: false,
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="py-32 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="font-serif text-4xl md:text-6xl font-bold mb-6">Investimento em Prestígio</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Escolha o nível de serviço que melhor se adapta à visão da sua marca.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={cn(
                "relative flex flex-col p-8 rounded-3xl border border-border transition-all duration-300",
                plan.highlight ? "bg-primary text-primary-foreground shadow-2xl scale-105 z-10" : "bg-background hover:border-primary/50"
              )}
            >
              {plan.highlight && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-zinc-100 text-zinc-900 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
                  Most Exclusive
                </div>
              )}
              <div className="mb-8">
                <h3 className="font-serif text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  {plan.price !== "Custom" && <span className={cn("text-sm", plan.highlight ? "text-primary-foreground/70" : "text-muted-foreground")}>/mês</span>}
                </div>
                <p className={cn("text-sm leading-relaxed", plan.highlight ? "text-primary-foreground/80" : "text-muted-foreground")}>
                  {plan.description}
                </p>
              </div>

              <ul className="space-y-4 mb-10 flex-1">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-sm">
                    <Check className={cn("size-4 shrink-0", plan.highlight ? "text-primary-foreground" : "text-primary")} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <button className={cn(
                "w-full py-4 rounded-full font-bold text-sm transition-all",
                plan.highlight 
                  ? "bg-white text-zinc-900 hover:bg-zinc-100" 
                  : "bg-primary text-primary-foreground hover:opacity-90"
              )}>
                Selecionar Plano
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
