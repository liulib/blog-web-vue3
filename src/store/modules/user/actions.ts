import { login, githubLogin } from '@/apis/user/user';
import { MutationType } from './mutation-types';

import { ActionContext, ActionTree } from 'vuex';
import { UserState } from './state';
import { Mutations } from './mutations';

import { LoginReq, githubLoginReq } from '@/apis/user/types';

import { UserActionTypes } from './action-types';

import { RootState } from '@/store';

import { toTree } from '@/utils/toTree';
import { sortTree } from '@/utils/sortTree';
import { Menu } from './state';

type AugmentedActionContext = {
    commit<K extends keyof Mutations>(
        key: K,
        payload: Parameters<Mutations[K]>[1]
    ): ReturnType<Mutations[K]>;
} & Omit<ActionContext<UserState, RootState>, 'commit'>;

export interface Actions {
    [UserActionTypes.Login](
        context: AugmentedActionContext,
        userInfo: LoginReq
    ): Promise<any>;
    [UserActionTypes.githubLogin](
        context: AugmentedActionContext,
        params: githubLoginReq
    ): Promise<any>;
}

const actions: ActionTree<UserState, RootState> & Actions = {
    // 登录
    async [UserActionTypes.Login]({ commit }, userInfo) {
        try {
            const response = await login(userInfo);

            const treeData = toTree<Menu>(response.menuList);
            sortTree<Menu>(treeData);

            commit(MutationType.SET_TOKEN, response.token);
            commit(MutationType.SET_MENU_LIST, treeData);
            commit(MutationType.SET_USER_NAME, response.username);

            return Promise.resolve(response);
        } catch (e) {
            return Promise.reject(e);
        }
    },
    // github登录
    async [UserActionTypes.githubLogin]({ commit }, params) {
        try {
            const response = await githubLogin(params);

            commit(MutationType.SET_TOKEN, response.token);
            commit(MutationType.SET_USER_NAME, response.username);

            return Promise.resolve(response);
        } catch (e) {
            return Promise.reject(e);
        }
    }
};

export default actions;
