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
        workbox: {
          // 서비스 워커가 인증/백엔드 경로(/api, /oauth2, /jwt, /logout)를
          // 네비게이션 fallback(index.html)로 처리하거나 캐시하지 않도록 차단
          runtimeCaching: [
            {
              urlPattern: ({ url }) =>
                url.pathname.startsWith('/api/') ||
                url.pathname.startsWith('/oauth2/') ||
                url.pathname.startsWith('/jwt/') ||
                url.pathname === '/logout',
              handler: 'NetworkOnly',
            },
          ],
          navigateFallbackDenylist: [/^\/api\//, /^\/oauth2\//, /^\/jwt\//, /^\/logout$/],
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
        '/api': {
          target: env.VITE_API_BASE_URL || 'http://localhost:8080',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
    build: {
      outDir: 'dist',
      sourcemap: false,
    },
  };
});
