import { createApp } from 'vue';
import App from './App.vue';

import { setupRouter } from '@/router/index';
import { setupAntd, setupMarkDown } from '@/plugins/index';

import '@/assets/styles/reset.css';

import '@/assets/icons/iconfont.css';

const app = createApp(App);

setupRouter(app);
setupAntd(app);
setupMarkDown(app);

// 路由准备就绪后挂载APP实例
app.mount('#app');
