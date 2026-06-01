"use client";

import React from "react";
import { 
  User, 
  Lock, 
  Shield, 
  Key, 
  Bell, 
  Globe, 
  CreditCard,
  ChevronRight,
  Plus
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { cn } from "@/lib/utils";

export default function SettingsPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Page Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-black uppercase tracking-tighter">System Configuration</h1>
        <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold">Manage your enterprise environment and security</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Settings Navigation */}
        <aside className="w-full md:w-64 space-y-1">
          {[
            { name: "General Profile", icon: User, active: true },
            { name: "Security & 2FA", icon: Shield, active: false },
            { name: "API Access", icon: Key, active: false },
            { name: "Billing & Plan", icon: CreditCard, active: false },
            { name: "Notifications", icon: Bell, active: false },
            { name: "Network Settings", icon: Globe, active: false },
          ].map((item) => (
            <button
              key={item.name}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 text-[10px] font-black uppercase tracking-widest border transition-all",
                item.active 
                  ? "bg-primary text-primary-foreground border-primary" 
                  : "bg-background border-transparent hover:bg-muted hover:border-border"
              )}
            >
              <item.icon size={14} />
              {item.name}
            </button>
          ))}
        </aside>

        {/* Settings Content */}
        <div className="flex-1 space-y-6">
          {/* Profile Section */}
          <Card className="rounded-none border-border/50">
            <CardHeader>
              <CardTitle className="text-sm font-bold uppercase tracking-widest">Profile Information</CardTitle>
              <CardDescription className="text-[10px] uppercase tracking-widest mt-1">Basic identification for your enterprise account</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Full Name</label>
                  <Input placeholder="ENTERPRISE ADMIN" className="rounded-none border-border/50 h-10 text-[10px] font-bold uppercase" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Organization</label>
                  <Input placeholder="VORTEX CAPITAL" className="rounded-none border-border/50 h-10 text-[10px] font-bold uppercase" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Email Address</label>
                <Input placeholder="admin@vortex.capital" type="email" className="rounded-none border-border/50 h-10 text-[10px] font-bold uppercase" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Professional Bio</label>
                <textarea 
                  placeholder="Enterprise asset management specialist focusing on institutional liquidity..."
                  className="w-full min-h-[100px] bg-background border border-border/50 p-3 text-[10px] font-bold uppercase tracking-widest focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
            </CardContent>
            <CardFooter className="border-t border-border/50 bg-muted/20 justify-end py-4">
              <Button variant="primary" size="sm" className="rounded-none text-[10px] font-black uppercase tracking-widest h-9 px-6">
                Update Profile
              </Button>
            </CardFooter>
          </Card>

          {/* Security Summary */}
          <Card className="rounded-none border-border/50">
            <CardHeader>
              <CardTitle className="text-sm font-bold uppercase tracking-widest text-rose-500">Security Audit</CardTitle>
              <CardDescription className="text-[10px] uppercase tracking-widest mt-1">Manage credentials and authentication layers</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 border border-border/50 bg-muted/10">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 flex items-center justify-center bg-primary text-primary-foreground">
                    <Lock size={18} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest">Multi-Factor Authentication</p>
                    <p className="text-[10px] text-emerald-500 font-bold uppercase mt-0.5 tracking-wider">Active & Secure</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="rounded-none text-[10px] font-black uppercase tracking-widest h-8">
                  Configure
                </Button>
              </div>

              <div className="flex items-center justify-between p-4 border border-border/50 bg-muted/10">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 flex items-center justify-center bg-muted border border-border">
                    <Key size={18} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest">Active API Keys</p>
                    <p className="text-[10px] text-muted-foreground font-bold uppercase mt-0.5 tracking-wider">3 Keys in production</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="rounded-none text-[10px] font-black uppercase tracking-widest h-8">
                  <Plus size={14} className="mr-1" /> New Key
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Destructive Zone */}
          <div className="p-6 border border-rose-500/20 bg-rose-500/5 space-y-4">
            <h3 className="text-[10px] font-black uppercase tracking-widest text-rose-500">Hazard Zone</h3>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest">Deactivate Account</p>
                <p className="text-[10px] text-muted-foreground uppercase tracking-widest mt-1">This action is permanent and cannot be undone.</p>
              </div>
              <Button variant="outline" size="sm" className="rounded-none border-rose-500/50 text-rose-500 hover:bg-rose-500 hover:text-white text-[10px] font-black uppercase tracking-widest h-8">
                Deactivate
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
