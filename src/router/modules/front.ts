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
    },
    {
        path: 'archive',
        name: `${routeName}-archive`,
        meta: {
            title: '归档',
            isTabsPage: false
        },
        component: () =>
            import(
                /* webpackChunkName: "front-archive" */ '@/pages/front/archive/Archive.vue'
            )
    },
    {
        path: 'category',
        name: `${routeName}-category`,
        meta: {
            title: '分类',
            isTabsPage: false
        },
        component: () =>
            import(
                /* webpackChunkName: "front-category" */ '@/pages/front/category/Category.vue'
            )
    },
    {
        path: 'resume',
        name: `${routeName}-resume`,
        meta: {
            title: '简历',
            isTabsPage: false
        },
        component: () =>
            import(
                /* webpackChunkName: "front-resume" */ '@/pages/front/resume/Resume.vue'
            )
    }
];

export default routes;
