"use client";

import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from "recharts";
import { Download, Calendar, Filter } from "lucide-react";

const barData = [
  { name: "Email", value: 4500 },
  { name: "Social", value: 3200 },
  { name: "Direct", value: 1800 },
  { name: "Referral", value: 2400 },
  { name: "Ads", value: 5100 },
];

const pieData = [
  { name: "Enterprise", value: 400 },
  { name: "Mid-Market", value: 300 },
  { name: "SMB", value: 200 },
  { name: "Startup", value: 100 },
];

const COLORS = ["#000000", "#333333", "#666666", "#999999"];

export default function ReportsPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Analytics & Reports</h1>
          <p className="text-muted-foreground text-sm">Deep dive into your performance metrics and ROI.</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 border border-border/50 px-4 py-2 text-sm font-medium hover:bg-muted transition-colors">
            <Calendar className="w-4 h-4" />
            Last 30 Days
          </button>
          <button className="flex items-center gap-2 bg-black text-white px-4 py-2 text-sm font-medium hover:bg-black/90 transition-colors">
            <Download className="w-4 h-4" />
            Export PDF
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Source Distribution */}
        <div className="p-6 border border-border/50 bg-white">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">Traffic Sources</h3>
            <button className="p-1 hover:bg-muted rounded text-muted-foreground">
              <Filter className="w-4 h-4" />
            </button>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fill: "#888", fontWeight: "bold" }}
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fill: "#888" }}
                />
                <Tooltip 
                  cursor={{ fill: "#f5f5f5" }}
                  contentStyle={{ 
                    backgroundColor: "#fff", 
                    border: "1px solid #eee",
                    borderRadius: "0px",
                    boxShadow: "none"
                  }}
                />
                <Bar dataKey="value" fill="#000" barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Segment Distribution */}
        <div className="p-6 border border-border/50 bg-white">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">Customer Segments</h3>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "#fff", 
                    border: "1px solid #eee",
                    borderRadius: "0px"
                  }}
                />
                <Legend 
                  verticalAlign="bottom" 
                  height={36} 
                  iconType="square"
                  formatter={(value) => <span className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">{value}</span>}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Summary Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: "Cost Per Acquisition", value: "$42.50", sub: "Down 12% from last month" },
          { label: "Customer LTV", value: "$12,400", sub: "Up 5.2% from last month" },
          { label: "Marketing ROI", value: "4.8x", sub: "Target: 4.0x" },
        ].map((item, i) => (
          <div key={i} className="p-6 border border-border/50 bg-white">
            <p className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground mb-4">{item.label}</p>
            <p className="text-3xl font-black tracking-tighter mb-1">{item.value}</p>
            <p className="text-[10px] text-muted-foreground uppercase tracking-widest">{item.sub}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
