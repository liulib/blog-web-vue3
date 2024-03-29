import { MutationTree } from 'vuex';

import { MenuState } from './state';
import { MutationType } from './mutation-types';
import { storage } from '@/utils/Storage';

import { OPEN_KEYS, SELECTED_KEYS, TAB_LIST } from '@/store/types';

import { tab } from './state';

export interface Mutations<T = MenuState> {
    [MutationType.SET_OPEN_KEYS](state: T, payload: string[]): void;
    [MutationType.SET_SELECTED_KEYS](state: T, payload: string[]): void;
    [MutationType.ADD_TAB_LIST](state: T, payload: tab): void;
    [MutationType.REMOVE_TAB_LIST](state: T, payload: string): void;
    [MutationType.RESET_TAB_LIST](state: T, payload: null): void;
}

const mutations: MutationTree<MenuState> & Mutations<MenuState> = {
    [MutationType.SET_OPEN_KEYS]: (state, openKeys) => {
        state.openKeys = openKeys;
        storage.set(OPEN_KEYS, openKeys);
    },
    [MutationType.SET_SELECTED_KEYS]: (state, selectedKeys) => {
        state.selectedKeys = selectedKeys;
        storage.set(SELECTED_KEYS, selectedKeys);
    },
    [MutationType.ADD_TAB_LIST]: (state, tabItem) => {
        // 判断是否已经存在
        const isExist = state.tabList.some(item => item.path === tabItem.path);
        // 如果不存在添加
        if (!isExist) {
            state.tabList.push(tabItem);
        }
        storage.set(TAB_LIST, state.tabList);
    },
    [MutationType.REMOVE_TAB_LIST]: (state, path) => {
        state.tabList = state.tabList.filter(item => item.path !== path);
        storage.set(TAB_LIST, state.tabList);
    },
    [MutationType.RESET_TAB_LIST]: (state, payload) => {
        state.tabList = [];
        storage.set(TAB_LIST, state.tabList);
    }
};

export default mutations;
