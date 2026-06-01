"use client";

import React, { useEffect, useRef } from "react";
import { Terminal } from "@xterm/xterm";
import { FitAddon } from "@xterm/addon-fit";
import "@xterm/xterm/css/xterm.css";

interface TerminalViewProps {
  sessionId: string;
  active: boolean;
  agentId?: string; // NEW: support for tabs
}

export default function TerminalView({ sessionId, active, agentId = 'orchestrator' }: TerminalViewProps) {
  const terminalRef = useRef<HTMLDivElement>(null);
  const termInstance = useRef<Terminal | null>(null);
  const fitAddon = useRef<FitAddon | null>(null);

  // Helper to ensure proper line endings for xterm.js (\r\n)
  const formatForXterm = (text: any) => {
    if (typeof text !== 'string') return text;
    return text.replace(/\r?\n/g, '\r\n');
  };

  // 1. Initialize Terminal Instance (Only once per sessionId)
  useEffect(() => {
    if (!terminalRef.current) return;

    const term = new Terminal({
      cursorBlink: true,
      disableStdin: true,
      fontSize: 12,
      fontFamily: 'JetBrains Mono, Menlo, Monaco, Consolas, monospace',
      theme: {
        background: '#0a0a0a',
        foreground: '#e4e4e7',
        cyan: '#22d3ee',
        green: '#4ade80',
        yellow: '#fbbf24',
        red: '#f87171',
        magenta: '#c084fc',
        blue: '#60a5fa',
      },
      allowProposedApi: true,
    });

    const fit = new FitAddon();
    term.loadAddon(fit);
    term.open(terminalRef.current);
    
    termInstance.current = term;
    fitAddon.current = fit;

    const handleResize = () => {
      try { fit.fit(); } catch (e) {}
    };
    window.addEventListener('resize', handleResize);

    // 3. Subscribe to Telemetry (Global for this sessionId)
    const unsubscribe = window.electronAPI.onRawTelemetry((payload: any) => {
      // HANDLE BOTH WRAPPED OBJECT AND RAW STRING (Legacy support)
      const isObject = payload && typeof payload === 'object';
      const pid = isObject ? payload.sessionId : null;
      
      if (pid === sessionId || !pid) {
        const msgAgentId = isObject ? (payload.agentId || 'orchestrator') : 'orchestrator';
        const msgData = isObject ? payload.data : payload;

        // ONLY WRITE if it matches current agentId
        if (msgAgentId === agentId) {
          if (msgData) {
            term.write(formatForXterm(msgData));
          }
        }
      }
    });

    return () => {
      window.removeEventListener('resize', handleResize);
      unsubscribe();
      term.dispose();
      termInstance.current = null;
      fitAddon.current = null;
    };
  }, [sessionId, agentId]); // Re-subscribe when agentId changes to capture correct stream

  // 2. Handle Agent Switch (Clear & Load History)
  useEffect(() => {
    const term = termInstance.current;
    if (!term) return;

    const restoreHistory = async () => {
      term.clear();
      try {
        if ((window.electronAPI as any).getActiveSession) {
          const session = await (window.electronAPI as any).getActiveSession(sessionId);
          if (session && session.logBuffers && session.logBuffers[agentId]) {
            term.write(formatForXterm(session.logBuffers[agentId]));
            term.scrollToBottom();
          } else {
            term.writeln(`\x1b[36m⚡ [${agentId.toUpperCase()}] CONECTADO\x1b[0m`);
          }
        }
      } catch (err) {
        term.writeln(`\x1b[31m❌ Erro ao recuperar histórico do agente.\x1b[0m`);
      }
      
      setTimeout(() => {
        try { fitAddon.current?.fit(); } catch (e) {}
      }, 100);
    };

    restoreHistory();
  }, [sessionId, agentId]);

  // Refit when becomes active or dimensions change
  useEffect(() => {
    const triggerFit = () => {
      try {
        if (fitAddon.current) {
          fitAddon.current.fit();
        }
      } catch (e) {
        // Ignore fit errors if terminal is not ready
      }
    };

    if (active) {
      // Immediate fit
      triggerFit();
      
      // Delayed fits to handle animation completion
      const timer1 = setTimeout(triggerFit, 100);
      const timer2 = setTimeout(triggerFit, 500);
      const timer3 = setTimeout(triggerFit, 1000);
      
      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
        clearTimeout(timer3);
      };
    }
  }, [active]);

  // Handle ResizeObserver for the container
  useEffect(() => {
    if (!terminalRef.current) return;

    const observer = new ResizeObserver(() => {
      try {
        fitAddon.current?.fit();
      } catch (e) {}
    });

    observer.observe(terminalRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div 
      className={`w-full h-full p-4 bg-[#0a0a0a] relative ${active ? 'block' : 'hidden'}`}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/[0.02] pointer-events-none z-10" />
      <div 
        ref={terminalRef} 
        className="w-full h-full [&_.xterm-viewport]:custom-scrollbar"
      />
    </div>
  );
}
