<template>
    <div class="githubLoginBox">
        <ASpin size="large" tip="github login loading..." />
    </div>
</template>

<script setup lang="ts">
import { message as Message } from 'ant-design-vue'
import { useRouter, useRoute } from 'vue-router';
import { useStore } from '@/store'
import { ref } from 'vue'
import { MutationType } from '@/store/modules/user/mutation-types'

import { githubLogin } from '@/apis/user/user'

const route = useRoute()
const router = useRouter()
const store = useStore()

const { code } = route.query

if (!code) {
    Message.error('code不能为空')
}


const spinning = ref(false)

// 开启加载状态
spinning.value = true
// 关闭对话框
store.commit(MutationType.SET_LOGIN_MODAL, {
    visible: false,
    type: 'login'
})

// TODO 使用action会出现奇怪的bug不懂 先这样使用了 这里需要处理
githubLogin({ code: code as string }).then(res => {
    store.commit(MutationType.SET_TOKEN, res.token);
    store.commit(MutationType.SET_USER_NAME, res.username);

}).catch(err => {
    console.log('err');
    console.log(err);
}).finally(() => {
    // 关闭加载状态
    spinning.value = false

    // 如果是重定向过来的则跳回到之前的页面
    const toPath = decodeURIComponent(
        (route.query?.redirect || '/') as string
    );

    router.replace(toPath).then(_ => {
        if (route.name == 'login') {
            router.replace('/');
        }
    });
})
</script>
<style lang="less" scoped>
.githubLoginBox {
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
