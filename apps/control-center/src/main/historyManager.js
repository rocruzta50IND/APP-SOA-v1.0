const { app } = require('electron');
const path = require('path');
const fs = require('fs');

const HISTORY_FILE = path.join(app.getPath('userData'), 'forge-history.json');

function getHistory() {
  try {
    if (fs.existsSync(HISTORY_FILE)) {
      return JSON.parse(fs.readFileSync(HISTORY_FILE, 'utf-8'));
    }
  } catch (err) {
    console.error('[HISTORY] Error reading history:', err);
  }
  return [];
}

function saveHistory(historyArray) {
  try {
    fs.writeFileSync(HISTORY_FILE, JSON.stringify(historyArray, null, 2), 'utf-8');
  } catch (err) {
    console.error('[HISTORY] Error writing history:', err);
  }
}

function registerHistoryHandlers(ipcMain) {
  ipcMain.handle('history:get-all', () => {
    return getHistory();
  });

  ipcMain.handle('history:get-paginated', (event, { page = 1, limit = 10 }) => {
    const history = getHistory();
    const total = history.length;
    const totalPages = Math.ceil(total / limit);
    const start = (page - 1) * limit;
    const data = history.slice(start, start + limit);
    return { data, total, totalPages, page, limit };
  });

  ipcMain.handle('dashboard:get-kpis', () => {
    const history = getHistory();
    const totalForges = history.length;
    const successForges = history.filter(h => h.status === 'success').length;
    const successRate = totalForges > 0 ? Math.round((successForges / totalForges) * 100) : 0;
    
    const completedForges = history.filter(h => h.durationMs);
    const avgDurationMs = completedForges.reduce((acc, h) => acc + h.durationMs, 0) / (completedForges.length || 1);
    
    return { totalForges, successRate, avgDurationMs };
  });

  ipcMain.handle('dashboard:get-charts-data', () => {
    const history = getHistory();
    
    const byCategory = {};
    const byTier = {};
    const byDate = {};
    const qgStats = { total: 0, passed: 0, failed: 0, avgAttempts: 0, totalAttempts: 0 };

    history.forEach(entry => {
      if (!byCategory[entry.category]) byCategory[entry.category] = 0;
      byCategory[entry.category]++;

      if (!byTier[entry.tier]) {
        byTier[entry.tier] = { total: 0, success: 0, failed: 0 };
      }
      byTier[entry.tier].total++;
      if (entry.status === 'success') byTier[entry.tier].success++;
      else if (entry.status === 'error' || entry.status === 'failed') byTier[entry.tier].failed++;

      if (entry.startTime) {
        const dateStr = new Date(entry.startTime).toISOString().split('T')[0];
        if (!byDate[dateStr]) byDate[dateStr] = 0;
        byDate[dateStr]++;
      }

      if (entry.metrics && typeof entry.metrics.qualityGatePassed === 'boolean') {
          qgStats.total++;
          if (entry.metrics.qualityGatePassed) qgStats.passed++;
          else qgStats.failed++;
          qgStats.totalAttempts += (entry.metrics.qualityGateAttempts || 1);
      }
    });

    if (qgStats.total > 0) {
        qgStats.avgAttempts = qgStats.totalAttempts / qgStats.total;
    }

    return { byCategory, byTier, byDate, qgStats };
  });

  ipcMain.handle('history:clear', () => {
    saveHistory([]);
    return { success: true };
  });
}

module.exports = {
  getHistory,
  saveHistory,
  registerHistoryHandlers
};
