"use client";

import React, { useState, useEffect, useRef } from "react";
import { 
  Play, 
  Terminal as TerminalIcon, 
  Layout, 
  Cpu, 
  ExternalLink, 
  Settings, 
  Monitor,
  Zap,
  CheckCircle2,
  Box,
  Loader2,
  Image as ImageIcon,
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
    // 1. Limpeza e Filtros (Etapa 1)
    if (!rawMessage || rawMessage.includes("====") || rawMessage.trim() === "") return;

    // Gatilho Invisível do Preview (Etapa 2)
    if (rawMessage.includes("[SYSTEM] PREVIEW_ACTIVE_3001")) {
      setPreviewUrl("http://localhost:3001");
      return; // Não exibe este log
    }

    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    
    // Mantemos os códigos ANSI agora para o parser processar
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
    <main className="h-screen p-4 md:p-8 flex flex-col gap-6 max-w-[1600px] mx-auto overflow-hidden">
      {/* 1. Header do Cockpit */}
      <header className="glass-card p-6 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-4">
          <div className="bg-white/10 p-3 rounded-lg border border-white/10 shadow-[0_0_15px_rgba(255,255,255,0.05)]">
            <Cpu className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight">Forge Control Center</h1>
            <div className="flex items-center gap-2 mt-1">
              <span className="relative flex h-2 w-2">
                <span className={cn(
                  "animate-ping absolute inline-flex h-full w-full rounded-full opacity-75",
                  status === "fabricating" ? "bg-amber-400" : "bg-emerald-400"
                )}></span>
                <span className={cn(
                  "relative inline-flex rounded-full h-2 w-2",
                  status === "fabricating" ? "bg-amber-500" : "bg-emerald-500"
                )}></span>
              </span>
              <p className={cn(
                "micro-label",
                status === "fabricating" ? "!text-amber-400" : "!text-emerald-400"
              )}>
                Engine Status: {status === "fabricating" ? "Fabricating..." : "Stable"}
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
            <Layout className="w-4 h-4" />
            <span className="text-sm font-medium">Gallery</span>
          </button>
          <div className="h-8 w-[1px] bg-white/10 mx-2" />
          <button className="p-2 rounded-lg hover:bg-white/5 transition-colors">
            <Settings className="w-5 h-5 text-zinc-400" />
          </button>
        </div>
      </header>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-12 grid-rows-6 gap-6 flex-1 min-h-0">
        
        {/* 2. Painel de Comando (Esquerda) */}
        <section className="col-span-12 lg:col-span-4 row-span-3 glass-card p-8 flex flex-col justify-between overflow-y-auto scrollbar-thin">
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="micro-label">Forge Parameters</h2>
              <Box className="w-4 h-4 text-zinc-500" />
            </div>

            <div className="space-y-6">
              <div className="space-y-3">
                <label className="micro-label">Category</label>
                <select 
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  disabled={status === "fabricating"}
                  className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-white/20 transition-all appearance-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <option>Recursos Humanos HR</option>
                  <option>Fintech & Cripto</option>
                  <option>E-commerce Pro</option>
                  <option>Dashboard Analítico</option>
                </select>
              </div>

              <div className="space-y-3">
                <label className="micro-label">Theme Mode</label>
                <div className="grid grid-cols-3 gap-2">
                  {['Light', 'Dark', 'Duo'].map((t) => (
                    <button 
                      key={t} 
                      onClick={() => setThemeMode(t)}
                      disabled={status === "fabricating"}
                      className={cn(
                        "px-3 py-2 rounded-lg text-xs font-medium border transition-all disabled:opacity-50",
                        themeMode === t ? "bg-white text-black border-white" : "bg-white/5 border-white/10 text-zinc-400 hover:bg-white/10"
                      )}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <label className="micro-label">Design Tier</label>
                <div className="grid grid-cols-3 gap-2">
                  {[1, 2, 3].map((tier) => (
                    <button 
                      key={tier} 
                      onClick={() => setDesignTier(tier)}
                      disabled={status === "fabricating"}
                      className={cn(
                        "px-3 py-2 rounded-lg text-xs font-medium border transition-all disabled:opacity-50",
                        designTier === tier ? "bg-white/20 border-white/40 text-white" : "bg-white/5 border-white/10 text-zinc-400 hover:bg-white/10"
                      )}
                    >
                      Tier {tier}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <button 
            onClick={handleStartFabrication}
            disabled={status === "fabricating"}
            className="group relative w-full mt-12 overflow-hidden rounded-xl p-[1px] focus:outline-none disabled:opacity-50 shrink-0"
          >
            <div className={cn(
              "absolute inset-[-1000%] bg-[conic-gradient(from_90deg_at_50%_50%,#E2E2E2_0%,#393BB2_50%,#E2E2E2_100%)]",
              status === "fabricating" ? "animate-[spin_4s_linear_infinite]" : "animate-[spin_2s_linear_infinite]"
            )} />
            <div className="inline-flex h-14 w-full cursor-pointer items-center justify-center rounded-xl bg-zinc-950 px-8 py-1 text-sm font-bold text-white backdrop-blur-3xl transition-all hover:bg-zinc-900 gap-2">
              {status === "fabricating" ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  FORJANDO...
                </>
              ) : (
                <>
                  <Zap className={cn("w-4 h-4", status === "completed" ? "fill-emerald-400 text-emerald-400" : "fill-white")} />
                  {status === "completed" ? "FORJAR NOVAMENTE" : "INICIAR FABRICAÇÃO"}
                </>
              )}
            </div>
          </button>
        </section>

        {/* 4. Área de Preview / App Shell (Direita) */}
        <section className="col-span-12 lg:col-span-8 row-span-6 glass-card bg-zinc-900/50 flex flex-col relative overflow-hidden">
          {/* Browser Header */}
          <div className="h-10 border-b border-white/10 flex items-center px-4 justify-between bg-zinc-950/50 z-10 shrink-0">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/40" />
              <div className="w-3 h-3 rounded-full bg-amber-500/20 border border-amber-500/40" />
              <div className="w-3 h-3 rounded-full bg-emerald-500/20 border border-emerald-500/40" />
            </div>
            <div className="flex items-center gap-2 bg-white/5 px-3 py-1 rounded-md border border-white/10">
              <Monitor className="w-3 h-3 text-zinc-500" />
              <span className="text-[10px] text-zinc-400 font-mono tracking-tight">
                {previewUrl ? "localhost:3001" : "localhost:3000/preview"}
              </span>
            </div>
            <div className="flex items-center gap-2">
              {previewUrl && (
                <a href={previewUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-3 h-3 text-zinc-400 hover:text-white transition-colors cursor-pointer" />
                </a>
              )}
            </div>
          </div>

          {/* Preview Content */}
          <div className="flex-1 flex items-center justify-center relative bg-[#020202] overflow-hidden">
            <AnimatePresence mode="wait">
              {previewUrl ? (
                <motion.div 
                  key="iframe"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="w-full h-full"
                >
                  <iframe 
                    src={previewUrl} 
                    className="w-full h-full border-none bg-white rounded-b-xl" 
                    title="Live Preview"
                  />
                </motion.div>
              ) : status === "idle" ? (
                <motion.div 
                  key="idle"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex flex-col items-center gap-6 text-center"
                >
                  <div className="w-20 h-20 rounded-2xl bg-white/5 border border-dashed border-white/20 flex items-center justify-center">
                    <Layout className="w-8 h-8 text-zinc-600" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-zinc-400 font-medium">Aguardando Parâmetros</h3>
                    <p className="text-sm text-zinc-600 max-w-[280px]">
                      Configure o nicho e o design tier para iniciar a geração visual do seu template.
                    </p>
                  </div>
                </motion.div>
              ) : status === "fabricating" ? (
                <motion.div 
                  key="fabricating"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="w-full h-full p-8 space-y-8"
                >
                  <div className="grid grid-cols-3 gap-4">
                    <div className="h-32 rounded-xl bg-white/5 animate-pulse" />
                    <div className="h-32 rounded-xl bg-white/5 animate-pulse delay-75" />
                    <div className="h-32 rounded-xl bg-white/5 animate-pulse delay-150" />
                  </div>
                  <div className="h-64 rounded-xl bg-white/5 animate-pulse delay-300" />
                  <div className="grid grid-cols-2 gap-4">
                    <div className="h-40 rounded-xl bg-white/5 animate-pulse delay-500" />
                    <div className="h-40 rounded-xl bg-white/5 animate-pulse delay-700" />
                  </div>
                </motion.div>
              ) : (
                <motion.div 
                  key="completed"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="w-full h-full relative group"
                >
                  <img 
                    src={`https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=2070`} 
                    alt="Template Preview"
                    className="w-full h-full object-cover opacity-60 grayscale-[0.5] hover:grayscale-0 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                  
                  <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-full max-w-md px-6">
                    <div className="glass-card p-6 flex flex-col items-center gap-4 border-white/20 bg-black/60 backdrop-blur-xl">
                      <div className="flex items-center gap-2 text-emerald-400">
                        <CheckCircle2 className="w-5 h-5" />
                        <span className="text-sm font-bold uppercase tracking-widest">Fabricação Concluída</span>
                      </div>
                      <p className="text-xs text-zinc-400 text-center">
                        O template <span className="text-white font-medium">TalentPulse v1.0</span> foi forjado com sucesso e está pronto para produção.
                      </p>
                      <button className="flex items-center gap-2 px-6 py-3 rounded-lg bg-white text-black text-sm font-bold hover:bg-zinc-200 transition-all w-full justify-center mt-2">
                        <Send className="w-4 h-4" />
                        ENVIAR PARA GALERIA
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>

        {/* 3. Live Terminal / Console de Logs (Inferior Esquerdo) */}
        <section className="col-span-12 lg:col-span-4 row-span-3 glass-card bg-black flex flex-col border-white/5 shadow-2xl max-h-[450px]">
          <div className="h-10 border-b border-white/10 flex items-center px-4 justify-between bg-zinc-950/50 shrink-0">
            <div className="flex items-center gap-2">
              <TerminalIcon className="w-3 h-3 text-emerald-500" />
              <span className="micro-label !text-zinc-500">Live Agent Feed</span>
            </div>
            {status === "fabricating" && (
              <span className="text-[9px] text-amber-500 font-mono animate-pulse uppercase">Syncing...</span>
            )}
          </div>
          <div 
            ref={terminalRef}
            className="flex-1 p-5 font-mono text-[11px] leading-relaxed text-emerald-400/80 terminal-scroll overflow-y-auto scrollbar-thin bg-[#050505]"
          >
            {logs.map((log) => (
              <div 
                key={log.id}
                className="flex gap-3 mb-1 group"
              >
                <span className="text-zinc-700 select-none group-hover:text-zinc-500 transition-colors shrink-0">[{log.time}]</span>
                <div className="flex-1 min-w-0 overflow-hidden text-zinc-300">
                  <Ansi useClasses={false}>{log.message}</Ansi>
                </div>
              </div>
            ))}
            {status === "fabricating" && (
              <div className="mt-2 flex items-center gap-2">
                <div className="w-2 h-4 bg-emerald-500 animate-pulse" />
                <span className="text-emerald-500/50 italic text-[10px]">Processing chunk...</span>
              </div>
            )}
          </div>
        </section>

      </div>
    </main>
  );
}
