"use client";

import React, { FormEvent, useMemo } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Play, Square, ArrowRight, Plus, X, Box, Layers, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useProduction } from '@/context/ProductionContext';

export default function OrchestratorPage() {
  const {
    deployPhase,
    viewMode,
    inputValue, setInputValue,
    isProductionRunning,
    isModalOpen, setIsModalOpen,
    isResetting,
    templates,
    isLoadingTemplates,
    activeTemplate,
    logs,
    isPreviewReady,
    isWarmingUp,
    isPaused,
    pauseMessage,
    automationState,
    journeyMode, setJourneyMode,
    loadTemplates,
    handleDeployTemplate,
    handleStartProduction,
    handleStopProduction,
    handleReset,
    resumeProduction,
    requestProductionPause,
    resumeProductionAuto
  } = useProduction();

  const [isSystemLogsOpen, setIsSystemLogsOpen] = React.useState(false);
  const systemLogs = useMemo(() => (logs || []).filter(l => l.role === 'system'), [logs]);
  const chatLogs = useMemo(() => (logs || []).filter(l => l.role !== 'system'), [logs]);
  const chatEndRef = React.useRef<HTMLDivElement>(null);
  
  React.useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatLogs, systemLogs, inputValue, isPaused]);

  // Mouse Tracking for subtle interaction
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 40, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 40, damping: 30 });

  const moveX = useTransform(springX, [0, 1920], [-20, 20]);
  const moveY = useTransform(springY, [0, 1080], [-20, 20]);

  const handleMouseMove = (e: React.MouseEvent) => {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  };

  const onStartSubmit = (e?: FormEvent) => {
    if (e) e.preventDefault();
    handleStartProduction();
  };

  const handleShortcut = (text: string) => {
    setInputValue(text);
  };

  const shortcuts = [
    { label: "🚀 Novo Template MVP", cmd: "Criar um novo template MVP focado em conversão" },
    { label: "⚙️ Ajustar DNA de Design", cmd: "Refinar o DNA de design para tons esmeralda e neon" },
    { label: "📂 Analisar Vault", cmd: "Analisar arquivos do vault para extrair novos padrões" },
  ];

  // Resizer Logic removida para evitar Layout Thrashing

  return (
    <div 
      onMouseMove={handleMouseMove}
      className="relative w-full h-full bg-[#050505] overflow-hidden font-sans selection:bg-emerald-500/30 flex flex-col"
    >
      <style dangerouslySetInnerHTML={{ __html: `
        ::-webkit-scrollbar {
          width: 4px;
        }
        ::-webkit-scrollbar-track {
          background: transparent;
        }
        ::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: rgba(255, 255, 255, 0.1) transparent;
        }
      `}} />
      
      {/* Centralized Emerald Glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden z-0">
        <motion.div 
          style={{ x: moveX, y: moveY }}
          className="w-[1000px] h-[1000px] bg-emerald-500/10 rounded-full blur-[180px] opacity-20"
        />
      </div>

      {/* Production Layout Container */}
      <div className={cn(
        "relative w-full flex-1 min-h-0 flex z-10 transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]",
        viewMode === 'terminal' ? "flex-row p-4 gap-6" : "flex-col items-center justify-center p-6"
      )}>
        {/* Chatbot Sidebar (Detached Glass) */}
        <motion.div 
          layout 
          transition={{ type: "spring", bounce: 0.1, duration: 0.8 }}
          className={cn(
            "relative z-20 flex flex-col transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] overflow-hidden",
            viewMode === 'chat' 
              ? "w-full max-w-xl h-auto" 
              : "w-[400px] h-full bg-zinc-900/30 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] p-8 shrink-0 shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
          )}
        >
        <div className={cn("flex flex-col w-full", viewMode === 'chat' ? "items-center text-center mb-10" : "flex-1 min-h-0")}>
          {viewMode === 'chat' ? (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <h2 className="text-zinc-100 text-2xl md:text-3xl font-light tracking-tight mb-4 leading-tight">
                Transforme sua ideia em um protótipo funcional em segundos.
              </h2>
            </motion.div>
          ) : (
            <>
              <motion.h1 
                layout 
                className="text-2xl text-white font-bold tracking-tight mb-8"
              >
                Produção <span className="text-emerald-500">Ativa</span>
              </motion.h1>

              {/* Chat History / Command Log */}
              <div className="flex-1 overflow-y-auto mb-8 space-y-6 pr-2 custom-scrollbar mask-fade-bottom">
                 {logs.length === 0 && (
                   <div className="flex flex-col gap-2">
                     <span className="text-[9px] font-black text-zinc-600 uppercase tracking-widest ml-1">Sistema</span>
                     <div className="p-5 rounded-3xl bg-emerald-500/5 border border-emerald-500/10 shadow-inner">
                       <p className="text-[12px] text-emerald-500/80 font-mono leading-relaxed whitespace-pre-wrap">
                         [OK] Motor inicializado.<br/>
                         [OK] Sandbox pronta para deploy.
                       </p>
                     </div>
                   </div>
                 )}
                 {systemLogs.length > 0 && (
                   <details 
                     open={isSystemLogsOpen}
                     onToggle={(e) => setIsSystemLogsOpen(e.currentTarget.open)}
                     className="bg-[#0a0a0a]/50 border border-white/5 rounded-lg p-2 text-[11px] font-mono text-emerald-500/70 w-full max-w-3xl mb-4 group"
                   >
                     <summary className="cursor-pointer hover:text-emerald-400 opacity-70 hover:opacity-100 transition-opacity">Ver Logs do Sistema</summary>
                     <pre className="mt-2 whitespace-pre-wrap overflow-x-auto">
                       {systemLogs.map(msg => msg.text).join('\n')}
                     </pre>
                     <button
                       type="button"
                       onClick={(e) => {
                         e.preventDefault();
                         setIsSystemLogsOpen(false);
                       }}
                       className="mt-4 px-4 py-2 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 rounded-md border border-emerald-500/20 transition-colors w-full uppercase tracking-widest text-[9px] font-bold"
                     >
                       Esconder Logs do Sistema
                     </button>
                   </details>
                 )}

                 {chatLogs.map((msg) => {
                   const isUser = msg.role === 'user';
                   return (
                     <div key={msg.id} className={cn("flex flex-col gap-2 w-full", isUser ? "items-end" : "items-start")}>
                       <span className={cn("text-[10px] font-bold uppercase tracking-widest flex items-center gap-2", isUser ? "mr-2 text-emerald-500/60" : "ml-2 text-zinc-400")}>
                         {!isUser && <div className="w-1.5 h-1.5 rounded-full bg-zinc-400 animate-pulse" />}
                         {isUser ? "Você" : "Assistente AI"}
                       </span>
                       <div className={cn(
                         "p-5 rounded-2xl max-w-[85%] shadow-xl border backdrop-blur-md",
                         isUser 
                           ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-50 rounded-br-sm" 
                           : "bg-zinc-900/80 border-white/10 text-zinc-300 rounded-bl-sm"
                       )}>
                         <p className="text-sm leading-relaxed whitespace-pre-wrap font-sans">
                           {msg.text}
                         </p>
                       </div>
                     </div>
                   );
                 })}
                 
                 <div ref={chatEndRef} className="h-4" />

                 {isPaused && (
                   <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center justify-center p-6 bg-amber-500/10 border border-amber-500/20 rounded-3xl">
                     <p className="text-amber-500 text-sm mb-4 font-medium text-center">{pauseMessage}</p>
                     <button
                       onClick={() => {
                         if (window.electronAPI) {
                           resumeProduction();
                         }
                       }}
                       className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold transition-all shadow-[0_0_20px_rgba(245,158,11,0.4)]"
                     >
                       Continuar Execução
                     </button>
                   </motion.div>
                 )}
                 
                 {inputValue && (
                   <div className="flex flex-col gap-2 items-end">
                     <span className="text-[9px] font-black text-zinc-600 uppercase tracking-widest mr-1">Comando</span>
                     <div className="p-5 rounded-3xl bg-white/5 border border-white/5 shadow-sm max-w-[90%]">
                       <p className="text-[12px] text-zinc-300 leading-relaxed italic font-medium">
                         "{inputValue}"
                       </p>
                     </div>
                   </div>
                 )}
              </div>
            </>
          )}
        </div>

        {/* Floating Input Card */}
        <motion.div layout className={cn("w-full relative shrink-0 flex flex-col gap-3", viewMode === 'terminal' && "pt-6 border-t border-white/5")}>
          {isProductionRunning && (
            <div className="flex justify-center">
              {automationState === 'running' && (
                <button
                  type="button"
                  onClick={() => {
                    if (window.electronAPI) {
                      requestProductionPause();
                    }
                  }}
                  className="px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-xs font-bold uppercase tracking-widest hover:bg-emerald-500/20 transition-colors"
                >
                  Pausar Automação
                </button>
              )}
              {automationState === 'pause-requested' && (
                <div className="px-4 py-1.5 rounded-full bg-zinc-800/50 border border-zinc-700 text-zinc-500 text-xs font-bold uppercase tracking-widest cursor-not-allowed flex items-center gap-2">
                  <div className="w-3 h-3 border-2 border-zinc-500 border-t-transparent rounded-full animate-spin" />
                  Aguardando IA Finalizar Ação...
                </div>
              )}
            </div>
          )}

          {isProductionRunning && automationState === 'awaiting-input' && journeyMode === null ? (
            <div className="flex gap-4 p-6 bg-white/[0.03] backdrop-blur-2xl border border-white/10 rounded-[2rem] shadow-2xl items-center justify-center">
              <button
                onClick={() => {
                  setJourneyMode('mvp');
                  if (window.electronAPI) window.electronAPI.startAutomatedEngine();
                }}
                className="flex-1 py-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold uppercase tracking-widest hover:bg-emerald-500/20 transition-all text-sm"
              >
                Modo Esteira MVP
              </button>
              <button
                onClick={() => setJourneyMode('freeform')}
                className="flex-1 py-4 rounded-2xl bg-zinc-800/50 border border-zinc-700 text-zinc-300 font-bold uppercase tracking-widest hover:bg-zinc-700/80 transition-all text-sm"
              >
                Modo Sandbox Livre
              </button>
            </div>
          ) : isProductionRunning && automationState === 'awaiting-input' && journeyMode === 'mvp' ? (
            <div className="flex flex-col items-center justify-center gap-4 p-6 bg-white/[0.03] backdrop-blur-2xl border border-white/10 rounded-[2rem] shadow-2xl">
              <div className="flex items-center gap-2 text-emerald-500 font-bold uppercase tracking-widest text-sm">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                Piloto Automático em Execução
              </div>
              <button
                onClick={() => setJourneyMode('freeform')}
                className="px-6 py-2 rounded-xl bg-zinc-800/50 border border-zinc-700 text-zinc-300 font-bold uppercase tracking-widest hover:bg-zinc-700/80 transition-all text-xs"
              >
                Pausar / Assumir Controle
              </button>
            </div>
          ) : (
            <form 
              onSubmit={onStartSubmit}
              className="group relative bg-white/[0.03] backdrop-blur-2xl border border-white/10 rounded-[2rem] overflow-hidden transition-all duration-500 focus-within:border-white/20 focus-within:bg-white/[0.06] shadow-2xl"
            >
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent opacity-0 group-focus-within:opacity-100 transition-opacity duration-700" />
              
              <textarea
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                disabled={!isPreviewReady || (isProductionRunning && automationState !== 'awaiting-input')}
                placeholder={!isPreviewReady ? "Selecione um template na biblioteca (+) para iniciar o setup..." : (isProductionRunning ? (automationState === 'awaiting-input' ? "Comando Livre na Sandbox..." : "Motor em operação...") : "Como posso ajudar você a construir hoje?")}
                className={cn(
                  "w-full bg-transparent p-6 text-zinc-100 placeholder-zinc-600 text-base outline-none resize-none overflow-hidden leading-relaxed transition-all duration-500",
                  viewMode === 'chat' ? "min-h-[80px]" : "min-h-[60px] text-sm",
                  (!isPreviewReady || (isProductionRunning && automationState !== 'awaiting-input')) && "opacity-50 cursor-not-allowed"
                )}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    if (isProductionRunning && automationState === 'awaiting-input' && journeyMode === 'freeform') {
                      if (window.electronAPI && inputValue.trim()) {
                        window.electronAPI.sendFreeformCommand(inputValue);
                        setInputValue("");
                      }
                    } else if (!isProductionRunning) {
                      handleStartProduction();
                    }
                  }
                }}
              />

              <div className="flex items-center justify-between px-4 pb-4 bg-transparent">
                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(true);
                    loadTemplates();
                  }}
                  className="p-2.5 rounded-xl text-zinc-500 hover:text-emerald-400 hover:bg-white/5 transition-all active:scale-95"
                  title="Biblioteca"
                >
                  <Plus className="w-5 h-5" />
                </button>

                <div className="flex items-center gap-2">
                  {viewMode === 'terminal' && (
                     <button
                      type="button"
                      onClick={handleReset}
                      className="px-4 py-2 rounded-xl text-[10px] font-black text-zinc-500 hover:text-white transition-colors uppercase tracking-[0.2em]"
                    >
                      Reset
                    </button>
                  )}
                  <button
                    type="submit"
                    disabled={isProductionRunning && automationState !== 'awaiting-input'}
                    onClick={(e) => {
                      if (isProductionRunning && automationState === 'awaiting-input' && journeyMode === 'freeform') {
                        e.preventDefault();
                        if (window.electronAPI && inputValue.trim()) {
                          window.electronAPI.sendFreeformCommand(inputValue);
                          setInputValue("");
                        }
                      }
                    }}
                    className={cn(
                      "p-2.5 rounded-xl transition-all active:scale-95",
                      (isProductionRunning && automationState !== 'awaiting-input')
                        ? "text-zinc-700 cursor-not-allowed" 
                        : "text-zinc-500 hover:text-emerald-500 hover:bg-white/5"
                    )}
                  >
                    {(isProductionRunning && automationState !== 'awaiting-input') ? (
                      <div className="w-5 h-5 border-2 border-zinc-700 border-t-emerald-500 rounded-full animate-spin" />
                    ) : (
                      <ArrowRight className="w-5 h-5 stroke-[2.5]" />
                    )}
                  </button>
                </div>
              </div>
            </form>
          )}
          
          {viewMode === 'chat' && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-8 flex flex-wrap justify-center gap-3"
            >
              {shortcuts.map((s, idx) => (
                <button
                  key={idx}
                  onClick={() => handleShortcut(s.cmd)}
                  className="px-4 py-2 rounded-xl bg-transparent border border-white/5 hover:border-white/20 hover:bg-white/5 text-zinc-500 hover:text-zinc-300 text-[11px] font-medium transition-all duration-300"
                >
                  {s.label}
                </button>
              ))}
            </motion.div>
          )}
        </motion.div>
      </motion.div>

      {/* Resizer Splitter Removido */}

      {/* Production Preview Area (Detached Stage) */}
      <AnimatePresence>
        {viewMode === 'terminal' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
            transition={{ type: "spring", damping: 25, stiffness: 120 }}
            className="flex-1 min-w-0 h-full flex flex-col relative z-10 overflow-hidden"
          >
            {/* Fake Browser - Immersive detached look */}
            <div className="flex-1 flex flex-col bg-zinc-900/20 backdrop-blur-xl rounded-[2.5rem] border border-white/10 shadow-[0_40px_100px_rgba(0,0,0,0.6)] overflow-hidden">
              {/* Browser Control Bar */}
              <div className="flex items-center justify-between h-16 px-8 bg-black/40 border-b border-white/5 shrink-0">
                <div className="flex items-center gap-4">
                  <div className="flex gap-2.5">
                    <div className="w-3.5 h-3.5 rounded-full bg-[#FF5F56]/80 hover:bg-[#FF5F56] transition-colors cursor-pointer" />
                    <div className="w-3.5 h-3.5 rounded-full bg-[#FFBD2E]/80 hover:bg-[#FFBD2E] transition-colors cursor-pointer" />
                    <div className="w-3.5 h-3.5 rounded-full bg-[#27C93F]/80 hover:bg-[#27C93F] transition-colors cursor-pointer" />
                  </div>
                  <div className="ml-8 px-6 py-2 rounded-2xl bg-white/5 border border-white/10 text-xs text-zinc-500 font-mono w-full max-w-[300px] lg:max-w-[450px] min-w-0 flex items-center justify-between group cursor-text">
                    <div className="flex items-center gap-3 truncate">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      http://127.0.0.1:3001
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-8">
                  {(isProductionRunning && automationState !== 'awaiting-input') && (
                    <div className="flex items-center gap-3 px-5 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 backdrop-blur-md">
                      <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                      <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Compilando</span>
                    </div>
                  )}
                  <div className="flex items-center gap-3 pl-8 border-l border-white/10">
                    <button
                      onClick={() => window.electronAPI?.openPreviewWindow?.('http://127.0.0.1:3001')}
                      className="p-2.5 hover:bg-white/5 rounded-2xl text-zinc-400 hover:text-white transition-all active:scale-90"
                      title="Abrir em Nova Janela"
                    >
                      <ExternalLink size={20} />
                    </button>
                    <button
                      onClick={handleStopProduction}
                      className="p-2.5 hover:bg-red-500/10 rounded-2xl text-zinc-400 hover:text-red-500 transition-all active:scale-90"
                      title="Interromper"
                    >
                      <Square size={20} fill="currentColor" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Viewport Area */}
              <div className="flex-1 bg-[#050505] relative overflow-hidden">
                <iframe 
                  src={isPreviewReady ? "http://127.0.0.1:3001" : "about:blank"} 
                  className={cn(
                    "w-full h-full border-none [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] transition-opacity duration-1000",
                    isPreviewReady ? "opacity-100" : "opacity-0"
                  )}
                  title="Factory Stage"
                />
                
                {/* Overlay Waiting State */}
                <AnimatePresence>
                  {!isProductionRunning || !isPreviewReady ? (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 bg-[#050505] z-50 pointer-events-none overflow-hidden"
                    >
                      {/* Blurred Dynamic Background */}
                      {activeTemplate && activeTemplate.images && activeTemplate.images.length > 0 ? (
                         <motion.img 
                           key={activeTemplate.name}
                           initial={{ scale: 1.1, opacity: 0 }}
                           animate={{ scale: 1.2, opacity: 0.4 }}
                           exit={{ opacity: 0 }}
                           transition={{ duration: 1.5, ease: "easeOut" }}
                           src={`forge://${activeTemplate.relativePath || activeTemplate.path}/preview/${activeTemplate.images[0]}`}
                           alt="Background"
                           className="absolute inset-0 w-full h-full object-cover blur-[60px] mix-blend-screen pointer-events-none"
                         />
                      ) : (
                         <motion.div 
                           initial={{ opacity: 0 }}
                           animate={{ opacity: 0.15 }}
                           exit={{ opacity: 0 }}
                           transition={{ duration: 1.5 }}
                           className="absolute inset-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-emerald-500/40 via-[#050505] to-[#050505] blur-[100px] pointer-events-none"
                         />
                      )}
                      
                      {/* Darkening Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/80 to-[#050505]/40 backdrop-blur-sm" />

                      <div className="absolute inset-0 flex flex-col items-center justify-center gap-12">
                        <div className="relative group flex items-center justify-center">
                          <div className="absolute inset-0 bg-emerald-500/20 blur-[100px] rounded-full scale-150 animate-pulse" />
                          {isProductionRunning && !isPreviewReady ? (
                            <div className="relative flex items-center justify-center w-32 h-32">
                              {/* Core glow */}
                              <motion.div 
                                animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.8, 0.3] }}
                                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute inset-0 bg-emerald-500/30 rounded-full blur-2xl"
                              />
                              {/* Outer Ring */}
                              <motion.div 
                                animate={{ rotate: 360 }}
                                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                                className="absolute inset-0 w-full h-full rounded-full border-[2px] border-dashed border-emerald-500/30"
                              />
                              {/* Inner Ring */}
                              <motion.div 
                                animate={{ rotate: -360 }}
                                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                className="absolute inset-3 w-[calc(100%-24px)] h-[calc(100%-24px)] rounded-full border-2 border-emerald-500/80 border-t-transparent border-l-transparent"
                              />
                              {/* Center Icon */}
                              <Layers className="w-10 h-10 text-emerald-400 relative z-10 animate-pulse" />
                            </div>
                          ) : (
                            <div className="relative flex items-center justify-center w-32 h-32">
                              {/* Core glow */}
                              <motion.div 
                                animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.5, 0.2] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute inset-0 bg-emerald-500/20 rounded-full blur-2xl"
                              />
                              {/* Outer Pulse Ring */}
                              <motion.div 
                                animate={{ scale: [0.9, 1.1, 0.9], opacity: [0.2, 0.5, 0.2] }}
                                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute inset-0 w-full h-full rounded-full border border-emerald-500/20"
                              />
                              {/* Center Icon */}
                              <Box className="w-12 h-12 text-emerald-500 relative z-10 drop-shadow-[0_0_15px_rgba(16,185,129,0.5)] transition-all duration-1000 group-hover:scale-110" strokeWidth={1.5} />
                            </div>
                          )}
                        </div>
                        <div className="text-center space-y-4 relative z-10">
                          <h2 className="text-4xl font-black text-white tracking-tighter drop-shadow-2xl">
                            {isProductionRunning && !isPreviewReady ? "Construindo Sandbox..." : "Motor em Standby"}
                          </h2>
                          <div className="flex items-center justify-center gap-3 drop-shadow-lg">
                            {isProductionRunning && !isPreviewReady && (
                              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                            )}
                            <p className={cn(
                              "text-sm font-mono tracking-[0.4em] uppercase font-bold",
                              isProductionRunning && !isPreviewReady ? "text-emerald-500" : "text-zinc-500"
                            )}>
                              {isProductionRunning && !isPreviewReady ? (isWarmingUp ? "Compiling Interface UI... (Warmup)" : "Establishing Local Connection...") : "Ready for Deployment"}
                            </p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      </div>

      {/* Reset Loading Modal */}
      <AnimatePresence>
        {isResetting && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/90 backdrop-blur-xl"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative flex flex-col items-center justify-center p-12 bg-zinc-900/40 border border-red-500/10 rounded-[3rem] shadow-[0_0_100px_rgba(239,68,68,0.1)]"
            >
              <div className="relative flex items-center justify-center w-32 h-32 mb-8">
                <motion.div 
                  animate={{ scale: [1, 1.5, 1], opacity: [0.2, 0.6, 0.2] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute inset-0 bg-red-500/20 rounded-full blur-2xl"
                />
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 w-full h-full rounded-full border-4 border-red-500/40 border-t-red-500"
                />
                <motion.div 
                  animate={{ rotate: -360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-4 w-[calc(100%-32px)] h-[calc(100%-32px)] rounded-full border-2 border-dashed border-red-500/60"
                />
              </div>
              <h2 className="text-3xl font-black text-white tracking-tighter mb-3">
                Desintegrando <span className="text-red-500">Sandbox</span>
              </h2>
              <p className="text-zinc-400 font-medium text-[10px] tracking-widest uppercase">
                Aniquilando processos e limpando área de trabalho...
              </p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Template Selector Modal (Unchanged in logic, just styling polish) */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-5xl max-h-[85vh] bg-[#0a0a0a] border border-white/10 rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col"
            >
              <div className="p-8 border-b border-white/5 flex items-center justify-between bg-zinc-900/20">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-emerald-500/10 rounded-2xl border border-emerald-500/20">
                    <Layers className="w-6 h-6 text-emerald-500" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white tracking-tight">Biblioteca de Templates</h2>
                    <p className="text-sm text-zinc-500 font-medium">Selecione o DNA base para sua sandbox</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-3 hover:bg-white/5 rounded-full text-zinc-500 hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="flex-1 overflow-hidden p-8 custom-scrollbar relative min-h-[500px] flex flex-col">
                <AnimatePresence mode="wait">
                  {deployPhase === 'initializing' ? (
                    <motion.div
                      key="initializing"
                      initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
                      animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                      exit={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
                      className="flex-1 flex flex-col items-center justify-center w-full h-full bg-[#0a0a0a]/90 backdrop-blur-xl z-10"
                    >
                      <div className="relative flex items-center justify-center w-32 h-32 mb-8">
                        <motion.div 
                          animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.8, 0.3] }}
                          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                          className="absolute inset-0 bg-emerald-500/30 rounded-full blur-2xl"
                        />
                        <motion.div 
                          animate={{ rotate: 360 }}
                          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                          className="absolute inset-0 w-full h-full rounded-full border-2 border-emerald-500/50 border-t-transparent border-l-transparent"
                        />
                        <Layers className="w-10 h-10 text-emerald-400 relative z-10 animate-pulse" />
                      </div>
                      <h3 className="text-2xl font-black text-white tracking-tighter drop-shadow-2xl mb-2">
                        Sintetizando DNA...
                      </h3>
                      <p className="text-emerald-500/80 text-xs font-mono tracking-widest uppercase animate-pulse">
                        Extraindo assets e preparando ambiente isolado
                      </p>
                    </motion.div>
                  ) : isLoadingTemplates ? (
                    <motion.div 
                      key="loading"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex-1 flex flex-col items-center justify-center w-full h-full gap-4"
                    >
                      <div className="w-10 h-10 border-2 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin" />
                      <p className="text-xs text-emerald-500/60 font-mono tracking-widest uppercase">Scanning Assets...</p>
                    </motion.div>
                  ) : (
                    <motion.div 
                      key="grid"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-y-auto custom-scrollbar h-full w-full pr-2"
                    >
                      {templates.map((tpl) => (
                        <button
                          key={tpl.id}
                          onClick={() => handleDeployTemplate(tpl)}
                          className="group flex flex-col items-start p-5 bg-white/5 border border-white/5 hover:border-emerald-500/30 hover:bg-emerald-500/5 rounded-3xl transition-all text-left"
                        >
                          <div className="w-full aspect-video bg-zinc-900 rounded-2xl mb-5 overflow-hidden relative border border-white/5">
                             {tpl.images && tpl.images.length > 0 ? (
                               <img 
                                 src={`forge://${tpl.relativePath || tpl.path}/preview/${tpl.images[0]}`}
                                 alt={tpl.name}
                                 className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                               />
                             ) : (
                               <div className="w-full h-full flex items-center justify-center">
                                 <Box className="w-10 h-10 text-zinc-800" />
                               </div>
                             )}
                             <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-white/10 text-[9px] font-black text-emerald-500 uppercase tracking-widest">
                               Tier {tpl.tier}
                             </div>
                          </div>
                          <h3 className="text-base font-bold text-zinc-200 group-hover:text-emerald-500 transition-colors mb-2">{tpl.name}</h3>
                          <p className="text-xs text-zinc-500 line-clamp-2 leading-relaxed font-medium">{tpl.description}</p>
                          <div className="mt-5 flex items-center gap-2">
                            <span className="px-2.5 py-1 rounded-lg bg-white/5 text-[9px] font-bold text-zinc-600 uppercase tracking-tighter">{tpl.category}</span>
                            <span className="px-2.5 py-1 rounded-lg bg-white/5 text-[9px] font-bold text-zinc-600 uppercase tracking-tighter">{tpl.theme}</span>
                          </div>
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
