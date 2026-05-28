import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

// AI: INJECT THE REAL DATA HERE AS PLAIN STRINGS (NO SLASHES)
const CATEGORY = 'Recursos Humanos HR'; 
const THEME_MODE = 'Dark';
const BRAND_NAME = 'AuraTalent';
const TIER_NUM = 2; // Apenas o número (ex: 1, 2 ou 3)

console.log('🚀 Iniciando Extração Turbo em Milissegundos...');

// Resolve o caminho a partir da pasta raiz do repositório (Cross-OS fix)
const rootPath = path.resolve('../../'); 
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

// Geração do Metadata com Tier (Garante que o template.json exista e seja válido)
const metaPath = path.join(targetPath, 'template.json');
fs.writeFileSync(metaPath, JSON.stringify({
  name: BRAND_NAME,
  description: "Premium visual layout created automatically by the Forge.",
  category: CATEGORY,
  theme: THEME_MODE,
  tier: TIER_NUM,
  createdAt: new Date().toISOString()
}, null, 2));

console.log('✅ Arquivos movidos. Iniciando Nuke da Sandbox...');

// Morte de Processos Fantasmas e Limpeza Nativa
try { execSync('npx kill-port 3000', { stdio: 'ignore' }); } catch(e) {}

// Nuke nativo (não usa dependências externas para evitar falhas no Windows)
if (fs.existsSync('sandbox')) {
    fs.rmSync('sandbox', { recursive: true, force: true });
}
if (fs.existsSync('forge-context.md')) {
    fs.unlinkSync('forge-context.md');
}

console.log('🎉 Forja limpa e template empacotado com sucesso!');
