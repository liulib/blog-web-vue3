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
    }
];

export default routes;
