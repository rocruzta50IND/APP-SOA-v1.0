"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, Send, Layout, Cpu, Terminal } from "lucide-react";
import TerminalView from "@/components/TerminalView";

export default function ForgeHomePage() {
  const [isMounted, setIsMounted] = useState(false);
  const [isForgeStarted, setIsForgeStarted] = useState(false);
  const [wasRestored, setWasRestored] = useState(false);
  const [isTerminalView, setIsTerminalView] = useState(false);
  const [chatInput, setChatInput] = useState("");

  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    
    // Dispara via IPC para o processo Node-PTY isolado
    if (window.electronAPI && window.electronAPI.sendTerminalData) {
      window.electronAPI.sendTerminalData("forge-session", chatInput + "\r");
    }
    
    setChatInput("");
    setIsTerminalView(true); // Força a visualização para o terminal ao enviar o comando
  };

  useEffect(() => {
    setIsMounted(true);
    if (sessionStorage.getItem("forgeSessionActive") === "true") {
      setIsForgeStarted(true);
      setWasRestored(true);
    }
  }, []);

  const handleStartForge = () => {
    sessionStorage.setItem("forgeSessionActive", "true");
    setIsForgeStarted(true);
    if (typeof window !== "undefined" && (window as any).electronAPI) {
      (window as any).electronAPI.startGemini("forge-session");
    }
  };

  if (!isMounted) {
    return <div className="h-full w-full relative overflow-hidden bg-transparent" />;
  }

  return (
    <div className="h-full w-full relative overflow-hidden">
      <AnimatePresence mode="wait">
        {!isForgeStarted ? (
          <motion.div 
            key="intro"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="absolute inset-0 flex items-center justify-center flex-col gap-6"
          >
            {/* Glow central */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-500/10 blur-[100px] pointer-events-none rounded-full" />
            
            <div className="relative z-10 flex flex-col items-center gap-6">
              <div className="w-24 h-24 rounded-3xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center shadow-[0_0_50px_rgba(249,115,22,0.2)]">
                <Zap className="w-12 h-12 text-orange-500" />
              </div>
              <div className="text-center space-y-2">
                <h1 className="text-4xl font-bold text-white tracking-tight">Forge Pro Max</h1>
                <p className="text-zinc-500">Inicialize o motor criativo</p>
              </div>
              <button 
                onClick={handleStartForge}
                className="px-8 py-3 rounded-full bg-orange-500 hover:bg-orange-400 text-white font-bold tracking-wide transition-all shadow-[0_0_20px_rgba(249,115,22,0.4)] hover:shadow-[0_0_30px_rgba(249,115,22,0.6)] active:scale-95 flex items-center gap-2"
              >
                <Zap className="w-5 h-5 fill-current" />
                Iniciar Forja
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="forge"
            initial={wasRestored ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="h-full w-full p-6 flex gap-6"
          >
      
      {/* CHATBOT PANEL (ESQUERDA) */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-1/3 h-full glass-card flex flex-col border-orange-500/20 bg-orange-950/10 shadow-[0_8px_32px_rgba(249,115,22,0.05)]"
      >
        <div className="p-4 border-b border-orange-500/10 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-orange-500/10 text-orange-500 border border-orange-500/20">
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-bold text-white tracking-tight">Forge Architect</h2>
            <p className="text-xs text-orange-500/70 uppercase tracking-widest font-bold">Online</p>
          </div>
        </div>

        <div className="flex-1 p-4 overflow-y-auto no-scrollbar flex flex-col gap-4">
          <div className="bg-orange-500/10 border border-orange-500/20 text-orange-100 p-3 rounded-2xl rounded-tl-sm self-start max-w-[85%]">
            <p className="text-sm">Olá, eu sou o Arquiteto da Forja. O que vamos construir hoje?</p>
          </div>
        </div>

        <form onSubmit={handleChatSubmit} className="p-4 border-t border-orange-500/10">
          <div className="relative group">
            <input 
              type="text" 
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder="Descreva o layout desejado..." 
              className="w-full bg-black/50 border border-orange-500/20 rounded-xl py-3 pl-4 pr-12 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-orange-500/50 transition-colors"
            />
            <button 
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-lg bg-orange-500 text-white hover:bg-orange-400 transition-colors shadow-lg shadow-orange-500/20"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </form>
      </motion.div>

      {/* CONTAINER 3D DO PREVIEW / TERMINAL (DIREITA) */}
      <div className="w-2/3 h-full relative" style={{ perspective: "1200px" }}>
        
        {/* TOGGLE BUTTON */}
        <button 
          onClick={() => setIsTerminalView(!isTerminalView)}
          className="absolute top-4 right-4 z-50 p-2 rounded-xl bg-black/60 border border-white/10 hover:bg-white/10 hover:border-orange-500/50 text-zinc-400 hover:text-white transition-all backdrop-blur-md shadow-xl"
        >
          {isTerminalView ? <Layout className="w-5 h-5" /> : <Terminal className="w-5 h-5" />}
        </button>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0, rotateY: isTerminalView ? -180 : 0 }}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1], opacity: { duration: 0.5, delay: 0.1 } }}
          className="w-full h-full relative"
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* FACE FRONTAL: PREVIEW VISUAL */}
          <div 
            className="absolute inset-0 glass-card border-orange-500/10 bg-black/40 flex flex-col overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
            style={{ backfaceVisibility: "hidden" }}
          >
            {/* Glow effect luxuoso */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-orange-500/5 blur-[120px] pointer-events-none rounded-full" />
            
            <div className="p-4 border-b border-white/5 flex items-center justify-between z-10 bg-white/5 backdrop-blur-sm pr-16">
              <div className="flex items-center gap-2 text-zinc-400">
                <Layout className="w-4 h-4 text-orange-500/50" />
                <span className="text-xs font-bold uppercase tracking-widest text-orange-500/80">Live Preview</span>
              </div>
              <div className="flex items-center gap-2 bg-black/50 px-3 py-1.5 rounded-full border border-white/5">
                <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse shadow-[0_0_8px_rgba(249,115,22,0.8)]" />
                <span className="text-xs text-zinc-400 font-mono">Aguardando instruções</span>
              </div>
            </div>

            <div className="flex-1 flex items-center justify-center relative z-10">
              <div className="text-center space-y-5">
                <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-orange-500/20 to-orange-500/5 border border-orange-500/30 flex items-center justify-center mx-auto shadow-[0_0_40px_rgba(249,115,22,0.15)] relative">
                  <div className="absolute inset-0 bg-orange-500/10 blur-xl rounded-full" />
                  <Cpu className="w-10 h-10 text-orange-500 drop-shadow-[0_0_15px_rgba(249,115,22,0.5)]" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2 tracking-tight">Preview Engine Standby</h3>
                  <p className="text-sm text-zinc-500 max-w-sm mx-auto leading-relaxed">
                    Descreva sua aplicação no chat à esquerda para iniciar o motor visual. O resultado renderizado aparecerá aqui.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* FACE TRASEIRA: TERMINAL */}
          <div 
            className="absolute inset-0 glass-card border-zinc-700/50 bg-[#09090b] flex flex-col overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
            style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
          >
            <div className="p-4 border-b border-white/5 flex items-center justify-between z-10 bg-white/5 backdrop-blur-sm pr-16">
              <div className="flex items-center gap-2 text-zinc-400">
                <Terminal className="w-4 h-4 text-zinc-500" />
                <span className="text-xs font-bold uppercase tracking-widest text-zinc-400">System Terminal</span>
              </div>
              <div className="flex items-center gap-2 bg-emerald-500/10 px-3 py-1.5 rounded-full border border-emerald-500/20">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                <span className="text-xs text-emerald-400 font-mono">Conectado</span>
              </div>
            </div>

            <div className="flex-1 relative">
              <TerminalView sessionId="forge-session" active={isTerminalView} agentId="MAESTRO" />
            </div>
          </div>

        </motion.div>
      </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
