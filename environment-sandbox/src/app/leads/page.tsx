"use client";

import React from "react";
import { Card, Text, Metric, BadgeDelta, Flex, AreaChart } from "@tremor/react";
import { cn } from "@/lib/utils";
import { MoreHorizontal, Plus } from "lucide-react";

const mockLeads = [
  { id: "L-001", name: "Alice Vanderbilt", company: "Acme Corp", email: "alice@acme.com", score: 92, status: "Hot", date: "2026-06-10" },
  { id: "L-002", name: "Robert Chase", company: "Stark Industries", email: "robert@stark.com", score: 45, status: "Cold", date: "2026-06-09" },
  { id: "L-003", name: "Sarah Jenkins", company: "Globex", email: "sarah@globex.com", score: 78, status: "Warm", date: "2026-06-08" },
  { id: "L-004", name: "Michael Chang", company: "Soylent Corp", email: "m.chang@soylent.com", score: 88, status: "Hot", date: "2026-06-07" },
  { id: "L-005", name: "Diana Prince", company: "Wayne Ent.", email: "diana@wayne.com", score: 95, status: "Hot", date: "2026-06-06" },
];

const chartData = [
  { date: "Jan", Leads: 120, Qualified: 80 },
  { date: "Feb", Leads: 150, Qualified: 95 },
  { date: "Mar", Leads: 180, Qualified: 120 },
  { date: "Apr", Leads: 220, Qualified: 140 },
  { date: "May", Leads: 250, Qualified: 170 },
  { date: "Jun", Leads: 280, Qualified: 210 },
];

export default function LeadsPage() {
  return (
    <div className="p-8 space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tighter uppercase leading-none">Lead Intelligence</h1>
          <p className="text-muted-foreground mt-1 text-sm font-medium">Manage and score incoming prospects.</p>
        </div>
        <button className={cn(
          "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none disabled:opacity-50",
          "bg-primary text-primary-foreground hover:opacity-90 h-10 px-4 py-2 gap-2"
        )}>
          <Plus className="w-4 h-4" />
          Add Lead
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-border bg-background shadow-sm rounded-md">
          <Flex alignItems="start">
            <div>
              <Text className="text-muted-foreground uppercase tracking-widest text-[10px] font-bold">Total Leads</Text>
              <Metric className="text-foreground text-2xl font-black mt-1">1,200</Metric>
            </div>
            <BadgeDelta deltaType="moderateIncrease">+12.5%</BadgeDelta>
          </Flex>
        </Card>
        <Card className="border-border bg-background shadow-sm rounded-md">
          <Flex alignItems="start">
            <div>
              <Text className="text-muted-foreground uppercase tracking-widest text-[10px] font-bold">Qualified Leads</Text>
              <Metric className="text-foreground text-2xl font-black mt-1">815</Metric>
            </div>
            <BadgeDelta deltaType="increase">+24.1%</BadgeDelta>
          </Flex>
        </Card>
        <Card className="border-border bg-background shadow-sm rounded-md">
          <Flex alignItems="start">
            <div>
              <Text className="text-muted-foreground uppercase tracking-widest text-[10px] font-bold">Avg Lead Score</Text>
              <Metric className="text-foreground text-2xl font-black mt-1">79.8</Metric>
            </div>
            <BadgeDelta deltaType="increase">+3.2 pts</BadgeDelta>
          </Flex>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 rounded-md border border-border bg-background shadow-sm overflow-hidden">
          <div className="p-4 md:p-6 border-b border-border/50">
            <h3 className="font-semibold leading-none tracking-tight">Active Prospects</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-muted/50 border-b border-border text-xs font-medium text-muted-foreground uppercase tracking-widest">
                <tr>
                  <th className="px-6 py-4">Lead</th>
                  <th className="px-6 py-4">Company</th>
                  <th className="px-6 py-4 text-center">Score</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                {mockLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-muted/20 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-bold text-foreground">{lead.name}</div>
                      <div className="text-[10px] text-muted-foreground">{lead.email}</div>
                    </td>
                    <td className="px-6 py-4 font-medium">{lead.company}</td>
                    <td className="px-6 py-4 text-center">
                      <div className={cn(
                        "inline-flex w-8 h-8 rounded-full items-center justify-center font-bold text-xs",
                        lead.score >= 90 ? "bg-primary text-primary-foreground" :
                        lead.score >= 70 ? "bg-muted text-foreground border border-border" : "bg-transparent text-muted-foreground border border-dashed border-border"
                      )}>
                        {lead.score}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={cn(
                        "px-2 py-1 rounded-sm text-[10px] uppercase font-bold tracking-widest",
                        lead.status === "Hot" ? "bg-foreground text-background" :
                        lead.status === "Warm" ? "bg-muted text-foreground" : "bg-transparent border border-border text-muted-foreground"
                      )}>
                        {lead.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-muted-foreground hover:text-foreground transition-colors p-1">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        <Card className="border-border bg-background shadow-sm rounded-md h-full flex flex-col">
          <div className="mb-4">
            <h3 className="font-semibold leading-none tracking-tight">Lead Volume</h3>
            <p className="text-xs text-muted-foreground mt-1">Growth over last 6 months</p>
          </div>
          <div className="flex-1 flex items-end min-h-[250px]">
             <AreaChart
              className="h-full w-full mt-4"
              data={chartData}
              index="date"
              categories={["Leads", "Qualified"]}
              colors={["zinc", "slate"]}
              showGridLines={false}
              showLegend={true}
            />
          </div>
        </Card>
      </div>
    </div>
  );
}