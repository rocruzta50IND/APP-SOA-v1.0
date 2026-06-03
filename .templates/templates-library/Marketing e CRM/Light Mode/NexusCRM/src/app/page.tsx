"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  ArrowRight, 
  BarChart3, 
  ChevronRight, 
  CheckCircle2, 
  Layers, 
  LineChart, 
  PieChart, 
  ShieldCheck, 
  Users, 
  Zap,
  Star
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";

const transition = { type: "spring", stiffness: 400, damping: 30 } as const;

export default function LandingPage() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background text-foreground selection:bg-primary/30">
      {/* Background Orbs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-[20%] -left-[10%] h-[1000px] w-[1000px] rounded-full bg-primary/20 blur-[120px]" />
        <div className="absolute top-[20%] -right-[10%] h-[800px] w-[800px] rounded-full bg-indigo-500/10 blur-[120px]" />
        <div className="absolute bottom-0 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-primary/10 blur-[120px]" />
      </div>

      {/* 1. Navbar */}
      <header className="fixed top-0 z-50 w-full border-b border-white/10 bg-background/80 backdrop-blur-md">
        <nav className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary shadow-[0_0_15px_rgba(79,70,229,0.5)]">
              <Zap className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tighter">NexusCRM</span>
          </div>
          <div className="hidden items-center gap-8 md:flex">
            {["Features", "Solutions", "Pricing", "About"].map((item) => (
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
            <Link href="/login" className="text-sm font-medium text-muted-foreground hover:text-white">
              Log in
            </Link>
            <Button size="sm" asChild>
              <Link href="/register">Start Free Trial</Link>
            </Button>
          </div>
        </nav>
      </header>

      <main className="relative pt-16">
        {/* 2. Hero Section */}
        <section className="container mx-auto px-4 pt-24 pb-20 text-center md:pt-32 md:pb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={transition}
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm font-medium text-primary-foreground backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary"></span>
              </span>
              Next-Gen CRM Intelligence for Enterprises
            </div>
            <h1 className="mx-auto mb-6 max-w-4xl text-5xl font-bold tracking-tighter sm:text-7xl md:leading-tight">
              Scale Your B2B Revenue with{" "}
              <span className="bg-gradient-to-r from-primary to-indigo-400 bg-clip-text text-transparent">
                Predictive Analytics
              </span>
            </h1>
            <p className="mx-auto mb-10 max-w-2xl text-lg text-muted-foreground md:text-xl">
              NexusCRM empowers your sales and marketing teams with deep insights, automated pipelines, and enterprise-grade lead intelligence.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button size="lg" className="h-12 px-8 text-base" asChild>
                <Link href="/register">Get Started Now</Link>
              </Button>
              <Button variant="outline" size="lg" className="h-12 px-8 text-base">
                Book a Demo
              </Button>
            </div>
          </motion.div>

          {/* Hero Preview Image / Mockup */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...transition, delay: 0.2 }}
            className="mt-20 overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-4 shadow-2xl backdrop-blur-sm"
          >
            <div className="aspect-[16/9] w-full rounded-2xl bg-gradient-to-br from-zinc-900 to-black p-8 shadow-inner">
              <div className="flex h-full w-full flex-col gap-6">
                <div className="flex items-center justify-between border-b border-white/5 pb-4">
                  <div className="h-4 w-32 rounded bg-white/10" />
                  <div className="flex gap-2">
                    <div className="h-4 w-4 rounded-full bg-red-500/50" />
                    <div className="h-4 w-4 rounded-full bg-yellow-500/50" />
                    <div className="h-4 w-4 rounded-full bg-green-500/50" />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-6">
                  <div className="h-32 rounded-xl bg-primary/10 border border-primary/20 p-4">
                    <div className="mb-2 h-3 w-1/2 rounded bg-primary/30" />
                    <div className="h-8 w-3/4 rounded bg-primary/50" />
                  </div>
                  <div className="h-32 rounded-xl bg-white/5 border border-white/10" />
                  <div className="h-32 rounded-xl bg-white/5 border border-white/10" />
                </div>
                <div className="flex-1 rounded-xl bg-white/5 border border-white/10 p-6">
                   <div className="mb-4 h-4 w-48 rounded bg-white/10" />
                   <div className="space-y-3">
                     {[1, 2, 3].map(i => (
                       <div key={i} className="h-12 w-full rounded-lg bg-white/5 border border-white/5" />
                     ))}
                   </div>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* 3. Social Proof */}
        <section className="border-y border-white/5 bg-white/[0.02] py-12 backdrop-blur-sm">
          <div className="container mx-auto px-4">
            <p className="mb-8 text-center text-sm font-medium uppercase tracking-widest text-muted-foreground">
              Trusted by world-class enterprise teams
            </p>
            <div className="flex flex-wrap items-center justify-center gap-8 opacity-50 grayscale transition-all hover:grayscale-0 md:gap-16">
               {["Acme Corp", "GlobalTech", "Quantix", "Aetheris", "Lumina"].map((name) => (
                 <span key={name} className="text-xl font-bold tracking-tighter text-white sm:text-2xl">
                   {name}
                 </span>
               ))}
            </div>
          </div>
        </section>

        {/* 4. Bento Features */}
        <section id="features" className="container mx-auto px-4 py-24 md:py-32">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tighter sm:text-5xl">Engineered for Momentum</h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              A comprehensive suite of tools designed to remove friction from your sales cycle.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:grid-rows-2">
            {/* Main Bento Item */}
            <Card className="md:col-span-2 md:row-span-2">
              <CardContent className="flex h-full flex-col p-8">
                <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/20 text-primary">
                  <BarChart3 className="h-6 w-6" />
                </div>
                <h3 className="mb-4 text-3xl font-bold">Predictive Analytics Dashboard</h3>
                <p className="mb-8 text-lg text-muted-foreground">
                  Harness the power of AI to forecast sales trends, identify high-intent leads, and optimize your marketing spend with real-time data visualization.
                </p>
                <div className="mt-auto flex-1 rounded-xl bg-gradient-to-br from-primary/20 to-indigo-500/10 border border-primary/20 p-6">
                  <div className="flex items-end gap-2 h-full">
                    {[40, 60, 45, 80, 55, 90, 70].map((h, i) => (
                      <div 
                        key={i} 
                        className="flex-1 rounded-t-sm bg-primary/40 transition-all hover:bg-primary"
                        style={{ height: `${h}%` }}
                      />
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Small Bento Item 1 */}
            <Card>
              <CardContent className="p-8">
                <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-500/20 text-indigo-400">
                  <Users className="h-5 w-5" />
                </div>
                <h3 className="mb-2 text-xl font-bold">Smart Segmentation</h3>
                <p className="text-sm text-muted-foreground">
                  Automatically group leads based on behavior and engagement metrics.
                </p>
              </CardContent>
            </Card>

            {/* Small Bento Item 2 */}
            <Card>
              <CardContent className="p-8">
                <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-400">
                  <Zap className="h-5 w-5" />
                </div>
                <h3 className="mb-2 text-xl font-bold">Auto-Sequences</h3>
                <p className="text-sm text-muted-foreground">
                  Trigger personalized follow-ups across multiple channels instantly.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* 5. Testimonials */}
        <section className="relative overflow-hidden py-24 md:py-32">
          <div className="container mx-auto px-4">
            <h2 className="mb-16 text-center text-3xl font-bold tracking-tighter sm:text-5xl">Loved by Teams</h2>
            <div className="grid gap-8 md:grid-cols-3">
              {[
                {
                  name: "Sarah Chen",
                  role: "VP of Sales at GlobalTech",
                  content: "NexusCRM transformed our lead management. We&apos;ve seen a 40% increase in conversion rates in just three months."
                },
                {
                  name: "Marcus Thorne",
                  role: "Founder at Quantix",
                  content: "The bento-style analytics are beautiful and functional. It&apos;s the first CRM my team actually enjoys using every day."
                },
                {
                  name: "Elena Rodriguez",
                  role: "Marketing Director",
                  content: "Enterprise-grade features with a consumer-level UX. NexusCRM is in a league of its own for high-ticket B2B."
                }
              ].map((t, i) => (
                <Card key={i} className="relative bg-white/5 p-8">
                  <div className="mb-4 flex gap-1">
                    {[1, 2, 3, 4, 5].map(s => <Star key={s} className="h-4 w-4 fill-primary text-primary" />)}
                  </div>
                  <p className="mb-8 text-lg italic text-muted-foreground">
                    &quot;{t.content}&quot;
                  </p>
                  <div>
                    <div className="font-bold text-white">{t.name}</div>
                    <div className="text-sm text-muted-foreground">{t.role}</div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* 6. Pricing */}
        <section id="pricing" className="container mx-auto px-4 py-24 md:py-32">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tighter sm:text-5xl">Simple, Transparent Pricing</h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              Choose the plan that fits your current stage, and scale as you grow.
            </p>
          </div>
          <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-3">
             <Card className="flex flex-col">
               <CardContent className="flex flex-1 flex-col p-8">
                 <div className="mb-4 text-sm font-bold uppercase tracking-widest text-muted-foreground">Starter</div>
                 <div className="mb-6 flex items-baseline gap-1">
                   <span className="text-4xl font-bold">$49</span>
                   <span className="text-muted-foreground">/mo</span>
                 </div>
                 <ul className="mb-8 space-y-4 text-sm">
                   {["Up to 5 Users", "Basic Analytics", "Pipeline Management", "24/7 Support"].map(f => (
                     <li key={f} className="flex items-center gap-2">
                       <CheckCircle2 className="h-4 w-4 text-primary" />
                       <span>{f}</span>
                     </li>
                   ))}
                 </ul>
                 <Button variant="outline" className="mt-auto w-full">Choose Starter</Button>
               </CardContent>
             </Card>

             <Card className="relative flex flex-col border-primary/50 bg-primary/5">
               <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white">Most Popular</div>
               <CardContent className="flex flex-1 flex-col p-8">
                 <div className="mb-4 text-sm font-bold uppercase tracking-widest text-primary">Growth</div>
                 <div className="mb-6 flex items-baseline gap-1">
                   <span className="text-4xl font-bold">$99</span>
                   <span className="text-muted-foreground">/mo</span>
                 </div>
                 <ul className="mb-8 space-y-4 text-sm">
                   {["Up to 20 Users", "Advanced AI Forecasting", "Custom Dashboards", "Priority Support", "API Access"].map(f => (
                     <li key={f} className="flex items-center gap-2">
                       <CheckCircle2 className="h-4 w-4 text-primary" />
                       <span>{f}</span>
                     </li>
                   ))}
                 </ul>
                 <Button className="mt-auto w-full">Choose Growth</Button>
               </CardContent>
             </Card>

             <Card className="flex flex-col">
               <CardContent className="flex flex-1 flex-col p-8">
                 <div className="mb-4 text-sm font-bold uppercase tracking-widest text-muted-foreground">Enterprise</div>
                 <div className="mb-6 flex items-baseline gap-1">
                   <span className="text-4xl font-bold">$249</span>
                   <span className="text-muted-foreground">/mo</span>
                 </div>
                 <ul className="mb-8 space-y-4 text-sm">
                   {["Unlimited Users", "Predictive Modeling", "SSO & Security", "Dedicated Manager", "White-labeling"].map(f => (
                     <li key={f} className="flex items-center gap-2">
                       <CheckCircle2 className="h-4 w-4 text-primary" />
                       <span>{f}</span>
                     </li>
                   ))}
                 </ul>
                 <Button variant="outline" className="mt-auto w-full">Contact Sales</Button>
               </CardContent>
             </Card>
          </div>
        </section>

        {/* 7. Footer */}
        <footer className="border-t border-white/10 bg-black/40 pt-16 pb-8 backdrop-blur-xl">
          <div className="container mx-auto px-4">
            <div className="mb-12 grid gap-12 md:grid-cols-4">
              <div className="col-span-1 md:col-span-2">
                <div className="mb-6 flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                    <Zap className="h-5 w-5 text-white" />
                  </div>
                  <span className="text-xl font-bold tracking-tighter">NexusCRM</span>
                </div>
                <p className="mb-6 max-w-sm text-muted-foreground">
                  The ultimate intelligence platform for modern B2B enterprises. Accelerate your sales cycle and master your marketing data.
                </p>
              </div>
              <div>
                <h4 className="mb-6 text-sm font-bold uppercase tracking-widest text-white">Product</h4>
                <ul className="space-y-4 text-sm text-muted-foreground">
                  <li><Link href="#" className="hover:text-primary transition-colors">Features</Link></li>
                  <li><Link href="#" className="hover:text-primary transition-colors">Pricing</Link></li>
                  <li><Link href="#" className="hover:text-primary transition-colors">API Docs</Link></li>
                  <li><Link href="#" className="hover:text-primary transition-colors">Security</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="mb-6 text-sm font-bold uppercase tracking-widest text-white">Company</h4>
                <ul className="space-y-4 text-sm text-muted-foreground">
                  <li><Link href="#" className="hover:text-primary transition-colors">About Us</Link></li>
                  <li><Link href="#" className="hover:text-primary transition-colors">Careers</Link></li>
                  <li><Link href="#" className="hover:text-primary transition-colors">Blog</Link></li>
                  <li><Link href="#" className="hover:text-primary transition-colors">Contact</Link></li>
                </ul>
              </div>
            </div>
            <div className="flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 text-xs text-muted-foreground md:flex-row">
              <p>© 2026 NexusCRM Intelligence Inc. All rights reserved.</p>
              <div className="flex gap-8">
                <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
                <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
