"use client";

import { 
  User, 
  Shield, 
  Bell, 
  CreditCard, 
  Globe, 
  Mail,
  LogOut
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

export default function SettingsPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <Button variant="destructive" size="sm" className="flex items-center gap-2">
          <LogOut className="h-4 w-4" />
          Sign Out
        </Button>
      </div>

      <div className="grid gap-6">
        <Card className="border-border shadow-sm">
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
            <CardDescription>Update your personal details and public profile.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Full Name</label>
                <Input defaultValue="Rodrigo Architect" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Email Address</label>
                <Input defaultValue="rodrigo@lumiere.com" type="email" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Organization</label>
              <Input defaultValue="Lumiere B2B Solutions" />
            </div>
            <Button className="w-fit">Save Changes</Button>
          </CardContent>
        </Card>

        <Card className="border-border shadow-sm">
          <CardHeader>
            <CardTitle>Subscription Plan</CardTitle>
            <CardDescription>Manage your current subscription and billing methods.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between p-4 rounded-md border border-border bg-muted/30">
              <div className="flex items-center gap-4">
                <div className="p-2 rounded bg-primary text-primary-foreground">
                  <Globe className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium">Enterprise Pro Plan</p>
                  <p className="text-xs text-muted-foreground">$249.00 / month, billed annually</p>
                </div>
              </div>
              <Badge>Active</Badge>
            </div>
            <div className="mt-4 flex gap-2">
              <Button variant="outline">Change Plan</Button>
              <Button variant="ghost">View Billing History</Button>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border shadow-sm">
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
            <CardDescription>Configure how you receive alerts and updates.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { label: "Email Notifications", description: "Receive daily summaries of sales and inventory alerts.", icon: Mail },
              { label: "Security Alerts", description: "Get notified immediately of unusual account activity.", icon: Shield },
              { label: "System Updates", description: "Information about new features and scheduled maintenance.", icon: Bell },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                <div className="flex items-center gap-3">
                  <item.icon className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">{item.label}</p>
                    <p className="text-xs text-muted-foreground">{item.description}</p>
                  </div>
                </div>
                <div className="h-5 w-9 rounded-full bg-primary/20 relative cursor-pointer">
                  <div className="h-4 w-4 rounded-full bg-primary absolute right-0.5 top-0.5" />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
