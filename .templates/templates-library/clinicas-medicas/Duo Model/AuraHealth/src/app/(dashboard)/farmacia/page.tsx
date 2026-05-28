"use client";

import React from "react";
import { 
  Pill, 
  Search, 
  Plus, 
  AlertTriangle, 
  Package, 
  History, 
  Truck,
  ArrowRight,
  ChevronRight,
  MoreVertical,
  MoreHorizontal,
  Activity
} from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

const inventory = [
  { id: 1, name: "Amoxicilina 500mg", category: "Antibiótico", stock: 142, unit: "cx", status: "Normal", expiry: "12/2027" },
  { id: 2, name: "Dipirona Monoidratada", category: "Analgésico", stock: 28, unit: "fr", status: "Baixo", expiry: "08/2026" },
  { id: 3, name: "Insulina Glargina", category: "Hormônio", stock: 15, unit: "un", status: "Crítico", expiry: "03/2026" },
  { id: 4, name: "Ibuprofeno 600mg", category: "Anti-inflamatório", stock: 85, unit: "cx", status: "Normal", expiry: "11/2027" },
  { id: 5, name: "Soro Fisiológico 0,9%", category: "Insumos", stock: 210, unit: "un", status: "Normal", expiry: "05/2028" },
  { id: 6, name: "Losartana Potássica", category: "Anti-hipertensivo", stock: 45, unit: "cx", status: "Baixo", expiry: "09/2026" },
];

const stockUpdates = [
  { id: 1, item: "Amoxicilina 500mg", action: "Saída", qty: "2 cx", user: "Enf. Carla", time: "Há 15 min" },
  { id: 2, item: "Soro Fisiológico", action: "Entrada", qty: "50 un", user: "Adm. João", time: "Há 2 horas" },
  { id: 3, item: "Dipirona", action: "Saída", qty: "1 fr", user: "Dr. Ricardo", time: "Há 3 horas" },
];

const statusColors = {
  "Normal": "text-emerald-500 bg-emerald-500/10 border-emerald-500/20",
  "Baixo": "text-orange-500 bg-orange-500/10 border-orange-500/20",
  "Crítico": "text-red-500 bg-red-500/10 border-red-500/20",
};

export default function FarmaciaPage() {
  return (
    <div className="space-y-6 pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gradient">Farmácia & Estoque</h1>
          <p className="text-muted-foreground mt-1">Controle de insumos, medicamentos e validade.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="glass border-white/5 gap-2">
            <Truck className="w-4 h-4" />
            Pedidos
          </Button>
          <Button variant="primary" className="gap-2">
            <Plus className="w-4 h-4" />
            Novo Item
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Alerts & Quick Info */}
        <div className="space-y-6">
          <Card className="glass border-none bg-gradient-to-br from-orange-500/5 to-transparent">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2 text-orange-500">
                <AlertTriangle className="w-4 h-4" />
                <span className="text-xs font-bold uppercase tracking-wider">Alertas</span>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">04</p>
              <p className="text-xs text-muted-foreground mt-1">Itens com estoque crítico ou próximo do vencimento.</p>
              <Button variant="outline" size="sm" className="w-full mt-4 glass border-orange-500/20 text-orange-500 hover:bg-orange-500/10">Ver Todos</Button>
            </CardContent>
          </Card>

          <Card className="glass border-none">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <History className="w-4 h-4 text-primary" />
                Atividade Recente
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {stockUpdates.map((update) => (
                <div key={update.id} className="relative pl-4 border-l border-white/10 space-y-1">
                  <div className="absolute left-[-4px] top-1 w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_rgba(var(--primary),0.4)]" />
                  <p className="text-xs font-medium">{update.item}</p>
                  <p className="text-[10px] text-muted-foreground">
                    <span className={update.action === 'Entrada' ? 'text-emerald-500' : 'text-orange-500'}>{update.action}</span> de {update.qty} por {update.user}
                  </p>
                  <p className="text-[9px] text-muted-foreground/60 italic">{update.time}</p>
                </div>
              ))}
              <Button variant="ghost" size="sm" className="w-full text-xs text-primary hover:bg-primary/5">Ver histórico completo</Button>
            </CardContent>
          </Card>
        </div>

        {/* Inventory Table/Grid */}
        <div className="lg:col-span-3 space-y-4">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Buscar por nome, categoria ou lote..." className="pl-10 glass border-white/5" />
            </div>
            <Button variant="outline" className="glass border-white/5"><Package className="w-4 h-4" /></Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {inventory.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="glass border-none hover:bg-white/[0.03] transition-all cursor-pointer group">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-primary/50 transition-colors">
                          <Pill className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-semibold text-sm">{item.name}</p>
                          <p className="text-[10px] text-muted-foreground uppercase tracking-tighter">{item.category}</p>
                        </div>
                      </div>
                      <span className={cn(
                        "text-[9px] px-2 py-0.5 rounded-full border font-bold uppercase",
                        statusColors[item.status as keyof typeof statusColors]
                      )}>
                        {item.status}
                      </span>
                    </div>

                    <div className="mt-6 flex items-end justify-between">
                      <div className="space-y-1">
                        <p className="text-[10px] text-muted-foreground">Estoque Atual</p>
                        <p className="text-xl font-mono font-bold">
                          {item.stock} <span className="text-xs font-normal text-muted-foreground">{item.unit}</span>
                        </p>
                      </div>
                      <div className="text-right space-y-1">
                        <p className="text-[10px] text-muted-foreground">Validade</p>
                        <p className="text-xs font-medium flex items-center gap-1">
                          <Activity className="w-3 h-3 text-emerald-500" />
                          {item.expiry}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity">
                       <p className="text-[10px] text-primary font-medium flex items-center gap-1">
                         Ajustar Estoque <ArrowRight className="w-3 h-3" />
                       </p>
                       <Button variant="ghost" size="icon" className="h-6 w-6"><MoreHorizontal className="w-3 h-3" /></Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
          
          <div className="flex justify-center pt-4">
            <Button variant="outline" className="glass border-white/5 text-xs">Carregar mais itens</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
