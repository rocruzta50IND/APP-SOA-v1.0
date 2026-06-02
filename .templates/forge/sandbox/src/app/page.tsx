"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  ChevronRight, 
  Shield, 
  Zap, 
  BarChart3, 
  Globe, 
  ArrowRight,
  Plus,
  Minus
} from "lucide-react";
import { cn } from "@/lib/utils";

const transition = { duration: 1.2, ease: [0.16, 1, 0.3, 1] } as const;

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition
};

const microLabel = "text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground mb-4 block";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-full" />
            <span className="font-serif text-xl tracking-tighter">KRYPTERA</span>
          </div>
          
          <div className="hidden md:flex items-center gap-12">
            {["Services", "Network", "Capital", "Insight"].map((item) => (
              <Link 
                key={item} 
                href="#" 
                className="text-[10px] uppercase tracking-widest font-bold hover:text-primary transition-colors"
              >
                {item}
              </Link>
            ))}
          </div>

          <Link 
            href="/login"
            className="bg-foreground text-background hover:opacity-80 rounded-full px-8 py-3 text-sm font-medium tracking-[0.1em] uppercase transition-all duration-500"
          >
            Access Portal
          </Link>
        </div>
      </nav>

      <main className="flex-grow pt-20">
        {/* Hero Section */}
        <section className="relative min-h-[90vh] flex items-center justify-center px-6 overflow-hidden">
          <div className="absolute inset-0 z-0">
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px]" />
          </div>

          <div className="max-w-5xl mx-auto text-center relative z-10">
            <motion.span 
              {...fadeInUp}
              className={microLabel}
            >
              The Next Evolution of Institutional Custody
            </motion.span>
            
            <motion.h1 
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...transition, delay: 0.1 }}
              className="text-6xl md:text-9xl leading-[0.9] mb-12"
            >
              ELEGANCE IN <br /> 
              <span className="text-primary italic">CRYPTOGRAPHY.</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...transition, delay: 0.3 }}
              className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-16 leading-relaxed"
            >
              Kryptera provides bespoke digital asset infrastructure for institutional pioneers, merging military-grade security with boutique visual clarity.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...transition, delay: 0.5 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-6"
            >
              <Link 
                href="/register"
                className="w-full sm:w-auto bg-primary text-primary-foreground hover:scale-105 rounded-full px-12 py-5 text-sm font-bold tracking-[0.2em] uppercase transition-all duration-500"
              >
                Inquire Access
              </Link>
              <button className="flex items-center gap-3 text-sm font-bold tracking-[0.2em] uppercase group">
                Watch the Film
                <div className="w-10 h-10 rounded-full border border-border flex items-center justify-center group-hover:bg-foreground group-hover:text-background transition-all">
                  <ChevronRight size={16} />
                </div>
              </button>
            </motion.div>
          </div>
        </section>

        {/* Social Proof / Metrics */}
        <section className="py-32 border-y border-border/50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-24">
              {[
                { label: "Assets Secured", value: "$42B+" },
                { label: "Node Uptime", value: "99.99%" },
                { label: "Active Institutions", value: "850+" },
                { label: "Global Nodes", value: "12,000" }
              ].map((metric, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ ...transition, delay: i * 0.1 }}
                  viewport={{ once: true }}
                >
                  <span className={microLabel}>{metric.label}</span>
                  <p className="text-4xl md:text-5xl font-serif tracking-tighter">{metric.value}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Bento Features */}
        <section className="py-32 bg-secondary/30">
          <div className="max-w-7xl mx-auto px-6">
            <div className="mb-24 text-center">
              <span className={microLabel}>The Infrastructure</span>
              <h2 className="text-5xl md:text-7xl">Precision Engineering.</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              <motion.div 
                {...fadeInUp}
                className="md:col-span-8 bg-background border border-border/50 p-12 min-h-[400px] flex flex-col justify-between"
              >
                <Shield size={40} className="text-primary mb-8" />
                <div>
                  <h3 className="text-4xl mb-6">Multi-Party Computation (MPC)</h3>
                  <p className="text-muted-foreground leading-relaxed max-w-md">
                    Eliminate single points of failure with distributed key generation and signing protocols designed for sovereign security.
                  </p>
                </div>
              </motion.div>

              <motion.div 
                {...fadeInUp}
                className="md:col-span-4 bg-primary text-primary-foreground p-12 min-h-[400px] flex flex-col justify-between"
              >
                <Zap size={40} className="mb-8" />
                <div>
                  <h3 className="text-4xl mb-6 italic">Instant Settlement</h3>
                  <p className="opacity-80 leading-relaxed">
                    Experience sub-second transaction finality across 20+ major blockchain networks.
                  </p>
                </div>
              </motion.div>

              <motion.div 
                {...fadeInUp}
                className="md:col-span-4 bg-background border border-border/50 p-12 min-h-[400px] flex flex-col justify-between"
              >
                <BarChart3 size={40} className="text-primary mb-8" />
                <div>
                  <h3 className="text-3xl mb-6 uppercase tracking-widest text-xs font-bold font-sans">Real-time Analytics</h3>
                  <h3 className="text-4xl mb-6 italic font-serif uppercase tracking-widest text-xs font-bold font-sans"></h3>
                  <h3 className="text-4xl mb-6">Yield Optimization</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    AI-driven staking strategies that maximize returns while minimizing risk exposure.
                  </p>
                </div>
              </motion.div>

              <motion.div 
                {...fadeInUp}
                className="md:col-span-8 bg-background border border-border/50 p-12 min-h-[400px] flex flex-col justify-between"
              >
                <Globe size={40} className="text-primary mb-8" />
                <div>
                  <h3 className="text-4xl mb-6">Global Compliance</h3>
                  <p className="text-muted-foreground leading-relaxed max-w-md">
                    Automated regulatory reporting and KYC/AML screening integrated directly into your workflow.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Cinematic Showcase */}
        <section className="py-32 overflow-hidden">
           <div className="max-w-7xl mx-auto px-6">
              <div className="flex flex-col md:flex-row gap-24 items-center">
                 <div className="flex-1">
                    <span className={microLabel}>The Experience</span>
                    <h2 className="text-6xl md:text-8xl mb-12">Bespoke <br /> Interface.</h2>
                    <p className="text-xl text-muted-foreground mb-12 leading-relaxed">
                      Our dashboard isn&apos;t just data—it&apos;s a work of art. Designed for the few who demand clarity amidst the chaos of the markets.
                    </p>
                    <ul className="space-y-6">
                       {[
                         "Dynamic Glassmorphic Layouts",
                         "Institutional-grade Charting",
                         "Multi-entity Portfolio Management"
                       ].map((item, i) => (
                         <li key={i} className="flex items-center gap-4 text-sm font-bold tracking-widest uppercase">
                            <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                            {item}
                         </li>
                       ))}
                    </ul>
                 </div>
                 <div className="flex-1 relative">
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.9, rotateY: -20 }}
                      whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
                      transition={transition}
                      className="aspect-[4/5] bg-secondary/50 border border-border/50 rounded-2xl relative overflow-hidden backdrop-blur-3xl"
                    >
                       <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent" />
                       <div className="absolute top-12 left-12 right-12 bottom-12 border border-primary/20 rounded-xl p-8 flex flex-col justify-between">
                          <div className="space-y-2">
                             <div className="h-2 w-24 bg-primary/40 rounded-full" />
                             <div className="h-8 w-48 bg-foreground/10 rounded-full" />
                          </div>
                          <div className="h-1/2 w-full bg-foreground/5 rounded-xl border border-white/5" />
                       </div>
                    </motion.div>
                 </div>
              </div>
           </div>
        </section>

        {/* Pricing */}
        <section className="py-32 bg-secondary/20">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <span className={microLabel}>Investment</span>
            <h2 className="text-5xl md:text-7xl mb-24">Transparent Capital.</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { name: "Sovereign", price: "$2.5k", description: "For emerging digital funds." },
                { name: "Vanguard", price: "$8k", description: "The standard for mid-sized institutions." },
                { name: "Empire", price: "Custom", description: "Global infrastructure for market makers." }
              ].map((plan, i) => (
                <motion.div 
                  key={i}
                  {...fadeInUp}
                  className={cn(
                    "p-12 border flex flex-col items-center",
                    i === 1 ? "border-primary bg-background shadow-2xl scale-105" : "border-border/50 bg-background/50"
                  )}
                >
                  <span className={microLabel}>{plan.name}</span>
                  <h3 className="text-5xl font-serif mb-4">{plan.price}</h3>
                  <p className="text-muted-foreground text-sm mb-12">{plan.description}</p>
                  <div className="w-full h-px bg-border/50 mb-12" />
                  <Link 
                    href="/register"
                    className={cn(
                      "w-full py-4 text-xs font-bold tracking-[0.2em] uppercase transition-all duration-500",
                      i === 1 ? "bg-primary text-primary-foreground" : "border border-foreground hover:bg-foreground hover:text-background"
                    )}
                  >
                    Select Plan
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-32">
          <div className="max-w-3xl mx-auto px-6">
            <div className="text-center mb-24">
               <span className={microLabel}>Queries</span>
               <h2 className="text-5xl md:text-7xl">Intelligence.</h2>
            </div>
            
            <div className="space-y-8">
              {[
                { q: "How does Kryptera handle key sharding?", a: "We utilize multi-party computation (MPC) to distribute key shards across geographically redundant secure enclaves, ensuring no single party ever holds a complete private key." },
                { q: "Is insurance included for digital assets?", a: "All assets held in our cold-storage vault are insured up to $500M through a consortium of Tier 1 underwriters." },
                { q: "What is the typical onboarding time?", a: "For Sovereign clients, onboarding is completed within 48 hours. Enterprise clients undergo a bespoke compliance review which typically takes 5-7 business days." }
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  {...fadeInUp}
                  className="border-b border-border/50 pb-8"
                >
                  <h4 className="text-xl mb-4 flex items-center justify-between group cursor-pointer font-serif">
                    {item.q}
                    <Plus className="text-primary group-hover:rotate-90 transition-transform" size={20} />
                  </h4>
                  <p className="text-muted-foreground leading-relaxed">{item.a}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer CTA */}
        <section className="py-32 bg-primary text-primary-foreground text-center relative overflow-hidden">
           <motion.div 
             initial={{ opacity: 0, scale: 1.5 }}
             whileInView={{ opacity: 0.1, scale: 1 }}
             transition={{ duration: 3 }}
             className="absolute inset-0 flex items-center justify-center font-serif text-[40vw] select-none pointer-events-none"
           >
              K
           </motion.div>

           <div className="relative z-10 max-w-4xl mx-auto px-6">
              <h2 className="text-6xl md:text-8xl mb-12 leading-none">Ready for the <br /> <span className="italic font-serif">Frontier?</span></h2>
              <Link 
                href="/register"
                className="inline-flex items-center gap-4 bg-background text-foreground rounded-full px-12 py-6 text-sm font-bold tracking-[0.2em] uppercase hover:scale-105 transition-all duration-500"
              >
                Inquire for Access <ArrowRight size={18} />
              </Link>
           </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-20 border-t border-border/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-8">
                <div className="w-6 h-6 bg-primary rounded-full" />
                <span className="font-serif text-lg tracking-tighter">KRYPTERA</span>
              </div>
              <p className="text-muted-foreground max-w-sm mb-8 leading-relaxed">
                Advanced digital asset infrastructure for institutional pioneers and visionary capital managers.
              </p>
              <div className="flex gap-6">
                {/* Social Placeholder */}
                {["X", "IG", "LI"].map(social => (
                  <span key={social} className="text-xs font-bold tracking-widest text-muted-foreground hover:text-primary cursor-pointer transition-colors">
                    {social}
                  </span>
                ))}
              </div>
            </div>
            
            <div>
              <span className={microLabel}>Network</span>
              <ul className="space-y-4">
                {["Custody", "Exchange", "Staking", "Bespoke"].map(link => (
                  <li key={link} className="text-sm hover:text-primary transition-colors cursor-pointer">{link}</li>
                ))}
              </ul>
            </div>

            <div>
              <span className={microLabel}>Company</span>
              <ul className="space-y-4">
                {["About", "Network Status", "Intelligence", "Press"].map(link => (
                  <li key={link} className="text-sm hover:text-primary transition-colors cursor-pointer">{link}</li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-t border-border/50 pt-12">
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
              © 2026 KRYPTERA TECHNOLOGIES. ALL RIGHTS RESERVED.
            </p>
            <div className="flex gap-8">
              <span className="text-[10px] uppercase tracking-widest text-muted-foreground hover:text-primary cursor-pointer">Privacy Policy</span>
              <span className="text-[10px] uppercase tracking-widest text-muted-foreground hover:text-primary cursor-pointer">Terms of Service</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
