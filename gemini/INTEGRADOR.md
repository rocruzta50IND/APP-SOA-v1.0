# 🔧 INSTRUÇÕES DE INTEGRAÇÃO (TERMINAL READ-ONLY E INPUT VIA CHATBOT)

* **Causa Raiz / Motivação:** A arquitetura exige que o terminal Xterm da Forja seja "Read-Only" para o usuário. O input humano para a CLI (`agy`) deve ser feito OBRIGATORIAMENTE através do painel do Chatbot na UI, que enviará o comando de forma isolada ao processo backend via IPC.
* **Arquivos Afetados:** `@apps/control-center/src/components/TerminalView.tsx`, `@apps/control-center/src/app/page.tsx`

*(Nota: O `preload.js` e `main.js` já possuem a rota `sendTerminalData` / `terminal.into` implementada em passos anteriores para o `node-pty`, logo usaremos esta rota existente).*

### 1. Tornar o Terminal Read-Only (`TerminalView.tsx`)

* **TargetContent:**
```tsx
          const term = new Terminal({
            cursorBlink: true,
            disableStdin: false,
            fontSize: 14,
```

* **ReplacementContent:**
```tsx
          const term = new Terminal({
            cursorBlink: true,
            disableStdin: true, // <-- TERMINAL READ-ONLY (Blindado)
            fontSize: 14,
```

### 2. Acoplar o Chatbot (`page.tsx`)

* **TargetContent:**
```tsx
export default function ForgeHomePage() {
  const [isMounted, setIsMounted] = useState(false);
  const [isForgeStarted, setIsForgeStarted] = useState(false);
  const [wasRestored, setWasRestored] = useState(false);
  const [isTerminalView, setIsTerminalView] = useState(false);

  useEffect(() => {
```

* **ReplacementContent:**
```tsx
export default function ForgeHomePage() {
  const [isMounted, setIsMounted] = useState(false);
  const [isForgeStarted, setIsForgeStarted] = useState(false);
  const [wasRestored, setWasRestored] = useState(false);
  const [isTerminalView, setIsTerminalView] = useState(false);
  const [chatInput, setChatInput] = useState("");

  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    
    // Dispara via IPC para o processo Node-PTY isolado
    if (window.electronAPI && window.electronAPI.sendTerminalData) {
      window.electronAPI.sendTerminalData("forge-session", chatInput + "\r");
    }
    
    setChatInput("");
    setIsTerminalView(true); // Força a visualização para o terminal ao enviar o comando
  };

  useEffect(() => {
```

* **TargetContent:**
```tsx
        <div className="p-4 border-t border-orange-500/10">
          <div className="relative group">
            <input 
              type="text" 
              placeholder="Descreva o layout desejado..." 
              className="w-full bg-black/50 border border-orange-500/20 rounded-xl py-3 pl-4 pr-12 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-orange-500/50 transition-colors"
            />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-lg bg-orange-500 text-white hover:bg-orange-400 transition-colors shadow-lg shadow-orange-500/20">
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
```

* **ReplacementContent:**
```tsx
        <form onSubmit={handleChatSubmit} className="p-4 border-t border-orange-500/10">
          <div className="relative group">
            <input 
              type="text" 
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder="Descreva o layout desejado..." 
              className="w-full bg-black/50 border border-orange-500/20 rounded-xl py-3 pl-4 pr-12 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-orange-500/50 transition-colors"
            />
            <button 
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-lg bg-orange-500 text-white hover:bg-orange-400 transition-colors shadow-lg shadow-orange-500/20"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </form>
```
