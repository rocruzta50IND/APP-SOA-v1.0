"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Users, 
  Search, 
  MapPin, 
  Briefcase, 
  Mail, 
  MoreHorizontal,
  ChevronRight,
  Globe
} from "lucide-react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from "recharts";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

const employees = [
  { id: 1, name: "Alexander Pierce", role: "VP of Engineering", dept: "Technology", location: "New York, US", email: "a.pierce@lumina.com", avatar: "AP" },
  { id: 2, name: "Sophia Laurent", role: "Creative Director", dept: "Design", location: "Paris, FR", email: "s.laurent@lumina.com", avatar: "SL" },
  { id: 3, name: "Kenji Tanaka", role: "Product Strategy", dept: "Product", location: "Tokyo, JP", email: "k.tanaka@lumina.com", avatar: "KT" },
  { id: 4, name: "Maria Garcia", role: "Operations Manager", dept: "Operations", location: "Madrid, ES", email: "m.garcia@lumina.com", avatar: "MG" },
  { id: 5, name: "David Chen", role: "Lead Data Scientist", dept: "Technology", location: "San Francisco, US", email: "d.chen@lumina.com", avatar: "DC" },
  { id: 6, name: "Emma Wilson", role: "HR Specialist", dept: "Human Resources", location: "London, UK", email: "e.wilson@lumina.com", avatar: "EW" },
];

const deptData = [
  { name: "Tech", count: 124, color: "#6366F1" },
  { name: "Design", count: 42, color: "#EC4899" },
  { name: "Product", count: 38, color: "#10B981" },
  { name: "Ops", count: 56, color: "#F59E0B" },
  { name: "HR", count: 24, color: "#8B5CF6" },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const item = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1 }
};

export default function EmployeesPage() {
  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-8"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tighter text-gradient">Employees</h1>
          <p className="text-muted-foreground">Directory of the global Lumina team.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" className="gap-2">
            <Globe className="w-4 h-4" /> Export CSV
          </Button>
          <Button className="gap-2">
            <Users className="w-4 h-4" /> Invite Member
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Directory & Search */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="glass border-white/5">
            <CardContent className="p-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input className="pl-10 bg-white/5 border-none focus:ring-0" placeholder="Search by name, role, department..." />
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {employees.map((emp) => (
              <motion.div key={emp.id} variants={item}>
                <Card className="glass group hover:border-primary/50 transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold border border-primary/20 group-hover:scale-110 transition-transform">
                        {emp.avatar}
                      </div>
                      <Button variant="ghost" size="icon" className="text-muted-foreground">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="space-y-1 mb-4">
                      <h3 className="font-bold text-lg">{emp.name}</h3>
                      <p className="text-sm text-primary font-medium">{emp.role}</p>
                    </div>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Briefcase className="w-3.5 h-3.5" />
                        <span>{emp.dept}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5" />
                        <span>{emp.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="w-3.5 h-3.5" />
                        <span>{emp.email}</span>
                      </div>
                    </div>
                    <Button variant="secondary" className="w-full mt-6 group/btn">
                      View Profile <ChevronRight className="w-4 h-4 ml-auto group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right: Insights */}
        <div className="space-y-6">
          <motion.div variants={item}>
            <Card className="glass">
              <CardHeader>
                <CardTitle>Department Headcount</CardTitle>
                <CardDescription>Distribution across teams</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={deptData} margin={{ left: -20 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                      <XAxis 
                        dataKey="name" 
                        stroke="rgba(255,255,255,0.3)" 
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                      />
                      <YAxis 
                        stroke="rgba(255,255,255,0.3)" 
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                      />
                      <Tooltip 
                        cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                        contentStyle={{ 
                          backgroundColor: "rgba(10, 10, 12, 0.8)", 
                          border: "1px solid rgba(255,255,255,0.1)",
                          borderRadius: "12px"
                        }}
                      />
                      <Bar dataKey="count" radius={[4, 4, 0, 0]} barSize={30}>
                        {deptData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-6 space-y-3">
                  {deptData.map((dept) => (
                    <div key={dept.name} className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: dept.color }} />
                        <span className="text-muted-foreground">{dept.name}</span>
                      </div>
                      <span className="font-mono font-bold">{dept.count}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={item}>
            <Card className="glass bg-primary/5 border-primary/20 overflow-hidden relative">
              <div className="glow-orb w-32 h-32 -top-16 -right-16 opacity-100" />
              <CardHeader>
                <CardTitle className="text-primary">Performance Review</CardTitle>
                <CardDescription>Q3 cycle is now active</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Ensure all team leads have submitted their feedback for the current quarter.
                </p>
                <div className="flex items-center justify-between text-xs font-medium text-primary mb-2">
                  <span>Progress</span>
                  <span>78%</span>
                </div>
                <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-primary w-[78%]" />
                </div>
                <Button className="w-full mt-6 bg-primary text-white hover:bg-primary/90">Launch Review</Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
