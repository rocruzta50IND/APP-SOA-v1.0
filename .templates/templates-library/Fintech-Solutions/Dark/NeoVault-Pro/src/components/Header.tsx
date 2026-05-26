
import React from 'react';
import { Search, Bell, User } from 'lucide-react';

const Header = () => {
  return (
    <header className="h-16 border-b border-zinc-800 bg-zinc-950/50 backdrop-blur-md sticky top-0 z-10 flex items-center justify-between px-8">
      <div className="flex items-center bg-zinc-900 rounded-full px-4 py-1.5 w-96">
        <Search className="size-4 text-zinc-500 mr-2" />
        <input 
          type="text" 
          placeholder="Search transactions, assets, or institutions..." 
          className="bg-transparent border-none focus:outline-none text-sm w-full text-zinc-300"
        />
      </div>

      <div className="flex items-center gap-4">
        <button className="relative p-2 text-zinc-400 hover:text-white transition-colors">
          <Bell className="size-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-blue-500 rounded-full"></span>
        </button>
        <div className="h-8 w-[1px] bg-zinc-800 mx-2"></div>
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-sm font-medium">Institutional Admin</p>
            <p className="text-xs text-zinc-500">Goldman Sachs Node</p>
          </div>
          <div className="w-8 h-8 bg-zinc-800 rounded-full flex items-center justify-center border border-zinc-700">
            <User className="size-4 text-zinc-400" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
