import {
    Store as VuexStore,
    CommitOptions,
    DispatchOptions,
    Module
} from 'vuex';

// TODO: How to surpass cyclical dependency linting errors cleanly?
import { RootState } from '@/store';
import { UserState } from './state';

import state from './state';
import mutations, { Mutations } from './mutations';
import actions, { Actions } from './actions';

export type UserStore<S = UserState> = Omit<
    VuexStore<S>,
    'getters' | 'commit' | 'dispatch'
> & {
    commit<K extends keyof Mutations, P extends Parameters<Mutations[K]>[1]>(
        key: K,
        payload: P,
        options?: CommitOptions
    ): ReturnType<Mutations[K]>;
} & {
    dispatch<K extends keyof Actions>(
        key: K,
        payload: Parameters<Actions[K]>[1],
        options?: DispatchOptions
    ): ReturnType<Actions[K]>;
};
export const store: Module<UserState, RootState> = {
    state,
    mutations,
    actions
};
