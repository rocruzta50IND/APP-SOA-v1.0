"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  ArrowRight, 
  BarChart3, 
  Zap, 
  Shield, 
  Globe, 
  Check, 
  ChevronRight,
  TrendingUp,
  Layers,
  Search,
  PieChart,
  Layout
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

const fadeIn = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.2, ease: "easeOut" }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.05
    }
  }
};

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background selection:bg-primary selection:text-primary-foreground">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 border-b border-border/50 bg-background/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-lg font-bold tracking-tighter">AETHERIS</span>
            </Link>
            <div className="hidden md:flex items-center gap-6">
              <Link href="#features" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Features</Link>
              <Link href="#solutions" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Solutions</Link>
              <Link href="#pricing" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Pricing</Link>
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

      <main className="flex-1 pt-16">
        {/* Hero Section */}
        <section className="relative py-24 md:py-32 overflow-hidden border-b border-border/50">
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <motion.div 
              initial="initial"
              animate="animate"
              variants={staggerContainer}
              className="max-w-3xl"
            >
              <motion.div variants={fadeIn}>
                <Badge variant="outline" className="mb-6 py-1 px-3 text-[10px] uppercase tracking-widest font-bold">
                  v2.0 is now live
                </Badge>
              </motion.div>
              <motion.h1 variants={fadeIn} className="text-5xl md:text-7xl font-bold tracking-tighter leading-none mb-6">
                Predictive Analytics <br /> for Modern Enterprise
              </motion.h1>
              <motion.p variants={fadeIn} className="text-lg md:text-xl text-muted-foreground mb-10 max-w-xl leading-relaxed">
                Aetheris delivers real-time data orchestration and behavioral insights. Turn fragmented data points into clear, actionable strategies.
              </motion.p>
              <motion.div variants={fadeIn} className="flex flex-col sm:flex-row gap-4">
                <Link href="/register">
                  <Button size="lg" className="w-full sm:w-auto gap-2">
                    Start Building <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <Link href="/dashboard">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto">
                    View Demo
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Logo Cloud */}
        <section className="py-12 bg-muted/30 border-b border-border/50">
          <div className="max-w-7xl mx-auto px-6">
            <p className="text-center text-[10px] uppercase tracking-widest font-bold text-muted-foreground mb-8">
              Trusted by the world&apos;s most innovative teams
            </p>
            <div className="grid grid-cols-2 md:grid-cols-6 gap-8 opacity-40 grayscale items-center">
              <div className="flex justify-center font-bold text-xl tracking-tighter italic">ACME CORP</div>
              <div className="flex justify-center font-bold text-xl tracking-tighter">GLOBEX</div>
              <div className="flex justify-center font-bold text-xl tracking-tighter">SOYLENT</div>
              <div className="flex justify-center font-bold text-xl tracking-tighter italic underline underline-offset-4">INITECH</div>
              <div className="flex justify-center font-bold text-xl tracking-tighter">UMBRELLA</div>
              <div className="flex justify-center font-bold text-xl tracking-tighter italic">HULI</div>
            </div>
          </div>
        </section>

        {/* Features Bento Grid */}
        <section id="features" className="py-24 md:py-32 border-b border-border/50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="mb-16">
              <Badge variant="outline" className="mb-4 text-[10px] uppercase tracking-widest font-bold">The Platform</Badge>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tighter mb-4">Precision-engineered for speed</h2>
              <p className="text-muted-foreground max-w-xl">Every millisecond counts. Our infrastructure is built to handle millions of events per second with sub-zero latency.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Feature 1 */}
              <Card className="md:col-span-2 overflow-hidden flex flex-col justify-between group">
                <CardContent className="p-8">
                  <Zap className="w-10 h-10 mb-6 text-primary" />
                  <h3 className="text-xl font-bold tracking-tight mb-2">Real-time Data Streams</h3>
                  <p className="text-muted-foreground mb-6 max-w-md">Process and visualize data as it happens. No more waiting for nightly batch jobs. Decision-making at the speed of thought.</p>
                </CardContent>
                <div className="mt-auto px-8 pb-8 flex items-center gap-1 text-sm font-medium group-hover:gap-2 transition-all">
                  Explore streams <ChevronRight className="w-4 h-4" />
                </div>
              </Card>

              {/* Feature 2 */}
              <Card className="overflow-hidden flex flex-col justify-between group">
                <CardContent className="p-8">
                  <Shield className="w-10 h-10 mb-6 text-primary" />
                  <h3 className="text-xl font-bold tracking-tight mb-2">Enterprise Security</h3>
                  <p className="text-muted-foreground">SOC2 Type II, GDPR, and HIPAA compliant infrastructure. Your data is encrypted at rest and in transit.</p>
                </CardContent>
                <div className="mt-auto px-8 pb-8 flex items-center gap-1 text-sm font-medium group-hover:gap-2 transition-all">
                  Read security whitepaper <ChevronRight className="w-4 h-4" />
                </div>
              </Card>

              {/* Feature 3 */}
              <Card className="overflow-hidden flex flex-col justify-between group">
                <CardContent className="p-8">
                  <Globe className="w-10 h-10 mb-6 text-primary" />
                  <h3 className="text-xl font-bold tracking-tight mb-2">Global Edge Mesh</h3>
                  <p className="text-muted-foreground">Distributed ingest points in 50+ regions worldwide for the lowest possible latency regardless of origin.</p>
                </CardContent>
                <div className="mt-auto px-8 pb-8 flex items-center gap-1 text-sm font-medium group-hover:gap-2 transition-all">
                  View network <ChevronRight className="w-4 h-4" />
                </div>
              </Card>

              {/* Feature 4 */}
              <Card className="md:col-span-2 overflow-hidden flex flex-col justify-between group">
                <CardContent className="p-8">
                  <Layout className="w-10 h-10 mb-6 text-primary" />
                  <h3 className="text-xl font-bold tracking-tight mb-2">Custom Dashboard Engine</h3>
                  <p className="text-muted-foreground mb-6 max-w-md">Drag-and-drop builder for executive reports. Connect any data source and visualize it in seconds with our high-performance component library.</p>
                </CardContent>
                <div className="mt-auto px-8 pb-8 flex items-center gap-1 text-sm font-medium group-hover:gap-2 transition-all">
                  Try the builder <ChevronRight className="w-4 h-4" />
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-24 bg-black text-white overflow-hidden">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
              <div>
                <div className="text-5xl font-black tracking-tighter mb-2">99.99%</div>
                <div className="text-[10px] uppercase tracking-widest font-bold text-zinc-500">Uptime SLA</div>
              </div>
              <div>
                <div className="text-5xl font-black tracking-tighter mb-2">250ms</div>
                <div className="text-[10px] uppercase tracking-widest font-bold text-zinc-500">Avg. Query Latency</div>
              </div>
              <div>
                <div className="text-5xl font-black tracking-tighter mb-2">50B+</div>
                <div className="text-[10px] uppercase tracking-widest font-bold text-zinc-500">Events Processed Daily</div>
              </div>
              <div>
                <div className="text-5xl font-black tracking-tighter mb-2">120+</div>
                <div className="text-[10px] uppercase tracking-widest font-bold text-zinc-500">Integrations</div>
              </div>
            </div>
          </div>
        </section>

        {/* Analytics Preview */}
        <section id="solutions" className="py-24 md:py-32 border-b border-border/50 bg-muted/10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <Badge variant="outline" className="mb-4 text-[10px] uppercase tracking-widest font-bold">The Experience</Badge>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-4">Command your data</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">Complex data doesn&apos;t have to look complex. We designed Aetheris to be powerful enough for engineers, yet intuitive enough for executives.</p>
            </div>

            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-border to-border/50 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
              <Card className="relative bg-background border-border shadow-2xl overflow-hidden">
                <div className="border-b border-border px-4 py-3 flex items-center justify-between bg-muted/30">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-border"></div>
                    <div className="w-3 h-3 rounded-full bg-border"></div>
                    <div className="w-3 h-3 rounded-full bg-border"></div>
                  </div>
                  <div className="text-[10px] font-bold tracking-widest uppercase text-muted-foreground">Aetheris Cloud Dashboard</div>
                  <div className="w-6"></div>
                </div>
                <div className="p-8">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="p-4 border border-border rounded-md bg-muted/10">
                        <div className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground mb-1">Metric {i}</div>
                        <div className="text-2xl font-black tracking-tighter">
                          {i === 1 ? "$1.2M" : i === 2 ? "+42.5%" : i === 3 ? "14.2k" : "89.1%"}
                        </div>
                        <div className={cn("text-[10px] mt-1 font-bold", i === 2 ? "text-emerald-500" : "text-muted-foreground")}>
                          {i === 2 ? "▲ 12% vs last month" : "Target: 90%"}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="aspect-[16/7] w-full border border-border rounded-md bg-muted/5 flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 grid grid-cols-12 grid-rows-6 opacity-10">
                      {Array.from({ length: 72 }).map((_, i) => (
                        <div key={i} className="border-[0.5px] border-border"></div>
                      ))}
                    </div>
                    <div className="relative flex flex-col items-center gap-4">
                      <TrendingUp className="w-12 h-12 text-primary/20" />
                      <span className="text-[10px] font-bold tracking-widest uppercase text-muted-foreground">Interactive Visualization Area</span>
                    </div>
                    {/* Mock chart lines */}
                    <svg className="absolute inset-0 w-full h-full p-8" preserveAspectRatio="none">
                      <path 
                        d="M 0 150 Q 100 80 200 120 T 400 60 T 600 100 T 800 40 T 1000 90" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        className="text-primary/40"
                      />
                    </svg>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-24 md:py-32 border-b border-border/50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <Badge variant="outline" className="mb-4 text-[10px] uppercase tracking-widest font-bold">Pricing</Badge>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-4">Scale without friction</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">Transparent pricing that grows with your usage. No hidden fees, no complex tiers.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Starter */}
              <Card className="flex flex-col">
                <CardContent className="p-8 flex-1">
                  <div className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground mb-4">Starter</div>
                  <div className="text-4xl font-black tracking-tighter mb-2">$0</div>
                  <p className="text-sm text-muted-foreground mb-8">Perfect for hobbyists and early explorations.</p>
                  <ul className="space-y-4">
                    <li className="flex items-center gap-2 text-sm"><Check className="w-4 h-4 text-primary" /> 1M events / month</li>
                    <li className="flex items-center gap-2 text-sm"><Check className="w-4 h-4 text-primary" /> 3 dashboards</li>
                    <li className="flex items-center gap-2 text-sm"><Check className="w-4 h-4 text-primary" /> 7 days data retention</li>
                    <li className="flex items-center gap-2 text-sm text-muted-foreground/50"><Check className="w-4 h-4" /> API Access</li>
                  </ul>
                </CardContent>
                <div className="p-8 pt-0 mt-auto">
                  <Link href="/register">
                    <Button variant="outline" className="w-full">Get Started</Button>
                  </Link>
                </div>
              </Card>

              {/* Pro */}
              <Card className="flex flex-col border-primary ring-1 ring-primary">
                <CardContent className="p-8 flex-1">
                  <div className="flex justify-between items-center mb-4">
                    <div className="text-[10px] uppercase tracking-widest font-bold text-primary">Pro</div>
                    <Badge className="text-[8px]">Most Popular</Badge>
                  </div>
                  <div className="text-4xl font-black tracking-tighter mb-2">$79<span className="text-lg font-normal text-muted-foreground">/mo</span></div>
                  <p className="text-sm text-muted-foreground mb-8">For scaling teams needing deeper insights.</p>
                  <ul className="space-y-4">
                    <li className="flex items-center gap-2 text-sm"><Check className="w-4 h-4 text-primary" /> 100M events / month</li>
                    <li className="flex items-center gap-2 text-sm"><Check className="w-4 h-4 text-primary" /> Unlimited dashboards</li>
                    <li className="flex items-center gap-2 text-sm"><Check className="w-4 h-4 text-primary" /> 90 days data retention</li>
                    <li className="flex items-center gap-2 text-sm"><Check className="w-4 h-4 text-primary" /> API Access & Webhooks</li>
                    <li className="flex items-center gap-2 text-sm"><Check className="w-4 h-4 text-primary" /> Team collaboration</li>
                  </ul>
                </CardContent>
                <div className="p-8 pt-0 mt-auto">
                  <Link href="/register">
                    <Button className="w-full">Start 14-day free trial</Button>
                  </Link>
                </div>
              </Card>

              {/* Enterprise */}
              <Card className="flex flex-col">
                <CardContent className="p-8 flex-1">
                  <div className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground mb-4">Enterprise</div>
                  <div className="text-4xl font-black tracking-tighter mb-2">Custom</div>
                  <p className="text-sm text-muted-foreground mb-8">Bespoke solutions for global organizations.</p>
                  <ul className="space-y-4">
                    <li className="flex items-center gap-2 text-sm"><Check className="w-4 h-4 text-primary" /> Billion-scale events</li>
                    <li className="flex items-center gap-2 text-sm"><Check className="w-4 h-4 text-primary" /> Infinite data retention</li>
                    <li className="flex items-center gap-2 text-sm"><Check className="w-4 h-4 text-primary" /> Dedicated account manager</li>
                    <li className="flex items-center gap-2 text-sm"><Check className="w-4 h-4 text-primary" /> Custom SLAs</li>
                    <li className="flex items-center gap-2 text-sm"><Check className="w-4 h-4 text-primary" /> On-premise deployment options</li>
                  </ul>
                </CardContent>
                <div className="p-8 pt-0 mt-auto">
                  <Button variant="outline" className="w-full">Contact Sales</Button>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-24 md:py-32 border-b border-border/50">
          <div className="max-w-3xl mx-auto px-6">
            <div className="text-center mb-16">
              <Badge variant="outline" className="mb-4 text-[10px] uppercase tracking-widest font-bold">FAQ</Badge>
              <h2 className="text-3xl font-bold tracking-tighter">Frequently Asked Questions</h2>
            </div>
            <div className="space-y-8">
              {[
                {
                  q: "How does Aetheris compare to traditional BI tools?",
                  a: "Traditional BI tools are often retro-active and batch-based. Aetheris is built for the real-time era, processing data as it flows into your system, allowing for immediate reaction to market changes."
                },
                {
                  q: "Can I integrate my existing data warehouse?",
                  a: "Yes. We offer native connectors for Snowflake, BigQuery, Redshift, and Clickhouse, as well as a robust API for custom integrations."
                },
                {
                  q: "Is my data secure?",
                  a: "Absolutely. Security is our first principle. We employ end-to-end encryption, regular third-party audits, and strictly follow global privacy standards."
                },
                {
                  q: "Do you offer professional services for setup?",
                  a: "Our Enterprise plan includes dedicated onboarding support. For other plans, we have extensive documentation and a highly responsive support team."
                }
              ].map((faq, i) => (
                <div key={i} className="pb-8 border-b border-border last:border-0">
                  <h3 className="text-lg font-bold tracking-tight mb-2">{faq.q}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 md:py-40 bg-primary text-primary-foreground relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-8 max-w-3xl mx-auto">Ready to see what your data is trying to tell you?</h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register">
                <Button size="lg" variant="secondary" className="px-12 text-black">Start Free Trial</Button>
              </Link>
              <Button size="lg" variant="outline" className="px-12 bg-transparent text-primary-foreground border-primary-foreground hover:bg-primary-foreground hover:text-primary">Schedule a Demo</Button>
            </div>
          </div>
          {/* Subtle background pattern */}
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="absolute inset-0 grid grid-cols-12 grid-rows-6">
              {Array.from({ length: 72 }).map((_, i) => (
                <div key={i} className="border-[0.5px] border-primary-foreground"></div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-16 border-t border-border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-12 mb-16">
            <div className="col-span-2">
              <Link href="/" className="flex items-center gap-2 mb-6">
                <div className="w-6 h-6 bg-primary rounded flex items-center justify-center">
                  <BarChart3 className="w-4 h-4 text-primary-foreground" />
                </div>
                <span className="text-base font-bold tracking-tighter uppercase">Aetheris</span>
              </Link>
              <p className="text-sm text-muted-foreground max-w-xs mb-6">
                The next generation of enterprise analytics. Built for precision, scale, and speed.
              </p>
              <div className="flex gap-4">
                <div className="w-5 h-5 rounded-full bg-muted"></div>
                <div className="w-5 h-5 rounded-full bg-muted"></div>
                <div className="w-5 h-5 rounded-full bg-muted"></div>
              </div>
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-widest font-bold mb-6">Product</div>
              <ul className="space-y-4 text-sm text-muted-foreground">
                <li><Link href="#" className="hover:text-foreground">Features</Link></li>
                <li><Link href="#" className="hover:text-foreground">Integrations</Link></li>
                <li><Link href="#" className="hover:text-foreground">Pricing</Link></li>
                <li><Link href="#" className="hover:text-foreground">Changelog</Link></li>
              </ul>
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-widest font-bold mb-6">Resources</div>
              <ul className="space-y-4 text-sm text-muted-foreground">
                <li><Link href="#" className="hover:text-foreground">Documentation</Link></li>
                <li><Link href="#" className="hover:text-foreground">API Reference</Link></li>
                <li><Link href="#" className="hover:text-foreground">Community</Link></li>
                <li><Link href="#" className="hover:text-foreground">Guides</Link></li>
              </ul>
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-widest font-bold mb-6">Company</div>
              <ul className="space-y-4 text-sm text-muted-foreground">
                <li><Link href="#" className="hover:text-foreground">About</Link></li>
                <li><Link href="#" className="hover:text-foreground">Careers</Link></li>
                <li><Link href="#" className="hover:text-foreground">Privacy</Link></li>
                <li><Link href="#" className="hover:text-foreground">Terms</Link></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between gap-4 items-center">
            <div className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} Aetheris Technologies Inc. All rights reserved.
            </div>
            <div className="flex gap-6 items-center">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                <span className="text-[10px] font-bold tracking-widest uppercase text-muted-foreground">System Operational</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
