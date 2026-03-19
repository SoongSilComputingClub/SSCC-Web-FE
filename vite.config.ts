import path from 'node:path';

import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig(({ mode }) => {
  // 현재 작업 디렉토리의 환경 변수 로드
  const env = loadEnv(mode, process.cwd(), '');

  return {
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
      proxy: {
        '/jwt': {
          target: env.VITE_API_BASE_URL || 'http://localhost:8080',
          changeOrigin: true,
          cookieDomainRewrite: 'localhost',
          xfwd: true,
        },
        '/admin': {
          target: env.VITE_API_BASE_URL || 'http://localhost:8080',
          changeOrigin: true,
          cookieDomainRewrite: 'localhost',
          xfwd: true,
        },
        '/logout': {
          target: env.VITE_API_BASE_URL || 'http://localhost:8080',
          changeOrigin: true,
          cookieDomainRewrite: 'localhost',
          xfwd: true,
        },
        '/oauth2': {
          target: env.VITE_API_BASE_URL || 'http://localhost:8080',
          changeOrigin: true,
          cookieDomainRewrite: 'localhost',
          xfwd: true,
        },
        '/login/oauth2': {
          target: env.VITE_API_BASE_URL || 'http://localhost:8080',
          changeOrigin: true,
          cookieDomainRewrite: 'localhost',
          xfwd: true,
        },
        '/apply-forms': {
          target: env.VITE_API_BASE_URL || 'http://localhost:8080',
          changeOrigin: true,
          cookieDomainRewrite: 'localhost',
          xfwd: true,
        },
      },
    },
    build: {
      outDir: 'dist',
      sourcemap: false,
    },
  };
});
