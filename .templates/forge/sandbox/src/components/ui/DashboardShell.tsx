"use client";

import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { motion } from "framer-motion";

export function DashboardShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-background text-foreground overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col lg:pl-72 min-h-screen">
        <Header />
        <main className="flex-1 overflow-y-auto p-4 md:p-8 relative">
          {/* Ambient Glows */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full -z-10" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full -z-10" />
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
          >
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  );
}
