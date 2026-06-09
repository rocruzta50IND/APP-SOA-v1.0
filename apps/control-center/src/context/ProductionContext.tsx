"use client";

import React, { createContext, useContext, useState, useEffect, useRef, ReactNode } from 'react';

type ViewMode = 'chat' | 'terminal';

interface ProductionContextData {
  deployPhase: 'idle' | 'selecting' | 'initializing';
  setDeployPhase: React.Dispatch<React.SetStateAction<'idle' | 'selecting' | 'initializing'>>;
  viewMode: ViewMode;
  setViewMode: React.Dispatch<React.SetStateAction<ViewMode>>;
  inputValue: string;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  isProductionRunning: boolean;
  setIsProductionRunning: React.Dispatch<React.SetStateAction<boolean>>;
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  templates: any[];
  isLoadingTemplates: boolean;
  activeTemplate: any | null;
  logs: string[];
  isPreviewReady: boolean;
  isWarmingUp: boolean;
  isPaused: boolean;
  pauseMessage: string;
  automationState: 'running' | 'pause-requested' | 'awaiting-input';
  setAutomationState: React.Dispatch<React.SetStateAction<'running' | 'pause-requested' | 'awaiting-input'>>;
  journeyMode: 'mvp' | 'freeform' | null;
  setJourneyMode: React.Dispatch<React.SetStateAction<'mvp' | 'freeform' | null>>;
  
  loadTemplates: () => Promise<void>;
  handleDeployTemplate: (tpl: any) => Promise<void>;
  handleStartProduction: (cmd?: string) => void;
  handleStopProduction: () => void;
  handleReset: () => void;
  pollForReady: () => void;
  resumeProduction: () => void;
  requestProductionPause: () => void;
  resumeProductionAuto: () => void;
}

const ProductionContext = createContext<ProductionContextData | undefined>(undefined);

export function ProductionProvider({ children }: { children: ReactNode }) {
  const [deployPhase, setDeployPhase] = useState<'idle' | 'selecting' | 'initializing'>('idle');
  const [viewMode, setViewMode] = useState<ViewMode>('chat');
  const [inputValue, setInputValue] = useState("");
  const [isProductionRunning, setIsProductionRunning] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [templates, setTemplates] = useState<any[]>([]);
  const [isLoadingTemplates, setIsLoadingTemplates] = useState(false);
  const [activeTemplate, setActiveTemplate] = useState<any | null>(null);

  // Production Tracking States
  const [logs, setLogs] = useState<string[]>([]);
  const [isPreviewReady, setIsPreviewReady] = useState(false);
  const [isWarmingUp, setIsWarmingUp] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [pauseMessage, setPauseMessage] = useState("");
  const [automationState, setAutomationState] = useState<'running' | 'pause-requested' | 'awaiting-input'>('running');
  const [journeyMode, setJourneyMode] = useState<'mvp' | 'freeform' | null>(null);

  const isMounted = useRef(true);
  useEffect(() => {
    return () => { isMounted.current = false; };
  }, []);

  const pollForReady = async () => {
    if (!isMounted.current) return;
    try {
      await fetch('http://127.0.0.1:3001', { mode: 'no-cors', cache: 'no-store' });
      if (!isMounted.current) return;
      setIsWarmingUp(false);
      setIsPreviewReady(true);
      setAutomationState('awaiting-input');
    } catch (e) {
      if (!isMounted.current) return;
      console.warn("Localhost fetch falhou, dependendo do sinal IPC para destravar a UI.");
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined' && window.electronAPI) {
      // Hydration
      const init = async () => {
        try {
          const status = await window.electronAPI.getProductionStatus();
          if (status.isProductionRunning) {
            setIsProductionRunning(true);
            setDeployPhase('idle');
            setIsModalOpen(false);
            setViewMode('terminal');
            setLogs(status.productionLogs || []);
            setAutomationState(status.automationState || 'running');
            setIsPaused(status.isPaused || false);
            setPauseMessage(status.pauseMessage || "");
            setActiveTemplate(status.currentTemplate || null);
            
            // Re-check preview readiness
            setIsWarmingUp(true);
            pollForReady();
          }
        } catch (e) {
          console.error("Failed to hydrate production status:", e);
        }
      };
      init();

      let unsubscribeStatus: (() => void) | undefined;
      if (window.electronAPI.onProductionStatus) {
        unsubscribeStatus = window.electronAPI.onProductionStatus((payload: any) => {
          if (payload.status === 'started') {
            setIsProductionRunning(true);
            setDeployPhase('idle');
            setIsModalOpen(false);
            setViewMode('terminal');
            setLogs([]);
            setIsPreviewReady(false);
            setIsWarmingUp(false);
            setIsPaused(false);
            setAutomationState('running');
          }
          if (payload.status === 'ended' || payload.status === 'stopped') {
            setIsProductionRunning(false);
          }
        });
      }

      let unsubscribeEvent: (() => void) | undefined;
      if (window.electronAPI.onProductionEvent) {
        unsubscribeEvent = window.electronAPI.onProductionEvent((payload: any) => {
          if (payload.type === 'log') {
            setLogs(prev => [...prev, payload.message]);
          } else if (payload.type === 'status' && payload.message === 'awaiting-manual-input') {
            setAutomationState('awaiting-input');
            setIsWarmingUp(false);
            setIsPreviewReady(true);
          } else if (payload.type === 'pause') {
            setIsPaused(true);
            setPauseMessage(payload.message || 'Aguardando confirmação para continuar.');
          } else if (payload.type === 'ready') {
            setIsWarmingUp(true);
            pollForReady();
          } else if (payload.type === 'setup') {
            setActiveTemplate(payload.payload.template);
          }
        });
      }

      let unsubscribePreview: (() => void) | undefined;
      if (window.electronAPI.onPreviewReady) {
         unsubscribePreview = window.electronAPI.onPreviewReady(() => {
           setTimeout(() => {
             setIsPreviewReady(true);
             setAutomationState('awaiting-input');
           }, 1000);
         });
      }

      return () => {
        if (unsubscribeStatus) unsubscribeStatus();
        if (unsubscribeEvent) unsubscribeEvent();
        if (unsubscribePreview) unsubscribePreview();
      };
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

  const handleDeployTemplate = async (tpl: any) => {
    if (window.electronAPI) {
      setActiveTemplate(tpl);
      setDeployPhase('initializing');
      await window.electronAPI.deployTemplate(tpl.path);
    }
  };

  const handleStartProduction = (cmd?: string) => {
    const finalCmd = cmd !== undefined ? cmd : inputValue;
    if (!finalCmd.trim() && viewMode === 'chat') return;

    if (window.electronAPI) {
      if (isProductionRunning && automationState === 'awaiting-input') {
        window.electronAPI.sendManualProductionCommand(finalCmd);
        if (cmd === undefined) setInputValue("");
        setAutomationState('running');
      } else if (!isProductionRunning) {
        window.electronAPI.startProduction({ command: finalCmd });
        setViewMode('terminal');
      }
    }
  };

  const handleStopProduction = () => {
    if (window.electronAPI) {
      window.electronAPI.stopProduction();
      setIsProductionRunning(false);
      setJourneyMode(null);
    }
  };

  const handleReset = () => {
    if (window.electronAPI && isProductionRunning) {
      window.electronAPI.stopProduction();
    }
    setIsProductionRunning(false);
    setIsPreviewReady(false);
    setIsWarmingUp(false);
    setIsPaused(false);
    setPauseMessage("");
    setDeployPhase('idle');
    setAutomationState('running');
    setLogs([]);
    setActiveTemplate(null);
    setInputValue("");
    setJourneyMode(null);
    // setViewMode('chat'); Removido para manter a estabilidade do layout (Layout Lock)
  };

  const resumeProduction = () => {
    if (window.electronAPI) {
      window.electronAPI.resumeProduction();
      setIsPaused(false);
    }
  };

  const requestProductionPause = () => {
    if (window.electronAPI) {
      window.electronAPI.requestProductionPause();
      setAutomationState('pause-requested');
    }
  };

  const resumeProductionAuto = () => {
    if (window.electronAPI) {
      window.electronAPI.resumeProductionAuto();
      setAutomationState('running');
    }
  };

  return (
    <ProductionContext.Provider
      value={{
        deployPhase, setDeployPhase,
        viewMode, setViewMode,
        inputValue, setInputValue,
        isProductionRunning, setIsProductionRunning,
        isModalOpen, setIsModalOpen,
        templates, isLoadingTemplates, activeTemplate,
        logs, isPreviewReady, isWarmingUp, isPaused, pauseMessage,
        automationState, setAutomationState,
        journeyMode, setJourneyMode,
        loadTemplates, handleDeployTemplate, handleStartProduction,
        handleStopProduction, handleReset, pollForReady,
        resumeProduction, requestProductionPause, resumeProductionAuto
      }}
    >
      {children}
    </ProductionContext.Provider>
  );
}

export function useProduction() {
  const context = useContext(ProductionContext);
  if (context === undefined) {
    throw new Error('useProduction must be used within a ProductionProvider');
  }
  return context;
}
