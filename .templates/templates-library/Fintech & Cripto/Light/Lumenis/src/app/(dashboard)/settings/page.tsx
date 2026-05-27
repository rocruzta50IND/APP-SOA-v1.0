"use client";

import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { 
  User, 
  Lock, 
  Bell, 
  Shield, 
  Key, 
  Smartphone,
  Mail
} from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-black tracking-tighter">Settings</h1>
        <p className="text-muted-foreground text-sm">Manage your account preferences and security settings.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <aside className="md:col-span-1 space-y-1">
          {[
            { label: "General", icon: User, active: true },
            { label: "Security", icon: Lock, active: false },
            { label: "Notifications", icon: Bell, active: false },
            { label: "API Keys", icon: Key, active: false },
            { label: "Sessions", icon: Smartphone, active: false },
          ].map((item) => (
            <button
              key={item.label}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors",
                item.active 
                  ? "bg-primary text-primary-foreground" 
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              )}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </button>
          ))}
        </aside>

        <div className="md:col-span-3 space-y-8">
          <Card className="shadow-none border-border">
            <CardHeader>
              <CardTitle className="text-sm font-black tracking-tight">Profile Information</CardTitle>
              <CardDescription className="text-[10px] font-bold uppercase tracking-widest">Update your personal details.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground px-1">First Name</label>
                  <Input placeholder="John" className="h-10 bg-muted/30 border-none shadow-none focus-visible:ring-1" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground px-1">Last Name</label>
                  <Input placeholder="Doe" className="h-10 bg-muted/30 border-none shadow-none focus-visible:ring-1" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground px-1">Email Address</label>
                <Input placeholder="john.doe@enterprise.com" className="h-10 bg-muted/30 border-none shadow-none focus-visible:ring-1" />
              </div>
              <div className="pt-4 flex justify-end">
                <Button className="h-9 px-6 text-[10px] font-bold uppercase tracking-widest">Save Changes</Button>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-none border-border">
            <CardHeader>
              <CardTitle className="text-sm font-black tracking-tight text-rose-500">Security & Authentication</CardTitle>
              <CardDescription className="text-[10px] font-bold uppercase tracking-widest">Manage your 2FA and passwords.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between p-4 border border-border rounded-md bg-muted/10">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600">
                    <Shield className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm font-bold tracking-tight">Two-Factor Authentication</div>
                    <div className="text-[10px] text-muted-foreground uppercase">Active since Oct 2025</div>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="h-8 text-[10px] font-bold uppercase">Configure</Button>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <span className="text-xs font-medium">Password last changed 3 months ago</span>
                  </div>
                  <Button variant="link" className="text-[10px] font-bold uppercase h-auto p-0">Change Password</Button>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Smartphone className="w-4 h-4 text-muted-foreground" />
                    <span className="text-xs font-medium">Recovery phone: +1 (•••) •••-4523</span>
                  </div>
                  <Button variant="link" className="text-[10px] font-bold uppercase h-auto p-0">Update Phone</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-none border-border">
            <CardHeader>
              <CardTitle className="text-sm font-black tracking-tight">API Access</CardTitle>
              <CardDescription className="text-[10px] font-bold uppercase tracking-widest">Generate and manage your API keys.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="p-4 border border-border border-dashed rounded-md flex flex-col items-center justify-center text-center space-y-2">
                <Key className="w-8 h-8 text-muted-foreground/50" />
                <div className="text-sm font-bold tracking-tight">No Active API Keys</div>
                <p className="text-[10px] text-muted-foreground uppercase max-w-[240px]">Create an API key to programmatically interact with Lumenis.</p>
                <Button size="sm" className="h-8 mt-2 text-[10px] font-bold uppercase tracking-widest">Generate Key</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
