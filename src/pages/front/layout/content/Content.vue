<script setup lang="ts">
import LeftSideBarVue from './LeftSideBar.vue';
</script>

<template>
    <ARow class="contentBox">
        <ACol :xxl="4" :xl="5" :lg="5" :sm="0" :xs="0">
            <LeftSideBarVue></LeftSideBarVue>
        </ACol>
        <ACol :xxl="20" :xl="19" :lg="19" :sm="24" :xs="24" class="mainAndRightBox">
            <router-view></router-view>
        </ACol>
    </ARow>
</template>

<style lang="less" scoped>
.contentBox {
    height: calc(100vh - 64px - 36px - 40px);
    background-color: #fff;
    margin-top: 40px;
    .mainAndRightBox {
        height: calc(100vh - 64px - 36px - 40px);
        overflow-y: scroll;
    }
}
</style>