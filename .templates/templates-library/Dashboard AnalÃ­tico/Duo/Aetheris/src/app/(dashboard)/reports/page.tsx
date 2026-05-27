"use client";

import { motion } from "framer-motion";
import { FileText, Download, MoreHorizontal, Filter } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

const reports = [
  { id: "REP-001", name: "Monthly Financial Audit", date: "2024-05-01", size: "2.4 MB", status: "Ready" },
  { id: "REP-002", name: "User Retention Analysis", date: "2024-04-28", size: "1.1 MB", status: "Processing" },
  { id: "REP-003", name: "Infrastructure Cost Report", date: "2024-04-15", size: "3.8 MB", status: "Ready" },
  { id: "REP-004", name: "Q1 Marketing Performance", date: "2024-04-10", size: "5.2 MB", status: "Ready" },
  { id: "REP-005", name: "Security Compliance Log", date: "2024-04-05", size: "0.8 MB", status: "Archived" },
];

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-semibold tracking-tight">Reports</h1>
          <p className="text-sm text-muted-foreground">
            Manage and export your enterprise data reports.
          </p>
        </div>
        <Button className="gap-2">
          <Filter className="h-4 w-4" />
          Filter
        </Button>
      </div>

      <div className="rounded-md border border-border bg-background overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-border bg-muted/50">
              <th className="px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">ID</th>
              <th className="px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Report Name</th>
              <th className="px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Date</th>
              <th className="px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Size</th>
              <th className="px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Status</th>
              <th className="px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-muted-foreground text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report, i) => (
              <motion.tr 
                key={report.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.05 }}
                className="border-b border-border hover:bg-muted/30 transition-colors"
              >
                <td className="px-4 py-4 text-xs font-medium font-mono">{report.id}</td>
                <td className="px-4 py-4">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <span className="text-xs font-medium">{report.name}</span>
                  </div>
                </td>
                <td className="px-4 py-4 text-xs text-muted-foreground">{report.date}</td>
                <td className="px-4 py-4 text-xs text-muted-foreground">{report.size}</td>
                <td className="px-4 py-4">
                  <Badge variant={report.status === "Ready" ? "outline" : "secondary"}>
                    {report.status}
                  </Badge>
                </td>
                <td className="px-4 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
