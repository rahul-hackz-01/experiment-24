import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

/**
 * Experiment 10: Performance Optimization & Code Splitting
 * Topics: Code Splitting (10.b), Bundle Size Optimization
 */
export default defineConfig({
  plugins: [react()],
  build: {
    // b) Apply code splitting to reduce the initial bundle size
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react-router-dom') || id.includes('react-dom') || id.includes('react/')) {
              return 'vendor-react';
            }
            if (id.includes('@reduxjs') || id.includes('react-redux')) {
              return 'vendor-redux';
            }
            if (id.includes('axios')) {
              return 'vendor-axios';
            }
            return 'vendor-common';
          }
        }
      }
    },
    chunkSizeWarningLimit: 600
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.js'
  }
});
