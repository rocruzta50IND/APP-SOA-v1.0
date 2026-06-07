"use client";
import React from 'react';
import { motion } from 'framer-motion';

export function MissionControl({ variants }: { variants: any }) {
  return (
    <motion.section variants={variants} className="col-span-6 bg-zinc-900/40 rounded-xl border border-emerald-500/10 p-4 flex flex-col gap-4">
      <h2 className="text-lg font-semibold text-zinc-200 flex items-center gap-2 border-b border-emerald-500/10 pb-2">
        Mission Control
      </h2>
      <div className="flex-1 flex flex-col gap-4 overflow-y-auto pr-2">
        <div className="bg-emerald-900/10 border border-emerald-500/20 rounded-lg p-4">
          <h3 className="text-sm font-semibold text-emerald-400 mb-2">Current Mission State</h3>
          <p className="text-sm text-zinc-300 leading-relaxed font-mono">
            Phase 3: Integration.<br/>
            Objective: Establish MVP Templates Factory.<br/>
            Progress: 45%
          </p>
        </div>
        
        <div className="bg-zinc-900/80 border border-emerald-500/10 rounded-lg p-4 flex-1">
          <h3 className="text-sm font-semibold text-zinc-300 mb-2">Roadmap</h3>
          <ul className="space-y-3 text-sm text-zinc-400">
            <li className="flex items-center gap-3">
              <div className="w-5 h-5 rounded-full bg-emerald-500/20 border border-emerald-500 flex items-center justify-center text-xs text-emerald-500">✓</div>
              Define blueprint
            </li>
            <li className="flex items-center gap-3">
              <div className="w-5 h-5 rounded-full bg-emerald-500/20 border border-emerald-500 flex items-center justify-center text-xs text-emerald-500 animate-pulse"></div>
              <span className="text-emerald-400">Implement mock UI</span>
            </li>
            <li className="flex items-center gap-3">
              <div className="w-5 h-5 rounded-full border border-zinc-700"></div>
              Connect real data
            </li>
          </ul>
        </div>
      </div>
    </motion.section>
  );
}