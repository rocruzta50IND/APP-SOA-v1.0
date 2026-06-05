"use client";

import React from "react";
import { 
  Search, 
  Filter, 
  Plus, 
  MoreVertical, 
  Mail, 
  Phone, 
  Globe,
  BadgeCheck,
  Clock,
  AlertCircle
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const leads = [
  { 
    id: 1, 
    company: "Quantum Dynamics", 
    contact: "Sarah Jenkins", 
    value: "$85,000", 
    status: "Hot", 
    lastContact: "2 hours ago",
    score: 98
  },
  { 
    id: 2, 
    company: "Blue Horizon Ltd", 
    contact: "Michael Chen", 
    value: "$12,400", 
    status: "Warm", 
    lastContact: "5 hours ago",
    score: 75
  },
  { 
    id: 3, 
    company: "Aether Tech", 
    contact: "Emma Wilson", 
    value: "$42,000", 
    status: "Cold", 
    lastContact: "1 day ago",
    score: 42
  },
  { 
    id: 4, 
    company: "Nova Solutions", 
    contact: "David Miller", 
    value: "$150,000", 
    status: "Negotiation", 
    lastContact: "30 mins ago",
    score: 95
  },
  { 
    id: 5, 
    company: "Zenith Systems", 
    contact: "Lisa Thompson", 
    value: "$28,500", 
    status: "Qualified", 
    lastContact: "3 days ago",
    score: 88
  },
  { 
    id: 6, 
    company: "Ironclad Security", 
    contact: "Robert Ross", 
    value: "$64,000", 
    status: "Proposal", 
    lastContact: "1 hour ago",
    score: 92
  },
];

const statusStyles: Record<string, string> = {
  Hot: "bg-red-500/10 text-red-500 border-red-500/20",
  Warm: "bg-orange-500/10 text-orange-500 border-orange-500/20",
  Cold: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  Negotiation: "bg-purple-500/10 text-purple-500 border-purple-500/20",
  Qualified: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
  Proposal: "bg-cyan-500/10 text-cyan-500 border-cyan-500/20",
};

export default function LeadsPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
            Leads Management
          </h1>
          <p className="text-muted-foreground">
            Manage and track your high-ticket sales opportunities.
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Add New Lead
        </Button>
      </div>

      <Card>
        <CardHeader className="border-b border-white/5 pb-6">
          <div className="flex items-center justify-between">
            <div className="relative flex items-center max-w-sm w-full">
              <Search className="absolute left-3 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search by company or contact..."
                className="h-10 w-full rounded-xl border border-white/10 bg-white/5 pl-10 pr-4 text-sm text-white focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all"
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="gap-2">
                <Filter className="h-4 w-4" />
                Filters
              </Button>
              <Button variant="outline" size="sm">Export</Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/5 bg-white/[0.02]">
                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Company</th>
                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Value</th>
                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Status</th>
                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Lead Score</th>
                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Last Activity</th>
                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {leads.map((lead) => (
                  <tr key={lead.id} className="group hover:bg-white/[0.02] transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center border border-primary/20">
                          <Globe className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-white">{lead.company}</div>
                          <div className="text-xs text-muted-foreground">{lead.contact}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-mono font-medium text-white">{lead.value}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={cn(
                        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium",
                        statusStyles[lead.status]
                      )}>
                        {lead.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="h-1.5 w-16 rounded-full bg-white/10 overflow-hidden">
                          <div 
                            className="h-full bg-primary" 
                            style={{ width: `${lead.score}%` }}
                          />
                        </div>
                        <span className="text-xs font-mono text-white">{lead.score}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {lead.lastContact}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-white">
                          <Mail className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-white">
                          <Phone className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-white">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
