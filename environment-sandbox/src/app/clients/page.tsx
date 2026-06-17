"use client";

import React from "react";
import { Card, Text, Metric, BadgeDelta, Flex, BarChart } from "@tremor/react";
import { cn } from "@/lib/utils";
import { Search, Download, ExternalLink } from "lucide-react";

const mockClients = [
  { id: "C-101", name: "Acme Corp", arr: "$ 120,000", plan: "Enterprise", status: "Active", lastContact: "2 days ago" },
  { id: "C-102", name: "Stark Industries", arr: "$ 450,000", plan: "Custom", status: "Active", lastContact: "5 hours ago" },
  { id: "C-103", name: "Globex", arr: "$ 85,000", plan: "Pro", status: "At Risk", lastContact: "1 week ago" },
  { id: "C-104", name: "Soylent Corp", arr: "$ 210,000", plan: "Enterprise", status: "Active", lastContact: "Yesterday" },
  { id: "C-105", name: "Wayne Ent.", arr: "$ 890,000", plan: "Custom", status: "Active", lastContact: "Today" },
];

const arrData = [
  { segment: "Enterprise", value: 4500000 },
  { segment: "Custom", value: 3200000 },
  { segment: "Pro", value: 1100000 },
  { segment: "Starter", value: 350000 },
];

export default function ClientsPage() {
  return (
    <div className="p-8 space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tighter uppercase leading-none">Client Accounts</h1>
          <p className="text-muted-foreground mt-1 text-sm font-medium">Manage enterprise contracts and ARR.</p>
        </div>
        <div className="flex items-center gap-2">
           <button className="p-2 border border-border rounded-md text-muted-foreground hover:bg-muted transition-colors">
             <Download className="w-4 h-4" />
           </button>
           <button className={cn(
            "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none disabled:opacity-50",
            "bg-primary text-primary-foreground hover:opacity-90 h-10 px-4 py-2"
          )}>
            New Account
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-border bg-background shadow-sm rounded-md">
          <Flex alignItems="start">
            <div>
              <Text className="text-muted-foreground uppercase tracking-widest text-[10px] font-bold">Total ARR</Text>
              <Metric className="text-foreground text-2xl font-black mt-1">$ 9.15M</Metric>
            </div>
            <BadgeDelta deltaType="increase">+18.2%</BadgeDelta>
          </Flex>
        </Card>
        <Card className="border-border bg-background shadow-sm rounded-md">
          <Flex alignItems="start">
            <div>
              <Text className="text-muted-foreground uppercase tracking-widest text-[10px] font-bold">Active Clients</Text>
              <Metric className="text-foreground text-2xl font-black mt-1">284</Metric>
            </div>
            <BadgeDelta deltaType="moderateIncrease">+4.1%</BadgeDelta>
          </Flex>
        </Card>
        <Card className="border-border bg-background shadow-sm rounded-md">
          <Flex alignItems="start">
            <div>
              <Text className="text-muted-foreground uppercase tracking-widest text-[10px] font-bold">Churn Rate</Text>
              <Metric className="text-foreground text-2xl font-black mt-1">1.2%</Metric>
            </div>
            <BadgeDelta deltaType="decrease">-0.4%</BadgeDelta>
          </Flex>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
         <Card className="border-border bg-background shadow-sm rounded-md lg:col-span-1 flex flex-col">
            <h3 className="font-semibold leading-none tracking-tight mb-6">ARR by Segment</h3>
            <div className="flex-1 min-h-[250px]">
              <BarChart
                className="h-full"
                data={arrData}
                index="segment"
                categories={["value"]}
                colors={["zinc"]}
                showGridLines={false}
                showLegend={false}
                layout="vertical"
              />
            </div>
         </Card>

        <div className="lg:col-span-3 rounded-md border border-border bg-background shadow-sm overflow-hidden flex flex-col">
          <div className="p-4 border-b border-border/50 flex flex-col sm:flex-row gap-4 justify-between items-center">
            <h3 className="font-semibold leading-none tracking-tight">Enterprise Roster</h3>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search clients..."
                className="h-9 w-full sm:w-64 rounded-md border border-border bg-transparent px-9 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
          </div>
          <div className="overflow-x-auto flex-1">
            <table className="w-full text-sm text-left">
              <thead className="bg-muted/50 border-b border-border text-xs font-medium text-muted-foreground uppercase tracking-widest">
                <tr>
                  <th className="px-6 py-4">Client</th>
                  <th className="px-6 py-4">ARR</th>
                  <th className="px-6 py-4">Plan</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Last Contact</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                {mockClients.map((client) => (
                  <tr key={client.id} className="hover:bg-muted/20 transition-colors cursor-pointer group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                         <div className="font-bold text-foreground group-hover:underline">{client.name}</div>
                         <ExternalLink className="w-3 h-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <div className="text-[10px] text-muted-foreground font-mono mt-0.5">{client.id}</div>
                    </td>
                    <td className="px-6 py-4 font-black tracking-tight">{client.arr}</td>
                    <td className="px-6 py-4">
                      <span className="text-xs border border-border px-2 py-1 rounded-sm text-muted-foreground font-medium bg-muted/30">
                        {client.plan}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5">
                        <div className={cn(
                          "w-2 h-2 rounded-full",
                          client.status === "Active" ? "bg-foreground" : "bg-red-500"
                        )} />
                        <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{client.status}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right text-xs font-medium text-muted-foreground">
                      {client.lastContact}
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