import { RouteRecordRaw } from 'vue-router';

// import RouterTransition from '@/components/RouterTransition/RouterTransition.vue';

const routeName = 'front';

const routes: Array<RouteRecordRaw> = [
    {
        path: '',
        name: `${routeName}-home`,
        meta: {
            title: '首页',
            isTabsPage: false
        },
        component: () =>
            import(
                /* webpackChunkName: "front-home" */ '@/pages/front/home/Home.vue'
            )
    },
    {
        path: 'article/:id',
        name: `${routeName}-article`,
        meta: {
            title: '文章详情',
            isTabsPage: false
        },
        component: () =>
            import(
                /* webpackChunkName: "front-article" */ '@/pages/front/article/Article.vue'
            )
    }
];

export default routes;
