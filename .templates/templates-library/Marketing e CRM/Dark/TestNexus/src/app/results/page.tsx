"use client";

import { InternalLayout } from "@/components/ui/InternalLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const resultsData = [
  { name: "Auth", passed: 120, failed: 5, skipped: 2 },
  { name: "Checkout", passed: 85, failed: 12, skipped: 0 },
  { name: "Profile", passed: 60, failed: 1, skipped: 5 },
  { name: "Search", passed: 150, failed: 0, skipped: 0 },
  { name: "Billing", passed: 45, failed: 8, skipped: 1 },
];

export default function ResultsPage() {
  return (
    <InternalLayout>
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">Analytics & Results</h1>
        <p className="text-sm text-muted-foreground mt-1">Detailed breakdown of test failures and success rates.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="rounded-md">
          <CardHeader className="pb-2">
            <CardTitle className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Total Tests Analyzed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-black tracking-tighter">489</div>
            <p className="text-xs text-muted-foreground mt-1">Across 5 active modules</p>
          </CardContent>
        </Card>
        <Card className="rounded-md">
          <CardHeader className="pb-2">
            <CardTitle className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Flaky Tests Detected</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-black tracking-tighter text-amber-500">12</div>
            <p className="text-xs text-muted-foreground mt-1">Requires attention</p>
          </CardContent>
        </Card>
        <Card className="rounded-md">
          <CardHeader className="pb-2">
            <CardTitle className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Global Pass Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-black tracking-tighter text-green-500">94.6%</div>
            <p className="text-xs text-muted-foreground mt-1">+2.1% from last week</p>
          </CardContent>
        </Card>
      </div>

      <Card className="rounded-md">
        <CardHeader>
          <CardTitle>Module Performance</CardTitle>
          <CardDescription>Breakdown of passed vs failed tests by system module.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[400px] w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={resultsData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  cursor={{ fill: 'hsl(var(--muted)/0.5)' }}
                  contentStyle={{ backgroundColor: 'hsl(var(--background))', borderColor: 'hsl(var(--border))' }}
                  itemStyle={{ color: 'hsl(var(--foreground))' }}
                />
                <Bar dataKey="passed" stackId="a" fill="hsl(var(--primary))" radius={[0, 0, 0, 0]} />
                <Bar dataKey="failed" stackId="a" fill="#ef4444" radius={[0, 0, 0, 0]} />
                <Bar dataKey="skipped" stackId="a" fill="hsl(var(--muted-foreground))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </InternalLayout>
  );
}
