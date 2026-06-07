"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  ArrowRight, 
  Check, 
  Layout, 
  Shield, 
  Zap, 
  BarChart3, 
  Users, 
  Globe,
  ChevronDown
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.3, ease: "easeOut" }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* 1. NAVBAR */}
      <header className="fixed top-0 w-full z-50 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary flex items-center justify-center rounded-md">
              <Layout className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-xl tracking-tight">FluxBoard</span>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
            <Link href="#features" className="hover:text-foreground transition-colors">Features</Link>
            <Link href="#solutions" className="hover:text-foreground transition-colors">Solutions</Link>
            <Link href="#pricing" className="hover:text-foreground transition-colors">Pricing</Link>
            <Link href="#faq" className="hover:text-foreground transition-colors">FAQ</Link>
          </nav>

          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost" size="sm">Log in</Button>
            </Link>
            <Link href="/register">
              <Button size="sm">Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 pt-16">
        {/* 2. HERO SECTION */}
        <section className="relative py-24 lg:py-32 overflow-hidden border-b border-border">
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-bold mb-6 uppercase tracking-widest"
              >
                <Zap className="w-3 h-3 fill-current" />
                <span>v2.0 is now live</span>
              </motion.div>
              
              <motion.h1 
                className="text-5xl md:text-7xl font-black tracking-tight leading-[1.1] mb-6"
                {...fadeInUp}
              >
                The Enterprise <span className="text-muted-foreground">Kanban</span> for High-Performance Teams.
              </motion.h1>
              
              <motion.p 
                className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                FluxBoard streamlines complex workflows with surgical precision. Built for speed, density, and elite collaboration.
              </motion.p>
              
              <motion.div 
                className="flex flex-col sm:flex-row items-center justify-center gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                <Link href="/register">
                  <Button size="lg" className="w-full sm:w-auto gap-2">
                    Start Free Trial <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  View Demo
                </Button>
              </motion.div>
            </div>
          </div>
          
          {/* Subtle Grid Background */}
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]"></div>
        </section>

        {/* 3. SOCIAL PROOF */}
        <section className="py-12 border-b border-border bg-muted/30">
          <div className="container mx-auto px-4 text-center">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground mb-8">
              Trusted by industry leaders
            </p>
            <div className="flex flex-wrap justify-center items-center gap-12 grayscale opacity-50">
              {/* Manual SVG Logos to avoid restricted imports */}
              <div className="flex items-center gap-2 font-bold text-xl">
                <div className="w-6 h-6 bg-foreground rounded-sm"></div> Vercel
              </div>
              <div className="flex items-center gap-2 font-bold text-xl">
                <div className="w-6 h-6 border-2 border-foreground rounded-full"></div> Stripe
              </div>
              <div className="flex items-center gap-2 font-bold text-xl">
                <div className="w-6 h-6 bg-foreground rotate-45"></div> Linear
              </div>
              <div className="flex items-center gap-2 font-bold text-xl">
                <div className="w-6 h-6 border-2 border-foreground"></div> GitHub
              </div>
              <div className="flex items-center gap-2 font-bold text-xl">
                <div className="w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-b-[20px] border-b-foreground"></div> Supabase
              </div>
            </div>
          </div>
        </section>

        {/* 4. BENTO FEATURES */}
        <section id="features" className="py-24 border-b border-border">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">Engineered for Complexity</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">High-density data visualization and ultra-fast interactions.</p>
            </div>

            <motion.div 
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {/* Large Bento Card */}
              <Card className="md:col-span-2 overflow-hidden border-border/50 group">
                <CardContent className="p-0 flex flex-col md:flex-row h-full">
                  <div className="p-8 flex flex-col justify-center flex-1">
                    <BarChart3 className="w-10 h-10 text-primary mb-4" />
                    <h3 className="text-2xl font-bold mb-2">Real-time Analytics</h3>
                    <p className="text-muted-foreground">Monitor cycle time, velocity, and throughput with surgical precision. Built-in telemetry for every workflow.</p>
                  </div>
                  <div className="bg-muted flex-1 p-8 flex items-end justify-end">
                    <div className="w-full h-48 bg-background border border-border rounded-md p-4 flex flex-col gap-2">
                      <div className="h-4 w-2/3 bg-muted rounded animate-pulse"></div>
                      <div className="h-4 w-full bg-muted rounded animate-pulse"></div>
                      <div className="h-20 w-full bg-primary/10 border border-primary/20 rounded-md"></div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="p-8 border-border/50 hover:border-primary/50 transition-colors">
                <Zap className="w-10 h-10 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-2">Keyboard First</h3>
                <p className="text-muted-foreground">Navigate, update, and manage boards without ever touching your mouse.</p>
              </Card>

              <Card className="p-8 border-border/50 hover:border-primary/50 transition-colors">
                <Shield className="w-10 h-10 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-2">Enterprise Security</h3>
                <p className="text-muted-foreground">SSO, SAML, and granular RBAC. Your data is protected by bank-grade encryption.</p>
              </Card>

              <Card className="md:col-span-2 p-8 border-border/50 flex flex-col md:flex-row gap-8 items-center bg-muted/20">
                <div className="flex-1">
                  <Users className="w-10 h-10 text-primary mb-4" />
                  <h3 className="text-2xl font-bold mb-2">Elite Collaboration</h3>
                  <p className="text-muted-foreground">Sync boards across global teams instantly. No conflicts, no lag, just pure synchronization.</p>
                </div>
                <div className="flex-1 grid grid-cols-2 gap-4 w-full">
                  <div className="h-24 bg-background border border-border rounded-md p-4 flex items-center justify-center font-bold text-2xl">99.9%</div>
                  <div className="h-24 bg-background border border-border rounded-md p-4 flex items-center justify-center font-bold text-2xl">&lt;50ms</div>
                </div>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* 5. PRICING */}
        <section id="pricing" className="py-24 border-b border-border bg-muted/10">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">Transparent Pricing</h2>
              <p className="text-muted-foreground">Scalable plans for every stage of your growth.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[
                { name: "Starter", price: "$0", features: ["Up to 3 boards", "Basic analytics", "Standard support"] },
                { name: "Pro", price: "$29", features: ["Unlimited boards", "Advanced telemetry", "Priority support", "Custom automations"], highlight: true },
                { name: "Enterprise", price: "Custom", features: ["Unlimited everything", "SSO/SAML", "Dedicated Success Manager", "SLA guarantees"] }
              ].map((plan, i) => (
                <Card key={i} className={cn(
                  "flex flex-col p-8 transition-transform hover:-translate-y-2",
                  plan.highlight ? "border-primary ring-1 ring-primary" : "border-border"
                )}>
                  <div className="mb-8">
                    <h3 className="font-bold text-lg mb-2">{plan.name}</h3>
                    <div className="text-4xl font-black mb-1">{plan.price}</div>
                    <p className="text-sm text-muted-foreground">{plan.price !== "Custom" ? "per user / month" : "contact sales"}</p>
                  </div>
                  <div className="space-y-4 mb-8 flex-1">
                    {plan.features.map((feature, j) => (
                      <div key={j} className="flex items-center gap-3 text-sm">
                        <Check className="w-4 h-4 text-primary" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                  <Button variant={plan.highlight ? "default" : "outline"} className="w-full">
                    {plan.name === "Enterprise" ? "Contact Us" : "Get Started"}
                  </Button>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* 6. FAQ */}
        <section id="faq" className="py-24 border-b border-border">
          <div className="container mx-auto px-4 max-w-3xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight mb-4">Frequently Asked Questions</h2>
            </div>
            <div className="space-y-4">
              {[
                { q: "Is there a free trial?", a: "Yes, we offer a 14-day full-featured free trial for the Pro plan." },
                { q: "Can we import data from Jira?", a: "Absolutely. We support seamless one-click imports from Jira, Trello, and Asana." },
                { q: "Do you offer discounts for non-profits?", a: "Yes, we provide special pricing for verified non-profit organizations and educational institutions." },
                { q: "How secure is FluxBoard?", a: "We utilize AES-256 encryption, SOC2 Type II compliance, and regular third-party security audits." }
              ].map((item, i) => (
                <div key={i} className="border border-border rounded-md p-6 group cursor-pointer hover:bg-muted/50 transition-colors">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold">{item.q}</h4>
                    <ChevronDown className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-transform" />
                  </div>
                  <p className="mt-4 text-sm text-muted-foreground">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* 7. FOOTER */}
      <footer className="bg-muted/30 border-t border-border py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-6 h-6 bg-primary flex items-center justify-center rounded-sm">
                  <Layout className="w-4 h-4 text-primary-foreground" />
                </div>
                <span className="font-bold tracking-tight">FluxBoard</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Empowering high-performance teams with surgical workflow management tools.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-xs uppercase tracking-widest mb-6">Product</h4>
              <ul className="space-y-4 text-sm text-muted-foreground">
                <li><Link href="#" className="hover:text-primary transition-colors">Features</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Integrations</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Enterprise</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Pricing</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-xs uppercase tracking-widest mb-6">Company</h4>
              <ul className="space-y-4 text-sm text-muted-foreground">
                <li><Link href="#" className="hover:text-primary transition-colors">About</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Blog</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Careers</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-xs uppercase tracking-widest mb-6">Legal</h4>
              <ul className="space-y-4 text-sm text-muted-foreground">
                <li><Link href="#" className="hover:text-primary transition-colors">Privacy</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Terms</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Cookie Policy</Link></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-muted-foreground">
              © 2026 FluxBoard Inc. All rights reserved. Built with precision.
            </p>
            <div className="flex items-center gap-6 grayscale opacity-50">
              <Globe className="w-4 h-4" />
              <div className="w-4 h-4 border-2 border-foreground rounded-full"></div>
              <div className="w-4 h-4 bg-foreground rotate-45"></div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
