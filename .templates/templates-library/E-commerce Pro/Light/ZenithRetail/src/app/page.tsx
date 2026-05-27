"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  ArrowRight, 
  CheckCircle2, 
  BarChart3, 
  Package, 
  Truck, 
  ShieldCheck, 
  Zap,
  ChevronDown,
  Globe,
  Settings
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

// --- Components ---

const Navbar = () => (
  <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
    <div className="container mx-auto px-4 h-16 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
          <Settings className="w-5 h-5 text-primary-foreground" />
        </div>
        <span className="font-bold tracking-tight text-xl">ZenithRetail</span>
      </div>
      <div className="hidden md:flex items-center gap-8">
        <Link href="#features" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Features</Link>
        <Link href="#pricing" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Pricing</Link>
        <Link href="#faq" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Resources</Link>
      </div>
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/login">Log in</Link>
        </Button>
        <Button size="sm" asChild>
          <Link href="/register">Start Free Trial</Link>
        </Button>
      </div>
    </div>
  </nav>
);

const SectionHeader = ({ title, subtitle, badge }: { title: string; subtitle: string; badge?: string }) => (
  <div className="flex flex-col items-center text-center mb-16 space-y-4">
    {badge && (
      <span className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground border border-border px-2 py-1 rounded">
        {badge}
      </span>
    )}
    <h2 className="text-3xl md:text-5xl font-bold tracking-tighter leading-tight max-w-2xl">
      {title}
    </h2>
    <p className="text-muted-foreground text-lg max-w-xl">
      {subtitle}
    </p>
  </div>
);

// --- Sections ---

const Hero = () => (
  <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
    <div className="container mx-auto px-4 relative z-10">
      <div className="flex flex-col items-center text-center space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-muted text-[10px] font-bold uppercase tracking-widest">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            v2.0 Enterprise Ready
          </span>
        </motion.div>
        
        <motion.h1 
          className="text-5xl md:text-7xl font-bold tracking-tighter leading-none max-w-4xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
        >
          Scale Your Retail Operations with Surgical Precision.
        </motion.h1>
        
        <motion.p 
          className="text-muted-foreground text-xl max-w-2xl leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
        >
          ZenithRetail provides a unified infrastructure for inventory management, 
          real-time analytics, and global logistics for high-ticket B2B enterprises.
        </motion.p>
        
        <motion.div 
          className="flex flex-col sm:flex-row items-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3, ease: "easeOut" }}
        >
          <Button size="lg" className="h-12 px-8 text-base" asChild>
            <Link href="/register">Get Started Now <ArrowRight className="ml-2 w-4 h-4" /></Link>
          </Button>
          <Button size="lg" variant="outline" className="h-12 px-8 text-base">
            Book a Demo
          </Button>
        </motion.div>
      </div>
    </div>
  </section>
);

const SocialProof = () => (
  <section className="py-12 border-y border-border/50 bg-muted/30">
    <div className="container mx-auto px-4">
      <p className="text-center text-[10px] uppercase tracking-widest font-bold text-muted-foreground mb-8">
        Trusted by industry leaders
      </p>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 grayscale opacity-50">
        {['Acme Corp', 'GlobalLog', 'NextRetail', 'Vanguard', 'PrimeTrade', 'Apex'].map((brand) => (
          <div key={brand} className="flex items-center justify-center font-bold text-xl tracking-tighter italic">
            {brand}
          </div>
        ))}
      </div>
    </div>
  </section>
);

const Features = () => (
  <section id="features" className="py-24 bg-background">
    <div className="container mx-auto px-4">
      <SectionHeader 
        badge="Engineered for Performance"
        title="Unified Command Center"
        subtitle="Manage complex retail ecosystems through a single, high-density interface designed for speed and clarity."
      />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 p-8 rounded-md border border-border bg-card shadow-sm group hover:border-primary/50 transition-colors">
          <BarChart3 className="w-8 h-8 mb-6 text-primary" />
          <h3 className="text-2xl font-bold tracking-tight mb-3">Real-time Analytics</h3>
          <p className="text-muted-foreground leading-relaxed">
            Monitor every SKU, transaction, and logistics waypoint with zero latency. 
            Our proprietary engine processes millions of data points per second.
          </p>
        </div>
        <div className="p-8 rounded-md border border-border bg-card shadow-sm group hover:border-primary/50 transition-colors">
          <ShieldCheck className="w-8 h-8 mb-6 text-primary" />
          <h3 className="text-2xl font-bold tracking-tight mb-3">Enterprise Security</h3>
          <p className="text-muted-foreground leading-relaxed">
            Bank-grade encryption and granular RBAC controls.
          </p>
        </div>
        <div className="p-8 rounded-md border border-border bg-card shadow-sm group hover:border-primary/50 transition-colors">
          <Package className="w-8 h-8 mb-6 text-primary" />
          <h3 className="text-2xl font-bold tracking-tight mb-3">Smart Inventory</h3>
          <p className="text-muted-foreground leading-relaxed">
            Predictive restocking and multi-warehouse synchronization.
          </p>
        </div>
        <div className="md:col-span-2 p-8 rounded-md border border-border bg-card shadow-sm group hover:border-primary/50 transition-colors">
          <Truck className="w-8 h-8 mb-6 text-primary" />
          <h3 className="text-2xl font-bold tracking-tight mb-3">Global Logistics</h3>
          <p className="text-muted-foreground leading-relaxed">
            Seamless integration with major carriers worldwide. Automated tracking 
            and customs documentation generation for B2B shipments.
          </p>
        </div>
      </div>
    </div>
  </section>
);

const Pricing = () => (
  <section id="pricing" className="py-24 bg-muted/30 border-y border-border/50">
    <div className="container mx-auto px-4">
      <SectionHeader 
        badge="Transparent Scaling"
        title="Simple, Powerful Pricing"
        subtitle="Choose the plan that fits your operational scale. No hidden fees, no complexity."
      />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {[
          { name: "Starter", price: "$499", desc: "For small-scale B2B retailers.", features: ["Up to 5,000 SKUs", "Basic Analytics", "3 User Accounts", "Email Support"] },
          { name: "Professional", price: "$1,299", desc: "For growing enterprises.", features: ["Up to 50,000 SKUs", "Advanced Analytics", "15 User Accounts", "Priority Support", "API Access"], featured: true },
          { name: "Enterprise", price: "Custom", desc: "For global retail leaders.", features: ["Unlimited SKUs", "Custom Dashboards", "Unlimited Users", "24/7 Dedicated Support", "White-labeling"] }
        ].map((plan, i) => (
          <div key={i} className={cn(
            "p-8 rounded-md border bg-card flex flex-col h-full",
            plan.featured ? "border-primary shadow-lg ring-1 ring-primary" : "border-border shadow-sm"
          )}>
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-black tracking-tighter">{plan.price}</span>
                {plan.price !== "Custom" && <span className="text-muted-foreground text-sm">/mo</span>}
              </div>
              <p className="text-muted-foreground text-sm mt-4">{plan.desc}</p>
            </div>
            <div className="space-y-4 mb-8 flex-grow">
              {plan.features.map((feat) => (
                <div key={feat} className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
            <Button className="w-full" variant={plan.featured ? "default" : "outline"}>
              {plan.price === "Custom" ? "Contact Sales" : "Start Free Trial"}
            </Button>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const FAQ = () => (
  <section id="faq" className="py-24 bg-background">
    <div className="container mx-auto px-4 max-w-3xl">
      <SectionHeader 
        badge="FAQ"
        title="Frequently Asked Questions"
        subtitle="Everything you need to know about ZenithRetail."
      />
      <div className="space-y-4">
        {[
          { q: "How long does the implementation take?", a: "Most enterprises are fully operational within 14 days, including custom API integrations and staff training." },
          { q: "Can I migrate data from other platforms?", a: "Yes, we offer automated migration tools for major ERP and retail systems, ensuring zero data loss." },
          { q: "Is there a limit on transactions?", a: "Our infrastructure is designed to handle unlimited volume. Pricing is based on SKU count and user seats." },
          { q: "Do you offer on-premise solutions?", a: "ZenithRetail is a cloud-first platform, but we offer private cloud deployments for Enterprise customers." }
        ].map((item, i) => (
          <div key={i} className="p-6 border border-border rounded-md bg-card">
            <h4 className="font-bold mb-2">{item.q}</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">{item.a}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="py-20 border-t border-border bg-muted/30">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        <div className="col-span-1 md:col-span-2 space-y-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-primary rounded flex items-center justify-center">
              <Settings className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-bold tracking-tight text-lg">ZenithRetail</span>
          </div>
          <p className="text-muted-foreground max-w-xs text-sm leading-relaxed">
            The industrial-grade infrastructure for modern retail enterprises. 
            Precision management at global scale.
          </p>
        </div>
        <div>
          <h4 className="text-[10px] uppercase tracking-widest font-bold text-foreground mb-6">Product</h4>
          <ul className="space-y-4 text-sm text-muted-foreground">
            <li><Link href="#" className="hover:text-primary transition-colors">Features</Link></li>
            <li><Link href="#" className="hover:text-primary transition-colors">Analytics</Link></li>
            <li><Link href="#" className="hover:text-primary transition-colors">Integrations</Link></li>
            <li><Link href="#" className="hover:text-primary transition-colors">Roadmap</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-[10px] uppercase tracking-widest font-bold text-foreground mb-6">Company</h4>
          <ul className="space-y-4 text-sm text-muted-foreground">
            <li><Link href="#" className="hover:text-primary transition-colors">About</Link></li>
            <li><Link href="#" className="hover:text-primary transition-colors">Careers</Link></li>
            <li><Link href="#" className="hover:text-primary transition-colors">Privacy</Link></li>
            <li><Link href="#" className="hover:text-primary transition-colors">Contact</Link></li>
          </ul>
        </div>
      </div>
      <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-border/50 text-xs text-muted-foreground font-medium uppercase tracking-widest">
        <p>© 2026 ZenithRetail Inc. All rights reserved.</p>
        <div className="flex items-center gap-8 mt-4 md:mt-0">
          <Link href="#" className="hover:text-foreground">Status</Link>
          <Link href="#" className="hover:text-foreground">Twitter</Link>
          <Link href="#" className="hover:text-foreground">LinkedIn</Link>
        </div>
      </div>
    </div>
  </footer>
);

export default function LandingPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <SocialProof />
      <Features />
      <Pricing />
      <FAQ />
      <Footer />
    </main>
  );
}
