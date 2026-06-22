"use client";

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Box, Layers, Ghost, PanelLeftClose, PanelLeft, Shield, Crown, Diamond, Zap, Star } from 'lucide-react';

interface LayoutMeta {
  name?: string;
  description?: string;
}

export interface LayoutItem {
  tier: string;
  theme: string;
  id: string;
  meta: LayoutMeta;
}

interface LayoutSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (layout: LayoutItem) => void;
}

const TierIcons: Record<string, React.ElementType> = {
  'tier-1': Shield,
  'tier-2': Crown,
  'tier-3': Diamond,
  'tier-4': Zap,
  'tier-5': Star,
};

export function LayoutSelectorModal({ isOpen, onClose, onSelect }: LayoutSelectorModalProps) {
  const [layouts, setLayouts] = useState<LayoutItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTier, setSelectedTier] = useState<string>('');
  const [selectedTheme, setSelectedTheme] = useState<string>('Dark');
  const [tiers, setTiers] = useState<string[]>([]);
  const [themes, setThemes] = useState<string[]>([]);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [activeSelectionId, setActiveSelectionId] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setLoading(true);
      const fetchLayouts = async () => {
        try {
          const data = await window.electronAPI.getAvailableLayouts();
          setLayouts(data);
          
          setTiers(['Tier 1', 'Tier 2', 'Tier 3', 'Tier 4', 'Tier 5']);
          setThemes(['Dark', 'Light', 'Duo']);
          
          if (!selectedTier) {
            setSelectedTier('Tier 1');
          }
          if (!selectedTheme) {
             setSelectedTheme('Dark');
          }
        } catch (err) {
          console.error("Failed to load layouts", err);
        } finally {
          setLoading(false);
        }
      };
      
      fetchLayouts();
    }
  }, [isOpen]);

  const filteredLayouts = layouts.filter(l => l.tier === selectedTier && l.theme === selectedTheme);

  return (
    <AnimatePresence>
      {isOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-2xl"
          onClick={onClose} 
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()} 
            className="relative flex flex-row bg-[#09090b] border border-white/10 shadow-[0_0_100px_rgba(0,0,0,1)] rounded-3xl overflow-hidden w-[80vw] h-[80vh]"
          >
            <button 
              onClick={onClose} 
              className="absolute top-4 right-4 p-2 text-zinc-500 hover:text-white bg-zinc-900/50 hover:bg-zinc-800 rounded-full transition-colors z-50 border border-white/5"
            >
              <X size={16} />
            </button>

            {/* Sidebar (Tiers) */}
            <motion.div 
              animate={{ width: isSidebarCollapsed ? 80 : 256 }} 
              className="flex flex-col shrink-0 border-r border-white/5 bg-zinc-900/10 overflow-hidden"
            >
              <div className={`flex items-center h-16 p-4 border-b border-white/5 ${isSidebarCollapsed ? 'justify-center' : 'justify-between'}`}>
                {!isSidebarCollapsed && (
                  <h2 className="text-[11px] font-semibold text-zinc-500 uppercase tracking-[0.2em] whitespace-nowrap">Layouts</h2>
                )}
                <button 
                  onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)} 
                  className="p-1.5 text-zinc-500 hover:text-white hover:bg-white/5 rounded-lg transition-colors shrink-0"
                >
                  {isSidebarCollapsed ? <PanelLeft size={18} /> : <PanelLeftClose size={18} />}
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-2 flex flex-col gap-2 mt-4">
                {tiers.map(tier => {
                  const Icon = TierIcons[tier] || Box;
                  const isActive = selectedTier === tier;
                  const isLocked = tier === 'Tier 4' || tier === 'Tier 5';
                  return (
                    <button
                      key={tier}
                      onClick={() => !isLocked && setSelectedTier(tier)}
                      disabled={isLocked}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                        isLocked 
                          ? 'opacity-40 cursor-not-allowed bg-transparent' 
                          : isActive 
                            ? 'bg-white text-black shadow-sm' 
                            : 'text-zinc-400 hover:text-zinc-200 hover:bg-white/5'
                      } ${isSidebarCollapsed ? 'justify-center' : ''}`}
                      title={isSidebarCollapsed ? tier : undefined} 
                    >
                      <Icon size={18} className={isActive && !isLocked ? 'text-black' : 'text-zinc-500'} />
                      {!isSidebarCollapsed && (
                        <div className="flex items-center gap-2">
                          <span className="whitespace-nowrap tracking-wide">{tier}</span>
                          {isLocked && (
                            <span className="text-[9px] font-bold uppercase tracking-wider text-amber-500 bg-amber-500/10 px-1.5 py-0.5 rounded">Coming soon</span>
                          )}
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </motion.div>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col overflow-hidden bg-[#09090b]">
              {/* Theme Tabs */}
              <div className="px-8 pt-6 pb-6 flex gap-2">
                <div className="bg-zinc-900/50 p-1 rounded-full border border-white/5 inline-flex">
                  {themes.map(theme => (
                    <button
                      key={theme}
                      onClick={() => setSelectedTheme(theme)}
                      className={`transition-colors ${
                        selectedTheme === theme
                          ? 'bg-zinc-800 text-white shadow-md rounded-full px-5 py-1.5 text-sm font-medium'
                          : 'text-zinc-500 hover:text-zinc-300 px-5 py-1.5 text-sm font-medium'
                      }`}
                    >
                      {theme}
                    </button>
                  ))}
                </div>
              </div>

              {/* Grid */}
              <div className="flex-1 overflow-y-auto px-8 pb-8 pt-2">
                {loading ? (
                  <div className="flex items-center justify-center h-full">
                    <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                  </div>
                ) : filteredLayouts.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-zinc-500 space-y-4">
                    <div className="p-4 rounded-full bg-zinc-900/50 border border-white/5">
                       <Ghost className="w-8 h-8 text-zinc-600 stroke-[1.5]" />
                    </div>
                    <div className="text-center">
                      <h3 className="text-zinc-300 font-medium text-sm">Nenhum Layout Disponível</h3>
                      <p className="text-zinc-600 text-xs mt-1 max-w-xs">Não encontramos templates para a combinação de {selectedTier} e {selectedTheme}.</p>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredLayouts.map((layout) => (
                      <motion.div
                        key={layout.id}
                        onClick={() => {
                          setActiveSelectionId(layout.id);
                          setTimeout(() => {
                            onSelect(layout);
                            onClose();
                            setActiveSelectionId(null);
                          }, 400); // 400ms delay para o usuário curtir o feedback tátil
                        }}
                        className={`group relative flex flex-col rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 ${
                          activeSelectionId === layout.id 
                            ? 'border-white/80 ring-2 ring-white shadow-[0_0_30px_rgba(255,255,255,0.3)] scale-[0.98] z-10' 
                            : 'border border-white/5 hover:border-white/20 hover:shadow-[0_8px_30px_rgba(255,255,255,0.04)] hover:-translate-y-1 bg-zinc-950'
                        }`}
                      >
                        {/* Thumbnail Iframe */}
                        <div className="relative h-48 w-full bg-[#0a0a0c] overflow-hidden border-b border-white/5">
                          <iframe
                            // IMPORTANTE: Uso do protocolo customizado forge:// liberado no Electron
                            src={`forge://.templates/forge/layouts/${layout.tier}/${layout.theme}/${layout.id}/out/index.html`}
                            className="absolute top-0 left-0 w-[400%] h-[400%] origin-top-left scale-[0.25] pointer-events-none border-none bg-white transition-opacity duration-300"
                            tabIndex={-1}
                            title={`Preview de ${layout.meta?.name}`}
                          />
                          
                          {/* Overlay Gradiente para proteger estética */}
                          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-transparent to-zinc-900/10 pointer-events-none" />
                          
                          {/* Ícone de feedback se selecionado (Opcional) */}
                          {activeSelectionId === layout.id && (
                            <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm">
                              <div className="w-10 h-10 rounded-full border-2 border-t-white border-r-white border-b-transparent border-l-transparent animate-spin" />
                            </div>
                          )}
                        </div>
                        
                        {/* Footer do Card */}
                        <div className="p-5 flex flex-col gap-2 relative z-10 bg-zinc-950">
                          <h4 className={`font-semibold tracking-tight text-base transition-colors ${activeSelectionId === layout.id ? 'text-white' : 'text-zinc-100 group-hover:text-white'}`}>
                            {layout.meta?.name || layout.id}
                          </h4>
                          <p className="text-zinc-500 text-xs leading-relaxed line-clamp-2">
                            {layout.meta?.description || 'Estrutura otimizada e responsiva pronta para fabricação de interface.'}
                          </p>
                          {layout.meta?.features && layout.meta.features.length > 0 && (
                            <div className="flex flex-wrap gap-1.5 mt-2">
                              {layout.meta.features.slice(0, 3).map((feature: string, idx: number) => (
                                <span key={idx} className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-white/10 text-zinc-300 border border-white/5">
                                  {feature}
                                </span>
                              ))}
                              {layout.meta.features.length > 3 && (
                                <span className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-white/5 text-zinc-500">
                                  +{layout.meta.features.length - 3}
                                </span>
                              )}
                            </div>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
