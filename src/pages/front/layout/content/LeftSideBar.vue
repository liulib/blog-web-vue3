<script setup lang="ts">
import { SIDEBAR } from '@/configs/base-config';
</script>

<template>
    <div class="leftSideBarBox">
        <img class="logo" :src="SIDEBAR.avatar" alt="logo" />
        <h1 class="title">{{ SIDEBAR.title }}</h1>
        <h2 class="subTitle">{{ SIDEBAR.subTitle }}</h2>
        <i
            :class="['iconfont icon-github', 'myIcon'].join(' ')"
            @click="() => {
                window.open('https://github.com/liulib');
            }"
        />
    </div>
</template>

<style lang="less" scoped>
.leftSideBarBox {
    text-align: center;
    border-right: 1px solid #ccc;
    height: calc(100vh - 64px - 64px - 40px);

    .logo {
        width: 132px;
        height: 132px;
        border-radius: 66px;
    }

    .myIcon {
        font-size: 20px;
        cursor: pointer;
    }

    .title {
        font-size: 24px;
        font-weight: bold;
        margin: 10px 0;
    }

    .subTitle {
        font-size: 16px;
        margin: 10px 0;
    }
}
</style>