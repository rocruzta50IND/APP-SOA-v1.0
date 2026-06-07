"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { 
  CheckCircle2, 
  ChevronRight, 
  ShieldCheck, 
  Zap, 
  BarChart3, 
  Cpu, 
  Globe, 
  ArrowRight,
  Menu,
  X
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";

const transition = { duration: 0.2, ease: "easeOut" } as const;

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <SocialProof />
        <FeaturesGrid />
        <MetricsSection />
        <PricingSection />
        <FAQSection />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-md">
      <div className="section-container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 bg-primary rounded-sm" />
          <span className="text-lg font-bold tracking-tighter">TestNexus</span>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          <Link href="#features" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Features</Link>
          <Link href="#pricing" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Pricing</Link>
          <Link href="#faq" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">FAQ</Link>
          <div className="flex items-center gap-4 border-l border-border pl-8">
            <Link href="/login">
              <Button variant="ghost" size="sm">Log in</Button>
            </Link>
            <Link href="/register">
              <Button size="sm">Get Started</Button>
            </Link>
          </div>
        </nav>

        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden border-b border-border bg-background p-4 flex flex-col gap-4"
        >
          <Link href="#features" className="text-sm font-medium">Features</Link>
          <Link href="#pricing" className="text-sm font-medium">Pricing</Link>
          <Link href="#faq" className="text-sm font-medium">FAQ</Link>
          <div className="flex flex-col gap-2 pt-4 border-t border-border">
            <Link href="/login" className="w-full">
              <Button variant="outline" className="w-full">Log in</Button>
            </Link>
            <Link href="/register" className="w-full">
              <Button className="w-full">Get Started</Button>
            </Link>
          </div>
        </motion.div>
      )}
    </header>
  );
}

function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-20 pb-32 lg:pt-32">
      <div className="section-container relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={transition}
        >
          <span className="inline-flex items-center rounded-full border border-border bg-muted/50 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
            v2.0 is now live
          </span>
          <h1 className="mt-8 text-5xl font-black tracking-tighter sm:text-7xl lg:text-8xl leading-[0.9] uppercase">
            Surgical Test <br />
            <span className="text-muted-foreground">Infrastructure.</span>
          </h1>
          <p className="mx-auto mt-8 max-w-2xl text-lg text-muted-foreground">
            The enterprise-grade testing platform for high-ticket SaaS. 
            Automate complexity, eliminate bottlenecks, and ship with absolute confidence.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/register">
              <Button size="lg" className="h-14 px-8 text-lg font-bold uppercase tracking-tight">
                Start Deployment <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="h-14 px-8 text-lg font-bold uppercase tracking-tight">
              View Documentation
            </Button>
          </div>
        </motion.div>
      </div>
      
      {/* Background Grid Decoration */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
    </section>
  );
}

function SocialProof() {
  return (
    <section className="border-y border-border bg-muted/30 py-12">
      <div className="section-container">
        <p className="text-center text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground mb-8">
          Trusted by infrastructure giants
        </p>
        <div className="grid grid-cols-2 gap-8 opacity-50 grayscale md:grid-cols-4 lg:grid-cols-6 items-center">
          {["ACME", "GLOBEX", "SOYLENT", "INITECH", "UMBRELLA", "Hooli"].map((logo) => (
            <div key={logo} className="flex justify-center text-xl font-black tracking-tighter underline decoration-2 underline-offset-4">
              {logo}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const features = [
  {
    title: "Global Execution",
    description: "Run millions of tests concurrently across 40+ global regions with sub-second latency.",
    icon: Globe,
  },
  {
    title: "AI-Powered Flakiness Detection",
    description: "Identify and isolate non-deterministic tests before they impact your deployment pipeline.",
    icon: Zap,
  },
  {
    title: "Surgical Analytics",
    description: "Deep-dive into performance regressions with precision metrics and visual diffing.",
    icon: BarChart3,
  },
  {
    title: "Enterprise Security",
    description: "SOC2 Type II compliant infrastructure with end-to-end encryption for your test data.",
    icon: ShieldCheck,
  },
  {
    title: "Hardware Agnostic",
    description: "Execute tests on real devices or scalable virtual environments without configuration overhead.",
    icon: Cpu,
  },
  {
    title: "Continuous Integration",
    description: "Native plugins for GitHub Actions, GitLab CI, and Jenkins. Deploy with zero friction.",
    icon: CheckCircle2,
  },
];

function FeaturesGrid() {
  return (
    <section id="features" className="py-24 lg:py-32">
      <div className="section-container">
        <div className="mb-16 max-w-2xl">
          <h2 className="text-3xl font-black tracking-tighter uppercase sm:text-5xl">
            Engineered for <span className="text-muted-foreground">Scale.</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            TestNexus provides the skeletal structure for your entire QA lifecycle. No bloat, just performance.
          </p>
        </div>
        
        <div className="grid gap-px bg-border overflow-hidden border border-border rounded-lg md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => (
            <div key={i} className="bg-background p-8 group hover:bg-muted/50 transition-colors">
              <feature.icon className="h-8 w-8 text-primary mb-6" />
              <h3 className="text-lg font-bold mb-2 uppercase tracking-tight">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function MetricsSection() {
  const metrics = [
    { label: "Tests Executed", value: "4.2B+" },
    { label: "Avg. Latency", value: "<12ms" },
    { label: "Uptime SLA", value: "99.99%" },
    { label: "Regions", value: "42" },
  ];

  return (
    <section className="border-t border-border py-24 bg-black">
      <div className="section-container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
          {metrics.map((metric, i) => (
            <div key={i} className="text-center">
              <div className="text-4xl lg:text-6xl font-black tracking-tighter text-white mb-2">{metric.value}</div>
              <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{metric.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PricingSection() {
  return (
    <section id="pricing" className="py-24 lg:py-32 border-t border-border">
      <div className="section-container">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-black tracking-tighter uppercase sm:text-5xl">Simple Pricing.</h2>
          <p className="mt-4 text-muted-foreground">Transparent plans for teams of all sizes.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <PricingCard 
            tier="Starter" 
            price="$49" 
            features={["10k Test Minutes", "3 Parallel Runs", "Community Support", "Basic Analytics"]} 
          />
          <PricingCard 
            tier="Professional" 
            price="$199" 
            highlight 
            features={["100k Test Minutes", "20 Parallel Runs", "Priority Support", "Advanced Reporting", "Team Management"]} 
          />
          <PricingCard 
            tier="Enterprise" 
            price="Custom" 
            features={["Unlimited Minutes", "Unlimited Parallelism", "Dedicated Account Manager", "SSO & SAML", "Custom Regions"]} 
          />
        </div>
      </div>
    </section>
  );
}

function PricingCard({ tier, price, features, highlight = false }: { tier: string, price: string, features: string[], highlight?: boolean }) {
  return (
    <Card className={cn(
      "flex flex-col border-border relative overflow-hidden",
      highlight && "border-primary border-2"
    )}>
      {highlight && (
        <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-bl-md">
          Recommended
        </div>
      )}
      <CardContent className="p-8 flex flex-col h-full pt-10">
        <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2">{tier}</div>
        <div className="text-4xl font-black tracking-tighter mb-8">{price} <span className="text-sm font-normal text-muted-foreground">/mo</span></div>
        
        <ul className="space-y-4 mb-10 flex-1">
          {features.map((f, i) => (
            <li key={i} className="flex items-center text-sm">
              <CheckCircle2 className="h-4 w-4 mr-3 text-primary shrink-0" />
              {f}
            </li>
          ))}
        </ul>

        <Button variant={highlight ? "primary" : "outline"} className="w-full font-bold uppercase tracking-tight">
          Select {tier}
        </Button>
      </CardContent>
    </Card>
  );
}

function FAQSection() {
  const faqs = [
    { q: "How do you handle data security?", a: "We use AES-256 encryption at rest and TLS 1.3 in transit. Our infrastructure is SOC2 Type II certified." },
    { q: "Can I migrate from BrowserStack?", a: "Yes, we provide a CLI tool that automatically migrates your existing test suites with 99% compatibility." },
    { q: "What languages do you support?", a: "We support Playwright, Cypress, Selenium, and Appium across Node.js, Python, Java, and Go." },
    { q: "Do you offer on-premise solutions?", a: "Yes, our Enterprise plan includes the option for VPC deployment and on-premise execution agents." }
  ];

  return (
    <section id="faq" className="py-24 lg:py-32 border-t border-border bg-muted/20">
      <div className="section-container">
        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-1">
            <h2 className="text-3xl font-black tracking-tighter uppercase mb-4">Common Questions.</h2>
            <p className="text-muted-foreground">Everything you need to know about TestNexus.</p>
          </div>
          <div className="lg:col-span-2 space-y-8">
            {faqs.map((faq, i) => (
              <div key={i} className="border-b border-border pb-8 last:border-0">
                <h3 className="text-lg font-bold uppercase tracking-tight mb-4">{faq.q}</h3>
                <p className="text-muted-foreground leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="py-24 lg:py-32 bg-primary text-primary-foreground text-center">
      <div className="section-container">
        <h2 className="text-4xl font-black tracking-tighter uppercase sm:text-7xl mb-8">
          Ready to scale?
        </h2>
        <p className="max-w-2xl mx-auto mb-12 text-primary-foreground/80 text-lg">
          Join 500+ enterprises optimizing their testing infrastructure with TestNexus.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/register">
            <Button size="lg" variant="secondary" className="h-14 px-10 text-lg font-black uppercase tracking-tight">
              Get Started Now
            </Button>
          </Link>
          <Button variant="ghost" size="lg" className="h-14 px-10 text-lg font-black uppercase tracking-tight border border-primary-foreground/20 hover:bg-primary-foreground/10">
            Contact Sales
          </Button>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border py-12 bg-background">
      <div className="section-container">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-12">
          <div className="col-span-2 lg:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="h-6 w-6 bg-primary rounded-sm" />
              <span className="text-lg font-bold tracking-tighter uppercase">TestNexus</span>
            </div>
            <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
              Surgical test infrastructure for the modern web. Built for performance, security, and absolute reliability.
            </p>
          </div>
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-foreground mb-6">Product</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li><Link href="#" className="hover:text-foreground">Features</Link></li>
              <li><Link href="#" className="hover:text-foreground">Security</Link></li>
              <li><Link href="#" className="hover:text-foreground">Enterprise</Link></li>
              <li><Link href="#" className="hover:text-foreground">Changelog</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-foreground mb-6">Resources</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li><Link href="#" className="hover:text-foreground">Documentation</Link></li>
              <li><Link href="#" className="hover:text-foreground">API Reference</Link></li>
              <li><Link href="#" className="hover:text-foreground">Guides</Link></li>
              <li><Link href="#" className="hover:text-foreground">Support</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-foreground mb-6">Company</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li><Link href="#" className="hover:text-foreground">About</Link></li>
              <li><Link href="#" className="hover:text-foreground">Blog</Link></li>
              <li><Link href="#" className="hover:text-foreground">Careers</Link></li>
              <li><Link href="#" className="hover:text-foreground">Legal</Link></li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-border gap-4">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} TestNexus Inc. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-2 16h-2v-6h2v6zm-1-6.891c-.607 0-1.1-.493-1.1-1.109 0-.616.493-1.109 1.1-1.109s1.1.493 1.1 1.109c0 .616-.493 1.109-1.1 1.109zm8 6.891h-2v-3.414c0-1.042-1.071-1.196-1.286-1.196s-1.286.154-1.286 1.196v3.414h-2v-6h2v.816c.414-.643 1.144-1.002 2.012-1.002 1.555 0 2.562 1.107 2.562 2.943v3.243z"/></svg>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
