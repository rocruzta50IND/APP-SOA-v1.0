"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  ArrowRight, 
  BarChart3, 
  ShieldCheck, 
  Zap, 
  Globe, 
  Lock, 
  Layers,
  Check,
  Plus,
  Minus
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";

// --- Mock Data ---

const FEATURES = [
  {
    title: "Real-time Settlement",
    description: "Execute transactions with sub-second latency across multiple chains.",
    icon: Zap,
  },
  {
    title: "Institutional Security",
    description: "Multi-party computation (MPC) and hardware-level encryption.",
    icon: ShieldCheck,
  },
  {
    title: "Global Compliance",
    description: "Automated KYC/AML and jurisdictional reporting built-in.",
    icon: Globe,
  },
  {
    title: "Deep Liquidity",
    description: "Access aggregated liquidity from the world's largest exchanges.",
    icon: BarChart3,
  },
  {
    title: "Smart Treasury",
    description: "Automated yield optimization and risk management for your assets.",
    icon: Layers,
  },
  {
    title: "Private Infrastructure",
    description: "Dedicated nodes and private RPC endpoints for maximum privacy.",
    icon: Lock,
  },
];

const STATS = [
  { label: "Assets Under Custody", value: "$42B+" },
  { label: "Daily Volume", value: "$1.8B" },
  { label: "Uptime SLA", value: "99.99%" },
];

const TESTIMONIALS = [
  {
    quote: "Vortex has completely transformed how we handle our corporate treasury. The speed and security are unmatched in the current market.",
    author: "Sarah Chen",
    role: "CFO, Aetheris Capital",
  },
  {
    quote: "The API is a developer's dream. We integrated their settlement layer in less than a week. Surgical precision indeed.",
    author: "Marcus Thorne",
    role: "CTO, NeoVault",
  },
  {
    quote: "Minimalism at its finest. No bloat, just the features we need to manage high-ticket digital assets efficiently.",
    author: "Elena Rossi",
    role: "Head of Operations, Lumina Talents",
  },
];

const PRICING = [
  {
    name: "Starter",
    price: "$499",
    description: "For small teams and startups starting their crypto journey.",
    features: ["Up to $10M AUC", "Basic API Access", "Standard Support", "3 Team Members"],
    cta: "Start Free Trial",
    variant: "outline" as const,
  },
  {
    name: "Professional",
    price: "$1,999",
    description: "Advanced tools and higher limits for growing institutions.",
    features: ["Up to $500M AUC", "Full API Suite", "Priority 24/7 Support", "Unlimited Team Members", "Custom Reporting"],
    cta: "Get Started",
    variant: "primary" as const,
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "Bespoke infrastructure for the world's largest financial entities.",
    features: ["Unlimited AUC", "Dedicated Infrastructure", "White-glove Onboarding", "Custom Smart Contracts", "On-site Training"],
    cta: "Contact Sales",
    variant: "outline" as const,
  },
];

const FAQS = [
  {
    question: "How does Vortex ensure the security of assets?",
    answer: "We utilize multi-layer security including MPC (Multi-Party Computation), hardware security modules (HSM), and regular third-party audits. Your private keys never exist in a single location.",
  },
  {
    question: "Which blockchains do you currently support?",
    answer: "Vortex supports all major EVM-compatible chains, Bitcoin, Solana, and several institutional private ledgers. New chains are added quarterly.",
  },
  {
    question: "Can we integrate Vortex with our existing ERP?",
    answer: "Yes, our REST and WebSocket APIs are designed for seamless integration with enterprise systems like SAP, Oracle, and Microsoft Dynamics.",
  },
  {
    question: "What are the compliance standards met by Vortex?",
    answer: "We are SOC2 Type II compliant and maintain rigorous standards for AML/KYC across 150+ jurisdictions.",
  },
];

// --- Components ---

const Navbar = () => (
  <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
    <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
      <div className="flex items-center gap-8">
        <Link href="/" className="text-xl font-bold tracking-tighter uppercase">
          Vortex
        </Link>
        <div className="hidden md:flex items-center gap-6">
          {["Features", "Solutions", "Pricing", "Resources"].map((item) => (
            <Link 
              key={item} 
              href="#" 
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {item}
            </Link>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-4">
        <Link 
          href="/login" 
          className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors px-4"
        >
          Login
        </Link>
        <Link 
          href="/register"
          className="inline-flex items-center justify-center h-9 px-4 text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          Get Started
        </Link>
      </div>
    </div>
  </nav>
);

const Hero = () => (
  <section className="relative pt-32 pb-24 md:pt-48 md:pb-32 overflow-hidden">
    <div className="max-w-7xl mx-auto px-6 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="inline-flex items-center rounded-full border border-border px-3 py-1 mb-6">
          <span className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">
            v1.0 is now live
          </span>
          <div className="ml-2 w-1 h-1 rounded-full bg-primary animate-pulse" />
        </div>
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-8 leading-[1.1]">
          INSTITUTIONAL GRADE <br />
          <span className="text-muted-foreground/40">DIGITAL ASSETS.</span>
        </h1>
        <p className="max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground mb-10 leading-relaxed">
          The surgical settlement layer for modern finance. Secure, compliant, and lightning fast infrastructure for the next generation of capital.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link 
            href="/register"
            className="inline-flex items-center justify-center h-11 px-8 text-lg font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors gap-2 w-full sm:w-auto"
          >
            Open Account <ArrowRight className="w-4 h-4" />
          </Link>
          <Link 
            href="/login"
            className="inline-flex items-center justify-center h-11 px-8 text-lg font-medium border border-input bg-background hover:bg-accent hover:text-accent-foreground transition-colors w-full sm:w-auto"
          >
            Book a Demo
          </Link>
        </div>
      </motion.div>
    </div>
  </section>
);

const SocialProof = () => (
  <section className="py-12 border-y border-border/50">
    <div className="max-w-7xl mx-auto px-6">
      <p className="text-[10px] uppercase tracking-widest font-bold text-center text-muted-foreground mb-8">
        Trusted by the world&apos;s leading institutions
      </p>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center opacity-40 grayscale">
        {["AETHERIS", "NEOVAULT", "LUMINA", "NEXIS", "AUREM", "LEXORA"].map((name) => (
          <div key={name} className="text-center font-bold tracking-tighter text-xl italic">
            {name}
          </div>
        ))}
      </div>
    </div>
  </section>
);

const Features = () => (
  <section className="py-24 md:py-32">
    <div className="max-w-7xl mx-auto px-6">
      <div className="mb-16">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tighter mb-4">
          Engineered for Performance.
        </h2>
        <p className="text-muted-foreground max-w-xl">
          Everything you need to manage digital assets at scale without the complexity of legacy systems.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {FEATURES.map((feature, i) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            viewport={{ once: true }}
          >
            <Card className="h-full border-border/50 hover:border-border transition-colors">
              <CardHeader>
                <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center mb-4">
                  <feature.icon className="w-5 h-5" />
                </div>
                <CardTitle className="tracking-tight">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const Stats = () => (
  <section className="py-24 bg-muted/30">
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {STATS.map((stat) => (
          <div key={stat.label} className="text-center">
            <div className="text-5xl font-black tracking-tighter mb-2">{stat.value}</div>
            <div className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const Testimonials = () => (
  <section className="py-24 md:py-32">
    <div className="max-w-7xl mx-auto px-6 text-center">
      <h2 className="text-3xl md:text-4xl font-bold tracking-tighter mb-16">
        Verified Success.
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {TESTIMONIALS.map((t, i) => (
          <Card key={i} className="bg-transparent border-none text-left">
            <CardContent className="pt-6">
              <p className="text-lg italic mb-6 leading-relaxed">
                &quot;{t.quote}&quot;
              </p>
              <div>
                <div className="font-bold tracking-tight">{t.author}</div>
                <div className="text-xs text-muted-foreground">{t.role}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  </section>
);

const Pricing = () => (
  <section className="py-24 md:py-32 border-t border-border/50">
    <div className="max-w-7xl mx-auto px-6">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tighter mb-4">
          Transparent Pricing.
        </h2>
        <p className="text-muted-foreground">
          Choose the plan that fits your institutional needs.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {PRICING.map((plan) => (
          <Card key={plan.name} className={cn(
            "flex flex-col",
            plan.name === "Professional" ? "border-primary ring-1 ring-primary/20" : "border-border/50"
          )}>
            <CardHeader>
              <CardTitle>{plan.name}</CardTitle>
              <CardDescription>{plan.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <div className="text-4xl font-black tracking-tighter mb-6">{plan.price}</div>
              <ul className="space-y-4">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-primary" />
                    {feature}
                  </li>
                ))}
              </ul>
            </CardContent>
            <div className="p-6 pt-0 mt-auto">
              <Link 
                href="/register"
                className={cn(
                  "inline-flex items-center justify-center h-10 px-4 py-2 text-sm font-medium transition-colors w-full",
                  plan.variant === "primary" 
                    ? "bg-primary text-primary-foreground hover:bg-primary/90" 
                    : "border border-input bg-background hover:bg-accent hover:text-accent-foreground"
                )}
              >
                {plan.cta}
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </div>
  </section>
);

const FAQ = () => (
  <section className="py-24 md:py-32 bg-muted/30">
    <div className="max-w-3xl mx-auto px-6">
      <h2 className="text-3xl md:text-4xl font-bold tracking-tighter mb-12 text-center">
        Common Inquiries.
      </h2>
      <div className="space-y-4">
        {FAQS.map((faq, i) => (
          <Card key={i} className="border-border/50">
            <CardHeader className="py-4 cursor-pointer group">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-semibold">{faq.question}</CardTitle>
                <Plus className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
              </div>
            </CardHeader>
            <CardContent className="pb-4">
              <p className="text-sm text-muted-foreground leading-relaxed">
                {faq.answer}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="py-12 border-t border-border/50">
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-12">
        <div className="col-span-2">
          <Link href="/" className="text-xl font-bold tracking-tighter uppercase mb-6 block">
            Vortex
          </Link>
          <p className="text-sm text-muted-foreground max-w-xs mb-6">
            The next generation of digital asset infrastructure. Secure, surgical, and institution-ready.
          </p>
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 rounded border border-border flex items-center justify-center cursor-pointer hover:bg-muted transition-colors">
              <Globe className="w-4 h-4" />
            </div>
            <div className="w-8 h-8 rounded border border-border flex items-center justify-center cursor-pointer hover:bg-muted transition-colors">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
        </div>
        <div>
          <h4 className="font-bold text-xs uppercase tracking-widest mb-6">Product</h4>
          <ul className="space-y-4 text-sm text-muted-foreground">
            <li><Link href="#">Features</Link></li>
            <li><Link href="#">Settlement</Link></li>
            <li><Link href="#">Liquidity</Link></li>
            <li><Link href="#">API Docs</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-xs uppercase tracking-widest mb-6">Company</h4>
          <ul className="space-y-4 text-sm text-muted-foreground">
            <li><Link href="#">About</Link></li>
            <li><Link href="#">Careers</Link></li>
            <li><Link href="#">Contact</Link></li>
            <li><Link href="#">Privacy</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-xs uppercase tracking-widest mb-6">Legal</h4>
          <ul className="space-y-4 text-sm text-muted-foreground">
            <li><Link href="#">Compliance</Link></li>
            <li><Link href="#">Terms</Link></li>
            <li><Link href="#">Security</Link></li>
          </ul>
        </div>
      </div>
      <div className="pt-8 border-t border-border/50 flex flex-col md:row items-center justify-between gap-4 text-xs text-muted-foreground">
        <p>© 2026 Vortex Infrastructure Inc. All rights reserved.</p>
        <div className="flex items-center gap-6">
          <Link href="#">Status</Link>
          <Link href="#">Trust</Link>
          <Link href="#">Legal</Link>
        </div>
      </div>
    </div>
  </footer>
);

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background selection:bg-primary selection:text-primary-foreground">
      <Navbar />
      <main>
        <Hero />
        <SocialProof />
        <Features />
        <Stats />
        <Testimonials />
        <Pricing />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}
