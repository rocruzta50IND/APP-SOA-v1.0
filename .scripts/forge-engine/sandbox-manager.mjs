import fs from 'fs';
import path from 'path';
import { c } from './utils.mjs';

export function sweepStrayItems(TEMPLATES_DIR) {
    const strayItems = ['node_modules', 'package.json', 'package-lock.json'];
    strayItems.forEach(item => {
        const strayPath = path.join(TEMPLATES_DIR, item);
        if (fs.existsSync(strayPath)) fs.rmSync(strayPath, { recursive: true, force: true });
    });
}

export function resetSandbox(SANDBOX_DIR) {
    const appDir = path.join(SANDBOX_DIR, 'src', 'app');
    const compDir = path.join(SANDBOX_DIR, 'src', 'components');

    // Blindagem de I/O (Win32/NTFS)
    const cleanDirectory = (dir) => {
        if (!fs.existsSync(dir)) return;
        const items = fs.readdirSync(dir, { withFileTypes: true });
        for (const item of items) {
            const fullPath = path.join(dir, item.name);
            // JAMAIS apagar globals.css e layout.tsx da raiz do app
            if (dir === appDir && (item.name === 'globals.css' || item.name === 'layout.tsx')) {
                continue;
            }
            // JAMAIS apagar componentes base UI pre-fabricados ou wrappers ThreeJS para blindar o build
            if (dir === compDir && (item.name === 'ui' || item.name === 'ThreeScene.tsx' || item.name === 'ThreeSceneClient.tsx')) {
                continue;
            }
            if (item.isSymbolicLink() || (process.platform === 'win32' && item.isDirectory())) {
                const stats = fs.lstatSync(fullPath);
                if (stats.isSymbolicLink()) {
                    fs.unlinkSync(fullPath);
                } else if (process.platform === 'win32') {
                    try {
                        fs.unlinkSync(fullPath); 
                    } catch (e) {
                        if (item.isDirectory()) {
                            cleanDirectory(fullPath);
                            fs.rmSync(fullPath, { recursive: true, force: true });
                        }
                    }
                }
            } else if (item.isDirectory()) {
                cleanDirectory(fullPath);
                fs.rmSync(fullPath, { recursive: true, force: true });
            } else {
                fs.unlinkSync(fullPath);
            }
        }
    };

    // Limpeza Cirúrgica: App, Components e Preview
    cleanDirectory(appDir);
    cleanDirectory(compDir);
    const previewDir = path.join(SANDBOX_DIR, 'preview');
    if (fs.existsSync(previewDir)) fs.rmSync(previewDir, { recursive: true, force: true });

    if (!fs.existsSync(appDir)) fs.mkdirSync(appDir, { recursive: true });
    if (!fs.existsSync(compDir)) fs.mkdirSync(compDir, { recursive: true });

    // Recriação de Boilerplate Mínimo apenas se necessário
    if (!fs.existsSync(path.join(appDir, 'layout.tsx'))) {
        const layoutContent = `import './globals.css';\n\nexport default function RootLayout({\n  children,\n}: {\n  children: React.ReactNode;\n}) {\n  return (\n    <html lang="en">\n      <body>{children}</body>\n    </html>\n  );\n}\n`;
        fs.writeFileSync(path.join(appDir, 'layout.tsx'), layoutContent);
    }

    const pageContent = `export default function Page() {\n  return null;\n}\n`;
    fs.writeFileSync(path.join(appDir, 'page.tsx'), pageContent);

    console.log(`${c.gray}✓ Sandbox resetado cirurgicamente (Chassi Mantido com Blindagem I/O).${c.reset}`);
}

export function packageTemplate(TEMPLATES_DIR, LIB_PATH, SANDBOX_DIR, cat, theme, designTier) {
    const contextPath = path.join(TEMPLATES_DIR, 'forge', 'PROMPT.md');
    let projectName = 'template-' + Date.now();
    let description = "Template gerado automaticamente via Brainstorm do SOA Forge.";

    if (fs.existsSync(contextPath)) {
        const context = fs.readFileSync(contextPath, 'utf8');
        // Tenta achar um Nome e Descrição de forma genérica no PROMPT.md
        const nameMatch = context.match(/(?:Nome|Name|Projeto):\s*\*?\*?\s*([^\n]+)/i);
        const descMatch = context.match(/(?:Descri(?:c|ç)(?:a|ã)o|Description):\s*\*?\*?\s*([^\n]+)/i);

        const name = (nameMatch ? nameMatch[1] : 'Generated-Template').trim();
        projectName = (name || '').toString().replace(/[^a-z0-9-]/gi, '_');
        if (descMatch) description = descMatch[1].trim();
    }

    let destDir = path.join(LIB_PATH, cat, theme, projectName);

    // Trava de Segurança: Não sobrescrever projetos
    while (fs.existsSync(destDir)) {
        const hash = Math.random().toString(36).substring(2, 6);
        projectName = `${projectName}-${hash}`;
        destDir = path.join(LIB_PATH, cat, theme, projectName);
    }
    fs.mkdirSync(destDir, { recursive: true });

    // 1. Geração do template.json (ESSENCIAL para a Galeria)
    const templateMeta = {
        name: projectName,
        description: description,
        category: cat,
        theme: theme,
        tier: designTier,
        stack: "Next.js 15, TailwindCSS, TypeScript",
        createdAt: new Date().toISOString()
    };
    fs.writeFileSync(path.join(destDir, 'template.json'), JSON.stringify(templateMeta, null, 2));

    // 2. Extração Segura: Apenas o código, sem infra pesada ou lixo (.next, node_modules)
    const itemsToCopy = [
        'src', 
        'public', 
        'package.json', 
        'tailwind.config.ts', 
        'next.config.ts', 
        'tsconfig.json', 
        'preview', 
        'postcss.config.js', 
        'postcss.config.mjs',
        'PRD.md'
    ];

    itemsToCopy.forEach(item => {
        const src = path.join(SANDBOX_DIR, item);
        const dest = path.join(destDir, item);
        if (fs.existsSync(src)) {
            if (item === 'preview') {
                console.log(`${c.magenta}📸 [Empacotamento] Copiando pasta de preview com screenshots (Tier ${designTier})...${c.reset}`);
            }
            fs.cpSync(src, dest, { 
                recursive: true,
                filter: (srcPath) => {
                    const base = path.basename(srcPath);
                    return base !== '.next' && base !== 'node_modules' && base !== 'out';
                }
            });
        } else if (item === 'preview') {
            console.log(`${c.yellow}⚠️ [Aviso] Pasta 'preview' não encontrada no Sandbox para o Tier ${designTier}. Imagens não serão empacotadas.${c.reset}`);
        }
    });

    // Renomeia/Copia o PROMPT.md para PRD.md para ser mantido na galeria
    if (fs.existsSync(contextPath)) {
        fs.cpSync(contextPath, path.join(destDir, 'PRD.md'));
        fs.unlinkSync(contextPath);
    }

    console.log(`${c.green}✓ Template extraído e registrado na Galeria: ${c.bold}${destDir}${c.reset}`);
}
