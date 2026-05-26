import { Navbar } from "@/components/ui/Navbar";
import { Hero } from "@/components/ui/Hero";
import { Features } from "@/components/ui/Features";
import { Stats } from "@/components/ui/Stats";
import { Pricing } from "@/components/ui/Pricing";
import { CTA } from "@/components/ui/CTA";
import { Footer } from "@/components/ui/Footer";

export default function LandingPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <Stats />
      <Features />
      <Pricing />
      <CTA />
      <Footer />
    </main>
  );
}
