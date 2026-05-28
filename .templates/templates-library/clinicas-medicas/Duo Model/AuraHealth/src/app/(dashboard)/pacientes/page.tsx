"use client";

import React from "react";
import { 
  Search, 
  Filter, 
  Plus, 
  MoreHorizontal, 
  UserPlus, 
  Mail, 
  Phone,
  ArrowUpDown,
  CheckCircle2,
  Clock,
  AlertCircle
} from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

const patients = [
  { id: 1, name: "Ana Paula Silva", age: 34, cpf: "123.456.789-00", lastVisit: "12/05/2026", status: "Ativo", email: "ana.paula@email.com" },
  { id: 2, name: "Bruno Medeiros", age: 42, cpf: "234.567.890-11", lastVisit: "15/05/2026", status: "Em Tratamento", email: "bruno.m@email.com" },
  { id: 3, name: "Carla Santos", age: 28, cpf: "345.678.901-22", lastVisit: "10/05/2026", status: "Ativo", email: "carla.santos@email.com" },
  { id: 4, name: "Daniel Oliveira", age: 55, cpf: "456.789.012-33", lastVisit: "14/05/2026", status: "Pendente", email: "d.oliveira@email.com" },
  { id: 5, name: "Eduarda Lima", age: 23, cpf: "567.890.123-44", lastVisit: "08/05/2026", status: "Ativo", email: "eduarda.l@email.com" },
  { id: 6, name: "Fabio Junior", age: 39, cpf: "678.901.234-55", lastVisit: "18/05/2026", status: "Em Tratamento", email: "f.junior@email.com" },
  { id: 7, name: "Gisela Rocha", age: 47, cpf: "789.012.345-66", lastVisit: "05/05/2026", status: "Inativo", email: "gisela.r@email.com" },
];

const statusStyles = {
  "Ativo": "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
  "Em Tratamento": "bg-primary/10 text-primary border-primary/20",
  "Pendente": "bg-orange-500/10 text-orange-500 border-orange-500/20",
  "Inativo": "bg-white/5 text-muted-foreground border-white/10",
};

export default function PacientesPage() {
  return (
    <div className="space-y-6 pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gradient">Pacientes</h1>
          <p className="text-muted-foreground mt-1">Gerencie o histórico e cadastros da clínica.</p>
        </div>
        <Button variant="primary" className="gap-2">
          <UserPlus className="w-4 h-4" />
          Novo Cadastro
        </Button>
      </div>

      <Card className="glass border-none">
        <CardHeader className="pb-0">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Buscar por nome, CPF ou e-mail..." className="pl-10 bg-white/5 border-white/10" />
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" className="glass border-white/5 gap-2">
                <Filter className="w-4 h-4" />
                Filtros
              </Button>
              <Button variant="outline" className="glass border-white/5 gap-2">
                <ArrowUpDown className="w-4 h-4" />
                Ordenar
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-xs uppercase tracking-wider text-muted-foreground">
                  <th className="px-4 py-4 font-semibold">Paciente</th>
                  <th className="px-4 py-4 font-semibold">CPF</th>
                  <th className="px-4 py-4 font-semibold">Status</th>
                  <th className="px-4 py-4 font-semibold">Última Visita</th>
                  <th className="px-4 py-4 font-semibold text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {patients.map((patient, index) => (
                  <motion.tr 
                    key={patient.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="border-b border-white/5 hover:bg-white/[0.02] transition-colors group"
                  >
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center text-primary font-bold text-xs border border-primary/10">
                          {patient.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                        </div>
                        <div>
                          <p className="font-medium group-hover:text-primary transition-colors">{patient.name}</p>
                          <p className="text-xs text-muted-foreground">{patient.age} anos • {patient.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 font-mono text-xs text-muted-foreground">
                      {patient.cpf}
                    </td>
                    <td className="px-4 py-4">
                      <span className={`text-[10px] px-2.5 py-1 rounded-full border ${statusStyles[patient.status as keyof typeof statusStyles]}`}>
                        {patient.status}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{patient.lastVisit}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-right">
                      <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-primary/10 hover:text-primary"><Mail className="w-4 h-4" /></Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-primary/10 hover:text-primary"><Phone className="w-4 h-4" /></Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-white/10"><MoreHorizontal className="w-4 h-4" /></Button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4">
            <p className="text-xs text-muted-foreground">Mostrando 7 de 1,284 pacientes</p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="glass border-white/5 disabled:opacity-50" disabled>Anterior</Button>
              <Button variant="outline" size="sm" className="glass border-white/5">Próximo</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="glass border-none bg-gradient-to-br from-emerald-500/5 to-transparent">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardDescription className="text-xs uppercase tracking-wider font-semibold">Check-ins Hoje</CardDescription>
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            </div>
            <CardTitle className="text-2xl">18</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">Todos os pacientes confirmados compareceram.</p>
          </CardContent>
        </Card>
        
        <Card className="glass border-none bg-gradient-to-br from-primary/5 to-transparent">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardDescription className="text-xs uppercase tracking-wider font-semibold">Novos (Este Mês)</CardDescription>
              <Plus className="w-4 h-4 text-primary" />
            </div>
            <CardTitle className="text-2xl">42</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground"><span className="text-primary font-medium">+15%</span> em relação ao mês anterior.</p>
          </CardContent>
        </Card>

        <Card className="glass border-none bg-gradient-to-br from-orange-500/5 to-transparent">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardDescription className="text-xs uppercase tracking-wider font-semibold">Retornos Pendentes</CardDescription>
              <AlertCircle className="w-4 h-4 text-orange-500" />
            </div>
            <CardTitle className="text-2xl">09</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">Pacientes que precisam agendar nova consulta.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
