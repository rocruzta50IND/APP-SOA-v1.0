"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  ArrowRight, 
  CheckCircle2, 
  BarChart3, 
  Users, 
  Zap, 
  Shield, 
  ChevronDown,
  Mail,
  Share2,
  Globe,
  Camera
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";

const transition = { type: "spring", stiffness: 400, damping: 30 } as const;

export default function LandingPage() {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      {/* Background Ambient Glows */}
      <div className="fixed inset-0 z-[-1]">
        <div className="absolute top-[10%] left-[20%] h-[400px] w-[400px] rounded-full bg-primary/20 blur-[120px]" />
        <div className="absolute bottom-[10%] right-[20%] h-[300px] w-[300px] rounded-full bg-primary/10 blur-[100px]" />
      </div>

      <Navbar />
      
      <main>
        <HeroSection />
        <SocialProof />
        <FeaturesSection />
        <TestimonialsSection />
        <PricingSection />
        <FAQSection />
      </main>

      <Footer />
    </div>
  );
}

function Navbar() {
  return (
    <nav className="fixed top-0 z-50 w-full border-b border-white/10 bg-background/50 backdrop-blur-xl">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-primary shadow-[0_0_15px_rgba(79,70,229,0.5)] flex items-center justify-center">
            <Zap className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tighter">AuraCRM</span>
        </div>
        
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
          <Link href="#features" className="hover:text-primary transition-colors">Features</Link>
          <Link href="#pricing" className="hover:text-primary transition-colors">Pricing</Link>
          <Link href="#faq" className="hover:text-primary transition-colors">FAQ</Link>
        </div>

        <div className="flex items-center gap-4">
          <Button variant="ghost" asChild size="sm">
            <Link href="/login">Log in</Link>
          </Button>
          <Button size="sm" asChild>
            <Link href="/register">Get Started</Link>
          </Button>
        </div>
      </div>
    </nav>
  );
}

function HeroSection() {
  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32">
      <div className="container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={transition}
        >
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-white/50 mb-6">
            CRM built for the <br /> modern enterprise.
          </h1>
          <p className="mx-auto max-w-2xl text-lg md:text-xl text-muted-foreground mb-10">
            AuraCRM empowers high-ticket B2B teams to close deals faster with 
            intelligent insights, automated pipelines, and premium analytics.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="w-full sm:w-auto text-base" asChild>
              <Link href="/register">
                Start for free <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="w-full sm:w-auto text-base">
              Book a demo
            </Button>
          </div>
        </motion.div>

        <motion.div 
          className="mt-20 relative mx-auto max-w-5xl"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ ...transition, delay: 0.2 }}
        >
          <div className="rounded-2xl border border-white/10 bg-white/5 p-2 backdrop-blur-sm shadow-2xl">
            <div className="rounded-xl overflow-hidden border border-white/10 bg-background/50 aspect-video flex items-center justify-center group cursor-pointer relative">
               <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent opacity-50" />
               <div className="z-10 flex flex-col items-center">
                  <div className="h-20 w-20 rounded-full bg-primary/20 border border-primary/50 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Zap className="h-10 w-10 text-primary" />
                  </div>
                  <p className="mt-4 text-sm font-mono tracking-widest uppercase text-primary/80">Watch Product Tour</p>
               </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function SocialProof() {
  const logos = ["Vercel", "Stripe", "Raycast", "Linear", "Supabase", "Retool"];
  
  return (
    <section className="py-20 border-y border-white/5 bg-white/[0.02]">
      <div className="container mx-auto px-4">
        <p className="text-center text-xs font-bold uppercase tracking-[0.3em] text-muted-foreground mb-12">
          Trusted by the world&apos;s most innovative teams
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center justify-items-center opacity-50 grayscale hover:grayscale-0 transition-all">
          {logos.map((logo) => (
            <span key={logo} className="text-xl font-bold tracking-tighter text-white/80">{logo}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturesSection() {
  const features = [
    {
      title: "Intelligent Pipelines",
      description: "Automate your sales funnel with AI-driven lead scoring and predictive routing.",
      icon: Zap,
      className: "md:col-span-2 md:row-span-2",
      image: true
    },
    {
      title: "Real-time Analytics",
      description: "Deep dive into your sales metrics with custom dashboards.",
      icon: BarChart3,
      className: "md:col-span-1 md:row-span-1"
    },
    {
      title: "Enterprise Security",
      description: "Bank-grade encryption and SSO integration for your peace of mind.",
      icon: Shield,
      className: "md:col-span-1 md:row-span-1"
    },
    {
      title: "Team Collaboration",
      description: "Sync your entire organization with shared calendars and deal rooms.",
      icon: Users,
      className: "md:col-span-2 md:row-span-1"
    }
  ];

  return (
    <section id="features" className="py-24 md:py-32">
      <div className="container mx-auto px-4">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-black tracking-tighter mb-4">Powerful features for elite teams.</h2>
          <p className="text-muted-foreground text-lg">Everything you need to scale your B2B sales operations.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[240px]">
          {features.map((feature, i) => (
            <Card key={i} className={cn("relative overflow-hidden group", feature.className)}>
              <CardContent className="p-8 h-full flex flex-col justify-between relative z-10">
                <div>
                  <div className="mb-4 h-10 w-10 rounded-lg bg-primary/20 border border-primary/50 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold tracking-tight mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed max-w-[280px]">
                    {feature.description}
                  </p>
                </div>
                {feature.image && (
                  <div className="absolute bottom-0 right-0 w-2/3 h-1/2 bg-gradient-to-tl from-primary/20 to-transparent border-t border-l border-white/10 rounded-tl-2xl translate-y-4 translate-x-4 group-hover:translate-y-2 group-hover:translate-x-2 transition-transform" />
                )}
              </CardContent>
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  const testimonials = [
    {
      name: "Sarah Chen",
      role: "VP of Sales at Vercel",
      content: "AuraCRM has completely transformed how we manage our enterprise accounts. The visibility is unparalleled.",
      avatar: "SC"
    },
    {
      name: "Marc Andreessen",
      role: "Founder at Andreessen Horowitz",
      content: "Software is eating the world, and AuraCRM is eating the CRM market. Simply the best UI I&apos;ve used.",
      avatar: "MA"
    },
    {
      name: "Guillermo Rauch",
      role: "CEO at Vercel",
      content: "The speed of AuraCRM is what sets it apart. It feels like a local app but scales globally.",
      avatar: "GR"
    }
  ];

  return (
    <section className="py-24 md:py-32 bg-white/[0.01]">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-black tracking-tighter mb-16">Loved by industry leaders.</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <Card key={i} className="text-left p-8">
              <p className="text-lg italic mb-6 text-foreground/80">&quot;{t.content}&quot;</p>
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-full bg-primary/20 border border-primary/50 flex items-center justify-center font-bold text-primary text-xs">
                  {t.avatar}
                </div>
                <div>
                  <h4 className="font-bold text-sm tracking-tight">{t.name}</h4>
                  <p className="text-xs text-muted-foreground uppercase tracking-widest">{t.role}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function PricingSection() {
  const plans = [
    {
      name: "Starter",
      price: "$49",
      features: ["Up to 1,000 leads", "Basic pipelines", "Standard support", "API access"],
      button: "Start Free Trial",
      variant: "outline" as const
    },
    {
      name: "Pro",
      price: "$199",
      features: ["Unlimited leads", "Advanced automation", "Priority support", "Custom analytics", "White-label"],
      button: "Go Pro",
      variant: "default" as const,
      popular: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      features: ["Unlimited everything", "Dedicated account manager", "On-premise option", "Custom integrations"],
      button: "Contact Sales",
      variant: "outline" as const
    }
  ];

  return (
    <section id="pricing" className="py-24 md:py-32">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black tracking-tighter mb-4">Transparent pricing.</h2>
          <p className="text-muted-foreground text-lg">Scale as you grow, with no hidden fees.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, i) => (
            <Card key={i} className={cn("relative p-8 flex flex-col", plan.popular && "border-primary/50 ring-1 ring-primary/20 scale-105 z-10")}>
              {plan.popular && (
                <div className="absolute top-0 right-8 -translate-y-1/2 bg-primary px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-white shadow-[0_0_15px_rgba(79,70,229,0.5)]">
                  Most Popular
                </div>
              )}
              <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
              <div className="mb-6">
                <span className="text-4xl font-black tracking-tighter">{plan.price}</span>
                {plan.price !== "Custom" && <span className="text-muted-foreground ml-2">/mo</span>}
              </div>
              <ul className="space-y-4 mb-10 flex-grow">
                {plan.features.map((f, fi) => (
                  <li key={fi} className="flex items-center gap-3 text-sm text-muted-foreground">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    {f}
                  </li>
                ))}
              </ul>
              <Button variant={plan.variant} className="w-full">
                {plan.button}
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQSection() {
  const faqs = [
    {
      q: "Can I migrate my data from Salesforce?",
      a: "Yes, we provide one-click migration tools for Salesforce, HubSpot, and Pipedrive."
    },
    {
      q: "Is there a free trial available?",
      a: "Absolutely. You can try AuraCRM Pro for 14 days with no credit card required."
    },
    {
      q: "How secure is my lead data?",
      a: "We use AES-256 encryption at rest and TLS 1.3 in transit. Your data is your property."
    }
  ];

  return (
    <section id="faq" className="py-24 md:py-32">
      <div className="container mx-auto px-4 max-w-3xl">
        <h2 className="text-3xl font-black tracking-tighter mb-12 text-center">Common Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <Card key={i} className="p-6">
              <h4 className="font-bold flex items-center justify-between cursor-pointer group">
                {faq.q}
                <ChevronDown className="h-5 w-5 text-muted-foreground group-hover:text-white transition-colors" />
              </h4>
              <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
                {faq.a}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="py-20 border-t border-white/10 bg-black/50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <Zap className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold tracking-tighter">AuraCRM</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6">
              Empowering the next generation of sales teams with intelligent automation and premium UI.
            </p>
            <div className="flex gap-4">
              <Link href="#" className="h-9 w-9 rounded-lg border border-white/10 bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors">
                <Globe className="h-4 w-4" />
              </Link>
              <Link href="#" className="h-9 w-9 rounded-lg border border-white/10 bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors">
                <Share2 className="h-4 w-4" />
              </Link>
              <Link href="#" className="h-9 w-9 rounded-lg border border-white/10 bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors">
                <Camera className="h-4 w-4" />
              </Link>
            </div>
          </div>
          <div>
            <h4 className="font-bold mb-6 text-sm uppercase tracking-widest text-white/50">Product</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li><Link href="#" className="hover:text-white transition-colors">Features</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Integrations</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Pricing</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Changelog</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6 text-sm uppercase tracking-widest text-white/50">Company</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li><Link href="#" className="hover:text-white transition-colors">About</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Careers</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Blog</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Privacy</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6 text-sm uppercase tracking-widest text-white/50">Newsletter</h4>
            <div className="flex gap-2">
              <div className="relative flex-grow">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input 
                  type="email" 
                  placeholder="Email address"
                  className="w-full bg-white/5 border border-white/10 rounded-lg py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-primary transition-all"
                />
              </div>
              <Button size="sm" className="px-4">Join</Button>
            </div>
          </div>
        </div>
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
          <p>© 2026 AuraCRM Inc. Built with precision for the modern web.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-white">Terms</Link>
            <Link href="#" className="hover:text-white">Privacy</Link>
            <Link href="#" className="hover:text-white">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
