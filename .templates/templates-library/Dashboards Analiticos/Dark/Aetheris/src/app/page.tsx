"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card, CardContent } from "@/components/ui/Card";
import { 
  BarChart3, 
  Shield, 
  Zap, 
  ArrowRight, 
  CheckCircle2, 
  ChevronRight,
  Globe,
  Database,
  Lock
} from "lucide-react";
import { motion } from "framer-motion";

const Navbar = () => (
  <nav className="fixed top-0 z-50 w-full border-b border-zinc-800 bg-black/50 backdrop-blur-md">
    <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-8">
      <div className="flex items-center gap-2">
        <div className="h-6 w-6 rounded bg-zinc-50" />
        <span className="text-lg font-bold tracking-tighter text-zinc-50 uppercase">Aetheris</span>
      </div>
      <div className="hidden items-center gap-8 md:flex">
        <Link href="#features" className="text-sm text-zinc-400 hover:text-zinc-50 transition-colors">Features</Link>
        <Link href="#pricing" className="text-sm text-zinc-400 hover:text-zinc-50 transition-colors">Pricing</Link>
        <Link href="#faq" className="text-sm text-zinc-400 hover:text-zinc-50 transition-colors">Enterprise</Link>
      </div>
      <div className="flex items-center gap-4">
        <Link href="/login" className="text-sm font-medium text-zinc-400 hover:text-zinc-50 transition-colors">Login</Link>
        <Button asChild size="sm">
          <Link href="/register">Get Started</Link>
        </Button>
      </div>
    </div>
  </nav>
);

const Hero = () => (
  <section className="relative flex min-h-screen flex-col items-center justify-center pt-20 px-4">
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-center"
    >
      <Badge variant="outline" className="mb-4 border-zinc-800 text-zinc-400 py-1 px-3">
        v4.0 is now live — Precision Analytics for Enterprise
      </Badge>
      <h1 className="max-w-4xl text-5xl font-bold tracking-tight text-zinc-50 md:text-7xl lg:text-8xl">
        Predict the future of your <span className="text-zinc-500 underline decoration-zinc-800">business</span>.
      </h1>
      <p className="mx-auto mt-6 max-w-2xl text-lg text-zinc-400 md:text-xl">
        Aetheris provides the world's most advanced analytical engine for high-ticket SaaS. 
        Deep insights, real-time tracking, and predictive modeling in one clinical interface.
      </p>
      <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
        <Button size="lg" className="h-12 px-8 text-base">
          Start Free Trial <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
        <Button variant="outline" size="lg" className="h-12 px-8 text-base">
          Book a Demo
        </Button>
      </div>
    </motion.div>
    <div className="mt-20 w-full max-w-6xl overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950/50 p-2 shadow-2xl">
      <div className="h-[400px] w-full rounded-lg bg-zinc-900/50 flex items-center justify-center border border-zinc-800">
         <div className="flex flex-col items-center gap-2">
            <BarChart3 className="h-12 w-12 text-zinc-700" />
            <span className="text-xs font-bold uppercase tracking-widest text-zinc-500">Analytics Preview</span>
         </div>
      </div>
    </div>
  </section>
);

const Features = () => {
  const features = [
    {
      title: "Real-time Processing",
      description: "Sub-millisecond latency for data ingestion and processing at global scale.",
      icon: Zap,
    },
    {
      title: "Enterprise Security",
      description: "SOC2 Type II, HIPAA, and GDPR compliant by default. Your data is encrypted at rest.",
      icon: Shield,
    },
    {
      title: "Global Infrastructure",
      description: "Deploy and analyze across 40+ regions worldwide with automatic geo-optimization.",
      icon: Globe,
    },
    {
      title: "Predictive Modeling",
      description: "Proprietary ML models trained on over 200B data points for precise forecasting.",
      icon: Database,
    },
    {
      title: "Clinical Precision",
      description: "Tier 1 minimalist interface designed for focus and rapid decision making.",
      icon: BarChart3,
    },
    {
      title: "Zero-Knowledge Auth",
      description: "Advanced authentication protocols that ensure only you have access to your data.",
      icon: Lock,
    },
  ];

  return (
    <section id="features" className="container mx-auto py-32 px-4 md:px-8">
      <div className="mb-16 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-zinc-50 md:text-5xl">Engineered for Scale.</h2>
        <p className="mt-4 text-zinc-400">Everything you need to dominate your market vertical.</p>
      </div>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {features.map((f, i) => (
          <Card key={i} className="group hover:border-zinc-500 transition-colors bg-black">
            <CardContent className="p-8">
              <f.icon className="mb-4 h-8 w-8 text-zinc-50" />
              <h3 className="mb-2 text-xl font-bold text-zinc-50">{f.title}</h3>
              <p className="text-sm leading-relaxed text-zinc-400">{f.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

const Pricing = () => (
  <section id="pricing" className="bg-zinc-950 py-32 border-y border-zinc-800 px-4">
    <div className="container mx-auto">
      <div className="mb-16 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-zinc-50 md:text-5xl">Transparent Pricing.</h2>
        <p className="mt-4 text-zinc-400">Choose the plan that fits your growth trajectory.</p>
      </div>
      <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-2">
        <Card className="flex flex-col border-zinc-800 bg-black">
          <CardContent className="flex-1 p-8">
            <h3 className="text-xl font-bold text-zinc-50">Growth</h3>
            <div className="mt-4 flex items-baseline gap-1">
              <span className="text-4xl font-bold tracking-tighter text-zinc-50">$499</span>
              <span className="text-sm text-zinc-400">/mo</span>
            </div>
            <p className="mt-4 text-sm text-zinc-400">Perfect for scaling startups needing deep insights.</p>
            <ul className="mt-8 space-y-4">
              {["Up to 10M events", "5 Team members", "1-day data retention", "Standard support"].map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm text-zinc-300">
                  <CheckCircle2 className="h-4 w-4 text-zinc-500" /> {item}
                </li>
              ))}
            </ul>
          </CardContent>
          <div className="p-8 pt-0">
            <Button variant="outline" className="w-full">Start Trial</Button>
          </div>
        </Card>
        <Card className="relative flex flex-col border-zinc-50 bg-black">
          <div className="absolute -top-3 right-8 rounded-full bg-zinc-50 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-zinc-950">
            Recommended
          </div>
          <CardContent className="flex-1 p-8">
            <h3 className="text-xl font-bold text-zinc-50">Enterprise</h3>
            <div className="mt-4 flex items-baseline gap-1">
              <span className="text-4xl font-bold tracking-tighter text-zinc-50">$2,499</span>
              <span className="text-sm text-zinc-400">/mo</span>
            </div>
            <p className="mt-4 text-sm text-zinc-400">Full power for high-ticket market leaders.</p>
            <ul className="mt-8 space-y-4">
              {["Unlimited events", "Unlimited team members", "90-day data retention", "24/7 Priority support", "Custom integrations"].map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm text-zinc-300">
                  <CheckCircle2 className="h-4 w-4 text-zinc-50" /> {item}
                </li>
              ))}
            </ul>
          </CardContent>
          <div className="p-8 pt-0">
            <Button className="w-full">Get Started</Button>
          </div>
        </Card>
      </div>
    </div>
  </section>
);

const FAQ = () => (
  <section id="faq" className="container mx-auto py-32 px-4 md:px-8">
    <div className="mx-auto max-w-3xl">
      <h2 className="mb-12 text-center text-3xl font-bold tracking-tight text-zinc-50">Frequently Asked Questions</h2>
      <div className="space-y-6">
        {[
          { q: "How secure is my data?", a: "We use AES-256 encryption at rest and TLS 1.3 in transit. We never sell your data." },
          { q: "Can I cancel anytime?", a: "Yes, our monthly plans are flexible. You can cancel at the end of any billing cycle." },
          { q: "Do you offer custom onboarding?", a: "For Enterprise customers, we provide a dedicated success manager and technical team." }
        ].map((item, i) => (
          <div key={i} className="border-b border-zinc-800 pb-6">
            <h3 className="text-lg font-bold text-zinc-50 mb-2">{item.q}</h3>
            <p className="text-zinc-400 text-sm leading-relaxed">{item.a}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="border-t border-zinc-800 py-12 px-4">
    <div className="container mx-auto flex flex-col items-center justify-between gap-6 md:flex-row">
      <div className="flex items-center gap-2">
        <div className="h-5 w-5 rounded bg-zinc-50" />
        <span className="text-sm font-bold tracking-tighter text-zinc-50 uppercase">Aetheris</span>
      </div>
      <p className="text-xs text-zinc-500 uppercase tracking-widest">© 2026 Aetheris Technologies. All rights reserved.</p>
      <div className="flex gap-6">
        <Link href="#" className="text-xs text-zinc-500 hover:text-zinc-50">Privacy</Link>
        <Link href="#" className="text-xs text-zinc-500 hover:text-zinc-50">Terms</Link>
        <Link href="#" className="text-xs text-zinc-500 hover:text-zinc-50">Status</Link>
      </div>
    </div>
  </footer>
);

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-black text-zinc-50 font-sans selection:bg-zinc-50 selection:text-zinc-950">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Pricing />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}
