"use client";

import { DashboardShell } from "@/components/ui/DashboardShell";
import { 
  CreditCard, 
  ArrowUpRight, 
  ArrowDownRight, 
  Download,
  Calendar,
  DollarSign,
  TrendingUp,
  History
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
import { cn } from "@/lib/utils";

const payrollStats = [
  { name: "Total Payroll (Monthly)", value: "$1.2M", change: "+4.2%", trending: "up" },
  { name: "Avg. Salary", value: "$124,500", change: "+1.5%", trending: "up" },
  { name: "Next Payout", value: "Jun 30", change: "5 days", trending: "none" },
  { name: "Pending Invoices", value: "12", change: "$42,000", trending: "down" },
];

const distributionData = [
  { name: "Engineering", value: 450000, color: "#6366f1" },
  { name: "Product", value: 280000, color: "#8b5cf6" },
  { name: "Marketing", value: 180000, color: "#ec4899" },
  { name: "Sales", value: 210000, color: "#f43f5e" },
  { name: "HR", value: 80000, color: "#f59e0b" },
];

const recentPayments = [
  { id: "PAY-9283", recipient: "Marcus Wright", amount: "$15,400.00", date: "Jun 15, 2026", status: "Completed" },
  { id: "PAY-9284", recipient: "Jessica Alba", amount: "$12,800.00", date: "Jun 15, 2026", status: "Completed" },
  { id: "PAY-9285", recipient: "Robert Downey", amount: "$14,200.00", date: "Jun 15, 2026", status: "Pending" },
  { id: "PAY-9286", recipient: "Scarlett Joh", amount: "$11,900.00", date: "Jun 14, 2026", status: "Completed" },
  { id: "PAY-9287", recipient: "Chris Evans", amount: "$9,500.00", date: "Jun 14, 2026", status: "Failed" },
];

export default function PayrollPage() {
  return (
    <DashboardShell>
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
              Financial & Payroll
            </h1>
            <p className="text-muted-foreground mt-1">Monitor salary distribution and payment history.</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm font-medium hover:bg-white/10 transition-colors flex items-center gap-2">
              <History className="h-4 w-4" />
              History
            </button>
            <button className="bg-primary text-white rounded-xl px-4 py-2 text-sm font-medium hover:bg-primary/90 shadow-[0_0_20px_rgba(79,70,229,0.3)] transition-all flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              Process Payroll
            </button>
          </div>
        </div>

        {/* Financial Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {payrollStats.map((stat) => (
            <div key={stat.name} className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl hover:border-white/20 transition-all group">
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold mb-1">{stat.name}</p>
              <div className="flex items-end justify-between">
                <h3 className="text-2xl font-black tracking-tighter text-white font-mono">{stat.value}</h3>
                <div className={cn(
                  "flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full border",
                  stat.trending === "up" ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" : 
                  stat.trending === "down" ? "bg-red-500/10 text-red-400 border-red-500/20" :
                  "bg-white/5 text-muted-foreground border-white/10"
                )}>
                  {stat.change}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Chart */}
          <div className="lg:col-span-2 bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl">
            <h3 className="text-lg font-semibold text-white mb-6">Budget Distribution</h3>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={distributionData} layout="vertical" margin={{ left: 40, right: 40 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#ffffff10" />
                  <XAxis type="number" hide />
                  <YAxis 
                    dataKey="name" 
                    type="category" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#94a3b8', fontSize: 12 }}
                  />
                  <Tooltip 
                    cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                    contentStyle={{ 
                      backgroundColor: '#1e1b4b', 
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '12px',
                      color: '#fff'
                    }} 
                  />
                  <Bar dataKey="value" radius={[0, 8, 8, 0]} barSize={32}>
                    {distributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} fillOpacity={0.8} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Recent Payments */}
          <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl">
            <h3 className="text-lg font-semibold text-white mb-6">Recent Transactions</h3>
            <div className="space-y-4">
              {recentPayments.map((payment) => (
                <div key={payment.id} className="p-3 rounded-xl border border-white/5 hover:bg-white/5 transition-colors group">
                  <div className="flex justify-between items-start mb-1">
                    <p className="text-sm font-bold text-white group-hover:text-primary transition-colors">{payment.recipient}</p>
                    <p className="text-xs font-mono font-bold text-white">{payment.amount}</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">{payment.id}</p>
                    <span className={cn(
                      "text-[9px] font-black uppercase tracking-tighter px-1.5 py-0.5 rounded",
                      payment.status === "Completed" ? "bg-emerald-500/20 text-emerald-400" :
                      payment.status === "Pending" ? "bg-yellow-500/20 text-yellow-400" :
                      "bg-red-500/20 text-red-400"
                    )}>
                      {payment.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-6 py-2.5 rounded-xl border border-white/10 text-xs font-bold hover:bg-white/5 transition-colors">
              Download All Invoices
            </button>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
