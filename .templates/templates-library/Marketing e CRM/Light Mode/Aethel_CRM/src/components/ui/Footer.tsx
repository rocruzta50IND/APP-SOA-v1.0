import { cn } from "@/lib/utils";
import Link from "next/link";

const footerLinks = [
  {
    title: "Platform",
    links: [
      { name: "Lead Scoring", href: "#" },
      { name: "Campaign Engine", href: "#" },
      { name: "Pipeline Analytics", href: "#" },
      { name: "CRM Integration", href: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { name: "About FlowSprint", href: "#" },
      { name: "Marketing Blog", href: "#" },
      { name: "Enterprise", href: "#" },
      { name: "Contact", href: "#" },
    ],
  },
  {
    title: "Compliance",
    links: [
      { name: "Privacy Policy", href: "#" },
      { name: "Terms of Service", href: "#" },
      { name: "GDPR / LGPD", href: "#" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-background border-t border-border py-12 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-6 group">
              <div className="w-8 h-8 bg-primary flex items-center justify-center rounded-md transition-transform group-hover:scale-105">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-5 h-5 text-primary-foreground"
                >
                  <path d="M12 2v20" />
                  <path d="m17 5-5-3-5 3" />
                  <path d="m17 19-5 3-5-3" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              </div>
              <span className="font-black text-xl tracking-tighter text-foreground uppercase">FlowSprint</span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs leading-relaxed font-medium">
              The high-velocity Marketing Operating System for modern enterprise teams. Scale your revenue with surgical precision.
            </p>
          </div>
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground mb-6">{section.title}</h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors font-medium"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">
            © {new Date().getFullYear()} FlowSprint Technologies. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              <span className="sr-only">LinkedIn</span>
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
