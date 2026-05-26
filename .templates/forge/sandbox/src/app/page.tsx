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
  ArrowRight,
  Star,
  Globe,
  Briefcase,
  Search,
  MessageSquare,
  CreditCard
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

const transition = { type: "spring", stiffness: 400, damping: 30 };

export default function LandingPage() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-background selection:bg-primary/30">
      {/* Background Glows */}
      <div className="glow top-[-10%] left-[-10%] w-[500px] h-[500px] opacity-20" />
      <div className="glow bottom-[-10%] right-[-10%] w-[600px] h-[600px] opacity-10" />
      
      {/* Navigation */}
      <nav className="fixed top-0 z-50 w-full border-b border-white/5 bg-background/50 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary shadow-[0_0_15px_rgba(79,70,229,0.5)]">
              <Zap className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tighter text-white">EthosHR</span>
          </div>
          
          <div className="hidden items-center gap-8 md:flex">
            {["Product", "Features", "Pricing", "About"].map((item) => (
              <Link 
                key={item} 
                href={`#${item.toLowerCase()}`}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-white"
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

      <main className="pt-32">
        {/* Hero Section */}
        <section id="product" className="relative px-6 pb-20 pt-10 md:pb-32 md:pt-20">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col items-center text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={transition}
                className="mb-6 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm font-medium text-primary-foreground/80 backdrop-blur-md"
              >
                ✨ Reimagining HR for the Modern Enterprise
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...transition, delay: 0.1 }}
                className="max-w-4xl text-gradient text-5xl font-bold tracking-tighter sm:text-7xl md:text-8xl leading-tight"
              >
                The OS for your <br /> Global Workforce.
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...transition, delay: 0.2 }}
                className="mt-8 max-w-2xl text-lg text-muted-foreground md:text-xl"
              >
                Scale your team globally with automated payroll, effortless recruitment, and deep talent analytics. EthosHR is built for high-growth companies.
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...transition, delay: 0.3 }}
                className="mt-10 flex flex-col gap-4 sm:flex-row"
              >
                <Button size="lg" className="group">
                  Start Free Trial 
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
                <Button variant="outline" size="lg">Book a Demo</Button>
              </motion.div>

              {/* Hero Preview Card */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...transition, delay: 0.4 }}
                className="relative mt-20 w-full max-w-5xl"
              >
                <div className="absolute inset-0 bg-primary/20 blur-[120px]" />
                <Card className="relative aspect-video overflow-hidden border-white/20 bg-black/40 backdrop-blur-3xl shadow-2xl">
                  <div className="flex h-full w-full items-center justify-center border-t border-white/10 bg-gradient-to-br from-white/5 to-transparent p-12">
                    <div className="grid h-full w-full grid-cols-3 gap-6 opacity-40">
                      <div className="rounded-2xl bg-white/5" />
                      <div className="col-span-2 rounded-2xl bg-white/5" />
                      <div className="col-span-2 rounded-2xl bg-white/5" />
                      <div className="rounded-2xl bg-white/5" />
                    </div>
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                      <Zap className="mb-4 h-16 w-16 text-primary" />
                      <h2 className="text-2xl font-bold text-white">Analytics Dashboard Preview</h2>
                      <p className="text-muted-foreground">Interactive HR metrics powered by Ethos Engine</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Social Proof */}
        <section className="border-y border-white/5 bg-white/[0.02] py-16">
          <div className="mx-auto max-w-7xl px-6">
            <p className="text-center text-sm font-medium uppercase tracking-widest text-muted-foreground">
              Trusted by world-class engineering teams
            </p>
            <div className="mt-12 grid grid-cols-2 items-center justify-items-center gap-8 grayscale transition-all hover:grayscale-0 md:grid-cols-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="flex items-center gap-2 text-xl font-bold text-white/40">
                  <Globe className="h-6 w-6" /> Logo {i}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Bento Grid */}
        <section id="features" className="px-6 py-24 md:py-32">
          <div className="mx-auto max-w-7xl">
            <div className="mb-20 flex flex-col items-center text-center">
              <h2 className="text-gradient text-3xl font-bold tracking-tighter sm:text-5xl">Everything you need to scale.</h2>
              <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
                One platform to manage your entire employee lifecycle, from hire to retire.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:grid-rows-2 lg:h-[700px]">
              {/* Featured Card */}
              <Card className="group relative flex flex-col justify-between overflow-hidden p-8 md:col-span-2 md:row-span-2">
                <div className="absolute right-0 top-0 -mr-16 -mt-16 h-64 w-64 rounded-full bg-primary/20 blur-[80px] transition-all group-hover:scale-110" />
                <div>
                  <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/20 text-primary">
                    <Users className="h-6 w-6" />
                  </div>
                  <h3 className="text-3xl font-bold text-white">Global Talent Acquisition</h3>
                  <p className="mt-4 max-w-sm text-lg text-muted-foreground">
                    Hire the best talent anywhere in the world. Our platform handles local compliance, contracts, and background checks.
                  </p>
                </div>
                <div className="mt-12 grid grid-cols-2 gap-4">
                  {[
                    "Automated Sourcing",
                    "AI Screening",
                    "Pipeline Management",
                    "One-click Onboarding"
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-2 text-sm text-white/80">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                      {item}
                    </div>
                  ))}
                </div>
              </Card>

              {/* Smaller Cards */}
              <Card className="flex flex-col justify-between p-8">
                <div>
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-500">
                    <CreditCard className="h-5 w-5" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Global Payroll</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Pay employees and contractors in 150+ countries with one click.
                  </p>
                </div>
                <div className="mt-4 flex items-center justify-between text-xs font-mono text-muted-foreground">
                  <span>128-bit Encrypted</span>
                  <Shield className="h-3 w-3" />
                </div>
              </Card>

              <Card className="flex flex-col justify-between p-8">
                <div>
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/20 text-blue-500">
                    <BarChart3 className="h-5 w-5" />
                  </div>
                  <h3 className="text-xl font-bold text-white">People Analytics</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Gain insights into retention, diversity, and performance.
                  </p>
                </div>
                <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-white/5">
                  <div className="h-full w-2/3 bg-blue-500" />
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="bg-white/[0.02] px-6 py-24 md:py-32">
          <div className="mx-auto max-w-7xl">
            <div className="mb-20 text-center">
              <h2 className="text-gradient text-3xl font-bold tracking-tighter sm:text-5xl">Simple, transparent pricing.</h2>
            </div>
            
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {[
                { name: "Starter", price: "$49", features: ["Up to 10 employees", "Core HR features", "Email support"] },
                { name: "Pro", price: "$149", features: ["Up to 50 employees", "Advanced analytics", "Priority support", "Global payroll"] },
                { name: "Enterprise", price: "Custom", features: ["Unlimited employees", "Custom integrations", "Dedicated account manager", "SSO & Security"] }
              ].map((tier, idx) => (
                <Card key={idx} className={cn("flex flex-col p-8", idx === 1 && "border-primary/50 ring-1 ring-primary/50 relative")}>
                  {idx === 1 && <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-1 text-[10px] font-bold uppercase tracking-widest">Most Popular</div>}
                  <div className="mb-8">
                    <h3 className="text-xl font-bold text-white">{tier.name}</h3>
                    <div className="mt-4 flex items-baseline gap-1">
                      <span className="text-4xl font-bold text-white">{tier.price}</span>
                      {tier.price !== "Custom" && <span className="text-muted-foreground">/mo</span>}
                    </div>
                  </div>
                  <div className="mb-8 flex-1 space-y-4">
                    {tier.features.map((feature) => (
                      <div key={feature} className="flex items-center gap-3 text-sm text-muted-foreground">
                        <CheckCircle2 className="h-4 w-4 text-primary" />
                        {feature}
                      </div>
                    ))}
                  </div>
                  <Button variant={idx === 1 ? "primary" : "outline"} className="w-full">
                    Get Started
                  </Button>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="px-6 py-24 md:py-32">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-12 text-center text-3xl font-bold tracking-tighter text-white">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {[
                { q: "How secure is EthosHR?", a: "We use enterprise-grade encryption and are SOC2 Type II compliant. Your data is stored in isolated vaults." },
                { q: "Can I integrate with Slack or Microsoft Teams?", a: "Yes, we have deep integrations with Slack, Teams, and Google Workspace to automate your workflows." },
                { q: "What countries do you support for payroll?", a: "Currently, we support full automated payroll in over 150 countries through our EOR network." }
              ].map((item, i) => (
                <Card key={i} className="p-6">
                  <h4 className="text-lg font-medium text-white">{item.q}</h4>
                  <p className="mt-2 text-muted-foreground">{item.a}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-white/5 py-12">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
              <div className="col-span-2 md:col-span-1">
                <div className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-primary" />
                  <span className="text-lg font-bold tracking-tighter text-white">EthosHR</span>
                </div>
                <p className="mt-4 text-sm text-muted-foreground">
                  The future of work is decentralized. We help you build it.
                </p>
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Product</h4>
                <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                  <li><Link href="#" className="hover:text-white transition-colors">Recruitment</Link></li>
                  <li><Link href="#" className="hover:text-white transition-colors">Payroll</Link></li>
                  <li><Link href="#" className="hover:text-white transition-colors">Analytics</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Company</h4>
                <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                  <li><Link href="#" className="hover:text-white transition-colors">About Us</Link></li>
                  <li><Link href="#" className="hover:text-white transition-colors">Careers</Link></li>
                  <li><Link href="#" className="hover:text-white transition-colors">Contact</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Legal</h4>
                <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                  <li><Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                  <li><Link href="#" className="hover:text-white transition-colors">Terms of Service</Link></li>
                </ul>
              </div>
            </div>
            <div className="mt-12 flex flex-col items-center justify-between border-t border-white/5 pt-8 md:flex-row">
              <p className="text-xs text-muted-foreground">
                © 2026 EthosHR Inc. All rights reserved.
              </p>
              <div className="mt-4 flex gap-4 md:mt-0">
                <Globe className="h-4 w-4 text-muted-foreground hover:text-white cursor-pointer" />
                <Star className="h-4 w-4 text-muted-foreground hover:text-white cursor-pointer" />
                <Users className="h-4 w-4 text-muted-foreground hover:text-white cursor-pointer" />
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
