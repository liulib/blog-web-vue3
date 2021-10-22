import { RouteRecordRaw } from 'vue-router';

import RouterTransition from '@/components/RouterTransition/RouterTransition.vue';

const routeName = 'blog';

const routes: Array<RouteRecordRaw> = [
    {
        path: 'blog',
        name: routeName,
        component: RouterTransition,
        redirect: '/admin/blog/article',
        meta: {
            title: '博文管理'
        },
        children: [
            {
                path: 'article',
                name: `${routeName}-article`,
                meta: {
                    title: '文章管理',
                    isTabsPage: true
                },
                component: () =>
                    import(
                        /* webpackChunkName: "system-user" */ '@/pages/back/article/Article.vue'
                    )
            },
            {
                path: 'category',
                name: `${routeName}-category`,
                meta: {
                    title: '分类管理',
                    isTabsPage: true
                },
                component: () =>
                    import(
                        /* webpackChunkName: "system-category" */ '@/pages/back/category/Category.vue'
                    )
            },
            {
                path: 'tag',
                name: `${routeName}-tag`,
                meta: {
                    title: '标签管理',
                    isTabsPage: true
                },
                component: () =>
                    import(
                        /* webpackChunkName: "system-tag" */ '@/pages/back/tag/Tag.vue'
                    )
            }
        ]
    }
];

export default routes;
