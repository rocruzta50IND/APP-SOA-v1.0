"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  ArrowRight, 
  BarChart3, 
  Target, 
  Zap, 
  Layers, 
  Users, 
  Globe, 
  CheckCircle2, 
  ChevronRight,
  TrendingUp,
  Mail,
  PieChart
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { PublicHeader } from "@/components/ui/PublicHeader";
import { Footer } from "@/components/ui/Footer";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.3, ease: "easeOut" }
};

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/10">
      <PublicHeader />
      
      <main className="pt-16">
        {/* --- HERO SECTION --- */}
        <section className="relative py-24 md:py-32 overflow-hidden">
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <motion.div 
              className="max-w-4xl mx-auto text-center space-y-8"
              initial="initial"
              animate="animate"
              variants={stagger}
            >
              <motion.div variants={fadeIn}>
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-muted border border-border text-[10px] font-black uppercase tracking-widest text-primary mb-4">
                  <Zap className="w-3 h-3 fill-primary" />
                  V4.0 Out Now
                </span>
                <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.9] uppercase italic">
                  Convert Leads <br />
                  <span className="text-muted-foreground/50">Into Revenue</span> <br />
                  With Precision.
                </h1>
              </motion.div>

              <motion.p 
                className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed font-medium"
                variants={fadeIn}
              >
                The operating system for high-ticket Marketing & CRM teams. 
                Surgical lead scoring, automated pipelines, and ROI-driven analytics in one sharp interface.
              </motion.p>

              <motion.div 
                className="flex flex-col sm:flex-row items-center justify-center gap-4"
                variants={fadeIn}
              >
                <Button size="lg" className="rounded-md w-full sm:w-auto h-14 px-8 text-base font-bold uppercase tracking-widest" asChild>
                  <Link href="/register">
                    Start Free Trial <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="rounded-md w-full sm:w-auto h-14 px-8 text-base font-bold uppercase tracking-widest">
                  Watch Demo
                </Button>
              </motion.div>
            </motion.div>
          </div>

          {/* Hero Visual */}
          <motion.div 
            className="mt-16 container mx-auto px-4 md:px-6"
            initial={{ opacity: 0, scale: 0.95, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5, ease: "easeOut" }}
          >
            <div className="relative rounded-xl border border-border bg-muted/30 p-2 overflow-hidden group">
              <div className="rounded-lg border border-border bg-background shadow-2xl overflow-hidden aspect-[16/9] relative">
                <div className="absolute inset-0 flex items-center justify-center bg-muted/50">
                  <div className="grid grid-cols-12 gap-4 w-full h-full p-8">
                    <div className="col-span-8 flex flex-col gap-4">
                      <div className="h-12 w-1/3 bg-muted rounded-md animate-pulse" />
                      <div className="flex-1 bg-muted/30 rounded-md border border-border/50 p-6">
                        <div className="h-full w-full flex items-end gap-2">
                          {[40, 70, 45, 90, 65, 80, 50, 85, 95, 60].map((h, i) => (
                            <div key={i} className="flex-1 bg-primary/20 rounded-t-sm border-t border-x border-primary/30" style={{ height: `${h}%` }} />
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="col-span-4 flex flex-col gap-4">
                      <div className="flex-1 bg-muted/20 rounded-md border border-border/50" />
                      <div className="h-1/3 bg-primary rounded-md p-4 text-primary-foreground flex flex-col justify-end">
                        <div className="text-[10px] font-bold uppercase tracking-widest opacity-80">Conversion Rate</div>
                        <div className="text-3xl font-black italic">+12.4%</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* --- SOCIAL PROOF --- */}
        <section className="py-12 border-y border-border bg-muted/20">
          <div className="container mx-auto px-4 md:px-6">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-center text-muted-foreground mb-8">
              TRUSTED BY ENTERPRISE CRM TEAMS
            </p>
            <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
              {["Velocity", "Nexus", "Apex", "Flow", "Stripe"].map((brand) => (
                <span key={brand} className="text-2xl font-black italic tracking-tighter uppercase">{brand}</span>
              ))}
            </div>
          </div>
        </section>

        {/* --- BENTO FEATURES --- */}
        <section id="campaigns" className="py-24 bg-background">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16">
              <div className="max-w-2xl">
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">CORE CAPABILITIES</span>
                <h2 className="text-4xl md:text-5xl font-black tracking-tighter mt-4 uppercase italic">
                  Engineered for <br />
                  High-Performance Teams.
                </h2>
              </div>
              <p className="text-muted-foreground font-medium max-w-sm">
                A surgical set of tools designed to remove friction from your marketing funnel.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {/* Feature 1: Lead Scoring */}
              <Card className="md:col-span-2 lg:col-span-3 min-h-[300px] flex flex-col group overflow-hidden">
                <CardContent className="p-8 flex-1 flex flex-col">
                  <div className="w-12 h-12 bg-primary flex items-center justify-center rounded-md mb-6 group-hover:scale-110 transition-transform">
                    <Target className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <h3 className="text-2xl font-black italic uppercase tracking-tighter mb-2">Lead Scoring AI</h3>
                  <p className="text-muted-foreground text-sm font-medium leading-relaxed mb-8">
                    Automatically prioritize leads based on behavior, firmographics, and engagement history. Focus on what closes.
                  </p>
                  <div className="mt-auto pt-4 border-t border-border flex justify-between items-center">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-primary">Priority Algorithm v2</span>
                    <TrendingUp className="w-4 h-4 text-primary" />
                  </div>
                </CardContent>
              </Card>

              {/* Feature 2: Multi-channel */}
              <Card className="md:col-span-2 lg:col-span-3 min-h-[300px] flex flex-col group overflow-hidden bg-muted/30 border-dashed">
                <CardContent className="p-8 flex-1 flex flex-col">
                  <div className="w-12 h-12 bg-background border border-border flex items-center justify-center rounded-md mb-6 group-hover:rotate-12 transition-transform">
                    <Mail className="w-6 h-6 text-foreground" />
                  </div>
                  <h3 className="text-2xl font-black italic uppercase tracking-tighter mb-2">Omnichannel Flow</h3>
                  <p className="text-muted-foreground text-sm font-medium leading-relaxed mb-8">
                    Sync your messaging across Email, LinkedIn, and SMS. One unified timeline for every customer touchpoint.
                  </p>
                  <div className="mt-auto grid grid-cols-4 gap-2">
                    {[1,2,3,4].map(i => <div key={i} className="h-1.5 bg-border rounded-full" />)}
                  </div>
                </CardContent>
              </Card>

              {/* Feature 3: Analytics */}
              <Card className="md:col-span-2 lg:col-span-2 group">
                <CardContent className="p-8">
                  <BarChart3 className="w-8 h-8 text-primary mb-4" />
                  <h4 className="text-lg font-bold uppercase tracking-tight mb-2 italic">Real-time ROI</h4>
                  <p className="text-xs text-muted-foreground font-medium leading-relaxed">
                    Track every dollar spent vs every dollar earned with surgical precision.
                  </p>
                </CardContent>
              </Card>

              {/* Feature 4: Pipeline */}
              <Card className="md:col-span-2 lg:col-span-2 group">
                <CardContent className="p-8">
                  <Layers className="w-8 h-8 text-primary mb-4" />
                  <h4 className="text-lg font-bold uppercase tracking-tight mb-2 italic">Visual Pipeline</h4>
                  <p className="text-xs text-muted-foreground font-medium leading-relaxed">
                    Drag-and-drop management for high-ticket sales cycles and long-term nurtures.
                  </p>
                </CardContent>
              </Card>

              {/* Feature 5: CRM Sync */}
              <Card className="md:col-span-4 lg:col-span-2 group bg-primary text-primary-foreground">
                <CardContent className="p-8">
                  <Globe className="w-8 h-8 text-primary-foreground mb-4" />
                  <h4 className="text-lg font-bold uppercase tracking-tight mb-2 italic">Global Sync</h4>
                  <p className="text-xs text-primary-foreground/70 font-medium leading-relaxed">
                    Native integrations with Salesforce, HubSpot, and Pipedrive. zero-latency data sync.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* --- CAMPAIGN PREVIEW (DENSITY) --- */}
        <section id="pipeline" className="py-24 bg-muted/20 border-y border-border">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">DATA VISUALIZATION</span>
                  <h2 className="text-4xl md:text-5xl font-black tracking-tighter mt-4 uppercase italic leading-none">
                    Analytics That <br />
                    Drive Action.
                  </h2>
                </div>
                
                <p className="text-lg text-muted-foreground font-medium leading-relaxed">
                  Stop guessing. Our dashboard gives you a panoramic view of your entire marketing ecosystem, highlighting bottlenecks and identifying scale opportunities.
                </p>

                <ul className="space-y-4">
                  {[
                    "Customizable Funnel Visuals",
                    "A/B Testing Revenue Attribution",
                    "Cohort Analysis for Churn Prevention",
                    "Automated Weekly Performance Reports"
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-sm font-bold uppercase tracking-tight">
                      <CheckCircle2 className="w-5 h-5 text-primary" />
                      {item}
                    </li>
                  ))}
                </ul>

                <Button variant="outline" className="h-12 px-6 rounded-md font-bold uppercase tracking-widest">
                  Explore Analytics Suite
                </Button>
              </div>

              <div className="relative">
                <div className="absolute -inset-4 bg-primary/5 blur-3xl rounded-full" />
                <Card className="relative border-border shadow-2xl overflow-hidden">
                  <div className="bg-muted/50 border-b border-border p-4 flex items-center justify-between">
                    <div className="flex gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-border" />
                      <div className="w-2.5 h-2.5 rounded-full bg-border" />
                      <div className="w-2.5 h-2.5 rounded-full bg-border" />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Campaign_Performance_Report.xls</span>
                  </div>
                  <CardContent className="p-0">
                    <div className="p-6 border-b border-border flex items-center justify-between">
                      <div>
                        <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Active Leads</div>
                        <div className="text-2xl font-black italic tracking-tighter">14,892</div>
                      </div>
                      <div className="text-right">
                        <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Conversion</div>
                        <div className="text-2xl font-black italic tracking-tighter text-primary">+8.2%</div>
                      </div>
                    </div>
                    <div className="h-64 w-full p-8 flex items-end gap-3">
                      {[60, 40, 80, 50, 70, 90, 60, 45, 85, 55, 75, 95].map((h, i) => (
                        <div 
                          key={i} 
                          className={cn(
                            "flex-1 rounded-t-sm transition-all duration-500",
                            i === 11 ? "bg-primary" : "bg-muted hover:bg-primary/50"
                          )} 
                          style={{ height: `${h}%` }} 
                        />
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* --- PRICING --- */}
        <section id="pricing" className="py-24 bg-background">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto mb-20">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">PRICING PLANS</span>
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter mt-4 uppercase italic">
                Scalable Pricing for <br />
                Ambitious Teams.
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  name: "Growth",
                  price: "$99",
                  desc: "Perfect for startups and small agencies.",
                  features: ["Up to 5,000 Leads", "Basic Analytics", "Email Campaigns", "Standard Support"]
                },
                {
                  name: "Pro",
                  price: "$249",
                  desc: "The standard for professional marketing teams.",
                  features: ["Unlimited Leads", "Advanced AI Scoring", "Multi-channel Flow", "Priority Support", "CRM Sync"],
                  popular: true
                },
                {
                  name: "Enterprise",
                  price: "Custom",
                  desc: "Surgical precision for large organizations.",
                  features: ["Custom Integrations", "Dedicated Manager", "SLA Guarantee", "White-label Options", "On-premise Support"]
                }
              ].map((plan) => (
                <Card key={plan.name} className={cn(
                  "relative flex flex-col p-8 transition-all duration-300 hover:-translate-y-2",
                  plan.popular ? "border-primary border-2 shadow-xl ring-4 ring-primary/5" : "border-border"
                )}>
                  {plan.popular && (
                    <div className="absolute top-0 right-8 -translate-y-1/2 bg-primary text-primary-foreground px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                      Most Popular
                    </div>
                  )}
                  <div className="mb-8">
                    <h3 className="text-xl font-black italic uppercase tracking-tighter mb-2">{plan.name}</h3>
                    <div className="flex items-baseline gap-1 mb-4">
                      <span className="text-4xl font-black tracking-tighter italic">{plan.price}</span>
                      {plan.price !== "Custom" && <span className="text-muted-foreground font-medium text-sm">/month</span>}
                    </div>
                    <p className="text-muted-foreground text-sm font-medium leading-relaxed">{plan.desc}</p>
                  </div>
                  <ul className="space-y-4 mb-8 flex-1">
                    {plan.features.map(f => (
                      <li key={f} className="flex items-center gap-2 text-xs font-bold uppercase tracking-tight">
                        <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Button variant={plan.popular ? "default" : "outline"} className="w-full h-12 rounded-md font-black uppercase tracking-widest italic">
                    {plan.price === "Custom" ? "Contact Sales" : "Start Free Trial"}
                  </Button>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* --- FAQ --- */}
        <section className="py-24 bg-muted/10 border-t border-border">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
              <div className="lg:col-span-4">
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">SUPPORT</span>
                <h2 className="text-4xl font-black tracking-tighter mt-4 uppercase italic">FAQ</h2>
                <p className="text-muted-foreground font-medium mt-4 leading-relaxed">
                  Everything you need to know about the FlowSprint platform and our CRM integration capabilities.
                </p>
              </div>
              <div className="lg:col-span-8 space-y-6">
                {[
                  {
                    q: "How does the AI lead scoring work?",
                    a: "Our proprietary algorithm analyzes over 40 data points including engagement frequency, firmographic data, and historical conversion patterns to assign a surgical score to each lead."
                  },
                  {
                    q: "Can I migrate my data from HubSpot?",
                    a: "Yes, we offer a 1-click migration tool for major CRMs including HubSpot, Salesforce, and Pipedrive. Our team can also assist with custom migrations."
                  },
                  {
                    q: "Is there a limit on multi-channel messages?",
                    a: "Growth plans have soft limits, while Pro and Enterprise plans offer unlimited messaging across all connected channels."
                  }
                ].map((item, i) => (
                  <Card key={i} className="bg-background">
                    <CardContent className="p-6">
                      <h4 className="text-sm font-black uppercase tracking-widest mb-3">{item.q}</h4>
                      <p className="text-sm text-muted-foreground font-medium leading-relaxed">{item.a}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* --- CTA --- */}
        <section className="py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="bg-primary text-primary-foreground rounded-xl p-12 md:p-24 text-center relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="relative z-10 space-y-8 max-w-3xl mx-auto">
                <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase italic leading-none">
                  Ready to Optimize <br />
                  Your Funnel?
                </h2>
                <p className="text-lg md:text-xl text-primary-foreground/80 font-medium max-w-xl mx-auto italic">
                  Join 500+ high-performance marketing teams using FlowSprint to drive growth.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                  <Button size="lg" className="bg-white text-black hover:bg-white/90 rounded-md w-full sm:w-auto h-14 px-8 text-base font-bold uppercase tracking-widest">
                    Start Your Trial
                  </Button>
                  <Button size="lg" variant="outline" className="border-white/20 hover:bg-white/10 text-white rounded-md w-full sm:w-auto h-14 px-8 text-base font-bold uppercase tracking-widest">
                    Talk to an Expert
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
