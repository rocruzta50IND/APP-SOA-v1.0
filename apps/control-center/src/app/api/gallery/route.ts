import { NextResponse } from "next/server";
import { promises as fsPromises, existsSync } from "fs";
import path from "path";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const libPath = path.resolve(process.cwd(), "../../.templates/templates-library");
    
    if (!existsSync(libPath)) {
      return NextResponse.json({ templates: [] });
    }

    const templates: any[] = [];
    const categories = await fsPromises.readdir(libPath, { withFileTypes: true });

    for (const cat of categories) {
      if (!cat.isDirectory()) continue;
      const catPath = path.join(libPath, cat.name);
      const themes = await fsPromises.readdir(catPath, { withFileTypes: true });

      for (const theme of themes) {
        if (!theme.isDirectory()) continue;
        const themePath = path.join(catPath, theme.name);
        const projects = await fsPromises.readdir(themePath, { withFileTypes: true });

        for (const project of projects) {
          if (!project.isDirectory()) continue;
          const projectPath = path.join(themePath, project.name);
          const stats = await fsPromises.stat(projectPath);
          
          let metadata = {
            name: project.name,
            description: "No description available.",
            tier: 1
          };

          const jsonPath = path.join(projectPath, "template.json");
          try {
            const raw = await fsPromises.readFile(jsonPath, "utf-8");
            metadata = { ...metadata, ...JSON.parse(raw) };
          } catch (e) {
            // Ignora silenciosamente arquivos JSON faltando ou inválidos
          }

          let previewPath = path.join(projectPath, "preview");
          let hasPreview = existsSync(previewPath);
          
          if (!hasPreview) {
            previewPath = path.join(projectPath, "imagem");
            hasPreview = existsSync(previewPath);
          }

          let images: string[] = [];
          if (hasPreview) {
            const files = await fsPromises.readdir(previewPath);
            images = files.filter(f => /\.(webp|png|jpg|jpeg)$/i.test(f));
          }

          templates.push({
            id: Buffer.from(`${cat.name}/${theme.name}/${project.name}`).toString('base64'),
            name: metadata.name,
            description: metadata.description,
            tier: metadata.tier,
            category: cat.name,
            theme: theme.name,
            createdAt: stats.birthtime,
            images: images,
            relativePath: `${cat.name}/${theme.name}/${project.name}`
          });
        }
      }
    }

    // Sort by newest
    templates.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

    return NextResponse.json({ templates });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
