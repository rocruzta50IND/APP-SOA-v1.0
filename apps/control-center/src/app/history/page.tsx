"use client";

import { HistoryList } from "@/components/HistoryList";
import { KPIBentoCards } from "@/components/KPIBentoCards";
import { VolumeAreaChart } from "@/components/VolumeAreaChart";
import { DistributionCharts } from "@/components/DistributionCharts";
import { QualityGateStats } from "@/components/QualityGateStats";
import { motion } from "framer-motion";

import { Variants } from "framer-motion";

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
};

export default function HistoryPage() {
  return (
    <div className="min-h-full py-8 overflow-x-hidden">
      <motion.div 
        variants={container} 
        initial="hidden" 
        animate="show"
        className="w-full max-w-[1400px] mx-auto px-8 flex flex-col gap-6"
      >
        
        {/* Header Section */}
        <motion.div variants={item}>
           <h1 className="text-3xl font-bold text-white tracking-tight">Command Dashboard</h1>
           <p className="text-zinc-400 mt-1">Métricas de Operação e acompanhamento em tempo real</p>
        </motion.div>

        {/* KPIs */}
        <motion.div variants={item}>
          <KPIBentoCards />
        </motion.div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full">
           <motion.div variants={item} className="lg:col-span-2">
             <VolumeAreaChart />
           </motion.div>
           <motion.div variants={item} className="flex flex-col gap-6">
             <DistributionCharts />
             <QualityGateStats />
           </motion.div>
        </div>

        {/* History Table with Pagination */}
        <motion.div variants={item}>
          <HistoryList />
        </motion.div>
        
      </motion.div>
    </div>
  );
}
