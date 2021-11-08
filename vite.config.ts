import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

import { visualizer } from 'rollup-plugin-visualizer';

import externalGlobals from 'rollup-plugin-external-globals';

import { loadEnv } from 'vite';

// https://vitejs.dev/config/
export default ({ mode }) => {
    return defineConfig({
        plugins: [vue()],
        server: {
            host: '127.0.0.1',
            port: Number(loadEnv(mode, process.cwd()).VITE_APP_PORT)
        },
        resolve: {
            alias: {
                '@': path.resolve(__dirname, './src')
            }
        },
        build: {
            rollupOptions: {
                external: ['vue', 'ant-design-vue', '@kangc/v-md-editor'],
                plugins: [
                    visualizer(),
                    externalGlobals({
                        vue: 'Vue',
                        'ant-design-vue': 'AntDesignVue',
                        '@kangc/v-md-editor': 'VMdEditor'
                    })
                ]
            }
        }
    });
};
