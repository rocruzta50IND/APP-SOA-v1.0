"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  ArrowRight, 
  CheckCircle2, 
  BarChart3, 
  Users2, 
  Zap, 
  ShieldCheck, 
  Globe2, 
  Search,
  ChevronDown
} from "lucide-react";
import { cn } from "@/lib/utils";

// --- Components ---

const Badge = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <span className={cn("inline-flex items-center rounded-md border border-border bg-muted/50 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest text-muted-foreground", className)}>
    {children}
  </span>
);

const SectionHeader = ({ badge, title, subtitle }: { badge?: string; title: string; subtitle?: string }) => (
  <div className="flex flex-col items-center text-center mb-16 space-y-4">
    {badge && <Badge>{badge}</Badge>}
    <h2 className="text-3xl md:text-5xl font-black tracking-tighter leading-none text-foreground uppercase">
      {title}
    </h2>
    {subtitle && (
      <p className="max-w-[600px] text-muted-foreground text-sm md:text-base font-medium">
        {subtitle}
      </p>
    )}
  </div>
);

// --- Sections ---

const Navbar = () => (
  <nav className="fixed top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
    <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-6">
      <div className="flex items-center gap-2 font-black tracking-tighter text-xl uppercase italic">
        <Zap className="h-5 w-5 fill-primary text-primary" />
        TalentFlow
      </div>
      <div className="hidden md:flex items-center gap-8">
        {["Product", "Features", "Pricing", "Enterprise"].map((item) => (
          <Link key={item} href="#" className="text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors">
            {item}
          </Link>
        ))}
      </div>
      <div className="flex items-center gap-4">
        <Link href="/login" className="text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-foreground">
          Log in
        </Link>
        <Link href="/register" className="bg-primary text-primary-foreground hover:opacity-90 rounded-md px-4 py-2 text-xs font-bold uppercase tracking-widest transition-opacity">
          Get Started
        </Link>
      </div>
    </div>
  </nav>
);

const Hero = () => (
  <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden border-b border-border">
    <div className="mx-auto max-w-7xl px-6 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <Badge className="mb-6">The Future of Talent Management</Badge>
        <h1 className="mx-auto max-w-4xl text-5xl font-black tracking-tighter leading-none md:text-8xl text-foreground uppercase italic mb-8">
          Accelerate your <span className="text-muted-foreground">enterprise</span> hiring loop.
        </h1>
        <p className="mx-auto max-w-2xl text-muted-foreground text-base md:text-xl font-medium mb-10 leading-relaxed">
          The all-in-one platform for modern HR teams. High-density data, surgical precision, and autonomous workflows.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/register" className="w-full sm:w-auto bg-primary text-primary-foreground hover:opacity-90 rounded-md px-8 py-4 text-sm font-bold uppercase tracking-widest flex items-center justify-center gap-2">
            Start Free Trial <ArrowRight className="h-4 w-4" />
          </Link>
          <Link href="#" className="w-full sm:w-auto border border-border bg-background hover:bg-muted/50 rounded-md px-8 py-4 text-sm font-bold uppercase tracking-widest">
            Book a Demo
          </Link>
        </div>
      </motion.div>
    </div>
    
    {/* Minimalist Grid Pattern Background */}
    <div className="absolute inset-0 -z-10 h-full w-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
  </section>
);

const SocialProof = () => (
  <section className="py-12 border-b border-border bg-muted/20">
    <div className="mx-auto max-w-7xl px-6">
      <p className="text-center text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground mb-8">
        Trusted by industry leaders
      </p>
      <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 opacity-50 grayscale hover:grayscale-0 transition-all duration-300">
        {["Stripe", "Vercel", "GitHub", "Linear", "Airbnb", "Tesla"].map((name) => (
          <span key={name} className="text-xl md:text-2xl font-black tracking-tighter italic text-foreground">
            {name}
          </span>
        ))}
      </div>
    </div>
  </section>
);

const Features = () => {
  const features = [
    {
      title: "Precision Sourcing",
      desc: "Identify top-tier candidates with AI-driven surgical matching.",
      icon: Search,
      className: "md:col-span-2 md:row-span-2"
    },
    {
      title: "Real-time Metrics",
      desc: "Live analytics for your entire recruitment pipeline.",
      icon: BarChart3,
      className: "md:col-span-1 md:row-span-1"
    },
    {
      title: "Global Payroll",
      desc: "Compliant payments in 120+ currencies instantly.",
      icon: Globe2,
      className: "md:col-span-1 md:row-span-1"
    },
    {
      title: "Security First",
      desc: "Enterprise-grade SOC2 compliance and data encryption.",
      icon: ShieldCheck,
      className: "md:col-span-2 md:row-span-1"
    }
  ];

  return (
    <section className="py-24 border-b border-border">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader 
          badge="Features" 
          title="Engineered for Performance" 
          subtitle="A suite of tools designed to remove friction from your HR operations." 
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {features.map((f, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -2 }}
              className={cn(
                "group relative overflow-hidden rounded-md border border-border bg-background p-8 flex flex-col justify-between transition-colors hover:border-foreground/20",
                f.className
              )}
            >
              <div>
                <f.icon className="h-8 w-8 text-primary mb-6" />
                <h3 className="text-xl font-black tracking-tight uppercase italic mb-2">{f.title}</h3>
                <p className="text-muted-foreground text-sm font-medium leading-relaxed">{f.desc}</p>
              </div>
              <div className="mt-8">
                <Link href="#" className="inline-flex items-center text-[10px] font-bold uppercase tracking-widest text-primary hover:gap-2 transition-all">
                  Learn more <ArrowRight className="h-3 w-3 ml-1" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Pricing = () => {
  const plans = [
    {
      name: "Starter",
      price: "$0",
      desc: "For small teams and startups.",
      features: ["Up to 5 job openings", "Basic analytics", "Email support", "Public API access"]
    },
    {
      name: "Pro",
      price: "$299",
      desc: "For growing organizations.",
      features: ["Unlimited job openings", "Advanced analytics", "Priority support", "ATS integration", "Global payroll"]
    },
    {
      name: "Enterprise",
      price: "Custom",
      desc: "Tailored for global enterprises.",
      features: ["Custom workflows", "Dedicated manager", "SLA guarantees", "SSO & SAML", "Advanced reporting"]
    }
  ];

  return (
    <section className="py-24 border-b border-border bg-muted/10">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader 
          badge="Pricing" 
          title="Scale without limits" 
          subtitle="Transparent pricing for teams of all sizes. No hidden fees." 
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, i) => (
            <div key={i} className={cn(
              "flex flex-col rounded-md border p-8 bg-background",
              i === 1 ? "border-primary shadow-lg scale-105 z-10" : "border-border"
            )}>
              <div className="mb-8">
                <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground mb-4">{plan.name}</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-black tracking-tighter">{plan.price}</span>
                  {plan.price !== "Custom" && <span className="text-muted-foreground text-sm">/mo</span>}
                </div>
                <p className="mt-4 text-xs font-medium text-muted-foreground">{plan.desc}</p>
              </div>
              <ul className="mb-10 space-y-4 flex-1">
                {plan.features.map((feat, j) => (
                  <li key={j} className="flex items-center gap-3 text-xs font-medium">
                    <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                    {feat}
                  </li>
                ))}
              </ul>
              <Link 
                href="/register" 
                className={cn(
                  "w-full rounded-md px-4 py-3 text-center text-xs font-bold uppercase tracking-widest transition-all",
                  i === 1 ? "bg-primary text-primary-foreground hover:opacity-90" : "border border-border hover:bg-muted/50"
                )}
              >
                {plan.name === "Enterprise" ? "Contact Sales" : "Get Started"}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const FAQ = () => {
  const faqs = [
    { q: "How secure is TalentFlow?", a: "We employ enterprise-grade security including SOC2 compliance, data encryption at rest and in transit, and regular third-party audits." },
    { q: "Can I migrate from my current ATS?", a: "Yes, we provide surgical migration tools and dedicated support to transition your data from major ATS platforms in less than 24 hours." },
    { q: "Do you support global hiring?", a: "TalentFlow is built for the global economy, supporting recruitment and payroll in over 120 countries with local compliance baked in." }
  ];

  return (
    <section className="py-24 border-b border-border">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div>
            <Badge className="mb-4">Support</Badge>
            <h2 className="text-4xl font-black tracking-tighter uppercase italic leading-none mb-6">Frequently Asked Questions</h2>
            <p className="text-muted-foreground font-medium mb-8">Can&apos;t find what you&apos;re looking for? Reach out to our technical team for assistance.</p>
            <Link href="#" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary group">
              Contact Support <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          <div className="space-y-8">
            {faqs.map((faq, i) => (
              <div key={i} className="border-b border-border pb-8">
                <h4 className="text-sm font-black uppercase tracking-tight mb-4">{faq.q}</h4>
                <p className="text-xs leading-relaxed text-muted-foreground font-medium">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="py-20 border-t border-border bg-background">
    <div className="mx-auto max-w-7xl px-6">
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-20">
        <div className="col-span-2">
          <div className="flex items-center gap-2 font-black tracking-tighter text-xl uppercase italic mb-6">
            <Zap className="h-5 w-5 fill-primary text-primary" />
            TalentFlow
          </div>
          <p className="max-w-xs text-xs font-medium text-muted-foreground leading-relaxed">
            The high-density talent management platform for the modern enterprise. Built for speed, security, and precision.
          </p>
        </div>
        {[
          { title: "Product", links: ["Features", "Integrations", "Enterprise", "Solutions"] },
          { title: "Resources", links: ["Documentation", "API Reference", "Guides", "Support"] },
          { title: "Company", links: ["About", "Careers", "Legal", "Privacy"] }
        ].map((col, i) => (
          <div key={i}>
            <h5 className="text-[10px] font-bold uppercase tracking-widest text-foreground mb-6">{col.title}</h5>
            <ul className="space-y-4">
              {col.links.map((link) => (
                <li key={link}>
                  <Link href="#" className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-border">
        <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-4 md:mb-0">
          © 2026 TalentFlow Inc. All rights reserved.
        </p>
        <div className="flex items-center gap-8">
          {["Twitter", "GitHub", "LinkedIn"].map((social) => (
            <Link key={social} href="#" className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground hover:text-foreground">
              {social}
            </Link>
          ))}
        </div>
      </div>
    </div>
  </footer>
);

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-background text-foreground font-sans antialiased">
      <Navbar />
      <Hero />
      <SocialProof />
      <Features />
      <Pricing />
      <FAQ />
      <Footer />
    </main>
  );
}
