"use client";

import React, { useState, useEffect } from "react";
import { Activity, Zap, X, Terminal as TerminalIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import TerminalView from "@/components/TerminalView";

interface Session {
  id: string;
  name: string;
  type: 'forge' | 'gemini';
  status: 'running' | 'ended';
}

export default function LogsPage() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [activeSessionId, setActiveSessionId] = useState<string | null>(null);

  useEffect(() => {
    if (!window.electronAPI) return;

    // 1. Recover existing sessions from backend
    const recoverSessions = async () => {
      if ((window.electronAPI as any).getActiveSessions) {
        const activeSessions = await (window.electronAPI as any).getActiveSessions();
        if (activeSessions && activeSessions.length > 0) {
          setSessions(activeSessions);
          setActiveSessionId(activeSessions[activeSessions.length - 1].id);
        }
      }
    };
    recoverSessions();

    // 2. Listen for new sessions from the orchestrator (Backend)
    const unsubscribe = window.electronAPI.onSessionStarted((sessionData: any) => {
      const newSession: Session = {
        id: sessionData.sessionId,
        name: sessionData.name,
        type: sessionData.type,
        status: 'running'
      };
      
      setSessions(prev => {
        // Prevent duplicate sessions if any
        if (prev.find(s => s.id === newSession.id)) return prev;
        return [...prev, newSession];
      });
      setActiveSessionId(newSession.id);
    });

    return () => unsubscribe();
  }, []);

  const closeSession = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (window.electronAPI) window.electronAPI.killSession(id);
    const newSessions = sessions.filter(s => s.id !== id);
    setSessions(newSessions);
    if (activeSessionId === id) {
      setActiveSessionId(newSessions.length > 0 ? newSessions[newSessions.length - 1].id : null);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] bg-[#0a0a0a] overflow-hidden">
      {/* Tabs Header */}
      <header className="h-12 border-b border-white/5 flex items-center px-4 bg-zinc-900/40 shrink-0 gap-2 overflow-x-auto no-scrollbar">
        {sessions.map((session) => (
          <div
            key={session.id}
            onClick={() => setActiveSessionId(session.id)}
            className={cn(
              "group flex items-center gap-2 px-4 py-1.5 rounded-t-lg transition-all cursor-pointer border-x border-t border-transparent min-w-[140px] max-w-[220px]",
              activeSessionId === session.id 
                ? "bg-[#0a0a0a] border-white/10 text-white shadow-[0_-2px_10px_rgba(255,255,255,0.02)]" 
                : "text-zinc-500 hover:text-zinc-300 hover:bg-white/5"
            )}
          >
            {session.type === 'gemini' ? (
              <Zap className="w-3.5 h-3.5 text-amber-500" />
            ) : (
              <Activity className="w-3.5 h-3.5 text-emerald-500" />
            )}
            <span className="text-[11px] font-bold truncate flex-1 uppercase tracking-tight font-mono">{session.name}</span>
            <button 
              onClick={(e) => closeSession(e, session.id)}
              className="opacity-0 group-hover:opacity-100 hover:bg-white/10 p-0.5 rounded transition-all"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        ))}
      </header>

      {/* Sub-header / Status Bar */}
      <div className="h-10 border-b border-white/5 flex items-center justify-between px-8 bg-black/20 shrink-0">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <div className={cn(
              "w-1.5 h-1.5 rounded-full",
              activeSessionId ? "bg-emerald-500 animate-pulse shadow-[0_0_8px_#10b981]" : "bg-zinc-700"
            )} />
            <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.2em] font-mono">
              {activeSessionId ? `STREAMING::${activeSessionId}` : 'LISTENING_FOR_ORCHESTRATOR'}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
           <span className="text-[9px] font-bold text-zinc-600 uppercase tracking-widest font-mono">
            Reactive PTY Engine v3.0 // Carbon Theme
          </span>
        </div>
      </div>

      {/* Terminals Container */}
      <main className="flex-1 relative overflow-hidden">
        {sessions.length === 0 ? (
          <div className="w-full h-full flex flex-col items-center justify-center gap-6 text-zinc-800">
            <div className="relative">
              <TerminalIcon className="w-16 h-16 opacity-10" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-1 h-1 bg-zinc-800 rounded-full animate-ping" />
              </div>
            </div>
            <div className="flex flex-col items-center gap-2">
              <p className="text-[10px] font-mono uppercase tracking-[0.4em] animate-pulse">Aguardando sinal do motor...</p>
              <p className="text-[9px] font-mono text-zinc-600 italic">Inicie uma forja na galeria para abrir a telemetria.</p>
            </div>
          </div>
        ) : (
          sessions.map((session) => (
            <TerminalView 
              key={session.id} 
              sessionId={session.id} 
              active={activeSessionId === session.id} 
            />
          ))
        )}
      </main>

      {/* Bottom Bar */}
      <footer className="h-8 border-t border-white/5 bg-black/60 px-8 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest font-mono">
              Active Pipelines: {sessions.length}
            </span>
          </div>
          <div className="h-3 w-[1px] bg-white/10" />
          <span className="text-[9px] text-zinc-700 font-mono uppercase tracking-widest">
            Secure IPC Bridge Active
          </span>
        </div>
        <div className="text-[9px] text-zinc-800 font-mono italic">
          TELEMETRY_CORE_R4 // MODE: REACTIVE_ORCHESTRATION
        </div>
      </footer>
    </div>
  );
}
