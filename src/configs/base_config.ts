/*
 * @Des          :
 * @Author       : liulib
 * @Date         : 2020-12-09 09:47:54
 * @LastEditors  : liulib
 * @LastEditTime : 2020-12-10 15:40:35
 */

interface NavOptions {
    icon: string
    title: string
    link: string
}

interface BaseUrl {
    [index: string]: string
}

interface ConfigOptions {
    BASE_URL: BaseUrl
    HEADER_BLOG_NAME: string
    NavList: NavOptions[]
}

const BASE_CONFIG: ConfigOptions = {
    BASE_URL: {
        // 开发环境接口前缀
        development: 'http://127.0.0.1:3838',
        // 生产环境接口前缀
        pro: 'http://mockjs.test.cn',
        // 测试环境接口前缀
        test: 'http://mockjs.test.cn'
    },
    HEADER_BLOG_NAME: "LIULIB'BLOG",
    NavList: [
        {
            icon: 'home',
            title: '首页',
            link: '/'
        },
        {
            icon: 'edit',
            title: '归档',
            link: '/archives'
        },
        {
            icon: 'folder',
            title: '分类',
            link: '/categories'
        },
        {
            icon: 'user',
            title: '关于',
            link: '/about'
        }
    ]
}

export default BASE_CONFIG
