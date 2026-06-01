# 🏭 PROTOCOL: THE FORGE - STAGE 4 (EXTRACTION)

**hook:** Read and obey `forge/regras.md` before proceeding.

**Role:** You are the Forge Packager, an AI specialized in high-efficiency, surgical file system operations.
**Environment:** `forge/`

## ⚠️ TURBO EXTRACTION DIRECTIVES (ANTI-BLOAT & SPEED)
1. **NO DIRECTORY TRAVERSAL & NO INSPECTION:** You are STRICTLY FORBIDDEN from running commands like `ls`, `dir`, `pwd`, or `Get-ChildItem`. Do not waste time manually inspecting folders.
2. **ONE-SHOT SCRIPT:** Do NOT execute manual copy commands in the terminal one by one. You MUST write a single Node.js script (`extract.mjs`) to perform the entire extraction, metadata generation, and cleanup in milliseconds.
3. **WINDOWS FILE LOCK BYPASS:** Windows blocks deletion of `sandbox` due to Next.js. The script must kill port 3000 before running deletion.

⚠️ NEVER modify, delete, or interact with the ".scripts" folder or any files outside of "forge/sandbox".

---

### TASK: TARGETED EXTRACTION & SANITIZATION
*Action:* Autonomously execute the following steps strictly in order:

1. **Enter the Forge:**
   Run: `cd forge` (if you are not already there).

2. **Read Target (Silently):**
   Read `forge-context.md` using your native file reading tool to extract:
   - Category
   - Theme Mode
   - Brand Name
   - Design Tier (Integer: 1, 2, or 3)

3. **Create the Extraction Script (`extract.mjs`):**
   Write the script below inside the `forge/` directory. **INJECT** the exact strings you deduced in step 2 into the variables at the top of the script. Do NOT use paths with slashes, just inject the plain names.

   ```javascript
   import fs from 'fs';
   import path from 'path';
   import { execSync } from 'child_process';

   console.log('🚀 Iniciando Extração Turbo em Milissegundos...');

   // Resolve o caminho a partir da pasta raiz do repositório
   const rootPath = path.resolve('../../'); 
   const statePath = path.join(rootPath, '.templates', 'forge', 'state_dump.json');

   if (!fs.existsSync(statePath)) {
     console.error('❌ Erro: state_dump.json não encontrado. Abortando.');
     process.exit(1);
   }

   const state = JSON.parse(fs.readFileSync(statePath, 'utf8'));
   const CATEGORY = state.category; 
   const THEME_MODE = state.theme;
   const BRAND_NAME = state.brand || 'Template'; // Fallback se não definido
   const TIER_NUM = state.tier || 2;

   const targetPath = path.join(rootPath, '.templates', 'templates-library', CATEGORY, THEME_MODE, BRAND_NAME);

   if (!fs.existsSync(targetPath)) fs.mkdirSync(targetPath, { recursive: true });

   // Cópia Cirúrgica Super Rápida
   const itemsToCopy = ['src', 'public', '.obsidian_vault', 'preview', 'imagem', 'package.json', 'tailwind.config.ts', 'tsconfig.json', 'postcss.config.js', 'postcss.config.mjs', 'next.config.js', 'next.config.ts', 'next.config.mjs'];
   
   for (const item of itemsToCopy) {
     const srcPath = path.join('sandbox', item);
     const destPath = path.join(targetPath, item);
     if (fs.existsSync(srcPath)) {
       console.log(`Copying ${item}...`);
       fs.cpSync(srcPath, destPath, { recursive: true });
     }
   }

   // Geração do Metadata com Tier
   const metaPath = path.join(targetPath, 'template.json');
   fs.writeFileSync(metaPath, JSON.stringify({
     name: BRAND_NAME,
     description: `Premium visual layout created automatically by the Forge.`,
     category: CATEGORY,
     theme: THEME_MODE,
     tier: TIER_NUM,
     createdAt: new Date().toISOString()
   }, null, 2));

   // VALIDAÇÃO CRÍTICA: Verificar se src e package.json foram movidos
   const validSrc = fs.existsSync(path.join(targetPath, 'src'));
   const validPkg = fs.existsSync(path.join(targetPath, 'package.json'));

   if (validSrc && validPkg) {
       console.log('✅ Validação concluída. Iniciando Nuke da Sandbox...');
       // Morte de Processos Fantasmas e Limpeza Nativa
       try { execSync('npx kill-port 3001', { stdio: 'ignore', windowsHide: true }); } catch(e) {}
       
       if (fs.existsSync('sandbox')) {
           fs.rmSync('sandbox', { recursive: true, force: true });
       }
       // Não deletamos state_dump.json aqui pois ele é persistente para o orquestrador
       console.log('🎉 Forja limpa e template empacotado com sucesso!');
   } else {
       console.error('❌ FALHA NA VALIDAÇÃO: Arquivos críticos não foram encontrados no destino.');
       process.exit(1);
   }
   ```

4. **Execute and Cleanup:**
   - Run: `node extract.mjs`
   - Run this specific command to safely delete the script in Windows/Linux without terminal conflicts: `node -e "require('fs').unlinkSync('extract.mjs')"`

5. *Print:* > ✅ **EXTRAÇÃO CIRÚRGICA TURBO CONCLUÍDA!**
   > A estrutura leve, metadados de Tier e as fotos foram movidos em milissegundos. Processos fantasmas encerrados e Forja implodida com sucesso!
**[🛑 STOP AND END TASK]**