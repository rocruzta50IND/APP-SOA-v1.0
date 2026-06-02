"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  ArrowRight, 
  BarChart3, 
  Globe, 
  Layers, 
  Zap, 
  ChevronRight,
  ShieldCheck,
  TrendingUp,
  Microscope,
  Cpu
} from "lucide-react";
import { cn } from "@/lib/utils";

// --- ANIMATION CONFIG ---
const transition = { duration: 1.2, ease: [0.16, 1, 0.3, 1] } as const;
const fadeIn = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
};

// --- COMPONENTS ---

const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-primary mb-4 block">
    {children}
  </span>
);

const Navbar = () => (
  <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
    <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
      <Link href="/" className="font-serif text-2xl tracking-tighter flex items-center gap-2">
        <div className="w-8 h-8 bg-primary rounded-full" />
        Aura<span className="font-sans font-light italic">Insights</span>
      </Link>
      <div className="hidden md:flex items-center gap-12">
        {["Intelligence", "Solutions", "Heritage", "Pricing"].map((item) => (
          <Link 
            key={item} 
            href="#" 
            className="text-[10px] uppercase tracking-widest font-bold hover:text-primary transition-colors"
          >
            {item}
          </Link>
        ))}
      </div>
      <div className="flex items-center gap-6">
        <Link href="/login" className="text-[10px] uppercase tracking-widest font-bold hidden sm:block">
          Login
        </Link>
        <Link 
          href="/register" 
          className="bg-foreground text-background px-8 py-3 rounded-full text-[10px] uppercase tracking-widest font-bold hover:opacity-80 transition-all"
        >
          Acquire Access
        </Link>
      </div>
    </div>
  </nav>
);

export default function LandingPage() {
  return (
    <div className="relative overflow-hidden selection:bg-primary selection:text-primary-foreground">
      <Navbar />

      {/* --- HERO SECTION --- */}
      <section className="relative min-h-screen flex items-center pt-20 px-6">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-8">
            <motion.div {...fadeIn} transition={transition}>
              <SectionLabel>The Vanguard of Enterprise Data</SectionLabel>
              <h1 className="text-6xl md:text-8xl lg:text-9xl font-serif leading-[0.85] tracking-tighter mb-8">
                PREDICTIVE <br /> 
                <span className="italic text-primary">ELEGANCE</span> <br />
                DEFINED.
              </h1>
              <p className="max-w-xl text-lg text-muted-foreground leading-relaxed mb-10">
                Aura Insights orchestrates vast data streams into cinematic visualizations, 
                empowering the world&apos;s most influential brands with prescient intelligence.
              </p>
              <div className="flex flex-col sm:flex-row gap-6">
                <Link 
                  href="/register"
                  className="bg-primary text-primary-foreground px-10 py-5 rounded-full text-xs uppercase tracking-[0.2em] font-bold hover:scale-105 transition-all flex items-center justify-center gap-2 group"
                >
                  Start Exploration
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <button className="border border-border px-10 py-5 rounded-full text-xs uppercase tracking-[0.2em] font-bold hover:bg-muted transition-all">
                  Request Dossier
                </button>
              </div>
            </motion.div>
          </div>
          <div className="lg:col-span-4 relative hidden lg:block">
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ ...transition, delay: 0.2 }}
              className="relative aspect-[3/4] bg-muted overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent" />
              <div className="absolute inset-0 flex items-center justify-center p-12">
                <div className="w-full h-full border border-primary/30 flex flex-col justify-between p-8">
                  <SectionLabel>Live Feed v.4.0</SectionLabel>
                  <div className="space-y-4">
                    <div className="h-1 w-full bg-primary/20" />
                    <div className="h-1 w-2/3 bg-primary/40" />
                    <div className="h-1 w-1/2 bg-primary" />
                  </div>
                </div>
              </div>
            </motion.div>
            <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-primary/10 blur-[80px]" />
          </div>
        </div>
      </section>

      {/* --- SOCIAL PROOF --- */}
      <section className="py-24 border-y border-border/50 bg-muted/30">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-center mb-12 opacity-50">
            Trusted by the architects of the future
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 items-center opacity-40 grayscale hover:grayscale-0 transition-all duration-700">
            {["NEBULOS", "AETHER", "QUANTUM", "VELOCE", "ZENITH"].map((brand) => (
              <div key={brand} className="text-center font-serif text-2xl tracking-widest">{brand}</div>
            ))}
          </div>
        </div>
      </section>

      {/* --- ASYMMETRICAL FEATURES --- */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center mb-32">
            <motion.div {...fadeIn} transition={transition}>
              <SectionLabel>Core Intelligence</SectionLabel>
              <h2 className="text-5xl md:text-6xl font-serif tracking-tighter mb-8">
                Beyond Conventional <br />
                <span className="italic">Data Structures</span>
              </h2>
              <div className="space-y-12 mt-12">
                <div className="flex gap-6">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Cpu className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-serif text-xl mb-2">Neural Processing</h4>
                    <p className="text-muted-foreground leading-relaxed">
                      Our proprietary LLM-integrated core analyzes unstructured data patterns with 99.8% precision.
                    </p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Globe className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-serif text-xl mb-2">Global Synapse</h4>
                    <p className="text-muted-foreground leading-relaxed">
                      Real-time market sentiment analysis across 40+ languages and 150 regional hubs.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
            <motion.div 
              {...fadeIn} 
              transition={{ ...transition, delay: 0.2 }}
              className="relative aspect-square bg-muted p-12 overflow-hidden"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--color-primary)_0%,_transparent_70%)] opacity-10" />
              <div className="relative h-full border border-border/50 flex flex-col justify-end p-8">
                <TrendingUp className="w-12 h-12 text-primary mb-6" />
                <h3 className="text-3xl font-serif mb-4">Autonomous Forensics</h3>
                <p className="text-sm text-muted-foreground">Self-correcting data models that evolve with your enterprise scale.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- MOCK DEMO / STATS --- */}
      <section className="py-32 bg-foreground text-background">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-1">
              <SectionLabel><span className="text-primary-foreground/50">Market Dominance</span></SectionLabel>
              <h2 className="text-5xl font-serif tracking-tighter mb-8">Numbers that <br /> define eras.</h2>
            </div>
            <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-12">
              {[
                { label: "Assets Managed", value: "$4.2T", sub: "+12.4% YoY" },
                { label: "Processing Speed", value: "2.4ms", sub: "Global Average" },
                { label: "Active Nodes", value: "18.5k", sub: "Decentralized" },
                { label: "Accuracy Rate", value: "99.9%", sub: "Audited" },
              ].map((stat) => (
                <div key={stat.label} className="border-l border-primary/30 pl-8 py-4">
                  <p className="text-[10px] uppercase tracking-widest font-bold opacity-50 mb-2">{stat.label}</p>
                  <p className="text-5xl font-serif tracking-tighter mb-1">{stat.value}</p>
                  <p className="text-xs text-primary">{stat.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- TESTIMONIALS --- */}
      <section className="py-32 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <SectionLabel>Testimonials</SectionLabel>
          <div className="mt-12 space-y-24">
            <motion.div {...fadeIn} transition={transition} className="max-w-4xl">
              <blockquote className="text-4xl md:text-5xl font-serif leading-tight italic mb-8">
                &quot;Aura Insights transformed our raw data into a strategic masterpiece. 
                It is not just software; it is a vision-expanding instrument.&quot;
              </blockquote>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-muted" />
                <div>
                  <p className="font-bold text-sm">Julian Vane</p>
                  <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Chief Strategy Officer, Aether Corp</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- PRICING --- */}
      <section className="py-32 px-6 bg-muted/30">
        <div className="max-w-7xl mx-auto text-center mb-20">
          <SectionLabel>Pricing Strategy</SectionLabel>
          <h2 className="text-5xl md:text-6xl font-serif tracking-tighter">Investment Tiers</h2>
        </div>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { name: "Executive", price: "$2,400", features: ["10 Users", "Real-time Nodes", "Standard Support"] },
            { name: "Sovereign", price: "$8,900", features: ["Unlimited Users", "Neural Core Access", "Dedicated Architect"], featured: true },
            { name: "Monarch", price: "Custom", features: ["Full Governance", "On-premise Neural", "24/7 Concierge"] },
          ].map((tier) => (
            <div 
              key={tier.name} 
              className={cn(
                "p-12 border flex flex-col items-center text-center transition-all duration-500",
                tier.featured ? "bg-background border-primary scale-105 z-10 shadow-2xl" : "border-border bg-background/50"
              )}
            >
              <h3 className="font-serif text-2xl mb-2">{tier.name}</h3>
              <div className="text-4xl font-serif mb-8">{tier.price}<span className="text-sm font-sans italic opacity-50"> /mo</span></div>
              <ul className="space-y-4 mb-12 w-full">
                {tier.features.map(f => (
                  <li key={f} className="text-sm text-muted-foreground border-b border-border/50 pb-2">{f}</li>
                ))}
              </ul>
              <Link 
                href="/register"
                className={cn(
                  "w-full py-4 rounded-full text-[10px] uppercase tracking-[0.2em] font-bold transition-all",
                  tier.featured ? "bg-primary text-primary-foreground" : "bg-foreground text-background"
                )}
              >
                Inquire Now
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* --- FAQ --- */}
      <section className="py-32 px-6 max-w-4xl mx-auto">
        <SectionLabel>Common Inquiries</SectionLabel>
        <div className="mt-12 space-y-8">
          {[
            { q: "How secure is the Neural Core?", a: "We utilize quantum-resistant encryption and hardware-level isolation for all predictive processing nodes." },
            { q: "Can we integrate legacy datasets?", a: "Our synaptic bridge supports over 400+ legacy formats with autonomous cleaning and structural mapping." },
            { q: "What is the implementation timeline?", a: "Executive tier implementation typically completes within 72 hours, while Sovereign requires a 1-week calibration." }
          ].map((faq, i) => (
            <div key={i} className="border-b border-border pb-8">
              <h4 className="font-serif text-xl mb-4 flex items-center justify-between">
                {faq.q} <ChevronRight className="w-4 h-4 text-primary" />
              </h4>
              <p className="text-muted-foreground leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="py-24 px-6 border-t border-border">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-2">
            <Link href="/" className="font-serif text-3xl tracking-tighter flex items-center gap-2 mb-8">
              <div className="w-10 h-10 bg-primary rounded-full" />
              Aura<span className="font-sans font-light italic">Insights</span>
            </Link>
            <p className="max-w-sm text-muted-foreground leading-relaxed mb-8">
              Redefining the boundaries of enterprise intelligence through cinematic data orchestration.
            </p>
            <div className="flex gap-6">
              {/* SVG Social Icons (Code-pure) */}
              <div className="w-5 h-5 opacity-50 hover:opacity-100 transition-opacity cursor-pointer">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </div>
              <div className="w-5 h-5 opacity-50 hover:opacity-100 transition-opacity cursor-pointer">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              </div>
            </div>
          </div>
          <div>
            <SectionLabel>Capabilities</SectionLabel>
            <ul className="space-y-4 text-sm font-medium">
              <li><Link href="#" className="hover:text-primary transition-colors">Neural Core</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Visual Synapse</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Quantum Security</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Predictive API</Link></li>
            </ul>
          </div>
          <div>
            <SectionLabel>Company</SectionLabel>
            <ul className="space-y-4 text-sm font-medium">
              <li><Link href="#" className="hover:text-primary transition-colors">Heritage</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Advisory Board</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Press Dossier</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Contact</Link></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-24 pt-8 border-t border-border/50 flex flex-col md:row justify-between items-center gap-6">
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground">© 2026 Aura Insights. All rights reserved.</p>
          <div className="flex gap-8 text-[10px] uppercase tracking-widest font-bold">
            <Link href="#" className="hover:text-primary transition-colors">Privacy Protocol</Link>
            <Link href="#" className="hover:text-primary transition-colors">Terms of Service</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
