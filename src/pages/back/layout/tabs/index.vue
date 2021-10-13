<template>
    <ATabs
        type="editable-card"
        @edit="editTabs"
        @change="changeTabs"
        :activeKey="activeKey"
        hideAdd
    >
        <ATabPane v-for="item in tabList" :key="item.path" :tab="item.title"></ATabPane>
    </ATabs>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, ref, computed, watch } from 'vue';
import { useStore } from '@/store';
import { useRoute, useRouter } from 'vue-router';
import { MutationType } from '@/store/modules/menu/mutation-types';
import { tab } from '@/store/modules/menu/state';
import { message } from 'ant-design-vue';
// import { DownOutlined } from '@ant-design/icons-vue';

export default defineComponent({
    name: 'Tabs',
    // components: { DownOutlined },
    setup() {
        const store = useStore();
        const route = useRoute();
        const router = useRouter();

        const state = reactive({
            activeKey: route.path
        });

        const tabList = computed(() => store.state.menu.tabList);

        /**
         * @description: 监听路由，更改当前选中的tab
         */
        watch(
            () => route.path,
            (to, from) => {
                state.activeKey = to;
            }
        );

        /**
         * @description: 监听编辑tab事件 https://www.antdv.com/components/tabs-cn/#API
         * @param {*} targetKey
         * @param {*} action
         */
        const editTabs = (targetKey: string, action: string) => {
            if (action !== 'remove') return;
            if (tabList.value.length === 1) {
                // 删除vuex中的当前页数据
                // store.commit(MutationType.REMOVE_TAB_LIST, targetKey);
                // router.push('/dashboard');
                message.warning('这已经是最后一页，不能再关闭了！');
            } else {
                // 找到当前路由的index
                const nextTabIndex: number = tabList.value.findIndex(value => {
                    return value.path === targetKey;
                });
                // 找到下一个路由
                let nextTab: tab =
                    tabList.value[nextTabIndex + 1] ||
                    tabList.value[nextTabIndex - 1];
                // 删除vuex中的当前页数据
                store.commit(MutationType.REMOVE_TAB_LIST, targetKey);
                //跳转路由
                router.push(nextTab.path);
            }
        };
        /**
         * @description: 监听切换tab事件
         * @param {*} targetKey
         */
        const changeTabs = (targetKey: string) => {
            if (targetKey === route.path) return;
            router.push(targetKey);
        };

        return {
            editTabs,
            changeTabs,
            tabList,
            ...toRefs(state)
        };
    }
});
</script>

<style lang="less" scoped>
</style>
