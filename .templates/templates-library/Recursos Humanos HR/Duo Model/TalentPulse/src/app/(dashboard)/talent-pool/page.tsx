"use client";

import React from "react";
import { motion } from "framer-motion";
import { Search, Filter, Plus, Mail, Phone, MapPin, ExternalLink, Star } from "lucide-react";
import { cn } from "@/lib/utils";

const candidates = [
  {
    name: "Marcus Thorne",
    role: "Senior Full Stack Engineer",
    experience: "8 years",
    location: "San Francisco, CA",
    skills: ["React", "Node.js", "TypeScript", "AWS"],
    status: "Available",
    rating: 4.9,
    avatar: "MT"
  },
  {
    name: "Elena Rodriguez",
    role: "Product Designer",
    experience: "5 years",
    location: "Madrid, ES",
    skills: ["Figma", "Design Systems", "UX Research"],
    status: "Interviewing",
    rating: 4.7,
    avatar: "ER"
  },
  {
    name: "James Chen",
    role: "Backend Architect",
    experience: "12 years",
    location: "Seattle, WA",
    skills: ["Go", "Kubernetes", "PostgreSQL", "Kafka"],
    status: "Offer Sent",
    rating: 5.0,
    avatar: "JC"
  },
  {
    name: "Sarah Kim",
    role: "Marketing Director",
    experience: "10 years",
    location: "Seoul, KR",
    skills: ["Growth", "SEO", "Branding", "Analytics"],
    status: "Available",
    rating: 4.8,
    avatar: "SK"
  },
  {
    name: "Oliver Smith",
    role: "Data Scientist",
    experience: "4 years",
    location: "London, UK",
    skills: ["Python", "PyTorch", "SQL", "Pandas"],
    status: "New",
    rating: 4.5,
    avatar: "OS"
  },
  {
    name: "Aisha Patel",
    role: "Project Manager",
    experience: "7 years",
    location: "Mumbai, IN",
    skills: ["Agile", "Jira", "Risk Management"],
    status: "Interviewing",
    rating: 4.6,
    avatar: "AP"
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
} as const;

const cardVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 400, damping: 30 }
  }
} as const;

export default function TalentPoolPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
            Talent Pool
          </h1>
          <p className="text-muted-foreground mt-1">Manage and discover top-tier candidates in your network.</p>
        </div>
        <button className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:bg-primary/90 transition-all">
          <Plus className="h-4 w-4" />
          Add Candidate
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-4 border-b border-white/10 pb-6">
        <div className="flex-1 min-w-[300px] relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
          <input 
            type="text" 
            placeholder="Search by name, role or skill..." 
            className="w-full bg-white/5 border border-white/10 rounded-xl py-2 pl-10 pr-4 text-sm outline-none focus:border-primary/50 transition-all"
          />
        </div>
        <button className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium hover:bg-white/10 transition-all">
          <Filter className="h-4 w-4" />
          Filters
        </button>
        <select className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm outline-none hover:bg-white/10 transition-all cursor-pointer">
          <option>Sort by: Best Match</option>
          <option>Sort by: Newest</option>
          <option>Sort by: Experience</option>
        </select>
      </div>

      {/* Candidate Grid */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {candidates.map((candidate, i) => (
          <motion.div
            key={i}
            variants={cardVariants}
            whileHover={{ y: -5 }}
            className="group relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6 hover:border-white/20 hover:bg-white/[0.08] transition-all"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 flex items-center justify-center text-lg font-bold">
                {candidate.avatar}
              </div>
              <div className="flex flex-col items-end">
                <div className="flex items-center gap-1 text-amber-400">
                  <Star className="h-3 w-3 fill-amber-400" />
                  <span className="text-xs font-mono font-bold">{candidate.rating}</span>
                </div>
                <span className={cn(
                  "mt-2 text-[10px] uppercase tracking-widest font-bold px-2 py-0.5 rounded-full border",
                  candidate.status === "Available" ? "text-emerald-400 border-emerald-400/20 bg-emerald-400/10" :
                  candidate.status === "Interviewing" ? "text-blue-400 border-blue-400/20 bg-blue-400/10" :
                  "text-purple-400 border-purple-400/20 bg-purple-400/10"
                )}>
                  {candidate.status}
                </span>
              </div>
            </div>

            <h3 className="text-lg font-bold text-white mb-1 group-hover:text-primary transition-colors">{candidate.name}</h3>
            <p className="text-sm text-muted-foreground mb-4">{candidate.role} • {candidate.experience}</p>

            <div className="flex items-center gap-4 mb-6 text-muted-foreground">
              <div className="flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                <span className="text-xs">{candidate.location}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              {candidate.skills.map((skill, j) => (
                <span key={j} className="text-[10px] bg-white/5 border border-white/10 rounded-lg px-2 py-1 text-muted-foreground">
                  {skill}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-2 pt-6 border-t border-white/5">
              <button className="flex-1 flex items-center justify-center gap-2 rounded-lg bg-white/5 border border-white/10 py-2 text-xs font-semibold hover:bg-white/10 transition-all">
                <Mail className="h-3 w-3" />
                Email
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 rounded-lg bg-white/5 border border-white/10 py-2 text-xs font-semibold hover:bg-white/10 transition-all">
                <Phone className="h-3 w-3" />
                Call
              </button>
              <button className="p-2 rounded-lg bg-primary/10 border border-primary/20 text-primary hover:bg-primary/20 transition-all">
                <ExternalLink className="h-3 w-3" />
              </button>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
