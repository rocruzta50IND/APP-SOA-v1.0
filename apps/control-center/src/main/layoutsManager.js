const { ipcMain } = require('electron');
const fs = require('fs');
const path = require('path');

function registerLayoutsHandlers(ipcMain) {
  ipcMain.handle('layouts.getAvailable', async () => {
    try {
      // Resolve the layouts directory relative to the project root
      // apps/control-center/src/main/layoutsManager.js
      // root: ../../../../ -> D:\Rodrigo\Projeto\SOA v1.0
      const rootDir = path.resolve(__dirname, '../../../../');
      const layoutsDir = path.join(rootDir, '.templates', 'forge', 'layouts');
      
      if (!fs.existsSync(layoutsDir)) {
        console.warn(`[Layouts] Directory not found: ${layoutsDir}`);
        return [];
      }

      const results = [];
      const tiers = fs.readdirSync(layoutsDir).filter(f => fs.statSync(path.join(layoutsDir, f)).isDirectory());

      for (const tier of tiers) {
        const tierPath = path.join(layoutsDir, tier);
        const themes = fs.readdirSync(tierPath).filter(f => fs.statSync(path.join(tierPath, f)).isDirectory());

        for (const theme of themes) {
          const themePath = path.join(tierPath, theme);
          const layouts = fs.readdirSync(themePath).filter(f => fs.statSync(path.join(themePath, f)).isDirectory());

          for (const layout of layouts) {
            const layoutPath = path.join(themePath, layout);
            const metaPath = path.join(layoutPath, 'metadata.json');
            
            let meta = {};
            if (fs.existsSync(metaPath)) {
              try {
                meta = JSON.parse(fs.readFileSync(metaPath, 'utf8'));
              } catch (e) {
                console.error(`[Layouts] Failed to parse metadata for ${layoutPath}:`, e);
              }
            }

            results.push({
              tier,
              theme,
              id: layout,
              meta
            });
          }
        }
      }

      return results;
    } catch (error) {
      console.error('[Layouts] Error fetching available layouts:', error);
      return [];
    }
  });
}

module.exports = { registerLayoutsHandlers };
