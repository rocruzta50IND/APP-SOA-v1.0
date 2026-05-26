"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { 
  CreditCard, 
  ArrowUpRight, 
  ArrowDownRight, 
  Download, 
  Calendar,
  Wallet,
  CheckCircle2
} from "lucide-react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from "recharts";
import { motion } from "framer-motion";

const payrollData = [
  { name: "Engineering", amount: 450000, color: "var(--color-primary)" },
  { name: "Design", amount: 120000, color: "#a855f7" },
  { name: "Marketing", amount: 180000, color: "#ec4899" },
  { name: "Sales", amount: 250000, color: "#eab308" },
  { name: "Operations", amount: 140000, color: "#06b6d4" },
];

const history = [
  { id: 1, period: "October 2024", amount: "$1,140,000", status: "Paid", date: "Oct 25, 2024" },
  { id: 2, period: "September 2024", amount: "$1,125,000", status: "Paid", date: "Sep 25, 2024" },
  { id: 3, period: "August 2024", amount: "$1,110,000", status: "Paid", date: "Aug 25, 2024" },
  { id: 4, period: "July 2024", amount: "$1,095,000", status: "Paid", date: "Jul 25, 2024" },
  { id: 5, period: "June 2024", amount: "$1,080,000", status: "Paid", date: "Jun 25, 2024" },
];

export default function PayrollPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <header>
          <h1 className="text-4xl font-bold tracking-tighter text-gradient">Payroll & Finance</h1>
          <p className="text-muted-foreground mt-2">Oversee salary distributions and financial compliance.</p>
        </header>
        <div className="flex items-center gap-3">
          <button className="glass px-4 py-2.5 text-sm font-medium hover:bg-white/10 transition-all flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Tax Documents
          </button>
          <button className="bg-primary text-white hover:bg-primary/90 shadow-[0_0_20px_rgba(79,70,229,0.3)] rounded-xl px-5 py-2.5 font-medium transition-all flex items-center gap-2">
            <Wallet className="h-4 w-4" />
            Run Payroll
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main KPI */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass p-8 lg:col-span-2 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden"
        >
          <div className="absolute -right-20 -top-20 h-64 w-64 bg-primary/10 blur-[100px] rounded-full" />
          <div className="flex-1 space-y-4">
            <div className="flex items-center gap-2 text-primary font-medium">
               <CheckCircle2 className="h-5 w-5" />
               Next Payroll: Oct 25, 2024
            </div>
            <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-widest">Estimated Total Cost</h2>
            <div className="text-6xl font-bold tracking-tighter text-white font-mono">$1,248,500.00</div>
            <div className="flex items-center gap-4 pt-2">
               <div className="flex items-center gap-1 text-emerald-400 text-sm">
                  <ArrowUpRight className="h-4 w-4" />
                  +4.2% from last month
               </div>
               <div className="text-muted-foreground text-sm">• 1,284 employees included</div>
            </div>
          </div>
          <div className="w-full md:w-64 h-48">
            <ResponsiveContainer width="100%" height="100%">
               <BarChart data={payrollData}>
                  <Bar dataKey="amount" radius={[4, 4, 4, 4]}>
                     {payrollData.map((entry, index) => (
                       <Cell key={`cell-${index}`} fill={entry.color} opacity={0.8} />
                     ))}
                  </Bar>
                  <Tooltip 
                    cursor={{fill: 'transparent'}}
                    contentStyle={{ backgroundColor: "rgba(0, 0, 0, 0.8)", borderColor: "rgba(255, 255, 255, 0.1)", borderRadius: "12px" }}
                  />
               </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass p-6 space-y-4"
        >
          <h3 className="text-lg font-semibold text-white">Compliance Alerts</h3>
          <div className="space-y-3">
             {[
               { title: "Tax Filing Due", date: "In 3 days", type: "warning" },
               { title: "Bank Sync Successful", date: "2h ago", type: "success" },
               { title: "4 new bonus requests", date: "Pending approval", type: "info" }
             ].map((alert, i) => (
               <div key={i} className="p-3 rounded-xl border border-white/5 bg-white/5 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-white">{alert.title}</p>
                    <p className="text-xs text-muted-foreground">{alert.date}</p>
                  </div>
                  <div className={cn(
                    "h-2 w-2 rounded-full",
                    alert.type === 'warning' ? 'bg-amber-400' : alert.type === 'success' ? 'bg-emerald-400' : 'bg-primary'
                  )} />
               </div>
             ))}
          </div>
          <button className="w-full glass py-3 text-sm font-medium hover:bg-white/10 transition-all mt-4">
             View Compliance Report
          </button>
        </motion.div>
      </div>

      {/* History Table */}
      <div className="glass overflow-hidden">
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <h3 className="text-xl font-bold text-white">Payment History</h3>
          <Download className="h-5 w-5 text-muted-foreground cursor-pointer hover:text-white" />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-white/5 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                <th className="px-6 py-4">Billing Period</th>
                <th className="px-6 py-4">Total Amount</th>
                <th className="px-6 py-4">Payment Date</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Receipt</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {history.map((item, idx) => (
                <motion.tr 
                  key={item.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: idx * 0.1 }}
                  className="hover:bg-white/5 transition-colors"
                >
                  <td className="px-6 py-4 text-sm font-medium text-white">{item.period}</td>
                  <td className="px-6 py-4 text-sm font-mono text-white">{item.amount}</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{item.date}</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 rounded-md bg-emerald-500/10 text-emerald-400 text-[10px] font-bold uppercase tracking-tighter">
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button className="text-primary hover:text-primary/80 text-sm font-medium">Download PDF</button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
