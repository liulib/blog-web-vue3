/*
 * @Des          :
 * @Author       : liulib
 * @Date         : 2020-12-08 14:12:16
 * @LastEditors  : liulib
 * @LastEditTime : 2020-12-08 16:29:11
 */
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'LayoutWeb',
        component: () => import('../views/LayoutWeb.vue')
    },
    {
        path: '/admin',
        name: 'LayoutAdmin',
        component: () => import('../views/LayoutAdmin.vue')
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('../views/Login.vue')
    },
    {
        path: '/:catchAll(.*)',
        name: 'notFoundPage',
        component: () => import('../views/NotFoundPage.vue')
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
