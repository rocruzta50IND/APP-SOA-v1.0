"use client";

import React from "react";
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  ArrowUpRight, 
  ArrowDownRight,
  Download,
  Filter,
  CreditCard,
  Banknote,
  PieChart as PieChartIcon,
  MoreHorizontal
} from "lucide-react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend,
  LineChart,
  Line
} from "recharts";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

const comparisonData = [
  { month: "Jan", receita: 45000, despesa: 32000 },
  { month: "Fev", receita: 52000, despesa: 34000 },
  { month: "Mar", receita: 48000, despesa: 31000 },
  { month: "Abr", receita: 61000, despesa: 38000 },
  { month: "Mai", receita: 59000, despesa: 36000 },
  { month: "Jun", receita: 68000, despesa: 41000 },
];

const transactions = [
  { id: 1, category: "Consulta", description: "Ana Paula Silva - Particular", amount: 350, type: "Receita", date: "Hoje, 14:30", status: "Pago" },
  { id: 2, category: "Fornecedor", description: "MedTech Soluções - Equipamentos", amount: -2400, type: "Despesa", date: "Hoje, 11:15", status: "Pendente" },
  { id: 3, category: "Exame", description: "Bruno Medeiros - Unimed", amount: 180, type: "Receita", date: "Ontem, 16:00", status: "Pago" },
  { id: 4, category: "Salários", description: "Folha de Pagamento - Equipe", amount: -15000, type: "Despesa", date: "20 Mai", status: "Pago" },
  { id: 5, category: "Convênio", description: "Repasse Bradesco Saúde", amount: 8400, type: "Receita", date: "18 Mai", status: "Pago" },
];

export default function FinancasPage() {
  return (
    <div className="space-y-6 pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gradient">Gestão Financeira</h1>
          <p className="text-muted-foreground mt-1">Acompanhe a saúde fiscal e o faturamento da clínica.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="glass border-white/5 gap-2">
            <Download className="w-4 h-4" />
            Exportar PDF
          </Button>
          <Button variant="primary">Lançar Movimentação</Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="glass border-none relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
            <TrendingUp className="w-12 h-12 text-emerald-500" />
          </div>
          <CardHeader className="pb-2">
            <CardDescription className="text-xs uppercase tracking-wider font-semibold">Saldo em Caixa</CardDescription>
            <CardTitle className="text-3xl font-mono">R$ 142.850</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 text-xs text-emerald-500 font-medium">
              <ArrowUpRight className="w-3.5 h-3.5" />
              <span>+R$ 12.400 este mês</span>
            </div>
          </CardContent>
        </Card>

        <Card className="glass border-none relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
            <Banknote className="w-12 h-12 text-primary" />
          </div>
          <CardHeader className="pb-2">
            <CardDescription className="text-xs uppercase tracking-wider font-semibold">Receita Bruta</CardDescription>
            <CardTitle className="text-3xl font-mono">R$ 68.400</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 text-xs text-primary font-medium">
              <ArrowUpRight className="w-3.5 h-3.5" />
              <span>+18.2% vs. Abril</span>
            </div>
          </CardContent>
        </Card>

        <Card className="glass border-none relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
            <TrendingDown className="w-12 h-12 text-orange-500" />
          </div>
          <CardHeader className="pb-2">
            <CardDescription className="text-xs uppercase tracking-wider font-semibold">Custos Operacionais</CardDescription>
            <CardTitle className="text-3xl font-mono">R$ 41.200</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 text-xs text-orange-500 font-medium">
              <ArrowDownRight className="w-3.5 h-3.5" />
              <span>-R$ 2.100 vs. Abril</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Comparison Chart */}
        <Card className="lg:col-span-2 glass border-none">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-gradient">Receitas vs. Despesas</CardTitle>
              <CardDescription>Fluxo de caixa consolidado do semestre</CardDescription>
            </div>
            <PieChartIcon className="w-5 h-5 text-primary" />
          </CardHeader>
          <CardContent className="h-[350px] w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={comparisonData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="white" opacity={0.05} />
                <XAxis dataKey="month" stroke="rgba(255,255,255,0.3)" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="rgba(255,255,255,0.3)" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => `R$${v/1000}k`} />
                <Tooltip 
                  cursor={{ fill: 'rgba(255,255,255,0.02)' }}
                  contentStyle={{ backgroundColor: "rgba(0,0,0,0.8)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px" }}
                />
                <Legend iconType="circle" wrapperStyle={{ paddingTop: "20px" }} />
                <Bar dataKey="receita" name="Receita" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                <Bar dataKey="despesa" name="Despesa" fill="#3b82f6" opacity={0.4} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Payment Methods */}
        <Card className="glass border-none">
          <CardHeader>
            <CardTitle className="text-gradient">Métodos de Recebimento</CardTitle>
            <CardDescription>Distribuição por tipo de pagamento</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 mt-2">
            {[
              { label: "Cartão de Crédito", value: 45, color: "bg-primary" },
              { label: "PIX", value: 35, color: "bg-emerald-500" },
              { label: "Convênio", value: 15, color: "bg-purple-500" },
              { label: "Dinheiro", value: 5, color: "bg-orange-500" },
            ].map((method) => (
              <div key={method.label} className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium text-muted-foreground">{method.label}</span>
                  <span className="font-mono">{method.value}%</span>
                </div>
                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                   <div className={cn("h-full rounded-full transition-all duration-1000", method.color)} style={{ width: `${method.value}%` }} />
                </div>
              </div>
            ))}
            <div className="pt-4 border-t border-white/10">
               <Button variant="outline" className="w-full glass border-white/5">Ver Relatório Detalhado</Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Transactions Table */}
      <Card className="glass border-none">
        <CardHeader>
           <div className="flex items-center justify-between">
              <div>
                <CardTitle>Últimas Movimentações</CardTitle>
                <CardDescription>Histórico recente de transações</CardDescription>
              </div>
              <Button variant="ghost" size="icon"><Filter className="w-4 h-4" /></Button>
           </div>
        </CardHeader>
        <CardContent>
           <div className="space-y-1">
             {transactions.map((t, idx) => (
               <motion.div 
                 key={t.id}
                 initial={{ opacity: 0, y: 10 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ delay: idx * 0.05 }}
                 className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-colors group"
               >
                 <div className="flex items-center gap-4">
                   <div className={cn(
                     "w-10 h-10 rounded-full flex items-center justify-center border",
                     t.type === 'Receita' ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-500" : "bg-orange-500/10 border-orange-500/20 text-orange-500"
                   )}>
                     {t.type === 'Receita' ? <ArrowUpRight className="w-5 h-5" /> : <ArrowDownRight className="w-5 h-5" />}
                   </div>
                   <div>
                     <p className="text-sm font-medium">{t.description}</p>
                     <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{t.category} • {t.date}</p>
                   </div>
                 </div>
                 <div className="text-right flex items-center gap-6">
                   <div>
                     <p className={cn(
                       "text-sm font-mono font-bold",
                       t.type === 'Receita' ? "text-emerald-500" : "text-foreground"
                     )}>
                       {t.amount > 0 ? `+ R$ ${t.amount}` : `- R$ ${Math.abs(t.amount)}`}
                     </p>
                     <span className={cn(
                       "text-[10px] px-2 py-0.5 rounded-full border",
                       t.status === 'Pago' ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-500" : "bg-orange-500/10 border-orange-500/20 text-orange-500"
                     )}>
                       {t.status}
                     </span>
                   </div>
                   <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity">
                     <MoreHorizontal className="w-4 h-4" />
                   </Button>
                 </div>
               </motion.div>
             ))}
           </div>
        </CardContent>
      </Card>
    </div>
  );
}
