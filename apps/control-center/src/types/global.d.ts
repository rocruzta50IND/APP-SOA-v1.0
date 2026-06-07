export {};

declare global {
  interface Window {
    electronAPI: {
      sendTerminalData: (sessionId: string, data: string) => void;
      onTerminalData: (callback: (data: string) => void) => () => void;
      startForge: (options: { category: string, theme: string, tier: number, sessionId?: string }) => void;
      onForgeEnded: (callback: (exitCode: number) => void) => () => void;
      killForge: () => void;
      getLibraryCategories: () => Promise<string[]>;
      createLibraryCategory: (name: string) => Promise<{ success: boolean, error?: string }>;
      getGalleryData: () => Promise<any[]>;
      onForgeCompleted: (callback: (code: number) => void) => () => void;
      onForgePhase: (callback: (phase: number) => void) => () => void;
      onRawTelemetry: (callback: (data: any) => void) => () => void;
      onForgeStatus: (callback: (message: string) => void) => () => void;
      onPreviewReady: (callback: () => void) => () => void;
      getActiveSessions: () => Promise<any[]>;
      getActiveSession: (sessionId?: string) => Promise<any>;
      getSessionLogs: (sessionId: string) => Promise<string>;
      getForgeStatus: () => Promise<{ isForging: boolean, phase: number, logs: string[], sessionId: string | null }>;
      deleteTemplate: (path: string) => Promise<{ success: boolean, error?: string }>;
      exportProject: (path: string) => Promise<{ success: boolean, path?: string, error?: string }>;
      onForgeUILog: (callback: (payload: any) => void) => () => void;
      onSessionStarted: (callback: (session: any) => void) => () => void;
      killSession: (sessionId: string) => void;
      startGemini: (sessionId: string) => void;
      startProduction: (options?: { command?: string }) => void;
      stopProduction: () => void;
      onProductionStatus: (callback: (payload: any) => void) => () => void;
      deployTemplate: (templatePath: string) => Promise<{ success: boolean, error?: string }>;
      getHistory: () => Promise<any[]>;
      getPaginatedHistory: (options: { page: number, limit: number }) => Promise<{ data: any[], total: number, totalPages: number, page: number, limit: number }>;
      clearHistory: () => Promise<{ success: boolean, error?: string }>;
      getDashboardKPIs: () => Promise<{ totalForges: number, successRate: number, avgDurationMs: number }>;
      getDashboardChartsData: () => Promise<{ byCategory: Record<string, number>, byTier: Record<string, { total: number, success: number, failed: number }>, byDate: Record<string, number>, qgStats: { total: number, passed: number, failed: number, avgAttempts: number, totalAttempts: number } }>;
      getAgentsList: () => Promise<any[]>;
      readMissionState: () => Promise<any>;
      readRoadmap: () => Promise<any[]>;
      getVaultTree: () => Promise<any[]>;
      readVaultFile: (filePath: string) => Promise<string>;
      startVaultWatch: () => Promise<{ success: boolean, error?: string }>;
    };
  }
}
