"use client";

import { cn } from "@/lib/utils";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Download, CheckCircle2 } from "lucide-react";

const payrollHistory = [
  { month: "Jan 2026", amount: 1200500, status: "Paid", date: "Jan 31, 2026" },
  { month: "Feb 2026", amount: 1210200, status: "Paid", date: "Feb 28, 2026" },
  { month: "Mar 2026", amount: 1245000, status: "Paid", date: "Mar 31, 2026" },
  { month: "Apr 2026", amount: 1280000, status: "Paid", date: "Apr 30, 2026" },
  { month: "May 2026", amount: 1310000, status: "Paid", date: "May 31, 2026" },
];

const chartData = payrollHistory.map(item => ({
  name: item.month.split(" ")[0],
  value: item.amount
}));

export default function PayrollPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Payroll</h1>
          <p className="text-muted-foreground mt-1 text-sm">Review compensation and payroll history.</p>
        </div>
        <button className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90">
          Run Payroll
        </button>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="rounded-md border border-border/50 bg-background p-6 shadow-sm lg:col-span-2">
          <h3 className="mb-4 text-sm font-medium uppercase tracking-widest text-muted-foreground">Expense Trend</h3>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#333" />
                <XAxis dataKey="name" stroke="#888" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => `$${(v/1000000).toFixed(1)}M`} />
                <Tooltip 
                  cursor={{ fill: '#222' }}
                  contentStyle={{ backgroundColor: '#000', borderColor: '#333' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Bar dataKey="value" fill="#fafafa" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-md border border-border/50 bg-primary p-6 text-primary-foreground shadow-sm">
          <h3 className="mb-2 text-sm font-medium uppercase tracking-widest opacity-80">Next Payroll</h3>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-4xl font-black tracking-tighter">$1.34M</span>
          </div>
          <p className="mt-2 text-sm opacity-80">Scheduled for Jun 30, 2026</p>
          <div className="mt-8">
            <button className="w-full rounded-md bg-foreground px-4 py-2 text-sm font-medium text-background hover:opacity-90">
              Review Details
            </button>
          </div>
        </div>
      </div>

      <div className="rounded-md border border-border/50 bg-background shadow-sm">
        <div className="border-b border-border/50 px-6 py-4">
          <h3 className="text-sm font-medium uppercase tracking-widest text-muted-foreground">Previous Runs</h3>
        </div>
        <div className="divide-y divide-border/50">
          {payrollHistory.map((run) => (
            <div key={run.month} className="flex items-center justify-between px-6 py-4 transition-colors hover:bg-muted/50">
              <div>
                <h4 className="font-medium text-foreground">{run.month}</h4>
                <p className="text-xs text-muted-foreground">Processed on {run.date}</p>
              </div>
              <div className="flex items-center gap-8">
                <span className="font-bold text-foreground">${run.amount.toLocaleString()}</span>
                <span className="flex items-center gap-1 text-xs font-medium text-emerald-500">
                  <CheckCircle2 className="h-4 w-4" />
                  {run.status}
                </span>
                <button className="text-muted-foreground hover:text-foreground">
                  <Download className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}