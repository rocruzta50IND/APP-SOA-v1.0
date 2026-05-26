import { Navbar } from "@/components/ui/Navbar";
import { Hero } from "@/components/ui/Hero";
import { BentoFeatures } from "@/components/ui/BentoFeatures";
import { InventoryPreview } from "@/components/ui/InventoryPreview";
import { PricingMatrix } from "@/components/ui/PricingMatrix";
import { WarehouseMap } from "@/components/ui/WarehouseMap";
import { CTA } from "@/components/ui/CTA";
import { Footer } from "@/components/ui/Footer";

export default function LandingPage() {
  return (
    <main className="flex flex-col min-h-screen">
      <Navbar />
      <Hero />
      <BentoFeatures />
      <InventoryPreview />
      <PricingMatrix />
      <WarehouseMap />
      <CTA />
      <Footer />
    </main>
  );
}