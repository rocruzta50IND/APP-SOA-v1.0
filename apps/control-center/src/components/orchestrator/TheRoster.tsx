"use client";
import React from 'react';
import { motion } from 'framer-motion';

export function TheRoster({ variants }: { variants: any }) {
  return (
    <motion.section variants={variants} className="col-span-3 bg-zinc-900/40 rounded-xl border border-emerald-500/10 p-4 flex flex-col gap-4">
      <h2 className="text-lg font-semibold text-zinc-200 flex items-center gap-2 border-b border-emerald-500/10 pb-2">
        The Roster
      </h2>
      <div className="flex-1 overflow-y-auto space-y-3 pr-2">
        {[
          { name: 'Architect', status: 'idle', color: 'text-zinc-400' },
          { name: 'Guardian', status: 'active', color: 'text-emerald-400' },
          { name: 'Janitor', status: 'offline', color: 'text-red-400' },
          { name: 'Refiner', status: 'idle', color: 'text-zinc-400' },
        ].map((agent, i) => (
          <div key={i} className="flex justify-between items-center p-3 rounded-lg bg-zinc-900/80 border border-emerald-500/5 hover:border-emerald-500/20 transition-colors">
            <span className="font-medium text-sm text-zinc-300">{agent.name}</span>
            <span className={`text-xs uppercase tracking-wider ${agent.color}`}>{agent.status}</span>
          </div>
        ))}
      </div>
    </motion.section>
  );
}