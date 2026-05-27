"use client";

import { User, Shield, Bell, Zap, CreditCard, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export default function SettingsPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-black tracking-tighter">Settings</h1>
        <p className="text-muted-foreground text-sm">Manage your account preferences and security settings.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Settings Navigation */}
        <aside className="w-full md:w-64 space-y-1">
          {[
            { name: "Profile", icon: User, active: true },
            { name: "Security", icon: Shield, active: false },
            { name: "Notifications", icon: Bell, active: false },
            { name: "Connected Apps", icon: Zap, active: false },
            { name: "Billing", icon: CreditCard, active: false },
          ].map((item) => (
            <button
              key={item.name}
              className={cn(
                "flex w-full items-center justify-between px-3 py-2 text-sm font-medium rounded-md transition-colors",
                item.active 
                  ? "bg-primary text-primary-foreground" 
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              )}
            >
              <div className="flex items-center gap-3">
                <item.icon className="w-4 h-4" />
                {item.name}
              </div>
              {item.active && <ChevronRight className="w-4 h-4" />}
            </button>
          ))}
        </aside>

        {/* Settings Content */}
        <div className="flex-1 space-y-6">
          <Card className="p-6 border-border/50">
            <h3 className="text-lg font-bold tracking-tight mb-6">Public Profile</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-6 mb-6">
                <div className="w-20 h-20 rounded-full bg-muted border border-border flex items-center justify-center overflow-hidden">
                  <User className="w-10 h-10 text-muted-foreground" />
                </div>
                <div>
                  <Button size="sm">Change Avatar</Button>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-widest mt-2 font-bold">JPG, GIF or PNG. Max size 2MB.</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">First Name</label>
                  <Input placeholder="Rodrigo" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Last Name</label>
                  <Input placeholder="Engineering" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Email Address</label>
                <Input placeholder="rodrigo@aurem.finance" />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Bio</label>
                <textarea 
                  className="w-full min-h-[100px] rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                  placeholder="Tell us about yourself..."
                />
              </div>

              <div className="pt-4 flex justify-end">
                <Button>Save Changes</Button>
              </div>
            </div>
          </Card>

          <Card className="p-6 border-border/50 border-destructive/20 bg-destructive/5">
            <h3 className="text-lg font-bold tracking-tight text-destructive mb-2">Danger Zone</h3>
            <p className="text-xs text-muted-foreground mb-4">Permanently delete your account and all associated data. This action cannot be undone.</p>
            <Button variant="outline" className="text-destructive border-destructive/20 hover:bg-destructive hover:text-white transition-all">Delete Account</Button>
          </Card>
        </div>
      </div>
    </div>
  );
}
