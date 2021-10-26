import logo from '@/assets/images/logo.png';

// 基础路径
export const BASE_URL = {
    HTTP_URL: 'http://127.0.0.1:13838/',
    WS_URL: 'ws://192.168.0.124:8081/'
};

// 通用缓存存储名称
export const BASENAME = {
    SESSION_NAME: 'BUFFER',
    COOKIES_NAME: 'LOGIN_INFO'
};

// 创建黑、白名单 用于在vuex、路由中添加格外情况
export const EXC_INFO = {
    VUEX_IN_EXC_DATA: [], //vuex中无需存储在缓存中的数据
    WHITELIST: ['/', '/archive', '/category', '/resume'], //路由白名单。即：任何条件下均可访问
    WEB_BLACK_LIST: ['MapAlarm', 'Login', 'NotFound'] // websocket 黑名单
};

export const NO_CACHE_DATA: string[] = [];

// 路由白名单
export const WHITE_LIST: string[] = [
    '',
    'archive',
    'category',
    'resume',
    'article'
];

// 侧边栏配置
export const SIDEBAR = {
    // 侧边栏头像
    avatar: logo,
    // 标题
    title: 'LIULIB',
    // 子标题
    subTitle: `it's time to seize the fucking day`,
    // 个人主页
    homepages: {}
};
