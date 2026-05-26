"use client";

import React from "react";
import { 
  FileText, 
  Download, 
  ExternalLink, 
  Search,
  Calendar,
  MoreVertical,
  CheckCircle2,
  Clock
} from "lucide-react";
import { cn } from "@/lib/utils";

const reports = [
  { id: "R-8421", name: "Monthly Performance Audit", date: "Jun 01, 2026", size: "2.4 MB", type: "PDF", status: "Ready" },
  { id: "R-8419", name: "Security Compliance Review", date: "May 28, 2026", size: "1.1 MB", type: "DOCX", status: "Ready" },
  { id: "R-8415", name: "Infrastructure Cost Analysis", date: "May 15, 2026", size: "840 KB", type: "PDF", status: "Processing" },
  { id: "R-8392", name: "User Retention Cohort Q1", date: "Apr 30, 2026", size: "4.2 MB", type: "PDF", status: "Ready" },
  { id: "R-8388", name: "API Usage Scalability Report", date: "Apr 22, 2026", size: "1.8 MB", type: "CSV", status: "Archived" },
  { id: "R-8371", name: "System Latency Distribution", date: "Apr 10, 2026", size: "3.1 MB", type: "PDF", status: "Ready" },
];

export default function ReportsPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold tracking-tight text-zinc-100">Reports Library</h1>
        <p className="text-zinc-500 text-sm">Access and export system audits and analytical summaries.</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
          <input 
            type="text" 
            placeholder="Search reports by ID or name..."
            className="w-full bg-zinc-900 border border-zinc-800 rounded-md py-2 pl-10 pr-4 text-sm text-zinc-200 focus:outline-none focus:border-zinc-700"
          />
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-md text-sm font-medium text-zinc-300 hover:bg-zinc-800">
            <Calendar className="w-4 h-4" />
            Date Range
          </button>
          <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 rounded-md text-sm font-medium text-white hover:bg-indigo-500 transition-colors">
            Generate New
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {reports.map((report) => (
          <div key={report.id} className="bg-zinc-900/50 border border-zinc-800 p-4 rounded-lg flex items-center gap-6 hover:border-zinc-700 transition-all group">
            <div className="w-12 h-12 bg-zinc-800 rounded-md flex items-center justify-center shrink-0">
              <FileText className="w-6 h-6 text-zinc-400 group-hover:text-indigo-400 transition-colors" />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-semibold text-zinc-100 truncate">{report.name}</h3>
                <span className="text-[10px] text-zinc-600 font-mono">{report.id}</span>
              </div>
              <div className="flex items-center gap-4 mt-1">
                <span className="text-xs text-zinc-500 flex items-center gap-1.5">
                  <Calendar className="w-3 h-3" />
                  {report.date}
                </span>
                <span className="text-xs text-zinc-500 flex items-center gap-1.5">
                  <div className="w-1 h-1 bg-zinc-700 rounded-full" />
                  {report.size}
                </span>
                <span className="text-[10px] px-1.5 bg-zinc-800 text-zinc-400 rounded font-bold uppercase">{report.type}</span>
              </div>
            </div>

            <div className="hidden md:flex flex-col items-end gap-1 px-8 border-x border-zinc-800">
              <span className={cn(
                "inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider",
                report.status === "Ready" ? "text-emerald-400" : 
                report.status === "Processing" ? "text-amber-400" : "text-zinc-500"
              )}>
                {report.status === "Ready" ? <CheckCircle2 className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                {report.status}
              </span>
              <p className="text-[10px] text-zinc-600">Status</p>
            </div>

            <div className="flex items-center gap-2">
              <button className="p-2 text-zinc-500 hover:text-zinc-100 transition-colors">
                <Download className="w-4 h-4" />
              </button>
              <button className="p-2 text-zinc-500 hover:text-zinc-100 transition-colors">
                <ExternalLink className="w-4 h-4" />
              </button>
              <button className="p-2 text-zinc-500 hover:text-zinc-100 transition-colors">
                <MoreVertical className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
