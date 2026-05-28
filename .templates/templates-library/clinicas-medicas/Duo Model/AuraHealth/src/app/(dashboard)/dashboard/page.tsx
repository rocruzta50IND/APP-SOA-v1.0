"use client";

import React from "react";
import { 
  Users, 
  Calendar, 
  TrendingUp, 
  ArrowUpRight, 
  ArrowDownRight,
  Activity,
  CreditCard,
  Clock,
  MoreVertical,
  Pill
} from "lucide-react";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell
} from "recharts";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

const revenueData = [
  { month: "Jan", revenue: 45000, patients: 120 },
  { month: "Fev", revenue: 52000, patients: 145 },
  { month: "Mar", revenue: 48000, patients: 132 },
  { month: "Abr", revenue: 61000, patients: 178 },
  { month: "Mai", revenue: 59000, patients: 165 },
  { month: "Jun", revenue: 68000, patients: 190 },
];

const activityData = [
  { name: "Pediatria", value: 45, color: "var(--primary)" },
  { name: "Cardio", value: 30, color: "#8b5cf6" },
  { name: "Geral", value: 65, color: "#ec4899" },
  { name: "Dermato", value: 25, color: "#10b981" },
];

const recentAppointments = [
  { id: 1, patient: "Ana Paula Silva", time: "14:30", type: "Consulta Geral", status: "Confirmado", avatar: "AS" },
  { id: 2, patient: "Bruno Medeiros", time: "15:15", type: "Retorno", status: "Em Espera", avatar: "BM" },
  { id: 3, patient: "Carla Santos", time: "16:00", type: "Exame", status: "Confirmado", avatar: "CS" },
  { id: 4, patient: "Daniel Oliveira", time: "16:45", type: "Avaliação", status: "Pendente", avatar: "DO" },
];

const stats = [
  { title: "Total de Pacientes", value: "1,284", trend: "+12.5%", icon: Users, color: "primary" },
  { title: "Consultas Hoje", value: "24", trend: "+4", icon: Calendar, color: "purple" },
  { title: "Faturamento Mensal", value: "R$ 68.4k", trend: "+18.2%", icon: CreditCard, color: "emerald" },
  { title: "Tempo de Espera", value: "12 min", trend: "-2 min", icon: Clock, color: "orange" },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gradient">Bem-vindo, Dr. Ricardo</h1>
          <p className="text-muted-foreground mt-1">Aqui está o resumo da sua clínica para hoje.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="glass glass-hover">Exportar Relatório</Button>
          <Button variant="primary">Nova Consulta</Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="glass glass-hover border-none relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <stat.icon className="w-12 h-12" />
              </div>
              <CardHeader className="pb-2">
                <CardDescription className="text-xs uppercase tracking-wider font-semibold opacity-70">
                  {stat.title}
                </CardDescription>
                <CardTitle className="text-2xl font-mono">{stat.value}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-1 text-xs">
                  {stat.trend.startsWith('+') ? (
                    <span className="text-emerald-500 flex items-center font-medium">
                      <ArrowUpRight className="w-3 h-3 mr-1" /> {stat.trend}
                    </span>
                  ) : (
                    <span className="text-orange-500 flex items-center font-medium">
                      <ArrowDownRight className="w-3 h-3 mr-1" /> {stat.trend}
                    </span>
                  )}
                  <span className="text-muted-foreground">vs. mês anterior</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart */}
        <Card className="lg:col-span-2 glass border-none">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-gradient">Análise de Receita</CardTitle>
              <CardDescription>Crescimento financeiro nos últimos 6 meses</CardDescription>
            </div>
            <TrendingUp className="text-primary w-5 h-5" />
          </CardHeader>
          <CardContent className="h-[300px] w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="white" vertical={false} opacity={0.05} />
                <XAxis 
                  dataKey="month" 
                  stroke="rgba(255,255,255,0.3)" 
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis 
                  stroke="rgba(255,255,255,0.3)" 
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `R$${value/1000}k`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(0,0,0,0.8)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "12px",
                  }}
                  itemStyle={{ color: "hsl(var(--primary))" }}
                />

                <Area 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorRev)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Activity Bar Chart */}
        <Card className="glass border-none">
          <CardHeader>
            <CardTitle className="text-gradient">Atividade por Setor</CardTitle>
            <CardDescription>Volume de pacientes p/ especialidade</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px] w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={activityData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="white" opacity={0.05} />
                <XAxis type="number" hide />
                <YAxis 
                  dataKey="name" 
                  type="category" 
                  stroke="rgba(255,255,255,0.5)" 
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  width={80}
                />
                <Tooltip 
                   cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                   contentStyle={{ 
                    backgroundColor: "rgba(0,0,0,0.8)", 
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "12px"
                  }}
                />
                <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={20}>
                  {activityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Appointments List */}
        <Card className="glass border-none">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Consultas do Dia</CardTitle>
              <CardDescription>Acompanhamento em tempo real</CardDescription>
            </div>
            <Button variant="ghost" size="icon" className="text-muted-foreground"><MoreVertical className="w-4 h-4" /></Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentAppointments.map((app) => (
                <div key={app.id} className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-colors group">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/20 border border-primary/20 flex items-center justify-center text-primary font-bold text-xs">
                      {app.avatar}
                    </div>
                    <div>
                      <p className="font-medium text-sm">{app.patient}</p>
                      <p className="text-xs text-muted-foreground">{app.type}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-mono">{app.time}</p>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                      app.status === 'Confirmado' ? 'bg-emerald-500/10 text-emerald-500' : 
                      app.status === 'Em Espera' ? 'bg-orange-500/10 text-orange-500' : 
                      'bg-white/10 text-muted-foreground'
                    }`}>
                      {app.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4 glass border-white/5">Ver Agenda Completa</Button>
          </CardContent>
        </Card>

        {/* Quick Actions / Activity Feed */}
        <Card className="glass border-none overflow-hidden relative">
          <div className="absolute top-[-100px] right-[-100px] w-64 h-64 bg-primary/10 blur-[80px] rounded-full" />
          <CardHeader>
            <CardTitle>Ações Rápidas</CardTitle>
            <CardDescription>Atalhos operacionais</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-4">
            <button className="flex flex-col items-center justify-center p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-primary/50 hover:bg-primary/5 transition-all group">
               <div className="p-3 rounded-xl bg-primary/10 text-primary mb-3 group-hover:scale-110 transition-transform">
                 <Activity className="w-6 h-6" />
               </div>
               <span className="text-sm font-medium">Triagem</span>
            </button>
            <button className="flex flex-col items-center justify-center p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-purple-500/50 hover:bg-purple-500/5 transition-all group">
               <div className="p-3 rounded-xl bg-purple-500/10 text-purple-500 mb-3 group-hover:scale-110 transition-transform">
                 <Calendar className="w-6 h-6" />
               </div>
               <span className="text-sm font-medium">Reagendar</span>
            </button>
            <button className="flex flex-col items-center justify-center p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-emerald-500/50 hover:bg-emerald-500/5 transition-all group">
               <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-500 mb-3 group-hover:scale-110 transition-transform">
                 <Pill className="w-6 h-6" />
               </div>
               <span className="text-sm font-medium">Receita Digital</span>
            </button>
            <button className="flex flex-col items-center justify-center p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-orange-500/50 hover:bg-orange-500/5 transition-all group">
               <div className="p-3 rounded-xl bg-orange-500/10 text-orange-500 mb-3 group-hover:scale-110 transition-transform">
                 <Users className="w-6 h-6" />
               </div>
               <span className="text-sm font-medium">Novo Paciente</span>
            </button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
