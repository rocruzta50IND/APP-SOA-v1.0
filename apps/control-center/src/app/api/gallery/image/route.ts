import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const relativePath = searchParams.get("path"); // ex: "Recursos Humanos HR/Duo Model/LuminaTalent"
    const imageName = searchParams.get("image"); // ex: "1-landing-dark.webp"

    if (!relativePath || !imageName) {
      return new Response("Missing parameters (path or image)", { status: 400 });
    }

    const baseDir = path.resolve(process.cwd(), "../../.templates/templates-library");
    
    // First attempt: preview folder
    let fullPath = path.resolve(baseDir, relativePath, "preview", imageName);

    // Validação de Segurança contra Path Traversal
    if (!fullPath.startsWith(baseDir)) {
      console.error("Security: Blocked path traversal attempt:", fullPath);
      return new Response("Unauthorized path traversal detected", { status: 403 });
    }

    // Fallback attempt: imagem folder
    if (!fs.existsSync(fullPath)) {
      fullPath = path.resolve(baseDir, relativePath, "imagem", imageName);
      
      // Validação do fallback
      if (!fullPath.startsWith(baseDir)) {
        return new Response("Unauthorized path traversal detected", { status: 403 });
      }
    }

    if (!fs.existsSync(fullPath)) {
      console.warn("Image not found on disk:", fullPath);
      return new Response("Image not found", { status: 404 });
    }

    try {
      const imageBuffer = fs.readFileSync(fullPath);
      const ext = path.extname(imageName).toLowerCase();
      
      let contentType = "image/webp";
      if (ext === ".png") contentType = "image/png";
      if (ext === ".jpg" || ext === ".jpeg") contentType = "image/jpeg";
      if (ext === ".svg") contentType = "image/svg+xml";

      return new Response(imageBuffer, {
        headers: {
          "Content-Type": contentType,
          "Cache-Control": "public, max-age=31536000, immutable",
        },
      });
    } catch (readError: any) {
      console.error("Error reading image file:", readError);
      return new Response("Error reading image", { status: 500 });
    }
  } catch (error: any) {
    console.error("Gallery Image API Fatal Error:", error);
    return new Response(error.message, { status: 500 });
  }
}
