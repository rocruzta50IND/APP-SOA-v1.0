import React from "react";
import { Sidebar } from "@/components/ui/Sidebar";
import { Header } from "@/components/ui/Header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen bg-background font-sans selection:bg-primary/30">
      {/* Background Orbs */}
      <div className="fixed -left-20 top-0 h-[500px] w-[500px] opacity-20 blur-[120px] bg-primary rounded-full pointer-events-none" />
      <div className="fixed -right-20 bottom-0 h-[400px] w-[400px] opacity-10 blur-[100px] bg-primary rounded-full pointer-events-none" />
      
      <Sidebar />
      <div className="pl-64">
        <Header />
        <main className="min-h-[calc(100vh-64px)] p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
