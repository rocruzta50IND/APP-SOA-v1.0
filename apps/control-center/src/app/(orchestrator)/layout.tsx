import React from 'react';

export default function OrchestratorLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-zinc-950 text-zinc-50 h-full w-full font-sans flex flex-col overflow-hidden">
      {children}
    </div>
  );
}
