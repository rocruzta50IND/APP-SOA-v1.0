"use client";

import React, { useState, useEffect, FormEvent, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Play, Square, Terminal as TerminalIcon, ArrowRight, Sparkles, Cpu, Plus, X, Box, Layers } from 'lucide-react';
import TerminalView from '@/components/TerminalView';
import { cn } from '@/lib/utils';

type ViewMode = 'chat' | 'terminal';

export default function OrchestratorPage() {
  const [viewMode, setViewMode] = useState<ViewMode>('chat');
  const [inputValue, setInputValue] = useState("");
  const [isProductionRunning, setIsProductionRunning] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [templates, setTemplates] = useState<any[]>([]);
  const [isLoadingTemplates, setIsLoadingTemplates] = useState(false);

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

  useEffect(() => {
    if (typeof window !== 'undefined' && window.electronAPI && window.electronAPI.onProductionStatus) {
      const unsubscribe = window.electronAPI.onProductionStatus((payload: any) => {
        if (payload.status === 'started') {
          setIsProductionRunning(true);
          setViewMode('terminal');
        }
        if (payload.status === 'ended' || payload.status === 'stopped') {
          setIsProductionRunning(false);
        }
      });
      return unsubscribe;
    }
  }, []);

  const loadTemplates = async () => {
    if (!window.electronAPI) return;
    setIsLoadingTemplates(true);
    try {
      const data = await window.electronAPI.getGalleryData();
      setTemplates(data);
    } catch (err) {
      console.error("Failed to load templates:", err);
    } finally {
      setIsLoadingTemplates(false);
    }
  };

  const handleDeployTemplate = async (templatePath: string) => {
    if (window.electronAPI) {
      await window.electronAPI.deployTemplate(templatePath);
      setIsModalOpen(false);
      setViewMode('terminal');
    }
  };

  const handleStartProduction = (e?: FormEvent) => {
    if (e) e.preventDefault();
    if (!inputValue.trim() && viewMode === 'chat') return;

    if (window.electronAPI) {
      // @ts-ignore - command parameter support for MVP Factory
      window.electronAPI.startProduction({ command: inputValue });
      setViewMode('terminal');
    }
  };

  const handleStopProduction = () => {
    if (window.electronAPI) {
      window.electronAPI.stopProduction();
      setIsProductionRunning(false);
    }
  };

  const handleShortcut = (text: string) => {
    setInputValue(text);
  };

  const shortcuts = [
    { label: "🚀 Novo Template MVP", cmd: "Criar um novo template MVP focado em conversão" },
    { label: "⚙️ Ajustar DNA de Design", cmd: "Refinar o DNA de design para tons esmeralda e neon" },
    { label: "📂 Analisar Vault", cmd: "Analisar arquivos do vault para extrair novos padrões" },
  ];

  return (
    <div 
      onMouseMove={handleMouseMove}
      className="relative h-screen w-full flex bg-[#050505] overflow-hidden font-sans selection:bg-emerald-500/30 fixed inset-0 p-6 gap-6"
    >
      <style dangerouslySetInnerHTML={{ __html: `
        html, body { 
          overflow: hidden !important; 
          height: 100% !important;
          margin: 0 !important;
          padding: 0 !important;
        }
        ::-webkit-scrollbar {
          display: none !important;
        }
        * {
          -ms-overflow-style: none !important;
          scrollbar-width: none !important;
        }
      `}} />
      
      {/* Centralized Emerald Glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div 
          style={{ x: moveX, y: moveY }}
          className="w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[120px] opacity-30"
        />
      </div>

      {/* Emergent Layout Container */}
      <motion.div 
        layout
        className={cn(
          "relative z-10 flex flex-col transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]",
          viewMode === 'chat' ? "w-full max-w-4xl mx-auto justify-center" : "w-1/3 justify-start"
        )}
      >
        <motion.div layout className="mb-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/5 border border-emerald-500/10 mb-6">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
            <span className="text-[10px] font-bold text-emerald-500/80 uppercase tracking-[0.2em]">Neural Engine v1.0</span>
          </div>
          <motion.h1 layout className={cn("font-bold text-white tracking-tight mb-4 transition-all duration-500", viewMode === 'chat' ? "text-4xl md:text-5xl" : "text-2xl text-left")}>
            O que vamos <span className="text-emerald-500">fabricar</span> hoje?
          </motion.h1>
          {viewMode === 'chat' && (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-zinc-500 text-sm font-medium">
              Descreva seu projeto ou selecione um template da biblioteca.
            </motion.p>
          )}
        </motion.div>

        <motion.div layout className="w-full relative">
          <form 
            onSubmit={handleStartProduction}
            className="group relative bg-zinc-900/40 backdrop-blur-2xl border border-white/5 rounded-3xl overflow-hidden transition-all duration-500 focus-within:border-emerald-500/30 focus-within:bg-zinc-900/60 shadow-2xl"
          >
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent opacity-0 group-focus-within:opacity-100 transition-opacity duration-700" />
            
            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ex: Crie um dashboard minimalista esmeralda..."
              className={cn(
                "w-full bg-transparent p-6 text-zinc-100 placeholder-zinc-700 text-lg outline-none resize-none overflow-hidden leading-relaxed transition-all duration-500",
                viewMode === 'chat' ? "min-h-[160px]" : "min-h-[100px] text-sm"
              )}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleStartProduction();
                }
              }}
            />

            <div className="flex items-center justify-between p-4 bg-black/20 border-t border-white/5">
              <button
                type="button"
                onClick={() => {
                  setIsModalOpen(true);
                  loadTemplates();
                }}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-emerald-500/10 text-zinc-400 hover:text-emerald-400 border border-transparent hover:border-emerald-500/20 transition-all text-xs font-bold uppercase tracking-wider"
              >
                <Plus className="w-4 h-4" />
                {viewMode === 'chat' && "Biblioteca"}
              </button>

              <div className="flex items-center gap-2">
                {viewMode === 'terminal' && (
                   <button
                    type="button"
                    onClick={() => setViewMode('chat')}
                    className="px-4 py-2 rounded-xl text-[10px] font-bold text-zinc-500 hover:text-emerald-400 transition-colors uppercase tracking-widest"
                  >
                    Reset
                  </button>
                )}
                <button
                  type="submit"
                  disabled={isProductionRunning}
                  className={cn(
                    "flex items-center gap-2 px-6 py-2 rounded-xl font-black text-xs uppercase tracking-widest transition-all shadow-[0_0_20px_rgba(16,185,129,0.2)]",
                    isProductionRunning 
                      ? "bg-zinc-800 text-zinc-500 cursor-not-allowed" 
                      : "bg-emerald-600 hover:bg-emerald-500 text-black hover:shadow-[0_0_30px_rgba(16,185,129,0.4)]"
                  )}
                >
                  {isProductionRunning ? "Processando..." : "Fabricar"}
                  {!isProductionRunning && <ArrowRight className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </form>
        </motion.div>

        {viewMode === 'chat' && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-8 flex flex-wrap justify-center gap-3"
          >
            {shortcuts.map((s, idx) => (
              <button
                key={idx}
                onClick={() => handleShortcut(s.cmd)}
                className="px-4 py-2 rounded-xl bg-zinc-900/50 backdrop-blur-md border border-white/5 hover:border-emerald-500/40 hover:bg-emerald-500/5 text-zinc-400 hover:text-emerald-300 text-xs font-medium transition-all duration-300"
              >
                {s.label}
              </button>
            ))}
          </motion.div>
        )}
      </motion.div>

      {/* Production Stage (Right Side) */}
      <AnimatePresence>
        {viewMode === 'terminal' && (
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="flex-1 flex flex-col h-full gap-4 relative z-10"
          >
            {/* Top Section: Mock Browser Preview */}
            <div className="flex-[2] flex flex-col bg-zinc-900/40 backdrop-blur-xl border border-white/5 rounded-2xl overflow-hidden shadow-2xl">
              <div className="px-4 py-3 border-b border-white/5 bg-black/20 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-500/50" />
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/50" />
                  </div>
                  <div className="ml-4 px-3 py-1 rounded-lg bg-black/40 border border-white/5 text-[10px] text-zinc-500 font-mono w-64 truncate">
                    http://localhost:3000
                  </div>
                </div>
                <div className="flex items-center gap-3">
                   {isProductionRunning && (
                      <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-[9px] font-bold text-emerald-500 uppercase tracking-widest">Compilando</span>
                      </div>
                   )}
                   <button
                    onClick={handleStopProduction}
                    className="p-2 hover:bg-red-500/10 rounded-lg text-zinc-500 hover:text-red-500 transition-colors"
                    title="Interromper Processo"
                  >
                    <Square className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="flex-1 bg-white relative">
                 <iframe 
                   src="http://localhost:3000" 
                   className="w-full h-full border-none"
                   title="Production Preview"
                 />
                 {!isProductionRunning && (
                   <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center pointer-events-none">
                      <p className="text-zinc-400 font-mono text-sm uppercase tracking-[0.2em]">Aguardando Inicialização...</p>
                   </div>
                 )}
              </div>
            </div>

            {/* Bottom Section: Terminal Output */}
            <div className="flex-1 flex flex-col bg-black/60 backdrop-blur-3xl border border-emerald-500/10 rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(16,185,129,0.02)]">
              <div className="px-4 py-2 border-b border-white/5 flex items-center justify-between bg-zinc-900/40">
                <div className="flex items-center gap-2 text-[10px] font-bold text-emerald-500/80 uppercase tracking-widest">
                  <TerminalIcon className="w-3 h-3" />
                  Telemetria em Tempo Real
                </div>
              </div>
              <div className="flex-1 relative">
                <TerminalView sessionId="PRODUCTION_ENGINE" active={true} agentId="FACTORY_MANAGER" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

            {/* Template Selector Modal */}
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

              <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
                {isLoadingTemplates ? (
                  <div className="h-64 flex flex-col items-center justify-center gap-4">
                    <div className="w-10 h-10 border-2 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin" />
                    <p className="text-xs text-emerald-500/60 font-mono tracking-widest uppercase">Scanning Assets...</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {templates.map((tpl) => (
                      <button
                        key={tpl.id}
                        onClick={() => handleDeployTemplate(tpl.path)}
                        className="group flex flex-col items-start p-5 bg-white/5 border border-white/5 hover:border-emerald-500/30 hover:bg-emerald-500/5 rounded-3xl transition-all text-left"
                      >
                        <div className="w-full aspect-video bg-zinc-900 rounded-2xl mb-5 overflow-hidden relative border border-white/5">
                           {tpl.images && tpl.images.length > 0 ? (
                             <img 
                               src={`forge://.templates/templates-library/${tpl.category}/${tpl.theme}/${tpl.name}/preview/${tpl.images[0]}`}
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
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
