"use client";

import React from "react";
import { Card, Text, Metric, BadgeDelta, Flex, AreaChart } from "@tremor/react";
import { cn } from "@/lib/utils";
import { Filter, Play, Pause, Square } from "lucide-react";

const mockCampaigns = [
  { id: "CMP-Q3-01", name: "Enterprise Retargeting", type: "Display", spend: "$ 45,000", roi: "310%", status: "Active" },
  { id: "CMP-Q3-02", name: "Cold Email Outreach", type: "Email", spend: "$ 2,500", roi: "850%", status: "Active" },
  { id: "CMP-Q3-03", name: "LinkedIn B2B Ads", type: "Social", spend: "$ 120,000", roi: "180%", status: "Active" },
  { id: "CMP-Q2-08", name: "Webinar: Future of AI", type: "Event", spend: "$ 15,000", roi: "420%", status: "Completed" },
  { id: "CMP-Q3-05", name: "Sponsor: TechConf 2026", type: "Sponsorship", spend: "$ 85,000", roi: "TBD", status: "Paused" },
];

const performanceData = [
  { date: "W1", Spend: 12000, Revenue: 28000 },
  { date: "W2", Spend: 15000, Revenue: 45000 },
  { date: "W3", Spend: 18000, Revenue: 52000 },
  { date: "W4", Spend: 16000, Revenue: 61000 },
  { date: "W5", Spend: 21000, Revenue: 85000 },
];

export default function CampaignsPage() {
  return (
    <div className="p-8 space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tighter uppercase leading-none">Campaigns</h1>
          <p className="text-muted-foreground mt-1 text-sm font-medium">Track marketing spend and ROI.</p>
        </div>
        <div className="flex items-center gap-2">
           <button className="p-2 border border-border rounded-md text-muted-foreground hover:bg-muted transition-colors">
             <Filter className="w-4 h-4" />
           </button>
           <button className={cn(
            "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none disabled:opacity-50",
            "bg-primary text-primary-foreground hover:opacity-90 h-10 px-4 py-2 gap-2"
          )}>
            Create Campaign
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-border bg-background shadow-sm rounded-md">
          <Flex alignItems="start">
            <div>
              <Text className="text-muted-foreground uppercase tracking-widest text-[10px] font-bold">Total Ad Spend</Text>
              <Metric className="text-foreground text-2xl font-black mt-1">$ 267,500</Metric>
            </div>
            <BadgeDelta deltaType="increase">+12.5%</BadgeDelta>
          </Flex>
        </Card>
        <Card className="border-border bg-background shadow-sm rounded-md">
          <Flex alignItems="start">
            <div>
              <Text className="text-muted-foreground uppercase tracking-widest text-[10px] font-bold">Average ROI</Text>
              <Metric className="text-foreground text-2xl font-black mt-1">345%</Metric>
            </div>
            <BadgeDelta deltaType="moderateIncrease">+2.1%</BadgeDelta>
          </Flex>
        </Card>
        <Card className="border-border bg-background shadow-sm rounded-md">
          <Flex alignItems="start">
            <div>
              <Text className="text-muted-foreground uppercase tracking-widest text-[10px] font-bold">Active Campaigns</Text>
              <Metric className="text-foreground text-2xl font-black mt-1">14</Metric>
            </div>
            <BadgeDelta deltaType="unchanged">0</BadgeDelta>
          </Flex>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="border-border bg-background shadow-sm rounded-md lg:col-span-3 flex flex-col">
          <div className="mb-4">
            <h3 className="font-semibold leading-none tracking-tight">Spend vs Revenue (MQLs)</h3>
            <p className="text-xs text-muted-foreground mt-1">Weekly performance for all active campaigns</p>
          </div>
          <div className="flex-1 min-h-[300px]">
             <AreaChart
              className="h-full w-full mt-4"
              data={performanceData}
              index="date"
              categories={["Spend", "Revenue"]}
              colors={["zinc", "emerald"]}
              showGridLines={false}
              showLegend={true}
            />
          </div>
        </Card>

        <div className="lg:col-span-3 rounded-md border border-border bg-background shadow-sm overflow-hidden">
          <div className="p-4 md:p-6 border-b border-border/50">
            <h3 className="font-semibold leading-none tracking-tight">All Campaigns</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-muted/50 border-b border-border text-xs font-medium text-muted-foreground uppercase tracking-widest">
                <tr>
                  <th className="px-6 py-4">Campaign Name</th>
                  <th className="px-6 py-4">Type</th>
                  <th className="px-6 py-4 text-right">Spend</th>
                  <th className="px-6 py-4 text-right">ROI</th>
                  <th className="px-6 py-4 text-center">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                {mockCampaigns.map((camp) => (
                  <tr key={camp.id} className="hover:bg-muted/20 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-bold text-foreground">{camp.name}</div>
                      <div className="text-[10px] text-muted-foreground font-mono">{camp.id}</div>
                    </td>
                    <td className="px-6 py-4">
                       <span className="text-xs border border-border px-2 py-1 rounded-sm text-muted-foreground font-medium bg-muted/30">
                        {camp.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right font-medium">{camp.spend}</td>
                    <td className="px-6 py-4 text-right font-black text-emerald-600 dark:text-emerald-500">{camp.roi}</td>
                    <td className="px-6 py-4 text-center">
                      <span className={cn(
                        "px-2 py-1 rounded-sm text-[10px] uppercase font-bold tracking-widest inline-block w-24 text-center",
                        camp.status === "Active" ? "bg-foreground text-background" :
                        camp.status === "Completed" ? "bg-muted text-foreground" : "bg-transparent border border-border text-muted-foreground"
                      )}>
                        {camp.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        {camp.status === "Active" ? (
                          <button className="text-muted-foreground hover:text-foreground transition-colors p-1" title="Pause">
                             <Pause className="w-4 h-4" />
                          </button>
                        ) : camp.status === "Paused" ? (
                          <button className="text-muted-foreground hover:text-foreground transition-colors p-1" title="Resume">
                             <Play className="w-4 h-4" />
                          </button>
                        ) : (
                          <button className="text-muted-foreground hover:text-foreground transition-colors p-1" title="Stop">
                             <Square className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}