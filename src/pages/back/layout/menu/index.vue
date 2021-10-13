<template>
    <AMenu
        mode="inline"
        theme="dark"
        :openKeys="openKeys"
        :selectedKeys="selectedKeys"
        @click="handleRouteJump"
        @openChange="handleOpenChange"
    >
        <template v-for="item in tabsList">
            <!-- 没有子级菜单直接渲染 -->
            <template v-if="!item.children">
                <AMenuItem :key="item.url">
                    <span>{{ item.menuName }}</span>
                </AMenuItem>
            </template>

            <template v-else>
                <!-- 有子级则递归生成子级 -->
                <menuItem :key="item.url" :menuInfo="item"></menuItem>
            </template>
        </template>
    </AMenu>
</template>

<script lang="ts">
import { defineComponent, computed, watch } from 'vue';
import menuItem from './menuItem.vue';

import { useRoute, useRouter } from 'vue-router';
import { useStore } from '@/store';
import { MutationType } from '@/store/modules/menu/mutation-types';

export default defineComponent({
    name: 'LayoutMenu',
    components: { menuItem },
    setup() {
        const route = useRoute();
        const router = useRouter();
        const store = useStore();

        const openKeys = computed(() => {
            return store.state.menu.openKeys;
        });
        const selectedKeys = computed(() => {
            return store.state.menu.selectedKeys;
        });
        const tabsList = computed(() => {
            return store.state.user.menuList;
        });

        /**
         * @description: 跟随页面路由变化，切换菜单选中状态
         */
        watch(
            () => route.path,
            () => {
                // TODO  openKeys有bug
                const splitPath = route.path.split('/')
                const tmpOpenKeys: string[] = [`/${splitPath[1]}/${splitPath[2]}`];
                const tmpSelectKeys: string[] = [route.path];
                store.commit(MutationType.SET_OPEN_KEYS, tmpOpenKeys);
                store.commit(MutationType.SET_SELECTED_KEYS, tmpSelectKeys);
            },
            { immediate: true }
        );

        /**
         * 处理路由跳转
         * @param { Object } 跳转携带的参数
         * @item vue实例对象
         * @key key值
         * @keyPath 地址
         */
        const handleRouteJump = ({ key }) => {
            router.push(key);
        };

        /**
         * 处理菜单项状态修改情况
         * @param { Array } patch 必填|对应的菜单信息
         */
        const handleOpenChange = patch => {
            store.commit(MutationType.SET_OPEN_KEYS, patch);
        };


        return {
            openKeys,
            selectedKeys,
            tabsList,
            handleRouteJump,
            handleOpenChange
        };
    }
});
</script>

<style lang="less" scoped>
.menuContainer {
    background-color: red;
}
</style>