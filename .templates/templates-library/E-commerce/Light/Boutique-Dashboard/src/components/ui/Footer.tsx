"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ShoppingBag, Instagram, Twitter, Linkedin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-secondary/50 border-t border-border pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <ShoppingBag className="size-6 text-primary" />
              <span className="font-serif text-2xl font-bold tracking-tight">BOUTIQUE</span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              A plataforma definitiva para curadoria de luxo e gestão de inventário premium. 
              Elevando marcas ao topo do mercado global.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-sm uppercase tracking-widest mb-6">Plataforma</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">Curadoria</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Analytics VIP</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Segurança</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">API</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-sm uppercase tracking-widest mb-6">Empresa</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">Sobre Nós</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Carreiras</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Contato</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-sm uppercase tracking-widest mb-6">Newsletter</h4>
            <p className="text-sm text-muted-foreground mb-4">Receba insights exclusivos sobre o mercado de luxo.</p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="Seu e-mail" 
                className="bg-background border border-border px-4 py-2 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 flex-1"
              />
              <button className="bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-bold">OK</button>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-border/40 text-xs text-muted-foreground gap-4">
          <p>© 2026 Boutique S.A. Todos os direitos reservados.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-primary transition-colors"><Instagram className="size-4" /></a>
            <a href="#" className="hover:text-primary transition-colors"><Twitter className="size-4" /></a>
            <a href="#" className="hover:text-primary transition-colors"><Linkedin className="size-4" /></a>
          </div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-primary transition-colors">Termos</a>
            <a href="#" className="hover:text-primary transition-colors">Privacidade</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
