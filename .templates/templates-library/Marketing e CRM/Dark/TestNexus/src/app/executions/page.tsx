"use client";

import { InternalLayout } from "@/components/ui/InternalLayout";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { CheckCircle2, XCircle, Clock, RefreshCw } from "lucide-react";

const executions = [
  { id: "EXEC-8409", commit: "feat: add user roles", author: "johndoe", status: "Running", duration: "02:15", branch: "feature/roles" },
  { id: "EXEC-8408", commit: "fix: checkout bug", author: "sarah", status: "Passed", duration: "04:32", branch: "main" },
  { id: "EXEC-8407", commit: "chore: update deps", author: "dependabot", status: "Failed", duration: "01:12", branch: "chore/deps" },
  { id: "EXEC-8406", commit: "docs: update readme", author: "mike", status: "Passed", duration: "00:45", branch: "main" },
  { id: "EXEC-8405", commit: "feat: new payment method", author: "johndoe", status: "Passed", duration: "05:10", branch: "feature/stripe" },
];

export default function ExecutionsPage() {
  return (
    <InternalLayout>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Executions</h1>
          <p className="text-sm text-muted-foreground mt-1">Real-time status of your test runs.</p>
        </div>
        <Button variant="outline" className="gap-2">
          <RefreshCw className="h-4 w-4" />
          Refresh
        </Button>
      </div>

      <div className="space-y-4">
        {executions.map((exec) => (
          <Card key={exec.id} className="rounded-md overflow-hidden relative">
            <div className={`w-1 h-full absolute left-0 top-0 ${
              exec.status === "Passed" ? "bg-green-500" : exec.status === "Failed" ? "bg-red-500" : "bg-blue-500 animate-pulse"
            }`} />
            <CardContent className="p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 ml-1">
              <div className="flex items-start gap-4">
                <div className="mt-1">
                  {exec.status === "Passed" && <CheckCircle2 className="h-5 w-5 text-green-500" />}
                  {exec.status === "Failed" && <XCircle className="h-5 w-5 text-red-500" />}
                  {exec.status === "Running" && <RefreshCw className="h-5 w-5 text-blue-500 animate-spin" />}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold">{exec.id}</h3>
                    <span className="inline-flex items-center rounded-full border border-border px-2 py-0.5 text-[10px] uppercase tracking-widest font-bold text-muted-foreground">
                      {exec.branch}
                    </span>
                  </div>
                  <p className="text-sm text-foreground mt-1">{exec.commit}</p>
                  <p className="text-xs text-muted-foreground mt-1">Triggered by @{exec.author}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-6 sm:justify-end">
                <div className="text-right">
                  <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold mb-1">Duration</p>
                  <div className="flex items-center gap-1 text-sm font-medium">
                    <Clock className="h-3 w-3" />
                    {exec.duration}
                  </div>
                </div>
                <div className="text-right min-w-[80px]">
                  <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold mb-1">Status</p>
                  <p className={`text-sm font-medium ${
                    exec.status === "Passed" ? "text-green-500" : exec.status === "Failed" ? "text-red-500" : "text-blue-500"
                  }`}>{exec.status}</p>
                </div>
                <Button variant="outline" size="sm">Details</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </InternalLayout>
  );
}
