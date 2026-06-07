"use client";

import { InternalLayout } from "@/components/ui/InternalLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Bell, Shield, Key, Webhook } from "lucide-react";

export default function SettingsPage() {
  return (
    <InternalLayout>
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">Settings</h1>
        <p className="text-sm text-muted-foreground mt-1">Manage your project configuration and integrations.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        <div className="md:col-span-1 space-y-1">
          <Button variant="ghost" className="w-full justify-start font-medium bg-muted">
            <Shield className="mr-2 h-4 w-4" />
            General
          </Button>
          <Button variant="ghost" className="w-full justify-start font-medium text-muted-foreground">
            <Key className="mr-2 h-4 w-4" />
            API Keys
          </Button>
          <Button variant="ghost" className="w-full justify-start font-medium text-muted-foreground">
            <Webhook className="mr-2 h-4 w-4" />
            Webhooks
          </Button>
          <Button variant="ghost" className="w-full justify-start font-medium text-muted-foreground">
            <Bell className="mr-2 h-4 w-4" />
            Notifications
          </Button>
        </div>

        <div className="md:col-span-3 space-y-6">
          <Card className="rounded-md">
            <CardHeader>
              <CardTitle>Project Details</CardTitle>
              <CardDescription>Update your project name and basic configuration.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Project Name</label>
                <Input placeholder="TestNexus Enterprise" className="max-w-md" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Default Branch</label>
                <Input placeholder="main" className="max-w-md" />
              </div>
            </CardContent>
            <CardFooter className="border-t border-border px-6 py-4">
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>

          <Card className="rounded-md border-red-900/50">
            <CardHeader>
              <CardTitle className="text-red-500">Danger Zone</CardTitle>
              <CardDescription>Irreversible actions for this project.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Once you delete a project, there is no going back. Please be certain.</p>
            </CardContent>
            <CardFooter className="px-6 py-4 border-t border-red-900/20">
              <Button variant="outline" className="text-red-500 border-red-900/50 hover:bg-red-950 hover:text-red-400">Delete Project</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </InternalLayout>
  );
}
