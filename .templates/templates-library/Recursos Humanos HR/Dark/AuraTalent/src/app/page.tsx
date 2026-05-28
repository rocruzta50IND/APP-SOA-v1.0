"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  Users, 
  Zap, 
  Shield, 
  TrendingUp, 
  Search, 
  Clock, 
  ArrowRight, 
  CheckCircle2, 
  ChevronRight,
  Star,
  Globe,
  PieChart as PieChartIcon,
  LayoutDashboard
} from "lucide-react";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell
} from "recharts";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";

// --- MOCK DATA ---

const performanceData = [
  { name: "Jan", hiring: 45, retention: 85 },
  { name: "Feb", hiring: 52, retention: 88 },
  { name: "Mar", hiring: 48, retention: 84 },
  { name: "Apr", hiring: 61, retention: 91 },
  { name: "May", hiring: 55, retention: 89 },
  { name: "Jun", hiring: 67, retention: 92 },
];

const recruitmentData = [
  { name: "Tech", value: 45, color: "#4F46E5" },
  { name: "Sales", value: 30, color: "#10B981" },
  { name: "Ops", value: 15, color: "#F59E0B" },
  { name: "HR", value: 10, color: "#EC4899" },
];

// --- COMPONENTS ---

const Navbar = () => (
  <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center p-4">
    <motion.div 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="flex items-center gap-8 px-6 py-3 rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl"
    >
      <Link href="/" className="flex items-center gap-2 group">
        <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shadow-[0_0_15px_rgba(79,70,229,0.5)] group-hover:scale-110 transition-transform">
          <Users className="w-5 h-5 text-white" />
        </div>
        <span className="font-bold text-lg tracking-tighter">AuraTalent</span>
      </Link>
      
      <div className="hidden md:flex items-center gap-6">
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

      <div className="flex items-center gap-3">
        <Link href="/login">
          <Button variant="ghost" size="sm">Login</Button>
        </Link>
        <Link href="/register">
          <Button size="sm">Get Started</Button>
        </Link>
      </div>
    </motion.div>
  </nav>
);

const Hero = () => (
  <section className="relative pt-32 pb-20 overflow-hidden">
    {/* Background Glows */}
    <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-primary/20 blur-[120px] rounded-full -z-10" />
    <div className="absolute bottom-0 right-0 w-[400px] h-[300px] bg-indigo-500/10 blur-[100px] rounded-full -z-10" />

    <div className="container mx-auto px-6 text-center">
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/10 text-[10px] font-bold uppercase tracking-widest text-primary mb-6">
          <Zap className="w-3 h-3" /> Aura AI-Powered Recruitment
        </span>
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 max-w-4xl mx-auto leading-[1.1]">
          Hire <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-indigo-400">Smater</span>, Not Faster.
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
          The all-in-one talent acquisition and HR management platform for high-growth enterprises. Scale your team with surgical precision.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button size="lg" className="w-full sm:w-auto gap-2">
            Start Free Trial <ArrowRight className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="lg" className="w-full sm:w-auto">
            Book a Demo
          </Button>
        </div>
      </motion.div>

      {/* Hero Image/Mockup */}
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="mt-20 relative mx-auto max-w-5xl"
      >
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10" />
        <Card className="p-2 border-white/5 bg-white/5 backdrop-blur-3xl shadow-2xl">
          <div className="aspect-[16/9] rounded-xl overflow-hidden bg-zinc-950 border border-white/10 flex">
             {/* Sidebar Mockup */}
             <div className="w-48 border-r border-white/5 p-4 flex flex-col gap-4">
                {[LayoutDashboard, Users, TrendingUp, Search, Clock, Globe].map((Icon, i) => (
                  <div key={i} className={cn("w-full h-8 rounded-lg", i === 0 ? "bg-primary/10" : "bg-white/5")} />
                ))}
             </div>
             {/* Main Content Mockup */}
             <div className="flex-1 p-6 flex flex-col gap-6">
                <div className="flex justify-between items-center">
                   <div className="w-48 h-8 bg-white/5 rounded-lg" />
                   <div className="flex gap-2">
                      <div className="w-24 h-8 bg-white/5 rounded-lg" />
                      <div className="w-24 h-8 bg-primary rounded-lg" />
                   </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                   {[1, 2, 3].map(i => (
                     <div key={i} className="h-24 bg-white/5 rounded-xl border border-white/5" />
                   ))}
                </div>
                <div className="flex-1 bg-white/5 rounded-xl border border-white/5 p-4">
                   <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={performanceData}>
                        <defs>
                          <linearGradient id="colorHiring" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#4F46E5" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                        <Area type="monotone" dataKey="hiring" stroke="#4F46E5" fillOpacity={1} fill="url(#colorHiring)" strokeWidth={3} />
                      </AreaChart>
                   </ResponsiveContainer>
                </div>
             </div>
          </div>
        </Card>
      </motion.div>
    </div>
  </section>
);

const BentoFeatures = () => (
  <section id="features" className="py-20 bg-zinc-950/50">
    <div className="container mx-auto px-6">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-black tracking-tighter mb-4">Precision Engineering for <span className="text-primary">Modern HR</span></h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">Built from the ground up to solve the most complex talent challenges at scale.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Large Card */}
        <Card className="md:col-span-2 md:row-span-2 group">
          <CardContent className="h-full flex flex-col justify-between p-8">
            <div>
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Zap className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-4 tracking-tight">AI-Driven Pipeline Optimization</h3>
              <p className="text-muted-foreground mb-8 text-lg max-w-lg">
                Our proprietary algorithms analyze thousands of candidates in seconds, identifying the top 1% with 98% accuracy based on skill-fit and culture-match.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                <span className="block text-2xl font-black tracking-tighter text-primary">85%</span>
                <span className="text-xs uppercase tracking-widest font-bold text-muted-foreground">Faster Sourcing</span>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                <span className="block text-2xl font-black tracking-tighter text-emerald-500">42%</span>
                <span className="text-xs uppercase tracking-widest font-bold text-muted-foreground">Higher Retention</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Small Cards */}
        <Card className="group">
          <CardContent className="p-8">
            <div className="w-10 h-10 rounded-lg bg-indigo-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Shield className="w-5 h-5 text-indigo-400" />
            </div>
            <h3 className="text-xl font-bold mb-2 tracking-tight">Enterprise Security</h3>
            <p className="text-sm text-muted-foreground">SOC2 Type II compliant infrastructure with end-to-end encryption for all employee data.</p>
          </CardContent>
        </Card>

        <Card className="group">
          <CardContent className="p-8">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <TrendingUp className="w-5 h-5 text-emerald-400" />
            </div>
            <h3 className="text-xl font-bold mb-2 tracking-tight">Talent Analytics</h3>
            <p className="text-sm text-muted-foreground">Real-time performance metrics and predictive turnover modeling for your entire workforce.</p>
          </CardContent>
        </Card>

        <Card className="md:col-span-3 group">
          <CardContent className="p-8 flex flex-col md:flex-row items-center gap-10">
            <div className="flex-1">
              <h3 className="text-2xl font-bold mb-4 tracking-tight">Global Payroll & Compliance</h3>
              <p className="text-muted-foreground mb-6">Automate global payroll in 120+ countries with local compliance baked into the core engine. One platform for your entire global team.</p>
              <div className="flex flex-wrap gap-2">
                {["USA", "Brazil", "UK", "Germany", "Japan", "Singapore"].map(c => (
                  <span key={c} className="px-3 py-1 rounded-full bg-white/5 border border-white/5 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{c}</span>
                ))}
              </div>
            </div>
            <div className="w-full md:w-72 h-40 bg-white/5 rounded-xl border border-white/5 overflow-hidden">
               <div className="w-full h-full p-4 flex items-center justify-center">
                  <Globe className="w-20 h-20 text-primary opacity-20 animate-pulse" />
               </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  </section>
);

const Pricing = () => (
  <section id="pricing" className="py-20 relative overflow-hidden">
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-primary/5 blur-[150px] rounded-full -z-10" />
    
    <div className="container mx-auto px-6">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-black tracking-tighter mb-4">Transparent <span className="text-primary">Enterprise</span> Pricing</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">Scale without surprises. Simple plans for teams of all sizes.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {[
          { 
            name: "Starter", 
            price: "$499", 
            desc: "For fast-growing startups.", 
            features: ["Up to 50 employees", "AI Sourcing (Basic)", "Standard Analytics", "Email Support"],
            popular: false
          },
          { 
            name: "Growth", 
            price: "$1,299", 
            desc: "For scaling enterprises.", 
            features: ["Up to 250 employees", "Advanced AI Matching", "Custom Dashboards", "24/7 Priority Support", "API Access"],
            popular: true
          },
          { 
            name: "Premium", 
            price: "Custom", 
            desc: "For global organizations.", 
            features: ["Unlimited employees", "Full Talent Lifecycle AI", "Global Compliance Engine", "Dedicated Account Manager", "SSO & SAML"],
            popular: false
          }
        ].map((plan) => (
          <Card key={plan.name} className={cn(
            "flex flex-col p-8 transition-transform hover:scale-105",
            plan.popular && "border-primary/50 bg-primary/5 shadow-[0_0_30px_rgba(79,70,229,0.1)] relative"
          )}>
            {plan.popular && (
              <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-3 py-1 rounded-full bg-primary text-[10px] font-black uppercase tracking-widest">Most Popular</span>
            )}
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
              <div className="flex items-baseline gap-1 mb-4">
                <span className="text-4xl font-black tracking-tighter">{plan.price}</span>
                {plan.price !== "Custom" && <span className="text-muted-foreground text-sm">/mo</span>}
              </div>
              <p className="text-sm text-muted-foreground">{plan.desc}</p>
            </div>
            <div className="flex-1 space-y-4 mb-8">
              {plan.features.map(f => (
                <div key={f} className="flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                  <span className="text-sm">{f}</span>
                </div>
              ))}
            </div>
            <Link href="/register">
              <Button variant={plan.popular ? "primary" : "outline"} className="w-full">
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
  <section className="py-20 bg-zinc-950/50">
    <div className="container mx-auto px-6 max-w-4xl">
      <h2 className="text-3xl font-black tracking-tighter mb-12 text-center">Frequently Asked Questions</h2>
      <div className="space-y-4">
        {[
          { q: "How long does implementation take?", a: "Standard enterprise setup takes 2-4 weeks, including data migration and team training." },
          { q: "Is my data secure with AuraTalent?", a: "We are SOC2 Type II compliant and use AES-256 encryption at rest and in transit." },
          { q: "Can we integrate with our existing ATS?", a: "Yes, AuraTalent has a robust API and pre-built connectors for Greenhouse, Lever, and Workday." }
        ].map((item, i) => (
          <Card key={i} className="group">
            <CardContent className="p-6">
              <h4 className="font-bold mb-2 flex items-center justify-between">
                {item.q}
                <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
              </h4>
              <p className="text-sm text-muted-foreground">{item.a}</p>
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
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-20">
        <div className="col-span-2 lg:col-span-2">
          <Link href="/" className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Users className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl tracking-tighter">AuraTalent</span>
          </Link>
          <p className="text-muted-foreground max-w-xs mb-6">
            Optimizing the world's most valuable asset: human potential.
          </p>
          <div className="flex gap-4">
             {[1, 2, 3, 4].map(i => <div key={i} className="w-8 h-8 rounded-full bg-white/5 border border-white/5" />)}
          </div>
        </div>
        <div>
          <h4 className="font-bold mb-6 uppercase text-[10px] tracking-widest text-muted-foreground">Product</h4>
          <ul className="space-y-4 text-sm text-muted-foreground">
            <li><Link href="#" className="hover:text-white transition-colors">Features</Link></li>
            <li><Link href="#" className="hover:text-white transition-colors">Pricing</Link></li>
            <li><Link href="#" className="hover:text-white transition-colors">AI Sourcing</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-6 uppercase text-[10px] tracking-widest text-muted-foreground">Company</h4>
          <ul className="space-y-4 text-sm text-muted-foreground">
            <li><Link href="#" className="hover:text-white transition-colors">About Us</Link></li>
            <li><Link href="#" className="hover:text-white transition-colors">Careers</Link></li>
            <li><Link href="#" className="hover:text-white transition-colors">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-6 uppercase text-[10px] tracking-widest text-muted-foreground">Legal</h4>
          <ul className="space-y-4 text-sm text-muted-foreground">
            <li><Link href="#" className="hover:text-white transition-colors">Privacy</Link></li>
            <li><Link href="#" className="hover:text-white transition-colors">Terms</Link></li>
            <li><Link href="#" className="hover:text-white transition-colors">Security</Link></li>
          </ul>
        </div>
      </div>
      <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
        <p>© 2026 AuraTalent Inc. All rights reserved.</p>
        <div className="flex gap-8">
           <Link href="#">Status</Link>
           <Link href="#">System Logs</Link>
           <Link href="#">Open Source</Link>
        </div>
      </div>
    </div>
  </footer>
);

export default function LandingPage() {
  return (
    <main className="min-h-screen selection:bg-primary/30">
      <Navbar />
      <Hero />
      <section className="py-10 border-y border-white/5 bg-white/[0.02]">
        <div className="container mx-auto px-6">
           <div className="flex flex-wrap justify-center items-center gap-12 grayscale opacity-40">
              {["Microsoft", "Stripe", "Airbnb", "Vercel", "OpenAI"].map(brand => (
                <span key={brand} className="text-xl font-black tracking-tighter">{brand}</span>
              ))}
           </div>
        </div>
      </section>
      <BentoFeatures />
      
      {/* Social Proof Stats */}
      <section className="py-20 relative overflow-hidden">
        <div className="container mx-auto px-6">
           <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { label: "Talents Placed", value: "1.2M+" },
                { label: "Global Customers", value: "4,500+" },
                { label: "Time Saved", value: "250k hrs" },
                { label: "Efficiency Boost", value: "+45%" }
              ].map((stat, i) => (
                <div key={i} className="text-center">
                   <span className="block text-4xl md:text-5xl font-black tracking-tighter text-white mb-2">{stat.value}</span>
                   <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground">{stat.label}</span>
                </div>
              ))}
           </div>
        </div>
      </section>

      <Pricing />
      <FAQ />
      
      {/* Final CTA */}
      <section className="py-20">
        <div className="container mx-auto px-6">
           <Card className="p-12 text-center bg-primary/10 border-primary/20 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-primary/20 blur-[100px] rounded-full" />
              <h2 className="text-4xl font-black tracking-tighter mb-6">Ready to transform your talent stack?</h2>
              <p className="text-muted-foreground mb-10 max-w-xl mx-auto">Join thousands of companies scaling with AuraTalent.</p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                 <Button size="lg">Get Started Now</Button>
                 <Button variant="outline" size="lg">Contact Sales</Button>
              </div>
           </Card>
        </div>
      </section>

      <Footer />
    </main>
  );
}
