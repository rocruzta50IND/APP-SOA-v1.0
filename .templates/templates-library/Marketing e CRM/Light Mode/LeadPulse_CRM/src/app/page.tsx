"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  ArrowRight, 
  BarChart3, 
  Target, 
  Users, 
  Zap, 
  Shield, 
  ChevronDown, 
  CheckCircle2,
  Globe,
  MessageSquare,
  TrendingUp,
  Mail
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { PublicHeader } from "@/components/ui/PublicHeader";
import { Footer } from "@/components/ui/Footer";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar
} from "recharts";

const transition = { type: "spring", stiffness: 400, damping: 30 } as const;

// Mock Data for Recharts
const performanceData = [
  { name: "Jan", leads: 400, revenue: 2400 },
  { name: "Feb", leads: 300, revenue: 1398 },
  { name: "Mar", leads: 900, revenue: 9800 },
  { name: "Apr", leads: 1480, revenue: 12000 },
  { name: "May", leads: 1890, revenue: 14800 },
  { name: "Jun", leads: 2390, revenue: 18000 },
  { name: "Jul", leads: 3490, revenue: 21000 },
];

const conversionData = [
  { name: "AdWords", value: 45 },
  { name: "LinkedIn", value: 32 },
  { name: "Organic", value: 58 },
  { name: "Referral", value: 24 },
  { name: "Email", value: 41 },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <PublicHeader />

      <main>
        {/* --- HERO SECTION --- */}
        <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-4 overflow-hidden">
          {/* Ambient Glows */}
          <div className="absolute top-1/4 -left-20 w-[500px] h-[500px] bg-primary/20 blur-[120px] rounded-full -z-10 animate-pulse" />
          <div className="absolute bottom-1/4 -right-20 w-[400px] h-[400px] bg-blue-500/10 blur-[100px] rounded-full -z-10" />

          <div className="container mx-auto text-center max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={transition}
            >
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-primary mb-6">
                <Zap className="w-3.5 h-3.5 fill-current" />
                Next-Gen Marketing Intelligence
              </span>
              <h1 className="text-5xl md:text-8xl font-bold tracking-tighter leading-[1.1] mb-8 bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-white/40">
                Turn Every Lead Into <br /> 
                <span className="text-primary italic">High-Ticket</span> Revenue
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
                LeadPulse is the enterprise CRM built for the modern marketing stack. 
                Automate your funnel, predict conversion rates, and scale your B2B operations with surgical precision.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button size="lg" className="w-full sm:w-auto gap-2 group">
                  Start Your Free Trial
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  Book a Demo
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* --- SOCIAL PROOF --- */}
        <section className="py-12 border-y border-white/5 bg-white/[0.02]">
          <div className="container mx-auto px-4">
            <p className="text-center text-xs font-bold uppercase tracking-widest text-muted-foreground mb-8">
              Trusted by high-growth marketing teams
            </p>
            <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
              {/* Fake Logos using SVGs */}
              {["Nexgen", "Vortex", "Aura", "Zenith", "Quantum"].map((name) => (
                <div key={name} className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-white/10" />
                  <span className="font-bold tracking-tighter text-xl">{name}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- BENTO FEATURES --- */}
        <section id="features" className="py-24 px-4 bg-background">
          <div className="container mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-20">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-4">
                Engineered for Sales Velocity
              </h2>
              <p className="text-muted-foreground text-lg">
                Stop losing leads in the cracks. Our comprehensive suite gives you 360° visibility into your marketing performance.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Feature 1 - Big */}
              <motion.div 
                whileHover={{ scale: 1.01 }}
                transition={transition}
                className="md:col-span-2 row-span-2 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-8 flex flex-col justify-between overflow-hidden relative group"
              >
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[80px] rounded-full -mr-32 -mt-32 group-hover:bg-primary/20 transition-colors" />
                <div>
                  <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center text-primary mb-6">
                    <Target className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Smart Lead Scoring</h3>
                  <p className="text-muted-foreground max-w-sm">
                    Our AI models analyze 50+ signals to identify which leads are ready to buy, increasing your sales efficiency by up to 40%.
                  </p>
                </div>
                <div className="mt-12 p-4 rounded-xl bg-white/5 border border-white/10">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono text-muted-foreground uppercase">Top Prospects</span>
                    <span className="text-xs font-mono text-primary">Live Data</span>
                  </div>
                  <div className="space-y-2">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="h-8 rounded-lg bg-white/5 border border-white/5 animate-pulse" />
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Feature 2 */}
              <Card className="p-8 flex flex-col gap-4">
                <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center text-blue-400">
                  <BarChart3 className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold">Real-time Analytics</h3>
                <p className="text-sm text-muted-foreground">
                  Track every click, conversion, and revenue dollar as it happens with zero latency.
                </p>
              </Card>

              {/* Feature 3 */}
              <Card className="p-8 flex flex-col gap-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <Zap className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold">Automated Funnels</h3>
                <p className="text-sm text-muted-foreground">
                  Build complex multi-channel workflows in minutes with our visual drag-and-drop builder.
                </p>
              </Card>

              {/* Feature 4 - Medium */}
              <Card className="md:col-span-3 p-8 flex flex-col md:flex-row items-center gap-8 overflow-hidden relative">
                 <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-4">Enterprise-Grade Security</h3>
                    <p className="text-muted-foreground">
                      SOC2 Type II, GDPR, and CCPA compliant out of the box. Your customer data is encrypted at rest and in transit with bank-level protocols.
                    </p>
                    <Button variant="link" className="px-0 mt-4">
                      View Trust Center <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                 </div>
                 <div className="flex-1 flex justify-center">
                    <Shield className="w-32 h-32 text-primary opacity-20" />
                 </div>
              </Card>
            </div>
          </div>
        </section>

        {/* --- PERFORMANCE DASHBOARD PREVIEW --- */}
        <section className="py-24 px-4 relative overflow-hidden">
          <div className="absolute inset-0 bg-primary/5 -skew-y-3 origin-right -z-10" />
          
          <div className="container mx-auto">
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div>
                   <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-8 leading-tight">
                      Visibility into <br />
                      <span className="italic">Every Interaction</span>
                   </h2>
                   <div className="space-y-6">
                      {[
                        { title: "Funnel Conversion", text: "Track the journey from first touch to closed-won.", icon: TrendingUp },
                        { title: "Multi-touch Attribution", text: "Understand which channels actually drive revenue.", icon: Globe },
                        { title: "Team Performance", text: "Monitor sales activity and quota attainment.", icon: Users },
                      ].map((item, idx) => (
                        <div key={idx} className="flex gap-4">
                           <div className="mt-1 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                              <item.icon className="w-3.5 h-3.5 text-primary" />
                           </div>
                           <div>
                              <h4 className="font-bold">{item.title}</h4>
                              <p className="text-muted-foreground text-sm">{item.text}</p>
                           </div>
                        </div>
                      ))}
                   </div>
                </div>

                <motion.div 
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={transition}
                  className="rounded-3xl border border-white/10 bg-background/50 backdrop-blur-xl p-8 shadow-2xl relative"
                >
                   <div className="absolute -top-4 -left-4 w-24 h-24 bg-primary/30 blur-3xl rounded-full" />
                   
                   <div className="mb-8">
                      <h4 className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-1">Live Revenue Growth</h4>
                      <p className="text-3xl font-bold font-mono tracking-tighter">$2,482,194.00</p>
                   </div>

                   <div className="h-[300px] w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={performanceData}>
                          <defs>
                            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                              <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ffffff10" />
                          <XAxis 
                            dataKey="name" 
                            stroke="#ffffff40" 
                            fontSize={12} 
                            tickLine={false} 
                            axisLine={false}
                            fontFamily="var(--font-mono)"
                          />
                          <YAxis hide />
                          <Tooltip 
                            contentStyle={{ backgroundColor: "#000", border: "1px solid #ffffff20", borderRadius: "12px" }}
                            itemStyle={{ color: "hsl(var(--primary))" }}
                          />
                          <Area 
                            type="monotone" 
                            dataKey="revenue" 
                            stroke="hsl(var(--primary))" 
                            strokeWidth={3}
                            fillOpacity={1} 
                            fill="url(#colorRevenue)" 
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                   </div>
                </motion.div>
             </div>
          </div>
        </section>

        {/* --- PRICING --- */}
        <section id="pricing" className="py-24 px-4">
          <div className="container mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-20">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-4">Transparent Enterprise Pricing</h2>
              <p className="text-muted-foreground">Start small, scale infinitely. No hidden fees, no per-seat billing traps.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { name: "Starter", price: "$99", desc: "Perfect for high-growth startups.", features: ["Up to 5k Leads", "Basic Funnels", "Core Analytics"] },
                { name: "Pro", price: "$299", desc: "The standard for modern sales teams.", features: ["Unlimited Leads", "Advanced Attribution", "Custom Workflows", "Priority Support"], popular: true },
                { name: "Enterprise", price: "Custom", desc: "For global operations requiring custom scale.", features: ["White-labeling", "Dedicated Success Manager", "SLA Guarantee", "On-premise Options"] },
              ].map((plan, i) => (
                <div 
                  key={i}
                  className={cn(
                    "rounded-3xl border p-8 flex flex-col relative overflow-hidden transition-all duration-300",
                    plan.popular ? "border-primary bg-primary/5 scale-105 shadow-[0_0_40px_rgba(79,70,229,0.1)]" : "border-white/10 bg-white/5"
                  )}
                >
                  {plan.popular && (
                    <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-[10px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-bl-xl">
                      Most Popular
                    </div>
                  )}
                  <div className="mb-8">
                    <h3 className="text-lg font-bold mb-2">{plan.name}</h3>
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-bold tracking-tighter">{plan.price}</span>
                      {plan.price !== "Custom" && <span className="text-muted-foreground text-sm">/month</span>}
                    </div>
                    <p className="text-sm text-muted-foreground mt-4">{plan.desc}</p>
                  </div>
                  <ul className="space-y-4 mb-10 flex-1">
                    {plan.features.map((f, j) => (
                      <li key={j} className="flex items-center gap-3 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-primary" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Button variant={plan.popular ? "default" : "outline"} className="w-full">
                    {plan.price === "Custom" ? "Contact Sales" : "Get Started"}
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- FAQ --- */}
        <section id="faq" className="py-24 px-4 bg-white/[0.01]">
          <div className="container mx-auto max-w-3xl">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-16 text-center">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {[
                { q: "How does the AI lead scoring work?", a: "LeadPulse uses a proprietary machine learning model trained on billions of B2B interactions. It analyzes behavioral signals, firmographics, and intent data to assign a probability of conversion to every lead." },
                { q: "Can I migrate my data from Salesforce or HubSpot?", a: "Yes. We offer one-click migration tools for major CRMs. Our technical team also provides concierge migration services for complex Enterprise environments." },
                { q: "Is there a limit on the number of users?", a: "No. Unlike traditional CRMs, we don't believe in taxing your growth. All plans include unlimited user seats." },
                { q: "What kind of support do you provide?", a: "Starter plans include 24/7 email support. Pro and Enterprise plans include priority chat, phone support, and dedicated account managers." },
              ].map((faq, i) => (
                <div key={i} className="rounded-2xl border border-white/5 bg-white/5 p-6 hover:bg-white/10 transition-colors cursor-pointer group">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold pr-8">{faq.q}</h4>
                    <ChevronDown className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-all" />
                  </div>
                  <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- CTA SECTION --- */}
        <section className="py-24 px-4">
          <div className="container mx-auto">
             <div className="rounded-3xl bg-primary p-12 md:p-24 text-center relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <h2 className="text-4xl md:text-7xl font-bold tracking-tighter text-primary-foreground mb-8 relative z-10">
                  Ready to Pulse?
                </h2>
                <p className="text-primary-foreground/80 text-lg md:text-xl max-w-2xl mx-auto mb-12 relative z-10">
                  Join 2,000+ enterprise marketing teams already scaling with LeadPulse CRM. No credit card required.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
                   <Button size="lg" variant="secondary" className="w-full sm:w-auto bg-white text-primary hover:bg-white/90">
                      Create Your Free Account
                   </Button>
                   <Button size="lg" variant="outline" className="w-full sm:w-auto border-white/20 text-white hover:bg-white/10">
                      Contact Sales
                   </Button>
                </div>
             </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
