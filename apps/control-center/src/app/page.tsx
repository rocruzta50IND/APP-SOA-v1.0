"use client";

import React, { useState, useEffect, useRef } from "react";
import { 
  Terminal as TerminalIcon, 
  Layout, 
  ExternalLink, 
  Monitor,
  Zap,
  CheckCircle2,
  Box,
  Loader2,
  Send
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import Ansi from "ansi-to-react";

type ForgeStatus = "idle" | "fabricating" | "completed";

type LogEntry = {
  id: string;
  time: string;
  message: string;
  type: "AGENT" | "SYSTEM" | "SUCCESS" | "ERROR";
};

export default function ForgePage() {
  const [mounted, setMounted] = useState(false);
  const [category, setCategory] = useState("Recursos Humanos HR");
  const [themeMode, setThemeMode] = useState("Dark");
  const [designTier, setDesignTier] = useState(2);
  const [status, setStatus] = useState<ForgeStatus>("idle");
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  
  const terminalRef = useRef<HTMLDivElement>(null);

  // Fix Hydration Mismatch
  useEffect(() => {
    setMounted(true);
    const now = () => new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    setLogs([
      { id: Math.random().toString(), time: now(), type: "SYSTEM", message: "Engine initialized and ready." },
      { id: Math.random().toString(), time: now(), type: "SYSTEM", message: "Waiting for fabrication trigger..." }
    ]);
  }, []);

  // Isolate Auto-Scroll
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [logs]);

  const addLog = (rawMessage: string, forceType?: "AGENT" | "SYSTEM" | "SUCCESS" | "ERROR", replace: boolean = false) => {
    if (!rawMessage || rawMessage.includes("====") || rawMessage.trim() === "") return;

    if (rawMessage.includes("[SYSTEM] PREVIEW_ACTIVE_3001")) {
      setPreviewUrl("http://localhost:3001");
      return;
    }

    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    let cleanMessage = rawMessage.trim();

    setLogs(prev => {
      const newLog: LogEntry = { 
        id: Math.random().toString(), 
        time, 
        type: forceType || "AGENT", 
        message: cleanMessage 
      };
      
      if (replace && prev.length > 0) {
        const updated = [...prev];
        updated[updated.length - 1] = newLog;
        return updated;
      }
      return [...prev, newLog];
    });
  };

  if (!mounted) return null;

  const handleStartFabrication = async () => {
    if (status === "fabricating") return;
    
    setStatus("fabricating");
    setLogs([]);
    setPreviewUrl(null);
    
    addLog("Initializing real-time bridge...", "SYSTEM");

    try {
      const response = await fetch("/api/forge", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ category, theme: themeMode, tier: designTier }),
      });

      if (!response.body) throw new Error("ReadableStream not supported");

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      
      const readStream = async () => {
        let done = false;
        let buffer = "";

        while (!done) {
          const { value, done: doneReading } = await reader.read();
          done = doneReading;
          
          if (value) {
            buffer += decoder.decode(value, { stream: !done });
            const lines = buffer.split("\n");
            buffer = lines.pop() || "";

            lines.forEach(line => {
              const subLines = line.split("\r");
              subLines.forEach((subLine, idx) => {
                addLog(subLine, undefined, idx > 0);
              });
            });

            if (buffer.includes("\r")) {
              const parts = buffer.split("\r");
              const lastPart = parts.pop() || "";
              addLog(lastPart, undefined, true);
              buffer = "";
            }
          }
        }

        if (buffer.trim()) addLog(buffer.trim());
        setStatus("completed");
      };

      readStream().catch(err => {
        addLog(`STREAM ERROR: ${err.message}`, "ERROR");
        setStatus("idle");
      });

    } catch (error: any) {
      addLog(`BRIDGE ERROR: ${error.message}`, "ERROR");
      setStatus("idle");
    }
  };

  return (
    <div className="flex h-full min-h-0 overflow-hidden bg-black p-4 gap-4">
      
      {/* Esquerda: Config & Logs - Estilo Flutuante */}
      <aside className="w-[400px] flex flex-col gap-4 min-h-0">
        
        {/* Painel de Parâmetros - Card Flutuante */}
        <section className="glass-card p-6 flex flex-col gap-6 shrink-0 shadow-2xl">
          <div className="flex items-center justify-between">
            <h2 className="micro-label">Forge Parameters</h2>
            <Box className="w-4 h-4 text-zinc-500" />
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="micro-label">Category</label>
              <select 
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                disabled={status === "fabricating"}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-white/20 transition-all appearance-none cursor-pointer disabled:opacity-50"
              >
                <option className="bg-zinc-900">Recursos Humanos HR</option>
                <option className="bg-zinc-900">Fintech & Cripto</option>
                <option className="bg-zinc-900">E-commerce Pro</option>
                <option className="bg-zinc-900">Dashboard Analítico</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <label className="micro-label">Theme</label>
                <select 
                  value={themeMode}
                  onChange={(e) => setThemeMode(e.target.value)}
                  disabled={status === "fabricating"}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none transition-all appearance-none cursor-pointer"
                >
                  <option className="bg-zinc-900">Light</option>
                  <option className="bg-zinc-900">Dark</option>
                  <option className="bg-zinc-900">Duo</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="micro-label">Tier</label>
                <select 
                  value={designTier}
                  onChange={(e) => setDesignTier(Number(e.target.value))}
                  disabled={status === "fabricating"}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none transition-all appearance-none cursor-pointer"
                >
                  <option value={1} className="bg-zinc-900">Tier 1</option>
                  <option value={2} className="bg-zinc-900">Tier 2</option>
                  <option value={3} className="bg-zinc-900">Tier 3</option>
                </select>
              </div>
            </div>
          </div>

          <button 
            onClick={handleStartFabrication}
            disabled={status === "fabricating"}
            className="group relative w-full overflow-hidden rounded-xl p-[1px] focus:outline-none disabled:opacity-50"
          >
            <div className={cn(
              "absolute inset-[-1000%] bg-[conic-gradient(from_90deg_at_50%_50%,#E2E2E2_0%,#393BB2_50%,#E2E2E2_100%)]",
              status === "fabricating" ? "animate-[spin_4s_linear_infinite]" : "animate-[spin_2s_linear_infinite]"
            )} />
            <div className="inline-flex h-14 w-full cursor-pointer items-center justify-center rounded-xl bg-zinc-950 px-6 py-1 text-sm font-bold text-white backdrop-blur-3xl transition-all hover:bg-zinc-900 gap-2 border border-white/5">
              {status === "fabricating" ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin text-amber-400" />
                  <span className="tracking-widest">FORJANDO...</span>
                </>
              ) : (
                <>
                  <Zap className={cn("w-4 h-4", status === "completed" ? "fill-emerald-400 text-emerald-400" : "fill-white")} />
                  <span className="tracking-widest">{status === "completed" ? "FORJAR NOVAMENTE" : "INICIAR FABRICAÇÃO"}</span>
                </>
              )}
            </div>
          </button>
        </section>

        {/* Terminal de Logs - Card Flutuante */}
        <section className="flex-1 flex flex-col min-h-0 glass-card shadow-2xl overflow-hidden">
          <div className="h-12 border-b border-white/5 flex items-center px-6 justify-between bg-white/5">
            <div className="flex items-center gap-2">
              <TerminalIcon className="w-4 h-4 text-emerald-500" />
              <span className="micro-label !text-zinc-400">Live Agent Feed</span>
            </div>
            {status === "fabricating" && (
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                <span className="text-[9px] text-amber-500 font-bold uppercase tracking-tighter">Syncing</span>
              </div>
            )}
          </div>
          <div 
            ref={terminalRef}
            className="flex-1 p-6 font-mono text-[10px] leading-relaxed text-zinc-400 terminal-scroll overflow-y-auto scrollbar-thin bg-black/40"
          >
            {logs.map((log) => (
              <div key={log.id} className="flex gap-3 mb-1.5 group">
                <span className="text-zinc-700 select-none shrink-0 font-medium">[{log.time}]</span>
                <div className="flex-1 min-w-0 overflow-hidden text-zinc-300 group-hover:text-white transition-colors">
                  <Ansi useClasses={false}>{log.message}</Ansi>
                </div>
              </div>
            ))}
            {status === "fabricating" && (
              <div className="mt-3 flex items-center gap-3">
                <div className="w-1.5 h-4 bg-emerald-500 animate-pulse" />
                <span className="text-emerald-500/50 italic text-[10px] tracking-wide">Processing logic chunk...</span>
              </div>
            )}
          </div>
        </section>
      </aside>

      {/* Direita: Preview Gigante - Card Flutuante */}
      <main className="flex-1 flex flex-col min-h-0 glass-card bg-[#020202] relative shadow-2xl">
        <header className="h-10 border-b border-white/5 flex items-center px-4 justify-between bg-zinc-950/50 z-10">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/20 border border-red-500/40" />
            <div className="w-2.5 h-2.5 rounded-full bg-amber-500/20 border border-amber-500/40" />
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/20 border border-emerald-500/40" />
          </div>
          <div className="flex items-center gap-2 bg-white/5 px-3 py-0.5 rounded-md border border-white/10">
            <Monitor className="w-3 h-3 text-zinc-500" />
            <span className="text-[9px] text-zinc-400 font-mono tracking-tight lowercase">
              {previewUrl ? "localhost:3001" : "preview.factory.internal"}
            </span>
          </div>
          <div>
            {previewUrl && (
              <a href={previewUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-3 h-3 text-zinc-500 hover:text-white transition-colors" />
              </a>
            )}
          </div>
        </header>

        <div className="flex-1 relative overflow-hidden">
          <AnimatePresence mode="wait">
            {previewUrl ? (
              <motion.div key="iframe" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full h-full">
                <iframe src={previewUrl} className="w-full h-full border-none bg-white" title="Live Preview" />
              </motion.div>
            ) : status === "idle" ? (
              <motion.div 
                key="idle" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }}
                className="w-full h-full flex flex-col items-center justify-center gap-6"
              >
                <div className="w-16 h-16 rounded-2xl bg-white/5 border border-dashed border-white/10 flex items-center justify-center">
                  <Layout className="w-6 h-6 text-zinc-700" />
                </div>
                <div className="text-center space-y-2">
                  <h3 className="text-zinc-500 font-medium text-sm tracking-wide uppercase">Viewport Ready</h3>
                  <p className="text-xs text-zinc-700 max-w-[240px]">Aguardando início da fabricação para projetar interface.</p>
                </div>
              </motion.div>
            ) : status === "fabricating" ? (
              <motion.div 
                key="fabricating" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="w-full h-full p-12 space-y-12"
              >
                <div className="grid grid-cols-3 gap-8">
                  <div className="h-40 rounded-2xl bg-white/5 animate-pulse" />
                  <div className="h-40 rounded-2xl bg-white/5 animate-pulse delay-75" />
                  <div className="h-40 rounded-2xl bg-white/5 animate-pulse delay-150" />
                </div>
                <div className="h-80 rounded-2xl bg-white/5 animate-pulse delay-300" />
              </motion.div>
            ) : (
              <motion.div 
                key="completed" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="w-full h-full relative"
              >
                <img 
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=2070" 
                  alt="Template" className="w-full h-full object-cover opacity-40 grayscale"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                <div className="absolute bottom-16 left-1/2 -translate-x-1/2 w-full max-w-sm">
                  <div className="glass-card p-8 flex flex-col items-center gap-6 text-center border-white/20">
                    <div className="flex items-center gap-2 text-emerald-400">
                      <CheckCircle2 className="w-5 h-5" />
                      <span className="text-xs font-bold uppercase tracking-[0.2em]">Ready for Production</span>
                    </div>
                    <button className="flex items-center gap-2 px-8 py-3 rounded-lg bg-white text-black text-xs font-bold hover:bg-zinc-200 transition-all w-full justify-center">
                      <Send className="w-4 h-4" />
                      ENVIAR PARA GALERIA
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
