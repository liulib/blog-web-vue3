/*
 * @Des          :
 * @Author       : liulib
 * @Date         : 2020-12-10 13:40:05
 * @LastEditors  : liulib
 * @LastEditTime : 2020-12-10 14:05:43
 */
export interface loginParams {
    username: string
    password: string
}

export interface registerParams {
    username: string
    password: string
    email: string
}

export interface githubLoginParams {
    code: string
}

export interface updateUserParams {
    notice?: boolean
    disable?: boolean
}

export interface userListPrams {
    username?: string
    startTime?: string
    endTime?: string
    page: number
    pageSize: number
}
