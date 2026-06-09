"use client";

import { cn } from "@/lib/utils";
import { MoreHorizontal, Search, Filter } from "lucide-react";

const employees = [
  { id: "EMP-001", name: "Sarah Connor", role: "VP of Engineering", department: "Engineering", status: "Active", date: "2021-03-15" },
  { id: "EMP-002", name: "John Smith", role: "Senior Designer", department: "Design", status: "Active", date: "2022-01-10" },
  { id: "EMP-003", name: "Emily Chen", role: "Product Manager", department: "Product", status: "On Leave", date: "2021-11-20" },
  { id: "EMP-004", name: "Michael Chang", role: "Backend Developer", department: "Engineering", status: "Active", date: "2023-05-01" },
  { id: "EMP-005", name: "Jessica Davis", role: "HR Specialist", department: "Human Resources", status: "Active", date: "2020-08-14" },
  { id: "EMP-006", name: "David Wilson", role: "Sales Director", department: "Sales", status: "Inactive", date: "2019-02-01" },
];

export default function EmployeesPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Employees</h1>
          <p className="text-muted-foreground mt-1 text-sm">Manage your workforce directory.</p>
        </div>
        <button className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90">
          Add Employee
        </button>
      </div>

      <div className="flex items-center justify-between gap-4">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search employees..."
            className="h-9 w-full rounded-md border border-border/50 bg-background pl-9 pr-4 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
        <button className="flex items-center gap-2 rounded-md border border-border/50 bg-background px-3 py-1.5 text-sm font-medium text-foreground hover:bg-muted">
          <Filter className="h-4 w-4" />
          Filter
        </button>
      </div>

      <div className="rounded-md border border-border/50 bg-background shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-border/50 bg-muted/50">
              <tr>
                <th className="px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">ID</th>
                <th className="px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Name</th>
                <th className="px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Role</th>
                <th className="px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Department</th>
                <th className="px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Status</th>
                <th className="px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Joined</th>
                <th className="px-4 py-3 text-right text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {employees.map((emp) => (
                <tr key={emp.id} className="transition-colors hover:bg-muted/50">
                  <td className="px-4 py-3 font-medium text-foreground">{emp.id}</td>
                  <td className="px-4 py-3 text-foreground">{emp.name}</td>
                  <td className="px-4 py-3 text-muted-foreground">{emp.role}</td>
                  <td className="px-4 py-3 text-muted-foreground">{emp.department}</td>
                  <td className="px-4 py-3">
                    <span className={cn(
                      "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium",
                      emp.status === "Active" && "bg-emerald-500/10 text-emerald-500",
                      emp.status === "On Leave" && "bg-amber-500/10 text-amber-500",
                      emp.status === "Inactive" && "bg-rose-500/10 text-rose-500"
                    )}>
                      {emp.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{emp.date}</td>
                  <td className="px-4 py-3 text-right">
                    <button className="text-muted-foreground hover:text-foreground">
                      <MoreHorizontal className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}