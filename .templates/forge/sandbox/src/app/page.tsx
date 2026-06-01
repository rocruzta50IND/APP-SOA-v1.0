"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  Shield, 
  Users, 
  Zap, 
  BarChart3, 
  CheckCircle2, 
  ArrowRight, 
  Globe, 
  Star,
  Cpu,
  Lock,
  MessageSquare,
  Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { cn } from "@/lib/utils";

// --- Components ---

const Nav = () => (
  <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-background/80 backdrop-blur-xl">
    <div className="container mx-auto px-6 h-20 flex items-center justify-between">
      <Link href="/" className="flex items-center gap-2 group">
        <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center group-hover:rotate-6 transition-transform">
          <Shield className="w-6 h-6 text-white" />
        </div>
        <span className="text-xl font-bold tracking-tighter text-white">Lumina Talent</span>
      </Link>

      <div className="hidden md:flex items-center gap-8">
        {["Features", "Solutions", "Pricing", "Enterprise"].map((item) => (
          <Link 
            key={item} 
            href={`#${item.toLowerCase()}`} 
            className="text-sm font-medium text-muted-foreground hover:text-white transition-colors"
          >
            {item}
          </Link>
        ))}
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
  <section className="relative pt-32 pb-20 overflow-hidden">
    <div className="glow-orb w-[600px] h-[600px] -top-64 -left-64 opacity-50" />
    <div className="glow-orb w-[400px] h-[400px] top-0 right-0 opacity-20" />
    
    <div className="container mx-auto px-6 text-center relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold mb-8">
          <Sparkles className="w-3 h-3" />
          <span>v4.0 IS NOW LIVE</span>
        </div>
        
        <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-8 leading-[0.9] text-gradient">
          The Intelligence Layer <br /> for Modern Teams.
        </h1>
        
        <p className="max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground mb-12 leading-relaxed">
          Hire faster, manage smarter, and scale with confidence. Lumina Talent combines AI-driven insights with a breathtaking interface.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/register">
            <Button size="lg" className="h-14 px-8 text-lg gap-2">
              Start Free Trial <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
          <Button variant="secondary" size="lg" className="h-14 px-8 text-lg">
            Book a Demo
          </Button>
        </div>

        {/* Hero Visual */}
        <div className="mt-20 relative">
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10" />
          <div className="glass rounded-3xl p-4 overflow-hidden shadow-2xl shadow-primary/20 border-white/10">
            <img 
              src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2426" 
              alt="Dashboard Preview" 
              className="rounded-2xl w-full object-cover opacity-80"
            />
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);

const SocialProof = () => (
  <section className="py-20 border-y border-white/5 bg-white/[0.02]">
    <div className="container mx-auto px-6 text-center">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground mb-12">
        TRUSTED BY THE WORLD'S MOST INNOVATIVE TEAMS
      </p>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-12 opacity-40 grayscale contrast-125">
        {["Veritas", "Nova", "Aether", "Lumen", "Helix"].map((company) => (
          <div key={company} className="flex items-center justify-center font-black text-2xl tracking-tighter italic">
            {company}
          </div>
        ))}
      </div>
    </div>
  </section>
);

const Features = () => (
  <section id="features" className="py-32 relative">
    <div className="container mx-auto px-6">
      <div className="text-center mb-24">
        <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-4 text-gradient">
          Engineered for Performance.
        </h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Every tool you need to manage your workforce, all in one hyper-optimized platform.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Large Feature */}
        <Card className="glass md:col-span-2 overflow-hidden group hover:border-primary/50 transition-colors">
          <CardContent className="p-12 flex flex-col md:flex-row gap-12 items-center">
            <div className="flex-1">
              <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center text-primary mb-6">
                <BarChart3 className="w-6 h-6" />
              </div>
              <h3 className="text-3xl font-bold tracking-tight mb-4 text-white">Advanced Analytics</h3>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Visualize talent trends, attrition rates, and hiring velocity with our real-time BI engine. Make decisions based on data, not intuition.
              </p>
              <ul className="space-y-3">
                {["Predictive Attrition", "Cost-per-hire Tracking", "Diversity & Inclusion BI"].map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-white/70">
                    <CheckCircle2 className="w-4 h-4 text-primary" /> {f}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex-1 w-full bg-white/5 rounded-2xl p-4 border border-white/10 group-hover:translate-y-[-10px] transition-transform">
               <div className="aspect-video bg-gradient-to-br from-primary/20 to-indigo-500/20 rounded-xl" />
            </div>
          </CardContent>
        </Card>

        {/* Small Feature */}
        <Card className="glass hover:border-primary/50 transition-colors">
          <CardContent className="p-8">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 flex items-center justify-center text-indigo-400 mb-6">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold tracking-tight mb-4 text-white">AI-Pipeline</h3>
            <p className="text-muted-foreground leading-relaxed">
              Automate resume screening and initial technical assessments with our proprietary LLM integration.
            </p>
          </CardContent>
        </Card>

        {/* Another Row */}
        {[
          { icon: Globe, title: "Global Payroll", color: "emerald", desc: "Pay your team in 120+ currencies with local compliance built-in." },
          { icon: Users, title: "Talent CRM", color: "blue", desc: "Build a database of silver-medalists and passive candidates." },
          { icon: Lock, title: "SOC2 Compliance", color: "red", desc: "Enterprise-grade security and data residency controls for peace of mind." },
        ].map((feat) => (
          <Card key={feat.title} className="glass hover:border-primary/50 transition-colors">
            <CardContent className="p-8">
              <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center mb-6", `bg-${feat.color}-500/20 text-${feat.color}-400`)}>
                <feat.icon className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold tracking-tight mb-4 text-white">{feat.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {feat.desc}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  </section>
);

const Pricing = () => (
  <section id="pricing" className="py-32 bg-white/[0.02] border-y border-white/5 relative overflow-hidden">
    <div className="glow-orb w-[400px] h-[400px] bottom-0 left-1/2 -translate-x-1/2 opacity-20" />
    <div className="container mx-auto px-6 relative z-10">
      <div className="text-center mb-24">
        <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-4 text-gradient">
          Simple, Transparent Pricing.
        </h2>
        <p className="text-muted-foreground text-lg">Choose the plan that fits your growth trajectory.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { name: "Starter", price: "$49", desc: "Perfect for growing startups", features: ["Up to 50 employees", "Core HR features", "Email support"] },
          { name: "Pro", price: "$199", desc: "Advanced features for scale", features: ["Unlimited employees", "AI Sourcing Assistant", "Advanced Analytics", "Priority support"], popular: true },
          { name: "Enterprise", price: "Custom", desc: "Full control for large orgs", features: ["Custom integrations", "Dedicated Account Manager", "SSO & SAML", "On-premise option"] },
        ].map((plan) => (
          <Card key={plan.name} className={cn("glass flex flex-col", plan.popular && "border-primary ring-1 ring-primary/50")}>
            <CardContent className="p-8 flex-1">
              {plan.popular && <span className="text-[10px] font-bold text-primary tracking-widest uppercase mb-4 block">MOST POPULAR</span>}
              <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-black text-white">{plan.price}</span>
                {plan.price !== "Custom" && <span className="text-muted-foreground">/mo</span>}
              </div>
              <p className="text-sm text-muted-foreground mb-8">{plan.desc}</p>
              <ul className="space-y-4 mb-8">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-3 text-sm text-white/80">
                    <CheckCircle2 className="w-4 h-4 text-primary" /> {f}
                  </li>
                ))}
              </ul>
            </CardContent>
            <div className="p-8 pt-0 mt-auto">
              <Button variant={plan.popular ? "primary" : "secondary"} className="w-full h-12">
                {plan.name === "Enterprise" ? "Contact Sales" : "Get Started"}
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  </section>
);

const FAQ = () => (
  <section className="py-32 container mx-auto px-6">
    <div className="max-w-3xl mx-auto">
      <h2 className="text-4xl font-black tracking-tighter mb-16 text-center text-gradient">Frequently Asked Questions</h2>
      <div className="space-y-4">
        {[
          { q: "How secure is my employee data?", a: "Lumina Talent uses AES-256 encryption at rest and TLS 1.3 in transit. We are SOC2 Type II and GDPR compliant." },
          { q: "Can we migrate data from our current HRIS?", a: "Yes, we have native importers for Workday, BambooHR, and SAP SuccessFactors, or you can use our open API." },
          { q: "Do you offer localized support?", a: "We offer 24/7 global support with dedicated teams in San Francisco, London, and Singapore." },
        ].map((item, idx) => (
          <Card key={idx} className="glass">
            <CardContent className="p-6">
              <h4 className="text-lg font-bold text-white mb-2">{item.q}</h4>
              <p className="text-muted-foreground">{item.a}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="py-20 border-t border-white/5">
    <div className="container mx-auto px-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-20">
        <div className="col-span-2 md:col-span-1">
          <Link href="/" className="flex items-center gap-2 mb-6">
            <Shield className="w-8 h-8 text-primary" />
            <span className="text-xl font-bold tracking-tighter text-white">Lumina</span>
          </Link>
          <p className="text-sm text-muted-foreground leading-relaxed">
            The next generation of talent management software. Built for teams that move fast.
          </p>
        </div>
        <div>
          <h5 className="font-bold text-white mb-6">Product</h5>
          <ul className="space-y-4 text-sm text-muted-foreground">
            <li><Link href="#" className="hover:text-primary transition-colors">Features</Link></li>
            <li><Link href="#" className="hover:text-primary transition-colors">Analytics</Link></li>
            <li><Link href="#" className="hover:text-primary transition-colors">Security</Link></li>
          </ul>
        </div>
        <div>
          <h5 className="font-bold text-white mb-6">Company</h5>
          <ul className="space-y-4 text-sm text-muted-foreground">
            <li><Link href="#" className="hover:text-primary transition-colors">About</Link></li>
            <li><Link href="#" className="hover:text-primary transition-colors">Careers</Link></li>
            <li><Link href="#" className="hover:text-primary transition-colors">Privacy</Link></li>
          </ul>
        </div>
        <div>
          <h5 className="font-bold text-white mb-6">Connect</h5>
          <ul className="space-y-4 text-sm text-muted-foreground">
            <li><Link href="#" className="hover:text-primary transition-colors">Twitter</Link></li>
            <li><Link href="#" className="hover:text-primary transition-colors">LinkedIn</Link></li>
            <li><Link href="#" className="hover:text-primary transition-colors">GitHub</Link></li>
          </ul>
        </div>
      </div>
      <div className="flex flex-col md:flex-row justify-between items-center pt-10 border-t border-white/5 gap-4">
        <p className="text-xs text-muted-foreground">© 2026 Lumina Talent. All rights reserved.</p>
        <div className="flex gap-6 text-xs text-muted-foreground">
          <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
          <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
        </div>
      </div>
    </div>
  </footer>
);

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background selection:bg-primary/30">
      <Nav />
      <Hero />
      <SocialProof />
      <Features />
      <Pricing />
      <FAQ />
      <Footer />
    </div>
  );
}
