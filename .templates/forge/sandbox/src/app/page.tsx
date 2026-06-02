"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  ArrowRight, 
  Check, 
  ChevronRight, 
  Globe, 
  Zap, 
  Shield, 
  BarChart3, 
  Users, 
  Layers,
  ShoppingBag,
  CreditCard,
  Truck
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

// --- Components ---

const Navbar = () => (
  <nav className="fixed top-0 w-full border-b border-border/50 bg-background/80 backdrop-blur-md z-50">
    <div className="container mx-auto px-4 h-16 flex items-center justify-between">
      <div className="flex items-center gap-8">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tighter">
          <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
            <ShoppingBag className="w-5 h-5 text-primary-foreground" />
          </div>
          <span>LUMIERE</span>
        </Link>
        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
          <Link href="#features" className="hover:text-foreground transition-colors">Features</Link>
          <Link href="#pricing" className="hover:text-foreground transition-colors">Pricing</Link>
          <Link href="#testimonials" className="hover:text-foreground transition-colors">Testimonials</Link>
        </div>
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

const Hero = () => (
  <section className="pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
    <div className="container mx-auto px-4">
      <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <Badge variant="secondary" className="mb-6">Enterprise B2B Commerce</Badge>
        </motion.div>
        <motion.h1 
          className="text-5xl md:text-7xl font-bold tracking-tighter leading-none mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
        >
          The Operating System for <br /> High-Ticket Commerce.
        </motion.h1>
        <motion.p 
          className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
        >
          Lumiere provides the infrastructure to scale your B2B operations. 
          Unify inventory, logistics, and multi-channel sales in a single, surgical interface.
        </motion.p>
        <motion.div 
          className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3, ease: "easeOut" }}
        >
          <Link href="/register">
            <Button size="lg" className="w-full sm:w-auto gap-2">
              Start Free Trial <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
          <Button variant="outline" size="lg" className="w-full sm:w-auto">
            Book a Demo
          </Button>
        </motion.div>
      </div>
    </div>
  </section>
);

const SocialProof = () => (
  <section className="py-12 border-y border-border/50 bg-muted/30">
    <div className="container mx-auto px-4">
      <p className="text-center text-[10px] uppercase tracking-widest font-bold text-muted-foreground mb-8">
        Trusted by industry leaders
      </p>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
        <div className="flex justify-center font-bold text-lg tracking-tighter">VERTEX</div>
        <div className="flex justify-center font-bold text-lg tracking-tighter">ORION</div>
        <div className="flex justify-center font-bold text-lg tracking-tighter">KINETIC</div>
        <div className="flex justify-center font-bold text-lg tracking-tighter">PRISM</div>
        <div className="flex justify-center font-bold text-lg tracking-tighter">NOVA</div>
        <div className="flex justify-center font-bold text-lg tracking-tighter">QUANTUM</div>
      </div>
    </div>
  </section>
);

const Features = () => (
  <section id="features" className="py-24 md:py-32">
    <div className="container mx-auto px-4">
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
        <div className="max-w-2xl">
          <Badge variant="outline" className="mb-4">Capabilities</Badge>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4">
            Built for velocity. <br />Designed for scale.
          </h2>
          <p className="text-lg text-muted-foreground">
            Everything you need to manage complex e-commerce operations without the bloat.
          </p>
        </div>
        <Button variant="ghost" className="gap-2 group">
          View all features <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <Zap className="w-10 h-10 mb-4 text-primary" />
            <CardTitle className="text-2xl">Real-time Inventory Sync</CardTitle>
            <CardDescription>
              Sync inventory across multiple warehouses and sales channels instantly. 
              Never oversell again with our surgical precision tracking.
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[200px] bg-muted/50 flex items-center justify-center border-t border-border">
            <div className="flex gap-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="w-12 h-24 bg-primary/20 border border-primary/30 rounded-sm flex flex-col-reverse p-1">
                  <div className="w-full bg-primary" style={{ height: `${20 * i}%` }} />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <Globe className="w-10 h-10 mb-4 text-primary" />
            <CardTitle className="text-2xl">Global Logistics</CardTitle>
            <CardDescription>
              Native integrations with major carriers. Automated customs documentation and real-time tracking.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-8">
             <div className="space-y-4">
               {[Truck, CreditCard, Shield].map((Icon, idx) => (
                 <div key={idx} className="flex items-center gap-3 p-3 border border-border rounded-md bg-muted/30">
                   <Icon className="w-5 h-5 text-muted-foreground" />
                   <div className="h-2 w-24 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-primary/40 w-2/3" />
                   </div>
                 </div>
               ))}
             </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <BarChart3 className="w-10 h-10 mb-4 text-primary" />
            <CardTitle className="text-2xl">Deep Analytics</CardTitle>
            <CardDescription>
              Predictive demand forecasting and cohort analysis built directly into your dashboard.
            </CardDescription>
          </CardHeader>
        </Card>
        <Card className="md:col-span-2">
          <CardHeader>
            <Users className="w-10 h-10 mb-4 text-primary" />
            <CardTitle className="text-2xl">Enterprise B2B Portals</CardTitle>
            <CardDescription>
              Provide your wholesale clients with a dedicated portal for bulk orders, 
              custom pricing, and credit management.
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[100px] flex items-center px-6">
            <div className="flex -space-x-3 overflow-hidden">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="inline-block h-10 w-10 rounded-full ring-2 ring-background bg-muted flex items-center justify-center font-bold text-[10px]">U{i}</div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  </section>
);

const Testimonials = () => (
  <section id="testimonials" className="py-24 bg-muted/30 border-y border-border/50">
    <div className="container mx-auto px-4">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <h2 className="text-4xl font-bold tracking-tighter mb-4">Used by the best teams.</h2>
        <p className="text-muted-foreground">Don't take our word for it. Here is what industry experts say.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          {
            quote: "Lumiere transformed our B2B workflow. We've seen a 40% increase in efficiency across our warehouses.",
            author: "Sarah Chen",
            role: "COO at Vertex Logistics"
          },
          {
            quote: "The cleanest interface I've ever used. It actually makes managing 50k SKUs enjoyable.",
            author: "Marcus Thorne",
            role: "E-commerce Director at Kinetic"
          },
          {
            quote: "Finally, a platform that understands the complexity of wholesale commerce. The API is surgical.",
            author: "Elena Rossi",
            role: "CTO at Orion Brands"
          }
        ].map((t, idx) => (
          <Card key={idx} className="bg-background">
            <CardContent className="pt-8">
              <p className="text-lg italic mb-6">"{t.quote}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center font-bold text-xs">
                  {t.author[0]}
                </div>
                <div>
                  <div className="font-bold text-sm">{t.author}</div>
                  <div className="text-xs text-muted-foreground">{t.role}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  </section>
);

const Pricing = () => (
  <section id="pricing" className="py-24 md:py-32">
    <div className="container mx-auto px-4">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <Badge variant="outline" className="mb-4">Pricing</Badge>
        <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4">Simple, surgical pricing.</h2>
        <p className="text-muted-foreground text-lg">Choose the plan that fits your operation volume.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle>Starter</CardTitle>
            <div className="flex items-baseline gap-1 mt-4">
              <span className="text-4xl font-bold tracking-tighter">$49</span>
              <span className="text-muted-foreground">/mo</span>
            </div>
            <CardDescription className="pt-2">For emerging B2B brands.</CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <ul className="space-y-3 text-sm">
              {[ "Up to 1,000 SKUs", "2 User Accounts", "Basic Analytics", "Standard Support" ].map(f => (
                <li key={f} className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-primary" /> {f}
                </li>
              ))}
            </ul>
          </CardContent>
          <CardHeader className="pt-0">
            <Button variant="outline" className="w-full">Get Started</Button>
          </CardHeader>
        </Card>

        <Card className="flex flex-col border-primary ring-1 ring-primary relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-3 py-1 text-[10px] font-bold uppercase tracking-widest">Most Popular</div>
          <CardHeader>
            <CardTitle>Professional</CardTitle>
            <div className="flex items-baseline gap-1 mt-4">
              <span className="text-4xl font-bold tracking-tighter">$199</span>
              <span className="text-muted-foreground">/mo</span>
            </div>
            <CardDescription className="pt-2">For scaling enterprises.</CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <ul className="space-y-3 text-sm">
              {[ "Up to 10,000 SKUs", "10 User Accounts", "Advanced Demand Forecasting", "Priority Support", "Custom API Access" ].map(f => (
                <li key={f} className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-primary" /> {f}
                </li>
              ))}
            </ul>
          </CardContent>
          <CardHeader className="pt-0">
            <Button className="w-full">Get Started</Button>
          </CardHeader>
        </Card>

        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle>Enterprise</CardTitle>
            <div className="flex items-baseline gap-1 mt-4">
              <span className="text-4xl font-bold tracking-tighter">$999</span>
              <span className="text-muted-foreground">/mo</span>
            </div>
            <CardDescription className="pt-2">For high-volume global operations.</CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <ul className="space-y-3 text-sm">
              {[ "Unlimited SKUs", "Unlimited Users", "Multi-warehouse Logistics", "dedicated Account Manager", "SLA Guarantees" ].map(f => (
                <li key={f} className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-primary" /> {f}
                </li>
              ))}
            </ul>
          </CardContent>
          <CardHeader className="pt-0">
            <Button variant="outline" className="w-full">Contact Sales</Button>
          </CardHeader>
        </Card>
      </div>
    </div>
  </section>
);

const FAQ = () => (
  <section className="py-24 bg-muted/30 border-y border-border/50">
    <div className="container mx-auto px-4 max-w-3xl">
      <h2 className="text-3xl font-bold tracking-tighter mb-12 text-center">Frequently Asked Questions</h2>
      <div className="space-y-8">
        {[
          { q: "How long does migration take?", a: "Typically, an enterprise migration takes 2-4 weeks including data sanitation and API testing." },
          { q: "Do you support custom ERP integrations?", a: "Yes, our Professional and Enterprise plans include access to our surgical REST and GraphQL APIs." },
          { q: "Is there a limit on transactions?", a: "We do not charge per transaction. Our tiers are based on SKU volume and user seats." }
        ].map((item, i) => (
          <div key={i} className="border-b border-border pb-8 last:border-0">
            <h3 className="font-bold text-lg mb-2">{item.q}</h3>
            <p className="text-muted-foreground">{item.a}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="py-20 border-t border-border">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-16">
        <div className="col-span-2 lg:col-span-1">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tighter mb-6">
            <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center text-primary-foreground">
               <ShoppingBag className="w-5 h-5" />
            </div>
            <span>LUMIERE</span>
          </Link>
          <p className="text-sm text-muted-foreground max-w-xs">
            The surgical platform for high-ticket commerce and B2B operations.
          </p>
        </div>
        <div>
          <h4 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-6">Product</h4>
          <ul className="space-y-4 text-sm font-medium">
            <li><Link href="#" className="hover:text-primary transition-colors">Features</Link></li>
            <li><Link href="#" className="hover:text-primary transition-colors">Logistics</Link></li>
            <li><Link href="#" className="hover:text-primary transition-colors">Analytics</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-6">Company</h4>
          <ul className="space-y-4 text-sm font-medium">
            <li><Link href="#" className="hover:text-primary transition-colors">About</Link></li>
            <li><Link href="#" className="hover:text-primary transition-colors">Careers</Link></li>
            <li><Link href="#" className="hover:text-primary transition-colors">Privacy</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-6">Connect</h4>
          <ul className="space-y-4 text-sm font-medium">
            <li><Link href="#" className="hover:text-primary transition-colors">Twitter</Link></li>
            <li><Link href="#" className="hover:text-primary transition-colors">LinkedIn</Link></li>
            <li><Link href="#" className="hover:text-primary transition-colors">GitHub</Link></li>
          </ul>
        </div>
      </div>
      <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-border gap-4">
        <p className="text-xs text-muted-foreground">© 2026 Lumiere Systems Inc. All rights reserved.</p>
        <div className="flex items-center gap-6">
           {/* BRAND ICONS MANDATE: Pure SVG inline */}
           <svg className="w-5 h-5 fill-muted-foreground hover:fill-foreground cursor-pointer transition-colors" viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
           <svg className="w-5 h-5 fill-muted-foreground hover:fill-foreground cursor-pointer transition-colors" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.84 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
        </div>
      </div>
    </div>
  </footer>
);

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
      <Navbar />
      <main>
        <Hero />
        <SocialProof />
        <Features />
        <Testimonials />
        <Pricing />
        <FAQ />
        <section className="py-24 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-8">Ready to scale your commerce?</h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register">
                <Button size="lg" variant="secondary" className="w-full sm:w-auto">Get Started Now</Button>
              </Link>
              <Button size="lg" variant="outline" className="w-full sm:w-auto border-primary-foreground/20 hover:bg-primary-foreground/10 text-primary-foreground">Talk to an Expert</Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
