"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  ArrowRight, 
  CheckCircle2, 
  ChevronDown, 
  Globe, 
  Zap, 
  Shield, 
  BarChart3, 
  Users2, 
  Sparkles,
  Menu,
  X
} from "lucide-react";
import { cn } from "@/lib/utils";

// --- Components ---

const transition = { type: "spring", stiffness: 400, damping: 30 } as const;

const Section = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <section className={cn("py-24 px-6 md:px-12 relative overflow-hidden", className)}>
    {children}
  </section>
);

const BentoCard = ({ 
  title, 
  description, 
  icon: Icon, 
  className,
  delay = 0 
}: { 
  title: string; 
  description: string; 
  icon: any; 
  className?: string;
  delay?: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ ...transition, delay }}
    className={cn(
      "group relative bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 hover:border-white/20 hover:bg-white/10 transition-all duration-300 overflow-hidden",
      className
    )}
  >
    <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
      <Icon size={120} />
    </div>
    <div className="relative z-10">
      <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center mb-6 text-primary group-hover:scale-110 transition-transform">
        <Icon size={24} />
      </div>
      <h3 className="text-xl font-bold mb-3 tracking-tight">{title}</h3>
      <p className="text-muted-foreground leading-relaxed">{description}</p>
    </div>
  </motion.div>
);

const PricingCard = ({ 
  tier, 
  price, 
  features, 
  highlight = false 
}: { 
  tier: string; 
  price: string; 
  features: string[]; 
  highlight?: boolean 
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={transition}
    className={cn(
      "p-8 rounded-2xl border transition-all duration-300 flex flex-col",
      highlight 
        ? "bg-primary/10 border-primary/50 scale-105 z-10 shadow-[0_0_40px_rgba(79,70,229,0.1)]" 
        : "bg-white/5 border-white/10 hover:border-white/20"
    )}
  >
    <div className="mb-8">
      <h3 className="text-lg font-medium text-muted-foreground mb-2">{tier}</h3>
      <div className="flex items-baseline gap-1">
        <span className="text-4xl font-bold tracking-tighter">{price}</span>
        {price !== "Custom" && <span className="text-muted-foreground">/mo</span>}
      </div>
    </div>
    <ul className="space-y-4 mb-8 flex-1">
      {features.map((f, i) => (
        <li key={i} className="flex items-center gap-3 text-sm text-muted-foreground">
          <CheckCircle2 size={16} className="text-primary shrink-0" />
          {f}
        </li>
      ))}
    </ul>
    <Link 
      href="/register"
      className={cn(
        "w-full py-3 rounded-xl font-medium text-center transition-all",
        highlight
          ? "bg-primary text-white hover:bg-primary/90 shadow-[0_0_20px_rgba(79,70,229,0.3)]"
          : "bg-white/10 text-white hover:bg-white/20"
      )}
    >
      Get Started
    </Link>
  </motion.div>
);

// --- Page ---

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen selection:bg-primary/30 selection:text-primary">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-background/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2 group cursor-pointer">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white shadow-[0_0_20px_rgba(79,70,229,0.4)] group-hover:rotate-12 transition-transform">
              <Sparkles size={20} />
            </div>
            <span className="text-xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
              VividTalent
            </span>
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#testimonials" className="hover:text-white transition-colors">Success Stories</a>
            <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
            <a href="#faq" className="hover:text-white transition-colors">Resources</a>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/login" className="text-sm font-medium hover:text-primary transition-colors">
              Sign In
            </Link>
            <Link href="/register" className="hidden sm:block bg-primary text-white px-5 py-2.5 rounded-xl font-medium hover:bg-primary/90 shadow-[0_0_20px_rgba(79,70,229,0.3)] transition-all">
              Start Free
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <Section className="pt-44 pb-32">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/20 blur-[120px] rounded-full opacity-30 animate-pulse" />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-blue-500/10 blur-[100px] rounded-full opacity-20" />
        </div>

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...transition, delay: 0.1 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest mb-8">
              <Zap size={14} fill="currentColor" /> The Next Generation of HR
            </span>
            <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-[0.9] mb-8 bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-white/40">
              Hire faster.<br />Manage smarter.
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed">
              VividTalent is the OS for high-growth teams. From strategic hiring to automated payroll, we unify your entire workforce in one cinematic workspace.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/register" className="w-full sm:w-auto px-8 py-4 bg-primary text-white rounded-xl font-bold text-lg hover:bg-primary/90 shadow-[0_0_30px_rgba(79,70,229,0.4)] transition-all flex items-center justify-center gap-2 group">
                Scale Your Team <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <button className="w-full sm:w-auto px-8 py-4 bg-white/5 border border-white/10 text-white rounded-xl font-bold text-lg hover:bg-white/10 transition-all">
                Request Demo
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ ...transition, delay: 0.3 }}
            className="mt-20 relative"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-primary to-blue-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative bg-zinc-900 border border-white/10 rounded-2xl p-4 shadow-2xl overflow-hidden aspect-video">
               <div className="flex items-center gap-2 mb-4 border-b border-white/5 pb-4 px-2">
                 <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/40" />
                 <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/40" />
                 <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/40" />
                 <div className="h-4 w-40 bg-white/5 rounded-md ml-4" />
               </div>
               <div className="grid grid-cols-12 gap-4 h-full">
                  <div className="col-span-3 border-r border-white/5 space-y-3 pr-4">
                    {[1,2,3,4,5].map(i => <div key={i} className="h-3 w-full bg-white/5 rounded" />)}
                  </div>
                  <div className="col-span-9 space-y-6">
                    <div className="grid grid-cols-3 gap-4">
                      {[1,2,3].map(i => <div key={i} className="h-20 bg-white/5 rounded-xl border border-white/5" />)}
                    </div>
                    <div className="h-40 bg-white/5 rounded-xl border border-white/5 w-full flex items-end p-4 gap-2">
                      {[30, 50, 40, 70, 45, 90, 60, 80].map((h, i) => (
                        <div key={i} className="flex-1 bg-primary/40 rounded-t-sm" style={{ height: `${h}%` }} />
                      ))}
                    </div>
                  </div>
               </div>
            </div>
          </motion.div>
        </div>
      </Section>

      {/* Social Proof */}
      <Section className="py-12 border-y border-white/5 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-center text-sm font-mono text-muted-foreground uppercase tracking-widest mb-12">
            Trusted by the world&apos;s most innovative companies
          </p>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-40 grayscale hover:grayscale-0 transition-all">
            {/* Minimal SVG Logos */}
            <div className="flex items-center gap-2 font-bold text-xl"><Globe size={24} /> SPHERE</div>
            <div className="flex items-center gap-2 font-bold text-xl"><Zap size={24} /> BOLT</div>
            <div className="flex items-center gap-2 font-bold text-xl"><Shield size={24} /> GUARD</div>
            <div className="flex items-center gap-2 font-bold text-xl"><BarChart3 size={24} /> DATA</div>
            <div className="flex items-center gap-2 font-bold text-xl"><Users2 size={24} /> UNIT</div>
          </div>
        </div>
      </Section>

      {/* Features Bento */}
      <Section id="features">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-6">Designed for depth.</h2>
            <p className="text-xl text-muted-foreground max-w-2xl">
              Powerful tools that feel effortless. Manage your people, not your software.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            <BentoCard 
              className="md:col-span-8 h-[400px]"
              title="Intelligent Pipeline"
              description="Automate repetitive sourcing tasks and focus on what matters: the human connection. Our AI ranks candidates based on skill match and cultural alignment."
              icon={Sparkles}
            />
            <BentoCard 
              className="md:col-span-4 h-[400px]"
              title="Secure Compliance"
              description="Global payroll and tax compliance handled out of the box. No more legal headaches."
              icon={Shield}
              delay={0.1}
            />
            <BentoCard 
              className="md:col-span-4 h-[400px]"
              title="Team Insights"
              description="Real-time analytics on retention, diversity, and team performance metrics."
              icon={BarChart3}
              delay={0.2}
            />
            <BentoCard 
              className="md:col-span-8 h-[400px]"
              title="Collaborative Culture"
              description="Built-in engagement tools, peer recognition, and feedback loops that people actually enjoy using. Modern HR is about connection."
              icon={Users2}
              delay={0.3}
            />
          </div>
        </div>
      </Section>

      {/* Stats Section */}
      <Section className="bg-primary/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            {[
              { label: "Active Users", value: "250K+" },
              { label: "Countries", value: "140+" },
              { label: "Hiring Speed", value: "3x Faster" },
              { label: "Retention", value: "98.5%" },
            ].map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold font-mono tracking-tighter mb-2 text-primary">{stat.value}</div>
                <div className="text-sm text-muted-foreground font-medium uppercase tracking-widest">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* Pricing */}
      <Section id="pricing">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6">Simple, transparent pricing.</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Choose the plan that scales with your ambition. No hidden fees.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <PricingCard 
              tier="Starter"
              price="$49"
              features={[
                "Up to 50 employees",
                "Basic ATS",
                "Automated Onboarding",
                "Mobile App access",
                "Email Support"
              ]}
            />
            <PricingCard 
              tier="Pro"
              price="$199"
              highlight
              features={[
                "Unlimited employees",
                "Advanced AI Sourcing",
                "Custom Compliance Engine",
                "Team Analytics",
                "24/7 Priority Support",
                "Custom Branding"
              ]}
            />
            <PricingCard 
              tier="Enterprise"
              price="Custom"
              features={[
                "Multi-org management",
                "SSO & Custom Security",
                "Dedicated Success Manager",
                "API Access",
                "On-site Training",
                "Custom SLAs"
              ]}
            />
          </div>
        </div>
      </Section>

      {/* FAQ */}
      <Section id="faq" className="bg-white/[0.01]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold tracking-tighter mb-12 text-center">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {[
              { q: "How secure is my data?", a: "VividTalent uses bank-grade encryption and is SOC2 Type II compliant. Your data is isolated and protected by the highest industry standards." },
              { q: "Can I migrate from my current HRIS?", a: "Absolutely. We offer free migration services for teams over 100 people. Our implementation team ensures a seamless transition in less than 48 hours." },
              { q: "Does VividTalent work globally?", a: "Yes, we support payroll and compliance in over 140 countries, handling local taxes, benefits, and labor laws automatically." }
            ].map((item, i) => (
              <div key={i} className="bg-white/5 border border-white/10 p-6 rounded-2xl">
                <h4 className="font-bold mb-2 flex items-center justify-between">
                  {item.q}
                  <ChevronDown size={18} className="text-muted-foreground" />
                </h4>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* CTA Footer */}
      <Section className="py-32">
        <div className="max-w-5xl mx-auto bg-primary rounded-3xl p-12 md:p-24 text-center relative overflow-hidden shadow-[0_0_60px_rgba(79,70,229,0.4)]">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.2),transparent)]" />
          <div className="relative z-10">
            <h2 className="text-4xl md:text-7xl font-bold text-white tracking-tighter mb-8">Ready to transform your workforce?</h2>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/register" className="w-full sm:w-auto px-10 py-5 bg-white text-primary rounded-2xl font-black text-xl hover:bg-zinc-100 transition-all">
                Join VividTalent today
              </Link>
              <p className="text-white/80 font-medium">Free 14-day trial. No credit card required.</p>
            </div>
          </div>
        </div>
      </Section>

      {/* Real Footer */}
      <footer className="py-12 border-t border-white/5 bg-background">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <Sparkles className="text-primary" />
              <span className="text-xl font-bold tracking-tighter">VividTalent</span>
            </div>
            <p className="text-muted-foreground max-w-sm mb-6">
              Building the future of work through intelligent design and human-centric technology. Made for teams that care.
            </p>
            <div className="flex gap-4">
              {/* Social icons - inline SVG for Tier 2 mandate */}
              <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
              </div>
              <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect width="4" height="12" x="2" y="9"></rect><circle cx="4" cy="4" r="2"></circle></svg>
              </div>
            </div>
          </div>
          <div>
            <h4 className="font-bold mb-6 uppercase tracking-widest text-xs text-muted-foreground">Product</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">Platform</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Pricing</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Security</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Roadmap</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6 uppercase tracking-widest text-xs text-muted-foreground">Company</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">About</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Legal</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground font-mono">
          <p>© 2026 VividTalent Technologies Inc. All rights reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Cookies</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
