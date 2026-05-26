
"use client";

import React from 'react';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import { 
  MOCK_METRICS, 
  SETTLEMENT_DATA, 
  ASSET_ALLOCATION, 
  RECENT_TRANSACTIONS,
  PREDICTIVE_DATA 
} from '@/lib/mock-data';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar
} from 'recharts';
import { 
  ArrowUpRight, 
  ArrowDownRight, 
  MoreHorizontal, 
  Zap, 
  Shield, 
  Globe,
  TrendingUp 
} from 'lucide-react';

export default function Dashboard() {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex">
      <Sidebar />
      
      <main className="flex-1 ml-64">
        <Header />
        
        <div className="p-8 space-y-8">
          {/* Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {MOCK_METRICS.map((metric) => (
              <div key={metric.label} className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl">
                <p className="text-sm text-zinc-500 font-medium">{metric.label}</p>
                <div className="mt-2 flex items-end justify-between">
                  <h3 className="text-2xl font-bold">{metric.value}</h3>
                  <div className={`flex items-center text-xs font-semibold px-2 py-1 rounded-full ${
                    metric.trend === 'up' ? 'text-green-400 bg-green-400/10' : 
                    metric.trend === 'down' ? 'text-red-400 bg-red-400/10' : 
                    'text-zinc-400 bg-zinc-400/10'
                  }`}>
                    {metric.trend === 'up' && <ArrowUpRight className="size-3 mr-1" />}
                    {metric.trend === 'down' && <ArrowDownRight className="size-3 mr-1" />}
                    {metric.change}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bento Box Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Real-time Settlement Monitoring */}
            <div className="lg:col-span-2 bg-zinc-900 border border-zinc-800 p-6 rounded-2xl flex flex-col min-h-[400px]">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-bold flex items-center gap-2">
                    <Zap className="size-5 text-blue-500" />
                    Real-time Settlement Monitoring
                  </h3>
                  <p className="text-sm text-zinc-500">Live throughput and node latency across the network</p>
                </div>
                <div className="flex gap-2">
                  <span className="flex items-center gap-1.5 text-xs text-zinc-400">
                    <div className="w-2 h-2 rounded-full bg-blue-500"></div> Volume
                  </span>
                  <span className="flex items-center gap-1.5 text-xs text-zinc-400">
                    <div className="w-2 h-2 rounded-full bg-zinc-600"></div> Latency (ms)
                  </span>
                </div>
              </div>
              <div className="flex-1 w-full h-[300px]">
                {mounted && (
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={SETTLEMENT_DATA} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorVolume" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                      <XAxis dataKey="time" stroke="#52525b" fontSize={12} tickLine={false} axisLine={false} />
                      <YAxis stroke="#52525b" fontSize={12} tickLine={false} axisLine={false} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#18181b', border: '1px solid #27272a', borderRadius: '8px' }}
                        itemStyle={{ color: '#fff' }}
                      />
                      <Area type="monotone" dataKey="volume" stroke="#3b82f6" fillOpacity={1} fill="url(#colorVolume)" />
                      <Line type="monotone" dataKey="latency" stroke="#71717a" strokeWidth={2} dot={false} />
                    </AreaChart>
                  </ResponsiveContainer>
                )}
              </div>
            </div>

            {/* Asset Allocation Heatmap/Pie */}
            <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl flex flex-col min-h-[400px]">
              <div className="mb-6">
                <h3 className="text-lg font-bold flex items-center gap-2">
                  <Shield className="size-5 text-purple-500" />
                  Asset Allocation
                </h3>
                <p className="text-sm text-zinc-500">Current custody distribution by asset class</p>
              </div>
              <div className="flex-1 flex flex-col items-center justify-center h-[280px]">
                {mounted && (
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={ASSET_ALLOCATION}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {ASSET_ALLOCATION.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                )}
                <div className="grid grid-cols-2 gap-x-8 gap-y-2 w-full mt-4">
                  {ASSET_ALLOCATION.map((item) => (
                    <div key={item.name} className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }}></div>
                      <span className="text-xs font-medium">{item.name}</span>
                      <span className="text-[10px] text-zinc-500 ml-auto">{item.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Predictive Analytics */}
            <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl flex flex-col min-h-[400px]">
              <div className="mb-6">
                <h3 className="text-lg font-bold flex items-center gap-2">
                  <TrendingUp className="size-5 text-green-500" />
                  Predictive Analytics
                </h3>
                <p className="text-sm text-zinc-500">ML-driven asset volume projection</p>
              </div>
              <div className="flex-1 w-full h-[250px]">
                {mounted && (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={PREDICTIVE_DATA} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                      <XAxis dataKey="month" stroke="#52525b" fontSize={12} tickLine={false} axisLine={false} />
                      <YAxis stroke="#52525b" fontSize={12} tickLine={false} axisLine={false} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#18181b', border: '1px solid #27272a', borderRadius: '8px' }}
                      />
                      <Bar dataKey="actual" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="predicted" fill="#1e3a8a" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                )}
              </div>
            </div>

            {/* Transaction History */}
            <div className="lg:col-span-2 bg-zinc-900 border border-zinc-800 p-6 rounded-2xl overflow-hidden flex flex-col min-h-[400px]">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-bold flex items-center gap-2">
                    <Globe className="size-5 text-blue-400" />
                    Institutional Transaction History
                  </h3>
                  <p className="text-sm text-zinc-500">Real-time audit log of all network activity</p>
                </div>
                <button className="text-zinc-500 hover:text-white transition-colors">
                  <MoreHorizontal className="size-5" />
                </button>
              </div>
              <div className="flex-1 overflow-auto">
                <table className="w-full text-left">
                  <thead className="text-xs text-zinc-500 uppercase border-b border-zinc-800">
                    <tr>
                      <th className="pb-3 font-medium">Transaction ID</th>
                      <th className="pb-3 font-medium">Counterparty</th>
                      <th className="pb-3 font-medium">Asset</th>
                      <th className="pb-3 font-medium text-right">Amount</th>
                      <th className="pb-3 font-medium text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm divide-y divide-zinc-800/50">
                    {RECENT_TRANSACTIONS.map((tx) => (
                      <tr key={tx.id} className="hover:bg-zinc-800/30 transition-colors group">
                        <td className="py-4 font-mono text-xs text-blue-400">{tx.id}</td>
                        <td className="py-4 font-medium">{tx.counterparty}</td>
                        <td className="py-4 text-zinc-400">{tx.asset}</td>
                        <td className="py-4 text-right font-medium">{tx.amount}</td>
                        <td className="py-4 text-right">
                          <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${
                            tx.status === 'Completed' ? 'bg-green-500/10 text-green-500' :
                            tx.status === 'Processing' ? 'bg-blue-500/10 text-blue-500' :
                            'bg-red-500/10 text-red-500'
                          }`}>
                            {tx.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}
