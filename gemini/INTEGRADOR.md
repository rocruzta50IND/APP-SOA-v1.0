# 🔧 INSTRUÇÕES DE INTEGRAÇÃO
* **Causa Raiz:** O layout forçava tamanho via `min-h-screen` e `fixed w-screen h-screen`, o que quebra o encapsulamento dentro do DashboardShell e causa scrollbars globais.

* **Arquivo Afetado:** `@apps/control-center/src/app/(orchestrator)/layout.tsx`
* **TargetContent:**
```text
    <div className="bg-zinc-950 text-zinc-50 min-h-screen font-sans">
      {children}
    </div>
```
* **ReplacementContent:**
```text
    <div className="bg-zinc-950 text-zinc-50 h-full w-full font-sans flex flex-col overflow-hidden">
      {children}
    </div>
```

* **Arquivo Afetado:** `@apps/control-center/src/app/(orchestrator)/production/page.tsx`
* **TargetContent:**
```text
    <div 
      onMouseMove={handleMouseMove}
      className="fixed inset-0 w-screen h-screen bg-[#050505] overflow-hidden font-sans selection:bg-emerald-500/30 flex flex-col"
    >
      <style dangerouslySetInnerHTML={{ __html: `
        ::-webkit-scrollbar {
          width: 4px;
        }
        ::-webkit-scrollbar-track {
          background: transparent;
        }
        ::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: rgba(255, 255, 255, 0.1) transparent;
        }
      `}} />
      
      {/* Centralized Emerald Glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden z-0">
        <motion.div 
          style={{ x: moveX, y: moveY }}
          className="w-[1000px] h-[1000px] bg-emerald-500/10 rounded-full blur-[180px] opacity-20"
        />
      </div>

      {/* Production Layout Container */}
      <div className={cn(
        "relative w-full h-full flex z-10 transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]",
        viewMode === 'terminal' ? "flex-row p-4 gap-6" : "flex-col items-center justify-center p-6"
      )}>
```
* **ReplacementContent:**
```text
    <div 
      onMouseMove={handleMouseMove}
      className="relative w-full h-full bg-[#050505] overflow-hidden font-sans selection:bg-emerald-500/30 flex flex-col"
    >
      <style dangerouslySetInnerHTML={{ __html: `
        ::-webkit-scrollbar {
          width: 4px;
        }
        ::-webkit-scrollbar-track {
          background: transparent;
        }
        ::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: rgba(255, 255, 255, 0.1) transparent;
        }
      `}} />
      
      {/* Centralized Emerald Glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden z-0">
        <motion.div 
          style={{ x: moveX, y: moveY }}
          className="w-[1000px] h-[1000px] bg-emerald-500/10 rounded-full blur-[180px] opacity-20"
        />
      </div>

      {/* Production Layout Container */}
      <div className={cn(
        "relative w-full flex-1 min-h-0 flex z-10 transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]",
        viewMode === 'terminal' ? "flex-row p-4 gap-6" : "flex-col items-center justify-center p-6"
      )}>
```