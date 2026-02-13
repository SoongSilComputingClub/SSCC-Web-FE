import path from 'node:path';
import fs from 'node:fs';

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico'],
      manifest: {
        name: 'SSCC',
        short_name: 'SSCC',
        start_url: '/',
        display: 'standalone',
        theme_color: '#111827',
        background_color: '#111827',
        icons: [
          { src: '/pwa-192.png', sizes: '192x192', type: 'image/png' },
          { src: '/pwa-512.png', sizes: '512x512', type: 'image/png' },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  server: {
    port: 3000,
    https:
      process.env.USE_HTTPS === 'true' &&
      fs.existsSync('./localhost-key.pem') &&
      fs.existsSync('./localhost.pem')
        ? {
            key: fs.readFileSync('./localhost-key.pem'),
            cert: fs.readFileSync('./localhost.pem'),
          }
        : undefined,
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
});
