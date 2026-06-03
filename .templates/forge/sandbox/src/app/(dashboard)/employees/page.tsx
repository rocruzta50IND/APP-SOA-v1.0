"use client";

import { cn } from "@/lib/utils";
import { 
  Mail, 
  Phone, 
  MapPin, 
  MoreHorizontal,
  Plus,
  ArrowUpRight
} from "lucide-react";
import { motion } from "framer-motion";

const employees = [
  { id: 1, name: "Alex Rivers", role: "Lead Recruiter", dept: "HR", location: "London, UK", email: "alex.r@talentpulse.com", avatar: "AR" },
  { id: 2, name: "Jordan Smith", role: "Engineering Manager", dept: "Engineering", location: "Remote", email: "jordan.s@talentpulse.com", avatar: "JS" },
  { id: 3, name: "Taylor Reed", role: "Senior UX Designer", dept: "Product", location: "San Francisco, US", email: "taylor.r@talentpulse.com", avatar: "TR" },
  { id: 4, name: "Morgan Vance", role: "Sales Executive", dept: "Sales", location: "New York, US", email: "morgan.v@talentpulse.com", avatar: "MV" },
  { id: 5, name: "Casey Wright", role: "FinOps Specialist", dept: "Finance", location: "London, UK", email: "casey.w@talentpulse.com", avatar: "CW" },
  { id: 6, name: "Riley Cooper", role: "DevOps Engineer", dept: "Engineering", location: "Berlin, DE", email: "riley.c@talentpulse.com", avatar: "RC" },
];

export default function EmployeesPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tighter text-white">Employees</h1>
          <p className="text-muted-foreground mt-1">Directory of your global workforce.</p>
        </div>
        <button className="bg-primary text-white rounded-xl px-4 py-2 text-sm font-medium hover:bg-primary/90 shadow-[0_0_20px_rgba(79,70,229,0.3)] transition-all flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add Employee
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {employees.map((employee, i) => (
          <motion.div
            key={employee.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 }}
            className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 group hover:border-primary/50 transition-all relative overflow-hidden"
          >
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 blur-2xl rounded-full -mr-12 -mt-12 group-hover:bg-primary/10 transition-all" />
            
            <div className="flex justify-between items-start mb-6">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-primary/60 p-[1px]">
                <div className="w-full h-full rounded-2xl bg-background flex items-center justify-center font-bold text-lg text-white">
                  {employee.avatar}
                </div>
              </div>
              <button className="text-muted-foreground hover:text-white transition-colors">
                <MoreHorizontal className="w-5 h-5" />
              </button>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-bold text-white group-hover:text-primary transition-colors">{employee.name}</h3>
              <p className="text-sm text-muted-foreground">{employee.role}</p>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <MapPin className="w-3.5 h-3.5 text-primary" />
                {employee.location}
              </div>
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <Mail className="w-3.5 h-3.5 text-primary" />
                {employee.email}
              </div>
            </div>

            <div className="pt-6 border-t border-white/10 flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-1 bg-white/5 rounded-lg text-muted-foreground">
                {employee.dept}
              </span>
              <button className="text-xs font-bold text-primary flex items-center gap-1 hover:gap-2 transition-all">
                View Profile <ArrowUpRight className="w-3 h-3" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
