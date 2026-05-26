
import React from 'react';
import { 
  LayoutDashboard, 
  ShieldCheck, 
  RefreshCcw, 
  TrendingUp, 
  PieChart, 
  History, 
  Settings, 
  LogOut,
  Vault
} from 'lucide-react';

const Sidebar = () => {
  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', active: true },
    { icon: ShieldCheck, label: 'Custody', active: false },
    { icon: RefreshCcw, label: 'Settlements', active: false },
    { icon: TrendingUp, label: 'Analytics', active: false },
    { icon: PieChart, label: 'Allocation', active: false },
    { icon: History, label: 'History', active: false },
  ];

  return (
    <aside className="w-64 bg-zinc-950 border-r border-zinc-800 flex flex-col h-screen fixed left-0 top-0">
      <div className="p-6 flex items-center gap-3">
        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
          <Vault className="text-white size-5" />
        </div>
        <span className="font-bold text-xl tracking-tight">NeoVault <span className="text-blue-500">Pro</span></span>
      </div>

      <nav className="flex-1 px-4 mt-6">
        <div className="space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.label}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                item.active 
                  ? 'bg-zinc-900 text-white' 
                  : 'text-zinc-400 hover:bg-zinc-900 hover:text-white'
              }`}
            >
              <item.icon className="size-4" />
              {item.label}
            </button>
          ))}
        </div>
      </nav>

      <div className="p-4 border-t border-zinc-800 space-y-1">
        <button className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-zinc-400 hover:bg-zinc-900 hover:text-white transition-colors">
          <Settings className="size-4" />
          Settings
        </button>
        <button className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-red-400 hover:bg-red-950/30 transition-colors">
          <LogOut className="size-4" />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
