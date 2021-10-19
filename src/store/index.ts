import { createStore } from 'vuex';
import { App } from 'vue';
// import createPersistedState from './plugins/SavaInSS';

import { UserState } from './modules/user/state';
import { MenuState } from './modules/menu/state';
import { BlogState } from './modules/blog/state';
import { store as user, UserStore } from './modules/user';
import { store as menu, MenuStore } from './modules/menu';
import { store as blog, BlogStore } from './modules/blog';

export interface RootState {
    user: UserState;
    menu: MenuState;
    blog: BlogState;
}

export type Store = UserStore<Pick<RootState, 'user'>> &
    MenuStore<Pick<RootState, 'menu'>> &
    BlogStore<Pick<RootState, 'blog'>>;

const store = createStore({
    modules: { user, menu, blog }
    // plugins: [createPersistedState]
});

export function setupStore(app: App) {
    app.use(store);
}

// 定义你自己的“useStore”组合函数
export function useStore() {
    return store as Store;
}

export default store;
