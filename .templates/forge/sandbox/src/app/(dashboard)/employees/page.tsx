"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { 
  Search, 
  MoreHorizontal, 
  Mail, 
  Phone, 
  Download,
  Filter,
  ArrowUpDown
} from "lucide-react";
import { motion } from "framer-motion";

const employees = [
  { id: 1, name: "Marcus Thorne", role: "Engineering Manager", dept: "Engineering", email: "m.thorne@ethoshr.io", phone: "+1 (555) 0123", status: "Active", joinDate: "Jan 12, 2022" },
  { id: 2, name: "Sofia Rodriguez", role: "Senior UX Designer", dept: "Design", email: "s.rodriguez@ethoshr.io", phone: "+1 (555) 0456", status: "Active", joinDate: "Mar 05, 2023" },
  { id: 3, name: "James Wilson", role: "Talent Acquisition", dept: "HR", email: "j.wilson@ethoshr.io", phone: "+1 (555) 0789", status: "On Leave", joinDate: "Jun 20, 2021" },
  { id: 4, name: "Aria Gupta", role: "Backend Engineer", dept: "Engineering", email: "a.gupta@ethoshr.io", phone: "+1 (555) 0987", status: "Active", joinDate: "Sep 15, 2023" },
  { id: 5, name: "Leo D'Angelo", role: "Financial Analyst", dept: "Finance", email: "l.dangelo@ethoshr.io", phone: "+1 (555) 0654", status: "Active", joinDate: "Nov 02, 2022" },
  { id: 6, name: "Emma Watson", role: "Product Owner", dept: "Product", email: "e.watson@ethoshr.io", phone: "+1 (555) 0321", status: "Active", joinDate: "Feb 18, 2023" },
];

export default function EmployeesPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <header>
          <h1 className="text-4xl font-bold tracking-tighter text-gradient">Employee Directory</h1>
          <p className="text-muted-foreground mt-2">Manage and view all members of your organization.</p>
        </header>
        <div className="flex items-center gap-3">
          <button className="glass px-4 py-2.5 text-sm font-medium hover:bg-white/10 transition-all flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export CSV
          </button>
          <button className="bg-primary text-white hover:bg-primary/90 shadow-[0_0_20px_rgba(79,70,229,0.3)] rounded-xl px-5 py-2.5 font-medium transition-all">
            Add Employee
          </button>
        </div>
      </div>

      <div className="glass overflow-hidden">
        <div className="p-4 border-b border-white/10 flex items-center justify-between bg-white/5">
          <div className="flex items-center gap-4 flex-1">
            <div className="relative w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input 
                type="text" 
                placeholder="Filter employees..."
                className="w-full bg-black/20 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm outline-none focus:border-primary/50 transition-all"
              />
            </div>
            <button className="text-sm text-muted-foreground hover:text-white flex items-center gap-1 transition-colors">
              <Filter className="h-4 w-4" />
              Advanced Filters
            </button>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">Showing 1-6 of 1,284 results</span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 bg-white/5">
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-muted-foreground">
                  <div className="flex items-center gap-2">
                    Employee <ArrowUpDown className="h-3 w-3" />
                  </div>
                </th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-muted-foreground">Role / Department</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-muted-foreground">Contact</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-muted-foreground">Join Date</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-muted-foreground">Status</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-muted-foreground"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {employees.map((emp, idx) => (
                <motion.tr 
                  key={emp.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="hover:bg-white/5 transition-colors group"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20 flex items-center justify-center font-bold text-primary group-hover:scale-110 transition-transform">
                        {emp.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-white">{emp.name}</div>
                        <div className="text-[10px] text-muted-foreground font-mono">ID: E-2024-{1000 + emp.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-white">{emp.role}</div>
                    <div className="text-xs text-muted-foreground">{emp.dept}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <Mail className="h-4 w-4 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
                      <Phone className="h-4 w-4 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground font-mono">
                    {emp.joinDate}
                  </td>
                  <td className="px-6 py-4">
                    <div className={cn(
                      "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase",
                      emp.status === "Active" ? "bg-emerald-500/10 text-emerald-400" : "bg-amber-500/10 text-amber-400"
                    )}>
                      <span className={cn(
                        "h-1.5 w-1.5 rounded-full",
                        emp.status === "Active" ? "bg-emerald-400" : "bg-amber-400"
                      )} />
                      {emp.status}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                      <MoreHorizontal className="h-5 w-5 text-muted-foreground" />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="p-4 border-t border-white/10 flex items-center justify-between bg-white/5">
          <button className="text-sm text-muted-foreground hover:text-white transition-colors disabled:opacity-50" disabled>Previous</button>
          <div className="flex items-center gap-2">
            {[1, 2, 3, "...", 12].map((p, i) => (
              <button 
                key={i} 
                className={cn(
                  "h-8 w-8 rounded-lg text-xs font-medium transition-all",
                  p === 1 ? "bg-primary text-white" : "text-muted-foreground hover:bg-white/10 hover:text-white"
                )}
              >
                {p}
              </button>
            ))}
          </div>
          <button className="text-sm text-muted-foreground hover:text-white transition-colors">Next</button>
        </div>
      </div>
    </div>
  );
}
