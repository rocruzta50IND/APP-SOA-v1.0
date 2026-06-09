import { useState, useEffect } from 'react';

export function useTelemetryIpc(sessionId: string | null) {
  const [activeSessions, setActiveSessions] = useState<string[]>(['MAESTRO']);

  useEffect(() => {
    if (!window.electronAPI) return;
    
    const unsubscribe = window.electronAPI.onRawTelemetry((payload: any) => {
      if (payload && typeof payload === 'object' && payload.agentId) {
        const agentId = payload.agentId;
        setActiveSessions(prev => {
           if (agentId && !prev.includes(agentId)) {
             return [...prev, agentId];
           }
           return prev;
        });
      }
    });

    const syncAgents = async () => {
      if (!sessionId) return;
      try {
        const session = await (window.electronAPI as any).getActiveSession(sessionId);
        if (session && session.logBuffers) {
          const discovered = Object.keys(session.logBuffers);
          setActiveSessions(prev => {
            const next = new Set([...prev, ...discovered, 'MAESTRO']);
            return Array.from(next);
          });
        }
      } catch (e) {}
    };
    syncAgents();

    return () => unsubscribe();
  }, [sessionId]);

  return { activeSessions, setActiveSessions };
}
