"use client";

import { InternalLayout } from "@/components/ui/InternalLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Activity, Beaker, CheckCircle, Clock } from "lucide-react";

const chartData = [
  { name: "Jan", tests: 4000, passed: 3800 },
  { name: "Feb", tests: 3000, passed: 2900 },
  { name: "Mar", tests: 5000, passed: 4800 },
  { name: "Apr", tests: 2780, passed: 2600 },
  { name: "May", tests: 6890, passed: 6500 },
  { name: "Jun", tests: 8390, passed: 8000 },
];

const kpis = [
  { title: "Total Executions", value: "24,582", trend: "+12.5%", icon: Activity },
  { title: "Test Suites", value: "142", trend: "+4.1%", icon: Beaker },
  { title: "Pass Rate", value: "94.2%", trend: "+1.2%", icon: CheckCircle },
  { title: "Avg Duration", value: "1.2m", trend: "-5.0%", icon: Clock },
];

const recentRuns = [
  { id: "RUN-992", suite: "Authentication Flow", status: "Passed", time: "2 mins ago" },
  { id: "RUN-991", suite: "Checkout Process", status: "Failed", time: "15 mins ago" },
  { id: "RUN-990", suite: "User Profile Sync", status: "Passed", time: "1 hour ago" },
  { id: "RUN-989", suite: "Payment Gateway", status: "Passed", time: "3 hours ago" },
  { id: "RUN-988", suite: "Search Index", status: "Passed", time: "5 hours ago" },
];

export default function DashboardPage() {
  return (
    <InternalLayout>
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">Overview of your testing infrastructure.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {kpis.map((kpi) => {
          const Icon = kpi.icon;
          const isPositive = kpi.trend.startsWith("+");
          return (
            <Card key={kpi.title} className="rounded-md">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-6">
                <CardTitle className="text-sm font-medium text-muted-foreground">{kpi.title}</CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent className="p-6 pt-0">
                <div className="text-2xl font-bold">{kpi.value}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  <span className={isPositive ? "text-green-500" : "text-red-500"}>{kpi.trend}</span> from last month
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4 rounded-md">
          <CardHeader>
            <CardTitle>Execution Volume</CardTitle>
            <CardDescription>Total tests run over the last 6 months</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                  <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'hsl(var(--background))', borderColor: 'hsl(var(--border))' }}
                    itemStyle={{ color: 'hsl(var(--foreground))' }}
                  />
                  <Area type="monotone" dataKey="tests" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.2} />
                  <Area type="monotone" dataKey="passed" stroke="hsl(var(--muted-foreground))" fill="hsl(var(--muted-foreground))" fillOpacity={0.1} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-3 rounded-md">
          <CardHeader>
            <CardTitle>Recent Executions</CardTitle>
            <CardDescription>The latest test runs in your project.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentRuns.map((run) => (
                <div key={run.id} className="flex items-center justify-between border-b border-border pb-4 last:border-0 last:pb-0">
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">{run.suite}</p>
                    <p className="text-xs text-muted-foreground">{run.id}</p>
                  </div>
                  <div className="flex flex-col items-end space-y-1">
                    <span className={`text-[10px] font-bold uppercase tracking-widest ${run.status === "Passed" ? "text-green-500" : "text-red-500"}`}>
                      {run.status}
                    </span>
                    <span className="text-xs text-muted-foreground">{run.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </InternalLayout>
  );
}
