/// <reference types="vite/client" />

declare module '*.vue' {
    import { DefineComponent } from 'vue';
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
    const component: DefineComponent<{}, {}, any>;
    export default component;
}

// .env文件智能提示
interface ImportMetaEnv {
    VITE_APP_TITLE: string;
    VITE_APP_PORT: string;
    VITE_APP_BASE_URL: string;
}
