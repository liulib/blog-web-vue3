import { RouteRecordRaw } from 'vue-router';

const routeName = 'notFound';

const routes: Array<RouteRecordRaw> = [
    {
        path: '/notFound',
        name: routeName,
        component: () =>
            import(
                /* webpackChunkName: "notFound" */ '@/pages/notFound/index.vue'
            )
    }
];

export default routes;
