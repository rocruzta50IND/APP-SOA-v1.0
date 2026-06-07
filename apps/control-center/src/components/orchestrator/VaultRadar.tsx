"use client";
import React from 'react';
import { motion } from 'framer-motion';

export function VaultRadar({ variants }: { variants: any }) {
  return (
    <motion.section variants={variants} className="col-span-3 bg-zinc-900/40 rounded-xl border border-emerald-500/10 p-4 flex flex-col gap-4">
      <h2 className="text-lg font-semibold text-zinc-200 flex items-center gap-2 border-b border-emerald-500/10 pb-2">
        Vault Radar
      </h2>
      <div className="flex-1 overflow-y-auto space-y-2 pr-2">
        {[
          '00-MASTER.md',
          '01-TRACKS.md',
          'context.md',
          'summary.md'
        ].map((file, i) => (
          <div key={i} className="flex items-center gap-3 p-2 rounded hover:bg-emerald-500/10 cursor-pointer transition-colors group">
            <span className="text-emerald-500/50 group-hover:text-emerald-400">📄</span>
            <span className="text-sm font-mono text-zinc-400 group-hover:text-emerald-300">{file}</span>
          </div>
        ))}
      </div>
    </motion.section>
  );
}