import react from '@vitejs/plugin-react';
import laravel from 'laravel-vite-plugin';
import { defineConfig } from 'vite';
import eslint from 'vite-plugin-eslint';

export default defineConfig({
  server: {
    hmr: process.env.CODESPACE_NAME
      ? {
          host: `${process.env.CODESPACE_NAME}.${process.env.GITHUB_CODESPACES_PORT_FORWARDING_DOMAIN}`,
          protocol: 'https',
          port: 443,
        }
      : undefined,
    cors: {
      origin: process.env.CODESPACE_NAME
        ? `https://${process.env.CODESPACE_NAME}.${process.env.GITHUB_CODESPACES_PORT_FORWARDING_DOMAIN}`
        : 'https://localhost.purplena.io',
    },
  },
  plugins: [
    laravel({ input: ['resources/js/index.js'], refresh: true }),
    eslint(),
    react({ jsxRuntime: 'automatic' }),
  ],
});
