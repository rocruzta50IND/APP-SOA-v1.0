"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  Activity, 
  ArrowRight, 
  BarChart3, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  CreditCard, 
  HelpCircle, 
  Layers, 
  Lock, 
  Plus, 
  ShieldCheck, 
  Stethoscope, 
  Users, 
  Zap 
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { cn } from "@/lib/utils";

// --- MOCK DATA ---

const FEATURES = [
  {
    title: "IA Preditiva",
    description: "Diagnósticos e análises auxiliadas por inteligência artificial para maior precisão clínica.",
    icon: Zap,
    className: "md:col-span-2 md:row-span-2",
  },
  {
    title: "Gestão Financeira",
    description: "Controle total do fluxo de caixa e faturamento da sua clínica.",
    icon: CreditCard,
    className: "md:col-span-1 md:row-span-1",
  },
  {
    title: "Agendamento Inteligente",
    description: "Otimize o tempo dos profissionais com agendamento automático.",
    icon: Calendar,
    className: "md:col-span-1 md:row-span-1",
  },
  {
    title: "Portal do Paciente",
    description: "Experiência digital completa para seus pacientes, do agendamento aos resultados.",
    icon: Users,
    className: "md:col-span-1 md:row-span-2",
  },
  {
    title: "Segurança de Dados",
    description: "Criptografia de ponta a ponta seguindo as normas da LGPD.",
    icon: ShieldCheck,
    className: "md:col-span-1 md:row-span-1",
  },
];

const TESTIMONIALS = [
  {
    name: "Dr. Henrique Silva",
    role: "Diretor da Clínica CardioCare",
    content: "O AuraHealth transformou nossa gestão. A eficiência operacional aumentou em 40% nos primeiros seis meses.",
    avatar: "HS",
  },
  {
    name: "Dra. Marina Costa",
    role: "Proprietária do Instituto Dermalis",
    content: "A interface é intuitiva e o suporte é excepcional. Finalmente uma plataforma que entende as necessidades médicas.",
    avatar: "MC",
  },
  {
    name: "Dr. Roberto Mendes",
    role: "Coordenador de Oncologia no Hospital Alpha",
    content: "A precisão dos dados e a facilidade de integração com outros sistemas são diferenciais imbatíveis.",
    avatar: "RM",
  },
];

const PRICING = [
  {
    name: "Essential",
    price: "R$ 499",
    description: "Ideal para consultórios individuais e pequenas clínicas.",
    features: ["Até 3 profissionais", "Prontuário eletrônico básico", "Agendamento online", "Suporte por e-mail"],
    cta: "Começar agora",
    popular: false,
  },
  {
    name: "Professional",
    price: "R$ 1.299",
    description: "Para clínicas em crescimento que buscam automatização.",
    features: ["Até 10 profissionais", "IA de apoio diagnóstico", "Gestão financeira completa", "Suporte 24/7 VIP"],
    cta: "Teste gratuito",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "Soluções sob medida para redes hospitalares e grandes centros.",
    features: ["Profissionais ilimitados", "Integração via API", "BI Customizado", "Gerente de conta dedicado"],
    cta: "Falar com vendas",
    popular: false,
  },
];

const FAQS = [
  {
    question: "Como funciona a migração de dados de outro sistema?",
    answer: "Nossa equipe de implementação cuida de todo o processo de migração, garantindo que nenhum histórico de paciente ou dado financeiro seja perdido durante a transição para o AuraHealth.",
  },
  {
    question: "O AuraHealth está em conformidade com a LGPD?",
    answer: "Sim, somos 100% complacentes com a LGPD. Todos os dados são criptografados e armazenados em servidores de alta segurança com auditorias periódicas.",
  },
  {
    question: "Posso acessar o sistema de dispositivos móveis?",
    answer: "Com certeza. O AuraHealth é uma plataforma cloud-native com interfaces responsivas otimizadas para tablets e smartphones, permitindo a gestão de onde você estiver.",
  },
  {
    question: "Existe algum custo de instalação?",
    answer: "Não cobramos taxa de instalação nos planos Professional e Enterprise. No plano Essential, existe uma taxa única de setup para configuração inicial.",
  },
];

// --- COMPONENTS ---

const SectionHeader = ({ title, subtitle, badge }: { title: string; subtitle?: string; badge?: string }) => (
  <div className="flex flex-col items-center text-center mb-16">
    {badge && (
      <motion.span 
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold uppercase tracking-wider mb-4"
      >
        {badge}
      </motion.span>
    )}
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-4xl md:text-5xl font-bold text-gradient mb-6"
    >
      {title}
    </motion.h2>
    {subtitle && (
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="text-muted-foreground text-lg max-w-2xl"
      >
        {subtitle}
      </motion.p>
    )}
  </div>
);

export default function LandingPage() {
  return (
    <div className="flex flex-col w-full">
      {/* --- HERO SECTION --- */}
      <section className="relative min-h-[90vh] flex items-center justify-center pt-20 pb-32 overflow-hidden">
        <div className="container max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col items-center text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              <span className="text-sm font-medium text-white/80 tracking-wide">
                V2.0 JÁ DISPONÍVEL COM IA INTEGRADA
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7 }}
              className="text-6xl md:text-8xl font-bold tracking-tighter text-gradient leading-[1.1] mb-8"
            >
              Gestão Clínica <br /> de Alta Precisão
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.7 }}
              className="text-xl md:text-2xl text-muted-foreground max-w-3xl mb-12 leading-relaxed"
            >
              A plataforma de inteligência operacional que define o novo padrão para clínicas médicas de elite. Simples, potente e absolutamente segura.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.7 }}
              className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
            >
              <Link href="/register">
                <Button size="lg" className="w-full sm:w-auto text-lg h-14 px-10 rounded-2xl">
                  Começar Agora
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/login">
                <Button variant="outline" size="lg" className="w-full sm:w-auto text-lg h-14 px-10 rounded-2xl">
                  Ver Demonstração
                </Button>
              </Link>
            </motion.div>

            {/* Mock Dashboard Preview */}
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 1, type: "spring", stiffness: 50 }}
              className="mt-24 w-full max-w-5xl mx-auto rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl p-4 shadow-[0_0_100px_rgba(79,70,229,0.1)]"
            >
              <div className="w-full aspect-[16/9] rounded-2xl bg-black/40 overflow-hidden relative border border-white/5">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Activity className="h-20 w-20 text-primary opacity-20 animate-pulse" />
                </div>
                {/* Simulated UI elements */}
                <div className="absolute top-4 left-4 flex gap-2">
                  <div className="w-12 h-2 rounded-full bg-white/10"></div>
                  <div className="w-8 h-2 rounded-full bg-white/10"></div>
                </div>
                <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end">
                   <div className="space-y-4 w-1/3">
                      <div className="h-4 w-full bg-white/10 rounded"></div>
                      <div className="h-4 w-2/3 bg-white/10 rounded"></div>
                      <div className="h-4 w-4/5 bg-white/10 rounded"></div>
                   </div>
                   <div className="flex gap-4">
                      <div className="w-20 h-32 bg-primary/20 rounded-t-lg"></div>
                      <div className="w-20 h-48 bg-primary/40 rounded-t-lg"></div>
                      <div className="w-20 h-24 bg-primary/30 rounded-t-lg"></div>
                   </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- FEATURES (BENTO GRID) --- */}
      <section className="py-32 relative">
        <div className="container max-w-7xl mx-auto px-6">
          <SectionHeader 
            badge="Funcionalidades"
            title="Tecnologia a favor da saúde"
            subtitle="Tudo o que você precisa para gerenciar sua clínica com a eficiência de uma fintech e o cuidado que a medicina exige."
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-3 gap-6 auto-rows-fr">
            {FEATURES.map((feature, idx) => (
              <Card key={idx} className={cn("group overflow-hidden", feature.className)}>
                <CardHeader>
                  <div className="h-12 w-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-2xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
                {feature.className.includes("md:row-span-2") && (
                  <div className="absolute bottom-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                    <feature.icon className="h-40 w-40" />
                  </div>
                )}
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* --- SOCIAL PROOF --- */}
      <section className="py-32 bg-white/[0.02] border-y border-white/5">
        <div className="container max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div>
              <motion.span 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="text-primary font-mono text-sm tracking-widest uppercase mb-4 block"
              >
                {"// Confiança & Resultados"}
              </motion.span>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
                Líderes do setor <br /> escolhem o AuraHealth
              </h2>
              <p className="text-muted-foreground text-lg mb-12">
                Não somos apenas um software, somos o parceiro estratégico de centenas de clínicas que buscam o próximo nível de excelência clínica e administrativa.
              </p>
              
              <div className="grid grid-cols-2 gap-8 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                <div className="flex items-center gap-2">
                  <Stethoscope className="h-6 w-6" />
                  <span className="font-bold text-xl tracking-tighter">MEDCORP</span>
                </div>
                <div className="flex items-center gap-2">
                  <Activity className="h-6 w-6" />
                  <span className="font-bold text-xl tracking-tighter">VITALIS</span>
                </div>
                <div className="flex items-center gap-2">
                  <Plus className="h-6 w-6" />
                  <span className="font-bold text-xl tracking-tighter">CENTRO OESTE</span>
                </div>
                <div className="flex items-center gap-2">
                  <Layers className="h-6 w-6" />
                  <span className="font-bold text-xl tracking-tighter">HOSPITAL Z</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {TESTIMONIALS.map((t, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="hover:bg-white/[0.08]">
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xs">
                          {t.avatar}
                        </div>
                        <div>
                          <h4 className="font-semibold text-white text-sm">{t.name}</h4>
                          <p className="text-muted-foreground text-xs">{t.role}</p>
                        </div>
                      </div>
                      <p className="text-white/80 italic text-sm leading-relaxed">
                        &quot;{t.content}&quot;
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- PRICING --- */}
      <section className="py-32">
        <div className="container max-w-7xl mx-auto px-6">
          <SectionHeader 
            badge="Planos"
            title="Escolha o poder da Aura"
            subtitle="Escalabilidade total para qualquer tamanho de operação médica."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {PRICING.map((plan, idx) => (
              <Card 
                key={idx} 
                className={cn(
                  "relative flex flex-col h-full",
                  plan.popular && "border-primary/50 bg-primary/5 shadow-[0_0_50px_rgba(79,70,229,0.1)]"
                )}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-primary text-[10px] font-bold uppercase tracking-widest text-white">
                    Mais Popular
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="text-xl font-medium text-white/70">{plan.name}</CardTitle>
                  <div className="mt-4 flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-white">{plan.price}</span>
                    {plan.price !== "Custom" && <span className="text-muted-foreground">/mês</span>}
                  </div>
                  <CardDescription className="mt-4">{plan.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <div className="space-y-4">
                    {plan.features.map((feature, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
                        <span className="text-sm text-white/80">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <div className="p-6 pt-0">
                  <Link href="/register" className="w-full">
                    <Button 
                      variant={plan.popular ? "primary" : "outline"} 
                      className="w-full rounded-xl h-12"
                    >
                      {plan.cta}
                    </Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* --- FAQ --- */}
      <section className="py-32 bg-white/[0.01]">
        <div className="container max-w-4xl mx-auto px-6">
          <SectionHeader 
            title="Perguntas Frequentes"
            subtitle="Tudo o que você precisa saber sobre o AuraHealth."
          />

          <div className="space-y-4">
            {FAQS.map((faq, idx) => (
              <details key={idx} className="group glass glass-hover cursor-pointer">
                <summary className="flex items-center justify-between p-6 list-none">
                  <span className="text-lg font-medium text-white group-open:text-primary transition-colors">
                    {faq.question}
                  </span>
                  <Plus className="h-5 w-5 text-white/50 group-open:rotate-45 transition-transform" />
                </summary>
                <div className="px-6 pb-6 text-muted-foreground leading-relaxed animate-in fade-in slide-in-from-top-2 duration-300">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="py-24 border-t border-white/10 bg-black">
        <div className="container max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center gap-2 mb-6">
                <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                  <Activity className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold tracking-tighter text-white">AuraHealth</span>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                Redefinindo os limites da gestão em saúde com tecnologia de ponta e foco absoluto no paciente.
              </p>
              <div className="flex gap-4">
                {/* Social Placeholder */}
                <div className="h-8 w-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 cursor-pointer">
                  <div className="h-4 w-4 bg-white/40 rounded-sm"></div>
                </div>
                <div className="h-8 w-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 cursor-pointer">
                  <div className="h-4 w-4 bg-white/40 rounded-sm"></div>
                </div>
                <div className="h-8 w-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 cursor-pointer">
                  <div className="h-4 w-4 bg-white/40 rounded-sm"></div>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-6">Produto</h4>
              <ul className="space-y-4 text-sm text-muted-foreground">
                <li className="hover:text-primary cursor-pointer transition-colors">Funcionalidades</li>
                <li className="hover:text-primary cursor-pointer transition-colors">Segurança</li>
                <li className="hover:text-primary cursor-pointer transition-colors">Preços</li>
                <li className="hover:text-primary cursor-pointer transition-colors">API & Integrações</li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-6">Empresa</h4>
              <ul className="space-y-4 text-sm text-muted-foreground">
                <li className="hover:text-primary cursor-pointer transition-colors">Sobre Nós</li>
                <li className="hover:text-primary cursor-pointer transition-colors">Carreiras</li>
                <li className="hover:text-primary cursor-pointer transition-colors">Blog</li>
                <li className="hover:text-primary cursor-pointer transition-colors">Contato</li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-6">Newsletter</h4>
              <p className="text-sm text-muted-foreground mb-4">
                Receba insights sobre gestão e tecnologia em saúde.
              </p>
              <div className="flex gap-2">
                <input 
                  type="email" 
                  placeholder="Seu e-mail" 
                  className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm w-full focus:outline-none focus:border-primary/50"
                />
                <Button size="sm" className="shrink-0">Ok</Button>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/5 gap-4">
            <p className="text-xs text-muted-foreground">
              © 2026 AuraHealth. Todos os direitos reservados.
            </p>
            <div className="flex gap-8 text-xs text-muted-foreground">
              <span className="hover:text-white cursor-pointer">Privacidade</span>
              <span className="hover:text-white cursor-pointer">Termos de Uso</span>
              <span className="hover:text-white cursor-pointer">Cookies</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
