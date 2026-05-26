import { Navbar } from "@/components/ui/Navbar";
import { Hero } from "@/components/ui/Hero";
import { BentoFeatures } from "@/components/ui/BentoFeatures";
import { Pricing } from "@/components/ui/Pricing";
import { Footer } from "@/components/ui/Footer";

export default function LandingPage() {
  return (
    <main className="bg-black text-white min-h-screen selection:bg-white selection:text-black">
      <Navbar />
      <Hero />
      <div className="space-y-32 pb-32">
        <BentoFeatures />
        <Pricing />
      </div>
      <Footer />
    </main>
  );
}
