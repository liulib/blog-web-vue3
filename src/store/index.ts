/*
 * @Des          :
 * @Author       : liulib
 * @Date         : 2020-12-08 16:51:25
 * @LastEditors  : liulib
 * @LastEditTime : 2020-12-10 16:17:11
 */
import { createStore, Commit } from 'vuex'
import { login } from '../apis/user'

export default createStore({
    state: {
        token: sessionStorage.getItem('token') || ''
    },
    mutations: {
        SET_TOKEN(state, token) {
            state.token = token
        }
    },
    actions: {
        async loginAndSave({ commit }, params = {}) {
            const { data } = await login(params)
            commit('SET_TOKEN', data.token)
            sessionStorage.setItem('token', data.token)
            return data
        }
    },
    modules: {}
})
