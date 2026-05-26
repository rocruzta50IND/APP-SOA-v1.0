import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const libPath = path.resolve(process.cwd(), "../../.templates/templates-library");
    
    if (!fs.existsSync(libPath)) {
      return NextResponse.json({ templates: [] });
    }

    const templates: any[] = [];
    const categories = fs.readdirSync(libPath).filter(f => fs.statSync(path.join(libPath, f)).isDirectory());

    for (const cat of categories) {
      const catPath = path.join(libPath, cat);
      const themes = fs.readdirSync(catPath).filter(f => fs.statSync(path.join(catPath, f)).isDirectory());

      for (const theme of themes) {
        const themePath = path.join(catPath, theme);
        const projects = fs.readdirSync(themePath).filter(f => fs.statSync(path.join(themePath, f)).isDirectory());

        for (const project of projects) {
          const projectPath = path.join(themePath, project);
          const stats = fs.statSync(projectPath);
          
          let metadata = {
            name: project,
            description: "No description available.",
            tier: 1
          };

          const jsonPath = path.join(projectPath, "template.json");
          if (fs.existsSync(jsonPath)) {
            try {
              const raw = fs.readFileSync(jsonPath, "utf-8");
              metadata = { ...metadata, ...JSON.parse(raw) };
            } catch (e) {}
          }

          let previewPath = path.join(projectPath, "preview");
          if (!fs.existsSync(previewPath)) {
            previewPath = path.join(projectPath, "imagem");
          }

          let images: string[] = [];
          if (fs.existsSync(previewPath)) {
            images = fs.readdirSync(previewPath).filter(f => /\.(webp|png|jpg|jpeg)$/i.test(f));
          }

          templates.push({
            id: Buffer.from(`${cat}/${theme}/${project}`).toString('base64'),
            name: metadata.name,
            description: metadata.description,
            tier: metadata.tier,
            category: cat,
            theme: theme,
            createdAt: stats.birthtime,
            images: images,
            relativePath: `${cat}/${theme}/${project}`
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
