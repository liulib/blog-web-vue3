import { isNavigationFailure, Router } from 'vue-router';
import NProgress from 'nprogress'; // progress bar

import { storage } from '@/utils/Storage';
import { WHITE_LIST } from '@/configs/base-config';
import { ACCESS_TOKEN } from '@/store/modules/user/mutation-types';
import { TOKEN, MENU_LIST } from '@/store/types';
import { useStore } from '@/store';

import { MutationType } from '@/store/modules/menu/mutation-types';
import { tab } from '@/store/modules/menu/state';

const homeRoutePath = '/';
const store = useStore();

export function createRouterGuards(router: Router) {
    router.beforeEach((to, from, next) => {
        NProgress.start();
        // 获取localStorage中的数据
        const token = storage.get(TOKEN) ? storage.get(TOKEN) : null;
        // 白名单的则直接跳转
        if (WHITE_LIST.includes(to.path.split('/')[0])) {
            next();
        } else {
            // 不在白名单则需要token 没有token则重定向到首页
            if (token) {
                // 判断是否需要添加到tabs标签
                if (to.meta.isTabsPage) {
                    const tabsItem: tab = {
                        name: to.name as string,
                        title: to.meta.title as string,
                        path: to.path
                    };
                    store.commit(MutationType.ADD_TAB_LIST, tabsItem);
                }
                next();
            } else {
                // 跳转到登录页并带上跳转前的路径
                next(homeRoutePath);
            }
        }
    });

    router.afterEach((to, from, failure) => {
        document.title = (to?.meta?.title as string) || document.title;
        if (isNavigationFailure(failure)) {
            console.log('failed navigation', failure);
        }
        NProgress.done();
    });

    router.onError(error => {
        console.log(error, '路由错误');
    });
}
