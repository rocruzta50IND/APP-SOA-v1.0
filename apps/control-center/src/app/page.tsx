"use client";

import React, { useState, useEffect, useRef, ErrorInfo } from "react";
import { 
  Terminal as TerminalIcon, 
  Layout, 
  ExternalLink, 
  Monitor,
  Zap,
  CheckCircle2,
  Box,
  Loader2,
  Send,
  AlertTriangle
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal } from "@xterm/xterm";
import { FitAddon } from "@xterm/addon-fit";
import "@xterm/xterm/css/xterm.css";

declare global {
  interface Window {
    electronAPI: {
      sendTerminalData: (data: string) => void;
      onTerminalData: (callback: (data: string) => void) => () => void;
      startForge: (options: { category: string, theme: string, tier: number }) => void;
      onForgeEnded: (callback: (exitCode: number) => void) => () => void;
      killForge: () => void;
    };
  }
}

type ForgeStatus = "idle" | "fabricating" | "completed";

// Simple Error Boundary to catch render crashes
class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean, error: Error | null }> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex h-full min-h-screen items-center justify-center bg-zinc-950 text-white p-4">
          <div className="glass-card max-w-md w-full p-6 flex flex-col items-center gap-4 border-red-500/20 text-center">
            <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center mb-2">
              <AlertTriangle className="w-6 h-6 text-red-500" />
            </div>
            <h2 className="text-lg font-bold">Um erro inesperado ocorreu.</h2>
            <p className="text-sm text-zinc-400">
              {this.state.error?.message || "Ocorreu uma falha crítica na renderização."}
            </p>
            <button 
              onClick={() => window.location.reload()}
              className="mt-4 px-6 py-2 bg-white text-black text-xs font-bold rounded-lg hover:bg-zinc-200 transition-colors"
            >
              RECARREGAR PÁGINA
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

function ForgePageContent() {
  const [mounted, setMounted] = useState(false);
  const [category, setCategory] = useState("Recursos Humanos HR");
  const [themeMode, setThemeMode] = useState("Dark");
  const [designTier, setDesignTier] = useState(2);
  const [status, setStatus] = useState<ForgeStatus>("idle");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  
  const terminalRef = useRef<HTMLDivElement>(null);
  const termInstance = useRef<Terminal | null>(null);
  const fitAddon = useRef<FitAddon | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    if (!termInstance.current && terminalRef.current) {
      termInstance.current = new Terminal({
        theme: {
          background: '#00000000', // transparent
          foreground: '#A1A1AA', // zinc-400
        },
        fontFamily: 'monospace',
        fontSize: 12,
        cursorBlink: true,
        disableStdin: false,
      });

      fitAddon.current = new FitAddon();
      termInstance.current.loadAddon(fitAddon.current);
      termInstance.current.open(terminalRef.current);
      
      // Delay fit to ensure DOM is ready
      setTimeout(() => {
        if (fitAddon.current) {
          try {
            fitAddon.current.fit();
          } catch(e) {
            // Ignore fit errors if unmounted quickly
          }
        }
      }, 50);

      termInstance.current.writeln("🚀 Engine initialized and ready.");
      termInstance.current.writeln("⏳ Waiting for fabrication trigger...");

      termInstance.current.onData((data) => {
        if (window.electronAPI) {
          window.electronAPI.sendTerminalData(data);
        }
      });
    }

    const handleResize = () => {
      if (fitAddon.current) {
        try {
          fitAddon.current.fit();
        } catch(e) {}
      }
    };

    window.addEventListener('resize', handleResize);

    // IPC Listeners
    let unsubscribeData: (() => void) | undefined;
    let unsubscribeEnded: (() => void) | undefined;

    if (window.electronAPI) {
      unsubscribeData = window.electronAPI.onTerminalData((data) => {
        if (termInstance.current) {
          termInstance.current.write(data);
          
          if (data.includes("[SYSTEM] PREVIEW_ACTIVE_3001")) {
            setPreviewUrl("http://localhost:3001");
          }
        }
      });

      unsubscribeEnded = window.electronAPI.onForgeEnded((code) => {
        setStatus("completed");
        if (termInstance.current) {
          termInstance.current.writeln(`\r\n--- PROCESSO FINALIZADO (CÓDIGO ${code}) ---`);
        }
      });
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      if (unsubscribeData) unsubscribeData();
      if (unsubscribeEnded) unsubscribeEnded();
      if (termInstance.current) {
        termInstance.current.dispose();
        termInstance.current = null;
      }
      if (fitAddon.current) {
        fitAddon.current.dispose();
        fitAddon.current = null;
      }
    };
  }, [mounted]);

  const handleStartFabrication = () => {
    if (status === "fabricating") return;
    
    setStatus("fabricating");
    setPreviewUrl(null);
    
    if (termInstance.current) {
      termInstance.current.clear();
      termInstance.current.writeln("🚀 Iniciando ponte em tempo real com Electron IPC...");
    }

    if (window.electronAPI) {
      window.electronAPI.startForge({ category, theme: themeMode, tier: designTier });
    } else {
      if (termInstance.current) {
        termInstance.current.writeln("\x1b[31mErro: API do Electron não encontrada. Execute via Electron.\x1b[0m");
      }
      setStatus("idle");
    }
  };

  if (!mounted) return null;

  return (
    <div className="flex h-full min-h-0 overflow-hidden bg-black p-4 gap-4">
      
      {/* Esquerda: Config & Logs */}
      <aside className="w-[400px] flex flex-col gap-4 min-h-0">
        
        {/* Painel de Parâmetros */}
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

        {/* Terminal de Logs */}
        <section className="flex-1 flex flex-col min-h-0 glass-card shadow-2xl overflow-hidden">
          <div className="h-12 border-b border-white/5 flex items-center px-6 justify-between bg-white/5 shrink-0">
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
          <div className="flex-1 p-4 bg-black/40 relative">
            <div ref={terminalRef} className="absolute inset-4 overflow-hidden" />
          </div>
        </section>
      </aside>

      {/* Direita: Preview Gigante */}
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
              {previewUrl ? previewUrl.replace("http://", "") : "preview.factory.internal"}
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

export default function ForgePage() {
  return (
    <ErrorBoundary>
      <ForgePageContent />
    </ErrorBoundary>
  );
}

