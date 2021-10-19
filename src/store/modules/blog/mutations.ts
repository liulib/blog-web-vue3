import { MutationTree } from 'vuex';

import { BlogState } from './state';
import { MutationType } from './mutation-types';
import { storage } from '@/utils/Storage';

import { BLOG_TAG, BLOG_CATEGORY } from '@/store/types';

import { ICategory, ITag } from './state';

export interface Mutations<T = BlogState> {
    [MutationType.SET_CATEGORY](state: T, payload: ICategory[]): void;
    [MutationType.SET_TAG](state: T, payload: ITag[]): void;
}

const mutations: MutationTree<BlogState> & Mutations<BlogState> = {
    [MutationType.SET_CATEGORY]: (state, payload) => {
        state.category = payload;
        storage.set(BLOG_CATEGORY, payload);
    },
    [MutationType.SET_TAG]: (state, payload) => {
        state.tag = payload;
        storage.set(BLOG_TAG, payload);
    }
};

export default mutations;
