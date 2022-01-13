<script setup lang="ts">
import navList from './navList';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from "@/store"
import { BlogActionTypes } from '@/store/modules/blog/action-types'
import { message as Message } from 'ant-design-vue';

import { computed } from 'vue'

const route = useRoute();
const router = useRouter();
const store = useStore()

const categoryList = computed(() => store.state.blog.category);

if (categoryList.value.length === 0) {
    store.dispatch(BlogActionTypes.getCategory, undefined)
        .then()
        .catch(error => {
            Message.error(error)
        })
}

const jumpTo = (url: string) => {
    router.push(url)
}
</script>

<template>
    <AMenu mode="horizontal" :selectedKeys="[route.fullPath]">
        <template v-for="item in navList">
            <template v-if="item.link === '/category'">
                <ASubMenu>
                    <template #title>{{ item.title }}</template>
                    <AMenuItem
                        v-for="item in categoryList"
                        :key="item.id"
                        @click="() => { router.push({ name: 'front-category', query: { categoryId: item.id, categoryName: item.categoryName } }) }"
                    >{{ item.categoryName }}</AMenuItem>
                </ASubMenu>
            </template>
            <template v-else>
                <AMenuItem :key="item.link" @click="jumpTo(item.link)">{{ item.title }}</AMenuItem>
            </template>
        </template>
    </AMenu>
</template>