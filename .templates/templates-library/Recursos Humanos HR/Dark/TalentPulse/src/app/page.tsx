"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  Users, 
  Zap, 
  Shield, 
  BarChart3, 
  Cpu, 
  Globe, 
  ArrowRight, 
  CheckCircle2, 
  MessageSquare,
  Search,
  Bell,
  Menu,
  X,
  Play
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

// --- Components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4",
      isScrolled ? "bg-background/80 backdrop-blur-xl border-b border-white/10" : "bg-transparent"
    )}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
            TalentPulse
          </span>
        </div>
        
        <div className="hidden md:flex items-center gap-8">
          {["Features", "Solutions", "Pricing", "About"].map((item) => (
            <Link key={item} href={`#${item.toLowerCase()}`} className="text-sm font-medium text-white/60 hover:text-white transition-colors">
              {item}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <Link href="/login" className="text-sm font-medium text-white/60 hover:text-white transition-colors">
            Sign In
          </Link>
          <Button size="sm">
            <Link href="/register">Get Started</Link>
          </Button>
        </div>
      </div>
    </nav>
  );
};

const SectionHeading = ({ badge, title, description, center = false }: { badge: string, title: string, description: string, center?: boolean }) => (
  <div className={cn("space-y-4 mb-12", center && "text-center")}>
    <Badge variant="primary" className="mb-2">{badge}</Badge>
    <h2 className="text-3xl md:text-5xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
      {title}
    </h2>
    <p className={cn("text-lg text-muted-foreground max-w-2xl", center && "mx-auto")}>
      {description}
    </p>
  </div>
);

// --- Sections ---

const Hero = () => (
  <section className="relative pt-32 pb-20 overflow-hidden">
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-primary/20 blur-[120px] rounded-full -z-10" />
    
    <div className="max-w-7xl mx-auto px-6 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Badge className="mb-6 px-4 py-1.5 text-sm">
          ✨ Introducing TalentPulse 2.0
        </Badge>
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/50 leading-tight">
          Modern HR for the <br /> <span className="text-primary">Intelligent Enterprise</span>
        </h1>
        <p className="text-lg md:text-xl text-white/60 max-w-3xl mx-auto mb-10 leading-relaxed">
          Recruit, manage, and scale your global workforce with an AI-driven platform 
          designed for speed, precision, and human-centric experiences.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button size="lg" className="w-full sm:w-auto h-14 px-10 text-lg" asChild>
            <Link href="/register">Start Free Trial</Link>
          </Button>
          <Button size="lg" variant="secondary" className="w-full sm:w-auto h-14 px-10 text-lg">
            <Play className="w-5 h-5 mr-2 fill-current" />
            Watch Demo
          </Button>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="mt-20 relative"
      >
        <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-sm p-4">
          <div className="aspect-video rounded-2xl bg-zinc-900 overflow-hidden relative border border-white/5">
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/10 to-transparent">
               <div className="grid grid-cols-3 gap-4 w-full p-8">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-40 bg-white/5 rounded-xl border border-white/10 animate-pulse" />
                  ))}
               </div>
            </div>
          </div>
        </div>
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-primary/30 blur-[80px] rounded-full" />
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-indigo-500/30 blur-[80px] rounded-full" />
      </motion.div>
    </div>
  </section>
);

const SocialProof = () => (
  <section className="py-20 border-y border-white/5 bg-white/[0.02]">
    <div className="max-w-7xl mx-auto px-6">
      <p className="text-center text-sm font-medium text-white/40 uppercase tracking-widest mb-12">
        Trusted by 500+ Global Enterprises
      </p>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="flex justify-center">
            <div className="h-8 w-32 bg-white/20 rounded" />
          </div>
        ))}
      </div>
    </div>
  </section>
);

const Features = () => (
  <section id="features" className="py-24 relative overflow-hidden">
    <div className="max-w-7xl mx-auto px-6">
      <SectionHeading 
        badge="Platform"
        title="Everything you need to scale"
        description="TalentPulse integrates every aspect of the employee lifecycle into a single, unified experience."
        center
      />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2 md:row-span-2 group">
          <CardHeader>
            <Zap className="w-10 h-10 text-primary mb-4" />
            <CardTitle className="text-3xl">AI-Driven Recruiting</CardTitle>
            <CardDescription className="text-lg">
              Automate sourcing, screening, and scheduling. Our AI identifies top-tier talent 
              based on skills, potential, and cultural fit, reducing time-to-hire by 60%.
            </CardDescription>
          </CardHeader>
          <CardContent className="h-64 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent z-10" />
            <div className="p-4 space-y-3">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="flex items-center gap-4 p-3 bg-white/5 border border-white/10 rounded-xl group-hover:translate-x-2 transition-transform duration-500">
                  <div className="w-10 h-10 rounded-full bg-white/10" />
                  <div className="flex-1 space-y-1">
                    <div className="h-2 w-24 bg-white/20 rounded" />
                    <div className="h-2 w-16 bg-white/10 rounded" />
                  </div>
                  <Badge variant="outline">Matched</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Users className="w-8 h-8 text-primary mb-2" />
            <CardTitle>Global Payroll</CardTitle>
            <CardDescription>
              Pay your team in 150+ countries with automated compliance and tax management.
            </CardDescription>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader>
            <Shield className="w-8 h-8 text-primary mb-2" />
            <CardTitle>Enterprise Security</CardTitle>
            <CardDescription>
              SOC2 Type II, GDPR, and HIPAA compliant. Your data is encrypted and secure.
            </CardDescription>
          </CardHeader>
        </Card>

        <Card className="md:col-span-1">
          <CardHeader>
            <BarChart3 className="w-8 h-8 text-primary mb-2" />
            <CardTitle>Unified Analytics</CardTitle>
            <CardDescription>
              Real-time insights into retention, diversity, and performance across your entire org.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    </div>
  </section>
);

const Testimonials = () => (
  <section className="py-24 bg-white/[0.02] border-y border-white/5">
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div>
          <Badge variant="primary" className="mb-4">Testimonials</Badge>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-8 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
            Trusted by People <br /> Leaders Everywhere
          </h2>
          <div className="flex gap-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1">98%</div>
              <div className="text-sm text-muted-foreground uppercase tracking-tight">Retention</div>
            </div>
            <div className="w-px h-12 bg-white/10" />
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1">200k+</div>
              <div className="text-sm text-muted-foreground uppercase tracking-tight">Employees</div>
            </div>
          </div>
        </div>

        <div className="relative">
          <Card className="p-8 border-primary/20 bg-primary/5">
            <MessageSquare className="w-12 h-12 text-primary/40 mb-6" />
            <p className="text-xl md:text-2xl text-white italic mb-8 leading-relaxed">
              &quot;TalentPulse has completely transformed how we manage our global team. 
              The AI insights are scary accurate, and the user experience is unlike any other HR tool we&apos;ve used.&quot;
            </p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/20" />
              <div>
                <div className="font-bold text-white">Sarah Jenkins</div>
                <div className="text-sm text-muted-foreground">Chief People Officer, TechFlow</div>
              </div>
            </div>
          </Card>
          <div className="absolute -top-6 -right-6 w-24 h-24 bg-primary/20 blur-[40px] rounded-full -z-10" />
        </div>
      </div>
    </div>
  </section>
);

const Pricing = () => (
  <section id="pricing" className="py-24">
    <div className="max-w-7xl mx-auto px-6">
      <SectionHeading 
        badge="Pricing"
        title="Simple, Scalable Plans"
        description="No hidden fees. Choose the plan that fits your current needs."
        center
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { name: "Starter", price: "$499", description: "Perfect for growing startups", features: ["Up to 50 employees", "Core HR features", "AI Sourcing", "Email support"] },
          { name: "Professional", price: "$1,299", description: "Best for mid-sized companies", featured: true, features: ["Up to 250 employees", "Advanced Analytics", "Global Payroll", "Priority support"] },
          { name: "Enterprise", price: "Custom", description: "For large global organizations", features: ["Unlimited employees", "Custom integrations", "Dedicated Manager", "SLA & Security"] },
        ].map((plan, i) => (
          <Card key={i} className={cn(
            "relative",
            plan.featured && "border-primary/50 shadow-[0_0_30px_rgba(79,70,229,0.1)] scale-105 z-10"
          )}>
            {plan.featured && (
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <Badge variant="primary">Most Popular</Badge>
              </div>
            )}
            <CardHeader>
              <CardTitle className="text-2xl">{plan.name}</CardTitle>
              <CardDescription>{plan.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-bold text-white">{plan.price}</span>
                {plan.price !== "Custom" && <span className="text-muted-foreground">/mo</span>}
              </div>
              <ul className="space-y-3">
                {plan.features.map(f => (
                  <li key={f} className="flex items-center gap-3 text-sm text-white/70">
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                    {f}
                  </li>
                ))}
              </ul>
              <Button variant={plan.featured ? "primary" : "outline"} className="w-full">
                Get Started
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  </section>
);

const FAQ = () => (
  <section className="py-24 bg-white/[0.02]">
    <div className="max-w-3xl mx-auto px-6">
      <SectionHeading 
        badge="FAQ"
        title="Common Questions"
        description="Everything you need to know about TalentPulse."
        center
      />
      <div className="space-y-4">
        {[
          { q: "How secure is my data?", a: "We use AES-256 encryption and follow industry standard compliance protocols including SOC2 and GDPR." },
          { q: "Can we integrate with our existing tools?", a: "Yes, TalentPulse offers native integrations with Slack, Microsoft Teams, Jira, and 50+ other platforms." },
          { q: "Is there a free trial?", a: "Absolutely. You can start a 14-day full-featured free trial without any credit card required." },
        ].map((item, i) => (
          <Card key={i} className="cursor-pointer group">
            <CardHeader className="flex flex-row items-center justify-between py-4">
              <CardTitle className="text-lg group-hover:text-primary transition-colors">{item.q}</CardTitle>
              <ArrowRight className="w-4 h-4 text-white/20 group-hover:text-primary group-hover:translate-x-1 transition-all" />
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="py-20 border-t border-white/10 relative overflow-hidden">
    <div className="absolute bottom-0 right-0 w-[500px] h-[300px] bg-primary/10 blur-[100px] rounded-full -z-10" />
    
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        <div className="col-span-1 md:col-span-1 space-y-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tighter text-white">
              TalentPulse
            </span>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            The intelligent workforce operating system. Empowering teams to do their best work through AI and human-centric design.
          </p>
          <div className="flex gap-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="w-8 h-8 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors" />
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-bold text-white mb-6">Product</h4>
          <ul className="space-y-4 text-sm text-muted-foreground">
            <li><Link href="#" className="hover:text-white transition-colors">Recruiting</Link></li>
            <li><Link href="#" className="hover:text-white transition-colors">Management</Link></li>
            <li><Link href="#" className="hover:text-white transition-colors">Payroll</Link></li>
            <li><Link href="#" className="hover:text-white transition-colors">Analytics</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-white mb-6">Company</h4>
          <ul className="space-y-4 text-sm text-muted-foreground">
            <li><Link href="#" className="hover:text-white transition-colors">About Us</Link></li>
            <li><Link href="#" className="hover:text-white transition-colors">Careers</Link></li>
            <li><Link href="#" className="hover:text-white transition-colors">Blog</Link></li>
            <li><Link href="#" className="hover:text-white transition-colors">Legal</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-white mb-6">Newsletter</h4>
          <p className="text-sm text-muted-foreground mb-4">Stay updated with the latest in HR tech.</p>
          <div className="flex gap-2">
            <input type="email" placeholder="Email address" className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm w-full focus:outline-none focus:ring-1 focus:ring-primary/50" />
            <Button size="sm">Join</Button>
          </div>
        </div>
      </div>
      
      <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/40">
        <p>© 2026 TalentPulse Inc. All rights reserved.</p>
        <div className="flex gap-8">
          <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
          <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
          <Link href="#" className="hover:text-white transition-colors">Cookie Policy</Link>
        </div>
      </div>
    </div>
  </footer>
);

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/30 selection:text-primary">
      <Navbar />
      <main>
        <Hero />
        <SocialProof />
        <Features />
        <Testimonials />
        <Pricing />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}
