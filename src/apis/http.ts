/*
 * @Des          : axios封装 主要做了请求参数的格式转换、错误处理
 * @Author       : liulib
 * @Date         : 2020-10-12 14:58:07
 * @LastEditors  : liulib
 * @LastEditTime : 2020-12-09 16:51:25
 */
/**
 * axios封装
 * 请求拦截、响应拦截、错误统一处理
 */
import axios, {
    AxiosInstance,
    AxiosRequestConfig,
    AxiosResponse,
    AxiosError
} from 'axios'
import qs from 'qs'
import config from '../configs/base_config'

import { message } from 'ant-design-vue'

const { BASE_URL } = config

export const PATH_URL: string = BASE_URL[process.env.VUE_APP_CURENV as string]

// 创建axios实例
const instance: AxiosInstance = axios.create({
    // 超时时间
    timeout: 1000 * 12,
    baseURL: PATH_URL
    // `transformRequest` 允许在向服务器发送前，修改请求数据
    // 对 data 进行任意转换处理 实际上用不到
    // transformRequest: [
    //     function(data) {
    //         return data
    //     }
    // ]
    // `withCredentials`
    //  withCredentials: false, // default
})

// 请求拦截器
instance.interceptors.request.use(
    (config: AxiosRequestConfig) => {
        // 在发送请求之前做处理...
        // post默认请求格式为json格式  如果你的项目默认是使用application/x-www-form-urlencoded 则启用下面的代码(这时候你想要json格式的请求就传json的请求头)
        // ====>>这里有坑 如果直接在生成实例的时候传header:{'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'} 下面就无法获取到config.headers['Content-Type']
        // config.headers = Object.assign(
        //     {
        //         'Content-Type':
        //             'application/x-www-form-urlencoded; charset=UTF-8'
        //     },
        //     config.headers
        // )
        // 登录流程控制中，根据本地是否存在token判断用户的登录情况
        // const token = store.state.token
        // token && (config.headers.Authorization = token)
        // 根据请求头修改post请求参数格式
        if (
            config.method === 'post' &&
            config.headers['Content-Type'] ===
                'application/x-www-form-urlencoded'
        ) {
            config.data = qs.stringify(config.data)
        }
        return config
    },
    (error: AxiosError) => Promise.reject(error)
)

// 响应拦截器
instance.interceptors.response.use(
    (response: AxiosResponse) => {
        if (response.data.code === 200) {
            return response.data
        } else {
            message.error(response.data.message)
        }
    },
    (error: AxiosError) => {
        console.log('err' + error) // for debug
        message.error(error.message)
        return Promise.reject(error)
    }
)

export default instance
