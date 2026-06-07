"use client";

import React, { ErrorInfo } from "react";
import { AlertTriangle } from "lucide-react";

export class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean, error: Error | null }> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error: Error) { return { hasError: true, error }; }
  componentDidCatch(error: Error, errorInfo: ErrorInfo) { console.error("ErrorBoundary", error, errorInfo); }
  
  copyError = () => {
    if (this.state.error) {
      const errorText = `Error: ${this.state.error.message}\nStack: ${this.state.error.stack}`;
      navigator.clipboard.writeText(errorText);
      alert("Erro copiado para a área de transferência!");
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex h-full min-h-screen items-center justify-center bg-zinc-950 text-white p-4">
          <div className="glass-card max-w-md w-full p-6 flex flex-col items-center gap-4 border-red-500/20 text-center">
            <AlertTriangle className="w-12 h-12 text-red-500" />
            <h2 className="text-lg font-bold">Falha Crítica na UI</h2>
            <p className="text-sm text-zinc-400">{this.state.error?.message}</p>
            <div className="flex gap-2 mt-4">
              <button onClick={() => window.location.reload()} className="px-6 py-2 bg-white text-black text-xs font-bold rounded-lg hover:bg-zinc-200 uppercase">RECARREGAR</button>
              <button onClick={this.copyError} className="px-6 py-2 bg-zinc-800 text-white text-xs font-bold rounded-lg hover:bg-zinc-700 uppercase">COPIAR ERRO</button>
            </div>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}