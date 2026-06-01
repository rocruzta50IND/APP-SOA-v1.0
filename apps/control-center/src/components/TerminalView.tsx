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

    // Helper to ensure proper line endings for xterm.js (\r\n)
    const formatForXterm = (text: any) => {
      if (typeof text !== 'string') return text;
      // Replace only single \n with \r\n, avoid doubling \r if already present
      return text.replace(/\r?\n/g, '\r\n');
    };

    // 2. Initial Refit & History Restoration
    const restoreHistory = async () => {
      try {
        if ((window.electronAPI as any).getActiveSession) {
          const session = await (window.electronAPI as any).getActiveSession(sessionId);
          if (session && session.logBuffer) {
            term.write(formatForXterm(session.logBuffer));
            term.scrollToBottom();
          } else {
            term.writeln(`\x1b[36m⚡ PIPELINE [${sessionId}] CONECTADA\x1b[0m`);
          }
        }
      } catch (err) {
        term.writeln(`\x1b[31m❌ Erro ao recuperar histórico do backend.\x1b[0m`);
      }
      
      // Ensure fit happens after content is loaded
      setTimeout(() => {
        try { fit.fit(); } catch (e) {}
      }, 150);
    };
    restoreHistory();

    // 3. Subscribe to Telemetry
    const unsubscribe = window.electronAPI.onRawTelemetry((payload: any) => {
      // Robust payload check
      if (payload && typeof payload === 'object' && payload.sessionId === sessionId) {
        if (payload.data) {
          term.write(formatForXterm(payload.data));
        }
      } else if (typeof payload === 'string' && sessionId.startsWith('forge')) {
          // Fallback for legacy or direct string telemetry
          term.write(formatForXterm(payload));
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
