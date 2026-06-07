"use client";

import { cn } from "@/lib/utils";
import { Mail, Phone, MoreHorizontal, Search, Filter, Plus, Shield, User as UserIcon } from "lucide-react";

const teamMembers = [
  { id: 1, name: "Eleanor Pena", role: "Product Manager", department: "Product", email: "eleanor@fluxboard.com", status: "Online", avatar: "EP" },
  { id: 2, name: "Wade Warren", role: "Lead Engineer", department: "Engineering", email: "wade@fluxboard.com", status: "In a meeting", avatar: "WW" },
  { id: 3, name: "Brooklyn Simmons", role: "Senior Designer", department: "Design", email: "brooklyn@fluxboard.com", status: "Offline", avatar: "BS" },
  { id: 4, name: "Guy Hawkins", role: "Frontend Developer", department: "Engineering", email: "guy@fluxboard.com", status: "Online", avatar: "GH" },
  { id: 5, name: "Darrell Steward", role: "Backend Developer", department: "Engineering", email: "darrell@fluxboard.com", status: "Online", avatar: "DS" },
  { id: 6, name: "Bessie Cooper", role: "QA Engineer", department: "Engineering", email: "bessie@fluxboard.com", status: "Away", avatar: "BC" },
  { id: 7, name: "Courtney Henry", role: "Marketing Lead", department: "Marketing", email: "courtney@fluxboard.com", status: "Offline", avatar: "CH" },
  { id: 8, name: "Jerome Bell", role: "Data Scientist", department: "Data", email: "jerome@fluxboard.com", status: "Online", avatar: "JB" },
];

export default function TeamPage() {
  return (
    <div className="p-6 max-w-[1200px] mx-auto w-full">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Team Directory</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage team members, roles, and permissions.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search members..."
              className="h-9 w-64 rounded-md border border-border bg-background pl-9 pr-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            />
          </div>
          <button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors bg-secondary text-secondary-foreground hover:bg-secondary/80 border border-border h-9 px-4">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </button>
          <button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors bg-primary text-primary-foreground hover:opacity-90 h-9 px-4">
            <Plus className="w-4 h-4 mr-2" />
            Add Member
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {teamMembers.map((member) => (
          <div key={member.id} className="rounded-md border border-border bg-card text-card-foreground shadow-sm hover:shadow-md transition-shadow">
            <div className="p-5 flex flex-col items-center text-center relative">
              <button className="absolute top-3 right-3 text-muted-foreground hover:text-foreground transition-colors">
                <MoreHorizontal className="w-4 h-4" />
              </button>
              
              <div className="relative mb-4">
                <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center border-2 border-background shadow-sm">
                  <span className="text-xl font-bold text-muted-foreground">{member.avatar}</span>
                </div>
                <div className={cn(
                  "absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full border-2 border-card",
                  member.status === "Online" ? "bg-green-500" :
                  member.status === "Away" ? "bg-yellow-500" :
                  member.status === "In a meeting" ? "bg-red-500" : "bg-muted-foreground"
                )} />
              </div>
              
              <h3 className="font-semibold text-foreground mb-1">{member.name}</h3>
              <p className="text-xs font-medium text-primary mb-3">{member.role}</p>
              
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-muted text-muted-foreground uppercase tracking-widest mb-4">
                {member.department}
              </span>

              <div className="flex items-center justify-center gap-3 w-full pt-4 border-t border-border/50">
                <button className="p-2 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground transition-colors" title="Send Email">
                  <Mail className="w-4 h-4" />
                </button>
                <button className="p-2 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground transition-colors" title="Call">
                  <Phone className="w-4 h-4" />
                </button>
                <button className="p-2 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground transition-colors" title="View Profile">
                  <UserIcon className="w-4 h-4" />
                </button>
                {member.role.includes("Lead") || member.role.includes("Manager") ? (
                   <button className="p-2 rounded-full hover:bg-muted text-primary transition-colors" title="Admin Options">
                     <Shield className="w-4 h-4" />
                   </button>
                ) : null}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
