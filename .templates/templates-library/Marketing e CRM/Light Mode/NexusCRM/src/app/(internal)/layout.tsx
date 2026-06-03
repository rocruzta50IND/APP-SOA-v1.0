"use client";

import React from "react";
import { Sidebar } from "@/components/ui/Sidebar";
import { Header } from "@/components/ui/Header";

export default function InternalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#09090b] text-white selection:bg-primary/30">
      <Sidebar />
      <div className="pl-64">
        <Header />
        <main className="pt-16 min-h-screen">
          <div className="p-8">
            {children}
          </div>
        </main>
      </div>
      
      {/* Global Ambient Glows */}
      <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 blur-[120px] rounded-full pointer-events-none z-0" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none z-0" />
    </div>
  );
}
