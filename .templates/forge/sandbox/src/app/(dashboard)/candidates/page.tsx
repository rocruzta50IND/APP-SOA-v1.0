"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Search, 
  Filter, 
  Plus, 
  MoreVertical, 
  Mail, 
  Phone, 
  MapPin,
  Calendar,
  CheckCircle2,
  Clock,
  AlertCircle
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { cn } from "@/lib/utils";

const candidates = [
  {
    id: 1,
    name: "Elena Rodriguez",
    role: "Senior UX Designer",
    stage: "Interview",
    status: "Active",
    email: "elena.r@example.com",
    experience: "8 years",
    match: "98%",
    initials: "ER"
  },
  {
    id: 2,
    name: "Marcus Thorne",
    role: "Fullstack Developer",
    stage: "Technical Test",
    status: "Pending",
    email: "m.thorne@example.com",
    experience: "5 years",
    match: "92%",
    initials: "MT"
  },
  {
    id: 3,
    name: "Sarah Chen",
    role: "Product Manager",
    stage: "Offer",
    status: "Accepted",
    email: "schen@example.com",
    experience: "6 years",
    match: "95%",
    initials: "SC"
  },
  {
    id: 4,
    name: "James Wilson",
    role: "Backend Engineer",
    stage: "Screening",
    status: "Action Required",
    email: "j.wilson@example.com",
    experience: "10 years",
    match: "88%",
    initials: "JW"
  },
  {
    id: 5,
    name: "Avery Jenkins",
    role: "HR Generalist",
    stage: "Rejected",
    status: "Closed",
    email: "a.jenkins@example.com",
    experience: "4 years",
    match: "75%",
    initials: "AJ"
  },
  {
    id: 6,
    name: "Lila Vance",
    role: "Data Scientist",
    stage: "Technical Test",
    status: "Active",
    email: "l.vance@example.com",
    experience: "7 years",
    match: "94%",
    initials: "LV"
  }
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.05 }
  }
};

const item = {
  hidden: { y: 10, opacity: 0 },
  show: { y: 0, opacity: 1 }
};

export default function CandidatesPage() {
  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-8"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tighter text-gradient">Candidates</h1>
          <p className="text-muted-foreground">Manage and track your talent pipeline.</p>
        </div>
        <Button className="w-full md:w-auto gap-2">
          <Plus className="w-4 h-4" /> Add Candidate
        </Button>
      </div>

      {/* Filters Bar */}
      <Card className="glass border-white/5">
        <CardContent className="p-4 flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input className="pl-10 bg-white/5" placeholder="Search by name, role, or email..." />
          </div>
          <div className="flex gap-2">
            <Button variant="secondary" className="gap-2">
              <Filter className="w-4 h-4" /> Filter
            </Button>
            <Button variant="secondary" className="gap-2">
              <Calendar className="w-4 h-4" /> Date Range
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Candidates List/Table */}
      <div className="grid grid-cols-1 gap-4">
        {candidates.map((candidate) => (
          <motion.div key={candidate.id} variants={item}>
            <Card className="glass group hover:border-primary/30 transition-all duration-300">
              <CardContent className="p-0">
                <div className="flex flex-col lg:flex-row lg:items-center gap-6 p-6">
                  {/* Avatar & Basic Info */}
                  <div className="flex items-center gap-4 min-w-[300px]">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center text-primary font-bold text-lg border border-primary/20 group-hover:scale-110 transition-transform">
                      {candidate.initials}
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{candidate.name}</h3>
                      <p className="text-sm text-muted-foreground">{candidate.role}</p>
                    </div>
                  </div>

                  {/* Metadata */}
                  <div className="grid grid-cols-2 md:grid-cols-4 flex-1 gap-4">
                    <div className="space-y-1">
                      <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Stage</p>
                      <div className="flex items-center gap-2">
                        <span className={cn(
                          "px-2 py-0.5 rounded-lg text-xs font-medium border",
                          candidate.stage === "Offer" ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" :
                          candidate.stage === "Rejected" ? "bg-red-500/10 text-red-500 border-red-500/20" :
                          "bg-primary/10 text-primary border-primary/20"
                        )}>
                          {candidate.stage}
                        </span>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Experience</p>
                      <p className="text-sm font-medium">{candidate.experience}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">AI Match Score</p>
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-1.5 bg-white/5 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-primary" 
                            style={{ width: candidate.match }} 
                          />
                        </div>
                        <span className="text-xs font-mono">{candidate.match}</span>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Status</p>
                      <div className="flex items-center gap-1.5">
                        {candidate.status === "Active" && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />}
                        {candidate.status === "Pending" && <Clock className="w-3.5 h-3.5 text-amber-500" />}
                        {candidate.status === "Action Required" && <AlertCircle className="w-3.5 h-3.5 text-red-500" />}
                        <span className="text-sm">{candidate.status}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 lg:ml-auto border-t lg:border-t-0 pt-4 lg:pt-0">
                    <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-white">
                      <Mail className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-white">
                      <Phone className="w-4 h-4" />
                    </Button>
                    <div className="w-px h-8 bg-white/5 mx-2 hidden lg:block" />
                    <Button variant="secondary" className="px-6">View Details</Button>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Pagination Emulation */}
      <div className="flex items-center justify-between py-4">
        <p className="text-sm text-muted-foreground">Showing 1 to 6 of 42 candidates</p>
        <div className="flex gap-2">
          <Button variant="secondary" size="sm" disabled>Previous</Button>
          <Button variant="secondary" size="sm">Next</Button>
        </div>
      </div>
    </motion.div>
  );
}
