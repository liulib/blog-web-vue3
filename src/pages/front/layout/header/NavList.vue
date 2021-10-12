<script setup lang="ts">
import navList from './navList';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

</script>

<template>
    <AMenu mode="horizontal" :selectedKeys="[route.fullPath]">
        <AMenuItem
            v-for="item in navList"
            :key="item.link"
            @click="router.push(item.link)"
        >{{ item.title }}</AMenuItem>
    </AMenu>
</template>