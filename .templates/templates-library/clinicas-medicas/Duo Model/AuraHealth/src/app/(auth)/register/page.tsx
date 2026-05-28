"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Activity, ShieldCheck, ArrowRight, Zap, Users } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";

export default function RegisterPage() {
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

        <div className="relative z-10 space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl lg:text-5xl font-bold tracking-tighter text-white leading-tight">
              Comece sua jornada <br />
              <span className="text-gradient">Data-Driven.</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-md">
              Junte-se a centenas de clínicas que já modernizaram seu atendimento com AuraHealth.
            </p>
          </div>

          <div className="grid gap-4">
            <Card className="bg-white/5 border-white/10 backdrop-blur-xl p-4 flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center shrink-0">
                <Zap className="text-primary w-5 h-5" />
              </div>
              <div>
                <h4 className="text-white font-semibold text-sm">Setup Instantâneo</h4>
                <p className="text-xs text-muted-foreground mt-1">Sua clínica operando em menos de 24 horas.</p>
              </div>
            </Card>

            <Card className="bg-white/5 border-white/10 backdrop-blur-xl p-4 flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center shrink-0">
                <Users className="text-primary w-5 h-5" />
              </div>
              <div>
                <h4 className="text-white font-semibold text-sm">Suporte 24/7</h4>
                <p className="text-xs text-muted-foreground mt-1">Especialistas prontos para ajudar sua equipe.</p>
              </div>
            </Card>
          </div>
        </div>

        <div className="relative z-10 flex items-center gap-6 text-sm text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4" />
            <span>SOC2 Type II Certified</span>
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
            <h2 className="text-3xl font-bold tracking-tighter text-white">Criar nova conta</h2>
            <p className="text-muted-foreground">Preencha os dados abaixo para solicitar seu acesso.</p>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-white/70 ml-1">Primeiro Nome</label>
                <Input placeholder="Helena" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-white/70 ml-1">Sobrenome</label>
                <Input placeholder="Souza" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-white/70 ml-1">Nome da Clínica / Hospital</label>
              <Input placeholder="Ex: OncoFlow Precision" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-white/70 ml-1">E-mail Corporativo</label>
              <Input type="email" placeholder="helena@clinica.com" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-white/70 ml-1">Senha</label>
              <Input type="password" placeholder="••••••••" />
            </div>
            
            <Button className="w-full group">
              <Link href="/dashboard" className="flex items-center justify-center gap-2 w-full h-full">
                Criar Minha Conta
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>

          </div>

          <p className="text-center text-xs text-muted-foreground px-4">
            Ao continuar, você concorda com nossos{" "}
            <Link href="#" className="underline underline-offset-4 hover:text-primary">Termos de Serviço</Link> e{" "}
            <Link href="#" className="underline underline-offset-4 hover:text-primary">Política de Privacidade</Link>.
          </p>

          <p className="text-center text-sm text-muted-foreground">
            Já possui uma conta?{" "}
            <Link href="/login" className="text-primary font-semibold hover:underline">
              Fazer Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
