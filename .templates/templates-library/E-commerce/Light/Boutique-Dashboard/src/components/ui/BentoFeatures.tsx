"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ShieldCheck, Zap, Globe, BarChart3, Users, LayoutDashboard } from "lucide-react";

const features = [
  {
    title: "Curadoria de Precisão",
    description: "Algoritmos avançados que selecionam apenas o que há de melhor no mercado global.",
    icon: Zap,
    className: "md:col-span-2",
  },
  {
    title: "Segurança Impenetrável",
    description: "Proteção de dados nível bancário para suas transações mais valiosas.",
    icon: ShieldCheck,
    className: "md:col-span-1",
  },
  {
    title: "Analytics VIP",
    description: "Insights profundos sobre o comportamento dos seus clientes de alto valor.",
    icon: BarChart3,
    className: "md:col-span-1",
  },
  {
    title: "Expansão Global",
    description: "Conecte-se com as principais casas de luxo em Paris, Milão e Nova York.",
    icon: Globe,
    className: "md:col-span-2",
  },
];

export function BentoFeatures() {
  return (
    <section id="features" className="py-32 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="font-serif text-4xl md:text-6xl font-bold mb-6">Exclusividade em cada detalhe</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Nossa plataforma foi construída sobre quatro pilares fundamentais que garantem 
            o sucesso da sua marca no mercado de luxo.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={cn(
                "group relative overflow-hidden rounded-3xl border border-border bg-background p-8 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500",
                feature.className
              )}
            >
              <div className="mb-6 inline-flex size-12 items-center justify-center rounded-2xl bg-secondary text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-500">
                <feature.icon className="size-6" />
              </div>
              <h3 className="font-serif text-2xl font-bold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
              
              <div className="absolute -right-4 -bottom-4 size-32 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
                <feature.icon className="size-full" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
