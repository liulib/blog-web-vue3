<script setup lang="ts">
import { computed } from 'vue'
import { useStore } from '@/store';
import { useRouter } from 'vue-router';

import { MutationType as UserMutationType } from '@/store/modules/user/mutation-types'
import { storage } from '@/utils/Storage';

const router = useRouter()
const store = useStore()

const username = computed(() => store.state.user.username);

const logout = () => {
    storage.clear()
    router.push('/')
    // vuex不会写 先用页面重载的方式
    window.location.reload()
}

</script>

<template>
    <ADropdown
        v-if="username"
        class="dropDownBox"
        placement="bottomCenter"
        :trigger="['click', 'hover']"
    >
        <div class="dropDownName">{{ username }}</div>
        <template #overlay>
            <AMenu>
                <AMenuItem key="import">
                    <span @click="e => console.log(e)">导入文章</span>
                </AMenuItem>
                <AMenuItem key="system">
                    <span @click="() => router.push('/admin/dashboard')">后台管理</span>
                </AMenuItem>
                <AMenuItem key="logout">
                    <span class="user-logout" @click="logout">退出登录</span>
                </AMenuItem>
            </AMenu>
        </template>
    </ADropdown>
    <div v-else>
        <AButton
            style="margin-right: 10px;"
            @click="store.commit(UserMutationType.SET_LOGIN_MODAL, { visible: true, type: 'login' })"
        >登录</AButton>
        <AButton
            @click="store.commit(UserMutationType.SET_LOGIN_MODAL, { visible: true, type: 'register' })"
        >注册</AButton>
    </div>
</template>

<style lang="less" scoped>
.dropDownBox {
    cursor: pointer;
    .dropDownName {
        height: 55px;
    }
}
</style>