"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  CheckCircle2, 
  ArrowRight, 
  Layout, 
  Shield, 
  Zap, 
  BarChart3, 
  Users2, 
  Search, 
  Menu,
  ChevronDown,
  Globe,
  MessageCircle,
  Share2
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from "recharts";

// --- Mock Data ---
const performanceData = [
  { name: "Jan", value: 400 },
  { name: "Feb", value: 300 },
  { name: "Mar", value: 600 },
  { name: "Apr", value: 800 },
  { name: "May", value: 700 },
  { name: "Jun", value: 900 },
];

const features = [
  {
    title: "Enterprise Grade Security",
    description: "SOC2 Type II compliant with end-to-end encryption for all your project data.",
    icon: Shield,
    className: "md:col-span-2 lg:col-span-1",
  },
  {
    title: "Real-time Collaboration",
    description: "Multi-player editing with zero latency. Sync your team effortlessly across timezones.",
    icon: Zap,
    className: "md:col-span-1 lg:col-span-1",
  },
  {
    title: "Advanced Analytics",
    description: "Deep insights into team velocity and project bottlenecks with automated reporting.",
    icon: BarChart3,
    className: "md:col-span-1 lg:col-span-2",
  },
  {
    title: "Resource Management",
    description: "Optimize team bandwidth with visual workload charts and predictive scheduling.",
    icon: Users2,
    className: "md:col-span-2 lg:col-span-1",
  },
];

const pricingPlans = [
  {
    name: "Starter",
    price: "$49",
    description: "Perfect for small teams getting started.",
    features: ["Up to 10 users", "Basic Kanban boards", "5GB Storage", "Community support"],
    buttonText: "Start Free Trial",
    highlight: false,
  },
  {
    name: "Business",
    price: "$149",
    description: "The gold standard for growing companies.",
    features: ["Unlimited users", "Advanced workflows", "Unlimited storage", "24/7 Priority support", "Custom Integrations"],
    buttonText: "Get Started",
    highlight: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "Bespoke solutions for global organizations.",
    features: ["SAML SSO", "Dedicated success manager", "White-glove onboarding", "Audit logs", "Custom SLA"],
    buttonText: "Contact Sales",
    highlight: false,
  },
];

const faqs = [
  {
    question: "How does ZenKanban handle large-scale projects?",
    answer: "Our engine is built for performance. We use virtualized grids and optimized data streams to handle boards with thousands of cards without a single frame drop.",
  },
  {
    question: "Can we migrate from other tools?",
    answer: "Yes. We offer seamless importers for Jira, Trello, and Monday.com, including all metadata, attachments, and history.",
  },
  {
    question: "Is there a dedicated mobile app?",
    answer: "ZenKanban is a PWA that works perfectly on any device, and we have native iOS and Android apps available for offline-first workflows.",
  },
];

// --- Sub-components ---

const SectionHeader = ({ title, subtitle, badge }: { title: string; subtitle?: string; badge?: string }) => (
  <div className="flex flex-col items-center text-center mb-12 space-y-4">
    {badge && (
      <span className="text-xs font-medium text-muted-foreground uppercase tracking-widest bg-muted px-3 py-1 rounded-full">
        {badge}
      </span>
    )}
    <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground max-w-3xl leading-tight">
      {title}
    </h2>
    {subtitle && (
      <p className="text-muted-foreground text-lg max-w-2xl">
        {subtitle}
      </p>
    )}
  </div>
);

const Navbar = () => (
  <nav className="fixed top-0 w-full z-50 border-b border-border/50 bg-background/80 backdrop-blur-md">
    <div className="container mx-auto px-4 h-16 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
          <Layout className="text-primary-foreground w-5 h-5" />
        </div>
        <span className="font-bold text-xl tracking-tighter">ZenKanban</span>
      </div>
      
      <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
        <Link href="#features" className="hover:text-foreground transition-colors">Features</Link>
        <Link href="#solutions" className="hover:text-foreground transition-colors">Solutions</Link>
        <Link href="#pricing" className="hover:text-foreground transition-colors">Pricing</Link>
        <Link href="#faq" className="hover:text-foreground transition-colors">Resources</Link>
      </div>

      <div className="flex items-center gap-4">
        <Link href="/login">
          <Button variant="ghost" size="sm">Log in</Button>
        </Link>
        <Link href="/register">
          <Button size="sm">Get Started</Button>
        </Link>
      </div>
    </div>
  </nav>
);

// --- Sections ---

const Hero = () => (
  <section className="relative pt-32 pb-20 overflow-hidden">
    <div className="container mx-auto px-4">
      <div className="flex flex-col items-center text-center space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-muted/50 text-xs font-medium text-muted-foreground">
            <Zap className="w-3 h-3 text-primary" />
            <span>ZenKanban v2.0 is now live</span>
          </span>
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
          className="text-5xl md:text-7xl font-black tracking-tight leading-none max-w-4xl"
        >
          The Future of <span className="text-muted-foreground">Enterprise</span> Workflow.
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
          className="text-muted-foreground text-xl max-w-2xl"
        >
          Zen-like clarity for complex projects. Build, track, and scale your operations with the world&apos;s most advanced Kanban engine.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3, ease: "easeOut" }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Button size="lg" className="h-12 px-8 text-base">
            Start Building Free
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
          <Button variant="outline" size="lg" className="h-12 px-8 text-base">
            Book a Demo
          </Button>
        </motion.div>

        {/* Hero Visual */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
          className="w-full max-w-6xl mt-16 border border-border rounded-xl bg-card shadow-2xl overflow-hidden aspect-video relative group"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/20" />
          <div className="p-4 border-b border-border flex items-center justify-between bg-muted/30">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-border" />
              <div className="w-3 h-3 rounded-full bg-border" />
              <div className="w-3 h-3 rounded-full bg-border" />
            </div>
            <div className="flex gap-4">
              <div className="w-32 h-4 rounded bg-border/50" />
              <div className="w-20 h-4 rounded bg-border/50" />
            </div>
          </div>
          <div className="p-8 grid grid-cols-3 gap-6 h-full">
            {[1, 2, 3].map((col) => (
              <div key={col} className="space-y-4">
                <div className="h-4 w-24 bg-border/50 rounded mb-6" />
                {[1, 2, 3].map((card) => (
                  <div key={card} className="p-4 border border-border rounded-lg bg-background space-y-3">
                    <div className="h-3 w-full bg-muted rounded" />
                    <div className="h-3 w-2/3 bg-muted rounded" />
                    <div className="flex justify-between items-center pt-2">
                      <div className="w-6 h-6 rounded-full bg-border" />
                      <div className="w-12 h-2 rounded bg-muted" />
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

const SocialProof = () => (
  <section className="py-12 border-y border-border bg-muted/20">
    <div className="container mx-auto px-4">
      <p className="text-center text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground mb-8">
        Powering global giants
      </p>
      <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
        {/* Mock Logos */}
        <span className="text-2xl font-black italic tracking-tighter">NEXUS</span>
        <span className="text-2xl font-black tracking-widest">VERTEX</span>
        <span className="text-2xl font-bold flex items-center gap-1">
          <div className="w-4 h-4 bg-foreground rounded-sm" />
          CORE
        </span>
        <span className="text-2xl font-black">SPHERE</span>
        <span className="text-2xl font-light tracking-[0.3em]">FLUX</span>
      </div>
    </div>
  </section>
);

const BentoFeatures = () => (
  <section id="features" className="py-24 bg-background">
    <div className="container mx-auto px-4">
      <SectionHeader 
        badge="Capabilities"
        title="Designed for high-velocity teams"
        subtitle="Experience a suite of features meticulously crafted for enterprise efficiency and zen-like focus."
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {features.map((feature, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -4 }}
            className={cn(
              "p-8 border border-border rounded-lg bg-card hover:border-primary/50 transition-colors",
              feature.className
            )}
          >
            <feature.icon className="w-10 h-10 mb-6 text-primary" />
            <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
            <p className="text-muted-foreground leading-relaxed">
              {feature.description}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const DashboardPreview = () => (
  <section id="solutions" className="py-24 bg-muted/30">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="space-y-8">
          <span className="text-xs font-bold text-primary uppercase tracking-widest">Actionable Insights</span>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">
            Stop guessing. <br />
            <span className="text-muted-foreground">Start measuring.</span>
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            ZenKanban doesn&apos;t just track tasks. It analyzes your team&apos;s digital heartbeat, identifying bottlenecks before they become delays.
          </p>
          <ul className="space-y-4">
            {["Predictive lead time analysis", "Automated resource allocation", "Cross-project dependency mapping"].map((item, i) => (
              <li key={i} className="flex items-center gap-3 text-sm font-medium">
                <CheckCircle2 className="w-5 h-5 text-primary" />
                {item}
              </li>
            ))}
          </ul>
          <Button className="group">
            Explore Dashboard
            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
        
        <Card className="p-6 h-[400px] bg-background border-border shadow-2xl relative overflow-hidden group">
          <div className="flex items-center justify-between mb-8">
            <div>
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Revenue Growth</p>
              <h4 className="text-3xl font-black">+$124.5k</h4>
            </div>
            <div className="flex gap-2">
              <div className="px-2 py-1 rounded bg-primary/10 text-primary text-[10px] font-bold">+12.3%</div>
            </div>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={performanceData}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={2}
                  fillOpacity={1} 
                  fill="url(#colorValue)" 
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "hsl(var(--background))", 
                    borderColor: "hsl(var(--border))",
                    borderRadius: "8px",
                    fontSize: "12px"
                  }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  </section>
);

const Testimonials = () => (
  <section className="py-24 bg-background">
    <div className="container mx-auto px-4">
      <SectionHeader 
        badge="Testimonials"
        title="Trusted by those who build the future"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {[
          {
            quote: "ZenKanban transformed our chaotic release cycles into a predictable, zen-like flow. It's not just a tool; it's our operating system.",
            author: "Sarah Chen",
            role: "CTO at Vertex Systems",
            avatar: "SC"
          },
          {
            quote: "The deep analytics and dependency mapping solved problems we didn't even know we had. Our velocity increased by 40% in three months.",
            author: "Marcus Thorne",
            role: "VP of Product at Sphere Labs",
            avatar: "MT"
          }
        ].map((t, i) => (
          <Card key={i} className="p-10 border-border hover:border-primary/30 transition-colors">
            <div className="space-y-6">
              <div className="flex gap-1 text-primary">
                {[1, 2, 3, 4, 5].map((s) => <Zap key={s} className="w-4 h-4 fill-current" />)}
              </div>
              <p className="text-xl font-medium leading-relaxed italic">&quot;{t.quote}&quot;</p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center font-bold text-sm">
                  {t.avatar}
                </div>
                <div>
                  <p className="font-bold">{t.author}</p>
                  <p className="text-sm text-muted-foreground">{t.role}</p>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  </section>
);

const Pricing = () => (
  <section id="pricing" className="py-24 bg-muted/30">
    <div className="container mx-auto px-4">
      <SectionHeader 
        badge="Pricing"
        title="Simple, transparent, scalable"
        subtitle="Choose the plan that fits your team's ambition. No hidden fees, no complex tiers."
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {pricingPlans.map((plan, i) => (
          <Card key={i} className={cn(
            "relative p-8 flex flex-col h-full border-border transition-all duration-300",
            plan.highlight ? "border-primary ring-1 ring-primary shadow-xl scale-105 z-10 bg-background" : "bg-card"
          )}>
            {plan.highlight && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">
                Most Popular
              </span>
            )}
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-black">{plan.price}</span>
                {plan.price !== "Custom" && <span className="text-muted-foreground text-sm">/mo</span>}
              </div>
              <p className="text-sm text-muted-foreground mt-4">{plan.description}</p>
            </div>
            <div className="space-y-4 mb-8 flex-grow">
              {plan.features.map((feat, j) => (
                <div key={j} className="flex items-center gap-3 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
            <Button variant={plan.highlight ? "default" : "outline"} className="w-full">
              {plan.buttonText}
            </Button>
          </Card>
        ))}
      </div>
    </div>
  </section>
);

const FAQ = () => (
  <section id="faq" className="py-24 bg-background">
    <div className="container mx-auto px-4">
      <div className="max-w-3xl mx-auto">
        <SectionHeader 
          badge="FAQ"
          title="Questions? We have answers."
        />
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <Card key={i} className="p-6 border-border hover:bg-muted/30 transition-colors cursor-pointer group">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-lg">{faq.question}</h4>
                <ChevronDown className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                {faq.answer}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="py-20 border-t border-border bg-background">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-12 mb-16">
        <div className="col-span-2 space-y-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-primary rounded flex items-center justify-center">
              <Layout className="text-primary-foreground w-4 h-4" />
            </div>
            <span className="font-bold text-lg tracking-tighter">ZenKanban</span>
          </div>
          <p className="text-muted-foreground text-sm max-w-xs leading-relaxed">
            The ultimate project operating system for high-performance enterprise teams.
          </p>
          <div className="flex gap-4">
            <Button variant="ghost" size="icon" className="rounded-full w-8 h-8">
              <MessageCircle className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full w-8 h-8">
              <Globe className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full w-8 h-8">
              <Share2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
        
        <div>
          <h5 className="font-bold text-sm mb-6 uppercase tracking-widest">Product</h5>
          <ul className="space-y-4 text-sm text-muted-foreground">
            <li><Link href="#" className="hover:text-foreground transition-colors">Features</Link></li>
            <li><Link href="#" className="hover:text-foreground transition-colors">Integrations</Link></li>
            <li><Link href="#" className="hover:text-foreground transition-colors">Enterprise</Link></li>
            <li><Link href="#" className="hover:text-foreground transition-colors">Pricing</Link></li>
          </ul>
        </div>

        <div>
          <h5 className="font-bold text-sm mb-6 uppercase tracking-widest">Company</h5>
          <ul className="space-y-4 text-sm text-muted-foreground">
            <li><Link href="#" className="hover:text-foreground transition-colors">About</Link></li>
            <li><Link href="#" className="hover:text-foreground transition-colors">Blog</Link></li>
            <li><Link href="#" className="hover:text-foreground transition-colors">Careers</Link></li>
            <li><Link href="#" className="hover:text-foreground transition-colors">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h5 className="font-bold text-sm mb-6 uppercase tracking-widest">Legal</h5>
          <ul className="space-y-4 text-sm text-muted-foreground">
            <li><Link href="#" className="hover:text-foreground transition-colors">Privacy</Link></li>
            <li><Link href="#" className="hover:text-foreground transition-colors">Terms</Link></li>
            <li><Link href="#" className="hover:text-foreground transition-colors">Security</Link></li>
          </ul>
        </div>
      </div>
      
      <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} ZenKanban Inc. All rights reserved.
        </p>
        <div className="flex gap-8 text-xs text-muted-foreground font-medium">
          <Link href="#" className="hover:text-foreground transition-colors">System Status</Link>
          <Link href="#" className="hover:text-foreground transition-colors">API Docs</Link>
          <Link href="#" className="hover:text-foreground transition-colors">Support</Link>
        </div>
      </div>
    </div>
  </footer>
);

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans antialiased">
      <Navbar />
      <main>
        <Hero />
        <SocialProof />
        <BentoFeatures />
        <DashboardPreview />
        <Testimonials />
        <Pricing />
        <FAQ />
        
        {/* CTA Section */}
        <section className="py-24">
          <div className="container mx-auto px-4">
            <Card className="p-12 md:p-20 bg-primary text-primary-foreground border-none overflow-hidden relative">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.1),transparent)]" />
              <div className="relative z-10 flex flex-col items-center text-center space-y-8">
                <h2 className="text-4xl md:text-6xl font-black tracking-tight max-w-3xl">
                  Ready to reach peak efficiency?
                </h2>
                <p className="text-primary-foreground/80 text-xl max-w-2xl">
                  Join 10,000+ teams who have already simplified their complex workflows with ZenKanban.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" variant="secondary" className="h-12 px-8 font-bold">
                    Get Started Now
                  </Button>
                  <Button size="lg" variant="outline" className="h-12 px-8 border-primary-foreground/20 hover:bg-primary-foreground/10 text-primary-foreground">
                    Talk to Sales
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
