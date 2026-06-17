"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

type ForgeStatus = "idle" | "fabricating" | "completed";

interface ForgeContextType {
  status: ForgeStatus;
  currentStep: number;
  forgeStatusLogs: string[];
  isForging: boolean;
  sessionId: string | null;
  designTier: number;
  startForge: (params: { category: string; theme: string; tier: number }) => void;
  setStatus: (status: ForgeStatus) => void;
  setDesignTier: (tier: number) => void;
}

const ForgeContext = createContext<ForgeContextType | undefined>(undefined);

export function ForgeProvider({ children }: { children: React.ReactNode }) {
  const [status, setStatus] = useState<ForgeStatus>("idle");
  const [currentStep, setCurrentStep] = useState(0);
  const [forgeStatusLogs, setForgeStatusLogs] = useState<string[]>([]);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [designTier, setDesignTier] = useState<number>(1);

  const isForging = status === "fabricating";

  const startForge = useCallback((params: { category: string; theme: string; tier: number }) => {
    if (status === "fabricating") return;
    
    setStatus("fabricating");
    setCurrentStep(0);
    setForgeStatusLogs(["🔥 Soprando o fole e aquecendo o metal..."]);
    
    if (window.electronAPI) {
      window.electronAPI.startForge(params);
    }
  }, [status, designTier]);

  useEffect(() => {
    if (!window.electronAPI) return;

    // Listeners Globais (Vivos enquanto o app estiver aberto)
    const unsubscribeUILog = (window.electronAPI as any).onForgeUILog((payload: any) => {
      // Blindagem agressiva
      const text = typeof payload === 'string' ? payload : (payload?.message || payload?.data || (payload ? JSON.stringify(payload) : ''));
      const message = String(text || '');
      
      if (!message.trim()) return;

      setForgeStatusLogs(prev => {
        const next = [...prev, message];
        return next.slice(-100); // Reduzido para 100 para evitar flood no DOM
      });
    });

    const unsubscribePhase = (window.electronAPI as any).onForgePhase((payload: any) => {
      let phase = payload;
      if (payload && typeof payload === 'object') {
        phase = payload.phase;
      }
      
      const phaseNum = Number(phase);
      if (!isNaN(phaseNum) && phaseNum >= 0) {
        setCurrentStep(phaseNum);
      }
    });

    const unsubscribeEnded = window.electronAPI.onForgeEnded((code) => {
      setForgeStatusLogs(prev => [...prev, `--- FORJA FINALIZADA (CÓDIGO ${code}) ---`]);
      if (code === 0) {
        setStatus("completed");
      }
      // UI não reverte para "idle" em caso de erro para manter os logs visíveis
    });

    const unsubscribeCompleted = window.electronAPI.onForgeCompleted((code: any) => {
      if (code !== 0) return;

      // Pequeno delay para permitir feedback visual antes de fechar o modal
      setTimeout(() => {
        setStatus("completed");
        // Forçar refresh da galeria se disponível
        if (typeof window.electronAPI.getGalleryData === 'function') {
          window.electronAPI.getGalleryData();
        }
      }, 2000);
    });

    // Restaurar estado ao iniciar o app
    const init = async () => {
      if (typeof window.electronAPI.getForgeStatus === 'function') {
        const statusData = await window.electronAPI.getForgeStatus();
        if (statusData.isForging) {
          setStatus("fabricating");
          setCurrentStep(statusData.phase);
          setSessionId(statusData.sessionId);
          if (statusData.logs && statusData.logs.length > 0) {
            setForgeStatusLogs(statusData.logs);
          }
        }
      }
    };
    init();

    return () => {
      unsubscribeUILog();
      unsubscribePhase();
      unsubscribeEnded();
      unsubscribeCompleted();
    };
  }, []);

  return (
    <ForgeContext.Provider value={{ 
      status, 
      currentStep, 
      forgeStatusLogs, 
      isForging, 
      sessionId,
      designTier,
      startForge,
      setStatus,
      setDesignTier
    }}>
      {children}
    </ForgeContext.Provider>
  );
}

export function useForge() {
  const context = useContext(ForgeContext);
  if (context === undefined) {
    throw new Error('useForge must be used within a ForgeProvider');
  }
  return context;
}
