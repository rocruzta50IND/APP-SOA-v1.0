"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { 
  ArrowRight, 
  ChevronRight, 
  Check, 
  Plus, 
  Minus,
  Globe,
  Shield,
  Zap,
  Layout,
  Layers,
  Fingerprint
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { PublicHeader } from "@/components/ui/PublicHeader";

const transition = { duration: 1.2, ease: [0.16, 1, 0.3, 1] };
const reveal = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
};

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-primary/30 selection:text-primary overflow-x-hidden">
      <PublicHeader />

      {/* Hero Section */}
      <section className="relative pt-40 pb-32 lg:pt-64 lg:pb-48 px-6 border-b border-border/50 overflow-hidden">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px]" />
        
        <div className="container mx-auto relative z-10">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2 }}
            className="mb-8"
          >
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary">
              Est. 2026 — Sovereign Architecture
            </span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={transition}
            className="text-7xl md:text-9xl lg:text-[12rem] font-serif font-bold mb-12 tracking-tighter leading-none"
          >
            Architecting <br />
            <span className="text-primary italic">Legacy.</span>
          </motion.h1>

          <div className="grid md:grid-cols-2 gap-12 items-end">
            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ ...transition, delay: 0.2 }}
              className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-xl font-light"
            >
              Aethelgard provides the digital infrastructure for high-ticket asset management and luxury infrastructure. We transform complexity into cinematic clarity.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...transition, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-6"
            >
              <Button size="lg" className="w-full sm:w-auto" asChild>
                <Link href="/register">Start the Journey</Link>
              </Button>
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                The Philosophy
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-24 px-6 border-b border-border/50 bg-secondary/20">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 items-center opacity-50 grayscale hover:grayscale-0 transition-all duration-700">
            <div className="flex flex-col gap-2">
              <span className="text-[10px] uppercase tracking-widest font-bold">Client 01</span>
              <span className="font-serif text-2xl font-bold">Vanguard RE</span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-[10px] uppercase tracking-widest font-bold">Client 02</span>
              <span className="font-serif text-2xl font-bold">Helix Group</span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-[10px] uppercase tracking-widest font-bold">Client 03</span>
              <span className="font-serif text-2xl font-bold">Luxor Capital</span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-[10px] uppercase tracking-widest font-bold">Client 04</span>
              <span className="font-serif text-2xl font-bold">Ætheris</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Showcase */}
      <section id="features" className="py-32 lg:py-48 px-6">
        <div className="container mx-auto">
          <motion.div {...reveal} transition={transition} className="mb-24 max-w-2xl">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground mb-4 block">
              The Portfolio
            </span>
            <h2 className="text-5xl md:text-7xl font-serif font-bold mb-8">
              Bespoke Digital <br />Craftsmanship.
            </h2>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-32">
            <motion.div 
              {...reveal} 
              transition={transition}
              className="group cursor-none"
            >
              <div className="aspect-[4/5] bg-muted relative overflow-hidden mb-8">
                <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="absolute inset-12 border border-border/50 flex items-center justify-center">
                  <Globe className="w-32 h-32 text-border/30 group-hover:text-primary/50 transition-colors duration-700" />
                </div>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground mb-2 block">01 / Global Intelligence</span>
              <h3 className="text-3xl font-serif font-bold mb-4 italic">Global Infrastructure Tracking</h3>
              <p className="text-muted-foreground leading-relaxed">Monitor your physical assets across continents with millisecond precision and cinematic visualization.</p>
            </motion.div>

            <motion.div 
              {...reveal} 
              transition={{ ...transition, delay: 0.2 }}
              className="lg:mt-48 group cursor-none"
            >
              <div className="aspect-[4/5] bg-muted relative overflow-hidden mb-8">
                <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="absolute inset-12 border border-border/50 flex items-center justify-center">
                  <Shield className="w-32 h-32 text-border/30 group-hover:text-primary/50 transition-colors duration-700" />
                </div>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground mb-2 block">02 / Absolute Security</span>
              <h3 className="text-3xl font-serif font-bold mb-4 italic">Sovereign Data Custody</h3>
              <p className="text-muted-foreground leading-relaxed">Your data is an asset. We provide enterprise-grade encryption and decentralized storage for absolute peace of mind.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Detail Section - Asymmetrical */}
      <section className="py-32 bg-foreground text-background">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <motion.div 
              {...reveal} 
              transition={transition}
              className="lg:col-span-7"
            >
              <h2 className="text-5xl md:text-8xl font-serif font-bold tracking-tighter leading-none mb-12">
                Designed for the <br />
                <span className="italic text-primary">Uncompromising.</span>
              </h2>
            </motion.div>
            <motion.div 
              {...reveal} 
              transition={{ ...transition, delay: 0.2 }}
              className="lg:col-span-5"
            >
              <div className="space-y-12">
                <div className="flex gap-8 group">
                  <div className="shrink-0 w-12 h-12 border border-background/20 flex items-center justify-center group-hover:border-primary transition-colors">
                    <Fingerprint className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-xl font-serif font-bold mb-2">Biometric Verification</h4>
                    <p className="text-background/60 text-sm leading-relaxed">Hardware-level security protocols for every high-value transaction.</p>
                  </div>
                </div>
                <div className="flex gap-8 group">
                  <div className="shrink-0 w-12 h-12 border border-background/20 flex items-center justify-center group-hover:border-primary transition-colors">
                    <Zap className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-xl font-serif font-bold mb-2">Zero-Latency Sync</h4>
                    <p className="text-background/60 text-sm leading-relaxed">Real-time telemetry from assets worldwide, rendered in pristine detail.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-32 lg:py-48 px-6">
        <div className="container mx-auto">
          <motion.div {...reveal} transition={transition} className="text-center mb-24">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground mb-4 block">
              The Investment
            </span>
            <h2 className="text-5xl md:text-7xl font-serif font-bold mb-8">
              Choose your <br />Level of Access.
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Private", price: "2.5k", features: ["Up to 5 Assets", "Standard Telemetry", "24/7 Concierge"] },
              { name: "Enterprise", price: "10k", features: ["Unlimited Assets", "Quantum Encryption", "Dedicated Architect"], active: true },
              { name: "Sovereign", price: "Custom", features: ["Private Cloud Deployment", "On-site Hardware Setup", "24/7 Tactical Support"] },
            ].map((tier, i) => (
              <motion.div
                key={tier.name}
                {...reveal}
                transition={{ ...transition, delay: i * 0.1 }}
                className={cn(
                  "relative p-12 border border-border/50 flex flex-col items-start h-full",
                  tier.active ? "bg-secondary/20 border-primary/50" : "bg-background"
                )}
              >
                {tier.active && (
                  <span className="absolute top-0 right-12 -translate-y-1/2 bg-primary text-background text-[10px] font-bold uppercase tracking-widest px-4 py-2">
                    Most Requested
                  </span>
                )}
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground mb-4">Tier {i + 1}</span>
                <h3 className="text-3xl font-serif font-bold mb-2">{tier.name}</h3>
                <div className="mb-12">
                  <span className="text-4xl font-serif font-bold">{tier.price}</span>
                  {tier.price !== "Custom" && <span className="text-muted-foreground ml-2">/mo</span>}
                </div>
                <ul className="space-y-6 mb-12 flex-1">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-center gap-3 text-sm text-muted-foreground italic">
                      <Plus className="w-3 h-3 text-primary" /> {f}
                    </li>
                  ))}
                </ul>
                <Button variant={tier.active ? "default" : "outline"} className="w-full">
                  Begin Engagement
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-32 lg:py-48 px-6 bg-secondary/10">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-24">
            <motion.div {...reveal} transition={transition}>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground mb-4 block">
                The Philosophy
              </span>
              <h2 className="text-5xl md:text-7xl font-serif font-bold mb-8">
                Inquiries <br />& Answers.
              </h2>
              <p className="text-xl text-muted-foreground font-light mb-12">
                We believe in absolute transparency with our partners. Here are the foundations of our operation.
              </p>
              <Button variant="link" className="p-0 text-foreground group">
                Contact our concierge <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-2 transition-transform" />
              </Button>
            </motion.div>

            <motion.div {...reveal} transition={{ ...transition, delay: 0.2 }} className="space-y-12">
              {[
                { q: "Is Aethelgard available for small teams?", a: "We specialize in high-ticket asset management and luxury infrastructure. Our platform is optimized for teams managing assets exceeding $50M in valuation." },
                { q: "How secure is the asset telemetry?", a: "We utilize AES-256-GCM hardware encryption and optionally offer private cloud deployments with zero external dependencies." },
                { q: "Can we integrate with existing ERPs?", a: "Our architecture is built on a highly modular API core, allowing for seamless integration with legacy enterprise systems while maintaining a cinematic front-end experience." },
                { q: "What is the typical deployment time?", a: "A bespoke Aethelgard environment is typically architected and deployed within 4 to 6 weeks, depending on the complexity of the asset portfolio." },
              ].map((faq, i) => (
                <div key={i} className="group border-b border-border/50 pb-8">
                  <h4 className="text-xl font-serif font-bold mb-4 group-hover:text-primary transition-colors cursor-pointer flex justify-between items-center">
                    {faq.q}
                    <Plus className="w-4 h-4 text-muted-foreground group-hover:rotate-45 transition-transform duration-500" />
                  </h4>
                  <p className="text-muted-foreground text-sm leading-relaxed italic max-w-xl">
                    {faq.a}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-24 border-t border-border/50 px-6">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-24">
            <div className="lg:col-span-2">
              <Link href="/" className="flex items-center gap-2 group mb-8">
                <div className="w-8 h-8 bg-foreground flex items-center justify-center">
                  <span className="text-background font-serif font-bold text-xl">A</span>
                </div>
                <span className="font-serif text-xl font-bold tracking-tighter uppercase">
                  Aethelgard
                </span>
              </Link>
              <p className="text-muted-foreground max-w-sm font-light italic">
                Defining the new standard for sovereign digital architecture and luxury asset management.
              </p>
            </div>
            <div>
              <h5 className="text-[10px] font-bold uppercase tracking-[0.2em] mb-8">Navigation</h5>
              <ul className="space-y-4">
                <li><Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors italic">Portfolio</Link></li>
                <li><Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors italic">Investment</Link></li>
                <li><Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors italic">Philosophy</Link></li>
              </ul>
            </div>
            <div>
              <h5 className="text-[10px] font-bold uppercase tracking-[0.2em] mb-8">Legal</h5>
              <ul className="space-y-4">
                <li><Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors italic">Privacy Protocol</Link></li>
                <li><Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors italic">Sovereign Rights</Link></li>
                <li><Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors italic">Terms of Engagement</Link></li>
              </ul>
            </div>
          </div>
          <div className="pt-12 border-t border-border/10 flex flex-col md:flex-row justify-between items-center gap-6">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
              © 2026 Aethelgard Sovereign Systems. All rights reserved.
            </span>
            <div className="flex gap-8">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground cursor-pointer hover:text-foreground transition-colors">Twitter</span>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground cursor-pointer hover:text-foreground transition-colors">LinkedIn</span>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
