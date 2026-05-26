"use client";

import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { motion } from "framer-motion";
import { 
  BarChart, 
  Bar, 
  ResponsiveContainer, 
  Tooltip,
  XAxis
} from "recharts";
import { DollarSign, ArrowUpRight, Calendar, Download } from "lucide-react";

const payrollData = [
  { month: "Jan", amount: 1.2 },
  { month: "Feb", amount: 1.1 },
  { month: "Mar", amount: 1.4 },
  { month: "Apr", amount: 1.8 },
  { month: "May", amount: 1.6 },
  { month: "Jun", amount: 2.1 },
];

const history = [
  { id: "PAY-901", period: "June 2026", employees: 148, total: "$2,104,200", status: "Released", date: "Jun 30, 2026" },
  { id: "PAY-900", period: "May 2026", employees: 142, total: "$1,850,000", status: "Released", date: "May 31, 2026" },
  { id: "PAY-899", period: "April 2026", employees: 138, total: "$1,720,500", status: "Released", date: "Apr 30, 2026" },
  { id: "PAY-898", period: "March 2026", employees: 135, total: "$1,680,000", status: "Released", date: "Mar 31, 2026" },
  { id: "PAY-897", period: "February 2026", employees: 130, total: "$1,550,000", status: "Released", date: "Feb 28, 2026" },
];

export default function PayrollPage() {
  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header Section */}
        <section className="flex flex-col md:flex-row justify-between items-end gap-8">
          <div className="space-y-4">
            <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-primary">Financial Operations</span>
            <h1 className="font-serif text-6xl md:text-8xl tracking-tighter leading-none">
              Capital <br />
              <span className="text-muted-foreground/20">Velocity</span>
            </h1>
          </div>
          <div className="flex gap-4">
            <button className="px-8 py-4 bg-foreground text-background text-[10px] uppercase tracking-[0.2em] font-bold hover:opacity-80 transition-all duration-500 rounded-full">
              Run Payroll Cycle
            </button>
          </div>
        </section>

        {/* Financial Summary */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 p-10 border border-border/50 bg-card/30 backdrop-blur-sm space-y-8">
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-primary">Expense Analytics</p>
                <h3 className="font-serif text-3xl tracking-tighter">Monthly Payout Trends</h3>
              </div>
              <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                <Calendar className="w-3 h-3" /> Last 6 Months
              </div>
            </div>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={payrollData}>
                  <Tooltip 
                    cursor={{ fill: 'hsl(var(--primary))', opacity: 0.05 }}
                    contentStyle={{ 
                      backgroundColor: "hsl(var(--background))", 
                      borderColor: "hsl(var(--border))",
                      fontSize: "10px",
                      textTransform: "uppercase",
                      letterSpacing: "0.2em",
                      fontWeight: "bold"
                    }}
                  />
                  <Bar 
                    dataKey="amount" 
                    fill="hsl(var(--primary))" 
                    radius={[2, 2, 0, 0]}
                    animationDuration={2000}
                  />
                  <XAxis 
                    dataKey="month" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))', fontWeight: 'bold' }}
                    dy={10}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="p-10 border border-border/50 bg-primary text-primary-foreground space-y-8 relative overflow-hidden">
            <div className="relative z-10 space-y-1">
              <p className="text-[10px] uppercase tracking-[0.3em] font-bold opacity-70">Projected Next Cycle</p>
              <h3 className="font-serif text-4xl tracking-tighter">July 2026</h3>
            </div>
            
            <div className="relative z-10 space-y-6 pt-8">
              <div className="space-y-1">
                <p className="text-[8px] uppercase tracking-[0.3em] font-bold opacity-70">Estimated Disbursement</p>
                <p className="text-5xl font-sans font-black tracking-tighter">$2.45M</p>
              </div>
              <div className="space-y-1">
                <p className="text-[8px] uppercase tracking-[0.3em] font-bold opacity-70">Eligible Employees</p>
                <p className="text-2xl font-sans font-bold tracking-tighter">154 Individuals</p>
              </div>
            </div>

            <button className="relative z-10 w-full py-4 mt-8 bg-background text-foreground text-[10px] uppercase tracking-[0.3em] font-black hover:opacity-90 transition-opacity">
              Review Adjustments
            </button>

            <DollarSign className="absolute -bottom-12 -right-12 w-48 h-48 opacity-10 rotate-12" />
          </div>
        </section>

        {/* History Table */}
        <section className="space-y-8">
          <div className="space-y-1">
            <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground">Audit Log</p>
            <h3 className="font-serif text-3xl tracking-tighter">Historical Cycles</h3>
          </div>

          <div className="border border-border/50 bg-card/30 overflow-hidden">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-border/50 bg-muted/30">
                  <th className="px-8 py-6 text-[8px] uppercase tracking-[0.3em] font-black text-muted-foreground">ID</th>
                  <th className="px-8 py-6 text-[8px] uppercase tracking-[0.3em] font-black text-muted-foreground">Period</th>
                  <th className="px-8 py-6 text-[8px] uppercase tracking-[0.3em] font-black text-muted-foreground">Employees</th>
                  <th className="px-8 py-6 text-[8px] uppercase tracking-[0.3em] font-black text-muted-foreground">Total Value</th>
                  <th className="px-8 py-6 text-[8px] uppercase tracking-[0.3em] font-black text-muted-foreground">Status</th>
                  <th className="px-8 py-6 text-[8px] uppercase tracking-[0.3em] font-black text-muted-foreground text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                {history.map((item, index) => (
                  <motion.tr 
                    key={item.id}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="hover:bg-muted/20 transition-colors group cursor-pointer"
                  >
                    <td className="px-8 py-6 text-[10px] font-bold tracking-widest text-muted-foreground">{item.id}</td>
                    <td className="px-8 py-6 text-[10px] font-bold uppercase tracking-widest">{item.period}</td>
                    <td className="px-8 py-6 text-[10px] font-bold tracking-widest">{item.employees}</td>
                    <td className="px-8 py-6 text-[10px] font-bold tracking-widest">{item.total}</td>
                    <td className="px-8 py-6">
                      <span className="px-2 py-0.5 border border-primary/30 text-[8px] font-bold uppercase tracking-widest text-primary">
                        {item.status}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <button className="text-muted-foreground hover:text-foreground">
                        <Download className="w-4 h-4 ml-auto" />
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
}
