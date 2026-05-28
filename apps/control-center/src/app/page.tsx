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
  AlertTriangle,
  ArrowRight,
  Cpu,
  Layers,
  Shield,
  Camera,
  Activity,
  Flame,
  Settings as Cog,
  Aperture,
  Hammer,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal } from "@xterm/xterm";
import { FitAddon } from "@xterm/addon-fit";
import { useRouter } from "next/navigation";
import Link from "next/link";
import "@xterm/xterm/css/xterm.css";

declare global {
  interface Window {
    electronAPI: {
      sendTerminalData: (data: string) => void;
      onTerminalData: (callback: (data: string) => void) => () => void;
      startForge: (options: { category: string, theme: string, tier: number }) => void;
      onForgeEnded: (callback: (exitCode: number) => void) => () => void;
      killForge: () => void;
      getGalleryData: () => Promise<any[]>;
      onForgeCompleted: (callback: (code: number) => void) => () => void;
      onForgePhase: (callback: (phase: number) => void) => () => void;
      onPreviewReady: (callback: () => void) => () => void;
      getForgeStatus: () => Promise<{ isForging: boolean, phase: number }>;
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

const FABRICATION_STEPS = [
  { label: "Preparando Caldeira", icon: Flame },
  { label: "Injetando Contexto", icon: Flame },
  { label: "Martelando Estrutura", icon: Cog },
  { label: "Capturando a Brasa", icon: Aperture },
  { label: "Empacotando Lingote", icon: Hammer }
];

function ForgePageContent() {
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  
  const [category, setCategory] = useState("Recursos Humanos HR");
  const [themeMode, setThemeMode] = useState("Dark");
  const [designTier, setDesignTier] = useState(2);
  const [status, setStatus] = useState<ForgeStatus>("idle");
  const [latestProject, setLatestProject] = useState<any>(null);
  const [finalImages, setFinalImages] = useState<string[]>([]);
  const [currentImgIdx, setCurrentImgIdx] = useState(0);
  
  const [currentStep, setCurrentStep] = useState(0);
  const [hackerLogs, setHackerLogs] = useState<string[]>([]);

  const terminalRef = useRef<HTMLDivElement>(null);
  const termInstance = useRef<Terminal | null>(null);
  const fitAddon = useRef<FitAddon | null>(null);

  useEffect(() => {
    if (status === 'fabricating') {
      const phrases = [
        "IGNITING_FURNACE_COILS...",
        "MELTING_NEURAL_LOGIC...",
        "FORGING_COMPONENT_STEEL...",
        "TEMPERING_UI_VECTORS...",
        "PHOTOGRAPHING_MOLTEN_CORE...",
        "COOLING_BUNDLE_ASSETS...",
        "STRIKING_THE_ANVIL...",
        "POLISHING_SURFACE_GRID...",
        "CASTING_INTERACTIVE_SHADOWS...",
        "FINAL_INSPECTION_COMPLETE..."
      ];
      let i = 0;
      const interval = setInterval(() => {
        setHackerLogs(prev => [...prev.slice(-5), phrases[i % phrases.length]]);
        i++;
      }, 800);
      return () => clearInterval(interval);
    }
  }, [status]);

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

      termInstance.current.writeln("🔥 Forge engine ignited and ready.");
      termInstance.current.writeln("⏳ Awaiting molten trigger...");

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
    let unsubscribeCompleted: (() => void) | undefined;
    let unsubscribePhase: (() => void) | undefined;

    if (window.electronAPI) {
      unsubscribeData = window.electronAPI.onTerminalData((data) => {
        if (termInstance.current) {
          termInstance.current.write(data);
        }
      });

      unsubscribeEnded = window.electronAPI.onForgeEnded((code) => {
        if (termInstance.current) {
          termInstance.current.writeln(`\r\n--- FORJA FINALIZADA (CÓDIGO ${code}) ---`);
        }
      });

      unsubscribeCompleted = window.electronAPI.onForgeCompleted(async (code) => {
        // Mitigação de Race Condition: Aguarda o SO liberar os file locks antes de ler a galeria
        setTimeout(async () => {
          setStatus("completed");
          const gallery = await window.electronAPI.getGalleryData();
          if (gallery && gallery.length > 0) {
            const project = gallery[gallery.length - 1];
            setLatestProject(project);
            setFinalImages(project?.previews || []);
            setCurrentImgIdx(0);
          }
        }, 1500);
      });

      unsubscribePhase = window.electronAPI.onForgePhase((phase) => {
        setCurrentStep(phase);
      });

      const restoreState = async () => {
        if (typeof window.electronAPI.getForgeStatus === 'function') {
          const status = await window.electronAPI.getForgeStatus();
          if (status.isForging) {
            setStatus("fabricating");
            setCurrentStep(status.phase);
          }
        }
      };
      restoreState();
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      if (unsubscribeData) unsubscribeData();
      if (unsubscribeEnded) unsubscribeEnded();
      if (unsubscribeCompleted) unsubscribeCompleted();
      if (unsubscribePhase) unsubscribePhase();
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
    setCurrentStep(0);
    setLatestProject(null);
    
    if (termInstance.current) {
      termInstance.current.clear();
      termInstance.current.writeln("🔥 Soprando o fole e aquecendo o metal...");
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

  return (
    <div className="h-full bg-black overflow-hidden flex flex-col">
      {!mounted ? null : (
      <div className="flex-1 relative overflow-hidden bg-black">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex h-full min-h-0 p-4 gap-4 overflow-hidden"
        >
          {/* Esquerda: Config & Logs */}
          <aside className="w-[400px] flex flex-col gap-4 min-h-0">
            
            {/* Painel de Parâmetros */}
            <section className="glass-card p-6 flex flex-col gap-6 shrink-0 shadow-2xl">
              <div className="flex items-center justify-between">
                <h2 className="micro-label">Forge Parameters</h2>
                <Box className="w-4 h-4 text-orange-500" />
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="micro-label">Category</label>
                  <select 
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    disabled={status === "fabricating"}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-amber-500/20 transition-all appearance-none cursor-pointer disabled:opacity-50"
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
                  "absolute inset-[-1000%] bg-[conic-gradient(from_90deg_at_50%_50%,#f59e0b_0%,#ea580c_50%,#f59e0b_100%)]",
                  status === "fabricating" ? "animate-[spin_4s_linear_infinite]" : "animate-[spin_2s_linear_infinite]"
                )} />
                <div className="inline-flex h-14 w-full cursor-pointer items-center justify-center rounded-xl bg-zinc-950 px-6 py-1 text-sm font-bold text-white backdrop-blur-3xl transition-all hover:bg-zinc-900 gap-2 border border-white/5">
                  {status === "fabricating" ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin text-amber-400" />
                      <span className="tracking-widest">FUNDINDO...</span>
                    </>
                  ) : (
                    <>
                      <Zap className={cn("w-4 h-4", status === "completed" ? "fill-amber-400 text-amber-400" : "fill-white")} />
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
                  <TerminalIcon className="w-4 h-4 text-orange-500" />
                  <span className="micro-label !text-zinc-400">Forge Output Feed</span>
                </div>
                {status === "fabricating" && (
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
                    <span className="text-[9px] text-orange-500 font-bold uppercase tracking-tighter">Forging</span>
                  </div>
                )}
              </div>
              <div className="flex-1 p-4 bg-black/40 relative [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:none] [&_.xterm-viewport]:[scrollbar-width:none] [&_.xterm-viewport]:[-ms-overflow-style:'none'] [&_.xterm-viewport::-webkit-scrollbar]:hidden">
                <div ref={terminalRef} className="absolute inset-4 overflow-hidden" />
              </div>
            </section>
          </aside>

          {/* Direita: Preview Gigante */}
          <main className={cn(
            "flex-1 flex flex-col min-h-0 glass-card bg-[#020202] relative shadow-2xl transition-all duration-700",
            status === 'fabricating' && "bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-900/20 via-zinc-950/80 to-black shadow-[inset_0_0_100px_rgba(0,0,0,0.8)]"
          )}>
            <header className="h-10 border-b border-white/5 flex items-center px-4 justify-between bg-zinc-950/50 z-10">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/20 border border-red-500/40" />
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500/20 border border-amber-500/40" />
                <div className="w-2.5 h-2.5 rounded-full bg-orange-500/20 border border-orange-500/40" />
              </div>
              <div className="flex items-center gap-2 bg-white/5 px-3 py-0.5 rounded-md border border-white/10 opacity-40">
                <Monitor className="w-3 h-3 text-zinc-500" />
                <span className="text-[9px] text-zinc-400 font-mono tracking-tight lowercase">
                  forge.factory.internal
                </span>
              </div>
              <div className="w-4" />
            </header>

            <div className="flex-1 relative overflow-hidden">
              <AnimatePresence mode="wait">
                {status === 'fabricating' ? (
                  <motion.div 
                    key="pipeline" 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    exit={{ opacity: 0 }}
                    className="w-full h-full relative overflow-hidden flex items-center justify-center"
                  >
                    {/* Corner Decorations */}
                    <div className="absolute top-8 left-8 w-12 h-12 border-t-2 border-l-2 border-amber-500/10" />
                    <div className="absolute top-8 right-8 w-12 h-12 border-t-2 border-r-2 border-amber-500/10" />
                    <div className="absolute bottom-8 left-8 w-12 h-12 border-b-2 border-l-2 border-amber-500/10" />
                    <div className="absolute bottom-8 right-8 w-12 h-12 border-b-2 border-r-2 border-amber-500/10" />
                    
                    <div className="absolute top-10 right-10 text-[8px] font-mono text-zinc-500/40 tracking-[0.4em] uppercase hidden md:block">
                      SYS.FORGE // THERMAL_V8 // CORE_TEMP_CRITICAL
                    </div>

                    <div className="absolute top-0 left-0 h-1 bg-amber-500 shadow-[0_0_15px_#f59e0b] transition-all duration-1000 z-50" style={{ width: `${((currentStep) / (FABRICATION_STEPS.length - 1)) * 100}%` }} />

                    {/* The Giant (Lado Esquerdo/Centro) */}
                    <div className="flex flex-col items-center gap-8 z-10">
                      <motion.div 
                        key={currentStep}
                        initial={{ scale: 0.8, opacity: 0, rotate: -10 }}
                        animate={{ scale: 1, opacity: 1, rotate: 0 }}
                        className="relative"
                      >
                        <div className="absolute inset-0 bg-amber-500/20 blur-[100px] rounded-full animate-pulse" />
                        {React.createElement(FABRICATION_STEPS[currentStep]?.icon || Activity, {
                          className: "w-48 h-48 text-amber-500 drop-shadow-[0_0_50px_rgba(245,158,11,1)] animate-pulse"
                        })}
                      </motion.div>

                      <div className="text-center space-y-2">
                        <motion.h2 
                          key={`title-${currentStep}`}
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          className="text-5xl font-black bg-gradient-to-r from-amber-400 to-orange-600 bg-clip-text text-transparent tracking-tighter uppercase italic drop-shadow-[0_0_15px_rgba(245,158,11,0.5)]"
                        >
                          {FABRICATION_STEPS[currentStep]?.label}
                        </motion.h2>
                        
                        {/* Micro-Logs (Efeito Hacker) */}
                        <div className="h-24 flex flex-col items-center justify-start font-mono text-[10px] text-orange-500/60 uppercase tracking-[0.2em] overflow-hidden mt-4">
                          <AnimatePresence mode="popLayout">
                            {hackerLogs.map((log, idx) => (
                              <motion.div
                                key={`${log}-${idx}`}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 10 }}
                                className={cn(idx === hackerLogs.length - 1 && "text-orange-400 animate-pulse")}
                              >
                                {idx === hackerLogs.length - 1 ? "> " : "  "}{log}
                              </motion.div>
                            ))}
                          </AnimatePresence>
                        </div>
                      </div>
                    </div>

                    {/* O Histórico (Lado Direito ou Fundo) */}
                    <div className="absolute bottom-12 right-12 flex flex-col gap-3 items-end">
                      <div className="micro-label !text-zinc-500/40 mb-2">Forge Sequence</div>
                      {FABRICATION_STEPS.map((step, idx) => {
                        const isCompleted = currentStep > idx;
                        const isActive = currentStep === idx;
                        return (
                          <div key={idx} className="flex items-center gap-3">
                            <span className={cn(
                              "text-[10px] font-bold tracking-widest uppercase transition-colors duration-500",
                              isActive ? "text-amber-400" : isCompleted ? "text-orange-900/40" : "text-zinc-800/20"
                            )}>
                              {step.label}
                            </span>
                            <div className={cn(
                              "w-1.5 h-1.5 rounded-full transition-all duration-500",
                              isActive ? "bg-amber-400 shadow-[0_0_8px_#f59e0b] scale-125" : 
                              isCompleted ? "bg-orange-900/40" : "bg-zinc-800/20"
                            )} />
                          </div>
                        );
                      })}
                    </div>
                  </motion.div>
                )
 : status === "completed" ? (
                  <motion.div 
                    key="completed" 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="w-full h-full flex flex-col items-center justify-center bg-black relative overflow-hidden"
                  >
                    {/* Immersive Background */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#18181b,black)]" />
                    
                    <motion.div 
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="z-10 flex flex-col items-center gap-8 max-w-xl text-center p-12 rounded-[2.5rem] border border-white/10 bg-zinc-900/40 backdrop-blur-3xl shadow-[0_0_100px_rgba(0,0,0,1)]"
                    >
                      <div className="relative">
                        <div className="absolute inset-0 bg-emerald-500/20 blur-[40px] rounded-full animate-pulse" />
                        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-zinc-800 to-zinc-950 flex items-center justify-center border border-white/10 shadow-2xl">
                          <CheckCircle2 className="w-10 h-10 text-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.5)]" />
                        </div>
                      </div>

                      <div className="space-y-3">
                        <h2 className="text-emerald-500/50 text-[10px] font-black tracking-[0.8em] uppercase">Processo Concluído</h2>
                        <h1 className="text-5xl font-black text-white tracking-tighter uppercase italic">
                          LINGOTE FORJADO
                        </h1>
                        <p className="text-zinc-500 text-xs max-w-xs mx-auto font-medium leading-relaxed uppercase tracking-widest">
                          O template foi processado, validado e catalogado na sua biblioteca.
                        </p>
                      </div>

                      <div className="flex flex-col gap-6 w-full pt-4">
                        <Link 
                          href="/gallery"
                          className="group relative flex items-center justify-center gap-4 px-10 py-6 rounded-2xl bg-white text-black text-sm font-black hover:scale-[1.05] active:scale-[0.98] transition-all shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:shadow-[0_0_50px_rgba(255,255,255,0.4)] overflow-hidden"
                        >
                          <span className="relative z-10">✨ VER NA GALERIA</span>
                          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform relative z-10" />
                        </Link>
                        
                        <button 
                          onClick={() => setStatus("idle")}
                          className="text-[9px] text-zinc-600 hover:text-zinc-400 font-bold tracking-[0.4em] uppercase transition-colors"
                        >
                          [ RETORNAR AO COMANDO ]
                        </button>
                      </div>
                    </motion.div>

                    {/* Industrial accents */}
                    <div className="absolute top-10 left-10 flex flex-col gap-1 opacity-20">
                      <div className="w-12 h-[1px] bg-white" />
                      <div className="w-6 h-[1px] bg-white" />
                    </div>
                    <div className="absolute bottom-10 right-10 flex flex-col items-end gap-1 opacity-20">
                      <div className="w-6 h-[1px] bg-white" />
                      <div className="w-12 h-[1px] bg-white" />
                    </div>
                  </motion.div>
                ) : (
                  <motion.div 
                    key="idle" 
                    initial={{ opacity: 0, scale: 0.98 }} 
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="w-full h-full flex flex-col items-center justify-center gap-6"
                  >
                    <div className="w-16 h-16 rounded-2xl bg-white/5 border border-dashed border-white/10 flex items-center justify-center">
                      <Flame className="w-6 h-6 text-zinc-700" />
                    </div>
                    <div className="text-center space-y-2">
                      <h3 className="text-zinc-500 font-medium text-sm tracking-wide uppercase">Forge Ready</h3>
                      <p className="text-xs text-zinc-700 max-w-[240px]">Aguardando ignição para iniciar fabricação industrial.</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </main>
        </motion.div>
      </div>
      )}
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
