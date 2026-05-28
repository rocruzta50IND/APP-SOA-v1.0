"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  Users, 
  Zap, 
  Shield, 
  BarChart3, 
  CheckCircle2, 
  ChevronRight, 
  ArrowRight,
  Star,
  Globe,
  Lock,
  MessageSquare,
  Sparkles
} from "lucide-react";
import { cn } from "@/lib/utils";

const springTransition = { type: "spring", stiffness: 400, damping: 30 } as const;

const Nav = () => (
  <nav className="fixed top-0 w-full z-50 border-b border-white/10 bg-background/80 backdrop-blur-md">
    <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
          <Sparkles className="w-5 h-5 text-white" />
        </div>
        <span className="text-xl font-bold tracking-tighter">TalentAura</span>
      </div>
      <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
        <Link href="#features" className="hover:text-foreground transition-colors">Features</Link>
        <Link href="#solutions" className="hover:text-foreground transition-colors">Solutions</Link>
        <Link href="#pricing" className="hover:text-foreground transition-colors">Pricing</Link>
        <Link href="#faq" className="hover:text-foreground transition-colors">Resources</Link>
      </div>
      <div className="flex items-center gap-4">
        <Link href="/login" className="text-sm font-medium hover:text-primary transition-colors">Login</Link>
        <Link href="/register" className="bg-primary text-white hover:bg-primary/90 px-5 py-2.5 rounded-xl font-medium transition-all shadow-[0_0_20px_rgba(79,70,229,0.3)]">
          Get Started
        </Link>
      </div>
    </div>
  </nav>
);

const Hero = () => (
  <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
    {/* Ambient Glows */}
    <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/20 blur-[120px] rounded-full -z-10" />
    <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-blue-500/10 blur-[100px] rounded-full -z-10" />
    
    <div className="max-w-7xl mx-auto px-6 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={springTransition}
      >
        <span className="inline-block px-4 py-1.5 mb-6 text-sm font-medium bg-white/5 border border-white/10 rounded-full backdrop-blur-md">
          ✨ Reimagining the future of HR
        </span>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-8 leading-tight">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
            Automate Talent. <br /> Empower People.
          </span>
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
          The enterprise-grade HR platform that combines AI-driven recruitment, 
          seamless payroll, and advanced analytics in one beautiful interface.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/register" className="w-full sm:w-auto bg-primary text-white hover:bg-primary/90 px-8 py-4 rounded-xl font-semibold text-lg transition-all shadow-[0_0_25px_rgba(79,70,229,0.4)] flex items-center justify-center gap-2">
            Start Free Trial <ChevronRight className="w-5 h-5" />
          </Link>
          <Link href="#features" className="w-full sm:w-auto bg-white/5 border border-white/10 hover:bg-white/10 px-8 py-4 rounded-xl font-semibold text-lg transition-all backdrop-blur-md flex items-center justify-center gap-2">
            View Features
          </Link>
        </div>
      </motion.div>
      
      {/* Hero Image/Mockup */}
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...springTransition, delay: 0.2 }}
        className="mt-20 relative"
      >
        <div className="relative mx-auto max-w-5xl aspect-[16/9] bg-white/5 border border-white/10 rounded-3xl overflow-hidden backdrop-blur-sm shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-transparent to-transparent opacity-50" />
          <div className="p-8 h-full flex flex-col gap-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/50" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                <div className="w-3 h-3 rounded-full bg-green-500/50" />
              </div>
              <div className="h-4 w-48 bg-white/5 rounded-full" />
            </div>
            <div className="grid grid-cols-12 gap-6 h-full">
              <div className="col-span-3 space-y-4">
                <div className="h-20 w-full bg-white/5 rounded-2xl" />
                <div className="h-40 w-full bg-white/5 rounded-2xl" />
              </div>
              <div className="col-span-9 grid grid-cols-2 gap-6">
                <div className="h-full bg-primary/5 border border-primary/20 rounded-2xl p-6 relative overflow-hidden">
                   <div className="absolute top-0 right-0 p-4 opacity-20"><Zap className="w-20 h-20 text-primary" /></div>
                   <div className="h-4 w-24 bg-primary/20 rounded-full mb-4" />
                   <div className="h-8 w-40 bg-white/10 rounded-full" />
                </div>
                <div className="h-full bg-white/5 border border-white/10 rounded-2xl" />
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);

const SocialProof = () => (
  <section className="py-20 border-y border-white/5">
    <div className="max-w-7xl mx-auto px-6">
      <p className="text-center text-sm font-medium text-muted-foreground uppercase tracking-widest mb-12">
        Trusted by industry leaders
      </p>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center opacity-50 grayscale hover:grayscale-0 transition-all">
        {["Acme Corp", "GlobalFlow", "Nexus", "Vertex", "Aura", "Sync"].map((name) => (
          <div key={name} className="flex justify-center text-2xl font-bold tracking-tighter">
            {name}
          </div>
        ))}
      </div>
    </div>
  </section>
);

const BentoFeatures = () => (
  <section id="features" className="py-24 relative overflow-hidden">
    <div className="max-w-7xl mx-auto px-6">
      <div className="text-center mb-20">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-4">Powerful Features for Human Teams</h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Everything you need to manage your global workforce in one unified ecosystem.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        {/* Large Feature */}
        <div className="md:col-span-8 bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 hover:border-white/20 transition-all group overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[80px] rounded-full -z-10 group-hover:bg-primary/20 transition-all" />
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="flex-1">
              <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center mb-6">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Advanced Talent Acquisition</h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Source, track, and hire top talent with our AI-powered ATS. Reduce time-to-hire by 40% with automated screening and scheduling.
              </p>
              <ul className="space-y-3">
                {["AI Resume Screening", "Automated Interview Loops", "Collaborative Hiring"].map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-primary" /> {f}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex-1 w-full bg-white/5 rounded-2xl border border-white/10 p-4 aspect-square md:aspect-auto h-64 relative">
               <div className="absolute inset-4 space-y-4">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/5">
                      <div className="w-8 h-8 rounded-full bg-white/10" />
                      <div className="flex-1 space-y-2">
                        <div className="h-2 w-24 bg-white/10 rounded-full" />
                        <div className="h-1.5 w-16 bg-white/5 rounded-full" />
                      </div>
                      <div className="px-2 py-1 rounded-md bg-green-500/10 text-[10px] text-green-500 border border-green-500/20">Hired</div>
                    </div>
                  ))}
               </div>
            </div>
          </div>
        </div>
        
        {/* Small Feature */}
        <div className="md:col-span-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 hover:border-white/20 transition-all">
          <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mb-6">
            <BarChart3 className="w-6 h-6 text-blue-500" />
          </div>
          <h3 className="text-xl font-bold mb-4">Deep Analytics</h3>
          <p className="text-muted-foreground text-sm leading-relaxed mb-6">
            Visualize turnover rates, employee satisfaction, and performance metrics in real-time.
          </p>
          <div className="mt-auto h-32 w-full bg-white/5 rounded-xl border border-white/5 flex items-end p-4 gap-2">
            {[40, 70, 45, 90, 65, 80].map((h, i) => (
              <div key={i} className="flex-1 bg-blue-500/30 rounded-t-sm" style={{ height: `${h}%` }} />
            ))}
          </div>
        </div>

        {/* Small Feature */}
        <div className="md:col-span-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 hover:border-white/20 transition-all">
          <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center mb-6">
            <Shield className="w-6 h-6 text-green-500" />
          </div>
          <h3 className="text-xl font-bold mb-4">Enterprise Security</h3>
          <p className="text-muted-foreground text-sm leading-relaxed">
            SOC2 Type II compliant with end-to-end encryption for all sensitive HR data.
          </p>
        </div>

        {/* Medium Feature */}
        <div className="md:col-span-8 bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 hover:border-white/20 transition-all overflow-hidden relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="flex flex-col md:flex-row gap-8 items-center">
             <div className="flex-1">
                <h3 className="text-2xl font-bold mb-4">Global Payroll & Compliance</h3>
                <p className="text-muted-foreground mb-6">
                  Pay your team in 120+ currencies. We handle taxes, benefits, and local compliance automatically.
                </p>
                <div className="flex flex-wrap gap-2">
                  {["USD", "EUR", "GBP", "JPY", "BRL"].map(c => (
                    <span key={c} className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-xs font-mono">{c}</span>
                  ))}
                </div>
             </div>
             <div className="flex-1 w-full grid grid-cols-2 gap-4">
                <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                   <div className="text-xs text-muted-foreground mb-1">Last Payout</div>
                   <div className="text-lg font-bold font-mono">$1.2M</div>
                </div>
                <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                   <div className="text-xs text-muted-foreground mb-1">Compliance</div>
                   <div className="text-lg font-bold text-green-500">100%</div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const Pricing = () => (
  <section id="pricing" className="py-24 bg-white/[0.02]">
    <div className="max-w-7xl mx-auto px-6">
      <div className="text-center mb-20">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-4">Simple, Transparent Pricing</h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Scale your HR operations without hidden fees or complex contracts.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {[
          { name: "Starter", price: "49", desc: "For small teams up to 20 employees." },
          { name: "Professional", price: "199", desc: "Our most popular plan for growing companies.", featured: true },
          { name: "Enterprise", price: "Custom", desc: "Advanced controls for large global organizations." }
        ].map((plan) => (
          <div 
            key={plan.name}
            className={cn(
              "p-8 rounded-3xl border transition-all flex flex-col",
              plan.featured 
                ? "bg-white/5 border-primary shadow-[0_0_40px_rgba(79,70,229,0.2)] scale-105 relative z-10" 
                : "bg-background border-white/10 hover:border-white/20"
            )}
          >
            {plan.featured && (
              <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider">
                Most Popular
              </span>
            )}
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
              <p className="text-sm text-muted-foreground mb-6">{plan.desc}</p>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-bold tracking-tighter">{plan.price === "Custom" ? "" : "$"}{plan.price}</span>
                {plan.price !== "Custom" && <span className="text-muted-foreground">/mo</span>}
              </div>
            </div>
            <ul className="space-y-4 mb-8 flex-1">
              {["Core HR Features", "Payroll Integration", "Basic Analytics", "Email Support"].map(f => (
                <li key={f} className="flex items-center gap-3 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-primary" /> {f}
                </li>
              ))}
            </ul>
            <Link 
              href="/register" 
              className={cn(
                "w-full py-3 rounded-xl font-semibold text-center transition-all",
                plan.featured 
                  ? "bg-primary text-white hover:bg-primary/90" 
                  : "bg-white/5 hover:bg-white/10 border border-white/10"
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
  <section id="faq" className="py-24">
    <div className="max-w-3xl mx-auto px-6">
      <h2 className="text-3xl font-bold tracking-tighter mb-12 text-center">Frequently Asked Questions</h2>
      <div className="space-y-4">
        {[
          { q: "How long does implementation take?", a: "Typical setup takes less than 2 weeks, with our dedicated onboarding team guiding you every step of the way." },
          { q: "Is our employee data secure?", a: "Absolutely. We use AES-256 encryption and are SOC2 Type II compliant. Your data is your property." },
          { q: "Can we migrate from our existing HRIS?", a: "Yes, we offer automated migration tools for most major HRIS platforms including Workday, BambooHR, and Rippling." }
        ].map((item, i) => (
          <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <h4 className="font-bold mb-2">{item.q}</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">{item.a}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="pt-24 pb-12 border-t border-white/5">
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-16">
        <div className="col-span-2">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white">
              <Sparkles className="w-5 h-5" />
            </div>
            <span className="text-xl font-bold tracking-tighter">TalentAura</span>
          </div>
          <p className="text-muted-foreground text-sm max-w-xs leading-relaxed mb-6">
            The next generation of HR management. Built for performance, designed for humans.
          </p>
          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 cursor-pointer transition-colors border border-white/5">
               <Globe className="w-4 h-4" />
            </div>
            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 cursor-pointer transition-colors border border-white/5">
               <Users className="w-4 h-4" />
            </div>
            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 cursor-pointer transition-colors border border-white/5">
               <Lock className="w-4 h-4" />
            </div>
          </div>
        </div>
        <div>
          <h5 className="font-bold mb-6 text-sm">Product</h5>
          <ul className="space-y-4 text-sm text-muted-foreground">
            <li><Link href="#" className="hover:text-primary transition-colors">Features</Link></li>
            <li><Link href="#" className="hover:text-primary transition-colors">Pricing</Link></li>
            <li><Link href="#" className="hover:text-primary transition-colors">Security</Link></li>
            <li><Link href="#" className="hover:text-primary transition-colors">API</Link></li>
          </ul>
        </div>
        <div>
          <h5 className="font-bold mb-6 text-sm">Company</h5>
          <ul className="space-y-4 text-sm text-muted-foreground">
            <li><Link href="#" className="hover:text-primary transition-colors">About</Link></li>
            <li><Link href="#" className="hover:text-primary transition-colors">Careers</Link></li>
            <li><Link href="#" className="hover:text-primary transition-colors">Blog</Link></li>
            <li><Link href="#" className="hover:text-primary transition-colors">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h5 className="font-bold mb-6 text-sm">Legal</h5>
          <ul className="space-y-4 text-sm text-muted-foreground">
            <li><Link href="#" className="hover:text-primary transition-colors">Privacy</Link></li>
            <li><Link href="#" className="hover:text-primary transition-colors">Terms</Link></li>
            <li><Link href="#" className="hover:text-primary transition-colors">Cookie Policy</Link></li>
          </ul>
        </div>
      </div>
      <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
        <p>© 2026 TalentAura Inc. All rights reserved.</p>
        <div className="flex items-center gap-6">
           <span>Built with Love by Forge</span>
        </div>
      </div>
    </div>
  </footer>
);

export default function LandingPage() {
  return (
    <main className="min-h-screen selection:bg-primary/30">
      <Nav />
      <Hero />
      <SocialProof />
      <BentoFeatures />
      <Pricing />
      <FAQ />
      <Footer />
    </main>
  );
}
