"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  ArrowRight, 
  CheckCircle2, 
  BarChart3, 
  Users, 
  ShieldCheck, 
  Stethoscope, 
  Activity, 
  Calendar,
  Search,
  ChevronDown
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const transition = { duration: 0.2, ease: "easeOut" } as const;

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background selection:bg-primary selection:text-primary-foreground">
      {/* Navbar */}
      <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded bg-primary text-primary-foreground">
              <Activity className="h-5 w-5" />
            </div>
            <span className="text-lg font-bold tracking-tighter">PULSE<span className="text-muted-foreground">NOVA</span></span>
          </div>
          <nav className="hidden md:flex gap-6 items-center">
            <Link href="#features" className="text-sm font-medium hover:text-primary transition-colors">Recursos</Link>
            <Link href="#pricing" className="text-sm font-medium hover:text-primary transition-colors">Planos</Link>
            <Link href="#faq" className="text-sm font-medium hover:text-primary transition-colors">Suporte</Link>
          </nav>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/login">Entrar</Link>
            </Button>
            <Button size="sm" asChild>
              <Link href="/register">Começar Agora</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-24 md:py-32 lg:py-40 border-b border-border/40">
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <div className="flex flex-col items-center text-center space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={transition}
              >
                <Badge>Enterprise Grade OS</Badge>
              </motion.div>
              <motion.h1 
                className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight max-w-4xl leading-tight"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...transition, delay: 0.1 }}
              >
                A infraestrutura definitiva para <span className="text-muted-foreground">clínicas de alto padrão.</span>
              </motion.h1>
              <motion.p 
                className="text-lg md:text-xl text-muted-foreground max-w-2xl"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...transition, delay: 0.2 }}
              >
                Gerencie pacientes, prontuários e finanças com precisão cirúrgica. PulseNova é o sistema operacional projetado para a medicina moderna.
              </motion.p>
              <motion.div 
                className="flex flex-col sm:flex-row gap-4 pt-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...transition, delay: 0.3 }}
              >
                <Button size="lg" className="h-12 px-8" asChild>
                  <Link href="/register">
                    Iniciar Implementação <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" className="h-12 px-8">
                  Agendar Demonstração
                </Button>
              </motion.div>
            </div>
          </div>
          {/* Background Grid Accent */}
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
        </section>

        {/* Social Proof / Numbers */}
        <section className="py-12 border-b border-border/40 bg-muted/20">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { label: "Clínicas Ativas", value: "2.4k+" },
                { label: "Pacientes Gerenciados", value: "1.2M+" },
                { label: "Uptime Garantido", value: "99.99%" },
                { label: "Redução de Glosas", value: "34%" },
              ].map((stat, i) => (
                <div key={i} className="flex flex-col items-center justify-center space-y-1">
                  <span className="text-3xl font-bold tracking-tighter">{stat.value}</span>
                  <span className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Bento Features Section */}
        <section id="features" className="py-24 md:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col space-y-4 mb-16">
              <Badge className="w-fit">Recursos</Badge>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Engenharia aplicada à saúde.</h2>
              <p className="text-muted-foreground max-w-2xl text-lg">
                Ferramentas robustas que eliminam a fricção operacional e permitem foco total no paciente.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Feature 1 - Large */}
              <Card className="md:col-span-2 overflow-hidden border-border/60">
                <CardContent className="p-0 flex flex-col md:flex-row h-full">
                  <div className="p-8 flex flex-col justify-center space-y-4 md:w-1/2">
                    <div className="h-10 w-10 rounded border border-border flex items-center justify-center bg-muted/50">
                      <BarChart3 className="h-5 w-5" />
                    </div>
                    <h3 className="text-2xl font-bold">Analytics Preditivo</h3>
                    <p className="text-muted-foreground">
                      Antecipe cancelamentos e otimize sua agenda com inteligência de dados integrada. Visualize a saúde financeira da sua clínica em tempo real.
                    </p>
                  </div>
                  <div className="bg-muted/30 md:w-1/2 p-6 flex items-center justify-center border-l border-border/40">
                     <div className="w-full h-48 rounded border border-border bg-background shadow-sm flex flex-col p-4 space-y-3">
                        <div className="h-2 w-1/2 bg-muted rounded" />
                        <div className="flex items-end gap-2 h-full pt-4">
                           <div className="bg-primary/20 w-full h-[40%] rounded-sm" />
                           <div className="bg-primary/40 w-full h-[60%] rounded-sm" />
                           <div className="bg-primary w-full h-[90%] rounded-sm" />
                           <div className="bg-primary/60 w-full h-[75%] rounded-sm" />
                           <div className="bg-primary/30 w-full h-[50%] rounded-sm" />
                        </div>
                     </div>
                  </div>
                </CardContent>
              </Card>

              {/* Feature 2 */}
              <Card className="border-border/60">
                <CardContent className="p-8 flex flex-col space-y-4">
                  <div className="h-10 w-10 rounded border border-border flex items-center justify-center bg-muted/50">
                    <ShieldCheck className="h-5 w-5" />
                  </div>
                  <h3 className="text-xl font-bold">Segurança HIPAA</h3>
                  <p className="text-muted-foreground text-sm">
                    Criptografia de ponta a ponta e conformidade total com a LGPD e normas internacionais.
                  </p>
                </CardContent>
              </Card>

              {/* Feature 3 */}
              <Card className="border-border/60">
                <CardContent className="p-8 flex flex-col space-y-4">
                  <div className="h-10 w-10 rounded border border-border flex items-center justify-center bg-muted/50">
                    <Users className="h-5 w-5" />
                  </div>
                  <h3 className="text-xl font-bold">Portal do Paciente</h3>
                  <p className="text-muted-foreground text-sm">
                    Interface intuitiva para agendamentos, check-ins e acesso a resultados de exames.
                  </p>
                </CardContent>
              </Card>

              {/* Feature 4 - Large */}
              <Card className="md:col-span-2 border-border/60 bg-primary text-primary-foreground">
                <CardContent className="p-8 flex flex-col justify-center space-y-4 h-full">
                  <div className="h-10 w-10 rounded border border-primary-foreground/20 flex items-center justify-center bg-primary-foreground/10">
                    <Stethoscope className="h-5 w-5" />
                  </div>
                  <h3 className="text-2xl font-bold">Prontuário Eletrônico Inteligente</h3>
                  <p className="opacity-80">
                    Workflow otimizado para médicos. Prescrições digitais, histórico clínico estruturado e integração com laboratórios em uma única tela.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-24 md:py-32 bg-muted/30 border-y border-border/40">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-4 mb-16">
              <Badge>Planos</Badge>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Escalabilidade previsível.</h2>
              <p className="text-muted-foreground max-w-2xl text-lg">
                Escolha o plano que melhor se adapta ao volume da sua clínica.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[
                { 
                  name: "Professional", 
                  price: "R$ 499", 
                  desc: "Ideal para consultórios individuais.",
                  features: ["Até 500 pacientes/mês", "Prontuário Digital", "Agenda Inteligente", "Suporte Email"]
                },
                { 
                  name: "Enterprise", 
                  price: "R$ 1.299", 
                  desc: "Para clínicas em crescimento.",
                  popular: true,
                  features: ["Pacientes ilimitados", "Analytics Avançado", "Portal do Paciente", "Suporte 24/7 VIP", "Faturamento TISS/TUSS"]
                },
                { 
                  name: "Custom", 
                  price: "Sob consulta", 
                  desc: "Para redes de clínicas e hospitais.",
                  features: ["White-label", "API dedicada", "Treinamento presencial", "SLA personalizado", "Gestão de multi-unidades"]
                }
              ].map((plan, i) => (
                <Card key={i} className={cn("relative flex flex-col h-full", plan.popular && "border-primary shadow-lg scale-105 z-10")}>
                  {plan.popular && (
                    <div className="absolute top-0 right-0 left-0 -translate-y-1/2 flex justify-center">
                      <span className="bg-primary text-primary-foreground text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">Mais Escolhido</span>
                    </div>
                  )}
                  <CardContent className="p-8 flex flex-col h-full">
                    <div className="mb-8">
                      <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                      <div className="flex items-baseline gap-1">
                        <span className="text-3xl font-bold tracking-tighter">{plan.price}</span>
                        {plan.price.startsWith("R$") && <span className="text-muted-foreground text-sm">/mês</span>}
                      </div>
                      <p className="text-sm text-muted-foreground mt-4">{plan.desc}</p>
                    </div>
                    <ul className="space-y-3 mb-8 flex-1">
                      {plan.features.map((feature, j) => (
                        <li key={j} className="flex items-center text-sm gap-2">
                          <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button variant={plan.popular ? "default" : "outline"} className="w-full" asChild>
                      <Link href="/register">Selecionar Plano</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="py-24 md:py-32">
          <div className="container mx-auto px-4 md:px-6">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                <div>
                  <Badge className="mb-4">FAQ</Badge>
                  <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">Perguntas Frequentes</h2>
                  <p className="text-muted-foreground text-lg mb-8">
                    Tudo o que você precisa saber sobre a implementação e segurança do PulseNova.
                  </p>
                  <Button variant="outline">Falar com um Especialista</Button>
                </div>
                <div className="space-y-6">
                  {[
                    { q: "Como funciona a migração de dados?", a: "Nossa equipe técnica realiza a extração e saneamento dos dados do seu sistema atual, garantindo integridade total na transição." },
                    { q: "O sistema funciona offline?", a: "O PulseNova é cloud-native para máxima colaboração, mas possui cache local para operações críticas em caso de instabilidade de rede." },
                    { q: "É compatível com convênios?", a: "Sim, oferecemos suporte completo ao padrão TISS/TUSS e faturamento direto com as principais operadoras." },
                    { q: "Quais os requisitos de hardware?", a: "Como é baseado em web moderna, o PulseNova roda em qualquer navegador atual, seja no desktop, tablet ou smartphone." }
                  ].map((item, i) => (
                    <div key={i} className="border-b border-border pb-6">
                      <h4 className="font-bold text-lg mb-2">{item.q}</h4>
                      <p className="text-muted-foreground">{item.a}</p>
                    </div>
                  ))}
                </div>
             </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 border-t border-border/40 bg-primary text-primary-foreground overflow-hidden relative">
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <div className="flex flex-col items-center text-center space-y-8">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight max-w-3xl">Pronto para elevar o padrão operacional da sua clínica?</h2>
              <p className="text-primary-foreground/80 text-lg max-w-xl">
                Junte-se a mais de 2.000 clínicas que confiam no PulseNova para gerenciar sua excelência médica.
              </p>
              <Button size="lg" variant="outline" className="bg-transparent border-primary-foreground hover:bg-primary-foreground hover:text-primary h-12 px-8" asChild>
                <Link href="/register">Criar Conta Enterprise</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border/40 py-12 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">
            <div className="col-span-2 lg:col-span-2">
               <div className="flex items-center gap-2 mb-6">
                <div className="flex h-8 w-8 items-center justify-center rounded bg-primary text-primary-foreground">
                  <Activity className="h-5 w-5" />
                </div>
                <span className="text-lg font-bold tracking-tighter">PULSE<span className="text-muted-foreground">NOVA</span></span>
              </div>
              <p className="text-muted-foreground text-sm max-w-xs mb-6">
                A próxima geração de software para gestão médica de alto desempenho.
              </p>
              <div className="flex gap-4">
                {/* Icons placeholder */}
                <div className="h-8 w-8 rounded border border-border flex items-center justify-center bg-muted/50" />
                <div className="h-8 w-8 rounded border border-border flex items-center justify-center bg-muted/50" />
                <div className="h-8 w-8 rounded border border-border flex items-center justify-center bg-muted/50" />
              </div>
            </div>
            <div>
              <h4 className="font-bold text-sm mb-4 uppercase tracking-widest">Produto</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="#" className="hover:text-primary">Recursos</Link></li>
                <li><Link href="#" className="hover:text-primary">Integrações</Link></li>
                <li><Link href="#" className="hover:text-primary">Enterprise</Link></li>
                <li><Link href="#" className="hover:text-primary">Changelog</Link></li>
              </ul>
            </div>
            <div>
               <h4 className="font-bold text-sm mb-4 uppercase tracking-widest">Empresa</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="#" className="hover:text-primary">Sobre Nós</Link></li>
                <li><Link href="#" className="hover:text-primary">Carreiras</Link></li>
                <li><Link href="#" className="hover:text-primary">Contato</Link></li>
                <li><Link href="#" className="hover:text-primary">Privacidade</Link></li>
              </ul>
            </div>
             <div>
               <h4 className="font-bold text-sm mb-4 uppercase tracking-widest">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="#" className="hover:text-primary">Termos</Link></li>
                <li><Link href="#" className="hover:text-primary">Segurança</Link></li>
                <li><Link href="#" className="hover:text-primary">LGPD</Link></li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-border/40 text-[10px] text-muted-foreground font-bold uppercase tracking-widest">
            <p>© 2026 PulseNova OS. Todos os direitos reservados.</p>
            <p>Designed for Excellence.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
