"use client";

import { DashboardShell } from "@/components/ui/DashboardShell";
import { 
  Plus, 
  MoreVertical, 
  Search,
  MapPin,
  Mail,
  Calendar,
  ShieldCheck
} from "lucide-react";
import { cn } from "@/lib/utils";

const employees = [
  { id: 1, name: "Marcus Wright", role: "CTO", department: "Engineering", tenure: "4 years", email: "marcus@vividtalent.ai", status: "Active" },
  { id: 2, name: "Jessica Alba", role: "VP of Product", department: "Product", tenure: "2 years", email: "jessica@vividtalent.ai", status: "Active" },
  { id: 3, name: "Robert Downey", role: "Sr. Legal Counsel", department: "Legal", tenure: "3 years", email: "robert@vividtalent.ai", status: "On Leave" },
  { id: 4, name: "Scarlett Joh", role: "Director of HR", department: "People", tenure: "5 years", email: "scarlett@vividtalent.ai", status: "Active" },
  { id: 5, name: "Chris Evans", role: "Sales Lead", department: "Sales", tenure: "1 year", email: "chris@vividtalent.ai", status: "Active" },
  { id: 6, name: "Tom Holland", role: "Jr. Frontend dev", department: "Engineering", tenure: "6 months", email: "tom@vividtalent.ai", status: "Probation" },
];

export default function EmployeesPage() {
  return (
    <DashboardShell>
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
              Employee Directory
            </h1>
            <p className="text-muted-foreground mt-1">Manage your global workforce and departments.</p>
          </div>
          <button className="bg-primary text-white rounded-xl px-4 py-2 text-sm font-medium hover:bg-primary/90 shadow-[0_0_20px_rgba(79,70,229,0.3)] transition-all flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add Employee
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Search by name, department, or role..."
              className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            />
          </div>
          <div className="flex items-center gap-2">
            <select className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 text-muted-foreground">
              <option>All Departments</option>
              <option>Engineering</option>
              <option>Product</option>
              <option>Sales</option>
            </select>
          </div>
        </div>

        {/* Employees Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {employees.map((employee) => (
            <div key={employee.id} className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl hover:border-white/20 transition-all group relative overflow-hidden">
              {/* Background Accent */}
              <div className="absolute -right-4 -top-4 h-24 w-24 bg-primary/5 blur-2xl rounded-full group-hover:bg-primary/10 transition-colors" />
              
              <div className="flex justify-between items-start mb-6">
                <div className="h-14 w-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-xl font-bold text-primary group-hover:scale-110 transition-transform">
                  {employee.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className={cn(
                  "px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border",
                  employee.status === "Active" ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" : 
                  employee.status === "On Leave" ? "bg-yellow-500/10 text-yellow-400 border-yellow-500/20" :
                  "bg-blue-500/10 text-blue-400 border-blue-500/20"
                )}>
                  {employee.status}
                </div>
              </div>

              <div className="space-y-1">
                <h3 className="text-lg font-bold text-white group-hover:text-primary transition-colors">{employee.name}</h3>
                <p className="text-sm text-muted-foreground font-medium">{employee.role}</p>
              </div>

              <div className="mt-6 pt-6 border-t border-white/5 space-y-3">
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <ShieldCheck className="h-4 w-4 text-primary" />
                  <span>{employee.department}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>{employee.tenure} tenure</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-muted-foreground truncate">
                  <Mail className="h-4 w-4" />
                  <span className="truncate">{employee.email}</span>
                </div>
              </div>

              <div className="mt-6 flex items-center gap-2">
                <button className="flex-1 bg-white/5 border border-white/10 rounded-xl py-2 text-xs font-bold hover:bg-white/10 transition-colors">
                  View Profile
                </button>
                <button className="p-2 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors">
                  <MoreVertical className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardShell>
  );
}
