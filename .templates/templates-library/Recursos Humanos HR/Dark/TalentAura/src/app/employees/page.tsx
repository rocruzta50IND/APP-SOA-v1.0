"use client";

import { Sidebar } from "@/components/ui/Sidebar";
import { Header } from "@/components/ui/Header";
import { 
  Users, 
  Search, 
  Filter, 
  MoreHorizontal, 
  UserPlus,
  Mail,
  ShieldCheck,
  Zap,
  ChevronRight
} from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const employees = [
  { id: 1, name: "Sarah Jenkins", role: "Senior UX Designer", dept: "Design", status: "Active", email: "s.jenkins@talentaura.io", avatar: "SJ" },
  { id: 2, name: "Michael Chen", role: "Fullstack Engineer", dept: "Engineering", status: "Active", email: "m.chen@talentaura.io", avatar: "MC" },
  { id: 3, name: "Elena Rodriguez", role: "Product Manager", dept: "Product", status: "On Leave", email: "e.rodriguez@talentaura.io", avatar: "ER" },
  { id: 4, name: "David Kim", role: "QA Engineer", dept: "Engineering", status: "Active", email: "d.kim@talentaura.io", avatar: "DK" },
  { id: 5, name: "Lisa Thompson", role: "Marketing Lead", dept: "Growth", status: "Active", email: "l.thompson@talentaura.io", avatar: "LT" },
  { id: 6, name: "James Wilson", role: "Backend Developer", dept: "Engineering", status: "Active", email: "j.wilson@talentaura.io", avatar: "JW" },
  { id: 7, name: "Anna Schmidt", role: "HR Specialist", dept: "Operations", status: "Remote", email: "a.schmidt@talentaura.io", avatar: "AS" },
];

export default function EmployeesPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Sidebar />
      <Header />
      
      <main className="pl-64 pt-16">
        <div className="p-8 space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
                Employee Directory
              </h1>
              <p className="text-muted-foreground mt-1">Manage and view all your team members in one place.</p>
            </div>
            <div className="flex items-center space-x-3">
              <button className="flex items-center space-x-2 bg-white/5 border border-white/10 text-white hover:bg-white/10 rounded-xl px-4 py-2.5 font-medium transition-all">
                <Mail className="h-4 w-4" />
                <span>Invite</span>
              </button>
              <button className="flex items-center space-x-2 bg-primary text-white hover:bg-primary/90 shadow-[0_0_20px_rgba(79,70,229,0.3)] rounded-xl px-5 py-2.5 font-medium transition-all">
                <UserPlus className="h-4 w-4" />
                <span>Add Employee</span>
              </button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { label: "Active Employees", value: "1,248", icon: Users, color: "text-blue-400" },
              { label: "Verified Skills", value: "8.4k", icon: ShieldCheck, color: "text-emerald-400" },
              { label: "Internal Mobility", value: "14%", icon: Zap, color: "text-amber-400" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-5 flex items-center space-x-4"
              >
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                  <stat.icon className={cn("h-5 w-5", stat.color)} />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">{stat.label}</p>
                  <p className="text-xl font-bold font-mono">{stat.value}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Table Controls */}
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl overflow-hidden">
            <div className="p-6 border-b border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Filter by name, role, or department..."
                  className="h-10 w-full rounded-xl border border-white/10 bg-white/5 pl-10 pr-4 text-sm outline-none focus:border-primary/50 transition-all"
                />
              </div>
              <div className="flex items-center space-x-2">
                <button className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-sm font-medium hover:bg-white/10 transition-colors">
                  <Filter className="h-4 w-4 text-muted-foreground" />
                  <span>Filters</span>
                </button>
                <button className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-sm font-medium hover:bg-white/10 transition-colors">
                  <span className="text-muted-foreground">Sort:</span>
                  <span>Newest</span>
                </button>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/5 bg-white/[0.02]">
                    <th className="px-6 py-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Employee</th>
                    <th className="px-6 py-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Department</th>
                    <th className="px-6 py-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Email</th>
                    <th className="px-6 py-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {employees.map((emp) => (
                    <motion.tr 
                      key={emp.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="hover:bg-white/[0.03] transition-colors group"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3">
                          <div className="h-9 w-9 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 border border-white/10 flex items-center justify-center text-xs font-bold text-primary">
                            {emp.avatar}
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-white group-hover:text-primary transition-colors">{emp.name}</p>
                            <p className="text-xs text-muted-foreground">{emp.role}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-xs font-medium text-white/80 px-2 py-1 rounded-md bg-white/5 border border-white/10">
                          {emp.dept}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className={cn(
                            "h-1.5 w-1.5 rounded-full mr-2 shadow-[0_0_8px_rgba(0,0,0,0.5)]",
                            emp.status === "Active" ? "bg-emerald-400 shadow-emerald-400/40" : 
                            emp.status === "On Leave" ? "bg-amber-400 shadow-amber-400/40" : "bg-blue-400 shadow-blue-400/40"
                          )} />
                          <span className="text-xs font-medium text-white/70">{emp.status}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-xs font-mono text-muted-foreground">{emp.email}</span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="p-1.5 rounded-lg hover:bg-white/10 text-muted-foreground hover:text-white transition-all">
                          <MoreHorizontal className="h-4 w-4" />
                        </button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="p-6 border-t border-white/10 flex items-center justify-between">
              <p className="text-xs text-muted-foreground">Showing <span className="text-white">7</span> of <span className="text-white">1,248</span> employees</p>
              <div className="flex items-center space-x-2">
                <button className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs font-medium opacity-50 cursor-not-allowed">Previous</button>
                <button className="px-3 py-1.5 rounded-lg bg-white/10 border border-white/20 text-xs font-medium hover:bg-white/20 transition-all flex items-center">
                  Next <ChevronRight className="ml-1 h-3 w-3" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
