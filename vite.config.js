import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import eslint from 'vite-plugin-eslint';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    laravel({
      input: ['resources/js/index.js'],
      refresh: true,
    }),
    eslint(),
    react({
      jsxRuntime: 'automatic',
    })
  ],
});
