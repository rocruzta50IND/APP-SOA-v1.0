"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  ArrowRight, 
  ChevronDown, 
  Globe, 
  Layers, 
  Zap, 
  Shield, 
  BarChart3, 
  Users, 
  CheckCircle2,
  Package,
  Cpu,
  Truck
} from "lucide-react";
import { cn } from "@/lib/utils";

const springTransition = { type: "spring", stiffness: 400, damping: 30 } as const;

const Navbar = () => (
  <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-background/50 backdrop-blur-xl">
    <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
          <Zap className="w-5 h-5 text-white fill-white" />
        </div>
        <span className="text-xl font-bold tracking-tighter">AuraCommerce</span>
      </div>
      
      <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
        <Link href="#features" className="hover:text-foreground transition-colors">Platform</Link>
        <Link href="#solutions" className="hover:text-foreground transition-colors">Solutions</Link>
        <Link href="#pricing" className="hover:text-foreground transition-colors">Pricing</Link>
        <Link href="#faq" className="hover:text-foreground transition-colors">Resources</Link>
      </div>

      <div className="flex items-center gap-4">
        <Link href="/login" className="text-sm font-medium hover:text-foreground transition-colors">Sign In</Link>
        <Link href="/register" className="premium-button text-sm">
          Get Started
        </Link>
      </div>
    </div>
  </nav>
);

const Hero = () => (
  <section className="relative pt-40 pb-20 overflow-hidden">
    <div className="ambient-glow w-[500px] h-[500px] -top-40 -left-20 opacity-30" />
    <div className="ambient-glow w-[400px] h-[400px] top-60 -right-20 opacity-20" />
    
    <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={springTransition}
      >
        <span className="px-4 py-1.5 rounded-full border border-primary/20 bg-primary/10 text-primary text-xs font-bold tracking-widest uppercase mb-6 inline-block">
          Enterprise Commerce Orchestration
        </span>
        <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-8 bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-white/40 leading-[1.1]">
          Orchestrate <br />
          Enterprise Commerce.
        </h1>
        <p className="max-w-2xl mx-auto text-xl text-muted-foreground mb-10 leading-relaxed">
          The unified commerce platform for high-ticket brands. Scalable, headless, and optimized for global B2B and B2C operations.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/register" className="premium-button text-lg px-8 py-4 w-full sm:w-auto flex items-center justify-center gap-2 group">
            Start Scaling Now
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <button className="px-8 py-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all font-medium backdrop-blur-md w-full sm:w-auto">
            Book a Demo
          </button>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ ...springTransition, delay: 0.2 }}
        className="mt-20 relative"
      >
        <div className="glass-card aspect-[16/9] overflow-hidden p-2">
          <div className="w-full h-full bg-neutral-900 rounded-xl border border-white/5 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-12 bg-white/5 border-b border-white/5 flex items-center px-4 gap-2">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-white/10" />
                <div className="w-3 h-3 rounded-full bg-white/10" />
                <div className="w-3 h-3 rounded-full bg-white/10" />
              </div>
            </div>
            <div className="pt-16 px-8 grid grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-40 rounded-lg bg-white/5 border border-white/5 animate-pulse" />
              ))}
              <div className="col-span-3 h-64 rounded-lg bg-white/5 border border-white/5 animate-pulse" />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);

const SocialProof = () => (
  <section className="py-20 border-y border-white/5 bg-white/[0.02]">
    <div className="max-w-7xl mx-auto px-6">
      <p className="text-center text-xs font-bold tracking-[0.3em] uppercase text-muted-foreground mb-12">
        Trusted by Global Market Leaders
      </p>
      <div className="flex flex-wrap justify-center gap-12 md:gap-20 opacity-50 grayscale transition-all hover:grayscale-0">
        {["Lumina", "Aether", "Veloce", "NeoVault", "Lexora"].map((name) => (
          <span key={name} className="text-2xl font-black tracking-tighter italic">{name}</span>
        ))}
      </div>
    </div>
  </section>
);

const BentoFeatures = () => (
  <section id="features" className="py-32 relative">
    <div className="max-w-7xl mx-auto px-6">
      <div className="text-center mb-20">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4">Engineered for Complexity</h2>
        <p className="text-muted-foreground text-lg">A robust suite of tools built to handle enterprise-level scale.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div 
          whileHover={{ y: -5 }}
          className="glass-card p-8 md:col-span-2"
        >
          <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center mb-6">
            <Globe className="text-primary w-6 h-6" />
          </div>
          <h3 className="text-2xl font-bold mb-4">Multi-Market Orchestration</h3>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Launch in new territories in minutes. Handle localized pricing, taxes, and currencies with built-in compliance for over 180 countries.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <div className="h-2 rounded-full bg-white/5 overflow-hidden">
              <div className="h-full w-3/4 bg-primary" />
            </div>
            <div className="h-2 rounded-full bg-white/5 overflow-hidden">
              <div className="h-full w-1/2 bg-primary/50" />
            </div>
          </div>
        </motion.div>

        <motion.div 
          whileHover={{ y: -5 }}
          className="glass-card p-8"
        >
          <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center mb-6">
            <Zap className="text-primary w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold mb-4">Edge Optimization</h3>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Sub-100ms response times globally. Our infrastructure scales automatically to handle peak traffic without breaking a sweat.
          </p>
        </motion.div>

        <motion.div 
          whileHover={{ y: -5 }}
          className="glass-card p-8"
        >
          <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center mb-6">
            <Layers className="text-primary w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold mb-4">Unified Inventory</h3>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Real-time synchronization across warehouses, physical stores, and marketplaces. Never oversell again.
          </p>
        </motion.div>

        <motion.div 
          whileHover={{ y: -5 }}
          className="glass-card p-8 md:col-span-2 relative overflow-hidden group"
        >
          <div className="relative z-10">
            <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center mb-6">
              <Shield className="text-primary w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Enterprise Grade Security</h3>
            <p className="text-muted-foreground leading-relaxed">
              SOC2 Type II, PCI-DSS Level 1, and GDPR compliant. Your data is protected by military-grade encryption and advanced fraud detection.
            </p>
          </div>
          <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
            <Shield className="w-40 h-40" />
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

const Pricing = () => (
  <section id="pricing" className="py-32 bg-white/[0.02] border-y border-white/5">
    <div className="max-w-7xl mx-auto px-6">
      <div className="text-center mb-20">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4">Transparent Scale</h2>
        <p className="text-muted-foreground text-lg">Predictable pricing designed to grow with your volume.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          {
            name: "Growth",
            price: "$990",
            description: "Perfect for scaling brands hitting their first $10M ARR.",
            features: ["Global Inventory", "Basic API Access", "Standard Support", "3 Multi-markets"]
          },
          {
            name: "Enterprise",
            price: "$2,490",
            description: "The choice for market leaders and high-volume merchants.",
            features: ["Unlimited Multi-markets", "Dedicated Account Manager", "Custom API Limits", "Priority Support", "Advanced Analytics"],
            popular: true
          },
          {
            name: "Custom",
            price: "Tailored",
            description: "For global conglomerates requiring bespoke orchestration.",
            features: ["Private Cloud Deployment", "24/7 Phone Support", "White-glove Migration", "SLA Guarantees", "Custom Contract"]
          }
        ].map((plan, i) => (
          <div 
            key={plan.name}
            className={cn(
              "glass-card p-10 flex flex-col relative",
              plan.popular && "border-primary/50 shadow-[0_0_40px_rgba(79,70,229,0.1)]"
            )}
          >
            {plan.popular && (
              <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full">
                Most Popular
              </span>
            )}
            <div className="mb-8">
              <h3 className="text-sm font-bold tracking-[0.2em] uppercase text-muted-foreground mb-4">{plan.name}</h3>
              <div className="flex items-baseline gap-1">
                <span className="text-5xl font-black tracking-tighter">{plan.price}</span>
                {plan.price !== "Tailored" && <span className="text-muted-foreground">/mo</span>}
              </div>
            </div>
            <p className="text-muted-foreground text-sm mb-8 leading-relaxed">{plan.description}</p>
            <ul className="space-y-4 mb-10 flex-grow">
              {plan.features.map((f) => (
                <li key={f} className="flex items-center gap-3 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            <Link 
              href="/register" 
              className={cn(
                "w-full py-4 rounded-xl font-bold transition-all text-center",
                plan.popular 
                  ? "bg-primary text-white hover:bg-primary/90" 
                  : "border border-white/10 hover:bg-white/5"
              )}
            >
              Get Started
            </Link>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const FAQ = () => (
  <section id="faq" className="py-32">
    <div className="max-w-3xl mx-auto px-6">
      <h2 className="text-4xl font-bold tracking-tighter mb-12 text-center">Frequently Asked Questions</h2>
      <div className="space-y-4">
        {[
          { q: "How does migration work?", a: "We provide automated tools for Shopify, Magento, and BigCommerce, alongside a white-glove engineering team for custom migrations." },
          { q: "Can we use our own frontend?", a: "Absolutely. AuraCommerce is built API-first. You can use our React SDK, or connect via GraphQL/REST from any stack." },
          { q: "What is your uptime guarantee?", a: "Enterprise plans include a 99.99% SLA uptime guarantee, backed by global redundancy." },
          { q: "Do you handle B2B workflows?", a: "Yes, AuraCommerce includes specialized modules for net-payment terms, volume pricing, and approval workflows." }
        ].map((item, i) => (
          <div key={i} className="glass-card p-6">
            <h4 className="font-bold flex justify-between items-center cursor-pointer group">
              {item.q}
              <ChevronDown className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
            </h4>
            <p className="mt-4 text-muted-foreground text-sm leading-relaxed">{item.a}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="py-20 border-t border-white/5 bg-black/40">
    <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12">
      <div className="col-span-2 lg:col-span-2">
        <div className="flex items-center gap-2 mb-6">
          <Zap className="w-6 h-6 text-primary fill-primary" />
          <span className="text-2xl font-bold tracking-tighter">AuraCommerce</span>
        </div>
        <p className="text-muted-foreground max-w-sm text-sm leading-relaxed mb-8">
          The next-generation commerce orchestration engine for global enterprise brands. Built for speed, scale, and high-ticket reliability.
        </p>
        <div className="flex gap-4">
          <div className="w-10 h-10 rounded-lg border border-white/10 flex items-center justify-center hover:bg-white/5 cursor-pointer transition-colors">
            <Globe className="w-5 h-5 text-muted-foreground" />
          </div>
          <div className="w-10 h-10 rounded-lg border border-white/10 flex items-center justify-center hover:bg-white/5 cursor-pointer transition-colors">
            <Users className="w-5 h-5 text-muted-foreground" />
          </div>
        </div>
      </div>
      
      <div>
        <h5 className="font-bold text-sm mb-6 uppercase tracking-widest">Platform</h5>
        <ul className="space-y-4 text-sm text-muted-foreground">
          <li className="hover:text-foreground cursor-pointer transition-colors">Infrastructure</li>
          <li className="hover:text-foreground cursor-pointer transition-colors">API Reference</li>
          <li className="hover:text-foreground cursor-pointer transition-colors">Marketplaces</li>
          <li className="hover:text-foreground cursor-pointer transition-colors">POS Integration</li>
        </ul>
      </div>

      <div>
        <h5 className="font-bold text-sm mb-6 uppercase tracking-widest">Company</h5>
        <ul className="space-y-4 text-sm text-muted-foreground">
          <li className="hover:text-foreground cursor-pointer transition-colors">About Us</li>
          <li className="hover:text-foreground cursor-pointer transition-colors">Careers</li>
          <li className="hover:text-foreground cursor-pointer transition-colors">Press Kit</li>
          <li className="hover:text-foreground cursor-pointer transition-colors">Contact</li>
        </ul>
      </div>

      <div>
        <h5 className="font-bold text-sm mb-6 uppercase tracking-widest">Legal</h5>
        <ul className="space-y-4 text-sm text-muted-foreground">
          <li className="hover:text-foreground cursor-pointer transition-colors">Privacy</li>
          <li className="hover:text-foreground cursor-pointer transition-colors">Terms</li>
          <li className="hover:text-foreground cursor-pointer transition-colors">Compliance</li>
          <li className="hover:text-foreground cursor-pointer transition-colors">DPA</li>
        </ul>
      </div>
    </div>
    <div className="max-w-7xl mx-auto px-6 mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-mono text-muted-foreground uppercase tracking-widest">
      <p>© 2026 AuraCommerce Orchestration Systems</p>
      <div className="flex gap-8">
        <span>System Status: 100% Operational</span>
        <span>Build: v4.2.0-stable</span>
      </div>
    </div>
  </footer>
);

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30">
      <Navbar />
      <Hero />
      <SocialProof />
      <BentoFeatures />
      <Pricing />
      <FAQ />
      <Footer />
    </div>
  );
}
