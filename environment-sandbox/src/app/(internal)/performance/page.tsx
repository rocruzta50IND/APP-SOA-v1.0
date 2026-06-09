"use client";

import { cn } from "@/lib/utils";
import { Star, Target, TrendingUp } from "lucide-react";

const reviews = [
  { id: 1, employee: "Sarah Connor", department: "Engineering", score: 4.8, status: "Completed", cycle: "Q1 2026" },
  { id: 2, employee: "John Smith", department: "Design", score: 4.2, status: "Completed", cycle: "Q1 2026" },
  { id: 3, employee: "Emily Chen", department: "Product", score: 4.9, status: "Pending", cycle: "Q2 2026" },
  { id: 4, employee: "Michael Chang", department: "Engineering", score: 3.8, status: "In Progress", cycle: "Q2 2026" },
  { id: 5, employee: "Jessica Davis", department: "Human Resources", score: 4.5, status: "Completed", cycle: "Q1 2026" },
];

export default function PerformancePage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Performance</h1>
          <p className="text-muted-foreground mt-1 text-sm">Track employee reviews and goals.</p>
        </div>
        <button className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90">
          Start Cycle
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-md border border-border/50 bg-background p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
              <Star className="h-6 w-6 text-foreground" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Average Score</p>
              <h3 className="text-2xl font-bold text-foreground">4.4 / 5.0</h3>
            </div>
          </div>
        </div>
        <div className="rounded-md border border-border/50 bg-background p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
              <Target className="h-6 w-6 text-foreground" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Goals Met</p>
              <h3 className="text-2xl font-bold text-foreground">82%</h3>
            </div>
          </div>
        </div>
        <div className="rounded-md border border-border/50 bg-background p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
              <TrendingUp className="h-6 w-6 text-foreground" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Top Performers</p>
              <h3 className="text-2xl font-bold text-foreground">24</h3>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-md border border-border/50 bg-background shadow-sm">
        <div className="border-b border-border/50 px-6 py-4">
          <h3 className="text-sm font-medium uppercase tracking-widest text-muted-foreground">Recent Reviews</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-border/50 bg-muted/50">
              <tr>
                <th className="px-6 py-3 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Employee</th>
                <th className="px-6 py-3 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Department</th>
                <th className="px-6 py-3 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Cycle</th>
                <th className="px-6 py-3 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Status</th>
                <th className="px-6 py-3 text-right text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Score</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {reviews.map((rev) => (
                <tr key={rev.id} className="transition-colors hover:bg-muted/50">
                  <td className="px-6 py-4 font-medium text-foreground">{rev.employee}</td>
                  <td className="px-6 py-4 text-muted-foreground">{rev.department}</td>
                  <td className="px-6 py-4 text-muted-foreground">{rev.cycle}</td>
                  <td className="px-6 py-4">
                    <span className={cn(
                      "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium",
                      rev.status === "Completed" && "bg-emerald-500/10 text-emerald-500",
                      rev.status === "Pending" && "bg-amber-500/10 text-amber-500",
                      rev.status === "In Progress" && "bg-blue-500/10 text-blue-500"
                    )}>
                      {rev.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right font-bold text-foreground">
                    {rev.score.toFixed(1)}
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