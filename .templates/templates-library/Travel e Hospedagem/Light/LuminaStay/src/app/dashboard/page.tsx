import { 
  LayoutDashboard, 
  Hotel, 
  Users, 
  BarChart3, 
  Settings, 
  LogOut,
  Bell,
  Search,
  TrendingUp,
  CreditCard,
  Calendar,
  MoreVertical
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function DashboardPage() {
  return (
    <div className="flex h-screen bg-secondary/20">
      {/* Sidebar */}
      <aside className="w-64 border-r border-border bg-background flex flex-col">
        <div className="p-6">
          <Link href="/" className="text-xl font-bold tracking-tighter">
            LUMINA<span className="text-muted-foreground">STAY</span>
          </Link>
        </div>
        
        <nav className="flex-grow p-4 space-y-2">
          <Link href="/dashboard" className="flex items-center space-x-3 px-3 py-2 rounded-lg bg-secondary text-primary font-medium">
            <LayoutDashboard className="size-5" />
            <span>Overview</span>
          </Link>
          <Link href="#" className="flex items-center space-x-3 px-3 py-2 rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground transition-all">
            <Hotel className="size-5" />
            <span>Properties</span>
          </Link>
          <Link href="#" className="flex items-center space-x-3 px-3 py-2 rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground transition-all">
            <Users className="size-5" />
            <span>Guests</span>
          </Link>
          <Link href="#" className="flex items-center space-x-3 px-3 py-2 rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground transition-all">
            <BarChart3 className="size-5" />
            <span>Analytics</span>
          </Link>
          <Link href="#" className="flex items-center space-x-3 px-3 py-2 rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground transition-all">
            <Settings className="size-5" />
            <span>Settings</span>
          </Link>
        </nav>

        <div className="p-4 border-t border-border">
          <Link href="/" className="flex items-center space-x-3 px-3 py-2 rounded-lg text-muted-foreground hover:bg-red-50 hover:text-red-600 transition-all">
            <LogOut className="size-5" />
            <span>Logout</span>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow overflow-y-auto">
        {/* Header */}
        <header className="h-16 border-b border-border bg-background flex items-center justify-between px-8 sticky top-0 z-20">
          <div className="flex items-center bg-secondary/50 rounded-lg px-3 py-1.5 w-96">
            <Search className="size-4 text-muted-foreground mr-2" />
            <input type="text" placeholder="Search properties or guests..." className="bg-transparent border-none outline-none text-sm w-full" />
          </div>
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-full hover:bg-secondary relative">
              <Bell className="size-5 text-muted-foreground" />
              <span className="absolute top-1.5 right-1.5 size-2 bg-red-500 rounded-full border-2 border-background" />
            </button>
            <div className="size-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xs font-bold">
              JD
            </div>
          </div>
        </header>

        <div className="p-8 space-y-8">
          <div className="flex justify-between items-end">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">System Overview</h1>
              <p className="text-muted-foreground">Real-time performance across all channels.</p>
            </div>
            <div className="flex space-x-3">
              <Button variant="outline" size="sm">Download Report</Button>
              <Button size="sm">Manage Inventory</Button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: "Total Revenue", value: "$128,430", change: "+12.5%", icon: CreditCard },
              { label: "Active Bookings", value: "1,240", change: "+5.2%", icon: Calendar },
              { label: "Average Daily Rate", value: "$342", change: "-2.1%", icon: TrendingUp },
              { label: "Guest Satisfaction", value: "4.82", change: "+0.4%", icon: Users },
            ].map((stat, i) => (
              <div key={i} className="p-6 rounded-2xl border border-border bg-background shadow-sm">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-2 rounded-lg bg-secondary">
                    <stat.icon className="size-5 text-primary" />
                  </div>
                  <span className={`text-xs font-bold ${stat.change.startsWith("+") ? "text-green-600" : "text-red-600"}`}>
                    {stat.change}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                <h3 className="text-2xl font-bold tracking-tight">{stat.value}</h3>
              </div>
            ))}
          </div>

          {/* Bento Grid Analytics */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Chart Card */}
            <div className="lg:col-span-2 p-6 rounded-3xl border border-border bg-background shadow-sm flex flex-col h-[400px]">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold">Revenue Distribution</h3>
                <MoreVertical className="size-5 text-muted-foreground cursor-pointer" />
              </div>
              <div className="flex-grow bg-secondary/30 rounded-xl flex items-end p-4 space-x-2">
                 {[40, 60, 45, 90, 65, 80, 50, 70, 85, 40, 55, 75].map((h, i) => (
                   <div key={i} className="flex-grow bg-primary/20 hover:bg-primary/40 transition-colors rounded-t-sm" style={{ height: `${h}%` }} />
                 ))}
              </div>
            </div>

            {/* Side Card: Inventory Status */}
            <div className="p-6 rounded-3xl border border-border bg-background shadow-sm flex flex-col h-[400px]">
              <h3 className="font-bold mb-6">Occupancy Status</h3>
              <div className="space-y-6">
                {[
                  { name: "Azure Resort & Spa", status: "82%", color: "bg-green-500" },
                  { name: "Lumina Boutique Hotel", status: "45%", color: "bg-orange-500" },
                  { name: "Grand Vista Suites", status: "94%", color: "bg-green-500" },
                  { name: "Oceanic Pavilions", status: "12%", color: "bg-red-500" },
                ].map((prop, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">{prop.name}</span>
                      <span className="text-muted-foreground">{prop.status}</span>
                    </div>
                    <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                      <div className={`h-full ${prop.color}`} style={{ width: prop.status }} />
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-auto pt-6 border-t border-border">
                <Button variant="ghost" className="w-full text-xs">View All Properties</Button>
              </div>
            </div>
          </div>

          {/* Recent Activity Table */}
          <div className="p-6 rounded-3xl border border-border bg-background shadow-sm overflow-hidden">
            <h3 className="font-bold mb-6">Recent Bookings</h3>
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-border text-muted-foreground uppercase text-[10px] tracking-widest">
                  <th className="pb-4 font-bold">Guest</th>
                  <th className="pb-4 font-bold">Property</th>
                  <th className="pb-4 font-bold">Check-in</th>
                  <th className="pb-4 font-bold">Amount</th>
                  <th className="pb-4 font-bold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                {[
                  { guest: "Sarah Jenkins", prop: "Azure Resort", date: "May 20, 2026", amt: "$1,240", status: "Confirmed" },
                  { guest: "Robert Wilson", prop: "Grand Vista", date: "May 18, 2026", amt: "$850", status: "Pending" },
                  { guest: "Elena Rodriguez", prop: "Lumina Boutique", date: "May 18, 2026", amt: "$2,100", status: "Confirmed" },
                  { guest: "Michael Chen", prop: "Oceanic Pavilions", date: "May 17, 2026", amt: "$450", status: "Cancelled" },
                ].map((row, i) => (
                  <tr key={i} className="group hover:bg-secondary/20 transition-colors">
                    <td className="py-4 font-medium">{row.guest}</td>
                    <td className="py-4 text-muted-foreground">{row.prop}</td>
                    <td className="py-4 text-muted-foreground">{row.date}</td>
                    <td className="py-4 font-medium">{row.amt}</td>
                    <td className="py-4">
                      <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${
                        row.status === "Confirmed" ? "bg-green-100 text-green-700" :
                        row.status === "Pending" ? "bg-orange-100 text-orange-700" : "bg-red-100 text-red-700"
                      }`}>
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
