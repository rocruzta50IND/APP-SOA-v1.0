"use client";

import React, { useEffect, useState, useCallback } from "react";
import { 
  History, 
  Trash2, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  AlertCircle,
  PlayCircle,
  ChevronLeft,
  ChevronRight,
  Activity
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export type ForgeHistoryEntry = {
  id: string;
  startTime: string;
  endTime: string | null;
  category: string;
  theme: string;
  tier: number | string;
  status: 'running' | 'success' | 'failed' | 'error';
  durationMs: number | null;
  metrics?: {
    phase1Ms: number;
    phase2BMs: number;
    phase2C1Ms: number;
    phase2C2Ms: number;
    qualityGateMs: number;
    qualityGateAttempts: number;
    qualityGatePassed: boolean;
    phase3Ms: number;
    packagingMs: number;
    totalMs: number;
  }
};

export function HistoryList() {
  const [history, setHistory] = useState<ForgeHistoryEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 10;

  const loadHistory = useCallback(async () => {
    try {
      if (window.electronAPI && window.electronAPI.getPaginatedHistory) {
        const res = await window.electronAPI.getPaginatedHistory({ page, limit });
        setHistory(res.data || []);
        setTotalPages(res.totalPages || 1);
        setTotal(res.total || 0);
      }
    } catch (err) {
      console.error("Error loading history:", err);
    } finally {
      setLoading(false);
    }
  }, [page, limit]);

  useEffect(() => {
    loadHistory();
    // Poll for updates if any are running on current page
    const interval = setInterval(() => {
      setHistory(prev => {
        if (prev.some(h => h.status === 'running')) {
          loadHistory();
        }
        return prev;
      });
    }, 2000);
    return () => clearInterval(interval);
  }, [loadHistory]);

  const clearHistory = async () => {
    if (confirm("Tem certeza que deseja limpar todo o histórico?")) {
      try {
        if (window.electronAPI && window.electronAPI.clearHistory) {
          await window.electronAPI.clearHistory();
          setPage(1);
          loadHistory();
        }
      } catch (err) {
        console.error("Error clearing history:", err);
      }
    }
  };

  return (
    <div className="w-full flex flex-col gap-4">
      {/* Header */}
      <div className="flex justify-between items-center bg-zinc-900/50 p-6 rounded-2xl border border-white/5 backdrop-blur-md">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-orange-500/10 rounded-xl border border-orange-500/20 text-orange-500">
            <History className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight">Registro de Atividades</h2>
            <p className="text-zinc-400 text-sm">Total de {total} registros</p>
          </div>
        </div>
        <button 
          onClick={clearHistory}
          disabled={total === 0}
          className="flex items-center gap-2 px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/20 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Trash2 className="w-4 h-4" />
          <span className="text-sm font-medium">Limpar Tudo</span>
        </button>
      </div>

      {/* History List */}
      <div className="bg-zinc-900/50 rounded-2xl border border-white/5 backdrop-blur-md overflow-hidden flex flex-col">
        {loading ? (
          <div className="p-12 flex justify-center text-zinc-500">Carregando dados...</div>
        ) : history.length === 0 ? (
          <div className="p-12 flex flex-col items-center justify-center text-zinc-500 gap-2">
            <History className="w-8 h-8 opacity-50" />
            <p>Nenhum histórico encontrado.</p>
          </div>
        ) : (
          <div className="divide-y divide-white/5 flex-1 overflow-y-auto">
            <AnimatePresence mode="popLayout">
              {history.map((entry) => (
                <motion.div 
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  key={entry.id} 
                  className="px-6 py-4 flex flex-col sm:flex-row sm:items-center gap-4 hover:bg-white/[0.02] transition-colors"
                >
                  <div className="flex items-center gap-4 flex-1">
                    <div className="shrink-0">
                      {entry.status === 'success' && <div className="p-2 bg-green-500/10 rounded-full border border-green-500/20"><CheckCircle2 className="w-5 h-5 text-green-500" /></div>}
                      {entry.status === 'failed' && <div className="p-2 bg-red-500/10 rounded-full border border-red-500/20"><XCircle className="w-5 h-5 text-red-500" /></div>}
                      {entry.status === 'error' && <div className="p-2 bg-red-500/10 rounded-full border border-red-500/20"><AlertCircle className="w-5 h-5 text-red-500" /></div>}
                      {entry.status === 'running' && <div className="p-2 bg-orange-500/10 rounded-full border border-orange-500/20"><PlayCircle className="w-5 h-5 text-orange-500 animate-pulse" /></div>}
                    </div>
                    
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-white">{entry.category}</span>
                        <span className="text-zinc-500 text-sm">&bull;</span>
                        <span className="text-zinc-400 text-sm">{entry.theme}</span>
                        <span className="text-zinc-600 px-2 py-0.5 text-[10px] font-bold uppercase rounded-md bg-white/5 border border-white/10">
                          Tier {entry.tier}
                        </span>
                      </div>
                      <p className="text-xs text-zinc-500 mt-1 flex items-center gap-2">
                         {new Date(entry.startTime).toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 text-right sm:text-left text-sm text-zinc-400 pl-14 sm:pl-0">
                    {entry.metrics && (
                      <div className="flex items-center gap-2" title="Tempo de Qualidade / Tentativas">
                        <Activity className="w-4 h-4 text-purple-500" />
                        <span>{entry.metrics.qualityGatePassed ? 'Passou' : 'Falhou'} ({entry.metrics.qualityGateAttempts}x)</span>
                      </div>
                    )}
                    <div className="flex items-center gap-1.5 font-medium text-zinc-300">
                      <Clock className="w-4 h-4 text-zinc-500" />
                      {entry.durationMs ? `${(entry.durationMs / 1000).toFixed(1)}s` : '-'}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="px-6 py-4 border-t border-white/5 bg-zinc-900/80 flex items-center justify-between">
            <span className="text-sm text-zinc-500">Página {page} de {totalPages}</span>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft className="w-4 h-4 text-white" />
              </button>
              <button 
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronRight className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
