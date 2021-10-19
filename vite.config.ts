import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    server: {
        host: '127.0.0.1',
        port: 9001
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src')
        }
    }
});
