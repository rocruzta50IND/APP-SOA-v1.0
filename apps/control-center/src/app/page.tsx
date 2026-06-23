"use client";

import React, { useState, useEffect, useRef } from "react";
import { 
  Box,
  Loader2,
  Layers,
  Camera,
  Activity,
  Flame,
  Settings as Cog,
  Hammer,
  Zap,
  CheckCircle2
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useForge } from "@/context/ForgeContext";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { MissionStatusHeader } from "@/components/dashboard/MissionStatusHeader";
import TerminalView from "@/components/TerminalView";

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
  const {
    status,
    currentStep,
    forgeStatusLogs,
    startForge,
    setStatus,
    sessionId,
    brainstormData,
    userAnswers,
    setUserAnswers,
    isPromptReady
  } = useForge();
  
  const [userInput, setUserInput] = useState("");
  const [hackerLogs, setHackerLogs] = useState<string[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const terminalScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (terminalScrollRef.current) {
      terminalScrollRef.current.scrollTop = terminalScrollRef.current.scrollHeight;
    }
  }, [forgeStatusLogs, brainstormData]);

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

  const handleStartBrainstorm = () => {
    if (!userInput.trim() || status === "fabricating") return;
    setCurrentQuestionIndex(0);
    startForge({ phase: 'brainstorm', input: userInput });
  };

  const handleStartPromptBuild = () => {
    if (status === "fabricating") return;
    startForge({ phase: 'prompt_build', answers: userAnswers });
  };

  const handleStartCodeGeneration = () => {
    if (status === "fabricating") return;
    startForge({ phase: 'generate_code' });
  };

  if (!mounted) return <div className="h-full bg-black" />;

  return (
    <div className="h-full bg-black p-4 overflow-hidden">
      <div 
        className="h-full grid gap-4 overflow-hidden"
        style={{ gridTemplateColumns: "400px 1fr" }}
      >
        {/* A. FIXED PARAMS (Sidebar Top) */}
        <section
          className="glass-card p-6 flex flex-col gap-6 shadow-2xl border-white/5 bg-zinc-950/80 z-20 h-full"
          style={{ gridColumn: "1" }}
        >
          <div className="flex items-center justify-between shrink-0">
            <h2 className="micro-label text-orange-500/80 font-bold">Brainstorm do Produto</h2>
            <Box className="w-4 h-4 text-orange-500" />
          </div>

          <div 
            ref={terminalScrollRef}
            className="flex-1 overflow-y-auto custom-scrollbar flex flex-col gap-4"
          >
            {/* LOGS DA FORJA (Aparecem durante o fabricamento) */}
            {forgeStatusLogs.length > 0 && (
              <div className="flex flex-col gap-1 font-mono text-[10px] bg-black/40 p-4 rounded-xl border border-white/5">
                {forgeStatusLogs.map((log, i) => (
                  <div key={i} className="text-zinc-400 animate-in fade-in duration-300">
                    <span className="text-orange-500/40 mr-2">»</span>
                    {log}
                  </div>
                ))}
              </div>
            )}

            {/* CAIXAS DE SELEÇÃO (Brainstorm Completo) */}
            {brainstormData && brainstormData.questions && brainstormData.questions.length > 0 && !isPromptReady && status !== "fabricating" && (
              <div className="space-y-6 bg-white/5 p-4 rounded-xl border border-white/10 animate-in slide-in-from-bottom-4 relative">
                <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-zinc-900 border border-white/10 flex items-center justify-center text-[10px] font-bold text-orange-500">
                  {currentQuestionIndex + 1}/{brainstormData.questions.length}
                </div>
                {(() => {
                  const q = brainstormData.questions[currentQuestionIndex];
                  return (
                    <div key={q.id} className="space-y-4 animate-in slide-in-from-right-2">
                      <label className="micro-label text-white text-base">{q.question}</label>
                      <div className="space-y-2">
                        {q.options.map((opt: string, i: number) => (
                          <label key={i} className="flex items-start gap-3 p-3 rounded-lg border border-white/5 bg-black/20 cursor-pointer group hover:bg-white/5 transition-colors">
                            <input 
                              type="radio" 
                              name={q.id} 
                              value={opt} 
                              checked={userAnswers[q.id] === opt}
                              onChange={() => setUserAnswers({...userAnswers, [q.id]: opt})}
                              className="mt-1 accent-orange-500 w-4 h-4"
                              disabled={status === "fabricating"}
                            />
                            <span className={cn("text-sm", opt.includes("(Recomendado)") ? "text-amber-500 font-bold" : "text-zinc-300 group-hover:text-white")}>
                              {opt}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>
                  );
                })()}
              </div>
            )}
          </div>

          {/* CHAT FIXO NA PARTE INFERIOR */}
          <div className="shrink-0 flex flex-col gap-3 mt-auto">
            {!brainstormData ? (
              <>
                <textarea
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  placeholder="Descreva o seu projeto (Ex: Um dashboard financeiro focado em investimentos e minimalista)..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-zinc-300 focus:outline-none focus:ring-1 focus:ring-amber-500/20 resize-none h-24 custom-scrollbar"
                  disabled={status === "fabricating"}
                />
                <button 
                  onClick={handleStartBrainstorm}
                  disabled={status === "fabricating" || !userInput.trim()}
                  className="group relative w-full overflow-hidden rounded-xl p-[1px] focus:outline-none disabled:opacity-50"
                >
                  <div className={cn(
                    "absolute inset-[-1000%] bg-[conic-gradient(from_90deg_at_50%_50%,#f59e0b_0%,#ea580c_50%,#f59e0b_100%)]",
                    status === "fabricating" ? "animate-[spin_4s_linear_infinite]" : "animate-[spin_2s_linear_infinite]"
                  )} />
                  <div className="inline-flex h-14 w-full cursor-pointer items-center justify-center rounded-xl bg-zinc-950 px-6 py-1 text-sm font-bold text-white backdrop-blur-3xl transition-all hover:bg-zinc-900 gap-2 border border-white/5">
                    {status === "fabricating" ? (
                      <><Loader2 className="w-5 h-5 animate-spin text-amber-400" /><span className="tracking-widest">ANALISANDO...</span></>
                    ) : (
                      <><Zap className="w-4 h-4 fill-white" /><span className="tracking-widest">INICIAR BRAINSTORM</span></>
                    )}
                  </div>
                </button>
              </>
            ) : !isPromptReady ? (
              <div className="flex flex-col gap-2">
                {currentQuestionIndex < (brainstormData.questions?.length || 0) - 1 ? (
                  <button 
                    onClick={() => {
                      const qId = brainstormData?.questions?.[currentQuestionIndex]?.id;
                      if (!qId || !userAnswers[qId]) return; // Força responder
                      setCurrentQuestionIndex(i => i + 1);
                    }}
                    disabled={status === "fabricating" || !brainstormData?.questions?.[currentQuestionIndex]?.id || !userAnswers[brainstormData.questions[currentQuestionIndex].id]}
                    className="w-full h-12 bg-zinc-800 hover:bg-zinc-700 disabled:opacity-50 text-white rounded-xl font-bold text-sm"
                  >
                    Próxima Pergunta →
                  </button>
                ) : (
                  <button 
                    onClick={handleStartPromptBuild}
                    disabled={status === "fabricating" || !brainstormData?.questions?.[currentQuestionIndex]?.id || !userAnswers[brainstormData.questions[currentQuestionIndex].id]}
                    className="w-full h-12 bg-orange-600 hover:bg-orange-500 disabled:opacity-50 text-white rounded-xl font-bold text-sm"
                  >
                    Compilar Escopo do Produto
                  </button>
                )}
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                <button 
                  onClick={handleStartCodeGeneration}
                  disabled={status === "fabricating"}
                  className="group relative w-full overflow-hidden rounded-xl p-[1px] focus:outline-none disabled:opacity-50"
                >
                  <div className="absolute inset-[-1000%] bg-[conic-gradient(from_90deg_at_50%_50%,#10b981_0%,#059669_50%,#10b981_100%)] animate-[spin_2s_linear_infinite]" />
                  <div className="inline-flex h-12 w-full cursor-pointer items-center justify-center rounded-xl bg-zinc-950 px-6 py-1 text-sm font-bold text-white backdrop-blur-3xl transition-all hover:bg-zinc-900 gap-2 border border-white/5">
                    <Flame className="w-4 h-4 text-emerald-500 fill-emerald-500" />
                    <span>FORJAR UI/UX PRO MAX</span>
                  </div>
                </button>
              </div>
            )}
          </div>
        </section>

        {/* B. PREVIEW CONTAINER */}
        <motion.div
          layout
          className="flex flex-col glass-card overflow-hidden shadow-2xl bg-[#020202] border-white/5 z-10 col-start-2 h-full"
        >
          <MissionStatusHeader 
            status={status} 
          />

          <div className="flex-1 relative overflow-hidden flex items-center justify-center bg-black">
             <TerminalView sessionId={sessionId || 'MAESTRO'} active={true} agentId="MAESTRO" />
             <AnimatePresence mode="wait">
                {status === 'fabricating' ? (
                  <motion.div key="fab" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center gap-6 p-8">
                     <motion.div key={currentStep} initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="relative">
                        <div className="absolute inset-0 bg-amber-500/10 blur-[60px] rounded-full animate-pulse" />
                        {React.createElement(FABRICATION_STEPS[currentStep]?.icon || Activity, {
                          className: "text-amber-500 drop-shadow-[0_0_30px_rgba(245,158,11,0.5)] animate-pulse transition-all duration-500 w-32 h-32"
                        })}
                     </motion.div>
                     <div className="text-center">
                        <h2 className="font-black bg-gradient-to-r from-amber-400 to-orange-600 bg-clip-text text-transparent uppercase italic text-4xl">
                          {FABRICATION_STEPS[currentStep]?.label}
                        </h2>
                        <div className="h-16 flex flex-col items-center justify-start font-mono text-[9px] text-orange-500/40 uppercase tracking-[0.2em] overflow-hidden mt-4">
                           {hackerLogs.map((log, idx) => (
                             <div key={idx} className={cn(idx === hackerLogs.length - 1 && "text-orange-400/60 animate-pulse")}>
                               {idx === hackerLogs.length - 1 ? "> " : "  "}{log}
                             </div>
                           ))}
                        </div>
                     </div>
                  </motion.div>
                ) : status === "completed" ? (
                  <motion.div key="comp" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center gap-4 text-center p-8 bg-zinc-900/40 rounded-[2rem] border border-white/10">
                     <CheckCircle2 className="text-emerald-500 w-16 h-16" />
                     <h1 className="font-black text-white tracking-tighter uppercase italic text-3xl">LINGOTE FORJADO</h1>
                     <Link href="/gallery" className="px-8 py-4 rounded-xl bg-white text-black font-black text-xs hover:scale-110 transition-transform">✨ VER GALERIA</Link>
                     <button onClick={() => setStatus("idle")} className="text-[8px] text-zinc-600 uppercase tracking-widest">[ RESET ]</button>
                  </motion.div>
                ) : (
                  <div className="flex flex-col items-center gap-4">
                    <Flame className="text-zinc-800 animate-pulse w-12 h-12" />
                    <span className="text-zinc-600 uppercase tracking-widest text-[10px]">Forge Ready</span>
                  </div>
                )}
             </AnimatePresence>
          </div>
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
