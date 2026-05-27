"use client";

import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { 
  ArrowRight, 
  Check, 
  ChevronDown, 
  Globe, 
  Layers, 
  LayoutDashboard, 
  LineChart, 
  ShieldCheck, 
  Zap 
} from "lucide-react";
import Link from "next/link";

const spring = { type: "spring" as const, stiffness: 400, damping: 30 };

export default function LandingPage() {
  return (
    <div className="relative min-h-screen bg-background text-foreground selection:bg-primary/30">
      {/* Background Orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/10 blur-[120px] rounded-full animate-pulse" style={{ animationDelay: "2s" }} />
      </div>

      <Navbar />

      <main className="relative pt-32 pb-20 px-4 md:px-8">
        <div className="max-w-7xl mx-auto space-y-32">
          
          {/* Section 1: Hero */}
          <section className="flex flex-col items-center text-center space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={spring}
            >
              <Badge className="px-4 py-1.5 mb-6 bg-white/5 border-white/10 text-primary uppercase tracking-widest">
                The Future of Enterprise Commerce
              </Badge>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-white/50">
                NexusMarket Pro <br /> Scaling Beyond Limits
              </h1>
              <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                The all-in-one OS for high-ticket B2B operations. Automate inventory, unify global orders, and unlock predictive analytics in a single, glass-polished interface.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ ...spring, delay: 0.1 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link href="/register">
                <Button size="lg" className="group">
                  Start Your Transformation
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="#features">
                <Button variant="outline" size="lg">Explore Platform</Button>
              </Link>
            </motion.div>

            {/* Hero Dashboard Preview */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...spring, delay: 0.2 }}
              className="mt-16 w-full max-w-5xl aspect-video rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden shadow-2xl relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/80 pointer-events-none" />
              <div className="p-4 border-b border-white/10 flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/50" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                  <div className="w-3 h-3 rounded-full bg-green-500/50" />
                </div>
                <div className="w-1/3 h-6 bg-white/5 rounded-md mx-auto" />
              </div>
              <div className="p-8 grid grid-cols-12 gap-6 h-full">
                <div className="col-span-3 space-y-4">
                  <div className="h-32 bg-primary/10 rounded-2xl border border-primary/20 animate-pulse" />
                  <div className="h-48 bg-white/5 rounded-2xl border border-white/10" />
                </div>
                <div className="col-span-9 space-y-6">
                  <div className="h-12 bg-white/5 rounded-xl border border-white/10" />
                  <div className="grid grid-cols-3 gap-6">
                    <div className="h-32 bg-white/5 rounded-2xl border border-white/10" />
                    <div className="h-32 bg-white/5 rounded-2xl border border-white/10" />
                    <div className="h-32 bg-white/5 rounded-2xl border border-white/10" />
                  </div>
                  <div className="h-64 bg-white/5 rounded-2xl border border-white/10" />
                </div>
              </div>
            </motion.div>
          </section>

          {/* Section 2: Social Proof */}
          <section className="text-center py-20">
            <p className="text-sm font-medium text-muted-foreground uppercase tracking-widest mb-12">
              Trusted by Industry Giants
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-12 items-center opacity-50 grayscale hover:grayscale-0 transition-all">
              {['VORTEX', 'AETHER', 'NEXUS', 'QUANTUM', 'ZENITH', 'LUMINA'].map((logo) => (
                <span key={logo} className="text-2xl font-black text-white/50">{logo}</span>
              ))}
            </div>
          </section>

          {/* Section 3: Bento Features */}
          <section id="features" className="space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tighter">Engineered for Velocity</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">Every component is designed to minimize friction and maximize intelligence.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[240px]">
              <Card className="md:col-span-8 group">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <LineChart className="w-5 h-5 text-primary" />
                    Real-time Predictive Analytics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Anticipate market shifts with our AI-driven engine. Forecast demand with 98% accuracy across 150+ metrics.</p>
                  <div className="mt-8 h-32 w-full bg-gradient-to-t from-primary/20 to-transparent rounded-xl border-b border-primary/50 relative overflow-hidden">
                    {/* Simplified Chart Visual */}
                    <div className="absolute inset-0 flex items-end gap-1 px-4">
                      {[40, 70, 45, 90, 65, 80, 50, 95, 75, 85].map((h, i) => (
                        <div key={i} className="flex-1 bg-primary/40 rounded-t-sm" style={{ height: `${h}%` }} />
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="md:col-span-4 bg-primary group border-none">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <Zap className="w-5 h-5 text-white" />
                    Hyper-Speed Execution
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-white/80">
                  Global order processing in sub-100ms. No more waiting for sync.
                  <div className="mt-12 flex justify-center">
                    <Zap className="w-24 h-24 text-white/20 animate-bounce" />
                  </div>
                </CardContent>
              </Card>

              <Card className="md:col-span-4">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="w-5 h-5 text-primary" />
                    Global Operations
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground">
                  Multi-currency, multi-region tax compliance, and 24/7 global support baked into the core.
                </CardContent>
              </Card>

              <Card className="md:col-span-8 overflow-hidden">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-primary" />
                    Enterprise-Grade Security
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <p className="text-muted-foreground">Military-grade encryption for all transaction data and SOC2 Type II compliance.</p>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline">AES-256</Badge>
                      <Badge variant="outline">2FA</Badge>
                      <Badge variant="outline">Audit Logs</Badge>
                    </div>
                  </div>
                  <div className="bg-white/5 rounded-xl border border-white/10 p-4 flex items-center justify-center">
                    <ShieldCheck className="w-16 h-16 text-primary/40" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Section 4: Detailed Solutions */}
          <section id="solutions" className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
              <Badge variant="outline" className="text-primary border-primary/20">Enterprise Ready</Badge>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tighter">The Operating System for High-Ticket E-commerce</h2>
              <div className="space-y-6">
                {[
                  { title: "Unified Inventory", desc: "Sync physical and digital assets across every channel in real-time.", icon: Layers },
                  { title: "Smart Order Routing", desc: "Automatically route orders to the nearest fulfillment center to reduce costs.", icon: ArrowRight },
                  { title: "Custom Workflow Builder", desc: "Design your own internal processes with our visual drag-and-drop tool.", icon: LayoutDashboard }
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-4 p-4 rounded-2xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/10 group">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                      <item.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">{item.title}</h4>
                      <p className="text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative aspect-square">
              <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full" />
              <div className="relative h-full bg-white/5 backdrop-blur-md border border-white/10 rounded-[40px] p-8 shadow-2xl flex flex-col gap-6 overflow-hidden group">
                 <div className="h-8 w-1/2 bg-white/10 rounded-full" />
                 <div className="grid grid-cols-2 gap-4">
                    <div className="h-40 bg-white/5 rounded-2xl border border-white/10" />
                    <div className="h-40 bg-white/5 rounded-2xl border border-white/10" />
                 </div>
                 <div className="flex-1 bg-white/5 rounded-2xl border border-white/10 p-6">
                    <div className="space-y-3">
                      <div className="h-4 w-full bg-white/10 rounded-full" />
                      <div className="h-4 w-3/4 bg-white/10 rounded-full" />
                      <div className="h-4 w-5/6 bg-white/10 rounded-full" />
                    </div>
                 </div>
              </div>
            </div>
          </section>

          {/* Section 5: Pricing */}
          <section id="pricing" className="space-y-16">
            <div className="text-center space-y-4">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tighter">Simple, Scale-Ready Pricing</h2>
              <p className="text-muted-foreground">Built to grow with your enterprise. No hidden fees.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { name: "Starter", price: "$499", desc: "For emerging high-ticket brands", features: ["Up to 500 orders/mo", "Basic Analytics", "Standard Support"] },
                { name: "Enterprise", price: "$1,999", desc: "Our most popular choice", features: ["Unlimited orders", "Predictive AI Engine", "24/7 Priority Support", "Custom Workflows"], popular: true },
                { name: "Custom", price: "Contact", desc: "For global conglomerates", features: ["Dedicated Infrastructure", "Custom SLA", "On-site Training", "Personal Success Manager"] }
              ].map((tier, idx) => (
                <Card key={idx} className={cn("relative flex flex-col", tier.popular && "border-primary/50 bg-primary/5 shadow-[0_0_40px_rgba(79,70,229,0.1)]")}>
                  {tier.popular && (
                    <div className="absolute top-0 right-8 -translate-y-1/2 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full">
                      MOST POPULAR
                    </div>
                  )}
                  <CardHeader className="p-8">
                    <CardTitle className="text-lg font-medium text-muted-foreground">{tier.name}</CardTitle>
                    <div className="mt-4 flex items-baseline gap-1">
                      <span className="text-5xl font-bold text-white">{tier.price}</span>
                      {tier.price !== "Contact" && <span className="text-muted-foreground">/mo</span>}
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">{tier.desc}</p>
                  </CardHeader>
                  <CardContent className="p-8 pt-0 flex-1">
                    <div className="space-y-4">
                      {tier.features.map((f, i) => (
                        <div key={i} className="flex gap-3 text-sm">
                          <Check className="w-4 h-4 text-primary shrink-0" />
                          <span className="text-white/80">{f}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <div className="p-8 pt-0">
                    <Button variant={tier.popular ? "primary" : "outline"} className="w-full">
                      {tier.price === "Contact" ? "Talk to Sales" : "Get Started"}
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </section>

          {/* Section 6: FAQ */}
          <section id="faq" className="max-w-3xl mx-auto space-y-12">
            <h2 className="text-3xl font-bold tracking-tighter text-center">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {[
                { q: "How fast can we migrate from our existing platform?", a: "Most enterprises migrate within 14 business days using our automated ingestion engine." },
                { q: "Do you support custom ERP integrations?", a: "Yes, our API-first architecture allows for seamless integration with SAP, Oracle, and Microsoft Dynamics." },
                { q: "What kind of security compliance do you have?", a: "We are SOC2 Type II, GDPR, and CCPA compliant. All data is encrypted at rest and in transit." }
              ].map((faq, idx) => (
                <Card key={idx} className="cursor-pointer group">
                  <CardHeader className="p-6">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base font-semibold">{faq.q}</CardTitle>
                      <ChevronDown className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                  </CardHeader>
                  <CardContent className="p-6 pt-0 hidden group-hover:block">
                    <p className="text-muted-foreground">{faq.a}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Section 7: Footer */}
          <footer className="pt-20 border-t border-white/10 space-y-20">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12">
              <div className="col-span-2 lg:col-span-2 space-y-6">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-primary rounded-lg shadow-[0_0_15px_rgba(79,70,229,0.5)]" />
                  <span className="text-xl font-bold text-white tracking-tighter">NexusMarket Pro</span>
                </div>
                <p className="text-muted-foreground max-w-xs text-sm">
                  The world's most advanced operating system for high-ticket e-commerce enterprises.
                </p>
              </div>
              <div className="space-y-4">
                <h4 className="font-bold text-white">Platform</h4>
                <div className="flex flex-col gap-2 text-sm text-muted-foreground">
                  <Link href="#" className="hover:text-primary transition-colors">Analytics</Link>
                  <Link href="#" className="hover:text-primary transition-colors">Inventory</Link>
                  <Link href="#" className="hover:text-primary transition-colors">Security</Link>
                </div>
              </div>
              <div className="space-y-4">
                <h4 className="font-bold text-white">Company</h4>
                <div className="flex flex-col gap-2 text-sm text-muted-foreground">
                  <Link href="#" className="hover:text-primary transition-colors">About Us</Link>
                  <Link href="#" className="hover:text-primary transition-colors">Careers</Link>
                  <Link href="#" className="hover:text-primary transition-colors">Contact</Link>
                </div>
              </div>
              <div className="space-y-4">
                <h4 className="font-bold text-white">Legal</h4>
                <div className="flex flex-col gap-2 text-sm text-muted-foreground">
                  <Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link>
                  <Link href="#" className="hover:text-primary transition-colors">Terms of Service</Link>
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-muted-foreground pb-10">
              <p>© 2026 NexusMarket Pro. All rights reserved.</p>
              <div className="flex gap-8">
                <Link href="#" className="hover:text-white transition-colors">Twitter</Link>
                <Link href="#" className="hover:text-white transition-colors">LinkedIn</Link>
                <Link href="#" className="hover:text-white transition-colors">GitHub</Link>
              </div>
            </div>
          </footer>
        </div>
      </main>
    </div>
  );
}
