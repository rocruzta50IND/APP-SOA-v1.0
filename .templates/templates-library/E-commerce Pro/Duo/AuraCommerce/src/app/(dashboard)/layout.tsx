import React from "react";
import { Sidebar } from "@/components/ui/Sidebar";
import { Header } from "@/components/ui/Header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <div className="lg:pl-64">
        <Header />
        <main className="p-8">
          <div className="relative">
            {/* Ambient background glows */}
            <div className="fixed -top-24 -right-24 h-96 w-96 bg-primary/10 blur-[120px] rounded-full" />
            <div className="fixed -bottom-24 -left-24 h-96 w-96 bg-primary/5 blur-[120px] rounded-full" />
            
            <div className="relative z-10">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
