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

## ⚠️ CRITICAL PRE-FLIGHT CHECK (ANTI-CACHE)
Before you start the Next.js server or run the Puppeteer script, you MUST completely delete the Next.js cache to force Tailwind to recompile the CSS.

---

### TASK: AUTOMATED SMART CAPTURE
*Action:* Autonomously execute the following steps strictly in order:

1. **Enter the Sandbox & Clean Cache:**
   Run: `cd forge/sandbox`
   Run: `npx rimraf .next`

2. **Install Tools:**
   Run: `npm install -D puppeteer-core kill-port --prefer-offline --silent`

3. **Create the Capture Script (`capture.mjs`):**
   Write the script below inside the current sandbox directory. MAKE SURE to inject the correct `themes` array and ALL 8 `routes` based on your previous work.
   
   ```javascript
   import puppeteer from 'puppeteer-core';
   import os from 'os';
   import fs from 'fs';

   (async () => {
     if (!fs.existsSync('./preview')) fs.mkdirSync('./preview');
     console.log('📸 Iniciando câmera Hyper-Speed (Smart FullPage + Dynamic Theme)...');

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

     const browser = await puppeteer.launch({ executablePath, headless: 'new', args: ['--disable-gpu', '--no-sandbox'] });
     const page = await browser.newPage();
     
     // 1440x900 para dar espaço ao Bento Grid nos dashboards internos
     await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1.0 });

     // AI: INJECT ALL 8 ROUTES HERE (3 Public + 5 Internal). Keep the filePrefix numeric logic.
     const routes = [
       { path: '/', filePrefix: '1-landing' },
       { path: '/login', filePrefix: '2-login' },
       { path: '/register', filePrefix: '3-register' },
       // { path: '/dashboard', filePrefix: '4-dashboard' },
       // ... inject the rest ...
     ];

     // AI: LER FORGE-CONTEXT.MD E DEFINIR ESTE ARRAY. (e.g., ['light', 'dark'] or just ['dark'])
     const themes = ['light', 'dark']; 

     for (const route of routes) {
       console.log(`\n🚀 Carregando rota: ${route.path}...`);
       
       await page.goto(`http://localhost:3000${route.path}`, { waitUntil: 'load', timeout: 15000 });
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
           // Scroll rápido apenas na Landing Page para revelar Lazy Loads
           const bodyHeight = await page.evaluate(() => Math.max(document.body.scrollHeight, document.documentElement.scrollHeight));
           await page.evaluate((h) => window.scrollTo(0, h), bodyHeight);
           await new Promise(r => setTimeout(r, 150));
           await page.evaluate(() => window.scrollTo(0, 0));
           await new Promise(r => setTimeout(r, 150));
         }

         const fileName = `${route.filePrefix}-${theme}.webp`;
         
         // A MÁGICA: fullPage apenas para Landing. Viewport fixo para os Dashboards.
         await page.screenshot({ 
           path: `./preview/${fileName}`,
           type: 'webp',
           quality: 30,
           fullPage: isLanding
         });
         console.log(`    ✅ Salvo: ${fileName}`);
       }
     }

     await browser.close();
     console.log('\n🎉 Ensaio fotográfico Smart concluído!');
     process.exit(0);
   })();
   ```

4. **Start Next.js & Run Capture:**
   - Start the Next.js dev server in the background: `npm run dev &`
   - Wait 4 seconds for the server to boot.
   - Run the script: `node capture.mjs`
   - Kill the Next.js process: `npx kill-port 3000`

5. **Cleanup:**
   - Delete `capture.mjs`.
   
6. **Print Success:**
   > 📸 **SCREENSHOTS CONCLUÍDAS!**
   > O script Puppeteer processou o ensaio fotográfico das 8 rotas.
   > **[🛑 STOP AND END TASK]**