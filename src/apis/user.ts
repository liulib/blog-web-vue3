/*
 * @Des          :
 * @Author       : liulib
 * @Date         : 2020-12-09 15:15:50
 * @LastEditors  : liulib
 * @LastEditTime : 2020-12-10 16:16:53
 */
import axios from '../utils/http'
import {
    loginParams,
    registerParams,
    githubLoginParams,
    updateUserParams,
    userListPrams
} from '../interfaces/userInterface'

enum Url {
    login = '/user/login',
    register = '/user/register',
    githubLogin = '/user/githubLogin',
    getUserList = '/user/'
}

export const getUserList = (params: userListPrams) => {
    return axios.get(Url.getUserList, { params: params })
}

export const login = (params: loginParams) => {
    return axios.post(Url.login, params)
}

export const githubLogin = (params: githubLoginParams) => {
    return axios.post(Url.githubLogin, params)
}

export const register = (params: registerParams) => {
    return axios.post(Url.register, params)
}

export const updateUser = (id: string, params: updateUserParams) => {
    return axios.post(`/user/${id}`, params)
}
