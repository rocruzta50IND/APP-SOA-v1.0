"use client";

import { Sidebar } from "@/components/ui/Sidebar";
import { Header } from "@/components/ui/Header";
import { 
  CreditCard, 
  ArrowUpRight, 
  ArrowDownLeft, 
  Calendar,
  Download,
  Filter,
  Search,
  CheckCircle2,
  Clock,
  AlertCircle
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
import { cn } from "@/lib/utils";

const payrollData = [
  { month: "Jan", amount: 245000 },
  { month: "Feb", amount: 252000 },
  { month: "Mar", amount: 248000 },
  { month: "Apr", amount: 261000 },
  { month: "May", amount: 255000 },
  { month: "Jun", amount: 275000 },
];

const transactions = [
  { id: "TX-9021", employee: "Sarah Jenkins", amount: "$8,450.00", date: "Jun 24, 2026", status: "Completed", type: "Salary" },
  { id: "TX-9022", employee: "Michael Chen", amount: "$9,200.00", date: "Jun 24, 2026", status: "Completed", type: "Salary" },
  { id: "TX-9023", employee: "Elena Rodriguez", amount: "$7,800.00", date: "Jun 24, 2026", status: "Pending", type: "Salary" },
  { id: "TX-9024", employee: "David Kim", amount: "$6,500.00", date: "Jun 24, 2026", status: "Completed", type: "Salary" },
  { id: "TX-9025", employee: "Lisa Thompson", amount: "$8,900.00", date: "Jun 24, 2026", status: "Failed", type: "Bonus" },
];

export default function PayrollPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Sidebar />
      <Header />
      
      <main className="pl-64 pt-16">
        <div className="p-8 space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
                Payroll Management
              </h1>
              <p className="text-muted-foreground mt-1">Manage employee compensation, taxes, and payment schedules.</p>
            </div>
            <div className="flex items-center space-x-3">
              <button className="flex items-center space-x-2 bg-white/5 border border-white/10 text-white hover:bg-white/10 rounded-xl px-4 py-2.5 font-medium transition-all">
                <Download className="h-4 w-4" />
                <span>Export PDF</span>
              </button>
              <button className="flex items-center space-x-2 bg-primary text-white hover:bg-primary/90 shadow-[0_0_20px_rgba(79,70,229,0.3)] rounded-xl px-5 py-2.5 font-medium transition-all">
                <CreditCard className="h-4 w-4" />
                <span>Run Payroll</span>
              </button>
            </div>
          </div>

          {/* Payroll Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { label: "Total Payroll (MTD)", value: "$275,000", trend: "+8.2%", icon: CreditCard, color: "text-blue-400" },
              { label: "Avg. Salary", value: "$6,420", trend: "+1.5%", icon: ArrowUpRight, color: "text-emerald-400" },
              { label: "Tax Withholding", value: "$84,200", trend: "+4.1%", icon: ArrowDownLeft, color: "text-rose-400" },
              { label: "Next Payout", value: "Jun 30", trend: "4 Days", icon: Calendar, color: "text-amber-400" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-5"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2 rounded-lg bg-white/5 border border-white/10">
                    <stat.icon className={cn("h-4 w-4", stat.color)} />
                  </div>
                  <span className={cn(
                    "text-[10px] font-bold px-1.5 py-0.5 rounded bg-white/5 border border-white/10",
                    stat.trend.startsWith('+') ? "text-emerald-400" : "text-amber-400"
                  )}>
                    {stat.trend}
                  </span>
                </div>
                <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-semibold">{stat.label}</p>
                <p className="text-xl font-bold font-mono text-white mt-1">{stat.value}</p>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Payroll History Chart */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="lg:col-span-2 bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8"
            >
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-xl font-bold text-white tracking-tight">Payroll History</h3>
                  <p className="text-sm text-muted-foreground">Total disbursement over the last 6 months</p>
                </div>
                <select className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white outline-none focus:border-primary/50 transition-all">
                  <option>Year 2026</option>
                  <option>Year 2025</option>
                </select>
              </div>

              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={payrollData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ffffff10" />
                    <XAxis 
                      dataKey="month" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} 
                    />
                    <YAxis 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                      tickFormatter={(value: any) => `$${value/1000}k`}
                    />
                    <Tooltip 
                      cursor={{ fill: 'rgba(255, 255, 255, 0.05)' }}
                      contentStyle={{ 
                        backgroundColor: 'rgba(9, 9, 11, 0.9)', 
                        borderColor: 'rgba(255, 255, 255, 0.1)',
                        borderRadius: '12px',
                        backdropFilter: 'blur(8px)'
                      }}
                      formatter={(value: any) => [`$${value?.toLocaleString() ?? '0'}`, "Amount"]}
                    />
                    <Bar dataKey="amount" radius={[6, 6, 0, 0]}>
                      {payrollData.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={index === payrollData.length - 1 ? "hsl(var(--primary))" : "rgba(255, 255, 255, 0.1)"} 
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            {/* Recent Payments */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8"
            >
              <h3 className="text-xl font-bold text-white tracking-tight mb-6">Recent Payments</h3>
              <div className="space-y-5">
                {transactions.map((tx) => (
                  <div key={tx.id} className="flex items-center justify-between group">
                    <div className="flex items-center space-x-3">
                      <div className={cn(
                        "h-8 w-8 rounded-lg flex items-center justify-center border",
                        tx.status === "Completed" ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" :
                        tx.status === "Pending" ? "bg-amber-500/10 border-amber-500/20 text-amber-400" :
                        "bg-rose-500/10 border-rose-500/20 text-rose-400"
                      )}>
                        {tx.status === "Completed" ? <CheckCircle2 className="h-4 w-4" /> : 
                         tx.status === "Pending" ? <Clock className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-white group-hover:text-primary transition-colors">{tx.employee}</p>
                        <p className="text-[10px] text-muted-foreground">{tx.date} • {tx.type}</p>
                      </div>
                    </div>
                    <p className="text-sm font-bold font-mono text-white">{tx.amount}</p>
                  </div>
                ))}
              </div>
              <button className="w-full mt-8 py-2.5 rounded-xl border border-white/10 bg-white/5 text-sm font-medium text-white hover:bg-white/10 transition-all">
                View All Transactions
              </button>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
}
