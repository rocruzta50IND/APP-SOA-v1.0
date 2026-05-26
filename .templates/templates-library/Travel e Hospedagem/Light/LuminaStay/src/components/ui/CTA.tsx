import { Button } from "./Button";
import Link from "next/link";

export function CTA() {
  return (
    <section className="py-32">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[3rem] bg-primary px-8 py-20 text-center shadow-2xl">
          {/* Decorative circles */}
          <div className="absolute -left-20 -top-20 size-64 rounded-full bg-white/5 blur-3xl" />
          <div className="absolute -right-20 -bottom-20 size-64 rounded-full bg-white/5 blur-3xl" />
          
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-primary-foreground mb-6">
              Ready to elevate your <br /> guest experience?
            </h2>
            <p className="text-primary-foreground/70 text-lg mb-10 max-w-xl mx-auto">
              Join 12,000+ properties using LuminaStay to power their global operations. 
              Start your 14-day free trial today.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Link href="/login" className="w-full sm:w-auto">
                <Button variant="secondary" size="lg" className="w-full sm:w-auto h-12 px-10 rounded-xl">
                  Get Started for Free
                </Button>
              </Link>
              <Link href="#pricing" className="w-full sm:w-auto">
                <Button variant="ghost" size="lg" className="w-full sm:w-auto h-12 px-10 rounded-xl text-primary-foreground hover:bg-white/10">
                  View Pricing
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
