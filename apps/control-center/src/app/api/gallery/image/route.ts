import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const relativePath = searchParams.get("path"); // ex: "Recursos Humanos HR/Duo Model/LuminaTalent"
    const imageName = searchParams.get("image"); // ex: "1-landing-dark.webp"

    if (!relativePath || !imageName) {
      return new Response("Missing parameters", { status: 400 });
    }

    const baseDir = path.resolve(process.cwd(), "../../.templates/templates-library");
    
    let fullPath = path.resolve(baseDir, relativePath, "preview", imageName);

    // Validação de Segurança contra Path Traversal
    if (!fullPath.startsWith(baseDir)) {
      return new Response("Unauthorized path traversal detected", { status: 403 });
    }

    if (!fs.existsSync(fullPath)) {
      fullPath = path.resolve(baseDir, relativePath, "imagem", imageName);
      
      // Validação do fallback
      if (!fullPath.startsWith(baseDir)) {
        return new Response("Unauthorized path traversal detected", { status: 403 });
      }
    }

    if (!fs.existsSync(fullPath)) {
      return new Response("Image not found", { status: 404 });
    }

    const imageBuffer = fs.readFileSync(fullPath);
    const ext = path.extname(imageName).toLowerCase();
    
    let contentType = "image/webp";
    if (ext === ".png") contentType = "image/png";
    if (ext === ".jpg" || ext === ".jpeg") contentType = "image/jpeg";

    return new Response(imageBuffer, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (error: any) {
    return new Response(error.message, { status: 500 });
  }
}
