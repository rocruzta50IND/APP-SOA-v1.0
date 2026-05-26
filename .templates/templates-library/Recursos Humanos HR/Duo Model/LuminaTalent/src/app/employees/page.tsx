"use client";

import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, MoreVertical } from "lucide-react";

const employees = [
  { id: "1", name: "Alexander Thorne", role: "Chief Talent Officer", dept: "Executive", location: "London, UK", email: "a.thorne@lumina.com" },
  { id: "2", name: "Beatrix Kiddo", role: "Head of Operations", dept: "Operations", location: "Tokyo, JP", email: "b.kiddo@lumina.com" },
  { id: "3", name: "Vincent Vega", role: "Senior HR Business Partner", dept: "Human Resources", location: "Los Angeles, US", email: "v.vega@lumina.com" },
  { id: "4", name: "Mia Wallace", role: "Director of Diversity", dept: "Strategy", location: "Paris, FR", email: "m.wallace@lumina.com" },
  { id: "5", name: "Jules Winnfield", role: "Lead Talent Scout", dept: "Recruitment", location: "New York, US", email: "j.winnfield@lumina.com" },
  { id: "6", name: "Butch Coolidge", role: "Benefits Coordinator", dept: "Payroll", location: "Berlin, DE", email: "b.coolidge@lumina.com" },
];

export default function EmployeesPage() {
  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header Section */}
        <section className="flex flex-col md:flex-row justify-between items-end gap-8">
          <div className="space-y-4">
            <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-primary">Global Workforce</span>
            <h1 className="font-serif text-6xl md:text-8xl tracking-tighter leading-none">
              Talent <br />
              <span className="text-muted-foreground/20">Directory</span>
            </h1>
          </div>
          <div className="flex gap-4">
            <button className="px-8 py-4 bg-foreground text-background text-[10px] uppercase tracking-[0.2em] font-bold hover:opacity-80 transition-all duration-500 rounded-full">
              Add Talent
            </button>
          </div>
        </section>

        {/* Employee Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {employees.map((employee, index) => (
            <motion.div
              key={employee.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="p-10 border border-border/50 bg-card/30 backdrop-blur-sm relative group overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <MoreVertical className="w-4 h-4 text-muted-foreground cursor-pointer" />
              </div>

              <div className="space-y-8 relative z-10">
                <div className="flex items-center gap-6">
                  <div className="w-20 h-20 bg-muted border border-border/50 flex items-center justify-center font-serif text-2xl group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-700 rounded-none transform group-hover:rotate-6">
                    {employee.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-primary">{employee.dept}</p>
                    <h3 className="font-serif text-2xl tracking-tighter mt-1">{employee.name}</h3>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-widest mt-1">{employee.role}</p>
                  </div>
                </div>

                <div className="space-y-3 pt-8 border-t border-border/50">
                  <div className="flex items-center gap-3 text-muted-foreground group-hover:text-foreground transition-colors">
                    <Mail className="w-3 h-3" />
                    <span className="text-[8px] uppercase tracking-[0.2em] font-bold">{employee.email}</span>
                  </div>
                  <div className="flex items-center gap-3 text-muted-foreground group-hover:text-foreground transition-colors">
                    <MapPin className="w-3 h-3" />
                    <span className="text-[8px] uppercase tracking-[0.2em] font-bold">{employee.location}</span>
                  </div>
                </div>

                <button className="w-full py-4 text-[8px] uppercase tracking-[0.3em] font-black border border-border/50 hover:bg-foreground hover:text-background transition-all duration-500">
                  View Dossier
                </button>
              </div>

              {/* Decorative accent */}
              <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-primary/5 blur-3xl rounded-full transition-all duration-1000 group-hover:bg-primary/20" />
            </motion.div>
          ))}
        </section>

        {/* Statistics Bar */}
        <section className="p-12 border border-border/50 bg-card/50 flex flex-wrap justify-between gap-12">
          <div className="space-y-1">
            <p className="text-[8px] uppercase tracking-[0.3em] font-bold text-muted-foreground">Total Active</p>
            <p className="text-4xl font-sans font-black tracking-tighter">148</p>
          </div>
          <div className="space-y-1 border-l border-border/50 pl-12">
            <p className="text-[8px] uppercase tracking-[0.3em] font-bold text-muted-foreground">New Hires (MoM)</p>
            <p className="text-4xl font-sans font-black tracking-tighter">+12</p>
          </div>
          <div className="space-y-1 border-l border-border/50 pl-12">
            <p className="text-[8px] uppercase tracking-[0.3em] font-bold text-muted-foreground">Global Hubs</p>
            <p className="text-4xl font-sans font-black tracking-tighter">08</p>
          </div>
          <div className="space-y-1 border-l border-border/50 pl-12">
            <p className="text-[8px] uppercase tracking-[0.3em] font-bold text-muted-foreground">Attrition</p>
            <p className="text-4xl font-sans font-black tracking-tighter">1.2%</p>
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
}
