import { Navbar } from "@/components/ui/Navbar";
import { Hero } from "@/components/ui/Hero";
import { BentoFeatures } from "@/components/ui/BentoFeatures";
import { ExclusivityWidget } from "@/components/ui/ExclusivityWidget";
import { Pricing } from "@/components/ui/Pricing";
import { Footer } from "@/components/ui/Footer";

export default function LandingPage() {
  return (
    <main className="relative flex flex-col w-full">
      <Navbar />
      <Hero />
      <BentoFeatures />
      <ExclusivityWidget />
      <Pricing />
      <Footer />
    </main>
  );
}
