"use client";

import { InternalLayout } from "@/components/ui/InternalLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Plus, Settings2, Play, MoreHorizontal } from "lucide-react";

const suites = [
  { id: "TS-101", name: "Authentication API", type: "Backend", tests: 45, successRate: "99.8%", lastRun: "10 mins ago" },
  { id: "TS-102", name: "Checkout UI Flow", type: "E2E", tests: 12, successRate: "92.5%", lastRun: "1 hour ago" },
  { id: "TS-103", name: "Payment Gateway Integration", type: "Integration", tests: 28, successRate: "100%", lastRun: "3 hours ago" },
  { id: "TS-104", name: "User Profile Management", type: "Frontend", tests: 34, successRate: "95.2%", lastRun: "5 hours ago" },
  { id: "TS-105", name: "Search & Filtering Service", type: "Backend", tests: 67, successRate: "98.1%", lastRun: "1 day ago" },
];

export default function TestSuitesPage() {
  return (
    <InternalLayout>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Test Suites</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage and organize your automated test suites.</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          New Suite
        </Button>
      </div>

      <Card className="rounded-md">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>All Suites</CardTitle>
            <CardDescription>A list of all test suites configured in this project.</CardDescription>
          </div>
          <Button variant="outline" size="sm" className="gap-2 h-8">
            <Settings2 className="h-4 w-4" />
            Filter
          </Button>
        </CardHeader>
        <CardContent>
          <div className="w-full overflow-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold border-b border-border">
                <tr>
                  <th className="px-4 py-3">Suite Name</th>
                  <th className="px-4 py-3">Type</th>
                  <th className="px-4 py-3">Tests</th>
                  <th className="px-4 py-3">Success Rate</th>
                  <th className="px-4 py-3">Last Run</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {suites.map((suite) => (
                  <tr key={suite.id} className="hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-4">
                      <div className="font-medium text-foreground">{suite.name}</div>
                      <div className="text-xs text-muted-foreground">{suite.id}</div>
                    </td>
                    <td className="px-4 py-4">
                      <span className="inline-flex items-center rounded-full border border-border px-2.5 py-0.5 text-[10px] uppercase tracking-widest font-bold">
                        {suite.type}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-muted-foreground">{suite.tests}</td>
                    <td className="px-4 py-4">
                      <span className={`font-medium ${parseFloat(suite.successRate) > 95 ? "text-green-500" : "text-amber-500"}`}>
                        {suite.successRate}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-muted-foreground">{suite.lastRun}</td>
                    <td className="px-4 py-4 text-right space-x-2">
                      <Button variant="ghost" size="sm" className="h-8 w-8 px-0">
                        <Play className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 w-8 px-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </InternalLayout>
  );
}
