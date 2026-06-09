import React from "react";
import { Video } from "lucide-react";

export default function StudioPage() {
  return (
    <div className="flex-1 p-8 overflow-y-auto">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-purple-500/10 rounded-lg border border-purple-500/20">
              <Video className="w-6 h-6 text-purple-500" />
            </div>
            <h1 className="text-3xl font-bold text-white tracking-tight">Estúdio de Vídeo</h1>
          </div>
          <p className="text-zinc-400">Geração e gerenciamento de assets de vídeo.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-purple-500/30 transition-colors group">
            <h2 className="text-lg font-medium text-zinc-200 group-hover:text-purple-400 transition-colors mb-2">Nova Renderização</h2>
            <p className="text-sm text-zinc-500">Inicie um novo processo de renderização com base nos templates de animação.</p>
          </div>
          
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-purple-500/30 transition-colors group">
            <h2 className="text-lg font-medium text-zinc-200 group-hover:text-purple-400 transition-colors mb-2">Biblioteca de Assets</h2>
            <p className="text-sm text-zinc-500">Navegue pelos vídeos e animações geradas anteriormente.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
