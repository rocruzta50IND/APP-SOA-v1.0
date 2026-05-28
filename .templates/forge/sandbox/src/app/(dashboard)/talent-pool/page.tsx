"use client";

import { motion } from "framer-motion";
import { Search, Filter, MoreVertical, Mail, Phone, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

const employees = [
  { id: 1, name: "Marcus Thompson", role: "Senior Frontend Engineer", dept: "Engineering", status: "Active", image: "MT" },
  { id: 2, name: "Elena Rodriguez", role: "Product Designer", dept: "Design", status: "On Leave", image: "ER" },
  { id: 3, name: "Jordan Smith", role: "Talent Acquisition", dept: "HR", status: "Active", image: "JS" },
  { id: 4, name: "Sarah Jenkins", role: "DevOps Architect", dept: "Engineering", status: "Remote", image: "SJ" },
  { id: 5, name: "David Kim", role: "Financial Analyst", dept: "Finance", status: "Active", image: "DK" },
  { id: 6, name: "Lisa Wong", role: "Marketing Lead", dept: "Marketing", status: "Active", image: "LW" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 }
};

export default function TalentPoolPage() {
  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
            Talent Pool
          </h1>
          <p className="text-muted-foreground mt-1">Manage and track your organization's human capital.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-xl text-sm font-medium hover:bg-white/10 transition-all">
            <Filter className="w-4 h-4" />
            <span>Filter</span>
          </button>
          <button className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-xl text-sm font-medium shadow-lg hover:bg-primary/90 transition-all">
            Export CSV
          </button>
        </div>
      </div>

      <div className="p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/10 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                <th className="px-6 py-4">Employee</th>
                <th className="px-6 py-4">Department</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Role</th>
                <th className="px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {employees.map((emp) => (
                <motion.tr 
                  key={emp.id}
                  variants={itemVariants}
                  className="group hover:bg-white/5 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-xs font-bold text-white">
                        {emp.image}
                      </div>
                      <div>
                        <p className="text-sm font-medium group-hover:text-primary transition-colors">{emp.name}</p>
                        <p className="text-xs text-muted-foreground">emp_{emp.id.toString().padStart(3, '0')}@aura.io</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm">{emp.dept}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={cn(
                      "text-[10px] font-bold uppercase px-2 py-1 rounded-md",
                      emp.status === 'Active' ? 'bg-emerald-500/10 text-emerald-500' : 
                      emp.status === 'On Leave' ? 'bg-amber-500/10 text-amber-500' : 'bg-blue-500/10 text-blue-500'
                    )}>
                      {emp.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">
                    {emp.role}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-1.5 rounded-lg bg-white/5 border border-white/10 text-muted-foreground hover:text-white transition-all">
                        <Mail className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 rounded-lg bg-white/5 border border-white/10 text-muted-foreground hover:text-white transition-all">
                        <ExternalLink className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
}
