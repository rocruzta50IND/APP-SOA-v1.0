import { NextRequest } from "next/server";
import { spawn } from "child_process";
import path from "path";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const { category, theme, tier } = await req.json();

  // Garante o caminho absoluto e lida com espaços no Windows
  const projectRoot = path.resolve(process.cwd(), "../../");
  const scriptPath = path.join(projectRoot, ".scripts", "auto-forge.mjs");
  
  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    start(controller) {
      // Usamos process.execPath para garantir que usa o mesmo binário do Node
      // No Windows, caminhos com espaço precisam de aspas duplas se shell for true
      const child = spawn(`"${process.execPath}"`, [`"${scriptPath}"`], {
        env: {
          ...process.env,
          FORGE_CATEGORY: category,
          FORGE_THEME: theme,
          FORGE_TIER: String(tier),
          FORCE_COLOR: "1",
        },
        shell: true, // Necessário para gemini.cmd dentro do script
        cwd: projectRoot, // Executa a partir da raiz do projeto
      });

      child.stdout.on("data", (data) => {
        controller.enqueue(encoder.encode(data.toString()));
      });

      child.stderr.on("data", (data) => {
        controller.enqueue(encoder.encode(`ERROR: ${data.toString()}`));
      });

      child.on("close", (code) => {
        controller.enqueue(encoder.encode(`\n[SYSTEM] Process finished with code ${code}\n`));
        controller.close();
      });

      child.on("error", (err) => {
        controller.enqueue(encoder.encode(`CRITICAL ERROR: ${err.message}`));
        controller.close();
      });
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      "Connection": "keep-alive",
    },
  });
}
