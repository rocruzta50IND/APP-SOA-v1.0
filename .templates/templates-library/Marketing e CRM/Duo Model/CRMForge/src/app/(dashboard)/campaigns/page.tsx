"use client";

import { motion } from "framer-motion";
import { Playfair_Display, Inter } from "next/font/google";
import { Plus, BarChart2, Calendar, Target } from "lucide-react";
import { cn } from "@/lib/utils";

const playfair = Playfair_Display({ subsets: ["latin"] });
const inter = Inter({ subsets: ["latin"] });

const mockCampaigns = [
  { 
    id: "C-101", 
    title: "Q4 High-Yield Asset Push", 
    description: "Targeted outreach to existing Tier 1 clients for new real estate trust opportunities.",
    budget: "$120,000",
    spent: "$45,200",
    conversions: 14,
    status: "Active"
  },
  { 
    id: "C-102", 
    title: "Private Wealth Summit 2026", 
    description: "Event marketing and exclusive invitations for our annual wealth management retreat in Geneva.",
    budget: "$350,000",
    spent: "$310,000",
    conversions: 215,
    status: "Concluding"
  },
  { 
    id: "C-103", 
    title: "Global Equities Newsletter", 
    description: "Bi-weekly editorial piece distributed to our global lead pool to nurture engagement.",
    budget: "$25,000",
    spent: "$12,400",
    conversions: 89,
    status: "Active"
  },
  { 
    id: "C-104", 
    title: "Aviation Partners Onboarding", 
    description: "B2B partnership acquisition campaign targeting private jet charter services.",
    budget: "$80,000",
    spent: "$0",
    conversions: 0,
    status: "Draft"
  },
  { 
    id: "C-105", 
    title: "Legacy Preservation Seminars", 
    description: "Webinar series for families focusing on generational wealth transfer and tax strategies.",
    budget: "$60,000",
    spent: "$60,000",
    conversions: 312,
    status: "Completed"
  }
];

const transitionPhysics = { duration: 1.2, ease: [0.16, 1, 0.3, 1] };

export default function CampaignsPage() {
  return (
    <div className="p-12 md:p-24 max-w-7xl mx-auto w-full">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={transitionPhysics}
        className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8"
      >
        <div>
          <div className={cn(inter.className, "text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground mb-4")}>
            Marketing Module
          </div>
          <h1 className={cn(playfair.className, "text-6xl md:text-8xl font-bold tracking-tighter leading-none text-foreground")}>
            Active<br/>Campaigns.
          </h1>
        </div>
        <button className="inline-flex items-center justify-center transition-all duration-500 bg-foreground text-background hover:opacity-80 px-8 py-4 text-sm font-medium tracking-widest uppercase gap-3 active:scale-95 shrink-0">
          <Plus className="w-4 h-4" strokeWidth={1.5} />
          <span>New Campaign</span>
        </button>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {mockCampaigns.map((campaign, index) => (
          <motion.div
            key={campaign.id}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...transitionPhysics, delay: 0.1 + index * 0.1 }}
            className="group relative overflow-hidden border border-border/50 bg-background p-10 flex flex-col justify-between hover:border-foreground transition-all duration-700 ease-out min-h-[400px]"
          >
            <div>
              <div className="flex justify-between items-start mb-8">
                <span className={cn(inter.className, "text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground")}>
                  {campaign.id}
                </span>
                <span className={cn(
                  "text-[10px] font-bold uppercase tracking-[0.2em] px-3 py-1 border",
                  campaign.status === "Active" ? "border-primary text-primary" : 
                  campaign.status === "Completed" ? "border-muted-foreground text-muted-foreground" : "border-border/50 text-foreground"
                )}>
                  {campaign.status}
                </span>
              </div>
              <h3 className={cn(playfair.className, "text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-4 leading-tight group-hover:translate-x-2 transition-transform duration-500")}>
                {campaign.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed text-sm md:text-base mb-8 max-w-md">
                {campaign.description}
              </p>
            </div>
            
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-border/50">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Target className="w-3 h-3 text-muted-foreground" />
                  <span className={cn(inter.className, "text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground")}>Budget</span>
                </div>
                <div className="font-serif text-xl tracking-tight">{campaign.budget}</div>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <BarChart2 className="w-3 h-3 text-muted-foreground" />
                  <span className={cn(inter.className, "text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground")}>Spent</span>
                </div>
                <div className="font-serif text-xl tracking-tight">{campaign.spent}</div>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="w-3 h-3 text-muted-foreground" />
                  <span className={cn(inter.className, "text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground")}>Conv.</span>
                </div>
                <div className="font-serif text-xl tracking-tight">{campaign.conversions}</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
