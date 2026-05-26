"use client";

import { 
  LayoutDashboard, 
  Files, 
  Search, 
  Users, 
  Settings, 
  Bell, 
  Plus, 
  MoreHorizontal,
  Scale,
  ShieldCheck,
  Zap,
  Clock,
  ArrowUpRight,
  Filter
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const stats = [
  { label: "Active Matters", value: "124", change: "+12%", icon: Scale },
  { label: "AI Discovery Rate", value: "99.8%", change: "+0.2%", icon: Zap },
  { label: "Compliant Jurisdictions", value: "152", change: "Safe", icon: ShieldCheck },
  { label: "Avg. Resolution Time", value: "14d", change: "-4d", icon: Clock },
];

const matters = [
  { id: "LEX-204", title: "Global Antitrust v. TechCorp", status: "Active", priority: "High", date: "2h ago" },
  { id: "LEX-198", title: "Smith Estate Settlement", status: "Review", priority: "Medium", date: "5h ago" },
  { id: "LEX-182", title: "Project Phoenix IP Dispute", status: "Active", priority: "High", date: "Yesterday" },
  { id: "LEX-175", title: "Regulatory Compliance Audit", status: "Draft", priority: "Low", date: "2 days ago" },
];

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-black text-white flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/10 flex flex-col hidden md:flex">
        <div className="p-6">
          <Link href="/" className="flex items-center gap-2">
            <Scale className="size-6 text-white" />
            <span className="font-bold text-lg tracking-tight">Lexora<span className="text-zinc-500">Pro</span></span>
          </Link>
        </div>

        <nav className="flex-1 px-4 space-y-2">
          <NavItem icon={LayoutDashboard} label="Overview" active />
          <NavItem icon={Files} label="Matters" />
          <NavItem icon={Search} label="AI Discovery" />
          <NavItem icon={Users} label="Clients" />
          <NavItem icon={Settings} label="Settings" />
        </nav>

        <div className="p-4 mt-auto">
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
            <p className="text-xs font-bold text-zinc-500 uppercase mb-2">Storage</p>
            <div className="h-1.5 w-full bg-zinc-900 rounded-full overflow-hidden mb-2">
              <div className="h-full w-2/3 bg-white" />
            </div>
            <p className="text-xs text-zinc-400">6.4TB of 10TB used</p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="h-16 border-b border-white/10 flex items-center justify-between px-8 bg-black/50 backdrop-blur-md sticky top-0 z-10">
          <h2 className="font-bold">Overview</h2>
          <div className="flex items-center gap-4">
            <button className="p-2 rounded-lg hover:bg-white/5 text-zinc-400 transition-colors relative">
              <Bell className="size-5" />
              <span className="absolute top-2 right-2 size-2 bg-white rounded-full border border-black" />
            </button>
            <div className="h-8 w-px bg-white/10 mx-2" />
            <div className="flex items-center gap-3">
              <div className="size-8 rounded-full bg-zinc-800 border border-white/10" />
              <span className="text-sm font-medium">Alexander Wright</span>
            </div>
          </div>
        </header>

        {/* Dashboard Grid */}
        <div className="p-8 space-y-8 overflow-y-auto">
          {/* Top Actions */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight mb-1">Command Center</h1>
              <p className="text-zinc-500">Welcome back, Alexander. Here is what's happening today.</p>
            </div>
            <button className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-xl font-bold hover:bg-zinc-200 transition-all">
              <Plus className="size-4" />
              New Matter
            </button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, i) => (
              <div key={i} className="p-6 rounded-3xl border border-white/10 bg-white/5 hover:border-white/20 transition-colors">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-2 rounded-xl bg-white/5 border border-white/10">
                    <stat.icon className="size-5 text-white" />
                  </div>
                  <span className={cn(
                    "text-xs font-bold px-2 py-1 rounded-full",
                    stat.change.startsWith('+') ? "bg-emerald-500/10 text-emerald-500" : 
                    stat.change.startsWith('-') ? "bg-rose-500/10 text-rose-500" : "bg-zinc-500/10 text-zinc-500"
                  )}>
                    {stat.change}
                  </span>
                </div>
                <p className="text-zinc-500 text-sm font-medium">{stat.label}</p>
                <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
              </div>
            ))}
          </div>

          {/* Main Bento Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Active Matters */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold">Recent Matters</h3>
                <button className="text-sm text-zinc-500 hover:text-white flex items-center gap-1 transition-colors">
                  View All <ArrowUpRight className="size-3" />
                </button>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/5 overflow-hidden">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-white/5 text-xs font-bold text-zinc-500 uppercase tracking-wider">
                      <th className="px-6 py-4">ID</th>
                      <th className="px-6 py-4">Title</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4">Priority</th>
                      <th className="px-6 py-4"></th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    {matters.map((matter, i) => (
                      <tr key={i} className="border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-colors group">
                        <td className="px-6 py-4 font-mono text-zinc-500">{matter.id}</td>
                        <td className="px-6 py-4 font-bold">{matter.title}</td>
                        <td className="px-6 py-4">
                          <span className={cn(
                            "px-2 py-1 rounded-md text-[10px] font-bold uppercase",
                            matter.status === 'Active' ? "bg-white text-black" : "bg-zinc-800 text-zinc-400"
                          )}>
                            {matter.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                             <div className={cn(
                               "size-1.5 rounded-full",
                               matter.priority === 'High' ? "bg-rose-500" : 
                               matter.priority === 'Medium' ? "bg-amber-500" : "bg-zinc-500"
                             )} />
                             {matter.priority}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button className="p-2 rounded-lg hover:bg-white/10 text-zinc-500 opacity-0 group-hover:opacity-100 transition-all">
                            <MoreHorizontal className="size-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Sidebar Cards */}
            <div className="space-y-8">
              <div className="p-8 rounded-3xl border border-white/10 bg-gradient-to-b from-white/10 to-transparent">
                <h3 className="text-xl font-bold mb-2">Lexora AI</h3>
                <p className="text-zinc-400 text-sm mb-6 leading-relaxed">
                  I've analyzed 42 new filings in "Global Antitrust". Found 3 critical inconsistencies in Exhibit D.
                </p>
                <button className="w-full py-3 bg-zinc-900 border border-white/10 rounded-xl text-sm font-bold hover:bg-zinc-800 transition-colors">
                  Review Findings
                </button>
              </div>

              <div className="p-8 rounded-3xl border border-white/10 bg-white/5">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold">Upcoming</h3>
                  <div className="p-2 rounded-lg bg-white/5 border border-white/10">
                    <Filter className="size-4 text-zinc-500" />
                  </div>
                </div>
                <div className="space-y-6">
                  {[
                    { title: "Deposition: TechCorp CEO", time: "14:00 PM", type: "Virtual" },
                    { title: "Compliance Deadline", time: "Tomorrow", type: "Filing" }
                  ].map((item, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="w-1 bg-white rounded-full" />
                      <div>
                        <p className="font-bold text-sm">{item.title}</p>
                        <p className="text-xs text-zinc-500 mt-1">{item.time} • {item.type}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function NavItem({ icon: Icon, label, active = false }: { icon: any, label: string, active?: boolean }) {
  return (
    <button className={cn(
      "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all",
      active ? "bg-white text-black" : "text-zinc-400 hover:text-white hover:bg-white/5"
    )}>
      <Icon className="size-5" />
      {label}
    </button>
  );
}
