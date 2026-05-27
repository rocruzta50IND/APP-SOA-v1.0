"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  ArrowRight, 
  ShieldCheck, 
  Zap, 
  BarChart3, 
  Globe, 
  CheckCircle2
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";

export default function LandingPage() {
  const fadeInUp = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.2, ease: "easeOut" }
  } as const;

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground font-sans antialiased">
      {/* 1. NAVBAR */}
      <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-14 items-center justify-between px-4 sm:px-8">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 bg-primary rounded-sm flex items-center justify-center">
              <Zap className="h-4 w-4 text-primary-foreground fill-current" />
            </div>
            <span className="text-sm font-bold tracking-tighter uppercase">Lumenis</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <Link href="#features" className="text-xs font-medium text-muted-foreground hover:text-foreground uppercase tracking-widest transition-colors">Features</Link>
            <Link href="#solutions" className="text-xs font-medium text-muted-foreground hover:text-foreground uppercase tracking-widest transition-colors">Solutions</Link>
            <Link href="#pricing" className="text-xs font-medium text-muted-foreground hover:text-foreground uppercase tracking-widest transition-colors">Pricing</Link>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost" size="sm" className="text-xs uppercase tracking-widest">Login</Button>
            </Link>
            <Link href="/register">
              <Button size="sm" className="text-xs uppercase tracking-widest">Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      <main className="flex-1">
        {/* 2. HERO SECTION */}
        <section className="relative flex flex-col items-center justify-center overflow-hidden py-24 md:py-32 lg:py-40 border-b border-border bg-background">
          <div className="container px-4 text-center">
            <motion.div {...fadeInUp}>
              <Badge variant="outline" className="mb-4 py-1 px-3 text-[10px] uppercase tracking-[0.2em] font-bold">
                Institutional Liquidity Engine
              </Badge>
              <h1 className="max-w-4xl mx-auto text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] mb-6">
                Institutional Crypto <br/> <span className="text-muted-foreground">Flow Control.</span>
              </h1>
              <p className="max-w-2xl mx-auto text-muted-foreground text-base md:text-lg mb-10 leading-relaxed">
                Connect your enterprise to global crypto markets with surgical precision. 
                Lumenis provides the infrastructure for high-frequency trading and large-scale asset management.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/register">
                  <Button size="lg" className="h-12 px-8 text-xs uppercase tracking-widest font-bold w-full sm:w-auto">
                    Open Institutional Account <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="#solutions">
                  <Button variant="outline" size="lg" className="h-12 px-8 text-xs uppercase tracking-widest font-bold w-full sm:w-auto">
                    View Infrastructure
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* 3. SOCIAL PROOF / LOGOS */}
        <section className="py-12 border-b border-border bg-muted/30">
          <div className="container px-4">
            <p className="text-center text-[10px] uppercase tracking-widest font-bold text-muted-foreground mb-8">
              Trusted by leading financial institutions
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 grayscale opacity-50">
              {["Goldman", "BlackRock", "Coinbase", "Kraken", "Binance", "Fidelity"].map((name) => (
                <div key={name} className="flex items-center justify-center font-bold text-xl tracking-tighter">
                  {name}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. BENTO FEATURES */}
        <section id="features" className="py-24 md:py-32 border-b border-border bg-background">
          <div className="container px-4">
            <div className="text-center mb-16">
              <h2 className="text-xs font-bold text-primary uppercase tracking-[0.3em] mb-4">Core Infrastructure</h2>
              <h3 className="text-3xl md:text-4xl font-bold tracking-tight">Built for Precision.</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {/* Feature 1 - Large */}
              <Card className="md:col-span-2 shadow-none border-border group overflow-hidden">
                <CardHeader className="p-8 pb-0">
                  <div className="h-10 w-10 border border-border flex items-center justify-center rounded-md mb-4 bg-background transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <Zap className="h-5 w-5" />
                  </div>
                  <CardTitle className="text-xl font-bold tracking-tight">Ultra-Low Latency Execution</CardTitle>
                  <CardDescription className="text-muted-foreground leading-relaxed mt-2">
                    Our direct market access (DMA) infrastructure ensures sub-millisecond execution 
                    across 40+ global venues and liquidity pools.
                  </CardDescription>
                </CardHeader>
                <div className="p-8 flex justify-end items-end">
                   <div className="h-32 w-full border border-border bg-muted/20 rounded-md flex items-center justify-center overflow-hidden">
                      <div className="flex gap-1 items-end">
                        {[40, 60, 45, 80, 55, 90, 70, 100, 85, 95].map((h, i) => (
                          <div key={i} className="w-4 bg-primary/20 hover:bg-primary transition-colors cursor-pointer" style={{ height: `${h}%` }}></div>
                        ))}
                      </div>
                   </div>
                </div>
              </Card>

              {/* Feature 2 */}
              <Card className="shadow-none border-border group">
                <CardHeader className="p-8">
                  <div className="h-10 w-10 border border-border flex items-center justify-center rounded-md mb-4 bg-background transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <ShieldCheck className="h-5 w-5" />
                  </div>
                  <CardTitle className="text-xl font-bold tracking-tight">MPC Custody</CardTitle>
                  <CardDescription className="text-muted-foreground leading-relaxed mt-2">
                    Military-grade security using Multi-Party Computation to secure private keys.
                  </CardDescription>
                </CardHeader>
              </Card>

              {/* Feature 3 */}
              <Card className="shadow-none border-border group">
                <CardHeader className="p-8">
                  <div className="h-10 w-10 border border-border flex items-center justify-center rounded-md mb-4 bg-background transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <Globe className="h-5 w-5" />
                  </div>
                  <CardTitle className="text-xl font-bold tracking-tight">Global Compliance</CardTitle>
                  <CardDescription className="text-muted-foreground leading-relaxed mt-2">
                    Automated KYC/AML reporting integrated directly into your workflows.
                  </CardDescription>
                </CardHeader>
              </Card>

              {/* Feature 4 - Large */}
              <Card className="md:col-span-2 shadow-none border-border group overflow-hidden">
                <CardHeader className="p-8 pb-0">
                  <div className="h-10 w-10 border border-border flex items-center justify-center rounded-md mb-4 bg-background transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <BarChart3 className="h-5 w-5" />
                  </div>
                  <CardTitle className="text-xl font-bold tracking-tight">Advanced Analytics & Reporting</CardTitle>
                  <CardDescription className="text-muted-foreground leading-relaxed mt-2">
                    Real-time risk management and attribution analysis for complex crypto portfolios.
                  </CardDescription>
                </CardHeader>
                <div className="p-8">
                   <div className="h-32 w-full border border-border bg-muted/20 rounded-md p-4">
                      <div className="flex justify-between items-center h-full">
                        <div className="flex flex-col gap-2">
                          <div className="h-2 w-32 bg-muted rounded"></div>
                          <div className="h-2 w-24 bg-muted rounded"></div>
                          <div className="h-2 w-28 bg-muted rounded"></div>
                        </div>
                        <div className="h-16 w-16 rounded-full border-4 border-primary border-t-transparent animate-spin-slow"></div>
                      </div>
                   </div>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* 5. METRICS / STATS */}
        <section className="py-24 border-b border-border bg-muted/30">
          <div className="container px-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 max-w-6xl mx-auto">
              {[
                { label: "Total Asset Flow", value: "$42.8B+", sub: "Last 12 months" },
                { label: "Market Access", value: "40+", sub: "Global Venues" },
                { label: "Execution Speed", value: "<1ms", sub: "Latency Benchmark" },
                { label: "Uptime SLA", value: "99.99%", sub: "Enterprise Grade" }
              ].map((stat, i) => (
                <div key={i} className="text-center md:text-left">
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-2">{stat.label}</p>
                  <p className="text-4xl font-black tracking-tighter mb-1">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 6. TESTIMONIALS */}
        <section className="py-24 md:py-32 border-b border-border bg-background">
          <div className="container px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-xs font-bold text-primary uppercase tracking-[0.3em] mb-12">Institutional Voices</h2>
              <blockquote className="text-2xl md:text-3xl font-medium tracking-tight leading-snug italic mb-8">
                &quot;Lumenis has fundamentally changed how we manage our digital asset treasury. Their execution speed and security protocols are unparalleled in the space.&quot;
              </blockquote>
              <div className="flex flex-col items-center">
                <div className="h-12 w-12 rounded-full bg-muted border border-border mb-4"></div>
                <p className="text-sm font-bold uppercase tracking-widest">Marcus Thorne</p>
                <p className="text-xs text-muted-foreground">CTO, Aetheris Capital</p>
              </div>
            </div>
          </div>
        </section>

        {/* 7. PRICING */}
        <section id="pricing" className="py-24 md:py-32 border-b border-border bg-muted/10">
          <div className="container px-4">
             <div className="text-center mb-16">
              <h2 className="text-xs font-bold text-primary uppercase tracking-[0.3em] mb-4">Pricing</h2>
              <h3 className="text-3xl md:text-4xl font-bold tracking-tight">Scale your operations.</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {[
                { 
                  name: "Professional", 
                  price: "$1,900", 
                  desc: "For small crypto funds and treasury teams.",
                  features: ["5 User Accounts", "Basic DMA Access", "MPC Hot Wallet", "Standard Support"]
                },
                { 
                  name: "Enterprise", 
                  price: "$5,500", 
                  desc: "For high-frequency trading and large funds.",
                  features: ["Unlimited Users", "Ultra-Low Latency Feed", "MPC Cold Storage", "24/7 Dedicated Support", "Custom API Access"],
                  popular: true
                },
                { 
                  name: "Custom", 
                  price: "Custom", 
                  desc: "Tailored infrastructure for exchanges.",
                  features: ["On-premise Deployment", "White-label Solutions", "Custom Compliance Logic", "Strategic Partnership"]
                }
              ].map((tier, i) => (
                <Card key={i} className={cn("shadow-none border-border p-8 flex flex-col h-full", tier.popular && "border-primary")}>
                  <div className="mb-8">
                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-4">{tier.name}</p>
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-bold tracking-tight">{tier.price}</span>
                      {tier.price !== "Custom" && <span className="text-sm text-muted-foreground">/mo</span>}
                    </div>
                    <p className="mt-4 text-sm text-muted-foreground leading-relaxed">{tier.desc}</p>
                  </div>
                  <div className="flex-1">
                    <ul className="space-y-4 mb-8">
                      {tier.features.map((feature, j) => (
                        <li key={j} className="flex items-center gap-2 text-sm">
                          <CheckCircle2 className="h-4 w-4 text-primary" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Button variant={tier.popular ? "default" : "outline"} className="w-full text-[10px] uppercase tracking-widest font-bold">
                    {tier.price === "Custom" ? "Contact Sales" : "Get Started"}
                  </Button>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* 8. FAQ */}
        <section className="py-24 md:py-32 border-b border-border bg-background">
          <div className="container px-4">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-xs font-bold text-primary uppercase tracking-[0.3em] mb-4">FAQ</h2>
                <h3 className="text-3xl font-bold tracking-tight">General Questions</h3>
              </div>
              <div className="space-y-8">
                {[
                  { q: "How fast is the onboarding process?", a: "Institutional onboarding typically takes 3-5 business days depending on the complexity of the KYB verification." },
                  { q: "Do you support custom API integrations?", a: "Yes, we provide REST and WebSocket APIs with comprehensive documentation for Enterprise and Custom plans." },
                  { q: "What digital assets are supported?", a: "We support BTC, ETH, and 150+ other liquid digital assets across global markets." }
                ].map((faq, i) => (
                  <div key={i} className="pb-8 border-b border-border">
                    <h4 className="text-lg font-bold tracking-tight mb-2">{faq.q}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 9. FOOTER */}
        <footer className="py-12 bg-background">
          <div className="container px-4">
            <div className="flex flex-col md:flex-row justify-between items-start gap-12 border-t border-border pt-12">
              <div className="max-w-xs">
                 <div className="flex items-center gap-2 mb-4">
                  <div className="h-6 w-6 bg-primary rounded-sm flex items-center justify-center">
                    <Zap className="h-4 w-4 text-primary-foreground fill-current" />
                  </div>
                  <span className="text-sm font-bold tracking-tighter uppercase">Lumenis</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  The elite infrastructure for institutional crypto assets. 
                  Regulated, secure, and built for performance.
                </p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-12">
                <div>
                  <h5 className="text-[10px] font-bold uppercase tracking-widest mb-4">Product</h5>
                  <ul className="space-y-2">
                    <li><Link href="#" className="text-xs text-muted-foreground hover:text-foreground">Features</Link></li>
                    <li><Link href="#" className="text-xs text-muted-foreground hover:text-foreground">Security</Link></li>
                    <li><Link href="#" className="text-xs text-muted-foreground hover:text-foreground">Compliance</Link></li>
                  </ul>
                </div>
                <div>
                  <h5 className="text-[10px] font-bold uppercase tracking-widest mb-4">Company</h5>
                  <ul className="space-y-2">
                    <li><Link href="#" className="text-xs text-muted-foreground hover:text-foreground">About</Link></li>
                    <li><Link href="#" className="text-xs text-muted-foreground hover:text-foreground">Careers</Link></li>
                    <li><Link href="#" className="text-xs text-muted-foreground hover:text-foreground">Contact</Link></li>
                  </ul>
                </div>
                <div>
                  <h5 className="text-[10px] font-bold uppercase tracking-widest mb-4">Legal</h5>
                  <ul className="space-y-2">
                    <li><Link href="#" className="text-xs text-muted-foreground hover:text-foreground">Privacy</Link></li>
                    <li><Link href="#" className="text-xs text-muted-foreground hover:text-foreground">Terms</Link></li>
                    <li><Link href="#" className="text-xs text-muted-foreground hover:text-foreground">SLA</Link></li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-[10px] text-muted-foreground uppercase tracking-widest">© 2026 LUMENIS TECHNOLOGIES. ALL RIGHTS RESERVED.</p>
              <div className="flex gap-6">
                 {/* Social icons placeholders */}
                 <div className="h-4 w-4 bg-muted-foreground/20 rounded-full"></div>
                 <div className="h-4 w-4 bg-muted-foreground/20 rounded-full"></div>
                 <div className="h-4 w-4 bg-muted-foreground/20 rounded-full"></div>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
