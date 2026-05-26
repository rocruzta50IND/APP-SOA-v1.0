"use client";

import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { motion } from "framer-motion";
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  Tooltip,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar
} from "recharts";
import { Star, Zap, Target, Award } from "lucide-react";

const competencyData = [
  { name: "Leadership", value: 400 },
  { name: "Technical", value: 300 },
  { name: "Innovation", value: 300 },
  { name: "Culture", value: 200 },
];

const performanceData = [
  { subject: 'Leadership', A: 120, B: 110, fullMark: 150 },
  { subject: 'Technical', A: 98, B: 130, fullMark: 150 },
  { subject: 'Strategy', A: 86, B: 130, fullMark: 150 },
  { subject: 'Innovation', A: 99, B: 100, fullMark: 150 },
  { subject: 'Culture', A: 85, B: 90, fullMark: 150 },
  { subject: 'Efficiency', A: 65, B: 85, fullMark: 150 },
];

const topPerformers = [
  { name: "Elara Vox", role: "Principal Engineer", score: "4.9/5", achievement: "Patent Leader" },
  { name: "Kaelen Drift", role: "Design Lead", score: "4.8/5", achievement: "UX Excellence" },
  { name: "Soren Kier", role: "VP of Product", score: "4.9/5", achievement: "Market Entry" },
  { name: "Juna Rivers", role: "HR Specialist", score: "4.7/5", achievement: "Retention King" },
  { name: "Orion Pax", role: "Security Architect", score: "5.0/5", achievement: "Zero Breach" },
];

const COLORS = ['hsl(var(--primary))', 'hsl(var(--muted))', 'hsl(var(--foreground))', 'hsl(var(--border))'];

export default function PerformancePage() {
  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header Section */}
        <section className="flex flex-col md:flex-row justify-between items-end gap-8">
          <div className="space-y-4">
            <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-primary">Human Intelligence</span>
            <h1 className="font-serif text-6xl md:text-8xl tracking-tighter leading-none">
              Competency <br />
              <span className="text-muted-foreground/20">Architecture</span>
            </h1>
          </div>
          <div className="flex gap-4">
            <button className="px-8 py-4 bg-foreground text-background text-[10px] uppercase tracking-[0.2em] font-bold hover:opacity-80 transition-all duration-500 rounded-full">
              Initiate Review
            </button>
          </div>
        </section>

        {/* Charts Section */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="p-10 border border-border/50 bg-card/30 backdrop-blur-sm space-y-8">
            <div className="space-y-1">
              <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-primary">Global Distribution</p>
              <h3 className="font-serif text-3xl tracking-tighter">Skillset Equilibrium</h3>
            </div>
            <div className="h-[350px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={competencyData}
                    innerRadius={80}
                    outerRadius={120}
                    paddingAngle={8}
                    dataKey="value"
                    stroke="none"
                  >
                    {competencyData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: "hsl(var(--background))", 
                      borderColor: "hsl(var(--border))",
                      fontSize: "10px",
                      textTransform: "uppercase",
                      letterSpacing: "0.2em"
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border/50">
              {competencyData.map((item, index) => (
                <div key={item.name} className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[index] }} />
                  <span className="text-[8px] uppercase tracking-[0.2em] font-bold text-muted-foreground">{item.name}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-10 border border-border/50 bg-card/30 backdrop-blur-sm space-y-8">
            <div className="space-y-1">
              <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-primary">Vector Analysis</p>
              <h3 className="font-serif text-3xl tracking-tighter">Performance Radiance</h3>
            </div>
            <div className="h-[350px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={performanceData}>
                  <PolarGrid stroke="hsl(var(--border))" />
                  <PolarAngleAxis dataKey="subject" tick={{ fontSize: 8, fill: 'hsl(var(--muted-foreground))', fontWeight: 'bold' }} />
                  <Radar
                    name="Enterprise Avg"
                    dataKey="A"
                    stroke="hsl(var(--primary))"
                    fill="hsl(var(--primary))"
                    fillOpacity={0.3}
                  />
                  <Radar
                    name="Top Tier"
                    dataKey="B"
                    stroke="hsl(var(--foreground))"
                    fill="hsl(var(--foreground))"
                    fillOpacity={0.1}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: "hsl(var(--background))", 
                      borderColor: "hsl(var(--border))",
                      fontSize: "10px",
                      textTransform: "uppercase"
                    }}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </section>

        {/* Top Performers */}
        <section className="space-y-8">
          <div className="space-y-1">
            <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground">High Impact Individual</p>
            <h3 className="font-serif text-3xl tracking-tighter">Elite Performers</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {topPerformers.map((performer, index) => (
              <motion.div
                key={performer.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="p-8 border border-border/50 bg-card/30 hover:bg-primary hover:text-primary-foreground transition-all duration-700 group cursor-pointer"
              >
                <Award className="w-5 h-5 mb-6 text-primary group-hover:text-primary-foreground transition-colors" />
                <div className="space-y-1">
                  <p className="text-[10px] font-bold uppercase tracking-widest">{performer.name}</p>
                  <p className="text-[8px] uppercase tracking-widest opacity-70">{performer.role}</p>
                </div>
                <div className="mt-8 pt-4 border-t border-border/20 flex justify-between items-center">
                  <span className="text-[10px] font-black">{performer.score}</span>
                  <Star className="w-3 h-3 fill-current" />
                </div>
                <p className="text-[7px] uppercase tracking-[0.2em] font-bold mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  {performer.achievement}
                </p>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
}
