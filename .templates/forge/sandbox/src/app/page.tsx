"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  ArrowRight, 
  CheckCircle2, 
  BarChart3, 
  Users, 
  Zap, 
  Globe, 
  ShieldCheck, 
  MessageSquare,
  ChevronDown,
  Menu,
  X
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

// --- Components ---

const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-black/5 bg-white/50 backdrop-blur-xl dark:border-white/5 dark:bg-black/50">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary shadow-lg shadow-primary/20">
            <Zap className="h-6 w-6 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tighter">OmniNexus</span>
        </div>
        
        <div className="hidden md:flex md:items-center md:gap-8">
          {["Features", "Solutions", "Pricing", "About"].map((item) => (
            <Link 
              key={item} 
              href={`#${item.toLowerCase()}`} 
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {item}
            </Link>
          ))}
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-sm font-medium hover:text-primary transition-colors">Log in</Link>
            <Button size="sm" className="rounded-full">Get Started</Button>
          </div>
        </div>

        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="border-b border-black/5 bg-white p-4 dark:border-white/5 dark:bg-black md:hidden"
        >
          <div className="flex flex-col gap-4">
            {["Features", "Solutions", "Pricing", "About"].map((item) => (
              <Link key={item} href={`#${item.toLowerCase()}`} className="text-lg font-medium">{item}</Link>
            ))}
            <hr className="border-black/5 dark:border-white/5" />
            <Link href="/login" className="text-lg font-medium">Log in</Link>
            <Button className="w-full">Get Started</Button>
          </div>
        </motion.div>
      )}
    </nav>
  );
};

const SectionHeader = ({ title, subtitle, label }: { title: string; subtitle?: string; label?: string }) => (
  <div className="mb-16 flex flex-col items-center text-center">
    {label && (
      <span className="mb-4 inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-primary">
        {label}
      </span>
    )}
    <h2 className="max-w-3xl text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
      <span className="bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text text-transparent">{title}</span>
    </h2>
    {subtitle && <p className="mt-6 max-w-2xl text-lg text-muted-foreground">{subtitle}</p>}
  </div>
);

// --- Sections ---

const Hero = () => (
  <section className="relative overflow-hidden pt-32 pb-20 lg:pt-48 lg:pb-32">
    {/* Ambient Glows */}
    <div className="absolute top-1/4 -left-20 h-96 w-96 rounded-full bg-primary/10 blur-[120px]" />
    <div className="absolute bottom-1/4 -right-20 h-96 w-96 rounded-full bg-primary/10 blur-[120px]" />

    <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary mb-8">
            <Zap className="h-4 w-4" />
            <span>OmniNexus v2.0 is now live</span>
          </span>
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-7xl md:text-8xl">
            Unified Revenue <br />
            <span className="bg-gradient-to-r from-primary to-indigo-600 bg-clip-text text-transparent">Orchestration.</span>
          </h1>
          <p className="mx-auto mt-8 max-w-2xl text-lg text-muted-foreground md:text-xl">
            Scale your high-ticket marketing and CRM efforts with an enterprise-grade engine built for precision, performance, and unyielding growth.
          </p>
          <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="lg" className="h-14 px-8 text-lg shadow-xl shadow-primary/25">
              Start Free Trial
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button variant="outline" size="lg" className="h-14 px-8 text-lg">
              Book a Demo
            </Button>
          </div>
        </motion.div>

        {/* Hero Visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="relative mt-20"
        >
          <div className="relative rounded-3xl border border-black/5 bg-white/50 p-2 shadow-2xl backdrop-blur-xl dark:border-white/5 dark:bg-white/5">
            <div className="overflow-hidden rounded-2xl bg-muted aspect-video flex items-center justify-center relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5" />
              <div className="grid grid-cols-3 gap-8 p-12 w-full">
                 {[1, 2, 3].map(i => (
                   <div key={i} className="h-32 rounded-xl bg-background/50 border border-black/5 animate-pulse" />
                 ))}
                 <div className="col-span-2 h-48 rounded-xl bg-background/50 border border-black/5 animate-pulse" />
                 <div className="h-48 rounded-xl bg-background/50 border border-black/5 animate-pulse" />
              </div>
              <span className="relative z-10 text-muted-foreground font-mono text-xs uppercase tracking-widest">Enterprise Dashboard Preview</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

const SocialProof = () => (
  <section className="py-20 border-y border-black/5 dark:border-white/5 bg-muted/30">
    <div className="mx-auto max-w-7xl px-4 text-center">
      <p className="text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-10">Trusted by world-class enterprise teams</p>
      <div className="flex flex-wrap justify-center gap-12 grayscale opacity-50">
        {["Lumina", "Aether", "Vortex", "Nexus", "Prism"].map(logo => (
          <span key={logo} className="text-2xl font-bold tracking-tighter">{logo}</span>
        ))}
      </div>
    </div>
  </section>
);

const BentoFeatures = () => (
  <section id="features" className="py-24">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <SectionHeader 
        label="Powerful Capabilities"
        title="Engineered for Performance"
        subtitle="Everything you need to orchestrate marketing, sales, and customer relations in a single, high-octane workspace."
      />
      
      <div className="grid grid-cols-1 gap-6 md:grid-cols-12 md:grid-rows-2">
        <Card className="md:col-span-8 md:row-span-1" glow>
          <div className="flex h-full flex-col justify-between">
            <div>
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                <BarChart3 className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-2xl font-bold">Predictive Analytics</h3>
              <p className="mt-2 text-muted-foreground">Anticipate market shifts and customer behavior with our proprietary AI-driven forecasting engine.</p>
            </div>
            <div className="mt-8 flex gap-2">
              {[40, 70, 45, 90, 65].map((h, i) => (
                <div key={i} className="w-full bg-primary/20 rounded-t-md relative overflow-hidden" style={{ height: `${h}px` }}>
                   <div className="absolute inset-0 bg-primary opacity-50 animate-pulse" />
                </div>
              ))}
            </div>
          </div>
        </Card>

        <Card className="md:col-span-4 md:row-span-1">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 text-blue-500">
            <Users className="h-6 w-6" />
          </div>
          <h3 className="text-2xl font-bold">Omni-Channel CRM</h3>
          <p className="mt-2 text-muted-foreground">Unified customer view across every touchpoint.</p>
        </Card>

        <Card className="md:col-span-4 md:row-span-1">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-orange-500/10 text-orange-500">
            <Zap className="h-6 w-6" />
          </div>
          <h3 className="text-2xl font-bold">Smart Workflows</h3>
          <p className="mt-2 text-muted-foreground">Automate complex sales sequences with ease.</p>
        </Card>

        <Card className="md:col-span-8 md:row-span-1" glow>
           <div className="flex flex-col md:flex-row gap-8 items-center h-full">
              <div className="flex-1">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-500">
                  <Globe className="h-6 w-6" />
                </div>
                <h3 className="text-2xl font-bold">Global Scale</h3>
                <p className="mt-2 text-muted-foreground">Deploy campaigns across 120+ regions with localized intelligence and compliance built-in.</p>
              </div>
              <div className="flex-1 w-full p-4 bg-black/5 dark:bg-white/5 rounded-xl border border-black/5 dark:border-white/5 font-mono text-[10px] text-muted-foreground">
                 <div>{`> INITIALIZING_NEXUS_SYNC...`}</div>
                 <div className="text-emerald-500">{`[OK] LOCALIZATION_READY`}</div>
                 <div className="text-primary">{`[OK] COMPLIANCE_CHECK_PASSED`}</div>
                 <div>{`> DEPLOYING_GLOBAL_CLUSTER_01...`}</div>
              </div>
           </div>
        </Card>
      </div>
    </div>
  </section>
);

const Pricing = () => (
  <section id="pricing" className="py-24 bg-muted/30">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <SectionHeader 
        label="Pricing Plans"
        title="Scale Without Friction"
        subtitle="Transparent pricing designed for growing teams and global enterprises alike."
      />

      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {[
          { name: "Starter", price: "$49", features: ["Up to 5 users", "10,000 Contacts", "Basic Analytics", "Email Support"] },
          { name: "Professional", price: "$149", features: ["Up to 20 users", "50,000 Contacts", "Advanced AI", "Priority Support"], popular: true },
          { name: "Enterprise", price: "Custom", features: ["Unlimited users", "Unlimited Contacts", "Custom Integration", "Dedicated Account Manager"] },
        ].map((plan) => (
          <Card key={plan.name} className={cn(
            "relative flex flex-col p-8",
            plan.popular && "border-primary ring-1 ring-primary"
          )} glow={plan.popular}>
            {plan.popular && (
              <span className="absolute top-0 right-8 -translate-y-1/2 rounded-full bg-primary px-3 py-1 text-xs font-bold text-white uppercase">Most Popular</span>
            )}
            <div className="mb-8">
              <h3 className="text-xl font-bold">{plan.name}</h3>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-4xl font-extrabold tracking-tight">{plan.price}</span>
                {plan.price !== "Custom" && <span className="text-muted-foreground">/mo</span>}
              </div>
            </div>
            <ul className="mb-8 flex-1 space-y-4">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-center gap-3 text-sm text-muted-foreground">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  {feature}
                </li>
              ))}
            </ul>
            <Button variant={plan.popular ? "primary" : "outline"} className="w-full">
              Get Started
            </Button>
          </Card>
        ))}
      </div>
    </div>
  </section>
);

const FAQ = () => (
  <section className="py-24">
    <div className="mx-auto max-w-4xl px-4">
      <SectionHeader title="Frequently Asked Questions" />
      <div className="space-y-4">
        {[
          { q: "How easy is it to migrate from our current CRM?", a: "OmniNexus offers seamless data import tools for all major CRMs. Our white-glove migration service is included in Professional and Enterprise plans." },
          { q: "Can we integrate with our existing toolstack?", a: "Yes, our native API and 2,000+ Zapier integrations ensure OmniNexus fits perfectly into your current workflow." },
          { q: "Is our data secure and compliant?", a: "OmniNexus is SOC2 Type II, GDPR, and HIPAA compliant. We use enterprise-grade encryption for all data at rest and in transit." }
        ].map((item, i) => (
          <Card key={i} className="p-0">
             <div className="p-6 cursor-pointer flex items-center justify-between">
                <h4 className="font-bold">{item.q}</h4>
                <ChevronDown className="h-5 w-5 text-muted-foreground" />
             </div>
             <div className="px-6 pb-6 text-muted-foreground">
               {item.a}
             </div>
          </Card>
        ))}
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="border-t border-black/5 py-12 dark:border-white/5">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-2 gap-12 md:grid-cols-4 lg:grid-cols-5">
        <div className="col-span-2 lg:col-span-2">
          <div className="flex items-center gap-2 mb-6">
            <Zap className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold tracking-tighter">OmniNexus</span>
          </div>
          <p className="max-w-xs text-sm text-muted-foreground leading-relaxed">
            The unified engine for enterprise-level marketing orchestration and high-ticket CRM management.
          </p>
        </div>
        <div>
          <h4 className="mb-6 text-sm font-bold uppercase tracking-widest text-foreground">Platform</h4>
          <ul className="space-y-4 text-sm text-muted-foreground">
            <li><Link href="#">Analytics</Link></li>
            <li><Link href="#">Automation</Link></li>
            <li><Link href="#">CRM</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-6 text-sm font-bold uppercase tracking-widest text-foreground">Resources</h4>
          <ul className="space-y-4 text-sm text-muted-foreground">
            <li><Link href="#">Documentation</Link></li>
            <li><Link href="#">Help Center</Link></li>
            <li><Link href="#">Community</Link></li>
          </ul>
        </div>
      </div>
      <div className="mt-12 border-t border-black/5 pt-8 dark:border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-xs text-muted-foreground">&copy; 2026 OmniNexus. All rights reserved.</p>
        <div className="flex gap-6">
           {/* Mock Social Links */}
           <div className="h-5 w-5 bg-muted rounded" />
           <div className="h-5 w-5 bg-muted rounded" />
           <div className="h-5 w-5 bg-muted rounded" />
        </div>
      </div>
    </div>
  </footer>
);

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      <Hero />
      <SocialProof />
      <BentoFeatures />
      <Pricing />
      <FAQ />
      <Footer />
    </main>
  );
}
