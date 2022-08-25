import {defineConfig} from 'vite';
import laravel from 'laravel-vite-plugin';
import basicSsl from '@vitejs/plugin-basic-ssl'
import preactRefresh from '@prefresh/vite'

export default defineConfig({
  resolve: {
    alias: {
      react: 'preact/compat',
      'react-dom': 'preact/compat'
    },
  },
  esbuild: {
    jsxFactory: 'h',
    jsxFragment: 'Fragment',

  },
  plugins: [
    laravel({
      input: [
        'frontend/resources/js/index.tsx',
      ],
      publicDirectory: 'public/frontend',
      refresh: true,
    }),
    preactRefresh(),
    basicSsl(),
  ],
  server: {
    https: true,
    host: '0.0.0.0',
    hmr: {
      host: 'localhost',
    },
  },
});
