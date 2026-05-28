"use client";

import React from "react";
import { motion } from "framer-motion";
import { Calendar as CalendarIcon, Clock, User, Video, MapPin, CheckCircle2, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const interviews = [
  {
    candidate: "Sarah Jenkins",
    role: "Senior Frontend Engineer",
    type: "Technical Interview",
    time: "10:00 AM - 11:30 AM",
    date: "Today, May 28",
    platform: "Google Meet",
    interviewer: "David Brown",
    status: "Upcoming"
  },
  {
    candidate: "Michael Chen",
    role: "Product Manager",
    type: "Culture Fit",
    time: "02:00 PM - 03:00 PM",
    date: "Today, May 28",
    platform: "In-Person",
    location: "Meeting Room A",
    interviewer: "Alex Rivera",
    status: "Confirmed"
  },
  {
    candidate: "Emma Wilson",
    role: "UX Designer",
    type: "Portfolio Review",
    time: "04:30 PM - 05:30 PM",
    date: "Today, May 28",
    platform: "Zoom",
    interviewer: "Sophie Chen",
    status: "Upcoming"
  },
  {
    candidate: "David Miller",
    role: "Backend Architect",
    type: "System Design",
    time: "09:00 AM - 10:30 AM",
    date: "Tomorrow, May 29",
    platform: "Google Meet",
    interviewer: "Marcus Thorne",
    status: "Scheduled"
  },
  {
    candidate: "Sophia Garcia",
    role: "DevOps Engineer",
    type: "Final Round",
    time: "11:00 AM - 12:00 PM",
    date: "Tomorrow, May 29",
    platform: "Google Meet",
    interviewer: "Team Panel",
    status: "Scheduled"
  }
];

export default function InterviewsPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
            Interview Schedule
          </h1>
          <p className="text-muted-foreground mt-1">Coordinate and track upcoming candidate evaluations.</p>
        </div>
        <div className="flex items-center gap-2 p-1 rounded-xl bg-white/5 border border-white/10">
          <button className="px-4 py-1.5 text-xs font-semibold rounded-lg bg-primary text-white shadow-sm">Upcoming</button>
          <button className="px-4 py-1.5 text-xs font-semibold text-muted-foreground hover:text-white transition-colors">Completed</button>
          <button className="px-4 py-1.5 text-xs font-semibold text-muted-foreground hover:text-white transition-colors">Calendar</button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Timeline */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-lg font-bold flex items-center gap-2">
            <CalendarIcon className="h-5 w-5 text-primary" />
            Agenda for Today
          </h2>

          <div className="space-y-4 relative before:absolute before:left-[19px] before:top-2 before:bottom-2 before:w-px before:bg-white/10">
            {interviews.slice(0, 3).map((interview, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="relative pl-12"
              >
                <div className="absolute left-0 top-3 h-10 w-10 rounded-full border-4 border-black bg-primary flex items-center justify-center shadow-[0_0_15px_rgba(79,70,229,0.4)]">
                  <Clock className="h-4 w-4 text-white" />
                </div>
                
                <div className="rounded-2xl border border-white/10 bg-white/5 p-6 hover:bg-white/[0.08] transition-all group">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                    <div>
                      <div className="text-xs font-bold text-primary uppercase tracking-widest mb-1">{interview.time}</div>
                      <h3 className="text-lg font-bold text-white group-hover:text-primary transition-colors">{interview.candidate}</h3>
                      <p className="text-sm text-muted-foreground">{interview.role}</p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <span className="text-[10px] uppercase tracking-widest font-bold px-2 py-0.5 rounded-full border border-emerald-400/20 bg-emerald-400/10 text-emerald-400">
                        {interview.status}
                      </span>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        {interview.platform === "In-Person" ? <MapPin className="h-3 w-3" /> : <Video className="h-3 w-3" />}
                        {interview.platform === "In-Person" ? interview.location : interview.platform}
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-6 w-6 rounded-full bg-white/10 flex items-center justify-center text-[10px] font-bold">
                        {interview.interviewer.split(' ').map(n => n[0]).join('')}
                      </div>
                      <span className="text-xs text-muted-foreground">Interviewer: <span className="text-white">{interview.interviewer}</span></span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="text-xs font-bold text-primary hover:underline">Prepare</button>
                      <button className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-xs font-bold hover:bg-white/10">Join Call</button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right Column: Insights & Stats */}
        <div className="space-y-6">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h3 className="font-bold mb-4">Interview Health</h3>
            <div className="space-y-4">
              {[
                { label: "Acceptance Rate", value: "78%", color: "bg-emerald-500" },
                { label: "Completion Rate", value: "92%", color: "bg-primary" },
                { label: "Candidate Sat.", value: "4.8/5", color: "bg-amber-500" },
              ].map((stat, i) => (
                <div key={i}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-muted-foreground">{stat.label}</span>
                    <span className="text-white font-bold">{stat.value}</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                    <div className={cn("h-full rounded-full", stat.color)} style={{ width: stat.value.includes('%') ? stat.value : '96%' }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h3 className="font-bold mb-4">Feedback Needed</h3>
            <div className="space-y-4">
              {[
                { name: "John Doe", role: "DevOps", time: "2h ago" },
                { name: "Alice Wang", role: "Product", time: "5h ago" },
                { name: "Bob Ross", role: "Frontend", time: "1d ago" },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between group cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
                      <User className="h-4 w-4 text-muted-foreground group-hover:text-primary" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white">{item.name}</div>
                      <div className="text-[10px] text-muted-foreground">{item.role}</div>
                    </div>
                  </div>
                  <div className="text-[10px] text-muted-foreground italic">{item.time}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
