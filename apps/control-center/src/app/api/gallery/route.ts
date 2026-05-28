import { NextResponse } from "next/server";
import { promises as fsPromises, existsSync } from "fs";
import path from "path";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const libPath = path.resolve(process.cwd(), "../../.templates/templates-library");
    
    if (!existsSync(libPath)) {
      console.warn("Gallery library path not found:", libPath);
      return NextResponse.json({ templates: [] });
    }

    const templates: any[] = [];
    let categories: any[] = [];
    
    try {
      categories = await fsPromises.readdir(libPath, { withFileTypes: true });
    } catch (e) {
      console.error("Error reading categories:", e);
      return NextResponse.json({ templates: [] });
    }

    for (const cat of categories) {
      if (!cat.isDirectory()) continue;
      const catPath = path.join(libPath, cat.name);
      
      let themes: any[] = [];
      try {
        themes = await fsPromises.readdir(catPath, { withFileTypes: true });
      } catch (e) { continue; }

      for (const theme of themes) {
        if (!theme.isDirectory()) continue;
        const themePath = path.join(catPath, theme.name);
        
        let projects: any[] = [];
        try {
          projects = await fsPromises.readdir(themePath, { withFileTypes: true });
        } catch (e) { continue; }

        for (const project of projects) {
          if (!project.isDirectory()) continue;
          const projectPath = path.join(themePath, project.name);
          
          let stats;
          try {
            stats = await fsPromises.stat(projectPath);
          } catch (e) { continue; }
          
          let metadata = {
            name: project.name,
            description: "No description available.",
            tier: 1
          };

          const jsonPath = path.join(projectPath, "template.json");
          try {
            const raw = await fsPromises.readFile(jsonPath, "utf-8");
            metadata = { ...metadata, ...JSON.parse(raw) };
          } catch (e) { }

          let previewPath = path.join(projectPath, "preview");
          let hasPreview = existsSync(previewPath);
          
          if (!hasPreview) {
            previewPath = path.join(projectPath, "imagem");
            hasPreview = existsSync(previewPath);
          }

          let images: string[] = [];
          if (hasPreview) {
            try {
              const files = await fsPromises.readdir(previewPath);
              images = files.filter(f => /\.(webp|png|jpg|jpeg)$/i.test(f));
            } catch (e) { }
          }

          templates.push({
            id: Buffer.from(`${cat.name}/${theme.name}/${project.name}`).toString('base64'),
            name: metadata.name,
            description: metadata.description,
            tier: metadata.tier,
            category: cat.name,
            theme: theme.name,
            createdAt: stats.birthtime || stats.ctime || new Date(),
            images: images,
            relativePath: `${cat.name}/${theme.name}/${project.name}`
          });
        }
      }
    }

    // Sort by newest
    templates.sort((a, b) => {
      const dateA = a.createdAt instanceof Date ? a.createdAt.getTime() : 0;
      const dateB = b.createdAt instanceof Date ? b.createdAt.getTime() : 0;
      return dateB - dateA;
    });

    return NextResponse.json({ templates });
  } catch (error: any) {
    console.error("Gallery API Fatal Error:", error);
    return NextResponse.json({ templates: [], error: error.message }, { status: 200 });
  }
}
