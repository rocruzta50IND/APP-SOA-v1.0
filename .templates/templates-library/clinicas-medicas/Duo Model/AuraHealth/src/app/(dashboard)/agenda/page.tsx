"use client";

import React from "react";
import { 
  Calendar as CalendarIcon, 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  Clock, 
  Search,
  Users,
  MapPin,
  MoreVertical
} from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

const timeSlots = ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"];

const appointments = [
  { day: "Seg", time: "08:00", patient: "Ana Paula Silva", duration: "45min", type: "Consulta", color: "primary" },
  { day: "Seg", time: "10:00", patient: "Bruno Medeiros", duration: "30min", type: "Retorno", color: "purple" },
  { day: "Ter", time: "09:00", patient: "Carla Santos", duration: "60min", type: "Exame", color: "emerald" },
  { day: "Ter", time: "11:00", patient: "Daniel Oliveira", duration: "30min", type: "Consulta", color: "primary" },
  { day: "Qua", time: "08:00", patient: "Eduarda Lima", duration: "45min", type: "Check-up", color: "orange" },
  { day: "Qua", time: "14:00", patient: "Fabio Junior", duration: "30min", type: "Retorno", color: "purple" },
  { day: "Qui", time: "10:00", patient: "Gisela Rocha", duration: "45min", type: "Avaliação", color: "primary" },
  { day: "Sex", time: "09:00", patient: "Hugo Almeida", duration: "30min", type: "Consulta", color: "primary" },
  { day: "Sex", time: "15:00", patient: "Iara Souza", duration: "60min", type: "Exame", color: "emerald" },
];

const days = [
  { name: "Seg", date: "25 Mai" },
  { name: "Ter", date: "26 Mai" },
  { name: "Qua", date: "27 Mai" },
  { name: "Qui", date: "28 Mai", active: true },
  { name: "Sex", date: "29 Mai" },
  { name: "Sáb", date: "30 Mai" },
];

const colorMap = {
  primary: "bg-primary/10 text-primary border-primary/20",
  purple: "bg-purple-500/10 text-purple-500 border-purple-500/20",
  emerald: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
  orange: "bg-orange-500/10 text-orange-500 border-orange-500/20",
};

export default function AgendaPage() {
  return (
    <div className="space-y-6 pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gradient">Agenda Médica</h1>
          <p className="text-muted-foreground mt-1">Visualize e organize os atendimentos da semana.</p>
        </div>
        <div className="flex items-center gap-2">
           <div className="flex items-center bg-white/5 border border-white/10 rounded-xl p-1">
             <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-white/10"><ChevronLeft className="w-4 h-4" /></Button>
             <span className="px-4 text-sm font-medium">Maio 2026</span>
             <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-white/10"><ChevronRight className="w-4 h-4" /></Button>
           </div>
           <Button variant="primary" className="gap-2">
             <Plus className="w-4 h-4" />
             Novo Agendamento
           </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar Filters */}
        <div className="space-y-6">
          <Card className="glass border-none">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Profissionais</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { name: "Dr. Ricardo Oliveira", role: "Cardiologista", active: true },
                { name: "Dra. Helena Souza", role: "Pediatra", active: false },
                { name: "Dr. Marcos Vinicius", role: "Clínico Geral", active: false },
              ].map((doc) => (
                <div key={doc.name} className={cn(
                  "flex items-center justify-between p-2 rounded-xl transition-colors cursor-pointer border",
                  doc.active ? "bg-primary/10 border-primary/20" : "hover:bg-white/5 border-transparent"
                )}>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-xs font-bold">
                      {doc.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <p className="text-xs font-medium">{doc.name}</p>
                      <p className="text-[10px] text-muted-foreground">{doc.role}</p>
                    </div>
                  </div>
                  {doc.active && <div className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_rgba(var(--primary),0.6)]" />}
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="glass border-none">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Legenda</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center gap-2 text-xs">
                <div className="w-3 h-3 rounded bg-primary" />
                <span>Consulta</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <div className="w-3 h-3 rounded bg-purple-500" />
                <span>Retorno</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <div className="w-3 h-3 rounded bg-emerald-500" />
                <span>Exame</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <div className="w-3 h-3 rounded bg-orange-500" />
                <span>Urgência</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Calendar View */}
        <Card className="lg:col-span-3 glass border-none overflow-hidden">
          <CardContent className="p-0">
            {/* Header Days */}
            <div className="grid grid-cols-7 border-b border-white/10 bg-white/[0.02]">
              <div className="p-4 border-r border-white/10" />
              {days.map((day) => (
                <div key={day.name} className={cn(
                  "p-4 border-r border-white/10 text-center transition-colors",
                  day.active ? "bg-primary/5" : ""
                )}>
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{day.name}</p>
                  <p className={cn(
                    "text-lg font-bold mt-1",
                    day.active ? "text-primary" : ""
                  )}>{day.date.split(' ')[0]}</p>
                </div>
              ))}
            </div>

            {/* Time Grid */}
            <div className="max-h-[600px] overflow-y-auto">
              {timeSlots.map((time) => (
                <div key={time} className="grid grid-cols-7 border-b border-white/5 min-h-[80px]">
                  <div className="p-4 border-r border-white/10 flex items-start justify-center">
                    <span className="text-[10px] font-mono font-medium text-muted-foreground">{time}</span>
                  </div>
                  {days.map((day) => {
                    const app = appointments.find(a => a.day === day.name && a.time === time);
                    return (
                      <div key={`${day.name}-${time}`} className="p-1 border-r border-white/5 relative group cursor-pointer hover:bg-white/[0.01]">
                        {app && (
                          <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className={cn(
                              "h-full rounded-xl border p-3 flex flex-col justify-between transition-all group-hover:shadow-lg",
                              colorMap[app.color as keyof typeof colorMap]
                            )}
                          >
                            <div>
                               <p className="text-[10px] font-bold truncate leading-tight">{app.patient}</p>
                               <p className="text-[9px] opacity-70 mt-0.5">{app.type}</p>
                            </div>
                            <div className="flex items-center justify-between mt-2">
                               <div className="flex items-center gap-1 text-[8px] opacity-60">
                                 <Clock className="w-2.5 h-2.5" />
                                 {app.duration}
                               </div>
                               <MoreVertical className="w-3 h-3 opacity-40 group-hover:opacity-100 transition-opacity" />
                            </div>
                          </motion.div>
                        )}
                        {!app && (
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100">
                             <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                               <Plus className="w-4 h-4 text-muted-foreground" />
                             </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
