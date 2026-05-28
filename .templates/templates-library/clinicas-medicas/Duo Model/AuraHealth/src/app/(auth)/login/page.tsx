"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Activity, ShieldCheck, ArrowRight, Star } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row overflow-hidden">
      {/* Visual / Brand Side */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="hidden md:flex md:w-1/2 relative bg-secondary/20 p-12 flex-col justify-between overflow-hidden"
      >
        {/* Ambient Glows */}
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[100px]" />
        
        <div className="relative z-10 flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-[0_0_20px_rgba(79,70,229,0.3)]">
            <Activity className="text-white w-6 h-6" />
          </div>
          <span className="text-2xl font-bold tracking-tighter text-white">AuraHealth</span>
        </div>

        <div className="relative z-10 space-y-6">
          <div className="space-y-2">
            <h1 className="text-4xl lg:text-5xl font-bold tracking-tighter text-white leading-tight">
              A Próxima Geração da <br />
              <span className="text-gradient">Gestão Clínica.</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-md">
              Segurança nível enterprise, interface fluida e inteligência preditiva para sua clínica.
            </p>
          </div>

          <Card className="bg-white/5 border-white/10 backdrop-blur-xl p-6 max-w-sm">
            <div className="flex gap-1 mb-3">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-primary text-primary" />
              ))}
            </div>
            <p className="text-sm text-white/80 italic mb-4">
              &quot;A AuraHealth transformou completamente como gerenciamos nossos fluxos de infusão. É intuitivo e visualmente impecável.&quot;
            </p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary to-indigo-400" />
              <div>
                <p className="text-sm font-semibold text-white">Dra. Helena Souza</p>
                <p className="text-xs text-muted-foreground">Diretora Clínica, OncoFlow</p>
              </div>
            </div>
          </Card>
        </div>

        <div className="relative z-10 flex items-center gap-6 text-sm text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4" />
            <span>HIPAA Compliant</span>
          </div>
          <span>&copy; 2026 AuraHealth Inc.</span>
        </div>
      </motion.div>

      {/* Form Side */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-12 relative">
        <div className="w-full max-w-md space-y-8">
          <div className="space-y-2 text-center md:text-left">
            <div className="flex md:hidden items-center justify-center gap-2 mb-8">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <Activity className="text-white w-5 h-5" />
              </div>
              <span className="text-xl font-bold tracking-tighter text-white">AuraHealth</span>
            </div>
            <h2 className="text-3xl font-bold tracking-tighter text-white">Bem-vindo de volta</h2>
            <p className="text-muted-foreground">Entre com suas credenciais para acessar o painel.</p>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-white/70 ml-1">E-mail Corporativo</label>
              <Input type="email" placeholder="nome@clinica.com" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <label className="text-sm font-medium text-white/70">Senha</label>
                <Link href="#" className="text-xs text-primary hover:underline">Esqueceu a senha?</Link>
              </div>
              <Input type="password" placeholder="••••••••" />
            </div>
            
            <Button className="w-full group">
              <Link href="/dashboard" className="flex items-center justify-center gap-2 w-full h-full">
                Acessar Plataforma
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-white/5" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">Ou continue com</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline" className="w-full">Google</Button>
            <Button variant="outline" className="w-full">Microsoft</Button>
          </div>

          <p className="text-center text-sm text-muted-foreground">
            Não tem uma conta?{" "}
            <Link href="/register" className="text-primary font-semibold hover:underline">
              Solicitar Acesso
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
