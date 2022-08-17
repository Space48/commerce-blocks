import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import basicSsl from '@vitejs/plugin-basic-ssl'

export default defineConfig({
    esbuild: {
        jsxFactory: 'h',
        jsxFragment: 'Fragment'
    },
    plugins: [
        laravel({
            input: [
                'frontend/resources/js/index.tsx',
            ],
            publicDirectory: 'public/frontend',
            refresh: true,
        }),
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