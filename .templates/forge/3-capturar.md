# 🏭 PROTOCOL: THE FORGE - STAGE 3 (PHOTOGRAPHY)

**hook:** Read and obey `forge/regras.md` before proceeding. Read `forge/forge-context.md` to identify the Theme Mode and the exact 8 routes you generated in stages 2B and 2C.

**Role:** You are the Forge Photographer, an AI specialized in E2E testing and Headless Browser Automation.
**Environment:** `forge/`

## ⚠️ HYPER-SPEED CAPTURE DIRECTIVES
1. **NO HUMAN INTERVENTION:** Complete this phase autonomously.
2. **ZERO BLOAT POLICY:** Use `puppeteer-core`.
3. **NEVER USE NETWORKIDLE:** ALWAYS use `waitUntil: 'load'`.
4. **SMART FULL-PAGE CAPTURE:** DO NOT chunk the images. Take ONE single screenshot per theme. Use `fullPage: true` ONLY for the Landing page (`/`). Internal dashboards are `h-screen` and must be captured normally (`fullPage: false`).
5. **MAXIMUM SQUEEZE:** Use 30% WebP quality.
6. **ANTI-PATH BUG:** Run `cd forge/sandbox` first.
7. **THE 8-PAGE MANDATE:** You MUST inject ALL 8 physical routes generated into the `routes` array (Landing, Login, Register + 5 Internals).
8. **BUFFER ISOLATION:** PROIBIDO o uso de pacotes npm nativos do OS como 'screenshot-desktop'. O screenshot deve focar obrigatoriamente e exclusivamente no buffer do Puppeteer/Playwright da página web capturada, para isolar a renderização da máquina local.

## ⚠️ CRITICAL PRE-FLIGHT CHECK (ANTI-CACHE)
Before you start the Next.js server or run the Puppeteer script, you MUST completely delete the Next.js cache to force Tailwind to recompile the CSS.

---

### TASK: AUTOMATED SMART CAPTURE
*Action:* Autonomously execute the following steps strictly in order:

1. **Enter the Sandbox:**
   Run: `cd forge/sandbox`

2. **Install Tools:**
   Run: `npm install -D puppeteer-core kill-port --prefer-offline --silent`

3. **Create the Capture Script (`capture.mjs`):**
   Write the script below inside the current sandbox directory. **DO NOT MODIFY IT IN ANY WAY. DO NOT TRY TO INJECT ROUTES. JUST COPY AND PASTE IT EXACTLY AS WRITTEN.** The script is fully autonomous and will scan the source code itself.
   
   ```javascript
   import puppeteer from 'puppeteer-core';
   import os from 'os';
   import fs from 'fs';
   import path from 'path';
   import { fileURLToPath } from 'url';

   (async () => {
     const __filename = fileURLToPath(import.meta.url);
     const __dirname = path.dirname(__filename);
     const previewDir = path.join(__dirname, 'preview');
     
     if (!fs.existsSync(previewDir)) fs.mkdirSync(previewDir);
     console.log('📸 Iniciando câmera Hyper-Speed (Autonomous Mode)...');

     let executablePath = '';
     const platform = os.platform();
     if (platform === 'win32') {
       executablePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
       if (!fs.existsSync(executablePath)) executablePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
     } else if (platform === 'darwin') {
       executablePath = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
     } else {
       executablePath = '/usr/bin/google-chrome'; 
     }

     if (!fs.existsSync(executablePath)) {
       console.error('Navegador não encontrado. Pule a captura.');
       process.exit(1);
     }

     // Polling for the Next.js server to be ready (fixes ERR_CONNECTION_REFUSED on complex tiers)
     console.log('Esperando servidor Next.js iniciar na porta 3000...');
     let serverReady = false;
     for (let i = 0; i < 60; i++) {
       try {
         await fetch('http://localhost:3000/');
         serverReady = true;
         break;
       } catch (e) {
         await new Promise(r => setTimeout(r, 1000));
       }
     }
     
     if (!serverReady) {
       console.error('Servidor não iniciou a tempo. Ignorando capturas detalhadas.');
       process.exit(1);
     }

     const browser = await puppeteer.launch({ executablePath, headless: true, args: ['--no-sandbox'] });
     const page = await browser.newPage();
     await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1.0 });

     // Descobrir rotas dinamicamente (ZERO-SHOT LLM Injection)
     const appDir = path.join(__dirname, 'src', 'app');
     let discoveredRoutes = [];
     function scanRoutes(dir, basePath = '') {
       if (!fs.existsSync(dir)) return;
       const items = fs.readdirSync(dir, { withFileTypes: true });
       for (const item of items) {
         if (item.isDirectory() && !item.name.startsWith('(') && !item.name.startsWith('[')) {
           scanRoutes(path.join(dir, item.name), `${basePath}/${item.name}`);
         } else if (item.name === 'page.tsx') {
           discoveredRoutes.push(basePath === '' ? '/' : basePath);
         }
       }
     }
     scanRoutes(appDir);
     
     // Ordenar rotas prioritárias
     const priority = { '/': 1, '/login': 2, '/register': 3 };
     discoveredRoutes.sort((a, b) => (priority[a] || 99) - (priority[b] || 99));
     
     const routes = discoveredRoutes.map((r, i) => ({
       path: r,
       filePrefix: `${i + 1}-${r === '/' ? 'landing' : r.split('/').pop()}`
     }));

     // Como o Tier 2 é exclusively dark, e o Tier 1 suporta ambos, fotografamos ambos em todos os casos e deixamos a UI da Galeria selecionar o melhor.
     const themes = ['light', 'dark'];

     for (const route of routes) {
       console.log(`\n🚀 Carregando rota: ${route.path}...`);
       
       try {
         await page.goto(`http://localhost:3000${route.path}`, { waitUntil: 'load', timeout: 60000 });
         await new Promise(r => setTimeout(r, 1200));
         
         await page.addStyleTag({ content: '*, *::before, *::after { transition: none !important; animation: none !important; scroll-behavior: auto !important; } ::-webkit-scrollbar { display: none; }' });

         const isLanding = route.path === '/';

         for (const theme of themes) {
           console.log(`  -> Aplicando tema [${theme}] e fotografando...`);
           
           await page.evaluate((t) => {
             window.localStorage.setItem('theme', t);
             const html = document.documentElement;
             html.classList.remove('light', 'dark');
             html.classList.add(t);
             html.setAttribute('data-theme', t);
             html.style.colorScheme = t;
           }, theme);

           await page.evaluate(() => window.dispatchEvent(new Event('resize')));
           await new Promise(r => setTimeout(r, 400)); 

           if (isLanding) {
             const bodyHeight = await page.evaluate(() => Math.max(document.body.scrollHeight, document.documentElement.scrollHeight));
             await page.evaluate((h) => window.scrollTo(0, h), bodyHeight);
             await new Promise(r => setTimeout(r, 150));
             await page.evaluate(() => window.scrollTo(0, 0));
             await new Promise(r => setTimeout(r, 150));
           }

           const fileName = `${route.filePrefix}-${theme}.webp`;
           await page.screenshot({ 
             path: path.join(previewDir, fileName),
             type: 'webp',
             quality: 30,
             fullPage: isLanding
           });
           console.log(`    ✅ Salvo: ${fileName}`);
         }
       } catch (err) {
         console.log(`    ❌ Falha ao fotografar ${route.path}:`, err.message);
       }
     }

     await browser.close();
     console.log('\n🎉 Ensaio fotográfico Smart concluído!');
     process.exit(0);
   })();
   ```

4. **Start Next.js & Run Capture:**
   - Start the Next.js production server in the background: `npm run start &`
   - You don't need to sleep/wait manually. The autonomous script handles it.
   - Run the script: `node capture.mjs`
   - Kill the Next.js process: `npx kill-port 3000`

5. **Cleanup:**
   - Delete `capture.mjs`.
   
6. **Print Success:**
   > 📸 **SCREENSHOTS CONCLUÍDAS!**
   > O script Puppeteer processou o ensaio fotográfico das 8 rotas.
   > **[🛑 STOP AND END TASK]**