"use client";

import { motion } from "framer-motion";
import { Navbar } from "@/components/ui/Navbar";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/Card";
import { Glow } from "@/components/ui/Glow";
import { 
  Zap, 
  Shield, 
  BarChart3, 
  Cpu, 
  Globe, 
  CheckCircle2,
  ChevronDown,
  ArrowRight,
  TestTube2,
  Activity,
  Workflow
} from "lucide-react";
import Link from "next/link";

const transition = { type: "spring", stiffness: 400, damping: 30 } as const;

export default function LandingPage() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <Navbar />
      
      {/* Background Glows */}
      <Glow className="top-[-10%] left-[-10%] w-[500px] h-[500px]" />
      <Glow className="bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-indigo-500" />
      
      <main className="relative z-10 pt-32 pb-20">
        {/* HERO SECTION */}
        <section className="px-6 max-w-7xl mx-auto text-center mb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <span className="inline-block px-4 py-1.5 mb-6 text-xs font-mono font-medium tracking-wider uppercase rounded-full border border-primary/20 bg-primary/10 text-primary">
              v2.0 is now live &bull; Next-Gen Test Automation
            </span>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[1.1] mb-8 bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-white/40">
              Deliver Quality <br /> at Terminal Velocity.
            </h1>
            <p className="max-w-2xl mx-auto text-lg md:text-xl text-white/60 mb-10 leading-relaxed">
              Quantix orchestrates your entire QA lifecycle with AI-driven test generation, 
              parallel execution at scale, and deep analytics for high-performance teams.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button className="h-12 px-8 text-base" asChild>
                <Link href="/register">
                  Start Free Trial <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
              <Button variant="secondary" className="h-12 px-8 text-base">
                Book a Demo
              </Button>
            </div>
          </motion.div>
        </section>

        {/* SOCIAL PROOF */}
        <section className="mb-32 px-6">
          <p className="text-center text-xs font-mono uppercase tracking-[0.2em] text-white/30 mb-8">
            Trusted by engineering powerhouses
          </p>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 opacity-40 grayscale">
             {/* Mock SVGs for Logos */}
             <div className="text-2xl font-bold text-white tracking-tighter">VOLT</div>
             <div className="text-2xl font-bold text-white tracking-tighter">NEBULA</div>
             <div className="text-2xl font-bold text-white tracking-tighter">ORBIT</div>
             <div className="text-2xl font-bold text-white tracking-tighter">PULSE</div>
             <div className="text-2xl font-bold text-white tracking-tighter">APEX</div>
          </div>
        </section>

        {/* FEATURES BENTO GRID */}
        <section id="features" className="px-6 max-w-7xl mx-auto mb-40">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-4">Engineered for Perfection.</h2>
            <p className="text-white/60 text-lg">Every tool you need to ship bug-free code, integrated into one bento box.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Main Feature */}
            <Card className="md:col-span-2 h-[400px] relative overflow-hidden group">
              <CardHeader>
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center mb-4 text-primary">
                  <Workflow className="w-6 h-6" />
                </div>
                <CardTitle>Autonomous Test Generation</CardTitle>
                <CardDescription className="text-base">
                  Quantix AI scans your application and automatically builds resilient E2E test suites 
                  that adapt to UI changes in real-time.
                </CardDescription>
              </CardHeader>
              <div className="absolute bottom-[-20%] right-[-10%] w-[80%] h-[60%] bg-primary/10 rounded-2xl border border-white/5 p-4 blur-[2px] transform rotate-[-5deg] group-hover:rotate-0 transition-transform duration-500">
                <div className="w-full h-full rounded-lg bg-black/40 border border-white/10 p-4 font-mono text-xs text-primary/70">
                  <div className="flex gap-2 mb-2"><div className="w-2 h-2 rounded-full bg-red-500/50" /><div className="w-2 h-2 rounded-full bg-yellow-500/50" /><div className="w-2 h-2 rounded-full bg-green-500/50" /></div>
                  <div>$ quantix generate --suite auth-flow</div>
                  <div className="text-white/40 mt-1">&gt; Analyzing DOM structures...</div>
                  <div className="text-green-400 mt-1">&gt; 12 scenarios generated.</div>
                </div>
              </div>
            </Card>

            {/* Side Feature 1 */}
            <Card className="h-[400px]">
              <CardHeader>
                <div className="w-10 h-10 rounded-lg bg-indigo-500/20 flex items-center justify-center mb-4 text-indigo-400">
                  <Cpu className="w-6 h-6" />
                </div>
                <CardTitle>Parallel Execution</CardTitle>
                <CardDescription>
                  Run thousands of tests across hundreds of browser environments simultaneously. 
                  Reduce your CI time from hours to minutes.
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Bottom Row */}
            <Card className="h-[300px]">
              <CardHeader>
                <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center mb-4 text-emerald-400">
                  <Shield className="w-6 h-6" />
                </div>
                <CardTitle>Visual Regression</CardTitle>
                <CardDescription>
                  Pixel-perfect comparison engine detects even the smallest layout shifts.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="h-[300px]">
              <CardHeader>
                <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center mb-4 text-amber-400">
                  <BarChart3 className="w-6 h-6" />
                </div>
                <CardTitle>Deep Analytics</CardTitle>
                <CardDescription>
                  Track stability trends, flaky test identification, and coverage metrics in one dashboard.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="h-[300px]">
              <CardHeader>
                <div className="w-10 h-10 rounded-lg bg-rose-500/20 flex items-center justify-center mb-4 text-rose-400">
                  <Globe className="w-6 h-6" />
                </div>
                <CardTitle>Global Infrastructure</CardTitle>
                <CardDescription>
                  Native support for testing across 40+ regions for localized performance validation.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </section>

        {/* PRICING */}
        <section id="pricing" className="px-6 max-w-7xl mx-auto mb-40">
          <div className="text-center mb-16">
             <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-4">Scalable Plans.</h2>
             <p className="text-white/60 text-lg">Predictable pricing for teams of all sizes.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="flex flex-col">
              <CardHeader>
                <CardTitle className="text-xl">Starter</CardTitle>
                <div className="flex items-baseline gap-1 mt-4">
                  <span className="text-4xl font-bold">$49</span>
                  <span className="text-white/40">/month</span>
                </div>
                <CardDescription className="mt-4">Perfect for small startups and side projects.</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <ul className="space-y-4 text-sm text-white/70">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-primary" /> 1,000 parallel mins</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-primary" /> 5 team members</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-primary" /> Core reporting</li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button variant="secondary" className="w-full">Choose Starter</Button>
              </CardFooter>
            </Card>

            <Card className="flex flex-col border-primary/50 bg-primary/5 relative">
              <div className="absolute top-0 right-8 transform -translate-y-1/2 px-3 py-1 bg-primary text-[10px] font-bold uppercase tracking-widest rounded-full">Most Popular</div>
              <CardHeader>
                <CardTitle className="text-xl">Professional</CardTitle>
                <div className="flex items-baseline gap-1 mt-4">
                  <span className="text-4xl font-bold">$199</span>
                  <span className="text-white/40">/month</span>
                </div>
                <CardDescription className="mt-4">Advanced features for growing engineering teams.</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <ul className="space-y-4 text-sm text-white/70">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-primary" /> 10,000 parallel mins</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-primary" /> Unlimited members</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-primary" /> Visual regression</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-primary" /> SSO & SAML</li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Choose Professional</Button>
              </CardFooter>
            </Card>

            <Card className="flex flex-col">
              <CardHeader>
                <CardTitle className="text-xl">Enterprise</CardTitle>
                <div className="flex items-baseline gap-1 mt-4">
                  <span className="text-4xl font-bold">Custom</span>
                </div>
                <CardDescription className="mt-4">Bespoke infrastructure and dedicated support.</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <ul className="space-y-4 text-sm text-white/70">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-primary" /> Unlimited resources</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-primary" /> Dedicated CSM</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-primary" /> Custom integrations</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-primary" /> On-premise option</li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button variant="secondary" className="w-full">Contact Sales</Button>
              </CardFooter>
            </Card>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="px-6 max-w-3xl mx-auto mb-40">
          <div className="text-center mb-16">
             <h2 className="text-3xl font-bold tracking-tighter mb-4">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-4">
            {[
              { q: "How does AI generation work?", a: "Our engine uses large language models specifically trained on DOM trees and user behavior patterns to predict and build logical test flows." },
              { q: "Can I use Quantix with my existing CI/CD?", a: "Yes, we provide native plugins for GitHub Actions, GitLab, Jenkins, and CircleCI, as well as a robust CLI." },
              { q: "Is there a limit on parallel tests?", a: "Starter and Pro plans have minute limits, but no hard limit on concurrency. Enterprise plans offer infinite horizontal scaling." }
            ].map((item, i) => (
              <Card key={i} className="hover:bg-white/5 transition-colors cursor-pointer group">
                <div className="p-6 flex justify-between items-center">
                  <div>
                    <h4 className="font-semibold mb-2">{item.q}</h4>
                    <p className="text-sm text-white/50">{item.a}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* CTA FOOTER */}
        <section className="px-6 max-w-7xl mx-auto mb-20">
          <Card className="p-12 text-center bg-gradient-to-b from-primary/10 to-transparent border-primary/20 overflow-hidden relative">
            <Glow className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px]" />
            <h2 className="text-4xl font-bold mb-6 tracking-tighter">Ready to ship with confidence?</h2>
            <p className="text-white/60 mb-10 max-w-md mx-auto">Join 1,000+ teams who have already switched to Quantix.</p>
            <Button className="h-12 px-10 text-base" asChild>
              <Link href="/register">Join the Vanguard</Link>
            </Button>
          </Card>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-white/10 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-primary flex items-center justify-center">
              <span className="text-white text-[10px] font-bold">Q</span>
            </div>
            <span className="font-bold tracking-tighter">Quantix</span>
            <span className="text-white/30 text-xs ml-4">© 2026 Quantix AI. All rights reserved.</span>
          </div>
          <div className="flex gap-8 text-sm text-white/50">
            <Link href="#" className="hover:text-white transition-colors">Twitter</Link>
            <Link href="#" className="hover:text-white transition-colors">GitHub</Link>
            <Link href="#" className="hover:text-white transition-colors">Status</Link>
            <Link href="#" className="hover:text-white transition-colors">Privacy</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
