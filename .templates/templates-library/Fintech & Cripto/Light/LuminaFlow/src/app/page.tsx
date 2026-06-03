"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  ArrowRight, 
  Check, 
  ChevronDown, 
  BarChart3, 
  ShieldCheck, 
  Zap, 
  Globe2, 
  Layers,
  Search,
  ArrowUpRight
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

// --- Components ---

const Section = ({ 
  children, 
  className, 
  id 
}: { 
  children: React.ReactNode; 
  className?: string; 
  id?: string 
}) => (
  <section id={id} className={cn("py-24 px-6 md:px-12 lg:px-24", className)}>
    {children}
  </section>
);

const Badge = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-flex items-center rounded-full border border-border bg-muted/50 px-2.5 py-0.5 text-xs font-medium text-muted-foreground uppercase tracking-widest mb-6">
    {children}
  </span>
);

// --- Sections ---

const Navbar = () => (
  <nav className="fixed top-0 w-full z-50 border-b border-border bg-background/80 backdrop-blur-md">
    <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 bg-primary rounded-sm" />
        <span className="font-bold tracking-tight text-lg">LuminaFlow</span>
      </div>
      
      <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
        <Link href="#features" className="hover:text-foreground transition-colors">Features</Link>
        <Link href="#pricing" className="hover:text-foreground transition-colors">Pricing</Link>
        <Link href="#faq" className="hover:text-foreground transition-colors">FAQ</Link>
      </div>

      <div className="flex items-center gap-4">
        <Link href="/login">
          <Button variant="ghost" size="sm">Log in</Button>
        </Link>
        <Link href="/register">
          <Button size="sm">Get Started</Button>
        </Link>
      </div>
    </div>
  </nav>
);

const Hero = () => (
  <Section className="pt-48 pb-32 text-center max-w-5xl mx-auto">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <Badge>Institutional Crypto Infrastructure</Badge>
      <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-tight mb-8">
        Institutional liquidity <br /> meets surgical precision.
      </h1>
      <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
        LuminaFlow provides the high-performance infrastructure required for institutional digital asset management, real-time liquidity analysis, and automated compliance.
      </p>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <Link href="/register">
          <Button size="lg" className="w-full sm:w-auto h-12 px-8">
            Deploy Now <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </Link>
        <Button variant="outline" size="lg" className="w-full sm:w-auto h-12 px-8">
          Request Demo
        </Button>
      </div>
    </motion.div>
  </Section>
);

const SocialProof = () => (
  <div className="border-y border-border bg-muted/30 py-12">
    <div className="max-w-7xl mx-auto px-6">
      <p className="text-center text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground mb-8">
        Trusted by Global Institutions
      </p>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center opacity-50 grayscale">
        {["AETHER", "NEXUS", "ORBIT", "VELOCITY", "PRISM", "QUANTUM"].map((name) => (
          <div key={name} className="flex justify-center font-bold text-xl tracking-tighter">
            {name}
          </div>
        ))}
      </div>
    </div>
  </div>
);

const Features = () => (
  <Section id="features" className="max-w-7xl mx-auto">
    <div className="mb-16">
      <Badge>Features</Badge>
      <h2 className="text-4xl font-bold tracking-tight mb-4">Built for scale. Designed for speed.</h2>
      <p className="text-muted-foreground max-w-2xl">
        Every component of LuminaFlow is engineered to handle millisecond-latency requirements and complex cryptographic workflows.
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {[
        {
          title: "Real-time Liquidity",
          desc: "Aggregated order books from 50+ institutional venues with sub-millisecond updates.",
          icon: Zap,
        },
        {
          title: "Regulatory Engine",
          desc: "Automated KYC/AML and travel rule compliance built directly into the protocol layer.",
          icon: ShieldCheck,
        },
        {
          title: "Advanced Analytics",
          desc: "Proprietary volatility modeling and cross-exchange arbitrage opportunity detection.",
          icon: BarChart3,
        },
        {
          title: "Global Custody",
          desc: "Multi-sig MPC infrastructure with insurance coverage from Tier 1 providers.",
          icon: Globe2,
        },
        {
          title: "Unified API",
          desc: "One GraphQL interface for all digital asset operations across 20+ blockchains.",
          icon: Layers,
        },
        {
          title: "Smart Order Routing",
          desc: "Execute large orders with minimal slippage using our proprietary SOR algorithms.",
          icon: Search,
        },
      ].map((feature, i) => (
        <motion.div
          key={feature.title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1, duration: 0.4 }}
          className="p-8 border border-border rounded-md hover:bg-muted/50 transition-colors group"
        >
          <feature.icon className="w-8 h-8 mb-6 text-primary group-hover:scale-110 transition-transform" />
          <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">{feature.desc}</p>
        </motion.div>
      ))}
    </div>
  </Section>
);

const Stats = () => (
  <Section className="bg-primary text-primary-foreground text-center">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto">
      {[
        { label: "Volume Processed", val: "$4.2T" },
        { label: "Uptime SLA", val: "99.99%" },
        { label: "Institutional Clients", val: "500+" },
      ].map((stat) => (
        <div key={stat.label}>
          <div className="text-5xl font-black tracking-tighter mb-2">{stat.val}</div>
          <div className="text-xs uppercase tracking-[0.2em] font-medium opacity-70">{stat.label}</div>
        </div>
      ))}
    </div>
  </Section>
);

const Pricing = () => (
  <Section id="pricing" className="max-w-7xl mx-auto">
    <div className="text-center mb-16">
      <Badge>Pricing</Badge>
      <h2 className="text-4xl font-bold tracking-tight mb-4">Straightforward institutional plans.</h2>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {[
        {
          name: "Standard",
          price: "$2,500",
          desc: "For growing fintech startups.",
          features: ["5 User Accounts", "Basic API Access", "Standard Support", "Up to $10M Monthly Vol"],
          cta: "Start Free Trial",
          popular: false,
        },
        {
          name: "Enterprise",
          price: "$10,000",
          desc: "For institutional asset managers.",
          features: ["Unlimited Users", "Priority WebSocket API", "Dedicated Manager", "Up to $1B Monthly Vol"],
          cta: "Contact Sales",
          popular: true,
        },
        {
          name: "Custom",
          price: "Quote",
          desc: "For global banking infrastructure.",
          features: ["Full White-label", "On-prem Deployment", "SLA Guarantees", "Unlimited Volume"],
          cta: "Talk to Experts",
          popular: false,
        },
      ].map((plan) => (
        <div 
          key={plan.name}
          className={cn(
            "p-8 border rounded-md flex flex-col",
            plan.popular ? "border-primary ring-1 ring-primary" : "border-border"
          )}
        >
          <div className="mb-8">
            <h3 className="text-lg font-bold mb-2">{plan.name}</h3>
            <div className="text-3xl font-bold tracking-tight mb-2">
              {plan.price}<span className="text-sm font-normal text-muted-foreground">/mo</span>
            </div>
            <p className="text-sm text-muted-foreground">{plan.desc}</p>
          </div>
          <div className="space-y-4 mb-8 flex-1">
            {plan.features.map((f) => (
              <div key={f} className="flex items-center gap-3 text-sm">
                <Check className="w-4 h-4 text-primary" />
                {f}
              </div>
            ))}
          </div>
          <Button variant={plan.popular ? "primary" : "outline"} className="w-full">
            {plan.cta}
          </Button>
        </div>
      ))}
    </div>
  </Section>
);

const FAQ = () => (
  <Section id="faq" className="max-w-3xl mx-auto border-t border-border">
    <div className="text-center mb-16">
      <Badge>FAQ</Badge>
      <h2 className="text-4xl font-bold tracking-tight mb-4">Frequently asked questions.</h2>
    </div>
    <div className="space-y-6">
      {[
        { q: "How does LuminaFlow handle custody?", a: "We utilize multi-party computation (MPC) combined with hardware security modules (HSM) to ensure assets never reside in a single point of failure." },
        { q: "Can we integrate with existing KYC providers?", a: "Yes, our API allows you to plug in your preferred KYC/AML vendor or use our integrated high-fidelity verification system." },
        { q: "What blockchains are supported?", a: "We currently support 20+ Layer 1 and Layer 2 networks, including Ethereum, Solana, Bitcoin, and Polygon." },
        { q: "Is there a sandbox environment for testing?", a: "Absolutely. All plans include access to a fully functional staging environment with testnet liquidity." },
      ].map((item) => (
        <div key={item.q} className="p-6 border border-border rounded-md group cursor-pointer hover:bg-muted/50 transition-colors">
          <div className="flex items-center justify-between gap-4">
            <h4 className="font-bold">{item.q}</h4>
            <ChevronDown className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
          </div>
          <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
            {item.a}
          </p>
        </div>
      ))}
    </div>
  </Section>
);

const Footer = () => (
  <footer className="border-t border-border bg-muted/30 py-24 px-6 md:px-12 lg:px-24">
    <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-12">
      <div className="col-span-2">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-6 h-6 bg-primary rounded-sm" />
          <span className="font-bold tracking-tight text-lg">LuminaFlow</span>
        </div>
        <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
          The institutional foundation for digital asset flows. Scalable, secure, and regulated.
        </p>
      </div>
      <div>
        <h5 className="text-xs font-bold uppercase tracking-widest mb-6">Product</h5>
        <ul className="space-y-4 text-sm text-muted-foreground">
          <li><Link href="#" className="hover:text-foreground">Liquidity</Link></li>
          <li><Link href="#" className="hover:text-foreground">Custody</Link></li>
          <li><Link href="#" className="hover:text-foreground">Compliance</Link></li>
          <li><Link href="#" className="hover:text-foreground">Analytics</Link></li>
        </ul>
      </div>
      <div>
        <h5 className="text-xs font-bold uppercase tracking-widest mb-6">Resources</h5>
        <ul className="space-y-4 text-sm text-muted-foreground">
          <li><Link href="#" className="hover:text-foreground">Documentation</Link></li>
          <li><Link href="#" className="hover:text-foreground">API Reference</Link></li>
          <li><Link href="#" className="hover:text-foreground">Security</Link></li>
          <li><Link href="#" className="hover:text-foreground">Status</Link></li>
        </ul>
      </div>
      <div>
        <h5 className="text-xs font-bold uppercase tracking-widest mb-6">Company</h5>
        <ul className="space-y-4 text-sm text-muted-foreground">
          <li><Link href="#" className="hover:text-foreground">About</Link></li>
          <li><Link href="#" className="hover:text-foreground">Careers</Link></li>
          <li><Link href="#" className="hover:text-foreground">Press</Link></li>
          <li><Link href="#" className="hover:text-foreground">Contact</Link></li>
        </ul>
      </div>
      <div>
        <h5 className="text-xs font-bold uppercase tracking-widest mb-6">Legal</h5>
        <ul className="space-y-4 text-sm text-muted-foreground">
          <li><Link href="#" className="hover:text-foreground">Privacy</Link></li>
          <li><Link href="#" className="hover:text-foreground">Terms</Link></li>
          <li><Link href="#" className="hover:text-foreground">Cookie Policy</Link></li>
        </ul>
      </div>
    </div>
    <div className="max-w-7xl mx-auto mt-24 pt-8 border-t border-border flex flex-col md:row items-center justify-between gap-6 text-xs text-muted-foreground">
      <p>© 2026 LuminaFlow Infrastructure. All rights reserved.</p>
      <div className="flex items-center gap-6">
        <Link href="#" className="hover:text-foreground flex items-center gap-1">
          Twitter <ArrowUpRight className="w-3 h-3" />
        </Link>
        <Link href="#" className="hover:text-foreground flex items-center gap-1">
          LinkedIn <ArrowUpRight className="w-3 h-3" />
        </Link>
        <Link href="#" className="hover:text-foreground flex items-center gap-1">
          GitHub <ArrowUpRight className="w-3 h-3" />
        </Link>
      </div>
    </div>
  </footer>
);

export default function LandingPage() {
  return (
    <div className="relative">
      <Navbar />
      <Hero />
      <SocialProof />
      <Features />
      <Stats />
      <Pricing />
      <FAQ />
      <Section className="text-center py-32 border-t border-border">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-8 leading-tight">
          Ready to institutionalize <br /> your digital asset operations?
        </h2>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/register">
            <Button size="lg" className="h-12 px-8">Get Started Now</Button>
          </Link>
          <Button variant="outline" size="lg" className="h-12 px-8">Contact Sales</Button>
        </div>
      </Section>
      <Footer />
    </div>
  );
}
