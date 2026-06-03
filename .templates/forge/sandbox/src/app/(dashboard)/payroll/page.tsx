"use client";

import { cn } from "@/lib/utils";
import { 
  CreditCard, 
  ArrowUpRight, 
  ArrowDownRight, 
  Download,
  Calendar,
  CheckCircle2,
  Clock
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
  { month: "Jan", amount: 125000 },
  { month: "Feb", amount: 128000 },
  { month: "Mar", amount: 132000 },
  { month: "Apr", amount: 129000 },
  { month: "May", amount: 135000 },
  { month: "Jun", amount: 142000 },
];

const transactions = [
  { id: 1, recipient: "Jordan Smith", type: "Monthly Salary", amount: "$8,500.00", status: "Paid", date: "June 25, 2026" },
  { id: 2, recipient: "Taylor Reed", type: "Performance Bonus", amount: "$2,400.00", status: "Paid", date: "June 24, 2026" },
  { id: 3, recipient: "Morgan Vance", type: "Monthly Salary", amount: "$7,200.00", status: "Processing", date: "June 25, 2026" },
  { id: 4, recipient: "Casey Wright", type: "Expense Reimbursement", amount: "$450.20", status: "Paid", date: "June 22, 2026" },
  { id: 5, recipient: "Riley Cooper", type: "Monthly Salary", amount: "$6,800.00", status: "Paid", date: "June 25, 2026" },
];

export default function PayrollPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tighter text-white">Payroll</h1>
          <p className="text-muted-foreground mt-1">Manage compensation and financial records.</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm font-medium hover:bg-white/10 transition-colors flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export CSV
          </button>
          <button className="bg-primary text-white rounded-xl px-4 py-2 text-sm font-medium hover:bg-primary/90 shadow-[0_0_20px_rgba(79,70,229,0.3)] transition-all">
            Run Payroll
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Statistics */}
        <div className="space-y-6">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6"
          >
            <p className="text-sm text-muted-foreground font-medium">Total Monthly Payroll</p>
            <h3 className="text-3xl font-bold text-white mt-2 font-mono tracking-tighter">$142,000.00</h3>
            <div className="flex items-center gap-1 text-emerald-500 text-xs font-medium mt-2">
              <ArrowUpRight className="w-3 h-3" />
              +5.2% from last month
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground font-medium">Next Pay Date</p>
                <h3 className="text-xl font-bold text-white mt-1">July 25, 2026</h3>
              </div>
              <div className="p-2 bg-primary/10 rounded-lg text-primary">
                <Calendar className="w-5 h-5" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bar Chart */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6"
        >
          <h3 className="text-lg font-bold text-white mb-6 tracking-tight">Compensation Trend</h3>
          <div className="h-[200px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={payrollData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ffffff05" />
                <XAxis 
                  dataKey="month" 
                  stroke="#888888" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false} 
                />
                <YAxis 
                  stroke="#888888" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false} 
                  tickFormatter={(value) => `$${value / 1000}k`}
                />
                <Tooltip 
                  cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                  contentStyle={{ backgroundColor: "#1e1e2d", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px" }}
                  itemStyle={{ color: "#fff" }}
                />
                <Bar dataKey="amount" radius={[4, 4, 0, 0]}>
                  {payrollData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === 5 ? "hsl(var(--primary))" : "rgba(255,255,255,0.1)"} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Transaction List */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden"
      >
        <div className="px-6 py-4 border-b border-white/10">
          <h3 className="text-lg font-bold text-white tracking-tight">Recent Payments</h3>
        </div>
        <div className="divide-y divide-white/5">
          {transactions.map((tx) => (
            <div key={tx.id} className="px-6 py-4 flex items-center justify-between group hover:bg-white/5 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                  <CreditCard className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <div>
                  <p className="text-sm font-medium text-white">{tx.recipient}</p>
                  <p className="text-xs text-muted-foreground">{tx.type}</p>
                </div>
              </div>
              <div className="flex items-center gap-12">
                <div className="text-right hidden md:block">
                  <p className="text-xs text-muted-foreground">Payment Date</p>
                  <p className="text-sm text-white font-mono">{tx.date}</p>
                </div>
                <div className="text-right w-24">
                  <p className="text-sm font-bold text-white font-mono">{tx.amount}</p>
                  <div className="flex items-center justify-end gap-1 mt-1">
                    {tx.status === "Paid" ? (
                      <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                    ) : (
                      <Clock className="w-3 h-3 text-amber-500" />
                    )}
                    <span className={cn(
                      "text-[10px] font-bold uppercase tracking-tighter",
                      tx.status === "Paid" ? "text-emerald-500" : "text-amber-500"
                    )}>
                      {tx.status}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
