"use client";

import React from "react";
import { 
  Megaphone, 
  Plus, 
  Play, 
  Pause, 
  BarChart, 
  Settings2,
  Users,
  MousePointer2,
  Eye,
  MoreHorizontal
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const campaigns = [
  {
    id: 1,
    title: "Summer Enterprise Drive",
    status: "Active",
    reach: "124,000",
    clicks: "12,430",
    ctr: "10.02%",
    color: "bg-blue-500",
  },
  {
    id: 2,
    title: "Q3 Retargeting Blitz",
    status: "Paused",
    reach: "45,200",
    clicks: "3,120",
    ctr: "6.9%",
    color: "bg-purple-500",
  },
  {
    id: 3,
    title: "AI Product Launch",
    status: "Active",
    reach: "250,000",
    clicks: "42,000",
    ctr: "16.8%",
    color: "bg-emerald-500",
  },
  {
    id: 4,
    title: "Executive Outreach",
    status: "Draft",
    reach: "0",
    clicks: "0",
    ctr: "0%",
    color: "bg-amber-500",
  },
  {
    id: 5,
    title: "Webinar Series 2024",
    status: "Active",
    reach: "18,500",
    clicks: "2,400",
    ctr: "12.9%",
    color: "bg-rose-500",
  },
];

export default function CampaignsPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
            Campaigns
          </h1>
          <p className="text-muted-foreground">
            Monitor and optimize your multi-channel marketing efforts.
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Create Campaign
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {campaigns.map((campaign, index) => (
          <motion.div
            key={campaign.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, type: "spring", stiffness: 400, damping: 30 }}
          >
            <Card className="h-full overflow-hidden group">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className={cn("h-10 w-10 rounded-xl flex items-center justify-center text-white shadow-lg", campaign.color)}>
                    <Megaphone className="h-5 w-5" />
                  </div>
                  <div className={cn(
                    "rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider",
                    campaign.status === "Active" ? "bg-emerald-500/10 text-emerald-500" :
                    campaign.status === "Paused" ? "bg-amber-500/10 text-amber-500" :
                    "bg-white/10 text-white"
                  )}>
                    {campaign.status}
                  </div>
                </div>
                <div className="mt-4">
                  <CardTitle className="text-lg">{campaign.title}</CardTitle>
                  <CardDescription>Multi-channel Engagement</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4 border-t border-white/5 pt-4">
                  <div className="space-y-1">
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Reach</p>
                    <p className="text-sm font-mono font-bold text-white">{campaign.reach}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Clicks</p>
                    <p className="text-sm font-mono font-bold text-white">{campaign.clicks}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground">CTR</p>
                    <p className="text-sm font-mono font-bold text-white">{campaign.ctr}</p>
                  </div>
                </div>
                
                <div className="mt-6 flex items-center gap-2">
                  <Button variant="outline" className="flex-1 h-9 text-xs gap-2">
                    <BarChart className="h-3.5 w-3.5" />
                    Analytics
                  </Button>
                  {campaign.status === "Active" ? (
                    <Button variant="outline" size="icon" className="h-9 w-9 rounded-lg">
                      <Pause className="h-3.5 w-3.5" />
                    </Button>
                  ) : (
                    <Button variant="outline" size="icon" className="h-9 w-9 rounded-lg">
                      <Play className="h-3.5 w-3.5" />
                    </Button>
                  )}
                  <Button variant="outline" size="icon" className="h-9 w-9 rounded-lg">
                    <Settings2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
        
        <Card className="border-dashed border-white/20 bg-transparent hover:bg-white/[0.02] transition-colors cursor-pointer group flex items-center justify-center min-h-[250px]">
          <div className="flex flex-col items-center gap-2">
            <div className="h-12 w-12 rounded-full border border-dashed border-white/30 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Plus className="h-6 w-6 text-muted-foreground" />
            </div>
            <p className="text-sm font-medium text-muted-foreground">New Campaign Template</p>
          </div>
        </Card>
      </div>
    </div>
  );
}
