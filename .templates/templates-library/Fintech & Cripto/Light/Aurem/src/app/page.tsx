"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  ArrowRight, 
  ChevronRight, 
  BarChart3, 
  ShieldCheck, 
  Zap, 
  Globe, 
  CheckCircle2,
  Menu,
  X,
  Plus
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

// --- Components ---

const Section = ({ 
  children, 
  className, 
  id 
}: { 
  children: React.ReactNode; 
  className?: string; 
  id?: string 
}) => (
  <section id={id} className={cn("py-24 px-6 md:px-12 lg:px-24", className)}>
    <div className="max-w-7xl mx-auto">{children}</div>
  </section>
);

const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="text-xl font-bold tracking-tight">
            AUREM
          </Link>
          <div className="hidden md:flex items-center gap-6">
            <Link href="#features" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Features</Link>
            <Link href="#pricing" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Pricing</Link>
            <Link href="#faq" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">FAQ</Link>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-4">
          <Link href="/login">
            <Button variant="ghost" size="sm">Login</Button>
          </Link>
          <Link href="/register">
            <Button size="sm">Get Started</Button>
          </Link>
        </div>
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>
      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-background border-b border-border p-6 flex flex-col gap-4 animate-in fade-in slide-in-from-top-4">
          <Link href="#features" className="text-sm font-medium" onClick={() => setIsOpen(false)}>Features</Link>
          <Link href="#pricing" className="text-sm font-medium" onClick={() => setIsOpen(false)}>Pricing</Link>
          <Link href="#faq" className="text-sm font-medium" onClick={() => setIsOpen(false)}>FAQ</Link>
          <hr className="border-border" />
          <Link href="/login" onClick={() => setIsOpen(false)}>
            <Button variant="outline" className="w-full">Login</Button>
          </Link>
          <Link href="/register" onClick={() => setIsOpen(false)}>
            <Button className="w-full">Get Started</Button>
          </Link>
        </div>
      )}
    </nav>
  );
};

// --- Sections ---

const Hero = () => (
  <Section className="relative overflow-hidden pt-32 pb-24 md:pt-48 md:pb-32">
    <div className="flex flex-col items-center text-center">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
      >
        <Badge variant="outline" className="mb-4">
          v2.0 is now live — New Enterprise Features
        </Badge>
      </motion.div>
      <motion.h1 
        className="text-5xl md:text-7xl font-bold tracking-tight leading-tight max-w-4xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2, delay: 0.1 }}
      >
        The operating system for <span className="text-muted-foreground">modern finance.</span>
      </motion.h1>
      <motion.p 
        className="mt-6 text-xl text-muted-foreground max-w-2xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2, delay: 0.2 }}
      >
        Scale your fintech operations with institutional-grade infrastructure, real-time analytics, and seamless asset management.
      </motion.p>
      <motion.div 
        className="mt-10 flex flex-col sm:flex-row gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2, delay: 0.3 }}
      >
        <Link href="/register">
          <Button size="lg" className="gap-2">
            Start Building <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
        <Button variant="outline" size="lg">Book a Demo</Button>
      </motion.div>
    </div>
  </Section>
);

const SocialProof = () => (
  <Section className="border-y border-border bg-muted/30 py-12">
    <div className="flex flex-col items-center gap-8">
      <p className="text-xs font-medium text-muted-foreground uppercase tracking-widest">
        Trusted by industry leaders
      </p>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-12 opacity-50 grayscale hover:grayscale-0 transition-all">
        {["Goldman", "Coinbase", "Revolut", "Stripe", "BlackRock", "Visa"].map((brand) => (
          <div key={brand} className="flex items-center justify-center font-bold text-xl tracking-tighter italic">
            {brand}
          </div>
        ))}
      </div>
    </div>
  </Section>
);

const Features = () => (
  <Section id="features" className="bg-background">
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
      <div className="lg:col-span-4 flex flex-col justify-center">
        <Badge variant="outline" className="w-fit mb-4">Core Capabilities</Badge>
        <h2 className="text-4xl font-bold tracking-tight mb-4">Engineered for performance.</h2>
        <p className="text-muted-foreground mb-8">
          Aurem provides the tools you need to manage assets at scale without compromising on security or speed.
        </p>
        <Button variant="link" className="w-fit p-0 gap-2 h-auto">
          Explore documentation <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
      <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { icon: Zap, title: "Ultra-fast Execution", desc: "Proprietary matching engine with microsecond latency for institutional traders." },
          { icon: ShieldCheck, title: "Military-grade Security", desc: "Multi-sig custody and cold storage solutions powered by industry leaders." },
          { icon: BarChart3, title: "Advanced Analytics", desc: "Real-time reporting and predictive modeling for better portfolio management." },
          { icon: Globe, title: "Global Compliance", desc: "Automated KYC/AML and jurisdictional routing for worldwide operations." }
        ].map((f, i) => (
          <Card key={i} className="hover:border-foreground/20 transition-colors">
            <CardHeader>
              <f.icon className="w-6 h-6 mb-2" />
              <CardTitle className="text-lg">{f.title}</CardTitle>
              <CardDescription>{f.desc}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  </Section>
);

const BentoFeatures = () => (
  <Section className="bg-muted/30">
    <div className="text-center mb-16">
      <h2 className="text-4xl font-bold tracking-tight">Full-stack fintech infrastructure</h2>
      <p className="mt-4 text-muted-foreground">Everything you need to ship financial products faster.</p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 grid-rows-2 gap-4 h-[600px]">
      <Card className="md:row-span-2 flex flex-col justify-end p-8 bg-black text-white border-none overflow-hidden relative group">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent)]" />
        <div className="relative z-10">
          <Badge variant="outline" className="mb-4 text-white border-white/20">Institutional</Badge>
          <h3 className="text-2xl font-bold mb-2">Exchange Core</h3>
          <p className="text-white/60 text-sm">Deploy your own white-label exchange in minutes with our liquidity-ready engine.</p>
        </div>
      </Card>
      <Card className="md:col-span-2 flex flex-col justify-between p-8 group">
         <div>
          <Badge variant="outline" className="mb-4">Real-time</Badge>
          <h3 className="text-2xl font-bold mb-2">Analytics Dashboard</h3>
          <p className="text-muted-foreground text-sm max-w-md">Visualize flow of funds, user behavior, and market trends in a single unified interface.</p>
        </div>
        <div className="mt-8 h-32 w-full bg-muted rounded-md border border-dashed border-border flex items-center justify-center text-xs text-muted-foreground">
          [Interactive Chart Preview]
        </div>
      </Card>
      <Card className="p-8">
        <h3 className="text-lg font-bold mb-2">Connect</h3>
        <p className="text-muted-foreground text-sm">Seamlessly integrate with 50+ banking partners and local payment methods globally.</p>
      </Card>
      <Card className="p-8">
        <h3 className="text-lg font-bold mb-2">Automate</h3>
        <p className="text-muted-foreground text-sm">Powerful workflow engine for treasury management and automated rebalancing.</p>
      </Card>
    </div>
  </Section>
);

const Pricing = () => (
  <Section id="pricing">
    <div className="text-center mb-16">
      <Badge variant="outline" className="mb-4">Pricing</Badge>
      <h2 className="text-4xl font-bold tracking-tight">Scale-friendly plans</h2>
      <p className="mt-4 text-muted-foreground">No hidden fees. Pay for what you use as you grow.</p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {[
        { name: "Starter", price: "$49", desc: "Perfect for early-stage fintech projects.", features: ["Up to 1,000 MAU", "Standard API Access", "Email Support", "Public Cloud Deployment"] },
        { name: "Professional", price: "$299", desc: "For growing companies scaling fast.", features: ["Up to 10,000 MAU", "Priority Support", "Dedicated Infrastructure", "Advanced Analytics", "Custom Compliance Rules"], highlighted: true },
        { name: "Enterprise", price: "Custom", desc: "Institutional grade requirements.", features: ["Unlimited Scale", "24/7 Phone Support", "SLA Guarantees", "On-premise Options", "Dedicated Account Manager"] }
      ].map((plan, i) => (
        <Card key={i} className={cn("flex flex-col", plan.highlighted && "border-primary ring-1 ring-primary shadow-lg")}>
          <CardHeader>
            <CardTitle>{plan.name}</CardTitle>
            <div className="mt-4">
              <span className="text-4xl font-bold">{plan.price}</span>
              {plan.price !== "Custom" && <span className="text-muted-foreground ml-2 text-sm">/mo</span>}
            </div>
            <CardDescription className="mt-4">{plan.desc}</CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <ul className="space-y-3">
              {plan.features.map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-primary" /> {f}
                </li>
              ))}
            </ul>
          </CardContent>
          <div className="p-6 pt-0">
            <Button className="w-full" variant={plan.highlighted ? "primary" : "outline"}>
              {plan.name === "Enterprise" ? "Contact Sales" : "Get Started"}
            </Button>
          </div>
        </Card>
      ))}
    </div>
  </Section>
);

const FAQ = () => (
  <Section id="faq" className="bg-muted/30">
    <div className="max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold tracking-tight mb-12 text-center">Frequently Asked Questions</h2>
      <div className="space-y-4">
        {[
          { q: "How secure is Aurem infrastructure?", a: "We use military-grade encryption and multi-sig custody solutions. Our platform is audited quarterly by leading security firms and compliant with SOC2 Type II standards." },
          { q: "Can I migrate from my current provider?", a: "Yes, we offer dedicated migration tools and support for most major fintech infrastructure providers. Our team can help you transition with zero downtime." },
          { q: "Do you support custom integrations?", a: "Our Enterprise plan includes custom integration support. Our API is RESTful and designed to be highly extensible for any bespoke requirement." },
          { q: "What jurisdictions do you support?", a: "Aurem is built for global operations. We have pre-configured compliance rules for over 150 countries, including the US, EU, and major Asian markets." }
        ].map((item, i) => (
          <div key={i} className="border-b border-border pb-6">
            <h3 className="text-lg font-bold mb-2 flex items-center justify-between group cursor-pointer">
              {item.q}
              <Plus className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
            </h3>
            <p className="text-muted-foreground text-sm">{item.a}</p>
          </div>
        ))}
      </div>
    </div>
  </Section>
);

const Footer = () => (
  <footer className="border-t border-border bg-background py-16 px-6 md:px-12 lg:px-24">
    <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12">
      <div className="col-span-2 lg:col-span-2">
        <Link href="/" className="text-xl font-bold tracking-tight">
          AUREM
        </Link>
        <p className="mt-4 text-sm text-muted-foreground max-w-xs">
          Empowering the next generation of financial institutions with cutting-edge infrastructure and intelligence.
        </p>
      </div>
      <div>
        <h4 className="text-sm font-bold uppercase tracking-widest mb-6">Product</h4>
        <ul className="space-y-4 text-sm text-muted-foreground">
          <li><Link href="#" className="hover:text-foreground">Features</Link></li>
          <li><Link href="#" className="hover:text-foreground">Security</Link></li>
          <li><Link href="#" className="hover:text-foreground">Enterprise</Link></li>
          <li><Link href="#" className="hover:text-foreground">Pricing</Link></li>
        </ul>
      </div>
      <div>
        <h4 className="text-sm font-bold uppercase tracking-widest mb-6">Resources</h4>
        <ul className="space-y-4 text-sm text-muted-foreground">
          <li><Link href="#" className="hover:text-foreground">Documentation</Link></li>
          <li><Link href="#" className="hover:text-foreground">API Reference</Link></li>
          <li><Link href="#" className="hover:text-foreground">Status</Link></li>
          <li><Link href="#" className="hover:text-foreground">Community</Link></li>
        </ul>
      </div>
      <div>
        <h4 className="text-sm font-bold uppercase tracking-widest mb-6">Legal</h4>
        <ul className="space-y-4 text-sm text-muted-foreground">
          <li><Link href="#" className="hover:text-foreground">Privacy</Link></li>
          <li><Link href="#" className="hover:text-foreground">Terms</Link></li>
          <li><Link href="#" className="hover:text-foreground">Compliance</Link></li>
          <li><Link href="#" className="hover:text-foreground">Cookie Policy</Link></li>
        </ul>
      </div>
    </div>
    <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
      <p>© 2026 Aurem Infrastructure Inc. All rights reserved.</p>
      <div className="flex items-center gap-6">
        <Link href="#" className="hover:text-foreground">Twitter</Link>
        <Link href="#" className="hover:text-foreground">GitHub</Link>
        <Link href="#" className="hover:text-foreground">LinkedIn</Link>
      </div>
    </div>
  </footer>
);

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <SocialProof />
      <Features />
      <BentoFeatures />
      <Pricing />
      <FAQ />
      <Footer />
    </div>
  );
}
