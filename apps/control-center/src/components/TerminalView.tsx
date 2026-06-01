"use client";

import React, { useEffect, useRef } from "react";
import { Terminal } from "@xterm/xterm";
import { FitAddon } from "@xterm/addon-fit";
import "@xterm/xterm/css/xterm.css";

interface TerminalViewProps {
  sessionId: string;
  active: boolean;
}

export default function TerminalView({ sessionId, active }: TerminalViewProps) {
  const terminalRef = useRef<HTMLDivElement>(null);
  const termInstance = useRef<Terminal | null>(null);
  const fitAddon = useRef<FitAddon | null>(null);

  // Initialize terminal and subscribe to telemetry in a single managed lifecycle
  useEffect(() => {
    if (!terminalRef.current) return;

    // 1. Initialize Terminal Instance
    const term = new Terminal({
      cursorBlink: true,
      disableStdin: true,
      fontSize: 13,
      fontFamily: 'JetBrains Mono, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
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

    // 2. Initial Refit & History Restoration
    const restoreHistory = async () => {
      if ((window.electronAPI as any).getSessionLogs) {
        const history = await (window.electronAPI as any).getSessionLogs(sessionId);
        if (history) {
          term.write(history);
        } else {
          term.writeln(`\x1b[36m⚡ PIPELINE [${sessionId}] CONECTADA\x1b[0m`);
        }
      }
      
      setTimeout(() => {
        try { fit.fit(); } catch (e) {}
      }, 100);
    };
    restoreHistory();

    // 3. Subscribe to Telemetry
    const unsubscribe = window.electronAPI.onRawTelemetry((payload: any) => {
      if (payload.sessionId === sessionId) {
        // Ensure we are writing to the local term instance created in this effect
        term.write(payload.data);
      }
    });

    const handleResize = () => {
      try { fit.fit(); } catch (e) {}
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      unsubscribe();
      term.dispose();
      termInstance.current = null;
      fitAddon.current = null;
    };
  }, [sessionId]); // Re-run only if sessionId changes, though usually it's unique per component instance

  // Refit when becomes active
  useEffect(() => {
    if (active && fitAddon.current) {
      setTimeout(() => {
        try { fitAddon.current?.fit(); } catch (e) {}
      }, 50);
    }
  }, [active]);

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
