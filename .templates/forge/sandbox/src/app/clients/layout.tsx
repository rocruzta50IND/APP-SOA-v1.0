import React from "react";
import { Sidebar } from "@/components/ui/Sidebar";
import { Header } from "@/components/ui/Header";

export default function ClientsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Sidebar />
      <div className="md:pl-64 flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 bg-muted/10">
          {children}
        </main>
      </div>
    </div>
  );
}