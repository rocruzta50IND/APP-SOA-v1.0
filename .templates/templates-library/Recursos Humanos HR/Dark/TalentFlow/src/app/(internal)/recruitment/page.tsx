"use client";

import { cn } from "@/lib/utils";
import { Briefcase, MapPin, Clock } from "lucide-react";

const positions = [
  { id: 1, title: "Senior React Engineer", department: "Engineering", location: "Remote", type: "Full-time", candidates: 42, daysOpen: 14 },
  { id: 2, title: "Product Marketing Manager", department: "Marketing", location: "New York", type: "Full-time", candidates: 18, daysOpen: 5 },
  { id: 3, title: "UX Researcher", department: "Design", location: "London", type: "Contract", candidates: 8, daysOpen: 2 },
  { id: 4, title: "Account Executive", department: "Sales", location: "San Francisco", type: "Full-time", candidates: 105, daysOpen: 30 },
  { id: 5, title: "Data Scientist", department: "Data", location: "Remote", type: "Full-time", candidates: 24, daysOpen: 10 },
];

export default function RecruitmentPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Recruitment</h1>
          <p className="text-muted-foreground mt-1 text-sm">Manage open positions and candidate pipelines.</p>
        </div>
        <button className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90">
          New Position
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {positions.map((pos) => (
          <div key={pos.id} className="flex flex-col rounded-md border border-border/50 bg-background p-6 shadow-sm">
            <div className="mb-4 flex items-start justify-between">
              <div>
                <h3 className="font-bold text-foreground">{pos.title}</h3>
                <p className="text-xs text-muted-foreground">{pos.department}</p>
              </div>
              <span className="inline-flex rounded-full bg-muted px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                Active
              </span>
            </div>
            
            <div className="mb-6 space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                {pos.location}
              </div>
              <div className="flex items-center gap-2">
                <Briefcase className="h-4 w-4" />
                {pos.type}
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                {pos.daysOpen} days open
              </div>
            </div>

            <div className="mt-auto flex items-center justify-between border-t border-border/50 pt-4">
              <span className="text-sm font-medium text-foreground">{pos.candidates} Candidates</span>
              <button className="text-sm font-medium text-primary-foreground hover:underline">View Pipeline &rarr;</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}