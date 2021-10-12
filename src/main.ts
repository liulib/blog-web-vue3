import { createApp } from 'vue';
import App from './App.vue';
import { setupAntd } from '@/configs/ui-config';
import { setupRouter } from '@/router/index';

const app = createApp(App);

// 注册全局常用的ant-design-vue组件
setupAntd(app);

setupRouter(app);

// 路由准备就绪后挂载APP实例
app.mount('#app');
