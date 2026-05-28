"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  ArrowRight, 
  CheckCircle2, 
  Users, 
  Zap, 
  BarChart3, 
  ShieldCheck, 
  Globe, 
  ChevronDown,
  LayoutDashboard,
  Search,
  Calendar,
  Layers
} from "lucide-react";
import { cn } from "@/lib/utils";

// --- Components ---

const Button = ({ 
  children, 
  variant = "primary", 
  className, 
  ...props 
}: any) => {
  const variants = {
    primary: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_0_20px_rgba(79,70,229,0.3)]",
    secondary: "bg-white/5 backdrop-blur-md border border-white/10 text-white hover:bg-white/10",
    ghost: "text-muted-foreground hover:text-white transition-colors",
  };

  return (
    <button 
      className={cn(
        "inline-flex items-center justify-center rounded-xl text-sm font-medium transition-all focus:outline-none disabled:opacity-50 h-11 px-6 py-2.5",
        variants[variant as keyof typeof variants],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

const Card = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <motion.div 
    whileHover={{ scale: 1.02 }}
    transition={{ type: "spring", stiffness: 400, damping: 30 }}
    className={cn("rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md shadow-xl p-6 overflow-hidden relative", className)}
  >
    {children}
  </motion.div>
);

const Glow = ({ className }: { className?: string }) => (
  <div className={cn("absolute -z-10 bg-primary/20 blur-[100px] rounded-full", className)} />
);

// --- Sections ---

const Navbar = () => (
  <nav className="fixed top-0 w-full z-50 border-b border-white/10 bg-background/50 backdrop-blur-md">
    <div className="container mx-auto px-6 h-16 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
          <Zap className="w-5 h-5 text-white" />
        </div>
        <span className="text-xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
          TalentPulse
        </span>
      </div>
      <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
        <Link href="#features" className="hover:text-white transition-colors">Features</Link>
        <Link href="#pricing" className="hover:text-white transition-colors">Pricing</Link>
        <Link href="#faq" className="hover:text-white transition-colors">FAQ</Link>
      </div>
      <div className="flex items-center gap-4">
        <Link href="/login">
          <Button variant="ghost">Login</Button>
        </Link>
        <Link href="/register">
          <Button>Get Started</Button>
        </Link>
      </div>
    </div>
  </nav>
);

const Hero = () => (
  <section className="relative pt-32 pb-20 overflow-hidden">
    <Glow className="w-[500px] h-[500px] -top-40 -right-20" />
    <Glow className="w-[300px] h-[300px] bottom-0 -left-20 bg-blue-500/10" />
    
    <div className="container mx-auto px-6 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-primary mb-6">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
          </span>
          Next-Gen HR Intelligence
        </span>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter leading-tight mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/40">
          Hire Smarter. <br />
          Scale Faster.
        </h1>
        <p className="max-w-2xl mx-auto text-lg text-muted-foreground mb-10">
          The all-in-one talent acquisition platform designed for high-growth enterprises. 
          Automate sourcing, streamline interviews, and build world-class teams.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/register">
            <Button className="w-full sm:w-auto h-12 text-base px-8">
              Start Free Trial <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
          <Button variant="secondary" className="w-full sm:w-auto h-12 text-base px-8">
            View Demo
          </Button>
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="mt-20 relative max-w-5xl mx-auto rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-4 shadow-2xl"
      >
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10" />
        <div className="aspect-video bg-zinc-900 rounded-lg overflow-hidden border border-white/5 flex items-center justify-center">
           <LayoutDashboard className="w-20 h-20 text-white/10" />
           <span className="absolute text-white/20 font-mono text-sm">PREMIUM DASHBOARD PREVIEW</span>
        </div>
      </motion.div>
    </div>
  </section>
);

const SocialProof = () => (
  <section className="py-20 border-y border-white/5 bg-white/[0.02]">
    <div className="container mx-auto px-6">
      <p className="text-center text-sm font-medium text-muted-foreground mb-10 uppercase tracking-widest">
        Trusted by industry leaders
      </p>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 opacity-40 grayscale contrast-125">
        {['Acme Corp', 'GlobalTech', 'Nexus', 'Vertex', 'Nova', 'Echo'].map((name) => (
          <div key={name} className="flex items-center justify-center font-bold text-xl italic">
            {name}
          </div>
        ))}
      </div>
    </div>
  </section>
);

const BentoFeatures = () => (
  <section id="features" className="py-32">
    <div className="container mx-auto px-6">
      <div className="text-center mb-20">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-4">Enterprise-Grade Sourcing</h2>
        <p className="text-muted-foreground">Everything you need to find and hire the best talent globally.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2 h-[400px]">
          <div className="h-full flex flex-col">
            <div className="p-2 w-10 h-10 bg-primary/10 rounded-lg mb-4 flex items-center justify-center">
              <Search className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-2xl font-bold mb-2">AI-Powered Talent Matching</h3>
            <p className="text-muted-foreground mb-8 max-w-md">
              Our neural engine analyzes millions of profiles to find candidates that perfectly match your job requirements and company culture.
            </p>
            <div className="mt-auto bg-zinc-900/50 rounded-xl border border-white/5 p-4 font-mono text-xs">
              <div className="flex justify-between mb-2">
                <span>Matching Engine v4.2</span>
                <span className="text-green-500">Active</span>
              </div>
              <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                <div className="bg-primary w-[85%] h-full" />
              </div>
            </div>
          </div>
        </Card>

        <Card className="h-[400px]">
          <div className="p-2 w-10 h-10 bg-primary/10 rounded-lg mb-4 flex items-center justify-center">
            <Globe className="w-6 h-6 text-primary" />
          </div>
          <h3 className="text-2xl font-bold mb-2">Global Reach</h3>
          <p className="text-muted-foreground">
            Sourcing across 50+ countries with automated compliance and localized contract management.
          </p>
          <div className="mt-8 flex flex-wrap gap-2">
             {['US', 'UK', 'DE', 'JP', 'BR'].map(c => (
               <span key={c} className="px-2 py-1 rounded bg-white/5 border border-white/10 text-[10px]">{c}</span>
             ))}
          </div>
        </Card>

        <Card className="h-[400px]">
          <div className="p-2 w-10 h-10 bg-primary/10 rounded-lg mb-4 flex items-center justify-center">
            <Calendar className="w-6 h-6 text-primary" />
          </div>
          <h3 className="text-2xl font-bold mb-2">Smart Scheduling</h3>
          <p className="text-muted-foreground">
            Coordination made easy. Synchronize calendars and automate interview loops in seconds.
          </p>
        </Card>

        <Card className="md:col-span-2 h-[400px]">
          <div className="h-full flex flex-col md:flex-row gap-8">
            <div className="flex-1">
              <div className="p-2 w-10 h-10 bg-primary/10 rounded-lg mb-4 flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Advanced Analytics</h3>
              <p className="text-muted-foreground">
                Deep insights into your hiring funnel. track time-to-hire, offer acceptance rates, and diversity metrics.
              </p>
            </div>
            <div className="flex-1 bg-white/5 rounded-xl border border-white/5 p-4 flex items-center justify-center">
               <Layers className="w-12 h-12 text-white/20" />
            </div>
          </div>
        </Card>
      </div>
    </div>
  </section>
);

const Pricing = () => (
  <section id="pricing" className="py-32 bg-white/[0.02]">
    <div className="container mx-auto px-6">
      <div className="text-center mb-20">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-4">Simple, Transparent Pricing</h2>
        <p className="text-muted-foreground">Choose the plan that fits your growth stage.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {[
          { name: "Starter", price: "$499", features: ["Up to 5 active jobs", "AI Sourcing Lite", "Standard Analytics", "Email Support"] },
          { name: "Pro", price: "$1,299", popular: true, features: ["Unlimited active jobs", "Full AI Suite", "Custom Dashboards", "Priority Support", "ATS Integration"] },
          { name: "Enterprise", price: "Custom", features: ["Multi-org support", "Dedicated Account Manager", "White-labeling", "Custom API Limits", "SLA Guarantee"] }
        ].map((plan, i) => (
          <Card key={i} className={cn("flex flex-col", plan.popular && "border-primary/50 ring-1 ring-primary/20")}>
            {plan.popular && <span className="absolute top-4 right-4 bg-primary text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">Most Popular</span>}
            <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
            <div className="mb-6">
              <span className="text-4xl font-bold">{plan.price}</span>
              {plan.price !== "Custom" && <span className="text-muted-foreground ml-1">/mo</span>}
            </div>
            <ul className="space-y-4 mb-8 flex-1">
              {plan.features.map((f, j) => (
                <li key={j} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="w-4 h-4 text-primary" /> {f}
                </li>
              ))}
            </ul>
            <Link href="/register">
              <Button variant={plan.popular ? "primary" : "secondary"} className="w-full">
                Get Started
              </Button>
            </Link>
          </Card>
        ))}
      </div>
    </div>
  </section>
);

const FAQ = () => (
  <section id="faq" className="py-32">
    <div className="container mx-auto px-6 max-w-3xl">
      <h2 className="text-3xl font-bold tracking-tighter mb-12 text-center">Frequently Asked Questions</h2>
      <div className="space-y-4">
        {[
          { q: "How does the AI sourcing work?", a: "Our AI analyzes job descriptions and cross-references them with millions of data points from professional networks, GitHub, and other platforms to identify top matches." },
          { q: "Can I integrate with my existing ATS?", a: "Yes, TalentPulse offers native integrations with Greenhouse, Lever, Workday, and more." },
          { q: "Do you offer a free trial?", a: "Absolutely. You can try our Pro plan for 14 days with no credit card required." }
        ].map((item, i) => (
          <div key={i} className="rounded-xl border border-white/10 bg-white/5 p-6">
            <div className="flex items-center justify-between cursor-pointer group">
              <h4 className="font-medium group-hover:text-primary transition-colors">{item.q}</h4>
              <ChevronDown className="w-4 h-4 text-muted-foreground" />
            </div>
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
              {item.a}
            </p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="py-20 border-t border-white/5">
    <div className="container mx-auto px-6">
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-16">
        <div className="col-span-2">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tighter">TalentPulse</span>
          </div>
          <p className="text-sm text-muted-foreground max-w-xs mb-6">
            Empowering the next generation of builders with AI-driven talent intelligence.
          </p>
          <div className="flex items-center gap-4 grayscale opacity-50">
             <div className="w-8 h-8 bg-white/10 rounded-full" />
             <div className="w-8 h-8 bg-white/10 rounded-full" />
             <div className="w-8 h-8 bg-white/10 rounded-full" />
          </div>
        </div>
        <div>
          <h4 className="font-bold mb-6">Product</h4>
          <ul className="space-y-4 text-sm text-muted-foreground">
            <li><Link href="#">Features</Link></li>
            <li><Link href="#">Integrations</Link></li>
            <li><Link href="#">Pricing</Link></li>
            <li><Link href="#">Changelog</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-6">Company</h4>
          <ul className="space-y-4 text-sm text-muted-foreground">
            <li><Link href="#">About</Link></li>
            <li><Link href="#">Careers</Link></li>
            <li><Link href="#">Contact</Link></li>
            <li><Link href="#">Privacy</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-6">Resources</h4>
          <ul className="space-y-4 text-sm text-muted-foreground">
            <li><Link href="#">Documentation</Link></li>
            <li><Link href="#">Help Center</Link></li>
            <li><Link href="#">API Reference</Link></li>
            <li><Link href="#">Community</Link></li>
          </ul>
        </div>
      </div>
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-8 border-t border-white/5 text-xs text-muted-foreground font-mono">
        <p>© 2026 TalentPulse Inc. All rights reserved.</p>
        <div className="flex items-center gap-8">
           <Link href="#">Terms of Service</Link>
           <Link href="#">Privacy Policy</Link>
           <Link href="#">Cookies</Link>
        </div>
      </div>
    </div>
  </footer>
);

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30">
      <Navbar />
      <main>
        <Hero />
        <SocialProof />
        <BentoFeatures />
        <Pricing />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}
