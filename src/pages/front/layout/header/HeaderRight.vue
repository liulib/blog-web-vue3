<script setup lang="ts">
// 组件名和文件名同名会出bug 为啥？？？？？？？
import NavListVue from './NavList.vue';
import UserInfo from './UserInfo.vue';

</script>

<template>
    <ARow justify="end" class="headerRight">
        <ACol>
            <NavListVue></NavListVue>
        </ACol>
        <ACol>
            <UserInfo></UserInfo>
        </ACol>
    </ARow>
</template>


<style lang="less" scoped>
.headerRight {
    padding-right: 50px;
}
</style>
