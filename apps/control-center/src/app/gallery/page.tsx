"use client";

import React, { useEffect, useState, useMemo } from "react";
import { 
  Layout, 
  Search, 
  Filter, 
  Loader2, 
  Calendar, 
  Folder, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Moon, 
  Sun,
  Eye,
  Download,
  ExternalLink
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

type Template = {
  id: string;
  name: string;
  description: string;
  tier: number;
  category: string;
  theme: string;
  createdAt: string;
  images: string[];
  relativePath: string;
};

const TIER_CONFIG: Record<number, any> = {
  1: { name: "Standard", color: "text-emerald-500", bg: "bg-emerald-500/10", border: "border-emerald-500/20" },
  2: { name: "Premium", color: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/30" },
  3: { name: "Boutique", color: "text-purple-400", bg: "bg-purple-500/20", border: "border-purple-500/40" },
  4: { name: "Cyber-Boutique", color: "text-cyan-400", bg: "bg-cyan-500/20", border: "border-cyan-500/40" },
  5: { name: "Spatial", color: "text-rose-400", bg: "bg-rose-500/20", border: "border-rose-500/40" },
};

export default function GalleryPage() {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [currentTheme, setCurrentTheme] = useState<"dark" | "light">("dark");
  const [currentRoute, setCurrentRoute] = useState<string>("");

  useEffect(() => {
    if (window.electronAPI && typeof window.electronAPI.getGalleryData === 'function') {
      window.electronAPI.getGalleryData()
        .then(data => {
          // IPC returns array directly
          const templatesList = Array.isArray(data) ? data : [];
          setTemplates(templatesList);
          setLoading(false);
        })
        .catch((err) => {
          console.error("IPC Gallery Error:", err);
          setLoading(false);
        });
    }
  }, []);

  const filtered = templates.filter(t => 
    t.name.toLowerCase().includes(search.toLowerCase()) || 
    t.category.toLowerCase().includes(search.toLowerCase())
  );

  const availableRoutes = useMemo(() => {
    if (!selectedTemplate || !selectedTemplate.images) return [];
    const routes = new Set<string>();
    selectedTemplate.images.forEach(img => {
      if (typeof img !== 'string') return;
      const clean = img
        .replace(/-(dark|light)\.(webp|png|jpg|jpeg)$/i, '')
        .replace(/\.(webp|png|jpg|jpeg)$/i, '');
      routes.add(clean);
    });
    return Array.from(routes).sort();
  }, [selectedTemplate]);

  useEffect(() => {
    if (availableRoutes.length > 0) {
      setCurrentRoute(availableRoutes[0]);
    }
  }, [availableRoutes]);

  const getImageUrl = (template: Template, imageName: string) => {
    if (window.electronAPI) {
      // Use the forge protocol for local access in Electron
      // The template object in IPC already contains the relative path
      return `forge://${template.relativePath}/preview/${imageName}`;
    }
    return `/api/gallery/image?path=${encodeURIComponent(template.relativePath)}&image=${encodeURIComponent(imageName)}`;
  };

  const currentImage = useMemo(() => {
    if (!selectedTemplate || !currentRoute) return null;
    const target = `${currentRoute}-${currentTheme}`;
    let found = selectedTemplate.images.find(img => img.startsWith(target));
    if (!found) found = selectedTemplate.images.find(img => img.startsWith(currentRoute));
    return found ? getImageUrl(selectedTemplate, found) : null;
  }, [selectedTemplate, currentRoute, currentTheme]);

  const handleDelete = async (template: Template) => {
    if (!window.confirm(`Tem certeza que deseja excluir o template "${template.name}"?`)) return;

    // Optimistic UI: Remove from view immediately
    const previousTemplates = [...templates];
    setTemplates(prev => prev.filter(t => t.id !== template.id));
    setSelectedTemplate(null);

    try {
      if (window.electronAPI && typeof window.electronAPI.deleteTemplate === 'function') {
        // Fire-and-forget deletion, await in background
        window.electronAPI.deleteTemplate(template.relativePath).then((result: any) => {
          if (!result.success) {
            alert("Erro ao excluir: " + result.error);
            setTemplates(previousTemplates); // Rollback
          }
        });
      } else {
        alert("Função de exclusão apenas disponível via Electron.");
        setTemplates(previousTemplates); // Rollback
      }
    } catch (error) {
      console.error("Delete error:", error);
      alert("Falha crítica ao excluir template.");
      setTemplates(previousTemplates); // Rollback
    }
  };

  const handleExport = async (template: Template) => {
    try {
      if (window.electronAPI && typeof window.electronAPI.exportProject === 'function') {
        const result = await window.electronAPI.exportProject(template.relativePath);
        if (result.success) {
          alert(`Projeto "${template.name}" exportado com sucesso para:\n${result.path}`);
        } else if (result.error !== 'Cancelado pelo usuário') {
          alert("Erro ao exportar: " + result.error);
        }
      } else {
        alert("Função de exportação apenas disponível via Electron.");
      }
    } catch (error) {
      console.error("Export error:", error);
      alert("Falha crítica ao exportar projeto.");
    }
  };

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Galeria de Templates</h1>
          <p className="text-zinc-500 text-sm mt-1">
            {templates.length} projetos identificados na sua biblioteca local.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
            <input 
              type="text" 
              placeholder="Buscar templates..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-white/20 w-64"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-sm hover:bg-white/10 transition-all">
            <Filter className="w-4 h-4" />
            <span>Filtros</span>
          </button>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0.5 }} 
              animate={{ opacity: 1 }} 
              transition={{ repeat: Infinity, duration: 1, repeatType: "reverse" }}
              className="glass-card rounded-t-xl h-[300px] flex flex-col bg-white/5 border border-white/5 overflow-hidden shadow-[0_0_15px_rgba(0,0,0,0.2)]"
            >
              <div className="aspect-video bg-zinc-900/50 relative overflow-hidden">
                <motion.div 
                  animate={{ x: ["-100%", "100%"] }} 
                  transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent w-1/2"
                />
              </div>
              <div className="p-4 space-y-3 flex-1 flex flex-col justify-end">
                <div className="h-4 bg-zinc-800/80 rounded w-3/4" />
                <div className="h-3 bg-zinc-800/80 rounded w-1/2" />
                <div className="h-8 bg-zinc-800/80 rounded w-full mt-2" />
              </div>
            </motion.div>
          ))}
        </div>
      ) : filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((t) => {
            const tier = TIER_CONFIG[t.tier] || TIER_CONFIG[1];
            const images = t.images || [];
            const cover = images.find(img => img.includes("landing") && img.includes("dark")) || images[0];
            
            return (
              <div 
                key={t.id} 
                onClick={() => setSelectedTemplate(t)}
                className="glass-card group cursor-pointer hover:border-white/20 transition-all"
              >
                <div className="aspect-video bg-zinc-900 relative overflow-hidden flex flex-col rounded-t-xl group/browser">
                  {/* Fake Browser Top Bar */}
                  <div className="h-5 bg-zinc-800/80 border-b border-white/5 flex items-center px-2 gap-1.5 shrink-0 z-10">
                    <div className="w-1.5 h-1.5 rounded-full bg-zinc-600 group-hover/browser:bg-red-500/50 transition-colors" />
                    <div className="w-1.5 h-1.5 rounded-full bg-zinc-600 group-hover/browser:bg-yellow-500/50 transition-colors" />
                    <div className="w-1.5 h-1.5 rounded-full bg-zinc-600 group-hover/browser:bg-green-500/50 transition-colors" />
                  </div>
                  <div className="relative flex-1 overflow-hidden bg-black/50">
                    {cover ? (
                      <div className="absolute w-full top-0 transition-transform duration-[3000ms] ease-out group-hover/browser:-translate-y-1/4">
                        <img 
                          src={getImageUrl(t, cover)} 
                          alt={t.name}
                          className="w-full h-auto block"
                        />
                      </div>
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-zinc-800 to-black flex items-center justify-center">
                        <Layout className="w-12 h-12 text-zinc-800" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all flex items-end p-4 pointer-events-none">
                      <span className="w-full py-2 bg-white text-black rounded-lg text-[10px] font-bold uppercase tracking-widest text-center shadow-xl">
                        Inspecionar Template
                      </span>
                    </div>
                  </div>
                  <div className="absolute top-7 right-3 flex gap-2 z-10">
                    <span className="text-[9px] px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-zinc-300 border border-white/10 font-bold uppercase tracking-tighter">
                      {t.theme}
                    </span>
                  </div>
                </div>
                <div className="p-4 space-y-3">
                  <div>
                    <h3 className="text-sm font-bold truncate group-hover:text-emerald-400 transition-colors">{t.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <Folder className="w-3 h-3 text-zinc-600" />
                      <p className="text-[10px] text-zinc-500 uppercase font-medium">{t.category}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-white/5">
                    <div className="flex items-center gap-1.5 text-zinc-600">
                      <Calendar className="w-3 h-3" />
                      <span className="text-[9px] font-medium uppercase">{new Date(t.createdAt).toLocaleDateString()}</span>
                    </div>
                    <span className={cn("text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full border", tier.bg, tier.color, tier.border)}>
                      Tier {t.tier}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 gap-4 text-center">
          <div className="w-16 h-16 rounded-2xl bg-white/5 border border-dashed border-white/10 flex items-center justify-center mb-2">
            <Layout className="w-6 h-6 text-zinc-700" />
          </div>
          <h3 className="text-zinc-400 font-medium">Nenhum template encontrado</h3>
        </div>
      )}

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedTemplate && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedTemplate(null)}
              className="absolute inset-0 bg-black/90 backdrop-blur-sm"
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-6xl h-full max-h-[90vh] bg-zinc-950 border border-white/10 rounded-3xl overflow-hidden flex flex-col shadow-[0_0_50px_rgba(0,0,0,0.5)]"
            >
              {/* Modal Header */}
              <div className="h-20 border-b border-white/5 flex items-center justify-between px-8 shrink-0 bg-zinc-900/50">
                <div className="flex items-center gap-4">
                  <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                    <Layout className="w-6 h-6 text-emerald-400" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold flex items-center gap-3">
                      {selectedTemplate.name}
                      <span className={cn(
                        "text-[9px] px-2 py-0.5 rounded-full border uppercase tracking-widest",
                        TIER_CONFIG[selectedTemplate.tier].bg,
                        TIER_CONFIG[selectedTemplate.tier].color,
                        TIER_CONFIG[selectedTemplate.tier].border
                      )}>
                        Tier {selectedTemplate.tier} - {TIER_CONFIG[selectedTemplate.tier].name}
                      </span>
                    </h2>
                    <p className="text-xs text-zinc-500 uppercase font-bold tracking-widest mt-0.5">
                      {selectedTemplate.category} / {selectedTemplate.theme}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => selectedTemplate && handleDelete(selectedTemplate)}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-bold hover:bg-red-500 hover:text-white transition-all"
                  >
                    <X className="w-4 h-4" />
                    EXCLUIR
                  </button>
                  <button 
                    onClick={() => selectedTemplate && handleExport(selectedTemplate)}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-500 text-black text-xs font-bold hover:bg-emerald-400 transition-all"
                  >
                    <Download className="w-4 h-4" />
                    EXPORTAR PROJETO
                  </button>
                  <button 
                    onClick={() => setSelectedTemplate(null)}
                    className="p-2 rounded-full hover:bg-white/5 text-zinc-500 transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>

              {/* Modal Content */}
              <div className="flex-1 flex flex-col overflow-hidden bg-[#050505]">
                {/* Horizontal Navigation Bar */}
                <div className="w-full border-b border-white/5 p-4 flex items-center justify-between bg-black/40 shrink-0">
                  <div className="flex gap-2 overflow-x-auto custom-scrollbar pb-2 md:pb-0">
                    {availableRoutes.map(route => (
                      <button
                        key={route}
                        onClick={() => setCurrentRoute(route)}
                        className={cn(
                          "whitespace-nowrap px-4 py-2 rounded-full text-xs font-bold transition-all uppercase tracking-wider border",
                          currentRoute === route 
                            ? "bg-emerald-500/20 border-emerald-500/30 text-emerald-400" 
                            : "border-white/5 bg-white/5 text-zinc-500 hover:text-white hover:bg-white/10"
                        )}
                      >
                        {route.replace(/^\d+-/, '').replace(/-/g, ' ')}
                      </button>
                    ))}
                  </div>

                  <div className="flex p-1 bg-white/5 rounded-full border border-white/10 shrink-0 ml-4">
                    <button 
                      onClick={() => setCurrentTheme("light")}
                      className={cn(
                        "flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-bold transition-all uppercase tracking-widest",
                        currentTheme === "light" ? "bg-white text-black" : "text-zinc-500 hover:text-white"
                      )}
                    >
                      <Sun className="w-3 h-3" />
                      Light
                    </button>
                    <button 
                      onClick={() => setCurrentTheme("dark")}
                      className={cn(
                        "flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-bold transition-all uppercase tracking-widest",
                        currentTheme === "dark" ? "bg-zinc-800 text-white shadow-sm" : "text-zinc-500 hover:text-white"
                      )}
                    >
                      <Moon className="w-3 h-3" />
                      Dark
                    </button>
                  </div>
                </div>

                {/* Immersive Preview */}
                <div className="flex-1 relative p-4 md:p-8 flex items-center justify-center bg-gradient-to-b from-transparent to-black/50 overflow-hidden">
                  <div className="w-full max-w-5xl shadow-[0_30px_60px_-15px_rgba(0,0,0,0.7)] border border-white/10 rounded-xl overflow-hidden bg-zinc-900 flex flex-col max-h-[75vh]">
                    {/* Browser Shell Mockup */}
                    <div className="h-8 bg-zinc-800 border-b border-white/5 flex items-center px-4 justify-between shrink-0">
                      <div className="flex gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
                        <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
                      </div>
                      <div className="bg-black/20 px-4 py-0.5 rounded text-[10px] text-zinc-400 font-mono tracking-wider flex items-center gap-2">
                        <span>preview.internal/{selectedTemplate.name.toLowerCase()}/{currentRoute}</span>
                      </div>
                      <div className="w-12" />
                    </div>
                    
                    <div className="flex-1 overflow-y-auto custom-scrollbar relative bg-black/50">
                      {currentImage ? (
                        <motion.img 
                          key={`${currentRoute}-${currentTheme}`}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          src={currentImage}
                          alt="Preview"
                          className="w-full h-auto block"
                        />
                      ) : (
                        <div className="h-96 flex items-center justify-center">
                          <Loader2 className="w-8 h-8 animate-spin text-zinc-700" />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
