import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

console.log('🚀 Iniciando Extração Turbo em Milissegundos...');

// Resolve o caminho a partir da pasta raiz do repositório
// No ambiente atual, estamos em D:\Rodrigo\Projeto\SOA v1.0\.templates
// forge/extract.mjs -> ../../ -> D:\Rodrigo\Projeto\SOA v1.0
const rootPath = path.resolve('.'); 

// Injected variables as per instruction
const CATEGORY = 'Fintech & Cripto'; 
const THEME_MODE = 'Light';
const BRAND_NAME = 'Vortex';
const TIER_NUM = 1;

const targetPath = path.join(rootPath, 'templates-library', CATEGORY, THEME_MODE, BRAND_NAME);

if (!fs.existsSync(targetPath)) fs.mkdirSync(targetPath, { recursive: true });

// Cópia Cirúrgica Super Rápida
const itemsToCopy = ['src', 'public', '.obsidian_vault', 'preview', 'imagem', 'package.json', 'tailwind.config.ts', 'tsconfig.json', 'postcss.config.js', 'postcss.config.mjs', 'next.config.js', 'next.config.ts', 'next.config.mjs'];

for (const item of itemsToCopy) {
  const srcPath = path.join('forge', 'sandbox', item);
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
    try { execSync('npx kill-port 3000', { stdio: 'ignore', windowsHide: true }); } catch(e) {}
    try { execSync('npx kill-port 3001', { stdio: 'ignore', windowsHide: true }); } catch(e) {}
    
    const sandboxPath = path.join('forge', 'sandbox');
    if (fs.existsSync(sandboxPath)) {
        fs.rmSync(sandboxPath, { recursive: true, force: true });
    }
    console.log('🎉 Forja limpa e template empacotado com sucesso!');
} else {
    console.error('❌ FALHA NA VALIDAÇÃO: Arquivos críticos não foram encontrados no destino.');
    process.exit(1);
}
