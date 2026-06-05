"use client";

import React from "react";
import { 
  User, 
  Bell, 
  Shield, 
  Key, 
  CreditCard, 
  Save,
  Trash2,
  Copy,
  ChevronRight
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export default function SettingsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
          Settings
        </h1>
        <p className="text-muted-foreground">
          Manage your account preferences and workspace configurations.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-1">
          <nav className="space-y-1">
            {[
              { label: "Profile", icon: User, active: true },
              { label: "Notifications", icon: Bell },
              { label: "Security", icon: Shield },
              { label: "API Keys", icon: Key },
              { label: "Billing", icon: CreditCard },
            ].map((item) => (
              <button
                key={item.label}
                className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all ${
                  item.active 
                    ? "bg-primary/10 text-primary border border-primary/20" 
                    : "text-muted-foreground hover:bg-white/5 hover:text-white"
                }`}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
                {item.active && <ChevronRight className="ml-auto h-4 w-4" />}
              </button>
            ))}
          </nav>

          <Card className="border-red-500/20 bg-red-500/5">
            <CardHeader>
              <CardTitle className="text-sm text-red-500">Danger Zone</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground mb-4">
                Deleting your workspace will permanently remove all data. This action cannot be undone.
              </p>
              <Button variant="destructive" className="w-full h-9 text-xs">
                <Trash2 className="mr-2 h-3.5 w-3.5" />
                Delete Workspace
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>Update your personal details and how others see you.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-6 mb-6">
                <div className="h-20 w-20 rounded-full bg-gradient-to-tr from-primary to-purple-500 border-4 border-white/5" />
                <div className="space-y-2">
                  <Button variant="outline" size="sm">Change Avatar</Button>
                  <p className="text-[10px] text-muted-foreground">JPG, GIF or PNG. Max size 2MB.</p>
                </div>
              </div>
              
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-xs font-medium text-white">Full Name</label>
                  <Input placeholder="Alex Rivera" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-medium text-white">Email Address</label>
                  <Input placeholder="alex@auracrm.io" />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <label className="text-xs font-medium text-white">Bio</label>
                  <textarea 
                    className="w-full min-h-[100px] rounded-xl border border-white/10 bg-white/5 p-3 text-sm text-white placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all"
                    placeholder="Brief description about your role..."
                  />
                </div>
              </div>
              <div className="pt-4 flex justify-end">
                <Button className="gap-2">
                  <Save className="h-4 w-4" />
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>API Access</CardTitle>
              <CardDescription>Use these keys to integrate AuraCRM with your existing stack.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-medium text-white">Production API Key</label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Input value="ak_live_51MszZJSIWzRkH3gX..." readOnly className="pr-10 font-mono text-xs" />
                    <button className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-white transition-colors">
                      <Copy className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  <Button variant="outline">Revoke</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
