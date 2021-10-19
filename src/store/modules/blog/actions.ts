import { getAllCategory } from '@/apis/category';
import { getAllTag } from '@/apis/tag';

import { MutationType } from './mutation-types';

import { ActionContext, ActionTree } from 'vuex';
import { BlogState } from './state';
import { Mutations } from './mutations';

import { BlogActionTypes } from './action-types';

import { RootState } from '@/store';

import { toTree } from '@/utils/toTree';

import { ICategory, ITag } from './state';

type AugmentedActionContext = {
    commit<K extends keyof Mutations>(
        key: K,
        payload: Parameters<Mutations[K]>[1]
    ): ReturnType<Mutations[K]>;
} & Omit<ActionContext<BlogState, RootState>, 'commit'>;

export interface Actions {
    [BlogActionTypes.getCategory](
        context: AugmentedActionContext
    ): Promise<any>;
    [BlogActionTypes.getTag](context: AugmentedActionContext): Promise<any>;
}

const actions: ActionTree<BlogState, RootState> & Actions = {
    async [BlogActionTypes.getCategory]({ commit }) {
        try {
            const response = await getAllCategory();

            commit(MutationType.SET_CATEGORY, response);

            return Promise.resolve(response);
        } catch (e) {
            return Promise.reject(e);
        }
    },
    async [BlogActionTypes.getTag]({ commit }) {
        try {
            const response = await getAllTag();

            commit(MutationType.SET_TAG, response);

            return Promise.resolve(response);
        } catch (e) {
            return Promise.reject(e);
        }
    }
};

export default actions;
