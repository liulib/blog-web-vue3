import { RouteRecordRaw } from 'vue-router';

import RouterTransition from '@/components/RouterTransition/RouterTransition.vue';

const routeName = 'system';

const routes: Array<RouteRecordRaw> = [
    {
        path: 'system',
        name: routeName,
        component: RouterTransition,
        redirect: '/admin/system/user',
        meta: {
            title: '系统管理'
        },
        children: [
            {
                path: 'user',
                name: `${routeName}-user`,
                meta: {
                    title: '用户管理',
                    isTabsPage: true
                },
                component: () =>
                    import(
                        /* webpackChunkName: "system-user" */ '@/pages/back/user/index.vue'
                    )
            },
            {
                path: 'role',
                name: `${routeName}-role`,
                meta: {
                    title: '角色管理',
                    isTabsPage: true
                },
                component: () =>
                    import(
                        /* webpackChunkName: "system-role" */ '@/pages/back/role/index.vue'
                    )
            },
            {
                path: 'menu',
                name: `${routeName}-menu`,
                meta: {
                    title: '菜单管理',
                    isTabsPage: true
                },
                component: () =>
                    import(
                        /* webpackChunkName: "system-menu" */ '@/pages/back/menu/index.vue'
                    )
            }
        ]
    }
];

export default routes;
