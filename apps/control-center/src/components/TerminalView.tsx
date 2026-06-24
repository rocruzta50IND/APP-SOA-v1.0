"use client";

import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface TerminalViewProps {
  sessionId: string;
  active: boolean;
  agentId?: string;
}

export default function TerminalView({ sessionId, active, agentId = 'orchestrator' }: TerminalViewProps) {
  const containerRef = useRef<any>(null);
  const instances = useRef<{ [key: string]: { term: any, fit: any, el: any } }>({});
  const isHydrated = useRef<{ [key: string]: boolean }>({});
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const formatForXterm = (text: any) => {
    // Blindagem agressiva antes de qualquer .replace
    const safeText = typeof text === 'string' ? text : (Array.isArray(text) ? text.join('') : (text?.data || String(text || '')));
    if (typeof safeText !== 'string') return '';
    return safeText.replace(/\r?\n/g, '\r\n');
  };

  // 1. Manage Terminal Instances
  useEffect(() => {
    if (!isClient || !containerRef.current) return;
    
    const initTerminal = async () => {
      // Initialize if missing
      if (!instances.current[agentId]) {
        try {
          // Dynamic imports to avoid SSR issues - STRICTLY CLIENT SIDE
          const { Terminal } = await import("@xterm/xterm");
          const { FitAddon } = await import("@xterm/addon-fit");
          await import("@xterm/xterm/css/xterm.css");

          const el = document.createElement('div');
          el.className = 'absolute inset-0 w-full h-full bg-[#09090b] [&_.xterm-viewport]:custom-scrollbar transition-opacity duration-200';
          containerRef.current!.appendChild(el);

          const term = new Terminal({
            cursorBlink: true,
            disableStdin: true, // <-- TERMINAL READ-ONLY (Blindado)
            fontSize: 14,
            fontFamily: 'JetBrains Mono, Menlo, Monaco, Consolas, monospace',
            theme: {
              background: '#050505',
              foreground: '#e4e4e7',
              cursor: '#f59e0b',
              selectionBackground: 'rgba(245, 158, 11, 0.3)',
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
          term.open(el);
          
          term.onData((data) => {
            if (window.electronAPI && window.electronAPI.sendTerminalData) {
              window.electronAPI.sendTerminalData(sessionId, data);
            }
          });

          instances.current[agentId] = { term, fit, el };

          // Load history
          if (!isHydrated.current[agentId]) {
            if (window.electronAPI && window.electronAPI.getSessionLogs) {
              window.electronAPI.getSessionLogs(sessionId).then((logs: any) => {
                const safeLogs = typeof logs === 'string' ? logs : (Array.isArray(logs) ? logs.join('') : (logs?.data || String(logs || '')));
                if (safeLogs && typeof safeLogs === 'string') {
                  term.write(formatForXterm(safeLogs));
                  term.scrollToBottom();
                } else {
                  term.writeln(`\x1b[36m⚡ [${agentId.toUpperCase()}] CONECTADO\x1b[0m`);
                }
              }).catch(() => {
                // Silenciar erro de histórico para forja
                term.writeln(`\x1b[36m⚡ [${agentId.toUpperCase()}] SESSÃO INICIADA\x1b[0m`);
              });
            }
            isHydrated.current[agentId] = true;
          }
        } catch (error) {
          console.error("Failed to load xterm:", error);
        }
      }

      // Toggle Visibility
      Object.keys(instances.current).forEach(key => {
        const inst = instances.current[key];
        if (key === agentId) {
          inst.el.style.opacity = '1';
          inst.el.style.zIndex = '10';
          inst.el.style.pointerEvents = 'auto';
          setTimeout(() => { 
            try { 
              inst.fit.fit(); 
              inst.term.scrollToBottom();
            } catch(e) {} 
          }, 50);
        } else {
          inst.el.style.opacity = '0';
          inst.el.style.zIndex = '0';
          inst.el.style.pointerEvents = 'none';
        }
      });
    };

    initTerminal();
  }, [agentId, sessionId, isClient]);

  // 2. Global Telemetry Listener
  useEffect(() => {
    if (!isClient || !window.electronAPI) return;
    
    const unsubscribe = window.electronAPI.onRawTelemetry((payload: any) => {
      const isObject = payload && typeof payload === 'object';
      const id = isObject ? (payload.agentId || 'MAESTRO') : 'MAESTRO';
      const rawData = isObject ? payload.data : payload;
      
      // Blindagem agressiva antes de passar para formatForXterm
      const data = typeof rawData === 'string' ? rawData : (Array.isArray(rawData) ? rawData.join('') : (rawData?.data || String(rawData || '')));
      
      const terminalInstance = instances.current[id];
      if (terminalInstance && data && typeof data === 'string') {
        terminalInstance.term.write(formatForXterm(data));
      }
    });

    return () => {
      unsubscribe();
    };
  }, [isClient]);

  // 3. Resize Handling
  useEffect(() => {
    if (!isClient) return;
    const handleResize = () => {
      const inst = instances.current[agentId];
      if (inst) {
        try { 
          inst.fit.fit(); 
          inst.term.scrollToBottom();
        } catch (e) {}
      }
    };

    const observer = new ResizeObserver(handleResize);
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    window.addEventListener('resize', handleResize);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', handleResize);
    };
  }, [agentId, isClient]);

  // 4. Active State Refit
  useEffect(() => {
    if (active && isClient) {
      const inst = instances.current[agentId];
      if (inst) {
        const triggerFit = () => { 
          try { 
            inst.fit.fit(); 
            inst.term.scrollToBottom();
          } catch (e) {} 
        };
        const timers = [50, 150, 500].map(t => setTimeout(triggerFit, t));
        return () => timers.forEach(clearTimeout);
      }
    }
  }, [active, agentId, isClient]);

  // Cleanup
  useEffect(() => {
    return () => {
      Object.values(instances.current).forEach(inst => {
        if (inst.term) inst.term.dispose();
      });
      instances.current = {};
      isHydrated.current = {};
    };
  }, []);

  if (!isClient) return null;

  return (
    <div className={cn("absolute inset-0 w-full h-full overflow-hidden transition-opacity duration-200", active ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none")}>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/[0.02] pointer-events-none z-10" />
      <div ref={containerRef} className="absolute inset-0 w-full h-full min-h-[300px] overflow-hidden bg-[#09090b]" />
    </div>
  );
}
