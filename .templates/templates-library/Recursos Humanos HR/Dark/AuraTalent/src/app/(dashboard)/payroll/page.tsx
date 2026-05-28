"use client";

import { motion } from "framer-motion";
import { 
  CreditCard, 
  DollarSign, 
  Download, 
  CheckCircle2, 
  AlertCircle,
  FileText
} from "lucide-react";
import { cn } from "@/lib/utils";

const payrolls = [
  { id: 1, month: "May 2026", amount: "$424,500.00", status: "Processed", date: "May 25, 2026" },
  { id: 2, month: "April 2026", amount: "$418,200.00", status: "Processed", date: "Apr 25, 2026" },
  { id: 3, month: "March 2026", amount: "$415,000.00", status: "Processed", date: "Mar 25, 2026" },
  { id: 4, month: "February 2026", amount: "$410,800.00", status: "Processed", date: "Feb 25, 2026" },
];

export default function PayrollPage() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
            Payroll Management
          </h1>
          <p className="text-muted-foreground mt-1">Financial overview and salary disbursement tracking.</p>
        </div>
        <button className="bg-primary text-white px-5 py-2.5 rounded-xl font-medium shadow-lg hover:opacity-90 transition-all active:scale-95">
          Run Payroll
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: "Total Monthly Cost", value: "$424,500", icon: DollarSign, color: "text-emerald-500" },
          { label: "Pending Approvals", value: "0", icon: CheckCircle2, color: "text-blue-500" },
          { label: "Tax Liabilities", value: "$82,400", icon: AlertCircle, color: "text-amber-500" },
        ].map((item, i) => (
          <div key={i} className="p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm font-medium text-muted-foreground">{item.label}</p>
              <item.icon className={cn("w-5 h-5", item.color)} />
            </div>
            <h3 className="text-2xl font-bold font-mono tracking-tight">{item.value}</h3>
          </div>
        ))}
      </div>

      <div className="p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md">
        <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
          <FileText className="w-5 h-5 text-primary" />
          Recent Payroll Cycles
        </h3>
        <div className="space-y-4">
          {payrolls.map((payroll) => (
            <div key={payroll.id} className="group flex items-center justify-between p-4 rounded-xl border border-white/5 bg-white/5 hover:border-white/10 transition-all">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <CreditCard className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold">{payroll.month}</p>
                  <p className="text-xs text-muted-foreground">Paid on {payroll.date}</p>
                </div>
              </div>
              <div className="flex items-center gap-8">
                <div className="text-right">
                  <p className="text-sm font-bold font-mono">{payroll.amount}</p>
                  <p className="text-[10px] text-emerald-500 font-bold uppercase">{payroll.status}</p>
                </div>
                <button className="p-2 rounded-lg bg-white/5 border border-white/10 text-muted-foreground hover:text-white transition-all opacity-0 group-hover:opacity-100">
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
