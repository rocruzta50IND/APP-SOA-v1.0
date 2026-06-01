"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  User, 
  Bell, 
  Shield, 
  Lock, 
  CreditCard, 
  Mail, 
  Check,
  ChevronRight,
  Upload
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

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

export default function SettingsPage() {
  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-8"
    >
      <div>
        <h1 className="text-3xl font-bold tracking-tighter text-gradient">Settings</h1>
        <p className="text-muted-foreground">Manage your account and platform preferences.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Nav */}
        <div className="space-y-2">
          {[
            { label: "Profile", icon: User, active: true },
            { label: "Notifications", icon: Bell, active: false },
            { label: "Team & Permissions", icon: Shield, active: false },
            { label: "Security", icon: Lock, active: false },
            { label: "Billing", icon: CreditCard, active: false },
          ].map((nav, idx) => (
            <button 
              key={idx}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                nav.active 
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20" 
                  : "text-muted-foreground hover:bg-white/5 hover:text-white"
              }`}
            >
              <nav.icon className="w-4 h-4" />
              <span className="font-medium text-sm">{nav.label}</span>
              {nav.active && <ChevronRight className="w-4 h-4 ml-auto" />}
            </button>
          ))}
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-3 space-y-8">
          {/* Profile Section */}
          <motion.div variants={item}>
            <Card className="glass">
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>Update your personal details and public profile.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-col md:flex-row items-center gap-6 pb-6 border-b border-white/5">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary/40 to-indigo-500/40 border-2 border-primary/20 flex items-center justify-center relative group cursor-pointer">
                    <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Upload className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-2xl font-bold">AR</span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <h4 className="font-bold text-lg">Alex Rivera</h4>
                    <p className="text-sm text-muted-foreground">HR Manager @ Lumina Talent</p>
                    <div className="flex gap-2 mt-2">
                      <Button size="sm">Change Photo</Button>
                      <Button size="sm" variant="secondary">Remove</Button>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">First Name</label>
                    <Input placeholder="Alex" className="bg-white/5" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Last Name</label>
                    <Input placeholder="Rivera" className="bg-white/5" />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Email Address</label>
                    <Input placeholder="alex.rivera@lumina.com" className="bg-white/5" />
                  </div>
                </div>
                <div className="flex justify-end pt-4">
                  <Button className="gap-2">Save Changes</Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Notifications Section */}
          <motion.div variants={item}>
            <Card className="glass">
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>Choose how you want to be notified about updates.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {[
                  { title: "Candidate Updates", desc: "Get notified when a candidate changes stage.", enabled: true },
                  { title: "Team Activity", desc: "Daily summary of your team's recruiting activity.", enabled: true },
                  { title: "Platform News", desc: "Stay up to date with new features and releases.", enabled: false },
                ].map((pref, idx) => (
                  <div key={idx} className="flex items-center justify-between pb-4 border-b border-white/5 last:border-0 last:pb-0">
                    <div className="space-y-1">
                      <h4 className="font-bold">{pref.title}</h4>
                      <p className="text-sm text-muted-foreground">{pref.desc}</p>
                    </div>
                    <button className={`w-12 h-6 rounded-full transition-all relative ${pref.enabled ? "bg-primary" : "bg-white/10"}`}>
                      <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${pref.enabled ? "left-7" : "left-1"}`} />
                    </button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          {/* Danger Zone */}
          <motion.div variants={item}>
            <Card className="border-red-500/20 bg-red-500/5">
              <CardHeader>
                <CardTitle className="text-red-500">Danger Zone</CardTitle>
                <CardDescription>Irreversible actions for your account.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                  <p className="text-sm text-muted-foreground">
                    Deleting your account will remove all your data and access permanently.
                  </p>
                  <Button variant="ghost" className="text-red-500 hover:bg-red-500/10 hover:text-red-500">Delete Account</Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
