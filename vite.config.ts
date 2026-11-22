// ============================================================
// vite.config.ts
// Vite 6 Build & Dev Configuration for Respiro AI
// Per EFFICIENCY.md §5: manualChunks splits each feature domain
//   into its own async chunk — combined with React.lazy() this
//   reduces the initial JS parse budget to the home view only.
//   Chunk map:
//     vendor      → react + react-dom (framework primitives)
//     dashboard   → AQI heatmap, pollutant cards, AI insights
//     navigation  → Dijkstra commute exposure navigator
//     iaq         → CADR calculator + DIY purifier blueprints
//     community   → Emission pledges + volunteer patrol desk
//     multilingual→ 6-language emergency translation panel
// Per SECURITY.md §7: Dev-proxy forwards /api/* to Express 3001
//   so CORS never applies in local development.
// ============================================================

import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { resolve } from 'path';

const isTest = Boolean(process.env.VITEST);

export default defineConfig({
  plugins: [react(), ...(isTest ? [] : [tailwindcss()])],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        // Granular code-splitting: each logical group becomes its own chunk.
        // Combined with React.lazy() in App.tsx this reduces initial JS parse time.
        manualChunks: {
          vendor: ['react', 'react-dom'],
          dashboard: [
            './src/components/Dashboard/AQIHeatmap',
            './src/components/Dashboard/PollutantCards',
            './src/components/Dashboard/AIInsightsPanel',
          ],
          navigation: ['./src/components/Navigation/ExposureNavigator'],
          iaq: [
            './src/components/IAQ/CADRCalculator',
            './src/components/IAQ/DIYPurifierHacks',
          ],
          community: [
            './src/components/Community/EmissionPledges',
            './src/components/Community/VolunteerWatch',
          ],
          multilingual: ['./src/components/Multilingual/MultilingualSmogAssistant'],
        },
      },
    },
    chunkSizeWarningLimit: 600,
  },
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      },
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    include: ['src/test/**/*.{test,spec}.{ts,tsx}'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
    },
  },
});
