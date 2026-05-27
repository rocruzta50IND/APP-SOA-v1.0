"use client";

import { 
  Search, 
  MoreVertical, 
  Mail, 
  Phone, 
  MapPin, 
  ExternalLink,
  Users,
  Star,
  ShieldCheck
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const customers = [
  { id: "CUST-001", name: "Alexander Vance", company: "Vance Global", email: "alex@vance.com", totalSpend: "$45,200.00", status: "VIP", tier: "Platinum" },
  { id: "CUST-002", name: "Elena Rossi", company: "Milano Tech", email: "elena@milanotech.it", totalSpend: "$12,800.00", status: "Active", tier: "Gold" },
  { id: "CUST-003", name: "Marcus Thorne", company: "Thorne Logistics", email: "marcus@thorne.co.uk", totalSpend: "$8,450.00", status: "Active", tier: "Silver" },
  { id: "CUST-004", name: "Sarah Chen", company: "Nexus Designs", email: "sarah@nexus.io", totalSpend: "$120,500.00", status: "VIP", tier: "Platinum" },
  { id: "CUST-005", name: "David Kim", company: "Seoul Solar", email: "david@seoulsolar.kr", totalSpend: "$3,100.00", status: "Inactive", tier: "Bronze" },
  { id: "CUST-006", name: "Olivia de Marco", company: "Marco Polo Co.", email: "olivia@marcopolo.com", totalSpend: "$22,900.00", status: "Active", tier: "Gold" },
];

export default function CustomersPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
            Customer Directory
          </h1>
          <p className="text-muted-foreground mt-1">Manage relationships and track high-ticket client value.</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 text-white rounded-xl gap-2 shadow-[0_0_20px_rgba(79,70,229,0.3)] transition-all">
          <Users className="h-4 w-4" />
          Add Customer
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-white/5 border-white/10 backdrop-blur-md overflow-hidden relative group">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-2xl bg-primary/20 border border-primary/30 flex items-center justify-center">
                <ShieldCheck className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">VIP Coverage</p>
                <p className="text-xl font-bold">12 Active VIPs</p>
              </div>
            </div>
          </CardContent>
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-3xl rounded-full -z-10 group-hover:bg-primary/10 transition-all" />
        </Card>
        <Card className="bg-white/5 border-white/10 backdrop-blur-md overflow-hidden relative group">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-2xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center">
                <Star className="h-6 w-6 text-amber-500" />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Client Retention</p>
                <p className="text-xl font-bold">98.4% Rate</p>
              </div>
            </div>
          </CardContent>
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 blur-3xl rounded-full -z-10 group-hover:bg-amber-500/10 transition-all" />
        </Card>
        <Card className="bg-white/5 border-white/10 backdrop-blur-md overflow-hidden relative group">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-2xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center">
                <Users className="h-6 w-6 text-indigo-500" />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">New Leads</p>
                <p className="text-xl font-bold">45 This Week</p>
              </div>
            </div>
          </CardContent>
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 blur-3xl rounded-full -z-10 group-hover:bg-indigo-500/10 transition-all" />
        </Card>
      </div>

      <Card className="bg-white/5 border-white/10 backdrop-blur-md">
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search customers..." className="pl-9 h-10 w-80 bg-white/5 border-white/10 text-xs rounded-xl" />
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="border-white/10 text-[10px] font-mono px-3 py-1">2,420 Total Clients</Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="relative w-full overflow-auto">
            <table className="w-full caption-bottom text-sm">
              <thead className="[&_tr]:border-b border-white/5">
                <tr className="border-b border-white/5">
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground text-[10px] uppercase tracking-widest">Client Name</th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground text-[10px] uppercase tracking-widest">Company</th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground text-[10px] uppercase tracking-widest">Email</th>
                  <th className="h-12 px-4 text-center align-middle font-medium text-muted-foreground text-[10px] uppercase tracking-widest">Tier</th>
                  <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground text-[10px] uppercase tracking-widest">Lifetime Value</th>
                  <th className="h-12 px-4 text-center align-middle font-medium text-muted-foreground text-[10px] uppercase tracking-widest">Status</th>
                  <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground text-[10px] uppercase tracking-widest"></th>
                </tr>
              </thead>
              <tbody className="[&_tr:last-child]:border-0">
                {customers.map((customer) => (
                  <tr key={customer.id} className="border-b border-white/5 transition-colors hover:bg-white/5 group">
                    <td className="p-4 align-middle">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-white/10 border border-white/10 flex items-center justify-center text-[10px] font-bold">
                          {customer.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <span className="font-medium">{customer.name}</span>
                      </div>
                    </td>
                    <td className="p-4 align-middle text-muted-foreground">{customer.company}</td>
                    <td className="p-4 align-middle text-xs font-mono">{customer.email}</td>
                    <td className="p-4 align-middle text-center">
                      <Badge className={cn(
                        "text-[10px] font-bold uppercase",
                        customer.tier === "Platinum" ? "bg-indigo-500/20 text-indigo-400 border-indigo-400/30" :
                        customer.tier === "Gold" ? "bg-amber-500/20 text-amber-400 border-amber-400/30" :
                        "bg-white/10 text-muted-foreground border-white/20"
                      )}>
                        {customer.tier}
                      </Badge>
                    </td>
                    <td className="p-4 align-middle text-right font-mono font-bold text-emerald-400">{customer.totalSpend}</td>
                    <td className="p-4 align-middle text-center">
                      <span className={cn(
                        "text-[10px] font-bold uppercase",
                        customer.status === "VIP" ? "text-primary" :
                        customer.status === "Active" ? "text-emerald-400" : "text-muted-foreground"
                      )}>
                        {customer.status}
                      </span>
                    </td>
                    <td className="p-4 align-middle text-right">
                      <button className="h-8 w-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:border-primary">
                        <MoreVertical className="h-3.5 w-3.5 text-muted-foreground group-hover:text-white" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
