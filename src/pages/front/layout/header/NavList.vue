<script setup lang="ts">
import navList from './navList';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

console.log(navList);

const jumoTo = (url: string) => {
    console.log(url);
    router.push(url)
}

</script>

<template>
    <AMenu mode="horizontal" :selectedKeys="[route.fullPath]">
        <AMenuItem
            v-for="item in navList"
            :key="item.link"
            @click="jumoTo(item.link)"
        >{{ item.title }}</AMenuItem>
    </AMenu>
</template>