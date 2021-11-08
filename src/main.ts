import { createApp } from 'vue';
import App from './App.vue';

import { setupRouter } from '@/router/index';

import { setupAntd, setupMarkDown } from '@/plugins';

import '@/assets/styles/reset.css';

import '@/assets/icons/iconfont.css';

import antDesignVue from 'ant-design-vue';
import VMdEditor from '@kangc/v-md-editor';

const app = createApp(App);

// 注册全局常用的ant-design-vue组件
setupAntd(app);

setupRouter(app);

setupMarkDown(app);

app.use(antDesignVue).use(VMdEditor);

// 路由准备就绪后挂载APP实例
app.mount('#app');
