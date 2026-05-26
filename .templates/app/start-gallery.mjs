import http from 'http';
import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 3333;
const APP_DIR = __dirname;
const TEMPLATES_LIB_DIR = path.join(__dirname, '..', 'templates-library');
const AGENT_DIR = path.join(__dirname, '..', '..', '.agent');
const SELECTION_FILE = path.join(AGENT_DIR, 'selected-template.json');

function getTemplatesTree() {
  const tree = {};
  if (!fs.existsSync(TEMPLATES_LIB_DIR)) return tree;

  const categories = fs.readdirSync(TEMPLATES_LIB_DIR, { withFileTypes: true });

  for (const cat of categories) {
    if (cat.isDirectory()) {
      const catPath = path.join(TEMPLATES_LIB_DIR, cat.name);
      
      tree[cat.name] = {
        subcategories: [],
        templates: []
      };
      
      const subcategories = fs.readdirSync(catPath, { withFileTypes: true });
      
      for (const sub of subcategories) {
        if (sub.isDirectory()) {
          tree[cat.name].subcategories.push(sub.name);

          const subPath = path.join(catPath, sub.name);
          const templates = fs.readdirSync(subPath, { withFileTypes: true });

          for (const t of templates) {
            if (t.isDirectory()) {
              const tPath = path.join(subPath, t.name);
              const metaPath = path.join(tPath, 'template.json');
              const previewDir = path.join(tPath, 'preview');

              let images = [];
              if (fs.existsSync(previewDir)) {
                images = fs.readdirSync(previewDir).filter(file => /\.(png|jpe?g|gif|webp)$/i.test(file));
              }

              // Garantimos que por padrão o Tier é 1 (Comum) se não existir no JSON
              let meta = { name: t.name, description: "Sem descrição.", tier: 1 };
              if (fs.existsSync(metaPath)) {
                try {
                  const fileContent = fs.readFileSync(metaPath, 'utf8');
                  if (fileContent.trim() !== '') {
                    const parsed = JSON.parse(fileContent);
                    meta = { ...meta, ...parsed };
                  }
                } catch (e) {
                  meta.description = "⚠️ Erro de sintaxe no template.json";
                }
              }
              
              tree[cat.name].templates.push({ id: t.name, subcategory: sub.name, ...meta, images });
            }
          }
        }
      }
    }
  }
  return tree;
}

const server = http.createServer((req, res) => {
  if (req.method === 'GET' && req.url === '/api/templates') {
    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
    res.end(JSON.stringify(getTemplatesTree()));
    return;
  }

  if (req.method === 'GET' && req.url.startsWith('/preview/')) {
    const parts = req.url.split('/');
    const category = decodeURIComponent(parts[2] || '');
    const subcategory = decodeURIComponent(parts[3] || '');
    const templateId = decodeURIComponent(parts[4] || '');
    const imgName = decodeURIComponent(parts.slice(5).join('/'));
    
    const imgPath = path.join(TEMPLATES_LIB_DIR, category, subcategory, templateId, 'preview', imgName);

    if (fs.existsSync(imgPath)) {
      const ext = path.extname(imgPath).toLowerCase();
      const mimeTypes = { '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.gif': 'image/gif', '.webp': 'image/webp' };
      res.writeHead(200, { 'Content-Type': mimeTypes[ext] || 'application/octet-stream' });
      fs.createReadStream(imgPath).pipe(res);
    } else {
      res.writeHead(404); res.end();
    }
    return;
  }

  if (req.method === 'POST' && req.url === '/api/select') {
    let body = '';
    req.on('data', chunk => { body += chunk.toString(); });
    req.on('end', () => {
      const payload = JSON.parse(body);
      const exactPath = path.join('.templates', 'templates-library', payload.category, payload.subcategory, payload.template).replace(/\\/g, '/');

      const templateData = { 
        selectedTemplate: payload.template, 
        category: payload.category,
        subcategory: payload.subcategory,
        templatePath: exactPath 
      };

      if (!fs.existsSync(AGENT_DIR)) fs.mkdirSync(AGENT_DIR, { recursive: true });
      fs.writeFileSync(SELECTION_FILE, JSON.stringify(templateData, null, 2));
      
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: true }));

      console.log(`\n✅ Template Selecionado: [${payload.template}]`);
      console.log(`📂 Caminho de Origem: ${exactPath}`);
      console.log('🔌 Encerrando a galeria. Retornando o controle para o CLI...');
      
      setTimeout(() => process.exit(0), 300); 
    });
    return;
  }

  const serveFile = (filePath, contentType) => {
    const fullPath = path.join(APP_DIR, filePath);
    if (fs.existsSync(fullPath)) {
      res.writeHead(200, { 'Content-Type': contentType });
      fs.createReadStream(fullPath).pipe(res);
    } else {
      res.writeHead(404); res.end();
    }
  };

  if (req.method === 'GET') {
    if (req.url === '/' || req.url === '/index.html') return serveFile('index.html', 'text/html; charset=utf-8');
    if (req.url === '/style.css') return serveFile('style.css', 'text/css; charset=utf-8');
    if (req.url === '/script.js') return serveFile('script.js', 'application/javascript; charset=utf-8');
  }

  res.writeHead(404); res.end();
});

server.listen(PORT, () => {
  const url = `http://localhost:${PORT}`;
  console.log(`\n🎨 DevTool Ativa. Abrindo interface...`);
  const isWindows = process.platform === 'win32';
  const openCmd = isWindows ? `start chrome --app="${url}" --window-size=1440,900` : `open -na "Google Chrome" --args --app="${url}" --window-size=1440,900`;
  exec(openCmd, () => {});
});
