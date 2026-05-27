"use client";

import { motion } from "framer-motion";
import { Zap, TrendingUp, AlertCircle, ShieldCheck, Cpu } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";

const insights = [
  {
    title: "Anomalous Traffic Detected",
    description: "Unexpected spike in API requests from Southeast Asia region. Recommended to verify origin headers.",
    icon: AlertCircle,
    color: "text-rose-500",
    size: "col-span-2",
  },
  {
    title: "Infrastructure Optimization",
    description: "Unused EC2 instances detected. Switching to t4g.medium could save $1,200/month.",
    icon: Zap,
    color: "text-amber-500",
    size: "col-span-1",
  },
  {
    title: "Security Shield Active",
    description: "WAF blocked 12,000 malicious attempts in the last 24h. System integrity at 100%.",
    icon: ShieldCheck,
    color: "text-emerald-500",
    size: "col-span-1",
  },
  {
    title: "Growth Projection",
    description: "Based on current trends, you will reach 10,000 active users by July. Scaling plan suggested.",
    icon: TrendingUp,
    color: "text-primary",
    size: "col-span-2",
  },
  {
    title: "Resource Utilization",
    description: "CPU usage averaged 34% this week. Your infrastructure is currently over-provisioned.",
    icon: Cpu,
    color: "text-muted-foreground",
    size: "col-span-1",
  },
];

export default function InsightsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold tracking-tight">AI Insights</h1>
        <p className="text-sm text-muted-foreground">
          Autonomous intelligence applied to your enterprise data.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {insights.map((insight, i) => (
          <motion.div
            key={insight.title}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2, delay: i * 0.05 }}
            className={insight.size}
          >
            <Card className="h-full border-border/50">
              <CardHeader className="flex flex-row items-center gap-3 space-y-0">
                <div className={`p-2 rounded-md bg-muted ${insight.color}`}>
                  <insight.icon className="h-4 w-4" />
                </div>
                <CardTitle className="text-sm font-semibold">{insight.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {insight.description}
                </p>
                <div className="mt-4 flex items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-primary hover:underline cursor-pointer">
                    Take Action
                  </span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
