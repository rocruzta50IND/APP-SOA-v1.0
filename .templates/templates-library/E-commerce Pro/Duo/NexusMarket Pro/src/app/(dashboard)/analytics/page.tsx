"use client";

import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  ArrowUpRight, 
  Calendar,
  PieChart as PieChartIcon,
  Globe,
  MousePointer2
} from "lucide-react";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const growthData = [
  { day: "01", active: 2400, new: 400 },
  { day: "05", active: 1398, new: 300 },
  { day: "10", active: 9800, new: 2000 },
  { day: "15", active: 3908, new: 1200 },
  { day: "20", active: 4800, new: 1100 },
  { day: "25", active: 3800, new: 900 },
  { day: "30", active: 4300, new: 1000 },
];

const categoryData = [
  { name: "Direct", value: 400, color: "#4F46E5" },
  { name: "Referral", value: 300, color: "#818CF8" },
  { name: "Organic", value: 300, color: "#C7D2FE" },
  { name: "Social", value: 200, color: "#E0E7FF" },
];

export default function AnalyticsPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
            Intelligence Reports
          </h1>
          <p className="text-muted-foreground mt-1">Deep dive into your market performance and user behavior.</p>
        </div>
        <Button variant="outline" className="border-white/10 bg-white/5 rounded-xl gap-2 text-xs">
          <Calendar className="h-4 w-4" />
          Last 30 Days
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 bg-white/5 border-white/10 backdrop-blur-md">
          <CardHeader>
            <CardTitle className="text-sm font-semibold flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-primary" />
              User Growth Trajectory
            </CardTitle>
          </CardHeader>
          <CardContent className="h-[350px] w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={growthData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ffffff08" />
                <XAxis 
                  dataKey="day" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#888888', fontSize: 10 }}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#888888', fontSize: 10 }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(0, 0, 0, 0.8)', 
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '12px',
                    fontSize: '12px'
                  }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="active" 
                  stroke="#4F46E5" 
                  strokeWidth={3} 
                  dot={{ r: 4, fill: "#4F46E5", strokeWidth: 2, stroke: "#000" }}
                  activeDot={{ r: 6, strokeWidth: 0 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="new" 
                  stroke="#818CF8" 
                  strokeWidth={2} 
                  strokeDasharray="5 5"
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-white/10 backdrop-blur-md">
          <CardHeader>
            <CardTitle className="text-sm font-semibold flex items-center gap-2">
              <PieChartIcon className="h-4 w-4 text-primary" />
              Traffic Sources
            </CardTitle>
          </CardHeader>
          <CardContent className="h-[350px] flex flex-col items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(0, 0, 0, 0.8)', 
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '12px',
                    fontSize: '12px'
                  }} 
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-4 w-full mt-4">
              {categoryData.map((item) => (
                <div key={item.name} className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">{item.name}</span>
                  <span className="text-[10px] font-bold ml-auto">{item.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: "Global Reach", value: "84 Countries", icon: Globe, detail: "+5 new this month" },
          { label: "Conversion Rate", value: "4.82%", icon: MousePointer2, detail: "+1.2% from avg" },
          { label: "Avg Session", value: "12m 45s", icon: Calendar, detail: "-30s from yesterday" },
        ].map((item, i) => (
          <Card key={i} className="bg-white/5 border-white/10 backdrop-blur-md group hover:border-primary/50 transition-all">
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{item.label}</p>
                  <p className="text-2xl font-black tracking-tighter mt-2">{item.value}</p>
                  <p className="text-[10px] text-emerald-400 font-medium mt-1">{item.detail}</p>
                </div>
                <div className="h-10 w-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-primary transition-all">
                  <item.icon className="h-5 w-5 text-primary group-hover:text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
