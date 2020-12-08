/*
 * @Des          :
 * @Author       : liulib
 * @Date         : 2020-12-08 16:51:25
 * @LastEditors  : liulib
 * @LastEditTime : 2020-12-08 17:07:22
 */
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { Button } from 'ant-design-vue'

const app = createApp(App)

app.use(Button)

app.use(store)
    .use(router)
    .mount('#app')
