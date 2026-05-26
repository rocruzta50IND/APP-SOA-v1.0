"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ShoppingBag, ArrowRight } from "lucide-react";

export default function LoginPage() {
  return (
    <main className="min-h-screen flex flex-col md:flex-row bg-background">
      {/* Left Side: Branding / Visual */}
      <div className="hidden md:flex flex-1 relative bg-zinc-900 overflow-hidden items-center justify-center p-12">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_0%,transparent_70%)]" />
        <div className="relative z-10 text-white max-w-md text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
          >
            <ShoppingBag className="size-16 mx-auto mb-8" />
            <h2 className="font-serif text-4xl font-bold mb-6">A Excelência é uma Escolha.</h2>
            <p className="text-zinc-400 text-lg leading-relaxed mb-8">
              "A curadoria é o filtro que transforma o excesso em essência. Bem-vindo ao próximo nível do luxo digital."
            </p>
            <div className="pt-8 border-t border-white/10">
              <p className="font-serif italic text-xl">Philippe Durand</p>
              <p className="text-sm text-zinc-500 uppercase tracking-widest">Head of Exclusivity</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Right Side: Form */}
      <div className="flex-1 flex flex-col justify-center px-8 sm:px-12 md:px-24 py-12">
        <div className="max-w-md w-full mx-auto">
          <div className="md:hidden flex items-center gap-2 mb-12">
            <ShoppingBag className="size-6" />
            <span className="font-serif text-2xl font-bold">BOUTIQUE</span>
          </div>

          <h1 className="font-serif text-4xl font-bold mb-2">Bem-vindo de volta</h1>
          <p className="text-muted-foreground mb-10">Insira suas credenciais exclusivas para acessar o sistema.</p>

          <form className="space-y-6" onsubmit="return false;">
            <div className="space-y-2">
              <label className="text-sm font-medium">E-mail Corporativo</label>
              <input 
                type="email" 
                placeholder="nome@maison.com"
                className="w-full bg-secondary/50 border border-border px-4 py-3 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
              />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium">Senha</label>
                <a href="#" className="text-xs text-muted-foreground hover:text-primary">Esqueceu a senha?</a>
              </div>
              <input 
                type="password" 
                placeholder="••••••••"
                className="w-full bg-secondary/50 border border-border px-4 py-3 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
              />
            </div>

            <Link 
              href="/dashboard"
              className="w-full bg-primary text-primary-foreground py-4 rounded-full font-bold flex items-center justify-center gap-2 group hover:opacity-90 transition-all"
            >
              Acessar Painel
              <ArrowRight className="size-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </form>

          <div className="mt-12 pt-8 border-t border-border flex justify-between items-center text-sm text-muted-foreground">
            <p>Novo por aqui?</p>
            <Link href="#" className="font-bold text-primary hover:underline">Solicitar Acesso VIP</Link>
          </div>
        </div>
      </div>
    </main>
  );
}
