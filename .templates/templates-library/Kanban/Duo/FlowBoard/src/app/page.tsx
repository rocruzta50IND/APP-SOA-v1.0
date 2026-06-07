"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  ChevronRight, 
  Layout, 
  Zap, 
  Shield, 
  BarChart3, 
  Users, 
  Workflow, 
  Check,
  Plus,
  Menu,
  X
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

// --- Components ---

const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="section-container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <Layout className="h-5 w-5" />
          </div>
          <span className="text-lg font-bold tracking-tight">FlowBoard</span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="#features" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Features</Link>
          <Link href="#pricing" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Pricing</Link>
          <Link href="#faq" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Resources</Link>
          <div className="flex items-center gap-4 border-l border-border pl-8">
            <Link href="/login">
              <Button variant="ghost" size="sm">Log in</Button>
            </Link>
            <Link href="/register">
              <Button size="sm">Get Started</Button>
            </Link>
          </div>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden p-2" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden border-b border-border bg-background p-6 flex flex-col gap-4"
        >
          <Link href="#features" className="text-sm font-medium" onClick={() => setIsOpen(false)}>Features</Link>
          <Link href="#pricing" className="text-sm font-medium" onClick={() => setIsOpen(false)}>Pricing</Link>
          <Link href="#faq" className="text-sm font-medium" onClick={() => setIsOpen(false)}>Resources</Link>
          <hr className="border-border" />
          <Link href="/login" onClick={() => setIsOpen(false)}>
            <Button variant="outline" className="w-full">Log in</Button>
          </Link>
          <Link href="/register" onClick={() => setIsOpen(false)}>
            <Button className="w-full">Get Started</Button>
          </Link>
        </motion.div>
      )}
    </nav>
  );
};

const SectionHeader = ({ title, subtitle, badge }: { title: string; subtitle: string; badge?: string }) => (
  <div className="flex flex-col items-center text-center mb-16">
    {badge && <Badge variant="outline" className="mb-4 uppercase tracking-widest">{badge}</Badge>}
    <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">{title}</h2>
    <p className="text-muted-foreground text-lg max-w-2xl">{subtitle}</p>
  </div>
);

// --- Sections ---

const Hero = () => (
  <section className="relative pt-32 pb-20 overflow-hidden">
    <div className="section-container">
      <div className="flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Badge variant="outline" className="mb-6 rounded-full px-4 py-1.5 border-primary/20 bg-primary/5 text-primary">
            v2.0 is now live — featuring AI Workflows
          </Badge>
        </motion.div>
        
        <motion.h1 
          className="text-5xl md:text-7xl font-bold tracking-tighter mb-8 leading-[1.1]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          Project Management <br />
          <span className="text-muted-foreground">Reimagined for Teams</span>
        </motion.h1>

        <motion.p 
          className="text-xl text-muted-foreground max-w-3xl mb-10 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          The enterprise-grade Kanban engine that combines high-density data visualization with seamless workflow automation. Built for high-performance engineering teams.
        </motion.p>

        <motion.div 
          className="flex flex-col sm:flex-row gap-4 mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <Link href="/register">
            <Button size="lg" className="h-12 px-8 text-base">
              Start Free Trial <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <Button variant="outline" size="lg" className="h-12 px-8 text-base">
            Book a Demo
          </Button>
        </motion.div>

        {/* Dashboard Preview */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="relative w-full max-w-5xl mx-auto border border-border rounded-lg bg-muted/50 p-2 shadow-2xl"
        >
          <div className="bg-background rounded-md border border-border aspect-[16/9] overflow-hidden">
             <div className="h-full w-full p-4 flex gap-4 overflow-x-auto">
                {[
                  { title: "Backlog", tasks: 4 },
                  { title: "In Progress", tasks: 3 },
                  { title: "Review", tasks: 2 },
                  { title: "Done", tasks: 5 }
                ].map((col, i) => (
                  <div key={i} className="min-w-[280px] bg-muted/30 rounded-md p-3 flex flex-col gap-3">
                    <div className="flex items-center justify-between px-1">
                      <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{col.title}</span>
                      <Badge variant="outline" className="text-[10px]">{col.tasks}</Badge>
                    </div>
                    {Array.from({ length: col.tasks }).map((_, j) => (
                      <div key={j} className="bg-background border border-border p-3 rounded shadow-sm flex flex-col gap-2">
                        <div className="flex gap-1">
                           <div className="h-1 w-8 rounded-full bg-primary/20" />
                           <div className="h-1 w-4 rounded-full bg-primary/10" />
                        </div>
                        <div className="h-3 w-3/4 bg-muted rounded" />
                        <div className="h-2 w-1/2 bg-muted/50 rounded" />
                      </div>
                    ))}
                    <Button variant="ghost" size="sm" className="w-full justify-start text-muted-foreground">
                      <Plus className="h-3 w-3 mr-2" /> Add Task
                    </Button>
                  </div>
                ))}
             </div>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

const SocialProof = () => (
  <section className="py-12 border-y border-border bg-muted/10">
    <div className="section-container">
      <p className="text-center text-xs font-medium text-muted-foreground uppercase tracking-[0.2em] mb-8">
        Trusted by industry leaders worldwide
      </p>
      <div className="flex flex-wrap justify-center gap-x-12 gap-y-8 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
        {/* Placeholder Logos (Inline SVGs) */}
        {[1, 2, 3, 4, 5].map((i) => (
          <svg key={i} className="h-8 w-auto fill-foreground" viewBox="0 0 120 40">
            <rect width="120" height="40" rx="4" fill="currentColor" fillOpacity="0.1" />
            <text x="50%" y="55%" dominantBaseline="middle" textAnchor="middle" className="text-[10px] font-bold">LOGOTYPE {i}</text>
          </svg>
        ))}
      </div>
    </div>
  </section>
);

const Features = () => (
  <section id="features" className="py-24 bg-background">
    <div className="section-container">
      <SectionHeader 
        badge="Engineered for Performance"
        title="Everything you need to ship faster"
        subtitle="FlowBoard provides the tools necessary for modern engineering teams to manage complex projects without the bloat."
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { icon: <Zap className="h-6 w-6" />, title: "Real-time Sync", desc: "Every update is synchronized across your entire organization in milliseconds." },
          { icon: <Workflow className="h-6 w-6" />, title: "Custom Workflows", desc: "Automate repetitive tasks with our powerful, logic-based workflow engine." },
          { icon: <BarChart3 className="h-6 w-6" />, title: "Advanced Analytics", desc: "Gain deep insights into your team&apos;s velocity and identify bottlenecks." },
          { icon: <Shield className="h-6 w-6" />, title: "Enterprise Security", desc: "SOC2 Type II compliant with advanced SSO and RBAC capabilities." },
          { icon: <Users className="h-6 w-6" />, title: "Team Collaboration", desc: "Built-in commenting, file sharing, and real-time presence indicators." },
          { icon: <Layout className="h-6 w-6" />, title: "Multi-Board Views", desc: "View your work as a Kanban board, Gantt chart, or high-density list." }
        ].map((f, i) => (
          <Card key={i} className="group hover:border-primary/50 transition-colors">
            <CardHeader>
              <div className="h-12 w-12 rounded-md bg-muted flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                {f.icon}
              </div>
              <CardTitle>{f.title}</CardTitle>
              <CardDescription>{f.desc}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  </section>
);

const Pricing = () => (
  <section id="pricing" className="py-24 bg-muted/30">
    <div className="section-container">
      <SectionHeader 
        badge="Pricing"
        title="Simple, transparent plans"
        subtitle="Choose the perfect plan for your team&apos;s scale. No hidden fees."
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {[
          { name: "Starter", price: "$0", desc: "For individuals and small projects", features: ["Up to 3 boards", "Unlimited members", "Basic analytics"] },
          { name: "Pro", price: "$12", desc: "For growing teams needing more power", features: ["Unlimited boards", "Advanced workflows", "Custom fields", "Time tracking"], featured: true },
          { name: "Enterprise", price: "Custom", desc: "For large organizations", features: ["SAML SSO", "Audit logs", "Dedicated support", "Custom SLAs"] }
        ].map((plan, i) => (
          <Card key={i} className={cn("relative flex flex-col", plan.featured && "border-primary shadow-lg scale-105 z-10")}>
            {plan.featured && (
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <Badge className="bg-primary text-primary-foreground">Most Popular</Badge>
              </div>
            )}
            <CardHeader>
              <CardTitle>{plan.name}</CardTitle>
              <div className="mt-4 flex items-baseline">
                <span className="text-4xl font-bold">{plan.price}</span>
                {plan.price !== "Custom" && <span className="ml-1 text-muted-foreground">/mo</span>}
              </div>
              <CardDescription className="mt-2">{plan.desc}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <ul className="space-y-3">
                {plan.features.map((f, j) => (
                  <li key={j} className="flex items-center text-sm">
                    <Check className="mr-2 h-4 w-4 text-primary" /> {f}
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full" variant={plan.featured ? "default" : "outline"}>
                {plan.price === "Custom" ? "Contact Sales" : "Get Started"}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  </section>
);

const FAQ = () => (
  <section id="faq" className="py-24 bg-background">
    <div className="section-container">
      <SectionHeader 
        badge="FAQ"
        title="Frequently Asked Questions"
        subtitle="Everything you need to know about FlowBoard."
      />

      <div className="max-w-3xl mx-auto space-y-4">
        {[
          { q: "Can I import my data from other tools?", a: "Yes, we support one-click imports from Jira, Trello, and Asana. Your entire workflow, including attachments and comments, will be preserved." },
          { q: "Is there a limit on the number of users?", a: "No, all our plans (including the Free tier) support unlimited team members. We believe collaboration should never be throttled." },
          { q: "How secure is my data?", a: "We use AES-256 encryption at rest and TLS 1.3 in transit. Our infrastructure is hosted in ISO 27001 certified data centers." }
        ].map((item, i) => (
          <div key={i} className="border border-border rounded-md p-6">
            <h4 className="font-semibold mb-2">{item.q}</h4>
            <p className="text-sm text-muted-foreground">{item.a}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="py-20 border-t border-border bg-background">
    <div className="section-container">
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-16">
        <div className="col-span-2">
          <div className="flex items-center gap-2 mb-6">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <Layout className="h-5 w-5" />
            </div>
            <span className="text-lg font-bold tracking-tight">FlowBoard</span>
          </div>
          <p className="text-muted-foreground text-sm max-w-xs leading-relaxed">
            The high-density workflow orchestration platform for modern engineering teams. Built for speed, reliability, and precision.
          </p>
        </div>
        <div>
          <h5 className="font-bold text-sm mb-6 uppercase tracking-widest">Product</h5>
          <ul className="space-y-4 text-sm text-muted-foreground">
            <li><Link href="#" className="hover:text-foreground">Features</Link></li>
            <li><Link href="#" className="hover:text-foreground">Integrations</Link></li>
            <li><Link href="#" className="hover:text-foreground">Changelog</Link></li>
            <li><Link href="#" className="hover:text-foreground">API</Link></li>
          </ul>
        </div>
        <div>
          <h5 className="font-bold text-sm mb-6 uppercase tracking-widest">Company</h5>
          <ul className="space-y-4 text-sm text-muted-foreground">
            <li><Link href="#" className="hover:text-foreground">About</Link></li>
            <li><Link href="#" className="hover:text-foreground">Careers</Link></li>
            <li><Link href="#" className="hover:text-foreground">Blog</Link></li>
            <li><Link href="#" className="hover:text-foreground">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h5 className="font-bold text-sm mb-6 uppercase tracking-widest">Legal</h5>
          <ul className="space-y-4 text-sm text-muted-foreground">
            <li><Link href="#" className="hover:text-foreground">Privacy</Link></li>
            <li><Link href="#" className="hover:text-foreground">Terms</Link></li>
            <li><Link href="#" className="hover:text-foreground">Security</Link></li>
          </ul>
        </div>
      </div>
      <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-border">
        <p className="text-xs text-muted-foreground mb-4 md:mb-0">
          © {new Date().getFullYear()} FlowBoard Inc. All rights reserved.
        </p>
        <div className="flex gap-6">
           {/* Inline SVGs for Socials */}
           <svg className="h-4 w-4 fill-muted-foreground hover:fill-foreground cursor-pointer" viewBox="0 0 24 24">
             <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
           </svg>
           <svg className="h-4 w-4 fill-muted-foreground hover:fill-foreground cursor-pointer" viewBox="0 0 24 24">
             <path d="M12 .3C5.4.3 0 5.7 0 12.3c0 5.3 3.4 9.8 8.2 11.4.6.1.8-.3.8-.6v-2.2c-3.3.7-4-1.4-4-1.4-.5-1.4-1.3-1.8-1.3-1.8-1.1-.7.1-.7.1-.7 1.2.1 1.9 1.2 1.9 1.2 1.1 1.9 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-6 0-1.3.5-2.4 1.3-3.2-.1-.3-.6-1.6.1-3.2 0 0 1-.3 3.3 1.2 1-1.2 2.1-1.2 3.1-1.2 1.1 0 2.1.1 3.1 1.2 2.3-1.5 3.3-1.2 3.3-1.2.7 1.6.2 2.9.1 3.2.8.8 1.3 1.9 1.3 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6C20.6 22.1 24 17.6 24 12.3 24 5.7 18.6.3 12 .3z" />
           </svg>
        </div>
      </div>
    </div>
  </footer>
);

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
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
