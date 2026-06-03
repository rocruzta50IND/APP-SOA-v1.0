"use client";

import { DashboardShell } from "@/components/ui/DashboardShell";
import { 
  Search, 
  Filter, 
  Plus, 
  MoreVertical, 
  Star,
  Download,
  Mail,
  Phone
} from "lucide-react";
import { cn } from "@/lib/utils";

const candidates = [
  { id: 1, name: "Sarah Chen", role: "Senior Frontend Engineer", status: "Interviewing", score: 94, location: "Remote", applied: "2 days ago" },
  { id: 2, name: "Michael Ross", role: "Product Designer", status: "Screening", score: 88, location: "New York, NY", applied: "4 days ago" },
  { id: 3, name: "Elena Gilbert", role: "DevOps Architect", status: "Offer Sent", score: 96, location: "Austin, TX", applied: "1 week ago" },
  { id: 4, name: "David Miller", role: "Marketing Lead", status: "Applied", score: 82, location: "Chicago, IL", applied: "3 days ago" },
  { id: 5, name: "James Wilson", role: "QA Engineer", status: "Rejected", score: 75, location: "Remote", applied: "2 weeks ago" },
  { id: 6, name: "Anna Sofia", role: "Backend Developer", status: "Applied", score: 91, location: "Seattle, WA", applied: "1 day ago" },
  { id: 7, name: "Kevin Hart", role: "Full Stack Engineer", status: "Interviewing", score: 89, location: "San Francisco, CA", applied: "5 days ago" },
];

const statusStyles = {
  "Interviewing": "bg-blue-500/10 text-blue-400 border-blue-500/20",
  "Screening": "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  "Offer Sent": "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  "Applied": "bg-purple-500/10 text-purple-400 border-purple-500/20",
  "Rejected": "bg-red-500/10 text-red-400 border-red-500/20",
};

export default function CandidatesPage() {
  return (
    <DashboardShell>
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
              Candidate Pipeline
            </h1>
            <p className="text-muted-foreground mt-1">Manage and track your talent acquisition progress.</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm font-medium hover:bg-white/10 transition-colors flex items-center gap-2">
              <Download className="h-4 w-4" />
              Export
            </button>
            <button className="bg-primary text-white rounded-xl px-4 py-2 text-sm font-medium hover:bg-primary/90 shadow-[0_0_20px_rgba(79,70,229,0.3)] transition-all flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Candidate
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Search by name, role or location..."
              className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            />
          </div>
          <button className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm font-medium hover:bg-white/10 transition-colors flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Filters
          </button>
        </div>

        {/* Candidates Table */}
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 bg-white/5">
                  <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Candidate</th>
                  <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Role & Location</th>
                  <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Status</th>
                  <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Match Score</th>
                  <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Applied</th>
                  <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-muted-foreground font-bold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {candidates.map((candidate) => (
                  <tr key={candidate.id} className="hover:bg-white/5 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                          {candidate.name.charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-white">{candidate.name}</p>
                          <div className="flex items-center gap-2 mt-0.5">
                            <Mail className="h-3 w-3 text-muted-foreground" />
                            <Phone className="h-3 w-3 text-muted-foreground" />
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-white">{candidate.role}</p>
                      <p className="text-xs text-muted-foreground">{candidate.location}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className={cn(
                        "px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border",
                        statusStyles[candidate.status as keyof typeof statusStyles]
                      )}>
                        {candidate.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-1.5 w-16 bg-white/10 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-primary rounded-full" 
                            style={{ width: `${candidate.score}%` }}
                          />
                        </div>
                        <span className="text-sm font-mono font-bold text-white">{candidate.score}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-muted-foreground">{candidate.applied}</p>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="p-2 text-muted-foreground hover:text-white transition-colors">
                        <MoreVertical className="h-5 w-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-6 py-4 border-t border-white/10 flex items-center justify-between bg-white/5">
            <p className="text-xs text-muted-foreground">Showing 7 of 1,284 candidates</p>
            <div className="flex items-center gap-2">
              <button className="px-3 py-1 rounded-lg border border-white/10 text-xs font-medium hover:bg-white/5 disabled:opacity-50">Previous</button>
              <button className="px-3 py-1 rounded-lg bg-primary text-white text-xs font-medium">1</button>
              <button className="px-3 py-1 rounded-lg border border-white/10 text-xs font-medium hover:bg-white/5">2</button>
              <button className="px-3 py-1 rounded-lg border border-white/10 text-xs font-medium hover:bg-white/5">Next</button>
            </div>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
