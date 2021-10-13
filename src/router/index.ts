import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { App } from 'vue';

import login from './modules/login';
import notFound from './modules/notFound';
import dashboard from './modules/dashboard';
import system from './modules/system';
import front from './modules/front';

import { createRouterGuards } from './router-guard';

const process = import.meta.env;

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'FrontLayout',
        component: () =>
            import(
                /* webpackChunkName: "FrontLayout" */ '@/pages/front/layout/index.vue'
            ),
        children: [...front]
    },
    {
        path: '/admin',
        name: 'BackLayout',
        redirect: '/admin/dashboard',
        component: () =>
            import(
                /* webpackChunkName: "BackLayout" */ '@/pages/back/layout/index.vue'
            ),
        children: [...dashboard, ...system]
    },
    ...notFound
    // ...login
];

const router = createRouter({
    history: createWebHistory(process.BASE_URL),
    routes
});

export function setupRouter(app: App) {
    app.use(router);
    // 创建路由守卫
    createRouterGuards(router);
}

export default router;
