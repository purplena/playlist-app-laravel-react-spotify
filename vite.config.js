import react from '@vitejs/plugin-react';
import laravel from 'laravel-vite-plugin';
import { defineConfig } from 'vite';
import eslint from 'vite-plugin-eslint';

export default defineConfig({
  plugins: [
    laravel({ input: ['resources/js/index.js'], refresh: true }),
    eslint(),
    react({ jsxRuntime: 'automatic' }),
  ],
});
