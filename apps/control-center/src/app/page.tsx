"use client";

import React, { useState, useEffect, useRef } from "react";
import { 
  Terminal as TerminalIcon, 
  Box,
  Loader2,
  Layers,
  Camera,
  Activity,
  Flame,
  Settings as Cog,
  Hammer,
  Minimize2,
  ArrowRightLeft,
  Zap,
  CheckCircle2
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useForge } from "@/context/ForgeContext";
import dynamic from "next/dynamic";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { useTelemetryIpc } from "@/hooks/useTelemetryIpc";
import { useLibraryCategories } from "@/hooks/useLibraryCategories";
import { MissionStatusHeader } from "@/components/dashboard/MissionStatusHeader";
import { AgentTabs } from "@/components/dashboard/AgentTabs";

const TerminalView = dynamic(() => import("@/components/TerminalView"), { ssr: false });

const FABRICATION_STEPS = [
  { label: "Contextualização", icon: Flame },
  { label: "Arquiteto", icon: Cog },
  { label: "Enxame", icon: Zap },
  { label: "Costureiro", icon: Layers },
  { label: "Captura", icon: Camera },
  { label: "Empacotamento", icon: Hammer }
];

function ForgePageContent() {
  const [mounted, setMounted] = useState(false);
  const { status, currentStep, forgeStatusLogs, startForge, setStatus, sessionId } = useForge();
  
  const {
    categories,
    category,
    setCategory,
    isCreatingCategory,
    setIsCreatingCategory,
    newCategoryName,
    setNewCategoryName,
    handleCreateCategory
  } = useLibraryCategories();

  const { activeSessions, setActiveTab: setTeleTab } = useTelemetryIpc(sessionId);

  const [themeMode, setThemeMode] = useState("Dark");
  const [designTier, setDesignTier] = useState(2);
  const [hackerLogs, setHackerLogs] = useState<string[]>([]);
  const [isTerminalPrimary, setIsTerminalPrimary] = useState(false);
  const [activeTab, setActiveTab] = useState('MAESTRO');

  const terminalScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (terminalScrollRef.current) {
      terminalScrollRef.current.scrollTop = terminalScrollRef.current.scrollHeight;
    }
  }, [forgeStatusLogs]);

  useEffect(() => {
    if (status === 'fabricating') {
      const phrases = [
        "IGNITING_FURNACE_COILS...", "MELTING_NEURAL_LOGIC...", "FORGING_COMPONENT_STEEL...",
        "TEMPERING_UI_VECTORS...", "PHOTOGRAPHING_MOLTEN_CORE...", "COOLING_BUNDLE_ASSETS...",
        "STRIKING_THE_ANVIL...", "POLISHING_SURFACE_GRID...", "CASTING_INTERACTIVE_SHADOWS...",
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

  const handleStartFabrication = () => {
    if (status === "fabricating") return;
    setActiveTab('MAESTRO');
    startForge({ category, theme: themeMode, tier: designTier });
  };

  const toggleFocus = () => setIsTerminalPrimary(!isTerminalPrimary);

  if (!mounted) return <div className="h-full bg-black" />;

  return (
    <div className="h-full bg-black p-4 overflow-hidden">
      <div 
        className="h-full grid gap-4 overflow-hidden"
        style={{ gridTemplateColumns: "400px 1fr", gridTemplateRows: "auto 1fr" }}
      >
        {/* A. FIXED PARAMS (Sidebar Top) */}
        <section 
          className="glass-card p-6 flex flex-col gap-6 shadow-2xl border-white/5 bg-zinc-950/80 z-20"
          style={{ gridColumn: "1", gridRow: "1" }}
        >
          <div className="flex items-center justify-between">
            <h2 className="micro-label text-orange-500/80 font-bold">Forge Parameters</h2>
            <Box className="w-4 h-4 text-orange-500" />
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="micro-label">Category</label>
                <button 
                  onClick={() => setIsCreatingCategory(!isCreatingCategory)} 
                  className="text-[10px] text-amber-500 hover:text-amber-400 font-bold uppercase"
                  disabled={status === "fabricating"}
                >
                  {isCreatingCategory ? "Cancelar" : "+ Nova"}
                </button>
              </div>
              {isCreatingCategory ? (
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newCategoryName}
                    onChange={(e) => setNewCategoryName(e.target.value)}
                    placeholder="Nome da categoria"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-zinc-300 focus:outline-none focus:ring-1 focus:ring-amber-500/20"
                    onKeyDown={(e) => e.key === 'Enter' && handleCreateCategory()}
                  />
                  <button 
                    onClick={handleCreateCategory}
                    className="bg-amber-500 text-black px-4 rounded-xl font-bold text-sm hover:bg-amber-400"
                  >
                    Criar
                  </button>
                </div>
              ) : (
                <select 
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  disabled={status === "fabricating" || categories.length === 0}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-zinc-300 focus:outline-none focus:ring-1 focus:ring-amber-500/20 appearance-none cursor-pointer disabled:opacity-50"
                >
                  {categories.map((c) => (
                    <option key={c} value={c} className="bg-zinc-900">{c}</option>
                  ))}
                  {categories.length === 0 && <option className="bg-zinc-900">Carregando...</option>}
                </select>
              )}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <label className="micro-label">Theme</label>
                <select 
                  value={themeMode}
                  onChange={(e) => setThemeMode(e.target.value)}
                  disabled={status === "fabricating"}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-zinc-300 focus:outline-none appearance-none cursor-pointer"
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
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-zinc-300 focus:outline-none appearance-none cursor-pointer"
                >
                  <option value={1} className="bg-zinc-900">Tier 1</option>
                  <option value={2} className="bg-zinc-900">Tier 2</option>
                  <option value={3} className="bg-zinc-900">Tier 3</option>
                  <option value={4} className="bg-zinc-900">Tier 4</option>
                  <option value={5} className="bg-zinc-900">Tier 5</option>
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

        {/* B. SWAPPABLE PREVIEW CONTAINER */}
        <motion.div
          layout
          transition={{ type: "spring", stiffness: 200, damping: 25 }}
          className={cn(
            "flex flex-col glass-card overflow-hidden shadow-2xl bg-[#020202] border-white/5 z-10",
            !isTerminalPrimary ? "row-span-2 col-start-2" : "row-start-2 col-start-1"
          )}
        >
          <MissionStatusHeader 
            isTerminalPrimary={isTerminalPrimary} 
            status={status} 
            toggleFocus={toggleFocus} 
          />

          <div className="flex-1 relative overflow-hidden flex items-center justify-center bg-black">
             <AnimatePresence mode="wait">
                {status === 'fabricating' ? (
                  <motion.div key="fab" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center gap-6 p-8">
                     <motion.div key={currentStep} initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="relative">
                        <div className="absolute inset-0 bg-amber-500/10 blur-[60px] rounded-full animate-pulse" />
                        {React.createElement(FABRICATION_STEPS[currentStep]?.icon || Activity, {
                          className: cn("text-amber-500 drop-shadow-[0_0_30px_rgba(245,158,11,0.5)] animate-pulse transition-all duration-500", !isTerminalPrimary ? "w-32 h-32" : "w-16 h-16")
                        })}
                     </motion.div>
                     <div className="text-center">
                        <h2 className={cn("font-black bg-gradient-to-r from-amber-400 to-orange-600 bg-clip-text text-transparent uppercase italic", !isTerminalPrimary ? "text-4xl" : "text-sm")}>
                          {FABRICATION_STEPS[currentStep]?.label}
                        </h2>
                        {!isTerminalPrimary && (
                           <div className="h-16 flex flex-col items-center justify-start font-mono text-[9px] text-orange-500/40 uppercase tracking-[0.2em] overflow-hidden mt-4">
                              {hackerLogs.map((log, idx) => (
                                <div key={idx} className={cn(idx === hackerLogs.length - 1 && "text-orange-400/60 animate-pulse")}>
                                  {idx === hackerLogs.length - 1 ? "> " : "  "}{log}
                                </div>
                              ))}
                           </div>
                        )}
                     </div>
                  </motion.div>
                ) : status === "completed" ? (
                  <motion.div key="comp" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center gap-4 text-center p-8 bg-zinc-900/40 rounded-[2rem] border border-white/10">
                     <CheckCircle2 className={cn("text-emerald-500", !isTerminalPrimary ? "w-16 h-16" : "w-10 h-10")} />
                     <h1 className={cn("font-black text-white tracking-tighter uppercase italic", !isTerminalPrimary ? "text-3xl" : "text-xs")}>LINGOTE FORJADO</h1>
                     {!isTerminalPrimary && (
                        <Link href="/gallery" className="px-8 py-4 rounded-xl bg-white text-black font-black text-xs hover:scale-110 transition-transform">✨ VER GALERIA</Link>
                     )}
                     <button onClick={() => setStatus("idle")} className="text-[8px] text-zinc-600 uppercase tracking-widest">[ RESET ]</button>
                  </motion.div>
                ) : (
                  <div className="flex flex-col items-center gap-4">
                    <Flame className={cn("text-zinc-800 animate-pulse", !isTerminalPrimary ? "w-12 h-12" : "w-8 h-8")} />
                    <span className="text-zinc-600 uppercase tracking-widest text-[10px]">Forge Ready</span>
                  </div>
                )}
             </AnimatePresence>
          </div>
        </motion.div>

        {/* C. SWAPPABLE TERMINAL CONTAINER */}
        <motion.div
          layout
          transition={{ type: "spring", stiffness: 200, damping: 25 }}
          className={cn(
            "flex flex-col glass-card overflow-hidden shadow-2xl bg-black border-white/5 z-10",
            isTerminalPrimary ? "row-span-2 col-start-2" : "row-start-2 col-start-1"
          )}
        >
          <header className="h-10 border-b border-white/10 flex items-center px-4 justify-between bg-zinc-900/80 shrink-0">
             <div className="flex items-center gap-3 overflow-x-auto no-scrollbar">
                <TerminalIcon className={cn("w-3.5 h-3.5", isTerminalPrimary ? "text-orange-500" : "text-zinc-500")} />
                {isTerminalPrimary ? (
                  <AgentTabs activeSessions={activeSessions} activeTab={activeTab} setActiveTab={setActiveTab} />
                ) : (
                  <span className="text-[9px] font-black text-zinc-500 uppercase tracking-[0.2em]">
                    Pipeline_Status
                  </span>
                )}
             </div>
             <div className="flex items-center gap-2">
                {!isTerminalPrimary && (
                  <button onClick={toggleFocus} className="flex items-center gap-1.5 px-2 py-1 rounded bg-orange-500/10 border border-orange-500/20 hover:bg-orange-500/20 transition-all group">
                    <span className="text-[8px] font-bold text-orange-500 uppercase tracking-tighter">Swap Focus</span>
                    <ArrowRightLeft className="w-3 h-3 text-orange-500" />
                  </button>
                )}
                {isTerminalPrimary && (
                  <button onClick={toggleFocus} className="p-1.5 hover:bg-white/5 rounded-lg transition-colors group">
                    <Minimize2 className="w-3.5 h-3.5 text-zinc-500 group-hover:text-emerald-500" />
                  </button>
                )}
             </div>
          </header>
          
          <div className="flex-1 min-h-0 relative overflow-hidden bg-black">
             {/* THE REAL XTERM.JS TERMINAL (Multiplexed) */}
             <div className={cn("w-full h-full relative", isTerminalPrimary ? "opacity-100" : "opacity-0 pointer-events-none absolute inset-0")}>
                {activeSessions.map((id: string) => (
                  <TerminalView 
                    key={id}
                    sessionId={sessionId || 'MAESTRO'} 
                    active={isTerminalPrimary && activeTab === id} 
                    agentId={id}
                  />
                ))}
             </div>
             
             {/* THE HIGH-LEVEL STATUS FEED (Visible when secondary) */}
             {!isTerminalPrimary && (
                <div 
                  ref={terminalScrollRef}
                  className="absolute inset-0 p-4 overflow-y-auto font-mono text-[10px] space-y-1 custom-scrollbar bg-black/40"
                >
                  {forgeStatusLogs.length === 0 ? (
                    <div className="text-zinc-700 italic">Aguardando ignição...</div>
                  ) : (
                    forgeStatusLogs.map((log, i) => (
                      <div key={i} className="text-zinc-400 animate-in fade-in slide-in-from-left-2 duration-300">
                        <span className="text-orange-500/40 mr-2">»</span>
                        {log}
                      </div>
                    ))
                  )}
                </div>
             )}
          </div>

          {isTerminalPrimary && (
            <footer className="h-8 border-t border-white/5 bg-zinc-950/80 px-4 flex items-center justify-between shrink-0">
               <span className="text-[8px] font-mono text-zinc-600 tracking-widest uppercase">PTY_STREAM_ACTIVE // BUFFER_SECURED</span>
               <div className="flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-orange-500 animate-ping" />
                  <span className="text-[8px] font-mono text-orange-500/60 uppercase">Data Inbound</span>
               </div>
            </footer>
          )}
        </motion.div>
      </div>
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
