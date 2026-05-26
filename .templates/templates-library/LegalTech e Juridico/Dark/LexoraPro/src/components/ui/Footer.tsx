import Link from "next/link";
import { Scale } from "lucide-react";

export function Footer() {
  return (
    <footer className="py-20 px-4 border-t border-white/10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-2">
          <Link href="/" className="flex items-center gap-2 mb-6">
            <Scale className="size-6 text-white" />
            <span className="font-bold text-xl tracking-tight text-white">Lexora<span className="text-zinc-500">Pro</span></span>
          </Link>
          <p className="text-zinc-500 max-w-xs leading-relaxed">
            The next generation legal operating system. Built with precision for elite law firms worldwide.
          </p>
        </div>
        
        <div>
          <h4 className="font-bold text-white mb-6">Product</h4>
          <ul className="space-y-4 text-zinc-500 text-sm">
            <li><Link href="#" className="hover:text-white transition-colors">Intelligence</Link></li>
            <li><Link href="#" className="hover:text-white transition-colors">Discovery</Link></li>
            <li><Link href="#" className="hover:text-white transition-colors">Compliance</Link></li>
            <li><Link href="#" className="hover:text-white transition-colors">Enterprise</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-white mb-6">Company</h4>
          <ul className="space-y-4 text-zinc-500 text-sm">
            <li><Link href="#" className="hover:text-white transition-colors">About</Link></li>
            <li><Link href="#" className="hover:text-white transition-colors">Security</Link></li>
            <li><Link href="#" className="hover:text-white transition-colors">Privacy</Link></li>
            <li><Link href="#" className="hover:text-white transition-colors">Legal</Link></li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-zinc-600 text-xs">
          © 2026 LexoraPro Technologies Inc. All rights reserved.
        </p>
        <div className="flex gap-8 text-zinc-600 text-xs font-medium">
          <Link href="#" className="hover:text-white transition-colors">Twitter</Link>
          <Link href="#" className="hover:text-white transition-colors">LinkedIn</Link>
          <Link href="#" className="hover:text-white transition-colors">GitHub</Link>
        </div>
      </div>
    </footer>
  );
}
