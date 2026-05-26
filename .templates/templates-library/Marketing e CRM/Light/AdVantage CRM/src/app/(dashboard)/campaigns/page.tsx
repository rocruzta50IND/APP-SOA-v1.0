"use client";

import { MoreHorizontal, Plus, Search, Filter } from "lucide-react";
import { cn } from "@/lib/utils";

const campaigns = [
  {
    id: "CAM-001",
    name: "Q4 Enterprise Outreach",
    status: "Active",
    reach: "12,400",
    conversions: "3.2%",
    budget: "$15,000",
    date: "Dec 12, 2023",
  },
  {
    id: "CAM-002",
    name: "Product Hunt Launch",
    status: "Completed",
    reach: "45,000",
    conversions: "8.5%",
    budget: "$2,500",
    date: "Nov 28, 2023",
  },
  {
    id: "CAM-003",
    name: "Newsletter Weekly - Nov",
    status: "Active",
    reach: "8,200",
    conversions: "1.8%",
    budget: "$500",
    date: "Nov 15, 2023",
  },
  {
    id: "CAM-004",
    name: "Retargeting Ads - Tier 1",
    status: "Paused",
    reach: "3,100",
    conversions: "12.2%",
    budget: "$8,000",
    date: "Oct 20, 2023",
  },
  {
    id: "CAM-005",
    name: "B2B LinkedIn Automation",
    status: "Active",
    reach: "1,200",
    conversions: "4.5%",
    budget: "$1,200",
    date: "Oct 05, 2023",
  },
];

export default function CampaignsPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Campaigns</h1>
          <p className="text-muted-foreground text-sm">Manage and monitor your marketing efforts.</p>
        </div>
        <button className="flex items-center gap-2 bg-black text-white px-4 py-2 text-sm font-medium hover:bg-black/90 transition-colors">
          <Plus className="w-4 h-4" />
          Create Campaign
        </button>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Filter campaigns..."
            className="w-full bg-white border border-border/50 rounded-none py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-black transition-all"
          />
        </div>
        <button className="flex items-center gap-2 border border-border/50 px-4 py-2 text-sm font-medium hover:bg-muted transition-colors">
          <Filter className="w-4 h-4" />
          Filter
        </button>
      </div>

      <div className="border border-border/50 bg-white overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-border/50 bg-muted/30">
              <th className="px-6 py-4 text-[10px] uppercase tracking-widest font-bold text-muted-foreground">ID</th>
              <th className="px-6 py-4 text-[10px] uppercase tracking-widest font-bold text-muted-foreground">Campaign Name</th>
              <th className="px-6 py-4 text-[10px] uppercase tracking-widest font-bold text-muted-foreground">Status</th>
              <th className="px-6 py-4 text-[10px] uppercase tracking-widest font-bold text-muted-foreground">Reach</th>
              <th className="px-6 py-4 text-[10px] uppercase tracking-widest font-bold text-muted-foreground">Conversion</th>
              <th className="px-6 py-4 text-[10px] uppercase tracking-widest font-bold text-muted-foreground">Budget</th>
              <th className="px-6 py-4 text-[10px] uppercase tracking-widest font-bold text-muted-foreground"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/50">
            {campaigns.map((campaign) => (
              <tr key={campaign.id} className="hover:bg-muted/30 transition-colors group">
                <td className="px-6 py-4 text-xs font-mono text-muted-foreground">{campaign.id}</td>
                <td className="px-6 py-4">
                  <div className="text-sm font-bold">{campaign.name}</div>
                  <div className="text-[10px] text-muted-foreground uppercase tracking-wider">{campaign.date}</div>
                </td>
                <td className="px-6 py-4">
                  <span className={cn(
                    "inline-flex items-center px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest",
                    campaign.status === "Active" ? "bg-emerald-100 text-emerald-700" :
                    campaign.status === "Completed" ? "bg-blue-100 text-blue-700" :
                    "bg-amber-100 text-amber-700"
                  )}>
                    {campaign.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm font-medium">{campaign.reach}</td>
                <td className="px-6 py-4 text-sm font-medium text-emerald-600">{campaign.conversions}</td>
                <td className="px-6 py-4 text-sm font-medium">{campaign.budget}</td>
                <td className="px-6 py-4 text-right">
                  <button className="p-1 hover:bg-muted rounded text-muted-foreground hover:text-foreground">
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
