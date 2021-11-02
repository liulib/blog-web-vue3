<template>
    <ASubMenu :key="menuInfo.url">
        <template #title>
            <span>{{ menuInfo.menuName }}</span>
        </template>
        <template v-for="item in menuInfo.children">
            <template v-if="item.level < 3">
                <AMenuItem :key="item.url">
                    <span>{{ item.menuName }}</span>
                </AMenuItem>
            </template>
            <template v-else>
                <MenuItem :menu-info="item" :key="item.url" />
            </template>
        </template>
    </ASubMenu>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
    name: 'menuItem',
    props: {
        menuInfo: {
            type: Object,
            default: () => ({})
        }
    },
});
</script>

