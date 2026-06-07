"use client";

import { cn } from "@/lib/utils";
import { Plus, Search, Filter, MoreVertical, CheckCircle2, Circle, AlertCircle, ArrowUp, ArrowDown, ArrowRight } from "lucide-react";

const backlogData = [
  { id: "FLX-201", title: "Migrate to Tailwind v4 across all micro-frontends", status: "Todo", priority: "High", type: "Tech Debt", effort: 8, sprint: "Sprint 13" },
  { id: "FLX-202", title: "Implement Role-Based Access Control (RBAC)", status: "In Progress", priority: "Urgent", type: "Feature", effort: 13, sprint: "Sprint 12" },
  { id: "FLX-203", title: "Fix Pagination state reset on search", status: "Done", priority: "Medium", type: "Bug", effort: 2, sprint: "Sprint 12" },
  { id: "FLX-204", title: "Create unified Analytics Dashboard", status: "Todo", priority: "Medium", type: "Feature", effort: 5, sprint: "Sprint 13" },
  { id: "FLX-205", title: "Update dependency: React 19", status: "Todo", priority: "Low", type: "Tech Debt", effort: 3, sprint: "Backlog" },
  { id: "FLX-206", title: "User Profile Avatar upload returns 500", status: "Todo", priority: "High", type: "Bug", effort: 2, sprint: "Sprint 13" },
  { id: "FLX-207", title: "Optimize Docker build times for CI/CD", status: "Done", priority: "High", type: "DevOps", effort: 5, sprint: "Sprint 12" },
  { id: "FLX-208", title: "Add Webhook integrations for external tools", status: "Todo", priority: "Medium", type: "Feature", effort: 8, sprint: "Backlog" },
  { id: "FLX-209", title: "Review SOC2 Compliance checklist", status: "In Progress", priority: "Urgent", type: "Security", effort: 5, sprint: "Sprint 12" },
  { id: "FLX-210", title: "Localization support for French & German", status: "Todo", priority: "Low", type: "Feature", effort: 13, sprint: "Backlog" },
];

export default function BacklogPage() {
  return (
    <div className="p-6 max-w-[1200px] mx-auto w-full">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Backlog</h1>
          <p className="text-sm text-muted-foreground mt-1">Prioritize and plan your upcoming work.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search issues..."
              className="h-9 w-64 rounded-md border border-border bg-background pl-9 pr-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            />
          </div>
          <button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors bg-secondary text-secondary-foreground hover:bg-secondary/80 border border-border h-9 px-4">
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </button>
          <button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors bg-primary text-primary-foreground hover:opacity-90 h-9 px-4">
            <Plus className="w-4 h-4 mr-2" />
            Create Issue
          </button>
        </div>
      </div>

      <div className="rounded-md border border-border bg-card shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-muted/50 border-b border-border text-muted-foreground">
              <tr>
                <th className="px-4 py-3 font-medium w-12"></th>
                <th className="px-4 py-3 font-medium w-24">Key</th>
                <th className="px-4 py-3 font-medium">Title</th>
                <th className="px-4 py-3 font-medium w-32">Status</th>
                <th className="px-4 py-3 font-medium w-32">Priority</th>
                <th className="px-4 py-3 font-medium w-32">Type</th>
                <th className="px-4 py-3 font-medium w-24 text-right">Effort</th>
                <th className="px-4 py-3 font-medium w-32">Sprint</th>
                <th className="px-4 py-3 font-medium w-12"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {backlogData.map((item) => (
                <tr key={item.id} className="hover:bg-muted/30 transition-colors group">
                  <td className="px-4 py-3">
                    <input type="checkbox" className="rounded border-border bg-background text-primary focus:ring-primary h-4 w-4" />
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{item.id}</td>
                  <td className="px-4 py-3 font-medium text-foreground">{item.title}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      {item.status === "Done" ? (
                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                      ) : item.status === "In Progress" ? (
                        <AlertCircle className="w-4 h-4 text-blue-500" />
                      ) : (
                        <Circle className="w-4 h-4 text-muted-foreground" />
                      )}
                      <span className="text-muted-foreground">{item.status}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      {item.priority === "Urgent" ? (
                        <ArrowUp className="w-4 h-4 text-red-500" />
                      ) : item.priority === "High" ? (
                        <ArrowUp className="w-4 h-4 text-orange-500" />
                      ) : item.priority === "Medium" ? (
                        <ArrowRight className="w-4 h-4 text-yellow-500" />
                      ) : (
                        <ArrowDown className="w-4 h-4 text-green-500" />
                      )}
                      <span className="text-muted-foreground">{item.priority}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-secondary text-secondary-foreground border border-border/50">
                      {item.type}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right font-mono text-muted-foreground">
                    {item.effort}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground text-xs">
                    {item.sprint}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button className="text-muted-foreground hover:text-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-4 border-t border-border bg-muted/20 flex items-center justify-between text-sm text-muted-foreground">
          <span>Showing 10 of 42 issues</span>
          <div className="flex gap-2">
            <button className="px-3 py-1 border border-border rounded hover:bg-muted transition-colors disabled:opacity-50">Prev</button>
            <button className="px-3 py-1 border border-border rounded hover:bg-muted transition-colors">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}
