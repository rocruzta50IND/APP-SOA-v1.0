"use client";

import React, { useEffect, useRef } from "react";
import { Terminal } from "@xterm/xterm";
import { FitAddon } from "@xterm/addon-fit";
import "@xterm/xterm/css/xterm.css";
import { cn } from "@/lib/utils";

interface TerminalViewProps {
  sessionId: string;
  active: boolean;
  agentId?: string;
}

export default function TerminalView({ sessionId, active, agentId = 'orchestrator' }: TerminalViewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const instances = useRef<{ [key: string]: { term: Terminal, fit: FitAddon, el: HTMLDivElement } }>({});
  const isHydrated = useRef<{ [key: string]: boolean }>({});

  const formatForXterm = (text: any) => {
    if (typeof text !== 'string') return text;
    return text.replace(/\r?\n/g, '\r\n');
  };

  // 1. Manage Terminal Instances
  useEffect(() => {
    if (!containerRef.current) return;
    
    // Initialize if missing
    if (!instances.current[agentId]) {
      const el = document.createElement('div');
      el.className = 'absolute inset-0 w-full h-full [&_.xterm-viewport]:custom-scrollbar transition-opacity duration-200';
      containerRef.current.appendChild(el);

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
      term.open(el);
      
      instances.current[agentId] = { term, fit, el };

      // Load history - GARANTIR FETCH IMEDIATO
      if (!isHydrated.current[agentId]) {
        if (window.electronAPI && window.electronAPI.getSessionLogs) {
          window.electronAPI.getSessionLogs(sessionId).then((logs: string) => {
            if (logs) {
              term.write(formatForXterm(logs));
              term.scrollToBottom();
            } else {
              term.writeln(`\x1b[36m⚡ [${agentId.toUpperCase()}] CONECTADO\x1b[0m`);
            }
          }).catch(() => {
            term.writeln(`\x1b[31m❌ Erro ao recuperar histórico do agente.\x1b[0m`);
          });
        }
        isHydrated.current[agentId] = true;
      }
    }

    // Toggle Visibility (Opacity/Z-index Swap em vez de Display)
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

  }, [agentId, sessionId]);

  // 2. Global Telemetry Listener
  useEffect(() => {
    if (!window.electronAPI) return;
    
    // Single Global Listener para roteamento O(1)
    const unsubscribe = window.electronAPI.onRawTelemetry((payload: any) => {
      const isObject = payload && typeof payload === 'object';
      const id = isObject ? (payload.agentId || 'MAESTRO') : 'MAESTRO';
      const data = isObject ? payload.data : payload;
      
      const terminalInstance = instances.current[id];
      if (terminalInstance && data) {
        terminalInstance.term.write(formatForXterm(data));
      }
    });

    return () => {
      // Clean-up absoluto no unmount
      unsubscribe();
    };
  }, []); // Array de dependências vazio garante montagem única

  // 3. Resize Handling
  useEffect(() => {
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
  }, [agentId]);

  // 4. Active State Refit (DOM Paint Delay Sync)
  useEffect(() => {
    if (active) {
      const inst = instances.current[agentId];
      if (inst) {
        const triggerFit = () => { 
          try { 
            inst.fit.fit(); 
            inst.term.scrollToBottom();
          } catch (e) {} 
        };
        
        // Paint Delay Sync: Wait for DOM to stabilize before measuring
        const timers = [50, 150, 500].map(t => setTimeout(triggerFit, t));
        return () => timers.forEach(clearTimeout);
      }
    }
  }, [active, agentId]);

  // Cleanup all instances on unmount
  useEffect(() => {
    return () => {
      Object.values(instances.current).forEach(inst => {
        inst.term.dispose();
      });
      instances.current = {};
      isHydrated.current = {};
    };
  }, []);

  return (
    <div className={cn("absolute inset-0 w-full h-full overflow-hidden transition-opacity duration-200", active ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none")}>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/[0.02] pointer-events-none z-10" />
      <div ref={containerRef} className="absolute inset-0 w-full h-full overflow-hidden bg-[#0a0a0a]" />
    </div>
  );
}
