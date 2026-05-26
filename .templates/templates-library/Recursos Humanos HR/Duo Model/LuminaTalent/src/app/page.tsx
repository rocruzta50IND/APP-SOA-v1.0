"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { 
  ArrowRight, 
  ChevronRight, 
  Users, 
  Zap, 
  BarChart3, 
  ShieldCheck, 
  Globe, 
  Star
} from "lucide-react";
import { cn } from "@/lib/utils";

const transition = { duration: 1.2, ease: [0.16, 1, 0.3, 1] } as const;

const fadeIn = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
};

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background font-sans">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 border-b border-border/40 bg-background/80 backdrop-blur-md">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="font-playfair text-2xl font-bold tracking-tighter">
            LUMINA<span className="text-primary">TALENT</span>
          </Link>
          <div className="hidden md:flex items-center gap-12 text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground">
            <Link href="#features" className="hover:text-primary transition-colors">Intelligence</Link>
            <Link href="#experience" className="hover:text-primary transition-colors">Experience</Link>
            <Link href="#pricing" className="hover:text-primary transition-colors">Investment</Link>
            <Link href="/login" className="hover:text-primary transition-colors">Member Access</Link>
          </div>
          <Link 
            href="/register" 
            className="bg-foreground text-background hover:opacity-80 rounded-full px-8 py-3 text-[10px] uppercase tracking-[0.2em] font-bold transition-all duration-500"
          >
            Inquiry
          </Link>
        </div>
      </nav>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative pt-40 pb-32 md:pt-60 md:pb-52 overflow-hidden">
          <div className="container mx-auto px-6 relative z-10">
            <motion.div 
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={transition}
              className="max-w-5xl"
            >
              <span className="font-sans text-[10px] uppercase tracking-[0.3em] font-bold text-primary mb-8 block">
                The New Standard in Human Capital
              </span>
              <h1 className="font-playfair text-6xl md:text-9xl leading-[0.9] tracking-tighter mb-12">
                Orchestrating <br />
                <span className="italic">Elite Talent</span> <br />
                at Scale.
              </h1>
              <p className="font-sans text-xl text-muted-foreground max-w-2xl mb-16 leading-relaxed">
                LuminaTalent redefines enterprise HR through a cinematic lens of precision, 
                blending advanced intelligence with intuitive human-centric design.
              </p>
              <div className="flex flex-col sm:flex-row gap-6">
                <Link 
                  href="/register" 
                  className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-10 py-5 text-sm font-medium tracking-widest uppercase transition-all duration-500 flex items-center justify-center gap-2 group"
                >
                  Begin Transformation <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link 
                  href="/login" 
                  className="border border-border hover:bg-muted/50 rounded-full px-10 py-5 text-sm font-medium tracking-widest uppercase transition-all duration-500 text-center"
                >
                  Access Portal
                </Link>
              </div>
            </motion.div>
          </div>
          
          {/* Abstract Background Element */}
          <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 -z-10 blur-3xl rounded-full" />
        </section>

        {/* Intelligence (Features) Section */}
        <section id="features" className="py-32 bg-muted/30">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
              <motion.div {...fadeIn} transition={transition}>
                <h2 className="font-playfair text-5xl md:text-7xl leading-tight mb-8">
                  Intelligence <br />Beyond Compare.
                </h2>
                <div className="space-y-12 mt-16">
                  {[
                    { 
                      icon: Zap, 
                      title: "Predictive Analytics", 
                      desc: "Anticipate organizational needs with our proprietary forecasting engine." 
                    },
                    { 
                      icon: ShieldCheck, 
                      title: "Compliance Fortress", 
                      desc: "Automated global regulatory alignment across 140+ jurisdictions." 
                    },
                    { 
                      icon: Globe, 
                      title: "Global Mobility", 
                      desc: "Seamlessly transition talent across borders with absolute transparency." 
                    }
                  ].map((item, idx) => (
                    <div key={idx} className="flex gap-8 group">
                      <div className="shrink-0 w-16 h-16 rounded-full bg-background border border-border flex items-center justify-center group-hover:border-primary transition-colors duration-500">
                        <item.icon className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-playfair text-2xl mb-3">{item.title}</h3>
                        <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
              <motion.div 
                {...fadeIn} 
                transition={{ ...transition, delay: 0.2 }}
                className="relative aspect-square bg-foreground/5 p-8"
              >
                <div className="absolute inset-0 border border-border m-8" />
                <div className="relative h-full w-full bg-background border border-border p-12 flex flex-col justify-between overflow-hidden">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">System Health</span>
                      <div className="text-4xl font-playfair mt-2 text-primary">99.9%</div>
                    </div>
                    <BarChart3 className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <div className="space-y-4">
                    <div className="h-[1px] w-full bg-border" />
                    <div className="h-[1px] w-2/3 bg-border" />
                    <div className="h-[1px] w-full bg-border" />
                    <div className="h-[1px] w-1/2 bg-border" />
                  </div>
                  <div className="font-playfair text-xl italic text-muted-foreground">
                    "Precision is the foundation of luxury."
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Experience Section (Bento) */}
        <section id="experience" className="py-32">
          <div className="container mx-auto px-6 text-center mb-24">
            <motion.div {...fadeIn} transition={transition}>
              <h2 className="font-playfair text-5xl md:text-8xl mb-8">The Experience</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto uppercase tracking-widest text-[10px] font-bold">
                Uncompromising Quality in every interaction
              </p>
            </motion.div>
          </div>

          <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              {...fadeIn} transition={transition}
              className="md:col-span-2 h-[500px] border border-border p-12 flex flex-col justify-end bg-muted/20 hover:bg-muted/40 transition-colors duration-700"
            >
              <Users className="w-12 h-12 text-primary mb-8" />
              <h3 className="font-playfair text-4xl mb-6">Concierge Recruitment</h3>
              <p className="text-muted-foreground max-w-md leading-relaxed">
                A bespoke talent acquisition journey, treating every candidate as a 
                high-value asset from discovery to integration.
              </p>
            </motion.div>
            
            <motion.div 
              {...fadeIn} transition={{ ...transition, delay: 0.1 }}
              className="h-[500px] border border-border p-12 flex flex-col justify-end hover:bg-muted/20 transition-colors duration-700"
            >
              <Zap className="w-12 h-12 text-primary mb-8" />
              <h3 className="font-playfair text-4xl mb-6">Hyper-Growth</h3>
              <p className="text-muted-foreground leading-relaxed">
                Scale your executive leadership with surgical precision.
              </p>
            </motion.div>

            <motion.div 
              {...fadeIn} transition={{ ...transition, delay: 0.2 }}
              className="h-[500px] border border-border p-12 flex flex-col justify-end hover:bg-muted/20 transition-colors duration-700"
            >
              <BarChart3 className="w-12 h-12 text-primary mb-8" />
              <h3 className="font-playfair text-4xl mb-6">Insights</h3>
              <p className="text-muted-foreground leading-relaxed">
                Real-time visibility into the heart of your organization.
              </p>
            </motion.div>

            <motion.div 
              {...fadeIn} transition={{ ...transition, delay: 0.3 }}
              className="md:col-span-2 h-[500px] border border-border p-12 flex flex-col justify-end bg-foreground text-background"
            >
              <Star className="w-12 h-12 text-primary mb-8" />
              <h3 className="font-playfair text-4xl mb-6 text-background">Prestige Network</h3>
              <p className="text-muted-foreground max-w-md leading-relaxed">
                Access an exclusive ecosystem of vetted C-suite visionaries 
                and world-class technical architects.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Investment (Pricing) Section */}
        <section id="pricing" className="py-32 bg-muted/10">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
              <motion.div {...fadeIn} transition={transition}>
                <h2 className="font-playfair text-5xl md:text-7xl mb-4">Investment</h2>
                <p className="text-muted-foreground uppercase tracking-widest text-[10px] font-bold">
                  Tiered exclusivity for global leaders
                </p>
              </motion.div>
              <div className="h-[1px] flex-1 bg-border hidden md:block mb-8 mx-12" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-l border-t border-border">
              {[
                { name: "Portfolio", price: "$4,500", focus: "Growing Enterprises" },
                { name: "Consolidated", price: "$12,000", focus: "International Brands" },
                { name: "Sovereign", price: "Custom", focus: "Fortune 100" }
              ].map((tier, idx) => (
                <motion.div 
                  key={idx} 
                  {...fadeIn} transition={{ ...transition, delay: idx * 0.1 }}
                  className="p-16 border-r border-b border-border flex flex-col h-full hover:bg-background transition-colors duration-500"
                >
                  <span className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground mb-12">{tier.focus}</span>
                  <h3 className="font-playfair text-4xl mb-4">{tier.name}</h3>
                  <div className="text-2xl font-sans mb-16">{tier.price} <span className="text-xs text-muted-foreground">/ monthly</span></div>
                  <div className="mt-auto">
                    <ul className="space-y-4 mb-12 text-sm text-muted-foreground">
                      <li className="flex items-center gap-2"><ChevronRight className="w-3 h-3 text-primary" /> Full Core Suite</li>
                      <li className="flex items-center gap-2"><ChevronRight className="w-3 h-3 text-primary" /> Predictive Engine</li>
                      <li className="flex items-center gap-2"><ChevronRight className="w-3 h-3 text-primary" /> Dedicated Curator</li>
                    </ul>
                    <Link 
                      href="/register" 
                      className="w-full block py-4 text-center border border-border text-[10px] uppercase tracking-widest font-bold hover:bg-foreground hover:text-background transition-all duration-500"
                    >
                      Inquire Now
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-32">
          <div className="container mx-auto px-6 max-w-4xl">
            <motion.div {...fadeIn} transition={transition} className="text-center mb-24">
              <h2 className="font-playfair text-5xl md:text-6xl mb-8">Inquiries</h2>
            </motion.div>
            
            <div className="space-y-12">
              {[
                { q: "How does the onboarding process look?", a: "We believe in a white-glove transition. Our executive curators handle every detail of the migration to ensure zero disruption." },
                { q: "Is our data secure?", a: "LuminaTalent utilizes enterprise-grade encryption and is fully SOC 2 Type II compliant, providing a digital fortress for your human capital assets." },
                { q: "Do you support global payroll?", a: "Yes, our Sovereign tier includes native localized payroll across 140+ countries, handled with absolute fiscal precision." }
              ].map((faq, idx) => (
                <motion.div 
                  key={idx} 
                  {...fadeIn} transition={{ ...transition, delay: idx * 0.1 }}
                  className="border-b border-border pb-12"
                >
                  <h4 className="font-playfair text-2xl mb-6">{faq.q}</h4>
                  <p className="text-muted-foreground leading-relaxed">{faq.a}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-20 border-t border-border bg-muted/20">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between gap-16 mb-20">
              <div className="max-w-xs">
                <Link href="/" className="font-playfair text-2xl font-bold tracking-tighter mb-8 block">
                  LUMINA<span className="text-primary">TALENT</span>
                </Link>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Redefining the architecture of human capital for the world's most 
                  ambitious organizations.
                </p>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-16">
                <div>
                  <h5 className="text-[10px] uppercase tracking-widest font-bold mb-8">Collection</h5>
                  <ul className="space-y-4 text-sm text-muted-foreground">
                    <li><Link href="#" className="hover:text-primary transition-colors">Intelligence</Link></li>
                    <li><Link href="#" className="hover:text-primary transition-colors">Mobility</Link></li>
                    <li><Link href="#" className="hover:text-primary transition-colors">Experience</Link></li>
                  </ul>
                </div>
                <div>
                  <h5 className="text-[10px] uppercase tracking-widest font-bold mb-8">Company</h5>
                  <ul className="space-y-4 text-sm text-muted-foreground">
                    <li><Link href="#" className="hover:text-primary transition-colors">About</Link></li>
                    <li><Link href="#" className="hover:text-primary transition-colors">Press</Link></li>
                    <li><Link href="#" className="hover:text-primary transition-colors">Careers</Link></li>
                  </ul>
                </div>
                <div>
                  <h5 className="text-[10px] uppercase tracking-widest font-bold mb-8">Legal</h5>
                  <ul className="space-y-4 text-sm text-muted-foreground">
                    <li><Link href="#" className="hover:text-primary transition-colors">Privacy</Link></li>
                    <li><Link href="#" className="hover:text-primary transition-colors">Terms</Link></li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-border/50 gap-4">
              <p className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">
                © 2024 LuminaTalent. All Rights Reserved.
              </p>
              <div className="flex gap-8 text-[10px] uppercase tracking-widest font-bold text-muted-foreground">
                <Link href="#" className="hover:text-primary">Twitter</Link>
                <Link href="#" className="hover:text-primary">LinkedIn</Link>
                <Link href="#" className="hover:text-primary">Instagram</Link>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
