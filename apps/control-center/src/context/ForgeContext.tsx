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
  brainstormData: any;
  userAnswers: any;
  isPromptReady: boolean;
  startForge: (params: { phase: string; input?: string; answers?: any }) => void;
  setStatus: (status: ForgeStatus) => void;
  setDesignTier: (tier: number) => void;
  setBrainstormData: (data: any) => void;
  setUserAnswers: (answers: any) => void;
  setIsPromptReady: (val: boolean) => void;
}

const ForgeContext = createContext<ForgeContextType | undefined>(undefined);

export function ForgeProvider({ children }: { children: React.ReactNode }) {
  const [status, setStatus] = useState<ForgeStatus>("idle");
  const [currentStep, setCurrentStep] = useState(0);
  const [forgeStatusLogs, setForgeStatusLogs] = useState<string[]>([]);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [designTier, setDesignTier] = useState<number>(1);
  const [brainstormData, setBrainstormData] = useState<any>(null);
  const [userAnswers, setUserAnswers] = useState<any>({});
  const [isPromptReady, setIsPromptReady] = useState<boolean>(false);

  const isForging = status === "fabricating";

  const startForge = useCallback((params: { phase: string; input?: string; answers?: any }) => {
    if (status === "fabricating") return;
    
    setStatus("fabricating");
    setCurrentStep(0);
    setForgeStatusLogs([`🔥 Iniciando fase: ${params.phase}...`]);
    
    if (params.phase === 'brainstorm') {
      setBrainstormData(null);
      setIsPromptReady(false);
    }
    
    if (window.electronAPI) {
      window.electronAPI.startForge(params);
    }
  }, [status]);

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
      setTimeout(() => {
        setStatus("completed");
        if (typeof window.electronAPI.getGalleryData === 'function') {
          window.electronAPI.getGalleryData();
        }
      }, 2000);
    });

    // Novos interceptadores de fase
    let unsubscribeBrainstorm: any;
    if ((window.electronAPI as any).onForgeBrainstormCompleted) {
      unsubscribeBrainstorm = (window.electronAPI as any).onForgeBrainstormCompleted((payload: any) => {
        if (payload.code === 0 && payload.json) {
          try {
            const data = JSON.parse(payload.json);
            if (data && data.questions && data.questions.length > 0) {
              setBrainstormData(data);
            } else {
              console.error("JSON data missing 'questions' property", data);
              setBrainstormData(null);
            }
          } catch(e) {
            console.error("Failed to parse Brainstorm JSON", e);
            setBrainstormData(null);
          }
        } else {
          console.error("Brainstorm failed", payload);
          setBrainstormData(null);
        }
        setStatus("idle");
      });
    }

    let unsubscribePrompt: any;
    if ((window.electronAPI as any).onForgePromptReady) {
      unsubscribePrompt = (window.electronAPI as any).onForgePromptReady((payload: any) => {
        setIsPromptReady(true);
        setStatus("idle");
      });
    }

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
      if (unsubscribeBrainstorm) unsubscribeBrainstorm();
      if (unsubscribePrompt) unsubscribePrompt();
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
      brainstormData,
      userAnswers,
      isPromptReady,
      startForge,
      setStatus,
      setDesignTier,
      setBrainstormData,
      setUserAnswers,
      setIsPromptReady
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
